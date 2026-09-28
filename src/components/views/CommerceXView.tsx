import React from 'react';
import { Boxes, ShoppingCart, RotateCcw, AlertTriangle, Plus, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';

export const CommerceXView: React.FC = () => {
  const { inventory, orders, returns, simulateNewOrder, setCurrentSection, selectedProduct } = useCommerce();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Boxes className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-zinc-100 tracking-tight">CommerceX Operations & Inventory</h2>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Active simulated commerce state: warehouse inventory, reservations, customer orders queue, and payment reconciliation.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => simulateNewOrder()}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs rounded transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Simulate Customer Order</span>
          </button>
        </div>
      </div>

      {/* Inventory Status Cards */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-zinc-200">
              Live Warehouse Inventory Tracking
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded">
              Synced with FBA Hub
            </span>
          </div>
          <span className="text-xs font-mono text-zinc-400">SKU: {inventory[0]?.sku}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="bg-zinc-950 p-4 rounded border border-zinc-850">
            <span className="text-[11px] font-mono text-zinc-400 block uppercase">In Stock (Available)</span>
            <span className="text-2xl font-bold font-mono text-emerald-400">
              {inventory[0]?.inStock || 0}
            </span>
            <span className="text-[10px] text-zinc-400 block mt-1">Ready for same-day dispatch</span>
          </div>

          <div className="bg-zinc-950 p-4 rounded border border-zinc-850">
            <span className="text-[11px] font-mono text-zinc-400 block uppercase">Reserved for Orders</span>
            <span className="text-2xl font-bold font-mono text-amber-400">
              {inventory[0]?.reserved || 0}
            </span>
            <span className="text-[10px] text-zinc-400 block mt-1">Under pick & pack pipeline</span>
          </div>

          <div className="bg-zinc-950 p-4 rounded border border-zinc-850">
            <span className="text-[11px] font-mono text-zinc-400 block uppercase">Inbound Transit</span>
            <span className="text-2xl font-bold font-mono text-sky-400">
              {inventory[0]?.inTransit || 0}
            </span>
            <span className="text-[10px] text-zinc-400 block mt-1">PO awaiting supplier dispatch</span>
          </div>

          <div className="bg-zinc-950 p-4 rounded border border-zinc-850">
            <span className="text-[11px] font-mono text-zinc-400 block uppercase">Reorder Threshold</span>
            <span className="text-2xl font-bold font-mono text-zinc-300">
              {inventory[0]?.reorderPoint || 20}
            </span>
            <span className="text-[10px] text-zinc-400 block mt-1">Triggers autonomous Praxis PO</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-zinc-400 bg-zinc-950 p-3 rounded border border-zinc-850">
          <span>Primary Fulfillment Hub: <strong>{inventory[0]?.location}</strong></span>
          <span className="font-mono">Unit Landed Cost: <strong>₹{inventory[0]?.unitLandedCost}</strong></span>
        </div>
      </div>

      {/* Orders Quick Summary and Routing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-emerald-400" />
                <h3 className="text-sm font-semibold text-zinc-200">Active Order Stream</h3>
              </div>
              <span className="text-xs font-mono text-zinc-400">{orders.length} total orders</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed mb-3">
              Observe customer purchases moving through Placed → Confirmed → Packed → Shipped → Delivered.
            </p>
            <div className="space-y-2">
              {orders.slice(0, 3).map(o => (
                <div key={o.id} className="p-2.5 bg-zinc-950 rounded border border-zinc-850 flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="text-zinc-200 font-bold">{o.orderNumber}</span>
                    <span className="text-zinc-400 text-[11px] ml-2">({o.customerName})</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-zinc-900 text-amber-400 capitalize">
                    {o.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setCurrentSection('orders')}
            className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium rounded transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Open Orders Lifecycle Simulator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-rose-400" />
                <h3 className="text-sm font-semibold text-zinc-200">Returns & Reverse Operations</h3>
              </div>
              <span className="text-xs font-mono text-zinc-400">{returns.length} processed</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed mb-3">
              Track return reasons, customer refund disbursement, reverse logistics freight, and restocking impact.
            </p>
            <div className="space-y-2">
              {returns.slice(0, 2).map(r => (
                <div key={r.id} className="p-2.5 bg-zinc-950 rounded border border-zinc-850 text-xs space-y-1">
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-rose-400 font-bold">Return: {r.orderNumber}</span>
                    <span className="text-zinc-400">Refund: ₹{r.refundAmount}</span>
                  </div>
                  <div className="text-zinc-300 text-[11px] truncate">{r.reason}</div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setCurrentSection('returns')}
            className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium rounded transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Manage Returns & Observe Profit Impact</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
