import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ChatAssistant } from './components/ChatAssistant';
import { SituationIntake } from './components/SituationIntake';
import { SafetyPlanView } from './components/SafetyPlanView';
import { ComplaintDraftGenerator } from './components/ComplaintDraftGenerator';
import { EvidenceGuide } from './components/EvidenceGuide';
import { VerifiedResourcesView } from './components/VerifiedResourcesView';
import { AboutAndPrivacy } from './components/AboutAndPrivacy';
import { Footer } from './components/Footer';
import { Language, IncidentCategory, SafetyPlan } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [language, setLanguage] = useState<Language>('en');
  const [selectedCategory, setSelectedCategory] = useState<IncidentCategory>('blackmail');
  const [currentPlan, setCurrentPlan] = useState<SafetyPlan | null>(null);

  // Update HTML dir and lang based on chosen language
  useEffect(() => {
    const isRtl = language === 'ur';
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = language === 'ur' ? 'ur' : 'en';
  }, [language]);

  // Quick exit handler: redirects immediately to a neutral weather or news site
  const handleQuickExit = () => {
    // Immediate redirect to neutral page
    window.location.replace('https://www.accuweather.com/');
  };

  // Keyboard shortcut: Press Escape twice quickly to trigger quick exit
  useEffect(() => {
    let lastEscapeTime = 0;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        const now = Date.now();
        if (now - lastEscapeTime < 700) {
          handleQuickExit();
        }
        lastEscapeTime = now;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectCategoryFromHero = (category: IncidentCategory) => {
    setSelectedCategory(category);
    setCurrentTab('plan');
  };

  const handlePlanGenerated = (planData: SafetyPlan) => {
    setCurrentPlan(planData);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F0F8F5] text-[#133834] font-sans">
      {/* Top Header Navigation */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        language={language}
        setLanguage={setLanguage}
        onQuickExit={handleQuickExit}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {currentTab === 'home' && (
          <HeroSection
            language={language}
            onSelectCategory={handleSelectCategoryFromHero}
            onOpenChat={() => setCurrentTab('chat')}
            onOpenPlan={() => setCurrentTab('plan')}
            onOpenComplaint={() => setCurrentTab('complaint')}
          />
        )}

        {currentTab === 'chat' && (
          <div className="py-2">
            <ChatAssistant
              language={language}
              onNavigateToTab={(tab) => setCurrentTab(tab)}
            />
          </div>
        )}

        {currentTab === 'plan' && (
          <div className="py-2">
            {currentPlan ? (
              <SafetyPlanView
                plan={currentPlan}
                language={language}
                onDraftComplaint={() => setCurrentTab('complaint')}
                onOpenChat={() => setCurrentTab('chat')}
                onResetPlan={() => setCurrentPlan(null)}
              />
            ) : (
              <SituationIntake
                language={language}
                selectedCategory={selectedCategory}
                onPlanGenerated={handlePlanGenerated}
              />
            )}
          </div>
        )}

        {currentTab === 'complaint' && (
          <div className="py-2">
            <ComplaintDraftGenerator language={language} />
          </div>
        )}

        {currentTab === 'evidence' && (
          <div className="py-2">
            <EvidenceGuide language={language} />
          </div>
        )}

        {currentTab === 'resources' && (
          <div className="py-2">
            <VerifiedResourcesView language={language} />
          </div>
        )}

        {currentTab === 'about' && (
          <div className="py-2">
            <AboutAndPrivacy language={language} />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer language={language} onNavigate={(tab) => setCurrentTab(tab)} />
    </div>
  );
}
