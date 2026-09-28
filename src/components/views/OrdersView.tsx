import React from 'react';
import { ShoppingCart, Plus, CheckCircle2, Truck, ArrowRight, RotateCcw } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import { OrderStatus } from '../../types';

export const OrdersView: React.FC = () => {
  const { orders, advanceOrderStatus, simulateNewOrder, simulateReturn, setCurrentSection } = useCommerce();

  const lifecycleStages: { key: OrderStatus; label: string }[] = [
    { key: 'placed', label: 'Placed' },
    { key: 'confirmed', label: 'Confirmed' },
    { key: 'packed', label: 'Packed' },
    { key: 'shipped', label: 'Shipped' },
    { key: 'delivered', label: 'Delivered' }
  ];

  const getStageIndex = (status: OrderStatus) => {
    if (status === 'returned') return 5;
    return lifecycleStages.findIndex(s => s.key === status);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-zinc-100 tracking-tight">Orders Lifecycle Simulator</h2>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Simulate and step orders through each operational milestone: Placed → Confirmed → Packed → Shipped → Delivered.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => simulateNewOrder()}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs rounded transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Simulate New Customer Order</span>
          </button>
        </div>
      </div>

      {/* Orders Table & Lifecycle Stepper */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-zinc-200">
            Simulated Orders Queue ({orders.length} Records)
          </h3>
          <span className="text-[11px] font-mono text-zinc-400">DEMO COMMERCE OPERATIONS</span>
        </div>

        <div className="divide-y divide-zinc-850">
          {orders.map(order => {
            const currentIdx = getStageIndex(order.status);
            const isDelivered = order.status === 'delivered';
            const isReturned = order.status === 'returned';

            return (
              <div key={order.id} className="p-4 space-y-3 hover:bg-zinc-850/40 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-mono font-bold text-zinc-100">{order.orderNumber}</span>
                    <span className="text-zinc-400">·</span>
                    <span className="text-zinc-300 font-medium">{order.customerName}</span>
                    <span className="text-zinc-500 font-mono text-[11px]">({order.customerCity})</span>
                  </div>

                  <div className="flex items-center gap-3 font-mono">
                    <span className="text-zinc-400 capitalize">{order.channel}</span>
                    <span className="text-zinc-400">·</span>
                    <span className="text-zinc-100 font-bold">₹{order.totalAmount}</span>
                    <span className="text-zinc-400">·</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold uppercase ${
                        isReturned
                          ? 'bg-rose-500/10 text-rose-400'
                          : isDelivered
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-amber-400/10 text-amber-400'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                {/* 5-Step Visual Stepper */}
                <div className="grid grid-cols-5 gap-1 pt-1">
                  {lifecycleStages.map((stage, idx) => {
                    const isCompleted = currentIdx >= idx;
                    const isCurrent = currentIdx === idx;
                    return (
                      <div
                        key={stage.key}
                        className={`p-1.5 rounded border text-center text-[10px] font-mono transition-colors ${
                          isReturned
                            ? 'bg-zinc-950 border-zinc-850 text-zinc-600'
                            : isCurrent
                            ? 'bg-amber-400/10 border-amber-400/40 text-amber-300 font-bold'
                            : isCompleted
                            ? 'bg-zinc-950 border-emerald-500/30 text-emerald-400'
                            : 'bg-zinc-950 border-zinc-850 text-zinc-600'
                        }`}
                      >
                        <div className="truncate">{stage.label}</div>
                      </div>
                    );
                  })}
                </div>

                {/* Action Bar */}
                <div className="flex items-center justify-between pt-1 text-xs">
                  <div className="text-[11px] font-mono text-zinc-400">
                    {order.trackingNumber ? `Tracking: ${order.trackingNumber}` : 'Awaiting fulfillment dispatch'}
                  </div>

                  <div className="flex items-center gap-2">
                    {!isDelivered && !isReturned && (
                      <button
                        onClick={() => advanceOrderStatus(order.id)}
                        className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded font-medium text-[11px] transition-colors flex items-center gap-1"
                      >
                        <span>Advance to Next Status</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    )}

                    {isDelivered && (
                      <button
                        onClick={() => {
                          simulateReturn(order.id);
                          setCurrentSection('returns');
                        }}
                        className="px-2.5 py-1 bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 rounded font-medium text-[11px] transition-colors flex items-center gap-1"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Simulate Return & Refund</span>
                      </button>
                    )}

                    {isReturned && (
                      <span className="text-rose-400 text-[11px] font-mono">
                        Return Processed (Refund: ₹{order.refundAmount})
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
