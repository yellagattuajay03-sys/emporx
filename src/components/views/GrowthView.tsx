import React from 'react';
import { Sparkles, TrendingUp, DollarSign, MousePointerClick, Percent, Target } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';

export const GrowthView: React.FC = () => {
  const { campaigns, toggleCampaignStatus } = useCommerce();

  const totalSpend = campaigns.reduce((acc, c) => acc + c.adSpend, 0);
  const totalAttrRevenue = campaigns.reduce((acc, c) => acc + c.attributedRevenue, 0);
  const blendedRoas = totalSpend > 0 ? (totalAttrRevenue / totalSpend).toFixed(2) : '0';
  const totalClicks = campaigns.reduce((acc, c) => acc + c.clicks, 0);
  const totalConversions = campaigns.reduce((acc, c) => acc + c.conversions, 0);
  const avgConversionRate = totalClicks > 0 ? ((totalConversions / totalClicks) * 100).toFixed(1) : '0';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-zinc-100 tracking-tight">GrowthX Marketing & Advertising</h2>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Autonomous sponsored product campaigns, bidding optimization, keyword conversion telemetry, and blended ROAS analytics.
          </p>
        </div>
        <div className="font-mono text-[11px] text-zinc-400 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded">
          Blended ROAS: <span className="text-emerald-400 font-bold">{blendedRoas}x</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-4 space-y-1">
          <span className="text-xs text-zinc-400">Total Ad Spend</span>
          <div className="text-2xl font-bold font-mono text-zinc-100">
            ₹{totalSpend.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-zinc-400 font-mono">Within ₹8,000 launch budget</span>
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-4 space-y-1">
          <span className="text-xs text-zinc-400">Attributed Ad Revenue</span>
          <div className="text-2xl font-bold font-mono text-emerald-400">
            ₹{totalAttrRevenue.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-emerald-400 font-mono">ROAS: {blendedRoas}x multiplier</span>
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-4 space-y-1">
          <span className="text-xs text-zinc-400">Paid Conversions (Orders)</span>
          <div className="text-2xl font-bold font-mono text-amber-400">
            {totalConversions} units
          </div>
          <span className="text-[11px] text-zinc-400 font-mono">{avgConversionRate}% Click-to-Order</span>
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-4 space-y-1">
          <span className="text-xs text-zinc-400">Blended CAC (Customer Acq. Cost)</span>
          <div className="text-2xl font-bold font-mono text-sky-400">
            ₹{totalConversions > 0 ? Math.round(totalSpend / totalConversions) : 100}
          </div>
          <span className="text-[11px] text-zinc-400 font-mono">Target benchmark &lt; ₹130</span>
        </div>
      </div>

      {/* Campaigns Table */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-zinc-200">
            Active Sponsored Advertising Campaigns
          </h3>
          <span className="text-[11px] font-mono text-zinc-400">PPC BIDDING AGENT</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-950 text-zinc-400 font-mono uppercase text-[10px] border-b border-zinc-850">
              <tr>
                <th className="py-3 px-4">Campaign Name</th>
                <th className="py-3 px-4">Channel</th>
                <th className="py-3 px-4 text-right">Daily Budget</th>
                <th className="py-3 px-4 text-right">Spend</th>
                <th className="py-3 px-4 text-right">Clicks (CPC)</th>
                <th className="py-3 px-4 text-right">Orders</th>
                <th className="py-3 px-4 text-right">CAC</th>
                <th className="py-3 px-4 text-right">Revenue</th>
                <th className="py-3 px-4 text-center">ROAS</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-850">
              {campaigns.map(camp => (
                <tr key={camp.id} className="hover:bg-zinc-850/40 transition-colors">
                  <td className="py-3.5 px-4 font-semibold text-zinc-200">{camp.name}</td>
                  <td className="py-3.5 px-4 text-zinc-400 font-mono text-[11px]">{camp.channel}</td>
                  <td className="py-3.5 px-4 text-right font-mono text-zinc-300">₹{camp.dailyBudget}</td>
                  <td className="py-3.5 px-4 text-right font-mono text-zinc-200">₹{camp.adSpend}</td>
                  <td className="py-3.5 px-4 text-right font-mono text-zinc-300">
                    {camp.clicks} <span className="text-[10px] text-zinc-500">(₹{camp.cpc})</span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-mono text-emerald-400 font-bold">{camp.conversions}</td>
                  <td className="py-3.5 px-4 text-right font-mono text-zinc-300">₹{camp.cac}</td>
                  <td className="py-3.5 px-4 text-right font-mono font-bold text-zinc-100">₹{camp.attributedRevenue.toLocaleString('en-IN')}</td>
                  <td className="py-3.5 px-4 text-center font-mono">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold">
                      {camp.roas}x
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => toggleCampaignStatus(camp.id)}
                      className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                        camp.status === 'active'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {camp.status.toUpperCase()}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
