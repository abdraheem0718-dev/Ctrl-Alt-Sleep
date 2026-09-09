import { BiomeSpecification, TargetBiome } from '../types/greenvest';

export const VERRA_BIOMES_CATALOG: Record<TargetBiome, BiomeSpecification> = {
  'Tropical Rainforest / Moist': {
    id: 'Tropical Rainforest / Moist',
    displayName: 'Tropical Rainforest / Moist Broadleaf',
    sequestrationRateMin: 7.0,
    sequestrationRateMax: 10.0,
    typicalPriceGbpMin: 15,
    typicalPriceGbpMax: 35,
    typicalPriceUsdMin: 19,
    typicalPriceUsdMax: 44,
    typicalPriceInrMin: 1600,
    typicalPriceInrMax: 3800,
    representativeSpecies: ['Swietenia macrophylla (Mahogany)', 'Hevea brasiliensis', 'Ceiba pentandra', 'Dipterocarpus spp.'],
    allometricEquation: 'Chave et al. (2014) pantropical biomass: AGB = 0.0673 × (ρ × D² × H)^0.976',
    citation: 'Verra VM0047 ARR Table 3.2; IPCC 2019 Refinement to 2006 GL, Vol 4, Ch 4 (Tropical Wet/Moist Forests).'
  },
  'Tropical Dry Deciduous & Agroforestry': {
    id: 'Tropical Dry Deciduous & Agroforestry',
    displayName: 'Tropical Dry Deciduous & Agroforestry (India/SE Asia)',
    sequestrationRateMin: 3.5,
    sequestrationRateMax: 6.5,
    typicalPriceGbpMin: 12,
    typicalPriceGbpMax: 24,
    typicalPriceUsdMin: 15,
    typicalPriceUsdMax: 30,
    typicalPriceInrMin: 1300,
    typicalPriceInrMax: 2600,
    representativeSpecies: ['Melia dubia (Malabar Neem)', 'Tectona grandis (Teak)', 'Casuarina equisetifolia', 'Pongamia pinnata'],
    allometricEquation: 'ICAR-CAFRI Tier-2 Sigmoid Growth Allometrics: AGB = a × DBH^b × H^c with drought stress coefficient',
    citation: 'Chavan et al. (2020), Indian Journal of Agroforestry 22(1); Verra VM0047 Smallholder Group Afforestation.'
  },
  'Temperate / Mixed Hardwood': {
    id: 'Temperate / Mixed Hardwood',
    displayName: 'Temperate Continental & Mixed Hardwood',
    sequestrationRateMin: 2.5,
    sequestrationRateMax: 4.5,
    typicalPriceGbpMin: 10,
    typicalPriceGbpMax: 18,
    typicalPriceUsdMin: 13,
    typicalPriceUsdMax: 23,
    typicalPriceInrMin: 1100,
    typicalPriceInrMax: 1950,
    representativeSpecies: ['Quercus robur (English Oak)', 'Fagus sylvatica (European Beech)', 'Pinus sylvestris (Scots Pine)', 'Acer pseudoplatanus'],
    allometricEquation: 'Zianis et al. (2005) European Allometric Equations: ln(AGB) = -2.0127 + 2.4335 × ln(DBH)',
    citation: 'IPCC Good Practice Guidance for LULUCF (Temperate Oceanic/Continental); Forestry Commission UK Woodland Carbon Code.'
  },
  'Boreal Forest (Taiga)': {
    id: 'Boreal Forest (Taiga)',
    displayName: 'Boreal Forest (Taiga / High Latitude Coniferous)',
    sequestrationRateMin: 1.0,
    sequestrationRateMax: 2.0,
    typicalPriceGbpMin: 5,
    typicalPriceGbpMax: 12,
    typicalPriceUsdMin: 6.5,
    typicalPriceUsdMax: 15,
    typicalPriceInrMin: 550,
    typicalPriceInrMax: 1300,
    representativeSpecies: ['Picea abies (Norway Spruce)', 'Pinus sylvestris', 'Betula pendula (Silver Birch)', 'Larix sibirica'],
    allometricEquation: 'Repola et al. (2007) Biomass Equations for Scots Pine and Norway Spruce in Finland: ln(W) = β0 + β1 × ln(d_k) + ...',
    citation: 'Verra VM0047 Boreal Sub-module; IPCC 2006 AFOLU Tier-1 default annual biomass increment (1.0-1.8 t dry matter/ha/yr).'
  },
  'Mangrove & Coastal Blue Carbon': {
    id: 'Mangrove & Coastal Blue Carbon',
    displayName: 'Mangrove & Coastal Estuarine Blue Carbon',
    sequestrationRateMin: 8.0,
    sequestrationRateMax: 14.0,
    typicalPriceGbpMin: 20,
    typicalPriceGbpMax: 45,
    typicalPriceUsdMin: 25,
    typicalPriceUsdMax: 58,
    typicalPriceInrMin: 2200,
    typicalPriceInrMax: 4900,
    representativeSpecies: ['Rhizophora mangle (Red Mangrove)', 'Avicennia marina (Grey Mangrove)', 'Sonneratia alba', 'Bruguiera gymnorhiza'],
    allometricEquation: 'Komiyama et al. (2005) Common Allometric Equations for Mangrove Trees: W_top = 0.251 × ρ × D^2.46',
    citation: 'Verra VM0033 / VM0047 Tidal Wetland Restoration; Donato et al. (2011) Nature Geoscience 4(5).'
  }
};
