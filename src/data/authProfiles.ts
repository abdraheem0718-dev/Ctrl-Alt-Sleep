import { FarmerProfile, EmployeeProfile } from '../types/greenvest';

export const DEMO_FARMERS: FarmerProfile[] = [
  {
    id: 'GV-F-8841',
    name: 'Murugan S.',
    phone: '+91 98401 23456',
    state: 'Tamil Nadu',
    district: 'Coimbatore',
    village: 'Thondamuthur',
    landArea: 7.2,
    surveyNo: 'SF-241/2B',
    soilType: 'Red Loam (Semman)',
    waterAvailability: 'Moderate',
    assignedCluster: 'Kongu Semi-Arid Timber Belt (CL-TN-KONGU-02)',
    status: 'Survey Verified',
    assignedOfficer: 'Rajesh Varma (Field Agronomist, Ext. #402)',
    officerContact: '+91 94432 10892',
    lastUpdated: '2026-03-02',
    upiId: 'murugan.agri@okaxis',
    plots: [
      {
        id: 'plot-m1',
        name: 'North Main Field (Kongu Agroforestry)',
        surveyNo: 'SF-241/2B',
        pattaNo: 'PT-4402',
        landArea: 5.0,
        state: 'Tamil Nadu',
        district: 'Coimbatore',
        village: 'Thondamuthur',
        soilType: 'Red Loam (Semman)',
        waterAvailability: 'Moderate',
        currentLandUse: 'Active Annual Crops',
        preferredTreeType: 'High-Value Timber',
        plantingModel: 'Agri-Silviculture (Trees + Crops)',
        carbonPriceScenario: 'Baseline (₹1,500/t)',
        status: 'Survey Verified',
        createdAt: '2026-01-15'
      },
      {
        id: 'plot-m2',
        name: 'Pond Bund Teak Line',
        surveyNo: 'SF-241/3A',
        pattaNo: 'PT-4402',
        landArea: 2.2,
        state: 'Tamil Nadu',
        district: 'Coimbatore',
        village: 'Thondamuthur',
        soilType: 'Black Cotton (Karisal)',
        waterAvailability: 'High / Canal',
        currentLandUse: 'Agroforestry Boundary',
        preferredTreeType: 'Fast-Growing Biomass',
        plantingModel: 'Boundary / Bund Agroforestry',
        carbonPriceScenario: 'Baseline (₹1,500/t)',
        status: 'Registered for Cohort',
        createdAt: '2026-02-10'
      }
    ]
  },
  {
    id: 'GV-F-8842',
    name: 'Kavitha R.',
    phone: '+91 94431 87654',
    state: 'Tamil Nadu',
    district: 'Thanjavur',
    village: 'Orathanadu',
    landArea: 5.0,
    surveyNo: 'SF-118/4A',
    soilType: 'Alluvial (Vandaloor)',
    waterAvailability: 'High / Canal',
    assignedCluster: 'Cauvery Delta Agroforestry Cluster (CL-TN-DELTA-01)',
    status: 'Survey Verified',
    assignedOfficer: 'S. Meenakshi (Delta Field Lead, Ext. #318)',
    officerContact: '+91 94435 77201',
    lastUpdated: '2026-03-01',
    upiId: 'kavitha.delta@icici',
    plots: [
      {
        id: 'plot-k1',
        name: 'Cauvery Riverbank Parcel',
        surveyNo: 'SF-118/4A',
        pattaNo: 'PT-9912',
        landArea: 3.2,
        state: 'Tamil Nadu',
        district: 'Thanjavur',
        village: 'Orathanadu',
        soilType: 'Alluvial (Vandaloor)',
        waterAvailability: 'High / Canal',
        currentLandUse: 'Active Annual Crops',
        preferredTreeType: 'Fast-Growing Biomass',
        plantingModel: 'Agri-Silviculture (Trees + Crops)',
        carbonPriceScenario: 'Baseline (₹1,500/t)',
        status: 'Survey Verified',
        createdAt: '2026-01-20'
      },
      {
        id: 'plot-k2',
        name: 'South Orchard & Timber Border',
        surveyNo: 'SF-120/1C',
        pattaNo: 'PT-9915',
        landArea: 1.8,
        state: 'Tamil Nadu',
        district: 'Thanjavur',
        village: 'Orathanadu',
        soilType: 'Red Loam (Semman)',
        waterAvailability: 'Moderate',
        currentLandUse: 'Orchard / Horticulture',
        preferredTreeType: 'Multi-tier Horticulture',
        plantingModel: 'Agri-Silviculture (Trees + Crops)',
        carbonPriceScenario: 'Baseline (₹1,500/t)',
        status: 'Registered for Cohort',
        createdAt: '2026-02-18'
      }
    ]
  },
  {
    id: 'GV-F-8846',
    name: 'Suresh Patil',
    phone: '+91 99802 44321',
    state: 'Karnataka',
    district: 'Mysuru',
    village: 'Nanjangud',
    landArea: 8.5,
    surveyNo: 'SF-89/1C',
    soilType: 'Red Loam (Semman)',
    waterAvailability: 'Rainfed',
    assignedCluster: 'Deccan Agroforestry Transition Zone (CL-KA-MYSORE-05)',
    status: 'Registered for Cohort',
    assignedOfficer: 'Manjunath K. (Mysuru Agri Lead, Ext. #512)',
    officerContact: '+91 98801 33219',
    lastUpdated: '2026-02-28',
    upiId: 'sureshpatil@sbi',
    plots: [
      {
        id: 'plot-s1',
        name: 'Nanjangud Melia Dubia Block',
        surveyNo: 'SF-89/1C',
        pattaNo: 'PT-1033',
        landArea: 8.5,
        state: 'Karnataka',
        district: 'Mysuru',
        village: 'Nanjangud',
        soilType: 'Red Loam (Semman)',
        waterAvailability: 'Rainfed',
        currentLandUse: 'Fallow / Degraded',
        preferredTreeType: 'Any / Optimized',
        plantingModel: 'Block Plantation',
        carbonPriceScenario: 'Baseline (₹1,500/t)',
        status: 'Registered for Cohort',
        createdAt: '2026-02-05'
      }
    ]
  }
];

export const DEMO_EMPLOYEES: EmployeeProfile[] = [
  {
    id: 'GV-EMP-104',
    name: 'Dr. Anita Desai',
    email: 'anita.desai@greenvest.eco',
    title: 'Senior Carbon Project Lead & Verra Auditor',
    department: 'Methodology & Regional Aggregation',
    badge: 'Lead Auditor',
    assignedRegion: 'South India (TN, KA, KL, AP)',
    permissions: [
      'aggregator_admin',
      'verra_signoff',
      'document_audit',
      'finance_model',
      'farmer_override'
    ]
  },
  {
    id: 'GV-EMP-208',
    name: 'Rajesh Varma',
    email: 'rajesh.varma@greenvest.eco',
    title: 'Regional Field Aggregation Officer',
    department: 'Field Origination & Farmer Relations',
    badge: 'Field Agronomist',
    assignedRegion: 'Kongu & Delta Clusters',
    permissions: [
      'farmer_verification',
      'sapling_dispatch',
      'survey_approval'
    ]
  },
  {
    id: 'GV-EMP-315',
    name: 'Priya Sundaram',
    email: 'priya.sundaram@greenvest.eco',
    title: 'Remote Sensing & MRV Specialist',
    department: 'Geospatial & Biomass Modeling',
    badge: 'MRV Specialist',
    assignedRegion: 'Pan-India',
    permissions: [
      'sentinel_audit',
      'canopy_model',
      'biomass_allometrics'
    ]
  }
];
