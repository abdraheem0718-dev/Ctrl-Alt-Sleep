import React from 'react';
import {
  FarmerInputs
} from '../types/greenvest';
import {
  DISTRICT_DATABASE
} from '../data/publishedDatasets';
import {
  MapPin,
  Layers,
  Droplets,
  Sprout,
  TreeDeciduous,
  Compass,
  Sliders,
  Sparkles,
  HelpCircle,
  Building2,
  CheckCircle2
} from 'lucide-react';
import { TRANSLATIONS, Language } from '../utils/translations';
import {
  getLocalizedState,
  getLocalizedDistrict,
  LAND_USE_OPTIONS,
  PLANTING_MODEL_OPTIONS,
  TREE_PREFERENCE_OPTIONS,
  CARBON_PRICE_OPTIONS,
  getUiString
} from '../utils/localizedStrings';

interface FarmerFormProps {
  inputs: FarmerInputs;
  onChange: (inputs: FarmerInputs) => void;
  language: Language;
  onOpenDossier?: () => void;
  onExpressInterest?: () => void;
  hasExpressedInterest?: boolean;
}

export const FarmerForm: React.FC<FarmerFormProps> = ({
  inputs,
  onChange,
  language,
  onOpenDossier,
  onExpressInterest,
  hasExpressedInterest = false
}) => {
  const t = TRANSLATIONS[language];

  const updateField = <K extends keyof FarmerInputs>(field: K, value: FarmerInputs[K]) => {
    onChange({
      ...inputs,
      [field]: value
    });
  };

  const handleStateChange = (newState: string) => {
    const districts = DISTRICT_DATABASE[newState] || [];
    const firstDistrict = districts[0]?.district || 'Coimbatore';
    onChange({
      ...inputs,
      state: newState,
      district: firstDistrict
    });
  };

  const loadExamplePreset = () => {
    onChange({
      landArea: 5,
      state: 'Tamil Nadu',
      district: 'Coimbatore',
      soilType: 'Red Loam (Semman)',
      waterAvailability: 'Moderate',
      currentLandUse: 'Active Annual Crops',
      preferredTreeType: 'Any / Optimized',
      plantingModel: 'Agri-Silviculture (Trees + Crops)',
      carbonPriceScenario: 'Baseline (₹1,500/t)'
    });
  };

  const availableDistricts = DISTRICT_DATABASE[inputs.state] || DISTRICT_DATABASE['Tamil Nadu'];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-[#E0D8C8] transition-all">
      {/* Header with Quick Preset */}
      <div className="flex items-center justify-between pb-4 border-b border-[#F4F1EA] mb-5">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-[#1A2E11] flex items-center gap-2 font-serif">
            <Sprout className="w-5 h-5 text-[#2D4A22]" />
            <span>{t.formTitle}</span>
          </h2>
          <p className="text-xs text-[#6D7A65] mt-0.5">
            {t.formSubtitle}
          </p>
        </div>

        <button
          id="btn-load-preset"
          type="button"
          onClick={loadExamplePreset}
          className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-[#F4F1EA] hover:bg-[#E9EDC9] text-[#2D4A22] text-xs font-bold border border-[#CCD5AE] transition-colors shadow-2xs"
          title={t.btnPreset5Acres}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#2D4A22]" />
          <span>{t.btnPreset5Acres}</span>
        </button>
      </div>

      <div className="space-y-5">
        
        {/* 1. Land Area (Acres) */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-semibold text-[#2C3626] flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-[#2D4A22]" />
              <span>{t.landAreaLabel}</span>
            </label>
            <div className="flex items-center space-x-1">
              <span className="text-sm font-bold text-[#2D4A22] bg-[#E9EDC9] px-2.5 py-0.5 rounded-lg border border-[#CCD5AE] font-mono-data">
                {inputs.landArea} {t.acresUnit}
              </span>
              <span className="text-[11px] text-[#6D7A65]">
                ({(inputs.landArea * 0.4047).toFixed(1)} {getUiString('hectares', language)})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              id="input-land-area"
              type="range"
              min={1}
              max={30}
              step={0.5}
              value={inputs.landArea}
              onChange={(e) => updateField('landArea', parseFloat(e.target.value) || 1)}
              className="w-full h-2 bg-[#F4F1EA] rounded-lg appearance-none cursor-pointer accent-[#2D4A22]"
            />
          </div>

          {/* Quick Acre Chips */}
          <div className="flex flex-wrap gap-1.5 mt-2.5">
            {[1, 2.5, 5, 7.5, 10, 15, 20].map((acres) => (
              <button
                key={acres}
                type="button"
                id={`chip-acres-${acres}`}
                onClick={() => updateField('landArea', acres)}
                className={`text-xs px-2.5 py-1 rounded-xl transition-all font-medium border ${
                  inputs.landArea === acres
                    ? 'bg-[#2D4A22] text-[#F1F5EF] border-[#2D4A22] shadow-xs font-bold'
                    : 'bg-[#F4F1EA] text-[#6D7A65] hover:bg-[#E9EDC9]/60 border-[#E0D8C8]'
                }`}
              >
                {acres} {t.acAbbr}
              </button>
            ))}
          </div>
        </div>

        {/* 2. Location (State & District) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-[#2C3626] mb-1 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#2D4A22]" />
              <span>{t.stateLabel}</span>
            </label>
            <select
              id="select-state"
              value={inputs.state}
              onChange={(e) => handleStateChange(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-[#FDFBF7] border border-[#E0D8C8] rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D4A22] focus:border-transparent text-[#2C3626] transition-all"
            >
              {Object.keys(DISTRICT_DATABASE).map((st) => (
                <option key={st} value={st}>
                  {getLocalizedState(st, language)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#2C3626] mb-1 flex items-center justify-between">
              <span>{t.districtLabel}</span>
              <span className="text-[10px] text-[#2D4A22] font-semibold">{t.autoRainfallNote}</span>
            </label>
            <select
              id="select-district"
              value={inputs.district}
              onChange={(e) => updateField('district', e.target.value)}
              className="w-full px-3 py-2 text-sm bg-[#FDFBF7] border border-[#E0D8C8] rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D4A22] focus:border-transparent text-[#2C3626] transition-all"
            >
              {availableDistricts.map((d) => (
                <option key={d.district} value={d.district}>
                  {getLocalizedDistrict(d.district, language)} ({d.annualRainfallMm} {getUiString('mmRain', language)})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 3. Soil Type */}
        <div>
          <label className="block text-xs font-semibold text-[#2C3626] mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Layers className="w-3.5 h-3.5 text-[#2D4A22]" />
              <span>{t.soilTypeLabel}</span>
            </span>
            <span className="text-[11px] text-[#8BA888]">{t.bulkDensityNote}</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              { id: 'Red Loam (Semman)', label: t.soils.redLoam, desc: t.soils.redLoamDesc },
              { id: 'Black Soil (Karisal)', label: t.soils.blackSoil, desc: t.soils.blackSoilDesc },
              { id: 'Alluvial (Vandaloor)', label: t.soils.alluvial, desc: t.soils.alluvialDesc },
              { id: 'Sandy Loam', label: t.soils.sandyLoam, desc: t.soils.sandyLoamDesc },
              { id: 'Clay Loam', label: t.soils.clayLoam, desc: t.soils.clayLoamDesc },
              { id: 'Laterite', label: t.soils.laterite, desc: t.soils.lateriteDesc }
            ].map((soil) => (
              <button
                key={soil.id}
                type="button"
                id={`soil-${soil.id.replace(/\s+/g, '-').toLowerCase()}`}
                onClick={() => updateField('soilType', soil.id)}
                className={`p-2.5 text-left rounded-2xl border transition-all ${
                  inputs.soilType === soil.id
                    ? 'border-[#2D4A22] bg-[#F4F1EA] text-[#1A2E11] font-semibold ring-1 ring-[#2D4A22]'
                    : 'border-[#E0D8C8] bg-[#FDFBF7] hover:bg-[#F4F1EA]/70 text-[#2C3626]'
                }`}
              >
                <div className="text-xs font-medium">{soil.label}</div>
                <div className="text-[10px] text-[#6D7A65] mt-0.5">{soil.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 4. Water Availability */}
        <div>
          <label className="block text-xs font-semibold text-[#2C3626] mb-1.5 flex items-center justify-between">
            <span className="flex items-center gap-1">
              <Droplets className="w-3.5 h-3.5 text-[#2D4A22]" />
              <span>{t.waterAvailabilityLabel}</span>
            </span>
            <span className="text-[11px] text-[#8BA888]">{t.waterNote}</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'Rainfed', label: t.waterOptions.rainfed, hint: t.waterOptions.rainfedHint },
              { id: 'Moderate', label: t.waterOptions.moderate, hint: t.waterOptions.moderateHint },
              { id: 'High / Canal', label: t.waterOptions.canal, hint: t.waterOptions.canalHint },
              { id: 'Drip-equipped', label: t.waterOptions.drip, hint: t.waterOptions.dripHint }
            ].map((w) => (
              <button
                key={w.id}
                type="button"
                id={`water-${w.id.replace(/[^a-zA-Z]/g, '-').toLowerCase()}`}
                onClick={() => updateField('waterAvailability', w.id as any)}
                className={`p-2.5 text-left rounded-2xl border transition-all ${
                  inputs.waterAvailability === w.id
                    ? 'border-[#2D4A22] bg-[#F4F1EA] text-[#1A2E11] font-semibold ring-1 ring-[#2D4A22]'
                    : 'border-[#E0D8C8] bg-[#FDFBF7] hover:bg-[#F4F1EA]/70 text-[#2C3626]'
                }`}
              >
                <div className="text-xs font-medium">{w.label}</div>
                <div className="text-[10px] text-[#6D7A65] mt-0.5">{w.hint}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 5. Current Land Use & Planting Pattern */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-[#2C3626] mb-1 flex items-center gap-1">
              <TreeDeciduous className="w-3.5 h-3.5 text-[#2D4A22]" />
              <span>{t.currentLandUseLabel}</span>
            </label>
            <select
              id="select-land-use"
              value={inputs.currentLandUse}
              onChange={(e) => updateField('currentLandUse', e.target.value as any)}
              className="w-full px-3 py-2 text-sm bg-[#FDFBF7] border border-[#E0D8C8] rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D4A22] focus:border-transparent text-[#2C3626] transition-all"
            >
              <option value="Active Annual Crops">
                {LAND_USE_OPTIONS['Active Annual Crops'][language].label}
              </option>
              <option value="Agroforestry Boundary">
                {LAND_USE_OPTIONS['Agroforestry Boundary (Bund planting)'][language].label}
              </option>
              <option value="Fallow / Degraded">
                {LAND_USE_OPTIONS['Fallow / Degraded Land'][language].label}
              </option>
              <option value="Orchard / Horticulture">
                {LAND_USE_OPTIONS['Orchard / Horticulture'][language].label}
              </option>
              <option value="Pasture / Wasteland">
                {LAND_USE_OPTIONS['Pasture / Wasteland'][language].label}
              </option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#2C3626] mb-1 flex items-center gap-1">
              <Sliders className="w-3.5 h-3.5 text-[#2D4A22]" />
              <span>{t.plantingModelLabel}</span>
            </label>
            <select
              id="select-planting-model"
              value={inputs.plantingModel}
              onChange={(e) => updateField('plantingModel', e.target.value as any)}
              className="w-full px-3 py-2 text-sm bg-[#FDFBF7] border border-[#E0D8C8] rounded-2xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2D4A22] focus:border-transparent text-[#2C3626] transition-all"
            >
              <option value="Agri-Silviculture (Trees + Crops)">
                {PLANTING_MODEL_OPTIONS['Agri-Silviculture (Trees + Crops)'][language]}
              </option>
              <option value="Boundary / Bund Agroforestry">
                {PLANTING_MODEL_OPTIONS['Boundary / Bund Planting'][language]}
              </option>
              <option value="Block Plantation">
                {PLANTING_MODEL_OPTIONS['Block Plantation'][language]}
              </option>
            </select>
          </div>
        </div>

        {/* 6. Preferred Tree Type (Optional as per user prompt) */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-[#2C3626] flex items-center gap-1">
              <span>{t.preferredTreeLabel}</span>
              <span className="text-[10px] text-[#2D4A22] font-bold bg-[#E9EDC9] px-2 py-0.5 rounded-full border border-[#CCD5AE]">
                {language === 'ta' ? 'விருப்பத்தேர்வு' : language === 'ml' ? 'ഓപ്ഷണൽ' : language === 'kn' ? 'ಐಚ್ಛಿಕ' : language === 'te' ? 'ఐచ్ఛికం' : 'Optional'}
              </span>
            </label>
            <span className="text-[11px] text-[#8BA888]">{t.treeNote}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
            {[
              {
                id: 'Any / Optimized',
                label: TREE_PREFERENCE_OPTIONS['Any / Optimized'][language].label,
                sub: TREE_PREFERENCE_OPTIONS['Any / Optimized'][language].sub
              },
              {
                id: 'High-Value Timber',
                label: TREE_PREFERENCE_OPTIONS['Timber Value'][language].label,
                sub: TREE_PREFERENCE_OPTIONS['Timber Value'][language].sub
              },
              {
                id: 'Fast-Growing Biomass',
                label: TREE_PREFERENCE_OPTIONS['Fast Biomass'][language].label,
                sub: TREE_PREFERENCE_OPTIONS['Fast Biomass'][language].sub
              },
              {
                id: 'Multi-tier Horticulture',
                label: TREE_PREFERENCE_OPTIONS['Fodder & Pods'][language].label,
                sub: TREE_PREFERENCE_OPTIONS['Fodder & Pods'][language].sub
              },
              {
                id: 'Native Biodiversity',
                label: TREE_PREFERENCE_OPTIONS['Native & Hardy'][language].label,
                sub: TREE_PREFERENCE_OPTIONS['Native & Hardy'][language].sub
              }
            ].map((p) => (
              <button
                key={p.id}
                type="button"
                id={`pref-${p.id.replace(/[^a-zA-Z]/g, '-').toLowerCase()}`}
                onClick={() => updateField('preferredTreeType', p.id as any)}
                className={`p-2 text-left rounded-2xl border transition-all ${
                  inputs.preferredTreeType === p.id
                    ? 'border-[#2D4A22] bg-[#E9EDC9] text-[#2D4A22] font-bold ring-1 ring-[#2D4A22]'
                    : 'border-[#E0D8C8] bg-[#FDFBF7] hover:bg-[#F4F1EA] text-[#2C3626]'
                }`}
              >
                <div className="text-xs font-semibold">{p.label}</div>
                <div className="text-[10px] text-[#6D7A65] truncate">{p.sub}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Carbon Pricing Scenario toggle */}
        <div className="pt-3 border-t border-[#F4F1EA] flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="text-[#6D7A65] flex items-center gap-1 font-medium">
            <HelpCircle className="w-3.5 h-3.5 text-[#8BA888]" />
            <span>{t.carbonPriceLabel}:</span>
          </span>
          <div className="inline-flex rounded-xl bg-[#F4F1EA] p-0.5 border border-[#E0D8C8]">
            {(['Conservative (₹850/t)', 'Baseline (₹1,500/t)', 'Optimistic (₹2,200/t)'] as const).map((scen) => {
              const opt = CARBON_PRICE_OPTIONS[scen]?.[language];
              const label = opt ? opt.label : scen;

              return (
                <button
                  key={scen}
                  type="button"
                  onClick={() => updateField('carbonPriceScenario', scen)}
                  className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-all ${
                    inputs.carbonPriceScenario === scen
                      ? 'bg-[#2D4A22] text-[#F1F5EF] shadow-xs font-bold'
                      : 'text-[#6D7A65] hover:text-[#1A2E11]'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Station: Free Aggregation directly beneath value input region */}
        <div className="pt-4 border-t-2 border-[#E0D8C8] space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#1A2E11] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-[#2D4A22]" />
              <span>{getUiString('finalDossierAndAggregation', language)}</span>
            </span>
            <span className="text-[10px] text-[#2D4A22] font-semibold bg-[#E9EDC9] px-2 py-0.5 rounded-full border border-[#CCD5AE]">
              {getLocalizedDistrict(inputs.district, language)} • {inputs.landArea} {t.acresUnit}
            </span>
          </div>

          {/* Express Interest for Free Aggregation button */}
          {onExpressInterest && (
            <button
              type="button"
              id="btn-express-interest-beneath-inputs"
              onClick={onExpressInterest}
              className={`w-full py-2.5 px-4 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                hasExpressedInterest
                  ? 'bg-[#E9EDC9] border-[#CCD5AE] text-[#2D4A22]'
                  : 'bg-[#FDFBF7] hover:bg-[#F4F1EA] border-[#2D4A22]/40 text-[#1A2E11]'
              }`}
            >
              {hasExpressedInterest ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2D4A22]" />
                  <span>
                    {language === 'ta'
                      ? '✓ ஒருங்கிணைப்புக் குழுமத்தில் இணைக்கப்பட்டது!'
                      : language === 'ml'
                      ? '✓ ഡെവലപ്പർ ഹബ്ബിൽ രജിസ്റ്റർ ചെയ്തു!'
                      : language === 'kn'
                      ? '✓ ಒಕ್ಕೂಟ ಹಬ್‌ನಲ್ಲಿ ನೋಂದಾಯಿಸಲಾಗಿದೆ!'
                      : language === 'te'
                      ? '✓ డెవలపర్ హబ్‌లో నమోదు చేయబడింది!'
                      : '✓ Registered in Developer Aggregation Hub!'}
                  </span>
                </>
              ) : (
                <>
                  <Building2 className="w-3.5 h-3.5 text-[#2D4A22]" />
                  <span>
                    {language === 'ta'
                      ? 'இலவச ஒருங்கிணைப்புக்கு விருப்பம் தெரிவி (₹0)'
                      : language === 'ml'
                      ? 'സൗജന്യ അഗ്രിഗേഷനായി താൽപ്പര്യം അറിയിക്കുക (₹0)'
                      : language === 'kn'
                      ? 'ಉಚಿತ ಒಕ್ಕೂಟಕ್ಕಾಗಿ ಆಸಕ್ತಿ ವ್ಯಕ್ತಪಡಿಸಿ (₹0)'
                      : language === 'te'
                      ? 'ఉచిత సమూహం కోసం ఆసక్తి తెలపండి (₹0)'
                      : 'Express Interest for Free Aggregation (₹0 Upfront)'}
                  </span>
                </>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
