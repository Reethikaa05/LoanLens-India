import React from 'react';
import { Shield, Sparkles, Moon, Sun, UserCheck, LogIn, Compass, FileSpreadsheet, TrendingUp, Sliders, BookOpen, Award, LogOut } from 'lucide-react';
import { PRESET_PROFILES } from '../engine/scenarios';
import { BorrowerProfile } from '../engine/types';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  activeProfile: BorrowerProfile;
  onSelectProfile: (profile: BorrowerProfile) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenAuth: () => void;
  onLogout?: () => void;
  isAuthenticated: boolean;
  userName: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  activeProfile,
  onSelectProfile,
  darkMode,
  onToggleDarkMode,
  onOpenAuth,
  onLogout,
  isAuthenticated,
  userName
}) => {
  return (
    <header className="sticky top-0 z-50 bg-[#FBF9FA]/90 dark:bg-[#17121A]/90 backdrop-blur-md border-b border-[#E2D9DE] dark:border-[#33293A] transition-colors">
      {/* Top Banner: Quick Scenario Switcher */}
      <div className="bg-[#EFE3EA]/60 dark:bg-[#2A1F2C]/70 border-b border-[#E2D9DE] dark:border-[#33293A] px-4 py-1.5 text-xs text-[#6E6069] dark:text-[#A99DA5]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#4B2440] dark:text-[#CFA5C1] uppercase tracking-wider text-[10px]">Independent Credit Assessment Protocol</span>
            <span className="hidden sm:inline text-neutral-400">|</span>
            <span className="hidden sm:inline">Preloaded Challenge Personas:</span>
          </div>
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5">
            {PRESET_PROFILES.map((preset) => {
              const isSelected = activeProfile.id === preset.profile.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => {
                    onSelectProfile(preset.profile);
                    if (currentTab === 'landing') onSelectTab('copilot');
                  }}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#4B2440] text-[#FBF9FA] dark:bg-[#CFA5C1] dark:text-[#17121A] shadow-sm'
                      : 'bg-white/80 dark:bg-neutral-800/80 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-[#221A20] dark:text-[#EEE6EA] border border-[#E2D9DE] dark:border-[#33293A]'
                  }`}
                >
                  <UserCheck className="w-3 h-3" />
                  <span>{preset.profile.name}</span>
                  <span className="text-[10px] opacity-75 hidden md:inline">({preset.profile.city})</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectTab('landing')}>
            <div className="w-10 h-10 rounded-xl bg-[#4B2440] dark:bg-[#CFA5C1] text-[#FBF9FA] dark:text-[#17121A] flex items-center justify-center font-display font-semibold text-xl shadow-md">
              Lc
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-semibold text-xl tracking-tight text-[#221A20] dark:text-[#EEE6EA]">
                  Borrower <em className="italic text-[#4B2440] dark:text-[#CFA5C1]">Copilot</em>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] uppercase font-mono font-medium rounded bg-[#EFE3EA] dark:bg-[#2A1F2C] text-[#4B2440] dark:text-[#CFA5C1]">
                  v1.0
                </span>
              </div>
              <p className="text-[11px] text-[#6E6069] dark:text-[#A99DA5] leading-none">
                The Anti-Lender Self Assessment
              </p>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button
              onClick={() => onSelectTab('landing')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentTab === 'landing'
                  ? 'bg-[#EFE3EA] dark:bg-[#2A1F2C] text-[#4B2440] dark:text-[#CFA5C1]'
                  : 'text-[#6E6069] dark:text-[#A99DA5] hover:text-[#221A20] dark:hover:text-[#EEE6EA]'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => onSelectTab('copilot')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                currentTab === 'copilot'
                  ? 'bg-[#EFE3EA] dark:bg-[#2A1F2C] text-[#4B2440] dark:text-[#CFA5C1]'
                  : 'text-[#6E6069] dark:text-[#A99DA5] hover:text-[#221A20] dark:hover:text-[#EEE6EA]'
              }`}
            >
              <Compass className="w-4 h-4" />
              Copilot Engine
            </button>
            <button
              onClick={() => onSelectTab('card')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                currentTab === 'card'
                  ? 'bg-[#EFE3EA] dark:bg-[#2A1F2C] text-[#4B2440] dark:text-[#CFA5C1]'
                  : 'text-[#6E6069] dark:text-[#A99DA5] hover:text-[#221A20] dark:hover:text-[#EEE6EA]'
              }`}
            >
              <Shield className="w-4 h-4" />
              Negotiation Card
            </button>
            <button
              onClick={() => onSelectTab('radar')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                currentTab === 'radar'
                  ? 'bg-[#EFE3EA] dark:bg-[#2A1F2C] text-[#4B2440] dark:text-[#CFA5C1]'
                  : 'text-[#6E6069] dark:text-[#A99DA5] hover:text-[#221A20] dark:hover:text-[#EEE6EA]'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Rates Radar
            </button>
            <button
              onClick={() => onSelectTab('sandbox')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                currentTab === 'sandbox'
                  ? 'bg-[#EFE3EA] dark:bg-[#2A1F2C] text-[#4B2440] dark:text-[#CFA5C1]'
                  : 'text-[#6E6069] dark:text-[#A99DA5] hover:text-[#221A20] dark:hover:text-[#EEE6EA]'
              }`}
            >
              <Sliders className="w-4 h-4" />
              Rule Sandbox
            </button>
            <button
              onClick={() => onSelectTab('cases')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                currentTab === 'cases'
                  ? 'bg-[#EFE3EA] dark:bg-[#2A1F2C] text-[#4B2440] dark:text-[#CFA5C1]'
                  : 'text-[#6E6069] dark:text-[#A99DA5] hover:text-[#221A20] dark:hover:text-[#EEE6EA]'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              3 Borrowers
            </button>
            <button
              onClick={() => onSelectTab('reviewer')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${
                currentTab === 'reviewer'
                  ? 'bg-[#4B2440] text-[#FBF9FA] dark:bg-[#CFA5C1] dark:text-[#17121A]'
                  : 'text-[#4B2440] dark:text-[#CFA5C1] hover:bg-[#EFE3EA] dark:hover:bg-[#2A1F2C]'
              }`}
            >
              <Award className="w-4 h-4" />
              Reviewer Hub
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg text-[#6E6069] dark:text-[#A99DA5] hover:bg-[#EFE3EA] dark:hover:bg-[#2A1F2C] transition-colors"
              title="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Auth / Profile Trigger */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={onOpenAuth}
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-lg border border-[#E2D9DE] dark:border-[#33293A] hover:bg-[#EFE3EA] dark:hover:bg-[#2A1F2C] transition-colors cursor-pointer"
              >
                {isAuthenticated ? (
                  <>
                    <div className="w-5 h-5 rounded-full bg-[#4B2440] dark:bg-[#CFA5C1] text-white dark:text-neutral-900 flex items-center justify-center text-[10px] font-bold">
                      {userName.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden sm:inline font-medium">{userName}</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-3.5 h-3.5 text-[#4B2440] dark:text-[#CFA5C1]" />
                    <span>Sign In / Demo</span>
                  </>
                )}
              </button>

              {/* Quick Logout Button */}
              {isAuthenticated && onLogout && (
                <button
                  type="button"
                  onClick={onLogout}
                  title="Sign Out"
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-rose-400 hover:bg-rose-950/40 border border-transparent hover:border-rose-500/30 transition-all cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Assessment CTA */}
            <button
              onClick={() => onSelectTab('copilot')}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#4B2440] text-[#FBF9FA] dark:bg-[#CFA5C1] dark:text-[#17121A] text-xs font-semibold hover:opacity-90 transition-opacity shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Launch Copilot</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Scroller */}
      <div className="lg:hidden flex items-center gap-1 overflow-x-auto px-4 py-2 border-t border-[#E2D9DE] dark:border-[#33293A] text-xs">
        <button
          onClick={() => onSelectTab('landing')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${currentTab === 'landing' ? 'bg-[#4B2440] text-white dark:bg-[#CFA5C1] dark:text-black font-semibold' : 'text-neutral-600 dark:text-neutral-300'}`}
        >
          Overview
        </button>
        <button
          onClick={() => onSelectTab('copilot')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${currentTab === 'copilot' ? 'bg-[#4B2440] text-white dark:bg-[#CFA5C1] dark:text-black font-semibold' : 'text-neutral-600 dark:text-neutral-300'}`}
        >
          Copilot
        </button>
        <button
          onClick={() => onSelectTab('card')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${currentTab === 'card' ? 'bg-[#4B2440] text-white dark:bg-[#CFA5C1] dark:text-black font-semibold' : 'text-neutral-600 dark:text-neutral-300'}`}
        >
          Negotiation Card
        </button>
        <button
          onClick={() => onSelectTab('radar')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${currentTab === 'radar' ? 'bg-[#4B2440] text-white dark:bg-[#CFA5C1] dark:text-black font-semibold' : 'text-neutral-600 dark:text-neutral-300'}`}
        >
          Rates Radar
        </button>
        <button
          onClick={() => onSelectTab('sandbox')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${currentTab === 'sandbox' ? 'bg-[#4B2440] text-white dark:bg-[#CFA5C1] dark:text-black font-semibold' : 'text-neutral-600 dark:text-neutral-300'}`}
        >
          Rule Sandbox
        </button>
        <button
          onClick={() => onSelectTab('cases')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${currentTab === 'cases' ? 'bg-[#4B2440] text-white dark:bg-[#CFA5C1] dark:text-black font-semibold' : 'text-neutral-600 dark:text-neutral-300'}`}
        >
          3 Borrowers
        </button>
        <button
          onClick={() => onSelectTab('reviewer')}
          className={`px-2.5 py-1 rounded-md whitespace-nowrap ${currentTab === 'reviewer' ? 'bg-[#4B2440] text-white dark:bg-[#CFA5C1] dark:text-black font-semibold' : 'text-neutral-600 dark:text-neutral-300'}`}
        >
          Reviewer Hub
        </button>
      </div>
    </header>
  );
};
