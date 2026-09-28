import React from 'react';
import { useCommerce } from '../../context/CommerceContext';
import { CheckCircle2, Loader2, Sparkles, X, ArrowRight, Brain } from 'lucide-react';

export const DemoRunnerModal: React.FC = () => {
  const { isDemoRunning, isDemoModalOpen, closeDemoModal, demoStep, demoLogs, memorySource, setCurrentSection } = useCommerce();

  if (!isDemoModalOpen) {
    return null;
  }

  const steps = [
    { num: 1, title: 'Market Research', module: 'MarketIQ / DemandX' },
    { num: 2, title: 'Supplier Eval & Memory', module: 'SourceX' },
    { num: 3, title: 'Cost Economics', module: 'CostIQ' },
    { num: 4, title: 'Channel & Fulfillment', module: 'ChannelX' },
    { num: 5, title: 'Pricing & Catalog', module: 'PriceX / CatalogX' },
    { num: 6, title: 'Human Approval', module: 'Praxis' },
    { num: 7, title: 'Simulate Order', module: 'Orders' },
    { num: 8, title: 'Simulate Return', module: 'Returns' },
    { num: 9, title: 'Adaptive Learning', module: 'Hindsight Memory' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-zinc-950 border border-zinc-800 rounded-lg max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-zinc-100">
                EmporX Autonomous Business Loop Demo
              </h2>
              <p className="text-[11px] text-zinc-400">
                End-to-End Execution: ₹50,000 Budget → Discovery → Sourcing → Memory → Return → Adaptation
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span>Memory:</span>
            <span className="text-emerald-400">{memorySource === 'hindsight' ? 'Hindsight API' : 'Demo Memory'}</span>
            {!isDemoRunning && (
              <button
                onClick={closeDemoModal}
                className="ml-2 p-1 text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Step Progress Tracker */}
        <div className="p-4 border-b border-zinc-850 bg-zinc-900/20">
          <div className="grid grid-cols-3 sm:grid-cols-9 gap-1.5 text-center text-[10px]">
            {steps.map(s => {
              const isPast = demoStep > s.num;
              const isCurrent = demoStep === s.num;
              return (
                <div
                  key={s.num}
                  className={`p-1.5 rounded border transition-colors flex flex-col items-center justify-center min-h-[50px] ${
                    isCurrent
                      ? 'bg-amber-400/10 border-amber-400/40 text-amber-300 font-semibold'
                      : isPast
                      ? 'bg-zinc-900/90 border-emerald-500/30 text-emerald-400'
                      : 'bg-zinc-900/30 border-zinc-800/40 text-zinc-400'
                  }`}
                >
                  <div className="font-mono text-[9px] mb-0.5">0{s.num}</div>
                  <div className="truncate w-full leading-tight font-medium">{s.title}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Terminal Logs Window */}
        <div className="flex-1 p-4 overflow-y-auto font-mono text-xs bg-zinc-950 space-y-1.5 max-h-72 border-b border-zinc-850">
          {demoLogs.map((log, i) => (
            <div
              key={i}
              className={`leading-relaxed ${
                log.includes('Memory') || log.includes('Adaptive')
                  ? 'text-sky-300'
                  : log.includes('rejected') || log.includes('Return')
                  ? 'text-amber-300'
                  : log.includes('Order')
                  ? 'text-emerald-300'
                  : 'text-zinc-300'
              }`}
            >
              {log}
            </div>
          ))}
          {isDemoRunning && (
            <div className="flex items-center gap-2 text-zinc-400 pt-1">
              <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
              <span>Autonomous agent executing next business stage...</span>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-3 bg-zinc-900/60 flex items-center justify-between text-xs">
          <div className="text-zinc-400 text-[11px]">
            {isDemoRunning ? 'Simulating business operations in real-time...' : 'Demo sequence complete.'}
          </div>
          <div className="flex items-center gap-2">
            {!isDemoRunning && (
              <button
                onClick={() => {
                  closeDemoModal();
                  setCurrentSection('memory');
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded font-medium transition-colors"
              >
                <Brain className="w-3.5 h-3.5 text-sky-400" />
                <span>Inspect Stored Memory</span>
              </button>
            )}
            <button
              onClick={() => {
                if (!isDemoRunning) {
                  closeDemoModal();
                }
              }}
              disabled={isDemoRunning}
              className="px-3 py-1.5 bg-zinc-200 hover:bg-white text-zinc-950 font-semibold rounded disabled:opacity-40 transition-colors"
            >
              {isDemoRunning ? 'Running...' : 'Close & Explore App'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
