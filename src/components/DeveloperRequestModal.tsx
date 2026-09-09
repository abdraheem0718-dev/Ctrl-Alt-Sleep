import React, { useState } from 'react';
import { AggregationCluster } from '../types/greenvest';
import {
  X,
  Download,
  Building2,
  FileSpreadsheet,
  CheckCircle2,
  Lock,
  Layers,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface DeveloperRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  cluster: AggregationCluster;
  language?: 'en' | 'ta';
}

export interface DeveloperRequestLog {
  id: string;
  clusterId: string;
  clusterName: string;
  organization: string;
  email: string;
  requestedAt: string;
  deliverables: string[];
}

export const DeveloperRequestModal: React.FC<DeveloperRequestModalProps> = ({
  isOpen,
  onClose,
  cluster,
  language = 'en'
}) => {
  const isTamil = language === 'ta';
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState<'Verra ARR (VM0047)' | 'Gold Standard' | 'Indian Carbon Market (CCTS)'>('Verra ARR (VM0047)');
  const [includeGisLayers, setIncludeGisLayers] = useState(true);
  const [includeFarmerConsent, setIncludeFarmerConsent] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [requestReference, setRequestReference] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const ref = `REQ-DEV-${Math.floor(100000 + Math.random() * 900000)}`;
    setRequestReference(ref);

    const requestItem: DeveloperRequestLog = {
      id: ref,
      clusterId: cluster.id,
      clusterName: cluster.name,
      organization: organization.trim() || (isTamil ? 'நிறுவன கார்பன் கூட்டாளர்' : 'Institutional Carbon Partner'),
      email: email.trim() || 'developer@carbonregistry.org',
      requestedAt: isTamil ? 'இப்போது' : 'Just now',
      deliverables: [
        isTamil ? 'பெயரற்ற விவசாய நிலப் பதிவேடு' : 'Anonymized Farmer Land Registry',
        includeGisLayers ? (isTamil ? 'GIS எல்லை GeoJSON/KML' : 'GIS Boundary GeoJSON/KML') : '',
        includeFarmerConsent ? (isTamil ? 'FPO ஒப்புதல் & அடிப்படை ஒப்பந்தங்கள்' : 'FPO Consent & Baseline Agreements') : '',
        `${projectType} ${isTamil ? 'வளர்ச்சி மாதிரி அட்டவணை' : 'Allometric Model Spreadsheet'}`
      ].filter(Boolean)
    };

    try {
      const existing = localStorage.getItem('greenvest_developer_requests');
      const list: DeveloperRequestLog[] = existing ? JSON.parse(existing) : [];
      list.unshift(requestItem);
      localStorage.setItem('greenvest_developer_requests', JSON.stringify(list));
    } catch {
      // ignore
    }

    setIsSubmitted(true);
  };

  const handleDownloadSpec = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      clusterId: cluster.id,
      clusterName: cluster.name,
      district: cluster.district,
      state: cluster.state,
      totalAcreage: cluster.totalAcreage,
      qualifiedFarmersCount: cluster.qualifiedFarmersCount,
      estimated10YrCarbonTonnes: cluster.estimated10YrCarbonTonnes,
      dominantSpecies: cluster.dominantSpecies,
      readinessScore: cluster.readinessScore,
      targetMethodology: projectType,
      requestTimestamp: new Date().toISOString(),
      requestReference
    }, null, 2));

    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `GreenVest_${cluster.id}_Feasibility_Specification.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#E0D8C8]">
        
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-[#F4F1EA] flex items-center justify-between z-10">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-2xl bg-[#F4F1EA] text-[#2D4A22] flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1A2E11] font-serif">
                {isTamil ? 'நிறுவன சாத்தியக்கூறு பேக் கோரிக்கை' : 'Institutional Origination Pack Request'}
              </h3>
              <p className="text-xs text-[#6D7A65]">
                {cluster.name} ({cluster.id})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#6D7A65] hover:text-[#1A2E11] hover:bg-[#F4F1EA] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Cluster summary chip */}
              <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#E0D8C8] flex flex-wrap items-center justify-between gap-2 text-xs">
                <div>
                  <span className="text-[#8BA888] block text-[10px] uppercase font-bold">
                    {isTamil ? 'ஒருங்கிணைக்கப்பட்ட பரப்பளவு:' : 'Bundled Scale:'}
                  </span>
                  <span className="font-bold text-[#1A2E11]">{cluster.totalAcreage.toLocaleString('en-IN')} {isTamil ? 'ஏக்கர்' : 'Acres'} • {cluster.qualifiedFarmersCount} {isTamil ? 'விவசாயிகள்' : 'Farmers'}</span>
                </div>
                <div>
                  <span className="text-[#8BA888] block text-[10px] uppercase font-bold">
                    {isTamil ? '10-ஆண்டு கார்பன் இலக்கு:' : 'Projected 10-Yr Sink:'}
                  </span>
                  <span className="font-bold text-[#2D4A22]">{(cluster.estimated10YrCarbonTonnes / 1000).toFixed(0)}k t CO₂e</span>
                </div>
              </div>

              {/* Organization */}
              <div>
                <label className="block text-xs font-bold text-[#1A2E11] mb-1">
                  {isTamil ? 'நிறுவனம் / திட்ட உருவாக்குநர் பெயர் *' : 'Organization / Developer Entity *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={isTamil ? 'எ.கா., சவுத் போல், பூமித்ரா, அல்லது FPO கூட்டமைப்பு' : 'e.g. South Pole, Boomitra, or Regional FPO Federation'}
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl bg-[#F4F1EA] border border-[#E0D8C8] text-[#2C3626] focus:outline-none focus:ring-1 focus:ring-[#2D4A22]"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-[#1A2E11] mb-1">
                  {isTamil ? 'வணிக மின்னஞ்சல் *' : 'Institutional Work Email *'}
                </label>
                <input
                  type="email"
                  required
                  placeholder="carbon.origination@firm.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl bg-[#F4F1EA] border border-[#E0D8C8] text-[#2C3626] focus:outline-none focus:ring-1 focus:ring-[#2D4A22]"
                />
              </div>

              {/* Project Target */}
              <div>
                <label className="block text-xs font-bold text-[#1A2E11] mb-1">
                  {isTamil ? 'இலக்கு கார்பன் சான்றிதழ் தரநிலை' : 'Target Carbon Standard'}
                </label>
                <select
                  value={projectType}
                  onChange={(e) => setProjectType(e.target.value as any)}
                  className="w-full text-xs p-3 rounded-xl bg-[#F4F1EA] border border-[#E0D8C8] text-[#2C3626] focus:outline-none focus:ring-1 focus:ring-[#2D4A22]"
                >
                  <option value="Verra ARR (VM0047)">Verra VCS VM0047 (Afforestation/Reforestation)</option>
                  <option value="Gold Standard">Gold Standard for the Global Goals (GS4GG)</option>
                  <option value="Indian Carbon Market (CCTS)">Indian Carbon Credit Trading Scheme (BEE / CCTS)</option>
                </select>
              </div>

              {/* Checkboxes */}
              <div className="space-y-2 pt-2 text-xs">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeGisLayers}
                    onChange={(e) => setIncludeGisLayers(e.target.checked)}
                    className="mt-0.5 rounded text-[#2D4A22] focus:ring-[#2D4A22]"
                  />
                  <span className="text-[#2C3626]">
                    {isTamil ? 'மாவட்ட GIS எல்லை அடுக்குகள் & கன்வர்ஸ் பாலிகான் வரைபடங்களை இணைக்கவும்' : 'Include district GIS boundary layers & convex hull shapefile specs'}
                  </span>
                </label>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={includeFarmerConsent}
                    onChange={(e) => setIncludeFarmerConsent(e.target.checked)}
                    className="mt-0.5 rounded text-[#2D4A22] focus:ring-[#2D4A22]"
                  />
                  <span className="text-[#2C3626]">
                    {isTamil ? 'சரிபார்க்கப்பட்ட FPO முன்-ஒப்பந்தம் & விவசாயி ஆர்வப் பதிவுகளை உள்ளடக்கவும்' : 'Include verified FPO pre-consents and anonymized land registry records'}
                  </span>
                </label>
              </div>

              {/* Privacy Notice */}
              <div className="p-3 rounded-xl bg-[#F4F1EA] border border-[#E0D8C8] text-[11px] text-[#6D7A65] flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#8BA888] shrink-0" />
                <span>
                  {isTamil
                    ? 'விவசாயிகளின் பட்டா விவரங்கள் மற்றும் தனிப்பட்ட தகவல்கள் சட்டப்பூர்வ ஒப்பந்தம் கையெழுத்தாகும் வரை மறைக்கப்படுகின்றன.'
                    : 'Farmer contact numbers and patta survey numbers are redacted until mutual non-circumvention terms are executed.'}
                </span>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-[#6D7A65] hover:text-[#1A2E11]"
                >
                  {isTamil ? 'ரத்து' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#2D4A22] hover:bg-[#3D5C31] text-[#F1F5EF] text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                >
                  <span>{isTamil ? 'உடனடி ஆய்வுப் பேக் கோரிக்கை' : 'Request Instant Origination Pack'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-5 text-center py-4">
              <div className="w-12 h-12 rounded-full bg-[#E9EDC9] text-[#2D4A22] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <div>
                <h4 className="text-lg font-bold text-[#1A2E11] font-serif">
                  {isTamil ? 'ஆய்வுப் பேக் தயார் செய்யப்பட்டுள்ளது!' : 'Origination Pack Generated!'}
                </h4>
                <p className="text-xs text-[#6D7A65] mt-1 max-w-sm mx-auto">
                  {isTamil
                    ? `உங்கள் கோரிக்கை பதிவு செய்யப்பட்டுள்ளது. குறிப்பு எண்: ${requestReference}`
                    : `Your institutional request has been logged under reference ${requestReference}.`}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#CCD5AE] text-left text-xs space-y-2">
                <div className="font-bold text-[#1A2E11]">
                  {isTamil ? 'தொகுப்பில் உள்ளவை:' : 'Bundle Contents Ready for Export:'}
                </div>
                <div className="flex items-center gap-2 text-[#2D4A22]">
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>{cluster.name} {isTamil ? 'கார்பன் மாதிரி கணக்கீட்டு தாள்' : 'Allometric Growth Model Sheet'}</span>
                </div>
                <div className="flex items-center gap-2 text-[#2D4A22]">
                  <Layers className="w-4 h-4" />
                  <span>{cluster.totalAcreage} {isTamil ? 'ஏக்கர் GIS எல்லைகள்' : 'Acres Boundary JSON / Convex Hull'}</span>
                </div>
                <div className="flex items-center gap-2 text-[#2D4A22]">
                  <Sparkles className="w-4 h-4" />
                  <span>{cluster.qualifiedFarmersCount} {isTamil ? 'சரிபார்க்கப்பட்ட விவசாய நிலப் பதிவுகள்' : 'Anonymized Qualified Land Records'}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleDownloadSpec}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#2D4A22] hover:bg-[#3D5C31] text-[#F1F5EF] text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <Download className="w-4 h-4" />
                  <span>{isTamil ? 'JSON விவரக்குறிப்பைப் பதிவிறக்கு' : 'Download Specification JSON'}</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#F4F1EA] hover:bg-[#E0D8C8] text-[#2C3626] text-xs font-bold"
                >
                  {isTamil ? 'நிறைவு' : 'Close'}
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
