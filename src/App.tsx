import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { DashboardLayout } from './components/DashboardLayout';
import { NegotiationCard } from './components/NegotiationCard';
import { MarketRadar } from './components/MarketRadar';
import { RuleSandbox } from './components/RuleSandbox';
import { PersonaDossier } from './components/PersonaDossier';
import { HiringTeamHub } from './components/HiringTeamHub';
import { AuthModal } from './components/AuthModal';
import { PRIYA_PROFILE } from './engine/scenarios';
import { BorrowerProfile, CopilotResult } from './engine/types';
import { evaluateCopilot } from './engine/calculator';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('landing');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [activeProfile, setActiveProfile] = useState<BorrowerProfile>(PRIYA_PROFILE);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('Guest Borrower');

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSelectProfile = (profile: BorrowerProfile) => {
    setActiveProfile(profile);
  };

  const handleAuthenticate = (name: string) => {
    setIsAuthenticated(true);
    setUserName(name);
  };

  const copilotResult: CopilotResult = evaluateCopilot(activeProfile);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9FA] dark:bg-[#17121A] text-[#221A20] dark:text-[#EEE6EA] font-body transition-colors">
      {/* Navbar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        activeProfile={activeProfile}
        onSelectProfile={(p) => {
          handleSelectProfile(p);
          if (currentTab === 'landing') setCurrentTab('copilot');
        }}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onOpenAuth={() => setIsAuthOpen(true)}
        isAuthenticated={isAuthenticated}
        userName={userName}
      />

      {/* Main Tab Content */}
      <main className="flex-1">
        {currentTab === 'landing' && (
          <LandingPage
            onStartAssessment={() => setCurrentTab('copilot')}
            onSelectProfile={(p) => {
              handleSelectProfile(p);
              setCurrentTab('copilot');
            }}
          />
        )}

        {currentTab === 'copilot' && (
          <DashboardLayout
            activeProfile={activeProfile}
            onChangeProfile={setActiveProfile}
            onOpenCard={() => setCurrentTab('card')}
          />
        )}

        {currentTab === 'card' && (
          <div className="py-8 px-4 sm:px-6 lg:px-8">
            <NegotiationCard
              result={copilotResult}
              onBack={() => setCurrentTab('copilot')}
            />
          </div>
        )}

        {currentTab === 'radar' && (
          <div className="py-8 px-4 sm:px-6 lg:px-8">
            <MarketRadar />
          </div>
        )}

        {currentTab === 'sandbox' && (
          <div className="py-8 px-4 sm:px-6 lg:px-8">
            <RuleSandbox activeProfile={activeProfile} />
          </div>
        )}

        {currentTab === 'cases' && (
          <div className="py-8 px-4 sm:px-6 lg:px-8">
            <PersonaDossier
              onSelectAndLaunch={(p) => {
                handleSelectProfile(p);
                setCurrentTab('copilot');
              }}
            />
          </div>
        )}

        {currentTab === 'reviewer' && (
          <div className="py-8 px-4 sm:px-6 lg:px-8">
            <HiringTeamHub />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E2D9DE] dark:border-[#33293A] bg-white dark:bg-neutral-900 py-8 px-4 sm:px-6 lg:px-8 text-xs text-[#6E6069] dark:text-[#A99DA5] transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#4B2440] dark:bg-[#CFA5C1] text-white dark:text-neutral-900 flex items-center justify-center font-display font-bold text-xs">
              Lc
            </div>
            <span className="font-display font-medium text-sm text-[#221A20] dark:text-[#EEE6EA]">
              Lokta Borrower Copilot
            </span>
            <span>· Build Challenge Submission</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>Repo Reference: 6.50%</span>
            <span>·</span>
            <span>100% Client-Side Evaluation</span>
            <span>·</span>
            <button onClick={() => setCurrentTab('reviewer')} className="hover:underline text-[#4B2440] dark:text-[#CFA5C1] font-bold">
              Review Deliverables
            </button>
          </div>
        </div>
      </footer>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSelectProfile={handleSelectProfile}
        onAuthenticate={handleAuthenticate}
      />
    </div>
  );
}

export default App;
