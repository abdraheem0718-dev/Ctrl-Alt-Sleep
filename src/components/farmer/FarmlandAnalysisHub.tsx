import React, { useState } from 'react';
import {
  FarmerProfile,
  FarmerPlot,
  FarmerInputs,
  FeasibilityAssessment
} from '../../types/greenvest';
import { Language, TRANSLATIONS, tFarmer } from '../../utils/translations';
import { FarmerForm } from '../FarmerForm';
import { FeasibilityResults } from '../FeasibilityResults';
import {
  Sprout,
  CheckCircle2,
  TrendingUp,
  Download,
  ShieldCheck,
  SlidersHorizontal,
  ArrowRight,
  Landmark
} from 'lucide-react';
import { formatLocalizedInr } from '../../utils/localizedStrings';

interface FarmlandAnalysisHubProps {
  farmer: FarmerProfile;
  activePlot: FarmerPlot;
  inputs: FarmerInputs;
  assessment: FeasibilityAssessment;
  onInputsChange: (newInputs: FarmerInputs) => void;
  onSavePlotInputs: (plotId: string, updatedInputs: Partial<FarmerPlot>) => void;
  onOpenDossier: () => void;
  onRegisterCohort: () => void;
  onNavigateToTab: (tab: 'farmer' | 'monte-carlo' | 'documents' | 'passbook' | 'schemes') => void;
  language?: Language;
}

export const FarmlandAnalysisHub: React.FC<FarmlandAnalysisHubProps> = ({
  farmer,
  activePlot,
  inputs,
  assessment,
  onInputsChange,
  onSavePlotInputs,
  onOpenDossier,
  onRegisterCohort,
  onNavigateToTab,
  language = 'en'
}) => {
  const activeLang: Language = (language || 'en') as Language;
  const isTamil = activeLang === 'ta';
  const t = TRANSLATIONS[activeLang];
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveToPlot = () => {
    onSavePlotInputs(activePlot.id, {
      landArea: Number(inputs.landArea),
      state: inputs.state,
      district: inputs.district,
      soilType: inputs.soilType,
      waterAvailability: inputs.waterAvailability,
      currentLandUse: inputs.currentLandUse,
      preferredTreeType: inputs.preferredTreeType,
      plantingModel: inputs.plantingModel,
      carbonPriceScenario: inputs.carbonPriceScenario,
      status: 'Screened'
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Active Plot Status Header Banner */}
      <div className="bg-white rounded-2xl border border-[#E2E8D8] p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#EAF2E4] border border-[#C8DEC0] flex items-center justify-center text-[#2D4A22] shrink-0">
            <Sprout className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-[#4A5D44] uppercase tracking-wider">
                {tFarmer('analyzingParcel', activeLang)}
              </span>
              <h2 className="text-base sm:text-lg font-bold text-[#1A2E11]">
                {activePlot.name}
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-[#E8F0E2] text-[11px] font-bold text-[#2D4A22] border border-[#C8DEC0]">
                {inputs.landArea} {tFarmer('acresUnit', activeLang)}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-neutral-100 text-[11px] font-mono text-neutral-600">
                {activePlot.surveyNo}
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              {inputs.district}, {inputs.state} • {inputs.soilType} • {inputs.waterAvailability}
            </p>
          </div>
        </div>

        {/* Dossier Download Action */}
        <div className="flex items-center gap-2 flex-wrap shrink-0">
          <button
            type="button"
            id="btn-download-dossier-header"
            onClick={onOpenDossier}
            className="px-3.5 py-2 rounded-xl bg-[#2D4A22] hover:bg-[#1E3615] text-white text-xs font-semibold transition-all shadow-xs flex items-center gap-1.5 active:scale-95 cursor-pointer"
            title={tFarmer('downloadDossier', activeLang)}
          >
            <Download className="w-3.5 h-3.5" />
            <span>{tFarmer('downloadDossierPdf', activeLang)}</span>
          </button>
        </div>
      </div>

      {/* Official Verra VM0047 ARR Pre-Feasibility Verdict Hero Banner */}
      <div className="bg-gradient-to-r from-[#1A2E11] via-[#244218] to-[#2D4A22] text-white rounded-3xl p-6 sm:p-7 shadow-lg border border-[#487337]/50 relative overflow-hidden">
        {/* Subtle decorative background watermark */}
        <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
          <ShieldCheck className="w-64 h-64 text-white" />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2.5 max-w-3xl flex-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-[#86EFAC] text-[#1A2E11] text-xs font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-[#1A2E11]" />
                {tFarmer('verraEligibleTitle', activeLang)}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-emerald-200 text-xs font-mono border border-white/20">
                Confidence: {assessment.confidenceScore}% ({assessment.confidence})
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-serif tracking-tight text-white">
              {tFarmer('recommendedPathway', activeLang)}
            </h3>

            <p className="text-xs sm:text-sm text-[#D7E4D1] leading-relaxed">
              {activeLang === 'ta' && `10 ஆண்டு காலத்தில் இத்திட்டம் சுமார் ${assessment.sequestration10Year.p50.toLocaleString('en-IN')} டன் CO2 கார்பனை உறிஞ்சி, விவசாயிக்கு ₹0 முன்செலவில் ₹${formatLocalizedInr(assessment.netPotential10Year.p50, activeLang)} நேரடி கார்பன் வருமானத்தை ஈட்டித்தரும்.`}
              {activeLang === 'ml' && `10 വർഷത്തിനുള്ളിൽ ഈ പദ്ധതി ഏകദേശം ${assessment.sequestration10Year.p50.toLocaleString('en-IN')} ടൺ CO2 സംഭരിക്കുകയും കർഷകന് ₹0 മുൻകൂട്ടി ചിലവിൽ ₹${formatLocalizedInr(assessment.netPotential10Year.p50, activeLang)} നേരിട്ട് കാർബൺ വരുമാനം നൽകുകയും ചെയ്യും.`}
              {activeLang === 'kn' && `10 ವರ್ಷಗಳಲ್ಲಿ ಈ ಯೋಜನೆಯು ಸುಮಾರು ${assessment.sequestration10Year.p50.toLocaleString('en-IN')} ಟನ್ CO2 ಹೀರಿಕೊಳ್ಳುತ್ತದೆ ಮತ್ತು ರೈತನಿಗೆ ₹0 ಮುಂಗಡ ವೆಚ್ಚದಲ್ಲಿ ₹${formatLocalizedInr(assessment.netPotential10Year.p50, activeLang)} ನೇರ ಕಾರ್ಬನ್ ಆದಾಯವನ್ನು ತರುತ್ತದೆ.`}
              {activeLang === 'te' && `10 సంవత్సరాలలో ఈ ప్రాజెక్ట్ సుమారు ${assessment.sequestration10Year.p50.toLocaleString('en-IN')} టన్నుల CO2 నిల్వ చేస్తుంది మరియు రైతుకు ₹0 ముందస్తు ఖర్చుతో ₹${formatLocalizedInr(assessment.netPotential10Year.p50, activeLang)} ప్రత్యక్ష కార్బన్ ఆదాయాన్ని అందిస్తుంది.`}
              {activeLang === 'en' && `Empirical ICAR/FRI agroforestry models project ~${assessment.sequestration10Year.p50.toLocaleString('en-IN')} tonnes CO2e sequestered over 10 years, delivering an estimated direct carbon net income of ₹${formatLocalizedInr(assessment.netPotential10Year.p50, activeLang)} to you with ₹0 upfront capital.`}
            </p>

            {/* Verra VM0047 Pre-Screening Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs">
              <div className="flex items-center gap-2 text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-[#86EFAC] shrink-0" />
                <span>{tFarmer('baselineVerifiedCheck', activeLang)}</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-[#86EFAC] shrink-0" />
                <span>{tFarmer('additionalityCheck', activeLang)}</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-[#86EFAC] shrink-0" />
                <span>{tFarmer('cropYieldCheck', activeLang)}</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-[#86EFAC] shrink-0" />
                <span>{tFarmer('zeroUpfrontCheck', activeLang)}</span>
              </div>
            </div>
          </div>

          {/* Key Stat Badges Box */}
          <div className="bg-black/30 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/15 flex flex-col sm:flex-row lg:flex-col gap-4 shrink-0 w-full sm:w-auto lg:w-72">
            <div>
              <span className="text-[10px] text-emerald-300 font-semibold uppercase tracking-wider block">
                {tFarmer('p50NetIncomeLabel', activeLang)}
              </span>
              <span className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
                ₹{formatLocalizedInr(assessment.netPotential10Year.p50, activeLang)}
              </span>
              <span className="text-[11px] text-emerald-300/80 block mt-0.5">
                Range: ₹{formatLocalizedInr(assessment.netPotential10Year.p10, activeLang)} – ₹{formatLocalizedInr(assessment.netPotential10Year.p90, activeLang)}
              </span>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-emerald-300 font-semibold uppercase tracking-wider block">
                  {tFarmer('carbonCapturedLabel', activeLang)}
                </span>
                <span className="text-lg font-bold text-white">
                  {assessment.sequestration10Year.p50.toLocaleString('en-IN')} <span className="text-xs font-normal">tCO2e</span>
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-emerald-300 font-semibold uppercase tracking-wider block">
                  {tFarmer('totalTreesLabel', activeLang)}
                </span>
                <span className="text-lg font-bold text-white">
                  {assessment.totalTreeCount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Analysis Content: Left Form & Right Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Farmland Plot Form */}
        <div className="lg:col-span-5 space-y-4 min-w-0">
          <div className="bg-white rounded-2xl border border-[#E2E8D8] p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#EEF3E9]">
              <div>
                <h3 className="font-bold text-[#1A2E11] text-base flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#2D4A22]" />
                  {tFarmer('farmlandParametersTitle', activeLang)}
                </h3>
                <p className="text-xs text-neutral-500">
                  {tFarmer('farmlandParametersSubtitle', activeLang)}
                </p>
              </div>
              <button
                type="button"
                id="btn-save-parameters-to-plot"
                onClick={handleSaveToPlot}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  saveSuccess
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#EBF3E6] hover:bg-[#2D4A22] text-[#2D4A22] hover:text-white border border-[#D0E2C7]'
                }`}
              >
                {saveSuccess ? tFarmer('savedToPlot', activeLang) : tFarmer('saveToPlot', activeLang)}
              </button>
            </div>

            <FarmerForm
              inputs={inputs}
              onChange={onInputsChange}
              language={language}
              onOpenDossier={onOpenDossier}
              onExpressInterest={onRegisterCohort}
              hasExpressedInterest={farmer.status === 'Registered for Cohort' || farmer.status === 'Survey Verified'}
            />
          </div>

          {/* Quick Link to 30-Yr Monte Carlo Simulation */}
          <div className="p-4 rounded-2xl bg-[#F0F5EE] border border-[#CBDCC3] flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#2D4A22] text-[#86EFAC] flex items-center justify-center shrink-0 shadow-xs">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1A2E11] flex items-center gap-1.5">
                  <span>{tFarmer('monteCarloPromoTitle', activeLang)}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono font-bold">1k Trials</span>
                </h4>
                <p className="text-[11px] text-neutral-600">
                  {tFarmer('monteCarloPromoSubtitle', activeLang)}
                </p>
              </div>
            </div>
            <button
              type="button"
              id="btn-nav-monte-carlo"
              onClick={() => onNavigateToTab('monte-carlo')}
              className="px-3 py-1.5 rounded-xl bg-[#2D4A22] hover:bg-[#1E3615] text-white text-xs font-bold shrink-0 transition-all shadow-xs flex items-center gap-1 cursor-pointer"
            >
              <span>{tFarmer('runButton', activeLang)}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Link to Matched Government Schemes & Subsidies */}
          <div className="p-4 rounded-2xl bg-[#FBF7EE] border border-[#E8DCC0] flex items-center justify-between gap-3 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#854D0E] text-amber-100 flex items-center justify-center shrink-0 shadow-xs">
                <Landmark className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1A2E11] flex items-center gap-1.5">
                  <span>
                    {activeLang === 'ta' && 'அரசு மானியங்கள் & இலவச கன்றுகள்'}
                    {activeLang === 'ml' && 'സർക്കാർ സബ്‌സിഡികളും സൗജന്യ തൈകളും'}
                    {activeLang === 'kn' && 'ಸರ್ಕಾರಿ ಸಬ್ಸಿಡಿಗಳು & ಉಚಿತ ಸಸಿಗಳು'}
                    {activeLang === 'te' && 'ప్రభుత్వ రాయితీలు & ఉచిత మొక్కలు'}
                    {activeLang === 'en' && 'Govt Subsidies & Free Saplings'}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 font-bold">
                    {inputs.state}
                  </span>
                </h4>
                <p className="text-[11px] text-neutral-600">
                  {activeLang === 'ta' && `உங்கள் ${inputs.landArea} ஏக்கர் நிலத்திற்குரிய சொட்டுநீர் மற்றும் மரக்கன்று மானியங்களை காணவும்.`}
                  {activeLang === 'ml' && `നിങ്ങളുടെ ${inputs.landArea} ഏക്കർ ഭൂമിക്കുള്ള സബ്‌സിഡികളും സഹായങ്ങളും പരിശോധിക്കുക.`}
                  {activeLang === 'kn' && `ನಿಮ್ಮ ${inputs.landArea} ಎಕರೆ ಜಮೀನಿಗೆ ಲಭ್ಯವಿರುವ ಸಬ್ಸಿಡಿಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.`}
                  {activeLang === 'te' && `మీ ${inputs.landArea} ఎకరాల భూమికి వర్తించే సబ్సిడీలను చూడండి.`}
                  {activeLang === 'en' && `Subsidies for drip irrigation, saplings & tree cash incentives matched to your plot.`}
                </p>
              </div>
            </div>
            <button
              type="button"
              id="btn-nav-govt-schemes"
              onClick={() => onNavigateToTab('schemes')}
              className="px-3 py-1.5 rounded-xl bg-[#854D0E] hover:bg-[#713F12] text-white text-xs font-bold shrink-0 transition-all shadow-xs flex items-center gap-1 cursor-pointer"
            >
              <span>
                {activeLang === 'ta' && 'காண்க'}
                {activeLang === 'ml' && 'കാണുക'}
                {activeLang === 'kn' && 'ನೋಡಿ'}
                {activeLang === 'te' && 'చూడండి'}
                {activeLang === 'en' && 'Explore'}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Feasibility Results & Projections */}
        <div className="lg:col-span-7 min-w-0">
          <FeasibilityResults
            assessment={assessment}
            language={language}
            onRegisterCohort={onRegisterCohort}
            onOpenDossier={onOpenDossier}
            isEnrolled={farmer.status === 'Registered for Cohort' || farmer.status === 'Survey Verified'}
          />
        </div>
      </div>
    </div>
  );
};
