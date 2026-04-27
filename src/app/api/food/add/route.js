import { NextResponse } from 'next/server';
import Food from '@/models/Food';
import connectDB from '@/lib/db';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function POST(request) {
  try {
    await connectDB();

    const formData = await request.formData();
    const name = formData.get('name');
    const description = formData.get('description');
    const price = formData.get('price');
    const category = formData.get('category');
    const image = formData.get('image');

    if (!image) {
      return NextResponse.json({
        succeeded: false,
        message: 'Image is required'
      }, { status: 400 });
    }

    // Upload image to Cloudinary
    const uploadResult = await uploadToCloudinary(image, 'food-flow/foods');

    // Create food item
    const food = await Food.create({
      name,
      description,
      price: Number(price),
      category,
      image: uploadResult.secure_url,
      public_id: uploadResult.public_id
    });

    return NextResponse.json({
      succeeded: true,
      message: 'Food added successfully',
      food
    });

  } catch (error) {
    console.error('Add food error:', error);
    return NextResponse.json({
      succeeded: false,
      message: error.message
    }, { status: 500 });
  }
}