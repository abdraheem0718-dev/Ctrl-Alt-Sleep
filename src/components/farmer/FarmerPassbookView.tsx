import React, { useState, useMemo } from 'react';
import { FarmerProfile, FeasibilityAssessment, FarmerInputs } from '../../types/greenvest';
import { Language, TRANSLATIONS } from '../../utils/translations';
import { calculateCarbonFeasibility } from '../../utils/carbonCalculator';
import {
  Award,
  BookOpen,
  CheckCircle2,
  Calendar,
  Download,
  MessageSquare,
  ShieldCheck,
  TreeDeciduous,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  ExternalLink,
  HelpCircle,
  Coins,
  FileCheck
} from 'lucide-react';
import { downloadDossierPdf } from '../../utils/pdfGenerator';

interface FarmerPassbookViewProps {
  farmer: FarmerProfile;
  inputs?: FarmerInputs;
  assessment?: FeasibilityAssessment;
  language?: Language;
  onOpenDossier?: () => void;
  onRequestSoilVisit?: () => void;
  onScheduleSaplingDelivery?: () => void;
  onNavigateToTab?: (tab: string) => void;
  onShowToast?: (msg: string) => void;
}

export const FarmerPassbookView: React.FC<FarmerPassbookViewProps> = ({
  farmer,
  inputs,
  assessment,
  language = 'en',
  onOpenDossier,
  onRequestSoilVisit,
  onScheduleSaplingDelivery,
  onNavigateToTab,
  onShowToast
}) => {
  const isTamil = language === 'ta';
  const t = TRANSLATIONS[language];
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Derive assessment safely even if not directly passed
  const effectiveAssessment = useMemo(() => {
    if (assessment && assessment.netPotential10Year) {
      return assessment;
    }
    return calculateCarbonFeasibility(
      inputs || {
        landArea: farmer.landArea || 5,
        state: farmer.state || 'Tamil Nadu',
        district: farmer.district || 'Coimbatore',
        soilType: farmer.soilType || 'Red Loam (Semman)',
        waterAvailability: farmer.waterSource === 'Borewell & Drip Irrigation' ? 'Moderate' : 'High / Canal',
        currentLandUse: 'Active Annual Crops',
        preferredTreeType: 'Any / Optimized',
        plantingModel: 'Agri-Silviculture (Trees + Crops)',
        carbonPriceScenario: 'Baseline (₹1,500/t)'
      }
    );
  }, [assessment, inputs, farmer]);

  const handleRequestSoilVisit = () => {
    if (onRequestSoilVisit) {
      onRequestSoilVisit();
    } else {
      const msgs: Record<Language, string> = {
        en: '✓ Free Soil Test Visit requested! Our field agronomist will contact you within 24 hours.',
        ta: '✓ இலவச மண் பரிசோதனை கோரிக்கை பெறப்பட்டது! கள அதிகாரி 24 மணி நேரத்திற்குள் தொடர்பு கொள்வார்.',
        ml: '✓ സൗജന്യ മണ്ണ് പരിശോധന അഭ്യർത്ഥന ലഭിച്ചു! ഫീൽഡ് ഓഫീസർ 24 മണിക്കൂറിനുള്ളിൽ ബന്ധപ്പെടും.',
        kn: '✓ ಉಚಿತ ಮಣ್ಣಿನ ಪರೀಕ್ಷೆ ವಿನಂತಿಸಲಾಗಿದೆ! ನಮ್ಮ ಕ್ಷೇತ್ರ ಅಧಿಕಾರಿ 24 ಗಂಟೆಗಳಲ್ಲಿ ಸಂಪರ್ಕಿಸುತ್ತಾರೆ.',
        te: '✓ ఉచిత భూసార పరీక్ష అభ్యర్థన నమోదు చేయబడింది! ఫీల్డ్ అధికారి 24 గంటల్లో సంప్రదిస్తారు.'
      };
      onShowToast?.(msgs[language] || msgs.en);
    }
  };

  const handleScheduleSaplings = () => {
    if (onScheduleSaplingDelivery) {
      onScheduleSaplingDelivery();
    } else {
      const msgs: Record<Language, string> = {
        en: '✓ Nursery Sapling Dispatch requested for the upcoming planting window!',
        ta: '✓ பருவமழை நடவு காலத்திற்கான மரக்கன்றுகள் ஒதுக்கீடு பதிவு செய்யப்பட்டது!',
        ml: '✓ നടീൽ സീസണിലേക്കുള്ള തൈകളുടെ വിതരണം ഷെഡ്യൂൾ ചെയ്തു!',
        kn: '✓ ಮಳೆಗಾಲದ ಸಸಿ ವಿತರಣೆ ಯಶಸ್ವಿಯಾಗಿ ನಿಗದಿಪಡಿಸಲಾಗಿದೆ!',
        te: '✓ రాబోయే వర్షాకాలం నాటడం కోసం మొక్కల పంపిణీ షెడ్యూల్ చేయబడింది!'
      };
      onShowToast?.(msgs[language] || msgs.en);
    }
  };

  const formatInrLakhs = (amount: number) => {
    if (!amount) return '₹0';
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(2)} Lakhs`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const FAQS = [
    {
      q: language === 'ta'
        ? 'மரம் நடுவதால் எனது முக்கிய பயிர்கள் பாதிக்கப்படுமா?'
        : 'Will agroforestry trees reduce my annual food crop yield?',
      a: language === 'ta'
        ? 'இல்லை. வரப்பு அல்லது அகல இடைவெளி (Agri-Silviculture) முறையில் நடப்படுவதால் 85% நிலப்பரப்பில் பயிர் சாகுபடி தொடரும். மரங்கள் நிழல் தந்து மண் ஈரப்பதத்தை அதிகரித்து பயிர் விளைச்சலை மேம்படுத்தும்.'
        : 'No. Boundary or wide-alley agroforestry maintains 85%+ of your crop canopy. Trees act as windbreaks, improve organic carbon, and retain soil moisture, often improving crop resilience.'
    },
    {
      q: language === 'ta'
        ? 'கன்றுகள் மற்றும் நடவுக்கான செலவை நான் ஏற்க வேண்டுமா?'
        : 'Do I have to pay any upfront money for saplings or verification?',
      a: language === 'ta'
        ? 'முற்றிலும் ₹0. கன்றுகள், நடவு வழிகாட்டல், மண் ஆய்வு, மற்றும் கார்பன் சரிபார்ப்பு செலவுகள் அனைத்தையும் கிரீன்வெஸ்ட் மற்றும் நிறுவன திட்ட உருவாக்குநர்கள் ஏற்றுக்கொள்கிறார்கள்.'
        : 'Zero (₹0 Upfront). High-quality ICAR-certified saplings, soil testing, satellite monitoring, and carbon credit registration are 100% pre-financed by GreenVest institutional developer cohorts.'
    },
    {
      q: language === 'ta'
        ? 'கார்பன் வருமானம் எப்போது மற்றும் எவ்வாறு கிடைக்கும்?'
        : 'When and how do I receive the carbon credit money?',
      a: language === 'ta'
        ? 'மரங்கள் வளர்ந்து கார்பனை உறிஞ்சத் தொடங்கியதும் (ஆண்டு 3 முதல்), தணிக்கை செய்யப்பட்டு ஆண்டுதோறும் உங்கள் வங்கிக் கணக்கில் நேரடியாக (DBT) செலுத்தப்படும்.'
        : 'Once trees reach established growth (from Year 3 onwards), satellite verification generates tradeable credits. Payouts are credited directly to your bank account annually.'
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-[#1A2E11] via-[#244218] to-[#1A2E11] text-white p-6 sm:p-8 rounded-3xl border border-[#8BA888]/30 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 opacity-10 pointer-events-none">
          <TreeDeciduous className="w-80 h-80 text-white" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {farmer.status}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-[#E9EDC9] text-[11px] font-mono font-semibold">
                ID: {farmer.id}
              </span>
              <span className="text-xs text-[#CCD5AE]">
                • {farmer.surveyNo} ({farmer.landArea} Acres)
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white">
              {language === 'ta' ? `${farmer.name} - அதிகாரப்பூர்வ கார்பன் பாஸ்புக்` : `${farmer.name}'s Carbon Passbook`}
            </h1>
            <p className="text-sm text-[#CCD5AE] max-w-2xl leading-relaxed">
              {language === 'ta'
                ? `உங்கள் நிலம் கிரீன்வெஸ்ட் அக்ரோபாரஸ்ட்ரி குழுமத்தில் (${farmer.assignedCluster}) சேர்க்கப்பட்டுள்ளது. கீழே உங்கள் பாஸ்புக் மற்றும் அடுத்தகட்ட பணிகளைப் பார்க்கலாம்.`
                : `Your farmland is officially enrolled in the GreenVest Agroforestry Cohort (${farmer.assignedCluster}). Track your carbon passbook, sapling delivery, and enrollment roadmap below.`}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            <button
              type="button"
              onClick={onOpenDossier}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-[#12220e] font-bold text-xs sm:text-sm transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>
                {language === 'ta' ? 'அதிகாரப்பூர்வ பாஸ்புக் PDF பதிவிறக்கு' : 'Download Official Dossier (PDF)'}
              </span>
            </button>
            <button
              type="button"
              onClick={handleRequestSoilVisit}
              className="px-5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all border border-white/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-emerald-300" />
              <span>
                {language === 'ta' ? 'மண் பரிசோதனைக்கு பதிவு செய்' : 'Request Free Soil Test Visit'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Digital Passbook Card + 5-Stage Farmer Roadmap */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Digital Bankable Passbook (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-5">
          
          <div className="p-6 rounded-3xl bg-white border-2 border-[#2D4A22]/20 shadow-md relative overflow-hidden">
            {/* Watermark badge */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E0D8C8]">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-[#1A2E11] text-emerald-400 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-[#1A2E11] text-base">
                    GreenVest Carbon Passbook
                  </h3>
                  <p className="text-[10px] text-[#6D7A65] font-mono">
                    Ref: GV-CP-{farmer.id.replace('GV-F-', '')}-2026
                  </p>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E9EDC9] text-[#2D4A22] font-bold border border-[#CCD5AE]">
                Verified Parcel
              </span>
            </div>

            {/* Key Metrics Highlight in Passbook */}
            <div className="grid grid-cols-2 gap-3 my-4">
              <div className="p-3.5 rounded-2xl bg-[#FDFBF7] border border-[#E0D8C8]">
                <span className="text-[10px] uppercase font-bold text-[#8BA888] tracking-wider block">
                  {language === 'ta' ? '10-ஆண்டு நிகர வருமானம்' : '10-Year Net Income'}
                </span>
                <span className="text-lg font-bold text-[#1A2E11] font-mono block mt-1">
                  {formatInrLakhs(effectiveAssessment.netPotential10Year?.p50 || 0)}
                </span>
                <span className="text-[10px] text-[#6D7A65]">
                  Baseline (₹1,500/t VCU)
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FDFBF7] border border-[#E0D8C8]">
                <span className="text-[10px] uppercase font-bold text-[#8BA888] tracking-wider block">
                  {language === 'ta' ? 'கார்பன் சேமிப்பு (tCO2e)' : 'Carbon Captured'}
                </span>
                <span className="text-lg font-bold text-[#2D4A22] font-mono block mt-1">
                  {Math.round(effectiveAssessment.sequestration10Year?.p50 || 0)} Tonnes
                </span>
                <span className="text-[10px] text-[#6D7A65]">
                  {effectiveAssessment.totalTreeCount || 0} Agroforestry Trees
                </span>
              </div>
            </div>

            {/* Parcel & Farmer Identity Details */}
            <div className="space-y-2 text-xs py-2 border-t border-b border-[#E0D8C8]">
              <div className="flex justify-between">
                <span className="text-[#6D7A65]">{language === 'ta' ? 'நில உரிமையாளர்' : 'Landowner'}:</span>
                <span className="font-bold text-[#1A2E11]">{farmer.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6D7A65]">{language === 'ta' ? 'நிலப்பரப்பு' : 'Area & Survey'}:</span>
                <span className="font-bold text-[#1A2E11]">{farmer.landArea} Acres ({farmer.surveyNo})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6D7A65]">{language === 'ta' ? 'மாவட்டம்' : 'District & State'}:</span>
                <span className="font-bold text-[#1A2E11]">{farmer.district}, {farmer.state}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6D7A65]">{language === 'ta' ? 'மண் வகை' : 'Soil Classification'}:</span>
                <span className="font-bold text-[#1A2E11]">{farmer.soilType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6D7A65]">{language === 'ta' ? 'விவசாயி முன்பணம்' : 'Farmer Upfront Cost'}:</span>
                <span className="font-bold text-emerald-700">₹0 (100% Pre-Financed)</span>
              </div>
            </div>

            {/* Recommended Species In Passbook */}
            <div className="mt-4 pt-1">
              <span className="text-[11px] font-bold text-[#1A2E11] block mb-2">
                {language === 'ta' ? 'ஒதுக்கப்பட்ட மர இனங்கள்:' : 'Allocated Tree Species Mix:'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(effectiveAssessment.recommendedSpecies || []).slice(0, 3).map((sp) => (
                  <span
                    key={sp.id}
                    className="px-2.5 py-1 rounded-xl bg-[#F4F1EA] border border-[#CCD5AE] text-[11px] font-semibold text-[#2D4A22] flex items-center gap-1"
                  >
                    <TreeDeciduous className="w-3 h-3 text-[#2D4A22]" />
                    {language === 'ta' && sp.tamilName ? sp.tamilName : sp.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#E0D8C8]">
              <button
                type="button"
                onClick={onOpenDossier}
                className="w-full py-2.5 px-4 rounded-xl bg-[#1A2E11] hover:bg-[#2D4A22] text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-emerald-300" />
                <span>{language === 'ta' ? 'அனைத்து ஆவணங்களையும் PDF-ஆக பதிவிறக்கு' : 'Download Complete Pre-Feasibility Dossier'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right: 5-Stage Roadmap & Transparent Timeline (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-5">
          
          <div className="p-6 rounded-3xl bg-white border border-[#E0D8C8] shadow-sm space-y-4">
            <div>
              <span className="text-[10px] font-bold text-[#8BA888] uppercase tracking-wider">
                {language === 'ta' ? 'உங்கள் பண்ணைக்கான 5-படி முன்னேற்றப் பாதை' : '5-Step Farmer Enrollment & Payout Roadmap'}
              </span>
              <h3 className="text-xl font-bold font-serif text-[#1A2E11] mt-0.5">
                {language === 'ta' ? 'கார்பன் திட்ட முன்னேற்ற நிலை' : 'Agroforestry Carbon Lifecycle Status'}
              </h3>
            </div>

            {/* Stages */}
            <div className="space-y-4 pt-2">
              
              {/* Step 1 */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#E9EDC9]/30 border border-[#CCD5AE]">
                <div className="w-8 h-8 rounded-full bg-[#2D4A22] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="space-y-0.5 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#1A2E11]">
                      1. Pre-Feasibility Land Screening & Carbon Modeling
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Completed ✓
                    </span>
                  </div>
                  <p className="text-xs text-[#6D7A65]">
                    {language === 'ta'
                      ? '5 ஏக்கர் நிலத்துக்கான ICAR மற்றும் FRI அறிவியல் மாதிரி மூலம் கார்பன் மற்றும் வருமான கணிப்பு முடிவடைந்தது.'
                      : `Calculated empirical yield for ${farmer.landArea} acres using ICAR allometrics. Projected ~${Math.round(effectiveAssessment.sequestration10Year?.p50 || 0)} tCO2e.`}
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-[#E9EDC9]/30 border border-[#CCD5AE]">
                <div className="w-8 h-8 rounded-full bg-[#2D4A22] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="space-y-0.5 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#1A2E11]">
                      2. Land Title & Survey Boundary Verification
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {farmer.status === 'Survey Verified' ? 'Verified ✓' : 'In Progress'}
                    </span>
                  </div>
                  <p className="text-xs text-[#6D7A65]">
                    {language === 'ta'
                      ? `பட்டா எண் ${farmer.surveyNo} சரிபார்க்கப்பட்டு, கிராம எல்லை மேப்பிங் செய்யப்பட்டது.`
                      : `Survey number ${farmer.surveyNo} cross-checked with State Land Revenue Records and satellite boundary.`}
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-[#E0D8C8]">
                <div className="w-8 h-8 rounded-full bg-[#E9EDC9] text-[#2D4A22] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs border border-[#CCD5AE]">
                  3
                </div>
                <div className="space-y-0.5 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#1A2E11]">
                      3. Free Nursery Sapling Dispatch (ICAR Certified)
                    </span>
                    <button
                      type="button"
                      onClick={handleScheduleSaplings}
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 hover:bg-amber-200 text-amber-800 transition-colors cursor-pointer"
                    >
                      {language === 'ta' ? 'நடவு அட்டவணை (Monsoon)' : 'Scheduled (Monsoon)'}
                    </button>
                  </div>
                  <p className="text-xs text-[#6D7A65]">
                    {language === 'ta'
                      ? `உங்கள் நிலத்திற்கு பரிந்துரைக்கப்பட்ட ${effectiveAssessment.totalTreeCount || 0} தரமான மரக்கன்றுகள் கிராம விநியோக மையத்திற்கு இலவசமாக அனுப்பி வைக்கப்படும்.`
                      : `Delivery of ~${effectiveAssessment.totalTreeCount || 0} hardened saplings (${effectiveAssessment.recommendedSpecies?.[0]?.name || 'Agroforestry mix'}) delivered free of charge.`}
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-[#E0D8C8]">
                <div className="w-8 h-8 rounded-full bg-neutral-100 text-[#8BA888] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  4
                </div>
                <div className="space-y-0.5 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#6D7A65]">
                      4. Plantation Geotagging & Baseline MRV
                    </span>
                    <span className="text-[10px] text-[#8BA888]">
                      Upcoming
                    </span>
                  </div>
                  <p className="text-xs text-[#8BA888]">
                    {language === 'ta'
                      ? 'கள வேளாண் அதிகாரி வந்து மரங்களின் இருப்பிடத்தை ஜிபிஎஸ் மூலம் பதிவு செய்வார்.'
                      : 'GreenVest extension officer tags planted trees via mobile GIS to establish zero-day baseline.'}
                  </p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-[#E0D8C8]">
                <div className="w-8 h-8 rounded-full bg-neutral-100 text-[#8BA888] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  5
                </div>
                <div className="space-y-0.5 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#6D7A65]">
                      5. Direct Benefit Transfer (DBT) Annual Payout
                    </span>
                    <span className="text-[10px] text-[#8BA888]">
                      Year 3 Onwards
                    </span>
                  </div>
                  <p className="text-xs text-[#8BA888]">
                    {language === 'ta'
                      ? 'சரிபார்க்கப்பட்ட கார்பன் வரவுகளுக்கான தொகை நேரடியாக உங்கள் வங்கிக் கணக்கில் வரவு வைக்கப்படும்.'
                      : 'Verified carbon credits are auctioned to institutional buyers, and annual proceeds transferred to your registered bank account.'}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Farmer FAQs Section */}
          <div className="p-6 rounded-3xl bg-white border border-[#E0D8C8] shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-[#2D4A22]" />
              <h4 className="font-bold text-sm text-[#1A2E11]">
                {language === 'ta' ? 'அடிக்கடி கேட்கப்படும் கேள்விகள் (FAQs)' : 'Frequently Asked Questions by Farmers'}
              </h4>
            </div>

            <div className="space-y-2 pt-1">
              {FAQS.map((faq, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-[#E0D8C8] overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full p-3.5 text-left bg-[#FDFBF7] hover:bg-[#F4F1EA] transition-colors flex items-center justify-between text-xs font-bold text-[#1A2E11] cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="text-[#8BA888] text-sm ml-2">
                      {activeFaq === i ? '−' : '+'}
                    </span>
                  </button>
                  {activeFaq === i && (
                    <div className="p-3.5 bg-white text-xs text-[#4A5D3E] border-t border-[#E0D8C8] leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
