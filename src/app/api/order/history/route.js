import { NextResponse } from 'next/server';
import { authMiddleware } from '@/lib/auth';
import Order from '@/models/Order';
import connectDB from '@/lib/db';

export async function GET(request) {
  try {
    await connectDB();
    const auth = await authMiddleware(request);
    if (auth.error) return NextResponse.json({ success: false, message: auth.error }, { status: auth.status });

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 5;
    const status = searchParams.get('status') || '';   // optional filter
    const skip = (page - 1) * limit;

    const filter = { userId: auth.userId };
    if (status && status !== 'All') filter.status = status;

    const [orders, total, allOrders] = await Promise.all([
      Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Order.countDocuments(filter),
      Order.find({ userId: auth.userId }),   // for stats (no filter)
    ]);

    // ── Stats ──────────────────────────────────────────────────
    const totalSpent = allOrders.filter(o => o.payment).reduce((s, o) => s + o.amount, 0);
    const totalOrders = allOrders.length;
    const delivered = allOrders.filter(o => o.status.toLowerCase() === 'delivered').length;
    const pending = allOrders.filter(o => o.status.toLowerCase() !== 'delivered' && o.status.toLowerCase() !== 'cancelled').length;

    // Most ordered item
    const itemCount = {};
    allOrders.forEach(o => o.items.forEach(i => {
      itemCount[i.name] = (itemCount[i.name] || 0) + (i.quantity || 1);
    }));
    const favoriteItem = Object.entries(itemCount).sort((a, b) => b[1] - a[1])[0]?.[0] || null;

    return NextResponse.json({
      success: true,
      orders,
      pagination: { page, totalPages: Math.ceil(total / limit), total },
      stats: { totalOrders, totalSpent: +totalSpent.toFixed(2), delivered, pending, favoriteItem },
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
