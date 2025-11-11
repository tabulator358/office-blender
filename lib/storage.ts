import { Order, OrderStatus } from './types';

// In-memory storage for orders
const memoryStorage: Map<string, Order> = new Map();

// Read all orders
export async function readOrders(): Promise<Order[]> {
  try {
    return Array.from(memoryStorage.values());
  } catch (error) {
    console.error('Error reading orders:', error);
    return [];
  }
}

// Write order
export async function writeOrder(order: Order): Promise<void> {
  try {
    if (memoryStorage.has(order.id)) {
      console.warn(`Order with ID ${order.id} already exists, skipping duplicate`);
      return;
    }
    memoryStorage.set(order.id, order);
    console.log(`✓ Order ${order.id} saved to in-memory storage`);
  } catch (error) {
    console.error('Error writing order:', error);
    throw error;
  }
}

// Update order status
export async function updateOrderStatus(id: string, status: OrderStatus): Promise<boolean> {
  try {
    const order = memoryStorage.get(id);
    if (!order) {
      console.warn(`Order with ID ${id} not found`);
      return false;
    }
    order.status = status;
    memoryStorage.set(id, order);
    return true;
  } catch (error) {
    console.error('Error updating order status:', error);
    return false;
  }
}

