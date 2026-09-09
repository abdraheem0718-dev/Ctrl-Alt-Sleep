import React, { useState } from 'react';
import { UserRole, FarmerProfile, EmployeeProfile } from '../../types/greenvest';
import { DEMO_FARMERS, DEMO_EMPLOYEES } from '../../data/authProfiles';
import { Language, TRANSLATIONS } from '../../utils/translations';
import {
  Sprout,
  Building2,
  CheckCircle2,
  ShieldCheck,
  UserCheck,
  Briefcase,
  ArrowRight,
  Phone,
  Mail,
  Lock,
  X,
  Sparkles,
  TreeDeciduous,
  Scale,
  TrendingUp,
  FileCheck2,
  LogOut,
  ChevronRight
} from 'lucide-react';

interface LoginPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentRole: UserRole;
  currentFarmer: FarmerProfile;
  currentEmployee: EmployeeProfile;
  onSelectFarmer: (farmer: FarmerProfile) => void;
  onSelectEmployee: (employee: EmployeeProfile) => void;
  language?: Language;
}

export const LoginPortalModal: React.FC<LoginPortalModalProps> = ({
  isOpen,
  onClose,
  currentRole,
  currentFarmer,
  currentEmployee,
  onSelectFarmer,
  onSelectEmployee,
  language = 'en'
}) => {
  const [selectedRoleTab, setSelectedRoleTab] = useState<UserRole>(currentRole);
  const [farmerPhone, setFarmerPhone] = useState('');
  const [farmerName, setFarmerName] = useState('');
  const [employeeEmail, setEmployeeEmail] = useState('');
  const [employeeCode, setEmployeeCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);

  if (!isOpen) return null;

  const isTamil = language === 'ta';

  const handleCustomFarmerLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!farmerPhone && !farmerName) {
      setAuthError('Please enter your Mobile Number or Name');
      return;
    }

    if (!otpSent) {
      setOtpSent(true);
      setOtpInput('8841'); // Auto-populate demo OTP for smooth testing
      return;
    }

    // Successfully authenticate
    const customFarmer: FarmerProfile = {
      id: `GV-F-${Math.floor(1000 + Math.random() * 9000)}`,
      name: farmerName.trim() || 'Farmer (User)',
      phone: farmerPhone.trim() || '+91 98400 11223',
      state: 'Tamil Nadu',
      district: 'Coimbatore',
      village: 'Field Parcel',
      landArea: 5.0,
      surveyNo: 'SF-77/A',
      soilType: 'Red Loam (Semman)',
      waterAvailability: 'Moderate',
      assignedCluster: 'Kongu Semi-Arid Timber Belt (CL-TN-KONGU-02)',
      status: 'Registered for Cohort',
      assignedOfficer: 'Rajesh Varma (Field Agronomist, Ext. #402)',
      officerContact: '+91 94432 10892',
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    onSelectFarmer(customFarmer);
    onClose();
  };

  const handleCustomEmployeeLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeEmail) {
      setAuthError('Please enter your GreenVest corporate email');
      return;
    }

    const customEmployee: EmployeeProfile = {
      id: 'GV-EMP-88',
      name: employeeEmail.split('@')[0].replace('.', ' ').toUpperCase() || 'Carbon Analyst',
      email: employeeEmail.trim(),
      title: 'Project Development Specialist',
      department: 'Carbon Origination & Methodology',
      badge: 'Institutional Staff',
      assignedRegion: 'Pan-India Operations',
      permissions: ['aggregator_admin', 'verra_signoff', 'document_audit', 'finance_model']
    };

    onSelectEmployee(customEmployee);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#FDFBF7] rounded-3xl border border-[#E0D8C8] shadow-2xl overflow-hidden my-6">
        
        {/* Modal Header */}
        <div className="bg-[#12220e] text-[#F1F5EF] p-5 sm:p-6 border-b border-[#8BA888]/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-900/80 border border-emerald-500/40 flex items-center justify-center text-emerald-300 shadow-md">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-emerald-400 tracking-wider uppercase">
                  {language === 'ta' ? 'அணுகல் கட்டுப்பாடு & போர்ட்டல்' : 'GreenVest Identity & Access Portal'}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-serif text-white">
                  {language === 'ta' ? 'போர்ட்டலைத் தேர்வுசெய்க' : 'Select Portal & Sign In'}
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Role Tab Switcher Bar */}
          <div className="grid grid-cols-2 gap-2 mt-5 p-1 bg-black/40 rounded-2xl border border-white/10">
            <button
              type="button"
              onClick={() => {
                setSelectedRoleTab('farmer');
                setAuthError(null);
              }}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedRoleTab === 'farmer'
                  ? 'bg-gradient-to-r from-[#2F5224] to-[#427033] text-white shadow-md border border-emerald-400/40'
                  : 'text-[#A2BA9F] hover:text-white hover:bg-white/5'
              }`}
            >
              <Sprout className="w-4 h-4 text-emerald-300" />
              <span>{language === 'ta' ? 'விவசாயி போர்ட்டல்' : 'Farmer Portal'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedRoleTab('employee');
                setAuthError(null);
              }}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedRoleTab === 'employee'
                  ? 'bg-gradient-to-r from-[#1A2E11] to-[#254619] text-white shadow-md border border-emerald-400/40'
                  : 'text-[#A2BA9F] hover:text-white hover:bg-white/5'
              }`}
            >
              <Building2 className="w-4 h-4 text-emerald-300" />
              <span>{language === 'ta' ? 'கிரீன்வெஸ்ட் ஊழியர்' : 'GreenVest Employee'}</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6">

          {authError && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
              {authError}
            </div>
          )}

          {/* 1. FARMER PORTAL LOGIN VIEW */}
          {selectedRoleTab === 'farmer' && (
            <div className="space-y-5">
              {/* Value Proposition Box */}
              <div className="p-4 rounded-2xl bg-[#E9EDC9]/40 border border-[#CCD5AE] text-xs text-[#2D4A22] space-y-2">
                <div className="font-bold flex items-center gap-2 text-sm text-[#1A2E11]">
                  <Sprout className="w-4 h-4 text-[#2D4A22]" />
                  <span>
                    {language === 'ta'
                      ? 'விவசாயிகளுக்கான எளிய கார்பன் போர்ட்டல்'
                      : 'Farmer-Centric Portal (Clean & Focused)'}
                  </span>
                </div>
                <p className="text-[#4A5D3E] leading-relaxed">
                  {language === 'ta'
                    ? 'உங்கள் நிலத்துக்கான கார்பன் வருமானம், பட்டா ஆவண சரிபார்ப்பு, மற்றும் இலவச கன்றுகளுக்கான கார்பன் பாஸ்புக் மட்டுமே இதில் இருக்கும். குழப்பமான வணிக அல்லது அறிவியல் கணிப்புகள் இல்லை.'
                    : 'Tailored specifically for landowners: Calculate carbon income, verify Patta/Chitta titles, and download your official Carbon Passbook. B2B aggregator and complex math are hidden for a clean experience.'}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                  <span className="flex items-center gap-1.5 font-semibold text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2D4A22]" />
                    {language === 'ta' ? 'கார்பன் வருமானம் (₹)' : 'Real INR Earnings'}
                  </span>
                  <span className="flex items-center gap-1.5 font-semibold text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2D4A22]" />
                    {language === 'ta' ? 'பட்டா நில ஆவணங்கள்' : 'Patta Land Records'}
                  </span>
                  <span className="flex items-center gap-1.5 font-semibold text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#2D4A22]" />
                    {language === 'ta' ? 'கார்பன் பாஸ்புக்' : 'Passbook & PDF'}
                  </span>
                </div>
              </div>

              {/* Quick 1-Click Demo Farmer Profiles */}
              <div>
                <label className="block text-xs font-bold text-[#1A2E11] uppercase tracking-wider mb-2">
                  {language === 'ta' ? 'விரைவு விவசாயி சுயவிவரங்கள் (1-கிளிக்)' : 'Instant Demo Farmer Profiles (1-Click Login)'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {DEMO_FARMERS.map((f) => {
                    const isCurrent = currentRole === 'farmer' && currentFarmer.id === f.id;
                    return (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => {
                          onSelectFarmer(f);
                          onClose();
                        }}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isCurrent
                            ? 'bg-[#E9EDC9] border-[#2D4A22] shadow-sm ring-2 ring-[#2D4A22]/30'
                            : 'bg-white hover:bg-[#F4F1EA] border-[#E0D8C8] hover:border-[#CCD5AE]'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs text-[#1A2E11]">{f.name}</span>
                            {isCurrent && (
                              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#2D4A22] text-white font-bold">
                                Active
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-[#6D7A65] mt-0.5">
                            {f.landArea} ac • {f.district}
                          </p>
                          <p className="text-[10px] text-[#8BA888] font-mono mt-0.5">
                            {f.surveyNo}
                          </p>
                        </div>
                        <div className="mt-2.5 pt-2 border-t border-[#E0D8C8]/60 flex items-center justify-between text-[10px] font-bold text-[#2D4A22]">
                          <span>{f.status}</span>
                          <ArrowRight className="w-3 h-3 text-[#2D4A22]" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Or Custom Mobile/Name Login */}
              <div className="p-4 rounded-2xl bg-white border border-[#E0D8C8]">
                <span className="block text-xs font-bold text-[#1A2E11] uppercase tracking-wider mb-2">
                  {language === 'ta' ? 'அல்லது மொபைல் எண் மூலம் உள்நுழைக' : 'Or Sign In with Mobile Number / Farmer ID'}
                </span>

                <form onSubmit={handleCustomFarmerLogin} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#6D7A65] mb-1">
                        {language === 'ta' ? 'விவசாயி பெயர்' : 'Farmer Name'}
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Ramasamy M."
                        value={farmerName}
                        onChange={(e) => setFarmerName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-[#CCD5AE] bg-[#FDFBF7] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#2D4A22]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#6D7A65] mb-1">
                        {language === 'ta' ? 'மொபைல் எண்' : 'Mobile Number'}
                      </label>
                      <div className="relative">
                        <Phone className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#8BA888]" />
                        <input
                          type="tel"
                          placeholder="+91 98401 XXXXX"
                          value={farmerPhone}
                          onChange={(e) => setFarmerPhone(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#CCD5AE] bg-[#FDFBF7] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#2D4A22]"
                        />
                      </div>
                    </div>
                  </div>

                  {otpSent && (
                    <div className="p-3 rounded-xl bg-[#E9EDC9]/50 border border-[#CCD5AE] space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-[#2D4A22]">
                          {language === 'ta' ? 'OTP குறியீடு அனுப்பப்பட்டது' : 'Demo OTP Sent (Auto-Filled)'}
                        </span>
                        <span className="font-mono text-xs font-bold text-[#1A2E11]">8841</span>
                      </div>
                      <input
                        type="text"
                        placeholder="Enter 4-digit OTP"
                        value={otpInput}
                        onChange={(e) => setOtpInput(e.target.value)}
                        className="w-full px-3 py-1.5 rounded-lg border border-[#CCD5AE] bg-white text-xs font-mono font-bold tracking-widest text-center"
                      />
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl bg-[#1A2E11] hover:bg-[#2D4A22] text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>
                      {otpSent
                        ? (language === 'ta' ? 'உள்நுழைக (போர்ட்டல் திற)' : 'Verify OTP & Open Farmer Portal')
                        : (language === 'ta' ? 'OTP பெறுக & உள்நுழைக' : 'Get OTP & Open Farmer Portal')}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* 2. GREENVEST EMPLOYEE PORTAL LOGIN VIEW */}
          {selectedRoleTab === 'employee' && (
            <div className="space-y-5">
              {/* Value Proposition Box */}
              <div className="p-4 rounded-2xl bg-emerald-950/10 border border-emerald-800/20 text-xs text-[#1A2E11] space-y-2">
                <div className="font-bold flex items-center gap-2 text-sm text-[#1A2E11]">
                  <Building2 className="w-4 h-4 text-emerald-800" />
                  <span>
                    {language === 'ta'
                      ? 'கிரீன்வெஸ்ட் நிறுவன ஊழியர் & திட்ட உருவாக்குநர் போர்ட்டல்'
                      : 'GreenVest Institutional Employee & Project Developer Hub'}
                  </span>
                </div>
                <p className="text-[#3E5235] leading-relaxed">
                  {language === 'ta'
                    ? 'விவசாயிகள் ஒருங்கிணைப்பு போர்ட்டல், வெர்ரா VM0047 ARR கழிவு மாதிரி, மான்டே கார்லோ 30-ஆண்டு இடர் மாதிரி, மற்றும் பட்டா தணிக்கை கருவிகள் அனைத்தும் இதில் கிடைக்கும்.'
                    : 'Full access to B2B Aggregation cohorts (114k+ acres), Verra VM0047 ARR biomass & leakage deduction models, 30-year Monte Carlo risk simulations, and title deed audit verification.'}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[11px] font-semibold text-emerald-900">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    B2B Aggregator
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    Verra VM0047
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    30Y Monte Carlo
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                    Deed Auditing
                  </span>
                </div>
              </div>

              {/* Quick 1-Click Demo Employee Profiles */}
              <div>
                <label className="block text-xs font-bold text-[#1A2E11] uppercase tracking-wider mb-2">
                  {language === 'ta' ? 'ஊழியர் சுயவிவரங்கள் (1-கிளிக் உள்நுழைவு)' : 'Institutional Staff Profiles (1-Click Login)'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {DEMO_EMPLOYEES.map((emp) => {
                    const isCurrent = currentRole === 'employee' && currentEmployee.id === emp.id;
                    return (
                      <button
                        key={emp.id}
                        type="button"
                        onClick={() => {
                          onSelectEmployee(emp);
                          onClose();
                        }}
                        className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                          isCurrent
                            ? 'bg-[#1A2E11] text-white border-emerald-400 shadow-md ring-2 ring-emerald-500/30'
                            : 'bg-white hover:bg-[#F4F1EA] border-[#E0D8C8] hover:border-emerald-700/40 text-[#1A2E11]'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-xs">{emp.name}</span>
                            <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${
                              isCurrent ? 'bg-emerald-500 text-black' : 'bg-emerald-100 text-emerald-900'
                            }`}>
                              {emp.badge}
                            </span>
                          </div>
                          <p className={`text-[11px] mt-1 font-medium ${isCurrent ? 'text-emerald-200' : 'text-[#6D7A65]'}`}>
                            {emp.title}
                          </p>
                          <p className={`text-[10px] mt-0.5 font-mono ${isCurrent ? 'text-emerald-300/80' : 'text-[#8BA888]'}`}>
                            {emp.email}
                          </p>
                        </div>
                        <div className={`mt-3 pt-2 border-t flex items-center justify-between text-[10px] font-bold ${
                          isCurrent ? 'border-white/10 text-emerald-300' : 'border-[#E0D8C8] text-emerald-900'
                        }`}>
                          <span>{emp.assignedRegion}</span>
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Custom Corporate Employee Login */}
              <div className="p-4 rounded-2xl bg-white border border-[#E0D8C8]">
                <span className="block text-xs font-bold text-[#1A2E11] uppercase tracking-wider mb-2">
                  {language === 'ta' ? 'அல்லது நிறுவன மின்னஞ்சல் மூலம் உள்நுழைக' : 'Or Sign In with Corporate Email & PIN'}
                </span>

                <form onSubmit={handleCustomEmployeeLogin} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#6D7A65] mb-1">
                        Corporate Email
                      </label>
                      <div className="relative">
                        <Mail className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#8BA888]" />
                        <input
                          type="email"
                          placeholder="officer@greenvest.eco"
                          value={employeeEmail}
                          onChange={(e) => setEmployeeEmail(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#CCD5AE] bg-[#FDFBF7] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#1A2E11]"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#6D7A65] mb-1">
                        Security PIN / Employee Code
                      </label>
                      <div className="relative">
                        <Lock className="w-3.5 h-3.5 absolute left-3 top-2.5 text-[#8BA888]" />
                        <input
                          type="password"
                          placeholder="••••••••"
                          value={employeeCode}
                          onChange={(e) => setEmployeeCode(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#CCD5AE] bg-[#FDFBF7] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#1A2E11]"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl bg-[#12220e] hover:bg-[#1A2E11] text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>
                      {language === 'ta'
                        ? 'ஊழியர் போர்ட்டலைத் திற'
                        : 'Sign In to GreenVest Employee Hub'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-300" />
                  </button>
                </form>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#F4F1EA] border-t border-[#E0D8C8] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-[#6D7A65]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              Active: {currentRole === 'farmer' ? `👨‍🌾 Farmer (${currentFarmer.name})` : `🏢 Staff (${currentEmployee.name})`}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-full bg-white hover:bg-neutral-100 border border-[#CCD5AE] text-[#1A2E11] font-semibold text-xs cursor-pointer"
          >
            {language === 'ta' ? 'மூடு' : 'Close'}
          </button>
        </div>

      </div>
    </div>
  );
};
