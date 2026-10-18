import React from 'react';
import { Shield, PhoneCall, ExternalLink, Heart } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface FooterProps {
  language: Language;
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onNavigate }) => {
  const t = translations[language];
  const isUrdu = language === 'ur';

  return (
    <footer className="bg-[#174E4A] text-white border-t border-[#D4EBE2]/30 mt-16 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#D4EBE2] text-[#174E4A] flex items-center justify-center font-bold">
                <Shield className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">HIFAZAT</span>
              <span className="text-xs px-1.5 py-0.5 rounded-sm bg-[#80C5B0] text-[#174E4A] font-bold">
                حفاظت
              </span>
            </div>
            <p className="text-xs text-[#D4EBE2] leading-relaxed">
              {isUrdu
                ? 'پاکستانی خواتین اور لڑکیوں کے لیے ڈیجیٹل تحفظ، آن لائن بلیک میلنگ اور ہراسانی کے خلاف گمنام و محفوظ معلوماتی گائیڈ۔'
                : 'A privacy-first, anonymous digital safety guidance system for girls and women in Pakistan dealing with cyber threats, blackmail, and online harassment.'}
            </p>
          </div>

          {/* Key Helplines */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-[#80C5B0] uppercase tracking-wider">
              {isUrdu ? 'ہنگامی و مشاورتی ہیلپ لائنز' : 'Verified Helplines'}
            </h4>
            <ul className="space-y-2 text-xs text-[#D4EBE2]">
              <li className="flex items-center justify-between">
                <span>DRF Cyber Helpline:</span>
                <a href="tel:080039393" className="font-bold text-white hover:text-[#80C5B0]">
                  0800-39393 (Free)
                </a>
              </li>
              <li className="flex items-center justify-between">
                <span>Emergency Police:</span>
                <a href="tel:15" className="font-bold text-white hover:text-[#80C5B0]">
                  15
                </a>
              </li>
              <li className="flex items-center justify-between">
                <span>Women Crisis Helpline:</span>
                <a href="tel:1043" className="font-bold text-white hover:text-[#80C5B0]">
                  1043
                </a>
              </li>
              <li className="flex items-center justify-between">
                <span>Madadgaar Helpline:</span>
                <a href="tel:1098" className="font-bold text-white hover:text-[#80C5B0]">
                  1098
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-[#80C5B0] uppercase tracking-wider">
              {isUrdu ? 'اہم لنکس' : 'HIFAZAT Sections'}
            </h4>
            <ul className="space-y-1.5 text-xs text-[#D4EBE2]">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
                  {t.homeTab}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('chat')} className="hover:text-white transition-colors">
                  {t.chatTab}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('plan')} className="hover:text-white transition-colors">
                  {t.safetyPlanTab}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('complaint')} className="hover:text-white transition-colors">
                  {t.complaintTab}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('evidence')} className="hover:text-white transition-colors">
                  {t.evidenceGuideTab}
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('resources')} className="hover:text-white transition-colors">
                  {t.resourcesTab}
                </button>
              </li>
            </ul>
          </div>

          {/* Official Portals */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-[#80C5B0] uppercase tracking-wider">
              {isUrdu ? 'سرکاری پورٹلز' : 'Official Portals'}
            </h4>
            <ul className="space-y-2 text-xs text-[#D4EBE2]">
              <li>
                <a
                  href="https://complaint.nccia.gov.pk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>NCCIA Official Complaint Portal</span>
                  <ExternalLink className="w-3 h-3 text-[#80C5B0]" />
                </a>
              </li>
              <li>
                <a
                  href="https://pakistancode.gov.pk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>The Pakistan Code (PECA Text)</span>
                  <ExternalLink className="w-3 h-3 text-[#80C5B0]" />
                </a>
              </li>
              <li>
                <a
                  href="https://stopncii.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  <span>StopNCII.org (Image Hashing)</span>
                  <ExternalLink className="w-3 h-3 text-[#80C5B0]" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="border-t border-[#2E5853] pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#D4EBE2] gap-4 text-center sm:text-left">
          <p className="max-w-2xl leading-relaxed">
            {t.disclaimerText}
          </p>
          <p className="shrink-0 font-medium text-[#80C5B0]">
            {t.rightsReserved}
          </p>
        </div>
      </div>
    </footer>
  );
};
