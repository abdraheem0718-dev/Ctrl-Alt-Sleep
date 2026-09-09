import React, { useState, useEffect } from 'react';
import { FarmerInputs, FeasibilityAssessment } from '../types/greenvest';
import { QualifiedFarmerRecord } from '../data/aggregationClusters';
import { Language, TRANSLATIONS } from '../utils/translations';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Building2,
  Lock,
  ArrowRight,
  Printer,
  Sparkles,
  MapPin,
  ExternalLink,
  Download,
  Loader2,
  Check
} from 'lucide-react';
import { downloadDossierPdf } from '../utils/pdfGenerator';

interface FarmerRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  inputs: FarmerInputs;
  assessment: FeasibilityAssessment;
  onSuccess: (newRecord: QualifiedFarmerRecord) => void;
  onNavigateToAggregator: () => void;
  onOpenDossier?: (record?: QualifiedFarmerRecord) => void;
  language?: Language;
}

export const FarmerRegisterModal: React.FC<FarmerRegisterModalProps> = ({
  isOpen,
  onClose,
  inputs,
  assessment,
  onSuccess,
  onNavigateToAggregator,
  onOpenDossier,
  language = 'en'
}) => {
  const isTamil = language === 'ta';
  const isMalayalam = language === 'ml';
  const isKannada = language === 'kn';
  const isTelugu = language === 'te';

  const [farmerName, setFarmerName] = useState('');
  const [phone, setPhone] = useState('');
  const [villageTaluk, setVillageTaluk] = useState('');
  const [pattaSurveyNo, setPattaSurveyNo] = useState('');
  const [submittedRecord, setSubmittedRecord] = useState<QualifiedFarmerRecord | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setSubmittedRecord(null);
      setFarmerName('');
      setPhone('');
      setVillageTaluk('');
      setPattaSurveyNo('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Derive cluster name based on state and district
  const clusterCode = (() => {
    const d = inputs.district.toLowerCase();
    if (d.includes('palakkad') || d.includes('wayanad') || d.includes('idukki') || d.includes('thrissur') || inputs.state === 'Kerala') {
      return 'CL-KL-WESTGHAT-05';
    }
    if (d.includes('mysuru') || d.includes('chamarajanagar') || inputs.state === 'Karnataka') {
      return 'CL-KA-DECCAN-04';
    }
    if (d.includes('thanjavur') || d.includes('cuddalore') || d.includes('nagapattinam')) {
      return 'CL-TN-DELTA-01';
    }
    if (d.includes('coimbatore') || d.includes('erode') || d.includes('tiruppur')) {
      return 'CL-TN-KONGU-02';
    }
    if (d.includes('madurai') || d.includes('tirunelveli') || d.includes('dindigul')) {
      return 'CL-TN-SOUTH-03';
    }
    return 'CL-TN-NORTH-04';
  })();

  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);
  const [pdfDownloaded, setPdfDownloaded] = useState(false);

  const handleDownloadRegisteredPdf = async () => {
    if (!submittedRecord) return;
    setIsDownloadingPdf(true);
    try {
      const ok = await downloadDossierPdf({
        assessment,
        registeredFarmer: submittedRecord,
        language: (language || 'en') as Language
      });
      if (ok) {
        setPdfDownloaded(true);
        setTimeout(() => setPdfDownloaded(false), 3500);
      }
    } catch (e) {
      console.error('PDF generation error:', e);
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newId = `GV-F-${randomSuffix}`;
    const defaultFarmerTitle = isTamil ? 'விவசாயி' : isMalayalam ? 'കർഷകൻ' : isKannada ? 'ರೈತ' : isTelugu ? 'రైతు' : 'Farmer';
    const displayName = farmerName.trim()
      ? `${farmerName.trim()} (${villageTaluk || inputs.district})`
      : `${defaultFarmerTitle} ${inputs.district} (#${randomSuffix})`;

    const speciesNames = assessment.recommendedSpecies.map(s => (isTamil && s.tamilName ? s.tamilName : s.name)).slice(0, 2).join(' + ');

    const defaultSpeciesMix = isTamil ? 'உகந்த மரக் கலவை' : isMalayalam ? 'അനുയോജ്യമായ തടി മരങ്ങൾ' : isKannada ? 'ಸೂಕ್ತ ಮರದ ಮಿಶ್ರಣ' : isTelugu ? 'అనుకూల కలప మిశ్రమం' : 'Optimized Native Timber';
    const screenedDateLabel = isTamil ? 'இப்போது' : isMalayalam ? 'ഇപ്പോൾ' : isKannada ? 'ಈಗಷ್ಟೇ' : isTelugu ? 'ఇప్పుడే' : 'Just now';

    const newFarmerRecord: QualifiedFarmerRecord = {
      id: newId,
      farmerNamePseudonym: displayName,
      district: `${inputs.district}, ${inputs.state}`,
      landArea: Number(inputs.landArea),
      soilType: inputs.soilType,
      waterAvailability: inputs.waterAvailability,
      speciesMix: speciesNames || defaultSpeciesMix,
      projected10YrTonnes: assessment?.sequestration10Year?.p50 || 0,
      projectedNetInr: assessment?.netPotential10Year
        ? `₹${(assessment.netPotential10Year.p10 / 100000).toFixed(1)}L – ₹${(assessment.netPotential10Year.p90 / 100000).toFixed(1)}L`
        : '₹1.5L – ₹3.2L',
      confidence: assessment?.confidence ? `${assessment.confidence} (${assessment.confidenceScore}%)` : 'High (82%)',
      dateScreened: screenedDateLabel,
      interestStatus: 'Registered for Cohort'
    };

    // Save to localStorage
    try {
      const existing = localStorage.getItem('greenvest_registered_farmers');
      const list: QualifiedFarmerRecord[] = existing ? JSON.parse(existing) : [];
      list.unshift(newFarmerRecord);
      localStorage.setItem('greenvest_registered_farmers', JSON.stringify(list));
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('greenvest_farmer_registered', { detail: newFarmerRecord }));
    } catch {
      // localStorage fallback
    }

    setSubmittedRecord(newFarmerRecord);
    onSuccess(newFarmerRecord);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#E0D8C8]">
        
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-[#F4F1EA] flex items-center justify-between z-10">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-2xl bg-[#F4F1EA] text-[#2D4A22] flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#1A2E11] font-serif">
                {submittedRecord
                  ? (isTamil ? 'நிலப் பதிவு உறுதி செய்யப்பட்டது' : 'Parcel Registration Confirmed')
                  : (isTamil ? 'உருவாக்குநர் கூட்டமைப்பில் சேர பதிவு' : 'Register for Developer Aggregation')}
              </h3>
              <p className="text-xs text-[#6D7A65]">
                {submittedRecord
                  ? (isTamil ? 'ஒதுக்கப்பட்ட குழுமம்: ' + clusterCode : 'Assigned to Cluster ' + clusterCode)
                  : (isTamil ? 'பிராந்திய விவசாயக் கூட்டமைப்பில் இலவச சேர்க்கை' : 'Free enrollment into regional farmer cohort')}
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
          {submittedRecord ? (
            <div className="space-y-5 text-center py-3">
              <div className="w-14 h-14 rounded-full bg-[#E9EDC9] text-[#2D4A22] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-xl font-bold text-[#1A2E11] font-serif">
                  {isTamil ? 'உங்கள் நிலம் வெற்றிகரமாக பதிவு செய்யப்பட்டது!' : 'Your Land Parcel is Enrolled!'}
                </h4>
                <p className="text-xs text-[#6D7A65] mt-1 max-w-sm mx-auto">
                  {isTamil
                    ? `பதிவு அடையாள எண்: ${submittedRecord.id}. உங்கள் ${inputs.landArea} ஏக்கர் நிலம் ${inputs.district} குழுமத்துடன் இணைக்கப்பட்டுள்ளது.`
                    : `Assigned Record ID: ${submittedRecord.id}. Your ${inputs.landArea} acres is now aggregated into the ${inputs.district} pipeline.`}
                </p>
              </div>

              {/* Summary box */}
              <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#CCD5AE] text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#6D7A65]">{isTamil ? 'குழுமம்:' : 'Aggregation Cluster:'}</span>
                  <span className="font-bold text-[#1A2E11]">{clusterCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6D7A65]">{isTamil ? 'விவசாயி / இடம்:' : 'Farmer / Village:'}</span>
                  <span className="font-semibold text-[#1A2E11]">{submittedRecord.farmerNamePseudonym}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6D7A65]">{isTamil ? 'நிலப்பரப்பு:' : 'Parcel Acreage:'}</span>
                  <span className="font-bold text-[#1A2E11]">{inputs.landArea} {isTamil ? 'ஏக்கர்' : 'Acres'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6D7A65]">{isTamil ? 'மதிப்பிடப்பட்ட 10-ஆண்டு கார்பன்:' : 'Projected 10-Yr Sequestration:'}</span>
                  <span className="font-bold text-[#2D4A22]">{assessment.sequestration10Year.p50} t CO₂e</span>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 pt-2">
                {/* Print and PDF Download Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
                  <button
                    id="btn-save-enrolled-pdf"
                    onClick={handleDownloadRegisteredPdf}
                    disabled={isDownloadingPdf}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#2D4A22] hover:bg-[#1E3615] text-[#F1F5EF] text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isDownloadingPdf ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>{isTamil ? 'PDF சேமிக்கப்படுகிறது...' : 'Generating PDF...'}</span>
                      </>
                    ) : pdfDownloaded ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-300" />
                        <span>{isTamil ? 'PDF பதிவிறக்கப்பட்டது!' : 'PDF Saved!'}</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        <span>{isTamil ? 'பதிவு ஆவணத்தை சேமி (.pdf)' : 'Save Parcel Dossier (.pdf)'}</span>
                      </>
                    )}
                  </button>

                  <button
                    id="btn-print-enrolled-dossier"
                    onClick={() => {
                      onClose();
                      onOpenDossier?.(submittedRecord);
                    }}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#F4F1EA] hover:bg-[#E0D8C8] text-[#2C3626] text-xs font-bold flex items-center justify-center gap-2 border border-[#CCD5AE] transition-all cursor-pointer shadow-xs"
                  >
                    <Printer className="w-4 h-4 text-[#2D4A22]" />
                    <span>{isTamil ? 'அச்சிடு / ஆவணம் காண்க' : 'Print / View Dossier'}</span>
                  </button>
                </div>

                {/* Secondary navigation and close */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-1">
                  <button
                    onClick={() => {
                      onClose();
                      onNavigateToAggregator();
                    }}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white hover:bg-[#FDFBF7] text-[#2D4A22] text-xs font-semibold border border-[#E0D8C8] flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>{isTamil ? 'குழும பதிவுப் பட்டியலைக் காண்க' : 'View in Live Cohort Directory'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white hover:bg-[#F4F1EA] text-[#6D7A65] text-xs font-medium border border-[#E0D8C8] transition-colors"
                  >
                    {isTamil ? 'நிறைவு' : 'Close'}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Parcel Quick Context Card */}
              <div className="p-3.5 rounded-2xl bg-[#FDFBF7] border border-[#E0D8C8] flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] text-[#8BA888] uppercase font-bold block">
                    {isTamil ? 'முன்-ஆய்வு செய்யப்பட்ட நிலம்:' : 'Pre-Screened Parcel:'}
                  </span>
                  <span className="font-bold text-[#1A2E11]">
                    {inputs.landArea} {isTamil ? 'ஏக்கர்' : 'Acres'} ({inputs.district}, {inputs.state})
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-[#8BA888] uppercase font-bold block">
                    {isTamil ? '10-ஆண்டு சேமிப்பு (P50):' : '10-Yr Sink (P50):'}
                  </span>
                  <span className="font-bold text-[#2D4A22]">{assessment.sequestration10Year.p50} t CO₂e</span>
                </div>
              </div>

              {/* Farmer Name */}
              <div>
                <label className="block text-xs font-bold text-[#1A2E11] mb-1">
                  {isTamil ? 'விவசாயி / நில உரிமையாளர் பெயர் *' : 'Farmer / Landholder Name *'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={isTamil ? 'எ.கா., ஆர். சுப்பிரமணியன்' : 'e.g. R. Subramanian'}
                  value={farmerName}
                  onChange={(e) => setFarmerName(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl bg-[#F4F1EA] border border-[#E0D8C8] text-[#2C3626] focus:outline-none focus:ring-1 focus:ring-[#2D4A22]"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold text-[#1A2E11] mb-1">
                  {isTamil ? 'தொடர்பு எண் (SMS மற்றும் FPO ஒருங்கிணைப்புக்கு) *' : 'Contact Mobile (for verification SMS & FPO connect) *'}
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl bg-[#F4F1EA] border border-[#E0D8C8] text-[#2C3626] focus:outline-none focus:ring-1 focus:ring-[#2D4A22]"
                />
              </div>

              {/* Village & Taluk */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#1A2E11] mb-1">
                    {isTamil ? 'கிராமம் / தாலுகா' : 'Village / Taluk'}
                  </label>
                  <input
                    type="text"
                    placeholder={isTamil ? 'எ.கா., பொள்ளாச்சி தெற்கு' : 'e.g. Pollachi South'}
                    value={villageTaluk}
                    onChange={(e) => setVillageTaluk(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl bg-[#F4F1EA] border border-[#E0D8C8] text-[#2C3626] focus:outline-none focus:ring-1 focus:ring-[#2D4A22]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1A2E11] mb-1">
                    {isTamil ? 'பட்டா / சர்வே எண் (விருப்பத்தேர்வு)' : 'Patta / Survey No (Optional)'}
                  </label>
                  <input
                    type="text"
                    placeholder={isTamil ? 'எ.கா., SF 142/2B' : 'e.g. SF 142/2B'}
                    value={pattaSurveyNo}
                    onChange={(e) => setPattaSurveyNo(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl bg-[#F4F1EA] border border-[#E0D8C8] text-[#2C3626] focus:outline-none focus:ring-1 focus:ring-[#2D4A22]"
                  />
                </div>
              </div>

              {/* Privacy Notice */}
              <div className="p-3.5 rounded-2xl bg-[#F4F1EA] border border-[#E0D8C8] text-[11px] text-[#6D7A65] flex items-start gap-2">
                <Lock className="w-4 h-4 text-[#8BA888] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#1A2E11]">
                    {isTamil ? 'விவசாயி தனியுரிமை உத்தரவாதம்: ' : 'Farmer Privacy Shield: '}
                  </strong>
                  {isTamil
                    ? 'உங்கள் பெயர் பொதுப் பதிவேட்டில் மறைக்கப்படும் (எ.கா. "விவசாயி கோயம்புத்தூர் #4291"). சான்றளிக்கப்பட்ட திட்ட உருவாக்குநர்களுக்கு மட்டுமே நேரடி ஒப்பந்தம் செய்யப்படும்.'
                    : 'Your personal name and contact will appear anonymized in the public registry (e.g. "Farmer Coimbatore #4291"). Only verified project developers can request contact through GreenVest.'}
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-[#6D7A65] hover:text-[#1A2E11]"
                >
                  {isTamil ? 'ரத்து' : isMalayalam ? 'റദ്ദാക്കുക' : isKannada ? 'ರದ್ದುಮಾಡಿ' : isTelugu ? 'రద్దు చేయి' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#2D4A22] hover:bg-[#3D5C31] text-[#F1F5EF] text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                >
                  <span>
                    {isTamil
                      ? 'இலவச குழுமப் பதிவை உறுதி செய்'
                      : isMalayalam
                      ? 'സൗജന്യ രജിസ്ട്രേഷൻ സ്ഥിരീകരിക്കുക'
                      : isKannada
                      ? 'ಉಚಿತ ನೋಂದಣಿಯನ್ನು ದೃಢೀಕರಿಸಿ'
                      : isTelugu
                      ? 'ఉచిత నమోదును నిర్ధారించండి'
                      : 'Confirm Free Cohort Registration'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
