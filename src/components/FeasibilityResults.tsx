import React, { useState } from 'react';
import {
  FeasibilityAssessment
} from '../types/greenvest';
import {
  TreeDeciduous,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  ChevronDown,
  ChevronUp,
  Coins,
  Receipt,
  Scale,
  Sparkles,
  CheckCircle2,
  Download,
  ArrowRight
} from 'lucide-react';
import { TRANSLATIONS, Language } from '../utils/translations';
import {
  formatLocalizedInr,
  getLocalizedSpeciesName,
  getUiString
} from '../utils/localizedStrings';

interface FeasibilityResultsProps {
  assessment: FeasibilityAssessment;
  language: Language;
  onRegisterCohort: () => void;
  onOpenDossier: () => void;
  isEnrolled?: boolean;
}

export const FeasibilityResults: React.FC<FeasibilityResultsProps> = ({
  assessment,
  language,
  onRegisterCohort,
  onOpenDossier,
  isEnrolled = false
}) => {
  const isTamil = language === 'ta';
  const t = TRANSLATIONS[language];
  const [showAssumptions, setShowAssumptions] = useState(false);
  const [selectedYearIndex, setSelectedYearIndex] = useState(9); // Year 10 default
  const hasRegistered = isEnrolled;

  const {
    inputs,
    recommendedSpecies,
    totalTreeCount,
    sequestration10Year,
    carbonRevenue10Year,
    costBreakdown,
    netPotential10Year,
    confidence,
    confidenceScore,
    assumptions,
    projections,
    coBenefits
  } = assessment;

  // Format INR cleanly using localized language rules
  const formatInr = (amount: number): string => {
    return formatLocalizedInr(amount, language);
  };

  const handleRegisterClick = () => {
    onRegisterCohort();
  };

  const getTrustPrincipleQuote = () => {
    const p10Str = formatInr(netPotential10Year.p10);
    const p90Str = formatInr(netPotential10Year.p90);
    switch (language) {
      case 'ta':
        return (
          <>
            நாங்கள் விவசாயிகளிடம் ஒருபோதும்: <span className="line-through opacity-70">"நீங்கள் கண்டிப்பாக ₹2 லட்சம் சம்பாதிப்பீர்கள்"</span> என்று கூறுவதில்லை. மாறாக, மழைப்பொழிவு மற்றும் உயிர்வாழும் வீதங்களின் அடிப்படையில் அறிவியல் பூர்வமான மதிப்பீட்டை வழங்குகிறோம்:{' '}
            <strong className="text-white font-bold underline decoration-[#8BA888] decoration-2 underline-offset-4">
              {p10Str} – {p90Str}
            </strong>
          </>
        );
      case 'ml':
        return (
          <>
            ഞങ്ങൾ കർഷകരോട് ഒരിക്കലും: <span className="line-through opacity-70">"നിങ്ങൾക്ക് ഉറപ്പായും ₹2 ലക്ഷം ലഭിക്കും"</span> എന്ന് പറയുന്നില്ല. പകരം, മഴയുടെ അളവും അതിജീവന നിരക്കുകളും അടിസ്ഥാനമാക്കി ശാസ്ത്രീയമായ കണക്കുകൂട്ടൽ നൽകുന്നു:{' '}
            <strong className="text-white font-bold underline decoration-[#8BA888] decoration-2 underline-offset-4">
              {p10Str} – {p90Str}
            </strong>
          </>
        );
      case 'kn':
        return (
          <>
            ನಾವು ರೈತರಿಗೆ ಎಂದಿಗೂ: <span className="line-through opacity-70">"ನೀವು ಖಂಡಿತವಾಗಿಯೂ ₹2 ಲಕ್ಷ ಗಳಿಸುತ್ತೀರಿ"</span> ಎಂದು ಹೇಳುವುದಿಲ್ಲ. ಬದಲಾಗಿ, ಮಳೆ ಮತ್ತು ಬದುಕುಳಿಯುವಿಕೆಯ ದರಗಳ ಆಧಾರದ ಮೇಲೆ ನಿಖರವಾದ ಅಂದಾಜು ನೀಡುತ್ತೇವೆ:{' '}
            <strong className="text-white font-bold underline decoration-[#8BA888] decoration-2 underline-offset-4">
              {p10Str} – {p90Str}
            </strong>
          </>
        );
      case 'te':
        return (
          <>
            మేము రైతులకు ఎప్పుడూ: <span className="line-through opacity-70">"మీరు ఖచ్చితంగా ₹2 లక్షలు సంపాదిస్తారు"</span> అని చెప్పము. దానికి బదులుగా, వర్షపాతం మరియు మనుగడ రేట్ల ఆధారంగా శాస్త్రీయ అంచనాను అందిస్తాము:{' '}
            <strong className="text-white font-bold underline decoration-[#8BA888] decoration-2 underline-offset-4">
              {p10Str} – {p90Str}
            </strong>
          </>
        );
      default:
        return (
          <>
            We never tell a farmer: <span className="line-through opacity-70">“You WILL earn ₹2 Lakh”</span>.
            Instead, empirical peer-reviewed growth models show an estimated potential of{' '}
            <strong className="text-white font-bold underline decoration-[#8BA888] decoration-2 underline-offset-4">
              {p10Str} – {p90Str}
            </strong>{' '}
            under declared rainfall and survival assumptions.
          </>
        );
    }
  };

  const getSpeciesRationale = (idx: number, fallback: string) => {
    switch (language) {
      case 'ta':
        return idx === 0
          ? 'விரைவாக வளரக்கூடியது, காகிதக்கூழ் மற்றும் கட்டுமானத் தேவைகளுக்கு உகந்தது. மண்ணின் நைட்ரஜனை நிலைநிறுத்தும் திறன் கொண்டது.'
          : 'வறட்சியைத் தாங்கி வளரும் தன்மையுடையது. அதிக பயோமாஸ் உற்பத்தி மற்றும் உயர்தர ஒட்டுப்பலகை வருவாய் தரவல்லது.';
      case 'ml':
        return idx === 0
          ? 'വേഗത്തിൽ വളരുന്നതും പൾപ്പ്, നിർമ്മാണ ആവശ്യങ്ങൾക്ക് അനുയോജ്യവുമാണ്. മണ്ണിലെ നൈട്രജൻ വർദ്ധിപ്പിക്കുന്നു.'
          : 'വരൾച്ചയെ പ്രതിരോധിക്കാൻ ശേഷിയുള്ളതും ഉയർന്ന ജൈവപിണ്ഡവും മികച്ച തടി വരുമാനവും നൽകുന്നതുമാണ്.';
      case 'kn':
        return idx === 0
          ? 'ವೇಗವಾಗಿ ಬೆಳೆಯುವ ಮತ್ತು ಕಾಗದದ ತಿರುಳು ಹಾಗೂ ಕಟ್ಟಡ ನಿರ್ಮಾಣಕ್ಕೆ ಸೂಕ್ತವಾದ ಮರ. ಮಣ್ಣಿನ ಫಲವತ್ತತೆ ಹೆಚ್ಚಿಸುತ್ತದೆ.'
          : 'ಬರ ನಿರೋಧಕ ಸಾಮರ್ಥ್ಯ ಹೊಂದಿದ್ದು, ಅಧಿಕ ಜೈವಿಕ ದ್ರವ್ಯರಾಶಿ ಮತ್ತು ಉತ್ತಮ ಮರಮುಟ್ಟು ಮೌಲ್ಯವನ್ನು ನೀಡುತ್ತದೆ.';
      case 'te':
        return idx === 0
          ? 'వేగంగా పెరుగుతుంది, కాగితం గుజ్జు మరియు నిర్మాణ అవసరాలకు అనుకూలం. నేలలో నత్రజనిని స్థిరీకరిస్తుంది.'
          : 'కరువును తట్టుకునే గుణం కలిగి ఉండి, అధిక జీవపదార్థం మరియు అధిక కలప విలువను ఇస్తుంది.';
      default:
        return fallback;
    }
  };

  const getConfidenceText = () => {
    if (confidence === 'High') return getUiString('highConfidence', language);
    if (confidence === 'Medium') return getUiString('mediumConfidence', language);
    return getUiString('warningConfidence', language);
  };

  const getTenYearCarbonSub = () => {
    switch (language) {
      case 'ta': return `10 ஆண்டுகளில் (இடைநிலை: ${sequestration10Year.p50} டன்)`;
      case 'ml': return `10 വർഷത്തിൽ (ഇടനില: ${sequestration10Year.p50} ടൺ)`;
      case 'kn': return `10 ವರ್ಷಗಳಲ್ಲಿ (ಮಧ್ಯಸ್ಥ: ${sequestration10Year.p50} ಟನ್)`;
      case 'te': return `10 సంవత్సరాలలో (మధ్యస్థం: ${sequestration10Year.p50} టన్నులు)`;
      default: return `over 10 years (P50: ${sequestration10Year.p50} t)`;
    }
  };

  // SVG dimensions for 10-year fan chart
  const chartHeight = 220;
  const chartWidth = 560;
  const padding = { top: 20, right: 30, bottom: 35, left: 45 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  const safeProjections = (projections && Array.isArray(projections) && projections.length > 0) ? projections : [];
  const maxVal = Math.max(...safeProjections.map(p => (isFinite(p.sequestrationP90) ? p.sequestrationP90 : 0)), 20);

  const getX = (year: number) => {
    const yr = isFinite(year) ? year : 1;
    const val = padding.left + ((yr - 1) / 9) * innerWidth;
    return isFinite(val) ? Math.round(val * 10) / 10 : padding.left;
  };

  const getY = (val: number) => {
    const safeVal = isFinite(val) ? val : 0;
    const safeMax = maxVal > 0 ? maxVal : 20;
    const res = padding.top + innerHeight - (safeVal / safeMax) * innerHeight;
    return isFinite(res) ? Math.round(res * 10) / 10 : padding.top + innerHeight;
  };

  // Generate SVG path for uncertainty ribbon (P10 to P90 area)
  const areaPath = safeProjections.length > 0
    ? safeProjections.reduce((acc, p, i) => {
        const x = getX(p.year);
        const yTop = getY(p.sequestrationP90);
        return i === 0 ? `M ${x} ${yTop}` : `${acc} L ${x} ${yTop}`;
      }, '') + safeProjections.slice().reverse().reduce((acc, p) => {
        const x = getX(p.year);
        const yBottom = getY(p.sequestrationP10);
        return `${acc} L ${x} ${yBottom}`;
      }, '') + ' Z'
    : '';

  // Baseline P50 line path
  const p50Path = safeProjections.length > 0
    ? safeProjections.reduce((acc, p, i) => {
        const x = getX(p.year);
        const y = getY(p.sequestrationP50);
        return i === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
      }, '')
    : '';

  const activeProj = safeProjections[selectedYearIndex] || safeProjections[9] || { year: 10, sequestrationP10: 0, sequestrationP50: 0, sequestrationP90: 0, netRevenueP50: 0 };

  return (
    <div className="space-y-6">
      
      {/* 1. The Core Scientific Trust Banner: The Uncertainty Range Standard */}
      <div className="relative overflow-hidden bg-[#1A2E11] rounded-3xl p-6 sm:p-7 text-white shadow-sm border border-white/10">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#2D4A22] rounded-full mix-blend-overlay opacity-40 -mr-32 -mt-32 pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9EDC9] text-[#2D4A22] border border-[#CCD5AE] text-[10px] font-bold tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-[#2D4A22]"></span>
              <span>{t.trustPrincipleBadge}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-serif">
              {t.trustPrincipleTitle}
            </h3>
            <p className="text-xs text-[#CCD5AE] max-w-2xl leading-relaxed">
              {getTrustPrincipleQuote()}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Species Recommendation Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-[#E0D8C8]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#F4F1EA] gap-3">
          <div>
            <div className="text-[10px] font-bold text-[#8BA888] uppercase tracking-widest flex items-center gap-1.5">
              <TreeDeciduous className="w-4 h-4 text-[#2D4A22]" />
              <span>{t.recommendedSpeciesLabel}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#1A2E11] mt-1 flex flex-wrap items-center gap-2 font-serif">
              <span>{getUiString('recommended', language)}</span>
              <span className="text-[#2D4A22] bg-[#F4F1EA] px-3 py-1 rounded-xl border border-[#CCD5AE]">
                {recommendedSpecies.map(s => getLocalizedSpeciesName(s, language)).join(' + ')}
              </span>
            </h2>
          </div>

          {/* Verdict and Confidence Pill */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="text-right">
              <div className="text-[10px] uppercase font-bold text-[#8BA888] tracking-wider">{t.confidenceRatingLabel}</div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border bg-[#E9EDC9] text-[#2D4A22] border-[#CCD5AE]">
                  <span className={`w-2 h-2 rounded-full mr-1.5 ${
                    confidence === 'High' ? 'bg-[#2D4A22]' : confidence === 'Medium' ? 'bg-[#3D5C31]' : 'bg-amber-600'
                  }`} />
                  {getConfidenceText()} ({confidenceScore}%)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Species Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          {recommendedSpecies.map((sp, idx) => (
            <div
              key={sp.id}
              className="p-5 rounded-2xl border border-[#E0D8C8] bg-[#FDFBF7] hover:border-[#8BA888] transition-all"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[10px] font-bold text-[#8BA888] uppercase tracking-widest">
                    {idx === 0 ? getUiString('speciesA', language) : getUiString('speciesB', language)} • {sp.type}
                  </div>
                  <h4 className="text-base font-bold text-[#1A2E11] mt-0.5 font-serif">
                    {getLocalizedSpeciesName(sp, language)}
                  </h4>
                  <div className="text-xs text-[#6D7A65] italic mt-0.5">{sp.botanicalName}</div>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-white border border-[#E0D8C8] text-[#2C3626] shadow-2xs">
                  {sp.rotationCycleYears} {getUiString('rotationCycle', language)}
                </span>
              </div>

              <p className="text-xs text-[#6D7A65] mt-3 leading-relaxed">
                {getSpeciesRationale(idx, sp.rationale)}
              </p>

              <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-[#F4F1EA] text-[11px]">
                <div>
                  <span className="text-[#8BA888] block uppercase text-[9px] font-bold">
                    {getUiString('recommendedSpacing', language)}
                  </span>
                  <span className="font-semibold text-[#2C3626]">{sp.spacingRecommendation}</span>
                </div>
                <div>
                  <span className="text-[#8BA888] block uppercase text-[9px] font-bold">
                    {getUiString('growthVelocity', language)}
                  </span>
                  <span className="font-semibold text-[#2D4A22]">{sp.annualBiomassGrowthRate}</span>
                </div>
              </div>

              <div className="mt-3 text-[11px] text-[#2C3626] bg-[#F4F1EA] p-2.5 rounded-xl border border-[#E0D8C8]">
                <span className="font-bold text-[#1A2E11]">
                  {getUiString('marketCoBenefit', language)}
                </span>
                <span className="text-[#6D7A65]">
                  {language === 'en' ? sp.timberOrYieldBenefit : getUiString('marketCoBenefitVal', language)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Tree Count Summary Badge */}
        <div className="mt-4 p-3.5 rounded-2xl bg-[#F4F1EA] border border-[#E0D8C8] flex flex-wrap items-center justify-between text-xs text-[#6D7A65]">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#1A2E11]">
              {getUiString('plannedDensity', language)}
            </span>
            <span>
              {totalTreeCount} {language === 'ta' ? 'மரங்கள்' : language === 'ml' ? 'മരങ്ങൾ' : language === 'kn' ? 'ಮರಗಳು' : language === 'te' ? 'చెట్లు' : 'trees'} ({inputs.landArea} {t.acresUnit} / {(inputs.landArea * 0.4047).toFixed(1)} {getUiString('haShort', language)})
            </span>
          </div>
          <div className="text-[#2D4A22] font-semibold">
            {getUiString('pattern', language)} {inputs.plantingModel} (~{assessment.treesPerAcre} {getUiString('treesPerAcreShort', language)})
          </div>
        </div>
      </div>

      {/* 3. The Four Core Feasibility Cards with Explicit Uncertainty Intervals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Carbon Sequestration (Tonnes CO2e) */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#E0D8C8] relative flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-[#8BA888] uppercase tracking-widest">
                {t.co2Label}
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#F4F1EA] text-[#2D4A22] flex items-center justify-center">
                <TreeDeciduous className="w-4 h-4" />
              </div>
            </div>

            <div className="text-3xl font-bold text-[#2D4A22] tracking-tight">
              {sequestration10Year.p10} – {sequestration10Year.p90}{' '}
              <span className="text-sm font-medium text-[#6D7A65]">{t.tonsCo2e}</span>
            </div>
            <div className="text-xs text-[#2D4A22] font-bold mt-1">
              {getTenYearCarbonSub()}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#F4F1EA] text-[11px] text-[#6D7A65]">
            <span>{getUiString('carbonDeductionsNote', language)}</span>
          </div>
        </div>

        {/* Metric 2: Potential Carbon Revenue (INR) */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#E0D8C8] relative flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-[#8BA888] uppercase tracking-widest">
                {t.grossRevLabel}
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#F4F1EA] text-[#2D4A22] flex items-center justify-center">
                <Coins className="w-4 h-4" />
              </div>
            </div>

            <div className="text-3xl font-bold text-[#1A2E11] tracking-tight">
              {formatInr(carbonRevenue10Year.p10)} – {formatInr(carbonRevenue10Year.p90)}
            </div>
            <div className="text-xs text-[#2D4A22] font-bold mt-1">
              {getUiString('baselinePriceBenchmark', language)}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#F4F1EA] text-[11px] text-[#6D7A65]">
            <span>
              {getUiString('expectedP50Label', language)}
              <strong>{formatInr(carbonRevenue10Year.p50)}</strong>
            </span>
          </div>
        </div>

        {/* Metric 3: Planting & Maintenance Cost (INR) */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#E0D8C8] relative flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-[#8BA888] uppercase tracking-widest">
                {t.costsLabel}
              </span>
              <div className="w-8 h-8 rounded-xl bg-[#F4F1EA] text-[#2D4A22] flex items-center justify-center">
                <Receipt className="w-4 h-4" />
              </div>
            </div>

            <div className="text-3xl font-bold text-[#1A2E11] tracking-tight">
              {formatInr(costBreakdown.total10YearCost)}
            </div>
            <div className="text-xs text-[#6D7A65] font-medium mt-1">
              {getUiString('year1CapexLabel', language)} {formatInr(costBreakdown.saplingsAndPlanting + costBreakdown.soilPrepAndPitting + costBreakdown.irrigationSetup)}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-[#F4F1EA] text-[11px] text-[#6D7A65]">
            <span>{getUiString('nabardCostsNote', language)}</span>
          </div>
        </div>

        {/* Metric 4: Estimated Net Potential (INR) - Hero Natural Tones Dark Card */}
        <div className="bg-[#1A2E11] rounded-3xl p-6 shadow-sm border border-white/10 text-white relative flex flex-col justify-between overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#8BA888]">
                {t.netPotentialLabel}
              </span>
              <div className="w-8 h-8 rounded-xl bg-white/10 text-[#CCD5AE] flex items-center justify-center">
                <Scale className="w-4 h-4" />
              </div>
            </div>

            <div className="text-3xl font-bold text-white tracking-tight font-serif">
              {formatInr(netPotential10Year.p10)} – {formatInr(netPotential10Year.p90)}
            </div>
            <div className="text-xs font-bold mt-1 text-[#CCD5AE]">
              {getUiString('net10YrSurplus', language)} (P50: {formatInr(netPotential10Year.p50)})
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-[#8BA888] relative z-10">
            <span>{getUiString('timberResaleNote', language)}</span>
          </div>
        </div>

      </div>

      {/* 4. Interactive 10-Year Growth & Uncertainty Fan Chart */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-[#E0D8C8]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#F4F1EA] gap-2">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#1A2E11] flex items-center gap-2 font-serif">
              <TrendingUp className="w-5 h-5 text-[#2D4A22]" />
              <span>{getUiString('trajectoryTitle', language)}</span>
            </h3>
            <p className="text-xs text-[#6D7A65]">
              {getUiString('trajectorySubtitle', language)}
            </p>
          </div>

          {/* Interactive Year Selector */}
          <div className="flex items-center gap-1 bg-[#F4F1EA] p-1 rounded-2xl border border-[#E0D8C8]">
            {[1, 3, 5, 8, 10].map((yr) => (
              <button
                key={yr}
                onClick={() => setSelectedYearIndex(yr - 1)}
                className={`px-3 py-1 text-xs font-semibold rounded-xl transition-all ${
                  selectedYearIndex === yr - 1
                    ? 'bg-[#2D4A22] text-[#F1F5EF] shadow-xs'
                    : 'text-[#6D7A65] hover:text-[#1A2E11]'
                }`}
              >
                {getUiString('yearShort', language)} {yr}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Year Quick Metric Callout */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#FDFBF7] p-4 rounded-2xl border border-[#E0D8C8] my-4 text-xs">
          <div>
            <span className="text-[#8BA888] block text-[10px] uppercase font-bold">
              {getUiString('selectedMilestone', language)}
            </span>
            <span className="font-bold text-[#1A2E11]">
              {getUiString('yearShort', language)} {activeProj.year}
            </span>
          </div>
          <div>
            <span className="text-[#8BA888] block text-[10px] uppercase font-bold">
              {getUiString('carbonSequestered', language)}
            </span>
            <span className="font-bold text-[#2D4A22]">
              {activeProj.sequestrationP10} – {activeProj.sequestrationP90} {t.tonsCo2e}
            </span>
          </div>
          <div>
            <span className="text-[#8BA888] block text-[10px] uppercase font-bold">
              {getUiString('cumulativeCosts', language)}
            </span>
            <span className="font-bold text-[#1A2E11]">{formatInr(activeProj.cumulativeCost)}</span>
          </div>
          <div>
            <span className="text-[#8BA888] block text-[10px] uppercase font-bold">
              {getUiString('cumulativeGrossRev', language)}
            </span>
            <span className="font-bold text-[#2D4A22] font-mono-data">
              {formatInr(activeProj.cumulativeGrossRevenueP10)} – {formatInr(activeProj.cumulativeGrossRevenueP90)}
            </span>
          </div>
        </div>

        {/* The SVG Fan Chart */}
        <div className="overflow-x-auto">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="w-full max-w-2xl mx-auto h-auto overflow-visible select-none"
          >
            {/* Horizontal Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1.0].map((ratio) => {
              const yVal = padding.top + innerHeight * (1 - ratio);
              const labelVal = Math.round(maxVal * ratio);
              return (
                <g key={ratio}>
                  <line
                    x1={padding.left}
                    y1={yVal}
                    x2={chartWidth - padding.right}
                    y2={yVal}
                    stroke="#E0D8C8"
                    strokeDasharray="3 3"
                  />
                  <text
                    x={padding.left - 8}
                    y={yVal + 3}
                    textAnchor="end"
                    fontSize="10"
                    fill="#8BA888"
                    fontFamily="monospace"
                  >
                    {labelVal}t
                  </text>
                </g>
              );
            })}

            {/* Uncertainty Ribbon (Shaded area between P10 and P90) */}
            <path
              d={areaPath}
              fill="rgba(139, 168, 136, 0.28)"
              stroke="rgba(139, 168, 136, 0.6)"
              strokeWidth="1"
            />

            {/* P50 Baseline Line */}
            <path
              d={p50Path}
              fill="none"
              stroke="#2D4A22"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Interactive Points on P50 */}
            {projections.map((p, i) => {
              const cx = getX(p.year);
              const cy = getY(p.sequestrationP50);
              const isSelected = i === selectedYearIndex;
              return (
                <g key={p.year} className="cursor-pointer" onClick={() => setSelectedYearIndex(i)}>
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isSelected ? 6 : 3.5}
                    fill={isSelected ? '#1A2E11' : '#8BA888'}
                    stroke="#FFFFFF"
                    strokeWidth={isSelected ? 2 : 1.5}
                  />
                  <text
                    x={cx}
                    y={chartHeight - 12}
                    textAnchor="middle"
                    fontSize="10"
                    fill={isSelected ? '#1A2E11' : '#6D7A65'}
                    fontWeight={isSelected ? 'bold' : 'normal'}
                  >
                    {getUiString('yearShort', language)[0]}{p.year}
                  </text>
                </g>
              );
            })}

            {/* Selected Year Indicator Line */}
            <line
              x1={getX(activeProj.year)}
              y1={padding.top}
              x2={getX(activeProj.year)}
              y2={chartHeight - padding.bottom}
              stroke="#2D4A22"
              strokeWidth="1.5"
              strokeDasharray="2 2"
              opacity="0.6"
            />
          </svg>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-3 text-[11px] text-[#6D7A65]">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-2.5 rounded bg-[#8BA888]/40 border border-[#8BA888]" />
            <span>{getUiString('p10p90Ribbon', language)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-0.5 bg-[#2D4A22]" />
            <span>{getUiString('p50Baseline', language)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#1A2E11]" />
            <span>{getUiString('activeYearCursor', language)}</span>
          </div>
        </div>
      </div>

      {/* 5. Co-benefits Grid */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-[#E0D8C8]">
        <h3 className="text-base font-bold text-[#1A2E11] mb-4 flex items-center gap-2 font-serif">
          <Sparkles className="w-4 h-4 text-[#2D4A22]" />
          <span>{getUiString('coBenefitsHeading', language)}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#E0D8C8]">
            <span className="text-[10px] text-[#8BA888] uppercase font-bold block tracking-wider">
              {getUiString('soilCarbon', language)}
            </span>
            <span className="text-xs font-bold text-[#1A2E11] mt-1 block">
              {language === 'en' ? coBenefits.soilOrganicCarbonBuildUp : getUiString('soilCarbonVal', language)}
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#E0D8C8]">
            <span className="text-[10px] text-[#8BA888] uppercase font-bold block tracking-wider">
              {getUiString('aquiferRecharge', language)}
            </span>
            <span className="text-xs font-bold text-[#1A2E11] mt-1 block">
              {language === 'en' ? coBenefits.waterRetentionBoost : getUiString('aquiferVal', language)}
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#E0D8C8]">
            <span className="text-[10px] text-[#8BA888] uppercase font-bold block tracking-wider">
              {getUiString('timberMaturity', language)}
            </span>
            <span className="text-xs font-bold text-[#2D4A22] mt-1 block">
              {language === 'en' ? coBenefits.timberMaturityValueEstimate : getUiString('timberVal', language)}
            </span>
          </div>
          <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#E0D8C8]">
            <span className="text-[10px] text-[#8BA888] uppercase font-bold block tracking-wider">
              {getUiString('microclimate', language)}
            </span>
            <span className="text-xs font-bold text-[#1A2E11] mt-1 block">
              {language === 'en' ? coBenefits.microclimateTemperatureDrop : getUiString('microclimateVal', language)}
            </span>
          </div>
        </div>
      </div>

      {/* 6. Strategic Aggregator / Cohort Bridge */}
      <div className="bg-[#F4F1EA] rounded-3xl p-6 sm:p-7 text-[#2C3626] shadow-sm border border-[#E0D8C8]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9EDC9] text-[#2D4A22] border border-[#CCD5AE] text-[10px] font-bold uppercase tracking-widest">
              <span>{getUiString('zeroCostBadge', language)}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#1A2E11] tracking-tight font-serif">
              {getUiString('devMatchingTitle', language)}
            </h3>
            <p className="text-xs text-[#6D7A65] leading-relaxed">
              {getUiString('devMatchingDesc', language)}
            </p>
          </div>

          <div className="shrink-0 flex flex-col items-center sm:items-end">
            {hasRegistered ? (
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="px-4 py-2.5 rounded-2xl bg-[#2D4A22] text-[#F1F5EF] text-xs font-bold flex items-center gap-2 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#8BA888]" />
                  <span>
                    {getUiString('parcelRegisteredBadge', language)}: {inputs.district.toUpperCase()}
                  </span>
                </div>
                <button
                  id="btn-print-registered-parcel"
                  onClick={onOpenDossier}
                  className="px-4 py-2.5 rounded-2xl bg-[#E9EDC9] hover:bg-[#dbe1b6] text-[#2D4A22] text-xs font-bold flex items-center gap-1.5 border border-[#CCD5AE] transition-all shadow-xs cursor-pointer"
                  title="Save Registered Parcel Dossier PDF"
                >
                  <Download className="w-4 h-4 text-[#2D4A22]" />
                  <span>{language === 'ta' ? 'PDF சேமிக்க (.pdf)' : 'Save PDF (.pdf)'}</span>
                </button>
              </div>
            ) : (
              <button
                id="btn-register-cohort"
                onClick={handleRegisterClick}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#2D4A22] hover:bg-[#3D5C31] text-[#F1F5EF] font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <span>{getUiString('btnExpressInterest', language)}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
            <p className="text-[10px] text-[#6D7A65] text-center sm:text-right mt-1.5">
              {getUiString('noUpfrontFees', language)}
            </p>
          </div>
        </div>
      </div>

      {/* 7. Transparent Assumptions & Methodology Inspector */}
      <div className="bg-white rounded-3xl shadow-sm border border-[#E0D8C8] overflow-hidden">
        <button
          id="btn-toggle-assumptions"
          onClick={() => setShowAssumptions(!showAssumptions)}
          className="w-full p-5 flex items-center justify-between text-left hover:bg-[#FDFBF7] transition-colors"
        >
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-4 h-4 text-[#2D4A22]" />
            <span className="text-sm font-bold text-[#1A2E11] font-serif">
              {getUiString('assumptionsHeader', language)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#2D4A22] font-semibold">
            <span>{showAssumptions ? getUiString('hideAssumptions', language) : getUiString('inspectAssumptions', language)}</span>
            {showAssumptions ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {showAssumptions && (
          <div className="px-6 pb-6 pt-1 border-t border-[#F4F1EA]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs mt-3">
              {assumptions.map((ass, i) => {
                const getAssParam = () => {
                  switch (language) {
                    case 'ta':
                      return i === 0 ? 'மர வளர்ச்சி வளைவு' : i === 1 ? 'உயிர்வாழும் வீதம்' : i === 2 ? 'மண் அடர்த்தி பெருக்கி' : i === 3 ? 'வெர்ரா ஆபத்து சேமிப்பு' : i === 4 ? 'MRV மாதிரி நிச்சயமற்ற தன்மை' : 'கார்பன் சந்தை விலை';
                    case 'ml':
                      return i === 0 ? 'മര വളർച്ചാ വക്രം' : i === 1 ? 'അതിജീവന നിരക്ക് ഘടകം' : i === 2 ? 'മണ്ണ് സാന്ദ്രത മൾട്ടിപ്ലയർ' : i === 3 ? 'വെറ റിസ്ക് ബഫർ' : i === 4 ? 'MRV സാമ്പിൾ അനിശ്ചിതത്വം' : 'കാർബൺ വിപണി വില';
                    case 'kn':
                      return i === 0 ? 'ಮರದ ಬೆಳವಣಿಗೆಯ ಕರ್ವ್' : i === 1 ? 'ಬದುಕುಳಿಯುವಿಕೆಯ ದರ' : i === 2 ? 'ಮಣ್ಣಿನ ಸಾಂದ್ರತೆಯ ಗುಣಕ' : i === 3 ? 'ವೆರ್ರಾ ಅಪಾಯ ಮೀಸಲು' : i === 4 ? 'MRV ಮಾದರಿ ಅನಿಶ್ಚಿತತೆ' : 'ಕಾರ್ಬನ್ ಮಾರುಕಟ್ಟೆ ಬೆಲೆ';
                    case 'te':
                      return i === 0 ? 'చెట్ల పెరుగుదల వక్రరేఖ' : i === 1 ? 'మనుగడ రేటు అంశం' : i === 2 ? 'నేల సాంద్రత గుణకం' : i === 3 ? 'వెర్రా రిస్క్ బఫర్' : i === 4 ? 'MRV నమూనా అనిశ్చితి' : 'కార్బన్ మార్కెట్ ధర';
                    default:
                      return ass.parameter;
                  }
                };
                return (
                  <div key={i} className="p-3.5 rounded-2xl bg-[#FDFBF7] border border-[#E0D8C8]">
                    <div className="font-bold text-[#1A2E11]">
                      {getAssParam()}
                    </div>
                    <div className="text-[#2D4A22] font-semibold mt-0.5">{ass.value}</div>
                    <div className="text-[10px] text-[#8BA888] mt-1 italic">
                      {getUiString('sourceLabel', language)}{ass.citation}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 p-4 rounded-2xl bg-[#F4F1EA] border border-[#CCD5AE] text-xs text-[#2C3626] flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-[#2D4A22] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#1A2E11]">
                  {getUiString('farmerDisclosureLabel', language)}
                </strong>
                {getUiString('farmerDisclosureText', language)}
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
