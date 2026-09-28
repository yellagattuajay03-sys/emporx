import React from 'react';
import { RotateCcw, AlertTriangle, ArrowRight, CheckCircle2, ShieldAlert, DollarSign } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';

export const ReturnsView: React.FC = () => {
  const { returns, simulateReturn, orders, setCurrentSection } = useCommerce();

  const totalRefunded = returns.reduce((acc, r) => acc + r.refundAmount, 0);
  const totalReverseShipping = returns.reduce((acc, r) => acc + r.returnShippingCost, 0);
  const totalNetLoss = returns.reduce((acc, r) => acc + r.netLossOnReturn, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-rose-400" />
            <h2 className="text-lg font-bold text-zinc-100 tracking-tight">Returns & Reverse Logistics Intelligence</h2>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Customer return diagnostics, refund allocations, reverse shipping charges, inventory restock grading, and net profit impact.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => simulateReturn()}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Simulate New Return</span>
          </button>
        </div>
      </div>

      {/* Financial Impact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-4 space-y-1">
          <span className="text-xs text-zinc-400">Total Customer Refunds</span>
          <div className="text-2xl font-bold font-mono text-rose-400">
            ₹{totalRefunded.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-zinc-400 font-mono">
            {returns.length} orders refunded 100%
          </span>
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-4 space-y-1">
          <span className="text-xs text-zinc-400">Reverse Logistics Fees</span>
          <div className="text-2xl font-bold font-mono text-amber-400">
            ₹{totalReverseShipping.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-zinc-400 font-mono">
            Borne by seller per return policy
          </span>
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-4 space-y-1">
          <span className="text-xs text-zinc-400">Net Financial Impact</span>
          <div className="text-2xl font-bold font-mono text-zinc-100">
            -₹{totalNetLoss.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-zinc-400 font-mono">
            Unrecovered logistics & prep losses
          </span>
        </div>
      </div>

      {/* Returns Ledger Table */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-zinc-200">
            Processed Return Events
          </h3>
          <span className="text-[11px] font-mono text-zinc-400">REVERSE DISPOSITION</span>
        </div>

        <div className="divide-y divide-zinc-850">
          {returns.map(ret => (
            <div key={ret.id} className="p-4 space-y-3 hover:bg-zinc-850/40 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-rose-400">{ret.orderNumber}</span>
                  <span className="text-zinc-400">·</span>
                  <span className="text-zinc-200 font-medium">{ret.productName}</span>
                </div>
                <div className="font-mono text-zinc-400 text-[11px]">
                  {new Date(ret.timestamp).toLocaleString()}
                </div>
              </div>

              {/* Reason & Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs bg-zinc-950 p-3.5 rounded border border-zinc-850">
                <div className="sm:col-span-2 space-y-1">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase block">Return Reason</span>
                  <p className="text-zinc-300 font-medium">{ret.reason}</p>
                </div>
                <div className="space-y-1 font-mono">
                  <span className="text-[10px] text-zinc-400 uppercase block">Refund Amount</span>
                  <span className="text-rose-400 font-bold">₹{ret.refundAmount}</span>
                  <span className="text-[10px] text-zinc-400 block">+ ₹{ret.returnShippingCost} Reverse 3PL</span>
                </div>
                <div className="space-y-1 font-mono">
                  <span className="text-[10px] text-zinc-400 uppercase block">Inventory Impact</span>
                  <span className="text-emerald-400 font-semibold">
                    {ret.inventoryRestockable ? 'Restocked to FBA (+1 Unit)' : 'Damaged / Scrapped'}
                  </span>
                  <span className="text-[10px] text-zinc-400 block">Net P&L Hit: -₹{ret.netLossOnReturn}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Autonomous Memory Adaptation Callout */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-[11px] font-mono uppercase text-sky-400 font-semibold">
            Hindsight Memory Integration
          </div>
          <div className="text-sm font-semibold text-zinc-100">
            Autonomous Root-Cause Feedback Recorded
          </div>
          <p className="text-xs text-zinc-400 max-w-2xl">
            EmporX autonomous memory recorded: "Customer reported desk clearance dimension mismatch. Updating CatalogX listing with dimension infographic reduces projected return rate from 5.8% to 2.9%."
          </p>
        </div>

        <button
          onClick={() => setCurrentSection('memory')}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold text-xs rounded border border-zinc-700 transition-colors shrink-0"
        >
          <span>Verify in Hindsight Memory</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
