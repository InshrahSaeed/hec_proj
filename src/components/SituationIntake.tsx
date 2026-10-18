import React, { useState } from 'react';
import { ShieldCheck, AlertTriangle, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { IncidentCategory, Language, SituationInput } from '../types';
import { translations } from '../data/translations';

interface SituationIntakeProps {
  language: Language;
  onPlanGenerated: (plan: any) => void;
  selectedCategory?: IncidentCategory;
}

export const SituationIntake: React.FC<SituationIntakeProps> = ({
  language,
  onPlanGenerated,
  selectedCategory = 'blackmail',
}) => {
  const t = translations[language];

  const [category, setCategory] = useState<IncidentCategory>(selectedCategory);
  const [urgency, setUrgency] = useState<'low' | 'moderate' | 'high' | 'immediate_danger'>('moderate');
  const [platform, setPlatform] = useState('Instagram');
  const [hasEvidence, setHasEvidence] = useState(false);
  const [isKnown, setIsKnown] = useState<'yes' | 'no' | 'suspected' | 'unknown'>('unknown');
  const [hasDemandedMoney, setHasDemandedMoney] = useState(false);
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const categories: Array<{ id: IncidentCategory; label: string }> = [
    { id: 'blackmail', label: t.categoryBlackmail },
    { id: 'photo_threat', label: t.categoryPhotoThreat },
    { id: 'fake_profile', label: t.categoryFakeProfile },
    { id: 'account_hack', label: t.categoryAccountHack },
    { id: 'cyberstalking', label: t.categoryCyberstalking },
    { id: 'cyberbullying', label: t.categoryBullying },
  ];

  const platforms = [
    'Instagram',
    'WhatsApp',
    'Facebook / Messenger',
    'TikTok',
    'Snapchat',
    'X (Twitter)',
    'Phone Calls / SMS',
    'Other / Multiple',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          urgency,
          platform,
          description,
          hasPreservedEvidence: hasEvidence,
          isPerpetratorKnown: isKnown,
          hasDemandedMoney,
          language,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate safety plan');
      }

      const planData = await response.json();
      onPlanGenerated(planData);
    } catch (err: any) {
      console.error(err);
      setErrorMsg('Could not reach the AI planner. Loading offline verified safety checklist...');
      // Fallback response so user is never blocked
      onPlanGenerated({
        category,
        urgencyLevel: urgency,
        immediateActions: [
          'Do NOT send money or fulfill extortion demands.',
          'Take full screenshots displaying timestamps and user handles before messages are deleted.',
          'Visit StopNCII.org if intimate imagery is involved to create privacy hashes.',
          'Report the offending profile directly on the platform.',
        ],
        whatToAvoid: [
          'Do NOT delete conversations without screenshots.',
          'Do NOT confront or threaten the harasser.',
        ],
        evidencePreservationSteps: [
          'Take full screen captures without cropping.',
          'Copy the perpetrator profile URL.',
          'Store screenshots in a secure offline drive.',
        ],
        accountSecuritySteps: [
          'Turn on 2FA using Google Authenticator.',
          'Check active sessions and log out unknown devices.',
        ],
        reportingChannels: [
          {
            name: 'National Cyber Crime Investigation Agency (NCCIA)',
            url: 'https://complaint.nccia.gov.pk/',
            action: 'Submit statutory cybercrime report',
          },
          {
            name: 'DRF Cyber Harassment Helpline',
            contact: '0800-39393',
            action: 'Free confidential counseling',
          },
        ],
        legalContext: 'PECA 2016 Section 21 & Section 20.',
        psychologicalCareAdvice: 'Take a deep breath. You are safe here and you are not alone.',
        disclaimer: 'This plan is for informational guidance only.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-[#D4EBE2] p-6 sm:p-8 lg:p-10 shadow-sm">
      <div className="border-b border-[#D4EBE2] pb-6 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4EBE2] text-[#174E4A] text-xs font-bold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#174E4A]" />
          <span>{language === 'ur' ? 'محفوظ صورتحال کا جائزہ' : 'Situation Intake & Safety Blueprint'}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#174E4A] tracking-tight">
          {language === 'ur' ? 'آپ کا حفاظتی جائزہ' : 'Personalized Safety Intake'}
        </h2>
        <p className="text-sm text-[#2E5853] mt-1.5">
          {language === 'ur'
            ? 'چند سوالات کے جواب دیں تاکہ آپ کی مخصوص صورتحال کے مطابق فوری لائحہ عمل تیار کیا جا سکے۔'
            : 'Answer a few calm questions to generate an immediate, customized action plan, evidence steps, and reporting channels.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Category Choice */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-[#174E4A]">
            1. {language === 'ur' ? 'مسئلے کی نوعیت کیا ہے؟' : 'Primary Category of Cyber Threat:'}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {categories.map((c) => (
              <button
                type="button"
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={`flex items-center justify-between p-3.5 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all ${
                  category === c.id
                    ? 'bg-[#174E4A] text-white border-[#174E4A] shadow-xs'
                    : 'bg-[#F0F8F5] text-[#133834] border-[#D4EBE2] hover:bg-[#D4EBE2]/60'
                }`}
              >
                <span>{c.label}</span>
                {category === c.id && <CheckCircle2 className="w-4 h-4 text-[#80C5B0]" />}
              </button>
            ))}
          </div>
        </div>

        {/* Platform Selection */}
        <div className="space-y-3">
          <label className="block text-sm font-bold text-[#174E4A]">
            2. {language === 'ur' ? 'یہ کس پلیٹ فارم یا ایپ پر ہو رہا ہے؟' : 'Platform / Service Involved:'}
          </label>
          <div className="flex flex-wrap gap-2">
            {platforms.map((p) => (
              <button
                type="button"
                key={p}
                onClick={() => setPlatform(p)}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium border transition-colors ${
                  platform === p
                    ? 'bg-[#174E4A] text-white border-[#174E4A]'
                    : 'bg-[#F0F8F5] text-[#133834] border-[#D4EBE2] hover:bg-[#D4EBE2]'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Urgency & Key Risk Factors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          {/* Urgency Level */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#174E4A] uppercase tracking-wide">
              {language === 'ur' ? 'فوری نوعیت (ارجنسی)' : 'Urgency Level:'}
            </label>
            <select
              value={urgency}
              onChange={(e) => setUrgency(e.target.value as any)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F0F8F5] border border-[#D4EBE2] text-sm text-[#133834] focus:outline-hidden focus:border-[#174E4A]"
            >
              <option value="low">
                {language === 'ur' ? 'معمولی / صرف معلومات چاہیے' : 'Low / Informational'}
              </option>
              <option value="moderate">
                {language === 'ur' ? 'متوسط / چند دنوں سے جاری ہے' : 'Moderate / Ongoing situation'}
              </option>
              <option value="high">
                {language === 'ur' ? 'سنگین / بلیک میلنگ یا دھمکیاں' : 'High / Active threats & extortion'}
              </option>
              <option value="immediate_danger">
                {language === 'ur' ? 'فوری خطرہ / جسمانی حملے کا اندیشہ' : 'Immediate Danger / Physical threat'}
              </option>
            </select>
          </div>

          {/* Is Perpetrator Known */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#174E4A] uppercase tracking-wide">
              {language === 'ur' ? 'کیا آپ اس شخص کو جانتی ہیں؟' : 'Is Perpetrator Known to You?'}:
            </label>
            <select
              value={isKnown}
              onChange={(e) => setIsKnown(e.target.value as any)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#F0F8F5] border border-[#D4EBE2] text-sm text-[#133834] focus:outline-hidden focus:border-[#174E4A]"
            >
              <option value="unknown">{language === 'ur' ? 'نامعلوم / گمنام اکاؤنٹ' : 'Unknown / Anonymous'}</option>
              <option value="yes">{language === 'ur' ? 'ہاں، ذاتی طور پر جانتی ہوں' : 'Yes, known personally / Ex-friend'}</option>
              <option value="suspected">{language === 'ur' ? 'شک ہے لیکن یقین نہیں' : 'Suspected someone specific'}</option>
              <option value="no">{language === 'ur' ? 'اجنبی ہے' : 'Complete stranger'}</option>
            </select>
          </div>
        </div>

        {/* Toggles for Evidence & Demands */}
        <div className="space-y-3 pt-2">
          <label className="block text-xs font-bold text-[#174E4A] uppercase tracking-wide">
            {language === 'ur' ? 'اہم معلومات:' : 'Key Circumstances:'}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="flex items-center gap-3 p-3.5 rounded-xl bg-[#F0F8F5] border border-[#D4EBE2] cursor-pointer hover:bg-[#D4EBE2]/40 transition-colors">
              <input
                type="checkbox"
                checked={hasDemandedMoney}
                onChange={(e) => setHasDemandedMoney(e.target.checked)}
                className="w-4 h-4 rounded-md text-[#174E4A] focus:ring-[#80C5B0]"
              />
              <span className="text-xs sm:text-sm text-[#133834] font-medium">
                {language === 'ur'
                  ? 'پیسے یا تاوان کا مطالبہ کیا گیا ہے'
                  : 'Extortion / Money has been demanded'}
              </span>
            </label>

            <label className="flex items-center gap-3 p-3.5 rounded-xl bg-[#F0F8F5] border border-[#D4EBE2] cursor-pointer hover:bg-[#D4EBE2]/40 transition-colors">
              <input
                type="checkbox"
                checked={hasEvidence}
                onChange={(e) => setHasEvidence(e.target.checked)}
                className="w-4 h-4 rounded-md text-[#174E4A] focus:ring-[#80C5B0]"
              />
              <span className="text-xs sm:text-sm text-[#133834] font-medium">
                {language === 'ur'
                  ? 'میں نے سکرین شاٹس محفوظ کر لیے ہیں'
                  : 'I have already taken some screenshots'}
              </span>
            </label>
          </div>
        </div>

        {/* Free-text Description (Optional) */}
        <div className="space-y-2 pt-2">
          <label className="block text-sm font-bold text-[#174E4A]">
            {language === 'ur'
              ? 'مختصر تفصیل (اختیاری):'
              : 'Brief Context (Optional):'}
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t.describeSituationPlaceholder}
            className="w-full p-4 rounded-2xl bg-[#F0F8F5] border border-[#D4EBE2] focus:border-[#174E4A] focus:outline-hidden text-sm text-[#133834] placeholder-[#2E5853]/60"
          />
          <p className="text-[11px] text-[#2E5853]">
            {language === 'ur'
              ? 'پرائیویسی نوٹ: برائے مہربانی اپنا شناختی کارڈ نمبر، پاس ورڈ، یا کسی کا پورا نام یہاں نہ لکھیں۔'
              : 'Privacy safeguard: Do not include passwords, CNIC numbers, or full real names here.'}
          </p>
        </div>

        {/* Imminent physical danger warning if chosen */}
        {urgency === 'immediate_danger' && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm space-y-1">
              <p className="font-bold">
                {language === 'ur' ? 'فوری جسمانی خطرے کی وارننگ:' : 'Immediate Physical Safety Warning:'}
              </p>
              <p>
                {language === 'ur'
                  ? 'اگر وہ شخص آپ کے گھر یا کالج کے باہر موجود ہے یا فوری حملے کی دھمکی دے رہا ہے تو فوراً 15 (پولیس) یا 1043 (ویمن ہیلپ لائن) پر کال کریں۔ کسی قابل اعتماد فرد کو فوری آگاہ کریں۔'
                  : 'If the person knows your physical whereabouts or threatens imminent physical harm, call Police (15) or Women Helpline (1043) immediately. Do not stay alone.'}
              </p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 rounded-2xl bg-[#174E4A] hover:bg-[#113C39] text-white font-bold text-base flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all disabled:opacity-50 focus:ring-2 focus:ring-[#80C5B0]"
          >
            {isSubmitting ? (
              <span>{t.generatingPlan}</span>
            ) : (
              <>
                <ShieldCheck className="w-5 h-5 text-[#80C5B0]" />
                <span>{t.startAssessment}</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
