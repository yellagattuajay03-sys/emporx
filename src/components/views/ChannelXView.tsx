import React from 'react';
import { Share2, CheckCircle2, ArrowRight, ShieldAlert, Zap } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';

export const ChannelXView: React.FC = () => {
  const { channels, selectedChannelId, setSelectedChannelId, setCurrentSection, costStructure } = useCommerce();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-zinc-100 tracking-tight">ChannelX Marketplace Comparison</h2>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Evaluates marketplace fees, audience scale, fulfillment compatibility, and net profit margins across distribution channels.
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded font-mono text-[11px] text-amber-400">
          <span>● SIMULATED MARKETPLACE APIS</span>
        </div>
      </div>

      {/* Channel Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {channels.map(chan => {
          const isSelected = chan.id === selectedChannelId;
          return (
            <div
              key={chan.id}
              className={`bg-zinc-900/80 rounded-lg p-5 border transition-all flex flex-col justify-between space-y-4 ${
                isSelected
                  ? 'border-amber-400/50 shadow-lg ring-1 ring-amber-400/20'
                  : 'border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-zinc-100">{chan.name}</h3>
                    {isSelected && (
                      <span className="text-[10px] font-mono px-2 py-0.5 bg-amber-400/10 text-amber-400 rounded font-semibold">
                        Primary Launch Channel
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-mono text-zinc-400">Platform Commission</div>
                    <div className="text-sm font-bold font-mono text-zinc-200">{chan.platformFeePercent}%</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
                  <div className="bg-zinc-950 p-2.5 rounded border border-zinc-850">
                    <span className="text-[10px] text-zinc-400 block uppercase">Est. Unit Profit</span>
                    <span className="text-emerald-400 font-bold text-sm">₹{chan.estimatedProfitPerUnit}</span>
                  </div>
                  <div className="bg-zinc-950 p-2.5 rounded border border-zinc-850">
                    <span className="text-[10px] text-zinc-400 block uppercase">Net Margin</span>
                    <span className="text-emerald-400 font-bold text-sm">{chan.netMarginPercent}%</span>
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="text-[11px] font-mono text-zinc-400 uppercase">Estimated Reach</div>
                  <div className="text-zinc-200">{chan.estimatedReach}</div>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="text-[11px] font-mono text-zinc-400 uppercase">Fulfillment Methods</div>
                  <div className="flex flex-wrap gap-1">
                    {chan.fulfillmentOptions.map(opt => (
                      <span key={opt} className="px-2 py-0.5 bg-zinc-950 border border-zinc-800 rounded text-[11px] text-zinc-300 font-mono">
                        {opt}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-1 text-[11px] font-mono text-rose-400 uppercase">
                    <ShieldAlert className="w-3 h-3" />
                    <span>Key Channel Risks</span>
                  </div>
                  <ul className="text-zinc-400 text-[11px] space-y-0.5">
                    {chan.keyRisks.map((r, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-rose-400">·</span>
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-[11px] text-zinc-400 bg-zinc-950 p-2.5 rounded border border-zinc-850">
                  <strong className="text-zinc-200">Best For: </strong> {chan.bestFor}
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-800/80 flex items-center justify-between">
                <span className="text-[11px] font-mono text-zinc-400">
                  Payout Cycle: {chan.payoutCycleDays} days
                </span>
                <button
                  onClick={() => setSelectedChannelId(chan.id)}
                  className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
                    isSelected
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
                  }`}
                >
                  {isSelected ? 'Selected Channel' : 'Select Channel'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Strategic Recommendation */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-mono uppercase text-amber-400 font-semibold">
            EmporX Multi-Channel Strategy Recommendation
          </div>
          <div className="text-sm font-semibold text-zinc-100">
            Deploy Primary Pilot on Amazon FBA (70% Volume) + Flipkart FBF (30% Volume)
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Maximizes initial Buy Box win-rate and unlocks Prime/Assured badges while maintaining working capital flexibility.
          </p>
        </div>

        <button
          onClick={() => setCurrentSection('fulfillment')}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs rounded transition-colors shrink-0"
        >
          <span>Configure Fulfillment Route</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
