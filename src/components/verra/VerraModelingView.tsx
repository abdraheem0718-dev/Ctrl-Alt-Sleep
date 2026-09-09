import React, { useState, useMemo, useEffect } from 'react';
import {
  FarmerInputs,
  TargetBiome
} from '../../types/greenvest';
import {
  VERRA_BIOMES_CATALOG,
  calculateVerraAccounting
} from '../../utils/verraVM0047Engine';
import {
  ShieldAlert,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  TreeDeciduous,
  Leaf,
  Scale,
  Sparkles,
  Info,
  Sliders,
  DollarSign,
  Download,
  CheckCircle2,
  Layers,
  ArrowRight
} from 'lucide-react';
import { TRANSLATIONS, Language } from '../../utils/translations';
import { getVerraString, getBiomeDisplayName, getComplianceCheckTranslation } from '../../utils/localizedStrings';

interface VerraModelingViewProps {
  currentInputs: FarmerInputs;
  onApplyBiomeToCalculator: (biome: TargetBiome, priceInr: number) => void;
  language: Language;
}

export const VerraModelingView: React.FC<VerraModelingViewProps> = ({
  currentInputs,
  onApplyBiomeToCalculator,
  language
}) => {
  const t = TRANSLATIONS[language];
  const v = (key: string) => getVerraString(key, language);

  const [selectedBiome, setSelectedBiome] = useState<TargetBiome>('Tropical Dry Deciduous & Agroforestry');
  const [permanenceBuffer, setPermanenceBuffer] = useState<number>(15); // %
  const [activityLeakage, setActivityLeakage] = useState<number>(12); // %
  const [mrvDiscount, setMrvDiscount] = useState<number>(8); // %
  const [horizonYears, setHorizonYears] = useState<number>(10);
  const [currency, setCurrency] = useState<'GBP' | 'USD' | 'INR'>('INR');
  const [syncDone, setSyncDone] = useState<boolean>(false);

  const hectares = useMemo(() => {
    return Math.round((currentInputs.landArea * 0.404686) * 10) / 10;
  }, [currentInputs.landArea]);

  // Run full Verra VM0047 accounting
  const results = useMemo(() => {
    return calculateVerraAccounting({
      hectares,
      targetBiome: selectedBiome,
      permanenceBufferPercent: permanenceBuffer,
      leakageDeductionPercent: activityLeakage,
      mrvDiscountPercent: mrvDiscount,
      carbonPriceGbp: 15
    });
  }, [hectares, selectedBiome, permanenceBuffer, activityLeakage, mrvDiscount]);

  const activeBiomeSpec = VERRA_BIOMES_CATALOG[selectedBiome] || VERRA_BIOMES_CATALOG['Tropical Dry Deciduous & Agroforestry'];

  // Currency multiplier helper
  const formatCurrency = (amountGbp: number) => {
    if (currency === 'INR') {
      const inr = Math.round(amountGbp * results.valuations.fxRateGbpToInr);
      return `₹${inr.toLocaleString('en-IN')}`;
    }
    if (currency === 'USD') {
      const usd = Math.round(amountGbp * results.valuations.fxRateGbpToUsd);
      return `$${usd.toLocaleString('en-US')}`;
    }
    return `£${amountGbp.toLocaleString('en-GB')}`;
  };

  const formatPricePerTonne = () => {
    if (currency === 'INR') return `₹${results.valuations.pricePerTonneInr.toLocaleString('en-IN')}/t`;
    if (currency === 'USD') return `$${results.valuations.pricePerTonneUsd}/t`;
    return `£${results.valuations.pricePerTonneGbp}/t`;
  };

  // Automatically sync to calculator whenever biome or price changes
  useEffect(() => {
    onApplyBiomeToCalculator(selectedBiome, results.valuations.pricePerTonneInr);
  }, [selectedBiome, results.valuations.pricePerTonneInr]);

  const deductions = horizonYears === 10 ? results.deductions10Year : results.deductionsFullHorizon;

  // Waterfall Chart items calculation
  const waterfallSteps = [
    {
      name: v('grossBiomassGrowth'),
      subtext: `${results.annualGrossRatePerHa} tCO₂e/ha/yr × ${hectares} ha × ${horizonYears} yrs`,
      amount: deductions.grossBiomassGrowthTonnes,
      type: 'positive' as const,
      color: 'bg-emerald-700'
    },
    {
      name: v('baselineControlGrowth'),
      subtext: v('baselineControlSubtext'),
      amount: -deductions.baselineControlPlotGrowthTonnes,
      type: 'negative' as const,
      color: 'bg-rose-500'
    },
    {
      name: v('grossRemovalsBeforeReserve'),
      subtext: v('grossRemovalsSubtext'),
      amount: deductions.grossRemovalsTonnes,
      type: 'subtotal' as const,
      color: 'bg-emerald-800'
    },
    {
      name: `${v('permanenceBufferPool')} (${permanenceBuffer}%)`,
      subtext: v('permanenceBufferSubtext'),
      amount: -deductions.permanenceBufferWithheldTonnes,
      type: 'negative' as const,
      color: 'bg-amber-600'
    },
    {
      name: `${v('activityLeakageDeduction')} (${activityLeakage}%)`,
      subtext: v('activityLeakageSubtext'),
      amount: -deductions.activityLeakageDeductionTonnes,
      type: 'negative' as const,
      color: 'bg-rose-600'
    },
    {
      name: `${v('mrvUncertaintyDiscount')} (${mrvDiscount}%)`,
      subtext: v('mrvUncertaintySubtext'),
      amount: -deductions.mrvUncertaintyDeductionTonnes,
      type: 'negative' as const,
      color: 'bg-purple-600'
    },
    {
      name: v('netCreditableYield'),
      subtext: v('netCreditableSubtext'),
      amount: deductions.netCreditableYieldTonnes,
      type: 'total' as const,
      color: 'bg-[#2D4A22]'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Pillar Banner */}
      <div className="bg-white rounded-3xl p-6 border border-[#E0D8C8] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-[#2D4A22] text-[#CCD5AE]">
              {v('pillar2')}
            </span>
            <span className="text-xs font-semibold text-[#6D7A65]">
              {v('institutionalAccounting')}
            </span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#1A2E11]">
            {v('verraBannerTitle')}
          </h2>
          <p className="text-xs text-[#52604D] max-w-3xl mt-1 leading-relaxed">
            {v('verraBannerDesc')}
          </p>
        </div>

        {/* Currency Switcher & Action */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-[#F7F5EE] p-1 rounded-2xl border border-[#E0D8C8] flex items-center text-xs font-bold">
            <button
              onClick={() => setCurrency('INR')}
              className={`px-2.5 py-1 rounded-xl transition-colors ${
                currency === 'INR' ? 'bg-[#2D4A22] text-white shadow-2xs' : 'text-[#6D7A65] hover:text-[#1A2E11]'
              }`}
            >
              INR (₹)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-2.5 py-1 rounded-xl transition-colors ${
                currency === 'USD' ? 'bg-[#2D4A22] text-white shadow-2xs' : 'text-[#6D7A65] hover:text-[#1A2E11]'
              }`}
            >
              USD ($)
            </button>
            <button
              onClick={() => setCurrency('GBP')}
              className={`px-2.5 py-1 rounded-xl transition-colors ${
                currency === 'GBP' ? 'bg-[#2D4A22] text-white shadow-2xs' : 'text-[#6D7A65] hover:text-[#1A2E11]'
              }`}
            >
              GBP (£)
            </button>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold shadow-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>✓ {v('autoSyncedBadge')}</span>
          </div>
        </div>
      </div>

      {/* Biome Selection Tabs */}
      <div className="bg-white rounded-3xl p-5 border border-[#E0D8C8] shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-[#6D7A65]">
            {v('selectTargetBiome')}
          </span>
          <span className="text-xs font-mono text-[#2D4A22] font-semibold">
            {v('activeParcel')} {currentInputs.landArea} {v('acres')} ({hectares} Ha)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5">
          {(Object.keys(VERRA_BIOMES_CATALOG) as TargetBiome[]).map(biomeKey => {
            const spec = VERRA_BIOMES_CATALOG[biomeKey];
            const isSelected = selectedBiome === biomeKey;
            return (
              <button
                key={biomeKey}
                onClick={() => setSelectedBiome(biomeKey)}
                className={`p-3.5 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#1A2E11] text-white border-[#8BA888] shadow-md ring-2 ring-[#8BA888]/40'
                    : 'bg-[#FAF8F2] text-[#2C3626] border-[#E0D8C8] hover:bg-[#F4F1EA]'
                }`}
              >
                <div>
                  <div className="text-[11px] font-bold font-serif leading-tight line-clamp-1 mb-1">
                    {getBiomeDisplayName(spec.id, language)}
                  </div>
                  <div className={`text-[10px] ${isSelected ? 'text-[#CCD5AE]' : 'text-[#6D7A65]'}`}>
                    {v('sequestrationLabel')}
                  </div>
                  <div className="text-xs font-mono font-bold">
                    {spec.sequestrationRateMin} – {spec.sequestrationRateMax} <span className="text-[10px] font-sans font-normal">tCO₂e/ha/yr</span>
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-white/10 text-[11px]">
                  <span className={`text-[9px] uppercase font-bold block ${isSelected ? 'text-amber-300' : 'text-amber-700'}`}>
                    {v('creditPriceLabel')}
                  </span>
                  <span className="font-bold font-mono">
                    {currency === 'GBP' && `£${spec.typicalPriceGbpMin}–£${spec.typicalPriceGbpMax}/t`}
                    {currency === 'USD' && `$${spec.typicalPriceUsdMin}–$${spec.typicalPriceUsdMax}/t`}
                    {currency === 'INR' && `₹${spec.typicalPriceInrMin.toLocaleString('en-IN')}–₹${spec.typicalPriceInrMax.toLocaleString('en-IN')}/t`}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Biome Detail Card */}
        <div className="p-3.5 rounded-2xl bg-[#F7F5EE] border border-[#E0D8C8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <span className="font-bold text-[#1A2E11]">{v('keyAllometricEq')}</span>
            <p className="text-[#52604D] font-mono text-[11px]">{activeBiomeSpec.allometricEquation}</p>
            <p className="text-[10px] text-[#6D7A65] italic">{activeBiomeSpec.citation}</p>
          </div>
          <div className="text-right shrink-0">
            <span className="text-[10px] uppercase font-bold text-[#6D7A65] block">
              {v('representativeSpecies')}
            </span>
            <span className="font-semibold text-[#1A2E11] text-[11px]">
              {activeBiomeSpec.representativeSpecies.slice(0, 2).join(', ')}
            </span>
          </div>
        </div>
      </div>

      {/* Main Deduction Modeling Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (5 cols): Configurable Deduction Sliders & VM0047 Inputs */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-5 border border-[#E0D8C8] shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#E0D8C8]">
              <Sliders className="w-4 h-4 text-[#2D4A22]" />
              <h3 className="font-bold text-sm text-[#1A2E11] font-serif">
                {v('deductionParameters')}
              </h3>
            </div>

            {/* Slider 1: Permanence Buffer Pool */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-[#1A2E11] flex items-center gap-1.5">
                  <span>{v('permanenceBufferPool')}</span>
                  <span className="text-[10px] text-[#6D7A65] font-normal">(10% – 25%)</span>
                </label>
                <span className="font-bold font-mono px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-200">
                  {permanenceBuffer}%
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="25"
                step="1"
                value={permanenceBuffer}
                onChange={e => setPermanenceBuffer(parseInt(e.target.value))}
                className="w-full h-2 bg-[#E0D8C8] rounded-lg appearance-none cursor-pointer accent-[#2D4A22]"
              />
              <p className="text-[10px] text-[#6D7A65] leading-snug">
                {v('permanenceBufferDesc')}
              </p>
            </div>

            {/* Slider 2: Activity Shifting Leakage */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-[#1A2E11] flex items-center gap-1.5">
                  <span>{v('activityLeakageDeduction')}</span>
                  <span className="text-[10px] text-[#6D7A65] font-normal">(10% – 20%)</span>
                </label>
                <span className="font-bold font-mono px-2 py-0.5 rounded-md bg-rose-100 text-rose-900 border border-rose-200">
                  {activityLeakage}%
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="20"
                step="1"
                value={activityLeakage}
                onChange={e => setActivityLeakage(parseInt(e.target.value))}
                className="w-full h-2 bg-[#E0D8C8] rounded-lg appearance-none cursor-pointer accent-[#2D4A22]"
              />
              <p className="text-[10px] text-[#6D7A65] leading-snug">
                {v('activityLeakageDesc')}
              </p>
            </div>

            {/* Slider 3: MRV Uncertainty Discount */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-[#1A2E11] flex items-center gap-1.5">
                  <span>{v('mrvUncertaintyDiscount')}</span>
                  <span className="text-[10px] text-[#6D7A65] font-normal">(5% – 15%)</span>
                </label>
                <span className="font-bold font-mono px-2 py-0.5 rounded-md bg-purple-100 text-purple-900 border border-purple-200">
                  {mrvDiscount}%
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="15"
                step="1"
                value={mrvDiscount}
                onChange={e => setMrvDiscount(parseInt(e.target.value))}
                className="w-full h-2 bg-[#E0D8C8] rounded-lg appearance-none cursor-pointer accent-[#2D4A22]"
              />
              <p className="text-[10px] text-[#6D7A65] leading-snug">
                {v('mrvUncertaintyDesc')}
              </p>
            </div>

            {/* Horizon selector */}
            <div className="pt-2 border-t border-[#E0D8C8]">
              <label className="text-[11px] font-bold text-[#1A2E11] block mb-1.5">
                {v('accountingPeriod')}
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
                {[10, 20, 30].map(y => (
                  <button
                    key={y}
                    onClick={() => setHorizonYears(y)}
                    className={`py-1.5 rounded-xl border text-center transition-all ${
                      horizonYears === y
                        ? 'bg-[#2D4A22] text-white border-[#2D4A22] shadow-2xs font-bold'
                        : 'bg-[#F7F5EE] text-[#52604D] border-[#E0D8C8] hover:bg-white'
                    }`}
                  >
                    {y} {v('yearsUnit')}
                  </button>
                ))}
              </div>
            </div>

            {/* Net Efficiency Summary */}
            <div className="p-4 rounded-2xl bg-[#F7F5EE] border border-[#E0D8C8] space-y-2 text-xs">
              <div className="flex items-center justify-between text-[#52604D]">
                <span>{v('grossSeqRate')}</span>
                <span className="font-bold font-mono text-[#1A2E11]">
                  {results.annualGrossRatePerHa} tCO₂e/ha/yr
                </span>
              </div>
              <div className="flex items-center justify-between text-[#52604D]">
                <span>{v('totalDeductions')}</span>
                <span className="font-bold font-mono text-rose-700">
                  -{Math.round((1 - results.annualNetCreditableRatePerHa / results.annualGrossRatePerHa) * 100)}%
                </span>
              </div>
              <div className="flex items-center justify-between pt-1.5 border-t border-[#E0D8C8] font-bold">
                <span className="text-[#1A2E11]">{v('netCreditableRate')}</span>
                <span className="font-mono text-emerald-800 text-sm">
                  {results.annualNetCreditableRatePerHa} tCO₂e/ha/yr
                </span>
              </div>
            </div>
          </div>

          {/* Compliance Checklist */}
          <div className="bg-white rounded-3xl p-5 border border-[#E0D8C8] shadow-sm space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-[#E0D8C8]">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <h4 className="font-bold text-xs text-[#1A2E11] font-serif">
                {v('auditChecks')}
              </h4>
            </div>

            <div className="space-y-2">
              {results.vm0047ComplianceChecks.map((item, i) => {
                const percent = item.check.includes('Permanence')
                  ? permanenceBuffer
                  : item.check.includes('Leakage')
                  ? activityLeakage
                  : item.check.includes('Uncertainty')
                  ? mrvDiscount
                  : undefined;
                const localized = getComplianceCheckTranslation(item.check, language, percent);
                const checkTitle = localized?.check || item.check;
                const checkDetails = localized?.details || item.details;

                return (
                  <div key={i} className="p-2.5 rounded-xl bg-[#F7F5EE] border border-[#E0D8C8] text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#1A2E11] text-[11px]">{checkTitle}</span>
                      <span className="text-[10px] px-2 py-0.2 rounded-full font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        {v('passedStatus')}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#6D7A65] leading-snug">{checkDetails}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): The Verra VM0047 Waterfall & Economic Impact */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Waterfall Card */}
          <div className="bg-white rounded-3xl p-6 border border-[#E0D8C8] shadow-sm space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E0D8C8]">
              <div>
                <h3 className="font-bold text-base text-[#1A2E11] font-serif">
                  {v('waterfallTitle')} ({horizonYears}-{v('yearsUnit')})
                </h3>
                <p className="text-xs text-[#6D7A65]">
                  {v('waterfallDesc')}
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-[#6D7A65] block">
                  {v('netTradeableVcus')}
                </span>
                <span className="text-lg font-bold font-mono text-emerald-800">
                  {deductions.netCreditableYieldTonnes} tCO₂e
                </span>
              </div>
            </div>

            {/* Waterfall Table & Relative Bars */}
            <div className="space-y-3">
              {waterfallSteps.map((step, idx) => {
                const maxAmount = deductions.grossBiomassGrowthTonnes || 1;
                const barWidth = Math.min(100, Math.max(4, Math.round((Math.abs(step.amount) / maxAmount) * 100)));

                return (
                  <div key={idx} className="p-3 rounded-2xl bg-[#F7F5EE] border border-[#E0D8C8] space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-[#1A2E11]">{step.name}</span>
                        <span className="text-[10px] text-[#6D7A65] block">{step.subtext}</span>
                      </div>
                      <div className="text-right">
                        <span className={`font-bold font-mono text-sm ${
                          step.type === 'negative' ? 'text-rose-700' : (step.type === 'total' ? 'text-emerald-800 font-extrabold' : 'text-[#1A2E11]')
                        }`}>
                          {step.amount > 0 && step.type !== 'total' && step.type !== 'subtotal' ? '+' : ''}
                          {step.amount.toLocaleString()} tCO₂e
                        </span>
                        <span className="text-[10px] text-[#6D7A65] block font-mono">
                          {formatCurrency(Math.round(Math.abs(step.amount) * results.valuations.pricePerTonneGbp))}
                        </span>
                      </div>
                    </div>

                    {/* Visual bar */}
                    <div className="w-full bg-[#E0D8C8]/60 h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${step.color} transition-all duration-500`}
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Economic Valuation Breakdown */}
            <div className="p-4 rounded-2xl bg-[#1A2E11] text-white space-y-3 shadow-md">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <span className="font-serif font-bold text-sm text-[#CCD5AE]">
                  {v('netCommercialValuation')} ({horizonYears}-{v('yearsUnit')})
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[#3D5C31] text-white border border-[#8BA888]/40">
                  {v('carbonPriceLabel')} {formatPricePerTonne()}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-white/70 uppercase font-bold block">
                    {v('grossRemovalsValue')}
                  </span>
                  <span className="text-base font-bold font-mono text-white">
                    {formatCurrency(results.valuations.totalGrossRevenueGbp)}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-amber-300 uppercase font-bold block">
                    {v('reserveBufferWithheld')}
                  </span>
                  <span className="text-base font-bold font-mono text-amber-300">
                    -{formatCurrency(results.valuations.permanenceBufferValueGbp + results.valuations.leakageDeductionValueGbp)}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40">
                  <span className="text-[10px] text-emerald-300 uppercase font-bold block">
                    {v('netTradeableValue')}
                  </span>
                  <span className="text-base font-bold font-mono text-emerald-300">
                    {formatCurrency(results.valuations.totalNetRevenueGbp)}
                  </span>
                </div>
              </div>

              <p className="text-[10px] text-[#CCD5AE]/80 leading-relaxed">
                {v('timelineNote')}
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
