import React from 'react';
import { Truck, Package, Warehouse, RefreshCw, CheckCircle2, ArrowRight } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';

export const FulfillmentView: React.FC = () => {
  const { setCurrentSection } = useCommerce();

  const comparison = [
    {
      dimension: 'Who Stores Inventory?',
      sellerFulfilled: 'Seller (Home, local garage, rented storage space)',
      providerFulfilled: 'Fulfillment Provider (Amazon FBA / Flipkart FBF Warehouse)',
      advantage: 'Provider: Zero physical warehouse overhead for merchant'
    },
    {
      dimension: 'Who Packs & Labels?',
      sellerFulfilled: 'Seller manually packs each box with tape and shipping label',
      providerFulfilled: 'Automated warehouse robotics & barcode scan packing',
      advantage: 'Provider: Eliminates human packing labor and delays'
    },
    {
      dimension: 'Who Ships & Delivers?',
      sellerFulfilled: 'Courier pickup (Delhivery/BlueDart) within 24-48 hrs',
      providerFulfilled: 'Dedicated express fleet with Prime / Assured 1-2 day guarantee',
      advantage: 'Provider: 3.8x higher customer conversion velocity'
    },
    {
      dimension: 'Who Handles Returns?',
      sellerFulfilled: 'Seller inspects returned box, disputes damage manually',
      providerFulfilled: 'Automated warehouse return grading & restocking',
      advantage: 'Provider: Standardized return SLA, though return fees apply'
    },
    {
      dimension: 'What are the Costs?',
      sellerFulfilled: 'Courier ~₹75 + Packing ~₹25 + Labor ~₹20 = ₹120/unit',
      providerFulfilled: 'FBA Pick & Pack fee: ₹65 + Storage: ₹8/mo = ₹73/unit',
      advantage: 'Provider: Cheaper by ₹47/unit for 260g laptop stand'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-zinc-100 tracking-tight">
              Fulfillment Intelligence: Seller vs Provider
            </h2>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Operational workflow comparison, custody hand-offs, cost models, and return management architectures.
          </p>
        </div>
        <div className="font-mono text-[11px] text-zinc-400 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded">
          Active Strategy: <span className="text-emerald-400 font-semibold">Provider Fulfilled (FBA/FBF)</span>
        </div>
      </div>

      {/* Visual Workflow Diagram */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Seller-Fulfilled Flow */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <Warehouse className="w-4 h-4 text-zinc-400" />
              <h3 className="text-sm font-bold text-zinc-200 uppercase tracking-wider font-mono">
                Seller-Fulfilled Model (FBM / Direct)
              </h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 bg-zinc-800 text-zinc-300 rounded">
              High Effort
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            {[
              { step: '1. Store', text: 'Seller stores inventory in personal warehouse or home' },
              { step: '2. Pack', text: 'Seller personally packages order with foam & shipping label' },
              { step: '3. Ship', text: 'Logistics 3PL courier partner arrives for scheduled pickup' },
              { step: '4. Delivery', text: 'Customer receives product in 3–5 business days' },
              { step: '5. Returns', text: 'Return handled according to seller manual inspection process' }
            ].map(s => (
              <div key={s.step} className="bg-zinc-950 p-3 rounded border border-zinc-850 flex items-center gap-3">
                <span className="font-mono text-[11px] text-amber-400 font-bold shrink-0">{s.step}</span>
                <span className="text-zinc-300">{s.text}</span>
              </div>
            ))}
          </div>

          <div className="text-[11px] text-zinc-400 font-mono bg-zinc-950/60 p-3 rounded border border-zinc-850">
            Total Operational Burden: High. Requires daily physical packing and courier coordination.
          </div>
        </div>

        {/* Provider-Fulfilled Flow */}
        <div className="bg-zinc-900/80 border border-emerald-500/30 rounded-lg p-5 space-y-4 shadow-lg ring-1 ring-emerald-500/20">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-emerald-300 uppercase tracking-wider font-mono">
                Provider-Fulfilled Model (FBA / FBF)
              </h3>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded font-semibold">
              Autonomous Recommendation
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            {[
              { step: '1. Store', text: 'Seller sends bulk batch (100 units) to Amazon/Flipkart FC' },
              { step: '2. Pack', text: 'Provider robotics & staff pack order immediately on checkout' },
              { step: '3. Ship', text: 'Provider express air/surface network delivers in 24–48 hours' },
              { step: '4. Prime', text: 'Customer receives Prime / Assured guaranteed fast delivery' },
              { step: '5. Returns', text: 'Provider handles automated return grading, refund, & restock' }
            ].map(s => (
              <div key={s.step} className="bg-zinc-950 p-3 rounded border border-zinc-850 flex items-center gap-3">
                <span className="font-mono text-[11px] text-emerald-400 font-bold shrink-0">{s.step}</span>
                <span className="text-zinc-200 font-medium">{s.text}</span>
              </div>
            ))}
          </div>

          <div className="text-[11px] text-emerald-400 font-mono bg-zinc-950/60 p-3 rounded border border-zinc-850">
            Total Operational Burden: Minimal. Enables autonomous commerce operations with zero packing labor.
          </div>
        </div>
      </div>

      {/* Detailed Side-by-Side Comparison Matrix */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-zinc-800">
          <h3 className="text-sm font-semibold text-zinc-200">
            Operational Matrix: Who Stores, Packs, Ships, and Handles Returns?
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-950 text-zinc-400 font-mono uppercase text-[10px] border-b border-zinc-850">
              <tr>
                <th className="py-3 px-4">Operational Dimension</th>
                <th className="py-3 px-4">Seller-Fulfilled</th>
                <th className="py-3 px-4">Provider-Fulfilled (FBA/FBF)</th>
                <th className="py-3 px-4">EmporX Strategic Decision</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-850">
              {comparison.map(c => (
                <tr key={c.dimension} className="hover:bg-zinc-850/40 transition-colors">
                  <td className="py-3 px-4 font-semibold text-zinc-200">{c.dimension}</td>
                  <td className="py-3 px-4 text-zinc-400">{c.sellerFulfilled}</td>
                  <td className="py-3 px-4 text-emerald-300 font-medium">{c.providerFulfilled}</td>
                  <td className="py-3 px-4 text-zinc-300 font-mono text-[11px]">{c.advantage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Forward Button */}
      <div className="flex justify-end">
        <button
          onClick={() => setCurrentSection('pricing')}
          className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs rounded transition-colors"
        >
          <span>Proceed to PriceX Optimization</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
