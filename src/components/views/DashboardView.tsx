import React from 'react';
import {
  TrendingUp,
  Boxes,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Brain,
  Play,
  Factory,
  CheckCircle2,
  DollarSign,
  Package,
  Layers,
  Activity
} from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';

export const DashboardView: React.FC = () => {
  const {
    budget,
    orders,
    returns,
    inventory,
    decisions,
    memories,
    memorySource,
    runFullBusinessDemo,
    isDemoRunning,
    evaluateSupplierADemo,
    setCurrentSection,
    selectedProduct,
    costStructure
  } = useCommerce();

  // Metrics calculation
  const totalRevenue = orders.reduce((acc, o) => (o.status !== 'returned' ? acc + o.totalAmount : acc), 0);
  const totalRefunds = returns.reduce((acc, r) => acc + r.refundAmount + r.returnShippingCost, 0);
  const totalDelivered = orders.filter(o => o.status === 'delivered' || o.status === 'returned').length;
  const returnRatePercent = totalDelivered > 0 ? ((returns.length / totalDelivered) * 100).toFixed(1) : '5.8';
  const estimatedNetProfit = Math.max(0, Math.round(orders.length * costStructure.profit - totalRefunds));
  const totalStock = inventory.reduce((acc, i) => acc + i.inStock, 0);

  const loopStages = [
    { name: 'Goal', desc: '₹50,000 Budget Capital', active: true },
    { name: 'Research', desc: 'MarketIQ & DemandX', active: true },
    { name: 'Analyze', desc: 'SourceX & CostIQ', active: true },
    { name: 'Decide', desc: 'Channel & Pricing', active: true },
    { name: 'Approval', desc: 'Praxis Governance', active: true },
    { name: 'Execute', desc: 'CommerceX Orders', active: true },
    { name: 'Observe', desc: 'Reverse Logistics', active: true },
    { name: 'Remember', desc: 'Hindsight Store', active: true },
    { name: 'Adapt', desc: 'Adaptive Learning', active: true }
  ];

  return (
    <div className="space-y-6">
      {/* 1. Hero Banner as requested: "EMPORX AI Business Agent for Autonomous Commerce. From opportunity discovery to profitable execution." */}
      <div className="relative overflow-hidden bg-gradient-to-r from-zinc-900 via-zinc-900/90 to-zinc-950 border border-zinc-800 rounded-lg p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] uppercase tracking-wider text-amber-400 font-semibold">
                Autonomous Commerce Intelligence
              </span>
              <span className="text-zinc-400">·</span>
              <span className="text-xs text-zinc-400">Memory Engine: {memorySource === 'hindsight' ? 'Hindsight Bank' : 'Demo Memory'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
              EMPORX
            </h1>
            <p className="text-base text-zinc-300 font-medium">
              AI Business Agent for Autonomous Commerce
            </p>
            <p className="text-xs text-zinc-400 leading-relaxed">
              "From opportunity discovery to profitable execution." Seamlessly guides a merchant from market research to supplier evaluation, unit cost calculations, channel selection, catalog creation, simulated live orders and returns, and lifelong learning via persistent business memory.
            </p>
          </div>

          {/* Quick Actions Panel */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0">
            <button
              onClick={runFullBusinessDemo}
              disabled={isDemoRunning}
              className="flex items-center justify-center gap-2 px-5 py-3 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-sm rounded shadow-lg transition-all disabled:opacity-50"
            >
              <Play className={`w-4 h-4 fill-current ${isDemoRunning ? 'animate-spin' : ''}`} />
              <span>{isDemoRunning ? 'Simulating Business Loop...' : 'Run Full Business Demo'}</span>
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentSection('agent')}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-zinc-800 hover:bg-zinc-750 text-zinc-200 text-xs font-medium rounded border border-zinc-700 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>Ask AI Agent</span>
              </button>
              <button
                onClick={async () => {
                  await evaluateSupplierADemo();
                  setCurrentSection('sourcex');
                }}
                className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-zinc-800 hover:bg-zinc-750 text-zinc-200 text-xs font-medium rounded border border-zinc-700 transition-colors"
              >
                <Factory className="w-3.5 h-3.5 text-amber-400" />
                <span>Eval Supplier A</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Core Business Loop Visual Stepper */}
      <div className="bg-zinc-900/70 border border-zinc-800 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-amber-400" />
            <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-300 font-mono">
              Core Autonomous Business Loop
            </h2>
          </div>
          <span className="text-[11px] text-zinc-400 font-mono">Continuous Execution Pipeline</span>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-2">
          {loopStages.map((stage, idx) => (
            <div
              key={stage.name}
              className="bg-zinc-950/80 border border-zinc-800/90 rounded p-2.5 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono text-zinc-400">0{idx + 1}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              </div>
              <div className="font-semibold text-xs text-zinc-200">{stage.name}</div>
              <div className="text-[10px] text-zinc-400 truncate mt-0.5">{stage.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Executive KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-4 space-y-1">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Simulated Revenue</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-bold text-zinc-100 font-mono">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-zinc-400 flex items-center gap-1 font-mono">
            <span>{orders.length} orders logged</span>
          </div>
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-4 space-y-1">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Estimated Net Profit</span>
            <TrendingUp className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-xl font-bold text-emerald-400 font-mono">
            ₹{estimatedNetProfit.toLocaleString('en-IN')}
          </div>
          <div className="text-[11px] text-zinc-400 font-mono">
            Net Margin: <span className="text-zinc-200">{costStructure.profitMargin}%</span>
          </div>
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-4 space-y-1">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Live Inventory Units</span>
            <Boxes className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-xl font-bold text-zinc-100 font-mono">
            {totalStock} <span className="text-xs text-zinc-400 font-normal">units</span>
          </div>
          <div className="text-[11px] text-zinc-400 font-mono">
            FBA & FBF Hub: <span className="text-zinc-200">{inventory[0]?.reserved || 0} reserved</span>
          </div>
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-4 space-y-1">
          <div className="flex items-center justify-between text-zinc-400 text-xs">
            <span>Return Rate</span>
            <RotateCcw className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-xl font-bold text-zinc-100 font-mono">
            {returnRatePercent}%
          </div>
          <div className="text-[11px] text-zinc-400 font-mono">
            {returns.length} return events processed
          </div>
        </div>
      </div>

      {/* 4. Active Opportunity & Recent Decisions Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Product Spotlight */}
        <div className="lg:col-span-2 bg-zinc-900/80 border border-zinc-800 rounded-lg p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-amber-400">
                Active Flagship Opportunity
              </div>
              <h3 className="text-base font-semibold text-zinc-100">
                {selectedProduct.name}
              </h3>
            </div>
            <button
              onClick={() => setCurrentSection('prodiq')}
              className="text-xs text-zinc-400 hover:text-zinc-200 flex items-center gap-1 font-mono transition-colors"
            >
              <span>Compare All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="bg-zinc-950 p-3 rounded border border-zinc-850">
              <span className="text-zinc-400 text-[11px] block">Opportunity Score</span>
              <span className="text-base font-bold text-amber-400 font-mono">
                {selectedProduct.opportunityScore} / 100
              </span>
            </div>
            <div className="bg-zinc-950 p-3 rounded border border-zinc-850">
              <span className="text-zinc-400 text-[11px] block">Monthly Demand</span>
              <span className="text-base font-bold text-zinc-200 font-mono">
                {selectedProduct.monthlyDemand.toLocaleString('en-IN')} units
              </span>
            </div>
            <div className="bg-zinc-950 p-3 rounded border border-zinc-850">
              <span className="text-zinc-400 text-[11px] block">Target Selling Price</span>
              <span className="text-base font-bold text-zinc-200 font-mono">
                ₹{costStructure.sellingPrice}
              </span>
            </div>
            <div className="bg-zinc-950 p-3 rounded border border-zinc-850">
              <span className="text-zinc-400 text-[11px] block">Target Net Profit</span>
              <span className="text-base font-bold text-emerald-400 font-mono">
                ₹{costStructure.profit} / unit
              </span>
            </div>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed">
            {selectedProduct.description}
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              onClick={() => setCurrentSection('sourcex')}
              className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs rounded transition-colors"
            >
              Analyze Suppliers
            </button>
            <button
              onClick={() => setCurrentSection('costiq')}
              className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs rounded transition-colors"
            >
              Cost Economics
            </button>
            <button
              onClick={() => setCurrentSection('channelx')}
              className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs rounded transition-colors"
            >
              Channel Strategy
            </button>
            <button
              onClick={() => setCurrentSection('pricing')}
              className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs rounded transition-colors"
            >
              Price Optimizer
            </button>
          </div>
        </div>

        {/* Recent Decisions & Persistent Memory Widget */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-5 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-sky-400" />
                <h3 className="text-sm font-semibold text-zinc-100">Hindsight Memory</h3>
              </div>
              <span className="text-[10px] font-mono text-zinc-400">{memories.length} entries</span>
            </div>

            <div className="space-y-2.5">
              {memories.slice(0, 3).map(mem => (
                <div key={mem.id} className="p-2.5 bg-zinc-950 rounded border border-zinc-850 text-xs">
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 mb-1">
                    <span className="text-amber-400 font-semibold uppercase">{mem.entity || mem.category}</span>
                    <span>{new Date(mem.timestamp).toLocaleDateString()}</span>
                  </div>
                  <p className="text-zinc-300 line-clamp-2 leading-relaxed">
                    {mem.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setCurrentSection('memory')}
            className="w-full py-2 bg-zinc-800 hover:bg-zinc-750 text-zinc-200 text-xs font-medium rounded flex items-center justify-center gap-1.5 border border-zinc-700 transition-colors"
          >
            <span>Open Memory Explorer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
