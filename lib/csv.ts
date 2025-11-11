import { Order, OrderStatus } from './types';
import fs from 'fs';
import path from 'path';

const CSV_FILE_PATH = path.join(process.cwd(), 'data', 'orders.csv');
const CSV_HEADER = 'id,drink,name,time,status,createdAt\n';

// Ensure data directory exists
function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(CSV_FILE_PATH)) {
    fs.writeFileSync(CSV_FILE_PATH, CSV_HEADER, 'utf-8');
  }
}

// Parse CSV field (handle quoted fields)
function parseCSVField(field: string): string {
  field = field.trim();
  if (field.startsWith('"') && field.endsWith('"')) {
    return field.slice(1, -1).replace(/""/g, '"');
  }
  return field;
}

// Parse CSV line to Order
function parseCSVLine(line: string): Order | null {
  const fields: string[] = [];
  let currentField = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    const nextChar = line[i + 1];
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentField += '"';
        i++; // Skip next quote
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      fields.push(currentField);
      currentField = '';
    } else {
      currentField += char;
    }
  }
  fields.push(currentField); // Add last field
  
  if (fields.length !== 6) {
    return null;
  }
  
  const [id, drink, name, time, status, createdAt] = fields.map(parseCSVField);
  
  if (!id || !drink || !name || !time || !status || !createdAt) {
    return null;
  }
  
  return {
    id,
    drink: drink as Order['drink'],
    name,
    time,
    status: status as OrderStatus,
    createdAt,
  };
}

// Escape CSV field (handle commas and quotes)
function escapeCSVField(field: string): string {
  if (field.includes(',') || field.includes('"') || field.includes('\n')) {
    return `"${field.replace(/"/g, '""')}"`;
  }
  return field;
}

// Convert Order to CSV line
function orderToCSVLine(order: Order): string {
  return [
    escapeCSVField(order.id),
    escapeCSVField(order.drink),
    escapeCSVField(order.name),
    escapeCSVField(order.time),
    escapeCSVField(order.status),
    escapeCSVField(order.createdAt),
  ].join(',') + '\n';
}

// Read all orders from CSV
export function readOrders(): Order[] {
  ensureDataDirectory();
  
  try {
    const fileContent = fs.readFileSync(CSV_FILE_PATH, 'utf-8');
    const lines = fileContent.trim().split('\n');
    
    // Skip header
    const orderLines = lines.slice(1);
    
    return orderLines
      .map(parseCSVLine)
      .filter((order): order is Order => order !== null);
  } catch (error) {
    console.error('Error reading orders from CSV:', error);
    return [];
  }
}

// Write order to CSV
export function writeOrder(order: Order): void {
  ensureDataDirectory();
  
  try {
    const csvLine = orderToCSVLine(order);
    fs.appendFileSync(CSV_FILE_PATH, csvLine, 'utf-8');
  } catch (error) {
    console.error('Error writing order to CSV:', error);
    throw error;
  }
}

// Update order status in CSV
export function updateOrderStatus(id: string, status: OrderStatus): boolean {
  ensureDataDirectory();
  
  try {
    const orders = readOrders();
    const orderIndex = orders.findIndex(order => order.id === id);
    
    if (orderIndex === -1) {
      return false;
    }
    
    orders[orderIndex].status = status;
    
    // Rewrite entire file
    const csvContent = CSV_HEADER + orders.map(orderToCSVLine).join('');
    fs.writeFileSync(CSV_FILE_PATH, csvContent, 'utf-8');
    
    return true;
  } catch (error) {
    console.error('Error updating order status:', error);
    return false;
  }
}

// Escape CSV field (handle commas and quotes)
function escapeCSVField(field: string): string {
  if (field.includes(',') || field.includes('"') || field.includes('\n')) {
    return `"${field.replace(/"/g, '""')}"`;
  }
  return field;
}

