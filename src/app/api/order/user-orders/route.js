import { NextResponse } from 'next/server';
import { authMiddleware } from '@/lib/auth';
import Order from '@/models/Order';
import connectDB from '@/lib/db';

export async function GET(request) {
  try {
    await connectDB();

    const auth = await authMiddleware(request);
    if (auth.error) {
      return NextResponse.json({
        success: false,
        message: auth.error
      }, { status: auth.status });
    }

    // Get pagination parameters from URL
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const totalOrders = await Order.countDocuments({ userId: auth.userId });
    const totalPages = Math.ceil(totalOrders / limit);

    // Get paginated orders
    const userOrders = await Order.find({ userId: auth.userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    return NextResponse.json({
      success: true,
      orders: userOrders,
      pagination: {
        currentPage: page,
        totalPages,
        totalOrders,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      },
      // Legacy fields for backward compatibility
      currentPage: page,
      totalPages
    });

  } catch (error) {
    console.error('Get user orders error:', error);
    return NextResponse.json({
      success: false,
      message: 'Something went wrong',
      error: error.message
    }, { status: 500 });
  }
}