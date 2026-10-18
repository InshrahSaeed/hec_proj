import React from 'react';
import { Shield, Lock, AlertTriangle, CheckCircle2, XCircle, Info, ExternalLink } from 'lucide-react';
import { Language } from '../types';
import { HIFAZAT_ABOUT } from '../data/knowledgeBase';

interface AboutAndPrivacyProps {
  language: Language;
}

export const AboutAndPrivacy: React.FC<AboutAndPrivacyProps> = ({ language }) => {
  const isUrdu = language === 'ur';

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Intro Card */}
      <div className="bg-white rounded-3xl border border-[#D4EBE2] p-6 sm:p-8 shadow-sm">
        <div className="border-b border-[#D4EBE2] pb-6 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4EBE2] text-[#174E4A] text-xs font-bold mb-3">
            <Shield className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'شفافیت و پرائیویسی' : 'Transparency & Privacy Architecture'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#174E4A] tracking-tight">
            {isUrdu ? 'حفاظت کے بارے میں اور پرائیویسی نوٹس' : 'About HIFAZAT & Privacy Commitment'}
          </h2>
          <p className="text-xs sm:text-sm text-[#2E5853] mt-2 leading-relaxed">
            {HIFAZAT_ABOUT.mission}
          </p>
        </div>

        {/* What HIFAZAT is vs Is NOT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* What it is */}
          <div className="p-5 rounded-2xl bg-[#D4EBE2]/30 border border-[#80C5B0] space-y-3">
            <h3 className="font-bold text-sm text-[#174E4A] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>{isUrdu ? 'حفاظت کیا ہے؟' : 'What HIFAZAT Is:'}</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[#133834]">
              {HIFAZAT_ABOUT.whatItIs.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-1.5 shrink-0"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* What it is NOT */}
          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-300 space-y-3">
            <h3 className="font-bold text-sm text-amber-950 flex items-center gap-2">
              <XCircle className="w-4 h-4 text-amber-700" />
              <span>{isUrdu ? 'حفاظت کیا نہیں ہے؟' : 'What HIFAZAT Is NOT:'}</span>
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-amber-950">
              {HIFAZAT_ABOUT.whatItIsNot.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-700 mt-1.5 shrink-0"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Privacy Principles */}
        <div className="space-y-4 mb-8">
          <h3 className="font-bold text-base text-[#174E4A] flex items-center gap-2 border-b border-[#D4EBE2] pb-2">
            <Lock className="w-4 h-4 text-[#80C5B0]" />
            <span>{isUrdu ? 'ہماری پرائیویسی پالیسی اور گمنامی کی ضمانت' : 'Our Privacy & Zero-Retention Architecture:'}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {HIFAZAT_ABOUT.privacyCommitment.map((comm, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#F0F8F5] border border-[#D4EBE2] text-xs sm:text-sm text-[#133834] flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#174E4A] shrink-0 mt-0.5" />
                <span className="leading-relaxed">{comm}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Honest Quick Exit & History Warning */}
        <div className="p-5 rounded-2xl bg-[#FFF1F0] border border-[#FFD0CC] text-[#9E2A2B] space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm">
            <AlertTriangle className="w-4 h-4" />
            <span>{isUrdu ? 'فوری خروج (Quick Exit) کے بارے میں ایمانداری کا بیان:' : 'Honest Warning Regarding Quick Exit:'}</span>
          </div>
          <p className="text-xs sm:text-sm leading-relaxed">
            {isUrdu
              ? 'کوئیک ایگزٹ کا بٹن دبانے سے یہ صفحہ فوری طور پر کسی عام سائٹ (جیسے موسم یا بی بی سی اردو) پر ری ڈائریکٹ ہو جاتا ہے تاکہ اگر کوئی اچانک کمرے میں آئے تو وہ سکرین نہ دیکھ سکے۔ لیکن یاد رہے کہ یہ آپ کے فون کی براؤزر ہسٹری، وائی فائی راؤٹر کی لاگز، یا موبائل میں موجود مانیٹرنگ ایپس کا ریکارڈ نہیں مٹا سکتا۔ اگر آپ کو جاسوسی کا خطرہ ہو تو پرائیویٹ براؤزنگ (Incognito) استعمال کریں یا خود ہسٹری ڈیلیٹ کریں۔'
              : 'The Quick Exit button immediately navigates away to a neutral website (Weather/News) if someone approaches you. However, no website can erase your browser search history, local Wi-Fi router network logs, or stalkerware apps installed on your device. Please use Private/Incognito tabs or clear your browser history manually when in safe surroundings.'}
          </p>
        </div>
      </div>
    </div>
  );
};
