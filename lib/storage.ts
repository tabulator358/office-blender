import { Order, OrderStatus } from './types';

// Try to use Vercel KV, fallback to in-memory storage for local dev
let kv: any = null;
let memoryStorage: Map<string, Order> = new Map();

// Initialize Vercel KV if available
try {
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    const { createClient } = require('@vercel/kv');
    kv = createClient({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    });
    console.log('Using Vercel KV for storage');
  } else {
    console.log('Using in-memory storage (set KV_REST_API_URL and KV_REST_API_TOKEN for Vercel KV)');
  }
} catch (error) {
  console.log('Vercel KV not available, using in-memory storage');
}

const ORDERS_KEY = 'orders';

// Read all orders
export async function readOrders(): Promise<Order[]> {
  try {
    if (kv) {
      // Use Vercel KV
      const orders = await kv.get<Order[]>(ORDERS_KEY);
      return orders || [];
    } else {
      // Use in-memory storage
      return Array.from(memoryStorage.values());
    }
  } catch (error) {
    console.error('Error reading orders:', error);
    return [];
  }
}

// Write order
export async function writeOrder(order: Order): Promise<void> {
  try {
    if (kv) {
      // Use Vercel KV
      const orders = await kv.get<Order[]>(ORDERS_KEY) || [];
      orders.push(order);
      await kv.set(ORDERS_KEY, orders);
    } else {
      // Use in-memory storage
      memoryStorage.set(order.id, order);
    }
  } catch (error) {
    console.error('Error writing order:', error);
    throw error;
  }
}

// Update order status
export async function updateOrderStatus(id: string, status: OrderStatus): Promise<boolean> {
  try {
    if (kv) {
      // Use Vercel KV
      const orders = await kv.get<Order[]>(ORDERS_KEY) || [];
      const orderIndex = orders.findIndex((order: Order) => order.id === id);
      
      if (orderIndex === -1) {
        return false;
      }
      
      orders[orderIndex].status = status;
      await kv.set(ORDERS_KEY, orders);
      return true;
    } else {
      // Use in-memory storage
      const order = memoryStorage.get(id);
      if (!order) {
        return false;
      }
      order.status = status;
      memoryStorage.set(id, order);
      return true;
    }
  } catch (error) {
    console.error('Error updating order status:', error);
    return false;
  }
}

