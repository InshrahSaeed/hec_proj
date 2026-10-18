import React, { useState } from 'react';
import {
  FileText,
  Copy,
  Download,
  Check,
  AlertTriangle,
  ExternalLink,
  ShieldAlert,
  ArrowRight,
  Info
} from 'lucide-react';
import { Language, IncidentCategory } from '../types';
import { translations } from '../data/translations';

interface ComplaintDraftGeneratorProps {
  language: Language;
}

export const ComplaintDraftGenerator: React.FC<ComplaintDraftGeneratorProps> = ({ language }) => {
  const t = translations[language];

  const [category, setCategory] = useState<IncidentCategory>('blackmail');
  const [complainantName, setComplainantName] = useState('');
  const [city, setCity] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [incidentPlatform, setIncidentPlatform] = useState('Instagram');
  const [perpetratorIdentifier, setPerpetratorIdentifier] = useState('');
  const [incidentStartDate, setIncidentStartDate] = useState('');
  const [financialExtortionDetails, setFinancialExtortionDetails] = useState('');
  const [summaryOfFacts, setSummaryOfFacts] = useState('');
  const [evidenceListInput, setEvidenceListInput] = useState(
    'Uncropped screenshots of blackmail messages\nProfile URL of accused account\nCall logs / WhatsApp chat backup'
  );
  const [pecaSections, setPecaSections] = useState<string[]>([
    'Section 21: Offences against modesty of natural person & minor (Extortion / Intimate Imagery)',
    'Section 20: Offences against dignity of a natural person (Defamation / Vilification)',
    'Section 24: Cyberstalking & persistent electronic harassment',
  ]);

  const [generatedDraft, setGeneratedDraft] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const availableSections = [
    'Section 21: Offences against modesty of natural person & minor (Extortion / Intimate Imagery)',
    'Section 20: Offences against dignity of a natural person (Defamation / Vilification)',
    'Section 24: Cyberstalking & persistent electronic harassment',
    'Section 14: Unauthorized use of identity information (Impersonation / Fake Accounts)',
    'Section 3: Unauthorized access to information system (Account Hacking)',
    'Section 16: Unauthorized copy or transmission of critical personal data',
  ];

  const toggleSection = (sec: string) => {
    if (pecaSections.includes(sec)) {
      setPecaSections(pecaSections.filter((s) => s !== sec));
    } else {
      setPecaSections([...pecaSections, sec]);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!summaryOfFacts.trim()) return;

    setIsGenerating(true);

    try {
      const response = await fetch('/api/generate-complaint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          complainantName,
          contactPhone,
          contactEmail,
          city,
          incidentCategory: category,
          incidentStartDate,
          incidentPlatform,
          perpetratorIdentifier,
          summaryOfFacts,
          financialExtortionDetails,
          evidenceList: evidenceListInput.split('\n').filter((l) => l.trim().length > 0),
          applicablePecaSections: pecaSections,
        }),
      });

      if (!response.ok) throw new Error('Generation failed');

      const data = await response.json();
      setGeneratedDraft(data.draft);
    } catch (err) {
      console.error(err);
      // Client-side fallback generation
      const dateStr = new Date().toLocaleDateString('en-GB');
      const fallback = `================================================================================
FORMAL COMPLAINT DRAFT FOR SUBMISSION TO:
NATIONAL CYBER CRIME INVESTIGATION AGENCY (NCCIA)
GOVERNMENT OF PAKISTAN (https://complaint.nccia.gov.pk/)
================================================================================

DATE: ${dateStr}

TO:
The In-Charge / Director,
National Cyber Crime Investigation Agency (NCCIA),
${city ? `${city} Regional Office` : 'Cyber Crime Wing'}, Pakistan.

SUBJECT: FORMAL COMPLAINT UNDER THE PREVENTION OF ELECTRONIC CRIMES ACT (PECA) 2016

1. COMPLAINANT PARTICULARS:
   - Name: ${complainantName || '[To be entered on portal / withheld for privacy]'}
   - City: ${city || '[City]'}
   - Contact Phone: ${contactPhone || '[Phone]'}
   - Contact Email: ${contactEmail || '[Email]'}

2. PARTICULARS OF THE ACCUSED / PERPETRATOR:
   - Account Handle / Number / Identifier: ${perpetratorIdentifier || 'Unknown'}
   - Platform: ${incidentPlatform}
   - Date Commenced: ${incidentStartDate || 'Recent weeks'}

3. SUMMARY OF FACTUAL ALLEGATIONS:
${summaryOfFacts}
${financialExtortionDetails ? `\nFinancial Demands: ${financialExtortionDetails}` : ''}

4. STATUTORY VIOLATIONS UNDER PECA 2016:
${pecaSections.map((s) => `   - ${s}`).join('\n')}

5. EVIDENCE LIST ATTACHED:
${evidenceListInput.split('\n').filter((l) => l.trim()).map((l, idx) => `   [${idx + 1}] ${l}`).join('\n')}

6. PRAYER / RELIEF SOUGHT:
   It is respectfully prayed that NCCIA trace the IP address/subscriber records of the offender,
   block further circulation via PTA, and initiate statutory legal proceedings under PECA 2016.

Complainant Signature: _________________________
Date: ${dateStr}
================================================================================`;
      setGeneratedDraft(fallback);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!generatedDraft) return;
    navigator.clipboard.writeText(generatedDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!generatedDraft) return;
    const element = document.createElement('a');
    const file = new Blob([generatedDraft], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `NCCIA-Complaint-Draft-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Intro Card */}
      <div className="bg-white rounded-3xl border border-[#D4EBE2] p-6 sm:p-8 shadow-sm">
        <div className="border-b border-[#D4EBE2] pb-6 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4EBE2] text-[#174E4A] text-xs font-bold mb-3">
            <FileText className="w-3.5 h-3.5" />
            <span>{language === 'ur' ? 'این سی سی آئی اے شکایت مسودہ' : 'NCCIA Formal Complaint Draft'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#174E4A] tracking-tight">
            {t.complaintGeneratorTitle}
          </h2>
          <p className="text-xs sm:text-sm text-[#2E5853] mt-2 leading-relaxed">
            {t.complaintGeneratorSubtitle}
          </p>
        </div>

        {/* Warning & Notice Banner */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 flex items-start gap-3 mb-8">
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm space-y-1">
            <p className="font-bold">
              {language === 'ur' ? 'اہم قانونی وضاحت:' : 'Important Statutory Disclaimer:'}
            </p>
            <p className="leading-relaxed">
              {language === 'ur'
                ? 'حفاظت ایپ ازخود کوئی شکایت یا رپورٹ جمع نہیں کرتی۔ یہ صرف آپ کے فراہم کردہ حقائق کی روشنی میں ایک قانونی مسودہ تیار کرتی ہے جسے آپ سرکاری پورٹل (complaint.nccia.gov.pk) پر خود جمع کرائیں گی۔'
                : 'HIFAZAT does NOT automatically file complaints with law enforcement. You retain full control over your narrative. Once generated, copy this draft and submit it directly to the official portal: complaint.nccia.gov.pk or print it for walk-in submission.'}
            </p>
          </div>
        </div>

        <form onSubmit={handleGenerate} className="space-y-6">
          {/* Section 1: Facts of Incident */}
          <div className="space-y-4">
            <h3 className="font-bold text-sm sm:text-base text-[#174E4A] flex items-center gap-2 border-b border-[#D4EBE2] pb-2">
              <span className="w-5 h-5 rounded-full bg-[#174E4A] text-white flex items-center justify-center text-xs">1</span>
              <span>{language === 'ur' ? 'واقعے کی تفصیلات اور حقائق' : 'Factual Details of Cyber Incident'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#174E4A] mb-1.5 uppercase">
                  {language === 'ur' ? 'پلیٹ فارم / سوشل ایپ' : 'Platform / Service Used:'}
                </label>
                <input
                  type="text"
                  value={incidentPlatform}
                  onChange={(e) => setIncidentPlatform(e.target.value)}
                  placeholder="e.g. WhatsApp, Instagram, Facebook"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F0F8F5] border border-[#D4EBE2] text-sm text-[#133834] focus:outline-hidden focus:border-[#174E4A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#174E4A] mb-1.5 uppercase">
                  {language === 'ur' ? 'ملزم کا یوزر نیم یا فون نمبر' : 'Accused Handle / Phone / Profile Link:'}
                </label>
                <input
                  type="text"
                  value={perpetratorIdentifier}
                  onChange={(e) => setPerpetratorIdentifier(e.target.value)}
                  placeholder="e.g. @bad_actor or +923001234567"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F0F8F5] border border-[#D4EBE2] text-sm text-[#133834] focus:outline-hidden focus:border-[#174E4A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#174E4A] mb-1.5 uppercase">
                  {language === 'ur' ? 'واقعہ کب شروع ہوا؟' : 'Approximate Start Date:'}
                </label>
                <input
                  type="text"
                  value={incidentStartDate}
                  onChange={(e) => setIncidentStartDate(e.target.value)}
                  placeholder="e.g. October 12, 2026"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F0F8F5] border border-[#D4EBE2] text-sm text-[#133834] focus:outline-hidden focus:border-[#174E4A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#174E4A] mb-1.5 uppercase">
                  {language === 'ur' ? 'شہر / علاقہ' : 'Your City / District:'}
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Lahore, Karachi, Islamabad, Peshawar"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F0F8F5] border border-[#D4EBE2] text-sm text-[#133834] focus:outline-hidden focus:border-[#174E4A]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#174E4A] mb-1.5 uppercase">
                {language === 'ur' ? 'حقائق کا جامع خلاصہ (Summary of Facts):' : 'Summary of What Happened (Objective Facts):'}
              </label>
              <textarea
                required
                rows={4}
                value={summaryOfFacts}
                onChange={(e) => setSummaryOfFacts(e.target.value)}
                placeholder={
                  language === 'ur'
                    ? 'تاریخ وار بیان کریں: کس اکاؤنٹ نے کیا میسج کیا، کیا دھمکی دی، اور آپ سے کیا مطالبہ کیا جا رہا ہے...'
                    : 'Describe sequentially: which handle contacted you, what threats or demands were made, and the date/platform...'
                }
                className="w-full p-3.5 rounded-2xl bg-[#F0F8F5] border border-[#D4EBE2] text-sm text-[#133834] focus:outline-hidden focus:border-[#174E4A]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#174E4A] mb-1.5 uppercase">
                {language === 'ur' ? 'پیسے یا تاوان کے مطالبات (اگر کوئی ہوں):' : 'Financial Extortion Details (If applicable):'}
              </label>
              <input
                type="text"
                value={financialExtortionDetails}
                onChange={(e) => setFinancialExtortionDetails(e.target.value)}
                placeholder="e.g. Demanded 50,000 PKR via EasyPaisa / JazzCash account"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#F0F8F5] border border-[#D4EBE2] text-sm text-[#133834] focus:outline-hidden focus:border-[#174E4A]"
              />
            </div>
          </div>

          {/* Section 2: Applicable PECA sections */}
          <div className="space-y-3 pt-4 border-t border-[#D4EBE2]">
            <h3 className="font-bold text-sm sm:text-base text-[#174E4A] flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#174E4A] text-white flex items-center justify-center text-xs">2</span>
              <span>{language === 'ur' ? 'پیکا ایکٹ 2016 کے متعلقہ دفعات (Select Applicable Sections):' : 'Applicable PECA 2016 Statutory Sections:'}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {availableSections.map((sec, idx) => {
                const isSelected = pecaSections.includes(sec);
                return (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => toggleSection(sec)}
                    className={`flex items-start gap-2.5 p-3 rounded-xl border text-left text-xs transition-colors ${
                      isSelected
                        ? 'bg-[#174E4A] text-white border-[#174E4A]'
                        : 'bg-[#F0F8F5] text-[#133834] border-[#D4EBE2] hover:bg-[#D4EBE2]/40'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}}
                      className="w-3.5 h-3.5 mt-0.5"
                    />
                    <span className="leading-tight">{sec}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Evidence Attached */}
          <div className="space-y-2 pt-4 border-t border-[#D4EBE2]">
            <h3 className="font-bold text-sm sm:text-base text-[#174E4A] flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#174E4A] text-white flex items-center justify-center text-xs">3</span>
              <span>{language === 'ur' ? 'منسلک ثبوتوں کی فہرست (List of Evidence):' : 'List of Attached Evidence:'}</span>
            </h3>
            <textarea
              rows={3}
              value={evidenceListInput}
              onChange={(e) => setEvidenceListInput(e.target.value)}
              className="w-full p-3.5 rounded-2xl bg-[#F0F8F5] border border-[#D4EBE2] text-sm text-[#133834] focus:outline-hidden focus:border-[#174E4A]"
            />
            <p className="text-[11px] text-[#2E5853]">
              {language === 'ur' ? 'ہر ثبوت کو نئی لائن میں لکھیں (جیسے: سکرین شاٹ، یوزر پروفائل لنک، واٹس ایپ بیک اپ)' : 'Separate each item with a new line (e.g. Uncropped screenshots, URL links, audio messages).'}
            </p>
          </div>

          <button
            type="submit"
            disabled={isGenerating || !summaryOfFacts.trim()}
            className="w-full py-4 px-6 rounded-2xl bg-[#174E4A] hover:bg-[#113C39] text-white font-bold text-base flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50 focus:ring-2 focus:ring-[#80C5B0]"
          >
            {isGenerating ? (
              <span>Formatting Draft...</span>
            ) : (
              <>
                <FileText className="w-5 h-5 text-[#80C5B0]" />
                <span>{t.generateDraft}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
        </form>

        {/* Generated Output Preview */}
        {generatedDraft && (
          <div className="mt-8 pt-8 border-t-2 border-[#D4EBE2] space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h4 className="font-bold text-lg text-[#174E4A]">
                  {language === 'ur' ? 'تیار شدہ قانونی مسودہ (Review & Copy):' : 'Formatted Formal Complaint Draft:'}
                </h4>
                <p className="text-xs text-[#2E5853]">
                  {language === 'ur' ? 'اسے کاپی کر کے این سی سی آئی اے کے پورٹل پر پیسٹ کریں:' : 'Copy this draft and paste into complaint.nccia.gov.pk:'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#174E4A] text-white text-xs font-bold hover:bg-[#113C39] transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-[#80C5B0]" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? t.copied : t.copyPlan}</span>
                </button>
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F0F8F5] border border-[#D4EBE2] text-[#174E4A] text-xs font-bold hover:bg-[#D4EBE2] transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Draft</span>
                </button>
              </div>
            </div>

            <textarea
              readOnly
              rows={16}
              value={generatedDraft}
              className="w-full p-4 font-mono text-xs sm:text-sm bg-[#F0F8F5] border border-[#D4EBE2] rounded-2xl text-[#133834] focus:outline-hidden"
            />

            {/* Official Submission CTA */}
            <div className="p-5 rounded-2xl bg-[#D4EBE2]/40 border border-[#80C5B0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="font-bold text-sm text-[#174E4A]">
                  {language === 'ur' ? 'اگلا قدم: سرکاری پورٹل پر جمع کرائیں' : 'Next Step: Submit via Official NCCIA Portal'}
                </p>
                <p className="text-xs text-[#2E5853]">
                  {language === 'ur'
                    ? 'نیشنل سائبر کرائم انویسٹی گیشن ایجنسی کا سرکاری پورٹل 24/7 کھلا رہتا ہے۔'
                    : 'The National Cyber Crime Investigation Agency (NCCIA) accepts official electronic complaints 24/7.'}
                </p>
              </div>

              <a
                href="https://complaint.nccia.gov.pk/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#174E4A] text-white text-xs font-bold hover:bg-[#113C39] transition-colors shrink-0"
              >
                <span>{t.officialPortal}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
