import { NextResponse } from 'next/server';
import Order from '@/models/Order';
import connectDB from '@/lib/db';

export async function GET() {
  try {
    await connectDB();

    const orders = await Order.find({}).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      orders
    });

  } catch (error) {
    console.error('Get all orders error:', error);
    return NextResponse.json({
      success: false,
      message: 'Something went wrong',
      error: error.message
    }, { status: 500 });
  }
}