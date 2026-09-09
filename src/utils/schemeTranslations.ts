import { Language } from './translations';
import { jsPDF } from 'jspdf';
import { triggerPdfDownload } from './pdfGenerator';
import { FarmerProfile, FarmerPlot, FarmerInputs, MatchedSchemeResult } from '../types/greenvest';

export const SCHEMES_UI_TRANSLATIONS: Record<string, Record<Language, string>> = {
  // Badges & Context
  centralAndStateBadge: {
    en: '& Central Schemes',
    ta: '& மத்திய அரசு திட்டங்கள்',
    ml: '& കേന്ദ്ര സർക്കാർ പദ്ധതികൾ',
    kn: '& ಕೇಂದ್ರ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು',
    te: '& కేంద్ర ప్రభుత్వ పథకాలు'
  },
  targetPlot: {
    en: 'Plot',
    ta: 'நிலம்',
    ml: 'പ്ലോട്ട്',
    kn: 'ಜಮೀನು',
    te: 'భూమి'
  },
  acresUnit: {
    en: 'Acres',
    ta: 'ஏக்கர்',
    ml: 'ഏക്കർ',
    kn: 'ಎಕರೆ',
    te: 'ఎకరాలు'
  },
  waterRainfed: {
    en: 'Rainfed',
    ta: 'மானாவாரி',
    ml: 'മഴാശ്രയം',
    kn: 'ಮಳೆಯಾಶ್ರಿತ',
    te: 'వర్షాధార'
  },
  waterModerate: {
    en: 'Moderate (Borewell / Canal)',
    ta: 'மிதமான நீர் (போர்வெல் / வாய்க்கால்)',
    ml: 'മിതമായ വെള്ളം (ബോർവെൽ / കനാൽ)',
    kn: 'ಮಧ್ಯಮ ನೀರು (ಬೋರ್‌ವೆಲ್ / ಕಾಲುವೆ)',
    te: 'మధ్యస్థ నీరు (బోర్‌వెల్ / కాలువ)'
  },
  waterAbundant: {
    en: 'Abundant (River / Perennial)',
    ta: 'அதிக நீர் (ஆறு / வற்றாத நீர்)',
    ml: 'ധാരാളം വെള്ളം (നദി / വറ്റാത്ത ജലം)',
    kn: 'ಸಮೃದ್ಧ ನೀರು (ನದಿ / ನಿರಂತರ ನೀರು)',
    te: 'సమృద్ధిగా నీరు (నది / జీవనది)'
  },

  // Metric box
  estTotalSubsidies: {
    en: 'Est. Total Subsidies for Plot',
    ta: 'மதிப்பிடப்பட்ட மொத்த மானியம்',
    ml: 'പ്ലോട്ടിനായുള്ള ആകെ സബ്‌സിഡി',
    kn: 'ಜಮೀನಿಗೆ ಅಂದಾಜು ಒಟ್ಟು ಸಬ್ಸಿಡಿ',
    te: 'భూమికి అంచనా వేసిన మొత్తం రాయితీ'
  },
  activeSchemesMatched: {
    en: 'active schemes matched',
    ta: 'அரசு திட்டங்கள் தகுதி பெற்றுள்ளன',
    ml: 'പദ്ധതികൾ ലഭ്യമാണ്',
    kn: 'ಯೋಜನೆಗಳು ಲಭ್ಯವಿವೆ',
    te: 'పథకాలు సరిపోలాయి'
  },
  stateTag: {
    en: 'State',
    ta: 'மாநிலம்',
    ml: 'സംസ്ഥാനം',
    kn: 'ರಾಜ್ಯ',
    te: 'రాష్ట్ర'
  },
  centralTag: {
    en: 'Central',
    ta: 'மத்திய',
    ml: 'കേന്ദ്ര',
    kn: 'ಕೇಂದ್ರ',
    te: 'కేంద్ర'
  },

  // Action button
  savePdfButton: {
    en: 'Save PDF (.pdf)',
    ta: 'PDF சேமிக்க (.pdf)',
    ml: 'PDF സേവ് ചെയ്യുക (.pdf)',
    kn: 'PDF ಉಳಿಸಿ (.pdf)',
    te: 'PDF సేవ్ చేయండి (.pdf)'
  },
  savingPdf: {
    en: 'Saving PDF...',
    ta: 'PDF உருவாகிறது...',
    ml: 'PDF തയാറാക്കുന്നു...',
    kn: 'PDF ಸಿದ್ಧವಾಗುತ್ತಿದೆ...',
    te: 'PDF సిద్ధమవుతోంది...'
  },
  savedPdfToast: {
    en: 'Official Government Schemes PDF downloaded successfully!',
    ta: 'அதிகாரப்பூர்வ அரசு திட்டங்கள் PDF வெற்றிகரமாக பதிவிறக்கப்பட்டது!',
    ml: 'ഔദ്യോഗിക സർക്കാർ പദ്ധതികളുടെ PDF വിജയകരമായി ഡൗൺലോഡ് ചെയ്തു!',
    kn: 'ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ PDF ಯಶಸ್ವಿಯಾಗಿ ಡೌನ್‌ಲೋಡ್ ಆಗಿದೆ!',
    te: 'అధికారిక ప్రభుత్వ పథకాల PDF విజయవంతంగా డౌన్‌లోడ్ చేయబడింది!'
  },

  // Navigation Filter Tabs
  allSchemesTab: {
    en: 'All Registered Schemes',
    ta: 'அனைத்து திட்டங்களும்',
    ml: 'എല്ലാ പദ്ധതികളും',
    kn: 'ಎಲ್ಲಾ ಯೋಜನೆಗಳು',
    te: 'అన్ని పథకాలు'
  },
  stateGovtTab: {
    en: 'State Govt',
    ta: 'மாநில அரசு',
    ml: 'സംസ്ഥാന സർക്കാർ',
    kn: 'ರಾಜ್ಯ ಸರ್ಕಾರ',
    te: 'రాష్ట్ర ప్రభుత్వం'
  },
  centralGovtTab: {
    en: 'Central Govt Schemes',
    ta: 'மத்திய அரசு திட்டங்கள்',
    ml: 'കേന്ദ്ര സർക്കാർ പദ്ധതികൾ',
    kn: 'ಕೇಂದ್ರ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು',
    te: 'కేంద్ర ప్రభుత్వ పథకాలు'
  },

  // Category Filter
  categoryLabel: {
    en: 'Category:',
    ta: 'பிரிவு:',
    ml: 'വിഭാഗം:',
    kn: 'ವರ್ಗ:',
    te: 'వర్గం:'
  },
  allCategories: {
    en: 'All Categories',
    ta: 'அனைத்து பிரிவுகளும்',
    ml: 'എല്ലാ വിഭാഗങ്ങളും',
    kn: 'ಎಲ್ಲಾ ವರ್ಗಗಳು',
    te: 'అన్ని వర్గాలు'
  },

  // Card items
  centralGovtPanIndia: {
    en: 'Central Govt (Pan-India)',
    ta: 'மத்திய அரசு (இந்தியா முழுவதும்)',
    ml: 'കേന്ദ്ര സർക്കാർ (പാൻ-ഇന്ത്യ)',
    kn: 'ಕೇಂದ್ರ ಸರ್ಕಾರ (ಭಾರತಾದ್ಯಂತ)',
    te: 'కేంద్ర ప్రభుత్వం (భారతదేశవ్యాప్తంగా)'
  },
  matchScoreText: {
    en: 'Match',
    ta: 'பொருத்தம்',
    ml: 'അനുയോജ്യം',
    kn: 'ಹೊಂದಾಣಿಕೆ',
    te: 'సరిపోలిక'
  },
  estSubsidyForPlot: {
    en: 'Estimated Subsidy for Plot',
    ta: 'உங்கள் நிலத்திற்கான மானிய உதவி',
    ml: 'ഭൂമിക്കായുള്ള കണക്കാക്കിയ സബ്‌സിഡി',
    kn: 'ಜಮೀನಿಗೆ ಅಂದಾಜು ಸಬ್ಸಿಡಿ ಮೊತ್ತ',
    te: 'భూమికి అంచనా వేసిన రాయితీ సహాయం'
  },
  areaLabel: {
    en: 'Area',
    ta: 'பரப்பளவு',
    ml: 'വിസ്തീർണ്ണം',
    kn: 'ವಿಸ್ತೀರ್ಣ',
    te: 'విస్తీర్ణం'
  },
  acShort: {
    en: 'ac',
    ta: 'ஏக்கர்',
    ml: 'ഏക്കർ',
    kn: 'ಎಕರೆ',
    te: 'ఎకరాలు'
  },
  whyMatchesTitle: {
    en: 'Why this matches your registered plot:',
    ta: 'பொருந்துவதற்கான காரணம்:',
    ml: 'നിങ്ങളുടെ ഭൂമിക്ക് അനുയോജ്യമായ കാരണം:',
    kn: 'ನಿಮ್ಮ ಜಮೀನಿಗೆ ಹೊಂದಾಣಿಕೆಯಾಗುವ ಕಾರಣ:',
    te: 'మీ భూమికి ఇది వర్తించే కారణం:'
  },
  applicationPortalLabel: {
    en: 'Application Portal:',
    ta: 'அதிகாரப்பூர்வ போர்டல்:',
    ml: 'അപേക്ഷാ പോർട്ടൽ:',
    kn: 'ಅರ್ಜಿ ಪೋರ್ಟಲ್:',
    te: 'దరఖాస్తు పోర్టల్:'
  },
  showLess: {
    en: 'Show Less',
    ta: 'சுருக்குக',
    ml: 'കുറയ്ക്കുക',
    kn: 'ಕಡಿಮೆ ತೋರಿಸಿ',
    te: 'తక్కువ చూపు'
  },
  howToApplyAndDetails: {
    en: 'How to Apply & Details',
    ta: 'விண்ணப்பிக்கும் முறை & விவரங்கள்',
    ml: 'അപേക്ഷിക്കേണ്ട രീതിയും വിവരങ്ങളും',
    kn: 'ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ವಿಧಾನ ಮತ್ತು ವಿವರಗಳು',
    te: 'దరఖాస్తు విధానం మరియు వివరాలు'
  },
  keyHighlightsTitle: {
    en: 'Key Highlights & Scheme Benefits',
    ta: 'முக்கிய நன்மைகள் & சிறப்பம்சங்கள்',
    ml: 'പ്രധാന നേട്ടങ്ങളും സവിശേഷതകളും',
    kn: 'ಪ್ರಮುಖ ಮುಖ್ಯಾಂಶಗಳು ಮತ್ತು ಸೌಲಭ್ಯಗಳು',
    te: 'ముఖ్య ప్రయోజనాలు మరియు ముఖ్యాంశాలు'
  },
  applicationStepsTitle: {
    en: 'Step-by-Step Application Steps',
    ta: 'படிமுறை விண்ணப்ப வழிகாட்டல்',
    ml: 'ഘട്ടം ഘട്ടമായുള്ള അപേക്ഷാ രീതി',
    kn: 'ಹಂತ ಹಂತದ ಅರ್ಜಿ ಮಾರ್ಗದರ್ಶಿ',
    te: 'దశలవారీగా దరఖాస్తు విధానం'
  },
  requiredDocsTitle: {
    en: 'Required Documents',
    ta: 'தேவையான ஆவணங்கள்',
    ml: 'ആവശ്യമായ രേഖകൾ',
    kn: 'ಅಗತ್ಯ ದಾಖಲೆಗಳು',
    te: 'అవసరమైన పత్రాలు'
  },
  recordsCount: {
    en: 'Records',
    ta: 'ஆவணங்கள்',
    ml: 'രേഖകൾ',
    kn: 'ದಾಖಲೆಗಳು',
    te: 'పత్రాలు'
  },
  docsSubmissionNote: {
    en: 'Official documents to present during application submission:',
    ta: 'அரசு இணையதளம் அல்லது வட்டார அலுவலகத்தில் சமர்ப்பிக்க வேண்டிய ஆவணங்கள்:',
    ml: 'അപേക്ഷ സമർപ്പിക്കുമ്പോൾ ഹാജരാക്കേണ്ട ഔദ്യോഗിക രേഖകൾ:',
    kn: 'ಅರ್ಜಿ ಸಲ್ಲಿಸುವಾಗ ಹಾಜರುಪಡಿಸಬೇಕಾದ ಅಧಿಕೃತ ದಾಖಲೆಗಳು:',
    te: 'దరఖాస్తు సమర్పించేటప్పుడు సమర్పించాల్సిన అధికారిక పత్రాలు:'
  },
  officialHelplineLabel: {
    en: 'Official Helpline:',
    ta: 'அரசு உதவி எண்:',
    ml: 'സഹായ നമ്പർ:',
    kn: 'ಅಧಿಕೃತ ಸಹಾಯವಾಣಿ:',
    te: 'అధికారిక హెల్ప్‌లైన్:'
  },
  openPortalPrefix: {
    en: 'Open',
    ta: 'திறக்குக',
    ml: 'തുറക്കുക',
    kn: 'ತೆರೆಯಿರಿ',
    te: 'తెరవండి'
  },
  applyOnPortal: {
    en: 'Apply on Official Portal',
    ta: 'அரசு தளத்தில் விண்ணப்பிக்க',
    ml: 'ഔദ്യോഗിക പോർട്ടലിൽ അപേക്ഷിക്കുക',
    kn: 'ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ನಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ',
    te: 'అధికారిక పోర్టల్‌లో దరఖాస్తు చేసుకోండి'
  },

  // Empty state
  noSchemesFound: {
    en: 'No schemes found matching the selected filter.',
    ta: 'தேர்ந்தெடுக்கப்பட்ட பிரிவில் திட்டங்கள் எதுவும் இல்லை.',
    ml: 'തിരഞ്ഞെടുത്ത വിഭാഗത്തിൽ പദ്ധതികളൊന്നും ലഭ്യമല്ല.',
    kn: 'ಆಯ್ಕೆಮಾಡಿದ ವರ್ಗದಲ್ಲಿ ಯಾವುದೇ ಯೋಜನೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ.',
    te: 'ఎంచుకున్న విభాగంలో ఎటువంటి పథకాలు కనుగొనబడలేదు.'
  },
  tryResettingFilters: {
    en: 'Try selecting "All Categories" or another jurisdiction tab to view eligible schemes.',
    ta: 'தகுதியான திட்டங்களைக் காண "அனைத்து பிரிவுகளும்" என்பதைத் தேர்ந்தெடுக்கவும்.',
    ml: 'ലഭ്യമായ പദ്ധതികൾ കാണുന്നതിന് "എല്ലാ വിഭാഗങ്ങളും" തിരഞ്ഞെടുക്കുക.',
    kn: 'ಲಭ್ಯವಿರುವ ಯೋಜನೆಗಳನ್ನು ನೋಡಲು "ಎಲ್ಲಾ ವರ್ಗಗಳು" ಆಯ್ಕೆಮಾಡಿ.',
    te: 'అర్హతగల పథకాలను చూడటానికి "అన్ని వర్గాలు" ఎంచుకోండి.'
  },
  resetFiltersButton: {
    en: 'Reset Filters',
    ta: 'வடிகட்டிகளை மீட்டமைக்க',
    ml: 'ഫിൽട്ടറുകൾ റീസെറ്റ് ചെയ്യുക',
    kn: 'ಫಿಲ್ಟರ್‌ಗಳನ್ನು ಮರುಹೊಂದಿಸಿ',
    te: 'ఫిల్టర్‌లను రీసెట్ చేయండి'
  },

  // Co-financing guarantee
  coFinancingTitle: {
    en: 'Direct Subsidy + Carbon Income Co-Financing Guarantee:',
    ta: 'விவசாயிகளுக்கு இரட்டிப்பு பலன் (Co-Financing):',
    ml: 'നേരിട്ടുള്ള സബ്‌സിഡിയും കാർബൺ വരുമാനവും (കോ-ഫിനാൻസിംഗ് ഉറപ്പ്):',
    kn: 'ನೇರ ಸಬ್ಸಿಡಿ ಮತ್ತು ಕಾರ್ಬನ್ ಆದಾಯ (ಸಹ-ಹಣಕಾಸು ಭರವಸೆ):',
    te: 'ప్రత్యక్ష రాయితీ మరియు కార్బన్ ఆదాయం (సహ-ఆర్థిక సహాయ హామీ):'
  }
};

export const getSchemeString = (key: string, lang: Language): string => {
  return SCHEMES_UI_TRANSLATIONS[key]?.[lang] || SCHEMES_UI_TRANSLATIONS[key]?.en || key;
};

// Category translations
export const CATEGORY_TRANSLATIONS: Record<string, Record<Language, string>> = {
  'Micro-Irrigation & Drip': {
    en: 'Micro-Irrigation & Drip',
    ta: 'சொட்டுநீர் & நுண்பாசனம்',
    ml: 'സൂക്ഷ്മ ജലസേചനവും തുള്ളിനനയും',
    kn: 'ಹನಿ ಮತ್ತು ಸೂಕ್ಷ್ಮ ನೀರಾವರಿ',
    te: 'సూక్ష్మ మరియు డ్రిప్ సేద్యం'
  },
  'Solar Energy & Pumping': {
    en: 'Solar Energy & Pumping',
    ta: 'சூரிய சக்தி மோட்டார் பம்ப்',
    ml: 'സൗരോർജ്ജ പമ്പിംഗ്',
    kn: 'ಸೌರಶಕ್ತಿ ಮತ್ತು ಪಂಪ್ ವ್ಯವಸ್ಥೆ',
    te: 'సౌర శక్తి మరియు పంపింగ్'
  },
  'Direct Tree Cash Incentive (DBT)': {
    en: 'Direct Tree Cash Incentive (DBT)',
    ta: 'மர வளர்ப்பு நேரடி மானியம் (DBT)',
    ml: 'നേരിട്ടുള്ള മര ധനസഹಾಯം (DBT)',
    kn: 'ನೇರ ಮರ ನಗದು ಪ್ರೋತ್ಸಾಹ (DBT)',
    te: 'నేరుగా చెట్ల నగదు ప్రోత్సాహకం (DBT)'
  },
  'Organic & Soil Regeneration': {
    en: 'Organic & Soil Regeneration',
    ta: 'இயற்கை & மண் மேம்பாடு',
    ml: 'ജൈവ & മണ്ണ് പുനരുജ്ജീവനം',
    kn: 'ಸಾವಯವ & ಮಣ್ಣು ಪುನಶ್ಚೇತನ',
    te: 'సేంద్రీయ & నేల పునరుద్ధరణ'
  },
  'Bamboo & Fast Biomass': {
    en: 'Bamboo & Fast Biomass',
    ta: 'மூங்கில் & பயோமாஸ் சாகுபடி',
    ml: 'മുളയും ബയോമാസ് കൃഷിയും',
    kn: 'ಬಿದಿರು ಮತ್ತು ಜೈವಿಕ ಇಂಧನ ಬೆಳೆ',
    te: 'వెదురు మరియు బయోమాస్ సాగు'
  },
  'Plantation & Sapling Subsidy': {
    en: 'Plantation & Sapling Subsidy',
    ta: 'மரக்கன்று & நடவு மானியம்',
    ml: 'തൈകളും നടീൽ സബ്‌സിഡിയും',
    kn: 'ಗಿಡ ನೆಡುವಿಕೆ ಮತ್ತು ಸಸಿ ಸಬ್ಸಿಡಿ',
    te: 'మొక్కలు నాటడం మరియు రాయితీ'
  }
};

export const getLocalizedCategory = (cat: string, lang: Language): string => {
  return CATEGORY_TRANSLATIONS[cat]?.[lang] || cat;
};

// Subsidy Type Translations
export const SUBSIDY_TYPE_TRANSLATIONS: Record<string, Record<Language, string>> = {
  'Direct Benefit Transfer (DBT)': {
    en: 'Direct Benefit Transfer (DBT)',
    ta: 'வங்கி கணக்கில் நேரடி மானியம் (DBT)',
    ml: 'നേരിട്ടുള്ള ആനുകൂല്യ കൈമാറ്റം (DBT)',
    kn: 'ನೇರ ನಗದು ವರ್ಗಾವಣೆ (DBT)',
    te: 'ప్రత్యక్ష ప్రయోజన బదిలీ (DBT)'
  },
  'Upfront Capital Subsidy': {
    en: 'Upfront Capital Subsidy',
    ta: 'முன்கூட்டியே கழிவு செய்யப்படும் மூலதன மானியம்',
    ml: 'മുൻകൂർ മൂലധന സബ്‌സിഡി',
    kn: 'ಮುಂಗಡ ಬಂಡವಾಳ ಸಬ್ಸಿಡಿ',
    te: 'ముందస్తు మూలధన రాయితీ'
  },
  'State Treasury DBT': {
    en: 'State Treasury DBT',
    ta: 'மாநில கருவூல நேரடி வரவு (DBT)',
    ml: 'സംസ്ഥാന ട്രഷറി DBT',
    kn: 'ರಾಜ್ಯ ಖಜಾನೆ DBT',
    te: 'రాష్ట్ర ఖజానా DBT'
  },
  'Institutional Procurement Contract': {
    en: 'Institutional Procurement Contract',
    ta: 'நிறுவன கொள்முதல் உத்தரவாதம்',
    ml: 'സ്ഥാപനപരമായ സംഭരണ കരാർ',
    kn: 'ಸಾಂಸ್ಥಿಕ ಖರೀದಿ ಒಪ್ಪಂದ',
    te: 'సంస్థాగత కొనుగోలు ఒప్పందం'
  },
  'Central & State Joint DBT': {
    en: 'Central & State Joint DBT',
    ta: 'மத்திய & மாநில கூட்டு மானியம் (DBT)',
    ml: 'കേന്ദ്ര-സംസ്ഥാന സംയുക്ത DBT',
    kn: 'ಕೇಂದ್ರ ಮತ್ತು ರಾಜ್ಯ ಜಂಟಿ DBT',
    te: 'కేంద్ర & రాష్ట్ర ఉమ్మడి DBT'
  },
  'Direct Account Credit': {
    en: 'Direct Account Credit',
    ta: 'நேரடி வங்கிக் கணக்கு வரவு',
    ml: 'നേരിട്ട് അക്കൗണ്ടിലേക്ക്',
    kn: 'ನೇರ ಖಾತೆಗೆ ಜಮೆ',
    te: 'నేరుగా ఖాతాలో జమ'
  },
  'Free In-Kind Distribution': {
    en: 'Free In-Kind Distribution',
    ta: 'இலவச நேரடி கன்று வழங்கல்',
    ml: 'സൗജന്യ തൈ വിതരണം',
    kn: 'ಉಚಿತ ಸಸಿ ವಿತರಣೆ',
    te: 'ఉచిత మొక్కల పంపిణీ'
  },
  'Direct Tree Incentives': {
    en: 'Direct Tree Incentives',
    ta: 'நேரடி மர வளர்ப்பு ஊக்கத்தொகை',
    ml: 'നേരിട്ടുള്ള വൃക്ഷ പ്രോത്സാഹന തുക',
    kn: 'ನೇರ ಮರ ಪ್ರೋತ್ಸಾಹ ಧನ',
    te: 'నేరుగా చెట్ల ప్రోత్సాహకం'
  }
};

export const getLocalizedSubsidyType = (type: string, lang: Language): string => {
  return SUBSIDY_TYPE_TRANSLATIONS[type]?.[lang] || type;
};

// Translates dynamic match reasons
export const translateMatchReason = (reason: string, lang: Language, stateName: string): string => {
  if (lang === 'en') return reason;

  if (reason.includes('Direct state alignment')) {
    switch (lang) {
      case 'ta': return `${stateName} மாநில நிலத்திற்கு நேரடி முன்னுரிமை பொருந்துகிறது`;
      case 'ml': return `${stateName} സംസ്ഥാനത്തെ നിങ്ങളുടെ ഭൂമിക്ക് നേരിട്ടുള്ള മുൻഗണന`;
      case 'kn': return `${stateName} ರಾಜ್ಯದ ನಿಮ್ಮ ಜಮೀನಿಗೆ ನೇರ ಆದ್ಯತೆ`;
      case 'te': return `${stateName} రాష్ట్రంలోని మీ భూమికి ప్రత్యక్ష ప్రాధాನ್ಯత`;
    }
  }
  if (reason.includes('Pan-India Central Government scheme')) {
    switch (lang) {
      case 'ta': return `இந்தியா முழுவதும் உள்ள மத்திய அரசு திட்டம் (${stateName} உட்பட)`;
      case 'ml': return `പാൻ-ഇന്ത്യ കേന്ദ്ര സർക്കാർ പദ്ധതി (${stateName} ഉൾപ്പെടെ)`;
      case 'kn': return `ಭಾರತಾದ್ಯಂತ ಅನ್ವಯವಾಗುವ ಕೇಂದ್ರ ಯೋಜನೆ (${stateName} ಸೇರಿ)`;
      case 'te': return `భారతదేశవ్యాప్తంగా వర్తించే కేంద్ర పథకం (${stateName}తో సహా)`;
    }
  }
  if (reason.includes('priority Small & Marginal Farmer benefits')) {
    switch (lang) {
      case 'ta': return `சிறு/குறு விவசாயிகளுக்கான சிறப்பு 90%-100% மானிய தகுதி (<= 5 ஏக்கர்)`;
      case 'ml': return `ചെറുകിട-നാമമാത്ര കർഷകർക്കുള്ള മുൻഗണനാ ആനുകൂല്യം (<= 5 ഏക്കർ)`;
      case 'kn': return `ಸಣ್ಣ ಮತ್ತು ಅತಿ ಸಣ್ಣ ರೈತರ ಆದ್ಯತಾ ಸೌಲಭ್ಯಗಳಿಗೆ ಅರ್ಹತೆ (<= 5 ಎಕರೆ)`;
      case 'te': return `చిన్న మరియు సన్నకారు రైతులకు ప్రాధాన్యత ప్రయోజనాలు (<= 5 ఎకరాలు)`;
    }
  }
  if (reason.includes('commercial landholding')) {
    switch (lang) {
      case 'ta': return `விவசாய வணிக நிலப்பரப்புக்கான அதிகாரப்பூர்வ மானிய தகுதி`;
      case 'ml': return `വാണിജ്യ കൃഷിഭൂമിക്കുള്ള ഔദ്യോഗിക സബ്‌സിഡി അർഹത`;
      case 'kn': return `ವಾಣಿಜ್ಯ ಜಮೀನಿಗೆ ಅನ್ವಯವಾಗುವ ಸಬ್ಸಿಡಿ ಸೌಲಭ್ಯ`;
      case 'te': return `వాణిజ్య భూమికి వర్తించే అధికారిక రాయితీ అర్హత`;
    }
  }
  if (reason.includes('rainfed moisture constraints')) {
    switch (lang) {
      case 'ta': return `மானாவாரி நிலத்தின் ஈரப்பதம் மற்றும் தண்ணீர் பற்றாக்குறையை தீர்க்கும்`;
      case 'ml': return `മഴാശ്രയ ഭൂമിയിലെ ജലക്ഷാമം പരിഹരിക്കാൻ ഏറ്റവും അനുയോജ്യം`;
      case 'kn': return `ಮಳೆಯಾಶ್ರಿತ ಜಮೀನಿನ ತೇವಾಂಶದ ಕೊರತೆಯನ್ನು ನಿವಾರಿಸಲು ಸೂಕ್ತ`;
      case 'te': return `వర్షాధార భూములలో తేమ మరియు నీటి కొరతను తీర్చడానికి అనుకూలం`;
    }
  }
  if (reason.includes('moderate water availability')) {
    switch (lang) {
      case 'ta': return `மிதமான நீரை சிக்கனப்படுத்த சொட்டு நீர் பாசனம் மிக சிறந்தது`;
      case 'ml': return `മിതമായ ജലലഭ്യത കൃത്യമായ ജലസേചനത്തിലൂടെ പരമാവധി പ്രയോജനപ്പെടുത്തുന്നു`;
      case 'kn': return `ಮಧ್ಯಮ ನೀರಿನ ಲಭ್ಯತೆಯನ್ನು ಹನಿ ನೀರಾವರಿ ಮೂಲಕ ಅತ್ಯುತ್ತಮವಾಗಿ ಬಳಸುತ್ತದೆ`;
      case 'te': return `మధ్యస్థ నీటి లభ్యతను సూక్ష్మ సేద్యం ద్వారా సమర్థవంతంగా వినియోగిస్తుంది`;
    }
  }
  if (reason.includes('boundary and bund agroforestry')) {
    switch (lang) {
      case 'ta': return `நிலத்தின் வரப்புகள் மற்றும் எல்லைகளில் மரங்கள் நட பிரத்யேக திட்டம்`;
      case 'ml': return `പാടവരമ്പുകളിലും അതിരുകളിലും മരങ്ങൾ നടാൻ പ്രത്യേകമായി രൂപകൽപ്പന ചെയ്തത്`;
      case 'kn': return `ಜಮೀನಿನ ಬದುಗಳ ಮೇಲೆ ಮರ ಬೆಳೆಸಲು ವಿಶೇಷವಾಗಿ ರೂಪಿಸಲಾಗಿದೆ`;
      case 'te': return `భూమి గట్ల వెంబడి చెట్లు నాటడానికి ప్రత్యేకంగా రూపొందించబడింది`;
    }
  }
  if (reason.includes('rapid biomass production')) {
    switch (lang) {
      case 'ta': return `வேகமாக வளரும் பயோமாஸ் மரங்கள் மற்றும் கார்பன் வருமானத்திற்கு உகந்தது`;
      case 'ml': return `വേഗത്തിൽ വളരുന്ന ബയോമാസ് മരങ്ങൾക്കും കാർബൺ വിളവെടുപ്പിനും അനുയോജ്യം`;
      case 'kn': return `ವೇಗವಾಗಿ ಬೆಳೆಯುವ ಜೈವಿಕ ಇಂಧನ ಮರಗಳು ಮತ್ತು ಕಾರ್ಬನ್ ಲಾಭಕ್ಕೆ ಅತ್ಯುತ್ತಮ`;
      case 'te': return `వేగంగా పెరిగే బయోమాస్ మరియు కార్బన్ ఆదాయానికి అత్యంత అనుకూలం`;
    }
  }
  if (reason.includes('high-value timber cultivation')) {
    switch (lang) {
      case 'ta': return `மதிப்புமிக்க மரங்கள் (சந்தனம், செம்மரம், தேக்கு) சாகுபடிக்கு ஏற்றது`;
      case 'ml': return `ഉയർന്ന മൂല്യമുള്ള തടി കൃഷിക്ക് (ചന്ദനം, രക്തചന്ദനം) ഏറ്റവും യോജിച്ചത്`;
      case 'kn': return `ಅಮೂಲ್ಯ ಮರಗಳ (ಶ್ರೀಗಂಧ, ರಕ್ತಚಂದನ) ಕೃಷಿಗೆ ಹೊಂದಾಣಿಕೆಯಾಗುತ್ತದೆ`;
      case 'te': return `విలువైన కలప (శ్రీగంధం, ఎర్రచందనం) సాగుకు అనుకూలం`;
    }
  }

  return reason;
};

// Document Name Translations
export const DOCUMENT_ITEM_TRANSLATIONS: Record<string, Record<Language, string>> = {
  'Aadhaar Card (Identity proof)': {
    en: 'Aadhaar Card (Identity proof)',
    ta: 'ஆதார் அட்டை (அடையாளச் சான்று)',
    ml: 'ആധാർ കാർഡ് (തിരിച്ചറിയൽ രേഖ)',
    kn: 'ಆಧಾರ್ ಕಾರ್ಡ್ (ಗುರುತಿನ ಚೀಟಿ)',
    te: 'ఆధార్ కార్డు (గుర్తింపు రుజువు)'
  },
  'Land Ownership Record (Patta / Chitta / RoR)': {
    en: 'Land Ownership Record (Patta / Chitta / RoR)',
    ta: 'நில உரிமை ஆவணம் (பட்டா / சிட்டா / RoR)',
    ml: 'ഭൂ ഉടമസ്ഥാവകാശ രേഖ (പട്ടയം / തണ്ടപ്പേര്)',
    kn: 'ಭೂ ಒಡೆತನ ದಾಖಲೆ (ಪಹಣಿ / ಆರ್‌ಟಿಸಿ / ಪಟ್ಟಾ)',
    te: 'భూ యాజమాన్య రికార్డు (పట్టాదారు పాస్‌బుక్ / 1-B)'
  },
  'Bank Passbook (Aadhaar linked for DBT transfer)': {
    en: 'Bank Passbook (Aadhaar linked for DBT transfer)',
    ta: 'வங்கி பாஸ்புக் (ஆதார் இணைக்கப்பட்ட கணக்கு)',
    ml: 'ബാങ്ക് പാസ്ബുക്ക് (ആധാറുമായി ബന്ധിപ്പിച്ച DBT അക്കൗണ്ട്)',
    kn: 'ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್ (ಡಿಬಿಟಿ ವರ್ಗಾವಣೆಗಾಗಿ ಆಧಾರ್ ಜೋಡಣೆ)',
    te: 'బ్యాంక్ పాస్‌బుక్ (DBT బదిలీ కోసం ఆధార్ అనుసంధానించబడింది)'
  },
  'Passport size photographs (2 copies)': {
    en: 'Passport size photographs (2 copies)',
    ta: 'பாஸ்போர்ட் அளவு புகைப்படங்கள் (2 பிரதிகள்)',
    ml: 'പാസ്‌പോർട്ട് സൈസ് ഫോട്ടോകൾ (2 എണ്ണം)',
    kn: 'ಪಾಸ್‌ಪೋರ್ಟ್ ಅಳತೆಯ ಭಾವಚಿತ್ರಗಳು (2 ಪ್ರತಿಗಳು)',
    te: 'పాస్‌పోర్ట్ సైజు ఫోటోలు (2 కాపీలు)'
  },
  'Geo-tagged boundary sketch / FMB map': {
    en: 'Geo-tagged boundary sketch / FMB map',
    ta: 'புவிக்குறியிடப்பட்ட எல்லை வரைபடம் / FMB வரைபடம்',
    ml: 'ജിയോ-ടാഗ് ചെയ്ത അതിർത്തി സ്കെച്ച് / FMB മാപ്പ്',
    kn: 'ಜಿಯೋ-ಟ್ಯಾಗ್ ಮಾಡಿದ ಗಡಿ ನಕ್ಷೆ / ಎಫ್‌ಎಂಬಿ ನಕ್ಷೆ',
    te: 'జియో-ట్యాగ్ చేసిన సరిహద్దు స్కెచ్ / FMB మ్యాప్'
  },
  'Land Title (Patta/Chitta/Pahani)': {
    en: 'Land Title (Patta/Chitta/Pahani)',
    ta: 'நில உரிமை பட்டா / சிட்டா ஆவணம்',
    ml: 'ഭൂ ഉടമസ്ഥാവകാശ രേഖ (പട്ടയം)',
    kn: 'ಭೂಮಿ ಹಕ್ಕು ದಾಖಲೆ (ಪಹಣಿ / ಆರ್‌ಟಿಸಿ)',
    te: 'భూమి హక్కు పత్రం (పట్టాదారు పాస్‌బుక్)'
  },
  'Water & Electricity Certificate / Well photo': {
    en: 'Water & Electricity Certificate / Well photo',
    ta: 'நீர் & மின் இணைப்பு சான்றிதழ் / கிணறு புகைப்படம்',
    ml: 'ജല-വൈദ്യുതി സർട്ടിഫിക്കറ്റ് / കിണറിന്റെ ഫോട്ടോ',
    kn: 'ನೀರು ಮತ್ತು ವಿದ್ಯುತ್ ಪ್ರಮಾಣಪತ್ರ / ಬಾವಿಯ ಭಾವಚಿತ್ರ',
    te: 'నీరు మరియు విద్యుత్ సర్టిఫికేట్ / బావి ఫోటో'
  },
  'Aadhaar Card and Mobile linked to Bank Account': {
    en: 'Aadhaar Card and Mobile linked to Bank Account',
    ta: 'வங்கியுடன் இணைக்கப்பட்ட ஆதார் மற்றும் மொபைல் எண்',
    ml: 'ബാങ്കുമായി ബന്ധിപ്പിച്ച ആധാറും മൊബൈൽ നമ്പറും',
    kn: 'ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಲಿಂಕ್ ಮಾಡಲಾದ ಆಧಾರ್ ಮತ್ತು ಮೊಬೈಲ್',
    te: 'బ్యాంక్ ఖాతాకు లింక్ చేయబడిన ఆధార్ మరియు మొబైల్'
  },
  'Soil & Water Test report copy': {
    en: 'Soil & Water Test report copy',
    ta: 'மண் மற்றும் பாசன நீர் பரிசோதனை அறிக்கை நகல்',
    ml: 'മണ്ണ്-ജല പരിശോധനാ റിപ്പോർട്ടിന്റെ പകർപ്പ്',
    kn: 'ಮಣ್ಣು ಮತ್ತು ನೀರಿನ ಪರೀಕ್ಷಾ ವರದಿಯ ಪ್ರತಿ',
    te: 'నేల మరియు నీటి పరీక్ష నివేదిక కాపీ'
  },
  'Aadhaar & Bank Passbook': {
    en: 'Aadhaar & Bank Passbook',
    ta: 'ஆதார் மற்றும் வங்கி பாஸ்புக்',
    ml: 'ആധാറും ബാങ്ക് പാസ്ബുക്കും',
    kn: 'ಆಧಾರ್ ಮತ್ತು ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್',
    te: 'ఆధార్ మరియు బ్యాంక్ పాస్‌బుక్'
  },
  'Land Possession Certificate (Patta / RoR)': {
    en: 'Land Possession Certificate (Patta / RoR)',
    ta: 'நில உடைமைச் சான்றிதழ் (பட்டா / RoR)',
    ml: 'കൈവശാവകാശ സർട്ടിഫിക്കറ്റ് (പട്ടയം)',
    kn: 'ಭೂ ಸ್ವಾಧೀನ ಪ್ರಮಾಣಪತ್ರ (ಪಹಣಿ)',
    te: 'భూ స్వాధీన ధృవీకరణ పత్రం (పట్టాదారు పాస్‌బుక్)'
  },
  'Borewell / Open Well yield test certificate or Panchayat No-Objection': {
    en: 'Borewell / Open Well yield test certificate or Panchayat No-Objection',
    ta: 'போர்வெல் / கிணற்று நீர் உற்பத்தி சான்றிதழ் அல்லது ஊராட்சி தடையில்லா சான்று (NOC)',
    ml: 'ബോർവെൽ / കിണർ ജല ലഭ്യത സർട്ടിഫിക്കറ്റ് അല്ലെങ്കിൽ പഞ്ചായത്ത് NOC',
    kn: 'ಬೋರ್‌ವೆಲ್ / ಬಾವಿ ನೀರು ಲಭ್ಯತೆ ಪ್ರಮಾಣಪತ್ರ ಅಥವಾ ಪಂಚಾಯಿತಿ ನಿರಾಕ್ಷೇಪಣಾ ಪತ್ರ (NOC)',
    te: 'బోర్‌వెల్ / బావి నీటి లభ్యత ధృవీకరణ పత్రం లేదా పంచాయతీ NOC'
  },
  'Declaration of no existing subsidized grid power connection': {
    en: 'Declaration of no existing subsidized grid power connection',
    ta: 'ஏற்கனவே மானிய இலவச மின் இணைப்பு இல்லை என்ற சுய உறுதிமொழி',
    ml: 'നിലവിൽ സബ്‌സിഡി വൈദ്യുതി കണക്ഷൻ ഇല്ലെന്ന സത്യവാങ്മൂലം',
    kn: 'ಈಗಾಗಲೇ ಸಬ್ಸಿಡಿ ವಿದ್ಯುತ್ ಸಂಪರ್ಕ ಹೊಂದಿಲ್ಲವೆಂಬ ಸ್ವಯಂ ಘೋಷಣೆ',
    te: 'ఇప్పటికే సబ్సిడీ విద్యుత్ కనెక్షన్ లేదని స్వయం ప్రకటన'
  },
  'Land ownership documents (Patta / Adangal)': {
    en: 'Land ownership documents (Patta / Adangal)',
    ta: 'நில உரிமை ஆவணங்கள் (பட்டா / அடங்கல்)',
    ml: 'ഭൂ ഉടമസ്ഥാവകാശ രേഖകൾ (പട്ടയം / അടങ്കൽ)',
    kn: 'ಭೂ ಒಡೆತನದ ದಾಖಲೆಗಳು (ಪಹಣಿ / ಅಡಂಗಲ್)',
    te: 'భూ యాజమాన్య పత్రాలు (పట్టాదారు పాస్‌బుక్ / అడంగల్)'
  },
  'Aadhaar and Bank details': {
    en: 'Aadhaar and Bank details',
    ta: 'ஆதார் மற்றும் வங்கி கணக்கு விவரங்கள்',
    ml: 'ആധാറും ബാങ്ക് വിവരങ്ങളും',
    kn: 'ಆಧಾರ್ ಮತ್ತು ಬ್ಯಾಂಕ್ ವಿವರಗಳು',
    te: 'ఆధార్ మరియు బ్యాంక్ వివరాలు'
  },
  'Sapling procurement receipt from accredited bamboo tissue-culture lab': {
    en: 'Sapling procurement receipt from accredited bamboo tissue-culture lab',
    ta: 'அங்கீகரிக்கப்பட்ட திசு வளர்ப்பு நாற்றுப்பண்ணை ரசீது',
    ml: 'അംഗീകൃത ടിഷ്യു കൾച്ചർ ലാബിൽ നിന്നുള്ള തൈ വാങ്ങിയ രസീത്',
    kn: 'ಮಾನ್ಯತೆ ಪಡೆದ ಅಂಗಾಂಶ ಕೃಷಿ ಲ್ಯಾಬ್‌ನಿಂದ ಸಸಿ ಖರೀದಿ ರಶೀದಿ',
    te: 'గుర్తింపు పొందిన టిష్యూ కల్చర్ ల్యాబ్ నుండి మొక్కల కొనుగోలు రసీదు'
  },
  'Survey Number & Village details': {
    en: 'Survey Number & Village details',
    ta: 'சர்வே எண் மற்றும் கிராம விவரங்கள்',
    ml: 'സർവേ നമ്പറും വില്ലേജ് വിവരങ്ങളും',
    kn: 'ಸರ್ವೇ ನಂಬರ್ ಮತ್ತು ಗ್ರಾಮದ ವಿವರಗಳು',
    te: 'సర్వే నంబర్ మరియు గ్రామ వివరాలు'
  },
  'GPS coordinates of soil sample collection pits': {
    en: 'GPS coordinates of soil sample collection pits',
    ta: 'மண் மாதிரி எடுக்கப்பட்ட இடத்தின் GPS ஆயத்தொலைவுகள்',
    ml: 'മണ്ണ് സാമ്പിൾ എടുത്ത സ്ഥലത്തിന്റെ ജിപിഎസ് പോയിന്റുകൾ',
    kn: 'ಮಣ್ಣಿನ ಮಾದರಿ ಸಂಗ್ರಹಿಸಿದ ಸ್ಥಳದ ಜಿಪಿಎಸ್ ನಿರ್ದೇಶಾಂಕಗಳು',
    te: 'మట్టి నమూనాలు సేకరించిన ప్రదేశం యొక్క GPS పాయింట్లు'
  },
  'Patta / Chitta document with survey number': {
    en: 'Patta / Chitta document with survey number',
    ta: 'சர்வே எண்ணுடன் கூடிய பட்டா / சிட்டா ஆவணம்',
    ml: 'സർവേ നമ്പർ വ്യക്തമാക്കുന്ന പട്ടയം',
    kn: 'ಸರ್ವೇ ಸಂಖ್ಯೆ ಹೊಂದಿರುವ ಪಹಣಿ / ಪಟ್ಟಾ ದಾಖಲೆ',
    te: 'సర్వే నంబర్‌తో కూడిన పట్టాదారు పాస్‌బుక్'
  },
  'Aadhaar Card copy': {
    en: 'Aadhaar Card copy',
    ta: 'ஆதார் அட்டை நகல்',
    ml: 'ആധാർ കാർഡിന്റെ പകർപ്പ്',
    kn: 'ಆಧಾರ್ ಕಾರ್ಡ್ ಪ್ರತಿ',
    te: 'ఆధార్ కార్డు కాపీ'
  },
  'Uzhavan Mobile App registration ID': {
    en: 'Uzhavan Mobile App registration ID',
    ta: 'உழவன் மொபைல் செயலி பதிவு எண்',
    ml: 'ഉഴവൻ മൊബൈൽ ആപ്പ് രജിസ്ട്രേഷൻ ഐഡി',
    kn: 'ಉಳವನ್ ಮೊಬೈಲ್ ಆ್ಯಪ್ ನೋಂದಣಿ ಐಡಿ',
    te: 'ఉళవన్ మొబైల్ యాప్ రిజిస్ట్రేషన్ ఐడీ'
  },
  'Bank passbook copy': {
    en: 'Bank passbook copy',
    ta: 'வங்கி பாஸ்புக் நகல்',
    ml: 'ബാങ്ക് പാസ്ബുക്കിന്റെ പകർപ്പ്',
    kn: 'ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್ ಪ್ರತಿ',
    te: 'బ్యాంక్ పాస్‌బుక్ కాపీ'
  },
  'Patta / Chitta and FMB sketch': {
    en: 'Patta / Chitta and FMB sketch',
    ta: 'பட்டா / சிட்டா மற்றும் FMB வரைபடம்',
    ml: 'പട്ടയവും എഫ്.എം.ബി സ്കെച്ചും',
    kn: 'ಪಹಣಿ / ಪಟ್ಟಾ ಮತ್ತು ಎಫ್‌ಎಂಬಿ ನಕ್ಷೆ',
    te: 'పట్టాదారు పాస్‌బుక్ మరియు FMB స్కెచ్'
  },
  'Small/Marginal Farmer Certificate from Tahsildar / Revenue Inspector': {
    en: 'Small/Marginal Farmer Certificate from Tahsildar / Revenue Inspector',
    ta: 'வட்டாட்சியர் / வருவாய் ஆய்வாளரிடம் பெற்ற சிறு/குறு விவசாயி சான்றிதழ்',
    ml: 'തഹസിൽദാർ / വില്ലേജ് ഓഫീസറിൽ നിന്നുള്ള ചെറുകിട കർഷക സർട്ടിഫിക്കറ്റ്',
    kn: 'ತಹಶೀಲ್ದಾರ್ / ಕಂದಾಯ ನಿರೀಕ್ಷಕರಿಂದ ಸಣ್ಣ/ಅತಿ ಸಣ್ಣ ರೈತ ಪ್ರಮಾಣಪತ್ರ',
    te: 'తహశీల్దార్ / రెవెన్యూ ఇన్‌స్పెక్టర్ నుండి చిన్న/సన్నకారు రైతు ధృవీకరణ పత్రం'
  },
  'Electricity / Well Certificate': {
    en: 'Electricity / Well Certificate',
    ta: 'மின் இணைப்பு / பாசனக் கிணறு சான்றிதழ்',
    ml: 'വൈദ്യുതി / കിണർ സർട്ടിഫിക്കറ്റ്',
    kn: 'ವಿದ್ಯುತ್ / ಬಾವಿ ಪ್ರಮಾಣಪತ್ರ',
    te: 'విద్యుత్ / బావి ధృవీకరణ పత్రం'
  },
  'Farmland Patta / Chitta': {
    en: 'Farmland Patta / Chitta',
    ta: 'விவசாய நில பட்டா / சிட்டா',
    ml: 'കൃഷിഭൂമി പട്ടയം / തണ്ടപ്പേര്',
    kn: 'ಕೃಷಿ ಜಮೀನು ಪಹಣಿ / ಪಟ್ಟಾ',
    te: 'వ్యవసాయ భూమి పట్టాదారు పాస్‌బుక్'
  },
  'Signed tripartite agroforestry agreement': {
    en: 'Signed tripartite agroforestry agreement',
    ta: 'கையொப்பமிடப்பட்ட முத்தரப்பு மர வளர்ப்பு ஒப்பந்தம்',
    ml: 'ഒപ്പിട്ട ത്രികക്ഷി കാർഷിക വനവൽക്കരണ കരാർ',
    kn: 'ಸಹಿ ಮಾಡಿದ ತ್ರಿಪಕ್ಷೀಯ ಕೃಷಿ ಅರಣ್ಯ ಒಪ್ಪಂದ',
    te: 'సంతకం చేసిన త్రైపాక్షిక వ్యవసాయ అటవీ ఒప్పందం'
  },
  'Pahani / RTC (Record of Rights, Tenancy and Crops)': {
    en: 'Pahani / RTC (Record of Rights, Tenancy and Crops)',
    ta: 'பஹானி / RTC நில உரிமை ஆவணம்',
    ml: 'പഹാനി / ആർ.ടി.സി (ഭൂവുടമസ്ഥാവകാശ രേഖ)',
    kn: 'ಪಹಣಿ / ಆರ್‌ಟಿಸಿ (ಹಕ್ಕುಗಳು, ಗೇಣಿ ಮತ್ತು ಬೆಳೆ ದಾಖಲೆ)',
    te: 'పహానీ / RTC (హక్కులు మరియు పంటల రికార్డు)'
  },
  'Bank Passbook with IFSC code': {
    en: 'Bank Passbook with IFSC code',
    ta: 'IFSC குறியீட்டுடன் கூடிய வங்கி பாஸ்புக்',
    ml: 'IFSC കോഡ് ഉള്ള ബാങ്ക് പാസ്ബുക്ക്',
    kn: 'IFSC ಕೋಡ್ ಹೊಂದಿರುವ ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್',
    te: 'IFSC కోడ్‌తో కూడిన బ్యాంక్ పాస్‌బుక్'
  },
  'Passport size photo': {
    en: 'Passport size photo',
    ta: 'பாஸ்போர்ட் அளவு புகைப்படம்',
    ml: 'പാസ്‌പോർട്ട് സൈസ് ഫോട്ടോ',
    kn: 'ಪಾಸ್‌ಪೋರ್ಟ್ ಅಳತೆಯ ಭಾವಚಿತ್ರ',
    te: 'పాస్‌పోర్ట్ సైజు ఫోటో'
  },
  'RTC / Pahani (latest digital copy)': {
    en: 'RTC / Pahani (latest digital copy)',
    ta: 'RTC / பஹானி (சமீபத்திய டிஜிட்டல் நகல்)',
    ml: 'ആർ.ടി.സി / പഹാനി (ഏറ്റവും പുതിയ ഡിജിറ്റൽ പകർപ്പ്)',
    kn: 'ಆರ್‌ಟಿಸಿ / ಪಹಣಿ (ಇತ್ತೀಚಿನ ಡಿಜಿಟಲ್ ಪ್ರತಿ)',
    te: 'RTC / పహానీ (తాజా డిజిటల్ కాపీ)'
  },
  'Caste Certificate (for 90% SC/ST quota)': {
    en: 'Caste Certificate (for 90% SC/ST quota)',
    ta: 'சாதிச் சான்றிதழ் (90% ஆதிதிராவிடர்/பழங்குடியினர் மானியத்திற்கு)',
    ml: 'ജാതി സർട്ടിഫിക്കറ്റ് (90% SC/ST സബ്‌സിഡിക്ക്)',
    kn: 'ಜಾತಿ ಪ್ರಮಾಣಪತ್ರ (90% ಪರಿಶಿಷ್ಟ ಜಾತಿ/ಪಂಗಡ ಕೋಟಾಕ್ಕಾಗಿ)',
    te: 'కుల ధృవీకరణ పత్రం (90% SC/ST కోటా కోసం)'
  },
  'Electricity / Borewell NOC': {
    en: 'Electricity / Borewell NOC',
    ta: 'மின்சார வாரியம் / போர்வெல் தடையில்லா சான்று (NOC)',
    ml: 'വൈദ്യുതി / ബോർവെൽ എൻ.ഒ.സി',
    kn: 'ವಿದ್ಯುತ್ / ಬೋರ್‌ವೆಲ್ ನಿರಾಕ್ಷೇಪಣಾ ಪತ್ರ (NOC)',
    te: 'విద్యుత్ / బోర్‌వెల్ NOC'
  },
  'Panchayat plantation declaration': {
    en: 'Panchayat plantation declaration',
    ta: 'ஊராட்சி மன்ற மர வளர்ப்பு உறுதிமொழி படிவம்',
    ml: 'പഞ്ചായത്ത് വൃക്ഷത്തൈ നടീൽ സത്യവാങ്മൂലം',
    kn: 'ಗ್ರಾಮ ಪಂಚಾಯಿತಿ ಮರ ನೆಡುವಿಕೆ ಘೋಷಣಾಪತ್ರ',
    te: 'గ్రామ పంచాయతీ తోటల పెంపకం ప్రకటన'
  },
  'Thandapper / Land Tax Receipt': {
    en: 'Thandapper / Land Tax Receipt',
    ta: 'தண்டப்பேர் / நில வரி ரசீது',
    ml: 'തണ്ടപ്പേര് / ഭൂനികുതി രസീത്',
    kn: 'ಕಂದಾಯ ಪಾವತಿ / ಭೂ ತೆರಿಗೆ ರಶೀದಿ',
    te: 'భూమి పన్ను రసీదు / రెవెన్యూ రికార్డు'
  },
  'Aadhaar and Kerala AIMS Farmer Registration ID': {
    en: 'Aadhaar and Kerala AIMS Farmer Registration ID',
    ta: 'ஆதார் மற்றும் கேரள AIMS விவசாயி பதிவு எண்',
    ml: 'ആധാറും കേരള AIMS കർഷക രജിസ്ട്രേഷൻ ഐഡിയും',
    kn: 'ಆಧಾರ್ ಮತ್ತು ಕೇರಳ AIMS ರೈತ ನೋಂದಣಿ ಐಡಿ',
    te: 'ఆధార్ మరియు కేరళ AIMS రైతు నమోదు ఐడీ'
  },
  'Land Tax Receipt & Possession Certificate': {
    en: 'Land Tax Receipt & Possession Certificate',
    ta: 'நில வரி ரசீது & உடைமைச் சான்றிதழ்',
    ml: 'ഭൂനികുതി രസീതും കൈവശാവകാശ സർട്ടിഫിക്കറ്റും',
    kn: 'ಭೂ ತೆರಿಗೆ ರಶೀದಿ ಮತ್ತು ಸ್ವಾಧೀನ ಪ್ರಮಾಣಪತ್ರ',
    te: 'భూమి పన్ను రసీదు మరియు స్వాధీన ధృవీకరణ పత్రం'
  },
  'Aadhaar Card and AIMS Portal profile': {
    en: 'Aadhaar Card and AIMS Portal profile',
    ta: 'ஆதார் அட்டை மற்றும் AIMS போர்டல் சுயவிவரம்',
    ml: 'ആധാർ കാർഡും AIMS പോർട്ടൽ പ്രൊഫൈലും',
    kn: 'ಆಧಾರ್ ಕಾರ್ಡ್ ಮತ್ತು AIMS ಪೋರ್ಟಲ್ ವಿವರ',
    te: 'ఆధార్ కార్డు మరియు AIMS పోర్టల్ ప్రొఫైల్'
  },
  'Krishi Bhavan recommendation': {
    en: 'Krishi Bhavan recommendation',
    ta: 'வேளாண் அலுவலர் (கிருஷி பவன்) பரிந்துரைக் கடிதம்',
    ml: 'കൃഷിഭവൻ ഓഫീസറുടെ ശുപാർശ കത്ത്',
    kn: 'ಕೃಷಿ ಭವನ ಅಧಿಕಾರಿಯ ಶಿಫಾರಸು ಪತ್ರ',
    te: 'కృషి భవన్ సిఫార్సు లేఖ'
  },
  'Land tax receipt or ration card': {
    en: 'Land tax receipt or ration card',
    ta: 'நில வரி ரசீது அல்லது குடும்ப அட்டை (ரேஷன் கார்டு)',
    ml: 'ഭൂനികുതി രസീത് അല്ലെങ്കിൽ റേഷൻ കാർഡ്',
    kn: 'ಭೂ ತೆರಿಗೆ ರಶೀದಿ ಅಥವಾ ಪಡಿತರ ಚೀಟಿ (ರೇಷನ್ ಕಾರ್ಡ್)',
    te: 'భూమి పన్ను రసీదు లేదా రేషన్ కార్డు'
  },
  'Pattadar Passbook / 1-B Adangal': {
    en: 'Pattadar Passbook / 1-B Adangal',
    ta: 'பட்டாதாரர் பாஸ்புக் / 1-B அடங்கல்',
    ml: 'പട്ടാദാർ പാസ്ബുക്ക് / 1-B അടങ്കൽ',
    kn: 'ಪಟ್ಟಾದಾರ ಪಾಸ್‌ಬುಕ್ / 1-B ಅಡಂಗಲ್',
    te: 'పట్టాదారు పాస్‌బుక్ / 1-B అడంగల్'
  },
  'Rythu Bharosa Kendra (RBK) registration': {
    en: 'Rythu Bharosa Kendra (RBK) registration',
    ta: 'ரைத்து பரோசா கேந்திரா (RBK) பதிவு எண்',
    ml: 'റൈത്തു ഭരോസ കേന്ദ്ര (RBK) രജിസ്ട്രേഷൻ',
    kn: 'ರೈತು ಭರೋಸಾ ಕೇಂದ್ರ (RBK) ನೋಂದಣಿ',
    te: 'రైతు భరోసా కేంద్రం (RBK) నమోదు'
  },
  'Pattadar Passbook / Digital Title Deed': {
    en: 'Pattadar Passbook / Digital Title Deed',
    ta: 'பட்டாதாரர் பாஸ்புக் / டிஜிட்டல் நில உரிமை பத்திரம்',
    ml: 'പട്ടാദാർ പാസ്ബുക്ക് / ഡിജിറ്റൽ ആധാരം',
    kn: 'ಪಟ್ಟಾದಾರ ಪಾಸ್‌ಬುಕ್ / ಡಿಜಿಟಲ್ ಶೀರ್ಷಿಕೆ ಪತ್ರ',
    te: 'పట్టాదారు పాస్‌బుక్ / డిజిటల్ హక్కు పత్రం'
  },
  'Small / Marginal Farmer Certificate from Tahsildar': {
    en: 'Small / Marginal Farmer Certificate from Tahsildar',
    ta: 'வட்டாட்சியரிடமிருந்து பெற்ற சிறு/குறு விவசாயி சான்றிதழ்',
    ml: 'തഹസിൽദാരിൽ നിന്നുള്ള ചെറുകിട കർഷക സർട്ടിഫിക്കറ്റ്',
    kn: 'ತಹಶೀಲ್ದಾರರಿಂದ ಸಣ್ಣ/ಅತಿ ಸಣ್ಣ ರೈತ ಪ್ರಮಾಣಪತ್ರ',
    te: 'తహశీల్దార్ నుండి చిన్న/సన్నకారు రైతు ధృవీకరణ పత్రం'
  },
  'Electricity / Borewell water source verification': {
    en: 'Electricity / Borewell water source verification',
    ta: 'மின் இணைப்பு / ஆழ்துளை கிணறு நீர் ஆதார சரிபார்ப்பு',
    ml: 'വൈദ്യുതി / ബോർവെൽ ജലസ്രോതസ്സ് പരിശോധന രേഖ',
    kn: 'ವಿದ್ಯುತ್ / ಬೋರ್‌ವೆಲ್ ನೀರಿನ ಮೂಲ ಪರಿಶೀಲನೆ ದಾಖಲೆ',
    te: 'విద్యుత్ / బోర్‌వెల్ నీటి వనరు ధృవీకరణ పత్రం'
  },
  'Pattadar Passbook / 1-B Form': {
    en: 'Pattadar Passbook / 1-B Form',
    ta: 'பட்டாதாரர் பாஸ்புக் / 1-B படிவம்',
    ml: 'പട്ടാദാർ പാസ്ബുക്ക് / 1-B ഫോം',
    kn: 'ಪಟ್ಟಾದಾರ ಪಾಸ್‌ಬುಕ್ / 1-B ನಮೂನೆ',
    te: 'పట్టాదారు పాస్‌బుక్ / 1-B ఫారమ్'
  },
  'GPS location survey sketch': {
    en: 'GPS location survey sketch',
    ta: 'GPS இருப்பிட சர்வே எல்லை வரைபடம்',
    ml: 'ജിപിഎസ് ലൊക്കേഷൻ സർവേ സ്കെച്ച്',
    kn: 'ಜಿಪಿಎಸ್ ಸ್ಥಳ ಸರ್ವೇ ನಕ್ಷೆ',
    te: 'GPS లొకేషన్ సర్వే స్కెచ్'
  }
};

export const getLocalizedDocument = (doc: string, lang: Language): string => {
  return DOCUMENT_ITEM_TRANSLATIONS[doc]?.[lang] || doc;
};

// Generates an official PDF of all matched government schemes for this farmer
export function downloadGovernmentSchemesPdf(params: {
  farmer: FarmerProfile;
  activePlot: FarmerPlot;
  inputs: FarmerInputs;
  matchedSchemes: MatchedSchemeResult[];
  totalSubsidy: number;
  language: Language;
}): boolean {
  const { farmer, activePlot, inputs, matchedSchemes, totalSubsidy, language } = params;

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = 210;
  const pageHeight = 297;
  let y = 14;

  // Header Banner Background
  pdf.setFillColor(26, 46, 17);
  pdf.rect(0, 0, pageWidth, 28, 'F');

  // Green accent bar
  pdf.setFillColor(134, 239, 172);
  pdf.rect(0, 28, pageWidth, 2, 'F');

  // Header Title
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(14);
  pdf.setTextColor(255, 255, 255);
  pdf.text('GREENVEST OFFICIAL GOVERNMENT SCHEMES & SUBSIDY DOSSIER', 14, 12);

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8.5);
  pdf.setTextColor(190, 215, 180);
  pdf.text(`${inputs.state} State Govt & Central Government Agroforestry Welfare Allocations`, 14, 18);
  pdf.text(`Audited for Verra VM0047 ARR Co-Financing & Welfare Exemption Non-Conflict`, 14, 23);

  pdf.setFontSize(8);
  pdf.setTextColor(255, 255, 255);
  pdf.text(`Date: ${new Date().toLocaleDateString('en-IN')}`, pageWidth - 42, 18);

  y = 36;

  // Section 1: Farmer & Parcel Particulars Box
  pdf.setFillColor(248, 250, 246);
  pdf.roundedRect(12, y, pageWidth - 24, 24, 2, 2, 'FD');
  pdf.setDrawColor(205, 224, 195);
  pdf.setLineWidth(0.3);

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(9);
  pdf.setTextColor(26, 46, 17);
  pdf.text('1. REGISTERED PARCEL PARTICULARS', 16, y + 6);

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8);
  pdf.setTextColor(60, 70, 55);

  const col1 = 16;
  const col2 = 68;
  const col3 = 120;
  const col4 = 162;

  pdf.text(`Farmer: ${farmer.name}`, col1, y + 12);
  pdf.text(`Mobile: ${farmer.phone || 'N/A'}`, col1, y + 18);

  pdf.text(`Plot Name: ${activePlot.name}`, col2, y + 12);
  pdf.text(`Survey No: ${activePlot.surveyNo || 'Pending'}`, col2, y + 18);

  pdf.text(`Location: ${inputs.district}, ${inputs.state}`, col3, y + 12);
  pdf.text(`Land Area: ${inputs.landArea} Acres (${(inputs.landArea * 0.4047).toFixed(2)} ha)`, col3, y + 18);

  pdf.text(`Water: ${inputs.waterAvailability}`, col4, y + 12);
  pdf.text(`Soil Type: ${inputs.soilType}`, col4, y + 18);

  y += 29;

  // Section 2: Financial Subsidy Summary Banner
  pdf.setFillColor(234, 243, 228);
  pdf.roundedRect(12, y, pageWidth - 24, 16, 2, 2, 'FD');
  pdf.setDrawColor(180, 210, 165);

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(9);
  pdf.setTextColor(30, 54, 21);
  pdf.text('2. ESTIMATED DIRECT GOVERNMENT WELFARE ASSISTANCE', 16, y + 6);

  pdf.setFontSize(12);
  pdf.setTextColor(26, 46, 17);
  pdf.text(`Rs. ${totalSubsidy.toLocaleString('en-IN')}`, 16, y + 12);

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8);
  pdf.setTextColor(60, 80, 50);
  pdf.text(`Matched ${matchedSchemes.length} verified government welfare schemes for your registered plot. Zero commission deduction.`, 75, y + 11);

  y += 22;

  // Section 3: Detailed Schemes Table
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(9.5);
  pdf.setTextColor(26, 46, 17);
  pdf.text('3. VERIFIED SCHEMES BREAKDOWN & APPLICATION DETAILS', 12, y);

  y += 4;

  matchedSchemes.forEach((item, idx) => {
    // Check page overflow
    if (y + 40 > pageHeight - 20) {
      pdf.addPage();
      y = 15;
    }

    const { scheme, estimatedSubsidyAmount, matchScore } = item;
    const isState = scheme.state === inputs.state;

    // Card background
    pdf.setFillColor(idx % 2 === 0 ? 255 : 252, 253, 250);
    pdf.roundedRect(12, y, pageWidth - 24, 34, 2, 2, 'FD');
    pdf.setDrawColor(215, 222, 205);
    pdf.setLineWidth(0.2);

    // Title Row
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9);
    pdf.setTextColor(26, 46, 17);
    pdf.text(`${idx + 1}. ${scheme.name}`, 16, y + 6);

    // Subsidy Badge
    pdf.setFont('helvetica', 'bold');
    pdf.setFontSize(9);
    pdf.setTextColor(45, 74, 34);
    pdf.text(`Est: Rs. ${estimatedSubsidyAmount.toLocaleString('en-IN')}`, pageWidth - 55, y + 6);

    // Details Row
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(7.5);
    pdf.setTextColor(80, 90, 75);

    const jurisdiction = isState ? `${inputs.state} State Govt` : 'Central Govt (Pan-India)';
    pdf.text(`Authority: ${jurisdiction}  |  Category: ${scheme.category}  |  Match: ${matchScore}%`, 16, y + 11);
    pdf.text(`Dept: ${scheme.department}`, 16, y + 16);
    pdf.text(`Subsidy Type: ${scheme.subsidyType} (${scheme.subsidyRate})`, 16, y + 21);

    // Application portal & Helpline
    pdf.setTextColor(30, 70, 40);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`Portal: ${scheme.portalName} (${scheme.officialPortalUrl})`, 16, y + 26);
    pdf.text(`Helpline: ${scheme.helpline}`, 16, y + 30);

    y += 37;
  });

  // Footer: Verra VM0047 Co-Financing Guarantee
  if (y + 35 > pageHeight - 15) {
    pdf.addPage();
    y = 15;
  }

  y += 2;
  pdf.setFillColor(244, 247, 240);
  pdf.roundedRect(12, y, pageWidth - 24, 20, 2, 2, 'FD');
  pdf.setDrawColor(180, 205, 165);

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(8.5);
  pdf.setTextColor(26, 46, 17);
  pdf.text('VERRA VM0047 CO-FINANCING & WELFARE COMPLIANCE GUARANTEE', 16, y + 6);

  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(7.5);
  pdf.setTextColor(60, 75, 55);
  pdf.text('Under Verra VM0047 Article 8 (Additionality & Public Subsidy Interaction), smallholder welfare and micro-irrigation subsidies', 16, y + 11);
  pdf.text('do NOT conflict with voluntary carbon certification. Farmers retain 100% ownership of carbon yields alongside all DBT payouts.', 16, y + 15);

  y += 25;

  pdf.setDrawColor(180, 195, 170);
  pdf.setLineWidth(0.3);
  pdf.line(12, y, pageWidth - 12, y);

  pdf.setFontSize(7);
  pdf.setTextColor(100, 110, 95);
  pdf.text('GreenVest Smallholder Carbon Platform | Independent Pre-Feasibility Intelligence | Zero commissions deducted from farmer payouts.', 14, y + 4);

  const cleanState = inputs.state.replace(/\s+/g, '-');
  const cleanPlot = activePlot.name.replace(/[^a-zA-Z0-9_-]/g, '_');
  const fileName = `GreenVest-${cleanState}-Govt-Schemes-${cleanPlot}`;

  return triggerPdfDownload(pdf, fileName);
}
