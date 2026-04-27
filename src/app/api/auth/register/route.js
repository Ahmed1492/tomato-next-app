import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import validator from 'validator';
import User from '@/models/User';
import connectDB from '@/lib/db';
import { createToken } from '@/lib/auth';

export async function POST(request) {
  try {
    await connectDB();

    const { name, email, password } = await request.json();

    // Validate email
    if (!validator.isEmail(email)) {
      return NextResponse.json({
        success: false,
        message: 'Invalid email address'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: 'Email already in use'
      });
    }

    // Validate password
    if (password.length < 8) {
      return NextResponse.json({
        success: false,
        message: 'Password must be at least 8 characters'
      });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword
    });

    // Create token
    const token = createToken(newUser._id);

    return NextResponse.json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      },
      token
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({
      success: false,
      message: 'Something went wrong',
      error: error.message
    }, { status: 500 });
  }
}