import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sprout,
  ArrowRight,
  ShieldCheck,
  FileCheck,
  Award,
  Globe,
  Leaf
} from 'lucide-react';
import { Particles } from './magicui/Particles';
import { Ripple } from './magicui/Ripple';
import { BorderBeam } from './magicui/BorderBeam';
import { ShimmerButton } from './magicui/ShimmerButton';
import { BlurFade } from './magicui/BlurFade';
import { Language } from '../utils/translations';

interface FrontPageProps {
  isOpen: boolean;
  onEnterApp: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const QUOTES: Record<Language, { main: string; sub: string; attribution: string; enterBtn: string; tag: string }> = {
  en: {
    tag: 'SOIL STEWARDSHIP & VERRA VM0047 ARR PLATFORM',
    main: '“The ultimate guardian of the Earth’s climate is not a boardroom or an algorithm — it is the farmer kneeling in living soil.”',
    sub: 'Every root anchored into ancestral earth turns carbon into intergenerational dignity.',
    attribution: '— GreenVest Earth & Smallholder Charter',
    enterBtn: 'Enter GreenVest Platform'
  },
  ta: {
    tag: 'மண் வளம் மற்றும் வெர்ரா VM0047 கார்பன் தளம்',
    main: '“பூமியின் காலநிலையைக் காக்கும் உண்மையான காவலன் எந்தவொரு மாநாடும் அல்ல — உழைக்கும் கைகளில் மண் தாங்கிய விவசாயியே.”',
    sub: 'மூதாதையர் நிலத்தில் ஊன்றப்படும் ஒவ்வொரு வேரும் கார்பனை தலைமுறை தலைமுறையான செழிப்பாக மாற்றுகிறது.',
    attribution: '— கிரீன்வெஸ்ட் உழவர் மற்றும் பூமி பிரகடனம்',
    enterBtn: 'தளத்திற்குள் நுழைக'
  },
  ml: {
    tag: 'മൺ സംരക്ഷണവും വെറ VM0047 കാർബൺ പദ്ധതിയും',
    main: '“ഭൂമിയുടെ കാലാവസ്ഥയുടെ യഥാർത്ഥ സംരക്ഷകൻ ചർച്ചാമുറികളല്ല — ജീവസ്സുറ്റ മണ്ണിൽ വിത്തുപാകുന്ന കർഷകനാണ്.”',
    sub: 'പൂർവ്വിക മണ്ണിൽ ആഴ്ന്നിറങ്ങുന്ന ഓരോ വേരും കാർബണിനെ തലമുറകളുടെ സമൃദ്ധിയാക്കി മാറ്റുന്നു.',
    attribution: '— ഗ്രീൻവെസ്റ്റ് കർഷക ചാർട്ടർ',
    enterBtn: 'പ്ലാറ്റ്‌ഫോമിലേക്ക് പ്രവേശിക്കുക'
  },
  kn: {
    tag: 'ಮಣ್ಣಿನ ಸಂರಕ್ಷಣೆ ಮತ್ತು ವೆರ್ರಾ VM0047 ಕಾರ್ಬನ್ ವೇದಿಕೆ',
    main: '“ಭೂಮಿಯ ವಾತಾವರಣದ ನಿಜವಾದ ರಕ್ಷಕ ಯಾವುದೇ ಸಮ್ಮೇಳನವಲ್ಲ — ಫಲವತ್ತಾದ ಸಜೀವ ಮಣ್ಣನ್ನು ಮುಟ್ಟುವ ರೈತನೇ.”',
    sub: 'ಪೂರ್ವಜರ ಭೂಮಿಯಲ್ಲಿ ಊರಿದ ಪ್ರತಿ ಬೇರು ಇಂಗಾಲವನ್ನು ಶಾಶ್ವತ ಸಮೃದ್ಧಿಯನ್ನಾಗಿ ಪರಿವರ್ತಿಸುತ್ತದೆ.',
    attribution: '— ಗ್ರೀನ್‌ವೆಸ್ಟ್ ಭೂಮಿ ಮತ್ತು ರೈತ ಸನ್ನದು',
    enterBtn: 'ವೇದಿಕೆಯನ್ನು ಪ್ರವೇಶಿಸಿ'
  },
  te: {
    tag: 'నేల పరిరక్షణ మరియు వెర్రా VM0047 కార్బన్ వేదిక',
    main: '“భూమి వాతావరణానికి నిజమైన సంరక్షకుడు ఏ సదస్సు కాదు — సజీవ మట్టిని తాకే రైతు మాత్రమే.”',
    sub: 'పూర్వీకుల నేలలో పాతుకుపోయిన ప్రతి వేరు కార్బన్‌ను తరతరాల సంపదగా మారుస్తుంది.',
    attribution: '— గ్రీన్‌వెస్ట్ భూమి మరియు రైతు పత్రం',
    enterBtn: 'ప్లాట్‌ఫారమ్‌లోకి ప్రవేశించండి'
  }
};

const LANGUAGES: { id: Language; label: string; script: string }[] = [
  { id: 'en', label: 'English', script: 'EN' },
  { id: 'ta', label: 'தமிழ்', script: 'த' },
  { id: 'ml', label: 'മലയാളം', script: 'മ' },
  { id: 'kn', label: 'ಕನ್ನಡ', script: 'ಕ' },
  { id: 'te', label: 'తెలుగు', script: 'తె' }
];

export const FrontPage: React.FC<FrontPageProps> = ({
  isOpen,
  onEnterApp,
  language,
  onLanguageChange
}) => {
  const quote = QUOTES[language] || QUOTES.en;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="frontpage-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.98, filter: 'blur(10px)' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-50 flex flex-col justify-between overflow-y-auto bg-gradient-to-b from-[#2A4C22] via-[#1E3718] to-[#122310] text-[#F3F0E9] selection:bg-[#3D5C31] selection:text-[#F3F0E9]"
      >
        {/* Lighter Green with Sunlight Aura & Beam Streaming Downward */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Main Top Sun Disc & Warm Radiant Flare */}
          <div
            className="absolute -top-36 left-1/2 -translate-x-1/2 w-[760px] sm:w-[920px] h-[520px] rounded-full blur-[85px] opacity-85 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 50% 35%, rgba(255, 253, 240, 0.9) 0%, rgba(254, 240, 138, 0.5) 30%, rgba(167, 243, 208, 0.35) 60%, transparent 80%)'
            }}
          />

          {/* Golden Sunbeams Cascading Downward */}
          <div
            className="absolute -top-10 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[620px] opacity-35 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(254, 243, 199, 0.65) 0%, rgba(217, 249, 157, 0.35) 35%, transparent 75%)'
            }}
          />

          {/* Magic UI Ripple expanding in light sunlit tones */}
          <Ripple
            mainCircleSize={260}
            mainCircleOpacity={0.28}
            numCircles={7}
            className="top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-75"
          />

          {/* Sunlight Fading Off Smoothly Toward the Lower Portion of the Page */}
          <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-[#10200E] via-[#122310]/85 to-transparent pointer-events-none" />
        </div>

        {/* Sunlight Dust & Pollen Particles */}
        <Particles
          quantity={42}
          staticity={45}
          ease={60}
          color="#FEF08A"
          size={1.6}
          className="opacity-75"
        />

        {/* Clean Header Bar: Language Switcher and Subtle Text Indicator (No duplicate logo) */}
        <header className="relative z-20 w-full max-w-6xl mx-auto px-6 py-6 sm:py-8 flex items-center justify-between">
          <BlurFade delay={0.08} yOffset={-10}>
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-lg sm:text-xl text-[#FDFBF7] tracking-tight">
                GreenVest
              </span>
              <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-emerald-300/90 uppercase bg-[#1A3317]/80 px-2 py-0.5 rounded-md border border-emerald-400/30">
                ARR Carbon
              </span>
            </div>
          </BlurFade>

          {/* Language Selector */}
          <BlurFade delay={0.12} yOffset={-10}>
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#1A3418]/90 border border-[#8BA888]/30 backdrop-blur-md shadow-md">
              <Globe className="w-3.5 h-3.5 text-[#A3B899] ml-2 mr-0.5" />
              {LANGUAGES.map((lang) => {
                const isActive = language === lang.id;
                return (
                  <button
                    key={lang.id}
                    onClick={() => onLanguageChange(lang.id)}
                    className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[#3D5C31] text-[#FDFBF7] shadow-sm font-semibold border border-emerald-300/40'
                        : 'text-[#A3B899] hover:text-[#FDFBF7] hover:bg-[#254420]/60'
                    }`}
                    title={lang.label}
                  >
                    <span className="sm:hidden">{lang.script}</span>
                    <span className="hidden sm:inline">{lang.label}</span>
                  </button>
                );
              })}
            </div>
          </BlurFade>
        </header>

        {/* Center Stage: The Single Official Logo, Sunlit Title, Quote & Action */}
        <main className="relative z-20 w-full max-w-4xl mx-auto px-6 py-6 sm:py-8 flex flex-col items-center text-center my-auto">
          
          {/* The Single Official Logo (Enlarged with graceful light animation) */}
          <BlurFade delay={0.15} duration={0.7} yOffset={15}>
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative mb-6 group cursor-pointer"
            >
              {/* Luminous Warm Sunlight Halo with gentle breathing pulse */}
              <div
                className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-amber-300/40 via-emerald-400/40 to-yellow-200/35 blur-3xl opacity-85 pointer-events-none"
                style={{ animation: 'breathing-glow 4s ease-in-out infinite' }}
              />

              {/* Exact Emblem matching the Top Navbar — Scaled up with light sweep */}
              <div className="relative shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-gradient-to-br from-[#3D5C31] to-[#1E3615] flex items-center justify-center shadow-[0_12px_40px_rgba(0,0,0,0.5)] border-2 border-emerald-400/50 group-hover:border-emerald-300 transition-all duration-300 overflow-hidden relative">
                  
                  {/* Gentle sweeping light beam reflection */}
                  <motion.div
                    className="absolute inset-0 w-full h-full bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none -translate-x-full"
                    animate={{ translateX: ['-120%', '120%'] }}
                    transition={{
                      repeat: Infinity,
                      repeatDelay: 3.5,
                      duration: 1.6,
                      ease: 'easeInOut'
                    }}
                  />

                  {/* Organic Sprout Icon with gentle sway */}
                  <motion.div
                    animate={{ rotate: [0, 2.5, -2, 0], scale: [1, 1.04, 1] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <Sprout className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-300 drop-shadow-[0_2px_12px_rgba(110,231,183,0.55)] group-hover:scale-110 transition-transform duration-300" />
                  </motion.div>
                </div>

                {/* Active pulsating beacon */}
                <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-emerald-500 rounded-full border-[2.5px] border-[#162B13] flex items-center justify-center shadow-lg">
                  <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-white animate-pulse" />
                </div>
              </div>
            </motion.div>
          </BlurFade>

          {/* Micro-label tag */}
          <BlurFade delay={0.22} yOffset={12}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.2 rounded-full bg-[#1C3819]/85 border border-[#8BA888]/40 text-[#E9EDC9] text-[11px] sm:text-xs font-mono tracking-wider uppercase mb-5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>{quote.tag}</span>
            </div>
          </BlurFade>

          {/* Sunlit GreenVest Title (Refined, glowy typography without oozing) */}
          <BlurFade delay={0.28} yOffset={14} className="w-full">
            <div className="relative mb-5">
              {/* Soft Golden Sunbeam Aura */}
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-300/25 via-emerald-300/20 to-amber-200/20 blur-2xl pointer-events-none opacity-70" />
              <h1 className="relative font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#FDFBF7] drop-shadow-[0_4px_24px_rgba(0,0,0,0.35)]">
                <span className="bg-gradient-to-b from-[#FFFFFF] via-[#FFFDF5] to-[#D5EAC3] bg-clip-text text-transparent">
                  GreenVest
                </span>
              </h1>
            </div>
          </BlurFade>

          {/* The High-Impact Quote Card */}
          <BlurFade delay={0.35} yOffset={16}>
            <div className="relative max-w-2xl mx-auto mb-8 p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#1C3619]/85 to-[#132511]/90 border border-[#8BA888]/35 shadow-2xl backdrop-blur-lg overflow-hidden group">
              {/* Sunlight sheen along top edge */}
              <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-[#FDE047]/70 to-transparent" />
              
              {/* Subtle leaf accent */}
              <div className="absolute top-3 right-4 opacity-15 pointer-events-none">
                <Leaf className="w-12 h-12 text-[#CCD5AE]" />
              </div>

              {/* The Quote Text */}
              <blockquote className="font-serif italic text-lg sm:text-2xl text-[#FDFBF7] leading-relaxed mb-3">
                {quote.main}
              </blockquote>

              {/* Subtitle */}
              <p className="text-xs sm:text-sm text-[#BED3B3] font-normal leading-relaxed max-w-xl mx-auto mb-4">
                {quote.sub}
              </p>

              {/* Attribution */}
              <div className="pt-3 border-t border-[#8BA888]/20 flex items-center justify-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="text-[11px] sm:text-xs font-mono text-[#E9EDC9]/90 tracking-wide">
                  {quote.attribution}
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              </div>

              {/* Border Beam around Quote Card */}
              <BorderBeam
                size={190}
                duration={14}
                colorFrom="#FDE047"
                colorTo="#86EFAC"
                borderWidth={1.2}
              />
            </div>
          </BlurFade>

          {/* Primary Call to Action: Magic UI Shimmer Button */}
          <BlurFade delay={0.42} yOffset={18}>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <ShimmerButton
                onClick={onEnterApp}
                borderRadius="16px"
                shimmerDuration="2.6s"
                shimmerColor="#FEF08A"
                background="linear-gradient(135deg, #3D5C31 0%, #1E3615 100%)"
                className="px-8 py-4 text-base font-semibold tracking-wide cursor-pointer text-[#FDFBF7]"
                id="btn-enter-platform"
              >
                <span>{quote.enterBtn}</span>
                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </ShimmerButton>
            </div>
          </BlurFade>

          {/* Micro-Pill Anchors for Trust and Methodology */}
          <BlurFade delay={0.48} yOffset={14}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-[11px] sm:text-xs text-[#BED3B3]">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1A3317]/80 border border-[#8BA888]/30 backdrop-blur-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
                <span>Verra VM0047 ARR Scientific Standard</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1A3317]/80 border border-[#8BA888]/30 backdrop-blur-sm">
                <FileCheck className="w-3.5 h-3.5 text-emerald-300" />
                <span>Patta Deed OCR & Land Survey Verified</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1A3317]/80 border border-[#8BA888]/30 backdrop-blur-sm">
                <Award className="w-3.5 h-3.5 text-amber-300" />
                <span>100% Free For Smallholder Farmers</span>
              </div>
            </div>
          </BlurFade>

        </main>

        {/* Footer Info Bar */}
        <footer className="relative z-20 w-full max-w-6xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#A3B899]/85 border-t border-[#8BA888]/20 gap-2">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>GreenVest Earth Systems • ICAR & FRI Agroforestry Growth Tables</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onEnterApp}
              className="text-[#E9EDC9] hover:text-white underline underline-offset-4 transition-colors cursor-pointer"
            >
              Skip directly to Farmland Studio →
            </button>
          </div>
        </footer>

      </motion.div>
    </AnimatePresence>
  );
};
