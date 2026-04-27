import { NextResponse } from 'next/server';
import Order from '@/models/Order';
import connectDB from '@/lib/db';

export async function POST(request) {
  try {
    await connectDB();

    const { orderId, success } = await request.json();

    if (success === "true") {
      await Order.findByIdAndUpdate(orderId, { payment: true });
      return NextResponse.json({
        success: true,
        message: "Payment successful"
      });
    } else {
      await Order.findByIdAndDelete(orderId);
      return NextResponse.json({
        success: false,
        message: 'Payment failed'
      });
    }

  } catch (error) {
    console.error('Verify order error:', error);
    return NextResponse.json({
      success: false,
      message: 'Something went wrong',
      error: error.message
    }, { status: 500 });
  }
}