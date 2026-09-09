import React from 'react';
import {
  Sprout,
  FileCheck,
  Award,
  User,
  ShieldCheck,
  ChevronDown,
  ArrowLeftRight,
  Sparkles,
  Layers,
  Activity,
  TrendingUp,
  Globe,
  Landmark
} from 'lucide-react';
import { TRANSLATIONS, Language, tFarmer } from '../utils/translations';
import { FarmerProfile } from '../types/greenvest';

export type ActiveTabType = 'farmer' | 'monte-carlo' | 'documents' | 'passbook' | 'schemes';

interface NavbarProps {
  activeTab: ActiveTabType;
  onTabChange: (tab: ActiveTabType) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenMethodology: () => void;
  currentFarmer: FarmerProfile;
  onOpenLoginModal: () => void;
  onOpenFrontPage?: () => void;
}

const LANGUAGES: { id: Language; char: string; full: string }[] = [
  { id: 'en', char: 'E', full: 'English' },
  { id: 'ta', char: 'த', full: 'தமிழ் (Tamil)' },
  { id: 'ml', char: 'മ', full: 'മലയാളം (Malayalam)' },
  { id: 'kn', char: 'ಕ', full: 'ಕನ್ನಡ (Kannada)' },
  { id: 'te', char: 'తె', full: 'తెలుగు (Telugu)' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  language,
  onLanguageChange,
  onOpenMethodology,
  currentFarmer,
  onOpenLoginModal,
  onOpenFrontPage
}) => {
  const t = TRANSLATIONS[language];

  const farmerNavItems = [
    {
      id: 'farmer' as const,
      label: tFarmer('tabFarmlandAnalysis', language),
      shortLabel: tFarmer('tabFarmlandAnalysisShort', language),
      icon: Sprout,
      elementId: 'tab-farmer-screening'
    },
    {
      id: 'monte-carlo' as const,
      label: tFarmer('tabMonteCarlo', language),
      shortLabel: tFarmer('tabMonteCarloShort', language),
      icon: TrendingUp,
      badge: '1k Trials',
      elementId: 'tab-monte-carlo'
    },
    {
      id: 'documents' as const,
      label: tFarmer('tabDeedScan', language),
      shortLabel: tFarmer('tabDeedScanShort', language),
      icon: FileCheck,
      elementId: 'tab-farmer-documents'
    },
    {
      id: 'passbook' as const,
      label: tFarmer('tabPassbook', language),
      shortLabel: tFarmer('tabPassbookShort', language),
      icon: Award,
      badge: 'Certified',
      elementId: 'tab-farmer-passbook'
    },
    {
      id: 'schemes' as const,
      label: tFarmer('tabGovtSchemes', language),
      shortLabel: tFarmer('tabGovtSchemesShort', language),
      icon: Landmark,
      badge: 'Subsidies',
      elementId: 'tab-farmer-schemes'
    }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#12220e]/98 backdrop-blur-md border-b border-[#8BA888]/25 text-[#F1F5EF] shadow-[0_4px_20px_rgba(0,0,0,0.2)] transition-all">
      <div className="w-full max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Row 1: Brand Identity & Farmer Profile Actions */}
        <div className="flex items-center justify-between h-15 sm:h-16 gap-3">
          
          {/* Brand Logo & Farmer Portal Title */}
          <div
            className="flex items-center space-x-2.5 cursor-pointer group shrink-0"
            onClick={() => onTabChange('farmer')}
            title={language === 'en' ? 'GreenVest Farmer Portal' : 'கிரீன்வெஸ்ட் உழவர் போர்ட்டல்'}
          >
            <div className="relative shrink-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-[#3D5C31] to-[#1E3615] flex items-center justify-center shadow-md border border-emerald-400/40 group-hover:border-emerald-300 transition-all duration-300">
                <Sprout className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-300 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#12220e] flex items-center justify-center">
                <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-white font-serif group-hover:text-emerald-200 transition-colors">
                  {t.brandName}
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold uppercase px-2 py-0.5 rounded-full border tracking-wider bg-[#E9EDC9] text-[#1A2E11] border-[#CCD5AE]">
                  {tFarmer('farmerPortalBadge', language)}
                </span>
              </div>
              <p className="text-[10px] text-[#A2BA9F] uppercase tracking-wider font-semibold hidden md:block">
                {tFarmer('farmerPortalTagline', language)}
              </p>
            </div>
          </div>

          {/* Right Action Controls: Active Farmer + Language Dropdown + Science Button */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            
            {/* Active Farmer Profile Button */}
            <button
              type="button"
              id="btn-user-profile-modal"
              onClick={onOpenLoginModal}
              className="flex items-center space-x-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-emerald-500/30 hover:border-emerald-400/60 text-xs text-white transition-all cursor-pointer shadow-sm group"
              title={tFarmer('switchFarmerTitle', language)}
            >
              <div className="w-5 h-5 rounded-full bg-emerald-700 flex items-center justify-center text-[10px] font-bold text-white shrink-0">
                🌾
              </div>
              <span className="font-bold text-[11px] max-w-[85px] sm:max-w-[130px] truncate">
                {currentFarmer.name}
              </span>
              <ArrowLeftRight className="w-3 h-3 text-emerald-300 opacity-70 group-hover:opacity-100 transition-opacity shrink-0" />
            </button>

            {/* Language Selector Dropdown */}
            <div className="relative flex items-center bg-black/45 hover:bg-black/60 backdrop-blur-md pl-2 pr-2 py-1.5 rounded-full border border-emerald-500/30 hover:border-emerald-400/60 transition-all text-xs shadow-inner group">
              <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0 mr-1.5" />
              <select
                id="lang-select-dropdown"
                value={language}
                onChange={(e) => onLanguageChange(e.target.value as Language)}
                className="bg-transparent text-[#E9EDC9] group-hover:text-white text-xs font-bold focus:outline-none cursor-pointer pr-3 appearance-none"
                aria-label="Change Language"
              >
                {LANGUAGES.map((l) => (
                  <option key={l.id} value={l.id} className="bg-[#1A2E11] text-white py-1">
                    {l.char} - {l.full}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-3 h-3 text-emerald-300 pointer-events-none -ml-2 shrink-0" />
            </div>

            {/* Methodology & Science Button */}
            <button
              id="btn-open-methodology"
              type="button"
              onClick={onOpenMethodology}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 text-[#E9EDC9] hover:text-white border border-emerald-500/30 hover:border-emerald-400/60 text-xs font-semibold transition-all duration-200 shadow-sm cursor-pointer shrink-0"
              title={tFarmer('scienceButtonTitle', language)}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300 shrink-0" />
              <span className="hidden sm:inline">{t.navMethodology}</span>
              <span className="inline sm:hidden">VM0047</span>
            </button>

            {/* Revisit Front Page / Earth Charter Button */}
            {onOpenFrontPage && (
              <button
                id="btn-revisit-frontpage"
                type="button"
                onClick={onOpenFrontPage}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-950/60 to-emerald-900/50 hover:from-emerald-900/80 hover:to-emerald-800/70 text-amber-200/90 hover:text-amber-100 border border-amber-400/30 hover:border-amber-400/60 text-xs font-medium transition-all duration-200 shadow-sm cursor-pointer shrink-0"
                title={language === 'en' ? 'Open Front Page & Soil Charter' : 'முகப்பு மற்றும் மண் பிரகடனம்'}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="hidden lg:inline">Charter</span>
              </button>
            )}

          </div>

        </div>

        {/* Row 2: Comprehensive Farmer Navigation Tab Bar (Always Visible, Perfectly Scalable) */}
        <div className="border-t border-white/10 py-2 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          <nav className="flex items-center gap-1.5 sm:gap-2 shrink-0 w-full sm:w-auto">
            {farmerNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={item.elementId}
                  onClick={() => onTabChange(item.id)}
                  className={`relative flex items-center space-x-2 px-3 sm:px-4 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#2F5224] to-[#427033] text-white shadow-[0_2px_12px_rgba(47,82,36,0.7)] border border-emerald-400/50 font-bold'
                      : 'bg-black/30 hover:bg-white/10 text-[#A2BA9F] hover:text-white border border-white/5'
                  }`}
                  title={item.label}
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-emerald-300' : 'text-[#8BA888]'}`} />
                  <span className="hidden sm:inline">{item.label}</span>
                  <span className="inline sm:hidden">{item.shortLabel}</span>
                  {item.badge && (
                    <span className="text-[8px] font-extrabold uppercase px-1.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

      </div>
    </header>
  );
};

