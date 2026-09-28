import React, { useState } from 'react';
import { Sliders, ShieldCheck, Key, Database, RefreshCw, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';

export const SettingsView: React.FC = () => {
  const { systemStatus, budget, setBudget, resetAllData } = useCommerce();
  const [resetting, setResetting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const handleReset = async () => {
    setResetting(true);
    try {
      await resetAllData();
      setStatusMsg('Successfully reset all operations, inventory, and memories to starting state.');
      setTimeout(() => setStatusMsg(null), 4000);
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-zinc-100 tracking-tight">System & Environment Configuration</h2>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Backend service connectivity, API security verification, and simulation sandbox parameters.
          </p>
        </div>
      </div>

      {statusMsg && (
        <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{statusMsg}</span>
        </div>
      )}

      {/* Connectivity & Secrets Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Gemini AI Provider Card */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-semibold text-zinc-200">Gemini AI Provider</h3>
            </div>
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold uppercase ${
                systemStatus.geminiConfigured
                  ? 'bg-emerald-500/10 text-emerald-400'
                  : 'bg-amber-400/10 text-amber-400'
              }`}
            >
              {systemStatus.geminiConfigured ? 'GEMINI ACTIVE' : 'DETERMINISTIC FALLBACK'}
            </span>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed">
            {systemStatus.geminiConfigured
              ? 'Connected to Gemini API using server-side proxy. Autonomous agent formulations are generated dynamically using gemini-3.8-flash.'
              : 'GEMINI_API_KEY is not configured in environment variables. EmporX is running smoothly in deterministic autonomous mode with realistic e-commerce reasoning.'}
          </p>

          <div className="text-[11px] font-mono text-zinc-500 bg-zinc-950 p-2.5 rounded border border-zinc-850">
            Model: {systemStatus.geminiConfigured ? 'gemini-3.8-flash' : 'emporx-deterministic-v1'}
          </div>
        </div>

        {/* Hindsight Memory Engine Card */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-sky-400" />
              <h3 className="text-sm font-semibold text-zinc-200">Hindsight Memory Service</h3>
            </div>
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded font-semibold uppercase ${
                systemStatus.hindsightConfigured
                  ? 'bg-emerald-500/10 text-emerald-400'
                  : 'bg-zinc-800 text-zinc-400'
              }`}
            >
              {systemStatus.hindsightConfigured ? 'HINDSIGHT LIVE' : 'DEMO MEMORY ACTIVE'}
            </span>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed">
            {systemStatus.hindsightConfigured
              ? `Connected to Hindsight Bank ID: ${systemStatus.hindsightBankId}. All memories are persistently vectorized and recalled in real-time.`
              : 'HINDSIGHT_API_KEY is not configured. EmporX has activated its built-in Demo Memory engine. Full support for Retain, Recall, and Reflect is fully operational locally.'}
          </p>

          <div className="text-[11px] font-mono text-zinc-500 bg-zinc-950 p-2.5 rounded border border-zinc-850">
            Bank: {systemStatus.hindsightBankId || 'local-demo-bank-01'} | Records: {systemStatus.memoryCount}
          </div>
        </div>
      </div>

      {/* Security Constitution */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-5 space-y-3">
        <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold uppercase">
          <ShieldCheck className="w-4 h-4" />
          <span>Security & API Token Governance Constitution</span>
        </div>
        <ul className="text-xs text-zinc-400 space-y-1.5 font-mono text-[11px]">
          <li>✓ Zero API keys or secrets are exposed in browser JavaScript bundles.</li>
          <li>✓ All AI generation and memory queries route strictly through backend Express server proxies (/api/*).</li>
          <li>✓ No fake claims of live Amazon / Flipkart API access; operations are transparently labeled as SIMULATED DEMO.</li>
          <li>✓ Graceful degradation: Application never enters a broken state if external network APIs are unresponsive.</li>
        </ul>
      </div>

      {/* Working Capital Setting & Factory Reset */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-5 space-y-4">
        <h3 className="text-sm font-semibold text-zinc-200">
          Simulation Parameters & Reset
        </h3>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <div>
            <div className="font-semibold text-zinc-200">Working Capital Budget Baseline</div>
            <div className="text-zinc-400 text-[11px]">Used by SourceX, CostIQ, and AI Agent to reject out-of-budget suppliers.</div>
          </div>
          <div className="flex items-center gap-2 font-mono">
            <span className="text-zinc-400">₹</span>
            <input
              type="number"
              value={budget}
              onChange={e => setBudget(Number(e.target.value))}
              className="w-32 bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 text-zinc-100 font-bold focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>

        <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
          <div className="text-xs text-zinc-400">
            Reset simulation to initial state (re-evaluates Supplier A, resets orders & memories).
          </div>
          <button
            onClick={handleReset}
            disabled={resetting}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded text-xs font-semibold transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${resetting ? 'animate-spin' : ''}`} />
            <span>Reset Demo State</span>
          </button>
        </div>
      </div>
    </div>
  );
};
