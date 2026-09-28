import React, { useState } from 'react';
import { FileSpreadsheet, Copy, CheckCircle2, Image, Tags, Sparkles, ArrowRight } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';
import { DEMO_CATALOG_ENTRY } from '../../data/demoData';

export const CatalogView: React.FC = () => {
  const { costStructure, setCurrentSection } = useCommerce();
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-zinc-100 tracking-tight">CatalogX Listing Generator</h2>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Algorithmic product listing copy, A+ content bullets, technical specs, search keywords, and image blueprints.
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded">
          <span>Active Listing Price:</span>
          <span className="text-amber-400 font-bold">₹{costStructure.sellingPrice}</span>
        </div>
      </div>

      {/* Main Listing Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Title & Copy */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-zinc-400 font-semibold">
                Optimized Marketplace Title (Amazon / Flipkart)
              </span>
              <button
                onClick={() => copyToClipboard(DEMO_CATALOG_ENTRY.title, 'title')}
                className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                {copied === 'title' ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copied === 'title' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <p className="text-sm font-semibold text-zinc-100 leading-snug bg-zinc-950 p-3.5 rounded border border-zinc-850">
              {DEMO_CATALOG_ENTRY.title}
            </p>
            <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
              <span>MRP: <del className="text-zinc-500">₹{DEMO_CATALOG_ENTRY.mrp}</del></span>
              <span className="text-emerald-400 font-bold">Selling Price: ₹{costStructure.sellingPrice}</span>
              <span className="text-amber-400">Discount: {Math.round(((DEMO_CATALOG_ENTRY.mrp - costStructure.sellingPrice) / DEMO_CATALOG_ENTRY.mrp) * 100)}% OFF</span>
            </div>
          </div>

          {/* Bullet Points */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <span className="text-xs font-mono uppercase text-zinc-400 font-semibold">
                Conversion-Focused Bullet Points (A+ Indexable)
              </span>
              <button
                onClick={() => copyToClipboard(DEMO_CATALOG_ENTRY.bulletPoints.join('\n\n'), 'bullets')}
                className="flex items-center gap-1 text-[11px] text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                {copied === 'bullets' ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copied === 'bullets' ? 'Copied All' : 'Copy All'}</span>
              </button>
            </div>

            <div className="space-y-2.5 text-xs text-zinc-300">
              {DEMO_CATALOG_ENTRY.bulletPoints.map((bp, i) => (
                <div key={i} className="flex items-start gap-2.5 bg-zinc-950 p-3 rounded border border-zinc-850">
                  <span className="w-5 h-5 rounded bg-zinc-800 text-amber-400 flex items-center justify-center font-mono text-[10px] shrink-0 font-bold">
                    0{i + 1}
                  </span>
                  <p className="leading-relaxed">{bp}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Specifications Table */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-5 space-y-3">
            <span className="text-xs font-mono uppercase text-zinc-400 font-semibold block">
              Verified Technical Specifications
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {Object.entries(DEMO_CATALOG_ENTRY.specifications).map(([key, val]) => (
                <div key={key} className="bg-zinc-950 p-2.5 rounded border border-zinc-850 flex justify-between font-mono">
                  <span className="text-zinc-400">{key}:</span>
                  <span className="text-zinc-200 font-medium">{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Suggested Image Placeholders & SEO Keywords */}
        <div className="space-y-6">
          {/* Image Blueprints */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-5 space-y-3">
            <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
              <Image className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-200 font-mono">
                Suggested Images Blueprint
              </h3>
            </div>
            <p className="text-[11px] text-zinc-400">
              Required 2000x2000px asset frames to convert browsing traffic into orders:
            </p>

            <div className="space-y-2 text-xs">
              {DEMO_CATALOG_ENTRY.suggestedImages.map((img, i) => (
                <div key={i} className="p-3 bg-zinc-950 rounded border border-zinc-850 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-amber-400 font-bold">Slot 0{i + 1}</span>
                    <span className="text-zinc-400">{img.type}</span>
                  </div>
                  <div className="text-zinc-200 font-medium text-[11px] leading-snug">
                    {img.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Backend Keywords */}
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-5 space-y-3">
            <div className="flex items-center gap-2 border-b border-zinc-800 pb-2">
              <Tags className="w-4 h-4 text-sky-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-200 font-mono">
                Backend Search Keywords
              </h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {DEMO_CATALOG_ENTRY.backendKeywords.map(kw => (
                <span key={kw} className="px-2 py-1 bg-zinc-950 border border-zinc-800 rounded font-mono text-[11px] text-zinc-300">
                  {kw}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={() => setCurrentSection('commercex')}
            className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs rounded transition-colors flex items-center justify-center gap-2"
          >
            <span>Launch Live Commerce Operations</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
