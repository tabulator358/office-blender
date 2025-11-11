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
      // Use dynamic require to avoid build-time issues
      // eslint-disable-next-line @typescript-eslint/no-require-imports
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
      const orders = await kvClient.get(ORDERS_KEY) as Order[] | null;
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
      const orders = (await kvClient.get(ORDERS_KEY) as Order[] | null) || [];
      // Check if order with same ID already exists (shouldn't happen, but safety check)
      const existingIndex = orders.findIndex((o: Order) => o.id === order.id);
      if (existingIndex >= 0) {
        console.warn(`Order with ID ${order.id} already exists, skipping duplicate`);
        return;
      }
      orders.push(order);
      await kvClient.set(ORDERS_KEY, orders);
      console.log(`✓ Order ${order.id} saved to Vercel KV`);
    } else {
      // Use in-memory storage
      if (memoryStorage.has(order.id)) {
        console.warn(`Order with ID ${order.id} already exists, skipping duplicate`);
        return;
      }
      memoryStorage.set(order.id, order);
      console.log(`✓ Order ${order.id} saved to in-memory storage`);
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
      const orders = (await kvClient.get(ORDERS_KEY) as Order[] | null) || [];
      const orderIndex = orders.findIndex((order: Order) => order.id === id);
      
      if (orderIndex === -1) {
        console.warn(`Order with ID ${id} not found`);
        return false;
      }
      
      // Create a new array to avoid mutation issues
      const updatedOrders = [...orders];
      updatedOrders[orderIndex] = { ...updatedOrders[orderIndex], status };
      await kvClient.set(ORDERS_KEY, updatedOrders);
      return true;
    } else {
      // Use in-memory storage
      const order = memoryStorage.get(id);
      if (!order) {
        console.warn(`Order with ID ${id} not found`);
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

