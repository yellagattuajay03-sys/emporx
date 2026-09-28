import React from 'react';
import { BarChart3, TrendingUp, DollarSign, Percent, ArrowUpRight, ArrowDownRight, RotateCcw } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';

export const RevOptView: React.FC = () => {
  const { orders, returns, costStructure, selectedProduct } = useCommerce();

  const activeOrders = orders.filter(o => o.status !== 'returned');
  const revenue = activeOrders.reduce((acc, o) => acc + o.totalAmount, 0);
  const totalOrdersCount = orders.length;
  const aov = totalOrdersCount > 0 ? Math.round(revenue / Math.max(1, activeOrders.length)) : costStructure.sellingPrice;
  const returnCount = returns.length;
  const returnRate = totalOrdersCount > 0 ? ((returnCount / totalOrdersCount) * 100).toFixed(1) : '5.8';

  const totalCOGS = activeOrders.length * (costStructure.productCost + costStructure.shipping + costStructure.packaging);
  const grossProfit = revenue - totalCOGS;
  const totalOperatingCosts = activeOrders.length * (costStructure.marketplaceFee + costStructure.fulfillmentFee + costStructure.advertisingCAC);
  const totalReturnLosses = returns.reduce((acc, r) => acc + r.netLossOnReturn, 0);
  const netProfit = Math.max(0, grossProfit - totalOperatingCosts - totalReturnLosses);
  const netMargin = revenue > 0 ? ((netProfit / revenue) * 100).toFixed(1) : costStructure.profitMargin.toString();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-zinc-100 tracking-tight">RevOpt Profitability & P&L Analytics</h2>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Full-stack commerce financial statements: gross revenue, landed COGS, marketplace commissions, logistics, and bottom-line margin.
          </p>
        </div>
        <div className="font-mono text-[11px] text-zinc-400 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded">
          Net Margin: <span className="text-emerald-400 font-bold">{netMargin}%</span>
        </div>
      </div>

      {/* Primary Financial KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-4 space-y-1">
          <span className="text-xs text-zinc-400">Gross Commercial Revenue</span>
          <div className="text-2xl font-bold font-mono text-zinc-100">
            ₹{revenue.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-zinc-400 font-mono">From {activeOrders.length} delivered orders</span>
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-4 space-y-1">
          <span className="text-xs text-zinc-400">Gross Profit (Pre-Ops)</span>
          <div className="text-2xl font-bold font-mono text-emerald-400">
            ₹{grossProfit.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-emerald-400 font-mono">
            {revenue > 0 ? ((grossProfit / revenue) * 100).toFixed(1) : '64.5'}% Gross Margin
          </span>
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-4 space-y-1">
          <span className="text-xs text-zinc-400">Bottom-Line Net Profit</span>
          <div className="text-2xl font-bold font-mono text-emerald-400">
            ₹{netProfit.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-zinc-400 font-mono">
            Net Margin: <strong className="text-emerald-400">{netMargin}%</strong>
          </span>
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-4 space-y-1">
          <span className="text-xs text-zinc-400">AOV & Return Rate</span>
          <div className="text-xl font-bold font-mono text-zinc-100">
            ₹{aov} <span className="text-xs font-normal text-zinc-400">/ {returnRate}% ret</span>
          </div>
          <span className="text-[11px] text-zinc-400 font-mono">{totalOrdersCount} Total Transactions</span>
        </div>
      </div>

      {/* Financial Statement Breakdown */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-5 space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <h3 className="text-sm font-semibold text-zinc-200">
            Profit & Loss (P&L) Waterfall Statement
          </h3>
          <span className="text-[11px] font-mono text-zinc-400">LIVE RECONCILIATION</span>
        </div>

        <div className="space-y-2 text-xs font-mono">
          <div className="p-3 bg-zinc-950 rounded border border-zinc-850 flex justify-between">
            <span className="text-zinc-200 font-bold">1. Gross Merchandise Value (GMV)</span>
            <span className="text-zinc-100 font-bold">₹{revenue.toLocaleString('en-IN')}</span>
          </div>

          <div className="p-3 bg-zinc-950 rounded border border-zinc-850 flex justify-between text-zinc-400 pl-6">
            <span>− Cost of Goods Sold (Procurement + Freight + Packaging)</span>
            <span className="text-rose-400">−₹{totalCOGS.toLocaleString('en-IN')}</span>
          </div>

          <div className="p-3 bg-zinc-950 rounded border border-zinc-850 flex justify-between font-semibold">
            <span className="text-zinc-200">2. Gross Profit</span>
            <span className="text-emerald-400">₹{grossProfit.toLocaleString('en-IN')}</span>
          </div>

          <div className="p-3 bg-zinc-950 rounded border border-zinc-850 flex justify-between text-zinc-400 pl-6">
            <span>− Marketplace Commissions (Amazon 12.5% Referral)</span>
            <span className="text-rose-400">−₹{Math.round(activeOrders.length * costStructure.marketplaceFee).toLocaleString('en-IN')}</span>
          </div>

          <div className="p-3 bg-zinc-950 rounded border border-zinc-850 flex justify-between text-zinc-400 pl-6">
            <span>− FBA Pick, Pack, & Fulfillment Logistics Fees</span>
            <span className="text-rose-400">−₹{Math.round(activeOrders.length * costStructure.fulfillmentFee).toLocaleString('en-IN')}</span>
          </div>

          <div className="p-3 bg-zinc-950 rounded border border-zinc-850 flex justify-between text-zinc-400 pl-6">
            <span>− GrowthX Advertising & Customer Acquisition (CAC)</span>
            <span className="text-rose-400">−₹{Math.round(activeOrders.length * costStructure.advertisingCAC).toLocaleString('en-IN')}</span>
          </div>

          <div className="p-3 bg-zinc-950 rounded border border-zinc-850 flex justify-between text-zinc-400 pl-6">
            <span>− Reverse Logistics & Return Scrap Write-down</span>
            <span className="text-rose-400">−₹{totalReturnLosses.toLocaleString('en-IN')}</span>
          </div>

          <div className="p-4 bg-emerald-500/10 rounded border border-emerald-500/30 flex justify-between text-sm font-bold">
            <span className="text-emerald-300">3. Net Commercial Profit (EBIT)</span>
            <span className="text-emerald-400">₹{netProfit.toLocaleString('en-IN')} ({netMargin}%)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
