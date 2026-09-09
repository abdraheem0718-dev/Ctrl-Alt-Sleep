export type ConfidenceLevel = 'High' | 'Medium' | 'Low';
export type FeasibilityVerdict = 'Highly Recommended' | 'Moderately Viable' | 'Marginal / Non-Commercial';

export interface FarmerInputs {
  landArea: number; // in acres
  state: string;
  district: string;
  soilType: string;
  waterAvailability: 'Rainfed' | 'Moderate' | 'High / Canal' | 'Drip-equipped';
  currentLandUse: 'Active Annual Crops' | 'Fallow / Degraded' | 'Agroforestry Boundary' | 'Orchard / Horticulture' | 'Pasture / Wasteland';
  preferredTreeType: 'Any / Optimized' | 'High-Value Timber' | 'Fast-Growing Biomass' | 'Multi-tier Horticulture' | 'Native Biodiversity';
  plantingModel: 'Agri-Silviculture (Trees + Crops)' | 'Boundary / Bund Agroforestry' | 'Block Plantation';
  carbonPriceScenario: 'Conservative (₹850/t)' | 'Baseline (₹1,500/t)' | 'Optimistic (₹2,200/t)';
}

export interface RecommendedSpecies {
  id: string;
  name: string;
  tamilName?: string;
  botanicalName: string;
  type: 'Fast-Growing Timber' | 'High-Value Hardwood' | 'Nitrogen-Fixing Multi-use' | 'Fruit & Biomass' | 'Commercial Pulpwood' | 'Dense Sink';
  rationale: string;
  annualBiomassGrowthRate: string; // e.g. "18 - 25 kg/tree/year"
  spacingRecommendation: string;
  survivalRateExpected: number; // e.g. 0.85
  rotationCycleYears: number;
  timberOrYieldBenefit: string;
  droughtTolerance: 'High' | 'Medium' | 'Low';
}

export interface YearProjection {
  year: number;
  cumulativeBiomassTonnes: number;
  sequestrationP10: number; // tCO2e conservative
  sequestrationP50: number; // tCO2e baseline
  sequestrationP90: number; // tCO2e optimistic
  annualMaintenanceCost: number;
  cumulativeCost: number;
  cumulativeGrossRevenueP10: number;
  cumulativeGrossRevenueP50: number;
  cumulativeGrossRevenueP90: number;
  netCumulativePotentialP50: number;
}

export interface FeasibilityAssessment {
  inputs: FarmerInputs;
  recommendedSpecies: RecommendedSpecies[];
  totalTreeCount: number;
  treesPerAcre: number;
  sequestration10Year: {
    p10: number; // tonnes CO2e
    p50: number;
    p90: number;
  };
  carbonRevenue10Year: {
    p10: number; // INR
    p50: number;
    p90: number;
  };
  costBreakdown: {
    saplingsAndPlanting: number;
    soilPrepAndPitting: number;
    irrigationSetup: number;
    fencingProtection: number;
    maintenance10Years: number;
    total10YearCost: number;
  };
  netPotential10Year: {
    p10: number; // INR
    p50: number;
    p90: number;
  };
  confidence: ConfidenceLevel;
  confidenceScore: number; // 0-100
  confidenceDrivers: string[];
  uncertaintyFactors: string[];
  verdict: FeasibilityVerdict;
  assumptions: Array<{
    parameter: string;
    value: string;
    citation: string;
  }>;
  coBenefits: {
    soilOrganicCarbonBuildUp: string;
    waterRetentionBoost: string;
    timberMaturityValueEstimate: string;
    microclimateTemperatureDrop: string;
  };
  projections: YearProjection[];
  developerSuitabilityScore: number; // for aggregation pipeline
}

export interface AggregationCluster {
  id: string;
  name: string;
  state: string;
  district: string;
  screenedFarmersCount: number;
  qualifiedFarmersCount: number;
  totalAcreage: number;
  dominantSoil: string;
  dominantSpecies: string[];
  estimated10YrCarbonTonnes: number;
  estimatedDeveloperOriginationSavings: number; // in INR
  status: 'Forming Cohort' | 'Ready for Pre-Feasibility Audit' | 'Under Developer Review' | 'Contracting Active';
  readinessScore: number; // 0-100
}

// 1. Geospatial & Satellite Intelligence Types
export interface LatLng {
  lat: number;
  lng: number;
}

export interface ParcelPolygon {
  id: string;
  name: string;
  vertices: LatLng[];
  areaAcres: number;
  areaHectares: number;
  perimeterMeters: number;
  centroid: LatLng;
}

export interface GeeDatasetMetrics {
  baselineCanopyCoverPercent: number;
  baselineCanopyHeightMeters: number;
  deforestationEventsPast10Years: number; // Hansen Global Forest Change
  verraTenYearNonForestEligible: boolean;
  dynamicWorldLulc: {
    grassland: number;
    shrubScrub: number;
    cropland: number;
    bareGround: number;
    trees: number;
  };
  netPrimaryProductivityGramsCarbonM2Yr: number;
  tenYearRainfallMeanMm: number;
}

export interface Sentinel2RasterPixel {
  id: string;
  col: number;
  row: number;
  lat: number;
  lng: number;
  ndvi: number; // -0.1 to 0.85
  ndre: number; // red-edge chlorophyll index
  evi: number; // enhanced vegetation index
  soilMoistureIndex: number;
  estimatedBiomassDensityTonnesHa: number;
  estimatedCo2SeqTonnesYr: number;
  vegetationClass: 'Dense Canopy' | 'Moderate Vegetative Cover' | 'Sparse / Grassland' | 'Bare Soil / Degraded';
}

// 2. Institutional Verra VM0047 Types
export type TargetBiome =
  | 'Tropical Rainforest / Moist'
  | 'Tropical Dry Deciduous & Agroforestry'
  | 'Temperate / Mixed Hardwood'
  | 'Boreal Forest (Taiga)'
  | 'Mangrove & Coastal Blue Carbon';

export interface BiomeSpecification {
  id: TargetBiome;
  displayName: string;
  sequestrationRateMin: number; // tCO2e/ha/yr
  sequestrationRateMax: number; // tCO2e/ha/yr
  typicalPriceGbpMin: number; // £/t
  typicalPriceGbpMax: number; // £/t
  typicalPriceUsdMin: number; // $/t
  typicalPriceUsdMax: number; // $/t
  typicalPriceInrMin: number; // ₹/t
  typicalPriceInrMax: number; // ₹/t
  representativeSpecies: string[];
  allometricEquation: string;
  citation: string;
}

export interface VerraDeductionBreakdown {
  grossBiomassGrowthTonnes: number;
  baselineControlPlotGrowthTonnes: number;
  grossRemovalsTonnes: number;
  permanenceBufferPoolPercent: number; // 10% - 25%
  permanenceBufferWithheldTonnes: number;
  activityLeakagePercent: number; // 10% - 20%
  activityLeakageDeductionTonnes: number;
  mrvUncertaintyDiscountPercent: number; // 5% - 15%
  mrvUncertaintyDeductionTonnes: number;
  netCreditableYieldTonnes: number; // Tradeable VCUs
}

// 3. Agentic Document Processing Types
export interface ExtractedLandMetrics {
  surveyNumber: string;
  parcelId: string;
  state: string;
  district: string;
  acreage: number;
  hectares: number;
  soilType: string;
  soilPh: number;
  soilOrganicCarbonPercent: number;
  availableNitrogenKgHa: number;
  availablePhosphorusKgHa: number;
  availablePotassiumKgHa: number;
  waterSource: string;
  priorLandUse: string;
  baselineTreeCount: number;
  nonForestSinceYear: number;
  confidenceScore: number; // 0 - 100
  fieldConfidence: Record<string, number>;
  sourceDocumentName: string;
  sourceDocumentType: 'Land Title / Patta Chitta' | 'Soil Health Diagnostic Card' | 'EIA Baseline Survey';
}

// 4. Advanced Financial Simulation & Monte Carlo Types
export interface MonteCarloYearProjection {
  year: number;
  isCreditIssuanceActive: boolean; // false for years 1-2
  p10CumulativeCashFlow: number;
  p50CumulativeCashFlow: number;
  p90CumulativeCashFlow: number;
  p10AnnualNetRevenue: number;
  p50AnnualNetRevenue: number;
  p90AnnualNetRevenue: number;
  carbonPriceExpected: number;
  droughtShockOccurredP10: boolean;
}

export interface MonteCarloSimulationResult {
  simulationsRun: number;
  horizonYears: number;
  firstCreditIssuanceYear: number; // Year 3
  meanIrr: number; // %
  medianIrr: number; // %
  p10Irr: number; // %
  p90Irr: number; // %
  meanNpv8Percent: number; // Currency
  p10Npv8Percent: number;
  p90Npv8Percent: number;
  medianPaybackYear: number;
  valueAtRisk95Percent: number; // 5th percentile downside
  projections: MonteCarloYearProjection[];
  irrDistributionBins: Array<{ bin: string; count: number; percentage: number }>;
  npvDistributionBins: Array<{ bin: string; count: number; percentage: number }>;
}

// 5. User Roles & Authentication Types
export type UserRole = 'farmer';

export interface FarmerPlot {
  id: string;
  name: string; // e.g., "Main Crop Field", "Canal Bund Parcel"
  surveyNo: string;
  pattaNo?: string;
  landArea: number; // in acres
  state: string;
  district: string;
  village?: string;
  soilType: string;
  waterAvailability: 'Rainfed' | 'Moderate' | 'High / Canal' | 'Drip-equipped';
  currentLandUse: 'Active Annual Crops' | 'Fallow / Degraded' | 'Agroforestry Boundary' | 'Orchard / Horticulture' | 'Pasture / Wasteland';
  preferredTreeType: 'Any / Optimized' | 'High-Value Timber' | 'Fast-Growing Biomass' | 'Multi-tier Horticulture' | 'Native Biodiversity';
  plantingModel: 'Agri-Silviculture (Trees + Crops)' | 'Boundary / Bund Agroforestry' | 'Block Plantation';
  carbonPriceScenario: 'Conservative (₹850/t)' | 'Baseline (₹1,500/t)' | 'Optimistic (₹2,200/t)';
  targetBiome?: TargetBiome;
  status: 'Draft' | 'Screened' | 'Registered for Cohort' | 'Survey Verified' | 'Saplings Scheduled' | 'Planting Active';
  coordinates?: LatLng;
  documentAttached?: string;
  createdAt: string;
}

export interface FarmerProfile {
  id: string;
  name: string;
  phone: string;
  state: string;
  district: string;
  village: string;
  landArea: number;
  surveyNo: string;
  soilType: string;
  waterAvailability: string;
  assignedCluster: string;
  status: 'Registered for Cohort' | 'Survey Verified' | 'Saplings Scheduled' | 'Planting Active';
  assignedOfficer: string;
  officerContact: string;
  lastUpdated: string;
  upiId?: string;
  plots?: FarmerPlot[];
}

export interface EmployeeProfile {
  id: string;
  name: string;
  email: string;
  title: string;
  department: string;
  badge: string;
  assignedRegion: string;
  permissions: string[];
}

// 6. Government Schemes & Subsidies Types
export type SchemeRegion = 'Central' | 'Tamil Nadu' | 'Karnataka' | 'Kerala' | 'Andhra Pradesh';
export type SchemeCategory =
  | 'Plantation & Sapling Subsidy'
  | 'Micro-Irrigation & Drip'
  | 'Solar Energy & Pumping'
  | 'Direct Tree Cash Incentive (DBT)'
  | 'Organic & Soil Regeneration'
  | 'Bamboo & Fast Biomass';

export interface GovernmentScheme {
  id: string;
  name: string;
  shortName: string;
  localNames: {
    ta: string;
    ml: string;
    kn: string;
    te: string;
  };
  state: SchemeRegion;
  department: string;
  category: SchemeCategory;
  subsidyRate: string;
  subsidyType: 'Direct Benefit Transfer (DBT)' | '100% Free Saplings' | 'Equipment Subsidy' | 'Cash Incentive per Tree' | 'Grant & Input Kit';
  description: string;
  localDescriptions?: {
    ta: string;
    ml: string;
    kn: string;
    te: string;
  };
  eligibilityDescription: string;
  minAcres?: number;
  maxAcres?: number;
  suitableWater?: string[];
  suitableSoils?: string[];
  suitableTreeTypes?: string[];
  suitablePlantingModels?: string[];
  calculateEstimatedSubsidy: (inputs: FarmerInputs) => number;
  keyHighlights: string[];
  requiredDocuments: string[];
  applicationProcess: string[];
  officialPortalUrl: string;
  portalName: string;
  helpline: string;
}

export interface MatchedSchemeResult {
  scheme: GovernmentScheme;
  isDirectStateMatch: boolean;
  isEligible: boolean;
  estimatedSubsidyAmount: number;
  matchScore: number;
  matchReasons: string[];
}

