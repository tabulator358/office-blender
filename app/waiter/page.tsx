'use client';

import { useState, useEffect } from 'react';
import OrderCard from '@/components/OrderCard';
import { Order, OrderStatus } from '@/lib/types';

export default function WaiterPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders');
      if (!response.ok) {
        throw new Error('Nepodařilo se načíst objednávky');
      }
      const data = await response.json();
      
      // Sort orders: pending first, then by createdAt (newest first)
      const sortedOrders = data.orders.sort((a: Order, b: Order) => {
        if (a.status === 'pending' && b.status !== 'pending') return -1;
        if (a.status !== 'pending' && b.status === 'pending') return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      
      setOrders(sortedOrders);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Nepodařilo se načíst objednávky');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    
    // Auto-refresh every 5 seconds
    const interval = setInterval(fetchOrders, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleStatusUpdate = async (id: string, status: OrderStatus) => {
    try {
      const response = await fetch(`/api/orders/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Nepodařilo se aktualizovat objednávku');
      }

      // Refresh orders
      fetchOrders();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Nepodařilo se aktualizovat objednávku');
    }
  };

  const pendingOrders = orders.filter(order => order.status === 'pending');
  const processedOrders = orders.filter(order => order.status === 'processed');
  const deliveredOrders = orders.filter(order => order.status === 'delivered');

  return (
    <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink bg-clip-text text-transparent">
            Waiter Dashboard
          </h1>
          <p className="text-xl text-gray-300">
            Správa objednávek a doručení
          </p>
        </div>

        {/* Marketing Text */}
        <div className="glass rounded-2xl p-8 mb-12 border border-white/10">
          <h2 className="text-3xl font-bold text-white mb-4">Naše služba</h2>
          <div className="grid md:grid-cols-3 gap-6 text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-neon-cyan mb-2">Zdraví a wellness</h3>
              <p>
                Každý náš drink je pečlivě připraven s důrazem na zdraví a nutriční hodnotu. 
                Používáme pouze prémiové ingredience bez zbytečných přísad.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-neon-purple mb-2">Profesionální servis</h3>
              <p>
                Jsme hrdí na náš spolehlivý a efektivní servis. Každá objednávka je důležitá 
                a zpracováváme ji s maximální péčí a pozorností.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-neon-pink mb-2">Spokojenost zákazníků</h3>
              <p>
                Naším cílem je poskytnout nejlepší možný zážitek. Každý drink je připraven 
                čerstvý a doručen v přesně stanovený čas.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="glass rounded-xl p-6 border border-yellow-400/20">
            <div className="text-3xl font-bold text-yellow-400 mb-2">{pendingOrders.length}</div>
            <div className="text-gray-300">Čekající objednávky</div>
          </div>
          <div className="glass rounded-xl p-6 border border-blue-400/20">
            <div className="text-3xl font-bold text-blue-400 mb-2">{processedOrders.length}</div>
            <div className="text-gray-300">Zpracované</div>
          </div>
          <div className="glass rounded-xl p-6 border border-green-400/20">
            <div className="text-3xl font-bold text-green-400 mb-2">{deliveredOrders.length}</div>
            <div className="text-gray-300">Doručené</div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300">
            {error}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon-cyan"></div>
            <p className="mt-4 text-gray-300">Načítání objednávek...</p>
          </div>
        )}

        {/* Orders List */}
        {!isLoading && (
          <div className="space-y-8">
            {/* Pending Orders */}
            {pendingOrders.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></span>
                  Čekající objednávky ({pendingOrders.length})
                </h2>
                <div className="grid gap-4">
                  {pendingOrders.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      onStatusUpdate={handleStatusUpdate}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Processed Orders */}
            {processedOrders.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-3 h-3 bg-blue-400 rounded-full"></span>
                  Zpracované objednávky ({processedOrders.length})
                </h2>
                <div className="grid gap-4">
                  {processedOrders.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      onStatusUpdate={handleStatusUpdate}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Delivered Orders */}
            {deliveredOrders.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                  Doručené objednávky ({deliveredOrders.length})
                </h2>
                <div className="grid gap-4">
                  {deliveredOrders.map((order) => (
                    <OrderCard
                      key={order.id}
                      order={order}
                      onStatusUpdate={handleStatusUpdate}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* No Orders */}
            {orders.length === 0 && !isLoading && (
              <div className="text-center py-12 glass rounded-xl border border-white/10">
                <p className="text-gray-300 text-xl">Žádné objednávky</p>
              </div>
            )}
          </div>
        )}

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="text-neon-cyan hover:text-neon-purple transition-colors duration-300"
          >
            ← Zpět na hlavní stránku
          </a>
        </div>
      </div>
    </main>
  );
}

