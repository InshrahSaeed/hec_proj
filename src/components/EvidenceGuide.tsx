import React from 'react';
import { Camera, Clock, CheckCircle2, XCircle, HardDrive, ShieldCheck, AlertCircle, Link2, Smartphone } from 'lucide-react';
import { Language } from '../types';

interface EvidenceGuideProps {
  language: Language;
}

export const EvidenceGuide: React.FC<EvidenceGuideProps> = ({ language }) => {
  const isUrdu = language === 'ur';

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-[#D4EBE2] p-6 sm:p-8 shadow-sm">
        <div className="border-b border-[#D4EBE2] pb-6 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4EBE2] text-[#174E4A] text-xs font-bold mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'قانونی ثبوت کی حفاظت' : 'Forensic Evidence Preservation'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#174E4A] tracking-tight">
            {isUrdu ? 'ثبوت محفوظ کرنے کی مکمل گائیڈ' : 'How to Preserve Digital Evidence for NCCIA'}
          </h2>
          <p className="text-xs sm:text-sm text-[#2E5853] mt-2 leading-relaxed">
            {isUrdu
              ? 'پاکستانی عدالتوں اور این سی سی آئی اے میں ڈیجیٹل ثبوت کی قبولیت کے لیے چند تکنیکی اصولوں پر عمل کرنا لازمی ہے:'
              : 'Under Pakistani law (PECA 2016 and Qanun-e-Shahadat Order), digital evidence must retain its integrity. Follow these guidelines to ensure your evidence is legally sound and actionable.'}
          </p>
        </div>

        {/* 4 Pillars of Strong Evidence */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-[#F0F8F5] border border-[#D4EBE2] space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-[#174E4A]">
              <Clock className="w-4 h-4 text-[#80C5B0]" />
              <span>{isUrdu ? 'مکمل سکرین مع وقت و تاریخ' : '1. Full Uncropped Screen Capture'}</span>
            </div>
            <p className="text-xs text-[#133834] leading-relaxed">
              {isUrdu
                ? 'کبھی بھی سکرین شاٹ کو کروپ (Crop) نہ کریں۔ اوپر کی سٹیٹس بار، موبائل کا وقت، تاریخ اور بیٹری کا نشان نظر آنا چاہیے۔'
                : 'Never crop your screenshots. The top status bar with the device clock, network carrier, battery percentage, and date establishes real-time authenticity.'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#F0F8F5] border border-[#D4EBE2] space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-[#174E4A]">
              <Link2 className="w-4 h-4 text-[#80C5B0]" />
              <span>{isUrdu ? 'صحیح یو آر ایل اور پروفائل لنک' : '2. Exact Account Profile URL'}</span>
            </div>
            <p className="text-xs text-[#133834] leading-relaxed">
              {isUrdu
                ? 'صرف ڈسپلے نام کافی نہیں ہوتا۔ پروفائل کی تین نقطوں پر کلک کر کے "Copy Profile URL" کریں (جیسے instagram.com/bad_actor)۔'
                : 'Display names can be changed in 5 seconds. Tap the profile menu and copy the permanent profile URL link before they rename or deactivate.'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#F0F8F5] border border-[#D4EBE2] space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-[#174E4A]">
              <Smartphone className="w-4 h-4 text-[#80C5B0]" />
              <span>{isUrdu ? 'آڈیو پیغامات اور کال لاگ' : '3. Audio Notes & Call Records'}</span>
            </div>
            <p className="text-xs text-[#133834] leading-relaxed">
              {isUrdu
                ? 'اگر دھمکی آمیز وائس نوٹ بھیجا گیا ہو تو اسے کسی اور ڈیوائس سے الگ ریکارڈ کر کے یا ایکسپورٹ کر کے محفوظ کریں۔'
                : 'If extortion threats or slurs were made via voice notes, save the raw audio file. Screen-record the playback if WhatsApp disappearing mode is active.'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#F0F8F5] border border-[#D4EBE2] space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm text-[#174E4A]">
              <HardDrive className="w-4 h-4 text-[#80C5B0]" />
              <span>{isUrdu ? 'محفوظ آف لائن سٹوریج (USB)' : '4. Cold Storage / Safe Backup'}</span>
            </div>
            <p className="text-xs text-[#133834] leading-relaxed">
              {isUrdu
                ? 'ثبوتوں کو صرف اسی موبائل پر نہ چھوڑیں۔ ایک الگ یو ایس بی (USB) ڈرائیو یا محفوظ پاس ورڈ والے کلاؤڈ فولڈر میں کاپی کریں۔'
                : 'Do not keep proof solely on the phone where harassment occurred. Copy all evidence to a private USB flash drive or an encrypted cloud drive unknown to the harasser.'}
            </p>
          </div>
        </div>

        {/* Dos and Don'ts comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* DO */}
          <div className="p-5 rounded-2xl bg-[#D4EBE2]/40 border border-[#80C5B0] space-y-3">
            <div className="flex items-center gap-2 font-bold text-sm text-emerald-900">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>{isUrdu ? 'لازمی کریں (DOs)' : 'Best Practices (DO)'}</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-[#133834]">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-1.5 shrink-0"></span>
                <span>{isUrdu ? 'پورے تھریڈ کا سکرولنگ سکرین شاٹ لیں' : 'Take scrolling screenshots of the entire conversation thread'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-1.5 shrink-0"></span>
                <span>{isUrdu ? 'فون نمبر اور رابطہ تفصیلات کو واضح رکھیں' : 'Ensure phone numbers (+92...) and usernames (@...) are visible'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-1.5 shrink-0"></span>
                <span>{isUrdu ? 'اگر واٹس ایپ ہے تو چیٹ کی بیک اپ فائل (Export Chat) لیں' : 'Export WhatsApp chat (.txt format) with media where applicable'}</span>
              </li>
            </ul>
          </div>

          {/* DON'T */}
          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-300 space-y-3">
            <div className="flex items-center gap-2 font-bold text-sm text-amber-900">
              <XCircle className="w-4 h-4 text-amber-700" />
              <span>{isUrdu ? 'سختی سے گریز کریں (DON\'Ts)' : 'Critical Pitfalls to AVOID'}</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-amber-950">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-700 mt-1.5 shrink-0"></span>
                <span>{isUrdu ? 'سکرین شاٹ پر لکیریں مت لگائیں اور نہ ہی کچھ مٹائیں' : 'Never draw over, scribble out, or alter screenshots'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-700 mt-1.5 shrink-0"></span>
                <span>{isUrdu ? 'غصے میں آ کر پوری چیٹ فوراً ڈیلیٹ مت کریں' : 'Do not delete the chat in panic before preserving screenshots'}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-700 mt-1.5 shrink-0"></span>
                <span>{isUrdu ? 'تصاویر کو کمپریسڈ حالت میں واٹس ایپ پر آگے مت بھیجیں' : 'Do not repeatedly forward media back-and-forth as it strips metadata'}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Verification Check */}
        <div className="p-5 rounded-2xl bg-[#F0F8F5] border border-[#D4EBE2] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#174E4A] shrink-0" />
            <div>
              <p className="font-bold text-sm text-[#174E4A]">
                {isUrdu ? 'کیا آپ کا ثبوت تیار ہے؟' : 'Ready to File with NCCIA?'}
              </p>
              <p className="text-xs text-[#2E5853]">
                {isUrdu
                  ? 'شکایت درج کراتے وقت پی ڈی ایف یا جے پی جی کی صورت میں یہ ثبوت پورٹل پر اپلوڈ کیے جاتے ہیں۔'
                  : 'NCCIA complaint portal allows uploading screenshots, audio recordings, and URL links during submission.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
