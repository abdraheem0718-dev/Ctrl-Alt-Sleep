import React, { useState } from 'react';
import { FarmerProfile, FarmerPlot } from '../../types/greenvest';
import { DEMO_FARMERS } from '../../data/authProfiles';
import { Language, TRANSLATIONS } from '../../utils/translations';
import {
  User,
  CheckCircle2,
  Sprout,
  Plus,
  ArrowRight,
  Phone,
  MapPin,
  X,
  Sparkles,
  Layers,
  Award,
  Edit3,
  Trash2,
  AlertTriangle
} from 'lucide-react';

export interface FarmerRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentFarmer: FarmerProfile;
  allFarmers?: FarmerProfile[];
  farmersList?: FarmerProfile[];
  onSelectFarmer: (farmer: FarmerProfile) => void;
  onRegisterFarmer?: (newFarmer: FarmerProfile) => void;
  onRegisterNewFarmer?: (newFarmer: FarmerProfile) => void;
  onUpdateFarmerProfile?: (updated: Partial<FarmerProfile>) => void;
  onDeleteFarmer?: (farmerId: string) => void;
  language?: Language;
}

export const FarmerRegistrationModal: React.FC<FarmerRegistrationModalProps> = ({
  isOpen,
  onClose,
  currentFarmer,
  allFarmers,
  farmersList,
  onSelectFarmer,
  onRegisterFarmer,
  onRegisterNewFarmer,
  onUpdateFarmerProfile,
  onDeleteFarmer,
  language = 'en'
}) => {
  const isTamil = language === 'ta';
  const t = TRANSLATIONS[language];

  // Robust fallback for farmer list
  const effectiveFarmers: FarmerProfile[] = (allFarmers && Array.isArray(allFarmers) && allFarmers.length > 0)
    ? allFarmers
    : ((farmersList && Array.isArray(farmersList) && farmersList.length > 0) ? farmersList : DEMO_FARMERS);

  const [mode, setMode] = useState<'switch' | 'edit' | 'new'>('switch');
  const [farmerToDelete, setFarmerToDelete] = useState<FarmerProfile | null>(null);

  // Quick Edit active farmer profile
  const [editName, setEditName] = useState(currentFarmer?.name || '');
  const [editPhone, setEditPhone] = useState(currentFarmer?.phone || '');
  const [editVillage, setEditVillage] = useState(currentFarmer?.village || '');
  const [editDistrict, setEditDistrict] = useState(currentFarmer?.district || 'Coimbatore');
  const [editState, setEditState] = useState(currentFarmer?.state || 'Tamil Nadu');

  // New farmer registration form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+91 9');
  const [state, setState] = useState('Tamil Nadu');
  const [district, setDistrict] = useState('Coimbatore');
  const [village, setVillage] = useState('');
  const [initialPlotName, setInitialPlotName] = useState('Main Farmland Parcel');
  const [initialSurveyNo, setInitialSurveyNo] = useState('');
  const [initialArea, setInitialArea] = useState('4.0');
  const [initialSoil, setInitialSoil] = useState('Red Loam (Semman)');
  const [initialWater, setInitialWater] = useState<'Rainfed' | 'Moderate' | 'High / Canal' | 'Drip-equipped'>('Moderate');
  const [upiId, setUpiId] = useState('');

  if (!isOpen) return null;

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    if (!cleanName) return;

    const newId = `GV-F-${Math.floor(1000 + Math.random() * 9000)}`;
    const areaNum = parseFloat(initialArea) || 3.0;

    const initialPlot: FarmerPlot = {
      id: `plot-${Date.now()}`,
      name: initialPlotName.trim() || 'Main Farmland Parcel',
      surveyNo: initialSurveyNo.trim() || `SF-${Math.floor(100 + Math.random() * 900)}/1A`,
      pattaNo: `PT-${Math.floor(1000 + Math.random() * 9000)}`,
      landArea: areaNum,
      state,
      district,
      village: village.trim() || 'Gram Panchayat',
      soilType: initialSoil,
      waterAvailability: initialWater,
      currentLandUse: 'Active Annual Crops',
      preferredTreeType: 'High-Value Timber',
      plantingModel: 'Agri-Silviculture (Trees + Crops)',
      carbonPriceScenario: 'Baseline (₹1,500/t)',
      status: 'Screened',
      createdAt: new Date().toISOString().split('T')[0]
    };

    const newProfile: FarmerProfile = {
      id: newId,
      name: cleanName,
      phone: phone.trim() || '+91 98400 00000',
      state,
      district,
      village: village.trim() || 'Gram Panchayat',
      landArea: areaNum,
      surveyNo: initialPlot.surveyNo,
      soilType: initialSoil,
      waterAvailability: initialWater,
      assignedCluster: `${district} Agroforestry Cluster`,
      status: 'Registered for Cohort',
      assignedOfficer: 'S. Rajesh (Regional Extension Agronomist)',
      officerContact: '+91 94432 10892',
      lastUpdated: new Date().toISOString().split('T')[0],
      upiId: upiId.trim() || `${cleanName.toLowerCase().replace(/\s+/g, '')}@upi`,
      plots: [initialPlot]
    };

    const handler = onRegisterFarmer || onRegisterNewFarmer;
    if (handler) {
      handler(newProfile);
    }
    onClose();
  };

  const handleQuickEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName.trim()) return;
    if (onUpdateFarmerProfile) {
      onUpdateFarmerProfile({
        name: editName.trim(),
        phone: editPhone.trim(),
        village: editVillage.trim(),
        district: editDistrict.trim(),
        state: editState.trim()
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-[#E2E8D8] max-h-[92vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#2D4A22] text-white flex items-center justify-center shadow-md">
              <Sprout className="w-5 h-5 text-[#86EFAC]" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold font-serif text-[#1A2E11]">
                {isTamil ? 'உழவர் போர்ட்டல் கணக்கு' : 'Farmer Portal Account'}
              </h2>
              <p className="text-xs text-neutral-500">
                {isTamil ? 'உங்கள் விவரங்களுடன் பதிவு செய்து உங்கள் நிலங்களை நிர்வகிக்கவும்' : 'Register with your name or select an active farmer profile'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle: Select Existing, Quick Edit, or Register New */}
        <div className="flex rounded-xl bg-[#F0F4EC] p-1 mt-4 mb-5 border border-[#E2E8D8] gap-1">
          <button
            type="button"
            onClick={() => setMode('switch')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              mode === 'switch'
                ? 'bg-white text-[#2D4A22] shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>{isTamil ? 'உழவர் சுயவிவரங்கள்' : 'Active Profiles'} ({effectiveFarmers.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('edit')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              mode === 'edit'
                ? 'bg-white text-[#2D4A22] shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isTamil ? 'என் பெயரை மாற்று' : 'Edit My Name'}</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('new')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              mode === 'new'
                ? 'bg-white text-[#2D4A22] shadow-sm'
                : 'text-neutral-600 hover:text-neutral-900'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{isTamil ? '+ புதிய பதிவு' : '+ Register New'}</span>
          </button>
        </div>

        {/* Switch Existing Farmer */}
        {mode === 'switch' && (
          <div className="space-y-3">
            {/* Explanatory Banner answering why Murugan is default */}
            <div className="p-3 bg-[#EBF3E6] border border-[#CDE0C3] rounded-2xl text-xs text-[#1E3615] flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-[#2D4A22] text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5 font-bold">
                ℹ️
              </div>
              <div className="space-y-1">
                <p className="font-bold text-[#1A2E11]">
                  {isTamil
                    ? 'முன்னிருப்பு சுயவிவரம் பற்றிய குறிப்பு:'
                    : 'Why is Murugan S. pre-loaded as default?'}
                </p>
                <p className="text-[#3F5B35] leading-relaxed text-[11px]">
                  {isTamil
                    ? 'முருகன் எஸ். கோயம்புத்தூர் கொங்கு வேளாண் வனவியல் மண்டலத்தின் 2 மாதிரி நிலங்களுடன் முன்-மாதிரியாக ஏற்றப்பட்டுள்ளது. நீங்கள் கீழ் உள்ள பிற சுயவிவரங்களை தேர்ந்தெடுக்கலாம் அல்லது "என் பெயரை மாற்று" மூலம் உங்கள் சொந்த பெயரை உடனடியாக அமைக்கலாம்.'
                    : 'Murugan S. is pre-loaded as a calibrated reference farm (Kongu Agroforestry Cluster, Coimbatore) with 2 sample parcels. You can switch to other regional farmers below, click "Edit My Name" to set your real name, or register a new farm.'}
                </p>
              </div>
            </div>

            <p className="text-xs text-neutral-500 mb-1">
              {isTamil
                ? 'உடனடியாக ஒரு உழவர் கணக்கை தேர்ந்தெடுக்க கிளிக் செய்யவும்:'
                : 'Click any enrolled farmer to instantly load their parcels, carbon model, and passbook:'}
            </p>

            {/* Confirmation Box for Account Deletion */}
            {farmerToDelete && (
              <div className="p-4 mb-3 rounded-2xl bg-red-50 border border-red-200 text-red-950 animate-in fade-in">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center text-red-600 shrink-0 mt-0.5">
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div className="flex-1 text-xs">
                    <h4 className="font-bold text-sm text-red-900">
                      {isTamil ? 'உழவர் கணக்கை நீக்க விரும்புகிறீர்களா?' : 'Delete Farmer Account?'}
                    </h4>
                    <p className="text-red-800 mt-1">
                      {isTamil
                        ? `"${farmerToDelete.name}" (${farmerToDelete.id}) கணக்கை நிரந்தரமாக நீக்கவா? அவரது அனைத்து நிலங்கள் மற்றும் கார்பன் தரவுகளும் நீக்கப்படும்.`
                        : `Permanently delete "${farmerToDelete.name}" (${farmerToDelete.id})? This will remove all associated registered farmland plots and carbon records.`}
                    </p>
                    {effectiveFarmers.length <= 1 && (
                      <p className="mt-1.5 text-red-700 font-semibold">
                        {isTamil
                          ? '⚠️ ஒரே ஒரு உழவர் கணக்கு மட்டுமே உள்ளதால் இதை நீக்க முடியாது.'
                          : '⚠️ Cannot delete the only remaining farmer profile. At least one profile must exist.'}
                      </p>
                    )}
                    <div className="flex items-center gap-2 mt-3">
                      <button
                        type="button"
                        disabled={effectiveFarmers.length <= 1}
                        onClick={() => {
                          onDeleteFarmer?.(farmerToDelete.id);
                          setFarmerToDelete(null);
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{isTamil ? 'ஆம், நீக்கு' : 'Yes, Delete Account'}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setFarmerToDelete(null)}
                        className="px-3 py-1.5 rounded-xl bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-300 font-medium text-xs cursor-pointer transition-colors"
                      >
                        {isTamil ? 'ரத்துசெய்' : 'Cancel'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
              {effectiveFarmers.map((f) => {
                const isCurrent = f.id === currentFarmer.id;
                const plotCount = (f.plots && Array.isArray(f.plots)) ? f.plots.length : 1;
                const totalArea = (f.plots && Array.isArray(f.plots) && f.plots.length > 0)
                  ? f.plots.reduce((acc, p) => acc + (Number(p?.landArea) || 0), 0)
                  : (Number(f.landArea) || 0);

                return (
                  <div
                    key={f.id}
                    onClick={() => {
                      onSelectFarmer(f);
                      onClose();
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                      isCurrent
                        ? 'bg-[#F4F8F0] border-[#2D4A22] ring-2 ring-[#2D4A22]'
                        : 'bg-white hover:bg-neutral-50 border-neutral-200 hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                        isCurrent ? 'bg-[#2D4A22] text-white' : 'bg-neutral-100 text-neutral-700 group-hover:bg-[#2D4A22] group-hover:text-white transition-colors'
                      }`}>
                        {f.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-[#1A2E11]">{f.name}</h4>
                          {isCurrent && (
                            <span className="px-2 py-0.5 rounded-full bg-[#E3F2D9] text-[#2D4A22] text-[10px] font-bold">
                              {isTamil ? 'தற்போதைய' : 'Active'}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-neutral-500 mt-0.5">
                          {f.village ? `${f.village}, ` : ''}{f.district}, {f.state}
                        </p>
                        <div className="flex items-center gap-3 text-[11px] text-[#4A5D44] mt-1 font-medium">
                          <span>{totalArea.toFixed(1)} {isTamil ? 'ஏக்கர்' : 'Acres'}</span>
                          <span>•</span>
                          <span>{plotCount} {plotCount === 1 ? 'Plot' : 'Plots'}</span>
                          <span>•</span>
                          <span className="text-neutral-500 font-mono">{f.id}</span>
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 pl-2 flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectFarmer(f);
                          onClose();
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                          isCurrent
                            ? 'bg-[#2D4A22] text-white'
                            : 'bg-neutral-100 text-neutral-700 group-hover:bg-[#2D4A22] group-hover:text-white'
                        }`}
                      >
                        {isCurrent ? (isTamil ? 'தேர்வு' : 'Active') : (isTamil ? 'திறக்க' : 'Select')}
                      </button>

                      {onDeleteFarmer && (
                        <button
                          type="button"
                          id={`btn-delete-farmer-${f.id}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            setFarmerToDelete(f);
                          }}
                          title={isTamil ? 'உழவர் கணக்கை நீக்கு' : 'Delete farmer profile'}
                          className="p-2 rounded-xl text-neutral-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-all cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-neutral-100 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setMode('edit')}
                className="text-xs font-bold text-[#2D4A22] hover:underline flex items-center gap-1"
              >
                <Edit3 className="w-3.5 h-3.5" />
                {isTamil ? 'தற்போதைய பெயரை மாற்று' : 'Personalize Current Profile Name'}
              </button>
              <button
                type="button"
                onClick={() => setMode('new')}
                className="text-xs font-bold text-[#2D4A22] hover:underline flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                {isTamil ? 'புதிய உழவர் கணக்கை உருவாக்கு' : 'Create New Profile'}
              </button>
            </div>
          </div>
        )}

        {/* Quick Edit Current Profile */}
        {mode === 'edit' && (
          <form onSubmit={handleQuickEditSubmit} className="space-y-4 text-sm">
            <div className="p-3.5 bg-[#F6F9F2] rounded-xl border border-[#DFEBD6] text-xs text-[#2D4A22]">
              <p className="font-bold mb-0.5">
                {isTamil ? '✏️ உங்கள் பெயரை தனிப்பயனாக்குங்கள்' : '✏️ Personalize Your Farmer Profile'}
              </p>
              <p className="text-[#4A5D44]">
                {isTamil
                  ? 'முருகன் எஸ். என்பதற்கு பதிலாக உங்கள் சொந்த பெயரை உள்ளிட்டு சேமிக்கவும். உங்களின் தற்போதைய நில அமைப்புகள் மற்றும் கணக்கீடுகள் பாதுகாக்கப்படும்.'
                  : 'Replace "Murugan S." with your own name, phone, or village. Your active plots, calibrated tree density, and carbon projections will be retained under your name.'}
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                {isTamil ? 'உழவர் முழுப் பெயர் (Your Full Name)' : 'Farmer Full Name'} *
              </label>
              <input
                type="text"
                required
                placeholder="e.g., Hisanjith S."
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-[#2D4A22] focus:border-[#2D4A22] outline-none font-medium"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {isTamil ? 'கைபேசி எண் (Mobile / WhatsApp)' : 'Mobile Phone'}
                </label>
                <input
                  type="tel"
                  placeholder="+91 98400 12345"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-[#2D4A22] outline-none text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {isTamil ? 'கிராமம் (Village / Panchayat)' : 'Village / Panchayat'}
                </label>
                <input
                  type="text"
                  placeholder="e.g., Pollachi"
                  value={editVillage}
                  onChange={(e) => setEditVillage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-[#2D4A22] outline-none text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {isTamil ? 'மாநிலம் (State)' : 'State'}
                </label>
                <select
                  value={editState}
                  onChange={(e) => setEditState(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-[#2D4A22] outline-none text-xs"
                >
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Maharashtra">Maharashtra</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {isTamil ? 'மாவட்டம் (District)' : 'District'}
                </label>
                <input
                  type="text"
                  required
                  value={editDistrict}
                  onChange={(e) => setEditDistrict(e.target.value)}
                  placeholder="e.g., Coimbatore"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-[#2D4A22] outline-none text-xs"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-2.5">
              {onDeleteFarmer ? (
                <button
                  type="button"
                  onClick={() => {
                    setFarmerToDelete(currentFarmer);
                    setMode('switch');
                  }}
                  className="px-3.5 py-2 rounded-xl text-red-600 hover:bg-red-50 border border-red-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{isTamil ? 'இந்த கணக்கை நீக்கு' : 'Delete Account'}</span>
                </button>
              ) : <div />}

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMode('switch')}
                  className="px-4 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 hover:bg-neutral-50 text-xs font-medium cursor-pointer transition-colors"
                >
                  {isTamil ? 'ரத்துசெய்' : 'Back to Profiles'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#2D4A22] hover:bg-[#203418] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>{isTamil ? 'சுயவிவரத்தை புதுப்பிக்கவும்' : 'Update Profile Name'}</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Register New Farmer Form */}
        {mode === 'new' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-4 text-sm">
            <div className="p-3 bg-[#F6F9F2] rounded-xl border border-[#DFEBD6] text-xs text-[#2D4A22]">
              <p className="font-semibold mb-0.5">
                {isTamil ? '🌾 நேரடி கார்பன் வருமான உழவர் பதிவு' : '🌾 Direct Carbon Income Enrollment'}
              </p>
              <p className="text-[#4A5D44]">
                {isTamil
                  ? 'உங்கள் பெயர் மற்றும் முதல் நில விவரங்களை உள்ளிடவும். உங்களின் 100% இலவச கன்றுகள் & வருமானம் உடனடியாக கணக்கிடப்படும்.'
                  : 'Enter your name and initial farmland parcel. Your carbon potential, species recommendations, and direct payout schedule will be generated instantly.'}
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                {isTamil ? 'உழவர் முழுப் பெயர் (Farmer Full Name)' : 'Farmer Full Name'} *
              </label>
              <input
                type="text"
                required
                placeholder="e.g., K. Anbazhagan"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-[#2D4A22] focus:border-[#2D4A22] outline-none font-medium"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {isTamil ? 'கைபேசி எண் (Mobile / WhatsApp)' : 'Mobile Phone'} *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98400 12345"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-[#2D4A22] outline-none font-mono text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {isTamil ? 'கிராமம் (Village / Panchayat)' : 'Village / Panchayat'}
                </label>
                <input
                  type="text"
                  placeholder="e.g., Alandurai"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-[#2D4A22] outline-none text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {isTamil ? 'மாநிலம் (State)' : 'State'}
                </label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-[#2D4A22] outline-none text-xs"
                >
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Maharashtra">Maharashtra</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {isTamil ? 'மாவட்டம் (District)' : 'District'}
                </label>
                <input
                  type="text"
                  required
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="e.g., Coimbatore"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-[#2D4A22] outline-none text-xs"
                />
              </div>
            </div>

            {/* Initial Plot Information */}
            <div className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-3">
              <span className="text-xs font-bold text-[#1A2E11] block flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#2D4A22]" />
                {isTamil ? 'முதல் நிலத்தின் விவரங்கள் (Initial Farmland Parcel)' : 'Initial Farmland Parcel Details'}
              </span>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                    {isTamil ? 'சர்வே எண் (Survey No)' : 'Survey Number'}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., SF-302/1"
                    value={initialSurveyNo}
                    onChange={(e) => setInitialSurveyNo(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-neutral-300 font-mono text-xs focus:ring-2 focus:ring-[#2D4A22] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                    {isTamil ? 'நிலப்பரப்பு (ஏக்கர்)' : 'Land Area (Acres)'} *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.5"
                    max="100"
                    required
                    value={initialArea}
                    onChange={(e) => setInitialArea(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-neutral-300 font-bold text-xs text-[#1A2E11] focus:ring-2 focus:ring-[#2D4A22] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                    {isTamil ? 'மண் வகை' : 'Soil Type'}
                  </label>
                  <select
                    value={initialSoil}
                    onChange={(e) => setInitialSoil(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-neutral-300 text-xs focus:ring-2 focus:ring-[#2D4A22] outline-none"
                  >
                    <option value="Red Loam (Semman)">Red Loam (Semman)</option>
                    <option value="Black Cotton (Karisal)">Black Cotton (Karisal)</option>
                    <option value="Alluvial (Vandaloor)">Alluvial (Vandaloor)</option>
                    <option value="Laterite / Gravelly">Laterite / Gravelly</option>
                    <option value="Sandy Loam">Sandy Loam</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-neutral-600 mb-1">
                    {isTamil ? 'பாசனம்' : 'Water Availability'}
                  </label>
                  <select
                    value={initialWater}
                    onChange={(e) => setInitialWater(e.target.value as any)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-neutral-300 text-xs focus:ring-2 focus:ring-[#2D4A22] outline-none"
                  >
                    <option value="Moderate">Moderate (Borewell/Well)</option>
                    <option value="High / Canal">High (Canal/River)</option>
                    <option value="Rainfed">Rainfed (Dryland)</option>
                    <option value="Drip-equipped">Drip-equipped</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                {isTamil ? 'நேரடி வங்கி பரிமாற்றத்திற்கான UPI ID (விருப்பத்தேர்வு)' : 'Direct Benefit UPI ID for Annual Carbon Payouts (Optional)'}
              </label>
              <input
                type="text"
                placeholder="e.g., farmername@oksbi"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-[#2D4A22] outline-none font-mono text-xs"
              />
            </div>

            <div className="pt-4 border-t border-neutral-100 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setMode('switch')}
                className="px-4 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 hover:bg-neutral-50 text-xs font-medium"
              >
                {isTamil ? 'பின்செல்' : 'Back to Profiles'}
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#2D4A22] hover:bg-[#203418] text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 active:scale-95"
              >
                <span>{isTamil ? 'பதிவு செய்க & போர்ட்டலைத் திறக்க' : 'Complete Registration & Open Portal'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
