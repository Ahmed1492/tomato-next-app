import { NextResponse } from 'next/server';
import { authMiddleware } from '@/lib/auth';
import User from '@/models/User';
import connectDB from '@/lib/db';

export async function POST(request) {
  try {
    await connectDB();

    const auth = await authMiddleware(request);
    if (auth.error) {
      return NextResponse.json({
        success: false,
        message: auth.error
      }, { status: auth.status });
    }

    const { itemId } = await request.json();

    const user = await User.findById(auth.userId);
    let cartData = user.cartData || {};

    // If item not in cart, add it with quantity = 1
    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      // If item exists, increase quantity
      cartData[itemId] += 1;
    }

    await User.findByIdAndUpdate(auth.userId, { cartData });

    return NextResponse.json({
      success: true,
      cartData,
      message: 'Added to cart'
    });

  } catch (error) {
    console.error('Add to cart error:', error);
    return NextResponse.json({
      success: false,
      message: 'Something went wrong',
      error: error.message
    }, { status: 500 });
  }
}