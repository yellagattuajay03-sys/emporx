import React, { useState } from 'react';
import {
  Play,
  RotateCcw,
  Sparkles,
  Search,
  ShoppingCart,
  Brain,
  Factory,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';

export const Navbar: React.FC = () => {
  const {
    currentSection,
    budget,
    setBudget,
    runFullBusinessDemo,
    isDemoRunning,
    evaluateSupplierADemo,
    simulateNewOrder,
    simulateReturn,
    runAgentAnalysis,
    setCurrentSection,
    resetAllData
  } = useCommerce();

  const [notification, setNotification] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4500);
  };

  const handleQuickSupplierEval = async () => {
    const res = await evaluateSupplierADemo();
    if (res.recalledMemory) {
      showToast(`Supplier A Re-evaluation: Recalled previous memory! "${res.recalledMemory}"`);
    } else {
      showToast(`Supplier A First Run: Evaluated & REJECTED due to MOQ ₹1,40,000 exceeding budget ₹50,000. Stored in Memory!`);
    }
    setCurrentSection('sourcex');
  };

  const handleQuickOrder = () => {
    const ord = simulateNewOrder();
    showToast(`Simulated live order #${ord.orderNumber} for ₹${ord.unitPrice}!`);
    setCurrentSection('orders');
  };

  const handleQuickReturn = () => {
    const ret = simulateReturn();
    if (ret) {
      showToast(`Simulated return for #${ret.orderNumber}: Refund ₹${ret.refundAmount}. Inventory & profit adjusted.`);
      setCurrentSection('returns');
    } else {
      showToast('No eligible order found to return.');
    }
  };

  const handleQuickMemory = () => {
    setCurrentSection('memory');
    showToast('Navigated to Hindsight Memory Explorer');
  };

  const handleQuickRecommendation = async () => {
    setCurrentSection('agent');
    await runAgentAnalysis('Find a profitable product I can sell with ₹50,000.', 'Supplier A');
    showToast('Generated fresh autonomous business recommendation with memory context.');
  };

  return (
    <header className="h-16 border-b border-zinc-800 bg-zinc-950 px-6 flex items-center justify-between gap-4 z-10 shrink-0">
      {/* Left: Section Title & Demo Badge */}
      <div className="flex items-center gap-4 min-w-0">
        <div className="flex items-baseline gap-2">
          <h1 className="text-base font-semibold text-zinc-100 tracking-tight capitalize">
            {currentSection === 'dashboard'
              ? 'Executive Cockpit'
              : currentSection === 'commercex'
              ? 'CommerceX & Inventory'
              : currentSection}
          </h1>
          <span className="text-[11px] font-mono text-zinc-400">
            / Autonomous Business Operator
          </span>
        </div>
        <div className="hidden lg:flex items-center gap-2 border-l border-zinc-800 pl-4 text-xs">
          <span className="inline-flex items-center gap-1.5 text-zinc-400 font-mono text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            SIMULATED DEMO ENVIRONMENT
          </span>
        </div>
      </div>

      {/* Center Toast notification */}
      {notification && (
        <div className="hidden xl:flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-700 text-xs text-zinc-200 rounded max-w-md truncate">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          <span className="truncate">{notification}</span>
        </div>
      )}

      {/* Right: Quick Demo Actions & Working Capital */}
      <div className="flex items-center gap-3">
        {/* Working Capital Indicator */}
        <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 bg-zinc-900 border border-zinc-800 rounded text-xs">
          <span className="text-zinc-400 text-[11px] font-mono uppercase">Capital:</span>
          <span className="font-semibold text-zinc-100 font-mono">₹{budget.toLocaleString('en-IN')}</span>
        </div>

        {/* Quick Action Buttons Group */}
        <div className="hidden md:flex items-center gap-1 bg-zinc-900/80 p-0.5 border border-zinc-800 rounded">
          <button
            onClick={handleQuickSupplierEval}
            title="Evaluate Supplier A (Demonstrates memory retention on 1st run, memory recall on 2nd run)"
            className="flex items-center gap-1 px-2 py-1 text-[11px] text-zinc-300 hover:text-white hover:bg-zinc-800 rounded transition-colors"
          >
            <Factory className="w-3 h-3 text-amber-400" />
            <span>Eval Supplier</span>
          </button>
          <button
            onClick={handleQuickOrder}
            title="Simulate customer order"
            className="flex items-center gap-1 px-2 py-1 text-[11px] text-zinc-300 hover:text-white hover:bg-zinc-800 rounded transition-colors"
          >
            <ShoppingCart className="w-3 h-3 text-emerald-400" />
            <span>Sim Order</span>
          </button>
          <button
            onClick={handleQuickReturn}
            title="Simulate customer return and observe profit impact"
            className="flex items-center gap-1 px-2 py-1 text-[11px] text-zinc-300 hover:text-white hover:bg-zinc-800 rounded transition-colors"
          >
            <RotateCcw className="w-3 h-3 text-rose-400" />
            <span>Sim Return</span>
          </button>
          <button
            onClick={handleQuickMemory}
            title="Inspect Hindsight / Demo Memory bank"
            className="flex items-center gap-1 px-2 py-1 text-[11px] text-zinc-300 hover:text-white hover:bg-zinc-800 rounded transition-colors"
          >
            <Brain className="w-3 h-3 text-sky-400" />
            <span>Recall Memory</span>
          </button>
          <button
            onClick={handleQuickRecommendation}
            title="Generate AI structured recommendation"
            className="flex items-center gap-1 px-2 py-1 text-[11px] text-zinc-300 hover:text-white hover:bg-zinc-800 rounded transition-colors"
          >
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span>Next Rec</span>
          </button>
        </div>

        {/* Primary Call to Action: Run Full Business Demo */}
        <button
          onClick={runFullBusinessDemo}
          disabled={isDemoRunning}
          className="flex items-center gap-2 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-xs rounded transition-colors disabled:opacity-50"
        >
          <Play className={`w-3.5 h-3.5 fill-current ${isDemoRunning ? 'animate-spin' : ''}`} />
          <span>{isDemoRunning ? 'Simulating...' : 'Run Full Demo'}</span>
        </button>

        {/* Reset button */}
        <button
          onClick={resetAllData}
          title="Reset all demo state to fresh ₹50,000 starting configuration"
          className="p-1.5 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-zinc-800 rounded transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
};
