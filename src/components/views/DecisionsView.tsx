import React from 'react';
import { GitBranch, ShieldCheck, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';

export const DecisionsView: React.FC = () => {
  const { decisions, setCurrentSection } = useCommerce();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-zinc-100 tracking-tight">DecisionX Audit Trail</h2>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Transparent immutable ledger of autonomous decisions, rationales, telemetry datasets utilized, and human authorization status.
          </p>
        </div>
        <div className="font-mono text-[11px] text-zinc-400 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded">
          <span>Total Decisions: </span>
          <span className="text-amber-400 font-bold">{decisions.length}</span>
        </div>
      </div>

      {/* Decisions List */}
      <div className="space-y-4">
        {decisions.map(dec => (
          <div
            key={dec.id}
            className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-5 space-y-4 hover:border-zinc-750 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <h3 className="text-sm font-bold text-zinc-100">{dec.title}</h3>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-zinc-800 text-zinc-300 rounded uppercase">
                  {dec.module}
                </span>
              </div>
              <div className="flex items-center gap-3 font-mono text-[11px]">
                <span className="text-zinc-400">{new Date(dec.timestamp).toLocaleString()}</span>
                <span
                  className={`px-2 py-0.5 rounded font-semibold uppercase ${
                    dec.approvalStatus === 'approved' || dec.approvalStatus === 'executed'
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : dec.approvalStatus === 'declined'
                      ? 'bg-rose-500/10 text-rose-400'
                      : 'bg-amber-400/10 text-amber-400'
                  }`}
                >
                  {dec.approvalStatus}
                </span>
              </div>
            </div>

            {/* Core Decision & Reason */}
            <div className="space-y-2 text-xs">
              <div className="bg-zinc-950 p-3.5 rounded border border-zinc-850 space-y-1">
                <span className="text-[10px] font-mono uppercase text-amber-400 font-semibold block">
                  Autonomous Decision
                </span>
                <p className="text-zinc-200 font-medium leading-relaxed">{dec.decision}</p>
              </div>

              <div className="bg-zinc-950 p-3.5 rounded border border-zinc-850 space-y-1">
                <span className="text-[10px] font-mono uppercase text-zinc-400 font-semibold block">
                  Core Rationale & Why
                </span>
                <p className="text-zinc-300 leading-relaxed">{dec.reason}</p>
              </div>
            </div>

            {/* Data Used & Expected Impact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-zinc-950 p-3 rounded border border-zinc-850 space-y-1">
                <span className="text-[10px] uppercase text-zinc-400 block font-semibold">
                  Data Inputs & Telemetry Used
                </span>
                <ul className="text-zinc-300 space-y-0.5 text-[11px]">
                  {dec.dataUsed.map((d, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-400">·</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-zinc-950 p-3 rounded border border-zinc-850 space-y-1">
                <span className="text-[10px] uppercase text-zinc-400 block font-semibold">
                  Expected Business Impact & Risk Profile
                </span>
                <div className="text-emerald-400 font-medium text-[11px] leading-relaxed">
                  {dec.expectedImpact}
                </div>
                <div className="text-[10px] text-zinc-400 pt-1">
                  Risk Level: <span className="text-zinc-200 uppercase font-bold">{dec.risk}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
