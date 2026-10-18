import React from 'react';
import { ShieldCheck, MessageSquareText, Lock, FileCheck2, ArrowRight, HeartHandshake, ExternalLink, HelpCircle, AlertCircle } from 'lucide-react';
import { Language, IncidentCategory } from '../types';
import { translations } from '../data/translations';

interface HeroSectionProps {
  language: Language;
  onSelectCategory: (category: IncidentCategory) => void;
  onOpenChat: () => void;
  onOpenPlan: () => void;
  onOpenComplaint: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  onSelectCategory,
  onOpenChat,
  onOpenPlan,
  onOpenComplaint,
}) => {
  const t = translations[language];

  const categories: Array<{
    id: IncidentCategory;
    title: string;
    desc: string;
    tag: string;
  }> = [
    {
      id: 'blackmail',
      title: t.categoryBlackmail,
      desc: language === 'ur'
        ? 'پیسے یا مطالبات منوانے کے لیے بلیک میلنگ'
        : 'Demands for money, favors, or persistent extortion threats.',
      tag: 'Urgent',
    },
    {
      id: 'photo_threat',
      title: t.categoryPhotoThreat,
      desc: language === 'ur'
        ? 'نجی تصاویر یا ویڈیوز وائرل کرنے کی دھمکیاں'
        : 'Threats to circulate private media on social media or WhatsApp.',
      tag: 'Critical',
    },
    {
      id: 'fake_profile',
      title: t.categoryFakeProfile,
      desc: language === 'ur'
        ? 'آپ کے نام یا تصویر سے جعلی اکاؤنٹ بنانا'
        : 'Impersonation using your pictures, name, or phone number.',
      tag: 'Common',
    },
    {
      id: 'account_hack',
      title: t.categoryAccountHack,
      desc: language === 'ur'
        ? 'انسٹاگرام یا واٹس ایپ ہیک ہونا'
        : 'Locked out of account, 2FA bypass, or unauthorized logins.',
      tag: 'Security',
    },
    {
      id: 'cyberstalking',
      title: t.categoryCyberstalking,
      desc: language === 'ur'
        ? 'مسلسل آن لائن پیچھا کرنا اور میسجز بھیجنا'
        : 'Unwanted surveillance, repetitive burner accounts, intimidation.',
      tag: 'Privacy',
    },
    {
      id: 'cyberbullying',
      title: t.categoryBullying,
      desc: language === 'ur'
        ? 'جھوٹے الزامات اور کردار کشی کی مہم'
        : 'Online defamation, hate comments, group harassment campaigns.',
      tag: 'Dignity',
    },
  ];

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Banner Card */}
      <section className="relative overflow-hidden rounded-3xl bg-linear-to-b from-[#D4EBE2]/60 to-[#F0F8F5] border border-[#D4EBE2] p-6 sm:p-10 lg:p-12 shadow-sm">
        <div className="max-w-3xl space-y-6">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-[#80C5B0] text-[#174E4A] text-xs font-semibold shadow-xs">
            <Lock className="w-3.5 h-3.5 text-[#174E4A]" />
            <span>{t.anonymousNotice}</span>
          </div>

          {/* Main Headline */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#174E4A] leading-tight">
              {t.heroHeadline}
            </h1>
            <p className="text-xl sm:text-2xl font-semibold text-[#2E5853]">
              {t.heroSubheadline}
            </p>
          </div>

          {/* Compassionate Explainer */}
          <p className="text-base sm:text-lg text-[#133834] leading-relaxed max-w-2xl font-normal">
            {t.heroTagline1}
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onOpenPlan}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#174E4A] hover:bg-[#113C39] text-white font-bold text-sm sm:text-base shadow-sm hover:shadow-md transition-all focus:ring-2 focus:ring-[#80C5B0]"
            >
              <ShieldCheck className="w-5 h-5 text-[#80C5B0]" />
              <span>{t.getHelpNow}</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={onOpenChat}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white hover:bg-[#D4EBE2]/50 text-[#174E4A] border border-[#80C5B0] font-bold text-sm sm:text-base shadow-xs hover:shadow-sm transition-all focus:ring-2 focus:ring-[#174E4A]"
            >
              <MessageSquareText className="w-5 h-5 text-[#174E4A]" />
              <span>{t.chatWithAI}</span>
            </button>

            <button
              onClick={onOpenComplaint}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#D4EBE2]/50 hover:bg-[#D4EBE2] text-[#174E4A] font-semibold text-sm transition-colors"
            >
              <FileCheck2 className="w-4 h-4 text-[#174E4A]" />
              <span>{t.complaintTab}</span>
            </button>
          </div>

          {/* Privacy & Safety Reassurances */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-[#D4EBE2]">
            <div className="flex items-center gap-2 text-xs text-[#2E5853] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#174E4A]"></span>
              <span>{language === 'ur' ? 'کوئی لاگ ان یا اکاؤنٹ ضروری نہیں' : 'No account or login required'}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#2E5853] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#174E4A]"></span>
              <span>{language === 'ur' ? 'تصاویر اپلوڈ کرنے کی ضرورت نہیں' : 'Never asks for private photos'}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#2E5853] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-[#174E4A]"></span>
              <span>{language === 'ur' ? 'پیکا ایکٹ 2016 کے مطابق قانونی رہنمائی' : 'Grounded in Pakistani PECA law'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Situation Selector Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-2xl font-bold text-[#174E4A]">
              {t.categoriesTitle}
            </h2>
            <p className="text-sm text-[#2E5853]">
              {language === 'ur'
                ? 'اپنے مسئلے کا انتخاب کریں تاکہ آپ کے لیے فوری لائحہ عمل تیار کیا جا سکے:'
                : 'Select your situation to receive immediate do\'s and don\'ts, evidence guides, and verified reporting steps:'}
            </p>
          </div>
          <span className="text-xs text-[#2E5853] font-medium">
            {language === 'ur' ? 'خفیہ اور فوری رہنمائی' : 'Confidential & Immediate'}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="text-left p-5 rounded-2xl bg-white hover:bg-[#F0F8F5] border border-[#D4EBE2] hover:border-[#80C5B0] shadow-xs hover:shadow-sm transition-all group focus:outline-hidden focus:ring-2 focus:ring-[#80C5B0]"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[#D4EBE2] text-[#174E4A]">
                  {cat.tag}
                </span>
                <ArrowRight className="w-4 h-4 text-[#80C5B0] group-hover:text-[#174E4A] group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="font-bold text-base text-[#174E4A] group-hover:text-[#113C39] mb-1">
                {cat.title}
              </h3>
              <p className="text-xs text-[#2E5853] leading-relaxed">
                {cat.desc}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* Critical Safety Notice Box */}
      <section className="rounded-2xl bg-[#D4EBE2]/40 border border-[#80C5B0]/50 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <HeartHandshake className="w-6 h-6 text-[#174E4A] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-bold text-[#174E4A] text-sm sm:text-base">
                {language === 'ur' ? 'یاد رکھیں: اس میں آپ کا کوئی قصور نہیں ہے' : 'Crucial Reassurance: You Are Not at Fault'}
              </h4>
              <p className="text-xs sm:text-sm text-[#133834] leading-relaxed">
                {language === 'ur'
                  ? 'سائبر بلیک میلرز خوف اور تنہائی کا فائدہ اٹھاتے ہیں۔ پیکا 2016 کے تحت بلیک میلنگ اور نجی مواد لیک کرنا سنگین جرم ہے جس کی سزا 5 سے 7 سال قید ہے۔'
                  : 'Blackmailers and harassers rely on panic, guilt, and silence. Under Pakistani cyber law (PECA 2016 Section 21), extortion and threatening to distribute intimate content carries 5 to 7 years imprisonment. You have statutory legal rights.'}
              </p>
            </div>
          </div>
          <button
            onClick={onOpenChat}
            className="shrink-0 px-4 py-2 rounded-xl bg-[#174E4A] hover:bg-[#113C39] text-white text-xs font-bold transition-colors"
          >
            {language === 'ur' ? 'اے آئی سے مشورہ کریں' : 'Talk with AI Assistant'}
          </button>
        </div>
      </section>
    </div>
  );
};
