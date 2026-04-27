import { NextResponse } from 'next/server';
import Food from '@/models/Food';
import connectDB from '@/lib/db';

export async function GET() {
  try {
    await connectDB();

    const food = await Food.find({}).sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      food
    });

  } catch (error) {
    console.error('Get foods error:', error);
    return NextResponse.json({
      success: false,
      message: 'Something went wrong',
      error: error.message
    }, { status: 500 });
  }
}

// Enable static generation for this route
export const revalidate = 60; // Revalidate every 60 seconds