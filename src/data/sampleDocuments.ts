import { ExtractedLandMetrics } from '../types/greenvest';

export interface SampleDocument {
  id: string;
  title: string;
  category: 'Land Title / Patta Chitta' | 'Soil Health Diagnostic Card' | 'EIA Baseline Survey';
  issuer: string;
  issuanceDate: string;
  fileSize: string;
  rawTextPreview: string;
  extractedMetrics: ExtractedLandMetrics;
}

export const SAMPLE_DOCUMENTS: SampleDocument[] = [
  {
    id: 'doc-patta-chitta',
    title: 'Tamil Nadu Revenue Dept - Form VI Patta & Chitta Extract (Survey #382/2B)',
    category: 'Land Title / Patta Chitta',
    issuer: 'Taluk Office, Coimbatore South, Government of Tamil Nadu',
    issuanceDate: '14-Oct-2024',
    fileSize: '1.4 MB PDF',
    rawTextPreview: `GOVERNMENT OF TAMIL NADU - REVENUE DEPARTMENT
E-SERVICES PATTA / CHITTA EXTRACT (FORM VI)
District: Coimbatore (012) | Taluk: Coimbatore South | Village: Perur (Block 4)
Patta Number: 1842 | Survey Number: 382/2B
Land Classification: Ryotwari Punja (Dry Arable Land)
Extent: 2.10.45 Hectares (Equivalent to 5.20 Acres)
Registered Owner: R. Subramanian / S. Meenakshi
Soil Classification: Red Loam (Semman) - Sub-class II-a
Primary Water Source: Open Well & Seasonal Rainfall (Borewell depth 220ft)
Encumbrance Status: Clear title, Zero non-agricultural commercial liens
Verified Historical Land Use (2014-2024): Rainfed pulses & seasonal millets (No prior forest canopy)`,
    extractedMetrics: {
      surveyNumber: '382/2B',
      parcelId: 'TN-CBE-PERUR-382/2B',
      state: 'Tamil Nadu',
      district: 'Coimbatore',
      acreage: 5.2,
      hectares: 2.1,
      soilType: 'Red Loam (Semman)',
      soilPh: 6.7,
      soilOrganicCarbonPercent: 0.48,
      availableNitrogenKgHa: 220,
      availablePhosphorusKgHa: 16.4,
      availablePotassiumKgHa: 260,
      waterSource: 'Moderate (Open Well & Seasonal Rain)',
      priorLandUse: 'Active Annual Crops',
      baselineTreeCount: 4,
      nonForestSinceYear: 2012,
      confidenceScore: 98,
      fieldConfidence: {
        surveyNumber: 99,
        acreage: 99,
        district: 100,
        soilType: 96,
        waterSource: 95
      },
      sourceDocumentName: 'Tamil_Nadu_Patta_Chitta_382_2B.pdf',
      sourceDocumentType: 'Land Title / Patta Chitta'
    }
  },
  {
    id: 'doc-icar-soil',
    title: 'ICAR-NBSS&LUP Comprehensive Soil Health Diagnostic Dossier',
    category: 'Soil Health Diagnostic Card',
    issuer: 'National Bureau of Soil Survey & Land Use Planning (ICAR), Cauvery Regional Center',
    issuanceDate: '08-Jan-2025',
    fileSize: '2.1 MB PDF',
    rawTextPreview: `ICAR - INDIAN COUNCIL OF AGRICULTURAL RESEARCH
SOIL HEALTH DIAGNOSTIC REPORT & FERTILITY DOSSIER
Sample Reference ID: TN-THJ-2025-0914
Farm Location: Thanjavur District (Cauvery Delta Alluvial Belt)
GPS Centroid: 10.7885° N, 79.1388° E | Gross Survey Area: 12.40 Acres (5.02 Ha)
PHYSICAL PROPERTIES:
Texture: Alluvial Clay Loam (Vandaloor) | Bulk Density: 1.34 g/cm³ | Infiltration: 1.8 cm/hr
CHEMICAL & BIOLOGICAL PARAMETERS:
Soil Reaction (pH 1:2.5): 6.82 (Neutral, optimal for hardwood agroforestry)
Electrical Conductivity (EC): 0.32 dS/m (Non-saline)
Soil Organic Carbon (SOC): 0.58% (Medium baseline, high potential for carbon build-up)
Available Nitrogen (N): 242.5 kg/ha | Available Phosphorus (P₂O₅): 18.2 kg/ha | Available Potassium (K₂O): 285.0 kg/ha
AGROFORESTRY SUITABILITY VERDICT:
Ideal for Tectona grandis (Teak), Swietenia macrophylla (Mahogany), and Melia dubia intercropping.`,
    extractedMetrics: {
      surveyNumber: '514/1A',
      parcelId: 'TN-THJ-DELTA-514/1A',
      state: 'Tamil Nadu',
      district: 'Thanjavur',
      acreage: 12.4,
      hectares: 5.02,
      soilType: 'Alluvial (Vandaloor)',
      soilPh: 6.82,
      soilOrganicCarbonPercent: 0.58,
      availableNitrogenKgHa: 242.5,
      availablePhosphorusKgHa: 18.2,
      availablePotassiumKgHa: 285.0,
      waterSource: 'High / Canal (Cauvery Delta irrigation network)',
      priorLandUse: 'Active Annual Crops',
      baselineTreeCount: 6,
      nonForestSinceYear: 2008,
      confidenceScore: 97,
      fieldConfidence: {
        soilPh: 99,
        soilOrganicCarbonPercent: 98,
        soilType: 97,
        acreage: 96,
        nutrients: 99
      },
      sourceDocumentName: 'ICAR_NBSS_LUP_Soil_Health_Card_Thanjavur.pdf',
      sourceDocumentType: 'Soil Health Diagnostic Card'
    }
  },
  {
    id: 'doc-verra-arr-audit',
    title: 'Verra VM0047 Cadastral & Environmental Baseline Survey',
    category: 'EIA Baseline Survey',
    issuer: 'Apex Carbon Auditing & Ecology Services (Verra accredited VVB)',
    issuanceDate: '22-Nov-2024',
    fileSize: '3.4 MB PDF',
    rawTextPreview: `APEX CARBON AUDITING - PRE-FEASIBILITY AUDIT REPORT
METHODOLOGY: Verra VCS VM0047 (Afforestation, Reforestation & Revegetation)
Target Site: Salem Agro-Zone, Tamil Nadu | Parcel Extent: 8.70 Acres (3.52 Ha)
Cadastral Boundaries: North: Dry stream bed | South: Road K-12 | East: Bund | West: Survey 441
BASELINE ELIGIBILITY CHECK (10-YEAR NON-FOREST CONTINUITY):
Landsat & Sentinel-2 Historical Imagery Analysis (2014 to 2024):
Confirmed unstocked, degraded wasteland. Zero tree canopy >10% detected over 10-year lookback.
No deforestation or wetland drainage occurred on site. 100% eligible for VM0047 ARR additionality.
Soil Classification: Red Loam & Laterite mix | pH: 6.2 | Topsoil SOC: 0.38%
Water Regime: Rainfed semi-arid with low surface run-off retention.`,
    extractedMetrics: {
      surveyNumber: '442/3',
      parcelId: 'TN-SLM-ARR-442/3',
      state: 'Tamil Nadu',
      district: 'Salem',
      acreage: 8.7,
      hectares: 3.52,
      soilType: 'Laterite',
      soilPh: 6.2,
      soilOrganicCarbonPercent: 0.38,
      availableNitrogenKgHa: 180,
      availablePhosphorusKgHa: 12.0,
      availablePotassiumKgHa: 210,
      waterSource: 'Rainfed (Seasonal Monsoon dependence)',
      priorLandUse: 'Fallow / Degraded',
      baselineTreeCount: 2,
      nonForestSinceYear: 2011,
      confidenceScore: 99,
      fieldConfidence: {
        nonForestContinuity: 100,
        acreage: 99,
        soilClassification: 98,
        baselineCanopy: 99
      },
      sourceDocumentName: 'Verra_VM0047_EIA_Baseline_Survey_Salem.pdf',
      sourceDocumentType: 'EIA Baseline Survey'
    }
  }
];
