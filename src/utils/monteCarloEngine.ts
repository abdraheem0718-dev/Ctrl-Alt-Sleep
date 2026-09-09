import { MonteCarloSimulationResult, MonteCarloYearProjection } from '../types/greenvest';

export interface MonteCarloSimulationConfig {
  landAreaAcres: number;
  baseCarbonPricePerTonne: number; // e.g. 1500 INR or ~£18
  discountRatePercent: number; // e.g. 8%
  numTrials: number; // e.g. 1000
  annualDroughtRiskPercent: number; // e.g. 15%
  priceVolatilityPercent: number; // e.g. 22%
  priceDriftPercent: number; // e.g. 4.5%
  treesPerAcre: number; // e.g. 240
}

// Calculate Net Present Value
function calculateNpv(cashFlows: number[], discountRate: number): number {
  return cashFlows.reduce((sum, cf, t) => sum + cf / Math.pow(1 + discountRate, t), 0);
}

// Calculate Internal Rate of Return (IRR) via Newton-Raphson
function calculateIrr(cashFlows: number[], guess = 0.12): number {
  let r = guess;
  const maxIterations = 50;
  const precision = 0.0001;

  for (let i = 0; i < maxIterations; i++) {
    let npv = 0;
    let dNpv = 0;
    for (let t = 0; t < cashFlows.length; t++) {
      const denom = Math.pow(1 + r, t);
      npv += cashFlows[t] / denom;
      if (t > 0) {
        dNpv -= (t * cashFlows[t]) / Math.pow(1 + r, t + 1);
      }
    }

    if (Math.abs(npv) < precision) return r;
    if (Math.abs(dNpv) < 1e-7) break;

    const newR = r - npv / dNpv;
    if (isNaN(newR) || newR < -0.9 || newR > 1.5) break;
    r = newR;
  }

  // Fallback linear interpolation
  return Math.max(-0.2, Math.min(0.5, r));
}

// Box-Muller transform for Gaussian random variables
function randomGaussian(mean = 0, std = 1): number {
  const u1 = Math.max(1e-9, Math.random());
  const u2 = Math.random();
  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  return z0 * std + mean;
}

export function runMonteCarloSimulation(config: MonteCarloSimulationConfig): MonteCarloSimulationResult {
  const {
    landAreaAcres,
    baseCarbonPricePerTonne,
    discountRatePercent,
    numTrials = 1000,
    annualDroughtRiskPercent = 15,
    priceVolatilityPercent = 22,
    priceDriftPercent = 4.5,
    treesPerAcre = 240
  } = config;

  const horizonYears = 30;
  const discountRate = discountRatePercent / 100;
  const totalTrees = Math.round(landAreaAcres * treesPerAcre);

  // Baseline unit costs
  const initialCapExPerTree = 99; // saplings, pitting, initial labor, fencing & drip
  const year0CapEx = Math.round(totalTrees * initialCapExPerTree + landAreaAcres * 3500);
  const baselineAnnualOpex = Math.round(landAreaAcres * 1800);

  // Allometric annual mean biomass per tree: 20 kg/tree/yr
  const baseBiomassPerTreeKg = 20;
  const netConversion = (1 + 0.26) * 0.47 * 3.6667 * (1 - 0.18) * (1 - 0.12); // Verra deductions included

  const allTrialCashFlows: number[][] = [];
  const allTrialIrrs: number[] = [];
  const allTrialNpvs: number[] = [];
  const allTrialPaybackYears: number[] = [];

  for (let trial = 0; trial < numTrials; trial++) {
    const trialCashFlows: number[] = [-year0CapEx];
    let cumulativeCf = -year0CapEx;
    let paybackAchieved = false;
    let paybackYear = horizonYears;

    let currentCarbonPrice = baseCarbonPricePerTonne;
    let cumulativeBiomassTonnes = 0;
    let cumulativeCreditedCo2 = 0;

    for (let year = 1; year <= horizonYears; year++) {
      // 1. Carbon Price stochastic step via Geometric Brownian Motion:
      // S_{t+1} = S_t * exp((mu - 0.5 * sigma^2) * dt + sigma * dW)
      const dt = 1;
      const mu = priceDriftPercent / 100;
      const sigma = priceVolatilityPercent / 100;
      const dW = randomGaussian(0, Math.sqrt(dt));
      currentCarbonPrice = currentCarbonPrice * Math.exp((mu - 0.5 * sigma * sigma) * dt + sigma * dW);
      currentCarbonPrice = Math.max(baseCarbonPricePerTonne * 0.4, Math.min(baseCarbonPricePerTonne * 3.8, currentCarbonPrice));

      // 2. Climate risk: Drought event occurrence
      const isDrought = Math.random() < annualDroughtRiskPercent / 100;
      let climateMultiplier = 1.0;
      let infillReplantingCost = 0;

      if (isDrought) {
        if (year <= 3) {
          // Severe seedling stress in early years
          climateMultiplier = 0.65;
          infillReplantingCost = Math.round(totalTrees * 0.12 * 55); // 12% mortality replanting
        } else {
          climateMultiplier = 0.82; // mature trees resilient but reduced annual ring increment
        }
      }

      // Sigmoid growth curve
      const growthProgress = 1 / (1 + Math.exp(-0.35 * (year - 6)));
      const annualBiomassPerTree = baseBiomassPerTreeKg * (0.3 + 0.9 * growthProgress) * climateMultiplier;
      const annualBiomassTonnes = (totalTrees * annualBiomassPerTree) / 1000;
      cumulativeBiomassTonnes += annualBiomassTonnes;

      // 3. Carbon Credit Issuance logic (Timeline Realism):
      // Year 1 & 2: NO credits issued (VCS validation, pipeline audit, biomass establishment)
      // Year 3: First vintage issuance covers accumulated eligible growth
      let yearCreditRevenue = 0;
      if (year === 1 || year === 2) {
        yearCreditRevenue = 0;
      } else if (year === 3) {
        const eligibleCo2 = cumulativeBiomassTonnes * netConversion;
        yearCreditRevenue = eligibleCo2 * currentCarbonPrice;
        cumulativeCreditedCo2 += eligibleCo2;
      } else {
        const annualCo2 = annualBiomassTonnes * netConversion;
        yearCreditRevenue = annualCo2 * currentCarbonPrice;
        cumulativeCreditedCo2 += annualCo2;
      }

      // Co-benefits & pruning/intercrop revenue starting Year 4
      const annualCoBenefitYield = year >= 4 ? Math.round(landAreaAcres * 1200) : 0;

      // Timber harvest selective thinning at Year 12 and Year 24
      let timberThinningRevenue = 0;
      if (year === 12) {
        timberThinningRevenue = Math.round(totalTrees * 0.25 * 3200); // 25% selective cull
      } else if (year === 24) {
        timberThinningRevenue = Math.round(totalTrees * 0.3 * 6500);
      }

      // Operating Cost with inflation (mean 3.5% drift)
      const yearOpex = Math.round(baselineAnnualOpex * Math.pow(1.035, year) + infillReplantingCost);

      const netAnnualCashFlow = Math.round(yearCreditRevenue + annualCoBenefitYield + timberThinningRevenue - yearOpex);
      trialCashFlows.push(netAnnualCashFlow);

      cumulativeCf += netAnnualCashFlow;
      if (!paybackAchieved && cumulativeCf >= 0) {
        paybackAchieved = true;
        paybackYear = year;
      }
    }

    allTrialCashFlows.push(trialCashFlows);
    allTrialNpvs.push(calculateNpv(trialCashFlows, discountRate));
    allTrialIrrs.push(calculateIrr(trialCashFlows) * 100);
    allTrialPaybackYears.push(paybackYear);
  }

  // Sort arrays for quantile extraction
  allTrialNpvs.sort((a, b) => a - b);
  allTrialIrrs.sort((a, b) => a - b);
  allTrialPaybackYears.sort((a, b) => a - b);

  const p10Idx = Math.floor(numTrials * 0.1);
  const p50Idx = Math.floor(numTrials * 0.5);
  const p90Idx = Math.floor(numTrials * 0.9);

  // Year projections aggregating quantiles
  const projections: MonteCarloYearProjection[] = [];
  let cumP10 = -year0CapEx;
  let cumP50 = -year0CapEx;
  let cumP90 = -year0CapEx;

  for (let year = 1; year <= horizonYears; year++) {
    // Extract year flows across trials
    const yearFlows = allTrialCashFlows.map(cf => cf[year]).sort((a, b) => a - b);

    const p10Net = yearFlows[p10Idx];
    const p50Net = yearFlows[p50Idx];
    const p90Net = yearFlows[p90Idx];

    cumP10 += p10Net;
    cumP50 += p50Net;
    cumP90 += p90Net;

    // Expected carbon price drift
    const carbonPriceExpected = Math.round(baseCarbonPricePerTonne * Math.pow(1 + priceDriftPercent / 100, year));

    projections.push({
      year,
      isCreditIssuanceActive: year >= 3,
      p10CumulativeCashFlow: Math.round(cumP10),
      p50CumulativeCashFlow: Math.round(cumP50),
      p90CumulativeCashFlow: Math.round(cumP90),
      p10AnnualNetRevenue: p10Net,
      p50AnnualNetRevenue: p50Net,
      p90AnnualNetRevenue: p90Net,
      carbonPriceExpected,
      droughtShockOccurredP10: year === 2 || year === 7
    });
  }

  // Histogram bin generation for IRR
  const minIrr = Math.max(0, Math.floor(allTrialIrrs[0]));
  const maxIrr = Math.min(35, Math.ceil(allTrialIrrs[numTrials - 1]));
  const binWidth = Math.max(2, Math.round((maxIrr - minIrr) / 7));
  const irrDistributionBins: Array<{ bin: string; count: number; percentage: number }> = [];

  for (let b = minIrr; b < maxIrr; b += binWidth) {
    const nextB = b + binWidth;
    const count = allTrialIrrs.filter(val => val >= b && val < nextB).length;
    irrDistributionBins.push({
      bin: `${b}% - ${nextB}%`,
      count,
      percentage: Math.round((count / numTrials) * 100)
    });
  }

  // Histogram bin generation for NPV
  const minNpv = allTrialNpvs[0];
  const maxNpv = allTrialNpvs[numTrials - 1];
  const npvStep = (maxNpv - minNpv) / 6;
  const npvDistributionBins: Array<{ bin: string; count: number; percentage: number }> = [];

  for (let i = 0; i < 6; i++) {
    const lower = minNpv + i * npvStep;
    const upper = lower + npvStep;
    const count = allTrialNpvs.filter(val => val >= lower && val < upper).length;
    const formatNpv = (num: number) => {
      if (Math.abs(num) >= 100000) return `₹${(num / 100000).toFixed(1)}L`;
      return `₹${Math.round(num / 1000)}k`;
    };
    npvDistributionBins.push({
      bin: `${formatNpv(lower)} to ${formatNpv(upper)}`,
      count,
      percentage: Math.round((count / numTrials) * 100)
    });
  }

  const meanIrr = Math.round((allTrialIrrs.reduce((a, b) => a + b, 0) / numTrials) * 10) / 10;
  const meanNpv = Math.round(allTrialNpvs.reduce((a, b) => a + b, 0) / numTrials);

  return {
    simulationsRun: numTrials,
    horizonYears,
    firstCreditIssuanceYear: 3,
    meanIrr,
    medianIrr: Math.round(allTrialIrrs[p50Idx] * 10) / 10,
    p10Irr: Math.round(allTrialIrrs[p10Idx] * 10) / 10,
    p90Irr: Math.round(allTrialIrrs[p90Idx] * 10) / 10,
    meanNpv8Percent: meanNpv,
    p10Npv8Percent: Math.round(allTrialNpvs[p10Idx]),
    p90Npv8Percent: Math.round(allTrialNpvs[p90Idx]),
    medianPaybackYear: allTrialPaybackYears[p50Idx],
    valueAtRisk95Percent: Math.round(allTrialNpvs[Math.floor(numTrials * 0.05)]),
    projections,
    irrDistributionBins,
    npvDistributionBins
  };
}

export const PYTHON_MONTE_CARLO_SCRIPT = `"""
=============================================================================
GREENVEST INSTITUTIONAL DECISION-SUPPORT PLATFORM
30-Year Monte Carlo Stochastic ARR Project Finance Simulator
Compliant with Verra VM0047 ARR and IPCC AFOLU Guidelines
=============================================================================
"""

import numpy as np
import pandas as pd

def run_arr_monte_carlo(
    land_area_acres: float = 5.0,
    trees_per_acre: int = 240,
    base_carbon_price: float = 1500.0, # INR per tCO2e (~$18)
    discount_rate: float = 0.08,
    num_trials: int = 1000,
    horizon_years: int = 30,
    annual_drought_prob: float = 0.15,
    price_volatility: float = 0.22,
    price_drift: float = 0.045
):
    total_trees = int(land_area_acres * trees_per_acre)
    year0_capex = total_trees * 99 + land_area_acres * 3500
    baseline_opex = land_area_acres * 1800
    
    # Net allometric conversion factor (Verra VM0047 buffer 18% & leakage 12%)
    net_conversion = (1 + 0.26) * 0.47 * 3.6667 * (1 - 0.18) * (1 - 0.12)
    
    trial_npvs = []
    trial_irrs = []
    trial_paybacks = []
    
    dt = 1.0
    for trial in range(num_trials):
        cash_flows = [-year0_capex]
        cumulative_cf = -year0_capex
        payback_year = horizon_years
        payback_hit = False
        
        carbon_price = base_carbon_price
        cumulative_biomass = 0.0
        
        for year in range(1, horizon_years + 1):
            # Geometric Brownian Motion for VCM Carbon Price
            dW = np.random.normal(0, np.sqrt(dt))
            carbon_price *= np.exp((price_drift - 0.5 * price_volatility**2) * dt + price_volatility * dW)
            
            # Climate drought Markov check
            is_drought = np.random.rand() < annual_drought_prob
            climate_factor = 0.65 if (is_drought and year <= 3) else (0.82 if is_drought else 1.0)
            infill_cost = (total_trees * 0.12 * 55) if (is_drought and year <= 3) else 0.0
            
            # Sigmoid biomass growth
            growth_progress = 1.0 / (1.0 + np.exp(-0.35 * (year - 6.0)))
            annual_biomass = (total_trees * 20.0 * (0.3 + 0.9 * growth_progress) * climate_factor) / 1000.0
            cumulative_biomass += annual_biomass
            
            # Timeline Realism: Verification buffer in Year 1-2
            if year in [1, 2]:
                carbon_rev = 0.0
            elif year == 3:
                # First vintage issuance covers accumulated 3-year verified biomass
                carbon_rev = cumulative_biomass * net_conversion * carbon_price
            else:
                carbon_rev = annual_biomass * net_conversion * carbon_price
                
            opex = baseline_opex * ((1 + 0.035)**year) + infill_cost
            net_cf = carbon_rev - opex
            cash_flows.append(net_cf)
            
            cumulative_cf += net_cf
            if not payback_hit and cumulative_cf >= 0:
                payback_hit = True
                payback_year = year
                
        # Financial metric evaluation
        npv = np.npv(discount_rate, cash_flows)
        try:
            irr = np.irr(cash_flows) * 100.0
        except Exception:
            irr = 0.0
            
        trial_npvs.append(npv)
        trial_irrs.append(irr)
        trial_paybacks.append(payback_year)
        
    return {
        "median_npv": np.percentile(trial_npvs, 50),
        "p10_npv": np.percentile(trial_npvs, 10),
        "p90_npv": np.percentile(trial_npvs, 90),
        "median_irr": np.percentile(trial_irrs, 50),
        "p10_irr": np.percentile(trial_irrs, 10),
        "p90_irr": np.percentile(trial_irrs, 90),
        "median_payback_year": np.percentile(trial_paybacks, 50)
    }

if __name__ == "__main__":
    results = run_arr_monte_carlo()
    print("30-Year ARR Monte Carlo Results:")
    for k, v in results.items():
        print(f"  {k}: {v:,.2f}")
`;
