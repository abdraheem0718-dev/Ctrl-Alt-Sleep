import React, { useState, useMemo } from 'react';
import {
  FarmerProfile,
  FarmerPlot,
  FarmerInputs,
  SchemeCategory
} from '../../types/greenvest';
import {
  evaluateMatchedSchemes
} from '../../data/governmentSchemes';
import { Language, TRANSLATIONS } from '../../utils/translations';
import { formatLocalizedInr, getLocalizedState, getLocalizedDistrict } from '../../utils/localizedStrings';
import {
  getSchemeString,
  getLocalizedCategory,
  getLocalizedSubsidyType,
  translateMatchReason,
  getLocalizedDocument,
  downloadGovernmentSchemesPdf
} from '../../utils/schemeTranslations';
import {
  getLocalizedDepartment,
  getLocalizedSubsidyRate,
  getLocalizedHighlight,
  getLocalizedStep
} from '../../utils/schemeContentTranslations';
import {
  Landmark,
  CheckCircle2,
  ExternalLink,
  FileText,
  Droplets,
  Sun,
  Sprout,
  Award,
  Phone,
  Download,
  Loader2,
  Check,
  Sparkles,
  ShieldCheck,
  Coins,
  ChevronDown,
  ChevronUp,
  Building2,
  TreeDeciduous,
  ArrowUpRight,
  Info,
  CalendarCheck,
  ArrowLeft
} from 'lucide-react';

interface GovernmentSchemesHubProps {
  farmer: FarmerProfile;
  activePlot: FarmerPlot;
  inputs: FarmerInputs;
  language: Language;
  onNavigateToTab?: (tab: 'farmer' | 'monte-carlo' | 'documents' | 'passbook' | 'schemes') => void;
  onShowToast: (msg: string) => void;
}

export const GovernmentSchemesHub: React.FC<GovernmentSchemesHubProps> = ({
  farmer,
  activePlot,
  inputs,
  language,
  onNavigateToTab,
  onShowToast
}) => {
  const t = TRANSLATIONS[language];
  
  // Filter tab: 'all' (state + central), 'state' (registered state only), 'central' (central only)
  const [jurisdictionTab, setJurisdictionTab] = useState<'all' | 'state' | 'central'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedSchemeId, setExpandedSchemeId] = useState<string | null>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfSuccessToast, setPdfSuccessToast] = useState(false);

  // Evaluate schemes for the active registered plot
  const matchedResults = useMemo(() => {
    // Only return schemes that match this registered plot's state OR central government
    return evaluateMatchedSchemes(inputs).filter(item => item.isEligible);
  }, [inputs]);

  // Breakdown by state govt vs central govt
  const stateSchemes = useMemo(() => {
    return matchedResults.filter(item => item.scheme.state === inputs.state);
  }, [matchedResults, inputs.state]);

  const centralSchemes = useMemo(() => {
    return matchedResults.filter(item => item.scheme.state === 'Central');
  }, [matchedResults]);

  // Filtered schemes based on jurisdiction tab & category
  const displayedSchemes = useMemo(() => {
    let list = matchedResults;
    if (jurisdictionTab === 'state') {
      list = stateSchemes;
    } else if (jurisdictionTab === 'central') {
      list = centralSchemes;
    }

    if (selectedCategory !== 'all') {
      list = list.filter(item => item.scheme.category === selectedCategory);
    }

    return list;
  }, [matchedResults, stateSchemes, centralSchemes, jurisdictionTab, selectedCategory]);

  // Total eligible subsidy value across all applicable schemes for this registered plot
  const totalEligibleSubsidy = useMemo(() => {
    return matchedResults.reduce((acc, m) => acc + m.estimatedSubsidyAmount, 0);
  }, [matchedResults]);

  // Available categories for this registered plot
  const availableCategories = useMemo(() => {
    const set = new Set<string>();
    matchedResults.forEach(item => set.add(item.scheme.category));
    return Array.from(set);
  }, [matchedResults]);

  const getCategoryIcon = (category: SchemeCategory) => {
    switch (category) {
      case 'Micro-Irrigation & Drip':
        return <Droplets className="w-4 h-4 text-sky-600" />;
      case 'Solar Energy & Pumping':
        return <Sun className="w-4 h-4 text-amber-600" />;
      case 'Direct Tree Cash Incentive (DBT)':
        return <Coins className="w-4 h-4 text-emerald-600" />;
      case 'Organic & Soil Regeneration':
        return <Sprout className="w-4 h-4 text-lime-600" />;
      case 'Bamboo & Fast Biomass':
        return <TreeDeciduous className="w-4 h-4 text-teal-600" />;
      default:
        return <Award className="w-4 h-4 text-emerald-700" />;
    }
  };

  const handleSavePdf = async () => {
    try {
      setIsGeneratingPdf(true);
      await new Promise(resolve => setTimeout(resolve, 200));
      const success = downloadGovernmentSchemesPdf({
        farmer,
        activePlot,
        inputs,
        matchedSchemes: matchedResults,
        totalSubsidy: totalEligibleSubsidy,
        language
      });
      if (success) {
        setPdfSuccessToast(true);
        onShowToast(getSchemeString('savedPdfToast', language));
        setTimeout(() => setPdfSuccessToast(false), 4000);
      }
    } catch (err) {
      console.error('Error generating schemes PDF:', err);
      onShowToast(language === 'ta' ? 'PDF பதிவிறக்கம் செய்ய முடியவில்லை' : 'Failed to download PDF dossier');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Plot Context Header */}
      <div className="bg-gradient-to-br from-[#1A2E11] via-[#244218] to-[#1E3615] text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-[#487337]/60 relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none">
          <Landmark className="w-72 h-72 text-white" />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            
            {/* Badges row */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-[#86EFAC] text-[#1A2E11] text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                <Landmark className="w-3.5 h-3.5" />
                {getLocalizedState(inputs.state, language)} {getSchemeString('centralAndStateBadge', language)}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-emerald-200 text-xs font-mono border border-white/20">
                {getSchemeString('targetPlot', language)}: {activePlot.name} ({getLocalizedDistrict(inputs.district, language)})
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-emerald-200 text-xs border border-white/20">
                {inputs.landArea} {getSchemeString('acresUnit', language)} • {inputs.waterAvailability === 'Rainfed' ? getSchemeString('waterRainfed', language) : inputs.waterAvailability === 'Moderate' ? getSchemeString('waterModerate', language) : getSchemeString('waterAbundant', language)}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl sm:text-3xl font-bold font-serif tracking-tight text-white">
              {language === 'ta' && `${getLocalizedState(inputs.state, language)} அரசு மற்றும் மத்திய அரசு மானியங்கள்`}
              {language === 'ml' && `${getLocalizedState(inputs.state, language)} സംസ്ഥാന & കേന്ദ്ര സർക്കാർ പദ്ധതികൾ`}
              {language === 'kn' && `${getLocalizedState(inputs.state, language)} ರಾಜ್ಯ & ಕೇಂದ್ರ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು`}
              {language === 'te' && `${getLocalizedState(inputs.state, language)} రాష్ట్ర & కేంద్ర ప్రభుత్వ పథకాలు`}
              {language === 'en' && `${inputs.state} State & Central Government Schemes`}
            </h2>

            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              {language === 'ta' && `பதிவுசெய்யப்பட்ட உங்கள் "${activePlot.name}" நிலத்திற்கு (${getLocalizedDistrict(inputs.district, language)}, ${inputs.landArea} ஏக்கர்) பொருந்தக்கூடிய அதிகாரப்பூர்வ ${getLocalizedState(inputs.state, language)} மாநில அரசு மற்றும் இந்திய மத்திய அரசு திட்டங்கள் மட்டும் கீழே காட்டப்பட்டுள்ளன.`}
              {language === 'ml' && `നിങ്ങളുടെ രജിസ്റ്റർ ചെയ്ത "${activePlot.name}" ഭൂമിക്കായുള്ള (${getLocalizedDistrict(inputs.district, language)}, ${getLocalizedState(inputs.state, language)}) ഔദ്യോഗിക സംസ്ഥാന-കേന്ദ്ര സർക്കാർ പദ്ധതികൾ.`}
              {language === 'kn' && `ನಿಮ್ಮ ನೋಂದಾಯಿತ "${activePlot.name}" ಜಮೀನಿಗೆ (${getLocalizedDistrict(inputs.district, language)}, ${getLocalizedState(inputs.state, language)}) ಅನ್ವಯವಾಗುವ ಅಧಿಕೃತ ರಾಜ್ಯ ಮತ್ತು ಕೇಂದ್ರ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು.`}
              {language === 'te' && `మీరు నమోదు చేసిన "${activePlot.name}" భూమికి (${getLocalizedDistrict(inputs.district, language)}, ${getLocalizedState(inputs.state, language)}) వర్తించే అధికారిక రాష్ట్ర మరియు కేంద్ర ప్రభుత్వ పథకాలు.`}
              {language === 'en' && `Official government subsidies and agroforestry welfare schemes verified for your registered plot in ${inputs.district}, ${inputs.state}.`}
            </p>
          </div>

          {/* Right Metrics Box */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 shrink-0 min-w-[260px] space-y-3">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-emerald-200">
                {getSchemeString('estTotalSubsidies', language)}
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white mt-0.5">
                ₹{formatLocalizedInr(totalEligibleSubsidy, language)}
              </div>
              <div className="text-[11px] text-emerald-200/80 mt-0.5">
                {matchedResults.length} {getSchemeString('activeSchemesMatched', language)}
              </div>
            </div>

            <div className="pt-2 border-t border-white/15 flex items-center justify-between text-xs gap-2">
              <span className="text-emerald-200 text-[11px]">
                {stateSchemes.length} {getSchemeString('stateTag', language)} + {centralSchemes.length} {getSchemeString('centralTag', language)}
              </span>
              <button
                type="button"
                id="btn-save-schemes-pdf"
                onClick={handleSavePdf}
                disabled={isGeneratingPdf}
                className="px-3 py-1.5 rounded-lg bg-[#86EFAC] hover:bg-[#6ee7b7] text-[#1A2E11] font-bold text-[11px] transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 shadow-xs disabled:opacity-50"
              >
                {isGeneratingPdf ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-[#1A2E11]" />
                    <span>{getSchemeString('savingPdf', language)}</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5 text-[#1A2E11]" />
                    <span>{getSchemeString('savePdfButton', language)}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Direct State vs Central Navigation Tabs */}
      <div className="bg-white rounded-2xl border border-[#E2E8D8] p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Jurisdiction Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          
          <button
            type="button"
            id="filter-all-schemes"
            onClick={() => setJurisdictionTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
              jurisdictionTab === 'all'
                ? 'bg-[#2D4A22] text-white shadow-sm ring-2 ring-[#2D4A22]/20'
                : 'bg-[#F4F1EA] text-[#2C3626] hover:bg-[#EAE5D9]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {getSchemeString('allSchemesTab', language)} ({matchedResults.length})
            </span>
          </button>

          <button
            type="button"
            id="filter-state-schemes"
            onClick={() => setJurisdictionTab('state')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
              jurisdictionTab === 'state'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'bg-[#F4F1EA] text-[#2C3626] hover:bg-[#EAE5D9]'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>
              {getLocalizedState(inputs.state, language)} {getSchemeString('stateGovtTab', language)} ({stateSchemes.length})
            </span>
          </button>

          <button
            type="button"
            id="filter-central-schemes"
            onClick={() => setJurisdictionTab('central')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
              jurisdictionTab === 'central'
                ? 'bg-amber-800 text-white shadow-sm'
                : 'bg-[#F4F1EA] text-[#2C3626] hover:bg-[#EAE5D9]'
            }`}
          >
            <span>🇮🇳 {getSchemeString('centralGovtTab', language)} ({centralSchemes.length})</span>
          </button>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-medium text-neutral-500">
            {getSchemeString('categoryLabel', language)}
          </span>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-[#F8F6F0] border border-[#E0D8C8] text-xs font-medium text-[#1A2E11] focus:outline-hidden focus:ring-2 focus:ring-[#2D4A22]"
          >
            <option value="all">{getSchemeString('allCategories', language)}</option>
            {availableCategories.map(cat => (
              <option key={cat} value={cat}>{getLocalizedCategory(cat, language)}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 3. Schemes Cards List */}
      <div className="space-y-4">
        {displayedSchemes.length === 0 && (
          <div className="bg-white rounded-2xl border border-[#CCD5AE] p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#F5F2EA] flex items-center justify-center mx-auto text-[#2D4A22]">
              <Info className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-[#1A2E11]">
              {getSchemeString('noSchemesFound', language)}
            </h3>
            <p className="text-xs text-neutral-600 max-w-md mx-auto">
              {getSchemeString('tryResettingFilters', language)}
            </p>
            <button
              type="button"
              onClick={() => {
                setJurisdictionTab('all');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 rounded-xl bg-[#2D4A22] text-white font-bold text-xs hover:bg-[#1E3615] transition-all cursor-pointer"
            >
              {getSchemeString('resetFiltersButton', language)}
            </button>
          </div>
        )}

        {displayedSchemes.map((item) => {
          const { scheme, isEligible, estimatedSubsidyAmount, matchScore, matchReasons } = item;
          const isExpanded = expandedSchemeId === scheme.id;
          const isStateScheme = scheme.state === inputs.state;

          const localTitle = scheme.localNames[language as keyof typeof scheme.localNames] || scheme.name;
          const localDesc = scheme.localDescriptions?.[language as keyof typeof scheme.localDescriptions] || scheme.description;

          return (
            <div
              key={scheme.id}
              id={`scheme-card-${scheme.id}`}
              className="bg-white rounded-2xl border border-[#CCD5AE] transition-all duration-200 overflow-hidden shadow-xs hover:shadow-md"
            >
              {/* Card Main Header */}
              <div className="p-5 sm:p-6 space-y-4">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  
                  {/* Left Column: Title & Scheme Details */}
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      
                      {/* State or Central Tag */}
                      <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border flex items-center gap-1 ${
                        isStateScheme
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : 'bg-orange-50 text-orange-800 border-orange-300'
                      }`}>
                        {isStateScheme ? (
                          <>
                            <Building2 className="w-3 h-3" />
                            <span>{getLocalizedState(inputs.state, language)} {getSchemeString('stateGovtTab', language)}</span>
                          </>
                        ) : (
                          <>
                            <span>🇮🇳 {getSchemeString('centralGovtPanIndia', language)}</span>
                          </>
                        )}
                      </span>

                      {/* Category Pill */}
                      <span className="px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700 text-[11px] font-medium flex items-center gap-1">
                        {getCategoryIcon(scheme.category)}
                        <span>{getLocalizedCategory(scheme.category, language)}</span>
                      </span>

                      {/* Subsidy Type Pill */}
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-semibold border border-emerald-200">
                        {getLocalizedSubsidyType(scheme.subsidyType, language)}
                      </span>

                      {/* Match Score */}
                      <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        {matchScore}% {getSchemeString('matchScoreText', language)}
                      </span>
                    </div>

                    {/* Titles */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#1A2E11]">
                        {localTitle}
                      </h3>
                      {language !== 'en' && (
                        <div className="text-xs text-neutral-500 mt-0.5">
                          {scheme.name}
                        </div>
                      )}
                      <div className="text-xs font-medium text-[#4A5D44] mt-1 flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 shrink-0" />
                        <span>{getLocalizedDepartment(scheme.department, language)}</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed pt-1">
                      {localDesc}
                    </p>
                  </div>

                  {/* Right Column: Estimated Subsidy Box */}
                  <div className="bg-[#F8F6F0] rounded-2xl p-4 border border-[#E0D8C8] shrink-0 min-w-[220px] sm:min-w-[240px] flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                        {getSchemeString('estSubsidyForPlot', language)}
                      </span>
                      <div className="text-xl sm:text-2xl font-extrabold font-mono text-[#1A2E11] mt-0.5">
                        ₹{formatLocalizedInr(estimatedSubsidyAmount, language)}
                      </div>
                      <div className="text-[11px] font-semibold text-emerald-800 mt-0.5">
                        {getLocalizedSubsidyRate(scheme.subsidyRate, language)}
                      </div>
                    </div>

                    <div className="pt-3 mt-3 border-t border-[#E2DBC8] text-[11px] text-neutral-500 flex items-center justify-between">
                      <span>{getSchemeString('areaLabel', language)}: {inputs.landArea} {getSchemeString('acShort', language)}</span>
                      <span className="font-semibold text-neutral-700">{scheme.portalName.split(' ')[0]}</span>
                    </div>
                  </div>
                </div>

                {/* Match Reason Bar */}
                {matchReasons.length > 0 && (
                  <div className="bg-[#F1F6EE] rounded-xl p-3 border border-[#D5E4CF] flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div className="text-xs text-[#2D4A22] space-y-0.5">
                      <span className="font-bold">
                        {getSchemeString('whyMatchesTitle', language)}
                      </span>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 pt-0.5">
                        {matchReasons.map((reason, idx) => (
                          <span key={idx} className="inline-flex items-center gap-1">
                            • {translateMatchReason(reason, language, getLocalizedState(inputs.state, language))}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Bottom Toggle Bar */}
                <div className="flex items-center justify-between pt-2 border-t border-neutral-100 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-500 font-medium">
                      {getSchemeString('applicationPortalLabel', language)}
                    </span>
                    <span className="px-2 py-0.5 rounded-md font-semibold text-[11px] bg-neutral-100 text-neutral-800">
                      {scheme.portalName}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setExpandedSchemeId(isExpanded ? null : scheme.id)}
                    className="text-xs font-bold text-[#2D4A22] hover:text-[#1E3615] flex items-center gap-1 cursor-pointer py-1 px-2.5 rounded-lg hover:bg-neutral-100 transition-all"
                  >
                    <span>{isExpanded ? getSchemeString('showLess', language) : getSchemeString('howToApplyAndDetails', language)}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Expandable Application Guide & Required Documents */}
              {isExpanded && (
                <div className="bg-[#FBF9F4] border-t border-[#EAE5D9] p-5 sm:p-6 space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Column 1: Key Benefits & Steps */}
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A2E11] flex items-center gap-1.5 mb-2.5">
                          <Award className="w-4 h-4 text-emerald-700" />
                          {getSchemeString('keyHighlightsTitle', language)}
                        </h4>
                        <ul className="space-y-2 text-xs text-neutral-700">
                          {scheme.keyHighlights.map((hl, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{getLocalizedHighlight(scheme.id, idx, hl, language)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A2E11] flex items-center gap-1.5 mb-2.5">
                          <CalendarCheck className="w-4 h-4 text-emerald-700" />
                          {getSchemeString('applicationStepsTitle', language)}
                        </h4>
                        <ol className="space-y-2 text-xs text-neutral-700 list-decimal list-inside">
                          {scheme.applicationProcess.map((step, idx) => (
                            <li key={idx} className="leading-relaxed pl-1">
                              {getLocalizedStep(scheme.id, idx, step, language)}
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>

                    {/* Column 2: Required Documents List */}
                    <div className="bg-white rounded-xl p-4 border border-[#E0D8C8] space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#1A2E11] flex items-center gap-1.5">
                          <FileText className="w-4 h-4 text-emerald-700" />
                          {getSchemeString('requiredDocsTitle', language)}
                        </h4>
                        <span className="text-[10px] text-neutral-400 font-mono">
                          {scheme.requiredDocuments.length} {getSchemeString('recordsCount', language)}
                        </span>
                      </div>

                      <p className="text-[11px] text-neutral-500">
                        {getSchemeString('docsSubmissionNote', language)}
                      </p>

                      <ul className="space-y-2 pt-1">
                        {scheme.requiredDocuments.map((doc, idx) => (
                          <li
                            key={idx}
                            className="p-2.5 rounded-lg border border-neutral-200 bg-[#FDFBF7] text-xs text-neutral-800 flex items-start gap-2.5"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                            <span className="flex-1 font-medium">{getLocalizedDocument(doc, language)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* Official Portal & Direct Helpline Contact Bar */}
                  <div className="pt-4 border-t border-[#EAE5D9] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 text-neutral-700">
                      <Phone className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span className="font-semibold">
                        {getSchemeString('officialHelplineLabel', language)}
                      </span>
                      <a
                        href={`tel:${scheme.helpline.replace(/[^0-9]/g, '')}`}
                        className="font-mono text-emerald-800 hover:underline font-bold"
                      >
                        {scheme.helpline}
                      </a>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <a
                        href={scheme.officialPortalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#2D4A22] hover:bg-[#1E3615] text-white font-bold transition-all flex items-center justify-center gap-1.5 active:scale-95 shadow-xs cursor-pointer"
                      >
                        <span>
                          {language === 'ta' && 'அரசு தளத்தில் விண்ணப்பிக்க'}
                          {language === 'ml' && 'ഔദ്യോഗിക പോർട്ടലിൽ അപേക്ഷിക്കുക'}
                          {language === 'kn' && 'ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ'}
                          {language === 'te' && 'అధికారిక పోర్టల్‌లో దరఖాస్తు చేసుకోండి'}
                          {language === 'en' && `Open ${scheme.portalName}`}
                        </span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 4. Bottom Co-Financing Advisory */}
      <div className="bg-[#F5F2EA] rounded-2xl p-5 border border-[#E0D8C8] flex items-start gap-3.5 text-xs text-[#3E4A35]">
        <ShieldCheck className="w-5 h-5 text-emerald-800 shrink-0 mt-0.5" />
        <div className="space-y-1 leading-relaxed">
          <span className="font-bold text-[#1A2E11]">
            {getSchemeString('coFinancingTitle', language)}
          </span>
          <p>
            {language === 'ta' && `${getLocalizedState(inputs.state, language)} அரசு வழங்கும் மானியங்கள் (சொட்டு நீர் பாசனம், இலவச மரக்கன்றுகள்) மூலம் உங்கள் முன்செலவு ₹0 ஆகிறது. மரங்கள் உறிஞ்சும் கார்பனுக்குரிய கிரீன்வெஸ்ட் வெர்ரா VM0047 கார்பன் கிரெடிட் வருமானம் 100% உங்கள் வங்கிக் கணக்கிற்கு நேரடியாக வரவு வைக்கப்படும்.`}
            {language === 'ml' && `${getLocalizedState(inputs.state, language)} സർക്കാർ നൽകുന്ന സബ്‌സിഡികൾ (തുള്ളിനന, സൗജന്യ തൈകൾ) വഴി നിങ്ങളുടെ മുൻകൂർ ചെലവ് ₹0 ആകുന്നു. വെറ VM0047 ചട്ടങ്ങൾ പ്രകാരം കാർബൺ ക്രെഡിറ്റ് വരുമാനത്തിന്റെ 100% ഉടമസ്ഥാവകാശവും കർഷകന് ലഭിക്കും.`}
            {language === 'kn' && `${getLocalizedState(inputs.state, language)} ಸರ್ಕಾರ ನೀಡುವ ಸಬ್ಸಿಡಿಗಳ (ಹನಿ ನೀರಾವರಿ, ಉಚಿತ ಸಸಿಗಳು) ಮೂಲಕ ನಿಮ್ಮ ಆರಂಭಿಕ ವೆಚ್ಚ ₹0 ಆಗುತ್ತದೆ. ವೆರ್ರಾ VM0047 ನಿಯಮಗಳ ಪ್ರಕಾರ 100% ಕಾರ್ಬನ್ ಕ್ರೆಡಿಟ್ ಆದಾಯವು ನೇರವಾಗಿ ನಿಮ್ಮ ಖಾತೆಗೆ ಜಮೆಯಾಗುತ್ತದೆ.`}
            {language === 'te' && `${getLocalizedState(inputs.state, language)} ప్రభుత్వం అందించే రాయితీలు (బిందు సేద్యం, ఉచిత మొక్కలు) ద్వారా మీ ప్రాథమిక ఖర్చు ₹0 అవుతుంది. వెర్రా VM0047 నిబంధనల ప్రకారం కార్బన్ క్రెడిట్ ఆదాయం 100% నేరుగా మీ బ్యాంక్ ఖాతాలో జమ అవుతుంది.`}
            {language === 'en' && `Subsidies from ${inputs.state} Government cover 70%–100% of your micro-irrigation and sapling investments. Under Verra VM0047 guidelines, you retain 100% ownership of your carbon credit returns alongside all government welfare payouts.`}
          </p>
        </div>
      </div>

    </div>
  );
};
