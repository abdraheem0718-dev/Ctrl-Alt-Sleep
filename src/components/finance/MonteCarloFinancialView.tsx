import React, { useState, useMemo } from 'react';
import { FarmerInputs } from '../../types/greenvest';
import {
  runMonteCarloSimulation,
  MonteCarloSimulationConfig,
  PYTHON_MONTE_CARLO_SCRIPT
} from '../../utils/monteCarloEngine';
import {
  TrendingUp,
  Activity,
  AlertTriangle,
  ShieldAlert,
  Coins,
  Scale,
  Clock,
  Code,
  Copy,
  CheckCircle2,
  RefreshCw,
  Sliders,
  Sparkles,
  Info,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import { TRANSLATIONS, Language } from '../../utils/translations';
import { getMcString } from '../../utils/localizedStrings';

interface MonteCarloFinancialViewProps {
  currentInputs: FarmerInputs;
  language: Language;
}

export const MonteCarloFinancialView: React.FC<MonteCarloFinancialViewProps> = ({
  currentInputs,
  language
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS['en'];
  const s = (key: string) => getMcString(key, language);

  const getYearLabel = (yr: number) => {
    switch (language) {
      case 'ta': return `ஆண்டு ${yr}`;
      case 'ml': return `വർഷം ${yr}`;
      case 'kn': return `ವರ್ಷ ${yr}`;
      case 'te': return `సంవత్సరం ${yr}`;
      default: return `Year ${yr}`;
    }
  };

  const getYearShort = (yr: number) => {
    switch (language) {
      case 'ta': return `ஆ${yr}`;
      case 'ml': return `വ${yr}`;
      case 'kn': return `ವ${yr}`;
      case 'te': return `సం${yr}`;
      default: return `Y${yr}`;
    }
  };

  const [droughtRisk, setDroughtRisk] = useState<number>(15); // % annual probability
  const [priceVolatility, setPriceVolatility] = useState<number>(22); // % annual volatility
  const [priceDrift, setPriceDrift] = useState<number>(4.5); // % annual real price growth
  const [discountRate, setDiscountRate] = useState<number>(8.0); // % discount rate
  const [numTrials, setNumTrials] = useState<number>(1000);
  const [activeTab, setActiveTab] = useState<'projections' | 'distributions' | 'pythonModule'>('projections');
  const [copiedPython, setCopiedPython] = useState<boolean>(false);
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

  // Carbon price from inputs
  const basePriceInr = currentInputs.carbonPriceScenario.includes('Conservative')
    ? 850
    : currentInputs.carbonPriceScenario.includes('Optimistic')
    ? 2200
    : 1500;

  const simulationConfig: MonteCarloSimulationConfig = useMemo(() => {
    return {
      landAreaAcres: currentInputs.landArea,
      baseCarbonPricePerTonne: basePriceInr,
      discountRatePercent: discountRate,
      numTrials,
      annualDroughtRiskPercent: droughtRisk,
      priceVolatilityPercent: priceVolatility,
      priceDriftPercent: priceDrift,
      validationLagYears: 2
    };
  }, [currentInputs.landArea, basePriceInr, discountRate, numTrials, droughtRisk, priceVolatility, priceDrift]);

  const simResults = useMemo(() => {
    return runMonteCarloSimulation(simulationConfig);
  }, [simulationConfig]);

  const handleCopyPython = () => {
    navigator.clipboard.writeText(PYTHON_MONTE_CARLO_SCRIPT);
    setCopiedPython(true);
    setTimeout(() => setCopiedPython(false), 3000);
  };

  const formatInr = (amount: number) => {
    if (Math.abs(amount) >= 100000) {
      return `₹${(amount / 100000).toFixed(2)}L`;
    }
    return `₹${(amount / 1000).toFixed(0)}k`;
  };

  // SVG Fan Chart parameters
  const chartWidth = 680;
  const chartHeight = 280;
  const padding = { top: 25, right: 35, bottom: 40, left: 60 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  const minCashFlow = Math.min(...simResults.projections.map(p => (isFinite(p.p10CumulativeCashFlow) ? p.p10CumulativeCashFlow : -50000)), -50000);
  const maxCashFlow = Math.max(...simResults.projections.map(p => (isFinite(p.p90CumulativeCashFlow) ? p.p90CumulativeCashFlow : 200000)), 200000);

  const getX = (year: number) => {
    const yr = isFinite(year) ? year : 1;
    const x = padding.left + ((yr - 1) / 29) * innerWidth;
    return isFinite(x) ? Math.round(x * 10) / 10 : padding.left;
  };

  const getY = (val: number) => {
    const span = maxCashFlow - minCashFlow;
    const safeVal = isFinite(val) ? val : 0;
    const y = span > 0
      ? padding.top + (1 - (safeVal - minCashFlow) / span) * innerHeight
      : padding.top + innerHeight / 2;
    return isFinite(y) ? Math.round(y * 10) / 10 : padding.top + innerHeight / 2;
  };

  // Build SVG polygon for P10 - P90 confidence area
  const p90Points = simResults.projections.map(p => `${getX(p.year)},${getY(p.p90CumulativeCashFlow)}`);
  const p10PointsReversed = [...simResults.projections].reverse().map(p => `${getX(p.year)},${getY(p.p10CumulativeCashFlow)}`);
  const confidenceAreaPoints = [...p90Points, ...p10PointsReversed].join(' ');

  const p50LinePoints = simResults.projections.map(p => `${getX(p.year)},${getY(p.p50CumulativeCashFlow)}`).join(' ');

  const hoveredProj = hoveredYear
    ? simResults.projections.find(p => p.year === hoveredYear) || simResults.projections[9]
    : simResults.projections[9]; // Year 10 default

  return (
    <div className="space-y-6">
      {/* Pillar Banner */}
      <div className="bg-white rounded-3xl p-6 border border-[#E0D8C8] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-[#2D4A22] text-[#CCD5AE]">
              {s('pillar4')}
            </span>
            <span className="text-xs font-semibold text-[#6D7A65]">
              {s('subHeading')}
            </span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#1A2E11]">
            {s('title')}
          </h2>
          <p className="text-xs text-[#52604D] max-w-3xl mt-1 leading-relaxed">
            {s('desc')}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center bg-[#F7F5EE] p-1 rounded-2xl border border-[#E0D8C8] text-xs font-bold shrink-0">
          <button
            onClick={() => setActiveTab('projections')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'projections' ? 'bg-[#2D4A22] text-white shadow-xs' : 'text-[#6D7A65] hover:text-[#1A2E11]'
            }`}
          >
            {s('fanChartTab')}
          </button>
          <button
            onClick={() => setActiveTab('distributions')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'distributions' ? 'bg-[#2D4A22] text-white shadow-xs' : 'text-[#6D7A65] hover:text-[#1A2E11]'
            }`}
          >
            {s('distributionTab')}
          </button>
          <button
            onClick={() => setActiveTab('pythonModule')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 ${
              activeTab === 'pythonModule' ? 'bg-[#2D4A22] text-white shadow-xs' : 'text-[#6D7A65] hover:text-[#1A2E11]'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>{s('pythonTab')}</span>
          </button>
        </div>
      </div>

      {/* Timeline Realism Banner */}
      <div className="bg-white rounded-3xl p-5 border border-[#E0D8C8] shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#2D4A22]" />
            <span className="text-xs font-bold text-[#1A2E11] font-serif">
              {s('timelineTitle')}
            </span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200 font-bold">
            {s('firstVintage')}
          </span>
        </div>

        {/* Visual Timeline Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          
          <div className="p-3 rounded-2xl bg-[#F7F5EE] border border-[#E0D8C8] space-y-1">
            <div className="flex items-center justify-between text-[#6D7A65] text-[10px] font-bold uppercase">
              <span>{s('yr01')}</span>
              <span className="text-rose-700 font-mono">{s('negCashFlow')}</span>
            </div>
            <div className="font-bold text-[#1A2E11] text-[11px]">{s('origination')}</div>
            <p className="text-[10px] text-[#6D7A65] leading-snug">
              {s('originationDesc')}
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-[#F7F5EE] border border-[#E0D8C8] space-y-1">
            <div className="flex items-center justify-between text-[#6D7A65] text-[10px] font-bold uppercase">
              <span>{s('yr12')}</span>
              <span className="text-amber-700 font-mono">{s('zeroCredits')}</span>
            </div>
            <div className="font-bold text-[#1A2E11] text-[11px]">{s('vcsAudit')}</div>
            <p className="text-[10px] text-[#6D7A65] leading-snug">
              {s('vcsAuditDesc')}
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-300 space-y-1">
            <div className="flex items-center justify-between text-emerald-800 text-[10px] font-bold uppercase">
              <span>{s('yr3')}</span>
              <span className="text-emerald-800 font-mono font-bold">{s('firstVintageMonetized')}</span>
            </div>
            <div className="font-bold text-emerald-950 text-[11px]">{s('firstCreditBatch')}</div>
            <p className="text-[10px] text-emerald-800 leading-snug">
              {s('firstCreditBatchDesc')}
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-[#F7F5EE] border border-[#E0D8C8] space-y-1">
            <div className="flex items-center justify-between text-[#6D7A65] text-[10px] font-bold uppercase">
              <span>{s('yr430')}</span>
              <span className="text-emerald-700 font-mono">{s('annuityRevenue')}</span>
            </div>
            <div className="font-bold text-[#1A2E11] text-[11px]">{s('sustainedIssuance')}</div>
            <p className="text-[10px] text-[#6D7A65] leading-snug">
              {s('sustainedIssuanceDesc')}
            </p>
          </div>

        </div>
      </div>

      {/* Key Financial Stochastic Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        <div className="bg-white rounded-3xl p-5 border border-[#E0D8C8] shadow-sm space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6D7A65] block">
            {s('medianIrr')}
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-serif text-[#1A2E11]">{simResults.medianIrr}%</span>
            <span className="text-[11px] text-[#6D7A65]">({simResults.p10Irr}% – {simResults.p90Irr}%)</span>
          </div>
          <span className="text-[10px] text-emerald-700 font-semibold block">
            {s('irrSub')}
          </span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-[#E0D8C8] shadow-sm space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6D7A65] block">
            {s('medianNpv')}
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-serif text-emerald-800">{formatInr(simResults.meanNpv8Percent)}</span>
            <span className="text-[11px] text-[#6D7A65]">@ {discountRate}%</span>
          </div>
          <span className="text-[10px] text-[#6D7A65] block">
            P10: {formatInr(simResults.p10Npv8Percent)} | P90: {formatInr(simResults.p90Npv8Percent)}
          </span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-[#E0D8C8] shadow-sm space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#6D7A65] block">
            {s('medianPayback')}
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-serif text-[#1A2E11]">
              {getYearLabel(simResults.medianPaybackYear)}
            </span>
            <span className="text-[11px] text-amber-700 font-semibold">({s('postYr3')})</span>
          </div>
          <span className="text-[10px] text-[#6D7A65] block">
            {s('accountsValidationLag')}
          </span>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-[#E0D8C8] shadow-sm space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 block">
            {s('valueAtRisk')}
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl font-bold font-serif text-rose-800">{formatInr(simResults.valueAtRisk95Percent)}</span>
          </div>
          <span className="text-[10px] text-rose-600 block">
            {s('downsideStress')}
          </span>
        </div>

      </div>

      {/* Main Simulation Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (4 cols): Stochastic Variables & Monte Carlo Sliders */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl p-5 border border-[#E0D8C8] shadow-sm space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#E0D8C8]">
              <Sliders className="w-4 h-4 text-[#2D4A22]" />
              <h3 className="font-bold text-sm text-[#1A2E11] font-serif">
                {s('stochasticParams')}
              </h3>
            </div>

            {/* Slider 1: Climate Drought Risk */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-[#1A2E11]">
                  {s('droughtProb')}
                </label>
                <span className="font-bold font-mono px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                  {droughtRisk}%
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="35"
                step="5"
                value={droughtRisk}
                onChange={e => setDroughtRisk(parseInt(e.target.value))}
                className="w-full h-2 bg-[#E0D8C8] rounded-lg appearance-none cursor-pointer accent-[#2D4A22]"
              />
              <p className="text-[10px] text-[#6D7A65]">
                {s('droughtDesc')}
              </p>
            </div>

            {/* Slider 2: VCM Carbon Price Volatility */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-[#1A2E11]">
                  {s('priceVol')}
                </label>
                <span className="font-bold font-mono px-2 py-0.5 rounded bg-purple-100 text-purple-900 border border-purple-200">
                  {priceVolatility}%
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="40"
                step="2"
                value={priceVolatility}
                onChange={e => setPriceVolatility(parseInt(e.target.value))}
                className="w-full h-2 bg-[#E0D8C8] rounded-lg appearance-none cursor-pointer accent-[#2D4A22]"
              />
              <p className="text-[10px] text-[#6D7A65]">
                {s('priceVolDesc')}
              </p>
            </div>

            {/* Slider 3: Price Drift */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-[#1A2E11]">
                  {s('priceDrift')}
                </label>
                <span className="font-bold font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-200">
                  +{priceDrift}%{language === 'ta' ? '/ஆண்டு' : language === 'ml' ? '/വർഷം' : language === 'kn' ? '/ವರ್ಷ' : language === 'te' ? '/సం' : '/yr'}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="10"
                step="0.5"
                value={priceDrift}
                onChange={e => setPriceDrift(parseFloat(e.target.value))}
                className="w-full h-2 bg-[#E0D8C8] rounded-lg appearance-none cursor-pointer accent-[#2D4A22]"
              />
              <p className="text-[10px] text-[#6D7A65]">
                {s('priceDriftDesc')}
              </p>
            </div>

            {/* Slider 4: Discount Rate */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold text-[#1A2E11]">
                  {s('discountRate')}
                </label>
                <span className="font-bold font-mono px-2 py-0.5 rounded bg-stone-100 text-stone-900 border border-stone-200">
                  {discountRate}%
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="14"
                step="1"
                value={discountRate}
                onChange={e => setDiscountRate(parseFloat(e.target.value))}
                className="w-full h-2 bg-[#E0D8C8] rounded-lg appearance-none cursor-pointer accent-[#2D4A22]"
              />
              <p className="text-[10px] text-[#6D7A65]">
                {s('discountRateDesc')}
              </p>
            </div>

            {/* Number of Trials */}
            <div className="pt-2 border-t border-[#E0D8C8]">
              <label className="text-[11px] font-bold text-[#1A2E11] block mb-1">
                {s('simIterations')}
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
                {[500, 1000, 2000].map(tr => (
                  <button
                    key={tr}
                    onClick={() => setNumTrials(tr)}
                    className={`py-1 rounded-xl border text-center transition-all ${
                      numTrials === tr
                        ? 'bg-[#2D4A22] text-white border-[#2D4A22] shadow-2xs font-bold'
                        : 'bg-[#F7F5EE] text-[#52604D] border-[#E0D8C8] hover:bg-white'
                    }`}
                  >
                    {tr} {s('runsUnit')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (8 cols): Interactive Charts or Python Code Module */}
        <div className="lg:col-span-8 space-y-4">
          
          {activeTab === 'projections' && (
            <div className="bg-white rounded-3xl p-6 border border-[#E0D8C8] shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E0D8C8]">
                <div>
                  <h3 className="font-bold text-base text-[#1A2E11] font-serif">
                    {s('fanChartTitle')}
                  </h3>
                  <p className="text-xs text-[#6D7A65]">
                    {s('fanChartSub')}
                  </p>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="flex items-center gap-1.5 text-emerald-800 font-bold">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" /> {s('p50Expected')}
                  </span>
                  <span className="flex items-center gap-1.5 text-stone-600">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#CCD5AE]" /> {s('p10p90Range')}
                  </span>
                </div>
              </div>

              {/* Interactive SVG Fan Chart */}
              <div className="relative overflow-hidden bg-[#FAF8F2] rounded-2xl p-2 border border-[#E0D8C8]">
                <svg
                  viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                  className="w-full h-auto select-none"
                >
                  <defs>
                    <linearGradient id="fanGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#CCD5AE" stopOpacity="0.55" />
                      <stop offset="100%" stopColor="#8BA888" stopOpacity="0.25" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal grid lines */}
                  {[-100000, 0, 200000, 500000, 1000000].map(val => {
                    const y = getY(val);
                    if (y < padding.top || y > chartHeight - padding.bottom) return null;
                    return (
                      <g key={val}>
                        <line
                          x1={padding.left}
                          y1={y}
                          x2={chartWidth - padding.right}
                          y2={y}
                          stroke={val === 0 ? '#1A2E11' : '#E0D8C8'}
                          strokeWidth={val === 0 ? 1.5 : 1}
                          strokeDasharray={val === 0 ? 'none' : '3,3'}
                        />
                        <text
                          x={padding.left - 8}
                          y={y + 3}
                          fill="#6D7A65"
                          fontSize="9"
                          textAnchor="end"
                          fontFamily="monospace"
                        >
                          {formatInr(val)}
                        </text>
                      </g>
                    );
                  })}

                  {/* Vertical Year markers */}
                  {[1, 5, 10, 15, 20, 25, 30].map(yr => {
                    const x = getX(yr);
                    return (
                      <g key={yr}>
                        <line
                          x1={x}
                          y1={padding.top}
                          x2={x}
                          y2={chartHeight - padding.bottom}
                          stroke="#E0D8C8"
                          strokeWidth="0.8"
                          strokeDasharray="2,2"
                        />
                        <text
                          x={x}
                          y={chartHeight - padding.bottom + 16}
                          fill="#6D7A65"
                          fontSize="10"
                          textAnchor="middle"
                          fontFamily="monospace"
                          fontWeight={yr === 3 ? 'bold' : 'normal'}
                        >
                          {getYearShort(yr)}
                        </text>
                      </g>
                    );
                  })}

                  {/* Confidence Interval Fill (P10 to P90) */}
                  <polygon
                    points={confidenceAreaPoints}
                    fill="url(#fanGrad)"
                  />

                  {/* P90 Line */}
                  <polyline
                    points={simResults.projections.map(p => `${getX(p.year)},${getY(p.p90CumulativeCashFlow)}`).join(' ')}
                    fill="none"
                    stroke="#52604D"
                    strokeWidth="1"
                    strokeDasharray="3,3"
                  />

                  {/* P10 Line */}
                  <polyline
                    points={simResults.projections.map(p => `${getX(p.year)},${getY(p.p10CumulativeCashFlow)}`).join(' ')}
                    fill="none"
                    stroke="#B45309"
                    strokeWidth="1.2"
                    strokeDasharray="3,3"
                  />

                  {/* P50 Median Line */}
                  <polyline
                    points={p50LinePoints}
                    fill="none"
                    stroke="#1A2E11"
                    strokeWidth="2.5"
                  />

                  {/* First issuance milestone marker at Year 3 */}
                  <line
                    x1={getX(3)}
                    y1={padding.top}
                    x2={getX(3)}
                    y2={chartHeight - padding.bottom}
                    stroke="#15803D"
                    strokeWidth="2"
                    strokeDasharray="4,2"
                  />
                  <text
                    x={getX(3) + 4}
                    y={padding.top + 12}
                    fill="#15803D"
                    fontSize="9"
                    fontWeight="bold"
                  >
                    {s('firstIssuanceYr3')}
                  </text>

                  {/* Interactive hover circle */}
                  {hoveredProj && (
                    <g transform={`translate(${getX(hoveredProj.year)}, ${getY(hoveredProj.p50CumulativeCashFlow)})`}>
                      <circle r="5" fill="#2D4A22" stroke="#FFFFFF" strokeWidth="2" />
                    </g>
                  )}
                </svg>

                {/* Hover inspector badge */}
                <div className="mt-3 p-3 bg-white rounded-xl border border-[#E0D8C8] flex flex-wrap items-center justify-between text-xs gap-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#1A2E11]">
                      {s('selectYearInspect')}
                    </span>
                    <select
                      value={hoveredProj.year}
                      onChange={e => setHoveredYear(parseInt(e.target.value))}
                      className="px-2 py-1 bg-[#F7F5EE] border border-[#E0D8C8] rounded-lg text-xs font-bold font-mono text-[#1A2E11]"
                    >
                      {simResults.projections.map(p => (
                        <option key={p.year} value={p.year}>
                          {getYearLabel(p.year)} {p.year === 3 ? (language === 'ta' ? '(முதல் வரவு)' : language === 'ml' ? '(ആദ്യ ക്രെഡിറ്റ്)' : language === 'kn' ? '(ಮೊದಲ ಕ್ರೆಡಿಟ್)' : language === 'te' ? '(మొదటి క్రెడిట్)' : '(First Issuance)') : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono">
                    <div>
                      <span className="text-[#6D7A65]">{s('p10Stress')}</span>
                      <span className="font-bold text-amber-800">{formatInr(hoveredProj.p10CumulativeCashFlow)}</span>
                    </div>
                    <div>
                      <span className="text-[#6D7A65]">{s('p50Median')}</span>
                      <span className="font-bold text-emerald-800">{formatInr(hoveredProj.p50CumulativeCashFlow)}</span>
                    </div>
                    <div>
                      <span className="text-[#6D7A65]">{s('p90Upside')}</span>
                      <span className="font-bold text-blue-900">{formatInr(hoveredProj.p90CumulativeCashFlow)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'distributions' && (
            <div className="bg-white rounded-3xl p-6 border border-[#E0D8C8] shadow-sm space-y-6">
              <div>
                <h3 className="font-bold text-base text-[#1A2E11] font-serif">
                  {language === 'ta'
                    ? `நிகழ்தகவு அளவீட்டு பரவல்கள் (${numTrials} சுழற்சிகள்)`
                    : language === 'ml'
                    ? `സ്റ്റോക്കാസ്റ്റിക് അളവ് വിതരണങ്ങൾ (${numTrials} ആവർത്തനങ്ങൾ)`
                    : language === 'kn'
                    ? `ಸಂಭವನೀಯ ಮೆಟ್ರಿಕ್ ಹಂಚಿಕೆಗಳು (${numTrials} ಆವರ್ತನೆಗಳು)`
                    : language === 'te'
                    ? `స్టోకాస్టిక్ మెట్రిక్ పంపిణీలు (${numTrials} పునరావృత్తులు)`
                    : `Stochastic Metric Distributions (${numTrials} Iterations)`}
                </h3>
                <p className="text-xs text-[#6D7A65]">
                  {language === 'ta'
                    ? 'திட்ட IRR மற்றும் 30-ஆண்டு நிகர தற்போதைய மதிப்பு (NPV @ 8%) நிகழ்வெண் ஹிஸ்டோகிராம்'
                    : language === 'ml'
                    ? 'പ്രോജക്റ്റ് IRR, 30-വർഷ നെറ്റ് പ്രസന്റ് വാല്യൂ (NPV @ 8%) ഹിസ്റ്റോഗ്രാം ഫ്രീക്വൻസി'
                    : language === 'kn'
                    ? 'ಪ್ರಾಜೆಕ್ಟ್ IRR ಮತ್ತು 30-ವರ್ಷಗಳ ನಿವ್ವಳ ಪ್ರಸ್ತುತ ಮೌಲ್ಯ (NPV @ 8%) ಆವರ್ತನ ಹಿಸ್ಟೋಗ್ರಾಮ್'
                    : language === 'te'
                    ? 'ప్రాజెక్ట్ IRR మరియు 30-సంవత్సరాల నికర ప్రస్తుత విలువ (NPV @ 8%) ఫ్రీక్వెన్సీ హిస్టోగ్రామ్'
                    : 'Histogram frequency of Project IRR and 30-Year Net Present Value (NPV @ 8%)'}
                </p>
              </div>

              {/* IRR Distribution */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#1A2E11]">
                    {language === 'ta' ? 'உள் வருவாய் விகிதம் (IRR %) நிகழ்வெண்' : language === 'ml' ? 'ആന്തരിക റിട്ടേൺ നിരക്ക് (IRR %) ഫ്രീക്വൻസി' : language === 'kn' ? 'ಆಂತರಿಕ ಆದಾಯ ದರ (IRR %) ಆವರ್ತನ' : language === 'te' ? 'అంతర్గత రాబడి రేటు (IRR %) ఫ్రీక్వెన్సీ' : 'Internal Rate of Return (IRR %) Frequency'}
                  </span>
                  <span className="font-mono text-emerald-800 font-bold">
                    {language === 'ta' ? 'இடைநிலை:' : language === 'ml' ? 'ശരാശരി:' : language === 'kn' ? 'ಸರಾಸರಿ:' : language === 'te' ? 'సగటు:' : 'Median:'} {simResults.medianIrr}%
                  </span>
                </div>

                <div className="grid grid-cols-7 gap-1.5 items-end h-32 pt-4 px-2 bg-[#FAF8F2] rounded-2xl border border-[#E0D8C8]">
                  {simResults.irrDistributionBins.map((bin, i) => (
                    <div key={i} className="flex flex-col items-center gap-1 h-full justify-end group">
                      <span className="text-[9px] font-mono text-[#6D7A65] opacity-0 group-hover:opacity-100 transition-opacity">
                        {bin.percentage}%
                      </span>
                      <div
                        className="w-full bg-[#2D4A22] rounded-t-md transition-all group-hover:bg-[#1A2E11]"
                        style={{ height: `${Math.max(6, bin.percentage * 2.8)}%` }}
                      />
                      <span className="text-[9px] font-mono text-[#52604D] truncate w-full text-center">
                        {bin.bin}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* NPV Distribution */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#1A2E11]">
                    {language === 'ta' ? 'நிகர தற்போதைய மதிப்பு (NPV @ 8%) நிகழ்வெண்' : language === 'ml' ? 'നെറ്റ് പ്രസന്റ് വാല്യൂ (NPV @ 8%) ഫ്രീക്വൻസി' : language === 'kn' ? 'ನಿವ್ವಳ ಪ್ರಸ್ತುತ ಮೌಲ್ಯ (NPV @ 8%) ಆವರ್ತನ' : language === 'te' ? 'నికర ప్రస్తుత విలువ (NPV @ 8%) ఫ్రీక్వెన్సీ' : 'Net Present Value (NPV @ 8%) Frequency'}
                  </span>
                  <span className="font-mono text-emerald-800 font-bold">
                    {language === 'ta' ? 'இடைநிலை:' : language === 'ml' ? 'ശരാശരി:' : language === 'kn' ? 'ಸರಾಸರಿ:' : language === 'te' ? 'సగటు:' : 'Median:'} {formatInr(simResults.meanNpv8Percent)}
                  </span>
                </div>

                <div className="grid grid-cols-6 gap-1.5 items-end h-32 pt-4 px-2 bg-[#FAF8F2] rounded-2xl border border-[#E0D8C8]">
                  {simResults.npvDistributionBins.map((bin, i) => (
                    <div key={i} className="flex flex-col items-center gap-1 h-full justify-end group">
                      <span className="text-[9px] font-mono text-[#6D7A65] opacity-0 group-hover:opacity-100 transition-opacity">
                        {bin.percentage}%
                      </span>
                      <div
                        className="w-full bg-emerald-700 rounded-t-md transition-all group-hover:bg-emerald-900"
                        style={{ height: `${Math.max(6, bin.percentage * 2.8)}%` }}
                      />
                      <span className="text-[9px] font-mono text-[#52604D] truncate w-full text-center">
                        {bin.bin}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pythonModule' && (
            <div className="bg-white rounded-3xl p-6 border border-[#E0D8C8] shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E0D8C8]">
                <div>
                  <h3 className="font-bold text-base text-[#1A2E11] font-serif">
                    monte_carlo_arr.py ({language === 'ta' ? 'பைத்தான் தொகுதி' : language === 'ml' ? 'പൈത്തൺ മൊഡ്യൂൾ' : language === 'kn' ? 'ಪೈಥಾನ್ ಮಾಡ್ಯೂಲ್' : language === 'te' ? 'పైథాన్ మాడ్యూల్' : 'Python Backend Module'})
                  </h3>
                  <p className="text-xs text-[#6D7A65]">
                    {language === 'ta'
                      ? 'NumPy / Pandas அடிப்படையில் உருவாக்கப்பட்ட திசையன் கணிப்பு எஞ்சின்'
                      : language === 'ml'
                      ? 'NumPy / Pandas അടിസ്ഥാനമാക്കിയുള്ള വെക്റ്ററൈസ്ഡ് സിമുലേഷൻ എഞ്ചിൻ'
                      : language === 'kn'
                      ? 'NumPy / Pandas ಆಧಾರಿತ ವೆಕ್ಟರೈಸ್ಡ್ ಸಿಮ್ಯುಲೇಶನ್ ಎಂಜಿನ್'
                      : language === 'te'
                      ? 'NumPy / Pandas ఆధారిత వెక్టరైజ్డ్ సిమ్యులేషన్ ఇంజిన్'
                      : 'NumPy / Pandas vectorized stochastic ARR simulation engine'}
                  </p>
                </div>

                <button
                  onClick={handleCopyPython}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#2D4A22] text-white text-xs font-bold hover:bg-[#1A2E11] transition-colors shadow-2xs"
                >
                  {copiedPython ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                      <span>{s('copiedScript')}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{s('copyPythonScript')}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code Viewer */}
              <div className="rounded-2xl bg-[#1A2E11] p-4 text-[#CCD5AE] font-mono text-xs overflow-x-auto max-h-[460px] leading-relaxed border border-[#8BA888]/30">
                <pre>{PYTHON_MONTE_CARLO_SCRIPT}</pre>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
