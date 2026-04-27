import { NextResponse } from 'next/server';
import { authMiddleware } from '@/lib/auth';
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary';
import User from '@/models/User';
import connectDB from '@/lib/db';

export async function POST(request) {
  try {
    await connectDB();

    const auth = await authMiddleware(request);
    if (auth.error) {
      return NextResponse.json({
        success: false,
        message: auth.error
      }, { status: auth.status });
    }

    const formData = await request.formData();
    const image = formData.get('image');

    if (!image) {
      return NextResponse.json({
        success: false,
        message: 'No image uploaded'
      }, { status: 400 });
    }

    // Delete old image if exists
    if (auth.user.public_id) {
      await deleteFromCloudinary(auth.user.public_id);
    }

    // Upload new image
    const uploadResult = await uploadToCloudinary(image, 'food-flow/users');

    // Update user
    await User.findByIdAndUpdate(auth.userId, {
      image: uploadResult.secure_url,
      public_id: uploadResult.public_id
    });

    return NextResponse.json({
      success: true,
      message: 'Image updated successfully',
      image: uploadResult.secure_url
    });

  } catch (error) {
    console.error('Update image error:', error);
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: 500 });
  }
}