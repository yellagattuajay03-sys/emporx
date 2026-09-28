import React from 'react';
import { Tags, DollarSign, Sliders, ArrowRight, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useCommerce } from '../../context/CommerceContext';

export const PricingView: React.FC = () => {
  const { costStructure, updateSellingPrice, setCurrentSection, selectedProduct } = useCommerce();

  const minViablePrice = 750;
  const maxReasonablePrice = 1450;
  const recommendedPrice = 1099;
  const competitorMin = 899;
  const competitorMax = 1399;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSellingPrice(Number(e.target.value));
  };

  const isBelowMin = costStructure.sellingPrice < minViablePrice;
  const isAboveMax = costStructure.sellingPrice > maxReasonablePrice;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Tags className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold text-zinc-100 tracking-tight">PriceX Dynamic Optimizer</h2>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Real-time price elasticity testing, competitor benchmark ranges, and margin sensitivity simulation.
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded">
          <span>Recommended Price:</span>
          <span className="text-amber-400 font-bold">₹{recommendedPrice}</span>
        </div>
      </div>

      {/* Main Interactive Pricing Console */}
      <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-semibold text-zinc-100">
              Interactive Selling Price Slider
            </h3>
            <p className="text-xs text-zinc-400">
              Drag to observe instant recalculation of total cost, unit profit, and net margin percentage.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-400 font-mono">Current Price:</span>
            <div className="flex items-center bg-zinc-950 border border-zinc-750 px-3 py-1.5 rounded">
              <span className="font-mono text-zinc-400 text-sm mr-1">₹</span>
              <input
                type="number"
                value={costStructure.sellingPrice}
                onChange={e => updateSellingPrice(Number(e.target.value))}
                className="w-24 bg-transparent font-mono font-bold text-lg text-amber-400 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Range Slider */}
        <div className="space-y-2">
          <input
            type="range"
            min={650}
            max={1800}
            step={10}
            value={costStructure.sellingPrice}
            onChange={handleSliderChange}
            className="w-full h-2.5 bg-zinc-950 rounded-lg appearance-none cursor-pointer accent-amber-400 border border-zinc-800"
          />
          <div className="flex justify-between text-[11px] font-mono text-zinc-400">
            <span>Min Viable: ₹{minViablePrice}</span>
            <span className="text-emerald-400 font-semibold">Recommended: ₹{recommendedPrice}</span>
            <span>Max Reasonable: ₹{maxReasonablePrice}</span>
          </div>
        </div>

        {/* Warnings or Guidance */}
        {isBelowMin && (
          <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded flex items-center gap-2 text-xs text-rose-300">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Warning: Price is below the ₹{minViablePrice} minimum viable threshold. Operating at a net loss or razor-thin margin!</span>
          </div>
        )}
        {isAboveMax && (
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded flex items-center gap-2 text-xs text-amber-300">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>Notice: Price exceeds ₹{maxReasonablePrice}. Conversion rate is projected to decline by &gt;45% against top competitors.</span>
          </div>
        )}

        {/* Real-time Economic Outcome Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 pt-2">
          <div className="bg-zinc-950 p-4 rounded border border-zinc-850">
            <span className="text-[11px] font-mono text-zinc-400 block uppercase">Total Landed Costs</span>
            <span className="text-xl font-bold font-mono text-zinc-200">
              ₹{costStructure.totalCost}
            </span>
          </div>

          <div className="bg-zinc-950 p-4 rounded border border-zinc-850">
            <span className="text-[11px] font-mono text-zinc-400 block uppercase">Net Profit / Unit</span>
            <span className={`text-xl font-bold font-mono ${costStructure.profit > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              ₹{costStructure.profit}
            </span>
          </div>

          <div className="bg-zinc-950 p-4 rounded border border-zinc-850">
            <span className="text-[11px] font-mono text-zinc-400 block uppercase">Net Profit Margin</span>
            <span className={`text-xl font-bold font-mono ${costStructure.profitMargin >= 25 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {costStructure.profitMargin}%
            </span>
          </div>

          <div className="bg-zinc-950 p-4 rounded border border-zinc-850">
            <span className="text-[11px] font-mono text-zinc-400 block uppercase">Break-Even Units</span>
            <span className="text-xl font-bold font-mono text-zinc-100">
              {costStructure.breakEvenUnits} units
            </span>
          </div>
        </div>
      </div>

      {/* Competitor Benchmarking Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-5 space-y-2">
          <div className="text-[11px] font-mono uppercase text-zinc-400">Competitor Price Range</div>
          <div className="text-xl font-bold text-zinc-100 font-mono">
            ₹{competitorMin} – ₹{competitorMax}
          </div>
          <p className="text-xs text-zinc-400">
            Median price across top 10 bestselling aluminum risers on Amazon India is ₹1,149.
          </p>
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-5 space-y-2">
          <div className="text-[11px] font-mono uppercase text-zinc-400">Minimum Viable Price</div>
          <div className="text-xl font-bold text-amber-400 font-mono">
            ₹{minViablePrice}
          </div>
          <p className="text-xs text-zinc-400">
            Zero-profit floor including marketplace commission (12.5%) and fulfillment handling.
          </p>
        </div>

        <div className="bg-zinc-900/80 border border-zinc-800 rounded-lg p-5 space-y-2">
          <div className="text-[11px] font-mono uppercase text-zinc-400">Maximum Reasonable Price</div>
          <div className="text-xl font-bold text-sky-400 font-mono">
            ₹{maxReasonablePrice}
          </div>
          <p className="text-xs text-zinc-400">
            Upper ceiling before customers substitute with branded competitors like Portronics or Zebronics.
          </p>
        </div>
      </div>

      {/* Next Step */}
      <div className="flex justify-end">
        <button
          onClick={() => setCurrentSection('catalog')}
          className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs rounded transition-colors"
        >
          <span>Generate Catalog Listing in CatalogX</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
