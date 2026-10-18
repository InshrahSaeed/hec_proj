import React, { useState } from 'react';
import { ExternalLink, PhoneCall, ShieldCheck, Search, CheckCircle2, Bookmark, Building2, HeartHandshake } from 'lucide-react';
import { Language, VerifiedResource } from '../types';
import { VERIFIED_RESOURCES, PECA_LEGAL_PROVISIONS } from '../data/knowledgeBase';
import { translations } from '../data/translations';

interface VerifiedResourcesViewProps {
  language: Language;
}

export const VerifiedResourcesView: React.FC<VerifiedResourcesViewProps> = ({ language }) => {
  const t = translations[language];
  const isUrdu = language === 'ur';

  const [activeFilter, setActiveFilter] = useState<'all' | 'government' | 'helpline' | 'international_tool'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResources = VERIFIED_RESOURCES.filter((res) => {
    const matchesFilter = activeFilter === 'all' || res.category === activeFilter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      res.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.urduName.includes(searchQuery) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.relevantLawOrTopic.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-[#D4EBE2] p-6 sm:p-8 shadow-sm">
        <div className="border-b border-[#D4EBE2] pb-6 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4EBE2] text-[#174E4A] text-xs font-bold mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'مصدقہ رابطہ معلومات' : 'Verified Authorities & Portals'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#174E4A] tracking-tight">
            {t.verifiedResourcesTitle}
          </h2>
          <p className="text-xs sm:text-sm text-[#2E5853] mt-2 leading-relaxed">
            {t.verifiedResourcesSubtitle}
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between mb-6">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-[#F0F8F5] border border-[#D4EBE2]">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                activeFilter === 'all'
                  ? 'bg-[#174E4A] text-white shadow-2xs'
                  : 'text-[#133834] hover:bg-[#D4EBE2]'
              }`}
            >
              {isUrdu ? 'تمام ذرائع' : 'All Resources'}
            </button>
            <button
              onClick={() => setActiveFilter('government')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                activeFilter === 'government'
                  ? 'bg-[#174E4A] text-white shadow-2xs'
                  : 'text-[#133834] hover:bg-[#D4EBE2]'
              }`}
            >
              {isUrdu ? 'سرکاری ادارے (NCCIA / PTA)' : 'Government (NCCIA/PTA)'}
            </button>
            <button
              onClick={() => setActiveFilter('helpline')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                activeFilter === 'helpline'
                  ? 'bg-[#174E4A] text-white shadow-2xs'
                  : 'text-[#133834] hover:bg-[#D4EBE2]'
              }`}
            >
              {isUrdu ? 'ہیلپ لائنز (DRF)' : 'Helplines'}
            </button>
            <button
              onClick={() => setActiveFilter('international_tool')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                activeFilter === 'international_tool'
                  ? 'bg-[#174E4A] text-white shadow-2xs'
                  : 'text-[#133834] hover:bg-[#D4EBE2]'
              }`}
            >
              {isUrdu ? 'تصاویر کے عالمی ٹولز (StopNCII)' : 'Privacy Tools (StopNCII)'}
            </button>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#2E5853] absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isUrdu ? 'تلاش کریں...' : 'Search resources...'}
              className="pl-9 pr-4 py-2 rounded-xl bg-[#F0F8F5] border border-[#D4EBE2] text-xs sm:text-sm text-[#133834] focus:outline-hidden focus:border-[#174E4A] w-full sm:w-56"
            />
          </div>
        </div>

        {/* Resource Cards */}
        <div className="space-y-4">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="p-5 sm:p-6 rounded-2xl bg-[#F0F8F5]/80 border border-[#D4EBE2] hover:border-[#80C5B0] transition-all shadow-2xs hover:shadow-xs space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#174E4A]"></span>
                  <h3 className="font-bold text-base text-[#174E4A]">
                    {isUrdu ? res.urduName : res.name}
                  </h3>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#D4EBE2] text-[#174E4A]">
                    {t.lastVerifiedOn}: {res.verifiedDate}
                  </span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                    Official
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#133834] leading-relaxed">
                {isUrdu ? res.urduDescription : res.description}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#D4EBE2]/60 text-xs">
                <div className="text-[#2E5853] font-medium">
                  <span className="font-bold text-[#174E4A]">Topic: </span>
                  <span>{res.relevantLawOrTopic}</span>
                  {res.operatingHours && (
                    <span className="ml-2 px-1.5 py-0.5 rounded-sm bg-white border border-[#D4EBE2]">
                      {res.operatingHours}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {res.contactNumber && (
                    <a
                      href={`tel:${res.contactNumber.replace(/[^0-9]/g, '')}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4EBE2] text-[#174E4A] font-bold hover:bg-[#80C5B0] transition-colors"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>{res.contactNumber}</span>
                    </a>
                  )}

                  {res.officialUrl && (
                    <a
                      href={res.officialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#174E4A] text-white font-bold hover:bg-[#113C39] transition-colors shadow-2xs"
                    >
                      <span>{t.officialPortal}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statutory Legal Provisions Section */}
      <div className="bg-white rounded-3xl border border-[#D4EBE2] p-6 sm:p-8 shadow-sm space-y-6">
        <div className="border-b border-[#D4EBE2] pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4EBE2] text-[#174E4A] text-xs font-bold mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>Pakistan Code Official Text</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#174E4A]">
            {isUrdu ? 'پیکا ایکٹ 2016 کے اہم قانونی دفعات' : 'Grounded PECA 2016 Statutory Provisions'}
          </h3>
          <p className="text-xs text-[#2E5853] mt-1">
            Source: The Pakistan Code (Ministry of Law and Justice) - https://pakistancode.gov.pk/
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PECA_LEGAL_PROVISIONS.map((item, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl bg-[#F0F8F5] border border-[#D4EBE2] space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-[#174E4A]">{item.section}</span>
                  <span className="text-[10px] text-[#2E5853] font-medium">{item.lastVerified}</span>
                </div>
                <h4 className="font-bold text-sm text-[#174E4A]">
                  {isUrdu ? item.urduTitle : item.title}
                </h4>
                <p className="text-xs text-[#133834] leading-relaxed pt-1">
                  {item.description}
                </p>
              </div>

              <div className="pt-2 border-t border-[#D4EBE2]/60 text-[11px] text-[#2E5853]">
                <span className="font-bold text-[#174E4A]">Statutory Penalty: </span>
                <span>{item.penaltySummary}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
