import React, { useState } from 'react';
import { Shield, MessageSquareText, FileText, BookmarkCheck, PhoneCall, LogOut, Globe, AlertTriangle } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  onQuickExit: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  language,
  setLanguage,
  onQuickExit,
}) => {
  const t = translations[language];
  const [showExitWarning, setShowExitWarning] = useState(false);

  const navItems = [
    { id: 'home', label: t.homeTab, icon: Shield },
    { id: 'chat', label: t.chatTab, icon: MessageSquareText, highlight: true },
    { id: 'plan', label: t.safetyPlanTab, icon: BookmarkCheck },
    { id: 'complaint', label: t.complaintTab, icon: FileText },
    { id: 'evidence', label: t.evidenceGuideTab, icon: BookmarkCheck },
    { id: 'resources', label: t.resourcesTab, icon: PhoneCall },
    { id: 'about', label: t.aboutTab, icon: Shield },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#D4EBE2] shadow-xs">
      {/* Emergency Helpline Banner */}
      <div className="bg-[#174E4A] text-[#F0F8F5] text-xs py-1.5 px-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-[#80C5B0] animate-pulse"></span>
          <span className="font-medium">
            {language === 'ur'
              ? 'ہنگامی مدد: پولیس 15 | ویمن ہیلپ لائن 1043 | ڈی آر ایف سائبر ہیلپ لائن 0800-39393'
              : 'Urgent Help: Police 15 | Women Helpline 1043 | DRF Cyber Helpline 0800-39393 (Free)'}
          </span>
        </div>
        <div className="text-[11px] text-[#D4EBE2] hidden sm:block">
          {language === 'ur'
            ? 'مکمل پرائیویٹ اور گمنام رہنمائی'
            : '100% Anonymous & Private Guidance'}
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Brand Logo */}
          <button
            onClick={() => setCurrentTab('home')}
            className="flex items-center gap-2.5 text-left group focus:outline-hidden focus:ring-2 focus:ring-[#80C5B0] rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-xl bg-[#D4EBE2] flex items-center justify-center text-[#174E4A] group-hover:bg-[#80C5B0] transition-colors shadow-xs">
              <Shield className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight text-[#174E4A]">HIFAZAT</span>
                <span className="text-xs px-1.5 py-0.5 rounded-md bg-[#D4EBE2] text-[#174E4A] font-semibold">
                  حفاظت
                </span>
              </div>
              <p className="text-[11px] text-[#2E5853] hidden sm:block font-medium">
                {t.brandSubtitle}
              </p>
            </div>
          </button>

          {/* Center Navigation for Desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-[#174E4A] text-white shadow-xs'
                      : item.highlight
                      ? 'bg-[#D4EBE2] text-[#174E4A] hover:bg-[#80C5B0]/40'
                      : 'text-[#133834] hover:bg-[#F0F8F5] hover:text-[#174E4A]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.highlight && !isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#174E4A]"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Language Switcher & Quick Exit */}
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="relative inline-flex items-center bg-[#F0F8F5] p-1 rounded-xl border border-[#D4EBE2]">
              <Globe className="w-3.5 h-3.5 text-[#2E5853] ml-1.5 mr-0.5" />
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  language === 'en'
                    ? 'bg-[#174E4A] text-white shadow-xs'
                    : 'text-[#133834] hover:text-[#174E4A]'
                }`}
                title="English"
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('ur')}
                className={`px-2 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  language === 'ur'
                    ? 'bg-[#174E4A] text-white shadow-xs'
                    : 'text-[#133834] hover:text-[#174E4A]'
                }`}
                title="اردو"
              >
                اُردو
              </button>
              <button
                onClick={() => setLanguage('ur-roman')}
                className={`px-2 py-1 text-xs font-semibold rounded-lg transition-colors ${
                  language === 'ur-roman'
                    ? 'bg-[#174E4A] text-white shadow-xs'
                    : 'text-[#133834] hover:text-[#174E4A]'
                }`}
                title="Roman Urdu"
              >
                Roman
              </button>
            </div>

            {/* Quick Exit Button with Hover Info */}
            <div className="relative">
              <button
                onClick={onQuickExit}
                onMouseEnter={() => setShowExitWarning(true)}
                onMouseLeave={() => setShowExitWarning(false)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FFF1F0] hover:bg-[#FFE4E2] text-[#9E2A2B] border border-[#FFD0CC] text-xs sm:text-sm font-semibold transition-all shadow-xs focus:ring-2 focus:ring-[#9E2A2B]"
                title={t.quickExitTooltip}
                aria-label="Quick Exit"
              >
                <LogOut className="w-4 h-4 stroke-[2.2]" />
                <span className="font-bold">{t.quickExit}</span>
              </button>

              {/* Informational tooltip */}
              {showExitWarning && (
                <div className="absolute right-0 top-full mt-2 w-72 p-3 bg-white text-[#133834] text-xs rounded-xl shadow-lg border border-[#D4EBE2] z-50">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[#174E4A] mb-1">
                        {language === 'ur' ? 'فوری خروج کی سہولت' : 'Quick Exit Notice'}
                      </p>
                      <p className="text-[11px] leading-relaxed text-[#2E5853]">
                        {t.quickExitWarning}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="lg:hidden flex items-center justify-between overflow-x-auto py-2 gap-1 border-t border-[#D4EBE2]/60 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-[#174E4A] text-white shadow-xs'
                    : 'text-[#133834] bg-[#F0F8F5] hover:bg-[#D4EBE2]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
