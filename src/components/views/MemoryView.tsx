import React, { useState } from 'react';
import { Brain, Search, Plus, Sparkles, RefreshCw, CheckCircle2, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import { apiService } from '../../services/apiService';
import { MemoryItem } from '../../types';

export const MemoryView: React.FC = () => {
  const { memories, memorySource, retainMemory, refreshMemories, evaluateSupplierADemo, runAgentAnalysis, setCurrentSection } = useCommerce();

  // RETAIN Form State
  const [newMemoryText, setNewMemoryText] = useState('');
  const [newCategory, setNewCategory] = useState<MemoryItem['category']>('supplier');
  const [newEntity, setNewEntity] = useState('');
  const [newOutcome, setNewOutcome] = useState<MemoryItem['outcome']>('insight');
  const [isRetaining, setIsRetaining] = useState(false);

  // RECALL State
  const [searchQuery, setSearchQuery] = useState('');
  const [recalledList, setRecalledList] = useState<MemoryItem[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // REFLECT State
  const [reflections, setReflections] = useState<string[] | null>(null);
  const [isReflecting, setIsReflecting] = useState(false);

  // Handle Retain
  const handleRetain = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemoryText.trim()) return;
    setIsRetaining(true);
    try {
      await retainMemory(newMemoryText, newCategory, newEntity || undefined, newOutcome);
      setNewMemoryText('');
      setNewEntity('');
    } finally {
      setIsRetaining(false);
    }
  };

  // Handle Recall
  const handleRecall = async () => {
    setIsSearching(true);
    try {
      const res = await apiService.recallMemories(searchQuery);
      setRecalledList(res.matches);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle Reflect
  const handleReflect = async () => {
    setIsReflecting(true);
    try {
      const res = await apiService.reflectMemories();
      setReflections(res.reflections);
    } finally {
      setIsReflecting(false);
    }
  };

  const displayList = recalledList !== null ? recalledList : memories;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-sky-400" />
            <h2 className="text-lg font-bold text-zinc-100 tracking-tight">Hindsight Business Memory</h2>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Persistent episodic memory layer. Retains operational outcomes, recalls constraints, and reflects strategic heuristics.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-zinc-400">Active Source:</span>
            <span className="text-zinc-100 font-bold">
              {memorySource === 'hindsight' ? 'Hindsight API' : 'Demo Memory'}
            </span>
          </div>
          <button
            onClick={() => refreshMemories()}
            className="p-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded text-zinc-400 hover:text-zinc-200 transition-colors"
            title="Refresh memory store"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 19. ADAPTIVE LEARNING VISUAL DIAGRAM */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-300 font-semibold">
              Adaptive Learning Pipeline: Experience to Adaptation
            </h3>
          </div>
          <span className="text-[10px] font-mono text-zinc-400">Continuous Business Feedback Loop</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-xs">
          <div className="bg-zinc-950 p-3 rounded border border-zinc-850">
            <span className="font-mono text-[10px] text-zinc-500 uppercase block mb-1">01. First Decision</span>
            <p className="text-zinc-300 font-medium">Evaluate Supplier A (MOQ 500 = ₹1,40,000).</p>
          </div>
          <div className="bg-zinc-950 p-3 rounded border border-zinc-850">
            <span className="font-mono text-[10px] text-zinc-500 uppercase block mb-1">02. Result / Breach</span>
            <p className="text-rose-400 font-medium">Rejected: Exceeds starting budget of ₹50,000.</p>
          </div>
          <div className="bg-zinc-950 p-3 rounded border border-sky-500/30 bg-sky-500/5">
            <span className="font-mono text-[10px] text-sky-400 uppercase block mb-1">03. Memory Retained</span>
            <p className="text-sky-300 font-mono text-[11px]">"Supplier A rejected due to excessive MOQ constraint."</p>
          </div>
          <div className="bg-zinc-950 p-3 rounded border border-zinc-850">
            <span className="font-mono text-[10px] text-zinc-500 uppercase block mb-1">04. Next Decision</span>
            <p className="text-zinc-300 font-medium">Re-evaluate or search new suppliers.</p>
          </div>
          <div className="bg-zinc-950 p-3 rounded border border-emerald-500/30 bg-emerald-500/5">
            <span className="font-mono text-[10px] text-emerald-400 uppercase block mb-1">05. Improved Rec</span>
            <p className="text-emerald-300 font-medium">Recalls memory → Recommends Supplier B (MOQ 100).</p>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
          <p className="text-zinc-400 text-[11px]">
            Test this live: Click below to execute the 2-run Supplier A memory recall verification.
          </p>
          <button
            onClick={async () => {
              await evaluateSupplierADemo();
              await runAgentAnalysis('Find a profitable product I can sell with ₹50,000.', 'Supplier A');
              setCurrentSection('agent');
            }}
            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs rounded transition-colors"
          >
            Run Supplier A Memory & Adaptation Test →
          </button>
        </div>
      </div>

      {/* RETAIN, RECALL, REFLECT 3-Column Operations Console */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Operation 1: RETAIN */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
            <Plus className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider font-mono">
              1. Retain Experience
            </h3>
          </div>
          <p className="text-xs text-zinc-400">
            Store a critical business outcome or supplier learning into persistent memory:
          </p>

          <form onSubmit={handleRetain} className="space-y-3 text-xs">
            <textarea
              rows={3}
              placeholder="e.g. Supplier A has a high MOQ and was previously rejected for a ₹50,000 starting budget."
              value={newMemoryText}
              onChange={e => setNewMemoryText(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded p-2.5 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-400"
            />

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] text-zinc-400 font-mono block mb-1">Entity / Target</label>
                <input
                  type="text"
                  placeholder="e.g. Supplier A"
                  value={newEntity}
                  onChange={e => setNewEntity(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1.5 text-zinc-200 font-mono focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="text-[10px] text-zinc-400 font-mono block mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value as any)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded px-2 py-1.5 text-zinc-200 focus:outline-none focus:border-amber-400"
                >
                  <option value="supplier">Supplier</option>
                  <option value="channel">Channel</option>
                  <option value="pricing">Pricing</option>
                  <option value="returns">Returns</option>
                  <option value="fulfillment">Fulfillment</option>
                  <option value="general">General</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isRetaining || !newMemoryText.trim()}
              className="w-full py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold rounded transition-colors disabled:opacity-50"
            >
              {isRetaining ? 'Retaining to Bank...' : 'Retain to Memory'}
            </button>
          </form>
        </div>

        {/* Operation 2: RECALL */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
            <Search className="w-4 h-4 text-sky-400" />
            <h3 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider font-mono">
              2. Recall Memory
            </h3>
          </div>
          <p className="text-xs text-zinc-400">
            Query previous records matching a specific supplier, channel, or budget condition:
          </p>

          <div className="space-y-3 text-xs">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search: 'Supplier A' or 'MOQ'..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleRecall()}
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded px-2.5 py-1.5 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-400"
              />
              <button
                onClick={handleRecall}
                disabled={isSearching}
                className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded transition-colors disabled:opacity-50"
              >
                {isSearching ? '...' : 'Recall'}
              </button>
            </div>

            {recalledList !== null && (
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>Matches Found: {recalledList.length}</span>
                <button onClick={() => setRecalledList(null)} className="text-amber-400 hover:underline">
                  Clear Filter
                </button>
              </div>
            )}

            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {['Supplier A', 'MOQ budget', 'Return rate'].map(tag => (
                <button
                  key={tag}
                  onClick={() => {
                    setSearchQuery(tag);
                    apiService.recallMemories(tag).then(res => setRecalledList(res.matches));
                  }}
                  className="inline-block text-[11px] text-zinc-400 hover:text-zinc-200 bg-zinc-950 px-2 py-0.5 rounded border border-zinc-850 mr-1.5 transition-colors"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Operation 3: REFLECT */}
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <h3 className="text-sm font-semibold text-zinc-200 uppercase tracking-wider font-mono">
              3. Reflect Insights
            </h3>
          </div>
          <p className="text-xs text-zinc-400">
            Synthesize high-level business heuristics and decision principles from accumulated experiences:
          </p>

          <button
            onClick={handleReflect}
            disabled={isReflecting}
            className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs rounded transition-colors disabled:opacity-50"
          >
            {isReflecting ? 'Synthesizing...' : 'Synthesize Heuristics'}
          </button>

          {reflections && (
            <div className="space-y-2 text-xs bg-zinc-950 p-3 rounded border border-zinc-850 max-h-44 overflow-y-auto">
              {reflections.map((r, i) => (
                <div key={i} className="text-zinc-300 leading-relaxed font-mono text-[11px] border-b border-zinc-850/60 pb-1.5 last:border-none">
                  → {r}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Memory Bank List */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-zinc-200">
            Stored Business Memories ({displayList.length})
          </h3>
          <span className="text-[11px] font-mono text-zinc-400">
            Provider: {memorySource === 'hindsight' ? 'Hindsight Live Engine' : 'Demo Memory Store'}
          </span>
        </div>

        <div className="divide-y divide-zinc-850">
          {displayList.map(mem => (
            <div key={mem.id} className="p-4 space-y-2 hover:bg-zinc-850/40 transition-colors">
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <div className="flex items-center gap-2">
                  <span className="text-amber-400 font-bold uppercase">{mem.entity || mem.category}</span>
                  <span>·</span>
                  <span className="text-zinc-500">{new Date(mem.timestamp).toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      mem.outcome === 'rejected'
                        ? 'bg-rose-500/10 text-rose-400'
                        : mem.outcome === 'warning'
                        ? 'bg-amber-400/10 text-amber-400'
                        : 'bg-emerald-500/10 text-emerald-400'
                    }`}
                  >
                    {mem.outcome}
                  </span>
                  <span className="text-[10px] text-zinc-500">
                    Source: {mem.source === 'hindsight' ? 'Hindsight' : 'Demo Memory'}
                  </span>
                </div>
              </div>
              <p className="text-xs text-zinc-200 leading-relaxed font-medium">
                {mem.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
