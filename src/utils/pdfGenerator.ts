import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { FeasibilityAssessment } from '../types/greenvest';
import { QualifiedFarmerRecord } from '../data/aggregationClusters';
import { Language } from './translations';

export interface GeneratePdfOptions {
  assessment: FeasibilityAssessment;
  registeredFarmer?: QualifiedFarmerRecord | null;
  language: Language;
  elementId?: string;
  onProgress?: (status: 'starting' | 'rendering' | 'compiling' | 'success' | 'error', message?: string) => void;
}

/**
 * Triggers browser download of a jsPDF instance using reliable Blob Object URL
 * with automatic cleanup and secondary fallback to pdf.save().
 */
export function triggerPdfDownload(pdf: jsPDF, fileName: string): boolean {
  try {
    const blob = pdf.output('blob');
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName.endsWith('.pdf') ? fileName : `${fileName}.pdf`;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      if (document.body.contains(link)) {
        document.body.removeChild(link);
      }
      URL.revokeObjectURL(blobUrl);
    }, 2500);
    return true;
  } catch (err) {
    console.warn('Blob URL download failed, falling back to pdf.save():', err);
    try {
      pdf.save(fileName);
      return true;
    } catch (saveErr) {
      console.error('All PDF download mechanisms failed:', saveErr);
      return false;
    }
  }
}

/**
 * Downloads a high-resolution, multi-page PDF of the agroforestry dossier.
 * Uses html2canvas for pixel-perfect fidelity with regional language font support,
 * with an automatic programmatic jsPDF vector fallback if canvas rasterization fails.
 */
export async function downloadDossierPdf(options: GeneratePdfOptions): Promise<boolean> {
  const {
    assessment,
    registeredFarmer,
    language,
    elementId = 'print-dossier-root',
    onProgress
  } = options;

  onProgress?.('starting', 'Preparing dossier layout...');

  const cleanDistrict = (assessment.inputs.district || 'Parcel').replace(/[^a-zA-Z0-9]/g, '_');
  const landArea = assessment.inputs.landArea || 1;
  const fileName = `GreenVest_Dossier_${cleanDistrict}_${landArea}Acres.pdf`;

  // 1. First approach: Capture rendered DOM element via html2canvas (with a 4-second timeout guard)
  const element = document.getElementById(elementId);
  if (element) {
    try {
      onProgress?.('rendering', 'Rendering high-resolution pages...');

      const renderPromise = html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff',
        windowWidth: 1024,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.getElementById(elementId);
          if (clonedElement) {
            clonedElement.style.width = '850px';
            clonedElement.style.maxWidth = '850px';
            clonedElement.style.margin = '0 auto';
            clonedElement.style.padding = '30px';
            clonedElement.style.background = '#ffffff';
          }
        }
      });

      // 4-second timeout to prevent stalling
      const timeoutPromise = new Promise<null>((_, reject) =>
        setTimeout(() => reject(new Error('html2canvas timed out')), 4000)
      );

      const canvas = await Promise.race([renderPromise, timeoutPromise]);

      if (canvas) {
        onProgress?.('compiling', 'Compiling multi-page PDF document...');

        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
          compress: true
        });

        const pdfWidth = 210; // A4 width in mm
        const pdfHeight = 297; // A4 height in mm
        const marginMm = 8;
        const printableWidthMm = pdfWidth - marginMm * 2; // 194 mm
        const printableHeightMm = pdfHeight - marginMm * 2; // 281 mm

        const imgWidthPx = canvas.width;
        const imgHeightPx = canvas.height;
        const pageHeightPx = Math.floor((printableHeightMm * imgWidthPx) / printableWidthMm);

        let renderedHeightPx = 0;
        let pageIndex = 0;

        while (renderedHeightPx < imgHeightPx) {
          if (pageIndex > 0) {
            pdf.addPage();
          }

          const currentSliceHeightPx = Math.min(pageHeightPx, imgHeightPx - renderedHeightPx);
          const sliceCanvas = document.createElement('canvas');
          sliceCanvas.width = imgWidthPx;
          sliceCanvas.height = currentSliceHeightPx;

          const ctx = sliceCanvas.getContext('2d');
          if (ctx) {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, imgWidthPx, currentSliceHeightPx);
            ctx.drawImage(
              canvas,
              0,
              renderedHeightPx,
              imgWidthPx,
              currentSliceHeightPx,
              0,
              0,
              imgWidthPx,
              currentSliceHeightPx
            );

            const sliceDataUrl = sliceCanvas.toDataURL('image/jpeg', 0.95);
            const sliceHeightMm = (currentSliceHeightPx * printableWidthMm) / imgWidthPx;

            pdf.addImage(
              sliceDataUrl,
              'JPEG',
              marginMm,
              marginMm,
              printableWidthMm,
              sliceHeightMm,
              undefined,
              'FAST'
            );

            // Page numbering
            pdf.setFontSize(8);
            pdf.setTextColor(109, 122, 101);
            pdf.text(
              `GreenVest Agroforestry Dossier • Page ${pageIndex + 1}`,
              pdfWidth / 2,
              pdfHeight - 4,
              { align: 'center' }
            );
          }

          renderedHeightPx += currentSliceHeightPx;
          pageIndex++;
        }

        const downloaded = triggerPdfDownload(pdf, fileName);
        if (downloaded) {
          onProgress?.('success', 'PDF saved successfully!');
          return true;
        }
      }
    } catch (renderError) {
      console.warn('html2canvas rendering encountered issue, triggering programmatic vector PDF fallback:', renderError);
    }
  }

  // 2. Secondary fallback: Programmatic vector jsPDF generation (guaranteed offline generation)
  try {
    onProgress?.('compiling', 'Compiling vector fallback PDF...');
    const pdf = generateVectorFallbackPdf(assessment, registeredFarmer, language);
    const downloaded = triggerPdfDownload(pdf, fileName);
    if (downloaded) {
      onProgress?.('success', 'PDF saved successfully!');
      return true;
    }
    onProgress?.('error', 'Unable to initiate download.');
    return false;
  } catch (vectorError) {
    console.error('Vector PDF generation also failed:', vectorError);
    onProgress?.('error', 'Unable to generate PDF directly.');
    return false;
  }
}

/**
 * Clean programmatic vector PDF generator as an infallible fallback
 */
function generateVectorFallbackPdf(
  assessment: FeasibilityAssessment,
  registeredFarmer: QualifiedFarmerRecord | null | undefined,
  language: Language
): jsPDF {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const { inputs, recommendedSpecies, totalTreeCount, sequestration10Year, carbonRevenue10Year, costBreakdown, netPotential10Year, confidence, confidenceScore } = assessment;
  const refId = registeredFarmer?.id || `GV-${inputs.district.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

  // Page 1
  let y = 15;

  // Header Banner
  pdf.setFillColor(26, 46, 17); // #1A2E11
  pdf.rect(10, y, 190, 18, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(14);
  pdf.text('GREENVEST AGROFORESTRY INTELLIGENCE', 15, y + 8);
  pdf.setFontSize(9);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Pre-Feasibility & Technical Screening Assessment (Verra VM0047 ARR / ICAR-CAFRI)', 15, y + 14);

  y += 24;

  // Metadata block
  pdf.setTextColor(26, 46, 17);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10);
  pdf.text(`Dossier Ref: ${refId}`, 12, y);
  pdf.text(`Date: ${new Date().toLocaleDateString('en-IN')}`, 90, y);
  pdf.text(`Confidence: ${confidence.toUpperCase()} (${confidenceScore}%)`, 150, y);

  y += 6;
  pdf.setDrawColor(204, 213, 174);
  pdf.line(10, y, 200, y);
  y += 6;

  // Aggregator Status
  pdf.setFillColor(244, 247, 238);
  pdf.roundedRect(10, y, 190, 16, 2, 2, 'F');
  pdf.setTextColor(45, 74, 34);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(9);
  pdf.text('AGGREGATOR HUB ENROLLMENT STATUS: ENROLLED FOR ZERO-COST DEVELOPER AGGREGATION', 14, y + 6);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(8);
  pdf.setTextColor(60, 70, 50);
  pdf.text(`Farmer Pseudonym: ${registeredFarmer?.farmerNamePseudonym || 'Enrolled Farmer'}  |  Upfront Fee: Rs. 0 (100% Free)  |  Baseline & MRV Covered by Developer`, 14, y + 11);

  y += 22;

  // Section 1: Parcel Particulars
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10);
  pdf.setTextColor(26, 46, 17);
  pdf.text('1. PARCEL PARTICULARS & SITE SPECIFICATIONS', 12, y);
  y += 5;

  pdf.setFillColor(253, 251, 247);
  pdf.roundedRect(10, y, 190, 22, 2, 2, 'FD');
  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(70, 80, 70);

  const col1 = 14;
  const col2 = 60;
  const col3 = 110;
  const col4 = 155;

  pdf.text(`Land Area: ${inputs.landArea} Acres (${(inputs.landArea * 0.4047).toFixed(2)} ha)`, col1, y + 6);
  pdf.text(`Location: ${inputs.district}, ${inputs.state}`, col2, y + 6);
  pdf.text(`Soil Type: ${inputs.soilType}`, col3, y + 6);
  pdf.text(`Water: ${inputs.waterAvailability}`, col4, y + 6);

  pdf.text(`Current Use: ${inputs.currentLandUse}`, col1, y + 14);
  pdf.text(`Planting Pattern: ${inputs.plantingModel}`, col2, y + 14);
  pdf.text(`Capacity: ${totalTreeCount} Trees (~${assessment.treesPerAcre} /ac)`, col3, y + 14);
  pdf.text(`Irrigation: Drip/Rainfed`, col4, y + 14);

  y += 28;

  // Section 2: Recommended Species
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10);
  pdf.setTextColor(26, 46, 17);
  pdf.text(`2. RECOMMENDED AGROFORESTRY SPECIES MIX (${totalTreeCount} Trees Total)`, 12, y);
  y += 5;

  // Table header
  pdf.setFillColor(26, 46, 17);
  pdf.rect(10, y, 190, 7, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(8);
  pdf.text('Tree Species', 14, y + 5);
  pdf.text('Botanical Name', 65, y + 5);
  pdf.text('Allocation %', 115, y + 5);
  pdf.text('Survival Rate', 140, y + 5);
  pdf.text('Harvest Cycle', 170, y + 5);

  y += 7;

  recommendedSpecies.forEach((sp, idx) => {
    pdf.setFillColor(idx % 2 === 0 ? 255 : 248, idx % 2 === 0 ? 255 : 248, idx % 2 === 0 ? 255 : 245);
    pdf.rect(10, y, 190, 7, 'F');
    pdf.setTextColor(26, 46, 17);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    pdf.text(sp.name, 14, y + 5);
    pdf.setFont('helvetica', 'italic');
    pdf.text(sp.botanicalName, 65, y + 5);
    pdf.setFont('helvetica', 'normal');
    const allocation = Math.round(100 / (recommendedSpecies.length || 1));
    pdf.text(`${allocation}%`, 118, y + 5);
    pdf.text(`${Math.round(sp.survivalRateExpected * 100)}%`, 143, y + 5);
    pdf.text(sp.rotationCycleYears ? `${sp.rotationCycleYears} Yrs` : 'Permanent', 172, y + 5);
    y += 7;
  });

  y += 7;

  // Section 3: Financial Projections
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(10);
  pdf.setTextColor(26, 46, 17);
  pdf.text('3. 10-YEAR CARBON & FINANCIAL PROJECTION RANGES (INR)', 12, y);
  y += 5;

  pdf.setFillColor(26, 46, 17);
  pdf.rect(10, y, 190, 7, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(8);
  pdf.text('Financial Parameter', 14, y + 5);
  pdf.text('P10 (Conservative)', 80, y + 5);
  pdf.text('P50 (Expected Baseline)', 120, y + 5);
  pdf.text('P90 (Optimistic)', 165, y + 5);

  y += 7;

  const rows = [
    { label: 'Net Carbon Yield (t CO2e)', p10: `${sequestration10Year.p10} t`, p50: `${sequestration10Year.p50} t`, p90: `${sequestration10Year.p90} t` },
    { label: 'Gross Carbon Revenue (INR)', p10: `Rs. ${carbonRevenue10Year.p10.toLocaleString('en-IN')}`, p50: `Rs. ${carbonRevenue10Year.p50.toLocaleString('en-IN')}`, p90: `Rs. ${carbonRevenue10Year.p90.toLocaleString('en-IN')}` },
    { label: '10-Yr Total Costs (CapEx + Maint)', p10: `Rs. ${costBreakdown.total10YearCost.toLocaleString('en-IN')}`, p50: `Rs. ${costBreakdown.total10YearCost.toLocaleString('en-IN')}`, p90: `Rs. ${costBreakdown.total10YearCost.toLocaleString('en-IN')}` },
    { label: 'NET FINANCIAL BENEFIT (INR)', p10: `Rs. ${netPotential10Year.p10.toLocaleString('en-IN')}`, p50: `Rs. ${netPotential10Year.p50.toLocaleString('en-IN')}`, p90: `Rs. ${netPotential10Year.p90.toLocaleString('en-IN')}`, highlight: true }
  ];

  rows.forEach((r, idx) => {
    pdf.setFillColor(r.highlight ? 233 : (idx % 2 === 0 ? 255 : 248), r.highlight ? 237 : (idx % 2 === 0 ? 255 : 248), r.highlight ? 201 : 245);
    pdf.rect(10, y, 190, 7, 'F');
    pdf.setTextColor(26, 46, 17);
    pdf.setFont('helvetica', r.highlight ? 'bold' : 'normal');
    pdf.setFontSize(8);
    pdf.text(r.label, 14, y + 5);
    pdf.text(r.p10, 80, y + 5);
    pdf.text(r.p50, 120, y + 5);
    pdf.text(r.p90, 165, y + 5);
    y += 7;
  });

  y += 10;

  // Footer Seal & Certification
  pdf.setDrawColor(26, 46, 17);
  pdf.setLineWidth(0.5);
  pdf.line(10, y, 200, y);
  y += 6;

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(9);
  pdf.setTextColor(45, 74, 34);
  pdf.text('GREENVEST DECISION INTELLIGENCE - AUDITABLE METHODOLOGY CERTIFICATE', 12, y);
  y += 4;
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(7.5);
  pdf.setTextColor(90, 100, 90);
  pdf.text('Calibrated with ICAR-CAFRI (Jhansi) & FRI (Dehradun) published yield tables. Compliant with Verra VM0047 ARR and IPCC AFOLU Tier-1 & Tier-2 accounting.', 12, y);
  y += 4;
  pdf.text('GreenVest operates on an independent pre-feasibility mandate. Zero commissions taken from tree harvests.', 12, y);

  return pdf;
}
