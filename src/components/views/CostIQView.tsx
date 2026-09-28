import React from 'react';
import { Calculator, ArrowRight, DollarSign, Percent, ShieldCheck } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';

export const CostIQView: React.FC = () => {
  const { costStructure, updateCostItem, updateSellingPrice, setCurrentSection } = useCommerce();

  const costItems: { key: keyof typeof costStructure; label: string; desc: string }[] = [
    { key: 'productCost', label: '1. Product Procurement Cost', desc: 'Direct supplier manufacturing cost' },
    { key: 'shipping', label: '2. Inbound Shipping & Freight', desc: 'Transit from supplier to fulfillment hub' },
    { key: 'packaging', label: '3. Custom Packaging & Inserts', desc: 'Branded box, foam protection, instruction card' },
    { key: 'marketplaceFee', label: '4. Marketplace Referral Fee (~12.5%)', desc: 'Amazon/Flipkart category commission' },
    { key: 'fulfillmentFee', label: '5. Fulfillment & Handling Fee', desc: 'FBA/FBF pick, pack, and standard shipping' },
    { key: 'advertisingCAC', label: '6. Advertising CAC (Blended)', desc: 'Sponsored keyword PPC spend per acquisition' },
    { key: 'returnCostProvision', label: '7. Return & RTO Loss Provision', desc: 'Reverse logistics buffer based on 5.8% return rate' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-zinc-100 tracking-tight">CostIQ Unit Economics</h2>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Full-stack unit economics calculator modeling landed procurement, marketplace commissions, logistics, and return provisions.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded font-mono text-[11px] text-zinc-300">
          <span>Target Selling Price: </span>
          <span className="text-amber-400 font-bold">₹{costStructure.sellingPrice}</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-4 space-y-1">
          <span className="text-xs text-zinc-400">Total Landed Cost / Unit</span>
          <div className="text-2xl font-bold font-mono text-zinc-100">
            ₹{costStructure.totalCost}
          </div>
          <span className="text-[11px] text-zinc-400 font-mono">
            {((costStructure.totalCost / costStructure.sellingPrice) * 100).toFixed(1)}% of selling price
          </span>
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-4 space-y-1">
          <span className="text-xs text-zinc-400">Net Profit / Unit</span>
          <div className="text-2xl font-bold font-mono text-emerald-400">
            ₹{costStructure.profit}
          </div>
          <span className="text-[11px] text-zinc-400 font-mono">
            Pure bottom-line contribution
          </span>
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-4 space-y-1">
          <span className="text-xs text-zinc-400">Net Profit Margin</span>
          <div className="text-2xl font-bold font-mono text-emerald-400">
            {costStructure.profitMargin}%
          </div>
          <span className="text-[11px] text-emerald-400 font-mono">
            Healthy &gt; 25% target achieved
          </span>
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-4 space-y-1">
          <span className="text-xs text-zinc-400">Break-Even Volume</span>
          <div className="text-2xl font-bold font-mono text-amber-400">
            {costStructure.breakEvenUnits} <span className="text-xs text-zinc-400 font-normal">units</span>
          </div>
          <span className="text-[11px] text-zinc-400 font-mono">
            Covers initial launch overhead
          </span>
        </div>
      </div>

      {/* Interactive Cost Breakdown Table */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-zinc-200">
            Interactive Cost Stack & Sensitivity Adjuster
          </h3>
          <span className="text-[11px] font-mono text-zinc-400">Values adjust in real-time</span>
        </div>

        <div className="divide-y divide-zinc-850 text-xs">
          {costItems.map(item => {
            const val = costStructure[item.key] as number;
            const pct = ((val / costStructure.sellingPrice) * 100).toFixed(1);
            return (
              <div key={item.key} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-zinc-850/40 transition-colors">
                <div className="space-y-0.5 max-w-md">
                  <div className="font-semibold text-zinc-200">{item.label}</div>
                  <div className="text-[11px] text-zinc-400">{item.desc}</div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <span className="font-mono text-zinc-400 text-[11px] w-14 text-right">
                    {pct}% of price
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-zinc-400">₹</span>
                    <input
                      type="number"
                      value={val}
                      onChange={e => updateCostItem(item.key, Number(e.target.value))}
                      className="w-24 bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-right font-mono text-zinc-100 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Summary */}
        <div className="p-4 bg-zinc-950 border-t border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="text-zinc-400">Selling Price: <strong className="text-zinc-200">₹{costStructure.sellingPrice}</strong></span>
            <span className="text-zinc-400">− Total Costs: <strong className="text-zinc-200">₹{costStructure.totalCost}</strong></span>
            <span className="text-emerald-400">= Net Profit: <strong>₹{costStructure.profit} ({costStructure.profitMargin}%)</strong></span>
          </div>

          <button
            onClick={() => setCurrentSection('channelx')}
            className="flex items-center justify-center gap-2 px-5 py-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs rounded transition-colors"
          >
            <span>Compare Sales Channels in ChannelX</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
