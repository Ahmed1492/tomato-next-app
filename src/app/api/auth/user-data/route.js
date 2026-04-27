import { NextResponse } from 'next/server';
import { authMiddleware } from '@/lib/auth';

export async function GET(request) {
  try {
    const auth = await authMiddleware(request);

    if (auth.error) {
      return NextResponse.json({
        success: false,
        message: auth.error
      }, { status: auth.status });
    }

    return NextResponse.json({
      success: true,
      user: {
        _id: auth.user._id,
        name: auth.user.name,
        email: auth.user.email,
        image: auth.user.image,
        cartData: auth.user.cartData
      }
    });

  } catch (error) {
    console.error('Get user data error:', error);
    return NextResponse.json({
      success: false,
      message: 'Something went wrong',
      error: error.message
    }, { status: 500 });
  }
}