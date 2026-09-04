import React, { useState, useEffect } from 'react';
import { CheckCircle2, Info, X } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { DashboardLayout } from './components/DashboardLayout';
import { NegotiationCard } from './components/NegotiationCard';
import { MarketRadar } from './components/MarketRadar';
import { RuleSandbox } from './components/RuleSandbox';
import { PersonaDossier } from './components/PersonaDossier';
import { HiringTeamHub } from './components/HiringTeamHub';
import { AuthModal } from './components/AuthModal';
import { LoginPage } from './components/LoginPage';
import { SignupPage } from './components/SignupPage';
import { PRIYA_PROFILE } from './engine/scenarios';
import { BorrowerProfile, CopilotResult } from './engine/types';
import { evaluateCopilot } from './engine/calculator';

interface ToastNotification {
  message: string;
  type: 'success' | 'info';
}

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('landing');
  const [darkMode, setDarkMode] = useState<boolean>(true); // Default to dark aesthetic
  const [activeProfile, setActiveProfile] = useState<BorrowerProfile>(PRIYA_PROFILE);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const [authInitialTab, setAuthInitialTab] = useState<'signin' | 'signup'>('signin');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('Guest Borrower');
  const [toast, setToast] = useState<ToastNotification | null>(null);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
  };

  // Synchronize route with URL pathname & hash (/dashboard, /login, /signup, etc.)
  useEffect(() => {
    const handleUrlSync = () => {
      const raw = window.location.pathname.replace(/^\/+/, '') || window.location.hash.replace(/^#\/?/, '');
      const clean = raw.toLowerCase().trim();
      if (clean === 'dashboard' || clean === 'copilot') {
        setCurrentTab('dashboard');
      } else if (clean === 'login' || clean === 'signin') {
        setCurrentTab('login');
      } else if (clean === 'signup' || clean === 'register') {
        setCurrentTab('signup');
      } else if (['card', 'radar', 'sandbox', 'cases', 'reviewer'].includes(clean)) {
        setCurrentTab(clean);
      } else if (clean === '' || clean === 'landing' || clean === 'home') {
        setCurrentTab('landing');
      }
    };

    handleUrlSync();
    window.addEventListener('popstate', handleUrlSync);
    window.addEventListener('hashchange', handleUrlSync);
    return () => {
      window.removeEventListener('popstate', handleUrlSync);
      window.removeEventListener('hashchange', handleUrlSync);
    };
  }, []);

  // Safe navigation helper that keeps URL clean
  const navigateTo = (tab: string) => {
    setCurrentTab(tab);
    const targetUrl = tab === 'landing' ? '/' : `/${tab}`;
    if (window.location.pathname !== targetUrl) {
      window.history.pushState(null, '', targetUrl);
    }
  };

  // Toast auto-dismiss after 3.5s
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

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

  const handleOpenAuth = (tab: 'signin' | 'signup' = 'signin') => {
    navigateTo(tab === 'signup' ? 'signup' : 'login');
  };

  const handleAuthenticate = (name: string) => {
    setIsAuthenticated(true);
    setUserName(name);
    showToast(`Successfully logged in as ${name} — Copilot active`, 'success');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName('Guest Borrower');
    showToast('Logged out successfully. Reverted to guest session.', 'info');
  };

  const copilotResult: CopilotResult = evaluateCopilot(activeProfile);

  // Suppress top Navbar on standalone auth routes and on full-screen dashboard with its own sidebar
  const hideTopNavbar = currentTab === 'landing' || currentTab === 'login' || currentTab === 'signup' || currentTab === 'dashboard';

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9FA] dark:bg-[#0E0B12] text-[#221A20] dark:text-[#EEE6EA] font-body transition-colors relative">
      {/* Floating Toast Notification */}
      {toast && (
        <div className="fixed top-6 right-6 z-[9999] flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-[#140F18]/95 text-white border border-purple-500/40 shadow-[0_12px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl animate-fadeIn">
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          ) : (
            <Info className="w-5 h-5 text-purple-400 shrink-0" />
          )}
          <span className="text-xs font-medium tracking-wide">{toast.message}</span>
          <button
            onClick={() => setToast(null)}
            className="ml-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Navbar (Rendered on secondary app tabs like radar, sandbox, cases, reviewer) */}
      {!hideTopNavbar && (
        <Navbar
          currentTab={currentTab}
          onSelectTab={navigateTo}
          activeProfile={activeProfile}
          onSelectProfile={(p) => {
            handleSelectProfile(p);
            navigateTo('dashboard');
          }}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          onOpenAuth={() => navigateTo('login')}
          onLogout={handleLogout}
          isAuthenticated={isAuthenticated}
          userName={userName}
        />
      )}

      {/* Main Tab Content */}
      <main className="flex-1 flex flex-col">
        {/* Dedicated Route: /login */}
        {currentTab === 'login' && (
          <LoginPage
            onBackToHome={() => navigateTo('landing')}
            onNavigateToSignup={() => navigateTo('signup')}
            onSelectProfile={(p) => {
              handleSelectProfile(p);
              navigateTo('dashboard');
            }}
            onAuthenticate={(name) => {
              handleAuthenticate(name);
              navigateTo('dashboard');
            }}
          />
        )}

        {/* Dedicated Route: /signup */}
        {currentTab === 'signup' && (
          <SignupPage
            onBackToHome={() => navigateTo('landing')}
            onNavigateToLogin={() => navigateTo('login')}
            onSelectProfile={(p) => {
              handleSelectProfile(p);
              navigateTo('dashboard');
            }}
            onAuthenticate={(name) => {
              handleAuthenticate(name);
              navigateTo('dashboard');
            }}
          />
        )}

        {currentTab === 'landing' && (
          <LandingPage
            onStartAssessment={() => navigateTo('dashboard')}
            onSelectProfile={(p) => {
              handleSelectProfile(p);
              navigateTo('dashboard');
            }}
            onOpenAuth={handleOpenAuth}
          />
        )}

        {/* Dedicated Route: /dashboard */}
        {(currentTab === 'dashboard' || currentTab === 'copilot') && (
          <DashboardLayout
            activeProfile={activeProfile}
            onChangeProfile={setActiveProfile}
            onOpenCard={() => navigateTo('card')}
            onNavigateTab={navigateTo}
            onLogout={handleLogout}
          />
        )}

        {currentTab === 'card' && (
          <div className="py-8 px-4 sm:px-6 lg:px-8">
            <NegotiationCard
              result={copilotResult}
              onBack={() => navigateTo('dashboard')}
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
                navigateTo('dashboard');
              }}
            />
          </div>
        )}


      </main>

      {/* Footer (Rendered outside landing and standalone auth/dashboard routes) */}
      {!hideTopNavbar && (
        <footer className="border-t border-[#E2D9DE] dark:border-[#2D1F35] bg-white dark:bg-neutral-900 py-8 px-4 sm:px-6 lg:px-8 text-xs text-[#6E6069] dark:text-[#A99DA5] transition-colors">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#EA580C] dark:bg-[#F59E0B] text-white dark:text-neutral-900 flex items-center justify-center font-display font-bold text-xs">
                As
              </div>
              <span className="font-display font-medium text-sm text-[#221A20] dark:text-[#EEE6EA]">
                Borrower Copilot
              </span>
              <span>· Independent Self-Assessment</span>
            </div>

            <div className="flex items-center gap-4 text-[11px] font-mono">
              <span>Repo Reference: 6.50%</span>
              <span>·</span>
              <span>100% In-Browser Memory</span>
              <span>·</span>
              <button onClick={() => navigateTo('landing')} className="hover:underline text-[#EA580C] dark:text-[#F59E0B] font-bold cursor-pointer">
                Return to Home
              </button>
            </div>
          </div>
        </footer>
      )}

      {/* Authentication Modal (Available for fallback/modal usage) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSelectProfile={(p) => {
          handleSelectProfile(p);
          navigateTo('copilot');
        }}
        onAuthenticate={(name) => {
          handleAuthenticate(name);
          navigateTo('copilot');
        }}
        onLogout={handleLogout}
        isAuthenticated={isAuthenticated}
        userName={userName}
        initialTab={authInitialTab}
      />
    </div>
  );
}

export default App;
