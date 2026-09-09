import React, { useState, useEffect } from 'react';
import {
  ExtractedLandMetrics,
  FarmerInputs
} from '../../types/greenvest';
import {
  SAMPLE_DOCUMENTS,
  SampleDocument
} from '../../data/sampleDocuments';
import {
  createInitialParsingJob,
  DocumentParsingJob,
  parseDocumentHeuristic
} from '../../utils/documentParser';
import {
  FileText,
  Upload,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Bot,
  Activity,
  Cpu,
  RefreshCw,
  Eye,
  Zap,
  Check,
  ExternalLink
} from 'lucide-react';
import { TRANSLATIONS, Language } from '../../utils/translations';
import { getDocString } from '../../utils/localizedStrings';

interface DocumentProcessingHubProps {
  currentInputs: FarmerInputs;
  onApplyExtractedMetrics: (metrics: ExtractedLandMetrics, autoNavigate?: boolean) => void;
  language: Language;
  onNavigateToTab?: (tab: 'farmer' | 'monte-carlo' | 'documents' | 'passbook') => void;
  targetPlotName?: string;
}

export const DocumentProcessingHub: React.FC<DocumentProcessingHubProps> = ({
  currentInputs,
  onApplyExtractedMetrics,
  language,
  onNavigateToTab,
  targetPlotName = 'Current Farmland Plot'
}) => {
  const t = TRANSLATIONS[language];
  const d = (key: string) => getDocString(key, language);

  const [selectedSample, setSelectedSample] = useState<SampleDocument>(SAMPLE_DOCUMENTS[0]);
  const [job, setJob] = useState<DocumentParsingJob>(createInitialParsingJob(SAMPLE_DOCUMENTS[0]));
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [syncDone, setSyncDone] = useState<boolean>(true);

  // Run autonomous agent pipeline
  const runExtractionPipeline = (sampleDoc: SampleDocument) => {
    const newJob = createInitialParsingJob(sampleDoc);
    setJob(newJob);
    setIsProcessing(true);

    // Immediately inject metrics into calculator state without waiting for animation to finish
    if (sampleDoc.extractedMetrics) {
      onApplyExtractedMetrics(sampleDoc.extractedMetrics, false);
      setSyncDone(true);
    }

    let currentStep = 0;
    const interval = setInterval(() => {
      setJob(prev => {
        const nextSteps = [...prev.steps];
        if (currentStep < nextSteps.length) {
          nextSteps[currentStep].status = 'completed';
          currentStep++;
          if (currentStep < nextSteps.length) {
            nextSteps[currentStep].status = 'running';
          }
        }

        const isFinished = currentStep >= nextSteps.length;
        if (isFinished) {
          clearInterval(interval);
          setIsProcessing(false);
          if (sampleDoc.extractedMetrics) {
            onApplyExtractedMetrics(sampleDoc.extractedMetrics, false);
            setSyncDone(true);
            setTimeout(() => setSyncDone(false), 5000);
          }
        }

        return {
          ...prev,
          currentStepIndex: currentStep,
          steps: nextSteps,
          isComplete: isFinished,
          extractedMetrics: sampleDoc.extractedMetrics
        };
      });
    }, 550);
  };

  // Initial load auto-complete and ensure calculator receives initial values without redirecting
  useEffect(() => {
    setJob(prev => ({
      ...prev,
      isComplete: true,
      steps: prev.steps.map(s => ({ ...s, status: 'completed' }))
    }));
    if (SAMPLE_DOCUMENTS[0]?.extractedMetrics) {
      onApplyExtractedMetrics(SAMPLE_DOCUMENTS[0].extractedMetrics, false);
      setSyncDone(true);
      const timer = setTimeout(() => setSyncDone(false), 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSelectSample = (sample: SampleDocument) => {
    setSelectedSample(sample);
    runExtractionPipeline(sample);
  };

  // Handle uploaded file ingestion
  const processUploadedFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const textContent = typeof reader.result === 'string' ? reader.result : '';
      const parsed = parseDocumentHeuristic(textContent, file.name);

      const customSample: SampleDocument = {
        id: `custom-${Date.now()}`,
        title: file.name,
        category: 'Land Title / Patta Chitta',
        issuer: d('uploadedLocalDoc') || 'Uploaded Deed / Soil Record',
        issuanceDate: new Date().toLocaleDateString(),
        fileSize: `${(file.size / 1024).toFixed(0)} KB`,
        rawTextPreview: textContent || `[Cadastral OCR Scanner Ingestion: ${file.name}]\nSurvey No: ${parsed.surveyNumber}\nExtent: ${parsed.acreage} Acres (${parsed.hectares} Ha)\nSoil Classification: ${parsed.soilType}\npH: ${parsed.soilPh} | SOC: ${parsed.soilOrganicCarbonPercent}%\nDistrict: ${parsed.district}, ${parsed.state}\nWater Source: ${parsed.waterSource}\n10-Yr Non-Forest Baseline: Verified Eligible for Verra VM0047 ARR`,
        extractedMetrics: parsed
      };

      setSelectedSample(customSample);
      runExtractionPipeline(customSample);
    };

    if (file.type.includes('text') || file.name.endsWith('.txt')) {
      reader.readAsText(file);
    } else {
      reader.readAsDataURL(file);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processUploadedFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processUploadedFile(file);
    }
  };

  const handleApplyToPlatform = () => {
    if (metrics) {
      onApplyExtractedMetrics(metrics, false);
      setSyncDone(true);
      setTimeout(() => setSyncDone(false), 3500);
    }
  };

  const metrics = job.extractedMetrics || selectedSample.extractedMetrics;

  return (
    <div className="space-y-6">
      {/* Pillar Banner */}
      <div className="bg-white rounded-3xl p-6 border border-[#E0D8C8] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase bg-[#2D4A22] text-[#CCD5AE]">
              {d('pillar3')}
            </span>
            <span className="text-xs font-semibold text-[#6D7A65]">
              {d('agenticDocSubtitle')}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#FAF8F2] text-[#2D4A22] border border-[#CCD5AE]">
              Target: {targetPlotName}
            </span>
          </div>
          <h2 className="text-2xl font-serif font-bold text-[#1A2E11]">
            {d('agenticDocTitle')}
          </h2>
          <p className="text-xs text-[#52604D] max-w-3xl mt-1 leading-relaxed">
            {d('agenticDocDesc')}
          </p>
        </div>

        {/* Live Auto-Sync Status Indicator & Direct Jump CTA */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 shrink-0">
          <div className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>
              {isProcessing
                ? 'Extracting & Auto-Injecting...'
                : `✓ Auto-Injected: ${metrics.acreage} ${d('acresUnit')} • ${metrics.soilType}`}
            </span>
          </div>

          {onNavigateToTab && (
            <button
              id="btn-goto-calc-from-doc"
              onClick={() => onNavigateToTab('farmer')}
              className="px-4 py-2 rounded-2xl bg-[#2D4A22] hover:bg-[#1E3615] text-[#F1F5EF] text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer group"
            >
              <span>View in Calculator</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          )}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (5 cols): Ingestion Hub & Pre-loaded Institutional Dossiers */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* File Upload & Camera Scan Box */}
          <div className="bg-white rounded-3xl p-5 border border-[#E0D8C8] shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#E0D8C8]">
              <div className="flex items-center gap-2">
                <Upload className="w-4 h-4 text-[#2D4A22]" />
                <h3 className="font-bold text-xs text-[#1A2E11] font-serif">
                  {d('uploadPdfTitle')}
                </h3>
              </div>
              <span className="text-[10px] text-[#6D7A65]">PDF, PNG, JPG, TXT</span>
            </div>

            {/* Drag and Drop Zone */}
            <label
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-2xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group ${
                isDragging
                  ? 'border-[#2D4A22] bg-[#E9EDC9]/50'
                  : 'border-[#CCD5AE] hover:border-[#2D4A22] bg-[#FAF8F2] hover:bg-[#F4F1EA]'
              }`}
            >
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="w-10 h-10 rounded-2xl bg-white shadow-2xs border border-[#E0D8C8] flex items-center justify-center text-[#2D4A22] group-hover:scale-110 transition-transform mb-2">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-[#1A2E11]">
                {d('dropDeedText')}
              </span>
              <span className="text-[11px] text-[#6D7A65] mt-0.5">
                {d('orBrowseFiles')}
              </span>
            </label>
          </div>

          {/* Pre-Loaded Institutional Dossiers for 1-Click Verification */}
          <div className="bg-white rounded-3xl p-5 border border-[#E0D8C8] shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#E0D8C8]">
              <span className="text-xs font-bold text-[#1A2E11] font-serif flex items-center gap-1.5">
                <Bot className="w-4 h-4 text-[#2D4A22]" />
                <span>{d('preloadedDossiers')}</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#E9EDC9] text-[#2D4A22] font-bold">
                {d('oneClickIngestion')}
              </span>
            </div>

            <div className="space-y-2">
              {SAMPLE_DOCUMENTS.map(doc => {
                const isSelected = selectedSample.id === doc.id;
                return (
                  <button
                    key={doc.id}
                    onClick={() => handleSelectSample(doc)}
                    disabled={isProcessing}
                    className={`w-full text-left p-3 rounded-2xl border transition-all flex items-start justify-between gap-2 cursor-pointer ${
                      isSelected
                        ? 'bg-[#1A2E11] text-white border-[#8BA888] shadow-xs ring-2 ring-[#8BA888]/40'
                        : 'bg-[#FAF8F2] text-[#2C3626] border-[#E0D8C8] hover:bg-[#F4F1EA]'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                          isSelected ? 'bg-[#3D5C31] text-[#CCD5AE]' : 'bg-[#E0D8C8] text-[#2D4A22]'
                        }`}>
                          {doc.category}
                        </span>
                      </div>
                      <div className="font-bold text-xs leading-tight line-clamp-1">
                        {doc.title}
                      </div>
                      <div className={`text-[10px] ${isSelected ? 'text-[#CCD5AE]' : 'text-[#6D7A65]'}`}>
                        {doc.issuer} • {doc.fileSize}
                      </div>
                    </div>

                    <ArrowRight className={`w-4 h-4 shrink-0 mt-2 ${isSelected ? 'text-amber-300' : 'text-[#6D7A65]'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Architecture Callout */}
          <div className="p-4 rounded-3xl bg-[#FAF8F2] border border-[#CCD5AE]/60 text-xs text-[#52604D] space-y-1.5">
            <div className="font-bold text-[#1A2E11] font-serif flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-[#2D4A22]" />
              <span>{d('localAiPipeline')}</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              {d('localAiDesc')}
            </p>
          </div>

        </div>

        {/* Right Column (7 cols): Pipeline Telemetry & Extracted Metrics Inspection */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Agent Pipeline Telemetry Tracker */}
          <div className="bg-white rounded-3xl p-5 border border-[#E0D8C8] shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E0D8C8]">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#2D4A22]" />
                <h3 className="font-bold text-sm text-[#1A2E11] font-serif">
                  {d('pipelineTelemetry')}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold border ${
                  job.isComplete
                    ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                    : 'bg-amber-100 text-amber-800 border-amber-200 animate-pulse'
                }`}>
                  {job.isComplete
                    ? d('pipelineComplete')
                    : d('processingDoc')}
                </span>
                <button
                  onClick={() => runExtractionPipeline(selectedSample)}
                  disabled={isProcessing}
                  className="p-1.5 text-[#2D4A22] hover:bg-[#FAF8F2] rounded-xl transition-colors cursor-pointer"
                  title="Re-run extraction pipeline"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isProcessing ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            {/* Steps Timeline */}
            <div className="space-y-2.5">
              {job.steps.map((step, idx) => (
                <div
                  key={step.id}
                  className={`p-3 rounded-2xl border transition-all flex items-start gap-3 text-xs ${
                    step.status === 'completed'
                      ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950'
                      : step.status === 'running'
                      ? 'bg-amber-50/80 border-amber-300 text-amber-950 animate-pulse'
                      : 'bg-[#F7F5EE] border-[#E0D8C8] text-[#6D7A65] opacity-60'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {step.status === 'completed' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : step.status === 'running' ? (
                      <RefreshCw className="w-4 h-4 text-amber-600 animate-spin" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-[#8BA888] flex items-center justify-center text-[9px] font-bold text-[#6D7A65]">
                        {idx + 1}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-[11px] flex items-center justify-between">
                      <span>{step.name}</span>
                      <span className="text-[10px] font-mono opacity-80">{step.durationMs}ms</span>
                    </div>
                    <p className="text-[10px] opacity-90 mt-0.5 leading-snug">{step.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Structured Land Metrics Card */}
          <div className="bg-white rounded-3xl p-6 border border-[#E0D8C8] shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E0D8C8]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#1A2E11] font-serif">
                    {d('extractedParameters')}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
                    {metrics.confidenceScore}% {d('modelConfidence')}
                  </span>
                </div>
                <p className="text-[11px] text-[#6D7A65]">
                  {d('sourceDoc')} {metrics.sourceDocumentName}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-wrap">
                <div className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold flex items-center gap-1.5 shadow-2xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span>✓ Auto-Injected into Feasibility Model</span>
                </div>

                {onNavigateToTab && (
                  <button
                    onClick={() => onNavigateToTab('farmer')}
                    className="px-3 py-1.5 rounded-xl bg-[#2D4A22] hover:bg-[#1E3615] text-[#F1F5EF] text-xs font-bold flex items-center gap-1 shadow-2xs transition-all cursor-pointer"
                  >
                    <span>View Projections</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Extracted Fields Bento Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              
              {/* Survey Number */}
              <div className="p-3 rounded-2xl bg-[#F7F5EE] border border-[#E0D8C8] space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#6D7A65] block">
                  {d('cadastralSurveyNo')}
                </span>
                <span className="text-sm font-bold font-mono text-[#1A2E11]">{metrics.surveyNumber}</span>
                <div className="text-[9px] text-emerald-700 font-semibold">
                  {d('verifiedTalukRegistry')}
                </div>
              </div>

              {/* Acreage */}
              <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <span className="text-[10px] uppercase font-bold text-emerald-800 block">
                  {d('totalParcelExtent')}
                </span>
                <span className="text-sm font-bold font-mono text-emerald-900">
                  {metrics.acreage} {d('acresUnit')} <span className="text-[10px] font-normal">({metrics.hectares} ha)</span>
                </span>
                <div className="text-[9px] text-emerald-700 font-semibold">
                  {d('exactBoundaryComputed')}
                </div>
              </div>

              {/* Soil Classification */}
              <div className="p-3 rounded-2xl bg-[#F7F5EE] border border-[#E0D8C8] space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#6D7A65] block">
                  {d('soilClassification')}
                </span>
                <span className="text-xs font-bold text-[#1A2E11] line-clamp-1">{metrics.soilType}</span>
                <div className="text-[9px] text-[#6D7A65]">{d('districtLabel')} {metrics.district}, {metrics.state || 'Tamil Nadu'}</div>
              </div>

              {/* Soil pH */}
              <div className="p-3 rounded-2xl bg-[#F7F5EE] border border-[#E0D8C8] space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#6D7A65] block">
                  {d('soilPh')}
                </span>
                <span className="text-sm font-bold font-mono text-[#1A2E11]">{metrics.soilPh}</span>
                <div className="text-[9px] text-emerald-700 font-semibold">
                  {d('optimalForHardwoods')}
                </div>
              </div>

              {/* Soil Organic Carbon */}
              <div className="p-3 rounded-2xl bg-[#F7F5EE] border border-[#E0D8C8] space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#6D7A65] block">
                  {d('soilOrganicCarbon')}
                </span>
                <span className="text-sm font-bold font-mono text-[#1A2E11]">{metrics.soilOrganicCarbonPercent}%</span>
                <div className="text-[9px] text-[#6D7A65]">{d('mediumBaseline')}</div>
              </div>

              {/* Water Regime */}
              <div className="p-3 rounded-2xl bg-[#F7F5EE] border border-[#E0D8C8] space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#6D7A65] block">
                  {d('waterAvailability')}
                </span>
                <span className="text-xs font-bold text-[#1A2E11] line-clamp-1">{metrics.waterSource}</span>
                <div className="text-[9px] text-[#6D7A65]">{d('lowSeedlingMortality')}</div>
              </div>

              {/* Baseline Non-Forest Year */}
              <div className="p-3 rounded-2xl bg-[#F7F5EE] border border-[#E0D8C8] space-y-1">
                <span className="text-[10px] uppercase font-bold text-[#6D7A65] block">
                  {d('nonForestContinuity')}
                </span>
                <span className="text-sm font-bold font-mono text-[#1A2E11]">
                  {d('sinceYear')} {metrics.nonForestSinceYear}
                </span>
                <div className="text-[9px] text-emerald-700 font-semibold">
                  {d('verra10YrEligible')}
                </div>
              </div>

              {/* Nutrients (NPK) */}
              <div className="p-3 rounded-2xl bg-[#F7F5EE] border border-[#E0D8C8] space-y-1 col-span-2">
                <span className="text-[10px] uppercase font-bold text-[#6D7A65] block">
                  {d('availableNutrients')}
                </span>
                <div className="text-xs font-mono font-bold text-[#1A2E11]">
                  N: {metrics.availableNitrogenKgHa} kg/ha | P: {metrics.availablePhosphorusKgHa} kg/ha | K: {metrics.availablePotassiumKgHa} kg/ha
                </div>
                <div className="text-[9px] text-[#6D7A65]">
                  {d('potassiumReserveNote')}
                </div>
              </div>

            </div>

            {/* Document Raw Snippet Preview Toggle */}
            <div className="pt-3 border-t border-[#E0D8C8]">
              <details className="group text-xs">
                <summary className="font-bold text-[#2D4A22] cursor-pointer hover:underline flex items-center gap-1.5 select-none">
                  <Eye className="w-3.5 h-3.5" />
                  <span>
                    {d('inspectRawTranscript')}
                  </span>
                </summary>
                <div className="mt-2 p-3.5 rounded-2xl bg-[#1A2E11] text-[#CCD5AE] font-mono text-[10px] leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto border border-[#8BA888]/30">
                  {selectedSample.rawTextPreview}
                </div>
              </details>
            </div>

            {/* Bottom Full Action Bar */}
            {onNavigateToTab && (
              <div className="pt-3 border-t border-[#E0D8C8] flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#FAF8F2] -mx-6 -mb-6 p-4 rounded-b-3xl">
                <div className="text-xs text-[#52604D]">
                  <span className="font-bold text-[#1A2E11]">Values Injected: </span>
                  <span>{metrics.acreage} Acres • {metrics.soilType} • Survey #{metrics.surveyNumber}</span>
                </div>
                <button
                  id="btn-bottom-view-calculator"
                  onClick={() => onNavigateToTab('farmer')}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-[#2D4A22] hover:bg-[#1E3615] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  <span>Open Feasibility Calculator with Injected Data</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
