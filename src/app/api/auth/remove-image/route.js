import { NextResponse } from 'next/server';
import { authMiddleware } from '@/lib/auth';
import { deleteFromCloudinary } from '@/lib/cloudinary';
import User from '@/models/User';
import connectDB from '@/lib/db';

export async function DELETE(request) {
  try {
    await connectDB();

    const auth = await authMiddleware(request);
    if (auth.error) {
      return NextResponse.json({
        success: false,
        message: auth.error
      }, { status: auth.status });
    }

    if (!auth.user.image) {
      return NextResponse.json({
        success: false,
        message: 'No image found'
      }, { status: 404 });
    }

    // Delete from Cloudinary
    if (auth.user.public_id) {
      await deleteFromCloudinary(auth.user.public_id);
    }

    // Update user
    await User.findByIdAndUpdate(auth.userId, {
      image: null,
      public_id: null
    });

    return NextResponse.json({
      success: true,
      message: 'Profile image removed successfully'
    });

  } catch (error) {
    console.error('Remove image error:', error);
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: 500 });
  }
}