import { NextResponse } from 'next/server';
import { authMiddleware } from '@/lib/auth';
import Order from '@/models/Order';
import User from '@/models/User';
import connectDB from '@/lib/db';

export async function POST(request) {
  try {
    await connectDB();

    const auth = await authMiddleware(request);
    if (auth.error) {
      return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });
    }

    const { items, amount, address, paymentMethod = 'cod' } = await request.json();

    if (!items?.length) {
      return NextResponse.json({ success: false, message: 'Cart is empty' }, { status: 400 });
    }

    // Save order — mark COD orders as paid immediately
    const newOrder = new Order({
      userId: auth.userId,
      items,
      amount,
      address,
      payment: paymentMethod === 'cod',   // COD = confirmed right away
      status: 'Food Processing',
    });
    await newOrder.save();

    // Clear cart
    await User.findByIdAndUpdate(auth.userId, { cartData: {} });

    // If Stripe key exists and method is 'stripe', use it
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (paymentMethod === 'stripe' && stripeKey && !stripeKey.startsWith('sk_test_your')) {
      try {
        const Stripe = require('stripe');
        const stripe = new Stripe(stripeKey);

        const line_items = items.map((item) => ({
          price_data: {
            currency: 'usd',
            product_data: { name: item.name },
            unit_amount: Math.round(item.price * 100),
          },
          quantity: item.quantity,
        }));
        line_items.push({
          price_data: { currency: 'usd', product_data: { name: 'Delivery Charges' }, unit_amount: 200 },
          quantity: 1,
        });

        const baseUrl = request.headers.get('origin') || 'http://localhost:3000';
        const session = await stripe.checkout.sessions.create({
          line_items,
          mode: 'payment',
          success_url: `${baseUrl}/verify?success=true&orderId=${newOrder._id}`,
          cancel_url: `${baseUrl}/verify?success=false&orderId=${newOrder._id}`,
        });

        return NextResponse.json({ success: true, session_url: session.url, orderId: newOrder._id });
      } catch (stripeErr) {
        console.error('Stripe error:', stripeErr.message);
        // Fall through to COD response
      }
    }

    // COD / fallback — redirect straight to success
    const baseUrl = request.headers.get('origin') || 'http://localhost:3000';
    return NextResponse.json({
      success: true,
      orderId: newOrder._id,
      session_url: `${baseUrl}/verify?success=true&orderId=${newOrder._id}`,
    });

  } catch (error) {
    console.error('Place order error:', error.message);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
