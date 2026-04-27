import { NextResponse } from 'next/server';
import Order from '@/models/Order';
import connectDB from '@/lib/db';

export async function PUT(request) {
  try {
    await connectDB();

    const { orderId, status } = await request.json();

    if (!orderId) {
      return NextResponse.json({
        success: false,
        message: 'Order ID is required'
      }, { status: 400 });
    }

    if (!status) {
      return NextResponse.json({
        success: false,
        message: 'Status is required'
      }, { status: 400 });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json({
        success: false,
        message: 'Order not found'
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      order: updatedOrder,
      message: 'Order status updated successfully'
    });

  } catch (error) {
    console.error('Update order status error:', error);
    return NextResponse.json({
      success: false,
      message: 'Something went wrong',
      error: error.message
    }, { status: 500 });
  }
}