import React from 'react';
import { LineChart, TrendingUp, Users, Target, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';

export const MarketIQView: React.FC = () => {
  const { selectedProduct, products, setSelectedProduct, setCurrentSection } = useCommerce();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <LineChart className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-zinc-100 tracking-tight">MarketIQ Research</h2>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Category market sizing, competitor saturation index, and real-time opportunity scoring.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded font-mono text-[11px] text-amber-400">
          <span>● DEMO / SIMULATED MARKET TELEMETRY</span>
        </div>
      </div>

      {/* Primary Category Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-4 space-y-1.5">
          <div className="text-xs text-zinc-400 flex items-center justify-between">
            <span>Market Size (Annual)</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-zinc-100">
            ₹{selectedProduct.marketSizeInCrores} Cr
          </div>
          <div className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>+{selectedProduct.growthYoY}% YoY Growth</span>
          </div>
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-4 space-y-1.5">
          <div className="text-xs text-zinc-400 flex items-center justify-between">
            <span>Monthly Category Demand</span>
            <Target className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-zinc-100">
            {selectedProduct.monthlyDemand.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-zinc-400 font-mono">
            Units across Amazon + Flipkart
          </div>
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-4 space-y-1.5">
          <div className="text-xs text-zinc-400 flex items-center justify-between">
            <span>Competitor Density</span>
            <Users className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-zinc-100">
            {selectedProduct.competitorCount} Brands
          </div>
          <div className="text-[11px] text-zinc-400 font-mono">
            Moderate saturation (Top 4 hold 58%)
          </div>
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-4 space-y-1.5">
          <div className="text-xs text-zinc-400 flex items-center justify-between">
            <span>Opportunity Score</span>
            <ShieldCheck className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-400">
            {selectedProduct.opportunityScore} / 100
          </div>
          <div className="text-[11px] text-emerald-400 font-mono">
            High Viability Threshold (&gt;80)
          </div>
        </div>
      </div>

      {/* Category Deep Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-zinc-900/80 border border-zinc-800 rounded-lg p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h3 className="text-sm font-semibold text-zinc-200">
              Demand & Competition Trend Analysis (Simulated 12-Month)
            </h3>
            <span className="text-[11px] font-mono text-zinc-400">Index Baseline: 100</span>
          </div>

          {/* Simple ASCII / Bar Visualization for Trend */}
          <div className="space-y-3">
            {[
              { month: 'Oct 2025', demand: 78, comp: 52 },
              { month: 'Dec 2025 (Festive)', demand: 98, comp: 58 },
              { month: 'Feb 2026', demand: 82, comp: 60 },
              { month: 'Apr 2026', demand: 88, comp: 62 },
              { month: 'Jun 2026', demand: 92, comp: 64 },
              { month: 'Sep 2026 (Current)', demand: 100, comp: 68 }
            ].map(m => (
              <div key={m.month} className="space-y-1 text-xs">
                <div className="flex justify-between text-zinc-400 font-mono text-[11px]">
                  <span>{m.month}</span>
                  <span>Demand: {m.demand} pts | Competitors: {m.comp}</span>
                </div>
                <div className="w-full bg-zinc-950 h-2.5 rounded-full overflow-hidden flex">
                  <div
                    className="bg-amber-400 h-full rounded-full transition-all"
                    style={{ width: `${m.demand}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 text-xs text-zinc-400 leading-relaxed bg-zinc-950 p-3 rounded border border-zinc-850">
            <span className="font-semibold text-zinc-200">Autonomous Market Insight: </span>
            The Laptop Stand segment has demonstrated a resilient +28.4% YoY expansion driven by sustained hybrid work policies. Pricing cluster analysis indicates a sweet spot at ₹1,049–₹1,199, where Chinese import re-sellers under-invest in silicone anti-slip cushioning and CNC edge beveling.
          </div>
        </div>

        {/* Opportunity Selection Panel */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-5 space-y-4">
          <div className="border-b border-zinc-800 pb-3">
            <h3 className="text-sm font-semibold text-zinc-200">Switch Research Subject</h3>
            <p className="text-[11px] text-zinc-400">Select any candidate SKU to inspect telemetry</p>
          </div>

          <div className="space-y-2">
            {products.map(p => {
              const isSelected = p.id === selectedProduct.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedProduct(p)}
                  className={`w-full text-left p-3 rounded border transition-colors ${
                    isSelected
                      ? 'bg-amber-400/10 border-amber-400/40 text-zinc-100'
                      : 'bg-zinc-950 border-zinc-850 text-zinc-300 hover:bg-zinc-900'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-semibold mb-1">
                    <span className="truncate">{p.name}</span>
                    <span className="font-mono text-amber-400 shrink-0 ml-2">Score {p.opportunityScore}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                    <span>{p.category}</span>
                    <span>₹{p.averageSellingPrice}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setCurrentSection('demandx')}
            className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium rounded transition-colors"
          >
            Advance to DemandX Estimation →
          </button>
        </div>
      </div>
    </div>
  );
};
