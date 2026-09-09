import { RecommendedSpecies } from '../types/greenvest';

export interface DistrictAgroData {
  state: string;
  district: string;
  annualRainfallMm: number;
  dominantSoils: string[];
  climateZone: string;
  recommendedNativeSpecies: string[];
}

export const DISTRICT_DATABASE: Record<string, DistrictAgroData[]> = {
  'Tamil Nadu': [
    {
      state: 'Tamil Nadu',
      district: 'Coimbatore',
      annualRainfallMm: 680,
      dominantSoils: ['Red Loam (Semman)', 'Black Soil (Karisal)', 'Sandy Loam'],
      climateZone: 'Semi-Arid Western Zone',
      recommendedNativeSpecies: ['melia-dubia', 'teak', 'neem', 'casuarina']
    },
    {
      state: 'Tamil Nadu',
      district: 'Thanjavur',
      annualRainfallMm: 1120,
      dominantSoils: ['Alluvial (Vandaloor)', 'Clay Loam', 'Red Loam (Semman)'],
      climateZone: 'Cauvery Delta High-Moisture Zone',
      recommendedNativeSpecies: ['teak', 'mahogany', 'melia-dubia', 'bamboo']
    },
    {
      state: 'Tamil Nadu',
      district: 'Madurai',
      annualRainfallMm: 840,
      dominantSoils: ['Red Loam (Semman)', 'Black Soil (Karisal)', 'Laterite'],
      climateZone: 'Southern Dry Semi-Arid Zone',
      recommendedNativeSpecies: ['pongamia', 'red-sanders', 'melia-dubia', 'neem']
    },
    {
      state: 'Tamil Nadu',
      district: 'Dharmapuri',
      annualRainfallMm: 850,
      dominantSoils: ['Red Loam (Semman)', 'Laterite', 'Sandy Loam'],
      climateZone: 'North Western Plateau Zone',
      recommendedNativeSpecies: ['melia-dubia', 'red-sanders', 'teak', 'subabul']
    },
    {
      state: 'Tamil Nadu',
      district: 'Tirunelveli',
      annualRainfallMm: 810,
      dominantSoils: ['Red Loam (Semman)', 'Black Soil (Karisal)', 'Sandy Alluvial'],
      climateZone: 'Southern Plains & Coastal Hinterland',
      recommendedNativeSpecies: ['casuarina', 'melia-dubia', 'pongamia', 'neem']
    },
    {
      state: 'Tamil Nadu',
      district: 'Erode',
      annualRainfallMm: 710,
      dominantSoils: ['Red Loam (Semman)', 'Black Soil (Karisal)'],
      climateZone: 'Western Semi-Arid Agricultural Basin',
      recommendedNativeSpecies: ['melia-dubia', 'teak', 'subabul', 'moringa']
    },
    {
      state: 'Tamil Nadu',
      district: 'Salem',
      annualRainfallMm: 980,
      dominantSoils: ['Red Loam (Semman)', 'Laterite', 'Black Soil (Karisal)'],
      climateZone: 'North Western Agro-Zone',
      recommendedNativeSpecies: ['teak', 'melia-dubia', 'red-sanders', 'bamboo']
    },
    {
      state: 'Tamil Nadu',
      district: 'Cuddalore',
      annualRainfallMm: 1250,
      dominantSoils: ['Alluvial (Vandaloor)', 'Sandy Loam', 'Clay Loam'],
      climateZone: 'Coastal Agro-Ecological Zone',
      recommendedNativeSpecies: ['casuarina', 'mahogany', 'teak', 'melia-dubia']
    }
  ],
  'Karnataka': [
    {
      state: 'Karnataka',
      district: 'Mysuru',
      annualRainfallMm: 790,
      dominantSoils: ['Red Loam (Semman)', 'Clay Loam'],
      climateZone: 'Southern Dry/Transition Zone',
      recommendedNativeSpecies: ['teak', 'melia-dubia', 'sandalwood', 'bamboo']
    },
    {
      state: 'Karnataka',
      district: 'Dharwad',
      annualRainfallMm: 770,
      dominantSoils: ['Black Soil (Karisal)', 'Red Loam (Semman)'],
      climateZone: 'Northern Transition Zone',
      recommendedNativeSpecies: ['melia-dubia', 'teak', 'subabul']
    }
  ],
  'Andhra Pradesh': [
    {
      state: 'Andhra Pradesh',
      district: 'Chittoor',
      annualRainfallMm: 920,
      dominantSoils: ['Red Loam (Semman)', 'Laterite'],
      climateZone: 'Southern Agro-Zone',
      recommendedNativeSpecies: ['red-sanders', 'melia-dubia', 'pongamia', 'teak']
    },
    {
      state: 'Andhra Pradesh',
      district: 'Guntur',
      annualRainfallMm: 890,
      dominantSoils: ['Black Soil (Karisal)', 'Alluvial (Vandaloor)'],
      climateZone: 'Krishna Agro Basin',
      recommendedNativeSpecies: ['subabul', 'casuarina', 'teak']
    }
  ],
  'Kerala': [
    {
      state: 'Kerala',
      district: 'Palakkad',
      annualRainfallMm: 2150,
      dominantSoils: ['Laterite', 'Red Loam (Semman)', 'Clay Loam', 'Alluvial (Vandaloor)'],
      climateZone: 'Palakkad Gap Semi-Wet Agro-Zone',
      recommendedNativeSpecies: ['teak', 'mahogany', 'melia-dubia', 'bamboo']
    },
    {
      state: 'Kerala',
      district: 'Wayanad',
      annualRainfallMm: 2750,
      dominantSoils: ['Laterite', 'Forest Loam', 'Clay Loam'],
      climateZone: 'Western Ghats High Altitude Agro-Forestry Zone',
      recommendedNativeSpecies: ['silver-oak', 'mahogany', 'teak', 'bamboo']
    },
    {
      state: 'Kerala',
      district: 'Idukki',
      annualRainfallMm: 3300,
      dominantSoils: ['Laterite', 'Clay Loam', 'Forest Loam'],
      climateZone: 'High Ranges Hill Agro-Ecological Zone',
      recommendedNativeSpecies: ['silver-oak', 'mahogany', 'teak', 'bamboo']
    },
    {
      state: 'Kerala',
      district: 'Thrissur',
      annualRainfallMm: 2900,
      dominantSoils: ['Alluvial (Vandaloor)', 'Laterite', 'Clay Loam'],
      climateZone: 'Central Midland Agro-Forestry Corridor',
      recommendedNativeSpecies: ['teak', 'mahogany', 'casuarina', 'melia-dubia']
    },
    {
      state: 'Kerala',
      district: 'Kozhikode',
      annualRainfallMm: 3250,
      dominantSoils: ['Laterite', 'Sandy Loam', 'Alluvial (Vandaloor)'],
      climateZone: 'Malabar Coastal Agro-Ecological Zone',
      recommendedNativeSpecies: ['mahogany', 'teak', 'casuarina', 'melia-dubia']
    },
    {
      state: 'Kerala',
      district: 'Malappuram',
      annualRainfallMm: 2800,
      dominantSoils: ['Laterite', 'Red Loam (Semman)', 'Sandy Loam'],
      climateZone: 'Midland River-Basin Agroforestry Zone',
      recommendedNativeSpecies: ['teak', 'mahogany', 'melia-dubia', 'bamboo']
    },
    {
      state: 'Kerala',
      district: 'Kottayam',
      annualRainfallMm: 2850,
      dominantSoils: ['Laterite', 'Clay Loam', 'Alluvial (Vandaloor)'],
      climateZone: 'Southern Midland Agro-Plantation Zone',
      recommendedNativeSpecies: ['teak', 'mahogany', 'bamboo']
    },
    {
      state: 'Kerala',
      district: 'Kasaragod',
      annualRainfallMm: 3450,
      dominantSoils: ['Laterite', 'Sandy Loam', 'Alluvial (Vandaloor)'],
      climateZone: 'North Malabar High-Precipitation Coastal Belt',
      recommendedNativeSpecies: ['casuarina', 'teak', 'mahogany', 'melia-dubia']
    }
  ]
};

export const ALL_SPECIES_CATALOG: Record<string, RecommendedSpecies> = {
  'melia-dubia': {
    id: 'melia-dubia',
    name: 'Malabar Neem',
    tamilName: 'மலை வேம்பு (Malai Vembu)',
    botanicalName: 'Melia dubia Cav.',
    type: 'Fast-Growing Timber',
    rationale: 'Rapid biomass accumulation (18–28 kg/tree/yr); optimal for agroforestry bunds and intercropping without severe shading of companion crops.',
    annualBiomassGrowthRate: '20 - 28 kg dry biomass/tree/yr',
    spacingRecommendation: '3m x 3m (450 trees/ac) or 4m x 4m boundary',
    survivalRateExpected: 0.88,
    rotationCycleYears: 8,
    timberOrYieldBenefit: 'High demand in plywood & packing industries (₹4,000–₹7,000/tonne at Year 7-8).',
    droughtTolerance: 'High'
  },
  'teak': {
    id: 'teak',
    name: 'Indian Teak',
    tamilName: 'தேக்கு (Thekku)',
    botanicalName: 'Tectona grandis L.f.',
    type: 'High-Value Hardwood',
    rationale: 'Dense carbon sink with exceptional long-term carbon retention; deep taproot draws deep moisture without competing for surface fertilizer.',
    annualBiomassGrowthRate: '15 - 22 kg dry biomass/tree/yr',
    spacingRecommendation: '3m x 3m or 4m x 3m (300–400 trees/ac)',
    survivalRateExpected: 0.84,
    rotationCycleYears: 15,
    timberOrYieldBenefit: 'Grade-A timber market valuation of ₹20,000–₹45,000 per mature tree at harvest.',
    droughtTolerance: 'Medium'
  },
  'casuarina': {
    id: 'casuarina',
    name: 'Beefwood / Casuarina',
    tamilName: 'சவுக்கு (Savukku)',
    botanicalName: 'Casuarina equisetifolia',
    type: 'Commercial Pulpwood',
    rationale: 'Nitrogen-fixing Frankia actinorhizal symbiosis; performs exceptionally well in sandy, coastal, or degraded soils with rapid carbon capture.',
    annualBiomassGrowthRate: '18 - 25 kg dry biomass/tree/yr',
    spacingRecommendation: '1.5m x 1.5m or 2m x 2m (800–1000 trees/ac)',
    survivalRateExpected: 0.90,
    rotationCycleYears: 4,
    timberOrYieldBenefit: 'Fast commercial turnover for paper pulp and construction props every 4–5 years.',
    droughtTolerance: 'High'
  },
  'red-sanders': {
    id: 'red-sanders',
    name: 'Red Sandalwood',
    tamilName: 'செம்மரம் (Semmaram)',
    botanicalName: 'Pterocarpus santalinus',
    type: 'High-Value Hardwood',
    rationale: 'Endemic dry deciduous specialist; thrives on rocky, gravelly red loam soils under scarce rainfall with very high wood density (0.85 g/cm³).',
    annualBiomassGrowthRate: '10 - 15 kg dry biomass/tree/yr',
    spacingRecommendation: '4m x 4m (250 trees/ac)',
    survivalRateExpected: 0.82,
    rotationCycleYears: 20,
    timberOrYieldBenefit: 'Extremely precious resonance heartwood regulated by state forest departments.',
    droughtTolerance: 'High'
  },
  'bamboo': {
    id: 'bamboo',
    name: 'Solid Bamboo (Kall Mungil)',
    tamilName: 'கல் மூங்கில் (Kall Moongil)',
    botanicalName: 'Dendrocalamus strictus',
    type: 'Dense Sink',
    rationale: 'Phenomenal early-stage sequestration curve peaking in years 3–6; extensive rhizome network acts as permanent soil carbon stabilizer.',
    annualBiomassGrowthRate: '25 - 38 kg dry biomass/clump/yr',
    spacingRecommendation: '5m x 5m (160 clumps/ac)',
    survivalRateExpected: 0.92,
    rotationCycleYears: 6,
    timberOrYieldBenefit: 'Perennial culm harvest starting Year 4 yielding annual biomass revenue.',
    droughtTolerance: 'High'
  },
  'pongamia': {
    id: 'pongamia',
    name: 'Indian Beech (Pinnata)',
    tamilName: 'புங்க மரம் (Punga Maram)',
    botanicalName: 'Pongamia pinnata (L.) Pierre',
    type: 'Nitrogen-Fixing Multi-use',
    rationale: 'Non-edible oilseed tree, thrives in black clay and saline-affected soils; fixes atmospheric nitrogen to regenerate exhausted arable topsoil.',
    annualBiomassGrowthRate: '14 - 20 kg dry biomass/tree/yr',
    spacingRecommendation: '4m x 4m or boundary lines',
    survivalRateExpected: 0.89,
    rotationCycleYears: 12,
    timberOrYieldBenefit: 'Annual oilseed collection (30–45% biodiesel oil content) providing yearly cashflow.',
    droughtTolerance: 'High'
  },
  'mahogany': {
    id: 'mahogany',
    name: 'Big-leaf Mahogany',
    tamilName: 'மகாகனி (Mahogany)',
    botanicalName: 'Swietenia macrophylla',
    type: 'High-Value Hardwood',
    rationale: 'Broad-leaf canopy with substantial above-ground trunk girth growth in well-drained loams with moderate-to-high moisture.',
    annualBiomassGrowthRate: '16 - 24 kg dry biomass/tree/yr',
    spacingRecommendation: '3.5m x 3.5m (330 trees/ac)',
    survivalRateExpected: 0.86,
    rotationCycleYears: 12,
    timberOrYieldBenefit: 'Cabinet-grade furniture timber yielding high commercial market resale values.',
    droughtTolerance: 'Medium'
  },
  'subabul': {
    id: 'subabul',
    name: 'Subabul / White Leadtree',
    tamilName: 'சவுண்டல் (Soundal)',
    botanicalName: 'Leucaena leucocephala',
    type: 'Fast-Growing Timber',
    rationale: 'Fastest coppicing biomass rate; exceptional fodder for livestock and rapid soil organic carbon replenishment.',
    annualBiomassGrowthRate: '22 - 30 kg dry biomass/tree/yr',
    spacingRecommendation: '2m x 2m or dense boundary',
    survivalRateExpected: 0.91,
    rotationCycleYears: 5,
    timberOrYieldBenefit: 'Continuous high-protein green manure, cattle fodder, and biochar feedstock.',
    droughtTolerance: 'High'
  },
  'neem': {
    id: 'neem',
    name: 'Indian Neem',
    tamilName: 'வேப்ப மரம் (Veppam Maram)',
    botanicalName: 'Azadirachta indica',
    type: 'Nitrogen-Fixing Multi-use',
    rationale: 'Natural pest-repellent foliage, deep moisture foraging, thrives across all Indian tropical soils including gravelly and calcified terrain.',
    annualBiomassGrowthRate: '12 - 18 kg dry biomass/tree/yr',
    spacingRecommendation: '5m x 5m (160 trees/ac)',
    survivalRateExpected: 0.94,
    rotationCycleYears: 15,
    timberOrYieldBenefit: 'Neem seeds and leaves for organic pesticide, azadirachtin extraction and termite-proof timber.',
    droughtTolerance: 'High'
  },
  'moringa': {
    id: 'moringa',
    name: 'Drumstick (Moringa)',
    tamilName: 'முருங்கை (Murungai)',
    botanicalName: 'Moringa oleifera',
    type: 'Fruit & Biomass',
    rationale: 'Ultra-fast establishment; provides immediate seasonal vegetable pods from month 8 while sequestering carbon in perennial root system.',
    annualBiomassGrowthRate: '10 - 16 kg dry biomass/tree/yr',
    spacingRecommendation: '3m x 3m (450 trees/ac)',
    survivalRateExpected: 0.90,
    rotationCycleYears: 6,
    timberOrYieldBenefit: 'Immediate quarterly cashflow from drumstick pods (₹20,000–₹50,000/ac/yr).',
    droughtTolerance: 'High'
  },
  'silver-oak': {
    id: 'silver-oak',
    name: 'Silver Oak',
    tamilName: 'சில்வர் ஓக் (Silver Oak)',
    botanicalName: 'Grevillea robusta',
    type: 'Fast-Growing Timber',
    rationale: 'Preferred agroforestry species in high-rainfall Western Ghats zones; erect columnar canopy provides ideal filtered sunlight for understory companion crops while sequestering deep soil carbon.',
    annualBiomassGrowthRate: '16 - 22 kg dry biomass/tree/yr',
    spacingRecommendation: '3.5m x 3.5m (350 trees/ac)',
    survivalRateExpected: 0.90,
    rotationCycleYears: 10,
    timberOrYieldBenefit: 'Substantial commercial demand in timber, packing cases, and joinery with rapid 10-year harvest turnarounds.',
    droughtTolerance: 'Medium'
  }
};

export const REGIONAL_SOIL_MULTIPLIERS: Record<string, number> = {
  'Red Loam (Semman)': 1.05,
  'Black Soil (Karisal)': 1.10,
  'Alluvial (Vandaloor)': 1.20,
  'Sandy Loam': 0.92,
  'Laterite': 0.88,
  'Clay Loam': 1.08,
  'Saline / Alkaline': 0.65
};

export const WATER_AVAILABILITY_MULTIPLIERS: Record<string, number> = {
  'Rainfed': 0.82,
  'Moderate': 1.00,
  'High / Canal': 1.18,
  'Drip-equipped': 1.25
};

export const LAND_USE_DENSITY_RECOMMENDATIONS: Record<string, { treesPerAcre: number; defaultModel: string }> = {
  'Active Annual Crops': { treesPerAcre: 180, defaultModel: 'Boundary / Bund Agroforestry' },
  'Fallow / Degraded': { treesPerAcre: 400, defaultModel: 'Block Plantation' },
  'Agroforestry Boundary': { treesPerAcre: 140, defaultModel: 'Boundary / Bund Agroforestry' },
  'Orchard / Horticulture': { treesPerAcre: 220, defaultModel: 'Agri-Silviculture (Trees + Crops)' },
  'Pasture / Wasteland': { treesPerAcre: 350, defaultModel: 'Block Plantation' }
};

export const VERRA_BUFFER_POOL_PERCENT = 18; // 18% permanence risk buffer withheld
export const CARBON_TO_CO2_EXPANSION = 3.6667; // 44/12 molecular weight conversion
export const BIOMASS_CARBON_FRACTION = 0.47; // 47% carbon content of dry wood biomass (IPCC Tier 1)
export const ROOT_TO_SHOOT_RATIO = 0.26; // Below-ground biomass multiplier (IPCC AFOLU)
export const REGISTRY_MRV_DEDUCTION_PERCENT = 10; // Measurement, Reporting, Verification discount
