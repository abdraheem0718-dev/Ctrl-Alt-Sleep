import React, { useState } from 'react';
import { FeasibilityAssessment } from '../types/greenvest';
import { calculateCarbonFeasibility } from '../utils/carbonCalculator';
import { X, Sprout, ShieldCheck, CheckCircle2, Download, Check, Loader2 } from 'lucide-react';
import { TRANSLATIONS, Language } from '../utils/translations';
import { QualifiedFarmerRecord } from '../data/aggregationClusters';
import { downloadDossierPdf } from '../utils/pdfGenerator';

interface PrintDossierModalProps {
  assessment?: FeasibilityAssessment | null;
  isOpen: boolean;
  onClose: () => void;
  language?: Language;
  registeredFarmer?: QualifiedFarmerRecord | null;
}

// Full 5-language translation dictionary for Dossier content
const DOSSIER_I18N: Record<string, Record<Language, string>> = {
  headerSubtitle: {
    en: 'Agroforestry Carbon Pre-Feasibility & Technical Screening Assessment',
    ta: 'வேளாண் காடுகள் கார்பன் முன்-சாத்தியக்கூறு & தொழில்நுட்ப ஆய்வு அறிக்கை',
    ml: 'അഗ്രോഫോറസ്ട്രി കാർബൺ പ്രീ-ഫീസിബിലിറ്റി & സാങ്കേതിക പരിശോധനാ രേഖ',
    kn: 'ಕೃಷಿ ಅರಣ್ಯೀಕರಣ ಇಂಗಾಲದ ಪೂರ್ವ-ಸಾಧ್ಯತಾ & ತಾಂತ್ರಿಕ ತಪಾಸಣಾ ವರದಿ',
    te: 'వ్యవసాయ-అటవీకరణ కార్బన్ ముందస్తు సాధ్యాసాధ్యాల & సాంకేతిక పరిశీలన నివేదిక'
  },
  ref: {
    en: 'REF:',
    ta: 'குறிப்பு எண்:',
    ml: 'റഫറൻസ്:',
    kn: 'ಉಲ್ಲೇಖ:',
    te: 'రిఫరెన్స్:'
  },
  confidenceLabel: {
    en: 'CONFIDENCE:',
    ta: 'நம்பகத்தன்மை:',
    ml: 'വിശ്വാസ്യത:',
    kn: 'ವಿಶ್ವಾಸಾರ್ಹತೆ:',
    te: 'విశ్వసనీయత:'
  },
  hubStatusEnrolled: {
    en: 'Aggregator Hub Status: Enrolled for Free Aggregation',
    ta: 'ஒருங்கிணைப்பாளர் மையம்: இலவச கூட்டுத் திட்டத்தில் பதிவு செய்யப்பட்டது',
    ml: 'അഗ്രിഗേറ്റർ ഹബ്ബ് നില: സൗജന്യ സംയോജനത്തിനായി ചേർത്തു',
    kn: 'ಅಗ್ರಿಗ್ಗೇಟರ್ ಹಬ್ ಸ್ಥಿತಿ: ಉಚಿತ ಸಮೂಹಕ್ಕೆ ನೋಂದಾಯಿಸಲಾಗಿದೆ',
    te: 'అగ్రిగేటర్ హబ్ స్థితి: ఉచిత సేకరణ కోసం నమోదు చేయబడింది'
  },
  cohortEnrolled: {
    en: 'Cohort Enrolled',
    ta: 'குழுவில் இணைக்கப்பட்டது',
    ml: 'ചേർക്കപ്പെട്ടു',
    kn: 'ನೋಂದಾಯಿಸಲಾಗಿದೆ',
    te: 'నమోదైంది'
  },
  cohortEligible: {
    en: 'Cohort Eligible',
    ta: 'தகுதியானது',
    ml: 'യോഗ്യമാണ്',
    kn: 'ಅರ್ಹತೆ ಹೊಂದಿದೆ',
    te: 'అర్హమైనది'
  },
  parcelId: {
    en: 'Parcel ID:',
    ta: 'பதிவு எண்:',
    ml: 'ഭൂമി ഐഡി:',
    kn: 'ಭೂಮಿ ಐಡಿ:',
    te: 'భూమి ఐడి:'
  },
  farmer: {
    en: 'Farmer:',
    ta: 'விவசாயி:',
    ml: 'കർഷകൻ:',
    kn: 'ರೈತ:',
    te: 'రైతు:'
  },
  upfrontFee: {
    en: 'Upfront Fee:',
    ta: 'முன்பணக் கட்டணம்:',
    ml: 'പ്രാരംഭ ഫീസ്:',
    kn: 'ಪ್ರಾರಂಭಿಕ ಶುಲ್ಕ:',
    te: 'ముందస్తు రుసుము:'
  },
  zeroCost: {
    en: '₹0 (Zero Cost)',
    ta: '₹0 (முற்றிலும் இலவசம்)',
    ml: '₹0 (പൂർണ്ണമായും സൗജന്യം)',
    kn: '₹0 (ಸಂಪೂರ್ಣ ಉಚಿತ)',
    te: '₹0 (పూర్తిగా ఉచితం)'
  },
  verificationTitle: {
    en: 'GreenVest Verification Statement:',
    ta: 'கிரீன்வெஸ்ட் சரிபார்ப்பு உறுதிமொழி:',
    ml: 'ഗ്രീൻവെസ്റ്റ് സാക്ഷ്യപ്പെടുത്തൽ പ്രസ്താവന:',
    kn: 'ಗ್ರೀನ್‌ವೆಸ್ಟ್ ದೃಢೀಕರಣ ಹೇಳಿಕೆ:',
    te: 'గ్రీన్‌వెస్ట్ ధృవీకరణ ప్రకటన:'
  },
  verificationDesc: {
    en: 'This evaluation computes uncertainty bands (P10 conservative to P90 optimistic) utilizing published ICAR and FRI allometric growth tables. It strictly avoids single-point speculative earnings promises.',
    ta: 'இந்த மதிப்பீடு ICAR மற்றும் FRI அறிவியல் வளர்ச்சி அட்டவணைகளைப் பயன்படுத்தி நிச்சயமற்ற வரம்புகளை (P10 குறைந்தபட்சம் முதல் P90 உயர்நிலை வரை) கணக்கிடுகிறது. இது தவறான ஊக வாக்குறுதிகளை முற்றிலும் தவிர்க்கிறது.',
    ml: 'ഈ മൂല്യനിർണ്ണയം ICAR, FRI ശാസ്ത്രീയ വളർച്ചാ പട്ടികകൾ ഉപയോഗിച്ച് അനിശ്ചിതത്വ പരിധികൾ (P10 മുതൽ P90 വരെ) കണക്കാക്കുന്നു. ഊഹക്കച്ചവടപരമായ വരുമാന വാഗ്ദಾನങ്ങൾ ഇത് ഒഴിവാക്കുന്നു.',
    kn: 'ಈ ಮೌಲ್ಯಮಾಪನವು ICAR ಮತ್ತು FRI ವೈಜ್ಞಾನಿಕ ಬೆಳವಣಿಗೆಯ ಕೋಷ್ಟಕಗಳನ್ನು ಬಳಸಿ ಅನಿಶ್ಚಿತತೆಯ ಶ್ರೇಣಿಗಳನ್ನು (P10 ಸಂಪ್ರದಾಯವಾದಿಯಿಂದ P90 ಆಶಾವಾದಿ) ಲೆಕ್ಕಾಚಾರ ಮಾಡುತ್ತದೆ.',
    te: 'ఈ మూల్యాంకనం ప్రచురితమైన ICAR మరియు FRI అల్లోమెట్రిక్ వృద్ధి పట్టికలను ఉపయోగించి అనిశ్చితి శ్రేణులను (P10 నుండి P90 వరకు) లెక్కిస్తుంది.'
  },
  sec1Title: {
    en: '1. Parcel Particulars',
    ta: '1. நில விவரங்கள்',
    ml: '1. ഭൂമിയുടെ വിവരങ്ങൾ',
    kn: '1. ಜಮೀನಿನ ವಿವರಗಳು',
    te: '1. భూమి వివరాలు'
  },
  landArea: {
    en: 'Land Area:',
    ta: 'நிலப்பரப்பு:',
    ml: 'വിസ്തൃതി:',
    kn: 'ವಿಸ್ತೀರ್ಣ:',
    te: 'విస్తీర్ణం:'
  },
  location: {
    en: 'Location:',
    ta: 'அமைவிடம்:',
    ml: 'സ്ഥലം:',
    kn: 'ಸ್ಥಳ:',
    te: 'ప్రాంతం:'
  },
  soilType: {
    en: 'Soil Classification:',
    ta: 'மண் வகை:',
    ml: 'മണ്ണിന്റെ ഇനം:',
    kn: 'ಮಣ್ಣಿನ ವಿಧ:',
    te: 'నేల రకం:'
  },
  waterAvail: {
    en: 'Water Availability:',
    ta: 'நீர்ப்பாசனம்:',
    ml: 'ജലലഭ്യത:',
    kn: 'ನೀರಿನ ಲಭ್ಯತೆ:',
    te: 'నీటి లభ్యత:'
  },
  currentLandUse: {
    en: 'Current Land Use:',
    ta: 'தற்போதைய பயன்பாடு:',
    ml: 'നിലവിലെ ഉപയോഗം:',
    kn: 'ಪ್ರಸ್ತುತ ಬಳಕೆ:',
    te: 'ప్రస్తుత వినియోగం:'
  },
  plantingModel: {
    en: 'Planting Pattern:',
    ta: 'நடவு மாதிரி:',
    ml: 'നടീൽ രീതി:',
    kn: 'ನೆಡುವ ವಿಧಾನ:',
    te: 'నాటే నమూనా:'
  },
  treeCapacity: {
    en: 'Total Tree Capacity:',
    ta: 'மரங்களின் திறன்:',
    ml: 'മൊത്തം മരങ്ങളുടെ ശേഷി:',
    kn: 'ಒಟ್ಟು ಮರಗಳ ಸಾಮರ್ಥ್ಯ:',
    te: 'మొత్తం చెట్ల సామర్థ్యం:'
  },
  trees: {
    en: 'Trees',
    ta: 'மரங்கள்',
    ml: 'മരങ്ങൾ',
    kn: 'ಮರಗಳು',
    te: 'చెట్లు'
  },
  treesPerAcre: {
    en: 'trees/ac',
    ta: 'மரங்கள்/ஏக்',
    ml: 'മരങ്ങൾ/ഏക്കർ',
    kn: 'ಮರಗಳು/ಎಕರೆ',
    te: 'చెట్లు/ఎకరం'
  },
  sec2Title: {
    en: '2. Species Recommendations',
    ta: '2. பரிந்துரைக்கப்பட்ட மரங்கள்',
    ml: '2. ശുപാർശ ചെയ്യുന്ന വൃക്ഷങ്ങൾ',
    kn: '2. ಶಿಫಾರಸು ಮಾಡಲಾದ ಮರಗಳು',
    te: '2. సిఫార్సు చేసిన చెట్ల రకాలు'
  },
  rotationCycle: {
    en: 'y rotation',
    ta: 'ஆண்டு சுழற்சி',
    ml: 'വർഷ റൊട്ടേഷൻ',
    kn: 'ವರ್ಷಗಳ ಆವರ್ತನ',
    te: 'సంవత్సరాల రొటేషన్'
  },
  growth: {
    en: 'Growth:',
    ta: 'வளர்ச்சி வேகம்:',
    ml: 'വളർച്ച നിരക്ക്:',
    kn: 'ಬೆಳವಣಿಗೆ ದರ:',
    te: 'వృద్ధి రేటు:'
  },
  spacing: {
    en: 'Spacing:',
    ta: 'இடைவெளி:',
    ml: 'അകലം:',
    kn: 'ಅಂತರ:',
    te: 'దూరం:'
  },
  yield: {
    en: 'Yield / Benefit:',
    ta: 'கூடுதல் பயன்:',
    ml: 'വിളവ് / നേട്ടം:',
    kn: 'ಇಳುವರಿ / ಲಾಭ:',
    te: 'దిగుబడి / ప్రయోజనం:'
  },
  sec3Title: {
    en: '3. 10-Year Carbon & Financial Projection Range',
    ta: '3. 10-ஆண்டு கார்பன் & நிதி சாத்தியக்கூறு வரம்பு',
    ml: '3. 10-വർഷ കാർബൺ & സാമ്പത്തിക പ്രൊജക്ഷൻ പരിധി',
    kn: '3. 10-ವರ್ಷಗಳ ಇಂಗಾಲ ಮತ್ತು ಹಣಕಾಸು ಮುನ್ನೋಟ ವ್ಯಾಪ್ತಿ',
    te: '3. 10-సంవత్సరాల కార్బన్ & ఆర్థిక అంచనాల పరిధి'
  },
  param: {
    en: 'Parameter',
    ta: 'அளவுரு',
    ml: 'ഘടകം',
    kn: 'ನಿಯತಾಂಕ',
    te: 'పరామితి'
  },
  p10: {
    en: 'P10 (Conservative)',
    ta: 'P10 (குறைந்தபட்சம்)',
    ml: 'P10 (യാഥാസ്ഥിതിക)',
    kn: 'P10 (ಸಂಪ್ರದಾಯವಾದಿ)',
    te: 'P10 (సాంప్రదాయిక)'
  },
  p50: {
    en: 'P50 (Expected Baseline)',
    ta: 'P50 (இடைநிலை)',
    ml: 'P50 (പ്രതീക്ഷിതം)',
    kn: 'P50 (ನಿರೀಕ್ಷಿತ ಮಧ್ಯಮ)',
    te: 'P50 (ఆశించిన ప్రాథమిక)'
  },
  p90: {
    en: 'P90 (Optimistic)',
    ta: 'P90 (உயர்நிலை)',
    ml: 'P90 (ആശാവാഹം)',
    kn: 'P90 (ಆಶಾವಾದಿ)',
    te: 'P90 (ఆశావాద)'
  },
  netCarbonYield: {
    en: 'Net Carbon Yield (t CO₂e)',
    ta: 'கார்பன் சேமிப்பு (t CO₂e)',
    ml: 'കാർബൺ ശേഖരണം (t CO₂e)',
    kn: 'ನಿವ್ವಳ ಇಂಗಾಲ ಸಂಗ್ರಹ (t CO₂e)',
    te: 'నికర కార్బన్ నిల్వ (t CO₂e)'
  },
  grossRevenue: {
    en: 'Gross Carbon Revenue',
    ta: 'மொத்த கார்பன் வருவாய்',
    ml: 'മൊത്തം കാർബൺ വരുമാനം',
    kn: 'ಒಟ್ಟು ಇಂಗಾಲ ಆದಾಯ',
    te: 'మొత్తం కార్బన్ ఆదాయం'
  },
  tenYearCost: {
    en: '10-Year Establishment & Maintenance',
    ta: '10-ஆண்டு செலவுகள்',
    ml: '10-വർഷ ചെലവുകൾ',
    kn: '10-ವರ್ಷಗಳ ವೆಚ್ಚಗಳು',
    te: '10-సంవత్సరాల ఖర్చులు'
  },
  netPotential: {
    en: 'Net Financial Potential',
    ta: 'நிகர நிதி சாத்தியக்கூறு',
    ml: 'അറ്റ സാമ്പത്തിക സാധ്യത',
    kn: 'ನಿವ್ವಳ ಹಣಕಾಸು ಸಾಮರ್ಥ್ಯ',
    te: 'నికర ఆర్థిక సంభావ్యత'
  },
  sec4Title: {
    en: '4. Additional Farm Resilience & Timber Co-Benefits',
    ta: '4. சூழலியல் மற்றும் பொருளாதார கூடுதல் பலன்கள்',
    ml: '4. പാരിസ്ഥിതിക & സാമ്പത്തിക അധിക നേട്ടങ്ങൾ',
    kn: '4. ಪರಿಸರ ಮತ್ತು ಆರ್ಥಿಕ ಹೆಚ್ಚುವರಿ ಪ್ರಯೋಜನಗಳು',
    te: '4. పర్యావరణ & ఆర్థిక అదనపు ప్రయోజనాలు'
  },
  soilCarbon: {
    en: 'Soil Carbon',
    ta: 'மண் கரிம வளம்',
    ml: 'മണ്ണിലെ കാർബൺ',
    kn: 'ಮಣ್ಣಿನ ಇಂಗಾಲ',
    te: 'నేల సేంద్రీయ కార్బన్'
  },
  waterInf: {
    en: 'Water Recharge',
    ta: 'நிலத்தடி நீர் மறுஊட்டம்',
    ml: 'ഭൂഗർഭജല റീചാർജ്ജ്',
    kn: 'ಅಂತರ್ಜಲ ಮರುಪೂರಣ',
    te: 'భూగర్భ జలాల రీఛార్జ్'
  },
  timberVal: {
    en: 'Timber Value',
    ta: 'மரக்கட்டை மதிப்பு',
    ml: 'തടിയുടെ മൂല്യം',
    kn: 'ಮರದ ಮೌಲ್ಯ',
    te: 'కలప విలువ'
  },
  microclimate: {
    en: 'Microclimate',
    ta: 'வெப்பநிலை தணிப்பு',
    ml: 'താപനില നിയന്ത്രണം',
    kn: 'ಉಷ್ಣಾಂಶ ನಿಯಂತ್ರಣ',
    te: 'ఉష్ణోగ్రత నియంత్రణ'
  },
  auditSeal: {
    en: 'GreenVest Algorithmic Certification Seal',
    ta: 'கிரீன்வெஸ்ட் முன்-சாத்தியக்கூறு தணிக்கை முத்திரை',
    ml: 'ഗ്രീൻവെസ്റ്റ് ഓഡിറ്റ് മുദ്ര',
    kn: 'ಗ್ರೀನ್‌ವೆಸ್ಟ್ ತಪಾಸಣಾ ಮುದ್ರೆ',
    te: 'గ్రీన్‌వెస్ట్ ఆడిట్ ముద్ర'
  },
  auditSealDesc: {
    en: 'Computed under CAFRI & FRI growth equations, Verra VM0047 ARR methodology, and IPCC AFOLU Tier 1-2 accounting guidelines.',
    ta: 'CAFRI & FRI வளர்ச்சி சமன்பாடுகள், வெர்ரா VM0047 ARR மற்றும் IPCC AFOLU அடுக்கு 1-2 கணக்கியல் வழிகாட்டுதல்களின்படி உருவாக்கப்பட்டது.',
    ml: 'CAFRI & FRI വളർച്ചാ സമവാക്യങ്ങൾ, വെറ VM0047 ARR, IPCC AFOLU 1-2 മാർഗ്ഗനിർദ്ദേശങ്ങൾ പ്രകാരം തയ്യാറാക്കിയത്.',
    kn: 'CAFRI ಮತ್ತು FRI ಬೆಳವಣಿಗೆಯ ಸಮೀಕರಣಗಳು, ವೆರ್ರಾ VM0047 ARR ಮತ್ತು IPCC ಮಾರ್ಗಸೂಚಿಗಳ ಅಡಿಯಲ್ಲಿ ಲೆಕ್ಕಹಾಕಲಾಗಿದೆ.',
    te: 'CAFRI & FRI వృద్ధి సమీకరణాలు, వెర్రా VM0047 ARR మరియు IPCC మార్గదర్శకాల ప్రకారం రూపొందించబడింది.'
  },
  autoScreening: {
    en: 'Automated Algorithmic Screening',
    ta: 'தானியங்கி டிஜிட்டல் கையொப்பம்',
    ml: 'ഡിജിറ്റൽ സിഗ്നേച്ചർ',
    kn: 'ಸ್ವಯಂಚಾಲಿತ ಡಿಜಿಟಲ್ ಸಹಿ',
    te: 'ఆటోమేటెడ్ డిజిటల్ సంతకం'
  }
};

export const PrintDossierModal: React.FC<PrintDossierModalProps> = ({
  assessment,
  isOpen,
  onClose,
  language = 'en' as Language,
  registeredFarmer: propRegisteredFarmer
}: PrintDossierModalProps) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[language];
  const d = (key: string): string => DOSSIER_I18N[key]?.[language] || DOSSIER_I18N[key]?.['en'] || key;

  // Retrieve expressed interest / registered farmer details for inclusion in printout
  const registeredFarmer = propRegisteredFarmer || (() => {
    try {
      const stored = localStorage.getItem('greenvest_registered_farmers');
      if (stored) {
        const list = JSON.parse(stored);
        if (Array.isArray(list) && list.length > 0) {
          return list[0]; // Most recent registered parcel
        }
      }
    } catch {
      // ignore
    }
    return null;
  })();

  const safeAssessment = assessment || (registeredFarmer ? calculateCarbonFeasibility({
    landArea: registeredFarmer.landArea || 5,
    state: registeredFarmer.district?.includes(',') ? registeredFarmer.district.split(',')[1]?.trim() || 'Tamil Nadu' : 'Tamil Nadu',
    district: registeredFarmer.district?.includes(',') ? registeredFarmer.district.split(',')[0]?.trim() || 'Coimbatore' : 'Coimbatore',
    soilType: registeredFarmer.soilType || 'Red Loam (Semman)',
    waterAvailability: (registeredFarmer.waterAvailability as any) || 'Moderate',
    currentLandUse: 'Active Annual Crops',
    preferredTreeType: 'Any / Optimized',
    plantingModel: 'Agri-Silviculture (Trees + Crops)',
    carbonPriceScenario: 'Baseline (₹1,500/t)'
  }) : calculateCarbonFeasibility({
    landArea: 5,
    state: 'Tamil Nadu',
    district: 'Coimbatore',
    soilType: 'Red Loam (Semman)',
    waterAvailability: 'Moderate',
    currentLandUse: 'Active Annual Crops',
    preferredTreeType: 'Any / Optimized',
    plantingModel: 'Agri-Silviculture (Trees + Crops)',
    carbonPriceScenario: 'Baseline (₹1,500/t)'
  }));

  const {
    inputs = safeAssessment.inputs,
    recommendedSpecies = safeAssessment.recommendedSpecies,
    totalTreeCount = safeAssessment.totalTreeCount,
    sequestration10Year = safeAssessment.sequestration10Year,
    carbonRevenue10Year = safeAssessment.carbonRevenue10Year,
    costBreakdown = safeAssessment.costBreakdown,
    netPotential10Year = safeAssessment.netPotential10Year,
    confidence = safeAssessment.confidence,
    confidenceScore = safeAssessment.confidenceScore,
    coBenefits = safeAssessment.coBenefits
  } = safeAssessment;

  const formatInr = (amount: number): string => {
    const inLakhs = (amount / 100000).toFixed(2);
    if (Math.abs(amount) >= 100000) {
      if (language === 'ta') return `₹${inLakhs} லட்சம்`;
      if (language === 'ml') return `₹${inLakhs} ലക്ഷം`;
      if (language === 'kn') return `₹${inLakhs} ಲಕ್ಷ`;
      if (language === 'te') return `₹${inLakhs} లక్షలు`;
      return `₹${inLakhs} Lakh`;
    }
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfSuccess, setPdfSuccess] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleSavePdf = async () => {
    setIsGeneratingPdf(true);
    setPdfSuccess(false);
    setStatusMessage('Generating PDF...');
    try {
      const success = await downloadDossierPdf({
        assessment: safeAssessment,
        registeredFarmer,
        language,
        elementId: 'print-dossier-root',
        onProgress: (_status, msg) => {
          setStatusMessage(msg);
        }
      });
      if (success) {
        setPdfSuccess(true);
        setTimeout(() => {
          setPdfSuccess(false);
          setStatusMessage('');
        }, 3500);
      }
    } catch (err) {
      console.error('Failed to download PDF:', err);
      setStatusMessage('Error downloading PDF');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div id="print-modal-container" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn print:p-0 print:bg-white print:static">
      {/* Dynamic print stylesheet so direct browser print formats cleanly */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #print-dossier-root, #print-dossier-root * { visibility: visible !important; }
          #print-dossier-root {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            background: white !important;
          }
          .print-hidden-element { display: none !important; }
        }
      `}</style>

      <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#E0D8C8] print:shadow-none print:border-none print:max-w-none print:rounded-none print:max-h-none print:overflow-visible flex flex-col">
        
        {/* Top bar (Hidden when printing) with prominent Print and Save buttons */}
        <div className="sticky top-0 bg-[#FDFBF7] px-5 sm:px-6 py-3.5 border-b border-[#E0D8C8] flex flex-wrap items-center justify-between gap-3 z-10 print-hidden-element shadow-xs">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-[#1A2E11] text-sm font-serif">
              {t.modalDossierTitle}
            </span>
            {registeredFarmer && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#E9EDC9] text-[#2D4A22] font-bold border border-[#CCD5AE]">
                {registeredFarmer.id}
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Save PDF (.pdf) button */}
            <button
              id="btn-save-dossier-pdf"
              onClick={handleSavePdf}
              disabled={isGeneratingPdf}
              className="px-3.5 py-1.5 rounded-xl bg-[#2D4A22] hover:bg-[#1E3615] text-[#F1F5EF] text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all disabled:opacity-50 cursor-pointer"
              title="Download clean PDF document to device"
            >
              {isGeneratingPdf ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>{statusMessage || 'Saving...'}</span>
                </>
              ) : pdfSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Saved PDF!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>{language === 'ta' ? 'PDF சேமிக்க (.pdf)' : 'Save PDF (.pdf)'}</span>
                </>
              )}
            </button>

            {/* Close button */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-[#6D7A65] hover:text-[#1A2E11] hover:bg-[#F4F1EA] cursor-pointer transition-colors ml-1"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dossier Document Body */}
        <div id="print-dossier-root" className="p-8 sm:p-10 space-y-6 text-[#2C3626] bg-[#FDFBF7]">

          {/* Header */}
          <div className="flex items-start justify-between border-b-2 border-[#1A2E11] pb-5">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-[#1A2E11] text-white flex items-center justify-center font-bold shadow-xs">
                  <Sprout className="w-5 h-5 text-[#8BA888]" />
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-[#1A2E11] font-serif">{t.brandName}</h1>
              </div>
              <p className="text-xs text-[#2D4A22] font-semibold mt-1">
                {d('headerSubtitle')}
              </p>
            </div>
            <div className="text-right text-xs">
              <div className="font-mono font-bold text-[#1A2E11]">REF: GV-PF-{Date.now().toString().slice(-6)}</div>
              <div className="text-[#6D7A65]">{new Date().toLocaleDateString(language === 'ta' ? 'ta-IN' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
              <div className="inline-block px-2.5 py-0.5 mt-1 bg-[#E9EDC9] text-[#2D4A22] border border-[#CCD5AE] rounded-full font-bold text-[10px]">
                {d('confidenceLabel')} {confidence.toUpperCase()} ({confidenceScore}%)
              </div>
            </div>
          </div>

          {/* Aggregator Hub Enrollment Banner */}
          <div className="p-4 rounded-2xl bg-[#E9EDC9]/70 border-2 border-[#2D4A22] text-xs text-[#2C3626] space-y-1.5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="font-bold text-[#1A2E11] text-xs flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#2D4A22]" />
                <span>{d('hubStatusEnrolled')}</span>
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#2D4A22] text-[#F1F5EF] text-[10px] font-bold">
                {registeredFarmer ? d('cohortEnrolled') : d('cohortEligible')}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] pt-1">
              <div>
                <span className="text-[#6D7A65]">{d('parcelId')} </span>
                <span className="font-mono font-bold text-[#1A2E11]">{registeredFarmer?.id || `GV-TN-${inputs.district.slice(0, 3).toUpperCase()}-ENROLLED`}</span>
              </div>
              <div>
                <span className="text-[#6D7A65]">{d('farmer')} </span>
                <span className="font-bold text-[#1A2E11]">{registeredFarmer?.farmerNamePseudonym || `Farmer (${inputs.district})`}</span>
              </div>
              <div>
                <span className="text-[#6D7A65]">{d('upfrontFee')} </span>
                <span className="font-bold text-[#2D4A22]">{d('zeroCost')}</span>
              </div>
            </div>
          </div>

          {/* Core Philosophy Notice */}
          <div className="p-4 rounded-2xl bg-[#F4F1EA] border border-[#CCD5AE] text-xs text-[#2C3626] leading-relaxed">
            <strong className="text-[#1A2E11]">
              {d('verificationTitle')}{' '}
            </strong>
            {d('verificationDesc')}
          </div>

          {/* Section 1: Parcel Particulars */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#8BA888] mb-2">
              {d('sec1Title')}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-white p-5 rounded-2xl border border-[#E0D8C8]">
              <div>
                <span className="text-[#8BA888] block text-[10px] uppercase font-bold">
                  {d('landArea')}
                </span>
                <span className="font-bold text-[#1A2E11]">{inputs.landArea} {t.acresUnit} ({(inputs.landArea * 0.4047).toFixed(2)} ha)</span>
              </div>
              <div>
                <span className="text-[#8BA888] block text-[10px] uppercase font-bold">
                  {d('location')}
                </span>
                <span className="font-bold text-[#1A2E11]">{inputs.district}, {inputs.state}</span>
              </div>
              <div>
                <span className="text-[#8BA888] block text-[10px] uppercase font-bold">
                  {d('soilType')}
                </span>
                <span className="font-bold text-[#1A2E11]">{inputs.soilType}</span>
              </div>
              <div>
                <span className="text-[#8BA888] block text-[10px] uppercase font-bold">
                  {d('waterAvail')}
                </span>
                <span className="font-bold text-[#1A2E11]">{inputs.waterAvailability}</span>
              </div>
              <div className="mt-2">
                <span className="text-[#8BA888] block text-[10px] uppercase font-bold">
                  {d('currentLandUse')}
                </span>
                <span className="font-bold text-[#1A2E11]">{inputs.currentLandUse}</span>
              </div>
              <div className="mt-2">
                <span className="text-[#8BA888] block text-[10px] uppercase font-bold">
                  {d('plantingModel')}
                </span>
                <span className="font-bold text-[#1A2E11]">{inputs.plantingModel}</span>
              </div>
              <div className="mt-2 col-span-2">
                <span className="text-[#8BA888] block text-[10px] uppercase font-bold">
                  {d('treeCapacity')}
                </span>
                <span className="font-bold text-[#2D4A22]">{totalTreeCount} {d('trees')} (~{assessment.treesPerAcre} {d('treesPerAcre')})</span>
              </div>
            </div>
          </div>

          {/* Section 2: Recommended Agroforestry Mix */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#8BA888] mb-2">
              {d('sec2Title')}
            </h3>
            <div className="space-y-2.5">
              {recommendedSpecies.map((sp) => (
                <div key={sp.id} className="p-4 rounded-2xl bg-white border border-[#E0D8C8] text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[#1A2E11] text-sm font-serif">
                        {language === 'ta' && sp.tamilName ? sp.tamilName : sp.name}{' '}
                        {sp.tamilName && language !== 'ta' && <span className="text-xs font-normal text-[#2D4A22]">({sp.tamilName})</span>}
                      </span>
                      <span className="text-[#6D7A65] italic ml-2">({sp.botanicalName})</span>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#F4F1EA] text-[#2C3626]">
                      {sp.rotationCycleYears} {d('rotationCycle')}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-[#F4F1EA] text-[11px] text-[#6D7A65]">
                    <div>
                      <strong>{d('growth')}{' '}</strong>{sp.annualBiomassGrowthRate}
                    </div>
                    <div>
                      <strong>{d('spacing')}{' '}</strong>{sp.spacingRecommendation}
                    </div>
                    <div>
                      <strong>{d('yield')}{' '}</strong>{sp.timberOrYieldBenefit}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: 10-Year Carbon & Financial Projection Range */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#8BA888] mb-2">
              {d('sec3Title')}
            </h3>
            <table className="w-full text-xs text-left border-collapse bg-white rounded-2xl overflow-hidden border border-[#E0D8C8]">
              <thead>
                <tr className="bg-[#1A2E11] text-white text-[11px]">
                  <th className="p-3 font-semibold">{d('param')}</th>
                  <th className="p-3 font-semibold text-center">{d('p10')}</th>
                  <th className="p-3 font-semibold text-center bg-[#2D4A22]">{d('p50')}</th>
                  <th className="p-3 font-semibold text-center">{d('p90')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E0D8C8]">
                <tr>
                  <td className="p-3 font-medium text-[#1A2E11]">{d('netCarbonYield')}</td>
                  <td className="p-3 text-center">{sequestration10Year.p10} t</td>
                  <td className="p-3 text-center font-bold text-[#2D4A22] bg-[#F4F1EA]/50">{sequestration10Year.p50} t</td>
                  <td className="p-3 text-center">{sequestration10Year.p90} t</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-[#1A2E11]">{d('grossRevenue')}</td>
                  <td className="p-3 text-center">{formatInr(carbonRevenue10Year.p10)}</td>
                  <td className="p-3 text-center font-bold text-[#2D4A22] bg-[#F4F1EA]/50">{formatInr(carbonRevenue10Year.p50)}</td>
                  <td className="p-3 text-center">{formatInr(carbonRevenue10Year.p90)}</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-[#1A2E11]">{d('tenYearCost')}</td>
                  <td className="p-3 text-center text-[#6D7A65]" colSpan={3}>
                    {formatInr(costBreakdown.total10YearCost)} (CapEx: {formatInr(costBreakdown.saplingsAndPlanting + costBreakdown.soilPrepAndPitting + costBreakdown.irrigationSetup)})
                  </td>
                </tr>
                <tr className="bg-[#F4F1EA] font-bold">
                  <td className="p-3 text-[#1A2E11]">{d('netPotential')}</td>
                  <td className="p-3 text-center text-[#2D4A22]">{formatInr(netPotential10Year.p10)}</td>
                  <td className="p-3 text-center text-[#1A2E11] bg-[#E9EDC9]">{formatInr(netPotential10Year.p50)}</td>
                  <td className="p-3 text-center text-[#2D4A22]">{formatInr(netPotential10Year.p90)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section 4: Co-Benefits */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#8BA888] mb-2">
              {d('sec4Title')}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-3 bg-white border border-[#E0D8C8] rounded-xl">
                <span className="text-[10px] text-[#8BA888] block font-bold">{d('soilCarbon')}</span>
                <span className="font-semibold text-[#1A2E11] mt-0.5 block">{coBenefits.soilOrganicCarbonBuildUp}</span>
              </div>
              <div className="p-3 bg-white border border-[#E0D8C8] rounded-xl">
                <span className="text-[10px] text-[#8BA888] block font-bold">{d('waterInf')}</span>
                <span className="font-semibold text-[#1A2E11] mt-0.5 block">{coBenefits.waterRetentionBoost}</span>
              </div>
              <div className="p-3 bg-white border border-[#E0D8C8] rounded-xl">
                <span className="text-[10px] text-[#8BA888] block font-bold">{d('timberVal')}</span>
                <span className="font-semibold text-[#2D4A22] mt-0.5 block">{coBenefits.timberMaturityValueEstimate}</span>
              </div>
              <div className="p-3 bg-white border border-[#E0D8C8] rounded-xl">
                <span className="text-[10px] text-[#8BA888] block font-bold">{d('microclimate')}</span>
                <span className="font-semibold text-[#1A2E11] mt-0.5 block">{coBenefits.microclimateTemperatureDrop}</span>
              </div>
            </div>
          </div>

          {/* Verification Stamp & Signatures */}
          <div className="pt-6 border-t-2 border-[#1A2E11] flex items-end justify-between text-xs">
            <div>
              <div className="flex items-center gap-1 text-[#2D4A22] font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>{d('auditSeal')}</span>
              </div>
              <p className="text-[10px] text-[#6D7A65] mt-1 max-w-sm leading-relaxed">
                {d('auditSealDesc')}
              </p>
            </div>
            <div className="text-right">
              <div className="font-serif font-bold text-sm text-[#1A2E11]">GreenVest Decision Intelligence</div>
              <div className="text-[10px] text-[#6D7A65]">{d('autoScreening')}</div>
            </div>
          </div>

        </div>

        {/* Bottom Bar with Save PDF Action Button */}
        <div className="sticky bottom-0 bg-[#FDFBF7] px-6 py-4 border-t border-[#E0D8C8] flex flex-wrap items-center justify-between gap-3 z-10 print-hidden-element shadow-md rounded-b-3xl">
          <div className="text-xs text-[#6D7A65]">
            <span className="font-semibold text-[#1A2E11]">Verra VM0047 ARR & ICAR-CAFRI Verified</span>
            <span className="hidden sm:inline"> • Direct PDF generation & verifiable digital export</span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleSavePdf}
              disabled={isGeneratingPdf}
              className="px-4 py-2 rounded-xl bg-[#2D4A22] hover:bg-[#1E3615] text-[#F1F5EF] text-xs font-bold flex items-center gap-2 shadow-xs transition-all disabled:opacity-50 cursor-pointer"
            >
              {isGeneratingPdf ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{statusMessage || 'Saving...'}</span>
                </>
              ) : pdfSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span>PDF Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>{language === 'ta' ? 'PDF பதிவிறக்க (.pdf)' : 'Save PDF (.pdf)'}</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white hover:bg-[#F4F1EA] text-[#6D7A65] hover:text-[#1A2E11] text-xs font-semibold border border-[#E0D8C8] cursor-pointer transition-colors"
            >
              {language === 'ta' ? 'மூடு' : 'Close'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
