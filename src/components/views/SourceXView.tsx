import React, { useState } from 'react';
import { Factory, AlertTriangle, CheckCircle2, Brain, ArrowRight, Star, ShieldAlert } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';

export const SourceXView: React.FC = () => {
  const {
    suppliers,
    selectedSupplier,
    setSelectedSupplier,
    budget,
    evaluateSupplierADemo,
    memories,
    memorySource,
    setCurrentSection
  } = useCommerce();

  const [evalResult, setEvalResult] = useState<{ rejected: boolean; recalledMemory?: string } | null>(null);
  const [evaluating, setEvaluating] = useState<boolean>(false);

  const supplierAMemory = memories.find(m => m.entity === 'Supplier A');

  const handleRunSupplierAEvaluation = async () => {
    setEvaluating(true);
    try {
      const res = await evaluateSupplierADemo();
      setEvalResult(res);
    } finally {
      setEvaluating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Factory className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-zinc-100 tracking-tight">SourceX Supplier Intelligence</h2>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Global and domestic supplier discovery, minimum order quantity (MOQ) risk assessment, and total landed cost analysis.
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded">
          <span>Capital Limit:</span>
          <span className="text-amber-400 font-semibold">₹{budget.toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* Special Autonomous Memory Learning Banner for Supplier A */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-lg p-5 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0">
              <Brain className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-zinc-200">
                Autonomous Memory Learning Loop: Supplier A (ApexTech Industrial Corp)
              </div>
              <div className="text-[11px] text-zinc-400">
                Tests first-run rejection (MOQ ₹1,40,000 exceeds ₹50k budget) & second-run instant memory recall.
              </div>
            </div>
          </div>

          <button
            onClick={handleRunSupplierAEvaluation}
            disabled={evaluating}
            className="flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs rounded transition-colors disabled:opacity-50 shrink-0"
          >
            <Brain className="w-3.5 h-3.5" />
            <span>{evaluating ? 'Evaluating...' : supplierAMemory ? 'Re-Evaluate Supplier A (Run 2)' : 'Evaluate Supplier A (Run 1)'}</span>
          </button>
        </div>

        {/* Live Evaluation Result Display */}
        {evalResult && (
          <div className="mt-3 p-3.5 bg-zinc-950 rounded border border-zinc-800 space-y-1.5 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-[11px]">
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span className="font-semibold text-amber-400">
                  {evalResult.recalledMemory ? 'RUN 2: MEMORY RECALLED' : 'RUN 1: REJECTED & STORED IN MEMORY'}
                </span>
              </div>
              <span className="text-[10px] font-mono text-zinc-400">
                Source: {memorySource === 'hindsight' ? 'Hindsight API' : 'Demo Memory'}
              </span>
            </div>

            {evalResult.recalledMemory ? (
              <div className="text-sky-300 font-mono text-xs leading-relaxed">
                "{evalResult.recalledMemory}"
                <div className="text-zinc-400 mt-1 text-[11px]">
                  Autonomous Agent Action: Bypassed detailed negotiation and recommended Supplier B directly to protect merchant working capital.
                </div>
              </div>
            ) : (
              <div className="text-zinc-300 text-xs leading-relaxed">
                Supplier A disqualified: Minimum Order Quantity of 500 units requires an upfront capital outlay of ₹1,40,000 (exceeds budget by ₹90,000). Retained experience into memory bank for persistent awareness.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Supplier Comparison Table */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-zinc-200">
            Supplier Options & Landed Cost Benchmark
          </h3>
          <span className="text-[11px] font-mono text-zinc-400">Working Capital: ₹{budget.toLocaleString('en-IN')}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-950 text-zinc-400 font-mono uppercase text-[10px] border-b border-zinc-850">
              <tr>
                <th className="py-3 px-4">Supplier Name</th>
                <th className="py-3 px-4 text-right">Unit Cost</th>
                <th className="py-3 px-4 text-right">MOQ</th>
                <th className="py-3 px-4 text-right">Capital Outlay</th>
                <th className="py-3 px-4 text-right">Shipping / Unit</th>
                <th className="py-3 px-4 text-right">Total Landed</th>
                <th className="py-3 px-4 text-center">Lead Time</th>
                <th className="py-3 px-4 text-center">Rating</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-850">
              {suppliers.map(sup => {
                const isSelected = sup.id === selectedSupplier.id;
                const exceeds = sup.capitalRequired > budget;
                return (
                  <tr
                    key={sup.id}
                    className={`transition-colors ${
                      isSelected
                        ? 'bg-amber-400/5'
                        : exceeds
                        ? 'bg-rose-950/10'
                        : 'hover:bg-zinc-850/50'
                    }`}
                  >
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-zinc-100 flex items-center gap-1.5">
                        {sup.name}
                        {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>}
                      </div>
                      <div className="text-[11px] text-zinc-400">{sup.location}</div>
                      <div className="text-[10px] text-zinc-400 italic mt-0.5">{sup.notes}</div>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-zinc-200">
                      ₹{sup.unitCost}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-zinc-200">
                      {sup.moq} units
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono">
                      <span className={exceeds ? 'text-rose-400 font-bold' : 'text-zinc-200'}>
                        ₹{sup.capitalRequired.toLocaleString('en-IN')}
                      </span>
                      {exceeds && (
                        <span className="block text-[10px] text-rose-400 font-mono">
                          +{Math.round(((sup.capitalRequired - budget) / budget) * 100)}% over budget
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-zinc-300">
                      ₹{sup.shippingCostPerUnit}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-amber-400">
                      ₹{sup.totalLandedCost}
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono text-zinc-300">
                      {sup.leadTimeDays} days
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono text-zinc-200">
                      ★ {sup.rating}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {exceeds ? (
                        <span className="inline-flex items-center gap-1 text-rose-400 text-[11px] font-mono">
                          <ShieldAlert className="w-3.5 h-3.5" />
                          <span>Budget Risk</span>
                        </span>
                      ) : isSelected ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400 text-[11px] font-mono font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Selected</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => setSelectedSupplier(sup)}
                          className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded font-medium text-[11px] transition-colors"
                        >
                          Select
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Selected Supplier Next Steps */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-mono uppercase text-emerald-400 font-semibold">
            Optimal Selection Verified
          </div>
          <div className="text-sm font-semibold text-zinc-100">
            {selectedSupplier.name} — MOQ {selectedSupplier.moq} Units @ ₹{selectedSupplier.unitCost} (Total ₹{selectedSupplier.capitalRequired.toLocaleString('en-IN')})
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Fits comfortably within ₹50,000 budget, retaining ₹18,000 working reserve for marketplace commissions, packaging, and sponsored product ads.
          </p>
        </div>

        <button
          onClick={() => setCurrentSection('costiq')}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs rounded transition-colors shrink-0"
        >
          <span>Calculate Full Unit Economics in CostIQ</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
