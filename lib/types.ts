export type Drink = 
  | 'iced banana smoothie with protein'
  | 'iced banana cocoa smoothie with protein'
  | 'iced banana smoothie with berries'
  | 'bulletproof coffee'
  | 'goat bulletproof coffee';

export type OrderStatus = 'pending' | 'processed' | 'delivered';

export interface Order {
  id: string;
  drink: Drink;
  name: string;
  time: string;
  status: OrderStatus;
  createdAt: string;
}

export const DRINKS: Drink[] = [
  'iced banana smoothie with protein',
  'iced banana cocoa smoothie with protein',
  'iced banana smoothie with berries',
  'bulletproof coffee',
  'goat bulletproof coffee',
];

export const DELIVERY_TIMES = ['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];

