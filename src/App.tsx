import React, { useState, useMemo, useEffect } from 'react';
import {
  FarmerInputs,
  FarmerProfile,
  FarmerPlot,
  FeasibilityAssessment,
  ExtractedLandMetrics
} from './types/greenvest';
import { calculateCarbonFeasibility } from './utils/carbonCalculator';
import { Navbar, ActiveTabType } from './components/Navbar';
import { FarmerPlotManager } from './components/farmer/FarmerPlotManager';
import { FarmlandAnalysisHub } from './components/farmer/FarmlandAnalysisHub';
import { FarmerRegistrationModal } from './components/farmer/FarmerRegistrationModal';
import { FarmerPassbookView } from './components/farmer/FarmerPassbookView';
import { DocumentProcessingHub } from './components/documents/DocumentProcessingHub';
import { MonteCarloFinancialView } from './components/finance/MonteCarloFinancialView';
import { PrintDossierModal } from './components/PrintDossierModal';
import { MethodologyModal } from './components/MethodologyModal';
import { FrontPage } from './components/FrontPage';
import { GovernmentSchemesHub } from './components/schemes/GovernmentSchemesHub';
import { DEMO_FARMERS } from './data/authProfiles';
import { TRANSLATIONS, Language } from './utils/translations';
import { getAppString } from './utils/localizedStrings';
import {
  Sprout,
  CheckCircle2,
  ShieldCheck,
  Award,
  FileCheck
} from 'lucide-react';

// Helper to guarantee a farmer has valid plots
const ensureValidFarmer = (f: FarmerProfile): FarmerProfile => {
  if (!f) return DEMO_FARMERS[0];
  const plots: FarmerPlot[] = (f.plots && Array.isArray(f.plots) && f.plots.length > 0)
    ? f.plots
    : [{
        id: `plot-${f.id || 'default'}-1`,
        name: `${f.name || 'Main'}'s Field`,
        surveyNo: f.surveyNo || 'SF-101/A',
        pattaNo: 'PT-1001',
        landArea: Number(f.landArea) || 5,
        state: f.state || 'Tamil Nadu',
        district: f.district || 'Coimbatore',
        soilType: f.soilType || 'Red Loam (Semman)',
        waterAvailability: (f.waterAvailability as any) || 'Moderate',
        currentLandUse: 'Active Annual Crops',
        preferredTreeType: 'High-Value Timber',
        plantingModel: 'Agri-Silviculture (Trees + Crops)',
        carbonPriceScenario: 'Baseline (₹1,500/t)',
        status: 'Screened',
        createdAt: new Date().toISOString().split('T')[0]
      }];
  return {
    ...f,
    plots,
    landArea: plots.reduce((acc, p) => acc + (Number(p?.landArea) || 0), 0)
  };
};

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<ActiveTabType>('farmer');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modals state
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isDossierOpen, setIsDossierOpen] = useState(false);
  const [isMethodologyOpen, setIsMethodologyOpen] = useState(false);
  const [showFrontPage, setShowFrontPage] = useState<boolean>(true);

  // Farmers state (stored in localStorage for persistence)
  const [farmersList, setFarmersList] = useState<FarmerProfile[]>(() => {
    try {
      const stored = localStorage.getItem('greenvest_farmers_list_v2');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map(ensureValidFarmer);
        }
      }
      return DEMO_FARMERS.map(ensureValidFarmer);
    } catch {
      return DEMO_FARMERS.map(ensureValidFarmer);
    }
  });

  // Current active farmer
  const [currentFarmer, setCurrentFarmer] = useState<FarmerProfile>(() => {
    try {
      const savedId = localStorage.getItem('greenvest_current_farmer_id');
      const found = farmersList.find(f => f.id === savedId);
      return ensureValidFarmer(found || farmersList[0] || DEMO_FARMERS[0]);
    } catch {
      return ensureValidFarmer(DEMO_FARMERS[0]);
    }
  });

  // Active plot ID
  const [activePlotId, setActivePlotId] = useState<string>(() => {
    try {
      const savedPlotId = localStorage.getItem('greenvest_active_plot_id');
      const found = currentFarmer.plots?.find(p => p.id === savedPlotId);
      return found ? found.id : (currentFarmer.plots?.[0]?.id || 'plot-default');
    } catch {
      return currentFarmer.plots?.[0]?.id || 'plot-default';
    }
  });

  // Derive the active plot safely
  const activePlot: FarmerPlot = useMemo(() => {
    const found = currentFarmer.plots?.find(p => p.id === activePlotId);
    if (found) return found;
    if (currentFarmer.plots && currentFarmer.plots.length > 0) {
      return currentFarmer.plots[0];
    }
    // Fallback if plots array is somehow empty
    return {
      id: 'plot-default',
      name: 'Main Homestead Plot',
      surveyNo: 'SF-104/2B',
      pattaNumber: 'PATTA-2024-TN-4821',
      landArea: currentFarmer.landArea || 5,
      state: currentFarmer.state || 'Tamil Nadu',
      district: currentFarmer.district || 'Coimbatore',
      soilType: currentFarmer.soilType || 'Red Loam (Semman)',
      waterAvailability: currentFarmer.waterAvailability || 'Moderate',
      currentLandUse: currentFarmer.currentLandUse || 'Active Annual Crops',
      preferredTreeType: 'Any / Optimized',
      plantingModel: currentFarmer.plantingModel || 'Agri-Silviculture (Trees + Crops)',
      carbonPriceScenario: 'Baseline (₹1,500/t)',
      status: 'Active',
      createdAt: new Date().toISOString().split('T')[0]
    };
  }, [currentFarmer, activePlotId]);

  // Farmer Inputs driving live carbon models
  const [inputs, setInputs] = useState<FarmerInputs>({
    landArea: activePlot.landArea || 5,
    state: activePlot.state || currentFarmer.state || 'Tamil Nadu',
    district: activePlot.district || currentFarmer.district || 'Coimbatore',
    soilType: activePlot.soilType || currentFarmer.soilType || 'Red Loam (Semman)',
    waterAvailability: activePlot.waterAvailability || 'Moderate',
    currentLandUse: activePlot.currentLandUse || 'Active Annual Crops',
    preferredTreeType: activePlot.preferredTreeType || 'Any / Optimized',
    plantingModel: activePlot.plantingModel || 'Agri-Silviculture (Trees + Crops)',
    carbonPriceScenario: activePlot.carbonPriceScenario || 'Baseline (₹1,500/t)'
  });

  // Whenever active plot or farmer changes, synchronize inputs
  useEffect(() => {
    setInputs({
      landArea: activePlot.landArea || 5,
      state: activePlot.state || currentFarmer.state || 'Tamil Nadu',
      district: activePlot.district || currentFarmer.district || 'Coimbatore',
      soilType: activePlot.soilType || currentFarmer.soilType || 'Red Loam (Semman)',
      waterAvailability: activePlot.waterAvailability || 'Moderate',
      currentLandUse: activePlot.currentLandUse || 'Active Annual Crops',
      preferredTreeType: activePlot.preferredTreeType || 'Any / Optimized',
      plantingModel: activePlot.plantingModel || 'Agri-Silviculture (Trees + Crops)',
      carbonPriceScenario: activePlot.carbonPriceScenario || 'Baseline (₹1,500/t)'
    });
  }, [activePlot.id, currentFarmer.id]);

  // Save farmers list to localStorage
  const persistFarmersList = (updatedList: FarmerProfile[]) => {
    setFarmersList(updatedList);
    try {
      localStorage.setItem('greenvest_farmers_list_v2', JSON.stringify(updatedList));
    } catch {}
  };

  // Live scientific recalculation
  const assessment: FeasibilityAssessment = useMemo(() => {
    return calculateCarbonFeasibility(inputs);
  }, [inputs]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Switch Active Plot
  const handleSelectPlot = (plotId: string) => {
    setActivePlotId(plotId);
    try {
      localStorage.setItem('greenvest_active_plot_id', plotId);
    } catch {}
    const plot = currentFarmer.plots?.find(p => p.id === plotId);
    if (plot) {
      const switchedPlotMsgs: Record<Language, string> = {
        en: `✓ Switched to plot: ${plot.name} (${plot.landArea} ac)`,
        ta: `✓ நிலம் மாற்றப்பட்டது: ${plot.name} (${plot.landArea} ஏக்கர்)`,
        ml: `✓ കൃഷിഭൂമി മാറ്റി: ${plot.name} (${plot.landArea} ഏക്കർ)`,
        kn: `✓ ಜಮೀನು ಬದಲಾಯಿಸಲಾಗಿದೆ: ${plot.name} (${plot.landArea} ಎಕರೆ)`,
        te: `✓ భూమి మార్చబడింది: ${plot.name} (${plot.landArea} ఎకరాలు)`
      };
      showToast(switchedPlotMsgs[language] || switchedPlotMsgs.en);
    }
  };

  // Add a new plot for current farmer
  const handleAddPlot = (newPlotData: Omit<FarmerPlot, 'id' | 'createdAt'>) => {
    const newPlot: FarmerPlot = {
      ...newPlotData,
      id: `plot-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updatedPlots = [...(currentFarmer.plots || []), newPlot];
    const newTotalArea = Number(updatedPlots.reduce((sum, p) => sum + (Number(p.landArea) || 0), 0).toFixed(1));

    const updatedFarmer: FarmerProfile = {
      ...currentFarmer,
      plots: updatedPlots,
      landArea: newTotalArea
    };

    setCurrentFarmer(updatedFarmer);
    setActivePlotId(newPlot.id);
    try {
      localStorage.setItem('greenvest_active_plot_id', newPlot.id);
      localStorage.setItem('greenvest_current_farmer_id', updatedFarmer.id);
    } catch {}

    const updatedList = farmersList.map(f => f.id === updatedFarmer.id ? updatedFarmer : f);
    persistFarmersList(updatedList);

    const addedMsgs: Record<Language, string> = {
      en: `✓ Registered "${newPlot.name}" in ${newPlot.state}! Matched ${newPlot.state} & Central Govt schemes are ready.`,
      ta: `✓ புதிய நிலம் சேர்க்கப்பட்டது: "${newPlot.name}" (${newPlot.landArea} ஏக்கர்)`,
      ml: `✓ പുതിയ കൃഷിഭൂമി ചേർത്തു: "${newPlot.name}" (${newPlot.landArea} ഏക്കർ)`,
      kn: `✓ ಹೊಸ ಜಮೀನು ಸೇರಿಸಲಾಗಿದೆ: "${newPlot.name}" (${newPlot.landArea} ಎಕರೆ)`,
      te: `✓ కొత్త భూమి చేర్చబడింది: "${newPlot.name}" (${newPlot.landArea} ఎకరాలు)`
    };
    showToast(addedMsgs[language] || addedMsgs.en);
  };

  // Delete a plot
  const handleDeletePlot = (plotId: string) => {
    if ((currentFarmer.plots || []).length <= 1) {
      const cantDeleteMsg: Record<Language, string> = {
        en: '⚠️ Cannot delete the only registered farmland plot.',
        ta: '⚠️ பதிவு செய்யப்பட்ட ஒரே ஒரு நிலத்தை நீக்க முடியாது.',
        ml: '⚠️ രജിസ്റ്റർ ചെയ്ത ഒരേയൊരു ഭൂമി നീക്കം ചെയ്യാൻ കഴിയില്ല.',
        kn: '⚠️ ನೋಂದಾಯಿಸಲಾದ ಏಕೈಕ ಜಮೀನನ್ನು ಅಳಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ.',
        te: '⚠️ నమోదు చేయబడిన ఏకైక భూమిని తొలగించలేరు.'
      };
      showToast(cantDeleteMsg[language] || cantDeleteMsg.en);
      return;
    }

    const targetPlot = (currentFarmer.plots || []).find(p => p.id === plotId);
    const updatedPlots = (currentFarmer.plots || []).filter(p => p.id !== plotId);
    const newActive = (activePlotId === plotId)
      ? updatedPlots[0]
      : (updatedPlots.find(p => p.id === activePlotId) || updatedPlots[0]);

    const newTotalArea = Number(updatedPlots.reduce((sum, p) => sum + (Number(p.landArea) || 0), 0).toFixed(1));

    const updatedFarmer: FarmerProfile = {
      ...currentFarmer,
      plots: updatedPlots,
      landArea: newTotalArea
    };

    setCurrentFarmer(updatedFarmer);
    setActivePlotId(newActive.id);
    try {
      localStorage.setItem('greenvest_active_plot_id', newActive.id);
      localStorage.setItem('greenvest_current_farmer_id', updatedFarmer.id);
    } catch {}

    const updatedList = farmersList.map(f => f.id === updatedFarmer.id ? updatedFarmer : f);
    persistFarmersList(updatedList);

    const deletedMsgs: Record<Language, string> = {
      en: `✓ Plot "${targetPlot?.name || ''}" removed successfully.`,
      ta: `✓ "${targetPlot?.name || ''}" நிலம் வெற்றிகரமாக நீக்கப்பட்டது.`,
      ml: `✓ "${targetPlot?.name || ''}" കൃഷിഭೂമി വിജയകരമായി നീക്കം ചെയ്തു.`,
      kn: `✓ "${targetPlot?.name || ''}" ಜಮೀನು ಯಶಸ್ವಿಯಾಗಿ ಅಳಿಸಲಾಗಿದೆ.`,
      te: `✓ "${targetPlot?.name || ''}" భూమి విజయవంతంగా తొలగించబడింది.`
    };
    showToast(deletedMsgs[language] || deletedMsgs.en);
  };

  // Save changes from the analysis form to the active plot
  const handleSavePlotInputs = (plotId: string, updatedInputs: Partial<FarmerPlot>, silent = false) => {
    const updatedPlots = (currentFarmer.plots || []).map(plot => {
      if (plot.id === plotId) {
        return {
          ...plot,
          ...updatedInputs
        };
      }
      return plot;
    });

    const newTotalArea = Number(updatedPlots.reduce((sum, p) => sum + (Number(p.landArea) || 0), 0).toFixed(1));

    const updatedFarmer: FarmerProfile = {
      ...currentFarmer,
      plots: updatedPlots,
      landArea: newTotalArea
    };

    setCurrentFarmer(updatedFarmer);
    const updatedList = farmersList.map(f => f.id === updatedFarmer.id ? updatedFarmer : f);
    persistFarmersList(updatedList);

    if (!silent) {
      const savedMsgs: Record<Language, string> = {
        en: '✓ Saved updated parameters to plot record!',
        ta: '✓ நிலத்தின் புதிய விவரங்கள் சேமிக்கப்பட்டன!',
        ml: '✓ പുതിയ വിവരങ്ങൾ കൃഷിഭൂമിയിൽ സേവ് ചെയ്തു!',
        kn: '✓ ಜಮೀನಿನ ವಿವರಗಳನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಉಳಿಸಲಾಗಿದೆ!',
        te: '✓ భూమి వివరాలు విజయవంతంగా సేవ్ చేయబడ్డాయి!'
      };
      showToast(savedMsgs[language] || savedMsgs.en);
    }
  };

  // Switch Farmer Profile
  const handleSelectFarmer = (farmer: FarmerProfile) => {
    const validFarmer = ensureValidFarmer(farmer);
    setCurrentFarmer(validFarmer);
    const initialPlotId = validFarmer.plots[0].id;
    setActivePlotId(initialPlotId);
    try {
      localStorage.setItem('greenvest_current_farmer_id', validFarmer.id);
      localStorage.setItem('greenvest_active_plot_id', initialPlotId);
    } catch {}
    setIsRegisterModalOpen(false);

    const switchedMsgs: Record<Language, string> = {
      en: `✓ Switched profile to: ${validFarmer.name} (${validFarmer.district}, ${validFarmer.state})`,
      ta: `✓ உழவர் கணக்கு மாற்றப்பட்டது: ${validFarmer.name} (${validFarmer.district}, ${validFarmer.state})`,
      ml: `✓ കർഷക പ്രൊഫൈൽ മാറ്റി: ${validFarmer.name} (${validFarmer.district}, ${validFarmer.state})`,
      kn: `✓ ರೈತರ ವಿವರ ಬದಲಾಯಿಸಲಾಗಿದೆ: ${validFarmer.name} (${validFarmer.district}, ${validFarmer.state})`,
      te: `✓ రైతు ప్రొఫైల్ మార్చబడింది: ${validFarmer.name} (${validFarmer.district}, ${validFarmer.state})`
    };
    showToast(switchedMsgs[language] || switchedMsgs.en);
  };

  // Register New Farmer Profile
  const handleRegisterNewFarmer = (newFarmer: FarmerProfile) => {
    const validFarmer = ensureValidFarmer(newFarmer);
    const updatedList = [validFarmer, ...farmersList];
    persistFarmersList(updatedList);
    setCurrentFarmer(validFarmer);
    const initialPlotId = validFarmer.plots[0].id;
    setActivePlotId(initialPlotId);
    try {
      localStorage.setItem('greenvest_current_farmer_id', validFarmer.id);
      localStorage.setItem('greenvest_active_plot_id', initialPlotId);
    } catch {}
    setIsRegisterModalOpen(false);

    const registeredMsgs: Record<Language, string> = {
      en: `✓ Welcome ${validFarmer.name}! Your farmer account and initial plot have been registered.`,
      ta: `✓ நல்வரவு ${validFarmer.name}! உங்கள் உழவர் கணக்கு மற்றும் நிலம் பதிவு செய்யப்பட்டுள்ளது.`,
      ml: `✓ സ്വാഗതം ${validFarmer.name}! നിങ്ങളുടെ അക്കൗണ്ടും ഭൂമിയും രജിസ്റ്റർ ചെയ്തു.`,
      kn: `✓ ಸುಸ್ವಾಗತ ${validFarmer.name}! ನಿಮ್ಮ ರೈತ ಖಾತೆ ಮತ್ತು ಜಮೀನು ನೋಂದಾಯಿಸಲಾಗಿದೆ.`,
      te: `✓ స్వాగతం ${validFarmer.name}! మీ రైతు ఖాతా మరియు భూమి నమోదు చేయబడ్డాయి.`
    };
    showToast(registeredMsgs[language] || registeredMsgs.en);
  };

  // Update Current Farmer Profile Name, Mobile, Village, etc.
  const handleUpdateFarmerProfile = (updatedFields: Partial<FarmerProfile>) => {
    const updated = ensureValidFarmer({
      ...currentFarmer,
      ...updatedFields
    });
    setCurrentFarmer(updated);
    const updatedList = farmersList.map(f => f.id === updated.id ? updated : f);
    persistFarmersList(updatedList);

    const updatedMsgs: Record<Language, string> = {
      en: `✓ Updated profile: ${updated.name}`,
      ta: `✓ உழவர் விவரம் புதுப்பிக்கப்பட்டது: ${updated.name}`,
      ml: `✓ കർഷക വിവരങ്ങൾ പുതുക്കി: ${updated.name}`,
      kn: `✓ ರೈತರ ವಿವರ ನವೀಕರಿಸಲಾಗಿದೆ: ${updated.name}`,
      te: `✓ రైతు వివరాలు నవీకరించబడ్డాయి: ${updated.name}`
    };
    showToast(updatedMsgs[language] || updatedMsgs.en);
  };

  // Delete Farmer Profile Account
  const handleDeleteFarmer = (farmerId: string) => {
    if (farmersList.length <= 1) {
      const cantDeleteMsg: Record<Language, string> = {
        en: '⚠️ Cannot delete the only registered farmer account. At least one profile must be maintained.',
        ta: '⚠️ பதிவு செய்யப்பட்ட ஒரே ஒரு உழவர் கணக்கை நீக்க முடியாது. குறைந்தது ஒரு கணக்கு இருக்க வேண்டும்.',
        ml: '⚠️ രജിസ്റ്റർ ചെയ്ത ഒരേയൊരു കർഷക അക്കൗണ്ട് നീക്കം ചെയ്യാൻ കഴിയില്ല.',
        kn: '⚠️ ನೋಂದಾಯಿಸಲಾದ ಏಕೈಕ ರೈತರ ಖಾತೆಯನ್ನು ಅಳಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ.',
        te: '⚠️ నమోదు చేయబడిన ఏకైక రైతు ఖాతాను తొలగించలేరు.'
      };
      showToast(cantDeleteMsg[language] || cantDeleteMsg.en);
      return;
    }

    const targetFarmer = farmersList.find(f => f.id === farmerId);
    const updatedList = farmersList.filter(f => f.id !== farmerId);
    persistFarmersList(updatedList);

    // If the currently active farmer is deleted, switch to the first remaining farmer
    if (currentFarmer.id === farmerId) {
      const nextFarmer = ensureValidFarmer(updatedList[0]);
      setCurrentFarmer(nextFarmer);
      const nextPlotId = nextFarmer.plots[0].id;
      setActivePlotId(nextPlotId);
      try {
        localStorage.setItem('greenvest_current_farmer_id', nextFarmer.id);
        localStorage.setItem('greenvest_active_plot_id', nextPlotId);
      } catch {}
    }

    const deletedMsgs: Record<Language, string> = {
      en: `✓ Farmer account "${targetFarmer?.name || 'Farmer'}" deleted successfully.`,
      ta: `✓ "${targetFarmer?.name || 'உழவர்'}" கணக்கு வெற்றிகரமாக நீக்கப்பட்டது.`,
      ml: `✓ "${targetFarmer?.name || 'കർഷകൻ'}" അക്കൗണ്ട് വിജയകരമായി നീക്കം ചെയ്തു.`,
      kn: `✓ "${targetFarmer?.name || 'ರೈತ'}" ಖಾತೆ ಯಶಸ್ವಿಯಾಗಿ ಅಳಿಸಲಾಗಿದೆ.`,
      te: `✓ "${targetFarmer?.name || 'రైతు'}" ఖాతా విజయవంతంగా తొలగించబడింది.`
    };
    showToast(deletedMsgs[language] || deletedMsgs.en);
  };

  // Handle document extraction auto-fill
  const handleApplyExtractedMetrics = (metrics: ExtractedLandMetrics, autoNavigate = false) => {
    const updatedAcreage = Number(metrics.acreage) || inputs.landArea;
    const updatedSoil = metrics.soilType || inputs.soilType;
    const updatedWater = (metrics.waterSource.includes('High') || metrics.waterSource.includes('Canal'))
      ? 'High / Canal'
      : (metrics.waterSource.includes('Rainfed') ? 'Rainfed' : 'Moderate');
    const updatedUse = (metrics.priorLandUse.includes('Fallow') || metrics.priorLandUse.includes('Degraded'))
      ? 'Fallow / Degraded'
      : 'Active Annual Crops';
    const updatedDistrict = metrics.district || inputs.district;
    const updatedState = metrics.state || inputs.state;

    const newInputs: FarmerInputs = {
      ...inputs,
      landArea: updatedAcreage,
      state: updatedState,
      district: updatedDistrict,
      soilType: updatedSoil,
      waterAvailability: updatedWater,
      currentLandUse: updatedUse
    };

    setInputs(newInputs);

    // Also update the active plot record
    handleSavePlotInputs(activePlot.id, {
      landArea: updatedAcreage,
      state: updatedState,
      district: updatedDistrict,
      soilType: updatedSoil,
      waterAvailability: updatedWater,
      currentLandUse: updatedUse,
      surveyNo: metrics.surveyNumber || activePlot.surveyNo
    }, true);

    const extractedMsgs: Record<Language, string> = {
      en: `✓ Injected Deed & Soil Metrics (${metrics.surveyNumber}: ${metrics.acreage} ac, ${metrics.soilType}) into ${activePlot.name}!`,
      ta: `✓ ஆவண விவரங்கள் (${metrics.surveyNumber}: ${metrics.acreage} ஏக்கர், ${metrics.soilType}) நிலத்துடன் இணைக்கப்பட்டது!`,
      ml: `✓ രേഖ വിവരങ്ങൾ (${metrics.surveyNumber}: ${metrics.acreage} ഏക്കർ, ${metrics.soilType}) കൃഷിഭೂമിയുമായി ചേർത്തു!`,
      kn: `✓ ದಾಖಲೆ ವಿವರಗಳು (${metrics.surveyNumber}: ${metrics.acreage} ಎಕರೆ, ${metrics.soilType}) ಜಮೀನಿಗೆ ಅನ್ವಯಿಸಲಾಗಿದೆ!`,
      te: `✓ పత్ర వివరాలు (${metrics.surveyNumber}: ${metrics.acreage} ఎకరాలు, ${metrics.soilType}) భూమికి వర్తింపజేయబడ్డాయి!`
    };
    showToast(extractedMsgs[language] || extractedMsgs.en);
    if (autoNavigate) {
      setActiveTab('farmer');
    }
  };

  const handleOpenDossier = () => {
    setIsDossierOpen(true);
  };

  const isTamil = language === 'ta';
  const t = TRANSLATIONS[language];

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#FDFBF7] text-[#2C3626] flex flex-col font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1A2E11] text-[#FDFBF7] px-4 py-3 rounded-2xl shadow-xl border border-[#8BA888]/40 flex items-center gap-3 text-xs font-semibold animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-[#CCD5AE] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Front Page Animated Intro & Earth Charter (Magic UI) */}
      <FrontPage
        isOpen={showFrontPage}
        onEnterApp={() => setShowFrontPage(false)}
        language={language}
        onLanguageChange={setLanguage}
      />

      {/* Streamlined Farmer-Only Navbar */}
      <Navbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        language={language}
        onLanguageChange={setLanguage}
        onOpenMethodology={() => setIsMethodologyOpen(true)}
        currentFarmer={currentFarmer}
        onOpenLoginModal={() => setIsRegisterModalOpen(true)}
        onOpenFrontPage={() => setShowFrontPage(true)}
      />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl 2xl:max-w-screen-2xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-7 space-y-6">

        {/* TAB 1: FARMLAND & CARBON ANALYSIS (Plot Manager + Form + Verdict + Results + Satellite Map) */}
        {activeTab === 'farmer' && (
          <div className="space-y-6">
            {/* Multi-Plot Management Bar */}
            <FarmerPlotManager
              farmer={currentFarmer}
              plots={currentFarmer.plots || []}
              activePlotId={activePlot.id}
              onSelectPlot={handleSelectPlot}
              onAddPlot={handleAddPlot}
              onUpdatePlot={handleSavePlotInputs}
              onDeletePlot={handleDeletePlot}
              onDeleteFarmer={handleDeleteFarmer}
              onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
              onOpenFarmerModal={() => setIsRegisterModalOpen(true)}
              onNavigateToTab={setActiveTab}
              language={language}
            />

            {/* Farmland Analysis Hub with Verra ARR Verdict & Results */}
            <FarmlandAnalysisHub
              farmer={currentFarmer}
              activePlot={activePlot}
              inputs={inputs}
              assessment={assessment}
              onInputsChange={setInputs}
              onSavePlotInputs={handleSavePlotInputs}
              onOpenDossier={handleOpenDossier}
              onRegisterCohort={() => {
                const cohortMsgs: Record<Language, string> = {
                  en: '✓ Farmland registered for pre-financing cohort! Verification commencing shortly.',
                  ta: '✓ உங்கள் நிலம் பதிவு செய்யப்பட்டது! தணிக்கை விரைவில் தொடங்கும்.',
                  ml: '✓ നിങ്ങളുടെ കൃഷിഭൂമി പ്രീ-ഫിനാൻസിംഗ് കോഹോർട്ടിൽ രജിസ്റ്റർ ചെയ്തു!',
                  kn: '✓ ನಿಮ್ಮ ಜಮೀನು ಪೂರ್ವ-ಹಣಕಾಸು ಯೋಜನೆಯಲ್ಲಿ ಯಶಸ್ವಿಯಾಗಿ ನೋಂದಾಯಿಸಲಾಗಿದೆ!',
                  te: '✓ మీ భూమి ప్రీ-ఫైనాన్సింగ్ కోహోర్ట్‌లో విజయవంతంగా నమోదు చేయబడింది!'
                };
                showToast(cohortMsgs[language] || cohortMsgs.en);
                setActiveTab('passbook');
              }}
              onNavigateToTab={setActiveTab}
              language={language}
            />
          </div>
        )}

        {/* TAB 2: 30-YEAR STOCHASTIC MONTE CARLO CASH FLOW SIMULATION (1,000 TRIALS) */}
        {activeTab === 'monte-carlo' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <MonteCarloFinancialView
              currentInputs={inputs}
              language={language}
            />
          </div>
        )}

        {/* TAB 3: PATTA & SOIL HEALTH LAND RECORDS */}
        {activeTab === 'documents' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-[#EAF3E4] border border-[#CDE0C3] text-xs text-[#1E3615] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-2.5">
                <FileCheck className="w-5 h-5 text-[#2D4A22] shrink-0" />
                <span>
                  {language === 'ta' && 'உங்கள் பட்டா / சிட்டா அல்லது மண் அட்டை ஆவணத்தை பதிவேற்றி உங்கள் நிலப் பரப்பளவு மற்றும் மண் கரிம அளவை தானாக இணைக்கவும்.'}
                  {language === 'ml' && 'നിങ്ങളുടെ പട്ടയം അല്ലെങ്കിൽ മണ്ണ് പരിശോധനാ കാർഡ് അപ്‌ലോഡ് ചെയ്ത് സർവേ നമ്പറും ജൈവ കാർബൺ വിവരങ്ങളും നേരിട്ട് രേഖപ്പെടുത്തുക.'}
                  {language === 'kn' && 'ನಿಮ್ಮ ಪಟ್ಟಾ ಅಥವಾ ಮಣ್ಣಿನ ಆರೋಗ್ಯ ಕಾರ್ಡ್ ಅಪ್‌ಲೋಡ್ ಮಾಡುವ ಮೂಲಕ ಸರ್ವೇ ಸಂಖ್ಯೆ ಮತ್ತು ಮಣ್ಣಿನ ಫಲವತ್ತತೆಯ ವಿವರಗಳನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಸೇರಿಸಿ.'}
                  {language === 'te' && 'మీ పట్టా లేదా భూసార పరీక్ష కార్డును అప్‌లోడ్ చేయడం ద్వారా సర్వే నంబర్ మరియు సేంద్రీయ కార్బన్ వివరాలను నేరుగా నమోదు చేయండి.'}
                  {language === 'en' && `Upload your Patta Deed or Soil Health Card to automatically verify survey numbers and extract soil organic carbon directly into "${activePlot.name}".`}
                </span>
              </div>
              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#2D4A22] text-white shrink-0 self-start sm:self-auto">
                Target Plot: {activePlot.name}
              </span>
            </div>

            <DocumentProcessingHub
              currentInputs={inputs}
              onApplyExtractedMetrics={handleApplyExtractedMetrics}
              language={language}
              onNavigateToTab={setActiveTab}
              targetPlotName={activePlot.name}
            />
          </div>
        )}

        {/* TAB 4: CERTIFIED CARBON PASSBOOK */}
        {activeTab === 'passbook' && (
          <FarmerPassbookView
            farmer={currentFarmer}
            inputs={inputs}
            assessment={assessment}
            language={language}
            onOpenDossier={handleOpenDossier}
            onRequestSoilVisit={() => {
              const soilMsgs: Record<Language, string> = {
                en: '✓ Free Soil Test Visit requested! Our field agronomist will contact you within 24 hours.',
                ta: '✓ இலவச மண் பரிசோதனை கோரிக்கை பெறப்பட்டது! கள அதிகாரி 24 மணி நேரத்திற்குள் தொடர்பு கொள்வார்.',
                ml: '✓ സൗജന്യ മണ്ണ് പരിശോധന അഭ്യർത്ഥന ലഭിച്ചു! ഫീൽഡ് ഓഫീസർ 24 മണിക്കൂറിനുള്ളിൽ ബന്ധപ്പെടും.',
                kn: '✓ ಉಚಿತ ಮಣ್ಣಿನ ಪರೀಕ್ಷೆ ವಿನಂತಿಸಲಾಗಿದೆ! ನಮ್ಮ ಕ್ಷೇತ್ರ ಅಧಿಕಾರಿ 24 ಗಂಟೆಗಳಲ್ಲಿ ಸಂಪರ್ಕಿಸುತ್ತಾರೆ.',
                te: '✓ ఉచిత భూసార పరీక్ష అభ్యర్థన నమోదు చేయబడింది! ఫీల్డ్ అధికారి 24 గంటల్లో సంప్రదిస్తారు.'
              };
              showToast(soilMsgs[language] || soilMsgs.en);
            }}
            onScheduleSaplingDelivery={() => {
              const saplingMsgs: Record<Language, string> = {
                en: '✓ Nursery Sapling Dispatch requested for the upcoming planting window!',
                ta: '✓ பருவமழை நடவு காலத்திற்கான மரக்கன்றுகள் ஒதுக்கீடு பதிவு செய்யப்பட்டது!',
                ml: '✓ നടീൽ സീസണിലേക്കുള്ള തൈകളുടെ വിതരണം ഷെഡ്യൂൾ ചെയ്തു!',
                kn: '✓ ಮಳೆಗಾಲದ ಸಸಿ ವಿತರಣೆ ಯಶಸ್ವಿಯಾಗಿ ನಿಗದಿಪಡಿಸಲಾಗಿದೆ!',
                te: '✓ రాబోయే వర్షాకాలం నాటడం కోసం మొక్కల పంపిణీ షెడ్యూల్ చేయబడింది!'
              };
              showToast(saplingMsgs[language] || saplingMsgs.en);
            }}
            onNavigateToTab={(tab) => setActiveTab(tab as ActiveTabType)}
            onShowToast={showToast}
          />
        )}

        {/* TAB 5: STATE-WISE & CENTRAL GOVERNMENT SCHEMES & SUBSIDY NAVIGATOR */}
        {activeTab === 'schemes' && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <GovernmentSchemesHub
              farmer={currentFarmer}
              activePlot={activePlot}
              inputs={inputs}
              language={language}
              onNavigateToTab={(tab) => setActiveTab(tab as ActiveTabType)}
              onShowToast={showToast}
            />
          </div>
        )}

      </main>

      {/* Clean Farmer-Centric Footer */}
      <footer className="bg-[#1A2E11] text-[#CCD5AE] border-t border-white/10 mt-12 py-8 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2.5">
            <div className="w-7 h-7 rounded-xl bg-[#2D4A22] text-[#8BA888] flex items-center justify-center">
              <Sprout className="w-4 h-4" />
            </div>
            <span className="font-bold text-white text-sm font-serif">{t.brandName}</span>
            <span className="text-[#CCD5AE]/70">
              | {language === 'ta' && 'சிறு விவசாயிகளுக்கான நேரடி கார்பன் வருமான தளம்'}
              {language === 'ml' && 'ചെറുകിട കർഷകർക്ക് നേരിട്ട് കാർബൺ വരുമാനവും കാർഷಿಕ വനവൽക്കരണ പദ്ധതികളും'}
              {language === 'kn' && 'ಸಣ್ಣ ರೈತರಿಗೆ ನೇರ ಕಾರ್ಬನ್ ಆದಾಯ ಮತ್ತು ಕೃಷಿ ಅರಣ್ಯ ಬೆಂಬಲ ವೇದಿಕೆ'}
              {language === 'te' && 'చిన్న రైతులకు ప్రత్యక్ష కార్బన్ ఆదాయం మరియు వ్యవసాయ అటవీ వేదిక'}
              {language === 'en' && 'Empowering Smallholder Farmers with Direct Carbon Pre-Financing & Agroforestry Returns'}
            </span>
          </div>

          <div className="text-center md:text-right space-y-0.5 text-[11px]">
            <p>
              {language === 'ta' && 'வெர்ரா VM0047 ARR முறைமை மற்றும் ICAR/FRI வேளாண் வனவியல் மாதிரிகளின் அடிப்படையில் உருவாக்கப்பட்டது.'}
              {language === 'ml' && 'വെറ VM0047 ARR മാനദണ്ഡങ്ങളും ICAR/FRI കാർഷിക വനവൽക്കരണ ഗവേഷണങ്ങളും അടിസ്ഥാനമാക്കിയുള്ളതാണ്.'}
              {language === 'kn' && 'ವೆರ್ರಾ VM0047 ARR ಮಾನದಂಡಗಳು ಮತ್ತು ICAR/FRI ಸಂಶೋಧನಾ ಮಾದರಿಗಳ ಆಧಾರದ ಮೇಲೆ ರಚಿಸಲಾಗಿದೆ.'}
              {language === 'te' && 'వెర్రా VM0047 ARR ప్రమాణాలు మరియు ICAR/FRI పరిశోధనా పట్టికల ఆధారంగా ధృవీకరించబడింది.'}
              {language === 'en' && 'Validated against Verra VM0047 ARR standards & ICAR/FRI empirical agroforestry yield tables.'}
            </p>
            <p className="text-[#8BA888]">
              {language === 'ta' && '100% இலவச பதிவு • விவசாயிகள் எவ்வித முன்செலவும் செலுத்த வேண்டியதில்லை.'}
              {language === 'ml' && '100% സൗജന്യം • കർഷകർ മുൻകൂട്ടി പണം നൽകേണ്ടതില്ല.'}
              {language === 'kn' && '100% ಉಚಿತ • ರೈತರಿಗೆ ಯಾವುದೇ ಮುಂಗಡ ವೆಚ್ಚವಿಲ್ಲ.'}
              {language === 'te' && '100% ఉచితం • రైతులకు ఎటువంటి ముందస్తు ఖర్చు లేదు.'}
              {language === 'en' && '100% Free for Farmers • Zero upfront capital required.'}
            </p>
          </div>
        </div>
      </footer>

      {/* Unified Farmer Switch & Registration Modal */}
      <FarmerRegistrationModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        currentFarmer={currentFarmer}
        allFarmers={farmersList}
        farmersList={farmersList}
        onSelectFarmer={handleSelectFarmer}
        onRegisterFarmer={handleRegisterNewFarmer}
        onRegisterNewFarmer={handleRegisterNewFarmer}
        onUpdateFarmerProfile={handleUpdateFarmerProfile}
        onDeleteFarmer={handleDeleteFarmer}
        language={language}
      />

      {/* Peer-Reviewed Science & VM0047 Methodology Modal */}
      <MethodologyModal
        isOpen={isMethodologyOpen}
        onClose={() => setIsMethodologyOpen(false)}
        language={language}
        onLanguageChange={setLanguage}
      />

      {/* Printable & Downloadable PDF Dossier Modal */}
      <PrintDossierModal
        assessment={assessment}
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
        language={language}
        registeredFarmer={{
          id: currentFarmer.id,
          farmerNamePseudonym: currentFarmer.name,
          district: currentFarmer.district || inputs.district,
          state: currentFarmer.state || inputs.state,
          village: currentFarmer.village || 'Panchayat Ward',
          surveyNumber: activePlot.surveyNo || 'SF-382/2B',
          landAreaAcres: activePlot.landArea || inputs.landArea,
          soilType: activePlot.soilType || inputs.soilType,
          currentLandUse: activePlot.currentLandUse || inputs.currentLandUse,
          waterSource: activePlot.waterAvailability || inputs.waterAvailability,
          status: 'Enrolled' as any,
          enrolledDate: activePlot.createdAt || '2025-01-15'
        } as any}
      />

    </div>
  );
}
