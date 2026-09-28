import React from 'react';
import { TrendingUp, Search, Calendar, Gauge, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';

export const DemandXView: React.FC = () => {
  const { selectedProduct, setCurrentSection } = useCommerce();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-zinc-100 tracking-tight">DemandX Estimation</h2>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Search interest velocity, seasonality indexes, and algorithmic demand confidence telemetry.
          </p>
        </div>
        <div className="font-mono text-[11px] text-zinc-400 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded">
          Subject: <span className="text-amber-400 font-semibold">{selectedProduct.name}</span>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-4 space-y-1.5">
          <div className="text-xs text-zinc-400 flex items-center justify-between">
            <span>Monthly Search Volume</span>
            <Search className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-zinc-100">
            {selectedProduct.monthlyDemand.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-emerald-400 font-mono">
            +31.2% Search Query Velocity
          </div>
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-4 space-y-1.5">
          <div className="text-xs text-zinc-400 flex items-center justify-between">
            <span>YoY Growth Trajectory</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-emerald-400">
            +{selectedProduct.growthYoY}%
          </div>
          <div className="text-[11px] text-zinc-400 font-mono">
            High organic sustained growth
          </div>
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-4 space-y-1.5">
          <div className="text-xs text-zinc-400 flex items-center justify-between">
            <span>Demand Confidence</span>
            <Gauge className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-400">
            {selectedProduct.demandConfidence}%
          </div>
          <div className="text-[11px] text-emerald-400 font-mono">
            High Signal Integrity (P &lt; 0.01)
          </div>
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-4 space-y-1.5">
          <div className="text-xs text-zinc-400 flex items-center justify-between">
            <span>Seasonality Pattern</span>
            <Calendar className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-sm font-semibold text-zinc-200 mt-1 line-clamp-1">
            Q4 Festive & Back-to-Office
          </div>
          <div className="text-[11px] text-zinc-400 font-mono">
            Low seasonal drop-off risk
          </div>
        </div>
      </div>

      {/* Search Interest Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-zinc-900/80 border border-zinc-800 rounded-lg p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <h3 className="text-sm font-semibold text-zinc-200">
              Keyword Search Intent & Monthly Volume (Simulated E-Commerce Index)
            </h3>
            <span className="text-[11px] font-mono text-zinc-400">DEMO DATA</span>
          </div>

          <div className="space-y-3">
            {[
              { query: 'laptop stand for desk', volume: '18,400/mo', cpc: '₹4.80', intent: 'High Commercial' },
              { query: 'aluminum ergonomic laptop riser', volume: '11,200/mo', cpc: '₹5.40', intent: 'High Commercial' },
              { query: 'foldable macbook stand', volume: '8,900/mo', cpc: '₹6.20', intent: 'Brand Affinity' },
              { query: 'portable cooling stand', volume: '6,400/mo', cpc: '₹3.90', intent: 'Problem Solving' },
              { query: 'heavy duty metal laptop holder', volume: '3,600/mo', cpc: '₹4.10', intent: 'Niche B2B' }
            ].map(k => (
              <div key={k.query} className="bg-zinc-950 p-3 rounded border border-zinc-850 flex items-center justify-between text-xs">
                <div>
                  <div className="font-semibold text-zinc-200 font-mono">{k.query}</div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">Intent: {k.intent}</div>
                </div>
                <div className="text-right font-mono">
                  <div className="text-amber-400 font-bold">{k.volume}</div>
                  <div className="text-[11px] text-zinc-400">Avg CPC: {k.cpc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Seasonality Forecast */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-5 space-y-4">
          <div className="border-b border-zinc-800 pb-3">
            <h3 className="text-sm font-semibold text-zinc-200">Seasonal Demand Forecast</h3>
            <p className="text-[11px] text-zinc-400">Quarterly variance benchmark</p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="bg-zinc-950 p-3 rounded border border-zinc-850">
              <div className="flex justify-between font-mono mb-1">
                <span className="text-zinc-300">Q1 (Jan - Mar): Post-Holiday</span>
                <span className="text-zinc-400">85% Normal</span>
              </div>
              <p className="text-[11px] text-zinc-400">Steady replacement & corporate home-office setups.</p>
            </div>
            <div className="bg-zinc-950 p-3 rounded border border-zinc-850">
              <div className="flex justify-between font-mono mb-1">
                <span className="text-zinc-300">Q2 (Apr - Jun): Back-to-College</span>
                <span className="text-emerald-400">115% High</span>
              </div>
              <p className="text-[11px] text-zinc-400">Student laptop purchases & summer study gear.</p>
            </div>
            <div className="bg-zinc-950 p-3 rounded border border-zinc-850">
              <div className="flex justify-between font-mono mb-1">
                <span className="text-zinc-300">Q3 (Jul - Sep): Pre-Festive</span>
                <span className="text-zinc-400">95% Normal</span>
              </div>
              <p className="text-[11px] text-zinc-400">Inventory stocking period for marketplace sellers.</p>
            </div>
            <div className="bg-zinc-950 p-3 rounded border border-amber-400/30 bg-amber-400/5">
              <div className="flex justify-between font-mono mb-1">
                <span className="text-amber-300 font-bold">Q4 (Oct - Dec): Peak Season</span>
                <span className="text-amber-400 font-bold">160% Peak</span>
              </div>
              <p className="text-[11px] text-zinc-300">Diwali sales, Great Indian Festival & corporate gifting.</p>
            </div>
          </div>

          <button
            onClick={() => setCurrentSection('prodiq')}
            className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium rounded transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Compare Candidate Opportunities in ProdIQ</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
