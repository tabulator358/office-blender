import { NextRequest, NextResponse } from 'next/server';
import { updateOrderStatus } from '@/lib/storage';
import { OrderStatus } from '@/lib/types';

// PATCH order status
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status } = body;

    // Validation
    if (!status) {
      return NextResponse.json(
        { error: 'Missing required field: status' },
        { status: 400 }
      );
    }

    const validStatuses: OrderStatus[] = ['pending', 'processed', 'delivered'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be: pending, processed, or delivered' },
        { status: 400 }
      );
    }

    // Update order
    const success = await updateOrderStatus(id, status);

    if (!success) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, id, status });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    );
  }
}

