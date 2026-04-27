import { NextResponse } from 'next/server';
import Food from '@/models/Food';
import connectDB from '@/lib/db';
import { deleteFromCloudinary } from '@/lib/cloudinary';

export async function DELETE(request) {
  try {
    await connectDB();

    const { id } = await request.json();

    const item = await Food.findById(id);
    if (!item) {
      return NextResponse.json({
        success: false,
        message: 'Item not found'
      }, { status: 404 });
    }

    // Remove image from Cloudinary
    if (item.public_id) {
      await deleteFromCloudinary(item.public_id);
    }

    // Delete food from DB
    await Food.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: 'Item deleted successfully',
      removedItem: item
    });

  } catch (error) {
    console.error('Remove food error:', error);
    return NextResponse.json({
      success: false,
      message: error.message
    }, { status: 500 });
  }
}