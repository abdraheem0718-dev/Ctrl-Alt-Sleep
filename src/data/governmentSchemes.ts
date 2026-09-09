import { GovernmentScheme, MatchedSchemeResult, FarmerInputs, SchemeRegion } from '../types/greenvest';

export const GOVERNMENT_SCHEMES_DATABASE: GovernmentScheme[] = [
  // ==========================================
  // CENTRAL GOVERNMENT SCHEMES (PAN-INDIA)
  // ==========================================
  {
    id: 'central-smaf',
    name: 'Sub-Mission on Agroforestry (SMAF / Har Medh Par Ped)',
    shortName: 'SMAF Agroforestry',
    localNames: {
      ta: 'வேளாண் வனவியல் துணை இயக்கம் (SMAF / வரப்பில் மரங்கள்)',
      ml: 'കാർഷിക വനവൽക്കരണ ഉപപദ്ധതി (SMAF)',
      kn: 'ಕೃಷಿ ಅರಣ್ಯ ಉಪ-ಯೋಜನೆ (SMAF / ಬದುವಿನ ಮೇಲೆ ಮರಗಳು)',
      te: 'వ్యవసాయ అటవీ ఉప-మిషన్ (SMAF / గట్లపై చెట్లు)'
    },
    state: 'Central',
    department: 'Ministry of Agriculture & Farmers Welfare, Govt. of India',
    category: 'Plantation & Sapling Subsidy',
    subsidyRate: '50% Financial Assistance (Up to ₹70/plant)',
    subsidyType: 'Direct Benefit Transfer (DBT)',
    description: 'Flagship national scheme under NMSA encouraging tree planting on private farmlands alongside crops, specifically on field boundaries (bunds) or block plantations with 4 years of maintenance support.',
    localDescriptions: {
      ta: 'விவசாய நிலங்களின் வரப்புகள் மற்றும் பரப்புகளில் விவசாயப் பயிர்களோடு மரங்கள் நட 50% மானிய உதவி (4 ஆண்டுகள் பராமரிப்பு நிதி உட்பட).',
      ml: 'പാടവരമ്പുകളിലും തരിശുഭൂമികളിലും തൈകൾ നടുന്നതിനും 4 വർഷത്തെ പരിപാലനത്തിനുമായി 50% സാമ്പത്തിക സഹായം നൽകുന്ന കേന്ദ്ര പദ്ധതി.',
      kn: 'ಕೃಷಿ ಜಮೀನಿನ ಬದುಗಳ ಮೇಲೆ ಮತ್ತು ಬ್ಲಾಕ್ ಪ್ಲಾಂಟೇಶನ್‌ಗಳಲ್ಲಿ ಮರ ಬೆಳೆಸಲು ಹಾಗೂ 4 ವರ್ಷಗಳ ನಿರ್ವಹಣೆಗೆ 50% ಆರ್ಥಿಕ ನೆರವು.',
      te: 'వ్యవసాయ భూముల గట్ల వెంబడి మరియు ఖాళీ స్థలాలలో చెట్లు నాటడానికి మరియు 4 సంవత్సరాల నిర్వహణకు 50% ఆర్థిక సహాయం.'
    },
    eligibilityDescription: 'Small, marginal, and broad-acre farmers with clear land title (Patta/RoR). Preference for boundary (bund) and agri-silvicultural models.',
    minAcres: 0.5,
    maxAcres: 25,
    suitablePlantingModels: ['Boundary / Bund Agroforestry', 'Agri-Silviculture (Trees + Crops)', 'Block Plantation'],
    calculateEstimatedSubsidy: (inputs: FarmerInputs) => {
      const treesPerAcre = inputs.plantingModel === 'Boundary / Bund Agroforestry' ? 70 : 250;
      const totalTrees = Math.round(inputs.landArea * treesPerAcre);
      // Up to ₹70 per plant for small/marginal (<=5 acres), ₹50 for >5 acres
      const ratePerTree = inputs.landArea <= 5 ? 70 : 50;
      return Math.min(totalTrees * ratePerTree, inputs.landArea * 28000);
    },
    keyHighlights: [
      '50% direct subsidy on ICAR/FRI certified quality planting material',
      '4-year staggered maintenance tranche to ensure 80%+ sapling survival',
      'Special focus on nitrogen-fixing & high-value timber species',
      'Can be combined with private voluntary carbon credit certification'
    ],
    requiredDocuments: [
      'Aadhaar Card (Identity proof)',
      'Land Ownership Record (Patta / Chitta / RoR)',
      'Bank Passbook (Aadhaar linked for DBT transfer)',
      'Passport size photographs (2 copies)',
      'Geo-tagged boundary sketch / FMB map'
    ],
    applicationProcess: [
      'Submit online application through state agriculture portal or nearest Krishi Vigyan Kendra (KVK)',
      'Field verification of survey boundary by Assistant Agriculture Officer (AAO)',
      'Saplings sourced from certified Forest/Horticulture nurseries',
      'Subsidy credited in tranches directly to bank account based on annual survival audit'
    ],
    officialPortalUrl: 'https://agricoop.gov.in',
    portalName: 'DA&FW National Agroforestry Portal',
    helpline: '1800-180-1551 (Kisan Call Centre Toll-Free)'
  },
  {
    id: 'central-pmksy-drip',
    name: 'PM Krishi Sinchayee Yojana (PMKSY - Per Drop More Crop)',
    shortName: 'PMKSY Micro-Irrigation',
    localNames: {
      ta: 'பிரதமரின் நுண்ணீர்ப்பாசன திட்டம் (சொட்டு நீர் பாசனம்)',
      ml: 'പ്രധാനമന്ത്രി കൃഷി സിഞ്ചായി യോജന (സൂക്ഷ്മ ജലസേചനം)',
      kn: 'ಪ್ರಧಾನಮಂತ್ರಿ ಕೃಷಿ ಸಿಂಚಾಯಿ ಯೋಜನೆ (ಹನಿ ನೀರಾವರಿ)',
      te: 'పీఎం కృషి సించాయీ యోజన (బిందు సేద్యం / డ్రిప్)'
    },
    state: 'Central',
    department: 'Department of Agriculture & Farmers Welfare (Per Drop More Crop Division)',
    category: 'Micro-Irrigation & Drip',
    subsidyRate: '55% - 100% Subsidy on Drip Systems',
    subsidyType: 'Equipment Subsidy',
    description: 'Central-state subsidized precision micro-irrigation systems. Small and marginal farmers receive up to 55% central assistance (topped up to 90%-100% by southern state governments) to establish drip lines for agroforestry orchards.',
    localDescriptions: {
      ta: 'மரப்பயிர் மற்றும் தோட்டக்கலைக்கு சொட்டு நீர் பாசனம் அமைக்க சிறு விவசாயிகளுக்கு 55% முதல் 100% வரை அரசு மானியம்.',
      ml: 'മരങ്ങൾക്കും തോട്ടവിളകൾക്കും തുള്ളിനന സംവിധാനം ഒരുക്കാൻ 55% മുതൽ 90% വരെ സാമ്പത്തിക സബ്‌സിഡി.',
      kn: 'ಕೃಷಿ ಅರಣ್ಯ ಮತ್ತು ಹಣ್ಣಿನ ಗಿಡಗಳಿಗೆ ಹನಿ ನೀರಾವರಿ ಅಳವಡಿಸಲು ಸಣ್ಣ ರೈತರಿಗೆ 55% ರಿಂದ 90% ವರೆಗೆ ಸಬ್ಸಿಡಿ.',
      te: 'వ్యవసాయ అటవీ తోటలకు బిందు సేద్యం (డ్రిప్) ఏర్పాటుకు చిన్న రైతులకు 55% నుండి 90% వరకు రాయితీ.'
    },
    eligibilityDescription: 'Farmers with accessible water source (open well, borewell, or farm pond) requiring water efficiency.',
    minAcres: 0.5,
    maxAcres: 12.5,
    suitableWater: ['Rainfed', 'Moderate', 'High / Canal'],
    calculateEstimatedSubsidy: (inputs: FarmerInputs) => {
      // Cost of wide-spaced tree drip layout is approx ₹30,000/acre. Small farmers get 85% effective subsidy avg
      const ratePerAcre = inputs.landArea <= 5 ? 26000 : 18000;
      return Math.round(inputs.landArea * ratePerAcre);
    },
    keyHighlights: [
      'Reduces tree irrigation water requirement by 60% compared to flood methods',
      'Drip lateral lines, venturi injectors, screen filters, and emitters included',
      '5-year manufacturer equipment warranty and maintenance support',
      'Accelerates sapling growth and root collar thickening in years 1–3'
    ],
    requiredDocuments: [
      'Land Title (Patta/Chitta/Pahani)',
      'Water & Electricity Certificate / Well photo',
      'Aadhaar Card and Mobile linked to Bank Account',
      'Soil & Water Test report copy'
    ],
    applicationProcess: [
      'Register on State Micro Irrigation Portal (TNMIS / APMIP / Karnataka Drip)',
      'Select empanelled micro-irrigation vendor (Jain Irrigation, Netafim, etc.)',
      'Field survey and technical layout preparation by company engineer',
      'Installation verification and subsidy settlement via direct payment to company'
    ],
    officialPortalUrl: 'https://pmksy.gov.in',
    portalName: 'PMKSY National Micro-Irrigation Portal',
    helpline: '1800-425-1551 (National Agri Irrigation Desk)'
  },
  {
    id: 'central-pm-kusum',
    name: 'PM-KUSUM Component-B (Solar Agricultural Pumping System)',
    shortName: 'PM-KUSUM Solar Pump',
    localNames: {
      ta: 'பிரதமரின் குசும் திட்டம் (சூரிய சக்தி பாசன பம்ப்)',
      ml: 'പി.എം കുസും സോളാർ കാർഷിക പമ്പ് പദ്ധതി',
      kn: 'ಪಿಎಂ-ಕುಸುಮ್ ಸೌರಶಕ್ತಿ ಕೃಷಿ ಪಂಪ್ ಯೋಜನೆ',
      te: 'పీఎం-కుసుమ్ సౌర వ్యవసాయ పంపుల పథకం'
    },
    state: 'Central',
    department: 'Ministry of New and Renewable Energy (MNRE)',
    category: 'Solar Energy & Pumping',
    subsidyRate: '60% Financial Subsidy (30% Central + 30% State)',
    subsidyType: 'Equipment Subsidy',
    description: 'Installs standalone off-grid solar-powered submersible pumps (3 HP to 7.5 HP) for agricultural irrigation in rural areas without reliable grid electrical connections.',
    localDescriptions: {
      ta: 'மின்சார இணைப்பு இல்லாத அல்லது தட்டுப்பாடு உள்ள விவசாய நிலங்களுக்கு 60% மானியத்தில் 3 முதல் 7.5 குதிரைத்திறன் சூரிய சக்தி பம்ப் செட்.',
      ml: 'വൈദ്യുതി കണക്ഷൻ ഇല്ലാത്ത കൃഷിയിടങ്ങളിലേക്ക് 60% സബ്‌സിഡിയോടെ സോളാർ പമ്പ് സെറ്റുകൾ സ്ഥാപിക്കുന്ന പദ്ധതി.',
      kn: 'ವಿದ್ಯುತ್ ಸಂಪರ್ಕವಿಲ್ಲದ ಜಮೀನುಗಳಿಗೆ 60% ಸಬ್ಸಿಡಿಯೊಂದಿಗೆ ಸೌರಶಕ್ತಿ ಚಾಲಿತ ಕೃಷಿ ಪಂಪ್ ಅಳವಡಿಕೆ.',
      te: 'విద్యుత్ సరఫరా లేని వ్యవసాయ భూములకు 60% రాయితీతో సోలార్ పంపు సెట్ల ఏర్పాటు.'
    },
    eligibilityDescription: 'Farmers with verified borewell/open well without regular agricultural grid electricity connection.',
    minAcres: 1.0,
    maxAcres: 20,
    suitableWater: ['Rainfed', 'Moderate'],
    calculateEstimatedSubsidy: (inputs: FarmerInputs) => {
      // Average 3HP-5HP system costs ~₹2,20,000 to ₹3,00,000. 60% subsidy = ₹1,32,000 to ₹1,80,000
      return inputs.landArea <= 4 ? 135000 : 175000;
    },
    keyHighlights: [
      '60% outright government subsidy; farmer contributes only 40% (or 10% with bank loan)',
      'Zero monthly electricity bills; daytime solar pumping matches agroforestry water cycles',
      '5-year comprehensive maintenance & warranty with remote performance monitoring',
      'Eligible for carbon emission reduction co-benefits'
    ],
    requiredDocuments: [
      'Aadhaar & Bank Passbook',
      'Land Possession Certificate (Patta / RoR)',
      'Borewell / Open Well yield test certificate or Panchayat No-Objection',
      'Declaration of no existing subsidized grid power connection'
    ],
    applicationProcess: [
      'Apply online through State Renewable Energy Development Agency portal',
      'Vendor selection from MNRE empanelled solar pump manufacturers',
      'Site inspection for groundwater table and solar irradiance orientation',
      'Equipment installation and commissioning with GPS geotagging'
    ],
    officialPortalUrl: 'https://pmkusum.mnre.gov.in',
    portalName: 'PM-KUSUM National MNRE Portal',
    helpline: '1800-180-3333 (National Clean Energy Call Centre)'
  },
  {
    id: 'central-nbm-bamboo',
    name: 'National Bamboo Mission (NBM - Commercial Plantation Drive)',
    shortName: 'National Bamboo Mission',
    localNames: {
      ta: 'தேசிய மூங்கில் இயக்கம் (வணிக ரீதியான மூங்கில் சாகுபடி)',
      ml: 'ദേശീയ മുള മിഷൻ (വാണിജ്യ മുള കൃഷി)',
      kn: 'ರಾಷ್ಟ್ರೀಯ ಬಿದಿರು ಮಿಷನ್ (ವಾಣಿಜ್ಯ ಬಿದಿರು ಕೃಷಿ)',
      te: 'జాతీయ వెదురు మిషన్ (వాణిజ్య వెదురు సాగు)'
    },
    state: 'Central',
    department: 'Ministry of Agriculture & Farmers Welfare',
    category: 'Bamboo & Fast Biomass',
    subsidyRate: '50% Subsidy (Up to ₹50,000 per Acre)',
    subsidyType: 'Direct Benefit Transfer (DBT)',
    description: 'Promotes non-forest bamboo cultivation on private agricultural lands for carbon capture, bio-energy, and industrial pulpwood with direct planting assistance.',
    localDescriptions: {
      ta: 'விவசாய நிலங்களில் வரப்பு அல்லது தொகுதி முறையில் மூங்கில் வளர்க்க ஏக்கருக்கு ₹50,000 வரை 50% அரசு மானியம்.',
      ml: 'കർഷകരുടെ ഭൂമിയിൽ മുളങ്കൂട്ടങ്ങൾ വെച്ചുപിടിപ്പിക്കുന്നതിന് ഏക്കറിന് ₹50,000 വരെ ധനസഹായം.',
      kn: 'ಖಾಸಗಿ ಕೃಷಿ ಜಮೀನಿನಲ್ಲಿ ಬಿದಿರು ಬೆಳೆಯಲು ಎಕರೆಗೆ ₹50,000 ವರೆಗೆ 50% ಸಬ್ಸಿಡಿ.',
      te: 'రైతుల భూముల్లో వెదురు సాగుకు ఎకరానికి ₹50,000 వరకు 50% రాయితీ సహాయం.'
    },
    eligibilityDescription: 'Farmers in rural/semi-arid areas planting certified commercial bamboo species (Bambusa balcooa, Dendrocalamus strictus).',
    minAcres: 1.0,
    maxAcres: 25,
    suitableTreeTypes: ['Fast-Growing Biomass', 'Any / Optimized'],
    calculateEstimatedSubsidy: (inputs: FarmerInputs) => {
      return Math.round(inputs.landArea * 24000);
    },
    keyHighlights: [
      'High-velocity biomass accumulation (captures up to 35 tonnes CO2e/ha/year)',
      'First commercial harvest within 4 years with recurrent annual culm harvest for 30+ years',
      'Exempted from transit felling permits under Indian Forest (Amendment) Act 2017',
      'Assured buyback linkages with bio-pellet and paper board factories'
    ],
    requiredDocuments: [
      'Land ownership documents (Patta / Adangal)',
      'Aadhaar and Bank details',
      'Sapling procurement receipt from accredited bamboo tissue-culture lab'
    ],
    applicationProcess: [
      'Submit proposal through District Agriculture/Horticulture Officer',
      'Purchase tissue-cultured disease-free bamboo planting material',
      'Field inspection at planting and survival verification at end of Year 1 & Year 2',
      'Direct credit of subsidy into bank account'
    ],
    officialPortalUrl: 'https://nbm.nic.in',
    portalName: 'National Bamboo Mission Portal',
    helpline: '011-23382012 (NBM Directorate)'
  },
  {
    id: 'central-shc',
    name: 'Soil Health Card & Soil Organic Carbon (SOC) Regeneration',
    shortName: 'Soil Health Card Scheme',
    localNames: {
      ta: 'மண் வள அட்டை & கரிம மேம்பாட்டு திட்டம்',
      ml: 'മണ്ണ് ആരോഗ്യ കാർഡ് പദ്ധതി',
      kn: 'ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಕಾರ್ಡ್ ಯೋಜನೆ',
      te: 'భూసార పరీక్ష కార్డు మరియు సేంద్రీయ కార్బన్ పథకం'
    },
    state: 'Central',
    department: 'Department of Agriculture & Cooperation',
    category: 'Organic & Soil Regeneration',
    subsidyRate: '100% Free Soil Profiling & Testing',
    subsidyType: 'Grant & Input Kit',
    description: 'Free comprehensive soil testing for macro-nutrients (N, P, K), secondary nutrients, micro-nutrients (Zn, Fe, Cu, Mn, B), and Soil Organic Carbon (SOC) baseline measurements necessary for carbon accreditation.',
    localDescriptions: {
      ta: 'நிலத்தின் கரிம அளவு (SOC) மற்றும் ஊட்டச்சத்துக்களை இலவசமாக பரிசோதித்து 100% கட்டணமில்லா வழிகாட்டல் அட்டை வழங்குதல்.',
      ml: 'മണ്ണിലെ ജൈവ കാർബണും പോഷക ഘടകങ്ങളും സൗജന്യമായി പരിശോധിച്ച് നൽകുന്ന കേന്ദ്ര പദ്ധതി.',
      kn: 'ಉಚಿತ ಮಣ್ಣಿನ ಪರೀಕ್ಷೆ ಮತ್ತು ಮಣ್ಣಿನಲ್ಲಿರುವ ಸಾವಯವ ಇಂಗಾಲದ ಪ್ರಮಾಣವನ್ನು ತಿಳಿಸುವ ಕಾರ್ಡ್ ವಿತರಣೆ.',
      te: 'ఉచిత భూసార పరీక్ష మరియు నేలలో సేంద్రీయ కార్బన్ శాతాన్ని నిర్ధారించే కార్డుల పంపిణీ.'
    },
    eligibilityDescription: 'All landowning farmers across all four states with registered farmland.',
    calculateEstimatedSubsidy: (inputs: FarmerInputs) => {
      // Testing kits + agronomist consultancy equivalent value
      return Math.round(3500 + inputs.landArea * 400);
    },
    keyHighlights: [
      'Measures exact soil organic carbon (SOC %) baseline required by Verra VM0047 methodology',
      'Customized organic amendment dosage (vermicompost, biochar, mycorrhiza)',
      'Prevents unnecessary chemical fertilizer expenditure saving ₹4,000–₹8,000/acre annually',
      'Updated every 2 years by block agricultural testing laboratories'
    ],
    requiredDocuments: [
      'Survey Number & Village details',
      'Aadhaar Card',
      'GPS coordinates of soil sample collection pits'
    ],
    applicationProcess: [
      'Request soil sampling via local KVK, Assistant Director of Agriculture, or GreenVest agronomist',
      'Agronomist collects 5-point composite soil sample from 0-15cm and 15-30cm depths',
      'Laboratory spectrographic analysis conducted at district lab',
      'Digital and printed Soil Health Card issued to farmer'
    ],
    officialPortalUrl: 'https://soilhealth.dac.gov.in',
    portalName: 'National Soil Health Dashboard',
    helpline: '1800-180-1551 (Kisan Portal)'
  },

  // ==========================================
  // TAMIL NADU STATE SCHEMES
  // ==========================================
  {
    id: 'tn-green-mission',
    name: 'Green Tamil Nadu Mission (Pasumai Tamil Nadu Iyakkam)',
    shortName: 'Green TN Mission',
    localNames: {
      ta: 'பசுமை தமிழ்நாடு இயக்கம் (இலவச மரக்கன்றுகள் & ஊக்கத்தொகை)',
      ml: 'ഗ്രീൻ തമിഴ്നാട് മിഷൻ (സൗജന്യ തൈകൾ)',
      kn: 'ಹಸಿರು ತಮಿಳುನಾಡು ಮಿಷನ್ (ಉಚಿತ ಸಸಿಗಳು)',
      te: 'గ్రీన్ తమిళనాడు మిషన్ (ఉచిత మొక్కలు)'
    },
    state: 'Tamil Nadu',
    department: 'Forest & Climate Change Department, Govt. of Tamil Nadu',
    category: 'Plantation & Sapling Subsidy',
    subsidyRate: '100% Free Native Saplings + Survival Incentives',
    subsidyType: '100% Free Saplings',
    description: 'Tamil Nadu flagship afforestation program to increase green tree cover to 33%. Provides millions of free high-value native timber saplings (Teak, Malabar Neem, Mahogany, Red Sanders, Vengai, Sandalwood) directly through Forest Dept nurseries to registered farmers.',
    localDescriptions: {
      ta: 'மரப்பரப்பை 33% ஆக உயர்த்த தமிழக அரசின் முன்னோடி திட்டம். தேக்கு, மலைவேம்பு, மகோகனி, செம்மரம் போன்ற உயர்ரக மரக்கன்றுகள் 100% இலவசமாக வனத்துறை மூலம் வழங்கப்படுகிறது.',
      ml: 'തമിഴ്നാട്ടിലെ കർഷകർക്ക് തേക്ക്, മഹാഗണി, മലവേപ്പ് തുടങ്ങിയ വിലയേറിയ തൈകൾ 100% സൗജന്യമായി നൽകുന്ന വനം വകുപ്പ് പദ്ധതി.',
      kn: 'ತಮಿಳುನಾಡಿನ ರೈತರಿಗೆ ತೇಗ, ಹೆಬ್ಬೇವು, ಮಹೋಗಾನಿ ಉಚಿತ ಸಸಿಗಳನ್ನು ವಿತರಿಸುವ ಅರಣ್ಯ ಇಲಾಖೆ ಯೋಜನೆ.',
      te: 'తమిళనాడు రైతులకు టేకు, మలబార్ వేప, మహాగని మొక్కలను 100% ఉచితంగా అందించే అటవీ శాఖ పథకం.'
    },
    eligibilityDescription: 'Farmers in Tamil Nadu with registered agricultural land, farm boundaries, or fallow lands.',
    minAcres: 0.5,
    maxAcres: 50,
    calculateEstimatedSubsidy: (inputs: FarmerInputs) => {
      const treesPerAcre = inputs.plantingModel === 'Boundary / Bund Agroforestry' ? 70 : 250;
      const totalTrees = Math.round(inputs.landArea * treesPerAcre);
      // Commercial nursery value is ~₹35 to ₹60 per sapling. Delivered free
      return totalTrees * 45;
    },
    keyHighlights: [
      '100% Free certified high-girth native timber saplings delivered via local Forest Range Office',
      'Species matched to Tamil Nadu agro-climatic zones (Kongu, Delta, Western Ghats, Southern Dry)',
      'Targeted survival cash incentives disbursed to farmers maintaining 80%+ tree survival after 2 years',
      'Fully compatible with GreenVest carbon cohort aggregation and Verra crediting'
    ],
    requiredDocuments: [
      'Patta / Chitta document with survey number',
      'Aadhaar Card copy',
      'Uzhavan Mobile App registration ID',
      'Bank passbook copy'
    ],
    applicationProcess: [
      'Apply online via the Green Tamil Nadu portal or through the Uzhavan Mobile App',
      'Select species preferences and preferred local Forest Range nursery',
      'Collect saplings during pre-monsoon planting window (June - October)',
      'Geotag planted saplings using the mobile application'
    ],
    officialPortalUrl: 'https://greentnmission.com',
    portalName: 'Green Tamil Nadu Mission Portal',
    helpline: '044-24348059 (State Forest Headquarters, Chennai)'
  },
  {
    id: 'tn-tnmis-drip',
    name: 'Tamil Nadu Micro Irrigation Scheme (TNMIS - 100% Drip Subsidy)',
    shortName: 'TNMIS 100% Drip',
    localNames: {
      ta: 'தமிழ்நாடு நுண்ணீர்ப்பாசன திட்டம் (சிறு விவசாயிகளுக்கு 100% மானியம்)',
      ml: 'തമിഴ്നാട് സൂക്ഷ്മ ജലസേചന പദ്ധതി (100% സബ്‌സിഡി)',
      kn: 'ತಮಿಳುನಾಡು ಹನಿ ನೀರಾವರಿ ಯೋಜನೆ (100% ಸಬ್ಸಿಡಿ)',
      te: 'తమిళనాడు బిందు సేద్యం పథకం (100% రాయితీ)'
    },
    state: 'Tamil Nadu',
    department: 'Department of Horticulture and Plantation Crops, Govt. of Tamil Nadu',
    category: 'Micro-Irrigation & Drip',
    subsidyRate: '100% Subsidy for Small/Marginal Farmers (< 5 Acres)',
    subsidyType: 'Equipment Subsidy',
    description: 'Tamil Nadu offers India\'s most generous micro-irrigation subsidy: 100% complete waiver of drip system costs for Small & Marginal farmers (up to 5 acres / 2 hectares) and 75% subsidy for other landholders.',
    localDescriptions: {
      ta: '5 ஏக்கர் வரை நிலம் வைத்துள்ள சிறு மற்றும் குறு விவசாயிகளுக்கு சொட்டு நீர் பாசன கருவிகள் 100% முழு மானியத்தில் இலவசமாக வழங்கப்படுகிறது.',
      ml: '5 ഏക്കർ വരെയുള്ള ചെറുകിട കർഷകർക്ക് തുള്ളിനന ഉപകരണങ്ങൾ 100% സൗജന്യമായി നൽകുന്ന പദ്ധതി.',
      kn: '5 ಎಕರೆ ವರೆಗಿನ ಸಣ್ಣ ಮತ್ತು ಅತಿ ಸಣ್ಣ ರೈತರಿಗೆ ಹನಿ ನೀರಾವರಿ ಉಪಕರಣಗಳು 100% ಉಚಿತ.',
      te: '5 ఎకరాల లోపు ఉన్న చిన్న మరియు సన్నకారు రైతులకు బిందు సేద్యం పరికరాలు 100% ఉచితం.'
    },
    eligibilityDescription: 'Farmers in Tamil Nadu with water source (open well/borewell). Small/Marginal farmers get 100% subsidy; others get 75%.',
    minAcres: 0.5,
    maxAcres: 12.5,
    calculateEstimatedSubsidy: (inputs: FarmerInputs) => {
      // Cost ~₹32,000/acre. If <= 5 acres, 100% subsidy; if > 5 acres, 75% subsidy
      const rate = inputs.landArea <= 5 ? 32000 : 24000;
      return Math.round(inputs.landArea * rate);
    },
    keyHighlights: [
      'Zero out-of-pocket equipment cost for small & marginal farmers holding under 5 acres',
      'Includes ISI-marked UV-stabilized drip laterals, inline drippers, hydrocyclone filters, and valves',
      'Installed directly on your farm by accredited manufacturers (Jain, Netafim, EPC)',
      'Substantially cuts pumping power and preserves groundwater levels during dry summer months'
    ],
    requiredDocuments: [
      'Patta / Chitta and FMB sketch',
      'Small/Marginal Farmer Certificate from Tahsildar / Revenue Inspector',
      'Electricity / Well Certificate',
      'Aadhaar and Bank Passbook'
    ],
    applicationProcess: [
      'Register on TNMIS portal (tnhorticulture.tn.gov.in) or via Block Horticulture Officer',
      'Submit Patta, FMB sketch, and Aadhaar card at Horticulture portal or block office',
      'Horticulture Officer field verification of water source and survey number',
      'Work order issued to selected drip manufacturer for immediate installation'
    ],
    officialPortalUrl: 'https://tnhorticulture.tn.gov.in/horti/tnmis',
    portalName: 'Tamil Nadu Horticulture TNMIS Portal',
    helpline: '1800-180-1551 (Uzhavan Support)'
  },
  {
    id: 'tn-tnpl-buyback',
    name: 'TNAU & TNPL Industrial Agroforestry Buyback Floor Scheme',
    shortName: 'TNPL Timber Buyback',
    localNames: {
      ta: 'TNAU & TNPL தொழில்முறை வேளாண் வனவியல் கொள்முதல் திட்டம்',
      ml: 'TNPL വ്യാവസായിക വനവൽക്കരണ വാങ്ങൽ പദ്ധതി',
      kn: 'TNPL ಕೈಗಾರಿಕಾ ಅರಣ್ಯ ಕೃಷಿ ಖರೀದಿ ಯೋಜನೆ',
      te: 'TNPL పారిశ్రామిక వ్యవసాయ అటవీ కొనుగోలు పథకం'
    },
    state: 'Tamil Nadu',
    department: 'Forest College and Research Institute (TNAU) & TNPL',
    category: 'Direct Tree Cash Incentive (DBT)',
    subsidyRate: 'Assured Minimum Support Price Floor (₹7,500 - ₹9,000/Tonne)',
    subsidyType: 'Direct Benefit Transfer (DBT)',
    description: 'Contractual tripartite buyback assurance program between farmers, TNAU, and paper mills (TNPL / Seshasayee Paper) for fast-growing timber species like Melia Dubia (Malabar Neem) and Casuarina, guaranteeing zero marketing risk.',
    localDescriptions: {
      ta: 'மலைவேம்பு மற்றும் சவுக்கு மரங்களுக்கு டன் ஒன்றுக்கு ₹7,500 முதல் ₹9,000 வரை உத்தரவாத குறைந்தபட்ச கொள்முதல் விலை மற்றும் முத்தரப்பு ஒப்பந்தம்.',
      ml: 'മലവേപ്പ്, കാറ്റാടി മരങ്ങൾക്ക് ടണ്ണിന് ₹7,500 മുതൽ ₹9,000 വരെ കുറഞ്ഞ താങ്ങുവില ഉറപ്പുനൽകുന്ന വാങ്ങൽ കരാർ.',
      kn: 'ಹೆಬ್ಬೇವು ಮತ್ತು ಕ್ಯಾಸುರಿನಾ ಮರಗಳಿಗೆ ಟನ್‌ಗೆ ₹7,500 ರಿಂದ ₹9,000 ಖಚಿತ ಬೆಂಬಲ ಬೆಲೆ ಒದಗಿಸುವ ಖರೀದಿ ಯೋಜನೆ.',
      te: 'మలబార్ వేప మరియు సర్వి చెట్లకు టన్నుకు ₹7,500 నుండి ₹9,000 వరకు కనీస మద్దతు ధర హామీ పథకం.'
    },
    eligibilityDescription: 'Farmers cultivating Melia Dubia, Casuarina, or Eucalyptus in Tamil Nadu districts.',
    minAcres: 1.0,
    maxAcres: 50,
    suitableTreeTypes: ['Fast-Growing Timber', 'Commercial Pulpwood', 'Any / Optimized'],
    calculateEstimatedSubsidy: (inputs: FarmerInputs) => {
      // Risk mitigation value + subsidized clonal saplings savings
      return Math.round(inputs.landArea * 15000);
    },
    keyHighlights: [
      'Guaranteed buyback floor price protects farmers against local timber middleman exploitation',
      'Tissue-cultured elite clones supplied at 40% subsidized rate by TNAU Mettupalayam',
      'Harvest cycle between 4–6 years with direct mill weighment and instant RTGS payment',
      'Carbon credits remain 100% retained by the farmer under GreenVest ARR accounting'
    ],
    requiredDocuments: [
      'Farmland Patta / Chitta',
      'Aadhaar and Bank Account details',
      'Signed tripartite agroforestry agreement'
    ],
    applicationProcess: [
      'Contact Forest College and Research Institute (TNAU Mettupalayam) or nearest TNPL plantation office',
      'Procure authenticated elite Melia Dubia clonal plantlets',
      'Execute buyback agreement with designated paper mill representative',
      'Harvest support and logistics arranged by the mill upon timber maturity'
    ],
    officialPortalUrl: 'https://sites.google.com/tnau.ac.in/fcri-agroforestry',
    portalName: 'TNAU Agroforestry & Farm Forestry Cell',
    helpline: '04254-222010 (TNAU Forest College, Mettupalayam)'
  },

  // ==========================================
  // KARNATAKA STATE SCHEMES
  // ==========================================
  {
    id: 'ka-kapy',
    name: 'Krishi Aranya Protsaha Yojane (KAPY - Direct Tree Cash Incentive)',
    shortName: 'Karnataka KAPY Scheme',
    localNames: {
      ta: 'கர்நாடக கிருஷி ஆரண்ய புரோத்சாஹ யோஜனை (மரத்திற்கு ₹125 ரொக்க மானியம்)',
      ml: 'കർണാടക കൃഷി അരണ്യ പ്രോത്സാഹന യോജന (മരത്തിന് ₹125 നേരിട്ട്)',
      kn: 'ಕೃಷಿ ಅರಣ್ಯ ಪ್ರೋತ್ಸಾಹ ಯೋಜನೆ (KAPY - ಪ್ರತಿ ಮರಕ್ಕೆ ₹125 ನೇರ ಪ್ರೋತ್ಸಾಹ ಧನ)',
      te: 'కర్ణాటక కృషి అరణ్య ప్రోత్సాహ యోజన (చెట్టుకు ₹125 నగదు ప్రోత్సాహకం)'
    },
    state: 'Karnataka',
    department: 'Karnataka Forest Department',
    category: 'Direct Tree Cash Incentive (DBT)',
    subsidyRate: '₹125 Cash per Surviving Tree over 3 Years',
    subsidyType: 'Cash Incentive per Tree',
    description: 'Karnataka\'s flagship incentive scheme paying direct cash incentives into farmers\' bank accounts for every surviving tree planted on private farmland: ₹35 in Year 1, ₹40 in Year 2, and ₹50 in Year 3. Seedlings supplied at nominal ₹1–₹3.',
    localDescriptions: {
      ta: 'தனியார் விவசாய நிலத்தில் வளரும் ஒவ்வொரு மரத்திற்கும் 3 ஆண்டுகளில் ₹125 நேரடி பண உதவி (ஆண்டு 1-ல் ₹35, ஆண்டு 2-ல் ₹40, ஆண்டு 3-ல் ₹50).',
      ml: 'കൃഷിഭൂമിയിൽ നട്ടുപിടിപ്പിക്കുന്ന ഓരോ മരത്തിനും 3 വർഷങ്ങളിലായി ₹125 ബാങ്ക് അക്കൗണ്ടിലേക്ക് നേരിട്ട് നൽകുന്ന പ്രോത്സാഹന പദ്ധതി.',
      kn: 'ರೈತರ ಜಮೀನಿನಲ್ಲಿ ಉಳಿದುಕೊಂಡ ಪ್ರತಿ ಮರಕ್ಕೆ 3 ವರ್ಷಗಳಲ್ಲಿ ಒಟ್ಟು ₹125 ನೇರ ನಗದು ಪ್ರೋತ್ಸಾಹ ಧನ (1ನೇ ವರ್ಷ ₹35, 2ನೇ ವರ್ಷ ₹40, 3ನೇ ವರ್ಷ ₹50). ಸಸಿಗಳು ಕೇವಲ ₹1-₹3 ಕ್ಕೆ ಲಭ್ಯ.',
      te: 'రైతుల సొంత భూమిలో బ్రతికి ఉన్న ప్రతి చెట్టుకు 3 సంవత్సరాలలో మొత్తం ₹125 నగదు ప్రోత్సాహకం (1వ సంవత్సరం ₹35, 2వ సంవత్సరం ₹40, 3వ సంవత్సరం ₹50).'
    },
    eligibilityDescription: 'Any landholding farmer in Karnataka planting timber, horticulture, or medicinal trees on private land.',
    minAcres: 0.5,
    maxAcres: 50,
    calculateEstimatedSubsidy: (inputs: FarmerInputs) => {
      const treesPerAcre = inputs.plantingModel === 'Boundary / Bund Agroforestry' ? 70 : 250;
      const totalTrees = Math.round(inputs.landArea * treesPerAcre);
      // Expected survival rate ~80% * ₹125 = ₹100 net cash per tree planted
      return Math.round(totalTrees * 0.8 * 125);
    },
    keyHighlights: [
      'Direct cash deposited into farmer\'s Aadhaar-linked bank account (DBT) annually',
      'Saplings supplied from Forest Department nurseries at just ₹1 to ₹3 per seedling',
      'High-value species covered: Teak, Melia Dubia, Mahogany, Silver Oak, Sandalwood, Bamboo',
      'Complete farmer ownership: timber felling rights remain 100% with the farmer'
    ],
    requiredDocuments: [
      'Pahani / RTC (Record of Rights, Tenancy and Crops)',
      'Aadhaar Card copy',
      'Bank Passbook with IFSC code',
      'Passport size photo'
    ],
    applicationProcess: [
      'Collect Form 1 from the nearest Range Forest Officer (RFO) or apply online on Karnataka KAPY portal',
      'Procure seedlings during June–August monsoon planting season',
      'Forest Department Forester visits farm in Oct–Nov for tree counting and GPS tagging',
      'Direct benefit cash transfer credited into bank account in tranches'
    ],
    officialPortalUrl: 'https://aranya.gov.in',
    portalName: 'Karnataka Forest Department KAPY Portal',
    helpline: '1800-425-1212 (Karnataka Forest Toll-Free)'
  },
  {
    id: 'ka-micro-drip',
    name: 'Karnataka Drip & Micro-Irrigation Subsidy Scheme',
    shortName: 'Karnataka Drip Scheme',
    localNames: {
      ta: 'கர்நாடக சொட்டு நீர் பாசன மானிய திட்டம்',
      ml: 'കർണാടക തുള്ളിനന സബ്‌സിഡി പദ്ധതി',
      kn: 'ಕರ್ನಾಟಕ ಸೂಕ್ಷ್ಮ ಹನಿ ನೀರಾವರಿ ಸಬ್ಸಿಡಿ ಯೋಜನೆ (90% ವರೆಗೆ ರಿಯಾಯಿತಿ)',
      te: 'కర్ణాటక బిందు సేద్యం రాయితీ పథకం'
    },
    state: 'Karnataka',
    department: 'Department of Horticulture & Agriculture, Govt. of Karnataka',
    category: 'Micro-Irrigation & Drip',
    subsidyRate: '75% - 90% Subsidy on Micro-Irrigation',
    subsidyType: 'Equipment Subsidy',
    description: 'Provides 90% financial assistance for SC/ST farmers and 75% for general small/marginal farmers for installing drip irrigation systems in tree orchards and agroforestry parcels.',
    localDescriptions: {
      ta: 'கர்நாடகாவில் மரம் மற்றும் தோட்டக்கலை நிலங்களுக்கு 75% முதல் 90% மானியத்தில் சொட்டு நீர் பாசன உபகரணங்கள்.',
      ml: 'കർണാടകയിലെ കർഷകർക്ക് 75% മുതൽ 90% വരെ സബ്‌സിഡിയിൽ തുള്ളിനന ഉപകരണങ്ങൾ നൽകുന്നു.',
      kn: 'ಪರಿಶಿಷ್ಟ ಜಾತಿ/ಪಂಗಡದ ರೈತರಿಗೆ 90% ಮತ್ತು ಸಾಮಾನ್ಯ ಸಣ್ಣ ರೈತರಿಗೆ 75% ಸಬ್ಸಿಡಿಯಲ್ಲಿ ಹನಿ ನೀರಾವರಿ ಘಟಕ ವಿತರಣೆ.',
      te: 'ఎస్సీ/ఎస్టీ రైతులకు 90% మరియు ఇతర చిన్న రైతులకు 75% రాయితీతో డ్రిప్ పరికరాల అందజేత.'
    },
    eligibilityDescription: 'Farmers in Karnataka with verified open well, borewell, or lift irrigation source.',
    minAcres: 0.5,
    maxAcres: 12.5,
    calculateEstimatedSubsidy: (inputs: FarmerInputs) => {
      const rate = inputs.landArea <= 5 ? 24000 : 18000;
      return Math.round(inputs.landArea * rate);
    },
    keyHighlights: [
      'Up to 90% equipment subsidy significantly reduces capital strain for orchard tree establishment',
      'Includes online/offline drippers, filtration units, and main/sub-main PVC pipes',
      'Integration with Bhoomi revenue software for swift online document verification',
      'Preserves precious aquifer water in drought-prone northern and central Karnataka dry belts'
    ],
    requiredDocuments: [
      'RTC / Pahani (latest digital copy)',
      'Aadhaar Card',
      'Caste Certificate (for 90% SC/ST quota)',
      'Electricity / Borewell NOC'
    ],
    applicationProcess: [
      'Apply online via Karnataka Samrakshane / Horticulture department portal',
      'Senior Assistant Director of Horticulture (SADH) verifies RTC and water source',
      'Empanelled drip company installs setup on farmer field',
      'Joint physical verification followed by direct DBT subsidy release'
    ],
    officialPortalUrl: 'https://horticulturedir.karnataka.gov.in',
    portalName: 'Karnataka Department of Horticulture',
    helpline: '080-26571974 (Directorate of Horticulture, Lalbagh)'
  },
  {
    id: 'ka-sandalwood',
    name: 'Hasiru Karnataka & Sandalwood Private Cultivation Promotion',
    shortName: 'Karnataka Sandalwood Drive',
    localNames: {
      ta: 'கர்நாடக சந்தன மர வளர்ப்பு ஊக்குவிப்பு திட்டம்',
      ml: 'കർണാടക ചന്ദന കൃഷി പ്രോത്സാഹന പദ്ധതി',
      kn: 'ಸಿರಿಗಂಧ ಕೃಷಿ ಪ್ರೋತ್ಸಾಹ ಯೋಜನೆ ಮತ್ತು ಮರಗಳ ರಕ್ಷಣೆ',
      te: 'కర్ణాటక చందనం చెట్ల సాగు ప్రోత్సాహక పథకం'
    },
    state: 'Karnataka',
    department: 'Karnataka Forest Department & KSDL',
    category: 'Plantation & Sapling Subsidy',
    subsidyRate: 'Subsidized Seedlings + 50% Fencing Support',
    subsidyType: '100% Free Saplings',
    description: 'Karnataka state allows private farmers to grow, harvest, and sell authentic Indian Sandalwood (Santalum album) with subsidized seedlings, single-window felling/transit licenses, and buyback via Karnataka Soaps (KSDL).',
    localDescriptions: {
      ta: 'தனியார் நிலங்களில் சந்தன மரம் வளர்க்க மானிய கன்றுகள், சோலார் வேலி அமைக்க 50% மானியம் மற்றும் அரசு கொள்முதல் உத்தரவாதம்.',
      ml: 'സ്വകാര്യ ഭൂമിയിൽ ചന്ദനം നട്ടുപിടിപ്പിക്കാൻ സബ്‌സിഡി തൈകളും സോളാർ ഫെൻസിംഗിന് 50% സഹായവും.',
      kn: 'ಖಾಸಗಿ ಜಮೀನಿನಲ್ಲಿ ಸಿರಿಗಂಧ ಬೆಳೆಯಲು ಸಹಾಯಧನ, ಸೌರ ಬೇಲಿಗೆ 50% ಸಬ್ಸಿಡಿ ಮತ್ತು ಸರಕಾರದಿಂದಲೇ ಸುರಕ್ಷಿತ ಖರೀದಿ ವ್ಯವಸ್ಥೆ.',
      te: 'రైతుల భూముల్లో చందనం చెట్ల సాగుకు రాయితీ మొక్కలు, సోలార్ కంచెకు 50% రాయితీ మరియు ప్రభుత్వ కొనుగోలు హామీ.'
    },
    eligibilityDescription: 'Farmers in Karnataka with well-drained red loam or laterite soils with perimeter fencing.',
    minAcres: 1.0,
    maxAcres: 20,
    suitableTreeTypes: ['High-Value Hardwood', 'High-Value Timber', 'Any / Optimized'],
    calculateEstimatedSubsidy: (inputs: FarmerInputs) => {
      return Math.round(inputs.landArea * 22000);
    },
    keyHighlights: [
      'Indian Sandalwood heartwood yields ₹12,000–₹16,000/kg at maturity',
      'Assistance for host plants (Cajanus cajan, Casuarina) essential for hemiparasitic sandalwood roots',
      '50% subsidy for solar chain-link fencing to prevent timber poaching',
      'Direct purchase linkage with Karnataka Soaps & Detergents Ltd (KSDL / Mysore Sandal)'
    ],
    requiredDocuments: [
      'RTC / Pahani',
      'Aadhaar and Farmer Registration ID',
      'Panchayat plantation declaration'
    ],
    applicationProcess: [
      'Procure certified Santalum album seedlings from KFD research nurseries',
      'Register tree count with the local Range Forest Officer (RFO)',
      'RFO issues tree registration certificate ensuring lifetime ownership'
    ],
    officialPortalUrl: 'https://aranya.gov.in',
    portalName: 'Karnataka Forest Sandalwood Desk',
    helpline: '1800-425-1212'
  },

  // ==========================================
  // KERALA STATE SCHEMES
  // ==========================================
  {
    id: 'kl-haritha-keralam',
    name: 'Subiksha Keralam & Haritha Keralam Agroforestry Initiative',
    shortName: 'Haritha Keralam Agroforestry',
    localNames: {
      ta: 'கேரளா சுபிக்ஷா & ஹரித கேரளம் வேளாண் வனவியல் திட்டம்',
      ml: 'സുഭിക്ഷ കേരളം & ഹരിതകേരളം മിഷൻ കാർഷിക വനവൽക്കരണം',
      kn: 'ಕೇರಳ ಸುಭಿಕ್ಷ & ಹರಿತ ಕೇರಳ ಕೃಷಿ ಅರಣ್ಯ ಯೋಜನೆ',
      te: 'కేరళ సుభిక్ష & హరిత కేరళ వ్యవసాయ అటవీ పథకం'
    },
    state: 'Kerala',
    department: "Department of Agriculture Development and Farmers' Welfare, Govt. of Kerala",
    category: 'Plantation & Sapling Subsidy',
    subsidyRate: '₹12,000 - ₹20,000 per Hectare Direct Grant',
    subsidyType: 'Direct Benefit Transfer (DBT)',
    description: 'Promotes agroforestry tree planting, soil conservation, and riverbank afforestation in Kerala. Provides financial assistance for planting multipurpose timber trees (Teak, Mahogany, Anjili, Nutmeg) on farmland boundaries and slopes.',
    localDescriptions: {
      ta: 'சரிவான மற்றும் வரப்பு நிலங்களில் மண் அரிப்பைத் தடுத்து தேக்கு, மகோகனி, அஞ்சிலி போன்ற மரங்களை நட ஏக்கருக்கு நிதி உதவி.',
      ml: 'ചരിവ് പ്രദേശങ്ങളിലും പാടവരമ്പുകളിലും തേക്ക്, മഹാഗണി, ആഞ്ഞിലി തുടങ്ങിയ മരങ്ങൾ വെച്ചുപിടിപ്പിക്കാൻ ഹെക്ടറിന് ₹20,000 വരെ ധനസഹായം.',
      kn: 'ಇಳಿಜಾರು ಜಮೀನುಗಳಲ್ಲಿ ಮಣ್ಣಿನ ಸವೆತ ತಡೆದು ತೇಗ, ಮಹೋಗಾನಿ ಬೆಳೆಸಲು ಹೆಕ್ಟೇರಿಗೆ ₹20,000 ವರೆಗೆ ಸಹಾಯಧನ.',
      te: 'వాలు భూములలో నేల కోతను నివారించి టేకు, మహాగని చెట్లు నాటడానికి హెక్టారుకు ₹20,000 వరకు ఆర్థిక సహాయం.'
    },
    eligibilityDescription: 'Small and marginal farmers in Kerala with registered homestead or plantation land.',
    minAcres: 0.5,
    maxAcres: 15,
    calculateEstimatedSubsidy: (inputs: FarmerInputs) => {
      return Math.round(inputs.landArea * 8000);
    },
    keyHighlights: [
      'Direct grant credited into Kerala AIMS farmer bank account',
      'Enhances slope stability and minimizes monsoon landslide erosion in hill districts (Wayanad, Idukki, Palakkad)',
      'Complements rubber, tea, and spice estates with indigenous hardwood boundaries',
      'Convergence with Mahatma Gandhi NREGS for pitting and sapling care'
    ],
    requiredDocuments: [
      'Thandapper / Land Tax Receipt',
      'Aadhaar and Kerala AIMS Farmer Registration ID',
      'Bank passbook copy'
    ],
    applicationProcess: [
      'Register on Kerala Agricultural Information Management System (AIMS) portal',
      'Select local Krishi Bhavan and submit tree planting proposal',
      'Agricultural Officer inspects plot and sanctions sapling grant',
      'Funds credited via DBT'
    ],
    officialPortalUrl: 'https://aims.kerala.gov.in',
    portalName: 'Kerala AIMS Agriculture Portal',
    helpline: '1800-425-1661 (Kerala Kisan Call Centre)'
  },
  {
    id: 'kl-shm-spices',
    name: 'State Horticulture Mission - Kerala (SHM-K) Multi-Tier Agroforestry',
    shortName: 'SHM Multi-Tier Spice Trees',
    localNames: {
      ta: 'கேரளா தோட்டக்கலை இயக்கம் (மரங்களில் மிளகு & மசாலா சாகுபடி)',
      ml: 'സംസ്ഥാന ഹോർട്ടികൾച്ചർ മിഷൻ മൾട്ടി-ടയർ കാർഷിക വനവൽക്കരണം',
      kn: 'ಕೇರಳ ತೋಟಗಾರಿಕಾ ಮಿಷನ್ (ಮರಗಳ ಮೇಲೆ ಕಾಳುಮೆಣಸು & ಸಾಂಬಾರ ಕೃಷಿ)',
      te: 'కేరళ హార్టికల్చర్ మిషన్ (చెట్లపై మిరియాలు & మసాలా సాగు)'
    },
    state: 'Kerala',
    department: 'State Horticulture Mission - Kerala (SHM-K)',
    category: 'Organic & Soil Regeneration',
    subsidyRate: '40% Capital Cost Subsidy',
    subsidyType: 'Direct Benefit Transfer (DBT)',
    description: 'Promotes multi-tier agroforestry by integrating high-value black pepper vines trailing on live timber trees (Silver Oak, Teak, Grevillea, Casuarina) with shade-tolerant ginger/turmeric beneath, maximizing per-acre income.',
    localDescriptions: {
      ta: 'தேக்கு மற்றும் சில்வர் ஓக் மரங்களில் மிளகு கொடிகளை ஏற்றி பல அடுக்கு விவசாயம் செய்ய 40% மூலதன மானியம்.',
      ml: 'തേക്ക്, സിൽവർ ഓക്ക് തുടങ്ങിയ മരങ്ങളിൽ കുരുമുളക് വള്ളികൾ പടർത്തി അധിക വരുമാനം നേടാൻ 40% സബ്‌സിഡി സഹായം.',
      kn: 'ತೇಗ ಮತ್ತು ಸಿಲ್ವರ್ ಓಕ್ ಮರಗಳ ಮೇಲೆ ಕಾಳುಮೆಣಸು ಬಳ್ಳಿ ಹಬ್ಬಿಸಿ ಬಹುಸ್ತರ ಕೃಷಿ ಮಾಡಲು 40% ಸಬ್ಸಿಡಿ.',
      te: 'టేకు మరియు సిల్వర్ ఓక్ చెట్లపై మిరియాల తీగలు పాకించి బహుళ అంచెల సాగుకు 40% రాయితీ.'
    },
    eligibilityDescription: 'Farmers in Kerala cultivating agroforestry parcels with tree canopies suitable for pepper trailing.',
    minAcres: 0.5,
    maxAcres: 10,
    calculateEstimatedSubsidy: (inputs: FarmerInputs) => {
      return Math.round(inputs.landArea * 16000);
    },
    keyHighlights: [
      'Converts standard timber plantation into high-value annual spice harvest generator',
      'Provides disease-resistant high-yielding black pepper cuttings (Panniyur varieties)',
      'Organic bio-fertilizer and micro-irrigation input support included',
      'Increases farm biodiversity and ecological resilience against climate shock'
    ],
    requiredDocuments: [
      'Land Tax Receipt & Possession Certificate',
      'Aadhaar Card and AIMS Portal profile',
      'Krishi Bhavan recommendation'
    ],
    applicationProcess: [
      'Apply at local Krishi Bhavan or District Mission Director office',
      'Inspection by Agricultural Officer to assess existing or planned tree canopy',
      'Distribution of certified pepper planting material and trellis inputs',
      'Subsidy released directly to bank account upon verification'
    ],
    officialPortalUrl: 'https://shm.kerala.gov.in',
    portalName: 'State Horticulture Mission Kerala',
    helpline: '0471-2330856 (SHM Directorate, Thiruvananthapuram)'
  },
  {
    id: 'kl-social-forestry',
    name: 'Social Forestry Free Seedling & Stumps Distribution',
    shortName: 'Kerala Social Forestry',
    localNames: {
      ta: 'கேரளா சமூக வனவியல் இலவச மரக்கன்றுகள் & ஸ்டம்புகள்',
      ml: 'സാമൂഹിക വനവൽക്കരണ വിഭാഗം സൗജന്യ തൈ വിതരണം',
      kn: 'ಕೇರಳ ಸಾಮಾಜಿಕ ಅರಣ್ಯ ಉಚಿತ ಸಸಿಗಳು',
      te: 'కేరళ సామాజిక అటవీ ఉచిత మొక్కల పంపిణీ'
    },
    state: 'Kerala',
    department: 'Social Forestry Wing, Kerala Forest Department',
    category: 'Plantation & Sapling Subsidy',
    subsidyRate: '100% Free Teak Stumps & Hardwood Saplings',
    subsidyType: '100% Free Saplings',
    description: 'Annual distribution of millions of free root stumps and polybag seedlings of Nilambur Teak, Rosewood (Dalbergia latifolia), Mahogany, and Rain Tree to farmers celebrating World Environment Day and Vana Mahotsava.',
    localDescriptions: {
      ta: 'நிலம்பூர் தேக்கு ரூட் ஸ்டம்புகள் மற்றும் விலைமதிப்பற்ற மரக்கன்றுகளை விவசாயிகளுக்கு 100% இலவசமாக வழங்கும் திட்டம்.',
      ml: 'നിലമ്പൂർ തേക്ക് സ്റ്റമ്പുകൾ, ഈട്ടി, മഹാഗണി തുടങ്ങിയ ഗുണമേന്മയുള്ള തൈകൾ കർഷകർക്ക് 100% സൗജന്യമായി വിതരണം ചെയ്യുന്നു.',
      kn: 'ನಿಲಂಬೂರ್ ತೇಗದ ಗಿಡಗಳು, ಬೀಟೆ ಮತ್ತು ಮಹೋಗಾನಿ ಸಸಿಗಳನ್ನು ರೈತರಿಗೆ 100% ಉಚಿತವಾಗಿ ನೀಡುವ ಯೋಜನೆ.',
      te: 'నిలంబూర్ టేకు స్టంప్‌లు, రోజ్‌వుడ్ మరియు మహాగని మొక్కలను రైతులకు 100% ఉచితంగా పంపిణీ చేసే పథకం.'
    },
    eligibilityDescription: 'Farmers in Kerala with agricultural or compound land suitable for planting.',
    minAcres: 0.25,
    maxAcres: 25,
    calculateEstimatedSubsidy: (inputs: FarmerInputs) => {
      const totalTrees = Math.round(inputs.landArea * 180);
      return totalTrees * 30;
    },
    keyHighlights: [
      'High-potency Nilambur teak root stumps known for superior heartwood growth',
      'Zero cost for registered farmers collecting from range nurseries',
      'Includes native shade and medicinal species (Kani Konna, Neem, Amla, Mahua)',
      'Simple application process with instant nursery pickup token'
    ],
    requiredDocuments: [
      'Aadhaar Card',
      'Land tax receipt or ration card'
    ],
    applicationProcess: [
      'Register with local Social Forestry Range Office during May-June',
      'Collect sapling requisition slip',
      'Collect seedlings directly from notified Forest Department nursery'
    ],
    officialPortalUrl: 'https://forest.kerala.gov.in',
    portalName: 'Kerala Forest Department Portal',
    helpline: '0471-2320108 (Social Forestry Wing)'
  },

  // ==========================================
  // ANDHRA PRADESH STATE SCHEMES
  // ==========================================
  {
    id: 'ap-apcnf',
    name: 'AP Community Managed Natural Farming (APCNF / RySS Tree Belt)',
    shortName: 'APCNF Natural Agroforestry',
    localNames: {
      ta: 'ஆந்திர இயற்கை வேளாண்மை இயக்கம் (365 நாள் பசுமை போர்வை & மர வரப்பு)',
      ml: 'ആന്ധ്രാ പ്രകൃതി കൃഷി മിഷൻ (365 ദിന ഹരിത വത്കരണം)',
      kn: 'ಆಂಧ್ರ ನೈಸರ್ಗಿಕ ಕೃಷಿ ಯೋಜನೆ (365 ದಿನಗಳ ಹಸಿರು ಹೊದಿಕೆ & ಮರಗಳು)',
      te: 'ఆంధ్రప్రదేశ్ కమ్యూనిటీ మేనేజ్డ్ నేచురల్ ఫార్మింగ్ (APCNF / 365 రోజుల పచ్చదనం)'
    },
    state: 'Andhra Pradesh',
    department: 'Rythu Sadhikara Samstha (RySS), Govt. of Andhra Pradesh',
    category: 'Organic & Soil Regeneration',
    subsidyRate: 'Free Bio-Input Kits + Seed Treatment Grants',
    subsidyType: 'Grant & Input Kit',
    description: 'Globally recognized Andhra Pradesh state natural farming program promoting 365-day green cover through multi-tier tree crops, Pre-Monsoon Dry Sowing (PMDS), biological seed treatment (Beejamrutham), and boundary timber belts without synthetic chemicals.',
    localDescriptions: {
      ta: 'ரசாயன உரங்கள் இன்றி 365 நாட்களும் நிலத்தில் பசுமை போர்வை மற்றும் மரங்கள் வளர்க்கும் ஆந்திர அரசு இயற்கை விவசாய திட்டம்.',
      ml: 'രാസവസ്തുക്കളില്ലാതെ 365 ദിവസവും പച്ചപ്പ് നിലനിർത്തുന്ന ആന്ധ്രാ പ്രകൃതി കാർഷിക പദ്ധതി.',
      kn: 'ರಾಸಾಯನಿಕ ಮುಕ್ತವಾಗಿ 365 ದಿನಗಳ ಹಸಿರು ಹೊದಿಕೆ ಮತ್ತು ಮರಗಳ ಕೃಷಿಗೆ ಉತ್ತೇಜನ ನೀಡುವ ಆಂಧ್ರ ಸರ್ಕಾರದ ಯೋಜನೆ.',
      te: 'రసాయన రహితంగా 365 రోజుల పాటు నేలను పచ్చదనంతో ఉంచి, గట్లపై కలప చెట్లను పెంచేందుకు రైతు సాధికార సంస్థ (RySS) అందిస్తున్న విశేష సహకారం.'
    },
    eligibilityDescription: 'Farmers in Andhra Pradesh committing to chemical-free natural farming and tree-based agroforestry.',
    minAcres: 0.5,
    maxAcres: 25,
    calculateEstimatedSubsidy: (inputs: FarmerInputs) => {
      return Math.round(inputs.landArea * 12000);
    },
    keyHighlights: [
      'Significantly boosts soil microbial activity and organic carbon (SOC) by 0.3% to 0.6% in 3 years',
      'Provides free multi-seed packets for Pre-Monsoon Dry Sowing (Navadhanya blends)',
      'Dedicated Community Resource Persons (CRPs) provide on-field mentoring at village level',
      'High Verra carbon additionality rating due to rigorous chemical-free management'
    ],
    requiredDocuments: [
      'Aadhaar Card',
      'Pattadar Passbook / 1-B Adangal',
      'Rythu Bharosa Kendra (RBK) registration'
    ],
    applicationProcess: [
      'Register at your local village Rythu Bharosa Kendra (RBK)',
      'Participate in village-level natural farming and bio-input preparation workshop',
      'Receive Navadhanya seeds and tree boundary planting kits',
      'Continuous monitoring and certification by RySS village team'
    ],
    officialPortalUrl: 'https://apcnf.in',
    portalName: 'AP Community Managed Natural Farming Portal',
    helpline: '1800-425-3444 (RySS Toll-Free Help Desk)'
  },
  {
    id: 'ap-apmip-drip',
    name: 'Andhra Pradesh Micro Irrigation Project (APMIP - Up to 90% Subsidy)',
    shortName: 'APMIP Micro-Irrigation',
    localNames: {
      ta: 'ஆந்திர நுண்பாசன திட்டம் (APMIP - 90% மானியம்)',
      ml: 'ആന്ധ്രാ സൂക്ഷ്മ ജലസേചന പദ്ധതി (90% സബ്‌സിഡി)',
      kn: 'ಆಂಧ್ರಪ್ರದೇಶ ಸೂಕ್ಷ್ಮ ನೀರಾವರಿ ಯೋಜನೆ (90% ಸಬ್ಸಿಡಿ)',
      te: 'ఆంధ్రప్రదేశ్ మైక్రో ఇరిగేషన్ ప్రాజెక్ట్ (APMIP - 90% వరకు డ్రిప్ రాయితీ)'
    },
    state: 'Andhra Pradesh',
    department: 'Department of Horticulture, Govt. of Andhra Pradesh',
    category: 'Micro-Irrigation & Drip',
    subsidyRate: '70% - 90% Subsidy on Drip Systems',
    subsidyType: 'Equipment Subsidy',
    description: 'Pioneering micro-irrigation project providing 90% subsidy for SC/ST and small/marginal farmers (holding up to 5 acres) and 70% for medium farmers (holding up to 12.5 acres) for drip irrigation equipment.',
    localDescriptions: {
      ta: 'ஆந்திராவில் 5 ஏக்கர் வரை உள்ள சிறு விவசாயிகளுக்கு 90% மானியத்தில் அதிநவீன சொட்டு நீர் பாசன கருவிகள்.',
      ml: '5 ഏക്കർ വരെയുള്ള ചെറുകിട കർഷകർക്ക് 90% സബ്‌സിഡിയിൽ തുള്ളിനന സംവിധാനം നൽകുന്ന പദ്ധതി.',
      kn: '5 ಎಕರೆ ವರೆಗಿನ ಸಣ್ಣ ರೈತರಿಗೆ 90% ರಿಯಾಯಿತಿಯಲ್ಲಿ ಹನಿ ನೀರಾವರಿ ಘಟಕ ವಿತರಣೆ.',
      te: 'ఎస్సీ/ఎస్టీ మరియు 5 ఎకరాల లోపు చిన్న, సన్నకారు రైతులకు 90% రాయితీతో, 12.5 ఎకరాల వరకు ఉన్న రైతులకు 70% రాయితీతో డ్రిప్ పరికరాల అందజేత.'
    },
    eligibilityDescription: 'Farmers in AP with water source (borewell or well) registered with village Rythu Bharosa Kendra.',
    minAcres: 0.5,
    maxAcres: 12.5,
    calculateEstimatedSubsidy: (inputs: FarmerInputs) => {
      const rate = inputs.landArea <= 5 ? 28000 : 20000;
      return Math.round(inputs.landArea * rate);
    },
    keyHighlights: [
      'Up to 90% financial subsidy covers premium drip lateral tubes, disc filters, air release valves, and venturi',
      'End-to-end integration with MeeSeva and RBK single-window service counters',
      'Protects orchards against severe Rayalaseema summer moisture stress',
      '7-year manufacturer warranty and free bi-annual service inspections'
    ],
    requiredDocuments: [
      'Pattadar Passbook / Digital Title Deed',
      'Aadhaar Card copy',
      'Small / Marginal Farmer Certificate from Tahsildar',
      'Electricity / Borewell water source verification'
    ],
    applicationProcess: [
      'Submit application at nearest Rythu Bharosa Kendra (RBK) or via MeeSeva portal',
      'Horticulture Officer field inspection and GPS survey layout drafting',
      'Selection of authorized drip supplier company by farmer',
      'Installation on farm followed by third-party quality verification'
    ],
    officialPortalUrl: 'https://apmip.ap.gov.in',
    portalName: 'APMIP Official Portal',
    helpline: '1800-425-0333 (APMIP Toll-Free Desk)'
  },
  {
    id: 'ap-red-sanders',
    name: 'AP Red Sanders & Melia Dubia Farm Forestry Promotion Scheme',
    shortName: 'AP Red Sanders Drive',
    localNames: {
      ta: 'ஆந்திர செம்மரம் & மலைவேம்பு பண்ணை வனவியல் ஊக்குவிப்பு',
      ml: 'ആന്ധ്രാ രക്തചന്ദന കാർഷിക വനവൽക്കരണ പദ്ധതി',
      kn: 'ಆಂಧ್ರ ರಕ್ತಚಂದನ ಮತ್ತು ಹೆಬ್ಬೇವು ಕೃಷಿ ಪ್ರೋತ್ಸಾಹ ಯೋಜನೆ',
      te: 'ఆంధ్రప్రదేశ్ ఎర్రచందనం మరియు మలబార్ వేప తోటల పెంపక పథకం'
    },
    state: 'Andhra Pradesh',
    department: 'Forest Department, Govt. of Andhra Pradesh',
    category: 'Plantation & Sapling Subsidy',
    subsidyRate: 'Certified High-Girth Seedlings + Simplified Transit Pass',
    subsidyType: '100% Free Saplings',
    description: 'Promotes private farming of globally coveted Red Sanders (Pterocarpus santalinus) and Melia Dubia on private farmlands in Andhra Pradesh (especially Chittoor, Kadapa, Nellore) with single-window felling and export deregulation.',
    localDescriptions: {
      ta: 'ராயலசீமா மற்றும் பிற மாவட்டங்களில் செம்மரம் மற்றும் மலைவேம்பு நடவு செய்ய வனத்துறை மூலம் கன்றுகள் மற்றும் சுலப போக்குவரத்து அனுமதி.',
      ml: 'സ്വകാര്യ ഭൂമിയിൽ രക്തചന്ദനവും മലവേപ്പും കൃഷി ചെയ്യുന്നതിന് സബ്‌സിഡി തൈകളും ലളിതമായ അനുമതി പത്രങ്ങളും നൽകുന്ന പദ്ധതി.',
      kn: 'ಖಾಸಗಿ ಕೃಷಿ ಜಮೀನಿನಲ್ಲಿ ರಕ್ತಚಂದನ ಬೆಳೆಯಲು ಅರಣ್ಯ ಇಲಾಖೆಯಿಂದ ಪ್ರಮಾಣೀಕೃತ ಸಸಿಗಳು ಮತ್ತು ಸುಲಭ ಪರವಾನಗಿ.',
      te: 'రైతుల సొంత భూముల్లో ప్రపంచ ప్రసిద్ధి చెందిన ఎర్రచందనం మరియు మలబార్ వేప సాగుకు అటవీ శాఖ ద్వారా నాణ్యమైన మొక్కలు మరియు సులభతర రవాణా అనుమతుల కల్పన.'
    },
    eligibilityDescription: 'Farmers in Andhra Pradesh with dry/semi-arid red loam, gravelly, or well-drained soils.',
    minAcres: 1.0,
    maxAcres: 30,
    suitableSoils: ['Red Loam (Semman)', 'Laterite', 'Sandy Loam'],
    suitableTreeTypes: ['High-Value Timber', 'High-Value Hardwood', 'Any / Optimized'],
    calculateEstimatedSubsidy: (inputs: FarmerInputs) => {
      return Math.round(inputs.landArea * 25000);
    },
    keyHighlights: [
      'Red Sanders fetches world-record heartwood auction rates in international markets',
      'Thrives in low-water, stony, and degraded red soils where regular crops face drought stress',
      'Government of Andhra Pradesh single-window registration guarantees hassle-free harvest permits',
      'Massive carbon biomass density qualifies for premium Voluntary Carbon Market (VCM) credits'
    ],
    requiredDocuments: [
      'Pattadar Passbook / 1-B Form',
      'Aadhaar Card',
      'GPS location survey sketch'
    ],
    applicationProcess: [
      'Register plantation on Andhra Pradesh Forest Department portal',
      'Procure authentic seed-orchard Red Sanders seedlings from Forest Division nurseries',
      'Local Divisional Forest Officer (DFO) inspects and issues Farm Tree Certificate',
      'Harvesting and transit approvals processed seamlessly online upon maturity'
    ],
    officialPortalUrl: 'https://forests.ap.gov.in',
    portalName: 'Andhra Pradesh Forest Department',
    helpline: '1800-425-4444 (AP Forest Helpline)'
  }
];

// Evaluates and ranks schemes against active farmer inputs
export function evaluateMatchedSchemes(inputs: FarmerInputs): MatchedSchemeResult[] {
  const currentFarmerState = inputs.state || 'Tamil Nadu';
  const acreage = Number(inputs.landArea) || 5;
  const isSmallMarginal = acreage <= 5;

  return GOVERNMENT_SCHEMES_DATABASE.map(scheme => {
    let matchScore = 50; // base score
    const matchReasons: string[] = [];
    const isDirectStateMatch = scheme.state === currentFarmerState;
    const isCentral = scheme.state === 'Central';

    // 1. State alignment
    if (isDirectStateMatch) {
      matchScore += 35;
      matchReasons.push(`Direct state alignment with your land in ${currentFarmerState}`);
    } else if (isCentral) {
      matchScore += 25;
      matchReasons.push(`Pan-India Central Government scheme available across ${currentFarmerState}`);
    } else {
      matchScore -= 30;
      matchReasons.push(`State-specific scheme for ${scheme.state}`);
    }

    // 2. Acreage & Landholding category
    if (isSmallMarginal) {
      matchScore += 15;
      matchReasons.push(`Eligible for priority Small & Marginal Farmer benefits (<= 5 acres)`);
    } else {
      matchScore += 5;
      matchReasons.push(`Applicable for commercial landholding (${acreage} acres)`);
    }

    // 3. Water availability alignment
    if (inputs.waterAvailability === 'Rainfed' && (scheme.category === 'Micro-Irrigation & Drip' || scheme.category === 'Solar Energy & Pumping')) {
      matchScore += 15;
      matchReasons.push(`Crucial high-priority match to solve rainfed moisture constraints on your plot`);
    } else if (inputs.waterAvailability === 'Moderate' && scheme.category === 'Micro-Irrigation & Drip') {
      matchScore += 10;
      matchReasons.push(`Optimizes moderate water availability with precision irrigation`);
    }

    // 4. Planting model & Tree type alignment
    if (scheme.id === 'central-smaf' && inputs.plantingModel === 'Boundary / Bund Agroforestry') {
      matchScore += 15;
      matchReasons.push(`Specifically designed for boundary and bund agroforestry planting`);
    }
    if (scheme.id === 'central-nbm-bamboo' && inputs.preferredTreeType === 'Fast-Growing Biomass') {
      matchScore += 20;
      matchReasons.push(`Tailor-made for rapid biomass production and fast carbon harvesting`);
    }
    if ((scheme.id === 'ka-sandalwood' || scheme.id === 'ap-red-sanders') && inputs.preferredTreeType === 'High-Value Timber') {
      matchScore += 15;
      matchReasons.push(`Matches your preference for high-value timber cultivation`);
    }

    // Cap score at 100
    const finalScore = Math.min(Math.max(matchScore, 10), 100);
    const estimatedSubsidy = scheme.calculateEstimatedSubsidy(inputs);

    const isEligible = isDirectStateMatch || isCentral;

    return {
      scheme,
      isDirectStateMatch,
      isEligible,
      estimatedSubsidyAmount: estimatedSubsidy,
      matchScore: finalScore,
      matchReasons
    };
  }).sort((a, b) => {
    // Sort by eligibility first, then matchScore descending
    if (a.isEligible && !b.isEligible) return -1;
    if (!a.isEligible && b.isEligible) return 1;
    return b.matchScore - a.matchScore;
  });
}
