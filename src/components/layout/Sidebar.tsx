import React from 'react';
import {
  LayoutDashboard,
  Bot,
  LineChart,
  TrendingUp,
  PackageSearch,
  Factory,
  Calculator,
  Share2,
  Truck,
  Tags,
  FileSpreadsheet,
  ShoppingCart,
  RotateCcw,
  Sparkles,
  BarChart3,
  GitBranch,
  ShieldCheck,
  Brain,
  Sliders,
  Boxes
} from 'lucide-react';
import { useCommerce, NavigationSection } from '../../context/CommerceContext';

interface NavItem {
  id: NavigationSection;
  label: string;
  icon: React.ElementType;
  badge?: string | number;
}

export const Sidebar: React.FC = () => {
  const { currentSection, setCurrentSection, approvals, orders, memories, memorySource } = useCommerce();

  const pendingApprovalsCount = approvals.filter(a => a.status === 'pending').length;
  const activeOrdersCount = orders.filter(o => o.status !== 'delivered' && o.status !== 'returned').length;

  const navGroups: { groupTitle: string; items: NavItem[] }[] = [
    {
      groupTitle: 'INTELLIGENCE',
      items: [
        { id: 'dashboard', label: 'Executive Cockpit', icon: LayoutDashboard },
        { id: 'agent', label: 'EmporX AI Agent', icon: Bot },
        { id: 'memory', label: 'Hindsight Memory', icon: Brain, badge: memories.length }
      ]
    },
    {
      groupTitle: 'MARKET & DISCOVERY',
      items: [
        { id: 'marketiq', label: 'MarketIQ', icon: LineChart },
        { id: 'demandx', label: 'DemandX', icon: TrendingUp },
        { id: 'prodiq', label: 'ProdIQ', icon: PackageSearch }
      ]
    },
    {
      groupTitle: 'OPERATIONS & SOURCING',
      items: [
        { id: 'sourcex', label: 'SourceX', icon: Factory },
        { id: 'costiq', label: 'CostIQ', icon: Calculator },
        { id: 'channelx', label: 'ChannelX', icon: Share2 },
        { id: 'fulfillment', label: 'Fulfillment', icon: Truck },
        { id: 'pricing', label: 'PriceX', icon: Tags },
        { id: 'catalog', label: 'CatalogX', icon: FileSpreadsheet }
      ]
    },
    {
      groupTitle: 'EXECUTION & SIMULATION',
      items: [
        { id: 'commercex', label: 'CommerceX & Stock', icon: Boxes },
        { id: 'orders', label: 'Orders Lifecycle', icon: ShoppingCart, badge: activeOrdersCount > 0 ? activeOrdersCount : undefined },
        { id: 'returns', label: 'Returns & Reverse', icon: RotateCcw },
        { id: 'growth', label: 'GrowthX (Ads)', icon: Sparkles },
        { id: 'analytics', label: 'RevOpt (P&L)', icon: BarChart3 }
      ]
    },
    {
      groupTitle: 'GOVERNANCE & AUDIT',
      items: [
        { id: 'decisions', label: 'DecisionX Audit', icon: GitBranch },
        { id: 'approvals', label: 'Praxis Approvals', icon: ShieldCheck, badge: pendingApprovalsCount > 0 ? pendingApprovalsCount : undefined },
        { id: 'settings', label: 'System & Secrets', icon: Sliders }
      ]
    }
  ];

  return (
    <aside className="w-64 bg-zinc-950 border-r border-zinc-850 flex flex-col shrink-0 select-none">
      {/* Brand Header */}
      <div className="h-16 px-5 border-b border-zinc-800/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm bg-zinc-800 border border-zinc-700 flex items-center justify-center font-bold text-amber-400 text-sm tracking-wider">
            EX
          </div>
          <div>
            <div className="font-semibold text-zinc-100 text-sm tracking-tight flex items-center gap-1.5">
              EMPORX
              <span className="text-[10px] tracking-normal font-mono px-1 py-0.5 bg-zinc-800 text-zinc-400 rounded">v1.0</span>
            </div>
            <div className="text-[11px] text-zinc-400">Autonomous Commerce</div>
          </div>
        </div>
      </div>

      {/* Memory Status Indicator */}
      <div className="px-4 py-2.5 bg-zinc-900/60 border-b border-zinc-800/60 text-xs flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-zinc-400 font-mono text-[11px]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Engine:</span>
        </div>
        <span className="font-mono text-[11px] text-zinc-300">
          {memorySource === 'hindsight' ? 'Hindsight API' : 'Demo Memory'}
        </span>
      </div>

      {/* Scrollable Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5 scrollbar-thin">
        {navGroups.map(group => (
          <div key={group.groupTitle} className="space-y-1">
            <div className="px-2 text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-semibold mb-1.5">
              {group.groupTitle}
            </div>
            {group.items.map(item => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentSection(item.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs font-medium rounded transition-colors text-left ${
                    isActive
                      ? 'bg-zinc-800 text-zinc-100 font-semibold border-l-2 border-amber-400 pl-2'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-400' : 'text-zinc-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                        isActive ? 'bg-amber-400/20 text-amber-300' : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Footer System Info */}
      <div className="p-3 border-t border-zinc-850 bg-zinc-950/80 text-[11px] text-zinc-400 space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-zinc-400">Environment</span>
          <span className="font-mono text-zinc-300">Hackathon Prototype</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-zinc-400">Data Mode</span>
          <span className="font-mono text-amber-400/90">Simulated / Demo</span>
        </div>
      </div>
    </aside>
  );
};
