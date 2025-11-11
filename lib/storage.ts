import { Order, OrderStatus } from './types';

// Try to use Vercel KV, fallback to in-memory storage for local dev
let kv: any = null;
let memoryStorage: Map<string, Order> = new Map();
let kvInitialized = false;

const ORDERS_KEY = 'orders';

// Initialize Vercel KV if available (lazy initialization)
function getKV() {
  if (kvInitialized) {
    return kv;
  }

  kvInitialized = true;

  try {
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      // Dynamic import to avoid issues if @vercel/kv is not installed
      const { createClient } = require('@vercel/kv');
      kv = createClient({
        url: process.env.KV_REST_API_URL,
        token: process.env.KV_REST_API_TOKEN,
      });
      console.log('✓ Using Vercel KV for storage');
      return kv;
    } else {
      console.log('ℹ Using in-memory storage (set KV_REST_API_URL and KV_REST_API_TOKEN for Vercel KV)');
      return null;
    }
  } catch (error) {
    console.log('⚠ Vercel KV not available, using in-memory storage:', error);
    return null;
  }
}

// Read all orders
export async function readOrders(): Promise<Order[]> {
  try {
    const kvClient = getKV();
    if (kvClient) {
      // Use Vercel KV
      const orders = await kvClient.get<Order[]>(ORDERS_KEY);
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
    const kvClient = getKV();
    if (kvClient) {
      // Use Vercel KV
      const orders = await kvClient.get<Order[]>(ORDERS_KEY) || [];
      orders.push(order);
      await kvClient.set(ORDERS_KEY, orders);
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
    const kvClient = getKV();
    if (kvClient) {
      // Use Vercel KV
      const orders = await kvClient.get<Order[]>(ORDERS_KEY) || [];
      const orderIndex = orders.findIndex((order: Order) => order.id === id);
      
      if (orderIndex === -1) {
        return false;
      }
      
      orders[orderIndex].status = status;
      await kvClient.set(ORDERS_KEY, orders);
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

