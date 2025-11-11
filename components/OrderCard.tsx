'use client';

import { Order, OrderStatus } from '@/lib/types';

interface OrderCardProps {
  order: Order;
  onStatusUpdate: (id: string, status: OrderStatus) => void;
}

export default function OrderCard({ order, onStatusUpdate }: OrderCardProps) {
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-400 border-yellow-400/50';
      case 'processed':
        return 'text-blue-400 border-blue-400/50';
      case 'delivered':
        return 'text-green-400 border-green-400/50';
      default:
        return 'text-gray-400 border-gray-400/50';
    }
  };

  const getStatusLabel = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 'Čeká';
      case 'processed':
        return 'Zpracováno';
      case 'delivered':
        return 'Doručeno';
      default:
        return status;
    }
  };

  const getNextStatus = (currentStatus: OrderStatus): OrderStatus | null => {
    switch (currentStatus) {
      case 'pending':
        return 'processed';
      case 'processed':
        return 'delivered';
      case 'delivered':
        return null;
      default:
        return null;
    }
  };

  const nextStatus = getNextStatus(order.status);

  return (
    <div className="glass-strong rounded-xl p-6 border border-white/10 hover:border-neon-purple/50 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white mb-2">{order.drink}</h3>
          <p className="text-gray-300 mb-1">
            <span className="text-neon-cyan">Jméno:</span> {order.name}
          </p>
          <p className="text-gray-300 mb-1">
            <span className="text-neon-cyan">Čas doručení:</span> {order.time}
          </p>
          <p className="text-gray-400 text-sm">
            Objednáno: {new Date(order.createdAt).toLocaleString('cs-CZ')}
          </p>
        </div>
        <div className={`px-3 py-1 rounded-full border ${getStatusColor(order.status)}`}>
          {getStatusLabel(order.status)}
        </div>
      </div>
      {nextStatus && (
        <button
          onClick={() => onStatusUpdate(order.id, nextStatus)}
          className="w-full py-2 px-4 bg-gradient-to-r from-neon-purple to-neon-pink rounded-lg text-white font-medium hover:shadow-lg hover:shadow-neon-purple/50 transition-all duration-300"
        >
          {nextStatus === 'processed' ? 'Označit jako zpracované' : 'Označit jako doručené'}
        </button>
      )}
    </div>
  );
}

