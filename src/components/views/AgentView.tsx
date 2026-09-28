import React, { useState } from 'react';
import {
  Bot,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  HelpCircle,
  CheckCircle2,
  DollarSign,
  Layers,
  Brain,
  Send,
  Loader2,
  SlidersHorizontal,
  ShieldCheck
} from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';

export const AgentView: React.FC = () => {
  const {
    agentGoal,
    setAgentGoal,
    agentRecommendation,
    isAgentThinking,
    runAgentAnalysis,
    budget,
    setBudget,
    memorySource,
    setCurrentSection
  } = useCommerce();

  const [inputGoal, setInputGoal] = useState<string>(agentGoal);
  const [selectedSupplierForPrompt, setSelectedSupplierForPrompt] = useState<string>('Supplier B');

  const presetGoals = [
    'Find a profitable product I can sell with ₹50,000.',
    'Evaluate Supplier A (Shenzhen ApexTech) for ₹50,000 budget launch.',
    'Optimize listing pricing for Laptop Stand to maximize net profit.',
    'Recommend channel mix between Amazon FBA and Flipkart for sub-₹50k capital.'
  ];

  const handleRunAnalysis = async (goalStr?: string) => {
    const finalGoal = goalStr || inputGoal;
    setAgentGoal(finalGoal);
    await runAgentAnalysis(finalGoal, selectedSupplierForPrompt);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-zinc-100 tracking-tight">
              EmporX Autonomous Business Agent
            </h2>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Produces comprehensive, structured business decisions grounded in real telemetry, unit economics, and persistent Hindsight memory.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-xs font-mono text-zinc-400 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded">
            <span>Memory Engine: </span>
            <span className="text-emerald-400 font-semibold">
              {memorySource === 'hindsight' ? 'Hindsight API' : 'Demo Memory'}
            </span>
          </div>
        </div>
      </div>

      {/* Goal Input Console */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-5 space-y-4">
        <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
          Enter Commerce Goal or Strategic Query
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={inputGoal}
            onChange={e => setInputGoal(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleRunAnalysis()}
            placeholder="e.g. Find a profitable product I can sell with ₹50,000."
            className="flex-1 bg-zinc-950 border border-zinc-800 rounded px-3.5 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-amber-400"
          />
          <button
            onClick={() => handleRunAnalysis()}
            disabled={isAgentThinking || !inputGoal.trim()}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs rounded transition-colors disabled:opacity-50 shrink-0"
          >
            {isAgentThinking ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Synthesizing...</span>
              </>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Formulate Strategy</span>
              </>
            )}
          </button>
        </div>

        {/* Working Capital & Preset Goal Chips */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 text-xs">
          <div className="flex items-center gap-2 text-zinc-400">
            <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-400" />
            <span className="font-mono text-[11px]">Budget Constraint:</span>
            <input
              type="number"
              value={budget}
              onChange={e => setBudget(Number(e.target.value))}
              className="w-24 bg-zinc-950 border border-zinc-800 px-2 py-1 rounded text-zinc-200 font-mono text-xs focus:outline-none focus:border-amber-400"
            />
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] text-zinc-400">Suggested:</span>
            {presetGoals.map((g, i) => (
              <button
                key={i}
                onClick={() => {
                  setInputGoal(g);
                  handleRunAnalysis(g);
                }}
                className="text-[11px] text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-750 px-2 py-0.5 rounded border border-zinc-700 transition-colors truncate max-w-xs"
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Structured Recommendation Display (Strict schema as requested in prompt) */}
      {agentRecommendation ? (
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-lg overflow-hidden shadow-xl space-y-0">
          {/* Header Bar */}
          <div className="p-4 bg-zinc-850/60 border-b border-zinc-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
                Autonomous Recommendation Formulation
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-zinc-400">Status: Formulated</span>
              <span className="text-amber-400 font-semibold">
                Approval Required: {agentRecommendation.approvalRequired ? 'YES' : 'NO'}
              </span>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* 1. Goal & Recommendation Summary */}
            <div className="space-y-2">
              <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                Goal Under Evaluation
              </div>
              <div className="text-sm font-semibold text-zinc-100 bg-zinc-950 p-3 rounded border border-zinc-850">
                "{agentRecommendation.goal}"
              </div>
            </div>

            {/* 2. Executive Recommendation */}
            <div className="bg-amber-400/5 border border-amber-400/20 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 uppercase tracking-wider font-mono">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Executive Recommendation</span>
              </div>
              <p className="text-sm text-zinc-100 leading-relaxed font-medium">
                {agentRecommendation.recommendation}
              </p>
            </div>

            {/* 3. Relevant Previous Memory Recalled */}
            <div className="bg-zinc-950 border border-zinc-850 rounded-lg p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-sky-400 uppercase tracking-wider font-mono">
                <Brain className="w-4 h-4" />
                <span>Relevant Previous Memory</span>
                <span className="text-[10px] text-zinc-400 font-normal">
                  ({memorySource === 'hindsight' ? 'Hindsight Bank' : 'Demo Memory'})
                </span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed font-mono">
                {agentRecommendation.relevantPreviousMemory}
              </p>
            </div>

            {/* 4. Constraints & Data Considered (Side by Side) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-zinc-950 p-4 rounded border border-zinc-850 space-y-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400 font-semibold block">
                  Constraints Enforced
                </span>
                <ul className="space-y-1 text-zinc-300">
                  {agentRecommendation.constraints.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-amber-400">·</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-zinc-950 p-4 rounded border border-zinc-850 space-y-2">
                <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400 font-semibold block">
                  Data Telemetry Considered
                </span>
                <ul className="space-y-1 text-zinc-300">
                  {agentRecommendation.dataConsidered.map((d, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400">·</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 5. Financial Projections & Cost Impact */}
            <div className="space-y-3">
              <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400 font-semibold block">
                Financial Impact & Projections
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-zinc-950 p-3.5 rounded border border-zinc-850">
                  <span className="text-zinc-400 text-[11px] block">Expected Gross Revenue</span>
                  <span className="text-lg font-bold text-zinc-100 font-mono">
                    ₹{agentRecommendation.expectedRevenue.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="bg-zinc-950 p-3.5 rounded border border-zinc-850">
                  <span className="text-zinc-400 text-[11px] block">Expected Net Profit</span>
                  <span className="text-lg font-bold text-emerald-400 font-mono">
                    ₹{agentRecommendation.expectedProfit.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="bg-zinc-950 p-3.5 rounded border border-zinc-850">
                  <span className="text-zinc-400 text-[11px] block">Total Capital Allocated</span>
                  <span className="text-lg font-bold text-amber-400 font-mono">
                    ₹{agentRecommendation.costImpact.totalAllocated.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Cost Allocation Breakdown */}
              <div className="bg-zinc-950 p-4 rounded border border-zinc-850 text-xs space-y-2">
                <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                  Working Capital Allocation
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-zinc-300 font-mono text-[11px]">
                  <div>Inventory PO: ₹{agentRecommendation.costImpact.inventoryProcurement.toLocaleString('en-IN')}</div>
                  <div>Prep & Packing: ₹{agentRecommendation.costImpact.packagingAndPrep.toLocaleString('en-IN')}</div>
                  <div>Initial Ad Spend: ₹{agentRecommendation.costImpact.initialAdSpend.toLocaleString('en-IN')}</div>
                  <div>Reserve Buffer: ₹{agentRecommendation.costImpact.operatingBuffer.toLocaleString('en-IN')}</div>
                </div>
              </div>
            </div>

            {/* 6. Risks & Uncertainty */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-zinc-950 p-4 rounded border border-zinc-850 space-y-2">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-rose-400 font-semibold">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Identified Risk Vectors</span>
                </div>
                <ul className="space-y-1 text-zinc-300">
                  {agentRecommendation.risks.map((r, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-400">·</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-zinc-950 p-4 rounded border border-zinc-850 space-y-2">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-amber-400 font-semibold">
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Uncertainty Assessment</span>
                </div>
                <p className="text-zinc-300 leading-relaxed">
                  {agentRecommendation.uncertainty}
                </p>
              </div>
            </div>

            {/* 7. Next Action & Human Approval Gate */}
            <div className="bg-zinc-950 p-4 rounded border border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-0.5">
                  Autonomous Next Action
                </span>
                <div className="text-sm font-semibold text-zinc-200">
                  {agentRecommendation.nextAction}
                </div>
              </div>
              <button
                onClick={() => setCurrentSection('approvals')}
                className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold text-xs rounded border border-zinc-700 transition-colors shrink-0"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Open Praxis Approval Center</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-lg p-10 text-center space-y-3">
          <Bot className="w-10 h-10 text-zinc-600 mx-auto" />
          <h3 className="text-sm font-semibold text-zinc-300">
            Awaiting Goal Directive
          </h3>
          <p className="text-xs text-zinc-400 max-w-md mx-auto">
            Click "Formulate Strategy" or select a preset goal above to generate an autonomous, structured business recommendation.
          </p>
          <button
            onClick={() => handleRunAnalysis()}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-750 text-amber-400 font-semibold text-xs rounded transition-colors"
          >
            Run Default Strategy (₹50,000 Budget)
          </button>
        </div>
      )}
    </div>
  );
};
