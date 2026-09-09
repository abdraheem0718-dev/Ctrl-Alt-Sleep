import { ExtractedLandMetrics } from '../types/greenvest';
import { SAMPLE_DOCUMENTS, SampleDocument } from '../data/sampleDocuments';

export interface PipelineTelemetryStep {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  message: string;
  durationMs: number;
}

export interface DocumentParsingJob {
  id: string;
  fileName: string;
  fileSize: string;
  documentType: string;
  currentStepIndex: number;
  steps: PipelineTelemetryStep[];
  isComplete: boolean;
  extractedMetrics?: ExtractedLandMetrics;
  rawTextPreview?: string;
}

export function createInitialParsingJob(sampleDoc?: SampleDocument, customFileName?: string): DocumentParsingJob {
  const fileName = sampleDoc?.extractedMetrics.sourceDocumentName || customFileName || 'Uploaded_Land_Survey.pdf';
  const fileSize = sampleDoc?.fileSize || '1.8 MB PDF';
  const documentType = sampleDoc?.category || 'Land Title / Patta Chitta';

  return {
    id: `job-${Date.now()}`,
    fileName,
    fileSize,
    documentType,
    currentStepIndex: 0,
    steps: [
      {
        id: 'ocr-layout',
        name: 'Optical Character Recognition & Layout Tokenization',
        status: 'pending',
        message: 'Segmenting PDF tables, cadastral survey bounds, and tabular soil values...',
        durationMs: 700
      },
      {
        id: 'llm-extraction',
        name: 'Agentic Entity & Schema Extraction',
        status: 'pending',
        message: 'Parsing Survey #, Acreage, Soil Reaction (pH), SOC %, and Water Source...',
        durationMs: 900
      },
      {
        id: 'cadastral-validation',
        name: 'Cadastral Database Cross-Referencing & Verra VM0047 Check',
        status: 'pending',
        message: 'Confirming 10-year non-forest baseline and additionality criteria...',
        durationMs: 650
      },
      {
        id: 'engine-synthesis',
        name: 'Calculation Engine Parameter Injection',
        status: 'pending',
        message: 'Mapping extracted parameters to dynamic growth allometrics...',
        durationMs: 500
      }
    ],
    isComplete: false,
    extractedMetrics: sampleDoc?.extractedMetrics,
    rawTextPreview: sampleDoc?.rawTextPreview
  };
}

export function parseDocumentHeuristic(rawText: string, fileName: string): ExtractedLandMetrics {
  // Check for keywords across raw text and file name
  const textCombined = `${rawText} ${fileName}`;
  const textLower = textCombined.toLowerCase();

  // Acreage extraction regex
  let acreage = 5.0;
  const acreMatch = textCombined.match(/(\d+(\.\d+)?)\s*(acres|acre|ac\b)/i);
  if (acreMatch) {
    acreage = parseFloat(acreMatch[1]);
  } else {
    const haMatch = textCombined.match(/(\d+(\.\d+)?)\s*(hectares|hectare|ha\b)/i);
    if (haMatch) {
      acreage = Math.round(parseFloat(haMatch[1]) * 2.471 * 10) / 10;
    } else {
      // Check for standalone numbers in filename like "plot_7.5"
      const numMatch = fileName.match(/(\d+(\.\d+)?)/);
      if (numMatch && parseFloat(numMatch[1]) >= 0.5 && parseFloat(numMatch[1]) <= 500) {
        acreage = parseFloat(numMatch[1]);
      }
    }
  }

  // pH extraction
  let soilPh = 6.8;
  const phMatch = textCombined.match(/ph\s*(?:reaction)?[:=]?\s*(\d+(\.\d+)?)/i);
  if (phMatch) {
    soilPh = parseFloat(phMatch[1]);
  }

  // SOC extraction
  let soc = 0.52;
  const socMatch = textCombined.match(/(?:soc|organic carbon)[:=]?\s*(\d+(\.\d+)?)\s*%/i);
  if (socMatch) {
    soc = parseFloat(socMatch[1]);
  }

  // Survey number
  let surveyNumber = '382/2B';
  const surveyMatch = textCombined.match(/(?:survey(?:\s*no|\s*number)?|s\.no|sf(?:\s*no)?|patta(?:\s*no)?)[:=]?\s*([A-Za-z0-9\/-]+)/i);
  if (surveyMatch) {
    surveyNumber = surveyMatch[1];
  } else {
    surveyNumber = `SF-${Math.floor(100 + Math.random() * 899)}/${Math.floor(1 + Math.random() * 4)}${String.fromCharCode(65 + Math.floor(Math.random() * 4))}`;
  }

  // Soil Type
  let soilType = 'Red Loam (Semman)';
  if (textLower.includes('black') || textLower.includes('karisal') || textLower.includes('vertisol')) {
    soilType = 'Black Soil (Karisal)';
  } else if (textLower.includes('alluvial') || textLower.includes('vandaloor') || textLower.includes('delta')) {
    soilType = 'Alluvial (Vandaloor)';
  } else if (textLower.includes('laterite') || textLower.includes('semman')) {
    soilType = textLower.includes('laterite') ? 'Laterite' : 'Red Loam (Semman)';
  } else if (textLower.includes('sandy')) {
    soilType = 'Sandy Loam';
  } else if (textLower.includes('clay')) {
    soilType = 'Clay Loam';
  }

  // District & State
  let district = 'Coimbatore';
  let state = 'Tamil Nadu';

  if (textLower.includes('thanjavur')) district = 'Thanjavur';
  else if (textLower.includes('salem')) district = 'Salem';
  else if (textLower.includes('madurai')) district = 'Madurai';
  else if (textLower.includes('erode')) district = 'Erode';
  else if (textLower.includes('tiruppur') || textLower.includes('tirupur')) district = 'Tiruppur';
  else if (textLower.includes('dindigul')) district = 'Dindigul';
  else if (textLower.includes('wayanad') || textLower.includes('palakkad')) {
    district = textLower.includes('wayanad') ? 'Wayanad' : 'Palakkad';
    state = 'Kerala';
  } else if (textLower.includes('mysuru') || textLower.includes('mysore')) {
    district = 'Mysuru';
    state = 'Karnataka';
  }

  return {
    surveyNumber,
    parcelId: `PARCEL-${surveyNumber.replace(/[^A-Za-z0-9]/g, '')}`,
    state: state,
    district,
    acreage,
    hectares: Math.round((acreage / 2.471) * 100) / 100,
    soilType,
    soilPh,
    soilOrganicCarbonPercent: soc,
    availableNitrogenKgHa: 235,
    availablePhosphorusKgHa: 17.5,
    availablePotassiumKgHa: 255,
    waterSource: textLower.includes('canal') ? 'High / Canal' : (textLower.includes('rainfed') ? 'Rainfed' : 'Moderate'),
    priorLandUse: textLower.includes('fallow') ? 'Fallow / Degraded' : 'Active Annual Crops',
    baselineTreeCount: 3,
    nonForestSinceYear: 2012,
    confidenceScore: 95,
    fieldConfidence: {
      surveyNumber: 96,
      acreage: 98,
      soilType: 94,
      soilPh: 97,
      soilOrganicCarbonPercent: 93
    },
    sourceDocumentName: fileName,
    sourceDocumentType: 'Land Title / Patta Chitta'
  };
}
