import { NextResponse } from 'next/server';
import { authMiddleware } from '@/lib/auth';
import User from '@/models/User';
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

    const user = await User.findById(auth.userId);
    const userCart = user.cartData || {};

    return NextResponse.json({
      success: true,
      userCart
    });

  } catch (error) {
    console.error('Get cart error:', error);
    return NextResponse.json({
      success: false,
      message: 'Something went wrong',
      error: error.message
    }, { status: 500 });
  }
}