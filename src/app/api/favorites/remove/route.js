import { NextResponse } from 'next/server';
import { authMiddleware } from '@/lib/auth';
import User from '@/models/User';
import connectDB from '@/lib/db';

export async function DELETE(request) {
  try {
    await connectDB();
    const auth = await authMiddleware(request);
    if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });

    const { itemId } = await request.json();
    const user = await User.findById(auth.userId);
    const favorites = (user.favorites || []).filter(id => id !== itemId);

    await User.findByIdAndUpdate(auth.userId, { favorites });

    return NextResponse.json({ success: true, favorites, message: 'Removed from favorites' });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
