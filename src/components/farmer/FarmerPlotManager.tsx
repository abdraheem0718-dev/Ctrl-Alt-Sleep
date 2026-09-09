import React, { useState } from 'react';
import { FarmerProfile, FarmerPlot } from '../../types/greenvest';
import { Language, TRANSLATIONS } from '../../utils/translations';
import {
  MapPin,
  Sprout,
  Plus,
  CheckCircle2,
  Trash2,
  Edit3,
  Layers,
  X,
  User,
  AlertTriangle,
  Landmark
} from 'lucide-react';

interface FarmerPlotManagerProps {
  farmer: FarmerProfile;
  plots?: FarmerPlot[];
  activePlotId: string;
  onSelectPlot: (plotId: string) => void;
  onAddPlot: (plot: Omit<FarmerPlot, 'id' | 'createdAt'>) => void;
  onUpdatePlot?: (plotId: string, updated: Partial<FarmerPlot>) => void;
  onDeletePlot: (plotId: string) => void;
  onDeleteFarmer?: (farmerId: string) => void;
  onOpenFarmerModal?: () => void;
  onOpenRegisterModal?: () => void;
  onNavigateToTab?: (tab: 'farmer' | 'monte-carlo' | 'documents' | 'passbook' | 'schemes') => void;
  language?: Language;
}

// Complete 5-Language Dictionary for Plot Manager
const PLOT_STRINGS: Record<string, Record<Language, string>> = {
  verifiedFarmer: {
    en: 'Verified Farmer',
    ta: 'உறுதிப்படுத்தப்பட்ட உழவர்',
    ml: 'സ്ഥിരീകരിച്ച കർഷകൻ',
    kn: 'ಪರಿಶೀಲಿಸಿದ ರೈತ',
    te: 'ధృవీకరించబడిన రైతు'
  },
  switchFarmer: {
    en: 'Switch / Register Farmer',
    ta: 'உழவர் மாற்றம் / புதிய பதிவு',
    ml: 'കർഷകനെ മാറ്റുക / പുതിയ രജിസ്ട്രേഷൻ',
    kn: 'ರೈತರನ್ನು ಬದಲಾಯಿಸಿ / ನೋಂದಾಯಿಸಿ',
    te: 'రైతును మార్చండి / నమోదు చేయండి'
  },
  deleteFarmerAccount: {
    en: 'Delete Farmer Account',
    ta: 'உழவர் கணக்கை நீக்கு',
    ml: 'കർഷക അക്കൗണ്ട് നീക്കം ചെയ്യുക',
    kn: 'ರೈತರ ಖಾತೆಯನ್ನು ಅಳಿಸಿ',
    te: 'రైతు ఖాతాను తొలగించండి'
  },
  deleteFarmerConfirmTitle: {
    en: 'Delete Farmer Account?',
    ta: 'உழவர் கணக்கை நீக்க விரும்புகிறீர்களா?',
    ml: 'കർഷക അക്കൗണ്ട് നീക്കം ചെയ്യണോ?',
    kn: 'ರೈತರ ಖಾತೆಯನ್ನು ಅಳಿಸಲು ಖಚಿತವೇ?',
    te: 'రైతు ఖాతాను తొలగించాలనుకుంటున్నారా?'
  },
  deleteFarmerWarning: {
    en: 'This will permanently remove this farmer profile and all their registered farmland plots and carbon records. This action cannot be undone.',
    ta: 'இந்த உழவர் கணக்கு மற்றும் அவர்களின் அனைத்து நிலங்கள் மற்றும் கார்பன் பதிவுகள் நிரந்தரமாக நீக்கப்படும். இதை மீட்டெடுக்க முடியாது.',
    ml: 'ഈ കർഷക പ്രൊഫൈലും എല്ലാ രജിസ്റ്റർ ചെയ്ത കൃഷിഭൂമികളും ശാശ്വതമായി നീക്കം ചെയ്യപ്പെടും.',
    kn: 'ಈ ರೈತರ ಪ್ರೊಫೈಲ್ ಮತ್ತು ಅವರ ಎಲ್ಲಾ ನೋಂದಾಯಿತ ಜಮೀನುಗಳನ್ನು ಶಾಶ್ವತವಾಗಿ ಅಳಿಸಲಾಗುತ್ತದೆ.',
    te: 'ఈ రైతు ప్రొఫైల్ మరియు వారి అన్ని నమోదిత వ్యవసాయ భూములు శాశ్వతంగా తొలగించబడతాయి.'
  },
  addNewPlot: {
    en: '+ Add New Plot',
    ta: '+ புதிய நிலம் சேர்க்க',
    ml: '+ പുതിയ ഭൂമി ചേർക്കുക',
    kn: '+ ಹೊಸ ಜಮೀನು ಸೇರಿಸಿ',
    te: '+ కొత్త భూమిని జోడించండి'
  },
  myPlots: {
    en: 'My Farmland Plots',
    ta: 'என் நிலங்கள் & பிளாட்டுகள்',
    ml: 'എന്റെ കൃഷിഭൂമികൾ',
    kn: 'ನನ್ನ ಕೃಷಿ ಜಮೀನುಗಳು',
    te: 'నా వ్యవసాయ భూములు'
  },
  clickPlotHint: {
    en: 'Click a plot to analyze its carbon yield & eligibility',
    ta: 'பகுப்பாய்வு செய்ய ஒரு நிலத்தைத் தேர்ந்தெடுக்கவும்',
    ml: 'കാർബൺ വരുമാനം കാണാൻ ഭൂമി തിരഞ്ഞെടുക്കുക',
    kn: 'ಕಾರ್ಬನ್ ಆದಾಯ ವಿಶ್ಲೇಷಿಸಲು ಜಮೀನನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    te: 'కార్బన్ ఆదాయాన్ని విశ్లేషించడానికి భూమిని ఎంచుకోండి'
  },
  totalArea: {
    en: 'Total Area:',
    ta: 'மொத்த பரப்பு:',
    ml: 'ആകെ വിസ്തീർണ്ണം:',
    kn: 'ಒಟ್ಟು ವಿಸ್ತೀರ್ಣ:',
    te: 'మొత్తం విస్తీర్ణం:'
  },
  acresUnit: {
    en: 'Acres',
    ta: 'ஏக்கர்',
    ml: 'ഏക്കർ',
    kn: 'ಎಕರೆ',
    te: 'ఎకరాలు'
  },
  plotsCount: {
    en: 'Farmland Plots',
    ta: 'நிலங்கள் / பிளாட்டுகள்',
    ml: 'കൃഷിഭൂമികൾ',
    kn: 'ಕೃಷಿ ಜಮೀನುಗಳು',
    te: 'వ్యవసాయ భూములు'
  },
  surveyNoLabel: {
    en: 'Survey No:',
    ta: 'சர்வே எண்:',
    ml: 'സർവേ നമ്പർ:',
    kn: 'ಸರ್ವೇ ನಂ:',
    te: 'సర్వే నం:'
  },
  areaLabel: {
    en: 'Area:',
    ta: 'நிலப்பரப்பு:',
    ml: 'വിസ്തീർണ്ണം:',
    kn: 'ವಿಸ್ತೀರ್ಣ:',
    te: 'విస్తీర్ణం:'
  },
  soilLabel: {
    en: 'Soil Type:',
    ta: 'மண் வகை:',
    ml: 'മണ്ണ് ഇനം:',
    kn: 'ಮಣ್ಣಿನ ವಿಧ:',
    te: 'నేల రకం:'
  },
  waterLabel: {
    en: 'Water:',
    ta: 'பாசனம்:',
    ml: 'ജലലഭ്യത:',
    kn: 'ನೀರಿನ ಲಭ್ಯತೆ:',
    te: 'నీటి లభ్యత:'
  },
  activeBadge: {
    en: 'Active',
    ta: 'தேர்வு செய்யப்பட்டுள்ளது',
    ml: 'സജീവം',
    kn: 'ಸಕ್ರಿಯ',
    te: 'క్రియాశీలం'
  },
  editPlot: {
    en: 'Edit Plot',
    ta: 'திருத்து',
    ml: 'തിരുത്തുക',
    kn: 'ತಿದ್ದು',
    te: 'సవరించు'
  },
  deletePlot: {
    en: 'Delete Plot',
    ta: 'நீக்கு',
    ml: 'നീക്കം ചെയ്യുക',
    kn: 'ಅಳಿಸು',
    te: 'తొಲగించు'
  },
  registerAnotherPlot: {
    en: '+ Register Another Farmland Plot',
    ta: '+ புதிய நிலம் சேர்க்க',
    ml: '+ പുതിയ കൃഷിഭൂമി രജിസ്റ്റർ ചെയ്യുക',
    kn: '+ ಹೊಸ ಜಮೀನು ನೋಂದಾಯಿಸಿ',
    te: '+ కొత్త భూమిని నమోదు చేయండి'
  },
  surveyPattaSubtitle: {
    en: 'Survey No, Patta, & Acreage',
    ta: 'சர்வே எண், பட்டா, & பரப்பு',
    ml: 'സർവേ നമ്പർ, പട്ടയം, & വിസ്തീർണ്ണം',
    kn: 'ಸರ್ವೇ ನಂ, ಪಟ್ಟಾ, ಮತ್ತು ವಿಸ್ತೀರ್ಣ',
    te: 'సర్వే నం, పట్టా, & విస్తీర్ణం'
  },
  deleteModalTitle: {
    en: 'Delete Farmland Plot?',
    ta: 'நிலத்தை நீக்க விரும்புகிறீர்களா?',
    ml: 'കൃഷിഭൂമി നീക്കം ചെയ്യണമെന്നുണ്ടോ?',
    kn: 'ಕೃಷಿ ಜಮೀನನ್ನು ಅಳಿಸಲು ಬಯಸುವಿರಾ?',
    te: 'ఈ వ్యవసాయ భూమిని తొలగించాలనుకుంటున్నారా?'
  },
  deleteModalWarning: {
    en: 'This action will permanently delete this parcel and its associated analysis. This cannot be undone.',
    ta: 'இந்த நிலம் மற்றும் அதன் பகுப்பாய்வு விவரங்கள் நிரந்தரமாக நீக்கப்படும். இந்த செயலை மாற்ற முடியாது.',
    ml: 'ഈ കൃഷിഭൂമിയും അനുബന്ധ വിശകലന വിവരങ്ങളും ശാശ്വതമായി നീക്കം ചെയ്യപ്പെടും.',
    kn: 'ಈ ಜಮೀನು ಮತ್ತು ಸಂಬಂಧಿತ ವಿಶ್ಲೇಷಣೆ ಶಾಶ್ವತವಾಗಿ ಅಳಿಸಲ್ಪಡುತ್ತದೆ. ಇದನ್ನು ರದ್ದುಗೊಳಿಸಲಾಗುವುದಿಲ್ಲ.',
    te: 'ఈ భూమి మరియు సంబంధిత విశ్లేషణ శాశ్వతంగా తొలగించబడుతుంది. ఈ చర్యను రద్దు చేయలేరు.'
  },
  cancel: {
    en: 'Cancel',
    ta: 'ரத்து',
    ml: 'റദ്ദാക്കുക',
    kn: 'ರದ್ದು',
    te: 'రద్దు చేయి'
  },
  confirmDeleteBtn: {
    en: 'Yes, Delete Plot',
    ta: 'ஆம், நிலத்தை நீக்கு',
    ml: 'അതെ, നീക്കം ചെയ്യുക',
    kn: 'ಹೌದು, ಜಮೀನು ಅಳಿಸಿ',
    te: 'అవును, తొలగించండి'
  },
  addNewPlotModalTitle: {
    en: 'Register New Farmland Plot',
    ta: 'புதிய நிலத்தை பதிவு செய்க',
    ml: 'പുതിയ കൃഷിഭൂമി രജിസ്റ്റർ ചെയ്യുക',
    kn: 'ಹೊಸ ಕೃಷಿ ಜಮೀನು ನೋಂದಾಯಿಸಿ',
    te: 'కొత్త వ్యవసాయ భూమిని నమోదు చేయండి'
  },
  plotNameLabel: {
    en: 'Plot Name / Field Nickname',
    ta: 'நிலத்தின் பெயர் / அடையாளம்',
    ml: 'ഭൂമിയുടെ പേര് / അടയാളം',
    kn: 'ಜಮೀನಿನ ಹೆಸರು',
    te: 'భూమి పేరు / గుర్తు'
  },
  plotNamePlaceholder: {
    en: 'e.g., North Riverbank Parcel, Canal Field',
    ta: 'எ.கா. வடக்கு தோட்டம் அல்லது ஏரிக்கரை நிலம்',
    ml: 'ഉദാ., വടക്കേ വയൽ, പുഴക്കര പറമ്പ്',
    kn: 'ಉದಾ., ಉತ್ತರ ಹೊಲದ ಜಮೀನು, ಕಾಲುವೆ ಜಮೀನು',
    te: 'ఉదా., ఉత్తర నదీతీర భూమి, కాలువ పొలం'
  },
  surveyNumberLabel: {
    en: 'Survey Number',
    ta: 'சர்வே எண்',
    ml: 'സർവേ നമ്പർ',
    kn: 'ಸರ್ವೇ ಸಂಖ್ಯೆ',
    te: 'సర్వే నంబర్'
  },
  pattaNumberLabel: {
    en: 'Patta Number',
    ta: 'பட்டா எண்',
    ml: 'പട്ടയ നമ്പർ',
    kn: 'ಪಟ್ಟಾ ಸಂಖ್ಯೆ',
    te: 'పట్టా నంబర్'
  },
  landAreaLabel: {
    en: 'Land Area (Acres)',
    ta: 'நிலப்பரப்பு (ஏக்கர்)',
    ml: 'വിസ്തീർണ്ണം (ഏക്കർ)',
    kn: 'ವಿಸ್ತೀರ್ಣ (ಎಕರೆ)',
    te: 'విస్తీర్ణం (ఎకరాలు)'
  },
  soilTypeLabel: {
    en: 'Soil Type',
    ta: 'மண் வகை',
    ml: 'മണ്ണ് ഇനം',
    kn: 'ಮಣ್ಣಿನ ವಿಧ',
    te: 'నేల రకం'
  },
  waterAvailabilityLabel: {
    en: 'Water Availability',
    ta: 'பாசன வசதி',
    ml: 'ജലലഭ്യത',
    kn: 'ನೀರಿನ ಲಭ್ಯತೆ',
    te: 'నీటి లభ్యత'
  },
  treeObjectiveLabel: {
    en: 'Tree Species Objective',
    ta: 'மர வகை நோக்கம்',
    ml: 'മരങ്ങളുടെ ഇനം',
    kn: 'ಮರದ ಆದ್ಯತೆ',
    te: 'చెట్ల రకాల ప్రాధాన్యత'
  },
  plantingModelLabel: {
    en: 'Agroforestry Model',
    ta: 'நடவு முறை / மாதிரி',
    ml: 'കാർഷിക വനവൽക്കരണ മാതൃക',
    kn: 'ಕೃಷಿ ಅರಣ್ಯ ಮಾದರಿ',
    te: 'వ్యవసాయ అటవీ మోడల్'
  },
  saveAndAnalyzeBtn: {
    en: 'Save Plot & Run Analysis',
    ta: 'நிலத்தை சேர் & பகுப்பாய்வு செய்க',
    ml: 'ഭൂമി സേവ് ചെയ്ത് വിശകലനം നടത്തുക',
    kn: 'ಜಮೀನು ಉಳಿಸಿ ಮತ್ತು ವಿಶ್ಲೇಷಣೆ ನಡೆಸಿ',
    te: 'భూమిని సేవ్ చేసి విశ్లేషణ ప్రారంభించండి'
  },
  editPlotModalTitle: {
    en: 'Edit Farmland Plot Details',
    ta: 'நில விவரங்களை மாற்று',
    ml: 'ഭൂമിയുടെ വിവരങ്ങൾ മാറ്റുക',
    kn: 'ಜಮೀನಿನ ವಿವರಗಳನ್ನು ತಿದ್ದಿ',
    te: 'భూమి వివరాలను సవరించండి'
  },
  saveChangesBtn: {
    en: 'Save Changes',
    ta: 'மாற்றங்களை சேமி',
    ml: 'മാറ്റങ്ങൾ സേവ് ചെയ്യുക',
    kn: 'ಬದಲಾವಣೆಗಳನ್ನು ಉಳಿಸಿ',
    te: 'మార్పులను సేవ్ చేయండి'
  }
};

export const FarmerPlotManager: React.FC<FarmerPlotManagerProps> = ({
  farmer,
  plots: propPlots,
  activePlotId,
  onSelectPlot,
  onAddPlot,
  onUpdatePlot,
  onDeletePlot,
  onDeleteFarmer,
  onOpenFarmerModal,
  onOpenRegisterModal,
  onNavigateToTab,
  language = 'en'
}) => {
  const lang: Language = (language || 'en') as Language;
  const pStr = (key: string): string => PLOT_STRINGS[key]?.[lang] || PLOT_STRINGS[key]?.['en'] || key;
  const handleOpenModal = onOpenRegisterModal || onOpenFarmerModal || (() => {});

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPlot, setEditingPlot] = useState<FarmerPlot | null>(null);
  const [plotToDelete, setPlotToDelete] = useState<FarmerPlot | null>(null);
  const [isDeleteFarmerModalOpen, setIsDeleteFarmerModalOpen] = useState(false);

  // New plot form state
  const [plotName, setPlotName] = useState('');
  const [surveyNo, setSurveyNo] = useState('');
  const [pattaNo, setPattaNo] = useState('');
  const [landArea, setLandArea] = useState('3.0');
  const [state, setState] = useState(farmer.state || 'Tamil Nadu');
  const [district, setDistrict] = useState(farmer.district || 'Coimbatore');
  const [soilType, setSoilType] = useState('Red Loam (Semman)');
  const [waterAvailability, setWaterAvailability] = useState<'Rainfed' | 'Moderate' | 'High / Canal' | 'Drip-equipped'>('Moderate');
  const [currentLandUse, setCurrentLandUse] = useState<'Active Annual Crops' | 'Fallow / Degraded' | 'Agroforestry Boundary' | 'Orchard / Horticulture' | 'Pasture / Wasteland'>('Active Annual Crops');
  const [preferredTreeType, setPreferredTreeType] = useState<'Any / Optimized' | 'High-Value Timber' | 'Fast-Growing Biomass' | 'Multi-tier Horticulture' | 'Native Biodiversity'>('High-Value Timber');
  const [plantingModel, setPlantingModel] = useState<'Agri-Silviculture (Trees + Crops)' | 'Boundary / Bund Agroforestry' | 'Block Plantation'>('Agri-Silviculture (Trees + Crops)');

  const plots: FarmerPlot[] = (propPlots && Array.isArray(propPlots) && propPlots.length > 0)
    ? propPlots
    : (farmer.plots && Array.isArray(farmer.plots) && farmer.plots.length > 0)
      ? farmer.plots
      : [
          {
            id: 'plot-default',
            name: `${farmer.name}'s Field`,
            surveyNo: farmer.surveyNo || 'SF-101/A',
            pattaNo: 'PT-1001',
            landArea: farmer.landArea || 5,
            state: farmer.state || 'Tamil Nadu',
            district: farmer.district || 'Coimbatore',
            soilType: farmer.soilType || 'Red Loam (Semman)',
            waterAvailability: farmer.waterAvailability || 'Moderate',
            currentLandUse: 'Active Annual Crops',
            preferredTreeType: 'High-Value Timber',
            plantingModel: 'Agri-Silviculture (Trees + Crops)',
            carbonPriceScenario: 'Baseline (₹1,500/t)',
            status: 'Screened',
            createdAt: new Date().toISOString().split('T')[0]
          }
        ];

  const totalAcres = plots.reduce((acc, p) => acc + (Number(p?.landArea) || 0), 0);

  const resetForm = () => {
    setPlotName('');
    setSurveyNo('');
    setPattaNo('');
    setLandArea('3.0');
    setSoilType('Red Loam (Semman)');
    setWaterAvailability('Moderate');
  };

  const handleCreatePlotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const area = parseFloat(landArea) || 2.5;
    onAddPlot({
      name: plotName.trim() || `Plot ${plots.length + 1} (${surveyNo || 'Survey Field'})`,
      surveyNo: surveyNo.trim() || `SF-${Math.floor(100 + Math.random() * 900)}/A`,
      pattaNo: pattaNo.trim() || `PT-${Math.floor(1000 + Math.random() * 9000)}`,
      landArea: area,
      state,
      district,
      soilType,
      waterAvailability,
      currentLandUse,
      preferredTreeType,
      plantingModel,
      carbonPriceScenario: 'Baseline (₹1,500/t)',
      status: 'Screened'
    });
    setIsAddModalOpen(false);
    resetForm();
  };

  const handleEditPlotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlot) return;
    if (onUpdatePlot) {
      onUpdatePlot(editingPlot.id, {
        name: editingPlot.name,
        surveyNo: editingPlot.surveyNo,
        pattaNo: editingPlot.pattaNo,
        landArea: Number(editingPlot.landArea),
        soilType: editingPlot.soilType,
        waterAvailability: editingPlot.waterAvailability,
        currentLandUse: editingPlot.currentLandUse,
        preferredTreeType: editingPlot.preferredTreeType,
        plantingModel: editingPlot.plantingModel
      });
    }
    setEditingPlot(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8D8] shadow-sm overflow-hidden mb-6">
      {/* Farmer Summary Banner */}
      <div className="bg-gradient-to-r from-[#22391C] via-[#2D4A22] to-[#395F2B] text-white p-5 sm:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0 shadow-inner">
              <User className="w-6 h-6 text-[#A7D08C]" />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold font-serif tracking-tight text-[#F1F5EF]">
                  {farmer.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-[#3B662C] border border-[#52873E] text-xs font-medium text-[#E4F0D5] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#86EFAC]" />
                  {pStr('verifiedFarmer')}
                </span>
                <span className="text-xs text-white/70 font-mono bg-black/20 px-2 py-0.5 rounded">
                  {farmer.id}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-[#D7E3D0] mt-1 flex-wrap">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#A7D08C]" />
                  {farmer.village ? `${farmer.village}, ` : ''}{farmer.district}, {farmer.state}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-[#A7D08C]" />
                  {plots.length} {pStr('plotsCount')} ({totalAcres.toFixed(1)} {pStr('acresUnit')})
                </span>
              </div>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={handleOpenModal}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs sm:text-sm font-medium text-white transition-all flex items-center gap-1.5 backdrop-blur-sm cursor-pointer"
              title={pStr('switchFarmer')}
            >
              <User className="w-4 h-4 text-[#A7D08C]" />
              <span>{pStr('switchFarmer')}</span>
            </button>
            {onDeleteFarmer && (
              <button
                type="button"
                id="btn-delete-active-farmer"
                onClick={() => setIsDeleteFarmerModalOpen(true)}
                className="px-3 py-2 rounded-xl bg-red-900/40 hover:bg-red-800/60 border border-red-500/30 text-xs sm:text-sm font-medium text-red-100 transition-all flex items-center gap-1.5 backdrop-blur-sm cursor-pointer"
                title={pStr('deleteFarmerAccount')}
              >
                <Trash2 className="w-4 h-4 text-red-300" />
                <span className="hidden lg:inline">{pStr('deleteFarmerAccount')}</span>
              </button>
            )}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-[#689F38] hover:bg-[#5D8E32] text-white text-xs sm:text-sm font-semibold shadow-md transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{pStr('addNewPlot')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Plot Selector Bar */}
      <div className="p-4 sm:p-5 bg-[#F9FBF7] border-b border-[#E6EDE0]">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#2D4A22]" />
            <h2 className="text-sm font-bold text-[#1A2E11] uppercase tracking-wider">
              {pStr('myPlots')} ({plots.length})
            </h2>
            <span className="text-xs text-neutral-500 hidden sm:inline">
              — {pStr('clickPlotHint')}
            </span>
          </div>
          <span className="text-xs font-medium text-[#2D4A22] bg-[#E8F0E2] px-2.5 py-1 rounded-full border border-[#D5E3CD]">
            {pStr('totalArea')} <strong>{totalAcres.toFixed(1)} {pStr('acresUnit')}</strong>
          </span>
        </div>

        {/* Plot Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3">
          {plots.map((plot, idx) => {
            const isActive = plot.id === activePlotId;
            return (
              <div
                key={plot.id}
                onClick={() => onSelectPlot(plot.id)}
                className={`relative rounded-xl p-3.5 transition-all cursor-pointer border text-left flex flex-col justify-between ${
                  isActive
                    ? 'bg-white border-[#2D4A22] ring-2 ring-[#2D4A22] shadow-md'
                    : 'bg-white/80 hover:bg-white border-[#DCE4D5] hover:border-[#B5C9AA] shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        isActive ? 'bg-[#2D4A22] text-white' : 'bg-[#EAEFE6] text-[#4A5D44]'
                      }`}>
                        {idx + 1}
                      </span>
                      <h3 className="font-semibold text-sm text-[#1A2E11] line-clamp-1">
                        {plot.name}
                      </h3>
                    </div>
                    {isActive && (
                      <span className="px-2 py-0.5 rounded-full bg-[#EBF5E4] border border-[#86EFAC] text-[10px] font-bold text-[#2D4A22] uppercase tracking-wider shrink-0">
                        {pStr('activeBadge')}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-neutral-600 mt-2">
                    <div>
                      <span className="text-[10px] text-neutral-400 block">{pStr('surveyNoLabel')}</span>
                      <span className="font-medium font-mono text-[#2C3626]">{plot.surveyNo}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-400 block">{pStr('areaLabel')}</span>
                      <span className="font-bold text-[#1A2E11]">{plot.landArea} {pStr('acresUnit')}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-400 block">{pStr('soilLabel')}</span>
                      <span className="text-neutral-700 truncate block">{plot.soilType.split('(')[0]}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-neutral-400 block">{pStr('waterLabel')}</span>
                      <span className="text-neutral-700">{plot.waterAvailability}</span>
                    </div>
                  </div>

                  {/* Direct Link to State & Central Govt Schemes for this plot */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectPlot(plot.id);
                      if (onNavigateToTab) {
                        onNavigateToTab('schemes');
                      }
                    }}
                    className="mt-2.5 px-2.5 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100/90 border border-amber-200/80 text-amber-900 text-[11px] font-medium flex items-center justify-between transition-colors cursor-pointer"
                    title={`View ${plot.state} & Central Govt Schemes`}
                  >
                    <span className="flex items-center gap-1.5 truncate">
                      <Landmark className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span className="font-semibold truncate">{plot.state} & Central Schemes</span>
                    </span>
                    <span className="text-[10px] font-bold text-amber-900 bg-amber-200/70 px-1.5 py-0.5 rounded shrink-0 ml-1">
                      View &rarr;
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#EEF2E8] flex items-center justify-between text-xs">
                  <span className="text-[11px] text-emerald-800 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {plot.status || 'Screened'}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingPlot(plot);
                      }}
                      className="p-1 text-neutral-400 hover:text-[#2D4A22] hover:bg-[#F0F4EC] rounded transition-colors cursor-pointer"
                      title={pStr('editPlot')}
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    {plots.length > 1 && (
                      <button
                        type="button"
                        id={`btn-delete-plot-${plot.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setPlotToDelete(plot);
                        }}
                        className="p-1 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors cursor-pointer"
                        title={pStr('deletePlot')}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Add New Plot Quick Card */}
          <div
            onClick={() => setIsAddModalOpen(true)}
            className="rounded-xl p-4 border-2 border-dashed border-[#CFDAC6] hover:border-[#2D4A22] hover:bg-white bg-white/40 flex flex-col items-center justify-center text-center cursor-pointer transition-all min-h-[140px] group"
          >
            <div className="w-10 h-10 rounded-full bg-[#EBF3E6] group-hover:bg-[#2D4A22] text-[#2D4A22] group-hover:text-white flex items-center justify-center transition-all mb-2">
              <Plus className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#2D4A22] group-hover:text-[#1A2E11]">
              {pStr('registerAnotherPlot')}
            </span>
            <span className="text-[11px] text-neutral-500 mt-0.5">
              {pStr('surveyPattaSubtitle')}
            </span>
          </div>
        </div>
      </div>

      {/* IN-APP PLOT DELETION CONFIRMATION MODAL */}
      {plotToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-neutral-200">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-center text-[#1A2E11] mb-2">
              {pStr('deleteModalTitle')}
            </h3>
            <p className="text-xs text-center text-neutral-600 mb-2 font-medium">
              "{plotToDelete.name}" • {plotToDelete.landArea} {pStr('acresUnit')} • {plotToDelete.surveyNo}
            </p>
            <p className="text-xs text-center text-neutral-500 mb-6 leading-relaxed">
              {pStr('deleteModalWarning')}
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                id="btn-cancel-delete-plot"
                onClick={() => setPlotToDelete(null)}
                className="flex-1 px-4 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 hover:bg-neutral-50 text-xs font-semibold cursor-pointer transition-colors"
              >
                {pStr('cancel')}
              </button>
              <button
                type="button"
                id="btn-confirm-delete-plot"
                onClick={() => {
                  onDeletePlot(plotToDelete.id);
                  setPlotToDelete(null);
                }}
                className="flex-1 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md cursor-pointer transition-colors"
              >
                {pStr('confirmDeleteBtn')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Plot Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-neutral-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#EBF3E6] flex items-center justify-center text-[#2D4A22]">
                  <Sprout className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1A2E11]">
                    {pStr('addNewPlotModalTitle')}
                  </h3>
                  <p className="text-xs text-neutral-500">
                    {farmer.name} • {farmer.district}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePlotSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {pStr('plotNameLabel')} *
                </label>
                <input
                  type="text"
                  required
                  placeholder={pStr('plotNamePlaceholder')}
                  value={plotName}
                  onChange={(e) => setPlotName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-[#2D4A22] focus:border-[#2D4A22] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {pStr('surveyNumberLabel')} *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., SF-142/2B"
                    value={surveyNo}
                    onChange={(e) => setSurveyNo(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-[#2D4A22] focus:border-[#2D4A22] outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {pStr('pattaNumberLabel')}
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., PT-8821"
                    value={pattaNo}
                    onChange={(e) => setPattaNo(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-[#2D4A22] focus:border-[#2D4A22] outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {pStr('landAreaLabel')} *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.5"
                    max="100"
                    required
                    value={landArea}
                    onChange={(e) => setLandArea(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-[#2D4A22] focus:border-[#2D4A22] outline-none font-bold text-[#1A2E11]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {pStr('soilTypeLabel')}
                  </label>
                  <select
                    value={soilType}
                    onChange={(e) => setSoilType(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-[#2D4A22] focus:border-[#2D4A22] outline-none text-xs"
                  >
                    <option value="Red Loam (Semman)">Red Loam (Semman)</option>
                    <option value="Black Cotton (Karisal)">Black Cotton (Karisal)</option>
                    <option value="Alluvial (Vandaloor)">Alluvial (Vandaloor)</option>
                    <option value="Laterite / Gravelly">Laterite / Gravelly</option>
                    <option value="Sandy Loam">Sandy Loam</option>
                    <option value="Saline / Alkaline (Kalar)">Saline / Alkaline (Kalar)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {pStr('waterAvailabilityLabel')}
                  </label>
                  <select
                    value={waterAvailability}
                    onChange={(e) => setWaterAvailability(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-[#2D4A22] focus:border-[#2D4A22] outline-none text-xs"
                  >
                    <option value="Moderate">Moderate (Borewell / Open Well)</option>
                    <option value="High / Canal">High (Canal / Perennial River)</option>
                    <option value="Drip-equipped">Drip-equipped</option>
                    <option value="Rainfed">Rainfed (Dryland / Seasonal)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {pStr('treeObjectiveLabel')}
                  </label>
                  <select
                    value={preferredTreeType}
                    onChange={(e) => setPreferredTreeType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-[#2D4A22] focus:border-[#2D4A22] outline-none text-xs"
                  >
                    <option value="High-Value Timber">High-Value Timber (Teak, Melia)</option>
                    <option value="Fast-Growing Biomass">Fast-Growing Biomass (Casuarina, Subabul)</option>
                    <option value="Multi-tier Horticulture">Fruit & Agroforestry (Moringa, Mango)</option>
                    <option value="Any / Optimized">Any / Model Optimized</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {pStr('plantingModelLabel')}
                </label>
                <select
                  value={plantingModel}
                  onChange={(e) => setPlantingModel(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-[#2D4A22] focus:border-[#2D4A22] outline-none text-xs"
                >
                  <option value="Agri-Silviculture (Trees + Crops)">Agri-Silviculture (Trees + Crops - 80-120 trees/acre)</option>
                  <option value="Boundary / Bund Agroforestry">Boundary / Bund Agroforestry (30-50 trees/acre along field borders)</option>
                  <option value="Block Plantation">Block Plantation (Dedicated Timber - 300-400 trees/acre)</option>
                </select>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-neutral-300 text-neutral-700 hover:bg-neutral-50 text-xs font-medium cursor-pointer"
                >
                  {pStr('cancel')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#2D4A22] hover:bg-[#22391C] text-white text-xs font-bold shadow transition-all cursor-pointer"
                >
                  {pStr('saveAndAnalyzeBtn')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Plot Modal */}
      {editingPlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-neutral-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#EBF3E6] flex items-center justify-center text-[#2D4A22]">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1A2E11]">
                    {pStr('editPlotModalTitle')}
                  </h3>
                  <p className="text-xs text-neutral-500 font-mono">
                    {editingPlot.id} • {editingPlot.name}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditingPlot(null)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditPlotSubmit} className="space-y-4 text-sm">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  {pStr('plotNameLabel')}
                </label>
                <input
                  type="text"
                  required
                  value={editingPlot.name}
                  onChange={(e) => setEditingPlot({ ...editingPlot, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-[#2D4A22] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {pStr('surveyNumberLabel')}
                  </label>
                  <input
                    type="text"
                    required
                    value={editingPlot.surveyNo}
                    onChange={(e) => setEditingPlot({ ...editingPlot, surveyNo: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-[#2D4A22] outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {pStr('pattaNumberLabel')}
                  </label>
                  <input
                    type="text"
                    value={editingPlot.pattaNo || ''}
                    onChange={(e) => setEditingPlot({ ...editingPlot, pattaNo: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-[#2D4A22] outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {pStr('landAreaLabel')}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0.5"
                    max="100"
                    required
                    value={editingPlot.landArea}
                    onChange={(e) => setEditingPlot({ ...editingPlot, landArea: parseFloat(e.target.value) || 1 })}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-[#2D4A22] outline-none font-bold text-[#1A2E11]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    {pStr('soilTypeLabel')}
                  </label>
                  <select
                    value={editingPlot.soilType}
                    onChange={(e) => setEditingPlot({ ...editingPlot, soilType: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 focus:ring-2 focus:ring-[#2D4A22] outline-none text-xs"
                  >
                    <option value="Red Loam (Semman)">Red Loam (Semman)</option>
                    <option value="Black Cotton (Karisal)">Black Cotton (Karisal)</option>
                    <option value="Alluvial (Vandaloor)">Alluvial (Vandaloor)</option>
                    <option value="Laterite / Gravelly">Laterite / Gravelly</option>
                    <option value="Sandy Loam">Sandy Loam</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setEditingPlot(null)}
                  className="px-4 py-2 rounded-xl border border-neutral-300 text-neutral-700 hover:bg-neutral-50 text-xs font-medium cursor-pointer"
                >
                  {pStr('cancel')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#2D4A22] hover:bg-[#22391C] text-white text-xs font-bold shadow transition-all cursor-pointer"
                >
                  {pStr('saveChangesBtn')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Farmer Account Confirmation Modal */}
      {isDeleteFarmerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-red-200">
            <div className="flex items-center gap-3 text-red-600 mb-3">
              <div className="w-10 h-10 rounded-2xl bg-red-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900">
                  {pStr('deleteFarmerConfirmTitle')}
                </h3>
                <span className="text-xs text-neutral-500 font-mono">{farmer.name} • {farmer.id}</span>
              </div>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed mb-4">
              {pStr('deleteFarmerWarning')}
            </p>

            <div className="p-3.5 bg-red-50 rounded-2xl border border-red-100 text-xs text-red-900 space-y-1 mb-5">
              <div className="font-bold">{farmer.name} ({farmer.district}, {farmer.state})</div>
              <div>• {plots.length} registered plots ({totalAcres.toFixed(1)} acres total)</div>
            </div>

            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setIsDeleteFarmerModalOpen(false)}
                className="px-4 py-2 rounded-xl border border-neutral-300 text-neutral-700 hover:bg-neutral-50 text-xs font-semibold cursor-pointer transition-colors"
              >
                {pStr('cancel')}
              </button>
              <button
                type="button"
                id="btn-confirm-delete-farmer"
                onClick={() => {
                  onDeleteFarmer?.(farmer.id);
                  setIsDeleteFarmerModalOpen(false);
                }}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{pStr('deleteFarmerAccount')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
