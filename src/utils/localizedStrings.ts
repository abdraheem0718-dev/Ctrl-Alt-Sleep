import { Language } from './translations';

// Currency Formatter across all 5 South Asian languages
export const formatLocalizedInr = (amount: number, lang: Language): string => {
  const abs = Math.abs(amount);
  if (abs >= 100000) {
    const val = (amount / 100000).toFixed(1);
    switch (lang) {
      case 'ta': return `₹${val} லட்சம்`;
      case 'ml': return `₹${val} ലക്ഷം`;
      case 'kn': return `₹${val} ಲಕ್ಷ`;
      case 'te': return `₹${val} లక్ష`;
      default: return `₹${val}L`;
    }
  }
  const val = (amount / 1000).toFixed(0);
  switch (lang) {
    case 'ta': return `₹${val} ஆயிரம்`;
    case 'ml': return `₹${val} ആയിരം`;
    case 'kn': return `₹${val} ಸಾವಿರ`;
    case 'te': return `₹${val} వేలు`;
    default: return `₹${val}k`;
  }
};

// Full State Name Translations
export const STATE_TRANSLATIONS: Record<string, Record<Language, string>> = {
  'Tamil Nadu': {
    en: 'Tamil Nadu',
    ta: 'தமிழ்நாடு',
    ml: 'തമിഴ്നാട്',
    kn: 'ತಮಿಳುನಾಡು',
    te: 'తమిళనాడు'
  },
  'Kerala': {
    en: 'Kerala',
    ta: 'கேரளா',
    ml: 'കേരളം',
    kn: 'ಕೇರಳ',
    te: 'కేరళ'
  },
  'Karnataka': {
    en: 'Karnataka',
    ta: 'கர்நாடகா',
    ml: 'കർണാടക',
    kn: 'ಕರ್ನಾಟಕ',
    te: 'కర్ణాటక'
  },
  'Andhra Pradesh': {
    en: 'Andhra Pradesh',
    ta: 'ஆந்திரப் பிரதேசம்',
    ml: 'ആന്ധ്രാ പ്രദേശ്',
    kn: 'ಆಂಧ್ರಪ್ರದೇಶ',
    te: 'ఆంధ్రప్రదేశ్'
  },
  'Telangana': {
    en: 'Telangana',
    ta: 'தெலுங்கானா',
    ml: 'തെലങ്കാന',
    kn: 'ತೆಲಂಗಾಣ',
    te: 'తెలంగాణ'
  }
};

export const getLocalizedState = (stateName: string, lang: Language): string => {
  return STATE_TRANSLATIONS[stateName]?.[lang] || stateName;
};

// District Translations
export const DISTRICT_TRANSLATIONS: Record<string, Record<Language, string>> = {
  'Coimbatore': { en: 'Coimbatore', ta: 'கோயம்புத்தூர்', ml: 'കോയമ്പത്തൂർ', kn: 'ಕೊಯಮತ್ತೂರು', te: 'కోయంబత్తూరు' },
  'Thanjavur': { en: 'Thanjavur', ta: 'தஞ்சாவூர்', ml: 'തഞ്ചാവൂർ', kn: 'ತಂಜಾವೂರು', te: 'తంజావూరు' },
  'Salem': { en: 'Salem', ta: 'சேலம்', ml: 'സേലം', kn: 'ಸೇಲಂ', te: 'సేలం' },
  'Tirunelveli': { en: 'Tirunelveli', ta: 'திருநெல்வேலி', ml: 'തിരുനെൽവേലി', kn: 'ತಿರುನೆಲ್ವೇಲಿ', te: 'తిరునెల్వేలి' },
  'Dindigul': { en: 'Dindigul', ta: 'திண்டுக்கல்', ml: 'ദിണ്ടിഗൽ', kn: 'ದಿಂಡಿಗಲ್', te: 'దిండిగల్' },
  'Madurai': { en: 'Madurai', ta: 'மதுரை', ml: 'മധുര', kn: 'ಮಧುರೆ', te: 'మధురై' },
  'Erode': { en: 'Erode', ta: 'ஈரோடு', ml: 'ഈറോഡ്', kn: 'ಈರೋಡ್', te: 'ఈరోడ్' },
  'Tiruchirappalli': { en: 'Tiruchirappalli', ta: 'திருச்சிராப்பள்ளி', ml: 'തിരുച്ചിറപ്പള്ളി', kn: 'ತಿರುಚಿರಾಪಳ್ಳಿ', te: 'తిరుచిరాపల్లి' },
  'Namakkal': { en: 'Namakkal', ta: 'நாமக்கல்', ml: 'നാമക്കൽ', kn: 'ನಾಮಕ್ಕಲ್', te: 'నామక్కల్' },
  'Pudukkottai': { en: 'Pudukkottai', ta: 'புதுக்கோட்டை', ml: 'പുതുക്കോട്ട', kn: 'ಪುದುಕೋಟೆ', te: 'పుదుక్కోటై' },
  'Palakkad': { en: 'Palakkad', ta: 'பாலக்காடு', ml: 'പാലക്കാട്', kn: 'ಪಾಲಕ್ಕಾಡ್', te: 'పాలక్కాడ్' },
  'Wayanad': { en: 'Wayanad', ta: 'வயநாடு', ml: 'വയനാട്', kn: 'ವಯನಾಡ್', te: 'వయనాడ్' },
  'Idukki': { en: 'Idukki', ta: 'இடுக்கி', ml: 'ഇടുക്കി', kn: 'ಇಡುಕ್ಕಿ', te: 'ఇడుక్కి' },
  'Thrissur': { en: 'Thrissur', ta: 'திருச்சூர்', ml: 'തൃശ്ശൂർ', kn: 'ತ್ರಿಶೂರ್', te: 'త్రిస్సూర్' },
  'Kozhikode': { en: 'Kozhikode', ta: 'கோழிக்கோடு', ml: 'കോഴിക്കോട്', kn: 'ಕೋಝಿಕೋಡ್', te: 'కోజికోడ్' },
  'Mysuru': { en: 'Mysuru', ta: 'மைசூர்', ml: 'മൈസൂർ', kn: 'ಮೈಸೂರು', te: 'మైసూరు' },
  'Hassan': { en: 'Hassan', ta: 'ஹாசன்', ml: 'ഹാസൻ', kn: 'ಹಾಸನ', te: 'హాసన్' },
  'Chikkamagaluru': { en: 'Chikkamagaluru', ta: 'சிக்கமகளூரு', ml: 'ചിക്കമഗളൂരു', kn: 'ಚಿಕ್ಕಮಗಳೂರು', te: 'చిక్కమగళూరు' },
  'Shimoga': { en: 'Shimoga', ta: 'ஷிமோகா', ml: 'ഷിമോഗ', kn: 'ಶಿವಮೊಗ್ಗ', te: 'శివమొగ్గ' },
  'Mandya': { en: 'Mandya', ta: 'மாண்டியா', ml: 'മാണ്ഡ്യ', kn: 'ಮಂಡ್ಯ', te: 'మండ్య' },
  'Chittoor': { en: 'Chittoor', ta: 'சித்தூர்', ml: 'ചിറ്റൂർ', kn: 'ಚಿತ್ತೂರು', te: 'చిత్తూరు' },
  'Anantapur': { en: 'Anantapur', ta: 'அனந்தபூர்', ml: 'അനന്തപൂർ', kn: 'ಅನಂತಪುರ', te: 'అనంతపురం' },
  'Prakasam': { en: 'Prakasam', ta: 'பிரகாசம்', ml: 'പ്രകാശം', kn: 'ಪ್ರಕಾಶಂ', te: 'ప్రకాశం' },
  'Kadapa': { en: 'Kadapa', ta: 'கடப்பா', ml: 'കടപ്പ', kn: 'ಕಡಪ', te: 'కడప' },
  'Khammam': { en: 'Khammam', ta: 'கம்மம்', ml: 'ഖമ്മം', kn: 'ಖಮ್ಮಂ', te: 'ఖమ్మం' },
  'Nalgonda': { en: 'Nalgonda', ta: 'நல்கொண்டா', ml: 'നൽഗൊണ്ട', kn: 'ನಲ್ಗೊಂಡ', te: 'నల్గొండ' },
  'Mahabubnagar': { en: 'Mahabubnagar', ta: 'மகபூப்நகர்', ml: 'മഹബൂബ്നഗർ', kn: 'ಮಹಬೂಬ್‌ನಗರ', te: 'మహబూబ్‌నగర్' }
};

export const getLocalizedDistrict = (districtName: string, lang: Language): string => {
  return DISTRICT_TRANSLATIONS[districtName]?.[lang] || districtName;
};

// Tree Species Multi-Language Names
export const SPECIES_NAMES: Record<string, Record<Language, string>> = {
  'Melia dubia': { en: 'Malabar Neem (Melia dubia)', ta: 'மலைவேம்பு (Melia dubia)', ml: 'മലവേപ്പ് (Melia dubia)', kn: 'ಹೆಬ್ಬೇವು (Melia dubia)', te: 'మలబార్ వేప (Melia dubia)' },
  'Casuarina equisetifolia': { en: 'Casuarina (Savukku)', ta: 'சவுக்கு (Casuarina)', ml: 'കാറ്റാടി (Casuarina)', kn: 'ಸರ್ವೆ ಮರ (Casuarina)', te: 'సర్వి చెట్టు (Casuarina)' },
  'Tectona grandis': { en: 'Teak (Thekku)', ta: 'தேக்கு (Teak)', ml: 'തേക്ക് (Teak)', kn: 'ತೇಗ (Teak)', te: 'టేకు (Teak)' },
  'Dalbergia sissoo': { en: 'Indian Rosewood (Sissoo)', ta: 'சிசு (Sissoo)', ml: 'ഇരുമുള്ള് (Sissoo)', kn: 'ಶೀಶಂ (Sissoo)', te: 'ఇరుగుడు చెట్టు (Sissoo)' },
  'Pterocarpus santalinus': { en: 'Red Sanders', ta: 'செஞ்சந்தனம் (Red Sanders)', ml: 'രക്തചന്ദനം (Red Sanders)', kn: 'ರಕ್ತಚಂದನ (Red Sanders)', te: 'ఎర్రచందనం (Red Sanders)' },
  'Grevillea robusta': { en: 'Silver Oak', ta: 'வெள்ளி ஓக் (Silver Oak)', ml: 'സിൽവർ ഓക്ക് (Silver Oak)', kn: 'ಸಿಲ್ವರ್ ಓಕ್ (Silver Oak)', te: 'సిల్వర్ ఓక్ (Silver Oak)' },
  'Azadirachta indica': { en: 'Neem', ta: 'வேம்பு (Neem)', ml: 'വേപ്പ് (Neem)', kn: 'ಬೇವು (Neem)', te: 'వేప (Neem)' },
  'Pongamia pinnata': { en: 'Pongamia (Pungai)', ta: 'புங்கம் (Pongamia)', ml: 'ഉങ്ങ് (Pongamia)', kn: 'ಹೊಂಗೆ (Pongamia)', te: 'కానుగ (Pongamia)' },
  'Moringa oleifera': { en: 'Drumstick (Moringa)', ta: 'முருங்கை (Moringa)', ml: 'മുരിങ്ങ (Moringa)', kn: 'ನುಗ್ಗೆಕಾಯಿ (Moringa)', te: 'మునగ (Moringa)' },
  'Swietenia mahagoni': { en: 'Mahogany', ta: 'மஹோகனி (Mahogany)', ml: 'മഹാഗണി (Mahogany)', kn: 'ಮಹಾಗನಿ (Mahogany)', te: 'మహాగని (Mahogany)' }
};

export const getLocalizedSpeciesName = (sp: { name: string; botanicalName?: string; tamilName?: string }, lang: Language): string => {
  if (lang === 'en') return sp.name;
  if (sp.botanicalName && SPECIES_NAMES[sp.botanicalName]?.[lang]) {
    return SPECIES_NAMES[sp.botanicalName][lang];
  }
  if (SPECIES_NAMES[sp.name]?.[lang]) {
    return SPECIES_NAMES[sp.name][lang];
  }
  if (lang === 'ta' && sp.tamilName) return sp.tamilName;
  return sp.name;
};

// UI Section Labels & Helpers
export const UI_STRINGS: Record<string, Record<Language, string>> = {
  // Common
  recommended: { en: '🌳 Recommended:', ta: '🌳 பரிந்துரைக்கப்பட்ட மரங்கள்:', ml: '🌳 ശുപാർശ ചെയ്യുന്ന മരങ്ങൾ:', kn: '🌳 ಶಿಫಾರಸು ಮಾಡಿದ ಮರಗಳು:', te: '🌳 సిఫార్సు చేసిన చెట్లు:' },
  speciesA: { en: 'Species A', ta: 'மர வகை அ', ml: 'ഇനം എ', kn: 'ಜಾತಿ ಎ', te: 'రకం ఎ' },
  speciesB: { en: 'Species B', ta: 'மர வகை ஆ', ml: 'ഇനം ബി', kn: 'ಜಾತಿ ಬಿ', te: 'రకం బి' },
  rotationCycle: { en: 'y Rotation', ta: 'ஆண்டு சுழற்சி', ml: 'വർഷം സൈക്കിൾ', kn: 'ವರ್ಷದ ಚಕ್ರ', te: 'సంవత్సరాల చక్రం' },
  recommendedSpacing: { en: 'Recommended Spacing:', ta: 'பரிந்துரைக்கப்பட்ட இடைவெளி:', ml: 'ശുപാർശ ചെയ്യുന്ന അകലം:', kn: 'ಶಿಫಾರಸು ಮಾಡಿದ ಅಂತರ:', te: 'సిఫార్సు చేసిన దూరం:' },
  growthVelocity: { en: 'Growth Velocity:', ta: 'வளர்ச்சி வேகம்:', ml: 'വളർച്ചാ വേഗത:', kn: 'ಬೆಳವಣಿಗೆಯ ವೇಗ:', te: 'పెరుగుదల వేగం:' },
  marketCoBenefit: { en: 'Market Co-Benefit: ', ta: 'சந்தை கூடுதல் பயன்: ', ml: 'വിപണി അധിക നേട്ടം: ', kn: 'ಮಾರುಕಟ್ಟೆ ಉಪಯುಕ್ತತೆ: ', te: 'మార్కెట్ అదనపు ప్రయోజనం: ' },
  marketCoBenefitVal: {
    en: 'Guaranteed off-take to paper mills, ply-wood, and packing industries.',
    ta: 'காகித ஆலைகள் மற்றும் ஒட்டுப்பலகைத் தொழிற்சாலைகளுக்கு உறுதியான நேரடி விற்பனை வாய்ப்பு.',
    ml: 'പേപ്പർ മില്ലുകൾക്കും പ്ലൈവുഡ് വ്യവസായങ്ങൾക്കും വിപണന സാധ്യത.',
    kn: 'ಕಾಗದ ಗಿರಣಿಗಳು ಮತ್ತು ಪ್ಲೈವುಡ್ ಕಾರ್ಖಾನೆಗಳಿಗೆ ನೇರ ಮಾರಾಟದ ಭರವಸೆ.',
    te: 'పేపర్ మిల్లులు మరియు ప్లైవుడ్ పరిశ్రమలకు స్థಿರమైన కొనుగోలు అవకాశం.'
  },
  plannedDensity: { en: 'Planned Density:', ta: 'திட்டமிடப்பட்ட மரங்கள்:', ml: 'ആസൂത്രിത മരങ്ങൾ:', kn: 'ಯೋಜಿತ ಸಾಂದ್ರತೆ:', te: 'ప్రణాళికాబద్ధమైన సాంద్రత:' },
  pattern: { en: 'Pattern:', ta: 'முறை:', ml: 'രീതി:', kn: 'ವಿಧಾನ:', te: 'పద్ధతి:' },
  treesPerAcreShort: { en: 'trees/ac', ta: 'மரங்கள்/ஏக்', ml: 'മരങ്ങൾ/ഏക്കർ', kn: 'ಮರಗಳು/ಎಕರೆ', te: 'చెట్లు/ఎకరా' },
  haShort: { en: 'ha', ta: 'ஹெக்', ml: 'ഹെക്', kn: 'ಹೆಕ್', te: 'హెక్' },
  mmRain: { en: 'mm rain', ta: 'மி.மீ மழை', ml: 'മി.മീ മഴ', kn: 'ಮಿ.ಮೀ ಮಳೆ', te: 'మి.మీ వర్షం' },
  
  // Confidence
  highConfidence: { en: 'High Quality', ta: 'உயர் தரம்', ml: 'ഉയർന്ന ഗുണനിലവാരം', kn: 'ಉನ್ನತ ಗುಣಮಟ್ಟ', te: 'అధిక నాణ్యత' },
  mediumConfidence: { en: 'Medium Quality', ta: 'நடுத்தர தரம்', ml: 'ഇടത്തരം ഗുണനിലവാരം', kn: 'ಮಧ್ಯಮ ಗುಣಮಟ್ಟ', te: 'మధ్యస్థ నాణ్యత' },
  warningConfidence: { en: 'Caution / Low', ta: 'எச்சரிக்கை', ml: 'ജാഗ്രത / കുറഞ്ഞത്', kn: 'ಎಚ್ಚರಿಕೆ / ಕಡಿಮೆ', te: 'హెచ్చరిక / తక్కువ' },

  // Metrics details
  carbonDeductionsNote: {
    en: 'Net of 18% Verra buffer & 10% MRV buffer',
    ta: '18% வெர்ரா சேமிப்பு & 10% MRV கழிவுக்குப் பின்',
    ml: '18% വെറ ബഫറും 10% MRV കിഴിവും കഴിഞ്ഞ്',
    kn: '18% ವೆರ್ರಾ ಮೀಸಲು ಮತ್ತು 10% MRV ಕಡಿತದ ನಂತರ',
    te: '18% వెర్రా బఫర్ మరియు 10% MRV మినహాయింపుల తర్వాత'
  },
  baselinePriceBenchmark: {
    en: 'At benchmark pricing',
    ta: 'அடிப்படை விலை கணிப்பில்',
    ml: 'മാനദണ്ഡ വില അടിസ്ഥാനത്തിൽ',
    kn: 'ಮೂಲ ಬೆಲೆ ಮಾನದಂಡದಲ್ಲಿ',
    te: 'ప్రామాణిక ధర అంచనాలో'
  },
  expectedP50Label: {
    en: 'Expected P50 baseline: ',
    ta: 'எதிர்பார்க்கப்படும் இடைநிலை (P50): ',
    ml: 'പ്രതീക്ഷിക്കുന്ന ഇടനില (P50): ',
    kn: 'ನಿರೀಕ್ಷಿತ ಸರಾಸರಿ (P50): ',
    te: 'ఆశించిన మధ్యస్థం (P50): '
  },
  year1CapexLabel: {
    en: 'Year 1 CapEx: ',
    ta: 'ஆண்டு 1 செலவு: ',
    ml: 'വർഷം 1 ചെലവ്: ',
    kn: 'ವರ್ಷ 1 ಖರ್ಚು: ',
    te: 'సంవత్సరం 1 ఖర్చు: '
  },
  nabardCostsNote: {
    en: 'NABARD saplings, pitting, & annual weeding',
    ta: 'நபார்டு கன்றுகள், குழி தோண்டுதல் & களையெடுத்தல்',
    ml: 'നബാർഡ് തൈകൾ, കുഴിയെടുക്കൽ & വാർഷിക കളനിയന്ത്രണം',
    kn: 'ನಬಾರ್ಡ್ ಸಸಿಗಳು, ಗುಂಡಿ ತೋಡುವುದು & ಕಳೆ ಕೀಳುವುದು',
    te: 'నాబార్డ్ మొక్కలు, గుంతలు తవ్వడం & కలుపు తీత'
  },
  net10YrSurplus: {
    en: 'Net 10-Yr Surplus',
    ta: '10-ஆண்டு நிகர உபரி',
    ml: '10-വർഷത്തെ അറ്റാദായം',
    kn: '10-ವರ್ಷದ ನಿವ್ವಳ ಲಾಭ',
    te: '10-సంవత్సరాల నికర లాభం'
  },
  timberResaleNote: {
    en: 'Excludes secondary timber resale co-benefit',
    ta: 'மரக்கட்டை விற்பனை வரவு சேர்க்கப்படவில்லை',
    ml: 'തടി വിൽപനയിൽ നിന്നുള്ള അധിക വരുമാനം ഉൾപ്പെടുത്തിയിട്ടില്ല',
    kn: 'ಮರಮುಟ್ಟು ಮಾರಾಟದ ಹೆಚ್ಚುವರಿ ಲಾಭವನ್ನು ಹೊರತುಪಡಿಸಿ',
    te: 'కలప విక్రయ అదనపు ఆదాయం కలపబడలేదు'
  },

  // 10-Year Trajectory
  trajectoryTitle: {
    en: '10-Year Sequestration & Cashflow Trajectory',
    ta: '10-ஆண்டு கார்பன் சேமிப்பு மற்றும் பணப்புழக்கப் பாதை',
    ml: '10-വർഷത്തെ കാർബൺ ശേഖരണവും പണമൊഴുക്കും',
    kn: '10-ವರ್ಷಗಳ ಕಾರ್ಬನ್ ಶೇಖರಣೆ ಮತ್ತು ನಗದು ಹರಿವಿನ ಪಥ',
    te: '10-సంవత్సరాల కార్బన్ నిల్వ మరియు నగదు ప్రవాహ మార్గం'
  },
  trajectorySubtitle: {
    en: 'Shaded envelope represents the empirical P10 (Conservative) to P90 (Optimistic) growth confidence interval.',
    ta: 'நிழலிட்ட பகுதி P10 (எச்சரிக்கையானது) முதல் P90 (உயர்நிலை) வரையிலான வளர்ச்சி சாத்தியக்கூறை காட்டுகிறது.',
    ml: 'ഷേഡുചെയ്ത ഭാഗം P10 മുതൽ P90 വരെയുള്ള വളർച്ചാ സാധ്യതയെ കാണിക്കുന്നു.',
    kn: 'ನೆರಳು ಮಾಡಿದ ಭಾಗವು P10 ನಿಂದ P90 ವರೆಗಿನ ಬೆಳವಣಿಗೆಯ ಸಂಭವನೀಯತೆಯನ್ನು ತೋರಿಸುತ್ತದೆ.',
    te: 'షేడ్ చేసిన భాగం P10 నుండి P90 వరకు పెరుగుదల సాధ్యతను సూచిస్తుంది.'
  },
  selectedMilestone: { en: 'Selected Milestone:', ta: 'மதிப்பீட்டு ஆண்டு:', ml: 'തിരഞ്ഞെടുത്ത നാഴികക്കല്ല്:', kn: 'ಆಯ್ಕೆಮಾಡಿದ ಮೈಲಿಗಲ್ಲು:', te: 'ఎంచుకున్న మైలురాయి:' },
  carbonSequestered: { en: 'Carbon Sequestered:', ta: 'சேமிக்கப்பட்ட கார்பன்:', ml: 'ശേഖരിച്ച കാർബൺ:', kn: 'ಶೇಖರಿಸಿದ ಕಾರ್ಬನ್:', te: 'నిల్వ చేసిన కార్బన్:' },
  cumulativeCosts: { en: 'Cumulative Costs:', ta: 'திரட்டப்பட்ட செலவுகள்:', ml: 'ആകെ ചെലവുകൾ:', kn: 'ಒಟ್ಟು ವೆಚ್ಚಗಳು:', te: 'మొత్తం ఖర్చులు:' },
  cumulativeGrossRev: { en: 'Cumulative Gross Rev:', ta: 'திரட்டப்பட்ட மொத்த வருவாய்:', ml: 'ആകെ മൊത്ത വരുമാനം:', kn: 'ಒಟ್ಟು ಆದಾಯ:', te: 'మొత్తం రాబడి:' },
  p10p90Ribbon: { en: 'P10–P90 Uncertainty Envelope', ta: 'P10–P90 நிச்சயமற்ற வரம்பு', ml: 'P10–P90 അനിശ്ചിതത്വ പരിധി', kn: 'P10–P90 ಅನಿಶ್ಚಿತತೆಯ ವ್ಯಾಪ್ತಿ', te: 'P10–P90 అనిశ్చితి పరిధి' },
  p50Baseline: { en: 'P50 Expected Baseline', ta: 'P50 இடைநிலை எதிர்பார்ப்பு', ml: 'P50 പ്രതീക്ഷിക്കുന്ന ഇടനില', kn: 'P50 ನಿರೀಕ್ಷಿತ ಸರಾಸರಿ', te: 'P50 ఆశించిన మధ్యస్థం' },
  activeYearCursor: { en: 'Active Year Cursor', ta: 'செயலில் உள்ள ஆண்டு', ml: 'സജീവ വർഷം', kn: 'ಸಕ್ರಿಯ ವರ್ಷದ ಸೂಚಕ', te: 'ప్రస్తుత సంవత్సరం' },
  yearShort: { en: 'Yr', ta: 'ஆண்டு', ml: 'വർഷം', kn: 'ವರ್ಷ', te: 'సంవత్సరం' },

  // Co-benefits
  coBenefitsHeading: {
    en: 'Additional Farm Resilience & Timber Co-Benefits',
    ta: 'கூடுதல் பண்ணை நெகிழ்ச்சி & சூழலியல் பலன்கள்',
    ml: 'കൂടുതൽ കാർഷിക പ്രതിരോധവും തടി നേട്ടങ്ങളും',
    kn: 'ಹೆಚ್ಚುವರಿ ಕೃಷಿ ಸ್ಥಿತಿಸ್ಥಾಪಕತ್ವ ಮತ್ತು ಮರದ ಪ್ರಯೋಜನಗಳು',
    te: 'అదనపు వ్యవసాయ స్థిరత్వం మరియు కలప ప్రయోజనాలు'
  },
  soilCarbon: { en: 'Soil Carbon', ta: 'மண் கரிம வளம்', ml: 'മണ്ണിലെ കാർബൺ', kn: 'ಮಣ್ಣಿನ ಸಾವಯವ ಕಾರ್ಬನ್', te: 'నేల సేంద్రీయ కార్బన్' },
  soilCarbonVal: {
    en: '+0.4% to +0.7% Soil Organic Carbon build-up',
    ta: '+0.4% முதல் +0.7% வரை கரிமப் பொருள் அதிகரிப்பு',
    ml: '+0.4% മുതൽ +0.7% വരെ ജൈവാംശ വർദ്ധനവ്',
    kn: '+0.4% ರಿಂದ +0.7% ವರೆಗೆ ಮಣ್ಣಿನ ಸಾವಯವ ಇಂಗಾಲ ಹೆಚ್ಚಳ',
    te: '+0.4% నుండి +0.7% వరకు నేల సేంద్రీయ కార్బన్ పెరుగుదల'
  },
  aquiferRecharge: { en: 'Aquifer Recharge', ta: 'நிலத்தடி நீர் மறுஊட்டம்', ml: 'ഭൂഗർഭജല റീചാർജ്', kn: 'ಅಂತರ್ಜಲ ಮರುಪೂರಣ', te: 'భూగర్భ జలాల రీఛార్జ్' },
  aquiferVal: {
    en: 'Up to 18% improvement in soil moisture retention',
    ta: 'மண் ஈரப்பதம் 18% வரை சேமிப்பு',
    ml: 'മണ്ണിലെ ഈർപ്പം 18% വരെ കൂടുതൽ നിലനിൽക്കുന്നു',
    kn: 'ಮಣ್ಣಿನ ತೇವಾಂಶ 18% ವರೆಗೆ ಸುಧಾರಣೆ',
    te: 'నేల తేమ 18% వరకు మెరుగుపడుతుంది'
  },
  timberMaturity: { en: 'Timber Value (Yr 8-12)', ta: 'மரக்கட்டை மதிப்பு (8-12 ஆண்டு)', ml: 'തടിയുടെ മൂല്യം (8-12 വർഷം)', kn: 'ಮರಮುಟ್ಟು ಮೌಲ್ಯ (8-12 ವರ್ಷ)', te: 'కలప విలువ (8-12 సం)' },
  timberVal: {
    en: '₹2.5 Lakh to ₹4.0 Lakh per acre timber harvest',
    ta: 'ஏக்கருக்கு ₹2.5 லட்சம் முதல் ₹4 லட்சம் வரை',
    ml: 'ഏക്കറിന് ₹2.5 ലക്ഷം മുതൽ ₹4 ലക്ഷം വരെ വിളവെടുപ്പ്',
    kn: 'ಎಕರೆಗೆ ₹2.5 ಲಕ್ಷದಿಂದ ₹4.0 ಲಕ್ಷದವರೆಗೆ ಮರದ ಆದಾಯ',
    te: 'ఎకరాకు ₹2.5 లక్షల నుండి ₹4.0 లక్షల వరకు కలప రాబడి'
  },
  microclimate: { en: 'Microclimate Buffer', ta: 'வெப்பநிலை தணிப்பு', ml: 'താപനില നിയന്ത്രണം', kn: 'ಸೂಕ್ಷ್ಮ ಹವಾಮಾನ ರಕ್ಷಣೆ', te: 'వాతావరణ సమతుల్యత' },
  microclimateVal: {
    en: '1.5°C to 2.5°C drop in summer canopy temperature',
    ta: 'கோடை வெப்பம் 1.5°C முதல் 2.5°C வரை குறையும்',
    ml: 'വേനൽക്കാലത്ത് 1.5°C മുതൽ 2.5°C വരെ താപനില കുറയുന്നു',
    kn: 'ಬೇಸಿಗೆಯಲ್ಲಿ 1.5°C ರಿಂದ 2.5°C ವರೆಗೆ ತಾಪಮಾನ ಇಳಿಕೆ',
    te: 'వేసవిలో ఉష్ణోగ్రత 1.5°C నుండి 2.5°C వరకు తగ్గుతుంది'
  },

  // Aggregation Call to Action Card
  zeroCostBadge: {
    en: 'ZERO INDIVIDUAL CERTIFICATION COST',
    ta: 'தனிநபர் சான்றிதழ் கட்டணம் ஏதுமில்லை',
    ml: 'വ്യക്തിഗത സർട്ടിഫിക്കേഷൻ ചെലവില്ല',
    kn: 'ವೈಯಕ್ತಿಕ ಪ್ರಮಾಣೀಕರಣ ವೆಚ್ಚವಿಲ್ಲ',
    te: 'వ్యక్తిగత ధృవీకరణ ఖర్చు సున్నా'
  },
  devMatchingTitle: {
    en: 'Project Developer Matching & Cohort Aggregation',
    ta: 'திட்ட உருவாக்குநர் பொருத்தம் & கூட்டுப் பதிவு',
    ml: 'പ്രോജക്റ്റ് ഡെവലപ്പർ മാച്ചിംഗും സംയോജനവും',
    kn: 'ಡೆವಲಪರ್ ಜೋಡಣೆ ಮತ್ತು ಸಾಮೂಹಿಕ ನೋಂದಣಿ',
    te: 'ప్రాజెక్ట్ డెవలపర్ మ్యాచింగ్ & సమూహ నమోదు'
  },
  devMatchingDesc: {
    en: 'Verra carbon project audits cost ₹25 Lakh+—impossible for individual farms. By expressing interest, GreenVest clusters you with verified regional neighbors to present an institutional cohort to verified carbon buyers.',
    ta: 'வெர்ரா கார்பன் திட்ட தணிக்கை ₹25 லட்சம்+ செலவாகும்—தனிநபர் பண்ணைகளுக்கு இது சாத்தியமற்றது. உங்கள் நிலத்தை பதிவு செய்வதன் மூலம், கிரீன்வெஸ்ட் உங்கள் பகுதியில் உள்ள விவசாயிகளுடன் உங்களை ஒருங்கிணைத்து நிறுவன முதலீட்டாளர்களுக்கு வழங்குகிறது.',
    ml: 'വെറ കാർബൺ പ്രോജക്റ്റ് ഓഡിറ്റിന് ₹25 ലക്ഷത്തിലധികം ചെലവാകും. ഗ്രീൻവെസ്റ്റ് നിങ്ങളുടെ പ്രദേശത്തെ കർഷകരെ ഒരുമിപ്പിച്ച് വലിയ പ്രോജക്റ്റായി വികസിപ്പിക്കുന്നു.',
    kn: 'ವೆರ್ರಾ ಕಾರ್ಬನ್ ಯೋಜನೆಗಳ ಆಡಿಟ್‌ಗೆ ₹25 ಲಕ್ಷಕ್ಕೂ ಹೆಚ್ಚು ವೆಚ್ಚವಾಗುತ್ತದೆ. ಗ್ರೀನ್‌ವೆಸ್ಟ್ ನಿಮ್ಮ ಭಾಗದ ರೈತರನ್ನು ಒಗ್ಗೂಡಿಸಿ ಸಾಂಸ್ಥಿಕ ಮಟ್ಟದಲ್ಲಿ ಅನುಮೋದನೆ ಕೊಡಿಸುತ್ತದೆ.',
    te: 'వెర్రా కార్బన్ ప్రాజెక్ట్ ఆడిట్‌కు ₹25 లక్షలకు పైగా ఖర్చు అవుతుంది. గ్రీన్‌వెస్ట్ మీ ప్రాంతంలోని రైతులను సమూహంగా చేర్చి కార్బన్ కొనుగోలుదారులకు అనుసంధానిస్తుంది.'
  },
  btnExpressInterest: {
    en: 'Express Interest for Free Aggregation',
    ta: 'இலவச கூட்டுத் திட்டத்தில் சேர விருப்பம் தெரிவிக்கவும்',
    ml: 'സൗജന്യ കൂട്ടായ്മയിൽ ചേരാൻ താൽപ്പര്യം അറിയിക്കുക',
    kn: 'ಉಚಿತ ಸಾಮೂಹಿಕ ಯೋಜನೆಗೆ ಆಸಕ್ತಿ ವ್ಯಕ್ತಪಡಿಸಿ',
    te: 'ఉచిత సమూహంలో చేరడానికి ఆసక్తిని తెలియజేయండి'
  },
  noUpfrontFees: {
    en: 'No upfront fees • Developer pays for soil testing & satellite MRV',
    ta: 'முன்பணம் ஏதுமில்லை • மண் பரிசோதனை மற்றும் செயற்கைக்கோள் ஆய்வுக் கட்டணங்களை உருவாக்குநரே ஏற்கிறார்',
    ml: 'മുൻകൂർ ഫീസുകളില്ല • മണ്ണ് പരിശോധനയും സാറ്റലൈറ്റ് ചെലവുകളും ഡെവലപ്പർ വഹിക്കുന്നു',
    kn: 'ಮುಂಗಡ ಶುಲ್ಕವಿಲ್ಲ • ಮಣ್ಣಿನ ಪರೀಕ್ಷೆ ಮತ್ತು ಉಪಗ್ರಹ ತಪಾಸಣಾ ವೆಚ್ಚವನ್ನು ಡೆವಲಪರ್ ಭರಿಸುತ್ತಾರೆ',
    te: 'ఎటువంటి ముందస్తు రుసుము లేదు • నేల పరీక్ష మరియు ఉపగ్రహ ఖర్చులను డెవలపరే భరిస్తారు'
  },
  parcelRegisteredBadge: {
    en: 'Parcel Registered in Regional Cluster',
    ta: 'நிலம் பதிவு செய்யப்பட்டது: பிராந்தியக் குழுமம்',
    ml: 'ഭൂമി രജിസ്റ്റർ ചെയ്തു: റീജിയണൽ ക്ലസ്റ്റർ',
    kn: 'ಜಮೀನು ನೋಂದಾಯಿಸಲಾಗಿದೆ: ಪ್ರಾದೇಶಿಕ ಕ್ಲಸ್ಟರ್',
    te: 'భూమి నమోదైంది: ప్రాంతీయ క్లస్టర్'
  },

  // Scientific Assumptions Accordion
  assumptionsHeader: {
    en: 'Scientific Model Assumptions & Methodology Disclosures',
    ta: 'அறிவியல் மாதிரி அனுமானங்கள் & நெறிமுறை விவரங்கள்',
    ml: 'ശാസ്ത്രീയ മാതൃക അനുമാനങ്ങളും വിവരങ്ങളും',
    kn: 'ವೈಜ್ಞಾನಿಕ ಮಾದರಿ ಊಹೆಗಳು ಮತ್ತು ನಿಯಮಾವಳಿಗಳು',
    te: 'శాస్త్రీయ నమూనా అంచనాలు & పద్ధతుల వివరాలు'
  },
  inspectAssumptions: {
    en: 'Inspect 6 Assumptions',
    ta: '6 அனுமானங்களை காண்க',
    ml: '6 അനുമാനങ്ങൾ കാണുക',
    kn: '6 ಊಹೆಗಳನ್ನು ಪರಿಶೀಲಿಸಿ',
    te: '6 అంచనాలను పరిశీలించండి'
  },
  hideAssumptions: {
    en: 'Hide Details',
    ta: 'விவரங்களை மறை',
    ml: 'വിശദാംശങ്ങൾ മറയ്ക്കുക',
    kn: 'ವಿವರಗಳನ್ನು ಮರೆಮಾಡಿ',
    te: 'వివరాలను దాచండి'
  },
  sourceLabel: {
    en: 'Source: ',
    ta: 'ஆதாரம்: ',
    ml: 'ഉറവിടം: ',
    kn: 'ಮೂಲ: ',
    te: 'ఆధారం: '
  },
  farmerDisclosureLabel: {
    en: 'Important Farmer Disclosure: ',
    ta: 'விவசாயிகளுக்கான முக்கிய அறிவிப்பு: ',
    ml: 'കർഷകർക്കായുള്ള പ്രധാന അറിയിപ്പ്: ',
    kn: 'ರೈತರಿಗೆ ಪ್ರಮುಖ ಸೂಚನೆ: ',
    te: 'రైతులకు ముఖ్యమైన గమనిక: '
  },
  farmerDisclosureText: {
    en: 'Carbon market credit issuance requires 3–5 years of documented satellite tree crown canopy growth and independent audit verification. Carbon revenue should be viewed as an incremental risk-hedge, not a substitute for core crop revenue.',
    ta: 'கார்பன் சந்தை வரவுகளுக்கு 3-5 ஆண்டுகள் செயற்கைக்கோள் மூலம் மர விதான வளர்ச்சி உறுதிப்படுத்தப்பட வேண்டும். கார்பன் வருவாய் என்பது ஒரு கூடுதல் பாதுகாப்பாக மட்டுமே கருதப்பட வேண்டும், முதன்மை பயிர் வருவாய்க்கு மாற்றாக அல்ல.',
    ml: 'കാർബൺ വരുമാനം ലഭിക്കുന്നതിന് 3-5 വർഷത്തെ മരങ്ങളുടെ വളർച്ച ഉപഗ്രഹം വഴി സാക്ഷ്യപ്പെടുത്തേണ്ടതുണ്ട്. കാർബൺ വരുമാനം ഒരു അധിക നേട്ടമായി മാത്രം കാണുക, പ്രധാന വിള വരുമാനത്തിന് പകരമായിട്ടല്ല.',
    kn: 'ಕಾರ್ಬನ್ ಆದಾಯ ಪಡೆಯಲು ಉಪಗ್ರಹದ ಮೂಲಕ 3-5 ವರ್ಷಗಳ ಮರದ ಬೆಳವಣಿಗೆಯನ್ನು ದೃಢೀಕರಿಸಬೇಕು. ಕಾರ್ಬನ್ ಆದಾಯವನ್ನು ಹೆಚ್ಚುವರಿ ಭದ್ರತೆಯಾಗಿ ಪರಿಗಣಿಸಿ, ಮುಖ್ಯ ಬೆಳೆಯ ಬದಲಿಗೆ ಅಲ್ಲ.',
    te: 'కార్బన్ మార్కెట్ ఆదాయానికి ఉపగ్రహం ద్వారా 3-5 సంవత్సరాల చెట్ల పెరుగుదల ధృవీకరణ అవసరం. కార్బన్ రాబడిని అదనపు రక్షణగా మాత్రమే భావించాలి, ప్రధాన పంట ఆదాయానికి ప్రత్యామ్నాయంగా కాదు.'
  }
};

export const getUiString = (key: keyof typeof UI_STRINGS, lang: Language): string => {
  return UI_STRINGS[key]?.[lang] || UI_STRINGS[key]?.en || '';
};

// Form Dropdown Options
export const LAND_USE_OPTIONS: Record<string, Record<Language, { label: string; sub?: string }>> = {
  'Active Annual Crops': {
    en: { label: 'Active Annual Crops (Paddy/Cotton/Millets)', sub: 'Active cultivated cropland' },
    ta: { label: 'வருடாந்திர பயிர்கள் (நெல்/பருத்தி/தானியங்கள்)', sub: 'தற்போது பயிரிடப்படும் நிலம்' },
    ml: { label: 'വാർഷിക വിളകൾ (നെല്ല്/പരുത്തി/ധാന്യങ്ങൾ)', sub: 'നിലവിൽ കൃഷി ചെയ്യുന്ന ഭൂമി' },
    kn: { label: 'ವಾರ್ಷಿಕ ಬೆಳೆಗಳು (ಭತ್ತ/ಹತ್ತಿ/ಸಿರಿಧಾನ್ಯಗಳು)', sub: 'ಪ್ರಸ್ತುತ ಕೃಷಿ ಜಮೀನು' },
    te: { label: 'వార్షిక పంటలు (వరి/పత్తి/చిరుధాన్యాలు)', sub: 'ప్రస్తుతం సాగులో ఉన్న భూమి' }
  },
  'Agroforestry Boundary (Bund planting)': {
    en: { label: 'Agroforestry Boundary (Bund planting)', sub: 'Boundary tree planting' },
    ta: { label: 'வேளாண் வரப்பு நடவு (எல்லை மரம்)', sub: 'வரப்புகளில் மரம் நடுதல்' },
    ml: { label: 'വരമ്പ് നടീൽ (അതിർത്തി മരങ്ങൾ)', sub: 'വരമ്പുകളിൽ മരങ്ങൾ' },
    kn: { label: 'ಬದುಗಳಲ್ಲಿ ಮರ ನೆಡುವುದು', sub: 'ಗಡಿ ಬದುಗಳ ಸಾಲು' },
    te: { label: 'గట్లపై చెట్ల పెంపకం (సరిహద్దు)', sub: 'పొలం గట్ల వెంట చెట్లు' }
  },
  'Fallow / Degraded Land': {
    en: { label: 'Fallow / Degraded Land (High Additionality)', sub: 'Uncultivated / dry land' },
    ta: { label: 'தரிசு / பாழ் நிலம் (உயர் அங்கீகாரம்)', sub: 'பயிரிடப்படாத நிலம்' },
    ml: { label: 'തരിശുഭൂമി / ജീർണ്ണിച്ച ഭൂമി', sub: 'കൃഷി ചെയ്യാത്ത ഭൂമി' },
    kn: { label: 'ಬಂಜರು / ಕೃಷಿರಹಿತ ಭೂಮಿ', sub: 'ಬೆಳೆ ಬೆಳೆಯದ ಭೂಮಿ' },
    te: { label: 'బీడు / నిరుపయోగ భూమి', sub: 'సాగు చేయని భూమి' }
  },
  'Orchard / Horticulture': {
    en: { label: 'Orchard / Horticulture', sub: 'Fruit trees / plantations' },
    ta: { label: 'தோட்டக்கலை / பழத்தோட்டம்', sub: 'பழ மரங்கள் / தோட்டங்கள்' },
    ml: { label: 'പഴത്തോട്ടം / ഹോർട്ടികൾച്ചർ', sub: 'പഴവർഗ്ഗ കൃഷി' },
    kn: { label: 'ತೋಟಗಾರಿಕೆ / ಹಣ್ಣಿನ ತೋಟ', sub: 'ಹಣ್ಣಿನ ಮರಗಳ ಬೆಳೆ' },
    te: { label: 'తోటల సాగు / పండ్ల తోటలు', sub: 'పండ్ల చెట్ల సాగు' }
  },
  'Pasture / Wasteland': {
    en: { label: 'Pasture / Wasteland', sub: 'Grazing open land' },
    ta: { label: 'மேய்ச்சல் / புறம்போக்கு நிலம்', sub: 'மேய்ச்சல் நிலம்' },
    ml: { label: 'മേച്ചിൽസ്ഥലം / തരിശ്', sub: 'പുൽമേട്' },
    kn: { label: 'ಮೇಯಿಸುವ ಜಮೀನು / ಗೋಮಾಳ', sub: 'ಹುಲ್ಲುಗಾವಲು' },
    te: { label: 'మేత భూమి / బంజరు', sub: 'పశువుల మేత స్థలం' }
  }
};

export const PLANTING_MODEL_OPTIONS: Record<string, Record<Language, string>> = {
  'Agri-Silviculture (Trees + Crops)': {
    en: 'Agri-Silviculture (Trees + Crops ~240/ac)',
    ta: 'வேளாண் காடுகள் (மரங்கள் + பயிர்கள் ~240/ஏக்கர்)',
    ml: 'അഗ്രി-സിൽവികൾച്ചർ (മരങ്ങൾ + വിളകൾ ~240/ഏക്കർ)',
    kn: 'ಕೃಷಿ-ಅರಣ್ಯೀಕರಣ (ಮರಗಳು + ಬೆಳೆಗಳು ~240/ಎಕರೆ)',
    te: 'వ్యవసాయ-అటవీకరణ (చెట్లు + పంటలు ~240/ఎకరా)'
  },
  'Boundary / Bund Planting': {
    en: 'Boundary / Bund Planting (~140/ac)',
    ta: 'வரப்பு / எல்லை நடவு (~140/ஏக்கர்)',
    ml: 'വരമ്പ് / അതിർത്തി നടീൽ (~140/ഏക്കർ)',
    kn: 'ಬದು / ಗಡಿ ಸಾಲು ನೆಡುವಿಕೆ (~140/ಎಕರೆ)',
    te: 'గట్లపై / సరిహద్దు పెంపకం (~140/ఎకరా)'
  },
  'Block Plantation': {
    en: 'Dedicated Block Plantation (~400/ac)',
    ta: 'முழு மரக்காடு (~400/ஏக்கர்)',
    ml: 'പൂർണ്ണ തോട്ടം / ബ്ലോക്ക് പ്ലാന്റേഷൻ (~400/ഏക്കർ)',
    kn: 'ಸಂಪೂರ್ಣ ಮರದ ತೋಟ (~400/ಎಕರೆ)',
    te: 'పూర్తి స్థాయి చెట్ల తోట (~400/ఎకరా)'
  }
};

export const TREE_PREFERENCE_OPTIONS: Record<string, Record<Language, { label: string; sub: string }>> = {
  'Any / Optimized': {
    en: { label: 'Auto-Optimize', sub: 'Algorithm picks best' },
    ta: { label: 'தானியங்கி தேர்வு', sub: 'அறிவியல் மாதிரி' },
    ml: { label: 'സ്വയമേവ തിരഞ്ഞെടുക്കുക', sub: 'ശാസ്ത്രീയ മാതൃക' },
    kn: { label: 'ಸ್ವಯಂ ಆಯ್ಕೆ', sub: 'ವೈಜ್ಞಾನಿಕ ವಿಶ್ಲೇಷಣೆ' },
    te: { label: 'స్వయంచాలక ఎంపిక', sub: 'శాస్త్రీయ విశ్లేషణ' }
  },
  'Timber Value': {
    en: { label: 'Timber Value', sub: 'Teak, Red Sanders' },
    ta: { label: 'மரக்கட்டை மதிப்பு', sub: 'தேக்கு, செஞ்சந்தனம்' },
    ml: { label: 'തടിയുടെ മൂല്യം', sub: 'തേക്ക്, രക്തചന്ദനം' },
    kn: { label: 'ಮರದ ಮೌಲ್ಯ', sub: 'ತೇಗ, ರಕ್ತಚಂದನ' },
    te: { label: 'కలప విలువ', sub: 'టేకు, ఎర్రచందనం' }
  },
  'Fast Biomass': {
    en: { label: 'Fast Biomass', sub: 'Melia dubia, Casuarina' },
    ta: { label: 'விரைவு வளர்ச்சி', sub: 'மலைவேம்பு, சவுக்கு' },
    ml: { label: 'വേഗത്തിൽ വളരുന്നവ', sub: 'മലവേപ്പ്, കാറ്റാടി' },
    kn: { label: 'ವೇಗದ ಬೆಳವಣಿಗೆ', sub: 'ಹೆಬ್ಬೇವು, ಸರ್ವೆ ಮರ' },
    te: { label: 'వేగవంతమైన పెరుగుదల', sub: 'మలబార్ వేప, సర్వి' }
  },
  'Fodder & Pods': {
    en: { label: 'Fodder & Pods', sub: 'Moringa, Pongamia' },
    ta: { label: 'தீவனம் & பயன்', sub: 'முருங்கை, புங்கம்' },
    ml: { label: 'തീറ്റപ്പുല്ലും കായ്കളും', sub: 'മുരിങ്ങ, ഉങ്ങ്' },
    kn: { label: 'ಮೇವು ಮತ್ತು ಕಾಯಿಗಳು', sub: 'ನುಗ್ಗೆ, ಹೊಂಗೆ' },
    te: { label: 'పశుగ్రాసం & కాయలు', sub: 'మునగ, కానుగ' },
  },
  'Native & Hardy': {
    en: { label: 'Native & Hardy', sub: 'Neem, Pongamia' },
    ta: { label: 'பாரம்பரிய மரம்', sub: 'வேம்பு, புங்கம்' },
    ml: { label: 'നാടൻ ഇനങ്ങൾ', sub: 'വേപ്പ്, ഉങ്ങ്' },
    kn: { label: 'ಸ್ಥಳೀಯ ಗಟ್ಟಿ ಮರಗಳು', sub: 'ಬೇವು, ಹೊಂಗೆ' },
    te: { label: 'స్థానిక దృఢమైన చెట్లు', sub: 'వేప, కానుగ' }
  }
};

export const CARBON_PRICE_OPTIONS: Record<string, Record<Language, { label: string; sub: string }>> = {
  'Conservative (₹850/t)': {
    en: { label: 'Conservative', sub: '₹850 / tCO₂e' },
    ta: { label: 'எச்சரிக்கை', sub: '₹850 / tCO₂e' },
    ml: { label: 'മിതമായത്', sub: '₹850 / tCO₂e' },
    kn: { label: 'ಮಿತವಾದ ಅಂದಾಜು', sub: '₹850 / tCO₂e' },
    te: { label: 'సంప్రదాయబద్ధం', sub: '₹850 / tCO₂e' }
  },
  'Baseline (₹1,500/t)': {
    en: { label: 'Baseline', sub: '₹1,500 / tCO₂e' },
    ta: { label: 'அடிப்படை', sub: '₹1,500 / tCO₂e' },
    ml: { label: 'സാധാരണ നിരക്ക്', sub: '₹1,500 / tCO₂e' },
    kn: { label: 'ಮೂಲ ಮಾನದಂಡ', sub: '₹1,500 / tCO₂e' },
    te: { label: 'ప్రామాణికం', sub: '₹1,500 / tCO₂e' }
  },
  'Optimistic (₹2,200/t)': {
    en: { label: 'Optimistic', sub: '₹2,200 / tCO₂e' },
    ta: { label: 'உயர் நிலை', sub: '₹2,200 / tCO₂e' },
    ml: { label: 'ഉയർന്ന നിരക്ക്', sub: '₹2,200 / tCO₂e' },
    kn: { label: 'ಉನ್ನತ ಅಂದಾಜು', sub: '₹2,200 / tCO₂e' },
    te: { label: 'ఆశాజనకం', sub: '₹2,200 / tCO₂e' }
  }
};

export const MONTE_CARLO_STRINGS: Record<string, Record<Language, string>> = {
  pillar4: {
    en: 'PILLAR 4',
    ta: 'தூண் 4',
    ml: 'സ്തംഭം 4',
    kn: 'ಸ್ತಂಭ 4',
    te: 'స్తంభం 4'
  },
  subHeading: {
    en: 'Advanced Financial Simulation & Stochastic Modeling',
    ta: 'மேம்பட்ட நிதி உருவகப்படுத்துதல் & நிகழ்தகவு மாதிரி',
    ml: 'വിപുലമായ ധനകാര്യ സിമുലേഷൻ & സ്റ്റോക്കാസ്റ്റിക് മോഡലിംഗ്',
    kn: 'ಸುಧಾರಿತ ಹಣಕಾಸು ಸಿಮ್ಯುಲೇಶನ್ & ಸಂಭವನೀಯ ಮಾದರಿ',
    te: 'అధునాతన ఆర్థిక అనుకరణ & స్టోకాస్టిక్ మోడలింగ్'
  },
  title: {
    en: '30-Year Monte Carlo Engine & Project Timeline Realism',
    ta: '30-ஆண்டு மான்டே கார்லோ மாதிரி & யதார்த்த கால அட்டவணை',
    ml: '30-വർഷ മോണ്ടെ കാർലോ എഞ്ചിൻ & പ്രോജക്റ്റ് ടൈംലൈൻ',
    kn: '30-ವರ್ಷಗಳ ಮಾಂಟೆ ಕಾರ್ಲೋ ಎಂಜಿನ್ & ಕಾಲಮಿತಿ ವಾಸ್ತವತೆ',
    te: '30-సంవత్సరాల మోంటే కార్లో ఇంజిన్ & ప్రాజెక్ట్ సమయరేఖ'
  },
  desc: {
    en: 'Unlike simplistic spreadsheet models, this institutional engine simulates 1,000+ stochastic trials over a 30-year horizon. It factors in realistic 2–3 year validation delays before first credit issuance, climate drought shocks, and voluntary carbon market price volatility.',
    ta: 'எளிய விரிதாள் கணிப்புகளுக்கு மாறாக, இந்த மாதிரி 1,000+ முறை சீரற்ற சுழற்சிகளை 30 ஆண்டு காலத்திற்கு உருவகப்படுத்துகிறது. முதல் சான்றிதழ் பெறுவதற்கு முந்தைய 2-3 ஆண்டு சரிபார்ப்பு தாமதங்கள், தீவிர வறட்சி பாதிப்புகள் மற்றும் கார்பன் விலை ஏற்ற இறக்கங்களை இது துல்லியமாக கணக்கிடுகிறது.',
    ml: 'ലളിതമായ സ്പ്രെഡ്ഷീറ്റ് മാതൃകകളിൽ നിന്ന് വ്യത്യസ്തമായി, ഈ എഞ്ചിൻ 30 വർഷത്തെ കാലയളവിൽ 1,000+ സ്റ്റോക്കാസ്റ്റിക് ട്രയലുകൾ അനുകരിക്കുന്നു. ആദ്യ ക്രെഡിറ്റ് ലഭിക്കുന്നതിന് മുമ്പുള്ള 2-3 വർഷത്തെ മൂല്യനിർണ്ണയ കാലതാമസം, വരൾച്ചാ ആഘാതങ്ങൾ, കാർബൺ വിപണിയിലെ വിലയിലെ വ്യതിയാനങ്ങൾ എന്നിവ ഇത് കണക്കിലെടുക്കുന്നു.',
    kn: 'ಸರಳ ಸ್ಪ್ರೆಡ್‌ಶೀಟ್ ಮಾದರಿಗಳಿಗೆ ವಿರುದ್ಧವಾಗಿ, ಈ ಎಂಜಿನ್ 30 ವರ್ಷಗಳ ಅವಧಿಯಲ್ಲಿ 1,000+ ಸಂಭವನೀಯ ಪ್ರಯೋಗಗಳನ್ನು ಅನುಕರಿಸುತ್ತದೆ. ಮೊದಲ ಕ್ರೆಡಿಟ್ ನೀಡಿಕೆಗೆ ಮುಂಚಿನ 2-3 ವರ್ಷಗಳ ಪರಿಶೀಲನಾ ವಿಳಂಬ, ತೀವ್ರ ಬರಗಾಲದ ಆಘಾತಗಳು ಮತ್ತು ಇಂಗಾಲದ ಮಾರುಕಟ್ಟೆ ಬೆಲೆಯ ಏರಿಳಿತಗಳನ್ನು ಇದು ಲೆಕ್ಕಹಾಕುತ್ತದೆ.',
    te: 'సాధారణ స్ప్రెడ్‌షీట్ నమూనాలకు భిన్నంగా, ఈ సంస్థాగత ఇంజిన్ 30 ఏళ్ల కాలపరిమితిలో 1,000+ స్టోకాస్టిక్ ట్రయల్స్‌ను అనుకరిస్తుంది. మొదటి క్రెడిట్ జారీకి ముందు వాస్తవిక 2-3 సంవత్సరాల ధృవీకరణ ఆలస్యం, కరవు ప్రభావాలు మరియు కార్బన్ మార్కెట్ ధరల హెచ్చుతగ్గులను ఇది లెక్కిస్తుంది.'
  },
  fanChartTab: {
    en: '30-Yr Fan Chart',
    ta: '30-ஆண்டு பணப்புழக்க விளக்கப்படம்',
    ml: '30-വർഷ ഫാൻ ചാർട്ട്',
    kn: '30-ವರ್ಷಗಳ ಫ್ಯಾನ್ ಚಾರ್ಟ್',
    te: '30-సంవత్సరాల ఫ್ಯಾన్ చార్ట్'
  },
  distributionTab: {
    en: 'IRR & NPV Distribution',
    ta: 'IRR & NPV நிகழ்வெண் பரவல்',
    ml: 'IRR & NPV വിതരണം',
    kn: 'IRR & NPV ಹಂಚಿಕೆ',
    te: 'IRR & NPV పంపిణీ'
  },
  pythonTab: {
    en: 'Python Backend Module',
    ta: 'பைத்தான் குறியீடு',
    ml: 'പൈത്തൺ കോഡ്',
    kn: 'ಪೈಥಾನ್ ಕೋಡ್',
    te: 'పైథాన్ కోడ్'
  },
  timelineTitle: {
    en: 'Timeline Realism: Why ARR Projects Experience a 2–3 Year Issuance Delay',
    ta: 'கால அட்டவணை யதார்த்தம்: காடு வளர்ப்பு திட்டங்களில் ஏன் முதல் சான்றிதழ் வழங்க 2-3 ஆண்டுகள் தாமதம் ஆகிறது?',
    ml: 'ടൈംലൈൻ യാഥാർത്ഥ്യം: അഗ്രോഫോറസ്ട്രി പദ്ധതികളിൽ ആദ്യ ക്രെഡിറ്റ് ലഭിക്കാൻ 2-3 വർഷം എടുക്കുന്നത് എന്തുകൊണ്ട്?',
    kn: 'ಸಮಯದ ವಾಸ್ತವತೆ: ಕೃಷಿ ಅರಣ್ಯೀಕರಣ ಯೋಜನೆಗಳಲ್ಲಿ ಮೊದಲ ಕ್ರೆಡಿಟ್ ನೀಡಿಕೆಗೆ 2-3 ವರ್ಷಗಳು ಏಕೆ ಬೇಕು?',
    te: 'సమయరేఖ వాస్తవికత: వ్యవసాయ-అటవీకరణ ప్రాజెక్టులలో మొదటి క్రెడిట్ జారీకి 2-3 సంవత్సరాల ఆలస్యం ఎందుకు అవుతుంది?'
  },
  firstVintage: {
    en: 'First Credit Vintage: Year 3',
    ta: 'முதல் கார்பன் வரவு: ஆண்டு 3',
    ml: 'ആദ്യ ക്രെഡിറ്റ് വിന്റേജ്: വർഷം 3',
    kn: 'ಮೊದಲ ಕ್ರೆಡಿಟ್ ವಿಂಟೇಜ್: ವರ್ಷ 3',
    te: 'మొదటి క్రెడిట్ వింటేజ్: సంవత్సరం 3'
  },
  yr01: {
    en: 'Year 0 - 1',
    ta: 'ஆண்டு 0 - 1',
    ml: 'വർഷം 0 - 1',
    kn: 'ವರ್ಷ 0 - 1',
    te: 'సంవత్సరం 0 - 1'
  },
  negCashFlow: {
    en: 'Negative Cash Flow',
    ta: 'எதிர்மறை பணப்புழக்கம்',
    ml: 'നെഗറ്റീവ് ക്യാഷ് ഫ്ലോ',
    kn: 'ಋಣಾತ್ಮಕ ನಗದು ಹರಿವು',
    te: 'ప్రతికూల నగదు ప్రవాహం'
  },
  origination: {
    en: 'Origination & Establishment',
    ta: 'திட்டம் தொடக்கம் & நடுதல்',
    ml: 'പദ്ധതി ആരംഭവും നടീലും',
    kn: 'ಯೋಜನೆ ಆರಂಭ ಮತ್ತು ನೆಡುವಿಕೆ',
    te: 'ప్రాజెక్ట్ ప్రారంభం & నాటడం'
  },
  originationDesc: {
    en: 'Land boundary survey, nursery procurement, sapling pitting, irrigation & initial planting. High initial CapEx.',
    ta: 'எல்லை அளவீடு, நர்சரி நாற்றுகள் கொள்முதல், குழி வெட்டுதல், பாசனம் மற்றும் நடுதல். ஆரம்ப மூலதன செலவு அதிகம்.',
    ml: 'ഭൂമി സർവേ, നഴ്സറി തൈകൾ വാങ്ങൽ, കുഴിയെടുക്കൽ, നനയ്ക്കൽ, നടീൽ. ഉയർന്ന പ്രാരംഭ ചിലവ്.',
    kn: 'ಭೂಮಿ ಸಮೀಕ್ಷೆ, ಸಸಿ ಖರೀದಿ, ಗುಂಡಿ ತೋಡುವುದು, ನೀರಾವರಿ ಮತ್ತು ನೆಡುವಿಕೆ. ಆರಂಭಿಕ ವೆಚ್ಚ ಅಧಿಕ.',
    te: 'భూమి సర్వే, నర్సరీ నారు సేకరణ, గుంతలు తవ్వడం, నీటిపారుదల & నాటడం. ప్రారంభ మూలధన వ్యయం ఎక్కువ.'
  },
  yr12: {
    en: 'Year 1 - 2',
    ta: 'ஆண்டு 1 - 2',
    ml: 'വർഷം 1 - 2',
    kn: 'ವರ್ಷ 1 - 2',
    te: 'సంవత్సరం 1 - 2'
  },
  zeroCredits: {
    en: '0 Credits Issued',
    ta: '0 சான்றிதழ் வரவு',
    ml: '0 ക്രെഡിറ്റുകൾ ലഭിച്ചു',
    kn: '0 ಕ್ರೆಡಿಟ್‌ಗಳು ನೀಡಲಾಗಿದೆ',
    te: '0 క్రెడిట్‌లు జారీ'
  },
  vcsAudit: {
    en: 'VCS Audit & Biomass Growth',
    ta: 'தணிக்கை & ஆரம்ப வளர்ச்சி',
    ml: 'ഓഡിറ്റിംഗും ബയോമാസ് വളർച്ചയും',
    kn: 'ಆಡಿಟ್ & ಜೈವಿಕ ದ್ರವ್ಯರಾಶಿ ಬೆಳವಣಿಗೆ',
    te: 'ఆడిట్ & జీవపదార్థం పెరుగుదల'
  },
  vcsAuditDesc: {
    en: 'Sapling root system establishment. Remote sensing dynamic baseline verification. Third-party VVB audit.',
    ta: 'நாற்றுகளின் வேர் வளர்ச்சி. செயற்கைக்கோள் கட்டுப்பாட்டு நில அடிப்படை சரிபார்ப்பு. மூன்றாம் தரப்பு VVB தணிக்கை.',
    ml: 'തൈകളുടെ വേരുകൾ ഉറപ്പിക്കൽ. സാറ്റലൈറ്റ് വഴി അടിസ്ഥാന പരിശോധന. സ്വതന്ത്ര VVB ഓഡിറ്റ്.',
    kn: 'ಸಸಿಗಳ ಬೇರು ವ್ಯವಸ್ಥೆ ಸ್ಥಾಪನೆ. ಉಪಗ್ರಹ ಆಧಾರಿತ ಪರಿಶೀಲನೆ. ಮೂರನೇ ವ್ಯಕ್ತಿಯ VVB ಆಡಿಟ್.',
    te: 'మొక్కల వేర్లు పాతుకుపోవడం. ఉపగ్రహ ఆధారిత ధృవీకరణ. మూడవ పక్ష VVB ఆడిట్.'
  },
  yr3: {
    en: 'Year 3',
    ta: 'ஆண்டு 3',
    ml: 'വർഷം 3',
    kn: 'ವರ್ಷ 3',
    te: 'సంవత్సరం 3'
  },
  firstVintageMonetized: {
    en: 'First Vintage Monetized!',
    ta: 'முதல் வருமானம் திரட்டல்!',
    ml: 'ആദ്യ വരുമാനം ലഭിക്കുന്നു!',
    kn: 'ಮೊದಲ ಆದಾಯ ಸಂಗ್ರಹಣೆ!',
    te: 'మొదటి ఆదాయ ఆర్జన!'
  },
  firstCreditBatch: {
    en: 'First Credit Issuance Batch',
    ta: 'முதல் கார்பன் சான்றிதழ் தொகுதி',
    ml: 'ആദ്യ കാർബൺ ക്രെഡിറ്റ് ബാച്ച്',
    kn: 'ಮೊದಲ ಕಾರ್ಬನ್ ಕ್ರೆಡಿಟ್ ಬ್ಯಾಚ್',
    te: 'మొదటి కార్బన్ క్రెడిట్ బ్యాచ్'
  },
  firstCreditBatchDesc: {
    en: 'Retroactive credit issuance covering verified biomass accumulated across Years 1, 2, and 3 minus permanence buffer.',
    ta: 'ஆண்டுகள் 1, 2 மற்றும் 3-ல் திரட்டப்பட்ட மர உயிரியல் வளர்ச்சிக்கான மொத்த சான்றிதழ்கள் ஒரே நேரத்தில் பணமாக்கப்படும்.',
    ml: '1, 2, 3 വർഷങ്ങളിൽ ശേഖരിച്ച പരിശോധിച്ച ബയോമാസിനുള്ള മൊത്തം ക്രെഡിറ്റുകൾ ലഭ്യമാക്കുന്നു.',
    kn: '1, 2 ಮತ್ತು 3 ನೇ ವರ್ಷಗಳಲ್ಲಿ ಸಂಗ್ರಹವಾದ ಪರಿಶೀಲಿಸಿದ ಮರದ ಬೆಳವಣಿಗೆಗೆ ಒಟ್ಟು ಕ್ರೆಡಿಟ್‌ಗಳು ಬಿಡುಗಡೆ.',
    te: '1, 2 మరియు 3 సంవత్సరాలలో పేరుకుపోయిన బయోమాస్‌కు సంబంధించిన మొత్తం క్రెడిట్‌లు విడుదలవుతాయి.'
  },
  yr430: {
    en: 'Year 4 - 30',
    ta: 'ஆண்டு 4 - 30',
    ml: 'വർഷം 4 - 30',
    kn: 'ವರ್ಷ 4 - 30',
    te: 'సంవత్సరం 4 - 30'
  },
  annuityRevenue: {
    en: 'Annuity Revenue',
    ta: 'தொடர் வருமானம்',
    ml: 'തുടർച്ചയായ വരുമാനം',
    kn: 'ನಿರಂತರ ಆದಾಯ',
    te: 'నిరంతర ఆదాయం'
  },
  sustainedIssuance: {
    en: 'Sustained Issuance & Timber Value',
    ta: 'நிலையான வருவாய் & மர மதிப்பு',
    ml: 'സ്ഥിരമായ വരുമാനവും തടിയുടെ മൂല്യവും',
    kn: 'ಸ್ಥಿರ ಆದಾಯ & ಮರದ ಮೌಲ್ಯ',
    te: 'స్థిరమైన ఆదాయం & కలప విలువ'
  },
  sustainedIssuanceDesc: {
    en: 'Annual MRV verification + co-benefit intercrop cashflow + Year 12/24 selective timber thinning revenues.',
    ta: 'ஆண்டுதோறும் தொடர் MRV சரிபார்ப்பு + ஊடுபயிர் வருவாய் + 12 மற்றும் 24-ஆம் ஆண்டுகளில் மரம் வெட்டுதல் வருமானம்.',
    ml: 'വാർഷിക MRV പരിശോധന + ഇടവിള വരുമാനം + 12, 24 വർഷങ്ങളിൽ മരം മുറിക്കൽ വരുമാനം.',
    kn: 'ವಾರ್ಷಿಕ MRV ಪರಿಶೀಲನೆ + ಅಂತರಬೆಳೆ ಆದಾಯ + 12 ಮತ್ತು 24 ನೇ ವರ್ಷಗಳಲ್ಲಿ ಮರ ಕಟಾವು ಆದಾಯ.',
    te: 'వార్షిక MRV ధృవీకరణ + అంతరపంటల ఆదాయం + 12 మరియు 24 సంవత్సరాలలో కలప కోత ఆదాయం.'
  },
  medianIrr: {
    en: 'Median Project IRR',
    ta: 'திட்ட சராசரி IRR',
    ml: 'ശരാശരി പ്രോജക്റ്റ് IRR',
    kn: 'ಸರಾಸರಿ ಪ್ರಾಜೆಕ್ಟ್ IRR',
    te: 'సగటు ప్రాజెక్ట్ IRR'
  },
  irrSub: {
    en: 'Internal Rate of Return (1,000 trials)',
    ta: 'உள் வருவாய் விகிதம் (1,000 சுழற்சிகள்)',
    ml: 'ആന്തരിക റിട്ടേൺ നിരക്ക് (1,000 ട്രയലുകൾ)',
    kn: 'ಆಂತರಿಕ ಆದಾಯ ದರ (1,000 ಪ್ರಯೋಗಗಳು)',
    te: 'అంతర్గత రాబడి రేటు (1,000 ట్రయల్స్)'
  },
  medianNpv: {
    en: 'Median 30-Yr Net Present Value',
    ta: '30-ஆண்டு நிகர தற்போதைய மதிப்பு',
    ml: '30-വർഷ നെറ്റ് പ്രസന്റ് വാല്യൂ',
    kn: '30-ವರ್ಷಗಳ ನಿವ್ವಳ ಪ್ರಸ್ತುತ ಮೌಲ್ಯ',
    te: '30-సంవత్సరాల నికర ప్రస్తుత విలువ'
  },
  medianPayback: {
    en: 'Median Payback Period',
    ta: 'முதலீடு திரும்பப் பெறும் காலம்',
    ml: 'തിരിച്ചടവ് കാലയളവ്',
    kn: 'ಮರುಪಾವತಿ ಅವಧಿ',
    te: 'తిరిగి చెల్లింపు వ్యవధి'
  },
  postYr3: {
    en: 'Post-Year 3',
    ta: 'ஆண்டு 3-க்கு பின்',
    ml: 'വർഷം 3-ന് ശേഷം',
    kn: 'ವರ್ಷ 3 ರ ನಂತರ',
    te: 'సంవత్సరం 3 తర్వాత'
  },
  accountsValidationLag: {
    en: 'Accounts for 2-3 yr validation lag',
    ta: '2-3 ஆண்டு சரிபார்ப்பு காலத்தைக் கணக்கிடுகிறது',
    ml: '2-3 വർഷത്തെ പരിശോധനാ കാലതാമസം കണക്കാക്കുന്നു',
    kn: '2-3 ವರ್ಷಗಳ ಪರಿಶೀಲನಾ ವಿಳಂಬವನ್ನು ಲೆಕ್ಕಹಾಕುತ್ತದೆ',
    te: '2-3 సంవత్సరాల ధృవీకరణ ఆలస్యాన్ని లెక్కిస్తుంది'
  },
  valueAtRisk: {
    en: '95% Value-at-Risk (VaR)',
    ta: '95% இடர் மதிப்பு (VaR)',
    ml: '95% മൂല്യ-അപകടസാധ്യത (VaR)',
    kn: '95% ನಷ್ಟದ ಅಪಾಯ ಮೌಲ್ಯ (VaR)',
    te: '95% నష్ట ప్రమాద విలువ (VaR)'
  },
  downsideStress: {
    en: '5th percentile downside stress-test',
    ta: '5% கீழ்மட்ட நெருக்கடி நிலை சோதனை',
    ml: '5% താഴ്ന്ന നിലയിലുള്ള സമ്മർദ്ദ പരിശോധന',
    kn: '5% ಇಳಿಕೆಯ ಒತ್ತಡ ಪರೀಕ್ಷೆ',
    te: '5% దిగువ స్థాయి ఒత్తిడి పరీక్ష'
  },
  stochasticParams: {
    en: 'Stochastic Model Parameters',
    ta: 'நிகழ்தகவு மாதிரி அளவுருக்கள்',
    ml: 'സ്റ്റോക്കാസ്റ്റിക് മോഡൽ പാരാമീറ്ററുകൾ',
    kn: 'ಸಂಭವನೀಯ ಮಾದರಿಯ ನಿಯತಾಂಕಗಳು',
    te: 'స్టోకాస్టిక్ మోడల్ పారామితులు'
  },
  droughtProb: {
    en: 'Annual Drought Probability',
    ta: 'ஆண்டு வறட்சி நிகழ்தகவு',
    ml: 'വാർഷിക വരൾച്ചാ സാധ്യത',
    kn: 'ವಾರ್ಷಿಕ ಬರಗಾಲದ ಸಂಭವನೀಯತೆ',
    te: 'వార్షిక కరవు సంభావ్యత'
  },
  droughtDesc: {
    en: 'Models monsoon failure shocks causing 20–35% sapling mortality in early years.',
    ta: 'பருவமழை பொய்க்கும் போது முதல் 1-3 ஆண்டுகளில் 20-35% கன்றுகள் இழக்கப்படுவதைக் கணக்கிடுகிறது.',
    ml: 'മൺസൂൺ കുറയുന്നത് മൂലം ആദ്യ വർഷങ്ങളിൽ 20-35% തൈകൾ നഷ്ടപ്പെടുന്നത് കണക്കാക്കുന്നു.',
    kn: 'ಮುಂಗಾರು ವೈಫಲ್ಯದಿಂದ ಆರಂಭಿಕ ವರ್ಷಗಳಲ್ಲಿ 20-35% ಸಸಿಗಳ ನಷ್ಟವನ್ನು ಲೆಕ್ಕಹಾಕುತ್ತದೆ.',
    te: 'వర్షాభావం వల్ల ప్రారంభ సంవత్సరాల్లో 20-35% మొక్కల నష్టాన్ని లెక్కిస్తుంది.'
  },
  priceVol: {
    en: 'Carbon Price Volatility (σ)',
    ta: 'கார்பன் விலை ஏற்ற இறக்கம் (σ)',
    ml: 'കാർബൺ വിലയിലെ വ്യതിയാനം (σ)',
    kn: 'ಇಂಗಾಲದ ಬೆಲೆ ಏರಿಳಿತ (σ)',
    te: 'కార్బన్ ధరల హెచ్చుతగ్గులు (σ)'
  },
  priceVolDesc: {
    en: 'Geometric Brownian Motion annual price dispersion in voluntary carbon markets.',
    ta: 'தன்னார்வ கார்பன் சந்தையில் ஏற்படும் ஆண்டு விலை மாற்றங்களை உருவகப்படுத்துகிறது.',
    ml: 'കാർബൺ വിപണിയിലെ വാർഷിക വില വ്യതിയാനങ്ങൾ സിമുലേറ്റ് ചെയ്യുന്നു.',
    kn: 'ಇಂಗಾಲದ ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ ವಾರ್ಷಿಕ ಬೆಲೆ ಬದಲಾವಣೆಗಳನ್ನು ಅನುಕರಿಸುತ್ತದೆ.',
    te: 'స్వచ్ఛంద కార్బన్ మార్కెట్లలో వార్షిక ధరల హెచ్చుతగ్గులను అనుకరిస్తుంది.'
  },
  priceDrift: {
    en: 'Real Price Drift (μ)',
    ta: 'உண்மையான விலை வளர்ச்சி (μ)',
    ml: 'യഥാർത്ഥ വില വർദ്ധനവ് (μ)',
    kn: 'ನಿಜವಾದ ಬೆಲೆ ಏರಿಕೆ (μ)',
    te: 'నిజమైన ధర పెరుగుదల (μ)'
  },
  priceDriftDesc: {
    en: 'Projected long-term annual real price appreciation as corporate net-zero targets tighten.',
    ta: 'நிறுவனங்களின் நிகர பூஜ்ஜிய இலக்குகளால் கார்பன் தேவையும் விலையும் ஆண்டுதோறும் உயரும் மதிப்பீடு.',
    ml: 'നെറ്റ്-സീറോ ലക്ഷ്യങ്ങൾ കർശനമാകുമ്പോൾ കാർബൺ വിലയിൽ ഉണ്ടാകുന്ന ദീർഘകാല വർദ്ധനവ്.',
    kn: 'ನೆಟ್-ಜೀರೋ ಗುರಿಗಳು ಹೆಚ್ಚಾದಂತೆ ಇಂಗಾಲದ ಬೆಲೆಯಲ್ಲಿ ದೀರ್ಘಕಾಲೀನ ಏರಿಕೆ ಅಂದಾಜು.',
    te: 'నెట్-జీరో లక్ష్యాల కారణంగా కార్బన్ ధరలో దీర్ఘకాలిక వార్షిక పెరుగుదల అంచనా.'
  },
  discountRate: {
    en: 'Discount Rate (WACC)',
    ta: 'தள்ளுபடி விகிதம் (WACC)',
    ml: 'ഡിസ്കൗണ്ട് നിരക്ക് (WACC)',
    kn: 'ರಿಯಾಯಿತಿ ದರ (WACC)',
    te: 'డిస్కೌంట్ రేటు (WACC)'
  },
  discountRateDesc: {
    en: 'Hurdle rate for agricultural forestry project discounting.',
    ta: 'வேளாண் வனவியல் திட்டங்களுக்கான மூலதன முதலீட்டு தள்ளுபடி விகிதம்.',
    ml: 'കാർഷിക വനവൽക്കരണ പദ്ധതികൾക്കുള്ള സാമ്പത്തിക കിഴിവ് നിരക്ക്.',
    kn: 'ಕೃಷಿ ಅರಣ್ಯೀಕರಣ ಯೋಜನೆಗಳ ರಿಯಾಯಿತಿ ದರ.',
    te: 'వ్యవసాయ అటవీకరణ ప్రాజెక్టులకు డిస్కౌంట్ రేటు.'
  },
  simIterations: {
    en: 'Simulation Iterations:',
    ta: 'உருவகப்படுத்துதல் சுழற்சிகள்:',
    ml: 'സിമുലേഷൻ ആവർത്തനങ്ങൾ:',
    kn: 'ಸಿಮ್ಯುಲೇಶನ್ ಪುನರಾವರ್ತನೆಗಳು:',
    te: 'అనుకరణ పునరావృత్తులు:'
  },
  runsUnit: {
    en: 'Runs',
    ta: 'முறை',
    ml: 'തവണ',
    kn: 'ಬಾರಿ',
    te: 'సార్లు'
  },
  fanChartTitle: {
    en: '30-Year Cumulative Cash Flow Confidence Fan Chart',
    ta: '30-ஆண்டு திரட்டப்பட்ட நிகர பணப்புழக்க விளக்கப்படம்',
    ml: '30-വർഷ ക്യുമുലേറ്റീവ് ക്യാഷ് ഫ്ലോ ഫാൻ ചാർട്ട്',
    kn: '30-ವರ್ಷಗಳ ಒಟ್ಟು ನಗದು ಹರಿವಿನ ಫ್ಯಾನ್ ಚಾರ್ಟ್',
    te: '30-సంవత్సరాల సంచిత నగదు ప్రవాహ ఫ్యాన్ చార్ట్'
  },
  fanChartSub: {
    en: 'P10 (Stress Drought), P50 (Expected), P90 (Upside Market) Cumulative Net Return',
    ta: 'P10 (வறட்சி நெருக்கடி நிலை), P50 (எதிர்பார்க்கப்படும் நிலை), P90 (உயர் வளர்ச்சி நிலை)',
    ml: 'P10 (വരൾച്ച സമ്മർദ്ദം), P50 (പ്രതീക്ഷിക്കുന്നത്), P90 (ഉയർന്ന വിപണി) ആകെ റിട്ടേൺ',
    kn: 'P10 (ಬರಗಾಲದ ಒತ್ತಡ), P50 (ನಿರೀಕ್ಷಿತ), P90 (ಉನ್ನತ ಮಾರುಕಟ್ಟೆ) ಒಟ್ಟು ಆದಾಯ',
    te: 'P10 (కరవు ఒత్తిడి), P50 (ఆశించినది), P90 (అధిక లాభం) సంచిత రాబడి'
  },
  p50Expected: {
    en: 'P50 Expected',
    ta: 'P50 இடைநிலை',
    ml: 'P50 പ്രതീക്ഷിക്കുന്നത്',
    kn: 'P50 ನಿರೀಕ್ಷಿತ',
    te: 'P50 ఆశించినది'
  },
  p10p90Range: {
    en: 'P10–P90 Range',
    ta: 'P10–P90 வரம்பு',
    ml: 'P10–P90 പരിധി',
    kn: 'P10–P90 ವ್ಯಾಪ್ತಿ',
    te: 'P10–P90 పరిధి'
  },
  firstIssuanceYr3: {
    en: '★ First Credit Issuance (Yr 3)',
    ta: '★ முதல் கார்பன் வரவு (ஆண்டு 3)',
    ml: '★ ആദ്യ ക്രെഡിറ്റ് നൽകൽ (വർഷം 3)',
    kn: '★ ಮೊದಲ ಕ್ರೆಡಿಟ್ ನೀಡಿಕೆ (ವರ್ಷ 3)',
    te: '★ మొదటి క్రెడిట్ జారీ (సంవత్సరం 3)'
  },
  selectYearInspect: {
    en: 'Select Year to Inspect:',
    ta: 'ஆண்டைத் தேர்ந்தெடுக்கவும்:',
    ml: 'പരിശോധിക്കാൻ വർഷം തിരഞ്ഞെടുക്കുക:',
    kn: 'ಪರಿಶೀಲಿಸಲು ವರ್ಷವನ್ನು ಆಯ್ಕೆಮಾಡಿ:',
    te: 'పరిశీలించడానికి సంవత్సరాన్ని ఎంచుకోండి:'
  },
  p10Stress: {
    en: 'P10 Stress: ',
    ta: 'P10 நெருக்கடி: ',
    ml: 'P10 സമ്മർദ്ദം: ',
    kn: 'P10 ಒತ್ತಡ: ',
    te: 'P10 ఒత్తిడి: '
  },
  p50Median: {
    en: 'P50 Expected: ',
    ta: 'P50 இடைநிலை: ',
    ml: 'P50 പ്രതീക്ഷിക്കുന്നത്: ',
    kn: 'P50 ನಿರೀಕ್ಷಿತ: ',
    te: 'P50 ఆశించినది: '
  },
  p90Upside: {
    en: 'P90 Upside: ',
    ta: 'P90 மேல்மட்டம்: ',
    ml: 'P90 ഉയർന്നത്: ',
    kn: 'P90 ಗರಿಷ್ಠ: ',
    te: 'P90 గరిష్ట: '
  },
  copiedScript: {
    en: 'Copied Script!',
    ta: 'நகலெடுக்கப்பட்டது!',
    ml: 'കോപ്പി ചെയ്തു!',
    kn: 'ನಕಲಿಸಲಾಗಿದೆ!',
    te: 'కాపీ చేయబడింది!'
  },
  copyPythonScript: {
    en: 'Copy Python Script',
    ta: 'பைத்தான் குறியீட்டை நகலெடு',
    ml: 'പൈത്തൺ കോഡ് കോപ്പി ചെയ്യുക',
    kn: 'ಪೈಥಾನ್ ಕೋಡ್ ನಕಲಿಸಿ',
    te: 'పైథాన్ కోడ్‌ను కాపీ చేయండి'
  }
};

export const getMcString = (key: string, lang: Language): string => {
  return MONTE_CARLO_STRINGS[key]?.[lang] || MONTE_CARLO_STRINGS[key]?.['en'] || key;
};

// Document Processing Hub Translations
export const DOCUMENT_HUB_STRINGS: Record<string, Record<Language, string>> = {
  pillar3: {
    en: 'PILLAR 3',
    ta: 'தூண் 3',
    ml: 'സ്തംഭം 3',
    kn: 'ಸ್ತಂಭ 3',
    te: 'స్తంభం 3'
  },
  agenticDocTitle: {
    en: 'Automated Survey Ingestion & Open-Source LLM Extraction',
    ta: 'தானியங்கி சர்வே ஆவணங்கள் & மண் பரிசோதனை அட்டை பகுப்பாய்வு',
    ml: 'ഓട്ടോമേറ്റഡ് സർവേ രേഖകളും മണ്ണ് പരിശോധന കാർഡ് വിശകലനവും',
    kn: 'ಸ್ವಯಂಚಾಲಿತ ಸರ್ವೆ ದಾಖಲೆಗಳು ಮತ್ತು ಮಣ್ಣು ಪರೀಕ್ಷಾ ಕಾರ್ಡ್ ವಿಶ್ಲೇಷಣೆ',
    te: 'ఆటోమేటెడ్ సర్వే పత్రాలు & నేల పరీక్ష కార్డు విశ్లేషణ'
  },
  agenticDocSubtitle: {
    en: 'Agentic Document Processing Pipeline',
    ta: 'தானியங்கி ஆவண செயலாக்க அமைப்பு',
    ml: 'ഏജന്റിക് ഡോക്യുമെന്റ് പ്രോസസ്സിംഗ് പൈപ്പ്‌ലൈൻ',
    kn: 'ಏಜೆಂಟಿಕ್ ಡಾಕ್ಯುಮೆಂಟ್ ಸಂಸ್ಕರಣಾ ಪೈಪ್‌ಲೈನ್',
    te: 'ఏజెంటిక్ డాక్యుమెంట్ ప్రాసెసింగ్ పైప్‌లైన్'
  },
  agenticDocDesc: {
    en: 'Eliminate manual data entry. Upload land deeds (Patta/Chitta), ICAR soil health diagnostic cards, and environmental surveys as PDFs. An autonomous local agent parses acreage, soil chemistry (pH, SOC %), and cadastral survey numbers directly into the carbon calculation engine.',
    ta: 'கைமுறை தரவு உள்ளீட்டைத் தவிர்க்கவும். பட்டா/சிட்டா நில ஆவணங்கள், ICAR மண் பரிசோதனை அறிக்கைகளை பதிவேற்றலாம். செயற்கை நுண்ணறிவு மாதிரி நிலப் பரப்பளவு, மண் pH, கரிம கார்பன் (SOC) மற்றும் சர்வே எண்களை நேரடியாக கார்பன் கணிப்பானில் இணைக்கிறது.',
    ml: 'സ്വമേധയാ ഉള്ള ഡാറ്റാ എൻട്രി ഒഴിവാക്കുക. പട്ടയം/ചിട്ട ഭൂമി രേഖകൾ, ICAR മണ്ണ് പരിശോധനാ റിപ്പോർട്ടുകൾ അപ്‌ലോഡ് ചെയ്യുക. വിസ്തീർണ്ണം, മണ്ണിന്റെ pH, ഓർഗാനിക് കാർബൺ (SOC), സർവേ നമ്പറുകൾ എന്നിവ നേരിട്ട് കാർബൺ കാൽക്കുലേറ്ററിലേക്ക് ബന്ധിപ്പിക്കുന്നു.',
    kn: 'ಹಸ್ತಚಾಲಿತ ಡೇಟಾ ನಮೂದನ್ನು ತಪ್ಪಿಸಿ. ಪಟ್ಟಾ/ಚಿಟ್ಟಾ ಭೂ ದಾಖಲೆಗಳು, ICAR ಮಣ್ಣು ಪರೀಕ್ಷಾ ವರದಿಗಳನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ. ವಿಸ್ತೀರ್ಣ, ಮಣ್ಣಿನ pH, ಸಾವಯವ ಇಂಗಾಲ (SOC) ಮತ್ತು ಸರ್ವೆ ಸಂಖ್ಯೆಗಳನ್ನು ನೇರವಾಗಿ ಕಾರ್ಬನ್ ಕ್ಯಾಲ್ಕುಲೇಟರ್‌ಗೆ ಸೇರಿಸಲಾಗುತ್ತದೆ.',
    te: 'మాన్యువల్ డేటా ఎంట్రీని నివారించండి. పట్టా/చిట్టా భూమి పత్రాలు, ICAR నేల పరీక్ష నివేదికలను అప్‌లోడ్ చేయండి. వైశాల్యం, నేల pH, సేంద్రీయ కార్బన్ (SOC) మరియు సర్వే నంబర్లను నేరుగా కార్బన్ కాలిక్యులేటర్‌లోకి అనుసంధానిస్తుంది.'
  },
  uploadPdfTitle: {
    en: 'Upload PDF Survey or Soil Report',
    ta: 'PDF சர்வே அல்லது மண் பரிசோதனை அறிக்கையைப் பதிவேற்றவும்',
    ml: 'PDF സർവേ അല്ലെങ്കിൽ മണ്ണ് പരിശോധനാ റിപ്പോർട്ട് അപ്‌ലോഡ് ചെയ്യുക',
    kn: 'PDF ಸರ್ವೆ ಅಥವಾ ಮಣ್ಣು ಪರೀಕ್ಷಾ ವರದಿಯನ್ನು ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
    te: 'PDF సర్వే లేదా నేల పరీక్ష నివేదికను అప్‌లోడ్ చేయండి'
  },
  dropDeedText: {
    en: 'Drop Cadastral Deed or Soil Card Here',
    ta: 'பட்டா ஆவணம் அல்லது மண் பரிசோதனை அட்டையை இங்கு இழுத்து விடவும்',
    ml: 'ആധാര രേഖയോ മണ്ണ് പരിശോധനാ കാർഡോ ഇവിടെ ഇടുക',
    kn: 'ಪಟ್ಟಾ ದಾಖಲೆ ಅಥವಾ ಮಣ್ಣು ಪರೀಕ್ಷಾ ಕಾರ್ಡ್ ಇಲ್ಲಿ ಹಾಕಿ',
    te: 'పట్టా పత్రం లేదా నేల పరీక్ష కార్డును ఇక్కడ వేయండి'
  },
  orBrowseFiles: {
    en: 'or click to browse local files',
    ta: 'அல்லது கோப்பைத் தேர்ந்தெடுக்க கிளிக் செய்யவும்',
    ml: 'അല്ലെങ്കിൽ ഫയലുകൾ തിരഞ്ഞെടുക്കാൻ ക്ലിക്ക് ചെയ്യുക',
    kn: 'ಅಥವಾ ಫೈಲ್‌ಗಳನ್ನು ಆಯ್ಕೆ ಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ',
    te: 'లేదా ఫైళ్లను ఎంచుకోవడానికి క్లిక్ చేయండి'
  },
  preloadedDossiers: {
    en: 'Pre-Loaded Institutional Dossiers',
    ta: 'முன் ஏற்றப்பட்ட மாதிரி ஆவணங்கள்',
    ml: 'മുൻകൂട്ടി ലോഡ് ചെയ്ത മാതൃകാ രേഖകൾ',
    kn: 'ಮೊದಲೇ ಲೋಡ್ ಮಾಡಲಾದ ಮಾದರಿ ದಾಖಲೆಗಳು',
    te: 'ముందే లోడ్ చేసిన నమూనా పత్రాలు'
  },
  oneClickIngestion: {
    en: '1-Click Ingestion',
    ta: 'ஒரே கிளிக்கில் பகுப்பாய்வு',
    ml: 'ഒറ്റ ക്ലിക്കിൽ വിശകലനം',
    kn: 'ಒಂದು ಕ್ಲಿಕ್ ವಿಶ್ಲೇಷಣೆ',
    te: 'ఒకే క్లిక్‌తో విశ్లేషణ'
  },
  localAiPipeline: {
    en: 'Local Open-Source Agent Pipeline',
    ta: 'பாதுகாப்பான உள்ளூர் AI செயலாக்கம்',
    ml: 'സുരക്ഷിത പ്രാദേശിക AI പ്രോസസ്സിംഗ്',
    kn: 'ಸುರಕ್ಷಿತ ಸ್ಥಳೀಯ AI ಸಂಸ್ಕರಣೆ',
    te: 'సురక్షిత స్థానిక AI ప్రాసెసింగ్'
  },
  localAiDesc: {
    en: 'Designed for deployment with local LLMs (e.g., Llama-3-Vision, Mistral, or server-side Gemini) within containerized cloud run instances to protect sensitive land title privacy.',
    ta: 'விவசாயிகளின் நில உரிமை மற்றும் சொத்து விவரங்களின் தனியுரிமையைப் பாதுகாக்க, அனைத்து ஆவணங்களும் கிளவுட் ரன் சூழலுக்குள்ளேயே உள்ளூர் விஷன் மாதிரிகள் மூலம் செயலாக்கப்படுகின்றன.',
    ml: 'കർഷകരുടെ ഭൂവുടമസ്ഥത വിവരങ്ങളുടെ സ്വകാര്യത സംരക്ഷിക്കുന്നതിനായി, എല്ലാ രേഖകളും സുരക്ഷിത പ്രാദേശിക മാതൃകകൾ വഴി പ്രോസസ്സ് ചെയ്യുന്നു.',
    kn: 'ರೈತರ ಭೂಮಾಲೀಕತ್ವದ ಗೌಪ್ಯತೆಯನ್ನು ರಕ್ಷಿಸಲು, ಎಲ್ಲಾ ದಾಖಲೆಗಳನ್ನು ಸುರಕ್ಷಿತ ಸ್ಥಳೀಯ ಮಾದರಿಗಳ ಮೂಲಕ ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲಾಗುತ್ತದೆ.',
    te: 'రైతుల భూమి యాజమాన్య వివరాల గోప్యతను కాపాడటానికి, అన్ని పత్రాలను సురక్షిత స్థానిక మోడళ్ల ద్వారా ప్రాసెస్ చేస్తారు.'
  },
  pipelineTelemetry: {
    en: 'Autonomous Ingestion Pipeline Telemetry',
    ta: 'தானியங்கி ஆவண செயலாக்க படிநிலைகள்',
    ml: 'ഓട്ടോണമസ് പ്രോസസ്സിംഗ് ടെലിമെട്രി',
    kn: 'ಸ್ವಯಂಚಾಲಿತ ಸಂಸ್ಕರಣಾ ಟೆಲಿಮೆಟ್ರಿ',
    te: 'ఆటోనమస్ ప్రాసెసింగ్ టెలిమెట్రీ'
  },
  pipelineComplete: {
    en: 'Pipeline Execution Complete',
    ta: 'செயலாக்கம் நிறைவுற்றது',
    ml: 'പ്രക്രിയ പൂർത്തിയായി',
    kn: 'ಪ್ರಕ್ರಿಯೆ ಪೂರ್ಣಗೊಂಡಿದೆ',
    te: 'ప్రక్రియ పూర్తయింది'
  },
  processingDoc: {
    en: 'Processing Document...',
    ta: 'ஆவணம் செயலாக்கப்படுகிறது...',
    ml: 'രേഖ പ്രോസസ്സ് ചെയ്യുന്നു...',
    kn: 'ದಾಖಲೆ ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿದೆ...',
    te: 'పత్రం ప్రాసెస్ చేయబడుతోంది...'
  },
  extractedParameters: {
    en: 'Extracted Cadastral & Soil Parameters',
    ta: 'சரிபார்க்கப்பட்ட நில & மண் விவரங்கள்',
    ml: 'പരിശോധിച്ച ഭൂമി & മണ്ണ് വിവരങ്ങൾ',
    kn: 'ಪರಿಶೀಲಿಸಿದ ಭೂಮಿ ಮತ್ತು ಮಣ್ಣಿನ ವಿವರಗಳು',
    te: 'ధృవీకరించిన భూమి & నేల వివరాలు'
  },
  modelConfidence: {
    en: 'Model Confidence',
    ta: 'மாதிரி நம்பகத்தன்மை',
    ml: 'മോഡൽ വിശ്വാസ്യത',
    kn: 'ಮಾದರಿ ವಿಶ್ವಾಸಾರ್ಹತೆ',
    te: 'మోడల్ విశ్వసనీయత'
  },
  sourceDoc: {
    en: 'Source:',
    ta: 'ஆவண ஆதாரம்:',
    ml: 'രേഖാ ഉറവിടം:',
    kn: 'ದಾಖಲೆ ಮೂಲ:',
    te: 'పత్ర మూలం:'
  },
  injectIntoCalc: {
    en: 'Inject Into Calculator',
    ta: 'கணிப்பானில் சேர்க்க',
    ml: 'കാൽക്കുലേറ്ററിലേക്ക് ചേർക്കുക',
    kn: 'ಕ್ಯಾಲ್ಕುಲೇಟರ್‌ಗೆ ಸೇರಿಸಿ',
    te: 'కాలిక్యులేటర్‌కు జోడించండి'
  },
  cadastralSurveyNo: {
    en: 'Cadastral Survey #',
    ta: 'சர்வே / உட்பிரிவு எண்',
    ml: 'സർവേ നമ്പർ',
    kn: 'ಸರ್ವೆ ಸಂಖ್ಯೆ',
    te: 'సర్వే సంఖ్య'
  },
  verifiedTalukRegistry: {
    en: '✓ Verified in Taluk Registry',
    ta: '✓ தாலுகா பதிவேட்டில் சரிபார்க்கப்பட்டது',
    ml: '✓ താലൂക്ക് രജിസ്ട്രിയിൽ പരിശോധിച്ചു',
    kn: '✓ ತಾಲೂಕು ರಿಜಿಸ್ಟ್ರಿಯಲ್ಲಿ ಪರಿಶೀಲಿಸಲಾಗಿದೆ',
    te: '✓ తాలూకా రిజిస్ట్రీలో ధృవీకరించబడింది'
  },
  totalParcelExtent: {
    en: 'Total Parcel Extent',
    ta: 'சட்டப்பூர்வ நிலப்பரப்பு',
    ml: 'ആകെ ഭൂവിസ്തൃതി',
    kn: 'ಒಟ್ಟು ಜಮೀನಿನ ವಿಸ್ತೀರ್ಣ',
    te: 'మొత్తం భూ విస్తీర్ణం'
  },
  exactBoundaryComputed: {
    en: '✓ Exact boundary computed',
    ta: '✓ துல்லிய எல்லை கணக்கிடப்பட்டது',
    ml: '✓ കൃത്യമായ അതിർത്തി കണക്കാക്കി',
    kn: '✓ ನಿಖರ ಗಡಿ ಲೆಕ್ಕಹಾಕಲಾಗಿದೆ',
    te: '✓ ఖచ్చితమైన సరిహద్దు లెక్కించబడింది'
  },
  soilClassification: {
    en: 'Soil Classification',
    ta: 'மண் வகைப்பாடு',
    ml: 'മണ്ണ് വർഗ്ഗീകരണം',
    kn: 'ಮಣ್ಣಿನ ವರ್ಗೀಕರಣ',
    te: 'నేల వర్గీకరణ'
  },
  districtLabel: {
    en: 'District:',
    ta: 'மாவட்டம்:',
    ml: 'ജില്ല:',
    kn: 'ಜಿಲ್ಲೆ:',
    te: 'జిల్లా:'
  },
  soilPh: {
    en: 'Soil Reaction (pH)',
    ta: 'மண் அமில/கார நிலை (pH)',
    ml: 'മണ്ണിന്റെ pH നില',
    kn: 'ಮಣ್ಣಿನ pH ಮಟ್ಟ',
    te: 'నేల pH స్థాయి'
  },
  optimalForHardwoods: {
    en: 'Optimal for hardwoods',
    ta: 'உயர் மர வளர்ச்சிக்கு உகந்தது',
    ml: 'തടിമരങ്ങൾക്ക് അനുയോജ്യമായത്',
    kn: 'ಗಟ್ಟಿಮರಗಳಿಗೆ ಸೂಕ್ತವಾಗಿದೆ',
    te: 'కలప చెట్లకు అనువైనది'
  },
  soilOrganicCarbon: {
    en: 'Soil Organic Carbon (SOC)',
    ta: 'மண் கரிம கார்பன் (SOC)',
    ml: 'ഓർഗാനിക് കാർബൺ (SOC)',
    kn: 'ಸಾವಯವ ಇಂಗಾಲ (SOC)',
    te: 'నేల సేంద్రీయ కార్బన్ (SOC)'
  },
  mediumBaseline: {
    en: 'Medium baseline',
    ta: 'நடுத்தர அடிப்படை அளவு',
    ml: 'ഇടത്തരം അടിസ്ഥാനം',
    kn: 'ಮಧ್ಯಮ ಮಟ್ಟದ ಮೂಲಸ್ಥಿತಿ',
    te: 'మధ్యస్థ ప్రాథమిక స్థాయి'
  },
  waterAvailability: {
    en: 'Water Availability',
    ta: 'பாசன நீர் ஆதாரம்',
    ml: 'ജല ലഭ്യത',
    kn: 'ನೀರಿನ ಲಭ್ಯತೆ',
    te: 'నీటి లభ్యత'
  },
  lowSeedlingMortality: {
    en: 'Low seedling mortality',
    ta: 'குறைந்த கன்று இழப்பு அபாயம்',
    ml: 'കുറഞ്ഞ തൈ നാശനഷ്ട സാധ്യത',
    kn: 'ಕಡಿಮೆ ಸಸಿ ಸಾವಿನ ಅಪಾಯ',
    te: 'తక్కువ మొక్కల మరణాల ప్రమాదం'
  },
  nonForestContinuity: {
    en: 'Non-Forest Continuity',
    ta: 'காடில்லா தொடர்ச்சி',
    ml: 'വനേതര തുടർച്ച',
    kn: 'ಅರಣ್ಯೇತರ ಮುಂದುವರಿಕೆ',
    te: 'అటవీయేతర నిరంతరత'
  },
  verra10YrEligible: {
    en: '✓ Verra >10-yr eligible',
    ta: '✓ வெர்ரா >10-ஆண்டு தகுதி பெற்றது',
    ml: '✓ വെറ >10-വർഷ യോഗ്യത നേടി',
    kn: '✓ ವೆರ್ರಾ >10-ವರ್ಷ ಅರ್ಹತೆ ಹೊಂದಿದೆ',
    te: '✓ వెర్రా >10-ఏళ్ల అర్హత పొందింది'
  },
  availableNutrients: {
    en: 'Available Macronutrients (NPK)',
    ta: 'கிடைக்கக்கூடிய தாதுக்கள் (NPK)',
    ml: 'ലഭ്യമായ പോഷകങ്ങൾ (NPK)',
    kn: 'ಲಭ್ಯವಿರುವ ಪೋಷಕಾಂಶಗಳು (NPK)',
    te: 'లభ్యమయ్యే పోషకాలు (NPK)'
  },
  potassiumReserveNote: {
    en: 'High potassium reserve supports stem elongation',
    ta: 'பொட்டாசியம் இருப்பு மரத்தின் தடிமனை விரைவுபடுத்துகிறது',
    ml: 'പൊട്ടാസ്യം സാന്നിധ്യം തടിയുടെ വളർച്ചയെ ത്വരിതപ്പെടുത്തുന്നു',
    kn: 'ಪೊಟ್ಯಾಸಿಯಮ್ ಪ್ರಮಾಣ ಮರದ ಬೆಳವಣಿಗೆಯನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ',
    te: 'పొటాషియం నిల్వ చెట్టు కాండం పెరుగుదలకు తోడ్పడుతుంది'
  },
  inspectRawTranscript: {
    en: 'Inspect Extracted Raw Document OCR Transcript',
    ta: 'பிரித்தெடுக்கப்பட்ட மூல ஆவண உரையைப் பார்க்க',
    ml: 'ഒസിആർ വഴി വേർതിരിച്ച രേഖാ വിവരങ്ങൾ കാണുക',
    kn: 'ಓಸಿಆರ್ ಮೂಲಕ ಪಡೆದ ಮೂಲ ದಾಖಲೆ ಪಠ್ಯವನ್ನು ವೀಕ್ಷಿಸಿ',
    te: 'OCR ద్వారా సంగ్రహించిన అసలు పత్రం పాఠాన్ని చూడండి'
  },
  uploadedLocalDoc: {
    en: 'Uploaded Local Document',
    ta: 'பதிவேற்றப்பட்ட உள்ளூர் ஆவணம்',
    ml: 'അപ്‌ലോഡ് ചെയ്ത പ്രാദേശിക രേഖ',
    kn: 'ಅಪ್‌ಲೋಡ್ ಮಾಡಿದ ಸ್ಥಳೀಯ ದಾಖಲೆ',
    te: 'అప్‌లోడ్ చేసిన స్థానిక పత్రం'
  },
  uploadedPdfParsed: {
    en: 'Uploaded binary PDF document parsed via agentic OCR pipeline.',
    ta: 'செயற்கை நுண்ணறிவு மூலம் பகுப்பாய்வு செய்யப்பட்ட ஆவண உரை.',
    ml: 'എഐ ഏജന്റ് വഴി വിശകലനം ചെയ്ത രേഖാ പാഠം.',
    kn: 'ಎಐ ಏಜೆಂಟ್ ಮೂಲಕ ವಿಶ್ಲೇಷಿಸಲಾದ ದಾಖಲೆ ಪಠ್ಯ.',
    te: 'ఏఐ ఏజెంట్ ద్వారా విశ్లేషించబడిన పత్ర పాఠం.'
  },
  applyExtractedMetrics: {
    en: 'Apply Extracted Metrics to Engine',
    ta: 'பிரித்தெடுக்கப்பட்ட விவரங்களை கணிப்பானில் சேர்',
    ml: 'വിവരങ്ങൾ കാൽക്കുലേറ്ററിലേക്ക് ചേർക്കുക',
    kn: 'ಪಡೆದ ವಿವರಗಳನ್ನು ಕ್ಯಾಲ್ಕುಲೇಟರ್‌ಗೆ ಸೇರಿಸಿ',
    te: 'సంగ్రహించిన వివరాలను కాలిక్యులేటర్‌కు జోడించండి'
  },
  acresUnit: {
    en: 'Acres',
    ta: 'ஏக்கர்',
    ml: 'ഏക്കർ',
    kn: 'ಎಕರೆ',
    te: 'ఎకరాలు'
  },
  sinceYear: {
    en: 'Since',
    ta: 'முதல்',
    ml: 'മുതൽ',
    kn: 'ರಿಂದ',
    te: 'నుండి'
  }
};

export const getDocString = (key: string, lang: Language): string => {
  return DOCUMENT_HUB_STRINGS[key]?.[lang] || DOCUMENT_HUB_STRINGS[key]?.['en'] || key;
};

// Verra VM0047 Modeling Strings
export const VERRA_STRINGS: Record<string, Record<Language, string>> = {
  pillar2: {
    en: 'PILLAR 2',
    ta: 'தூண் 2',
    ml: 'സ്തംഭം 2',
    kn: 'ಸ್ತಂಭ 2',
    te: 'స్తంభం 2'
  },
  accountingTitle: {
    en: 'Verra VM0047 Methodology ARR Deduction Modeler',
    ta: 'வெர்ரா VM0047 ARR கார்பன் கணக்கியல் மற்றும் கழிவு மாதிரி',
    ml: 'വെറ VM0047 രീതിശാസ്ത്ര ARR കിഴിവ് മാതൃക',
    kn: 'ವೆರ್ರಾ VM0047 ವಿಧಾನ ARR ಕಡಿತ ಮಾದರಿ',
    te: 'వెర్రా VM0047 పద్ధతి ARR తగ్గింపు మోడల్'
  },
  accountingSubtitle: {
    en: 'Institutional-Grade Carbon Accounting',
    ta: 'நிறுவன கார்பன் கணக்கியல் மாதிரி',
    ml: 'സ്ഥാപനതല കാർബൺ അക്കൗണ്ടിംഗ്',
    kn: 'ಸಾಂಸ್ಥಿಕ ದರ್ಜೆಯ ಇಂಗಾಲ ಲೆಕ್ಕಪತ್ರ',
    te: 'సంస్థాగత స్థాయి కార్బన్ అకౌంటింగ్'
  },
  accountingDesc: {
    en: 'Real-world carbon projects under Verra VM0047 (Afforestation, Reforestation & Revegetation) do not credit gross tree biomass. Deductions must be made for dynamic control plots, permanence buffer risk pools, activity-shifting leakage, and MRV uncertainty.',
    ta: 'வெர்ரா VM0047 திட்டங்களில் மொத்த மர உயிரியல் வளர்ச்சி நேரடியாக வரவு வைக்கப்படுவதில்லை. நிலப்பரப்புக் கட்டுப்பாட்டு கழிவு, நீடித்த நிலைப்புத்தன்மை சேமிப்பு நிதி, செயல்பாட்டு இடப்பெயர்வு கசிவு மற்றும் MRV மாதிரி நிச்சயமற்ற கழிவுகள் முறையாகக் கழிக்கப்பட வேண்டும்.',
    ml: 'വെറ VM0047 പദ്ധതികളിൽ മൊത്തം ജൈവവളർച്ച നേരിട്ട് ക്രെഡിറ്റ് ചെയ്യപ്പെടില്ല. കൺട്രോൾ പ്ലോട്ട് കിഴിവ്, സ്ഥിരതാ ബഫർ റിസർവ്, പ്രവർത്തന ചോർച്ച, എംആർവി അനിശ്ചിതത്വ കിഴിവുകൾ എന്നിവ കൃത്യമായി കുറയ്ക്കണം.',
    kn: 'ವೆರ್ರಾ VM0047 ಯೋಜನೆಗಳಲ್ಲಿ ಒಟ್ಟು ಬಯೋಮಾಸ್ ಅನ್ನು ನೇರವಾಗಿ ಕ್ರೆಡಿಟ್ ಮಾಡಲಾಗುವುದಿಲ್ಲ. ನಿಯಂತ್ರಣ ಪ್ಲಾಟ್ ಕಡಿತ, ಸ್ಥಿರತೆ ಬಫರ್ ಮೀಸಲು, ಚಟುವಟಿಕೆ ಸೋರಿಕೆ ಮತ್ತು MRV ಅನಿಶ್ಚಿತತೆ ಕಡಿತಗಳನ್ನು ಕಳೆಯಬೇಕು.',
    te: 'వెర్రా VM0047 ప్రాజెక్టులలో మొత్తం బయోమాస్‌ను నేరుగా క్రెడిట్ చేయరు. నియంత్రణ ప్లాట్ తగ్గింపు, స్థిరత్వ బఫర్ రిజర్వ్, కార్యాచరణ లీకేజ్ మరియు MRV అనిశ్చితి తగ్గింపులను తప్పనిసరిగా మినహాయించాలి.'
  },
  appliedVm0047: {
    en: 'Applied VM0047 Parameters!',
    ta: 'VM0047 அளவுருக்கள் சேர்க்கப்பட்டன!',
    ml: 'VM0047 ഘടകങ്ങൾ പ്രയോഗിച്ചു!',
    kn: 'VM0047 ನಿಯತಾಂಕಗಳನ್ನು ಅನ್ವಯಿಸಲಾಗಿದೆ!',
    te: 'VM0047 పారామితులు వర్తింపజేయబడ్డాయి!'
  },
  applyBiomeToCalc: {
    en: 'Apply Biome to Calculator',
    ta: 'சுற்றுச்சூழல் மாதிரியை கணிப்பானில் சேர்',
    ml: 'ബയോം കാൽക്കുലേറ്ററിലേക്ക് ചേർക്കുക',
    kn: 'ಬಯೋಮ್ ಅನ್ನು ಕ್ಯಾಲ್ಕುಲೇಟರ್‌ಗೆ ಸೇರಿಸಿ',
    te: 'బయోమ్‌ను కాలిక్యులేటర్‌కు జోడించండి'
  },
  targetAgroBiome: {
    en: '1. Select Target Agroforestry Biome',
    ta: '1. இலக்கு வேளாண் சுற்றுச்சூழல் மாதிரியைத் தேர்வு செய்க',
    ml: '1. കാർഷിക വനവൽക്കരണ ബയോം തിരഞ്ഞെടുക്കുക',
    kn: '1. ಗುರಿ ಕೃಷಿ ಅರಣ್ಯ ಬಯೋಮ್ ಆಯ್ಕೆಮಾಡಿ',
    te: '1. లక్ష్య వ్యవసాయ అటవీ బయోమ్‌ను ఎంచుకోండి'
  },
  activeParcel: {
    en: 'Active Parcel:',
    ta: 'செயலில் உள்ள நிலம்:',
    ml: 'സജീവ ഭൂമി:',
    kn: 'ಸಕ್ರಿಯ ಜಮೀನು:',
    te: 'యాక్టివ్ భూమి:'
  },
  sequestrationLabel: {
    en: 'Sequestration:',
    ta: 'கார்பன் உறிஞ்சுதல்:',
    ml: 'കാർബൺ ശേഖരണം:',
    kn: 'ಇಂಗಾಲ ಹೀರಿಕೊಳ್ಳುವಿಕೆ:',
    te: 'కార్బన్ శోషణ:'
  },
  vcmPriceLabel: {
    en: 'VCM Credit Price:',
    ta: 'கார்பன் வரவு விலை:',
    ml: 'വിപണി ക്രെഡിറ്റ് വില:',
    kn: 'ಕ್ರೆಡಿಟ್ ಬೆಲೆ:',
    te: 'క్రెడిట్ ధర:'
  },
  keyAllometricEq: {
    en: 'Key Allometric Equation:',
    ta: 'முக்கிய அலோமெட்ரிக் சமன்பாடு:',
    ml: 'പ്രധാന സമവാക്യം:',
    kn: 'ಪ್ರಮುಖ ಸಮೀಕರಣ:',
    te: 'ప్రధాన సమీకరణం:'
  },
  representativeSpecies: {
    en: 'Representative Species',
    ta: 'முக்கிய மர இனங்கள்',
    ml: 'പ്രധാന മരയിനങ്ങൾ',
    kn: 'ಪ್ರಮುಖ ಮರ ಜಾತಿಗಳು',
    te: 'ప్రధాన చెట్ల రకాలు'
  },
  vm0047Deductions: {
    en: 'Verra VM0047 Deduction Parameters',
    ta: 'வெர்ரா VM0047 கழிவு அளவுருக்கள்',
    ml: 'വെറ VM0047 കിഴിവ് ഘടകങ്ങൾ',
    kn: 'ವೆರ್ರಾ VM0047 ಕಡಿತ ನಿಯತಾಂಕಗಳು',
    te: 'వెర్రా VM0047 తగ్గింపు పారామితులు'
  },
  permanencePool: {
    en: 'Permanence Risk Buffer Pool',
    ta: 'நீடித்த நிலைப்புத்தன்மை சேமிப்பு நிதி',
    ml: 'സ്ഥിരതാ റിസ്ക് ബഫർ പൂൾ',
    kn: 'ಸ್ಥಿರತೆ ಅಪಾಯ ಬಫರ್ ಪೂಲ್',
    te: 'స్థిరత్వ ప్రమాద బఫర్ పూల్'
  },
  permanenceTooltip: {
    en: 'Mandatory non-permanence buffer pool deposits (10-25%) withheld in Verra pooled account against fire, drought, pestilence, and anthropogenic risks.',
    ta: 'தீ, வறட்சி, பூச்சித் தாக்குதல் மற்றும் மனித இடர்பாடுகளுக்காக வெர்ரா சேமிப்புக் கணக்கில் 10-25% வரவுகள் கட்டாயமாக நிறுத்தி வைக்கப்படுகின்றன.',
    ml: 'തീ, വരൾച്ച, കീടബാധ തുടങ്ങിയ അപകടസാധ്യതകൾക്കായി വെറ അക്കൗണ്ടിൽ നിർബന്ധിതമായി മാറ്റിവെക്കുന്ന 10-25% ബഫർ.',
    kn: 'ಬೆಂಕಿ, ಬರ, ಕೀಟಬಾಧೆ ಮುಂತಾದ ಅಪಾಯಗಳಿಗಾಗಿ ವೆರ್ರಾ ಖಾತೆಯಲ್ಲಿ ಕಡ್ಡಾಯವಾಗಿ ಇರಿಸಲಾಗುವ 10-25% ಬಫರ್.',
    te: 'అగ్ని, కరువు, తెగుళ్లు వంటి ప్రమాదాల కోసం వెర్రా పూల్డ్ ఖాతాలో తప్పనిసరిగా ఉంచే 10-25% బఫర్ నిల్వ.'
  },
  activityLeakage: {
    en: 'Activity Shifting Leakage',
    ta: 'செயல்பாட்டு இடப்பெயர்வு கசிவு',
    ml: 'പ്രവർത്തന ചോർച്ച',
    kn: 'ಚಟುವಟಿಕೆ ಸೋರಿಕೆ',
    te: 'కార్యాచరణ లీకేజ్'
  },
  activityLeakageTooltip: {
    en: 'Deduction for agricultural activities or livestock displaced to surrounding unmonitored land, which increases emissions outside project boundaries.',
    ta: 'விவசாய அல்லது மேய்ச்சல் செயல்பாடுகள் திட்ட எல்லைக்கு வெளியே நகர்வதால் ஏற்படும் மறைமுக உமிழ்வுகளுக்கான கழிவு.',
    ml: 'പദ്ധതി അതിർത്തിക്ക് പുറത്തേക്ക് കൃഷിയോ കന്നുകാലി വളർത്തലോ മാറുമ്പോഴുണ്ടാകുന്ന അധിക ഉദ്‌വമനത്തിനുള്ള കിഴിവ്.',
    kn: 'ಯೋಜನೆಯ ಗಡಿಯಿಂದ ಹೊರಗೆ ಕೃಷಿ ಅಥವಾ ಮೇಯಿಸುವಿಕೆ ಸ್ಥಳಾಂತರಗೊಳ್ಳುವುದರಿಂದ ಉಂಟಾಗುವ ಹೆಚ್ಚುವರಿ ಹೊರಸೂಸುವಿಕೆಗೆ ಕಡಿತ.',
    te: 'ప్రాజెక్ట్ సరిహద్దు వెలుపలికి వ్యవసాయం లేదా పశువుల మేత తరలింపు వల్ల పెరిగే ఉద్గారాల తగ్గింపు.'
  },
  mrvDiscount: {
    en: 'MRV & Remote Sensing Discount',
    ta: 'MRV மாதிரி நிச்சயமற்ற கழிவு',
    ml: 'എംആർവി അനിശ്ചിതത്വ കിഴിവ്',
    kn: 'MRV ಅನಿಶ್ಚಿತತೆ ಕಡಿತ',
    te: 'MRV అనిశ్చితి తగ్గింపు'
  },
  mrvDiscountTooltip: {
    en: 'Conservative lower-bound deduction applied when relying on satellite allometrics, LiDAR, or sample field plots under VM0047 precision thresholds.',
    ta: 'செயற்கைக்கோள் படங்கள் அல்லது மாதிரி ஆய்வு முறைகளில் ஏற்படும் புள்ளியியல் பிழைகளைத் தவிர்க்கும் பாதுகாப்பு கழிவு.',
    ml: 'ഉപഗ്രഹ ചിത്രങ്ങളും സാമ്പിൾ പ്ലോട്ടുകളും ഉപയോഗിക്കുമ്പോഴുള്ള സ്റ്റാറ്റിസ്റ്റിക്കൽ പിശകുകൾ ഒഴിവാക്കാനുള്ള മുൻകരുതൽ കിഴിവ്.',
    kn: 'ಉಪಗ್ರಹ ಚಿತ್ರಗಳು ಮತ್ತು ಮಾದರಿ ಪ್ಲಾಟ್‌ಗಳನ್ನು ಬಳಸುವಾಗ ಸಂಭವಿಸಬಹುದಾದ ಸಂಖ್ಯಾಶಾಸ್ತ್ರೀಯ ದೋಷಗಳನ್ನು ತಪ್ಪಿಸಲು ಸುರಕ್ಷತಾ ಕಡಿತ.',
    te: 'ఉపగ్రహ చిత్రాలు లేదా నమూనా ప్లాట్ల ఆధారంగా లెక్కించేటప్పుడు సంభవించే గణాంక లోపాల నివారణ తగ్గింపు.'
  },
  accountingPeriod: {
    en: 'Accounting Period:',
    ta: 'கணக்கியல் காலம்:',
    ml: 'അക്കൗണ്ടിംഗ് കാലയളവ്:',
    kn: 'ಲೆಕ್ಕಪತ್ರ ಅವಧಿ:',
    te: 'అకౌంటింగ్ వ్యవధి:'
  },
  yearsUnit: {
    en: 'Years',
    ta: 'ஆண்டுகள்',
    ml: 'വർഷങ്ങൾ',
    kn: 'ವರ್ಷಗಳು',
    te: 'సంవత్సరాలు'
  },
  grossSeqRate: {
    en: 'Gross Sequestration Rate:',
    ta: 'மொத்த சேகரிப்பு விகிதம்:',
    ml: 'മൊത്തം ശേഖരണ നിരക്ക്:',
    kn: 'ಒಟ್ಟು ಹೀರಿಕೊಳ್ಳುವ ದರ:',
    te: 'మొత్తం శోషణ రేటు:'
  },
  totalDeductionsBuffers: {
    en: 'Total Deductions & Buffers:',
    ta: 'மொத்த கழிவுகள் & சேமிப்புகள்:',
    ml: 'ആകെ കിഴിവുകളും ബഫറും:',
    kn: 'ಒಟ್ಟು ಕಡಿತಗಳು ಮತ್ತು ಬಫರ್:',
    te: 'మొత్తం తగ్గింపులు & బఫర్:'
  },
  netCreditableRate: {
    en: 'Net Creditable Rate:',
    ta: 'நிகர சான்றளிக்கக்கூடிய விகிதம்:',
    ml: 'അറ്റ ക്രെഡിറ്റബിൾ നിരക്ക്:',
    kn: 'ನಿವ್ವಳ ಮಾನ್ಯತೆ ದರ:',
    te: 'నికర క్రెడిటబుల్ రేటు:'
  },
  verraAuditChecks: {
    en: 'Verra VM0047 Methodology Audit Checks',
    ta: 'வெர்ரா VM0047 தணிக்கை சரிபார்ப்புகள்',
    ml: 'വെറ VM0047 ഓഡിറ്റ് പരിശോധനകൾ',
    kn: 'ವೆರ್ರಾ VM0047 ಆಡಿಟ್ ಪರಿಶೀಲನೆಗಳು',
    te: 'వెర్రా VM0047 ఆడిట్ తనిఖీలు'
  },
  passLabel: {
    en: 'PASS',
    ta: 'வெற்றி',
    ml: 'വിജയം',
    kn: 'ಪಾಸು',
    te: 'విజయం'
  },
  netTradeableVcu: {
    en: 'Net Tradeable VCUs',
    ta: 'வர்த்தக VCU வரவுகள்',
    ml: 'വ്യാപാരം ചെയ്യാവുന്ന VCUs',
    kn: 'ವ್ಯಾಪಾರ ಮಾಡಬಹುದಾದ VCUs',
    te: 'వ్యాపారం చేయగల VCUs'
  },
  netCommercialValuation: {
    en: 'Net Commercial Valuation',
    ta: 'நிகர வணிக மதிப்பு',
    ml: 'അറ്റ വാണിജ്യ മൂല്യം',
    kn: 'ನಿವ್ವಳ ವಾಣಿಜ್ಯ ಮೌಲ್ಯ',
    te: 'నికర వాణిజ్య విలువ'
  },
  carbonPrice: {
    en: 'Carbon Price:',
    ta: 'கார்பன் விலை:',
    ml: 'കാർബൺ വില:',
    kn: 'ಇಂಗಾಲದ ಬೆಲೆ:',
    te: 'కార్బన్ ధర:'
  },
  grossRemovalsVal: {
    en: 'Gross Removals Value',
    ta: 'மொத்த நீக்க மதிப்பு',
    ml: 'മൊത്തം നീക്കം ചെയ്ത മൂല്യം',
    kn: 'ಒಟ್ಟು ತೆಗೆದುಹಾಕುವಿಕೆ ಮೌಲ್ಯ',
    te: 'మొత్తం తొలగింపు విలువ'
  },
  reserveBufferWithheld: {
    en: 'Reserve & Buffer Withheld',
    ta: 'ஒதுக்கப்பட்ட சேமிப்பு',
    ml: 'മാറ്റിവെച്ച റിസർവ് & ബഫർ',
    kn: 'ಕಾಯ್ದಿರಿಸಿದ ಬಫರ್',
    te: 'రిజర్వ్ & బఫర్ నిల్వ'
  },
  netTradeableVal: {
    en: 'Net Tradeable Value',
    ta: 'நிகர வர்த்தக மதிப்பு',
    ml: 'അറ്റ വ്യാപാര മൂല്യം',
    kn: 'ನಿವ್ವಳ ವ್ಯಾಪಾರ ಮೌಲ್ಯ',
    te: 'నికర వర్తక విలువ'
  },
  waterfallStep1: {
    en: '1. Gross Biomass Accumulation',
    ta: '1. மொத்த மர உயிரியல் வளர்ச்சி',
    ml: '1. മൊത്തം ബയോമാസ് ശേഖരണം',
    kn: '1. ಒಟ್ಟು ಬಯೋಮಾಸ್ ಶೇಖರಣೆ',
    te: '1. మొత్తం బయోమాస్ చేరడం'
  },
  waterfallStep2: {
    en: '2. Baseline Non-Project Growth (Control Plot)',
    ta: '2. அடிப்படைக் கட்டுப்பாட்டு வளர்ச்சி (திட்டமில்லா வளர்ச்சி)',
    ml: '2. അടിസ്ഥാന വനേതര വളർച്ച (നിയന്ത്രണ പ്ലോട്ട്)',
    kn: '2. ಮೂಲ ನಿಯಂತ್ರಣ ಪ್ಲಾಟ್ ಬೆಳವಣಿಗೆ',
    te: '2. ప్రాథమిక నియంత్రణ ప్లాట్ పెరుగుదల'
  },
  waterfallStep2Sub: {
    en: 'Sentinel-2 dynamic control plot deduction',
    ta: 'சென்டினல்-2 கட்டுப்பாட்டு நிலக் கழிவு',
    ml: 'സെന്റിനൽ-2 കൺട്രോൾ പ്ലോട്ട് കിഴിവ്',
    kn: 'ಸೆಂಟಿನೆಲ್-2 ನಿಯಂತ್ರಣ ಪ್ಲಾಟ್ ಕಡಿತ',
    te: 'సెంటినెల్-2 కంట్రోల్ ప్లాట్ తగ్గింపు'
  },
  waterfallStep3: {
    en: '3. Gross Removals Before Reserve',
    ta: '3. மொத்த வாயு நீக்கம் (சேமிப்புக்கு முன்)',
    ml: '3. റിസർവിന് മുമ്പുള്ള മൊത്തം നീക്കം',
    kn: '3. ಮೀಸಲಿಗೆ ಮುಂಚಿನ ಒಟ್ಟು ತೆಗೆದುಹಾಕುವಿಕೆ',
    te: '3. రిజర్వ్‌కు ముందు మొత్తం తొలగింపు'
  },
  waterfallStep3Sub: {
    en: 'Net additions from planting intervention',
    ta: 'மரம் நடுவதால் ஏற்பட்ட நிகர சேர்ப்பு',
    ml: 'വൃക്ഷത്തൈ നടീൽ വഴിയുള്ള അറ്റ വർദ്ധനവ്',
    kn: 'ಮರ ನೆಡುವಿಕೆಯಿಂದ ಉಂಟಾದ ನಿವ್ವಳ ಸೇರ್ಪಡೆ',
    te: 'మొక్కలు నాటడం ద్వారా నికర చేరిక'
  },
  waterfallStep4: {
    en: '4. Permanence Buffer Reserve',
    ta: '4. நீடித்த நிலைப்புத்தன்மை சேமிப்பு',
    ml: '4. സ്ഥിരതാ ബഫർ റിസർവ്',
    kn: '4. ಸ್ಥಿರತೆ ಬಫರ್ ಮೀಸಲು',
    te: '4. స్థిరత్వ బఫర్ రిజర్వ్'
  },
  waterfallStep4Sub: {
    en: 'Withheld in Verra pooled buffer for reversal risk',
    ta: 'தீ, புயல் அபாயங்களுக்காக வெர்ரா மையக் கணக்கில் ஒதுக்கப்பட்டது',
    ml: 'റിവേഴ്സൽ റിസ്കിനായി വെറ പൂൾഡ് അക്കൗണ്ടിൽ മാറ്റിവെച്ചത്',
    kn: 'ಅಪಾಯಗಳಿಗಾಗಿ ವೆರ್ರಾ ಖಾತೆಯಲ್ಲಿ ಇರಿಸಲಾದ ಮೀಸಲು',
    te: 'ప్రమాదాల నివారణకు వెర్రా ఖాతాలో ఉంచిన రిజర్వ్'
  },
  waterfallStep5: {
    en: '5. Activity Leakage Deduction',
    ta: '5. செயல்பாட்டு இடப்பெயர்வு கசிவு',
    ml: '5. പ്രവർത്തന ചോർച്ച കിഴിവ്',
    kn: '5. ಚಟುವಟಿಕೆ ಸೋರಿಕೆ ಕಡಿತ',
    te: '5. కార్యాచరణ లీకేజ్ తగ్గింపు'
  },
  waterfallStep5Sub: {
    en: 'Displacement of grazing or agricultural land',
    ta: 'முந்தைய விவசாயம் அல்லது மேய்ச்சல் இடப்பெயர்ச்சிக்கான கழிவு',
    ml: 'കൃഷിയോ മേച്ചിലോ മാറുമ്പോഴുണ്ടാകുന്ന കിഴിവ്',
    kn: 'ಕೃಷಿ ಅಥವಾ ಮೇಯಿಸುವಿಕೆ ಸ್ಥಳಾಂತರ ಕಡಿತ',
    te: 'వ్యవసాయం లేదా పశువుల మేత స్థానభ్రంశం తగ్గింపు'
  },
  waterfallStep6: {
    en: '6. MRV Uncertainty Discount',
    ta: '6. MRV மாதிரி நிச்சயமற்ற கழிவு',
    ml: '6. എംആർവി അനിശ്ചിതത്വ കിഴിവ്',
    kn: '6. MRV ಅನಿಶ್ಚಿತತೆ ಕಡಿತ',
    te: '6. MRV అనిశ్చితి తగ్గింపు'
  },
  waterfallStep6Sub: {
    en: 'Conservative lower-bound satellite audit discount',
    ta: 'செயற்கைக்கோள் மற்றும் கள மாதிரி நம்பகத்தன்மை கழிவு',
    ml: 'ഉപഗ്രഹ ഓഡിറ്റ് സംബന്ധമായ മുൻകരുതൽ കിഴിവ്',
    kn: 'ಉಪಗ್ರಹ ಲೆಕ್ಕಪರಿಶೋಧನೆ ಸುರಕ್ಷತಾ ಕಡಿತ',
    te: 'ఉపగ్రహ ఆడిట్ సంప్రదాయక తగ్గింపు'
  },
  waterfallStep7: {
    en: '7. Net Creditable Yield (Tradeable VCUs)',
    ta: '7. சான்றளிக்கப்பட்ட நிகர VCU வரவுகள் (வர்த்தகம் செய்யக்கூடியவை)',
    ml: '7. വിപണനയോഗ്യമായ അറ്റ ക്രെഡിറ്റുകൾ (VCUs)',
    kn: '7. ನಿವ್ವಳ ಮಾರಾಟ ಮಾಡಬಹುದಾದ ಇಂಗಾಲದ ಘಟಕಗಳು (VCUs)',
    te: '7. నికర వ్యాపార కార్బన్ యూనిట్లు (VCUs)'
  },
  waterfallStep7Sub: {
    en: 'VCS-certified Verified Carbon Units',
    ta: 'வெர்ரா VCS சான்றளிக்கப்பட்ட கார்பன் அலகுகள்',
    ml: 'വെറ വിസിഎസ് സാക്ഷ്യപ്പെടുത്തിയ കാർബൺ യൂണിറ്റുകൾ',
    kn: 'ವೆರ್ರಾ VCS ಪ್ರಮಾಣೀಕೃತ ಇಂಗಾಲದ ಘಟಕಗಳು',
    te: 'వెర్రా VCS ధృవీకరించిన కార్బన్ యూనిట్లు'
  },
  acres: {
    en: 'Acres',
    ta: 'ஏக்கர்',
    ml: 'ഏക്കർ',
    kn: 'ಎಕರೆ',
    te: 'ఎకరాలు'
  },
  waterfallTitle: {
    en: 'Verra VM0047 ARR Deduction Waterfall',
    ta: 'வெர்ரா VM0047 ARR கழிவு நீர்வீழ்ச்சி அட்டவணை',
    ml: 'വെറ VM0047 ARR കിഴിവ് വാട്ടർഫാൾ ചാർട്ട്',
    kn: 'ವೆರ್ರಾ VM0047 ARR ಕಡಿತ ಜಲಪಾತ ಚಾರ್ಟ್',
    te: 'వెర్రా VM0047 ARR తగ్గింపు వాటర్‌ఫాల్ చార్ట్'
  },
  waterfallDesc: {
    en: 'Step-by-step accounting from gross biological growth to certified tradeable VCUs',
    ta: 'மொத்த மர உயிரியல் வளர்ச்சியிலிருந்து சான்றளிக்கப்பட்ட வர்த்தக VCU வரையிலான கணக்கீடு',
    ml: 'മൊത്തം വളർച്ചയിൽ നിന്ന് സാക്ഷ്യപ്പെടുത്തിയ VCUs വരെയുള്ള ഘട്ടങ്ങൾ',
    kn: 'ಒಟ್ಟು ಮರದ ಬೆಳವಣಿಗೆಯಿಂದ ಪ್ರಮಾಣೀಕೃತ VCUs ವರೆಗಿನ ಹಂತಗಳು',
    te: 'మొత్తం బయోమాస్ నుండి ధృవీకరించిన VCUs వరకు దశలవారీ గణన'
  },
  timelineNote: {
    en: 'Note: Verra VM0047 ARR projects require 2-3 years of baseline monitoring and remote sensing calibration before initial credit issuance.',
    ta: 'குறிப்பு: வெர்ரா VM0047 திட்டங்களில் ஆரம்ப கார்பன் வரவு பெற 2-3 ஆண்டுகள் அடிப்படை கண்காணிப்பு மற்றும் செயற்கைக்கோள் ஆய்வு தேவைப்படுகிறது.',
    ml: 'കുറിപ്പ്: ആദ്യ ക്രെഡിറ്റ് വിതരണത്തിന് മുമ്പ് 2-3 വർഷത്തെ ബേസ്‌ലൈൻ നിരീക്ഷണവും ഉപഗ്രഹ കാലിബ്രേഷനും വെറ VM0047 ആവശ്യപ്പെടുന്നു.',
    kn: 'ಸೂಚನೆ: ಆರಂಭಿಕ ಕ್ರೆಡಿಟ್ ನೀಡಿಕೆಗೆ ಮೊದಲು 2-3 ವರ್ಷಗಳ ಬೇಸ್‌ಲೈನ್ ಮೇಲ್ವಿಚಾರಣೆ ಮತ್ತು ಉಪಗ್ರಹ ಪರಿಶೀಲನೆ ಅಗತ್ಯವಿದೆ.',
    te: 'గమనిక: ప్రారంభ క్రెడిట్ జారీకి ముందు 2-3 సంవత్సరాల బేస్‌లైన్ పర్యవేక్షణ మరియు ఉపగ్రహ ఆడిట్ అవసరం.'
  },
  autoSyncedBadge: {
    en: 'Auto-Synced to Calculator',
    ta: 'கணக்கீட்டுடன் தானாக ஒத்திசைக்கப்பட்டது',
    ml: 'കാൽക്കുലേറ്ററിലേക്ക് സ്വയം സമന്വയിപ്പിച്ചു',
    kn: 'ಕ್ಯಾಲ್ಕುಲೇಟರ್‌ಗೆ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಸಿಂಕ್ ಮಾಡಲಾಗಿದೆ',
    te: 'క్యాలిక్యులేటర్‌కు స్వయంచాలకంగా సమకాలీకరించబడింది'
  },
  permanenceBufferSlider: {
    en: 'Permanence Buffer Reserve (Verra Pool)',
    ta: 'நீடித்த நிலைப்புத்தன்மை சேமிப்பு ஒதுக்கீடு (வெர்ரா நிதி)',
    ml: 'സ്ഥിരതാ റിസ്ക് ബഫർ നീക്കിവെയ്ക്കൽ',
    kn: 'ಸ್ಥಿರತೆ ಅಪಾಯ ಬಫರ್ ಕಾಯ್ದಿರಿಸುವಿಕೆ',
    te: 'స్థిరత్వ ప్రమాద బఫర్ కేటాయింపు'
  },
  activityLeakageSlider: {
    en: 'Activity Shifting Leakage Deduction',
    ta: 'செயல்பாட்டு இடப்பெயர்வு கசிவு கழிவு',
    ml: 'പ്രവർത്തന ചോർച്ച കിഴിവ്',
    kn: 'ಚಟುವಟಿಕೆ ಸ್ಥಳಾಂತರ ಸೋರಿಕೆ ಕಡಿತ',
    te: 'కార్యాచరణ బదిలీ లీకేజ్ తగ్గింపు'
  },
  mrvUncertaintySlider: {
    en: 'MRV Uncertainty Discount',
    ta: 'MRV மாதிரி நிச்சயமற்ற கழிவு',
    ml: 'എംആർവി അനിശ്ചിതത്വ കിഴിവ്',
    kn: 'MRV ಅನಿಶ್ಚಿತತೆ ಕಡಿತ',
    te: 'MRV అనిశ్చితి తగ్గింపు'
  }
};

const VERRA_KEY_ALIASES: Record<string, string> = {
  verraBannerTitle: 'accountingTitle',
  institutionalAccounting: 'accountingSubtitle',
  verraBannerDesc: 'accountingDesc',
  appliedParams: 'appliedVm0047',
  selectTargetBiome: 'targetAgroBiome',
  creditPriceLabel: 'vcmPriceLabel',
  deductionParameters: 'vm0047Deductions',
  permanenceBufferPool: 'permanenceBufferSlider',
  permanenceBufferDesc: 'permanenceTooltip',
  activityLeakageDeduction: 'activityLeakageSlider',
  activityLeakageDesc: 'activityLeakageTooltip',
  mrvUncertaintyDiscount: 'mrvUncertaintySlider',
  mrvUncertaintyDesc: 'mrvDiscountTooltip',
  totalDeductions: 'totalDeductionsBuffers',
  auditChecks: 'verraAuditChecks',
  passedStatus: 'passLabel',
  netTradeableVcus: 'netTradeableVcu',
  carbonPriceLabel: 'carbonPrice',
  grossRemovalsValue: 'grossRemovalsVal',
  netTradeableValue: 'netTradeableVal',
  grossBiomassGrowth: 'waterfallStep1',
  baselineControlGrowth: 'waterfallStep2',
  baselineControlSubtext: 'waterfallStep2Sub',
  grossRemovalsBeforeReserve: 'waterfallStep3',
  grossRemovalsSubtext: 'waterfallStep3Sub',
  permanenceBufferSubtext: 'waterfallStep4Sub',
  activityLeakageSubtext: 'waterfallStep5Sub',
  mrvUncertaintySubtext: 'waterfallStep6Sub',
  netCreditableYield: 'waterfallStep7',
  netCreditableSubtext: 'waterfallStep7Sub'
};

export const getVerraString = (key: string, lang: Language): string => {
  const resolvedKey = VERRA_KEY_ALIASES[key] || key;
  return VERRA_STRINGS[resolvedKey]?.[lang] || VERRA_STRINGS[resolvedKey]?.['en'] || VERRA_STRINGS[key]?.[lang] || VERRA_STRINGS[key]?.['en'] || key;
};

// Target Biomes localized display names and descriptions
export const BIOME_TRANSLATIONS: Record<string, Record<Language, { name: string; desc: string }>> = {
  'Tropical Rainforest / Moist': {
    en: { name: 'Tropical Rainforest / Moist Broadleaf', desc: 'High rainfall evergreen canopy with maximum biomass density.' },
    ta: { name: 'வெப்பமண்டல மழைக்காடு / ஈரப்பதமான காடு', desc: 'அதிக மழைப்பொழிவு மற்றும் அதிகபட்ச மர அடர்த்தி கொண்ட பகுதி.' },
    ml: { name: 'ഉഷ്ണമേഖലാ മഴക്കാടുകൾ / ഈർപ്പമുള്ള വനങ്ങൾ', desc: 'ഉയർന്ന മഴയും പരമാവധി ജൈവ സാന്ദ്രതയുമുള്ള നിത്യഹരിത പ്രദേശം.' },
    kn: { name: 'ಉಷ್ಣವಲಯದ ಮಳೆಕಾಡು / ತೇವಾಂಶವುಳ್ಳ ಅರಣ್ಯ', desc: 'ಹೆಚ್ಚಿನ ಮಳೆ ಮತ್ತು ಗರಿಷ್ಠ ಜೈವಿಕ ಸಾಂದ್ರತೆಯ ನಿತ್ಯಹರಿದ್ವರ್ಣ ಅರಣ್ಯ.' },
    te: { name: 'ఉష్ణమండల వర్షారణ్యం / తేమతో కూడిన అటవీ', desc: 'అధిక వర్షపాతం మరియు గరిష్ట బయోమాస్ సాంద్రత కలిగిన సతత హరిత అడవి.' }
  },
  'Tropical Dry Deciduous & Agroforestry': {
    en: { name: 'Tropical Dry Deciduous & Agroforestry (India/SE Asia)', desc: 'Optimal for South Indian smallholder farm forestry with drought-tolerant timber.' },
    ta: { name: 'வெப்பமண்டல உலர் இலையுதிர் & வேளாண் காடுகள் (இந்தியா/தெற்காசியா)', desc: 'தென்னிந்திய சிறு விவசாயிகளுக்கு ஏற்ற வறட்சியைத் தாங்கும் மரப்பயிர்கள்.' },
    ml: { name: 'ഉഷ്ണമേഖലാ ഇലപൊഴിയും കാടുകൾ & കാർഷിക വനവൽക്കരണം', desc: 'തെക്കേ ഇന്ത്യൻ ചെറുകിട കർഷകർക്ക് അനുയോജ്യമായ വരൾച്ചയെ പ്രതിരോധിക്കുന്ന മരങ്ങൾ.' },
    kn: { name: 'ಉಷ್ಣವಲಯದ ಒಣ ಎಲೆಯುದುರುವ ಮತ್ತು ಕೃಷಿ ಅರಣ್ಯ (ಭಾರತ)', desc: 'ದಕ್ಷಿಣ ಭಾರತದ ಸಣ್ಣ ರೈತರಿಗೆ ಸೂಕ್ತವಾದ ಬರ ನಿರೋಧಕ ಮರದ ತಳಿಗಳು.' },
    te: { name: 'ఉష్ణమండల పొడి ఆకురాల్చే & వ్యవసాయ అటవీ (భారతదేశం)', desc: 'దక్షిణ భారత చిన్న రైతులకు అనువైన కరువును తట్టుకునే కలప చెట్లు.' }
  },
  'Temperate / Mixed Hardwood': {
    en: { name: 'Temperate Continental & Mixed Hardwood', desc: 'Mid-latitude deciduous oaks and beeches with steady carbon accumulation.' },
    ta: { name: 'மிதவெப்பமண்டல கலப்பு மரக்காடு', desc: 'மிதமான தட்பவெப்பநிலை கொண்ட மர வகைகள்.' },
    ml: { name: 'മിതശീതോഷ്ണ മിശ്രിത വനങ്ങൾ', desc: 'സ്ഥിരമായ കാർബൺ ശേഖരണമുള്ള മിതശീതോഷ്ണ ഇലപൊഴിയും മരങ്ങൾ.' },
    kn: { name: 'ಸಮಶೀತೋಷ್ಣ / ಮಿಶ್ರ ಗಟ್ಟಿಮರದ ಅರಣ್ಯ', desc: 'ಸ್ಥಿರ ಇಂಗಾಲ ಶೇಖರಣೆಯ ಮಧ್ಯ-ಅಕ್ಷಾಂಶದ ಮರಗಳು.' },
    te: { name: 'సమశీతోష్ణ / మిశ్రమ కలప అటవీ', desc: 'స్థిరమైన కార్బన్ శోషణ కలిగిన సమశీతోష్ణ ఆకురాల్చే చెట్లు.' }
  },
  'Boreal Forest (Taiga)': {
    en: { name: 'Boreal Forest (Taiga / High Latitude Coniferous)', desc: 'Cold climate conifers with slow growth rates and high permanence retention.' },
    ta: { name: 'போரியல் காடு (டைகா ஊசியிலை காடுகள்)', desc: 'குளிர்ந்த காலநிலை கொண்ட ஊசியிலை மரங்கள்.' },
    ml: { name: 'ബോറിയൽ വനങ്ങൾ (തൈഗ കോണിഫറസ്)', desc: 'തണുത്ത കാലാവസ്ഥയിലുള്ള കോണിഫറസ് മരങ്ങൾ.' },
    kn: { name: 'ಬೋರಿಯಲ್ ಅರಣ್ಯ (ಟೈಗಾ ಶಂಕುಧಾರಿ ಕಾಡು)', desc: 'ಶೀತ ಹವಾಮಾನದ ಶಂಕುಧಾರಿ ಮರಗಳು.' },
    te: { name: 'బోరియల్ అటవీ (టైగా కోనిఫెరస్)', desc: 'శీతల వాతావరణ కోనిఫెరస్ చెట్లు.' }
  },
  'Mangrove & Coastal Blue Carbon': {
    en: { name: 'Mangrove & Coastal Estuarine Blue Carbon', desc: 'Tidal saline wetlands with high soil organic carbon accumulation.' },
    ta: { name: 'சதுப்புநிலம் & கடலோர நீல கார்பன்', desc: 'உவர் நீர் கடலோர சதுப்புநிலங்களில் மிக அதிக மண் கார்பன் சேமிப்பு.' },
    ml: { name: 'കണ്ടൽക്കാടുകൾ & തീരദേശ ബ്ലൂ കാർബൺ', desc: 'ഉയർന്ന മണ്ണ് ഓർഗാനിക് കാർബൺ ശേഖരണമുള്ള കണ്ടൽ തീരദേശങ്ങൾ.' },
    kn: { name: 'ಮ್ಯಾಂಗ್ರೋವ್ ಮತ್ತು ಕರಾವಳಿ ನೀಲಿ ಇಂಗಾಲ', desc: 'ಹೆಚ್ಚಿನ ಮಣ್ಣಿನ ಸಾವಯವ ಇಂಗಾಲ ಶೇಖರಣೆಯ ಕರಾವಳಿ ತೇವಭೂಮಿಗಳು.' },
    te: { name: 'మడ అడవులు & తీరప్రాంత బ్లూ కార్బన్', desc: 'అధిక నేల సేంద్రీయ కార్బన్ నిల్వ కలిగిన తీరప్రాంత చిత్తడి నేలలు.' }
  }
};

export const getBiomeDisplayName = (biomeId: string, lang: Language): string => {
  if (!biomeId) return '';
  const trimmed = biomeId.trim();
  if (BIOME_TRANSLATIONS[trimmed]?.[lang]?.name) {
    return BIOME_TRANSLATIONS[trimmed][lang].name;
  }
  // Try matching against en.name or partial key
  const match = Object.values(BIOME_TRANSLATIONS).find(b => b.en?.name?.toLowerCase() === trimmed.toLowerCase()) ||
    Object.entries(BIOME_TRANSLATIONS).find(([key]) => key.toLowerCase().includes(trimmed.toLowerCase()) || trimmed.toLowerCase().includes(key.toLowerCase()))?.[1];
  if (match?.[lang]?.name) {
    return match[lang].name;
  }
  return BIOME_TRANSLATIONS[trimmed]?.['en']?.name || trimmed;
};

export const getBiomeDescription = (biomeId: string, lang: Language): string => {
  if (!biomeId) return '';
  const trimmed = biomeId.trim();
  if (BIOME_TRANSLATIONS[trimmed]?.[lang]?.desc) {
    return BIOME_TRANSLATIONS[trimmed][lang].desc;
  }
  const match = Object.values(BIOME_TRANSLATIONS).find(b => b.en?.name?.toLowerCase() === trimmed.toLowerCase()) ||
    Object.entries(BIOME_TRANSLATIONS).find(([key]) => key.toLowerCase().includes(trimmed.toLowerCase()) || trimmed.toLowerCase().includes(key.toLowerCase()))?.[1];
  if (match?.[lang]?.desc) {
    return match[lang].desc;
  }
  return BIOME_TRANSLATIONS[trimmed]?.['en']?.desc || '';
};

// Localized VM0047 Compliance Checks
export const COMPLIANCE_CHECK_TRANSLATIONS: Record<string, Record<Language, { check: string; details: (p?: number) => string; ref: string }>> = {
  'Dynamic Performance Baseline': {
    en: {
      check: 'Dynamic Performance Baseline (Sentinel-2 Control Plots)',
      details: () => 'Utilizes Sentinel-2 remote sensing dynamic control plots to track background non-project vegetation change.',
      ref: 'Verra VM0047 Section 8.1 (Dynamic Control Plots & Matching)'
    },
    ta: {
      check: 'இயக்கவியல் அடிப்படை மதிப்பீடு (Sentinel-2 நிலங்கள்)',
      details: () => 'சென்டினல்-2 செயற்கைக்கோள் தரவு மற்றும் ஒப்பிடக்கூடிய கட்டுப்பாட்டு நிலங்கள் மூலம் திட்டத்திற்கு அப்பாற்பட்ட இயற்கை தாவர வளர்ச்சியை கணக்கிடுகிறது.',
      ref: 'வெர்ரா VM0047 பிரிவு 8.1 (இயக்கவியல் கட்டுப்பாட்டு நிலங்கள்)'
    },
    ml: {
      check: 'ഡൈനാമിക് പെർഫോമൻസ് ബേസ്‌ലൈൻ (Sentinel-2)',
      details: () => 'പദ്ധതിക്ക് പുറത്തുള്ള സ്വാഭാവിക സസ്യവളർച്ച ട്രാക്ക് ചെയ്യാൻ സെന്റിനൽ-2 റിമോട്ട് സെൻസിംഗ് നിയന്ത്രണ പ്ലോട്ടുകൾ ഉപയോഗിക്കുന്നു.',
      ref: 'വെറ VM0047 വിഭാഗം 8.1'
    },
    kn: {
      check: 'ಡೈನಾಮಿಕ್ ಕಾರ್ಯಕ್ಷಮತೆ ಬೇಸ್‌ಲೈನ್ (Sentinel-2)',
      details: () => 'ಯೋಜನೆಯ ಹೊರಗಿನ ನೈಸರ್ಗಿಕ ಸಸ್ಯವರ್ಗದ ಬೆಳವಣಿಗೆಯನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಲು ಸೆಂಟಿನೆಲ್-2 ರಿಮೋಟ್ ಸೆನ್ಸಿಂಗ್ ನಿಯಂತ್ರಣ ಪ್ಲಾಟ್‌ಗಳನ್ನು ಬಳಸುತ್ತದೆ.',
      ref: 'ವೆರ್ರಾ VM0047 ವಿಭಾಗ 8.1'
    },
    te: {
      check: 'డైనమిక్ పనితీరు బేస్‌లైన్ (Sentinel-2)',
      details: () => 'ప్రాజెక్ట్ వెలుపల సహజ వృక్షసంపద మార్పును ట్రాక్ చేయడానికి సెంటినెల్-2 రిమోట్ సెన్సింగ్ నియంత్రణ ప్లాట్లను ఉపయోగిస్తుంది.',
      ref: 'వెర్రా VM0047 విభాగం 8.1'
    }
  },
  'Non-Permanence Risk Buffer Withholding': {
    en: {
      check: 'Non-Permanence Risk Buffer Withholding',
      details: (p = 15) => `${p}% allocated to Verra AFOLU Pooled Buffer Account (mandatory reserve against wildfire, pest outbreak, and climatic drought).`,
      ref: 'VCS Standard v4.4 Section 3.2.14 & AFOLU Non-Permanence Risk Tool'
    },
    ta: {
      check: 'நீடித்த நிலைப்புத்தன்மை அபாய சேமிப்பு வைப்பு',
      details: (p = 15) => `காட்டுத்தீ, பூச்சித் தாக்குதல், வறட்சி போன்ற அபாயங்களுக்காக வெர்ரா சேமிப்புக் கணக்கில் ${p}% வரவுகள் கட்டாயமாக நிறுத்தி வைக்கப்பட்டுள்ளன.`,
      ref: 'VCS தரம் v4.4 பிரிவு 3.2.14 & AFOLU அபாய கருவி'
    },
    ml: {
      check: 'സ്ഥിരതാ റിസ്ക് ബഫർ നീക്കിവെയ്ക്കൽ',
      details: (p = 15) => `കാട്ടുതീ, കീടബാധ, വരൾച്ച എന്നിവയ്ക്കെതിരെ ${p}% നോൺ-പെർമനൻസ് ബഫർ വെറ പൂൾഡ് റിസർവിലേക്ക് മാറ്റിവെച്ചു.`,
      ref: 'വിസിഎസ് സ്റ്റാൻഡേർഡ് v4.4 & വെറ റിസ്ക് ടൂൾ'
    },
    kn: {
      check: 'ಸ್ಥಿರತೆ ಅಪಾಯ ಬಫರ್ ಕಾಯ್ದಿರಿಸುವಿಕೆ',
      details: (p = 15) => `ಕಾಳ್ಗಿಚ್ಚು, ಕೀಟಬಾಧೆ ಮತ್ತು ಬರಗಾಲದ ವಿರುದ್ಧ ${p}% ಬಫರ್ ಅನ್ನು ವೆರ್ರಾ ಮೀಸಲು ಖಾತೆಯಲ್ಲಿ ಇರಿಸಲಾಗಿದೆ.`,
      ref: 'VCS ಮಾನದಂಡ v4.4 & ವೆರ್ರಾ ರಿಸ್ಕ್ ಟೂಲ್'
    },
    te: {
      check: 'స్థిరత్వ ప్రమాద బఫర్ నిల్వ కేటాయింపు',
      details: (p = 15) => `అడవి మంటలు, తెగుళ్లు మరియు కరువుల నివారణకు ${p}% బఫర్ నిల్వను వెర్రా పూల్డ్ ఖాతాలో ఉంచారు.`,
      ref: 'VCS ప్రమాణం v4.4 & వెర్రా రిస్క్ టూల్'
    }
  },
  'Permanence Risk Buffer Deposit (Pooled Reserve)': {
    en: {
      check: 'Permanence Risk Buffer Deposit (Pooled Reserve)',
      details: (p = 18) => `${p}% non-permanence buffer deposited into Verra pooled risk reserve against wildfire, pest outbreak, and climatic drought.`,
      ref: 'Verra VCS Registration & Issuance Process v4.3'
    },
    ta: {
      check: 'நீடித்த நிலைப்புத்தன்மை சேமிப்பு வைப்பு (மைய சேமிப்பு நிதி)',
      details: (p = 18) => `காட்டுத்தீ, பூச்சித் தாக்குதல், வறட்சி போன்ற அபாயங்களுக்காக வெர்ரா சேமிப்புக் கணக்கில் ${p}% வரவுகள் கட்டாயமாக நிறுத்தி வைக்கப்பட்டுள்ளன.`,
      ref: 'வெர்ரா VCS பதிவு மற்றும் வெளியீட்டு செயல்முறை v4.3'
    },
    ml: {
      check: 'സ്ഥിരതാ റിസ്ക് ബഫർ നിക്ഷേപം (പൂൾഡ് റിസർവ്)',
      details: (p = 18) => `കാട്ടുതീ, കീടബാധ, വരൾച്ച എന്നിവയ്ക്കെതിരെ ${p}% നോൺ-പെർമനൻസ് ബഫർ വെറ പൂൾഡ് റിസർവിലേക്ക് മാറ്റിവെച്ചു.`,
      ref: 'വെറ വിസിഎസ് രജിസ്ട്രേഷൻ പ്രക്രിയ v4.3'
    },
    kn: {
      check: 'ಸ್ಥಿರತೆ ಅಪಾಯ ಬಫರ್ ಠೇವಣಿ (ಮೀಸಲು ಪೂಲ್)',
      details: (p = 18) => `ಕಾಳ್ಗಿಚ್ಚು, ಕೀಟಬಾಧೆ ಮತ್ತು ಬರಗಾಲದ ವಿರುದ್ಧ ${p}% ಬಫರ್ ಅನ್ನು ವೆರ್ರಾ ಮೀಸಲು ಖಾತೆಯಲ್ಲಿ ಇರಿಸಲಾಗಿದೆ.`,
      ref: 'ವೆರ್ರಾ VCS ನೋಂದಣಿ ಪ್ರಕ್ರಿಯೆ v4.3'
    },
    te: {
      check: 'స్థిరత్వ ప్రమాద బఫర్ డిపాజిట్ (పూల్డ్ రిజర్వ్)',
      details: (p = 18) => `అడవి మంటలు, తెగుళ్లు మరియు కరువుల నివారణకు ${p}% బఫర్ నిల్వను వెర్రా పూల్డ్ ఖాతాలో ఉంచారు.`,
      ref: 'వెర్రా VCS రిజిస్ట్రేషన్ ప్రక్రియ v4.3'
    }
  },
  'Activity Shifting & Market Leakage Factoring': {
    en: {
      check: 'Activity Shifting & Market Leakage Factoring',
      details: (p = 12) => `${p}% deducted for agricultural activity displacement and fuel-wood collection relocation outside boundaries.`,
      ref: 'Verra VM0047 Section 8.3 (Leakage Quantification)'
    },
    ta: {
      check: 'செயல்பாட்டு இடப்பெயர்வு & கசிவு கணக்கீடு',
      details: (p = 12) => `விவசாயம் அல்லது விறகு சேகரிப்பு எல்லைக்கு வெளியே மாறுவதால் ஏற்படும் மறைமுக உமிழ்வுகளுக்கு ${p}% கழிக்கப்பட்டது.`,
      ref: 'வெர்ரா VM0047 பிரிவு 8.3 (கசிவு மதிப்பீடு)'
    },
    ml: {
      check: 'പ്രവർത്തന ചോർച്ചയും മാർക്കറ്റ് ലീകേജും',
      details: (p = 12) => `കാർഷിക പ്രവർത്തനങ്ങളോ വിറക് ശേഖരണമോ പുറത്തേക്ക് മാറുമ്പോഴുണ്ടാകുന്ന ഉദ്‌വമനത്തിന് ${p}% കിഴിവ്.`,
      ref: 'വെറ VM0047 വിഭാഗം 8.3'
    },
    kn: {
      check: 'ಚಟುವಟಿಕೆ ಸ್ಥಳಾಂತರ ಮತ್ತು ಮಾರುಕಟ್ಟೆ ಸೋರಿಕೆ ಕಡಿತ',
      details: (p = 12) => `ಕೃಷಿ ಅಥವಾ ಉರುವಲು ಸಂಗ್ರಹ ಹೊರಗೆ ಸ್ಥಳಾಂತರಗೊಳ್ಳುವುದರಿಂದಾಗುವ ಹೊರಸೂಸುವಿಕೆಗೆ ${p}% ಕಡಿತ.`,
      ref: 'ವೆರ್ರಾ VM0047 ವಿಭಾಗ 8.3'
    },
    te: {
      check: 'కార్యాచరణ బదిలీ & మార్కెట్ లీకేజ్ పరిగణన',
      details: (p = 12) => `వ్యవసాయ కార్యకలాపాలు లేదా కట్టెల సేకరణ వెలుపలికి మారడం వల్ల వచ్చే ఉద్గారాలకు ${p}% తగ్గింపు.`,
      ref: 'వెర్రా VM0047 విభాగం 8.3'
    }
  },
  'Timeline Realism & Validation Buffer': {
    en: {
      check: 'Timeline Realism & Validation Buffer',
      details: () => 'First credit issuance scheduled at Year 3 to account for VCS audit validation, pipeline listing, and biomass establishment.',
      ref: 'Verra Registration and Issuance Process v4.3'
    },
    ta: {
      check: 'காலக்கெடு உண்மைத்தன்மை & தணிக்கை கால அவகாசம்',
      details: () => 'VCS தணிக்கை சரிபார்ப்பு மற்றும் மரங்களின் ஆரம்ப வளர்ச்சிக்காக முதல் வரவு வழங்கல் 3-ம் ஆண்டில் திட்டமிடப்பட்டுள்ளது.',
      ref: 'வெர்ரா பதிவு மற்றும் வெளியீட்டு செயல்முறை v4.3'
    },
    ml: {
      check: 'സമയപരിധിയും ഓഡിറ്റ് വാലിഡേഷനും',
      details: () => 'വിസിഎസ് ഓഡിറ്റിനും പ്രാരംഭ വളർച്ചയ്ക്കും ശേഷം മൂന്നാം വർഷത്തിൽ ആദ്യ ക്രെഡിറ്റ് വിതരണം ക്രമീകരിച്ചു.',
      ref: 'വെറ രജിസ്ട്രേഷൻ പ്രക്രിയ v4.3'
    },
    kn: {
      check: 'ಸಮಯಾವಧಿ ವಾಸ್ತವಿಕತೆ ಮತ್ತು ಪರಿಶೀಲನೆ ಬಫರ್',
      details: () => 'ಆಡಿಟ್ ಪರಿಶೀಲನೆ ಮತ್ತು ಮರಗಳ ಬೆಳವಣಿಗೆಗಾಗಿ ಮೊದಲ ಕ್ರೆಡಿಟ್ ವಿತರಣೆಯನ್ನು 3 ನೇ ವರ್ಷದಲ್ಲಿ ನಿಗದಿಪಡಿಸಲಾಗಿದೆ.',
      ref: 'ವೆರ್ರಾ ನೋಂದಣಿ ಪ್ರಕ್ರಿಯೆ v4.3'
    },
    te: {
      check: 'కాలక్రమ వాస్తవికత & ధృవీకరణ బఫర్',
      details: () => 'ఆడిట్ ధృవీకరణ మరియు మొక్కల పెరుగుదల దృష్ట్యా మొదటి క్రెడిట్ జారీని 3వ సంవత్సరంలో నిర్ణయించారు.',
      ref: 'వెర్రా రిజిస్ట్రేషన్ ప్రక్రియ v4.3'
    }
  },
  'Remote Sensing Uncertainty Discount (10m Resolution)': {
    en: {
      check: 'Remote Sensing Uncertainty Discount (10m Resolution)',
      details: (p = 10) => `${p}% measurement uncertainty discount applied to conservative lower-bound confidence interval.`,
      ref: 'Verra VM0047 Remote Sensing Standard; IPCC Tier-2 Error Propagation'
    },
    ta: {
      check: 'தொலை உணர்வு மாதிரி நிச்சயமற்ற கழிவு (10மீ துல்லியம்)',
      details: (p = 10) => `புள்ளியியல் பிழைகளைத் தவிர்த்து குறைந்தபட்ச மதிப்பீட்டை உறுதி செய்ய ${p}% பாதுகாப்பு கழிவு பயன்படுத்தப்படுகிறது.`,
      ref: 'வெர்ரா VM0047 தொலை உணர்வு தரம்; IPCC Tier-2 பிழை கணக்கீடு'
    },
    ml: {
      check: 'റിമോട്ട് സെൻസിംഗ് അനിശ്ചിതത്വ കിഴിവ് (10m)',
      details: (p = 10) => `സാമ്പിൾ പിശകുകൾ ഒഴിവാക്കാൻ യാഥാസ്ഥിതിക കുറഞ്ഞ പരിധിയായി ${p}% മുൻകരുതൽ കിഴിവ് നൽകി.`,
      ref: 'വെറ VM0047 റിമോട്ട് സെൻസിംഗ് സ്റ്റാൻഡേർഡ്'
    },
    kn: {
      check: 'ರಿಮೋಟ್ ಸೆನ್ಸಿಂಗ್ ಅನಿಶ್ಚಿತತೆ ಕಡಿತ (10ಮೀ)',
      details: (p = 10) => `ದೋಷಗಳನ್ನು ತಡೆಗಟ್ಟಲು ಕನ್ಸರ್ವೇಟಿವ್ ಕೆಳಮಟ್ಟದ ವಿಶ್ವಾಸಾರ್ಹತೆಯೊಂದಿಗೆ ${p}% ರಿಯಾಯಿತಿ ಅನ್ವಯಿಸಲಾಗಿದೆ.`,
      ref: 'ವೆರ್ರಾ VM0047 ರಿಮೋಟ್ ಸೆನ್ಸಿಂಗ್ ಮಾನದಂಡ'
    },
    te: {
      check: 'రిమోట్ సెన్సింగ్ అనిశ్చితి తగ్గింపు (10మీ)',
      details: (p = 10) => `గణాంక లోపాలను నివారించడానికి జాగ్రత్తగా కనిష్ట పరిమితికి ${p}% తగ్గింపు వర్తింపజేయబడింది.`,
      ref: 'వెర్రా VM0047 రిమోట్ సెన్సింగ్ ప్రమాణం'
    }
  }
};

export const getComplianceCheckTranslation = (checkName: string, lang: Language, percent?: number) => {
  let trans = COMPLIANCE_CHECK_TRANSLATIONS[checkName]?.[lang];
  if (!trans) {
    if (checkName.includes('Baseline') || checkName.includes('Dynamic')) {
      trans = COMPLIANCE_CHECK_TRANSLATIONS['Dynamic Performance Baseline']?.[lang];
    } else if (checkName.includes('Permanence') || checkName.includes('Buffer')) {
      trans = COMPLIANCE_CHECK_TRANSLATIONS['Non-Permanence Risk Buffer Withholding']?.[lang] || COMPLIANCE_CHECK_TRANSLATIONS['Permanence Risk Buffer Deposit (Pooled Reserve)']?.[lang];
    } else if (checkName.includes('Leakage')) {
      trans = COMPLIANCE_CHECK_TRANSLATIONS['Activity Shifting & Market Leakage Factoring']?.[lang];
    } else if (checkName.includes('Timeline') || checkName.includes('Validation')) {
      trans = COMPLIANCE_CHECK_TRANSLATIONS['Timeline Realism & Validation Buffer']?.[lang];
    } else if (checkName.includes('Remote Sensing') || checkName.includes('Uncertainty')) {
      trans = COMPLIANCE_CHECK_TRANSLATIONS['Remote Sensing Uncertainty Discount (10m Resolution)']?.[lang];
    }
  }
  if (!trans) {
    trans = COMPLIANCE_CHECK_TRANSLATIONS[checkName]?.['en'];
  }
  if (!trans) return null;
  return {
    check: trans.check,
    details: trans.details(percent),
    ref: trans.ref
  };
};

// Geospatial Intelligence View Strings
export const GEOSPATIAL_STRINGS: Record<string, Record<Language, string>> = {
  pillar1: {
    en: 'PILLAR 1',
    ta: 'தூண் 1',
    ml: 'സ്തംഭം 1',
    kn: 'ಸ್ತಂಭ 1',
    te: 'స్తంభం 1'
  },
  geospatialTitle: {
    en: 'Geospatial Intelligence & Remote Sensing',
    ta: 'புவிசார் நுண்ணறிவு & செயற்கைக்கோள் தரவு',
    ml: 'ജിയോസ്പേഷ്യൽ ഇന്റലിജൻസ് & റിമോട്ട് സെൻസിംഗ്',
    kn: 'ಜಿಯೋಸ್ಪೇಷಿಯಲ್ ಇಂಟೆಲಿಜೆನ್ಸ್ ಮತ್ತು ರಿಮೋಟ್ ಸೆನ್ಸಿಂಗ್',
    te: 'జియోస్పేషియల్ ఇంటెలిజెన్స్ & రిమోట్ సెన్సింగ్'
  },
  geospatialSubtitle: {
    en: 'High-Resolution 10m Sentinel-2 Land Feasibility',
    ta: 'உயர் துல்லிய 10மீ சென்டினல்-2 நில சாத்தியக்கூறு',
    ml: 'ഉയർന്ന റെസല്യൂഷൻ 10മീ സെന്റിനൽ-2 ഭൂമി സാധ്യതാ പഠനം',
    kn: 'ಉನ್ನತ ರೆಸಲ್ಯೂಶನ್ 10ಮೀ ಸೆಂಟಿನೆಲ್-2 ಜಮೀನು ಸಾಧ್ಯತೆ',
    te: 'హై-రిజల్యూషన్ 10మీ సెంటినెల్-2 భూమి సాధ్యత'
  },
  geospatialDesc: {
    en: 'Verify land eligibility using Sentinel-2 European Space Agency 10-meter multispectral imagery. Trace parcel boundaries to recalculate exact acreage, inspect vegetative indices (NDVI & NDRE), and audit 10-year Hansen forest change data to guarantee Verra ARR additionality.',
    ta: 'ஐரோப்பிய விண்வெளி ஏஜென்சியின் சென்டினல்-2 10-மீட்டர் மல்டிஸ்பெக்ட்ரல் செயற்கைக்கோள் தரவுகளுடன் நிலத்தின் தகுதியைச் சரிபார்க்கவும். எல்லைகளை வரைந்து துல்லியமான பரப்பளவைக் கணக்கிடவும், தாவர ஆரோக்கியம் மற்றும் 10-ஆண்டு வன மாற்றத் தரவுகளை ஆய்வு செய்யவும்.',
    ml: 'യൂറോപ്യൻ ബഹിരാകാശ ഏജൻസിയുടെ സെന്റിനൽ-2 10-മീറ്റർ ഉപഗ്രഹ ഡാറ്റ ഉപയോഗിച്ച് ഭൂമിയുടെ യോഗ്യത പരിശോധിക്കുക. കൃത്യമായ വിസ്തീർണ്ണം കണക്കാക്കാനും സസ്യ സാന്ദ്രത പരിശോധിക്കാനും 10-വർഷ ഹാൻസെൻ വനമാറ്റ വിവരങ്ങൾ ഓഡിറ്റ് ചെയ്യാനും സാധിക്കുന്നു.',
    kn: 'ಯುರೋಪಿಯನ್ ಬಾಹ್ಯಾಕಾಶ ಸಂಸ್ಥೆಯ ಸೆಂಟಿನೆಲ್-2 10-ಮೀಟರ್ ಉಪಗ್ರಹ ಡೇಟಾ ಬಳಸಿ ಜಮೀನಿನ ಅರ್ಹತೆಯನ್ನು ಪರಿಶೀಲಿಸಿ. ನಿಖರ ವಿಸ್ತೀರ್ಣ ಲೆಕ್ಕಹಾಕಿ, ಸಸ್ಯ ಸಾಂದ್ರತೆ ಪರೀಕ್ಷಿಸಿ ಮತ್ತು 10 ವರ್ಷಗಳ ಅರಣ್ಯ ಬದಲಾವಣೆ ಡೇಟಾವನ್ನು ಲೆಕ್ಕಪರಿಶೋಧನೆ ಮಾಡಿ.',
    te: 'యూరోపియన్ స్పేస్ ఏజెన్సీ సెంటెనెల్-2 10-మీటర్ల ఉపగ్రహ డేటాను ఉపయోగించి భూమి అర్హతను ధృవీకరించండి. ఖచ్చితమైన వైశాల్యాన్ని లెక్కించండి, వృక్ష సాంద్రతను పరిశీలించండి మరియు 10 సంవత్సరాల అటవీ మార్పు డేటాను ఆడిట్ చేయండి.'
  },
  syncToCalc: {
    en: 'Sync Polygon to Engine',
    ta: 'கணிப்பானில் நிலப்பரப்பை இணைக்கவும்',
    ml: 'ഭൂവിസ്തൃതി കാൽക്കുലേറ്ററിലേക്ക് ബന്ധിപ്പിക്കുക',
    kn: 'ವಿಸ್ತೀರ್ಣವನ್ನು ಕ್ಯಾಲ್ಕುಲೇಟರ್‌ಗೆ ಸಿಂಕ್ ಮಾಡಿ',
    te: 'వైశాల్యాన్ని కాలిక్యులేటర్‌కు సింక్ చేయండి'
  },
  synced: {
    en: 'Synced!',
    ta: 'இணைக்கப்பட்டது!',
    ml: 'ബന്ധിപ്പിച്ചു!',
    kn: 'ಸಿಂಕ್ ಆಗಿದೆ!',
    te: 'సింక్ చేయబడింది!'
  },
  parcelsLabel: {
    en: 'Parcels:',
    ta: 'நிலங்கள்:',
    ml: 'ഭൂമികൾ:',
    kn: 'ಜಮೀನುಗಳು:',
    te: 'భూములు:'
  },
  coimbatorePreset: {
    en: 'Coimbatore (5.2 ac)',
    ta: 'கோயம்புத்தூர் (5.2 ஏக்)',
    ml: 'കോയമ്പത്തൂർ (5.2 ഏക്)',
    kn: 'ಕೊಯಮತ್ತೂರು (5.2 ಎಕ)',
    te: 'కోయంబత్తూరు (5.2 ఎక)'
  },
  cauveryPreset: {
    en: 'Cauvery Delta (12.4 ac)',
    ta: 'காவிரி டெல்டா (12.4 ஏக்)',
    ml: 'കാവേരി ഡെൽറ്റ (12.4 ഏക്)',
    kn: 'ಕಾವೇರಿ ಡೆಲ್ಟಾ (12.4 ಎಕ)',
    te: 'కావేరి డెల్టా (12.4 ఎక)'
  },
  salemPreset: {
    en: 'Salem Semi-Arid (8.7 ac)',
    ta: 'சேலம் மானாவாரி (8.7 ஏக்)',
    ml: 'സേലം വരണ്ട ഭൂമി (8.7 ഏക്)',
    kn: 'ಸೇಲಂ ಅರೆ-ಶುಷ್ಕ (8.7 ಎಕ)',
    te: 'సేలం పాక్షిక శుష్క (8.7 ఎక)'
  },
  paraPreset: {
    en: 'Pará Rainforest (25 ha)',
    ta: 'பாரா மழைக்காடு (25 ஹெக்)',
    ml: 'പാരാ മഴക്കാടുകൾ (25 ഹെക്)',
    kn: 'ಪಾರಾ ಮಳೆಕಾಡು (25 ಹೆಕ್)',
    te: 'పారా వర్షారణ్యం (25 హెక్)'
  },
  clickMapVertices: {
    en: 'Click on Map to Add Vertices',
    ta: 'புள்ளிகளைச் சேர்க்க வரைபடத்தில் கிளிக் செய்யவும்',
    ml: 'പോയിന്റുകൾ ചേർക്കാൻ മാപ്പിൽ ക്ലിക്ക് ചെയ്യുക',
    kn: 'ಪಾಯಿಂಟ್‌ಗಳನ್ನು ಸೇರಿಸಲು ನಕ್ಷೆಯ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ',
    te: 'పాయింట్లను జోడించడానికి మ్యాప్‌పై క్లిక్ చేయండి'
  },
  drawBoundaryPolygon: {
    en: 'Draw Boundary Polygon',
    ta: 'எல்லை பாலிகான் வரையவும்',
    ml: 'അതിർത്തി രേഖപ്പെടുത്തുക',
    kn: 'ಗಡಿ ರೇಖೆ ಬರೆಯಿರಿ',
    te: 'సరిహద్దు గీయండి'
  },
  clearPolygon: {
    en: 'Clear Polygon',
    ta: 'பாலிகானை அழிக்கவும்',
    ml: 'മായ്ക്കുക',
    kn: 'ಅಳಿಸಿ',
    te: 'తుడిచివేయండి'
  },
  sentinel2Bands: {
    en: 'Sentinel-2 Bands:',
    ta: 'சென்டினல்-2 பட்டைகள்:',
    ml: 'സെന്റിനൽ-2 ബാൻഡുകൾ:',
    kn: 'ಸೆಂಟಿನೆಲ್-2 ಬ್ಯಾಂಡ್‌ಗಳು:',
    te: 'సెంటినెల్-2 బ్యాండ్లు:'
  },
  ndviVegDensity: {
    en: 'NDVI (Veg Density)',
    ta: 'NDVI (தாவர அடர்த்தி)',
    ml: 'NDVI (സസ്യ സാന്ദ്രത)',
    kn: 'NDVI (ಸಸ್ಯ ಸಾಂದ್ರತೆ)',
    te: 'NDVI (వృక్ష సాంద్రత)'
  },
  falseColorIr: {
    en: 'False-Color IR',
    ta: 'பொய்-வண்ண அகச்சிவப்பு (False-Color)',
    ml: 'ഫാൾസ് കളർ IR',
    kn: 'ಫಾಲ್ಸ್ ಕಲರ್ IR',
    te: 'ఫాల్స్ కలర్ IR'
  },
  trueColorRgb: {
    en: 'True-Color RGB',
    ta: 'இயற்கை வண்ண RGB',
    ml: 'ട്രൂ കളർ RGB',
    kn: 'ಟ್ರೂ ಕಲರ್ RGB',
    te: 'ట్రూ కలర్ RGB'
  },
  spatialGrid10m: {
    en: '10m Spatial Grid',
    ta: '10மீ பிக்சல் கட்டம்',
    ml: '10മീ സ്പേഷ്യൽ ഗ്രിഡ്',
    kn: '10ಮೀ ಗ್ರಿಡ್',
    te: '10మీ గ్రిడ్'
  },
  centroidLabel: {
    en: 'Centroid:',
    ta: 'மையப்புள்ளி:',
    ml: 'കേന്ദ്രബിന്ദു:',
    kn: 'ಕೇಂದ್ರ ಬಿಂದು:',
    te: 'కేంద్ర బిందువు:'
  },
  computedAreaShoelace: {
    en: 'Computed Area (Shoelace)',
    ta: 'கணக்கிடப்பட்ட பரப்பளவு (Shoelace)',
    ml: 'കണക്കാക്കിയ വിസ്തീർണ്ണം',
    kn: 'ಲೆಕ್ಕಹಾಕಿದ ವಿಸ್ತೀರ್ಣ',
    te: 'లెక్కించిన వైశాల్యం'
  },
  perimeterLabel: {
    en: 'Perimeter:',
    ta: 'சுற்றளவு:',
    ml: 'ചുറ്റളവ്:',
    kn: 'ಸುತ್ತಳತೆ:',
    te: 'చుట్టుకొలత:'
  },
  verticesLabel: {
    en: 'vertices',
    ta: 'புள்ளிகள்',
    ml: 'ബിന്ദുക്കൾ',
    kn: 'ಬಿಂದುಗಳು',
    te: 'బిందువులు'
  },
  pixelInspector10m: {
    en: '10m Pixel Inspector',
    ta: '10மீ பிக்சல் ஆய்வு',
    ml: '10മീ പിക്സൽ പരിശോധന',
    kn: '10ಮೀ ಪಿಕ್ಸೆಲ್ ಪರಿಶೀಲನೆ',
    te: '10మీ పిక్సెల్ పరిశీలన'
  },
  ndreRedEdge: {
    en: 'NDRE (Red Edge):',
    ta: 'NDRE விளிம்பு:',
    ml: 'NDRE റെഡ് എഡ്ജ്:',
    kn: 'NDRE ರೆಡ್ ಎಡ್ಜ್:',
    te: 'NDRE రెడ్ ఎడ్జ్:'
  },
  soilMoistureLabel: {
    en: 'Soil Moisture:',
    ta: 'மண் ஈரப்பதம்:',
    ml: 'മണ്ണിലെ ഈർപ്പം:',
    kn: 'ಮಣ್ಣಿನ ತೇವಾಂಶ:',
    te: 'నేల తేమ:'
  },
  biomassEstLabel: {
    en: 'Biomass Est:',
    ta: 'உயிர்ப்பொருள்:',
    ml: 'ബയോമാസ് കണക്ക്:',
    kn: 'ಬಯೋಮಾಸ್ ಅಂದಾಜು:',
    te: 'బయోమాస్ అంచనా:'
  },
  estimatedRateLabel: {
    en: 'Estimated Rate:',
    ta: 'மதிப்பிடப்பட்ட வீதம்:',
    ml: 'കണക്കാക്കിയ നിരക്ക്:',
    kn: 'ಅಂದಾಜು ದರ:',
    te: 'అంచనా రేటు:'
  },
  doneDrawing: {
    en: 'Done Drawing',
    ta: 'வரைதல் முடிந்தது',
    ml: 'വരയ്ക്കൽ പൂർത്തിയായി',
    kn: 'ರೇಖೆ ಪೂರ್ಣಗೊಂಡಿದೆ',
    te: 'పూర్తయింది'
  },
  landCarbonLab: {
    en: 'Land & Carbon Lab Integration',
    ta: 'லேண்ட் & கார்பன் லேப் இணைப்பு',
    ml: 'ലാൻഡ് & കാർബൺ ലാബ് സംയോജനം',
    kn: 'ಲ್ಯಾಂಡ್ & ಕಾರ್ಬನ್ ಲ್ಯಾಬ್ ಸಂಯೋಜನೆ',
    te: 'ల్యాండ్ & కార్బన్ ల్యాబ్ అనుసంధానం'
  },
  connected: {
    en: 'Connected',
    ta: 'இணைக்கப்பட்டது',
    ml: 'ബന്ധിപ്പിച്ചു',
    kn: 'ಸಂಪರ್ಕಗೊಂಡಿದೆ',
    te: 'కనెక్ట్ చేయబడింది'
  },
  baselineCanopyCover: {
    en: 'Baseline Canopy Cover',
    ta: 'அடிப்படை மரக் குடை மூடி',
    ml: 'അടിസ്ഥാന മേലാപ്പ് മൂടി',
    kn: 'ಮೂಲ ಕ್ಯಾನೋಪಿ ಕವರ್',
    te: 'ప్రాథమిక పందిరి కవర్'
  },
  meanCanopyHeight: {
    en: 'Mean canopy height:',
    ta: 'சராசரி மர உயரம்:',
    ml: 'ശരാശരി ഉയരം:',
    kn: 'ಸರಾಸರಿ ಎತ್ತರ:',
    te: 'సగటు ఎత్తు:'
  },
  hansenForestChange: {
    en: 'Hansen Global Forest Change (2014-2024)',
    ta: 'ஹேன்சன் உலகளாவிய காடு மாற்றம் (2014-2024)',
    ml: 'ഹാൻസെൻ ആഗോള വനമാറ്റ പഠനം (2014-2024)',
    kn: 'ಹ್ಯಾನ್ಸೆನ್ ಜಾಗತಿಕ ಅರಣ್ಯ ಬದಲಾವಣೆ (2014-2024)',
    te: 'హాన్సెన్ గ్లోబల్ ఫారెస్ట్ చేంజ్ (2014-2024)'
  },
  deforestationEvents: {
    en: 'Deforestation Events (10-Yr):',
    ta: 'காடழிப்பு நிகழ்வுகள் (10-ஆண்டு):',
    ml: 'വനനശീകരണ സംഭവങ്ങൾ (10-വർഷം):',
    kn: 'ಅರಣ್ಯನಾಶ ಘಟನೆಗಳು (10 ವರ್ಷ):',
    te: 'అటవీ నిర్మూలన సంఘటనలు (10 ఏళ్లు):'
  },
  zeroDetected: {
    en: '0 Detected',
    ta: '0 கண்டறியப்பட்டது',
    ml: '0 കണ്ടെത്തി',
    kn: '0 ಪತ್ತೆಯಾಗಿದೆ',
    te: '0 గుర్తించబడింది'
  },
  nearRealtime: {
    en: 'Near-Realtime',
    ta: 'நிகழ்நேர தரவு',
    ml: 'തത്സമയ ഡാറ്റ',
    kn: 'ನೈಜ-ಸಮಯ ಡೇಟಾ',
    te: 'రియల్-టైమ్ డేటా'
  },
  grasslandShrub: {
    en: 'Grassland / Shrub',
    ta: 'புல்வெளி / புதர்',
    ml: 'പുൽമേട് / കുറ്റിക്കാട്',
    kn: 'ಹುಲ್ಲುಗಾವಲು / ಪೊದೆ',
    te: 'గడ్డిభూమి / పొదలు'
  },
  cropland: {
    en: 'Cropland',
    ta: 'விவசாய நிலம்',
    ml: 'കൃഷിഭൂമി',
    kn: 'ಕೃಷಿ ಭೂಮಿ',
    te: 'వ్యవసాయ భూమి'
  },
  bareGroundDegraded: {
    en: 'Bare Ground / Degraded',
    ta: 'வெற்று நிலம் / சிதைவுற்றது',
    ml: 'തരിശുഭൂമി',
    kn: 'ಬಂಜರು ಭೂಮಿ',
    te: 'బీడు భూమి'
  },
  modisNpp: {
    en: 'MODIS Net Primary Productivity (NPP)',
    ta: 'மோடிஸ் (MODIS) நிகர உற்பத்தித்திறன்',
    ml: 'മോഡിസ് (MODIS) ഉത്പാദനക്ഷമത',
    kn: 'MODIS ಉತ್ಪಾದಕತೆ',
    te: 'MODIS ఉత్పాదకత'
  },
  meanAnnualRainfall10Yr: {
    en: '10-Year Mean Annual Rainfall:',
    ta: '10-ஆண்டு சராசரி மழைப்பொழிவு:',
    ml: '10-വർഷ ശരാശരി വാർഷിക മഴ:',
    kn: '10 ವರ್ಷಗಳ ಸರಾಸರಿ ವಾರ್ಷಿಕ ಮಳೆ:',
    te: '10 సంవత్సరాల సగటు వార్షిక వర్షపాతం:'
  },
  why10mMatters: {
    en: 'Why 10m Spatial Resolution Matters',
    ta: 'ஏன் 10-மீட்டர் தெளிவுத்திறன் முக்கியமானது?',
    ml: 'എന്തുകൊണ്ട് 10-മീറ്റർ റെസല്യൂഷൻ പ്രസക്തമാകുന്നു?',
    kn: '10-ಮೀಟರ್ ರೆಸಲ್ಯೂಶನ್ ಏಕೆ ಮುಖ್ಯ?',
    te: '10-మీటర్ల రిజల్యూషన్ ఎందుకు ముఖ్యం?'
  },
  customDrawnParcel: {
    en: 'Custom Drawn Parcel',
    ta: 'வரைந்த தனிப்பயன் நிலம்',
    ml: 'വരച്ച ഭൂമി',
    kn: 'ರೇಖಿಸಿದ ಕಸ್ಟಮ್ ಜಮೀನು',
    te: 'గీసిన కస్టమ్ భూమి'
  }
};

export const getGeoString = (key: string, lang: Language): string => {
  return GEOSPATIAL_STRINGS[key]?.[lang] || GEOSPATIAL_STRINGS[key]?.['en'] || key;
};

// Institutional App-Level Strings across 5 languages
export const APP_VIEW_STRINGS: Record<string, Record<Language, string>> = {
  evidenceBasedScreening: {
    en: 'Evidence-Based Screening',
    ta: 'அறிவியல் பூர்வ ஆய்வு',
    ml: 'ശാസ്ത്രീയമായ പരിശോധന',
    kn: 'ವೈಜ್ಞಾನಿಕ ತಪಾಸಣೆ',
    te: 'శాస్త్రీయ పరిశీలన'
  },
  analyzerHeading: {
    en: 'Agroforestry Carbon Pre-Feasibility Analyzer',
    ta: 'விவசாய கார்பன் சாத்தியக்கூறு மதிப்பீடு',
    ml: 'അഗ്രോഫോറസ്ട്രി കാർബൺ സാധ്യത പരിശോധന',
    kn: 'ಕೃಷಿ ಅರಣ್ಯ ಕಾರ್ಬನ್ ಕಾರ್ಯಸಾಧ್ಯತೆ ವಿಶ್ಲೇಷಕ',
    te: 'వ్యవసాయ అటవీ కార్బన్ సాధ్యత విశ్లేషణ'
  },
  drawPolygon: {
    en: 'Draw Polygon',
    ta: 'நில வரைபடம் வரை',
    ml: 'പോളിഗോൺ വരയ്ക്കുക',
    kn: 'ರೇಖಾಚಿತ್ರ ಬಿಡಿಸಿ',
    te: 'భూమి మ్యాప్ గీయండి'
  },
  uploadDeed: {
    en: 'Upload Deed',
    ta: 'ஆவணம் பதிவேற்று',
    ml: 'പ്രമാണം അപ്‌ലോഡ് ചെയ്യുക',
    kn: 'ದಾಖಲೆ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
    te: 'పత్రం అప్‌లోడ్ చేయండి'
  },
  vm0047Deductions: {
    en: 'VM0047 Deductions',
    ta: 'VM0047 கழிவுகள்',
    ml: 'VM0047 കിഴിവുകൾ',
    kn: 'VM0047 ಕಡಿತಗಳು',
    te: 'VM0047 మినహాయింపులు'
  },
  pillar1Geospatial: {
    en: '1. Geospatial & GEE',
    ta: '1. புவிசார் & செயற்கைக்கோள்',
    ml: '1. ജിയോസ്പേഷ്യൽ & ഉപഗ്രഹം',
    kn: '1. ಜಿಯೋಸ್ಪೇಷಿಯಲ್ & ಉಪಗ್ರಹ',
    te: '1. జియోస్పేషియల్ & శాటిలైట్'
  },
  pillar2Verra: {
    en: '2. Verra VM0047',
    ta: '2. வெர்ரா VM0047',
    ml: '2. വെറ VM0047',
    kn: '2. ವೆರ್ರಾ VM0047',
    te: '2. వెర్రా VM0047'
  },
  pillar3Documents: {
    en: '3. Document Hub',
    ta: '3. ஆவண மையம்',
    ml: '3. രേഖാ കേന്ദ്രം',
    kn: '3. ದಾಖಲೆ ಕೇಂದ್ರ',
    te: '3. పత్రాల కేంద్రం'
  },
  pillar4Finance: {
    en: '4. 30-Yr Monte Carlo',
    ta: '4. மான்டே கார்லோ நிதி',
    ml: '4. മോണ്ടെ കാർലോ ധനകാര്യം',
    kn: '4. ಮಾಂಟೆ ಕಾರ್ಲೊ ಹಣಕಾಸು',
    te: '4. మోంటే కార్లో ఆర్థిక నమూనా'
  },
  activeParcel: {
    en: 'Active:',
    ta: 'செயலில்:',
    ml: 'സജീവം:',
    kn: 'ಸಕ್ರಿಯ:',
    te: 'ప్రస్తుతం:'
  },
  verificationPromiseTitle: {
    en: 'Independent Verification Promise',
    ta: 'சுயாதீன சரிபார்ப்பு உறுதிமொழி',
    ml: 'സ്വതന്ത്ര പരിശോധനാ പ്രതിജ്ഞ',
    kn: 'ಸ್ವತಂತ್ರ ಪರಿಶೀಲನಾ ಭರವಸೆ',
    te: 'స్వతంత్ర ధృవీకరణ వాగ్దానం'
  },
  verificationPromiseDesc: {
    en: 'GreenVest does not take a cut of your tree harvest. We simulate your expected survival rates, soil bulk density, and dry-weight growth curves before you purchase saplings.',
    ta: 'கிரீன்வெஸ்ட் உங்கள் மர அறுவடையில் கமிஷன் எடுப்பதில்லை. நீங்கள் மரக்கன்றுகளை வாங்கும் முன் உயிர்வாழும் வீதம் மற்றும் வளர்ச்சி வளைவுகளை முன்கூட்டியே மதிப்பீடு செய்கிறோம்.',
    ml: 'ഗ്രീൻവെസ്റ്റ് നിങ്ങളുടെ തടി വിളവെടുപ്പിൽ നിന്ന് വിഹിതം എടുക്കുന്നില്ല. തൈകൾ വാങ്ങുന്നതിന് മുമ്പ് പ്രതീക്ഷിക്കുന്ന നിലനിൽപ്പ് നിരക്കും വളർച്ചാ വക്രങ്ങളും ഞങ്ങൾ ശാസ്ത്രീയമായി സിമുലേറ്റ് ചെയ്യുന്നു.',
    kn: 'ಗ್ರೀನ್‌ವೆಸ್ಟ್ ನಿಮ್ಮ ಮರದ ಕೊಯ್ಲಿನಲ್ಲಿ ಯಾವುದೇ ಪಾಲನ್ನು ತೆಗೆದುಕೊಳ್ಳುವುದಿಲ್ಲ. ನೀವು ಸಸಿಗಳನ್ನು ಖರೀದಿಸುವ ಮೊದಲು ಬದುಕುಳಿಯುವ ದರ ಮತ್ತು ಬೆಳವಣಿಗೆಯನ್ನು ನಾವು ವೈಜ್ಞಾನಿಕವಾಗಿ ಮಾದರಿ ಮಾಡುತ್ತೇವೆ.',
    te: 'గ్రీన్వెస్ట్ మీ చెట్ల దిగుబడిలో ఎలాంటి కమీషన్ తీసుకోదు. మొక్కలు కొనుగోలు చేయడానికి ముందే బ్రతికే శాతం మరియు వృద్ధిని శాస్త్రీయంగా అంచనా వేస్తాము.'
  },
  footerTagline: {
    en: 'The Pre-Feasibility Standard for Carbon Agroforestry',
    ta: 'வேளாண் காடுகள் கார்பன் முன்-சாத்தியக்கூறு தளம்',
    ml: 'കാർബൺ അഗ്രോഫോറസ്ട്രിയുടെ മുൻകൂർ സാധ്യത നിലവാരം',
    kn: 'ಕಾರ್ಬನ್ ಕೃಷಿ ಅರಣ್ಯದ ಪೂರ್ವ ಕಾರ್ಯಸಾಧ್ಯತಾ ಮಾನದಂಡ',
    te: 'కార్బన్ ఆగ్రోఫారెస్ట్రీ ముందస్తు సాధ్యత ప్రమాణం'
  },
  footerNote1: {
    en: 'Growth curves parameterized from ICAR-CAFRI (Jhansi) & FRI (Dehradun) published yield tables.',
    ta: 'ICAR-CAFRI (ஜான்சி) & FRI (டேராடூன்) வெளியிட்ட வளர்ச்சி அட்டவணைகளின்படி மாதிரியாக்கப்பட்டது.',
    ml: 'ICAR-CAFRI (ഝാൻസി), FRI (ഡെറാഡൂൺ) എന്നിവയുടെ ശാസ്ത്രീയ വളർച്ചാ പട്ടികകളെ അടിസ്ഥാനമാക്കിയുള്ളതാണ്.',
    kn: 'ICAR-CAFRI (ಝಾನ್ಸಿ) ಮತ್ತು FRI (ಡೆಹ್ರಾಡೂನ್) ಪ್ರಕಟಿತ ಇಳುವರಿ ಕೋಷ್ಟಕಗಳಿಂದ ಬೆಳವಣಿಗೆಯನ್ನು ಅಳವಡಿಸಲಾಗಿದೆ.',
    te: 'ICAR-CAFRI (ఝాన్సీ) మరియు FRI (డెహ్రాడూన్) ప్రచురించిన దిగుబడి పట్టికల ఆధారంగా రూపొందించబడింది.'
  },
  footerNote2: {
    en: 'Compliant with Verra VM0047 ARR and IPCC AFOLU Tier-1 & Tier-2 accounting standards.',
    ta: 'வெர்ரா VM0047 ARR மற்றும் IPCC AFOLU அடுக்கு 1 & 2 கணக்கியல் தரநிலைகளுடன் இணக்கமானது.',
    ml: 'വെറ VM0047 ARR, IPCC AFOLU ടയർ-1 & ടയർ-2 അക്കൗണ്ടിംഗ് മാനദണ്ഡങ്ങളുമായി പൊരുത്തപ്പെടുന്നു.',
    kn: 'ವೆರ್ರಾ VM0047 ARR ಮತ್ತು IPCC AFOLU ಶ್ರೇಣಿ-1 & 2 ಲೆಕ್ಕಪತ್ರ ಮಾನದಂಡಗಳಿಗೆ ಅನುಗುಣವಾಗಿದೆ.',
    te: 'వెర్రా VM0047 ARR మరియు IPCC AFOLU టైర్-1 & 2 అకౌంటింగ్ ప్రమాణాలకు అనుగుణంగా ఉంటుంది.'
  }
};

export const getAppString = (key: string, lang: Language): string => {
  return APP_VIEW_STRINGS[key]?.[lang] || APP_VIEW_STRINGS[key]?.['en'] || key;
};

// Aggregator Portal Translations across 5 languages
export const AGGREGATOR_STRINGS: Record<string, Record<Language, string>> = {
  activeEnrolledBanner: {
    en: 'Your Expressed Interest is Active in this Aggregator Hub!',
    ta: 'உங்கள் விருப்பப் பதிவு இந்த மையத்தில் நேரலையாக இணைக்கப்பட்டுள்ளது!',
    ml: 'നിങ്ങളുടെ താൽപ്പര്യ രജിസ്ട്രേഷൻ ഈ ഹബ്ബിൽ സജീവമാണ്!',
    kn: 'ನಿಮ್ಮ ಆಸಕ್ತಿಯ ನೋಂದಣಿಯು ಈ ಒಕ್ಕೂಟ ಹಬ್‌ನಲ್ಲಿ ಸಕ್ರಿಯವಾಗಿದೆ!',
    te: 'మీ ఆసక్తి నమోదు ఈ అగ్రిగేటర్ హబ్‌లో ప్రత్యక్షంగా ఉంది!'
  },
  liveParcelEnrolled: {
    en: 'Live Parcel Enrolled',
    ta: 'நேரலை நிலம் சேர்க்கப்பட்டது',
    ml: 'ഭൂമി രജിസ്റ്റർ ചെയ്തു',
    kn: 'ಜಮೀನು ನೋಂದಾಯಿಸಲಾಗಿದೆ',
    te: 'భూమి నమోదు చేయబడింది'
  },
  strategicArbitrage: {
    en: 'THE STRATEGIC GREENVEST ARBITRAGE',
    ta: 'கிரீன்வெஸ்ட் வணிக உத்தி',
    ml: 'ഗ്രീൻവെസ്റ്റ് തന്ത്രപ്രധാന ബിസിനസ്സ് മാതൃക',
    kn: 'ಗ್ರೀನ್‌ವೆಸ್ಟ್ ಕಾರ್ಯತಂತ್ರದ ಮಾದರಿ',
    te: 'గ్రీన్వెస్ట్ వ్యూహాత్మక బిజినెస్ మోడల్'
  },
  sloganQuote: {
    en: '“We don\'t sell you carbon credits. We tell you whether the project makes sense before you spend money.”',
    ta: '“நாங்கள் உங்களுக்கு கார்பன் வரவுகளை விற்பனை செய்வதில்லை. நீங்கள் பணத்தை செலவழிக்கும் முன் திட்டம் சாத்தியமானதா என்பதை நேர்மையாகக் கூறுகிறோம்.”',
    ml: '“ഞങ്ങൾ നിങ്ങൾക്ക് കാർബൺ ക്രെഡിറ്റുകൾ വിൽക്കുന്നില്ല. നിങ്ങൾ പണം ചെലവഴിക്കുന്നതിന് മുമ്പ് പദ്ധതി പ്രായോഗികമാണോ എന്ന് ഞങ്ങൾ സത്യസന്ധമായി വ്യക്തമാക്കുന്നു.”',
    kn: '“ನಾವು ನಿಮಗೆ ಕಾರ್ಬನ್ ಕ್ರೆಡಿಟ್‌ಗಳನ್ನು ಮಾರಾಟ ಮಾಡುವುದಿಲ್ಲ. ನೀವು ಹಣ ಖರ್ಚು ಮಾಡುವ ಮುನ್ನ ಯೋಜನೆ ಸೂಕ್ತವೇ ಎಂದು ನಾವು ಪ್ರಾಮಾಣಿಕವಾಗಿ ಹೇಳುತ್ತೇವೆ.”',
    te: '“మేము మీకు కార్బన్ క్రెడిట్లను విక్రయించము. మీరు డబ్బు ఖర్చు చేయడానికి ముందే ప్రాజెక్ట్ సాధ్యమేనా అని నిజాయితీగా తెలియజేస్తాము.”'
  },
  arbitrageExplanation: {
    en: 'By screening over 100,000 farmers with free, honest pre-feasibility assessments, GreenVest filters the top 20,000+ prime candidates. Project developers and carbon aggregators get pre-educated, pre-qualified farmer cohorts instead of spending millions finding and convincing individual farmers.',
    ta: 'இலவச மற்றும் வெளிப்படையான முன்-சாத்தியக்கூறு மதிப்பீடுகள் மூலம் 100,000க்கும் மேற்பட்ட விவசாயிகளை ஆய்வு செய்து, கிரீன்வெஸ்ட் அதில் முதல் 20,000+ சிறந்த நிலங்களை தேர்வு செய்கிறது. திட்ட உருவாக்குநர்கள் மற்றும் கார்பன் ஒருங்கிணைப்பாளர்கள் ஒவ்வொரு விவசாயியையும் தனித்தனியாக தேடி அலைவதற்குப் பதிலாக, ஏற்கனவே தயாராக உள்ள தகுதியான விவசாயக் குழுக்களை நேரடியாகப் பெறுகின்றனர்.',
    ml: 'സൗജന്യവും സത്യസന്ധവുമായ മുൻകൂർ പരിശോധനകളിലൂടെ 1,00,000-ത്തിലധികം കർഷകരെ വിലയിരുത്തി, ഗ്രീൻവെസ്റ്റ് മുൻനിരയിലുള്ള 20,000+ മികച്ച സ്ഥാനാർത്ഥികളെ തിരഞ്ഞെടുക്കുന്നു. ഓരോ കർഷകരെയും തേടി ലക്ഷങ്ങൾ ചെലവഴിക്കുന്നതിന് പകരം, പ്രോജക്ട് ഡെവലപ്പർമാർക്ക് മുൻകൂട്ടി യോഗ്യത നേടിയ കർഷക കൂട്ടായ്മകളെ നേരിട്ട് ലഭിക്കുന്നു.',
    kn: 'ಉಚಿತ ಮತ್ತು ಪ್ರಾಮಾಣಿಕ ಪೂರ್ವ-ಕಾರ್ಯಸಾಧ್ಯತಾ ಮೌಲ್ಯಮಾಪನಗಳ ಮೂಲಕ 1,00,000 ಕ್ಕೂ ಹೆಚ್ಚು ರೈತರನ್ನು ಪರೀಕ್ಷಿಸಿ, ಗ್ರೀನ್‌ವೆಸ್ಟ್ ಅಗ್ರ 20,000+ ಅತ್ಯುತ್ತಮ ಅಭ್ಯರ್ಥಿಗಳನ್ನು ಆಯ್ಕೆ ಮಾಡುತ್ತದೆ. ಯೋಜನೆ ಅಭಿವೃದ್ಧಿಕಾರರು ಪ್ರತಿಯೊಬ್ಬ ರೈತರನ್ನು ಹುಡುಕುವ ಬದಲು ಪೂರ್ವಭಾವಿಯಾಗಿ ಅರ್ಹತೆ ಪಡೆದ ರೈತ ಸಮೂಹವನ್ನು ಪಡೆಯುತ್ತಾರೆ.',
    te: 'ఉచిత మరియు నిష్పాక్షికమైన ముందస్తు పరిశీలనల ద్వారా 1,00,000 మందికి పైగా రైతులను విశ్లేషించి, గ్రీన్వెస్ట్ టాప్ 20,000+ ఉత్తమ అభ్యర్థులను ఎంపిక చేస్తుంది. ప్రతి రైతు కోసం లక్షలు ఖర్చు చేసే బదులు, ప్రాజెక్ట్ డెవలపర్లు ముందే అర్హత సాధించిన రైతు బృందాలను నేరుగా పొందుతారు.'
  },
  zeroUpfrontFarmerFee: {
    en: 'Zero Upfront Farmer Fee (100% Free)',
    ta: 'விவசாயிகளுக்கு ₹0 முன்கூட்டிய கட்டணம் (100% இலவசம்)',
    ml: 'കർഷകർക്ക് മുൻകൂർ ഫീസ് ഇല്ല (100% സൗജന്യം)',
    kn: 'ರೈತರಿಗೆ ಯಾವುದೇ ಮುಂಗಡ ಶುಲ್ಕವಿಲ್ಲ (100% ಉಚಿತ)',
    te: 'రైతులకు ముందస్తు రుసుము లేదు (100% ఉచితం)'
  },
  preOriginatedClusters: {
    en: 'Pre-Originated Farmer Clusters',
    ta: 'முன்-சான்றளிக்கப்பட்ட விவசாயக் குழுமங்கள்',
    ml: 'മുൻകൂട്ടി രൂപീകരിച്ച കർഷക ക്ലസ്റ്ററുകൾ',
    kn: 'ಪೂರ್ವ-ಸಿದ್ಧಪಡಿಸಿದ ರೈತ ಸಮೂಹಗಳು',
    te: 'ముందే సిద్ధం చేసిన రైతు క్లస్టర్లు'
  },
  directFpoLinkage: {
    en: 'Direct FPO & Land Record Integration',
    ta: 'நேரடி FPO மற்றும் நில ஆவண இணைப்பு',
    ml: 'നേരിട്ടുള്ള FPO & ഭൂമി രേഖ സംയോജനം',
    kn: 'ನೇರ FPO ಮತ್ತು ಭೂದಾಖಲೆಗಳ ಸಂಯೋಜನೆ',
    te: 'నేరుగా FPO మరియు భూ రికార్డుల అనుసంధానం'
  },
  filterByState: {
    en: 'Filter by State:',
    ta: 'மாநில வாரியாக வடிகட்டு:',
    ml: 'സംസ്ഥാനം തിരഞ്ഞെടുക്കുക:',
    kn: 'ರಾಜ್ಯವಾರು ಆಯ್ಕೆ:',
    te: 'రాష్ట్రాల వారీగా:'
  },
  allStates: {
    en: 'All South Indian States',
    ta: 'அனைத்து தென் மாநிலங்கள்',
    ml: 'എല്ലാ ദക്ഷിണേന്ത്യൻ സംസ്ഥാനങ്ങളും',
    kn: 'ಎಲ್ಲಾ ದಕ್ಷಿಣ ಭಾರತದ ರಾಜ್ಯಗಳು',
    te: 'అన్ని దక్షిణ భారత రాష్ట్రాలు'
  },
  requestOriginationPack: {
    en: 'Request Origination Pack',
    ta: 'திட்ட ஆவண பேக் கோரிக்கை',
    ml: 'പദ്ധതി രേഖാ പാക്കേജ് അഭ്യർത്ഥിക്കുക',
    kn: 'ಯೋಜನಾ ದಾಖಲಾತಿ ಪ್ಯಾಕ್ ವಿನಂತಿಸಿ',
    te: 'ప్రాజెక్ట్ డాక్యుమెంట్ ప్యాక్ అభ్యర్థించండి'
  },
  qualifiedCohortDirectory: {
    en: 'Qualified Farmer Cohort Directory',
    ta: 'தகுதியான விவசாய நிலப் பதிவேடு',
    ml: 'യോഗ്യത നേടിയ കർഷക രജിസ്ട്രി',
    kn: 'ಅರ್ಹ ರೈತ ನೋಂದಣಿ ಡೈರೆಕ್ಟರಿ',
    te: 'అర్హత పొందిన రైతు రిజిస్ట్రీ'
  },
  searchFarmersPlaceholder: {
    en: 'Search by District, Farmer ID, or Species...',
    ta: 'மாவட்டம், பதிவு எண், அல்லது மர வகை மூலம் தேடு...',
    ml: 'ജില്ല, ഐഡി, അല്ലെങ്കിൽ മരങ്ങൾ അനുസരിച്ച് തിരയുക...',
    kn: 'ಜಿಲ್ಲೆ, ರೈತ ಐಡಿ, ಅಥವಾ ಮರದ ಪ್ರಕಾರ ಹುಡುಕಿ...',
    te: 'జిల్లా, రైతు ఐడి, లేదా చెట్ల రకాల ద్వారా శోధించండి...'
  }
};

export const getAggregatorString = (key: string, lang: Language): string => {
  return AGGREGATOR_STRINGS[key]?.[lang] || AGGREGATOR_STRINGS[key]?.['en'] || key;
};

// PDF & Export Strings across 5 languages
export const PDF_STRINGS: Record<string, Record<Language, string>> = {
  savePdf: {
    en: 'Save PDF (.pdf)',
    ta: 'PDF சேமிக்க (.pdf)',
    ml: 'PDF സേവ് ചെയ്യുക (.pdf)',
    kn: 'PDF ಉಳಿಸಿ (.pdf)',
    te: 'PDF సేవ్ చేయండి (.pdf)'
  },
  downloadPdfShort: {
    en: 'Download PDF',
    ta: 'PDF பதிவிறக்கு',
    ml: 'PDF ഡൗൺലോഡ്',
    kn: 'PDF ಡೌನ್‌ಲೋಡ್',
    te: 'PDF డౌన్‌లోడ్'
  },
  generatingPdf: {
    en: 'Generating High-Res PDF...',
    ta: 'PDF உருவாக்கப்படுகிறது...',
    ml: 'PDF തയ്യാറാക്കുന്നു...',
    kn: 'PDF ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ...',
    te: 'PDF తయారుచేయబడుతోంది...'
  },
  pdfSaved: {
    en: 'PDF Saved!',
    ta: 'PDF சேமிக்கப்பட்டது!',
    ml: 'PDF സേവ് ചെയ്തു!',
    kn: 'PDF ಉಳಿಸಲಾಗಿದೆ!',
    te: 'PDF సేవ్ అయింది!'
  },
  printDirect: {
    en: 'Print / Paper Copy',
    ta: 'அச்சிடுக / தாள் நகல்',
    ml: 'പ്രിന്റ് ചെയ്യുക',
    kn: 'ಮುದ್ರಿಸಿ',
    te: 'ముద్రించండి'
  },
  downloadHtml: {
    en: 'Offline HTML (.html)',
    ta: 'ஆஃப்லைன் HTML (.html)',
    ml: 'ഓഫ്‌ലൈൻ HTML (.html)',
    kn: 'ಆಫ್‌ಲೈನ್ HTML (.html)',
    te: 'ఆఫ్‌లైన్ HTML (.html)'
  },
  pdfTip: {
    en: 'Instant PDF export: Saved directly into your downloads folder with Verra VM0047 & ICAR calculations.',
    ta: 'உடனடி PDF சேமிப்பு: வெர்ரா VM0047 மற்றும் ICAR கணக்கீடுகளுடன் நேரடியாக உங்கள் சாதனத்தில் சேமிக்கப்படும்.',
    ml: 'തൽക്ഷണ PDF സേവ്: വെറ VM0047, ICAR കണക്കുകൂട്ടലുകളോടെ നിങ്ങളുടെ ഉപകരണത്തിലേക്ക് നേരിട്ട് സേവ് ചെയ്യപ്പെടും.',
    kn: 'ತತ್‌ಕ್ಷಣ PDF ರಫ್ತು: ವೆರ್ರಾ VM0047 ಮತ್ತು ICAR ಲೆಕ್ಕಾಚಾರಗಳೊಂದಿಗೆ ನೇರವಾಗಿ ನಿಮ್ಮ ಡೌನ್‌ಲೋಡ್ ಫೋಲ್ಡರ್‌ಗೆ ಉಳಿಯುತ್ತದೆ.',
    te: 'తక్షణ PDF ఎగుమతి: వెర్రా VM0047 మరియు ICAR లెక్కలతో నేరుగా మీ డౌన్‌లోడ్స్ ఫోల్డర్‌లో సేవ్ చేయబడుతుంది.'
  }
};

export const getPdfString = (key: string, lang: Language): string => {
  return PDF_STRINGS[key]?.[lang] || PDF_STRINGS[key]?.['en'] || key;
};
