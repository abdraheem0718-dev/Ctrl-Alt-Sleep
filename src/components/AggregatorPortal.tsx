import React, { useState, useEffect } from 'react';
import {
  SAMPLE_AGGREGATION_CLUSTERS,
  AGGREGATION_METRICS,
  SEED_QUALIFIED_FARMERS,
  QualifiedFarmerRecord
} from '../data/aggregationClusters';
import { AggregationCluster } from '../types/greenvest';
import { DeveloperRequestModal, DeveloperRequestLog } from './DeveloperRequestModal';
import {
  Users,
  Layers,
  MapPin,
  TrendingUp,
  Download,
  Building2,
  CheckCircle2,
  Filter,
  Search,
  ExternalLink,
  Sparkles,
  TreeDeciduous,
  Trees,
  ArrowUpRight,
  Database,
  Lock,
  Send,
  DollarSign,
  ShieldCheck
} from 'lucide-react';
import { TRANSLATIONS, Language } from '../utils/translations';

interface AggregatorPortalProps {
  language?: Language;
  registeredFarmers?: QualifiedFarmerRecord[];
  onExpressInterest?: () => void;
  onOpenDossier?: (record?: QualifiedFarmerRecord) => void;
}

export const AggregatorPortal: React.FC<AggregatorPortalProps> = ({
  language = 'en',
  registeredFarmers = [],
  onExpressInterest,
  onOpenDossier
}) => {
  const isTamil = language === 'ta';
  const t = TRANSLATIONS[language];
  const [filterState, setFilterState] = useState<string>('All');
  const [selectedClusterId, setSelectedClusterId] = useState<string>('CL-TN-DELTA-01');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRequestCluster, setActiveRequestCluster] = useState<AggregationCluster | null>(null);

  // Dynamic state combining pre-seeded records + any newly registered farmers from this session
  const [farmerList, setFarmerList] = useState<QualifiedFarmerRecord[]>(SEED_QUALIFIED_FARMERS);
  const [developerRequests, setDeveloperRequests] = useState<DeveloperRequestLog[]>([]);

  // Load any local session registered farmers
  const loadData = () => {
    try {
      const storedFarmers = localStorage.getItem('greenvest_registered_farmers');
      const parsed: QualifiedFarmerRecord[] = storedFarmers ? JSON.parse(storedFarmers) : [];
      const userRecords = [...(registeredFarmers || []), ...parsed];
      const combined = [...userRecords, ...SEED_QUALIFIED_FARMERS];
      const unique = combined.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);
      setFarmerList(unique);

      const storedRequests = localStorage.getItem('greenvest_developer_requests');
      if (storedRequests) {
        setDeveloperRequests(JSON.parse(storedRequests));
      }
    } catch {
      // ignore
    }
  };

  const handleToggleFarmerVerification = (farmerId: string) => {
    setFarmerList(prev => {
      const updated = prev.map(f => {
        if (f.id === farmerId) {
          const nextStatus = f.interestStatus === 'Survey Verified' ? 'Registered for Cohort' : 'Survey Verified';
          return { ...f, interestStatus: nextStatus as any };
        }
        return f;
      });
      try {
        localStorage.setItem('greenvest_registered_farmers', JSON.stringify(updated));
        window.dispatchEvent(new Event('greenvest_farmer_registered'));
      } catch {
        // ignore
      }
      return updated;
    });
  };

  useEffect(() => {
    loadData();
    const handleCustom = () => loadData();
    window.addEventListener('storage', loadData);
    window.addEventListener('greenvest_farmer_registered', handleCustom);
    return () => {
      window.removeEventListener('storage', loadData);
      window.removeEventListener('greenvest_farmer_registered', handleCustom);
    };
  }, [registeredFarmers]);

  // Identify any parcels registered by the user in this session or stored locally
  const userEnrolledParcels = farmerList.filter(f => 
    f.dateScreened === 'Just now' || 
    f.dateScreened === 'இப்போது' ||
    f.dateScreened === 'ഇപ്പോൾ' ||
    f.dateScreened === 'ಈಗಷ್ಟೇ' ||
    f.dateScreened === 'ఇప్పుడే' ||
    f.interestStatus?.includes('Registered') ||
    f.interestStatus?.includes('Enrolled') ||
    (registeredFarmers && registeredFarmers.some(r => r.id === f.id))
  );

  const clusters = SAMPLE_AGGREGATION_CLUSTERS.filter((c) => {
    if (filterState !== 'All' && c.state !== filterState) return false;
    return true;
  });

  const selectedCluster = SAMPLE_AGGREGATION_CLUSTERS.find(c => c.id === selectedClusterId) || SAMPLE_AGGREGATION_CLUSTERS[0];

  const handleOpenRequestPack = (clusterId: string) => {
    const target = SAMPLE_AGGREGATION_CLUSTERS.find(c => c.id === clusterId) || selectedCluster;
    setActiveRequestCluster(target);
  };

  const filteredFarmers = farmerList.filter(f => {
    if (searchQuery && !f.district.toLowerCase().includes(searchQuery.toLowerCase()) && !f.speciesMix.toLowerCase().includes(searchQuery.toLowerCase()) && !f.farmerNamePseudonym.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* 0. Live User Enrolled Parcel Status Banner (Shown if user has expressed interest) */}
      {userEnrolledParcels.length > 0 && (
        <div className="bg-[#E9EDC9] border-2 border-[#2D4A22] rounded-3xl p-5 sm:p-6 shadow-sm animate-fadeIn text-[#2C3626]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-[#2D4A22] text-[#F1F5EF] flex items-center justify-center shrink-0 shadow-xs">
                <CheckCircle2 className="w-6 h-6 text-[#E9EDC9]" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-[#1A2E11] text-base font-serif">
                    {isTamil ? 'உங்கள் விருப்பப் பதிவு இந்த மையத்தில் நேரலையாக இணைக்கப்பட்டுள்ளது!' : 'Your Expressed Interest is Active in this Aggregator Hub!'}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#2D4A22] text-[#F1F5EF] text-[10px] font-bold uppercase tracking-wider animate-pulse">
                    {userEnrolledParcels.length} {isTamil ? 'நேரலை நிலம்' : 'Live Parcel Enrolled'}
                  </span>
                </div>
                <p className="text-xs text-[#2D4A22] mt-1 leading-relaxed">
                  {isTamil
                    ? `பதிவு அடையாள எண் ${userEnrolledParcels[0].id} (${userEnrolledParcels[0].landArea} ஏக்கர், ${userEnrolledParcels[0].district}) வெற்றிகரமாக சேர்க்கப்பட்டுள்ளது. நிறுவன உருவாக்குநர்கள் இந்த நிலத்தை இலவசமாக தொகுப்பில் சேர்க்கலாம்.`
                    : `Parcel Record ${userEnrolledParcels[0].id} (${userEnrolledParcels[0].landArea} acres in ${userEnrolledParcels[0].district}) is enrolled in the developer pipeline with ₹0 upfront fees to you. It is displayed at the top of the Qualified Farmer Cohort below.`}
                </p>
              </div>
            </div>
            <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 self-stretch md:self-auto justify-end">
              <span className="text-[11px] font-mono font-bold text-[#2D4A22] bg-white px-3 py-2 rounded-xl border border-[#CCD5AE] shadow-xs text-center">
                {userEnrolledParcels[0].projected10YrTonnes} t CO₂e • {userEnrolledParcels[0].projectedNetInr}
              </span>
              <button
                id="btn-print-enrolled-banner"
                onClick={() => onOpenDossier?.(userEnrolledParcels[0])}
                className="px-3.5 py-2 rounded-xl bg-[#2D4A22] hover:bg-[#1E3615] text-[#F1F5EF] text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                title="Save Parcel Dossier (PDF)"
              >
                <Download className="w-3.5 h-3.5 text-emerald-300" />
                <span>{isTamil ? 'PDF சேமிக்க (.pdf)' : 'Save Parcel Dossier (PDF)'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 1. Strategic Hero: The Clever Business Model */}
      <div className="relative overflow-hidden bg-[#1A2E11] rounded-3xl p-6 sm:p-8 text-white shadow-sm border border-white/10">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E9EDC9] text-[#2D4A22] border border-[#CCD5AE] text-[10px] font-bold tracking-widest uppercase">
            <Building2 className="w-3.5 h-3.5 text-[#2D4A22]" />
            <span>{isTamil ? 'கிரீன்வெஸ்ட் வணிக உத்தி' : 'THE STRATEGIC GREENVEST ARBITRAGE'}</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-serif leading-tight">
            {isTamil
              ? '“நாங்கள் உங்களுக்கு கார்பன் வரவுகளை விற்பனை செய்வதில்லை. நீங்கள் பணத்தை செலவழிக்கும் முன் திட்டம் சாத்தியமானதா என்பதை நேர்மையாகக் கூறுகிறோம்.”'
              : '“We don\'t sell you carbon credits. We tell you whether the project makes sense before you spend money.”'}
          </h2>

          <p className="text-sm sm:text-base text-[#CCD5AE] leading-relaxed">
            {isTamil ? (
              <>
                இலவச மற்றும் வெளிப்படையான முன்-சாத்தியக்கூறு மதிப்பீடுகள் மூலம் <strong className="text-white">100,000க்கும் மேற்பட்ட விவசாயிகளை</strong> ஆய்வு செய்து, கிரீன்வெஸ்ட் அதில் முதல் <strong className="text-white">20,000+ சிறந்த நிலங்களை</strong> தேர்வு செய்கிறது. திட்ட உருவாக்குநர்கள் மற்றும் கார்பன் ஒருங்கிணைப்பாளர்கள் ஒவ்வொரு விவசாயியையும் தனித்தனியாக தேடி அலைவதற்குப் பதிலாக, ஏற்கனவே தயாராக உள்ள தகுதியான விவசாயக் குழுக்களை நேரடியாகப் பெறுகின்றனர்.
              </>
            ) : (
              <>
                By screening over <strong className="text-white">100,000 farmers</strong> with free, honest pre-feasibility assessments, GreenVest filters the top <strong className="text-white">20,000+ prime candidates</strong>. 
                Project developers and carbon aggregators get pre-educated, pre-qualified farmer cohorts instead of spending millions finding and convincing individual farmers.
              </>
            )}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#E9EDC9]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#8BA888]" />
              {isTamil ? 'ஒருங்கிணைப்பாளர்கள் கூட்டாளிகளாக மாறுகின்றனர்' : 'Aggregators become partners, not competitors'}
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#8BA888]" />
              {isTamil ? '80% ஆரம்ப ஆய்வு தோல்விகளைத் தவிர்க்கிறது' : 'Eliminates 80% of project origination failure'}
            </span>
          </div>
        </div>

        {/* Subtle decorative background watermark */}
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-10 pointer-events-none text-[#8BA888]">
          <Trees className="w-96 h-96" />
        </div>
      </div>

      {/* 2. Top-Level Aggregation Pipeline Metrics (The 100k -> 20k Funnel) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Screened */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#E0D8C8]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-[#8BA888] uppercase tracking-widest">
              {isTamil ? 'ஆய்வு செய்யப்பட்ட விவசாயிகள்' : 'Screened Farmers'}
            </span>
            <span className="p-2 rounded-xl bg-[#F4F1EA] text-[#2C3626]">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#1A2E11] font-mono-data">
            {AGGREGATION_METRICS.totalFarmersScreened.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-[#6D7A65] mt-1">
            {isTamil ? 'இலவச முன்-சாத்தியக்கூறு தணிக்கைகள்' : 'Free pre-screening audits conducted'}
          </div>
        </div>

        {/* Qualified Candidates */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#E0D8C8]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-[#8BA888] uppercase tracking-widest">
              {isTamil ? 'தகுதிவாய்ந்த குழுமம்' : 'Qualified Cohort'}
            </span>
            <span className="p-2 rounded-xl bg-[#F4F1EA] text-[#2D4A22]">
              <Sparkles className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#2D4A22] font-mono-data">
            {AGGREGATION_METRICS.qualifiedPreScreenedFarmers.toLocaleString('en-IN')}
          </div>
          <div className="text-xs text-[#2D4A22] font-semibold mt-1">
            {AGGREGATION_METRICS.qualificationRatePercent}% {isTamil ? 'சாத்தியமான தகுதி மதிப்பீடு' : 'viable pre-feasibility score'}
          </div>
        </div>

        {/* Aggregated Acreage */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#E0D8C8]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-[#8BA888] uppercase tracking-widest">
              {isTamil ? 'ஒருங்கிணைக்கப்பட்ட பரப்பளவு' : 'Bundled Acreage'}
            </span>
            <span className="p-2 rounded-xl bg-[#F4F1EA] text-[#2D4A22]">
              <Layers className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#1A2E11] font-mono-data">
            {(AGGREGATION_METRICS.totalAggregatedAcreage).toLocaleString('en-IN')}{' '}
            <span className="text-sm text-[#6D7A65] font-normal">{isTamil ? 'ஏக்கர்' : 'Acres'}</span>
          </div>
          <div className="text-xs text-[#6D7A65] mt-1">
            {AGGREGATION_METRICS.projected10YrSequestrationMt}M {isTamil ? 'டன் 10-ஆண்டு CO₂e சேமிப்பு' : 'tonnes 10-Yr CO₂e sink'}
          </div>
        </div>

        {/* Developer Cost Savings */}
        <div className="bg-[#2D4A22] rounded-3xl p-6 shadow-sm border border-[#3D5C31] text-white">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-[#CCD5AE] uppercase tracking-widest">
              {isTamil ? 'சேமிக்கப்பட்ட ஆய்வுச் செலவு' : 'Origination Saved'}
            </span>
            <span className="p-2 rounded-xl bg-white/10 text-[#CCD5AE]">
              <DollarSign className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white font-mono-data font-serif">
            {isTamil ? '₹10.9 கோடி' : '₹10.9 Cr'}
          </div>
          <div className="text-xs text-[#CCD5AE] font-medium mt-1">
            {isTamil ? 'கள ஆய்வு & விவசாயி கல்விச் செலவு மிச்சம்' : 'Saved in field education & survey overhead'}
          </div>
        </div>

      </div>

      {/* 3. District Aggregation Clusters (B2B Project Bundles) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-[#E0D8C8]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#F4F1EA] gap-3">
          <div>
            <h3 className="text-lg font-bold text-[#1A2E11] flex items-center gap-2 font-serif">
              <MapPin className="w-5 h-5 text-[#2D4A22]" />
              <span>{isTamil ? 'சரிபார்க்கப்பட்ட வேளாண் காடுகள் ஒருங்கிணைப்புக் குழுமங்கள்' : 'Verified Agroforestry Aggregation Clusters'}</span>
            </h3>
            <p className="text-xs text-[#6D7A65]">
              {isTamil
                ? 'புவியியல் நெருக்கம், பொதுவான நீர் ஆதாரங்கள் மற்றும் ஒத்த மண்-மர வகைகளின் அடிப்படையில் வெர்ரா VM0047/கோல்ட் ஸ்டாண்டர்ட் திட்டங்களுக்காக தொகுக்கப்பட்டது.'
                : 'Clustered by geographic proximity, shared water basins, and compatible soil-species profiles for Verra VM0047/Gold Standard registration.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-[#6D7A65] font-medium">{isTamil ? 'மாநிலம்:' : 'State:'}</span>
            <select
              value={filterState}
              onChange={(e) => setFilterState(e.target.value)}
              className="text-xs bg-[#F4F1EA] border border-[#E0D8C8] text-[#2C3626] rounded-xl px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#2D4A22]"
            >
              <option value="All">{isTamil ? 'அனைத்து பகுதிகள்' : 'All Regions'}</option>
              <option value="Tamil Nadu">{isTamil ? 'தமிழ்நாடு' : 'Tamil Nadu'}</option>
              <option value="Kerala">{isTamil ? 'கேரளா' : 'Kerala'}</option>
              <option value="Karnataka">{isTamil ? 'கர்நாடகா' : 'Karnataka'}</option>
              <option value="Andhra Pradesh">{isTamil ? 'ஆந்திரப் பிரதேசம்' : 'Andhra Pradesh'}</option>
            </select>
          </div>
        </div>

        {/* Cluster Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
          {clusters.map((cluster) => {
            const isSelected = cluster.id === selectedClusterId;
            return (
              <div
                key={cluster.id}
                onClick={() => setSelectedClusterId(cluster.id)}
                className={`p-6 rounded-3xl border cursor-pointer transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#2D4A22] bg-[#FDFBF7] shadow-sm ring-1 ring-[#2D4A22]'
                    : 'border-[#E0D8C8] bg-white hover:border-[#8BA888] hover:bg-[#FDFBF7]/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-lg bg-[#F4F1EA] text-[#2C3626] border border-[#E0D8C8]">
                      {cluster.id}
                    </span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                      cluster.status === 'Contracting Active'
                        ? 'bg-[#E9EDC9] text-[#2D4A22] border-[#CCD5AE]'
                        : cluster.status === 'Ready for Pre-Feasibility Audit'
                        ? 'bg-[#F4F1EA] text-[#2D4A22] border-[#CCD5AE]'
                        : 'bg-amber-50 text-amber-900 border-amber-200'
                    }`}>
                      {isTamil
                        ? (cluster.status === 'Contracting Active' ? 'ஒப்பந்தம் செயல்பாட்டில் உள்ளது' : 'தணிக்கைக்கு தயார்')
                        : cluster.status}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-[#1A2E11] mt-3 font-serif">
                    {cluster.name}
                  </h4>
                  <div className="text-xs text-[#6D7A65] flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#8BA888]" />
                    <span>{cluster.district}, {cluster.state}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-[#F4F1EA] text-xs">
                    <div>
                      <span className="text-[#8BA888] block text-[10px] uppercase font-bold">
                        {isTamil ? 'தகுதியான விவசாயிகள்:' : 'Qualified Farmers:'}
                      </span>
                      <span className="font-bold text-[#1A2E11]">{cluster.qualifiedFarmersCount.toLocaleString('en-IN')} {isTamil ? 'விவசாயிகள்' : 'farmers'}</span>
                    </div>
                    <div>
                      <span className="text-[#8BA888] block text-[10px] uppercase font-bold">
                        {isTamil ? 'தொகுக்கப்பட்ட நிலம்:' : 'Aggregated Land:'}
                      </span>
                      <span className="font-bold text-[#1A2E11]">{cluster.totalAcreage.toLocaleString('en-IN')} {isTamil ? 'ஏக்கர்' : 'acres'}</span>
                    </div>
                    <div>
                      <span className="text-[#8BA888] block text-[10px] uppercase font-bold">
                        {isTamil ? '10-ஆண்டு CO₂ சேமிப்பு:' : 'Est. 10-Yr Sink:'}
                      </span>
                      <span className="font-bold text-[#2D4A22]">{(cluster.estimated10YrCarbonTonnes / 1000).toFixed(0)}k t CO₂e</span>
                    </div>
                    <div>
                      <span className="text-[#8BA888] block text-[10px] uppercase font-bold">
                        {isTamil ? 'சேமிக்கப்பட்ட ஆய்வு நிதி:' : 'Origination Savings:'}
                      </span>
                      <span className="font-bold text-[#1A2E11]">₹{(cluster.estimatedDeveloperOriginationSavings / 100000).toFixed(1)} {isTamil ? 'லட்சம்' : 'Lakh'}</span>
                    </div>
                  </div>

                  <div className="mt-3 text-[11px] text-[#6D7A65] bg-[#F4F1EA] p-2 rounded-xl border border-[#E0D8C8]">
                    <span className="text-[#8BA888] font-bold">{isTamil ? 'முதன்மை மரங்கள்: ' : 'Dominant Mix: '}</span>
                    <span className="font-medium text-[#2C3626]">{cluster.dominantSpecies.join(', ')}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#F4F1EA] flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#2D4A22]">
                    {isTamil ? 'தயார் நிலை:' : 'Readiness:'} {cluster.readinessScore}%
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenRequestPack(cluster.id);
                    }}
                    className="text-xs font-bold text-[#2D4A22] hover:text-[#1A2E11] flex items-center gap-1"
                  >
                    <span>{isTamil ? 'அறிக்கைப் பேக் கோரிக்கை' : 'Request Dossier Pack'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#8BA888]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Cluster Deep-Dive Bar */}
        <div className="mt-6 p-4 rounded-2xl bg-[#F4F1EA] border border-[#E0D8C8] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#2C3626]">
            <span className="font-bold text-[#1A2E11]">{isTamil ? 'தேர்வு:' : 'Selected:'} {selectedCluster.name}</span>
            <span className="mx-2 text-[#8BA888]">•</span>
            <span className="text-[#6D7A65]">{selectedCluster.qualifiedFarmersCount} {isTamil ? 'விவசாயிகள் சமர்ப்பிப்புக்கு தயாராக உள்ளனர்' : 'pre-screened landholders ready for baseline PDD submission'}</span>
          </div>
          <button
            id="btn-download-cluster-pack"
            onClick={() => handleOpenRequestPack(selectedCluster.id)}
            className="px-5 py-2.5 rounded-xl bg-[#2D4A22] hover:bg-[#3D5C31] text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors shrink-0"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isTamil ? 'குழும GIS & சாத்தியக்கூறு பேக் பதிவிறக்கம்' : 'Download Cluster GIS & Feasibility Pack'}</span>
          </button>
        </div>
      </div>

      {/* 4. Live Pre-Screened Farmer Cohort Directory */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-[#E0D8C8]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#F4F1EA] gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-[#1A2E11] flex items-center gap-2 font-serif">
                <Users className="w-5 h-5 text-[#2D4A22]" />
                <span>{isTamil ? 'நேரடி விவசாயக் குழுமம் பதிவுப் பட்டியல்' : 'Live Pre-Screened Farmer Cohort Registry'}</span>
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E9EDC9] text-[#2D4A22] border border-[#CCD5AE]">
                {farmerList.length} {isTamil ? 'பதிவுகள்' : 'Active Records'}
              </span>
            </div>
            <p className="text-xs text-[#6D7A65]">
              {isTamil
                ? 'முன்-சாத்தியக்கூறு மதிப்பீட்டை நிறைவு செய்து, உள்ளூர் கூட்டுத் திட்டத்தில் இணைய விருப்பம் தெரிவித்த விவசாயிகள்.'
                : 'Farmers who completed the pre-feasibility calculator and registered to join local developer aggregation cohorts.'}
            </p>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-[#8BA888] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder={isTamil ? 'மாவட்டம் அல்லது மரம் தேடுங்கள்...' : 'Search by district or species...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-xs pl-9 pr-3 py-2 bg-[#F4F1EA] border border-[#E0D8C8] text-[#2C3626] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#2D4A22] w-full sm:w-64"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto mt-4 rounded-2xl border border-[#E0D8C8]">
          <table className="w-full text-left text-xs text-[#2C3626]">
            <thead className="bg-[#F4F1EA] text-[#6D7A65] font-semibold border-b border-[#E0D8C8]">
              <tr>
                <th className="py-3.5 px-3">{isTamil ? 'நில எண் & விவசாயி' : 'Parcel ID & Farmer'}</th>
                <th className="py-3.5 px-3">{isTamil ? 'இடம் & மண்' : 'Location & Soil'}</th>
                <th className="py-3.5 px-3">{isTamil ? 'பரப்பளவு' : 'Area (Acres)'}</th>
                <th className="py-3.5 px-3">{isTamil ? 'பரிந்துரைக்கப்பட்ட மரம்' : 'Recommended Species'}</th>
                <th className="py-3.5 px-3">{isTamil ? '10-ஆண்டு CO₂ சேமிப்பு' : '10-Yr Carbon Sink'}</th>
                <th className="py-3.5 px-3">{isTamil ? 'நிகர நிதி சாத்தியக்கூறு' : 'Estimated Net Potential'}</th>
                <th className="py-3.5 px-3">{isTamil ? 'நம்பகத்தன்மை' : 'Confidence'}</th>
                <th className="py-3.5 px-3">{isTamil ? 'நிலை' : 'Status'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4F1EA]">
              {filteredFarmers.map((farmer) => {
                const isJustRegistered = farmer.dateScreened === 'Just now';
                return (
                  <tr
                    key={farmer.id}
                    className={`transition-colors ${
                      isJustRegistered ? 'bg-[#E9EDC9]/30 hover:bg-[#E9EDC9]/50' : 'hover:bg-[#FDFBF7]'
                    }`}
                  >
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-[#1A2E11]">{farmer.farmerNamePseudonym}</span>
                        {isJustRegistered && (
                          <span className="animate-pulse px-1.5 py-0.2 rounded-md bg-[#2D4A22] text-[#F1F5EF] text-[9px] font-bold">
                            {isTamil ? 'புதியது' : 'NEW / LIVE'}
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-[#8BA888] font-mono">{farmer.id} • {farmer.dateScreened}</div>
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-medium text-[#1A2E11]">{farmer.district}</div>
                      <div className="text-[10px] text-[#6D7A65]">{farmer.soilType}</div>
                    </td>
                    <td className="py-3 px-3 font-semibold text-[#1A2E11]">
                      {farmer.landArea} {isTamil ? 'ஏக்' : 'ac'}
                    </td>
                    <td className="py-3 px-3 text-[#2D4A22] font-medium">
                      {farmer.speciesMix}
                    </td>
                    <td className="py-3 px-3 font-bold text-[#1A2E11]">
                      {farmer.projected10YrTonnes} t CO₂e
                    </td>
                    <td className="py-3 px-3 font-bold text-[#2D4A22] font-mono-data">
                      {farmer.projectedNetInr}
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#E9EDC9] text-[#2D4A22] border border-[#CCD5AE]">
                        {isTamil ? (farmer.confidence === 'High' ? 'உயர் தரம்' : farmer.confidence === 'Medium' ? 'நடுத்தர தரம்' : 'எச்சரிக்கை') : farmer.confidence}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                          farmer.interestStatus === 'Survey Verified'
                            ? 'bg-emerald-100 text-emerald-900 border-emerald-300 font-bold'
                            : isJustRegistered
                            ? 'bg-[#2D4A22] text-white border-[#2D4A22]'
                            : 'bg-[#F4F1EA] text-[#6D7A65] border-[#E0D8C8]'
                        }`}>
                          {isTamil ? (farmer.interestStatus === 'Survey Verified' ? 'சர்வே சரிபார்க்கப்பட்டது' : 'ஆர்வப்பதிவு உறுதி') : farmer.interestStatus}
                        </span>
                        <button
                          onClick={() => handleToggleFarmerVerification(farmer.id)}
                          title={farmer.interestStatus === 'Survey Verified' ? (isTamil ? 'சரிபார்ப்பை மீட்டமை' : 'Reset status') : (isTamil ? 'நில உரிமை & சர்வேயை சரிபார்' : 'GreenVest Staff: Verify & Approve Deed')}
                          className={`p-1 rounded-lg border transition-colors cursor-pointer ${
                            farmer.interestStatus === 'Survey Verified'
                              ? 'bg-emerald-700 hover:bg-emerald-800 text-white border-emerald-600'
                              : 'bg-[#F4F1EA] hover:bg-emerald-100 text-[#2C3626] border-[#CCD5AE]'
                          }`}
                        >
                          <ShieldCheck className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => onOpenDossier?.(farmer)}
                          title={isTamil ? 'அறிக்கையை PDF ஆக சேமி' : 'Save Parcel Dossier (PDF)'}
                          className="p-1 rounded-lg bg-[#F4F1EA] hover:bg-[#2D4A22] text-[#2C3626] hover:text-white border border-[#CCD5AE] transition-colors cursor-pointer"
                        >
                          <Download className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Developer Origination Requests Dispatched Log (if any) */}
      {developerRequests.length > 0 && (
        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-[#E0D8C8]">
          <div className="pb-3 border-b border-[#F4F1EA] flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#1A2E11] flex items-center gap-2 font-serif">
                <Send className="w-4 h-4 text-[#2D4A22]" />
                <span>{isTamil ? 'செயல்பாட்டில் உள்ள நிறுவன உருவாக்குநர் கோரிக்கைகள்' : 'Active Institutional Developer Requests'}</span>
              </h3>
              <p className="text-xs text-[#6D7A65]">
                {isTamil
                  ? 'கள ஆய்வு மற்றும் செயற்கைக்கோள் MRV பணிகளுக்காக அனுப்பப்பட்ட ஆவணப் பேக்குகள்.'
                  : 'Dossier packs generated and queued for physical ground audit and satellite MRV deployment.'}
              </p>
            </div>
            <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg bg-[#F4F1EA] text-[#2C3626] border border-[#E0D8C8]">
              {developerRequests.length} {isTamil ? 'கோரிக்கைகள்' : 'Requests'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4 text-xs">
            {developerRequests.map((req) => (
              <div key={req.id} className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#E0D8C8] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-[#2D4A22] text-[11px]">{req.id}</span>
                  <span className="text-[10px] text-[#8BA888]">{req.requestedAt}</span>
                </div>
                <div className="font-bold text-[#1A2E11]">{req.organization}</div>
                <div className="text-[#6D7A65]">{isTamil ? 'இலக்கு: ' : 'Target: '}{req.clusterName} ({req.clusterId})</div>
                <div className="text-[10px] text-[#8BA888] pt-1 border-t border-[#F4F1EA]">
                  {isTamil ? 'ஆவணங்கள்: ' : 'Deliverables: '}{req.deliverables.join(' • ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 6. Transparent Data Routing Architecture: Where do requests and registrations go? */}
      <div className="bg-[#F4F1EA] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#CCD5AE]">
        <div className="max-w-3xl space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E9EDC9] text-[#2D4A22] border border-[#CCD5AE] text-[10px] font-bold tracking-widest uppercase">
            <Database className="w-3.5 h-3.5" />
            <span>{isTamil ? 'வெளிப்படையான தரவு ஓட்டம்' : 'TRANSPARENT SYSTEM DATA FLOW'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#1A2E11] font-serif">
            {isTamil
              ? 'உங்கள் பதிவுகளும் உருவாக்குநர் கோரிக்கைகளும் எங்கு செல்கின்றன?'
              : 'Where do your registrations and developer requests actually go?'}
          </h3>
          <p className="text-xs text-[#6D7A65] leading-relaxed">
            {isTamil
              ? 'கிரீன்வெஸ்ட் இடைத்தரகர் சுரண்டலையும் அதிக தணிக்கை செலவையும் தவிர்க்க 4-படி வெளிப்படையான வழிமுறையைப் பின்பற்றுகிறது.'
              : 'GreenVest bridges smallholder farmers and institutional carbon markets through a 4-stage transparent pipeline designed to eliminate broker exploitation and high audit barriers.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Step 1 */}
          <div className="p-5 rounded-2xl bg-white border border-[#E0D8C8] space-y-2">
            <div className="w-8 h-8 rounded-xl bg-[#F4F1EA] text-[#2D4A22] flex items-center justify-center font-bold text-xs">
              1
            </div>
            <h4 className="text-sm font-bold text-[#1A2E11] font-serif">{isTamil ? 'இலவச முன்-ஆய்வு' : 'Free Pre-Screening'}</h4>
            <p className="text-xs text-[#6D7A65] leading-relaxed">
              {isTamil
                ? 'விவசாயி நிலத் தரவுகளை உள்ளிடுகிறார். ICAR/FRI மாதிரிகள் மூலம் முன்செலவின்றி P10–P90 வளர்ச்சி வரம்புகள் கணக்கிடப்படுகின்றன.'
                : 'Farmer inputs parcel data (soil, water, acreage). ICAR/FRI mathematical models generate realistic P10–P90 growth ranges with zero upfront commitment.'}
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-5 rounded-2xl bg-white border border-[#E0D8C8] space-y-2">
            <div className="w-8 h-8 rounded-xl bg-[#E9EDC9] text-[#2D4A22] flex items-center justify-center font-bold text-xs">
              2
            </div>
            <h4 className="text-sm font-bold text-[#1A2E11] font-serif">{isTamil ? 'மாவட்ட பதிவு' : 'District Registry'}</h4>
            <p className="text-xs text-[#6D7A65] leading-relaxed">
              {isTamil
                ? 'பதிவு செய்தவுடன் நிலம் மாவட்ட கூட்டமைப்பில் சேர்க்கப்படுகிறது. நிலங்கள் 500+ ஏக்கர் தொகுதிகளாக ஒருங்கிணைக்கப்படுகின்றன.'
                : 'Upon clicking "Register", the parcel is enrolled into the District Aggregation Cohort. Farms are bundled into 500+ acre units.'}
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-5 rounded-2xl bg-white border border-[#E0D8C8] space-y-2">
            <div className="w-8 h-8 rounded-xl bg-[#F4F1EA] text-[#2D4A22] flex items-center justify-center font-bold text-xs">
              3
            </div>
            <h4 className="text-sm font-bold text-[#1A2E11] font-serif">{isTamil ? 'உருவாக்குநர் பொருத்தம்' : 'Developer Matching'}</h4>
            <p className="text-xs text-[#6D7A65] leading-relaxed">
              {isTamil
                ? 'சான்றளிக்கப்பட்ட உருவாக்குநர்கள் குழுமத்தை ஆய்வு செய்து விவசாயிகளுக்கு கட்டணமின்றி மண் ஆய்வு மற்றும் செயற்கைக்கோள் MRV-யை மேற்கொள்கின்றனர்.'
                : 'Verified developers review aggregated cohorts and request Dossier Packs to fund satellite MRV & soil testing at zero cost to farmers.'}
            </p>
          </div>

          {/* Step 4 */}
          <div className="p-5 rounded-2xl bg-white border border-[#E0D8C8] space-y-2">
            <div className="w-8 h-8 rounded-xl bg-[#2D4A22] text-[#F1F5EF] flex items-center justify-center font-bold text-xs">
              4
            </div>
            <h4 className="text-sm font-bold text-[#1A2E11] font-serif">{isTamil ? 'நேரடி வங்கி வழங்கல்' : 'Direct Escrow Payout'}</h4>
            <p className="text-xs text-[#6D7A65] leading-relaxed">
              {isTamil
                ? 'வெர்ரா வரவுகள் வழங்கப்பட்டதும், வருவாய் நேரடியாக விவசாயிகளின் வங்கிக் கணக்கில் இடைத்தரகர் பிடித்தமின்றி செலுத்தப்படுகிறது.'
                : 'When Verra or Gold Standard credits are issued, revenue is disbursed straight to farmer bank accounts with no middleman skimming.'}
            </p>
          </div>

        </div>
      </div>

      {/* Modal: Developer Request Modal */}
      {activeRequestCluster && (
        <DeveloperRequestModal
          isOpen={true}
          onClose={() => setActiveRequestCluster(null)}
          cluster={activeRequestCluster}
          language={language}
        />
      )}

    </div>
  );
};
