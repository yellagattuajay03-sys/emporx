import React from 'react';
import { PackageSearch, CheckCircle2, ArrowRight, Star } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';

export const ProdIQView: React.FC = () => {
  const { products, selectedProduct, setSelectedProduct, setCurrentSection } = useCommerce();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <PackageSearch className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-zinc-100 tracking-tight">ProdIQ Discovery</h2>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Algorithmic product opportunity discovery and multi-dimensional viability comparison matrix.
          </p>
        </div>
        <div className="font-mono text-[11px] text-zinc-400 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded">
          Active Selection: <span className="text-amber-400 font-semibold">{selectedProduct.name}</span>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg overflow-hidden">
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-zinc-200">
            Candidate Product Opportunities Comparison Matrix
          </h3>
          <span className="text-[11px] font-mono text-zinc-400">DEMO BENCHMARKS</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-zinc-950 text-zinc-400 font-mono uppercase text-[10px] border-b border-zinc-850">
              <tr>
                <th className="py-3 px-4">Opportunity</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4 text-right">Market Size</th>
                <th className="py-3 px-4 text-right">Avg Price</th>
                <th className="py-3 px-4 text-right">Monthly Demand</th>
                <th className="py-3 px-4 text-right">Net Margin</th>
                <th className="py-3 px-4 text-center">Score</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-850">
              {products.map(prod => {
                const isSelected = prod.id === selectedProduct.id;
                return (
                  <tr
                    key={prod.id}
                    className={`transition-colors ${
                      isSelected ? 'bg-amber-400/5' : 'hover:bg-zinc-850/50'
                    }`}
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        {isSelected && (
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
                        )}
                        <div>
                          <div className="font-semibold text-zinc-100">{prod.name}</div>
                          <div className="text-[11px] text-zinc-400 line-clamp-1">{prod.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-zinc-300 font-mono text-[11px]">
                      {prod.category}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-zinc-200">
                      ₹{prod.marketSizeInCrores} Cr
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-zinc-200">
                      ₹{prod.averageSellingPrice}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-zinc-200">
                      {prod.monthlyDemand.toLocaleString('en-IN')} units
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-emerald-400 font-semibold">
                      {prod.estimatedNetMargin}%
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono">
                      <span className="inline-block px-2 py-0.5 rounded bg-zinc-950 border border-zinc-800 text-amber-400 font-bold">
                        {prod.opportunityScore}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {isSelected ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400 text-[11px] font-mono font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Active SKU</span>
                        </span>
                      ) : (
                        <button
                          onClick={() => setSelectedProduct(prod)}
                          className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded font-medium text-[11px] transition-colors"
                        >
                          Select SKU
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

      {/* Selected Product Summary Card */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-[11px] font-mono uppercase text-amber-400 font-semibold">
            Ready for Sourcing Evaluation
          </div>
          <div className="text-sm font-semibold text-zinc-100">
            {selectedProduct.name} — Recommended Flagship for ₹50,000 Starting Budget
          </div>
          <p className="text-xs text-zinc-400 max-w-2xl">
            High unit economics with 31.8% net margin, low weight profile (260g) reducing reverse logistics liability, and fast supplier re-stock cycle.
          </p>
        </div>

        <button
          onClick={() => setCurrentSection('sourcex')}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs rounded transition-colors shrink-0"
        >
          <span>Evaluate Suppliers in SourceX</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
