import React, { useState } from 'react';
import {
  ShieldAlert,
  XCircle,
  CheckCircle,
  FileText,
  Lock,
  PhoneCall,
  ExternalLink,
  Download,
  Copy,
  Check,
  ArrowRight,
  MessageSquareText,
  RotateCcw
} from 'lucide-react';
import { Language, SafetyPlan } from '../types';
import { translations } from '../data/translations';

interface SafetyPlanViewProps {
  plan: SafetyPlan & { customNarrative?: string };
  language: Language;
  onDraftComplaint: () => void;
  onOpenChat: () => void;
  onResetPlan: () => void;
}

export const SafetyPlanView: React.FC<SafetyPlanViewProps> = ({
  plan,
  language,
  onDraftComplaint,
  onOpenChat,
  onResetPlan,
}) => {
  const t = translations[language];
  const [copied, setCopied] = useState(false);
  const [checkedEvidence, setCheckedEvidence] = useState<Record<number, boolean>>({});

  const toggleEvidence = (idx: number) => {
    setCheckedEvidence((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const getFullPlanText = () => {
    let out = `HIFAZAT DIGITAL SAFETY PLAN\nGenerated for: ${plan.category} (${plan.urgencyLevel})\n\n`;

    if (plan.customNarrative) {
      out += `PERSONALIZED AI STRATEGY:\n${plan.customNarrative}\n\n`;
    }

    out += `1. IMMEDIATE ACTIONS:\n${plan.immediateActions.map((a) => ` - ${a}`).join('\n')}\n\n`;
    out += `2. WHAT TO AVOID DOING:\n${plan.whatToAvoid.map((a) => ` - ${a}`).join('\n')}\n\n`;
    out += `3. EVIDENCE PRESERVATION CHECKLIST:\n${plan.evidencePreservationSteps.map((a) => ` - ${a}`).join('\n')}\n\n`;
    out += `4. ACCOUNT SECURITY HARDENING:\n${plan.accountSecuritySteps.map((a) => ` - ${a}`).join('\n')}\n\n`;
    out += `5. OFFICIAL REPORTING CHANNELS IN PAKISTAN:\n${plan.reportingChannels.map((c) => ` - ${c.name} ${c.url || c.contact || ''} (${c.action})`).join('\n')}\n\n`;
    out += `LEGAL PROVISIONS: ${plan.legalContext}\n\n`;
    out += `NOTE: HIFAZAT is a guidance tool, not a police agency or court. File your formal complaint at https://complaint.nccia.gov.pk/`;
    return out;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getFullPlanText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([getFullPlanText()], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `HIFAZAT-Safety-Plan-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl border border-[#D4EBE2] p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#D4EBE2] pb-6 mb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4EBE2] text-[#174E4A] text-xs font-bold">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>{t.planTitle}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#174E4A] tracking-tight">
              {language === 'ur' ? 'آپ کا ڈیجیٹل حفاظتی لائحہ عمل' : 'Your Digital Safety Plan'}
            </h2>
            <p className="text-xs sm:text-sm text-[#2E5853]">
              {language === 'ur'
                ? 'درج ذیل اقدامات آپ کی قانونی حفاظت اور ثبوت برقرار رکھنے کے لیے نہایت اہم ہیں:'
                : 'Step-by-step risk mitigation, evidence preservation, and verified official reporting in Pakistan.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F0F8F5] hover:bg-[#D4EBE2] text-[#174E4A] border border-[#D4EBE2] text-xs font-semibold transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? t.copied : t.copyPlan}</span>
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#F0F8F5] hover:bg-[#D4EBE2] text-[#174E4A] border border-[#D4EBE2] text-xs font-semibold transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>{t.downloadPlan}</span>
            </button>
          </div>
        </div>

        {/* AI Custom Narrative if generated */}
        {plan.customNarrative && (
          <div className="mb-6 p-5 rounded-2xl bg-[#F0F8F5] border border-[#80C5B0]/50 space-y-2">
            <h3 className="font-bold text-sm text-[#174E4A] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#174E4A]"></span>
              <span>{language === 'ur' ? 'حفاظت اے آئی کی مخصوص رہنمائی:' : 'AI Personalized Safety Strategy:'}</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#133834] leading-relaxed whitespace-pre-wrap font-normal">
              {plan.customNarrative}
            </p>
          </div>
        )}

        {/* Stage 1: Immediate Safety Steps & What to Avoid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Immediate Steps (Do's) */}
          <div className="p-5 rounded-2xl bg-[#D4EBE2]/30 border border-[#80C5B0]/40 space-y-3">
            <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
              <CheckCircle className="w-4 h-4" />
              <span>{t.immediateSafety}</span>
            </div>
            <ul className="space-y-2.5">
              {plan.immediateActions.map((act, i) => (
                <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#133834]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-1.5 shrink-0"></span>
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What to Avoid (Don'ts) */}
          <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
              <XCircle className="w-4 h-4" />
              <span>{t.whatNotToDo}</span>
            </div>
            <ul className="space-y-2.5">
              {plan.whatToAvoid.map((av, i) => (
                <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-amber-950">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-700 mt-1.5 shrink-0"></span>
                  <span>{av}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stage 2: Evidence Preservation Checklist */}
        <div className="p-6 rounded-2xl bg-white border border-[#D4EBE2] space-y-4 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-base text-[#174E4A]">
              <FileText className="w-5 h-5 text-[#80C5B0]" />
              <span>{t.evidenceChecklist}</span>
            </div>
            <span className="text-xs text-[#2E5853] font-medium">
              {language === 'ur' ? 'این سی سی آئی اے میں ثبوت کے طور پر قابل قبول' : 'Court & NCCIA Admissible'}
            </span>
          </div>

          <div className="space-y-2">
            {plan.evidencePreservationSteps.map((step, idx) => (
              <label
                key={idx}
                onClick={() => toggleEvidence(idx)}
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                  checkedEvidence[idx]
                    ? 'bg-[#D4EBE2]/40 border-[#80C5B0]'
                    : 'bg-[#F0F8F5] border-[#D4EBE2] hover:bg-[#D4EBE2]/20'
                }`}
              >
                <input
                  type="checkbox"
                  checked={Boolean(checkedEvidence[idx])}
                  onChange={() => {}}
                  className="w-4 h-4 rounded-md text-[#174E4A] focus:ring-[#80C5B0] mt-0.5"
                />
                <span className={`text-xs sm:text-sm ${checkedEvidence[idx] ? 'line-through text-[#2E5853]' : 'text-[#133834]'}`}>
                  {step}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Stage 3: Account Security Hardening */}
        <div className="p-6 rounded-2xl bg-white border border-[#D4EBE2] space-y-3 mb-8">
          <div className="flex items-center gap-2 font-bold text-base text-[#174E4A]">
            <Lock className="w-5 h-5 text-[#80C5B0]" />
            <span>{t.accountSecurity}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {plan.accountSecuritySteps.map((sec, i) => (
              <div key={i} className="p-3 rounded-xl bg-[#F0F8F5] border border-[#D4EBE2] text-xs sm:text-sm text-[#133834] flex items-start gap-2">
                <span className="font-bold text-[#174E4A]">{i + 1}.</span>
                <span>{sec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stage 4: Official Reporting Pathways in Pakistan */}
        <div className="p-6 rounded-2xl bg-[#F0F8F5] border border-[#D4EBE2] space-y-4 mb-8">
          <div className="flex items-center gap-2 font-bold text-base text-[#174E4A]">
            <PhoneCall className="w-5 h-5 text-[#174E4A]" />
            <span>{t.reportingOptions}</span>
          </div>

          <div className="space-y-3">
            {plan.reportingChannels.map((channel, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-white border border-[#D4EBE2] shadow-2xs"
              >
                <div>
                  <h4 className="font-bold text-sm text-[#174E4A]">{channel.name}</h4>
                  <p className="text-xs text-[#2E5853] mt-0.5">{channel.action}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {channel.url && (
                    <a
                      href={channel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#174E4A] text-white text-xs font-bold hover:bg-[#113C39] transition-colors"
                    >
                      <span>{t.officialPortal}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {channel.contact && (
                    <a
                      href={`tel:${channel.contact.replace(/[^0-9]/g, '')}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4EBE2] text-[#174E4A] text-xs font-bold hover:bg-[#80C5B0] transition-colors"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>{channel.contact}</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legal Context & Psychological Care Note */}
        <div className="border-t border-[#D4EBE2] pt-6 space-y-4">
          <div className="text-xs sm:text-sm text-[#2E5853] space-y-1">
            <p className="font-bold text-[#174E4A]">
              {language === 'ur' ? 'قانونی تحفظ (PECA 2016):' : 'Legal Rights under PECA 2016:'}
            </p>
            <p className="leading-relaxed">{plan.legalContext}</p>
          </div>

          <div className="text-xs sm:text-sm text-[#2E5853] space-y-1">
            <p className="font-bold text-[#174E4A]">
              {language === 'ur' ? 'نفسیاتی مشاورت و حوصلہ افزائی:' : 'Emotional & Psychological Reassurance:'}
            </p>
            <p className="leading-relaxed">{plan.psychologicalCareAdvice}</p>
          </div>
        </div>

        {/* Footer CTAs: Draft Complaint or Chat */}
        <div className="border-t border-[#D4EBE2] pt-6 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={onResetPlan}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-[#2E5853] hover:text-[#174E4A] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{language === 'ur' ? 'نیا جائزہ شروع کریں' : 'New Intake Assessment'}</span>
          </button>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenChat}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-[#D4EBE2] text-[#174E4A] border border-[#80C5B0] text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <MessageSquareText className="w-4 h-4" />
              <span>{language === 'ur' ? 'اس منصوبے پر اے آئی سے بات کریں' : 'Discuss Plan with AI'}</span>
            </button>

            <button
              onClick={onDraftComplaint}
              className="px-5 py-2.5 rounded-xl bg-[#174E4A] hover:bg-[#113C39] text-white text-xs font-bold transition-colors flex items-center gap-2 shadow-xs"
            >
              <FileText className="w-4 h-4 text-[#80C5B0]" />
              <span>{language === 'ur' ? 'شکایت کا مسودہ تیار کریں' : 'Generate Complaint Draft'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
