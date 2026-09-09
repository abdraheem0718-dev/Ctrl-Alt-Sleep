import { AggregationCluster } from '../types/greenvest';

export const AGGREGATION_METRICS = {
  totalFarmersScreened: 104520,
  qualifiedPreScreenedFarmers: 22840,
  qualificationRatePercent: 21.8,
  totalAggregatedAcreage: 114200,
  projected10YrSequestrationMt: 3.48, // Million tonnes CO2e
  originationCostSavedPerFarmerInr: 4800, // ₹4,800 saved per farmer in baseline surveys & ground visits
  totalDeveloperCostSavingsInr: 109632000, // ~₹10.96 Crore saved in field origination
  averageAcreagePerFarmer: 5.0,
  activeDeveloperPartners: 14 // e.g. Boomitra, South Pole, EKI, Respira, Indigo Ag, VNV Advisory, ClimeCo
};

export const SAMPLE_AGGREGATION_CLUSTERS: AggregationCluster[] = [
  {
    id: 'CL-TN-DELTA-01',
    name: 'Cauvery Delta Agroforestry Cluster',
    state: 'Tamil Nadu',
    district: 'Thanjavur & Cuddalore',
    screenedFarmersCount: 18450,
    qualifiedFarmersCount: 4320,
    totalAcreage: 23760,
    dominantSoil: 'Alluvial (Vandaloor) & Clay Loam',
    dominantSpecies: ['Indian Teak', 'Big-leaf Mahogany', 'Malabar Neem'],
    estimated10YrCarbonTonnes: 785000,
    estimatedDeveloperOriginationSavings: 20736000,
    status: 'Ready for Pre-Feasibility Audit',
    readinessScore: 92
  },
  {
    id: 'CL-TN-KONGU-02',
    name: 'Kongu Semi-Arid Timber Belt',
    state: 'Tamil Nadu',
    district: 'Coimbatore & Erode',
    screenedFarmersCount: 22100,
    qualifiedFarmersCount: 5180,
    totalAcreage: 28490,
    dominantSoil: 'Red Loam (Semman) & Black Soil',
    dominantSpecies: ['Malabar Neem', 'Indian Teak', 'White Leadtree'],
    estimated10YrCarbonTonnes: 912000,
    estimatedDeveloperOriginationSavings: 24864000,
    status: 'Under Developer Review',
    readinessScore: 88
  },
  {
    id: 'CL-TN-SOUTH-03',
    name: 'Southern Rainfed Dryland Corridor',
    state: 'Tamil Nadu',
    district: 'Madurai & Tirunelveli',
    screenedFarmersCount: 16800,
    qualifiedFarmersCount: 3450,
    totalAcreage: 18970,
    dominantSoil: 'Red Loam & Sandy Alluvial',
    dominantSpecies: ['Red Sandalwood', 'Pongamia', 'Beefwood / Casuarina'],
    estimated10YrCarbonTonnes: 498000,
    estimatedDeveloperOriginationSavings: 16560000,
    status: 'Forming Cohort',
    readinessScore: 76
  },
  {
    id: 'CL-TN-NORTH-04',
    name: 'Dharmapuri-Salem Plateau Cluster',
    state: 'Tamil Nadu',
    district: 'Dharmapuri & Salem',
    screenedFarmersCount: 14200,
    qualifiedFarmersCount: 3120,
    totalAcreage: 15600,
    dominantSoil: 'Red Loam & Laterite',
    dominantSpecies: ['Malabar Neem', 'Solid Bamboo', 'Red Sandalwood'],
    estimated10YrCarbonTonnes: 546000,
    estimatedDeveloperOriginationSavings: 14976000,
    status: 'Contracting Active',
    readinessScore: 95
  },
  {
    id: 'CL-KA-MYSORE-05',
    name: 'Deccan Agroforestry Transition Zone',
    state: 'Karnataka',
    district: 'Mysuru & Chamarajanagar',
    screenedFarmersCount: 12900,
    qualifiedFarmersCount: 2840,
    totalAcreage: 14200,
    dominantSoil: 'Red Loam & Black Soil',
    dominantSpecies: ['Indian Teak', 'Malabar Neem', 'Solid Bamboo'],
    estimated10YrCarbonTonnes: 432000,
    estimatedDeveloperOriginationSavings: 13632000,
    status: 'Ready for Pre-Feasibility Audit',
    readinessScore: 84
  },
  {
    id: 'CL-KL-PALAKKAD-06',
    name: 'Palakkad-Wayanad Agroforestry Belt',
    state: 'Kerala',
    district: 'Palakkad & Wayanad',
    screenedFarmersCount: 11400,
    qualifiedFarmersCount: 2650,
    totalAcreage: 13800,
    dominantSoil: 'Laterite & Forest Loam',
    dominantSpecies: ['Indian Teak', 'Big-leaf Mahogany', 'Silver Oak'],
    estimated10YrCarbonTonnes: 490000,
    estimatedDeveloperOriginationSavings: 12720000,
    status: 'Ready for Pre-Feasibility Audit',
    readinessScore: 89
  }
];

export interface QualifiedFarmerRecord {
  id: string;
  farmerNamePseudonym: string;
  district: string;
  landArea: number;
  soilType: string;
  waterAvailability: string;
  speciesMix: string;
  projected10YrTonnes: number;
  projectedNetInr: string;
  confidence: string;
  dateScreened: string;
  interestStatus: 'Registered for Cohort' | 'Survey Verified' | 'Awaiting Project Developer Match';
}

export const RECENT_QUALIFIED_FARMERS: QualifiedFarmerRecord[] = [
  {
    id: 'GV-F-8841',
    farmerNamePseudonym: 'Murugan S. (Verified Survey)',
    district: 'Coimbatore, TN',
    landArea: 5.0,
    soilType: 'Red Loam (Semman)',
    waterAvailability: 'Moderate',
    speciesMix: 'Malabar Neem + Indian Teak',
    projected10YrTonnes: 168,
    projectedNetInr: '₹1.48L – ₹2.32L',
    confidence: 'High (84%)',
    dateScreened: 'Yesterday',
    interestStatus: 'Registered for Cohort'
  },
  {
    id: 'GV-F-8842',
    farmerNamePseudonym: 'Kavitha R. (Paddy Boundary)',
    district: 'Thanjavur, TN',
    landArea: 7.5,
    soilType: 'Alluvial (Vandaloor)',
    waterAvailability: 'High / Canal',
    speciesMix: 'Indian Teak + Big-leaf Mahogany',
    projected10YrTonnes: 284,
    projectedNetInr: '₹2.75L – ₹4.10L',
    confidence: 'High (91%)',
    dateScreened: '2 days ago',
    interestStatus: 'Survey Verified'
  },
  {
    id: 'GV-F-8843',
    farmerNamePseudonym: 'Sundaram P. (Degraded Dryland)',
    district: 'Madurai, TN',
    landArea: 10.0,
    soilType: 'Red Loam & Gravel',
    waterAvailability: 'Rainfed',
    speciesMix: 'Pongamia + Red Sandalwood',
    projected10YrTonnes: 215,
    projectedNetInr: '₹1.62L – ₹2.80L',
    confidence: 'Medium (68%)',
    dateScreened: '3 days ago',
    interestStatus: 'Awaiting Project Developer Match'
  },
  {
    id: 'GV-F-8844',
    farmerNamePseudonym: 'Annamalai V. (Cotton Bunds)',
    district: 'Erode, TN',
    landArea: 4.0,
    soilType: 'Black Soil (Karisal)',
    waterAvailability: 'Drip-equipped',
    speciesMix: 'Malabar Neem + White Leadtree',
    projected10YrTonnes: 152,
    projectedNetInr: '₹1.35L – ₹2.05L',
    confidence: 'High (88%)',
    dateScreened: '4 days ago',
    interestStatus: 'Registered for Cohort'
  },
  {
    id: 'GV-F-8845',
    farmerNamePseudonym: 'Selvan T. (Coastal Sandy Farm)',
    district: 'Cuddalore, TN',
    landArea: 6.0,
    soilType: 'Sandy Loam',
    waterAvailability: 'Moderate',
    speciesMix: 'Beefwood / Casuarina + Malabar Neem',
    projected10YrTonnes: 240,
    projectedNetInr: '₹2.10L – ₹3.35L',
    confidence: 'High (86%)',
    dateScreened: '5 days ago',
    interestStatus: 'Survey Verified'
  },
  {
    id: 'GV-F-8846',
    farmerNamePseudonym: 'Mathew K. (Timber & Spice Agroforestry)',
    district: 'Palakkad, Kerala',
    landArea: 6.5,
    soilType: 'Laterite',
    waterAvailability: 'High / Canal',
    speciesMix: 'Indian Teak + Big-leaf Mahogany',
    projected10YrTonnes: 260,
    projectedNetInr: '₹2.40L – ₹3.80L',
    confidence: 'High (89%)',
    dateScreened: 'Just now',
    interestStatus: 'Registered for Cohort'
  }
];

export const SEED_QUALIFIED_FARMERS = RECENT_QUALIFIED_FARMERS;

