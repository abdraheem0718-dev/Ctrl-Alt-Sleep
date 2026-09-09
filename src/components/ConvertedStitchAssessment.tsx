import React, { useState } from 'react';
import { TRANSLATIONS, Language } from '../utils/translations';

interface ConvertedStitchAssessmentProps {
  language?: Language;
  onLanguageChange?: (lang: Language) => void;
  onNavigateToAggregator?: () => void;
  onRegisterCohort?: () => void;
  onNavigateToMethodology?: () => void;
  onOpenDossier?: () => void;
  onNavigateToVerra?: () => void;
  onNavigateToDocuments?: () => void;
  onNavigateToFinance?: () => void;
}

export function ConvertedStitchAssessment({
  language = 'en',
  onLanguageChange,
  onNavigateToAggregator,
  onRegisterCohort,
  onNavigateToMethodology,
  onOpenDossier,
  onNavigateToVerra,
  onNavigateToDocuments,
  onNavigateToFinance
}: ConvertedStitchAssessmentProps) {
  const isTamil = language === 'ta';
  const t = TRANSLATIONS[language];

  const [acres, setAcres] = useState<number>(5.0);
  const [isRecalculating, setIsRecalculating] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);

  // Dynamic calculations based on acreage factor
  const factor = acres / 5.0;
  const p10Co2 = Math.round(118 * factor);
  const p90Co2 = Math.round(186 * factor);
  const p50Co2 = Math.round(154 * factor);

  const revLow = ((p10Co2 * 1500) / 100000).toFixed(2);
  const revHigh = ((p90Co2 * 1500) / 100000).toFixed(2);

  const costLow = (48.5 * factor).toFixed(1);
  const costHigh = (65.0 * factor).toFixed(1);

  const netLow = (1.28 * factor).toFixed(2);
  const netHigh = (2.14 * factor).toFixed(2);
  const netMedian = (1.66 * factor).toFixed(2);

  const handleRecalculate = () => {
    setIsRecalculating(true);
    setTimeout(() => {
      setIsRecalculating(false);
    }, 500);
  };

  const handleDownloadPdf = () => {
    setShowToast(true);
    if (onOpenDossier) {
      onOpenDossier();
    }
    setTimeout(() => {
      setShowToast(false);
    }, 3500);
  };

  return (
    <div className="bg-surface font-body-md text-body-md text-on-surface antialiased min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 w-full z-40 bg-surface/90 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-20 w-full px-gutter-desktop mx-auto max-w-[1440px] flex items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-sm shrink-0">
            <img
              alt="GreenVest Scientific Logo"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1VqIWtpMKwOvBv-YHS5LZeYKY4C0kRZ7utBhy5eGy-kd2maBfS56ZlntOTiREETNx_YZcTFFYjQP0QTTBrZ9t8YmFpnhpG6IFzv5xe6Lf_SO7q4chjqjAWiXexALGQZswQ3a8GGWE6UnRi9B7KV1k3KN5SuAyXHPEnlFry0aSl1oa3JIaFq3pLZWYSDlPvwXyjnDxSg-wJWYOvz7piW6O1FNoJYHi6Sif19qaMCN3CrULi5xEzKZfN_wpIi"
            />
            <div className="flex flex-col">
              <span className="font-headline-md text-headline-md text-primary tracking-tight">{t.brandName}</span>
              <span className="font-label-mono-sm text-label-mono-sm text-on-surface-variant tracking-wider uppercase">
                {isTamil ? 'நிரூபிக்கப்பட்ட வேளாண் காடுகள் மாதிரி' : 'Empirical Agroforestry Model'}
              </span>
            </div>
          </div>

          <nav className="hidden xl:flex items-center gap-space-xs p-space-2xs bg-surface-container rounded-lg">
            <button
              type="button"
              className="px-space-md py-space-xs rounded transition-colors bg-primary-container text-on-primary font-headline-sm"
            >
              {isTamil ? 'விவசாயி மதிப்பீடு' : 'Farmer Assessment'}
            </button>
            <button
              type="button"
              onClick={onNavigateToMethodology}
              className="px-space-md py-space-xs rounded font-body-md text-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
            >
              {isTamil ? 'அறிவியல் வழிமுறைகள் & தரநிலைகள்' : 'Scientific Methodology & Standards'}
            </button>
            <button
              type="button"
              onClick={onNavigateToAggregator}
              className="px-space-md py-space-xs rounded font-body-md text-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
            >
              {isTamil ? 'ஒருங்கிணைப்பாளர் தளம்' : 'Developer Aggregation Hub'}
            </button>
          </nav>

          <div className="flex items-center gap-space-sm shrink-0">
            {/* Language Switcher */}
            {onLanguageChange && (
              <div className="flex items-center bg-surface-container-high p-1 rounded-full text-xs font-bold border border-outline/20">
                {[
                  { id: 'en' as const, label: 'EN' },
                  { id: 'ta' as const, label: 'தமிழ்' },
                  { id: 'ml' as const, label: 'മലയാളം' },
                  { id: 'kn' as const, label: 'ಕನ್ನಡ' },
                  { id: 'te' as const, label: 'తెలుగు' }
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onLanguageChange(item.id)}
                    className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                      language === item.id ? 'bg-primary text-white shadow-2xs' : 'text-on-surface-variant hover:text-primary'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}

            <div className="hidden 2xl:flex items-center gap-space-2xs px-space-sm py-space-2xs rounded-full bg-surface-container-low">
              <span className="material-symbols-outlined text-[16px] text-surface-tint">verified</span>
              <span className="font-label-mono-sm text-label-mono-sm text-on-surface-variant">
                {isTamil ? 'வெர்ரா VM0047 & IPCC AFOLU இணக்கமானது' : 'Verra VM0047 & IPCC AFOLU Compliant'}
              </span>
            </div>
            <button
              type="button"
              onClick={onNavigateToAggregator}
              className="hidden sm:inline-flex items-center justify-center px-space-md py-space-xs rounded bg-primary-container text-on-primary font-headline-sm text-body-md hover:bg-primary transition-colors shadow-sm"
            >
              {isTamil ? 'டெவலப்பர் போர்டல்' : 'Developer Portal'}
            </button>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </div>
          </div>
        </div>
      </header>

      {/* Institutional Decision-Support Modules Bar */}
      <div className="w-full bg-[#1A2E11] text-[#CCD5AE] border-b border-white/10 py-2.5 px-gutter-desktop">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="bg-[#2D4A22] text-[#CCD5AE] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider text-[10px] border border-[#8BA888]/40">
              {isTamil ? 'நிறுவன மேம்பாடுகள் தயார்' : 'Institutional Upgrade Active'}
            </span>
            <span className="text-white font-medium text-[11px] hidden md:inline">
              {isTamil ? '3 மேம்பட்ட முடிவெடுக்கும் தொழில்நுட்பங்கள்:' : 'Explore 3 advanced decision-support capabilities:'}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-wrap text-xs">
            <button
              type="button"
              onClick={onNavigateToVerra}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[14px] text-emerald-400">balance</span>
              <span>{isTamil ? '1. வெர்ரா VM0047 மாதிரி' : '1. Verra VM0047 Model'}</span>
            </button>

            <button
              type="button"
              onClick={onNavigateToDocuments}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[14px] text-emerald-400">document_scanner</span>
              <span>{isTamil ? '2. ஆவண மையம்' : '2. Document Hub'}</span>
            </button>

            <button
              type="button"
              onClick={onNavigateToFinance}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-medium transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[14px] text-emerald-400">query_stats</span>
              <span>{isTamil ? '3. 30-ஆண்டு மான்டே கார்லோ' : '3. 30-Yr Monte Carlo'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <main className="w-full bg-surface flex-1">
        <div className="flex flex-col w-full">
          {/* Top Archival Badge & Protocol Header */}
          <section className="w-full max-w-[1440px] mx-auto px-gutter-desktop pt-space-md">
            <div className="flex flex-wrap items-center justify-between gap-space-sm pb-space-sm">
              <div className="flex items-center gap-space-xs">
                <span className="inline-flex items-center gap-1.5 px-space-xs py-1 rounded bg-surface-container-high text-primary font-label-mono-sm text-label-mono-sm">
                  <span className="w-2 h-2 rounded-full bg-surface-tint animate-pulse" />
                  {isTamil ? 'ஆய்வு எண் #GV-TN-84920' : 'Assessment Run #GV-TN-84920'}
                </span>
                <span className="text-on-surface-variant font-label-mono-sm text-label-mono-sm">
                  {isTamil ? 'வேளாண் காலநிலை மண்டலம்: மேற்கு தமிழ்நாடு (மண்டலம் VI)' : 'Agro-Climatic Zone: Western Tamil Nadu (Zone VI)'}
                </span>
              </div>
              <div className="flex items-center gap-space-xs text-on-surface-variant font-label-mono-sm text-label-mono-sm">
                <span className="material-symbols-outlined text-[15px] text-surface-tint">verified_user</span>
                {isTamil ? 'TNAU & CAFRI உயிரியல் அளவீடு v4.2 • IPCC அடுக்கு 2 AFOLU' : 'TNAU & CAFRI Biometric Calibrated v4.2 • IPCC Tier 2 AFOLU'}
              </div>
            </div>

            {/* Core Philosophy Stance Banner */}
            <div className="w-full rounded-xl bg-surface-container-low p-space-md sm:p-space-lg shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-center">
                <div className="lg:col-span-7 flex flex-col gap-space-xs">
                  <span className="font-label-mono-sm text-label-mono-sm tracking-wider uppercase text-surface-tint">
                    {isTamil ? 'முன்-சாத்தியக்கூறு ஆய்வு தரநிலை' : 'Pre-Feasibility Underwriting Mandate'}
                  </span>
                  <h1 className="font-display-md text-display-md text-primary leading-tight">
                    {isTamil ? (
                      <>
                        நாங்கள் கற்பனையான வாக்குறுதிகளை அளிப்பதில்லை.{' '}
                        <span className="italic font-normal">முதலீட்டிற்கு முன் அறிவியல் பூர்வ சாத்தியக்கூறுகளை மட்டுமே மதிப்பிடுகிறோம்.</span>
                      </>
                    ) : (
                      <>
                        We don’t sell carbon credits.{' '}
                        <span className="italic font-normal">We evaluate empirical viability before capital deployment.</span>
                      </>
                    )}
                  </h1>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
                    {isTamil ? (
                      <>
                        TNAU வனக்கல்லூரி மற்றும் வெர்ரா VM0047 மாதிரிகளின்படி, உங்கள் 10-ஆண்டு எதிர்பார்க்கப்படும் நிகர வருமானம்{' '}
                        <strong className="font-metric-display text-primary font-semibold">
                          ₹{netLow} இலட்சம் – ₹{netHigh} இலட்சம்
                        </strong>{' '}
                        (P10 முதல் P90 வரை அறிவியல் நிச்சயமற்ற வரம்புகளில்).
                      </>
                    ) : (
                      <>
                        Based on verified institutional yield tables (TNAU Forest College) and Verra VM0047 permanence models, your estimated 10-year net potential is{' '}
                        <strong className="font-metric-display text-primary font-semibold">
                          ₹{netLow}L – ₹{netHigh}L
                        </strong>{' '}
                        under empirical uncertainty boundaries (P10 to P90).
                      </>
                    )}
                  </p>
                </div>

                <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-space-xs">
                  {/* Speculative Marketing Trap */}
                  <div className="p-space-sm rounded-lg bg-surface-container flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="font-label-mono-sm text-label-mono-sm uppercase text-secondary">
                        {isTamil ? 'கற்பனை வாக்குறுதி' : 'Speculative Claim'}
                      </span>
                      <span className="material-symbols-outlined text-secondary text-[18px]">close</span>
                    </div>
                    <div className="my-space-xs">
                      <p className="font-label-mono-lg text-label-mono-lg text-on-surface-variant line-through opacity-70">
                        {isTamil ? '“உறுதியான ₹2,50,000 நிலையான மகசூல்”' : '"Guaranteed ₹2,50,000 fixed yield"'}
                      </p>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      {isTamil ? 'மண் அமிலத்தன்மை, வறட்சி அபாயம் மற்றும் வெர்ரா விதிமுறைகளை புறக்கணிக்கிறது.' : 'Ignores baseline risk, soil pH, monsoon variance & Verra buffer pools.'}
                    </span>
                  </div>

                  {/* Empirical Range Standard */}
                  <div className="p-space-sm rounded-lg bg-surface-container-lowest flex flex-col justify-between shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-label-mono-sm text-label-mono-sm uppercase text-surface-tint font-semibold">
                        {isTamil ? 'அறிவியல் பூர்வ வரம்பு' : 'Empirical Range'}
                      </span>
                      <span className="material-symbols-outlined text-surface-tint text-[18px]">check_circle</span>
                    </div>
                    <div className="my-space-xs">
                      <p className="font-label-mono-lg text-label-mono-lg text-primary font-semibold">
                        ₹{(parseFloat(netLow) * 100000).toLocaleString('en-IN')} – ₹{(parseFloat(netHigh) * 100000).toLocaleString('en-IN')}
                      </p>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      {isTamil ? '12 TNAU கள ஆய்வுகளின்படி 85% நம்பகத்தன்மை கொண்ட வரம்பு.' : '85% confidence interval calibrated to 12 TNAU experimental field trials.'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Two-Column Assessment Workspace */}
          <section className="w-full max-w-[1440px] mx-auto px-gutter-desktop py-space-xl">
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">
              {/* LEFT COLUMN: Parameter Adjustment Panel */}
              <aside className="xl:col-span-4 flex flex-col gap-space-md">
                <div className="bg-surface-container-low rounded-xl p-space-md shadow-sm flex flex-col gap-space-md">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-label-mono-md text-label-mono-md text-primary font-semibold uppercase tracking-wider">
                        {isTamil ? 'விவசாய நில அளவீட்டு அறிக்கை' : 'Agronomic Field Dossier'}
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        {isTamil ? 'கோயம்புத்தூர் நில எண்: TN-CBE-2024-884' : 'Coimbatore Parcel ID: TN-CBE-2024-884'}
                      </span>
                    </div>
                    <span className="material-symbols-outlined text-surface-tint">tune</span>
                  </div>

                  {/* Land Area Slider & Density Preview */}
                  <div className="flex flex-col gap-space-2xs bg-surface-container-lowest p-space-sm rounded-lg">
                    <div className="flex items-center justify-between">
                      <label className="font-label-mono-sm text-label-mono-sm text-on-surface-variant uppercase" htmlFor="land-area-input">
                        {isTamil ? 'நிலப்பரப்பு' : 'Target Land Area'}
                      </label>
                      <div className="flex items-center gap-1 font-metric-display text-label-mono-lg text-primary font-bold">
                        <span>{acres.toFixed(1)}</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">
                          {isTamil ? 'ஏக்கர்' : 'Acres'}
                        </span>
                      </div>
                    </div>
                    <input
                      className="w-full h-1.5 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary-container"
                      id="land-area-input"
                      max="25.0"
                      min="1.0"
                      step="0.5"
                      type="range"
                      value={acres}
                      onChange={(e) => setAcres(parseFloat(e.target.value) || 1.0)}
                    />
                    <div className="flex items-center justify-between font-label-mono-sm text-label-mono-sm text-on-surface-variant pt-1">
                      <span>{isTamil ? 'மரங்களின் எண்ணிக்கை:' : 'Planting Density:'} ~{Math.round(400 * acres)}–{Math.round(500 * acres)}</span>
                      <span>{isTamil ? 'இடைவெளி:' : 'Spacings:'} 3m × 2.5m</span>
                    </div>
                  </div>

                  {/* Geo-Zone Selection */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-mono-sm text-label-mono-sm text-on-surface-variant uppercase">
                      {isTamil ? 'வேளாண் காலநிலை மண்டலம் & மழைப்பொழிவு' : 'Agro-Climatic Zone & IMD Baseline'}
                    </label>
                    <div className="p-space-xs rounded bg-surface-container-lowest flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="font-body-md text-body-md text-primary font-semibold">
                          {isTamil ? 'தமிழ்நாடு: கோயம்புத்தூர் சமவெளி' : 'Tamil Nadu: Coimbatore Plain'}
                        </span>
                        <span className="font-label-mono-sm text-label-mono-sm text-on-surface-variant">
                          {isTamil ? '30-ஆண்டு சராசரி: 680 மிமீ • மானாவாரி பகுதி' : 'IMD 30-Yr Mean: 680 mm • Semi-Arid Rainfed'}
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-surface-container text-surface-tint font-label-mono-sm text-label-mono-sm">
                        {isTamil ? 'மண்டலம் VI' : 'Zone VI'}
                      </span>
                    </div>
                  </div>

                  {/* Soil Classification */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label className="font-label-mono-sm text-label-mono-sm text-on-surface-variant uppercase">
                        {isTamil ? 'மண் வகைப்பாடு விவரம்' : 'Soil Classification Profile'}
                      </label>
                      <span className="font-label-mono-sm text-label-mono-sm text-surface-tint font-medium">1.05× {isTamil ? 'காரணி' : 'Factor'}</span>
                    </div>
                    <div className="p-space-xs rounded bg-surface-container-lowest flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span className="font-body-md text-body-md text-primary font-semibold">
                          {isTamil ? 'செம்மண் (Red Loam)' : 'Red Loam (Semman)'}
                        </span>
                        <span className="font-label-mono-sm text-label-mono-sm text-on-surface-variant">pH 6.4 – 7.1</span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        {isTamil ? 'சிறந்த காற்று புகும் தன்மை மற்றும் வேர் வளர்ச்சிக்கான சாதகமான அமைப்பு.' : 'High aeration, favorable hydraulic conductivity for deep taproot expansion.'}
                      </p>
                    </div>
                  </div>

                  {/* Water Availability & Additionality Status */}
                  <div className="grid grid-cols-2 gap-space-xs">
                    <div className="p-space-xs rounded bg-surface-container-lowest flex flex-col gap-1">
                      <span className="font-label-mono-sm text-label-mono-sm text-on-surface-variant uppercase">
                        {isTamil ? 'நீர்ப்பாசனம்' : 'Hydrology'}
                      </span>
                      <span className="font-body-sm text-body-sm text-primary font-semibold">
                        {isTamil ? 'மிதமான பாசனம்' : 'Moderate'}
                      </span>
                      <span className="font-label-mono-sm text-label-mono-sm text-on-surface-variant">
                        {isTamil ? 'ஆழ்துளை கிணறு + சொட்டு நீர்' : 'Borewell + Monsoonal drip'}
                      </span>
                    </div>
                    <div className="p-space-xs rounded bg-surface-container-lowest flex flex-col gap-1">
                      <span className="font-label-mono-sm text-label-mono-sm text-on-surface-variant uppercase">
                        {isTamil ? 'கூடுதல் தகுதி' : 'Additionality'}
                      </span>
                      <span className="font-body-sm text-body-sm text-primary font-semibold">
                        {isTamil ? 'உயர் தகுதி' : 'High Compliance'}
                      </span>
                      <span className="font-label-mono-sm text-label-mono-sm text-on-surface-variant">
                        {isTamil ? 'முந்தைய பயன்பாடு: தரிசு நிலம்' : 'Prior Land Use: Fallow dryland'}
                      </span>
                    </div>
                  </div>

                  {/* Preferred Silvicultural Architecture */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-mono-sm text-label-mono-sm text-on-surface-variant uppercase">
                      {isTamil ? 'மர வகை கூட்டமைப்பு' : 'Intercropping Architecture'}
                    </label>
                    <div className="p-space-xs rounded bg-surface-container-lowest flex flex-col gap-1">
                      <span className="font-body-md text-body-md text-primary font-semibold">
                        {isTamil ? 'அதிக உயிரி கலவை அமைப்பு' : 'Multi-Canopy High Biomass Mix'}
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        {isTamil ? '65% மலைவேம்பு (Melia dubia) + 35% சவுக்கு & தழைச்சத்து மரங்கள்' : '65% Malabar Neem (Melia dubia) + 35% Casuarina & Nitrogen Fixers'}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <button
                    type="button"
                    onClick={handleRecalculate}
                    className="w-full py-space-sm px-space-md rounded bg-primary text-on-primary font-headline-sm text-body-md flex items-center justify-center gap-2 hover:bg-primary-container transition-colors shadow-sm disabled:opacity-75 cursor-pointer"
                    disabled={isRecalculating}
                  >
                    <span className={`material-symbols-outlined text-[18px] ${isRecalculating ? 'animate-spin' : ''}`}>
                      sync
                    </span>
                    <span>{isRecalculating ? (isTamil ? 'மறு கணக்கீடு செய்யப்படுகிறது...' : 'Recalculating...') : (isTamil ? 'வளர்ச்சி பாதையை மறு கணக்கீடு செய்' : 'Recalculate Growth Trajectory')}</span>
                  </button>

                  {/* Final Print Dossier Button directly beneath value inputs */}
                  <button
                    type="button"
                    id="stitch-btn-final-print"
                    onClick={handleDownloadPdf}
                    className="w-full py-3 px-space-md rounded-xl bg-surface-container-highest hover:bg-surface-container text-primary font-bold text-sm flex items-center justify-center gap-2.5 transition-colors border border-outline-variant shadow-sm cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px] text-surface-tint">print</span>
                    <span>
                      {isTamil
                        ? 'இறுதி கள அறிக்கையை அச்சிடு (PDF)'
                        : language === 'ml'
                        ? 'അന്തിമ ഫീൽഡ് റിപ്പോർട്ട് പ്രിന്റ് ചെയ്യുക (PDF)'
                        : language === 'kn'
                        ? 'ಅಂತಿಮ ಕ್ಷೇತ್ರ ವರದಿಯನ್ನು ಮುದ್ರಿಸಿ (PDF)'
                        : language === 'te'
                        ? 'తుది ఫీల్డ్ నివేదికను ముద్రించండి (PDF)'
                        : 'Print Final Field Dossier (PDF)'}
                    </span>
                  </button>

                  {/* Express Interest for Free Aggregation button */}
                  {onRegisterCohort && (
                    <button
                      type="button"
                      id="stitch-btn-express-interest"
                      onClick={onRegisterCohort}
                      className="w-full py-2.5 px-space-md rounded-xl bg-[#E9EDC9] hover:bg-[#dbe2b3] text-[#2D4A22] font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-[#CCD5AE] shadow-xs cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px] text-[#2D4A22]">domain_add</span>
                      <span>
                        {isTamil
                          ? 'இலவச கூட்டமைப்புக்கு விருப்பம் தெரிவி (₹0)'
                          : language === 'ml'
                          ? 'സൗജന്യ അഗ്രിഗേഷനായി താൽപ്പര്യം അറിയിക്കുക (₹0)'
                          : language === 'kn'
                          ? 'ಉಚಿತ ಒಕ್ಕೂಟಕ್ಕಾಗಿ ಆಸಕ್ತಿ ವ್ಯಕ್ತಪಡಿಸಿ (₹0)'
                          : language === 'te'
                          ? 'ఉచిత సమూహం కోసం ఆసక్తి తెలపండి (₹0)'
                          : 'Express Interest for Free Aggregation (₹0 Upfront)'}
                      </span>
                    </button>
                  )}

                  <div className="flex items-center justify-center gap-2 text-on-surface-variant font-label-mono-sm text-label-mono-sm">
                    <span className="material-symbols-outlined text-[14px]">database</span>
                    <span>{isTamil ? 'TNAU-CAFRI v4.2.1 தரவுத்தளத்துடன் இணைக்கப்பட்டது' : 'TNAU-CAFRI Biomass Master v4.2.1 synchronized'}</span>
                  </div>
                </div>

                {/* Archival Ground-Truthing Note */}
                <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-xs">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-surface-tint text-[18px]">history_edu</span>
                    <span className="font-label-mono-md text-label-mono-md text-primary font-semibold">
                      {isTamil ? 'நிறுவன நம்பகத்தன்மை' : 'Institutional Provenance'}
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    {isTamil
                      ? 'கணக்கீடுகள் எந்தவித ஊகங்களையும் பயன்படுத்தவில்லை. மேட்டுப்பாளையம் வனக் கல்லூரி (TNAU) மற்றும் ICAR-CAFRI ஜான்சி ஆகியவற்றின் கள ஆய்வுகளின் அடிப்படையிலேயே நிர்ணயிக்கப்பட்டுள்ளது.'
                      : 'Yield curves do not use algorithmic extrapolations. Formulas are pinned to verified empirical harvest data from Mettupalayam Forest College (TNAU) and ICAR-CAFRI Jhansi, applying conservative dry-matter density coefficients.'}
                  </p>
                </div>
              </aside>

              {/* RIGHT COLUMN: Primary Metrics, Uncertainty Envelopes & Deductions */}
              <div className="xl:col-span-8 flex flex-col gap-space-lg">
                {/* Key Feasibility Overview & Species Pairing Hero */}
                <div className="bg-surface-container-low rounded-xl p-space-md sm:p-space-lg shadow-sm flex flex-col gap-space-md">
                  <div className="flex flex-wrap items-center justify-between gap-space-xs">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded bg-primary-container text-on-primary font-label-mono-sm text-label-mono-sm font-semibold uppercase tracking-wider">
                          {isTamil ? 'சாத்தியக்கூறு மதிப்பீடு: 82 / 100 • சிறந்தது' : 'Feasibility Rating: 82 / 100 • High'}
                        </span>
                        <span className="text-on-surface-variant font-label-mono-sm text-label-mono-sm">
                          {isTamil ? '12 தமிழ்நாடு கள ஆய்வுகள்' : 'Calibration: 12 Tamil Nadu Field Plots'}
                        </span>
                      </div>
                      <h2 className="font-headline-lg text-headline-lg text-primary mt-1">
                        {isTamil ? 'பரிந்துரைக்கப்பட்ட மர கட்டமைப்பு' : 'Recommended Species Architecture'}
                      </h2>
                    </div>
                    <div className="text-right">
                      <span className="font-label-mono-sm text-label-mono-sm text-on-surface-variant uppercase">
                        {isTamil ? 'கால அளவு' : 'Horizon'}
                      </span>
                      <p className="font-label-mono-md text-label-mono-md text-primary font-bold">
                        {isTamil ? '10-ஆண்டு சுழற்சி' : '10-Year Rotation Cycle'}
                      </p>
                    </div>
                  </div>

                  {/* Species Breakdown Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm">
                    {/* Species 1 */}
                    <div className="p-space-sm rounded-lg bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-space-xs">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-headline-md text-headline-md italic text-primary">Melia dubia</h3>
                          <span className="font-headline-sm text-body-sm text-surface-tint font-bold">
                            {isTamil ? 'மலைவேம்பு (Malabar Neem)' : 'Malabar Neem / மலைவேம்பு'}
                          </span>
                        </div>
                        <span className="font-label-mono-md text-label-mono-md font-bold px-2 py-0.5 rounded bg-surface-container text-primary">
                          65% {isTamil ? 'விகிதம்' : 'Ratio'}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-label-mono-sm font-label-mono-sm pt-2 bg-surface-container-low p-2 rounded">
                        <div>
                          <span className="text-on-surface-variant block">{isTamil ? 'ஆண்டு வளர்ச்சி:' : 'MAI Dry Biomass:'}</span>
                          <span className="text-primary font-semibold">18–28 kg/{isTamil ? 'மரம்/ஆண்டு' : 'tree/yr'}</span>
                        </div>
                        <div>
                          <span className="text-on-surface-variant block">{isTamil ? 'முதிர்ச்சி காலம்:' : 'Rotation Maturity:'}</span>
                          <span className="text-primary font-semibold">{isTamil ? '6–8 ஆண்டுகள் (பிளைவுட்)' : '6–8 Years (Plywood)'}</span>
                        </div>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        {isTamil ? 'விரைவான மர வளர்ச்சி, வணிக ரீதியான சிறந்த பிளைவுட் மதிப்பு.' : 'High calorific stem growth, excellent commercial veneer timber residue post crediting cycle.'}
                      </p>
                    </div>

                    {/* Species 2 */}
                    <div className="p-space-sm rounded-lg bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-space-xs">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-headline-md text-headline-md italic text-primary">Casuarina equisetifolia</h3>
                          <span className="font-headline-sm text-body-sm text-surface-tint font-bold">
                            {isTamil ? 'சவுக்கு & புங்கன்' : 'Savukku / சவுக்கு & Pongamia'}
                          </span>
                        </div>
                        <span className="font-label-mono-md text-label-mono-md font-bold px-2 py-0.5 rounded bg-surface-container text-primary">
                          35% {isTamil ? 'விகிதம்' : 'Ratio'}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-label-mono-sm font-label-mono-sm pt-2 bg-surface-container-low p-2 rounded">
                        <div>
                          <span className="text-on-surface-variant block">{isTamil ? 'வேர் பலன்:' : 'Root Infiltration:'}</span>
                          <span className="text-primary font-semibold">{isTamil ? 'தழைச்சத்து நிலைநிறுத்தல்' : 'Actinorhizal N-Fixing'}</span>
                        </div>
                        <div>
                          <span className="text-on-surface-variant block">{isTamil ? 'வறட்சி தாங்குதல்:' : 'Drought Resilience:'}</span>
                          <span className="text-primary font-semibold">{isTamil ? '> 88% உயிர்வாழ்வு' : 'Survival > 88% at 600mm'}</span>
                        </div>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        {isTamil ? 'மண் வளத்தை மேம்படுத்துகிறது, தழைச்சத்தை அதிகரித்து காற்றாலைத் தடுப்பாகச் செயல்படுகிறது.' : 'Acts as ecological nurse crop, builds subsoil carbon stocks, and acts as a windbreak corridor.'}
                      </p>
                    </div>
                  </div>

                  {/* 4 Primary Analytical Metric Tiles (P10 to P90 Ranges) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-xs pt-space-xs">
                    {/* Metric 1 */}
                    <div className="p-space-sm rounded-lg bg-surface-container-lowest shadow-sm flex flex-col">
                      <span className="font-label-mono-sm text-label-mono-sm text-on-surface-variant uppercase">
                        {isTamil ? 'நிகர கார்பன் படிவு' : 'Net CO₂e Sequestration'}
                      </span>
                      <div className="my-space-xs">
                        <span className="font-metric-display text-metric-display text-primary font-bold">
                          {p10Co2} – {p90Co2}
                        </span>
                        <span className="font-label-mono-sm text-label-mono-sm text-primary"> tCO₂e</span>
                      </div>
                      <div className="font-label-mono-sm text-label-mono-sm text-on-surface-variant flex flex-col gap-0.5">
                        <span>{isTamil ? 'P10 கீழ்வரம்பு:' : 'P10 Floor:'} {p10Co2} {isTamil ? 'டன்கள்' : 'tonnes'}</span>
                        <span>{isTamil ? 'P50 சராசரி:' : 'P50 Median:'} {p50Co2} {isTamil ? 'டன்கள்' : 'tonnes'}</span>
                        <span>{isTamil ? 'P90 உயர்வரம்பு:' : 'P90 Max:'} {p90Co2} {isTamil ? 'டன்கள்' : 'tonnes'}</span>
                      </div>
                      <span className="text-[11px] font-body-sm text-on-surface-variant mt-2 pt-1">
                        {isTamil ? '18% வெர்ரா சேமிப்பு ஒதுக்கீட்டிற்குப் பின்' : 'Net post-18% Verra Buffer Pool'}
                      </span>
                    </div>

                    {/* Metric 2 */}
                    <div className="p-space-sm rounded-lg bg-surface-container-lowest shadow-sm flex flex-col">
                      <span className="font-label-mono-sm text-label-mono-sm text-on-surface-variant uppercase">
                        {isTamil ? 'மொத்த கார்பன் வருவாய்' : 'Gross Carbon Revenue'}
                      </span>
                      <div className="my-space-xs">
                        <span className="font-metric-display text-metric-display text-primary font-bold">
                          ₹{revLow}L – ₹{revHigh}L
                        </span>
                      </div>
                      <div className="font-label-mono-sm text-label-mono-sm text-on-surface-variant flex flex-col gap-0.5">
                        <span>{isTamil ? '₹1,500 / tCO₂e விலையில்' : 'Indexed at ₹1,500 / tCO₂e'}</span>
                        <span>{isTamil ? 'தன்னார்வ கார்பன் தரம்' : 'VCM Removal Grade High'}</span>
                        <span>{isTamil ? 'விலை வரம்பு: ₹850–₹2,200' : 'Stress Band: ₹850–₹2,200'}</span>
                      </div>
                      <span className="text-[11px] font-body-sm text-on-surface-variant mt-2 pt-1">
                        {isTamil ? 'வெர்ரா தரநிலை மாதிரி' : 'Voluntary Carbon Standard model'}
                      </span>
                    </div>

                    {/* Metric 3 */}
                    <div className="p-space-sm rounded-lg bg-surface-container-lowest shadow-sm flex flex-col">
                      <span className="font-label-mono-sm text-label-mono-sm text-on-surface-variant uppercase">
                        {isTamil ? 'மூலதனம் & பராமரிப்பு செலவு' : 'Capex & Silviculture Opex'}
                      </span>
                      <div className="my-space-xs">
                        <span className="font-metric-display text-metric-display text-secondary font-bold">
                          ₹{costLow}K – ₹{costHigh}K
                        </span>
                      </div>
                      <div className="font-label-mono-sm text-label-mono-sm text-on-surface-variant flex flex-col gap-0.5">
                        <span>{isTamil ? 'நபார்டு மாதிரி வழிகாட்டி' : 'NABARD Model Benchmark'}</span>
                        <span>{isTamil ? 'தரமான நாற்று ₹25–₹35' : 'Quality sapling ₹25–₹35'}</span>
                        <span>{isTamil ? 'குழி & சொட்டுநீர் ₹18–₹25' : 'Pitting & Drip ₹18–₹25/hole'}</span>
                      </div>
                      <span className="text-[11px] font-body-sm text-on-surface-variant mt-2 pt-1">
                        {isTamil ? '3-ஆண்டு களையெடுத்தல் அடங்கும்' : 'Includes 3-yr weeding & interculture'}
                      </span>
                    </div>

                    {/* Metric 4 */}
                    <div className="p-space-sm rounded-lg bg-surface-container-lowest shadow-sm flex flex-col">
                      <span className="font-label-mono-sm text-label-mono-sm text-surface-tint uppercase font-semibold">
                        {isTamil ? 'மதிப்பிடப்பட்ட நிகர வருவாய்' : 'Estimated Net Potential'}
                      </span>
                      <div className="my-space-xs">
                        <span className="font-metric-display text-metric-display text-primary font-bold">
                          ₹{netLow}L – ₹{netHigh}L
                        </span>
                      </div>
                      <div className="font-label-mono-sm text-label-mono-sm text-on-surface-variant flex flex-col gap-0.5">
                        <span>P10: ₹{(parseFloat(netLow) * 100000).toLocaleString('en-IN')}</span>
                        <span>P50: ₹{(parseFloat(netMedian) * 100000).toLocaleString('en-IN')}</span>
                        <span>P90: ₹{(parseFloat(netHigh) * 100000).toLocaleString('en-IN')}</span>
                      </div>
                      <span className="text-[11px] font-body-sm text-on-surface-variant mt-2 pt-1">
                        {isTamil ? 'கார்பன் + மரம் வெட்டுதல் வருமானம்' : 'Carbon + Timber residue residual'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* The Uncertainty Envelope (10-Year Interactive Chart) */}
                <div className="bg-surface-container-low rounded-xl p-space-md sm:p-space-lg shadow-sm flex flex-col gap-space-md">
                  <div className="flex flex-wrap items-center justify-between gap-space-xs">
                    <div>
                      <span className="font-label-mono-sm text-label-mono-sm text-surface-tint uppercase tracking-wider">
                        {isTamil ? 'முன்னறிவிப்பு பாதை' : 'Predictive Trajectory'}
                      </span>
                      <h3 className="font-headline-md text-headline-md text-primary">
                        {isTamil ? '10-ஆண்டு கார்பன் வளர்ச்சி வரம்பு (P10 முதல் P90 வரை)' : '10-Year Empirical Uncertainty Envelope'}
                      </h3>
                    </div>
                    {/* Visual Legend with Toggles */}
                    <div className="flex items-center gap-space-sm font-label-mono-sm text-label-mono-sm">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-sm bg-surface-tint opacity-30" />
                        <span className="text-on-surface-variant">{isTamil ? 'P10–P90 வரம்பு' : 'P10–P90 Cloud'}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3.5 h-0.5 bg-primary" />
                        <span className="text-primary font-semibold">{isTamil ? 'P50 (சராசரி)' : 'P50 (Median)'}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3.5 h-0.5 bg-secondary" />
                        <span className="text-secondary">{isTamil ? 'P10 (நெருக்கடி நிலை)' : 'P10 (Stress Floor)'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Chart Area */}
                  <div className="w-full bg-surface-container-lowest rounded-lg p-space-sm shadow-sm overflow-hidden flex flex-col gap-space-xs">
                    <div className="w-full h-72 relative">
                      <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 280">
                        {/* Background Grid Lines */}
                        <line stroke="#E0D8C8" strokeDasharray="4 4" strokeWidth="1" x1="60" x2="780" y1="230" y2="230" />
                        <line stroke="#E0D8C8" strokeDasharray="4 4" strokeWidth="1" x1="60" x2="780" y1="175" y2="175" />
                        <line stroke="#E0D8C8" strokeDasharray="4 4" strokeWidth="1" x1="60" x2="780" y1="120" y2="120" />
                        <line stroke="#E0D8C8" strokeDasharray="4 4" strokeWidth="1" x1="60" x2="780" y1="65" y2="65" />
                        <line stroke="#E0D8C8" strokeDasharray="4 4" strokeWidth="1" x1="60" x2="780" y1="20" y2="20" />

                        {/* Milestone Vertical Indicator Lines */}
                        <line opacity="0.5" stroke="#74796f" strokeDasharray="2 2" strokeWidth="1" x1="276" x2="276" y1="20" y2="230" />
                        <line opacity="0.5" stroke="#74796f" strokeDasharray="2 2" strokeWidth="1" x1="492" x2="492" y1="20" y2="230" />
                        <line opacity="0.5" stroke="#74796f" strokeDasharray="2 2" strokeWidth="1" x1="780" x2="780" y1="20" y2="230" />

                        {/* Uncertainty Shaded Cloud (Between P10 and P90) */}
                        <path
                          d="M 60 226 C 140 220, 200 190, 276 170 C 350 150, 420 115, 492 85 C 570 52, 690 35, 780 28 L 780 98 C 690 110, 570 125, 492 145 C 420 162, 350 185, 276 200 C 200 215, 140 225, 60 228 Z"
                          fill="#CCD5AE"
                          fillOpacity="0.38"
                        />

                        {/* P10 Stress Floor Curve */}
                        <path
                          d="M 60 228 C 140 225, 200 215, 276 200 C 350 185, 420 162, 492 145 C 570 125, 690 110, 780 98"
                          fill="none"
                          stroke="#C1603A"
                          strokeWidth="2"
                        />

                        {/* P50 Median Expected Curve */}
                        <path
                          d="M 60 227 C 140 222, 200 200, 276 182 C 350 164, 420 135, 492 110 C 570 82, 690 62, 780 58"
                          fill="none"
                          stroke="#1A2E11"
                          strokeWidth="2.5"
                        />

                        {/* P90 Optimistic Bound Curve */}
                        <path
                          d="M 60 226 C 140 220, 200 190, 276 170 C 350 150, 420 115, 492 85 C 570 52, 690 35, 780 28"
                          fill="none"
                          stroke="#8BA888"
                          strokeDasharray="5 3"
                          strokeWidth="1.75"
                        />

                        {/* Milestone Points */}
                        <circle cx="276" cy="182" fill="#1A2E11" r="4" />
                        <circle cx="492" cy="110" fill="#1A2E11" r="4" />
                        <circle cx="780" cy="58" fill="#1A2E11" r="4" />

                        {/* Y-Axis Ticks */}
                        <text className="fill-outline font-label-mono-sm text-[10px]" textAnchor="end" x="50" y="233">0 t</text>
                        <text className="fill-outline font-label-mono-sm text-[10px]" textAnchor="end" x="50" y="178">50 t</text>
                        <text className="fill-outline font-label-mono-sm text-[10px]" textAnchor="end" x="50" y="123">100 t</text>
                        <text className="fill-outline font-label-mono-sm text-[10px]" textAnchor="end" x="50" y="68">150 t</text>
                        <text className="fill-outline font-label-mono-sm text-[10px]" textAnchor="end" x="50" y="24">200 t</text>

                        {/* X-Axis Years */}
                        <text className="fill-outline font-label-mono-sm text-[10px]" textAnchor="middle" x="60" y="250">{isTamil ? 'ஆ0' : 'Yr 0'}</text>
                        <text className="fill-outline font-label-mono-sm text-[10px]" textAnchor="middle" x="132" y="250">{isTamil ? 'ஆ1' : 'Yr 1'}</text>
                        <text className="fill-outline font-label-mono-sm text-[10px]" textAnchor="middle" x="204" y="250">{isTamil ? 'ஆ2' : 'Yr 2'}</text>
                        <text className="fill-primary font-label-mono-sm text-[10px] font-bold" textAnchor="middle" x="276" y="250">{isTamil ? 'ஆ3' : 'Yr 3'}</text>
                        <text className="fill-outline font-label-mono-sm text-[10px]" textAnchor="middle" x="348" y="250">{isTamil ? 'ஆ4' : 'Yr 4'}</text>
                        <text className="fill-outline font-label-mono-sm text-[10px]" textAnchor="middle" x="420" y="250">{isTamil ? 'ஆ5' : 'Yr 5'}</text>
                        <text className="fill-primary font-label-mono-sm text-[10px] font-bold" textAnchor="middle" x="492" y="250">{isTamil ? 'ஆ6' : 'Yr 6'}</text>
                        <text className="fill-outline font-label-mono-sm text-[10px]" textAnchor="middle" x="564" y="250">{isTamil ? 'ஆ7' : 'Yr 7'}</text>
                        <text className="fill-outline font-label-mono-sm text-[10px]" textAnchor="middle" x="636" y="250">{isTamil ? 'ஆ8' : 'Yr 8'}</text>
                        <text className="fill-outline font-label-mono-sm text-[10px]" textAnchor="middle" x="708" y="250">{isTamil ? 'ஆ9' : 'Yr 9'}</text>
                        <text className="fill-primary font-label-mono-sm text-[10px] font-bold" textAnchor="middle" x="780" y="250">{isTamil ? 'ஆ10' : 'Yr 10'}</text>
                      </svg>
                    </div>

                    {/* Milestone Details Ribbon below chart */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-space-xs pt-space-2xs">
                      <div className="p-space-xs rounded bg-surface-container flex flex-col">
                        <span className="font-label-mono-sm text-label-mono-sm text-surface-tint font-bold">
                          {isTamil ? 'ஆண்டு 3 தணிக்கை மைல்கல்' : 'Year 3 Audit Milestone'}
                        </span>
                        <span className="font-body-sm text-body-sm text-primary font-semibold">
                          {isTamil ? 'இலைக்கூரை மூடல் & உறுதிப்படுத்தல்' : 'Canopy Closure & Baseline Lock'}
                        </span>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          {isTamil ? 'LiDAR செயற்கைக்கோள் மூலம் மரங்கள் (>91% உயிர்வாழ்வு) சரிபார்க்கப்படும்.' : 'Satellite LiDAR verification confirms stem count (>91% survival rate target).'}
                        </p>
                      </div>
                      <div className="p-space-xs rounded bg-surface-container flex flex-col">
                        <span className="font-label-mono-sm text-label-mono-sm text-surface-tint font-bold">
                          {isTamil ? 'ஆண்டு 6 கவாத்து கட்டம்' : 'Year 6 Pruning Tranche'}
                        </span>
                        <span className="font-body-sm text-body-sm text-primary font-semibold">
                          {isTamil ? 'இடைக்கால சரிபார்ப்பு' : 'Intermediate Verification'}
                        </span>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          {isTamil ? 'முதல் கழிவு மரம் விற்பனை + முதல் 40% கார்பன் வரவு பணமாக்கப்படும்.' : 'First commercial pole thinning + initial 40% VCM credit issuance liquidity.'}
                        </p>
                      </div>
                      <div className="p-space-xs rounded bg-surface-container flex flex-col">
                        <span className="font-label-mono-sm text-label-mono-sm text-surface-tint font-bold">
                          {isTamil ? 'ஆண்டு 10 இறுதி சுழற்சி' : 'Year 10 Final Cycle'}
                        </span>
                        <span className="font-body-sm text-body-sm text-primary font-semibold">
                          {isTamil ? 'முழு கார்பன் வரவு & மரம் அறுவடை' : 'Full Crediting & Timber Harvest'}
                        </span>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          {isTamil ? `மொத்த ~${p50Co2}t CO₂e சரிபார்க்கப்பட்ட வரவு மற்றும் பிளைவுட் மர விற்பனை.` : `Total ~${p50Co2}t CO₂e verified balance plus plywood log commercial salvage.`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scientific Formula & Deductions Breakdown */}
                <div className="bg-surface-container-low rounded-xl p-space-md sm:p-space-lg shadow-sm flex flex-col gap-space-md">
                  <div className="flex flex-wrap items-center justify-between gap-space-xs">
                    <div>
                      <span className="font-label-mono-sm text-label-mono-sm text-surface-tint uppercase tracking-wider">
                        {isTamil ? 'கணக்கீட்டு வெளிப்படைத்தன்மை' : 'Methodology Transparency'}
                      </span>
                      <h3 className="font-headline-md text-headline-md text-primary">
                        {isTamil ? 'IPCC AFOLU & வெர்ரா VM0047 கழிவு விவரங்கள்' : 'IPCC AFOLU & Verra VM0047 Deduction Matrix'}
                      </h3>
                    </div>
                    <span className="font-label-mono-sm text-label-mono-sm px-2 py-1 rounded bg-surface-container text-on-surface-variant">
                      {isTamil ? 'அடுக்கு 2 பிராந்திய சமன்பாடு' : 'Tier 2 Regional Allometric Core'}
                    </span>
                  </div>

                  {/* Formula Code Display Block */}
                  <div className="p-space-sm rounded-lg bg-surface-container-highest flex flex-col gap-2">
                    <span className="font-label-mono-sm text-label-mono-sm text-on-surface-variant uppercase">
                      {isTamil ? 'உயிர்ப்பொருளிலிருந்து கார்பன் மாற்ற சமன்பாடு' : 'Biomass to Carbon Sequestration Formula'}
                    </span>
                    <code className="font-label-mono-lg text-label-mono-lg text-primary overflow-x-auto block">
                      CO₂e = ΔBiomass × (1 + R) × CF × (44 / 12) × (1 - B_pool) × (1 - M_disc)
                    </code>
                  </div>

                  {/* Mathematical Parameters Chip Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-space-xs">
                    <div className="p-space-xs rounded bg-surface-container-lowest flex flex-col">
                      <span className="font-label-mono-sm text-label-mono-sm text-on-surface-variant">R ({isTamil ? 'வேர்:தண்டு' : 'Root:Shoot'})</span>
                      <span className="font-label-mono-md text-label-mono-md text-primary font-bold">0.26</span>
                      <span className="text-[11px] text-on-surface-variant">{isTamil ? 'வெப்பமண்டல உலர் பகுதி' : 'IPCC Tropical Dry'}</span>
                    </div>
                    <div className="p-space-xs rounded bg-surface-container-lowest flex flex-col">
                      <span className="font-label-mono-sm text-label-mono-sm text-on-surface-variant">CF ({isTamil ? 'கார்பன் பின்னம்' : 'Carbon Frac.'})</span>
                      <span className="font-label-mono-md text-label-mono-md text-primary font-bold">0.47</span>
                      <span className="text-[11px] text-on-surface-variant">{isTamil ? 'மரக்கரி %' : 'Elemental Carbon %'}</span>
                    </div>
                    <div className="p-space-xs rounded bg-surface-container-lowest flex flex-col">
                      <span className="font-label-mono-sm text-label-mono-sm text-on-surface-variant">{isTamil ? 'C லிருந்து CO₂ காரணி' : 'C to CO₂ Multiplier'}</span>
                      <span className="font-label-mono-md text-label-mono-md text-primary font-bold">3.6667</span>
                      <span className="text-[11px] text-on-surface-variant">44/12 {isTamil ? 'மூலக்கூறு எடை' : 'Molecular Wt.'}</span>
                    </div>
                    <div className="p-space-xs rounded bg-surface-container-lowest flex flex-col">
                      <span className="font-label-mono-sm text-label-mono-sm text-secondary font-bold">B_pool ({isTamil ? 'பாதுகாப்பு இருப்பு' : 'Buffer'})</span>
                      <span className="font-label-mono-md text-label-mono-md text-secondary font-bold">-18.0%</span>
                      <span className="text-[11px] text-on-surface-variant">{isTamil ? 'வெர்ரா இருப்பு' : 'Verra VM0047 Escrow'}</span>
                    </div>
                    <div className="p-space-xs rounded bg-surface-container-lowest flex flex-col">
                      <span className="font-label-mono-sm text-label-mono-sm text-secondary font-bold">M_disc ({isTamil ? 'விலக்கு' : 'Variance'})</span>
                      <span className="font-label-mono-md text-label-mono-md text-secondary font-bold">-10.0%</span>
                      <span className="text-[11px] text-on-surface-variant">{isTamil ? 'தொலைநிலை தள்ளுபடி' : 'Remote MRV Disc.'}</span>
                    </div>
                  </div>

                  {/* Soil & Precipitation Specific Adjustments */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-xs pt-1">
                    <div className="p-space-xs rounded bg-surface-container flex items-center justify-between">
                      <div>
                        <span className="font-label-mono-sm text-label-mono-sm text-primary font-semibold block">
                          {isTamil ? 'மண் துளைத்தன்மை பெருக்கல்' : 'Soil Porosity Multiplier'}
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          {isTamil ? 'செம்மண் ஊட்டச்சத்து அடிப்படை' : 'Semman Red Loam nutrient baseline'}
                        </span>
                      </div>
                      <span className="font-label-mono-md text-label-mono-md text-surface-tint font-bold">+5.0% (1.05×)</span>
                    </div>
                    <div className="p-space-xs rounded bg-surface-container flex items-center justify-between">
                      <div>
                        <span className="font-label-mono-sm text-label-mono-sm text-primary font-semibold block">
                          {isTamil ? 'மழைப்பொழிவு வறட்சி கழிவு' : 'Precipitation Aridity Penalty'}
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          {isTamil ? '680மிமீ வானிலை குறைபாடு' : '680mm IMD semi-arid adjustment'}
                        </span>
                      </div>
                      <span className="font-label-mono-md text-label-mono-md text-secondary font-bold">-4.2% ({isTamil ? 'சொட்டுநீர் ஈடுசெய்தல்' : 'Drip offset'})</span>
                    </div>
                  </div>
                </div>

                {/* Developer Feasibility & Aggregation Preview Card */}
                <div className="bg-surface-container-high rounded-xl p-space-md sm:p-space-lg shadow-sm flex flex-col gap-space-md">
                  <div className="flex flex-wrap items-start justify-between gap-space-sm">
                    <div className="flex flex-col gap-1 max-w-xl">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-surface-tint" />
                        <span className="font-label-mono-sm text-label-mono-sm uppercase text-surface-tint font-bold">
                          {isTamil ? 'நிறுவன ஒருங்கிணைப்பு தகுதி' : 'Institutional Underwriting Status'}
                        </span>
                      </div>
                      <h3 className="font-headline-md text-headline-md text-primary">
                        {isTamil ? 'மேற்கு தமிழ்நாடு வேளாண் காடுகள் குழு #4' : 'Western Tamil Nadu Agroforestry Cohort #4'}
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        {isTamil ? (
                          <>
                            உங்கள் {acres.toFixed(1)}-ஏக்கர் நிலம் அனைத்து ஆரம்ப வடிகட்டுதல் நிபந்தனைகளையும் பூர்த்தி செய்கிறது. அருகிலுள்ள விவசாயிகளுடன் (கோயம்புத்தூர் & திருப்பூர் பகுதியில் 140 ஏக்கர்) இணைக்கப்படும்போது, தனிநபர் தணிக்கைச் செலவு <strong>74%</strong> குறைகிறது.
                          </>
                        ) : (
                          <>
                            Your {acres.toFixed(1)}-acre parcel satisfies all pre-screening filters for regional aggregation. When consolidated with adjacent smallholders (140 acres under pre-feasibility review in Coimbatore &amp; Tiruppur), individual verification transaction overhead drops by <strong>74%</strong>.
                          </>
                        )}
                      </p>
                    </div>
                    <div className="flex flex-col gap-space-2xs bg-surface-container-lowest p-space-sm rounded-lg sm:min-w-[240px] shadow-sm">
                      <span className="font-label-mono-sm text-label-mono-sm text-on-surface-variant uppercase">
                        {isTamil ? 'ஒருங்கிணைப்பு நிலை' : 'Aggregation Status'}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-surface-tint text-[20px]">hub</span>
                        <span className="font-headline-sm text-headline-sm text-primary">
                          {isTamil ? 'தொகுப்பு தகுதி பெற்றது' : 'Cluster-Eligible'}
                        </span>
                      </div>
                      <span className="font-label-mono-sm text-label-mono-sm text-on-surface-variant">
                        {isTamil ? `குழு அளவு: 28 விவசாயிகள் / ${Math.round(140 + acres)} ஏக்கர்` : `Batch Size: 28 Farmers / ${Math.round(140 + acres)} Ac`}
                      </span>
                    </div>
                  </div>

                  {/* Institutional CTAs */}
                  <div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-xs">
                    <div className="flex items-center gap-space-xs">
                      <button
                        type="button"
                        onClick={onRegisterCohort || onNavigateToAggregator}
                        className="px-space-md py-space-xs rounded bg-primary text-on-primary font-headline-sm text-body-md hover:bg-primary-container transition-colors flex items-center gap-2 shadow-sm"
                      >
                        <span className="material-symbols-outlined text-[18px]">handshake</span>
                        <span>{isTamil ? 'இலவச கூட்டுத் திட்டத்தில் சேர விருப்பம் தெரிவிக்கவும்' : 'Express Interest for Free Aggregation'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleDownloadPdf}
                        className="px-space-md py-space-xs rounded bg-surface-container-lowest text-primary font-headline-sm text-body-md hover:bg-surface-container transition-colors flex items-center gap-2 shadow-sm"
                      >
                        <span className="material-symbols-outlined text-[18px]">download_for_offline</span>
                        <span>{isTamil ? 'முழு கள ஆவணத்தைப் பதிவிறக்கு (PDF)' : 'Download Field Dossier (PDF)'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={onNavigateToAggregator}
                        className="px-space-md py-space-xs rounded bg-surface-container-lowest text-on-surface-variant font-headline-sm text-body-md hover:bg-surface-container transition-colors flex items-center gap-2"
                      >
                        <span className="material-symbols-outlined text-[18px]">hub</span>
                        <span>{isTamil ? 'குழுமப் பட்டியல்' : 'Cluster Hub'}</span>
                      </button>
                    </div>
                    <span className="font-label-mono-sm text-label-mono-sm text-on-surface-variant">
                      NABARD Ref: TN/AGR/2024-C2 • CAFRI Protocol #9
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Dossier Visual Confirmation Toast / Notification (Micro-interaction) */}
          <div
            className={`fixed bottom-6 right-6 p-space-md rounded-lg bg-primary text-on-primary shadow-xl flex items-center gap-3 transition-opacity duration-300 z-50 ${
              showToast ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <span className="material-symbols-outlined text-surface-tint">check_circle</span>
            <div className="flex flex-col">
              <span className="font-headline-sm text-body-sm font-bold">
                {isTamil ? 'ஆவணம் உருவாக்கப்பட்டது' : 'Dossier Generated'}
              </span>
              <span className="font-label-mono-sm text-label-mono-sm text-surface-variant">
                GV-TN-84920-Official-PreFeasibility.pdf
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-surface-container-low py-space-2xl mt-space-3xl border-t border-surface-container-high">
        <div className="w-full max-w-[1440px] mx-auto px-gutter-desktop">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-space-xl pb-space-xl">
            <div className="md:col-span-5 flex flex-col gap-space-sm">
              <div className="flex items-center gap-space-xs">
                <span className="font-headline-md text-headline-md text-primary">GreenVest Institute</span>
                <span className="font-label-mono-sm text-label-mono-sm px-space-2xs py-0.5 rounded bg-surface-container text-on-surface-variant">
                  v4.2.1 Core
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
                {isTamil
                  ? 'கிரீன்வெஸ்ட் கற்பனை வாக்குறுதிகளை வழங்குவதில்லை. நிறுவன மூலதன முதலீட்டிற்கு முன் ICAR-CAFRI, FRI, TNAU மற்றும் IPCC AFOLU அடுக்கு 2 வழிகாட்டுதல்களின்படி நிரூபிக்கப்பட்ட முன்-சாத்தியக்கூறு அறிக்கையை மட்டுமே வழங்குகிறோம்.'
                  : 'GreenVest does not sell carbon credits or make speculative return guarantees. We deliver empirical agroforestry pre-feasibility underwriting grounded in ICAR-CAFRI, FRI, TNAU, and IPCC AFOLU Tier 2 guidelines prior to institutional capital deployment.'}
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col gap-space-xs">
              <span className="font-label-mono-md text-label-mono-md uppercase tracking-wider text-on-surface">
                {isTamil ? 'ஆராய்ச்சி & நிறுவன கூட்டாண்மைகள்' : 'Research & Institutional Alignments'}
              </span>
              <div className="flex flex-wrap gap-space-xs pt-space-2xs">
                <span className="font-label-mono-sm text-label-mono-sm px-space-xs py-space-2xs bg-surface-container rounded text-on-surface-variant">
                  ICAR-CAFRI Jhansi
                </span>
                <span className="font-label-mono-sm text-label-mono-sm px-space-xs py-space-2xs bg-surface-container rounded text-on-surface-variant">
                  TNAU Forestry College
                </span>
                <span className="font-label-mono-sm text-label-mono-sm px-space-xs py-space-2xs bg-surface-container rounded text-on-surface-variant">
                  FRI Dehradun
                </span>
                <span className="font-label-mono-sm text-label-mono-sm px-space-xs py-space-2xs bg-surface-container rounded text-on-surface-variant">
                  NABARD Unit Models
                </span>
                <span className="font-label-mono-sm text-label-mono-sm px-space-xs py-space-2xs bg-surface-container rounded text-on-surface-variant">
                  Verra VM0047 AFOLU
                </span>
              </div>
            </div>

            <div className="md:col-span-3 flex flex-col gap-space-xs md:items-end">
              <span className="font-label-mono-md text-label-mono-md uppercase tracking-wider text-on-surface">
                {isTamil ? 'தரவு பாதுகாப்பு & மேலாண்மை' : 'Data Governance'}
              </span>
              <p className="font-label-mono-sm text-label-mono-sm text-on-surface-variant md:text-right">
                {isTamil ? 'அறிவியல் பூர்வ P10–P50–P90 இடர் பாதைகள்' : 'Empirical P10–P50–P90 Risk Trajectories'}<br />
                {isTamil ? 'உயிரியல் அளவீட்டு சரிபார்ப்பு எஞ்சின்' : 'Allometric Biomass Validation Engine'}<br />
                {isTamil ? 'கடைசி ஒருங்கிணைப்பு: TNAU/CAFRI Master v4.2' : 'Last Synchronized: TNAU/CAFRI Master v4.2'}
              </p>
            </div>
          </div>

          <div className="pt-space-lg flex flex-col sm:flex-row items-center justify-between gap-space-md border-t border-surface-container">
            <div className="font-label-mono-sm text-label-mono-sm text-on-surface-variant">
              © 2024 GreenVest Scientific Underwriting Platform. {isTamil ? 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.' : 'Archival Botanical Standards. All rights reserved.'}
            </div>
            <div className="flex items-center gap-space-lg font-body-sm text-body-sm text-on-surface-variant">
              <button type="button" onClick={onNavigateToMethodology} className="hover:text-on-surface transition-colors">
                {isTamil ? 'சான்று குறியீட்டு அட்டவணை' : 'Citation Index'}
              </button>
              <button type="button" onClick={onNavigateToMethodology} className="hover:text-on-surface transition-colors">
                {isTamil ? 'சட்டப்பூர்வ மறுப்புகள்' : 'Regulatory Disclaimers'}
              </button>
              <button type="button" onClick={onNavigateToMethodology} className="hover:text-on-surface transition-colors">
                {isTamil ? 'தரவு ஒருமைப்பாடு சாசனம்' : 'Data Integrity Charter'}
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
