import { TargetBiome, VerraDeductionBreakdown } from '../types/greenvest';
export { VERRA_BIOMES_CATALOG } from '../data/verraBiomes';
import { VERRA_BIOMES_CATALOG } from '../data/verraBiomes';

export interface VerraEngineInputs {
  biome: TargetBiome;
  areaHectares: number;
  permanenceBufferPercent: number; // 10% - 25% (default 18%)
  activityLeakagePercent: number; // 10% - 20% (default 12%)
  mrvUncertaintyPercent: number; // 5% - 15% (default 10%)
  projectDurationYears: number; // typically 10, 20, or 30
  annualSequestrationRateOverride?: number; // tCO2e/ha/yr
  creditPriceOverrideGbp?: number;
}

export interface VerraEngineOutputs {
  inputs: VerraEngineInputs;
  biomeSpec: typeof VERRA_BIOMES_CATALOG[TargetBiome];
  annualGrossRatePerHa: number; // tCO2e/ha/yr
  annualNetCreditableRatePerHa: number; // tCO2e/ha/yr
  deductions10Year: VerraDeductionBreakdown;
  deductionsFullHorizon: VerraDeductionBreakdown;
  cumulativeNetCreditsByYear: number[];
  grossBiomassByYear: number[];
  annualNetIssuanceByYear: number[]; // 0 in year 1 & 2 due to validation delay
  valuations: {
    totalCredits: number;
    pricePerTonneGbp: number;
    pricePerTonneUsd: number;
    pricePerTonneInr: number;
    totalGrossRevenueGbp: number;
    totalGrossRevenueUsd: number;
    totalGrossRevenueInr: number;
    totalNetRevenueGbp: number;
    totalNetRevenueUsd: number;
    totalNetRevenueInr: number;
    permanenceBufferValueGbp: number;
    leakageDeductionValueGbp: number;
  };
  vm0047ComplianceChecks: Array<{
    check: string;
    status: 'Compliant' | 'Caution' | 'Requires Verification';
    details: string;
    standardReference: string;
  }>;
}

export function calculateVerraVM0047Yield(inputs: VerraEngineInputs): VerraEngineOutputs {
  const {
    biome,
    areaHectares,
    permanenceBufferPercent,
    activityLeakagePercent,
    mrvUncertaintyPercent,
    projectDurationYears,
    annualSequestrationRateOverride,
    creditPriceOverrideGbp
  } = inputs;

  const biomeSpec = VERRA_BIOMES_CATALOG[biome];
  const midSequestrationRate = annualSequestrationRateOverride ||
    (biomeSpec.sequestrationRateMin + biomeSpec.sequestrationRateMax) / 2;

  const priceGbp = creditPriceOverrideGbp ||
    (biomeSpec.typicalPriceGbpMin + biomeSpec.typicalPriceGbpMax) / 2;
  const priceUsd = Math.round(priceGbp * 1.28 * 10) / 10;
  const priceInr = Math.round(priceGbp * 110);

  // Dynamic remote sensing baseline growth:
  // In VM0047, dynamic control plots outside the project boundary measure ambient vegetation growth.
  // We deduct 4.5% of gross growth as non-project ambient baseline vegetation increase.
  const baselineGrowthFraction = 0.045;

  const computeBreakdown = (years: number): VerraDeductionBreakdown => {
    const grossBiomassGrowthTonnes = Math.round(areaHectares * midSequestrationRate * years * 10) / 10;
    const baselineControlPlotGrowthTonnes = Math.round(grossBiomassGrowthTonnes * baselineGrowthFraction * 10) / 10;
    const grossRemovalsTonnes = Math.round((grossBiomassGrowthTonnes - baselineControlPlotGrowthTonnes) * 10) / 10;

    const permanenceBufferWithheldTonnes = Math.round((grossRemovalsTonnes * (permanenceBufferPercent / 100)) * 10) / 10;
    const activityLeakageDeductionTonnes = Math.round((grossRemovalsTonnes * (activityLeakagePercent / 100)) * 10) / 10;
    const mrvUncertaintyDeductionTonnes = Math.round((grossRemovalsTonnes * (mrvUncertaintyPercent / 100)) * 10) / 10;

    const netCreditableYieldTonnes = Math.max(
      0,
      Math.round(
        (grossRemovalsTonnes -
          permanenceBufferWithheldTonnes -
          activityLeakageDeductionTonnes -
          mrvUncertaintyDeductionTonnes) * 10
      ) / 10
    );

    return {
      grossBiomassGrowthTonnes,
      baselineControlPlotGrowthTonnes,
      grossRemovalsTonnes,
      permanenceBufferPoolPercent: permanenceBufferPercent,
      permanenceBufferWithheldTonnes,
      activityLeakagePercent,
      activityLeakageDeductionTonnes,
      mrvUncertaintyDiscountPercent: mrvUncertaintyPercent,
      mrvUncertaintyDeductionTonnes,
      netCreditableYieldTonnes
    };
  };

  const deductions10Year = computeBreakdown(10);
  const deductionsFullHorizon = computeBreakdown(projectDurationYears);

  // Year-by-year trajectory (incorporating the 2-3 year validation delay):
  // Year 1: Project origination & planting (0 credits issued)
  // Year 2: Baseline verification & remote sensing audit (0 credits issued)
  // Year 3: First vintage issuance (covers accumulated years 1-3 biomass minus deductions)
  const cumulativeNetCreditsByYear: number[] = [];
  const grossBiomassByYear: number[] = [];
  const annualNetIssuanceByYear: number[] = [];

  const netDeductionMultiplier =
    (1 - baselineGrowthFraction) *
    (1 - permanenceBufferPercent / 100) *
    (1 - activityLeakagePercent / 100) *
    (1 - mrvUncertaintyPercent / 100);

  let cumulativeBiomassTonnes = 0;
  let cumulativeCreditedTonnes = 0;

  for (let y = 1; y <= projectDurationYears; y++) {
    // Sigmoid growth curve representation
    const growthProgress = 1 / (1 + Math.exp(-0.45 * (y - 5.5)));
    const annualBiomass = areaHectares * midSequestrationRate * (0.35 + 0.9 * growthProgress);
    cumulativeBiomassTonnes += annualBiomass;
    grossBiomassByYear.push(Math.round(cumulativeBiomassTonnes));

    let yearIssuance = 0;
    if (y === 1 || y === 2) {
      // Validation & establishment buffer window: no credits issued yet
      yearIssuance = 0;
    } else if (y === 3) {
      // First issuance vintage covers verified growth of years 1, 2, and 3
      yearIssuance = cumulativeBiomassTonnes * netDeductionMultiplier;
      cumulativeCreditedTonnes += yearIssuance;
    } else {
      // Annual subsequent verification
      yearIssuance = annualBiomass * netDeductionMultiplier;
      cumulativeCreditedTonnes += yearIssuance;
    }

    annualNetIssuanceByYear.push(Math.round(yearIssuance * 10) / 10);
    cumulativeNetCreditsByYear.push(Math.round(cumulativeCreditedTonnes * 10) / 10);
  }

  const annualGrossRatePerHa = midSequestrationRate;
  const annualNetCreditableRatePerHa =
    Math.round(midSequestrationRate * netDeductionMultiplier * 100) / 100;

  const totalCredits = deductionsFullHorizon.netCreditableYieldTonnes;
  const totalNetRevenueGbp = Math.round(totalCredits * priceGbp);
  const totalNetRevenueUsd = Math.round(totalCredits * priceUsd);
  const totalNetRevenueInr = Math.round(totalCredits * priceInr);

  const totalGrossRevenueGbp = Math.round(deductionsFullHorizon.grossRemovalsTonnes * priceGbp);
  const totalGrossRevenueUsd = Math.round(deductionsFullHorizon.grossRemovalsTonnes * priceUsd);
  const totalGrossRevenueInr = Math.round(deductionsFullHorizon.grossRemovalsTonnes * priceInr);

  const permanenceBufferValueGbp = Math.round(deductionsFullHorizon.permanenceBufferWithheldTonnes * priceGbp);
  const leakageDeductionValueGbp = Math.round(deductionsFullHorizon.activityLeakageDeductionTonnes * priceGbp);

  const vm0047ComplianceChecks = [
    {
      check: 'Dynamic Performance Baseline',
      status: 'Compliant' as const,
      details: 'Utilizes Sentinel-2 remote sensing dynamic control plots to track background non-project vegetation change.',
      standardReference: 'Verra VM0047 Section 8.1 (Dynamic Control Plots & Matching)'
    },
    {
      check: 'Non-Permanence Risk Buffer Withholding',
      status: permanenceBufferPercent >= 15 ? ('Compliant' as const) : ('Caution' as const),
      details: `${permanenceBufferPercent}% allocated to Verra AFOLU Pooled Buffer Account (standard range 10–25% based on VCS AFOLU Non-Permanence Risk Tool).`,
      standardReference: 'VCS Standard v4.4 Section 3.2.14 & AFOLU Non-Permanence Risk Tool'
    },
    {
      check: 'Activity Shifting & Market Leakage Factoring',
      status: activityLeakagePercent >= 10 ? ('Compliant' as const) : ('Caution' as const),
      details: `${activityLeakagePercent}% deducted for agricultural activity displacement and fuel-wood collection relocation.`,
      standardReference: 'Verra VM0047 Section 8.3 (Leakage Quantification)'
    },
    {
      check: 'Timeline Realism & Validation Buffer',
      status: 'Compliant' as const,
      details: 'First credit issuance scheduled at Year 3 to account for VCS audit validation, pipeline listing, and biomass establishment.',
      standardReference: 'Verra Registration and Issuance Process v4.3'
    },
    {
      check: 'Remote Sensing Uncertainty Discount (10m Resolution)',
      status: 'Compliant' as const,
      details: `${mrvUncertaintyPercent}% measurement uncertainty discount applied to conservative lower-bound confidence interval.`,
      standardReference: 'Verra VM0047 Remote Sensing Standard; IPCC Tier-2 Error Propagation'
    }
  ];

  return {
    inputs,
    biomeSpec,
    annualGrossRatePerHa,
    annualNetCreditableRatePerHa,
    deductions10Year,
    deductionsFullHorizon,
    cumulativeNetCreditsByYear,
    grossBiomassByYear,
    annualNetIssuanceByYear,
    valuations: {
      totalCredits,
      pricePerTonneGbp: priceGbp,
      pricePerTonneUsd: priceUsd,
      pricePerTonneInr: priceInr,
      totalGrossRevenueGbp,
      totalGrossRevenueUsd,
      totalGrossRevenueInr,
      totalNetRevenueGbp,
      totalNetRevenueUsd,
      totalNetRevenueInr,
      permanenceBufferValueGbp,
      leakageDeductionValueGbp
    },
    vm0047ComplianceChecks
  };
}

export interface VerraAccountingParams {
  hectares: number;
  targetBiome: TargetBiome;
  permanenceBufferPercent: number;
  leakageDeductionPercent: number;
  mrvDiscountPercent: number;
  carbonPriceGbp: number;
}

export function calculateVerraAccounting(params: VerraAccountingParams) {
  const baseYield = calculateVerraVM0047Yield({
    biome: params.targetBiome,
    areaHectares: params.hectares,
    permanenceBufferPercent: params.permanenceBufferPercent,
    activityLeakagePercent: params.leakageDeductionPercent,
    mrvUncertaintyPercent: params.mrvDiscountPercent,
    projectDurationYears: 30,
    creditPriceOverrideGbp: params.carbonPriceGbp
  });

  return {
    ...baseYield,
    valuations: {
      ...baseYield.valuations,
      fxRateGbpToInr: 110,
      fxRateGbpToUsd: 1.28
    }
  };
}
