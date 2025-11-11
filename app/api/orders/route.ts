import { NextRequest, NextResponse } from 'next/server';
import { readOrders, writeOrder } from '@/lib/storage';
import { sendOrderEmail, sendOrderEmailToMultiple } from '@/lib/email';
import { Order, DRINKS, DELIVERY_TIMES } from '@/lib/types';
import { randomUUID } from 'crypto';

// GET all orders
export async function GET() {
  try {
    const orders = await readOrders();
    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

// POST new order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { drink, name, time } = body;

    // Validation
    if (!drink || !name || !time) {
      return NextResponse.json(
        { error: 'Missing required fields: drink, name, time' },
        { status: 400 }
      );
    }

    if (!DRINKS.includes(drink)) {
      return NextResponse.json(
        { error: 'Invalid drink selection' },
        { status: 400 }
      );
    }

    if (!DELIVERY_TIMES.includes(time)) {
      return NextResponse.json(
        { error: 'Invalid delivery time' },
        { status: 400 }
      );
    }

    if (!name.trim()) {
      return NextResponse.json(
        { error: 'Name cannot be empty' },
        { status: 400 }
      );
    }

    // Create order
    const order: Order = {
      id: randomUUID(),
      drink: drink as Order['drink'],
      name: name.trim(),
      time,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    // Send email notification (non-blocking)
    const orderEmails = process.env.ORDER_EMAILS || process.env.ORDER_EMAIL;
    if (orderEmails) {
      const emails = orderEmails.split(',').map((e: string) => e.trim()).filter(Boolean);
      if (emails.length > 0) {
        console.log(`📧 Sending order email to: ${emails.join(', ')}`);
        // Send email asynchronously (don't wait for it)
        sendOrderEmailToMultiple(order, emails)
          .then((success) => {
            if (success) {
              console.log(`✓ Order email sent successfully for order ${order.id}`);
            } else {
              console.warn(`⚠ Order email failed to send for order ${order.id} - check RESEND_API_KEY`);
            }
          })
          .catch((error) => {
            console.error('❌ Failed to send order email:', error);
            // Don't fail the request if email fails
          });
      } else {
        console.warn('⚠ ORDER_EMAIL/ORDER_EMAILS is set but no valid email addresses found');
      }
    } else {
      console.warn('⚠ ORDER_EMAIL/ORDER_EMAILS not set - emails will not be sent. Set ORDER_EMAIL or ORDER_EMAILS environment variable to enable email notifications.');
    }

    // Write to storage (for waiter dashboard)
    await writeOrder(order);

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

