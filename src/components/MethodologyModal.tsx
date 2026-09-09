import React from 'react';
import { X, ShieldCheck, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { TRANSLATIONS, Language } from '../utils/translations';

interface MethodologyModalProps {
  isOpen: boolean;
  onClose: () => void;
  language?: Language;
  onLanguageChange?: (lang: Language) => void;
}

const METHODOLOGY_CONTENT: Record<Language, {
  corePositionLabel: string;
  coreQuote: string;
  coreExplanation: string;
  sec1Title: string;
  sec1Desc: string;
  p10Label: string;
  p10Desc: string;
  p50Label: string;
  p50Desc: string;
  p90Label: string;
  p90Desc: string;
  sec2Title: string;
  sec2Desc: string;
  rsLabel: string;
  cfLabel: string;
  cfDesc: string;
  molecularRatioDesc: string;
  bVerraDesc: string;
  mMrvDesc: string;
  sec3Title: string;
  icarLabel: string;
  icarDesc: string;
  friLabel: string;
  friDesc: string;
  nabardLabel: string;
  nabardDesc: string;
  verraLabel: string;
  verraDesc: string;
  understoodBtn: string;
}> = {
  en: {
    corePositionLabel: 'Core Strategic Position',
    coreQuote: '“We don\'t sell you carbon credits. We tell you whether the project makes sense before you spend money.”',
    coreExplanation: 'Most carbon brokers oversell revenue to secure farmer sign-ups, only for farmers to incur high sapling debt when yields fail. GreenVest provides an independent pre-feasibility filter.',
    sec1Title: '1. Why the Uncertainty Range is Mandatory',
    sec1Desc: 'Agroforestry biomass accumulation is non-deterministic. It depends heavily on inter-annual monsoon variability, soil drainage depth, pest dynamics, and local weeding care. Presenting a single point estimate (e.g. “You WILL make ₹2 Lakh”) is statistically deceptive.',
    p10Label: 'P10 (Conservative)',
    p10Desc: 'Sub-optimal rainfall, 72% survival, high soil friction.',
    p50Label: 'P50 (Expected)',
    p50Desc: 'Average historical precipitation and standard silvicultural care.',
    p90Label: 'P90 (Optimistic)',
    p90Desc: 'Favorable monsoons, drip irrigation, low mortality infill.',
    sec2Title: '2. Mathematical Formulation & Allometric Equations',
    sec2Desc: 'Above-ground biomass (AGB) is computed using empirical logistic growth equations parameterized by species:',
    rsLabel: 'Root to Shoot Ratio',
    cfLabel: 'Carbon Fraction',
    cfDesc: '47% elemental carbon in dry biomass',
    molecularRatioDesc: 'Molecular ratio (44/12) to convert elemental Carbon (C) to carbon dioxide equivalent (CO₂e).',
    bVerraDesc: '18% mandatory non-permanence risk buffer pool (Verra VCS VM0047 standard).',
    mMrvDesc: '10% discount for measurement uncertainty & baseline deductions.',
    sec3Title: '3. Primary Literature & Benchmark Citations',
    icarLabel: 'ICAR - CAFRI (Jhansi):',
    icarDesc: 'National Agroforestry Policy biomass tables for Melia dubia, Tectona grandis, and Casuarina.',
    friLabel: 'Forest Research Institute (FRI, Dehradun):',
    friDesc: 'Volume and yield tables for commercial plantation timber species of Southern India.',
    nabardLabel: 'NABARD:',
    nabardDesc: 'Unit cost guidelines for farm forestry and agroforestry plantations (2024–25).',
    verraLabel: 'Verra VCS VM0047:',
    verraDesc: 'Methodology for Afforestation, Reforestation and Revegetation (ARR), Version 1.0.',
    understoodBtn: 'Understood'
  },
  ta: {
    corePositionLabel: 'முதன்மை நிலைப்பாடு',
    coreQuote: '“நாங்கள் உங்களுக்கு கார்பன் வரவுகளை விற்பனை செய்வதில்லை. நீங்கள் பணத்தை செலவழிக்கும் முன் திட்டம் சாத்தியமானதா என்பதை நேர்மையாகக் கூறுகிறோம்.”',
    coreExplanation: 'பெரும்பாலான கார்பன் இடைத்தரகர்கள் விவசாயிகளை சேர்க்க அதிக வருவாய் வாக்குறுதி அளிக்கின்றனர். ஆனால் விளைச்சல் குறையும் போது விவசாயிகள் நஷ்டமடைகிறார்கள். கிரீன்வெஸ்ட் சுயாதீனமான முன்-மதிப்பீட்டை வழங்குகிறது.',
    sec1Title: '1. நிச்சயமற்ற வரம்பு ஏன் கட்டாயமானது?',
    sec1Desc: 'வேளாண் காடுகளில் கார்பன் சேமிப்பு என்பது மழைப்பொழிவு, மண் வடிகால் திறன், பூச்சித் தாக்குதல் மற்றும் பராமரிப்பைப் பொறுத்தது. ஒற்றை எண்ணை மட்டும் ("கண்டிப்பாக ₹2 லட்சம் கிடைக்கும்") கூறுவது தவறானது.',
    p10Label: 'P10 (எச்சரிக்கை)',
    p10Desc: 'குறைவான மழை, 72% உயிர்வாழும் வீதம், வறண்ட காலநிலை.',
    p50Label: 'P50 (இடைநிலை)',
    p50Desc: 'சராசரி மழைப்பொழிவு மற்றும் சீரான களப் பராமரிப்பு.',
    p90Label: 'P90 (உயர்நிலை)',
    p90Desc: 'சிறந்த மழை, சொட்டு நீர் பாசனம், அதிக வளர்ச்சி.',
    sec2Title: '2. கணித சூத்திரம் & அளவீட்டு சமன்பாடுகள்',
    sec2Desc: 'மரங்களின் தரைக்கு மேலே உள்ள உயிர்ப்பொருள் (AGB) லாஜிஸ்டிக் வளர்ச்சி சமன்பாடுகள் மூலம் கணக்கிடப்படுகிறது:',
    rsLabel: 'வேர் மற்றும் தண்டு விகிதம்',
    cfLabel: 'கார்பன் பின்னம்',
    cfDesc: 'உலர்ந்த மரத்தில் 47% கரிம கார்பன்',
    molecularRatioDesc: 'கார்பனை (C) கார்பன் டை ஆக்சைடாக (CO₂e) மாற்றும் மூலக்கூறு விகிதம் (44/12).',
    bVerraDesc: '18% வெர்ரா கட்டாய அபாய சேமிப்பு ஒதுக்கம் (Verra VCS VM0047 தரம்).',
    mMrvDesc: '10% அளவீட்டு நிச்சயமற்ற தன்மை மற்றும் அடிப்படை ஆய்வுக் கழிவு.',
    sec3Title: '3. அங்கீகரிக்கப்பட்ட அறிவியல் ஆதாரங்கள்',
    icarLabel: 'ICAR - CAFRI (ஜான்சி):',
    icarDesc: 'தேசிய வேளாண் காடுகள் கொள்கை மற்றும் மலைவேம்பு, தேக்கு, சவுக்கு வளர்ச்சி அட்டவணைகள்.',
    friLabel: 'வன ஆராய்ச்சி நிறுவனம் (FRI, டேராடூன்):',
    friDesc: 'தென்னிந்திய மர வகைகளுக்கான வணிக ரீதியான மர வளர்ச்சி மற்றும் விளைச்சல் அட்டவணைகள்.',
    nabardLabel: 'நபார்டு (NABARD):',
    nabardDesc: 'பண்ணை வனவியல் மற்றும் வேளாண் காடுகளுக்கான அலகு செலவு வழிகாட்டுதல்கள் (2024–25).',
    verraLabel: 'வெர்ரா VCS VM0047:',
    verraDesc: 'காடு வளர்ப்பு மற்றும் மீளுருவாக்க முறைமை (ARR), பதிப்பு 1.0.',
    understoodBtn: 'புரிந்துகொண்டேன்'
  },
  ml: {
    corePositionLabel: 'തന്ത്രപ്രധാനമായ നിലപാട്',
    coreQuote: '“ഞങ്ങൾ കാർബൺ ക്രെഡിറ്റുകൾ വിൽക്കുന്നില്ല. നിങ്ങൾ പണം ചെലവഴിക്കുന്നതിന് മുൻപ് പദ്ധതി പ്രായോഗികമാണോ എന്ന് വ്യക്തമാക്കുന്നു.”',
    coreExplanation: 'കർഷകരെ ചേർക്കാൻ പല ബ്രോക്കർമാരും അമിത വരുമാനം വാഗ്ദാനം ചെയ്യുന്നു, എന്നാൽ വിളവ് കുറയുമ്പോൾ കർഷകർ കടക്കെണിയിലാകുന്നു. ഗ്രീൻവെസ്റ്റ് സുതാര്യമായ പ്രീ-ഫീസിബിലിറ്റി പരിശോധന നൽകുന്നു.',
    sec1Title: '1. അനിശ്ചിതത്വ പരിധി എന്തുകൊണ്ട് നിർബന്ധമാണ്?',
    sec1Desc: 'കാർഷിക വനവൽക്കരണത്തിലെ കാർബൺ ശേഖരണം കാലാവസ്ഥ, മൺസൂൺ, മണ്ണിന്റെ ആഴം, കീടബാധ എന്നിവയെ ആശ്രയിച്ചിരിക്കുന്നു. ഒരൊറ്റ സംഖ്യ മാത്രം ("നിങ്ങൾക്ക് ₹2 ലക്ഷം ഉറപ്പായും ലഭിക്കും") പറയുന്നത് തെറ്റിദ്ധാരണാജനകമാണ്.',
    p10Label: 'P10 (യാഥാസ്ഥിതികം)',
    p10Desc: 'കുറഞ്ഞ മഴ, 72% അതിജീവനം, വരണ്ട കാലാവസ്ഥ.',
    p50Label: 'P50 (പ്രതീക്ഷിതം)',
    p50Desc: 'ശരാശരി മഴയും സാധാരണ പരിപാലനവും.',
    p90Label: 'P90 (ആശാവഹം)',
    p90Desc: 'നല്ല മഴ, തുള്ളിനന, കുറഞ്ഞ മരനാശം.',
    sec2Title: '2. ഗണിതശാസ്ത്ര സൂത്രവാക്യങ്ങളും സമവാക്യങ്ങളും',
    sec2Desc: 'മരങ്ങളുടെ ഭൂമിക്ക് മുകളിലുള്ള ബയോമാസ് (AGB) ഇനം അടിസ്ഥാനമാക്കിയുള്ള ലോജിസ്റ്റിക് സമവാക്യങ്ങൾ വഴി കണക്കാക്കുന്നു:',
    rsLabel: 'റൂട്ട് ടു ഷൂട്ട് അനുപാതം',
    cfLabel: 'കാർബൺ ഫ്രാക്ഷൻ',
    cfDesc: 'ഉണങ്ങിയ ബയോമാസിൽ 47% കാർബൺ',
    molecularRatioDesc: 'കാർബണിനെ (C) കാർബൺ ഡൈ ഓക്സൈഡ് തുല്യതയിലേക്ക് (CO₂e) മാറ്റുന്നതിനുള്ള മോളിക്യുലാർ അനുപാതം (44/12).',
    bVerraDesc: '18% നിർബന്ധിത പെർമനൻസ് റിസ്ക് ബഫർ റിസർവ് (വെറ VCS VM0047).',
    mMrvDesc: '10% അളവെടുപ്പ് അനിശ്ചിതത്വ കിഴിവ്.',
    sec3Title: '3. ശാസ്ത്രീയ പഠനങ്ങളും സ്രോതസ്സുകളും',
    icarLabel: 'ICAR - CAFRI (ഝാൻസി):',
    icarDesc: 'ദേശീയ കാർഷിക വനവൽക്കരണ നയത്തിന്റെ ബയോമാസ് പട്ടികകൾ (മലവേമ്പ്, തേക്ക്, കാറ്റാടി).',
    friLabel: 'ഫോറസ്റ്റ് റിസർച്ച് ഇൻസ്റ്റിറ്റ്യൂട്ട് (FRI, ഡെറാഡൂൺ):',
    friDesc: 'ദക്ഷിണേന്ത്യയിലെ വാണിജ്യ മരങ്ങൾക്കായുള്ള വോളിയം & യീൽഡ് ടേബിളുകൾ.',
    nabardLabel: 'നബാർഡ് (NABARD):',
    nabardDesc: 'കാർഷിക വനവൽക്കരണ തോട്ടങ്ങൾക്കായുള്ള യൂണിറ്റ് ചെലവ് മാർഗ്ഗനിർദ്ദേശങ്ങൾ (2024–25).',
    verraLabel: 'വെറ VCS VM0047:',
    verraDesc: 'അഫോറസ്റ്റേഷൻ, റീഫോറസ്റ്റേഷൻ & റിവെജിറ്റേഷൻ (ARR) രീതിശാസ്ത്രം പതിപ്പ് 1.0.',
    understoodBtn: 'മനസ്സിലായി'
  },
  kn: {
    corePositionLabel: 'ಮೂಲ ಕಾರ್ಯತಂತ್ರದ ನಿಲುವು',
    coreQuote: '“ನಾವು ನಿಮಗೆ ಇಂಗಾಲದ ಕ್ರೆಡಿಟ್‌ಗಳನ್ನು ಮಾರಾಟ ಮಾಡುವುದಿಲ್ಲ. ಹಣ ಖರ್ಚು ಮಾಡುವ ಮುನ್ನ ಯೋಜನೆಯು ಲಾಭದಾಯಕವೇ ಎಂದು ನಾವು ತಿಳಿಸುತ್ತೇವೆ.”',
    coreExplanation: 'ಹೆಚ್ಚಿನ ಕಾರ್ಬನ್ ದಲ್ಲಾಳಿಗಳು ರೈತರನ್ನು ಸೇರಿಸಿಕೊಳ್ಳಲು ಅತಿಯಾದ ಆದಾಯದ ಭರವಸೆ ನೀಡುತ್ತಾರೆ. ಆದರೆ ಇಳುವರಿ ಕಡಿಮೆಯಾದಾಗ ರೈತರು ನಷ್ಟ ಅನುಭವಿಸುತ್ತಾರೆ. ಗ್ರೀನ್‌ವೆಸ್ಟ್ ಸ್ವತಂತ್ರ ಪೂರ್ವ-ಸಾಧ್ಯತಾ ಮೌಲ್ಯಮಾಪನ ಒದಗಿಸುತ್ತದೆ.',
    sec1Title: '1. ಅನಿಶ್ಚಿತತೆಯ ಶ್ರೇಣಿ ಏಕೆ ಕಡ್ಡಾಯವಾಗಿದೆ?',
    sec1Desc: 'ಕೃಷಿ ಅರಣ್ಯದಲ್ಲಿ ಇಂಗಾಲದ ಶೇಖರಣೆಯು ಮಳೆಯ ವ್ಯತ್ಯಾಸ, ಮಣ್ಣಿನ ಗುಣಮಟ್ಟ, ಕೀಟಬಾಧೆ ಮತ್ತು ನಿರ್ವಹಣೆಯನ್ನು ಅವಲಂಬಿಸಿರುತ್ತದೆ. ಕೇವಲ ಒಂದೇ ಅಂಕಿಅಂಶವನ್ನು ("ನಿಮಗೆ ₹2 ಲಕ್ಷ ಸಿಗುತ್ತದೆ") ನೀಡುವುದು ದಾರಿತಪ್ಪಿಸುವಂತಾಗಿದೆ.',
    p10Label: 'P10 (ಎಚ್ಚರಿಕೆ/ಕನಿಷ್ಠ)',
    p10Desc: 'ಕಡಿಮೆ ಮಳೆ, ಶೇ.72 ರಷ್ಟು ಉಳಿವಿನ ಪ್ರಮಾಣ, ಕಠಿಣ ಪರಿಸ್ಥಿತಿ.',
    p50Label: 'P50 (ನಿರೀಕ್ಷಿತ)',
    p50Desc: 'ಸರಾಸರಿ ಮಳೆ ಮತ್ತು ಪ್ರಮಾಣಿತ ನಿರ್ವಹಣೆ.',
    p90Label: 'P90 (ಉತ್ತಮ/ಗರಿಷ್ಠ)',
    p90Desc: 'ಉತ್ತಮ ಮಳೆ, ಹನಿ ನೀರಾವರಿ, ಅತ್ಯುತ್ತಮ ಬೆಳವಣಿಗೆ.',
    sec2Title: '2. ಗಣಿತ ಸೂತ್ರ ಮತ್ತು ಸಮೀಕರಣಗಳು',
    sec2Desc: 'ಮರಗಳ ಮೇಲ್ಮೈ ಬಯೋಮಾಸ್ (AGB) ಅನ್ನು ಅನುಭವಜನ್ಯ ಬೆಳವಣಿಗೆಯ ಸಮೀಕರಣಗಳ ಮೂಲಕ ಲೆಕ್ಕಹಾಕಲಾಗುತ್ತದೆ:',
    rsLabel: 'ಬೇರು ಮತ್ತು ಕಾಂಡದ ಅನುಪಾತ',
    cfLabel: 'ಇಂಗಾಲದ ಅಂಶ',
    cfDesc: 'ಒಣ ಬಯೋಮಾಸ್‌ನಲ್ಲಿ ಶೇ.47 ರಷ್ಟು ಇಂಗಾಲ',
    molecularRatioDesc: 'ಇಂಗಾಲವನ್ನು (C) ಇಂಗಾಲದ ಡೈಆಕ್ಸೈಡ್ ಸಮಾನತೆಗೆ (CO₂e) ಪರಿವರ್ತಿಸಲು ಆಣ್ವಿಕ ಅನುಪಾತ (44/12).',
    bVerraDesc: 'ಶೇ.18 ವೆರ್ರಾ ಕಡ್ಡಾಯ ಅಪಾಯ ಮೀಸಲು ನಿಧಿ (Verra VCS VM0047 ಮಾನದಂಡ).',
    mMrvDesc: 'ಶೇ.10 ಅಳತೆ ಅನಿಶ್ಚಿತತೆ ಮತ್ತು ಬೇಸ್‌ಲೈನ್ ಕಡಿತ.',
    sec3Title: '3. ಪ್ರಾಥಮಿಕ ವಿಜ್ಞಾನ ಮತ್ತು ಮಾನದಂಡ ಉಲ್ಲೇಖಗಳು',
    icarLabel: 'ICAR - CAFRI (ಝಾನ್ಸಿ):',
    icarDesc: 'ಹೆಬ್ಬೇವು, ತೇಗ ಮತ್ತು ಸರ್ವೆ ಮರಗಳ ರಾಷ್ಟ್ರೀಯ ಕೃಷಿ ಅರಣ್ಯ ನೀತಿ ಬಯೋಮಾಸ್ ಕೋಷ್ಟಕಗಳು.',
    friLabel: 'ಅರಣ್ಯ ಸಂಶೋಧನಾ ಸಂಸ್ಥೆ (FRI, ಡೆಹ್ರಾಡೂನ್):',
    friDesc: 'ದಕ್ಷಿಣ ಭಾರತದ ವಾಣಿಜ್ಯ ಮರಗಳ ಬೆಳವಣಿಗೆ ಮತ್ತು ಇಳುವರಿ ಕೋಷ್ಟಕಗಳು.',
    nabardLabel: 'ನಬಾರ್ಡ್ (NABARD):',
    nabardDesc: 'ಕೃಷಿ ಅರಣ್ಯ ಮತ್ತು ಮರ ಬೆಳೆಸುವಿಕೆಗಾಗಿ ಘಟಕ ವೆಚ್ಚ ಮಾರ್ಗಸೂಚಿಗಳು (2024–25).',
    verraLabel: 'ವೆರ್ರಾ VCS VM0047:',
    verraDesc: 'ಅರಣ್ಯೀಕರಣ, ಮರುಅರಣ್ಯೀಕರಣ ಮತ್ತು ಪುನರುಜ್ಜೀವನ ವಿಧಾನ (ARR), ಆವೃತ್ತಿ 1.0.',
    understoodBtn: 'ಅರ್ಥವಾಯಿತು'
  },
  te: {
    corePositionLabel: 'ప్రధాన వ్యూహాత్మక స్థానం',
    coreQuote: '“మేము మీకు కార్బన్ క్రెడిట్లను అమ్మడం లేదు. మీరు డబ్బు ఖర్చు చేయడానికి ముందే ప్రాజెక్ట్ లాభదాయకమో కాదో నిజాయితీగా చెబుతాము.”',
    coreExplanation: 'రైతులను చేర్పించుకోవడానికి కార్బన్ బ్రోకర్లు అధిక రాబడి వాగ్దానాలు చేస్తారు, కానీ దిగుబడి తగ్గినప్పుడు రైతులు అప్పులపాలవుతారు. గ్రీన్ వెస్ట్ స్వతంత్ర ముందస్తు సాధ్యాసాధ్యాల సమీక్షను అందిస్తుంది.',
    sec1Title: '1. అనిశ్చితి పరిధి ఎందుకు తప్పనిసరి?',
    sec1Desc: 'వ్యవసాయ అటవీ రంగంలో కార్బన్ నిల్వ వర్షపాతం, నేల లోతు, తెగుళ్లు మరియు నిర్వహణపై ఆధారపడి ఉంటుంది. కేవలం ఒకే సంఖ్యను ("మీకు ఖచ్చితంగా ₹2 లక్షలు వస్తాయి") చెప్పడం మోసపూరితం.',
    p10Label: 'P10 (సంప్రదాయక/కనిష్టం)',
    p10Desc: 'తక్కువ వర్షపాతం, 72% బ్రతికే రేటు, కఠిన వాతావరణం.',
    p50Label: 'P50 (ఆశించిన సగటు)',
    p50Desc: 'సగటు వర్షపాతం మరియు ప్రామాణిక నిర్వహణ.',
    p90Label: 'P90 (ఆశావాహ/గరిష్టం)',
    p90Desc: 'మంచి వర్షాలు, బిందు సేద్యం, అధిక పెరుగుదల.',
    sec2Title: '2. గణిత సూత్రం & అలోమెట్రిక్ సమీకరణాలు',
    sec2Desc: 'చెట్ల ఉపరితల బయోమాస్ (AGB) లాజిస్టిక్ వృద్ధి సమీకరణాల ద్వారా గణించబడుతుంది:',
    rsLabel: 'వేరు మరియు కాండం నిష్పత్తి',
    cfLabel: 'కార్బన్ భిన్నం',
    cfDesc: 'ఎండిన బయోమాస్‌లో 47% కార్బన్',
    molecularRatioDesc: 'కార్బన్ (C) ను కార్బన్ డయాక్సైడ్ సమానంగా (CO₂e) మార్చే పరమాణు నిష్పత్తి (44/12).',
    bVerraDesc: '18% వెర్రా తప్పనిసరి ప్రమాద నిల్వ బఫర్ (Verra VCS VM0047 ప్రమాణం).',
    mMrvDesc: '10% కొలత అనిశ్చితి & బేస్‌లైన్ తగ్గింపు.',
    sec3Title: '3. ప్రాథమిక శాస్త్రీయ ఆధారాలు & మూలాలు',
    icarLabel: 'ICAR - CAFRI (ఝాన్సీ):',
    icarDesc: 'మలబార్ వేప, టేకు, సర్వి చెట్ల జాతీయ వ్యవసాయ అటవీ విధాన బయోమాస్ పట్టికలు.',
    friLabel: 'ఫారెస్ట్ రీసెర్చ్ ఇన్‌స్టిట్యూట్ (FRI, డెహ్రాడూన్):',
    friDesc: 'దక్షిణ భారతదేశ వాణిజ్య కలప జాతుల పరిమాణం & దిగుబడి పట్టికలు.',
    nabardLabel: 'నాబార్డ్ (NABARD):',
    nabardDesc: 'వ్యవసాయ అటవీ తోటల యూనిట్ వ్యయ మార్గదర్శకాలు (2024–25).',
    verraLabel: 'వెర్రా VCS VM0047:',
    verraDesc: 'అటవీకరణ, పునరుద్ధరణ పద్ధతి (ARR), వెర్షన్ 1.0.',
    understoodBtn: 'అర్థమైంది'
  }
};

export const MethodologyModal: React.FC<MethodologyModalProps> = ({
  isOpen,
  onClose,
  language = 'en',
  onLanguageChange
}) => {
  if (!isOpen) return null;
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const m = METHODOLOGY_CONTENT[language] || METHODOLOGY_CONTENT.en;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E0D8C8]">
        
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-[#F4F1EA] flex flex-wrap items-center justify-between gap-3 z-10">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-2xl bg-[#F4F1EA] text-[#2D4A22] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1A2E11] font-serif">
                {t.modalMethodologyTitle}
              </h3>
              <p className="text-xs text-[#6D7A65]">
                {t.modalMethodologySubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onLanguageChange && (
              <div className="flex items-center bg-[#F4F1EA] p-0.5 sm:p-1 rounded-xl border border-[#E0D8C8] text-[11px] space-x-0.5">
                {(['en', 'ta', 'ml', 'kn', 'te'] as Language[]).map(l => (
                  <button
                    key={l}
                    onClick={() => onLanguageChange(l)}
                    className={`px-2 py-1 rounded-lg font-medium transition-all ${
                      language === l
                        ? 'bg-[#2D4A22] text-white font-bold shadow-2xs'
                        : 'text-[#52604D] hover:text-[#1A2E11]'
                    }`}
                  >
                    {l === 'en' ? 'EN' : l === 'ta' ? 'தமிழ்' : l === 'ml' ? 'മല' : l === 'kn' ? 'ಕನ್ನಡ' : 'తెలుగు'}
                  </button>
                ))}
              </div>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-[#6D7A65] hover:text-[#1A2E11] hover:bg-[#F4F1EA] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-xs text-[#2C3626] leading-relaxed">
          
          {/* Slogan callout */}
          <div className="p-5 rounded-3xl bg-[#F4F1EA] border border-[#CCD5AE]">
            <div className="text-[10px] font-bold text-[#8BA888] uppercase tracking-widest mb-1.5">
              {m.corePositionLabel}
            </div>
            <p className="text-sm font-bold text-[#1A2E11] italic font-serif">
              {m.coreQuote}
            </p>
            <p className="text-xs text-[#6D7A65] mt-1.5 leading-relaxed">
              {m.coreExplanation}
            </p>
          </div>

          {/* Section 1 */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-[#1A2E11] flex items-center gap-1.5 font-serif">
              <BookOpen className="w-4 h-4 text-[#2D4A22]" />
              <span>{m.sec1Title}</span>
            </h4>
            <p className="text-[#6D7A65]">
              {m.sec1Desc}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-[11px]">
              <div className="p-3 rounded-2xl bg-[#FDFBF7] border border-[#E0D8C8]">
                <span className="font-bold text-[#1A2E11] block font-serif">
                  {m.p10Label}
                </span>
                <span className="text-[#6D7A65] text-[10px] mt-0.5 block">
                  {m.p10Desc}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-[#E9EDC9] border border-[#CCD5AE] text-[#2D4A22]">
                <span className="font-bold text-[#1A2E11] block font-serif">
                  {m.p50Label}
                </span>
                <span className="text-[#2D4A22] text-[10px] mt-0.5 block font-medium">
                  {m.p50Desc}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-[#FDFBF7] border border-[#E0D8C8]">
                <span className="font-bold text-[#1A2E11] block font-serif">
                  {m.p90Label}
                </span>
                <span className="text-[#6D7A65] text-[10px] mt-0.5 block">
                  {m.p90Desc}
                </span>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-[#1A2E11] flex items-center gap-1.5 font-serif">
              <Layers className="w-4 h-4 text-[#2D4A22]" />
              <span>{m.sec2Title}</span>
            </h4>
            <p className="text-[#6D7A65]">
              {m.sec2Desc}
            </p>
            <div className="p-4 rounded-2xl bg-[#1A2E11] text-[#CCD5AE] font-mono text-[11px] overflow-x-auto border border-white/10">
              Net tCO₂e = AGB × (1 + R:S) × CF × (44/12) × (1 - B_verra) × (1 - M_mrv)
            </div>
            <ul className="space-y-1.5 list-disc pl-4 text-[#6D7A65]">
              <li>
                <strong className="text-[#1A2E11]">R:S ({m.rsLabel}):</strong> 0.26 (IPCC AFOLU).
              </li>
              <li>
                <strong className="text-[#1A2E11]">CF ({m.cfLabel}):</strong> 0.47 ({m.cfDesc}).
              </li>
              <li>
                <strong className="text-[#1A2E11]">44/12:</strong> {m.molecularRatioDesc}
              </li>
              <li>
                <strong className="text-[#1A2E11]">B_verra:</strong> {m.bVerraDesc}
              </li>
              <li>
                <strong className="text-[#1A2E11]">M_mrv:</strong> {m.mMrvDesc}
              </li>
            </ul>
          </div>

          {/* Section 3: Published Citations */}
          <div className="space-y-2">
            <h4 className="text-sm font-bold text-[#1A2E11] flex items-center gap-1.5 font-serif">
              <CheckCircle2 className="w-4 h-4 text-[#2D4A22]" />
              <span>{m.sec3Title}</span>
            </h4>
            <div className="space-y-1.5 text-[11px] text-[#6D7A65]">
              <p>• <strong className="text-[#1A2E11]">{m.icarLabel}</strong> {m.icarDesc}</p>
              <p>• <strong className="text-[#1A2E11]">{m.friLabel}</strong> {m.friDesc}</p>
              <p>• <strong className="text-[#1A2E11]">{m.nabardLabel}</strong> {m.nabardDesc}</p>
              <p>• <strong className="text-[#1A2E11]">{m.verraLabel}</strong> {m.verraDesc}</p>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F4F1EA] border-t border-[#E0D8C8] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#2D4A22] hover:bg-[#3D5C31] text-[#F1F5EF] font-bold text-xs transition-colors shadow-xs"
          >
            {m.understoodBtn}
          </button>
        </div>

      </div>
    </div>
  );
};
