import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import User from '@/models/User';
import connectDB from '@/lib/db';
import { createToken } from '@/lib/auth';

export async function POST(request) {
  try {
    await connectDB();

    const { email, password } = await request.json();

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'User not found'
      });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate token
    const token = createToken(user._id);

    return NextResponse.json({
      success: true,
      message: 'User logged in successfully',
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({
      success: false,
      message: 'Something went wrong',
      error: error.message
    }, { status: 500 });
  }
}