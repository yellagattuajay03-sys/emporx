import React, { useState } from 'react';
import { ShieldCheck, Check, X, AlertTriangle, ArrowRight, DollarSign, Clock } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';

export const PraxisView: React.FC = () => {
  const { approvals, handleApproval } = useCommerce();
  const [reviewNotes, setReviewNotes] = useState<Record<string, string>>({});

  const pendingList = approvals.filter(a => a.status === 'pending');
  const historyList = approvals.filter(a => a.status !== 'pending');

  const onApprove = (id: string) => {
    handleApproval(id, 'approved', reviewNotes[id]);
  };

  const onReject = (id: string) => {
    handleApproval(id, 'rejected', reviewNotes[id] || 'Rejected by operator');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-zinc-100 tracking-tight">Praxis Human Approval Center</h2>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Strict human-in-the-loop governance gates. Mandatory merchant authorization required before capital disbursement, listing releases, or ad spend scaling.
          </p>
        </div>
        <div className="font-mono text-[11px] text-zinc-400 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded">
          Pending Authorizations: <span className="text-amber-400 font-bold">{pendingList.length}</span>
        </div>
      </div>

      {/* Governance Threshold Rule Banner */}
      <div className="bg-zinc-900/60 border border-zinc-800 rounded-lg p-4 text-xs text-zinc-400 space-y-1">
        <span className="font-mono text-zinc-300 uppercase font-semibold text-[11px] block">
          Mandatory Human Approval Triggers:
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] pt-1">
          <div>· Purchasing Bulk Inventory (&gt; ₹10,000)</div>
          <div>· Publishing New Live Catalog Listings</div>
          <div>· Price Adjustments (&gt; 10% delta)</div>
          <div>· Scaling Ad Spend (&gt; ₹5,000 budget)</div>
          <div>· Marketplace Account Sync & External API Calls</div>
          <div>· Supplier Procurement Purchase Orders (POs)</div>
        </div>
      </div>

      {/* Pending Approvals */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-zinc-200">
          Pending Governance Authorizations ({pendingList.length})
        </h3>

        {pendingList.length === 0 ? (
          <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-lg p-8 text-center text-xs text-zinc-400">
            No pending authorization requests. All autonomous agent proposals are up to date.
          </div>
        ) : (
          pendingList.map(appr => (
            <div
              key={appr.id}
              className="bg-zinc-900/90 border border-amber-400/30 rounded-lg p-5 space-y-4 shadow-lg ring-1 ring-amber-400/10"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-3">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono uppercase text-amber-400 font-semibold">
                    {appr.type.replace('_', ' ')}
                  </span>
                  <h4 className="text-sm font-bold text-zinc-100">{appr.title}</h4>
                </div>
                <div className="text-right font-mono text-xs">
                  <div className="text-zinc-400 text-[10px]">Capital Impact</div>
                  <div className="text-base font-bold text-zinc-100">
                    ₹{appr.financialImpact.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed">
                {appr.description}
              </p>

              {/* Data Summary Grid */}
              <div className="bg-zinc-950 p-3.5 rounded border border-zinc-850 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                {Object.entries(appr.dataSummary).map(([key, val]) => (
                  <div key={key}>
                    <span className="text-[10px] text-zinc-500 uppercase block">{key}</span>
                    <span className="text-zinc-200 font-medium">{val}</span>
                  </div>
                ))}
              </div>

              {/* Authorization Action Buttons & Notes */}
              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-zinc-850">
                <input
                  type="text"
                  placeholder="Optional review notes or instructions for the agent..."
                  value={reviewNotes[appr.id] || ''}
                  onChange={e => setReviewNotes({ ...reviewNotes, [appr.id]: e.target.value })}
                  className="flex-1 bg-zinc-950 border border-zinc-800 rounded px-3 py-1.5 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-400"
                />

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onReject(appr.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded text-xs font-semibold transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Reject Proposal</span>
                  </button>
                  <button
                    onClick={() => onApprove(appr.id)}
                    className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 rounded text-xs font-bold transition-colors"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Authorize & Execute</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* History */}
      {historyList.length > 0 && (
        <div className="space-y-3 pt-4">
          <h3 className="text-xs font-mono uppercase text-zinc-400 font-semibold">
            Authorization History Ledger
          </h3>
          <div className="space-y-2">
            {historyList.map(h => (
              <div key={h.id} className="p-3 bg-zinc-950 rounded border border-zinc-850 flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-zinc-200">{h.title}</span>
                  <span className="text-zinc-500 text-[11px] block mt-0.5">{h.notes || 'No review notes entered.'}</span>
                </div>
                <div className="text-right font-mono">
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase ${
                      h.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                    }`}
                  >
                    {h.status}
                  </span>
                  <div className="text-[10px] text-zinc-500 mt-0.5">₹{h.financialImpact.toLocaleString('en-IN')}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
