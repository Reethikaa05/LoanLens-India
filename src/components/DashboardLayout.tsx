import React, { useState } from 'react';
import { 
  Home, 
  Compass, 
  Shield, 
  TrendingUp, 
  Sliders, 
  BookOpen,
  Settings, 
  LogOut, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowUpRight,
  ArrowRight, 
  Info, 
  Layers, 
  Zap, 
  RotateCcw,
  Clock,
  DollarSign,
  PieChart,
  Activity,
  ChevronRight,
  ChevronLeft,
  PanelLeftClose,
  PanelLeftOpen,
  Menu,
  ShieldCheck,
  FileText,
  Flame,
  LayoutGrid
} from 'lucide-react';
import { BorrowerProfile, CopilotResult } from '../engine/types';
import { evaluateCopilot } from '../engine/calculator';
import { PRESET_PROFILES } from '../engine/scenarios';
import { QuestionFlow } from './QuestionFlow';
import { OutputsDashboard } from './OutputsDashboard';
import { NegotiationCard } from './NegotiationCard';
import { MarketRadar } from './MarketRadar';
import { RuleSandbox } from './RuleSandbox';
import { PersonaDossier } from './PersonaDossier';
import { ProfileSettingsModal } from './ProfileSettingsModal';
import { OverviewFitnessInspiredGrid } from './OverviewFitnessInspiredGrid';

export type DashboardSubView = 
  | 'overview' 
  | 'engine' 
  | 'card' 
  | 'radar' 
  | 'sandbox' 
  | 'cases';

interface DashboardLayoutProps {
  activeProfile: BorrowerProfile;
  onChangeProfile: (profile: BorrowerProfile) => void;
  onOpenCard?: () => void;
  onNavigateTab?: (tab: string) => void;
  onLogout?: () => void;
  initialView?: DashboardSubView;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  activeProfile,
  onChangeProfile,
  onLogout,
  initialView = 'overview'
}) => {
  const [activeSubTab, setActiveSubTab] = useState<DashboardSubView>(initialView);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [requestedAmountSlider, setRequestedAmountSlider] = useState<number>(activeProfile.requestedAmount);

  // Re-evaluate calculation based on profile & live slider
  const liveProfile: BorrowerProfile = {
    ...activeProfile,
    requestedAmount: requestedAmountSlider
  };
  const result: CopilotResult = evaluateCopilot(liveProfile);

  // Derived financial metrics for the bento visual telemetry
  const netIncome = liveProfile.netMonthlyIncome;
  const livingExp = liveProfile.monthlyEssentialExpenses;
  const currentEmis = liveProfile.existingMonthlyEmis;
  const safeCapacityMonthly = Math.max(0, netIncome - livingExp - currentEmis);
  const safeBuffer = Math.round(netIncome * 0.20);
  const safeEmiCap = Math.max(0, safeCapacityMonthly - safeBuffer);
  const bankGrossFoirEmi = Math.round(netIncome * 0.60) - currentEmis;

  // Percentage safe utilization
  const safeFoirPercent = Math.min(100, Math.round(((currentEmis + safeEmiCap) / netIncome) * 100));
  const bankFoirPercent = 60;

  // Reset handler
  const handleResetToPreset = () => {
    const original = PRESET_PROFILES.find(p => p.profile.id === activeProfile.id)?.profile;
    if (original) {
      onChangeProfile(original);
      setRequestedAmountSlider(original.requestedAmount);
    }
  };

  // Sidebar navigation menu items with detailed descriptions (Reviewer Hub removed)
  const menuItems = [
    {
      id: 'overview' as DashboardSubView,
      label: 'Dashboard Overview',
      subtitle: 'Slideshow, Telemetry & FOIR Gauge',
      icon: Home,
      badge: 'Dual Design',
      color: 'text-orange-400'
    },
    {
      id: 'engine' as DashboardSubView,
      label: 'Copilot Engine',
      subtitle: 'Adaptive Underwriting (O1–O4)',
      icon: Compass,
      badge: 'Interactive',
      color: 'text-amber-400'
    },
    {
      id: 'card' as DashboardSubView,
      label: 'Negotiation Card',
      subtitle: 'Branch Scripts & Fee Caps',
      icon: Shield,
      badge: 'Essential',
      color: 'text-emerald-400'
    },
    {
      id: 'radar' as DashboardSubView,
      label: 'Rates Radar',
      subtitle: 'Repo 6.50% & APR Simulator',
      icon: TrendingUp,
      badge: '2026 RBI',
      color: 'text-cyan-400'
    },
    {
      id: 'sandbox' as DashboardSubView,
      label: 'Rule Sandbox',
      subtitle: 'Decoupled Rules & Shocks',
      icon: Sliders,
      badge: 'Engine',
      color: 'text-purple-400'
    },
    {
      id: 'cases' as DashboardSubView,
      label: '3 Borrowers',
      subtitle: 'Priya, Ravi & Anita Case Runs',
      icon: BookOpen,
      badge: 'Cases',
      color: 'text-rose-400'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0E0B12] text-[#EEE6EA] flex flex-col md:flex-row antialiased select-none">
      
      {/* ===================================================================== */}
      {/* 1. COLLAPSIBLE LEFT SIDE MENU WITH OPEN / CLOSE TOGGLE                */}
      {/* ===================================================================== */}
      <aside 
        className={`bg-[#140F18]/95 border-r border-white/5 flex flex-col justify-between shrink-0 backdrop-blur-xl transition-all duration-300 z-40 ${
          isSidebarOpen ? 'w-full md:w-64 lg:w-72 p-4 sm:p-5' : 'w-full md:w-20 p-3 sm:p-4'
        }`}
      >
        {/* Top Header & Brand */}
        <div className="space-y-4">
          
          {/* Logo & Open/Close Toggle Button */}
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <button 
              onClick={() => setActiveSubTab('overview')}
              className="flex items-center gap-3 cursor-pointer group text-left"
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 flex items-center justify-center text-white font-display font-bold text-lg shadow-[0_0_20px_rgba(249,115,22,0.45)] group-hover:scale-105 transition-all">
                Bc
              </div>
              {isSidebarOpen && (
                <div className="leading-tight animate-fadeIn">
                  <div className="font-display font-semibold text-white text-base tracking-tight">
                    Borrower <em className="italic text-orange-400">Copilot</em>
                  </div>
                  <div className="text-[10px] text-neutral-400 font-mono">Anti-Lender Protocol</div>
                </div>
              )}
            </button>

            {/* Open / Close Toggle Button */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title={isSidebarOpen ? "Collapse sidebar (compact view)" : "Expand sidebar (see all descriptions)"}
              aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              {isSidebarOpen ? (
                <PanelLeftClose className="w-4 h-4 text-orange-400" />
              ) : (
                <PanelLeftOpen className="w-4 h-4 text-neutral-400 hover:text-orange-400" />
              )}
            </button>
          </div>

          {/* Section Header when Open */}
          {isSidebarOpen && (
            <div className="px-2 pt-1 flex items-center justify-between text-[10px] font-mono uppercase tracking-wider text-neutral-500 animate-fadeIn">
              <span>Navigation & Tools</span>
              <span>v1.0</span>
            </div>
          )}

          {/* Navigation Items */}
          <nav className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSubTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSubTab(item.id)}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-2xl transition-all cursor-pointer relative group text-left ${
                    isActive
                      ? 'bg-orange-500/20 text-white border border-orange-500/40 shadow-[0_0_15px_rgba(249,115,22,0.2)]'
                      : 'text-neutral-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                  title={!isSidebarOpen ? `${item.label} — ${item.subtitle}` : undefined}
                >
                  <div className={`p-1.5 rounded-xl transition-colors ${
                    isActive ? 'bg-orange-500 text-black' : 'bg-white/5 text-neutral-300 group-hover:text-white'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>

                  {isSidebarOpen && (
                    <div className="flex-1 min-w-0 animate-fadeIn">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-semibold truncate ${isActive ? 'text-white' : 'text-neutral-300 group-hover:text-white'}`}>
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/5 text-neutral-400">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-neutral-400 truncate font-light mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  )}
                </button>
              );
            })}
          </nav>

        </div>

        {/* Bottom Section: Profile Settings & Sign Out */}
        <div className="pt-4 border-t border-white/5 space-y-1.5">
          
          {/* Profile Settings Trigger */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            className={`w-full flex items-center gap-3 p-2.5 rounded-2xl text-neutral-400 hover:text-orange-300 hover:bg-white/[0.04] transition-all cursor-pointer text-left ${
              !isSidebarOpen ? 'justify-center' : ''
            }`}
            title="Profile & Underwriting Settings"
          >
            <div className="p-1.5 rounded-xl bg-white/5 text-neutral-300">
              <Settings className="w-4 h-4" />
            </div>
            {isSidebarOpen && (
              <div className="flex-1 min-w-0 animate-fadeIn">
                <div className="text-xs font-semibold text-neutral-200">Profile Settings</div>
                <div className="text-[10px] text-neutral-400 font-light truncate">Edit cashflow & photo</div>
              </div>
            )}
          </button>

          {/* Sign Out Button */}
          {onLogout && (
            <button
              onClick={onLogout}
              className={`w-full flex items-center gap-3 p-2.5 rounded-2xl text-neutral-400 hover:text-rose-300 hover:bg-rose-950/20 transition-all cursor-pointer text-left ${
                !isSidebarOpen ? 'justify-center' : ''
              }`}
              title="Sign Out (Return to Home)"
            >
              <div className="p-1.5 rounded-xl bg-white/5 text-neutral-300">
                <LogOut className="w-4 h-4" />
              </div>
              {isSidebarOpen && (
                <div className="flex-1 min-w-0 animate-fadeIn">
                  <div className="text-xs font-semibold text-neutral-200">Sign Out</div>
                  <div className="text-[10px] text-neutral-400 font-light truncate">Return to home page</div>
                </div>
              )}
            </button>
          )}

        </div>
      </aside>

      {/* ===================================================================== */}
      {/* 2. MAIN DASHBOARD CONTENT AREA                                        */}
      {/* ===================================================================== */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Header Bar: Personalized Greeting + Pill Tabs + Real Avatar */}
        <header className="px-6 py-5 border-b border-white/5 bg-[#140F18]/50 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30">
          
          {/* Greeting */}
          <div className="space-y-1">
            <h1 
              className="text-xl sm:text-2xl text-white font-normal tracking-tight"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Hi {activeProfile.name.split(' ')[0]}, Great to see you again!
            </h1>
            <p className="text-xs text-neutral-400 font-light flex items-center gap-2">
              <span>{activeProfile.occupation}</span>
              <span>·</span>
              <span>{activeProfile.city}</span>
              <span>·</span>
              <span className="font-mono text-orange-400 font-medium">
                {activeProfile.creditScoreBand.replace('_', ' ')}
              </span>
            </p>
          </div>

          {/* Center Switcher Pills for Quick Navigation (Reviewer Hub removed) */}
          <div className="flex items-center gap-1.5 bg-black/40 p-1.5 rounded-2xl border border-white/5 text-xs font-medium overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveSubTab('overview')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeSubTab === 'overview'
                  ? 'bg-orange-500 text-black font-semibold shadow-[0_0_12px_rgba(249,115,22,0.4)]'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Dashboard Overview
            </button>
            <button
              onClick={() => setActiveSubTab('engine')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeSubTab === 'engine'
                  ? 'bg-orange-500 text-black font-semibold shadow-[0_0_12px_rgba(249,115,22,0.4)]'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Copilot Engine
            </button>
            <button
              onClick={() => setActiveSubTab('card')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap flex items-center gap-1 ${
                activeSubTab === 'card'
                  ? 'bg-orange-500 text-black font-semibold shadow-[0_0_12px_rgba(249,115,22,0.4)]'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Negotiation Card</span>
            </button>
            <button
              onClick={() => setActiveSubTab('radar')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeSubTab === 'radar'
                  ? 'bg-orange-500 text-black font-semibold shadow-[0_0_12px_rgba(249,115,22,0.4)]'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Rates Radar
            </button>
            <button
              onClick={() => setActiveSubTab('sandbox')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeSubTab === 'sandbox'
                  ? 'bg-orange-500 text-black font-semibold shadow-[0_0_12px_rgba(249,115,22,0.4)]'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Rule Sandbox
            </button>
            <button
              onClick={() => setActiveSubTab('cases')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeSubTab === 'cases'
                  ? 'bg-orange-500 text-black font-semibold shadow-[0_0_12px_rgba(249,115,22,0.4)]'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              3 Borrowers
            </button>
          </div>

          {/* Right Status & Profile Pill */}
          <div className="flex items-center gap-3">
            {/* Live Benchmark Pill */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-neutral-400">Repo Rate:</span>
              <span className="text-white font-bold">6.50%</span>
            </div>

            {/* Profile Avatar Trigger */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="flex items-center gap-2.5 p-1.5 pl-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all cursor-pointer group"
              title="Click to view/edit profile & settings"
            >
              <div className="text-right hidden sm:block">
                <div className="text-xs font-medium text-white group-hover:text-orange-300 transition-colors">
                  {activeProfile.name}
                </div>
                <div className="text-[10px] text-neutral-400 font-mono">Verified Session</div>
              </div>
              <div className="relative w-9 h-9 rounded-xl overflow-hidden border border-orange-500/50 shadow-md">
                {activeProfile.avatarUrl ? (
                  <img src={activeProfile.avatarUrl} alt={activeProfile.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-orange-950 text-orange-300 flex items-center justify-center font-bold text-sm">
                    {activeProfile.name.charAt(0)}
                  </div>
                )}
              </div>
            </button>
          </div>
        </header>

        {/* =================================================================== */}
        {/* SUBTAB VIEWS                                                        */}
        {/* =================================================================== */}
        
        {/* VIEW 1: OVERVIEW WITH DUAL DESIGNS INTEGRATED (DESIGN 1 + DESIGN 2) */}
        {activeSubTab === 'overview' && (
          <div className="p-6 sm:p-8 space-y-10 max-w-7xl mx-auto w-full animate-fadeIn">
            
            {/* ------------------------------------------------------------- */}
            {/* DESIGN 1: FITNESS-INSPIRED TELEMETRY GRID WITH BRIGHT SLIDESHOW*/}
            {/* ------------------------------------------------------------- */}
            <section className="space-y-6">
              <OverviewFitnessInspiredGrid
                activeProfile={activeProfile}
                result={result}
                onNavigateToCard={() => setActiveSubTab('card')}
                onNavigateToEngine={() => setActiveSubTab('engine')}
                onOpenSettings={() => setIsSettingsOpen(true)}
              />
            </section>

            {/* ------------------------------------------------------------- */}
            {/* DESIGN 2: DEEP UNDERWRITING ARCHITECTURE & FOIR DIAGNOSTICS   */}
            {/* ------------------------------------------------------------- */}
            <section className="space-y-8 pt-10 border-t border-white/10">
              
              {/* Section 2 Header */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500/30 via-orange-500/20 to-transparent border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                    <LayoutGrid className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-[10px] font-mono font-bold text-amber-300 uppercase tracking-wider">
                        Architecture Specification
                      </span>
                      <span className="text-[10px] font-mono text-neutral-400">
                        100% Client-Side Ephemeral
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-3xl font-display font-bold text-white tracking-tight">
                      Deep Underwriting Architecture & FOIR Diagnostics
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-400 font-light mt-0.5">
                      True household cashflow capacity vs lender aggressive gross income ceilings.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-400/40 text-xs font-mono font-bold text-amber-300 uppercase shadow-sm">
                    Design 2 · Bento Terminal
                  </span>
                </div>
              </div>

              {/* Bento Grid Row 1: AI Underwriting Advisory Terminal + Calibrated FOIR Speedometer Gauge */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                
                {/* Card 1: AI Underwriting Advisory Terminal */}
                <div className="lg:col-span-7 rounded-[2.5rem] border border-amber-500/30 bg-gradient-to-br from-[#1C0D16] via-[#100A1A] to-[#08121B] p-7 sm:p-9 relative overflow-hidden shadow-[0_15px_50px_rgba(245,158,11,0.12)] flex flex-col justify-between group">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />
                  
                  <div className="relative z-10 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/80 border border-amber-500/40 text-xs font-mono text-amber-300 shadow-sm">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>AI Underwriting Advisory</span>
                      </div>
                      
                      {/* Live Radar Pulse Verdict Indicator */}
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                            result.verdict.status === 'BORROW' ? 'bg-emerald-400' :
                            result.verdict.status === 'BORROW_LESS' ? 'bg-amber-400' : 'bg-rose-400'
                          }`} />
                          <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                            result.verdict.status === 'BORROW' ? 'bg-emerald-500' :
                            result.verdict.status === 'BORROW_LESS' ? 'bg-amber-500' : 'bg-rose-500'
                          }`} />
                        </span>
                        <span className="text-[11px] font-mono text-neutral-300 uppercase tracking-wider font-semibold">
                          {result.verdict.status === 'BORROW' && "Routing Verdict: BORROW (Optimal)"}
                          {result.verdict.status === 'BORROW_LESS' && "Routing Verdict: BORROW LESS (Capped)"}
                          {result.verdict.status === 'DONT_BORROW' && "Routing Verdict: DONT BORROW (Halt)"}
                        </span>
                      </div>
                    </div>

                    <h2 
                      className="text-2xl sm:text-3xl lg:text-4xl text-white font-normal tracking-tight leading-tight drop-shadow-sm"
                      style={{ fontFamily: "'Instrument Serif', serif" }}
                    >
                      {result.verdict.status === 'BORROW' && "Borrow with Counter-Leverage: Route via Optimal Collateral"}
                      {result.verdict.status === 'BORROW_LESS' && "Borrow Less: Cap at Safe Discretionary Ceiling"}
                      {result.verdict.status === 'DONT_BORROW' && "Defense Alert: Do Not Borrow Under Current Conditions"}
                    </h2>

                    <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed max-w-2xl">
                      {result.verdict.oneLineReason}
                    </p>
                  </div>

                  {/* Bottom Telemetry Strip */}
                  <div className="relative z-10 mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-mono">
                      <div>
                        <span className="text-neutral-400 block text-[10px] uppercase">Bank Sanction Cap</span>
                        <span className="text-rose-400 font-bold text-sm">₹{(result.amount.lenderSanctionMax / 100000).toFixed(1)}L</span>
                      </div>
                      <div className="h-7 w-px bg-white/10" />
                      <div>
                        <span className="text-neutral-400 block text-[10px] uppercase">Borrower Safe Ceiling</span>
                        <span className="text-emerald-400 font-bold text-sm">₹{(result.amount.borrowerSafeCarryMax / 100000).toFixed(1)}L</span>
                      </div>
                      <div className="h-7 w-px bg-white/10" />
                      <div>
                        <span className="text-neutral-400 block text-[10px] uppercase">Fair Rate Band</span>
                        <span className="text-amber-300 font-bold text-sm">{result.rate.fairRateMin}% - {result.rate.fairRateMax}%</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => setActiveSubTab('card')}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-semibold text-xs transition-all shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:scale-105 cursor-pointer group/btn"
                    >
                      <span>Branch Negotiation Card</span>
                      <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Card 2: Debt Capacity Utilization & Calibrated Arc Gauge */}
                <div className="lg:col-span-5 rounded-[2.5rem] border border-white/10 bg-[#120D1A]/95 p-7 sm:p-9 flex flex-col justify-between shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-display font-bold text-white text-base">Debt Capacity Utilization</h3>
                      <span className="text-xs font-mono px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-300 font-bold">
                        {safeFoirPercent}% FOIR
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 font-light">
                      Computed strictly on net take-home cashflow after inviolable living reserves.
                    </p>
                  </div>

                  {/* Calibrated Speedometer / Arc Gauge */}
                  <div className="my-6 flex flex-col items-center justify-center relative">
                    <div className="relative w-56 h-32 overflow-hidden flex items-end justify-center">
                      <div className="w-56 h-56 rounded-full border-[16px] border-neutral-800/80 absolute top-0" />
                      <div 
                        className="w-56 h-56 rounded-full border-[16px] border-amber-500 absolute top-0 transition-all duration-700 shadow-[0_0_25px_rgba(245,158,11,0.5)]"
                        style={{
                          clipPath: 'polygon(0 50%, 100% 50%, 100% 0, 0 0)',
                          transform: `rotate(${Math.min(180, (safeFoirPercent / 100) * 180)}deg)`
                        }}
                      />
                    </div>
                    
                    <div className="text-center mt-3 space-y-0.5">
                      <div className="font-mono text-3xl sm:text-4xl font-bold text-white tracking-tight">
                        ₹{safeEmiCap.toLocaleString('en-IN')}
                      </div>
                      <div className="text-xs text-amber-300/90 font-mono font-medium">Max Safe Monthly EMI Headroom</div>
                    </div>
                  </div>

                  {/* Metric Sub-bar */}
                  <div className="grid grid-cols-2 gap-3 pt-5 border-t border-white/5 text-xs text-neutral-300 font-mono">
                    <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5">
                      <span className="text-neutral-400 block text-[10px]">Bank Gross FOIR:</span>
                      <strong className="text-rose-400 font-bold text-sm">{bankFoirPercent}%</strong>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-right">
                      <span className="text-neutral-400 block text-[10px]">Safe Household FOIR:</span>
                      <strong className="text-emerald-400 font-bold text-sm">{safeFoirPercent}%</strong>
                    </div>
                  </div>
                </div>

              </div>

              {/* Bento Grid Row 2: Monthly Inflow Allocation Equalizer + Borrower Profile Executive Dossier (IMAGE CARD) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                
                {/* Card 3: Monthly Inflow Allocation Equalizer */}
                <div className="lg:col-span-7 rounded-[2.5rem] border border-white/10 bg-[#120D1A]/95 p-7 sm:p-9 flex flex-col justify-between shadow-2xl">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
                          <Activity className="w-4 h-4" />
                        </div>
                        <h3 className="font-display font-bold text-white text-base">Monthly Inflow Allocation</h3>
                      </div>
                      <span className="text-xs font-mono text-amber-300 font-bold px-3 py-1 rounded-full bg-amber-950/70 border border-amber-500/30">
                        ₹{netIncome.toLocaleString('en-IN')} Total Inflow
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 font-light mb-6">
                      Live cash allocation showing essential survival floor and maximum protected discretionary capacity.
                    </p>
                  </div>

                  {/* Vertical Glowing Equalizer Columns */}
                  <div className="grid grid-cols-4 gap-3 sm:gap-5 items-end h-48 py-2">
                    <div className="flex flex-col items-center gap-2 h-full justify-end">
                      <span className="text-xs font-mono text-neutral-300 font-semibold">₹{(livingExp / 1000).toFixed(0)}k</span>
                      <div 
                        className="w-full rounded-2xl bg-gradient-to-t from-neutral-800 to-neutral-600 transition-all duration-500"
                        style={{ height: `${Math.min(100, Math.max(15, (livingExp / netIncome) * 100))}%` }}
                      />
                      <span className="text-[11px] font-medium text-neutral-400 text-center truncate w-full">Living</span>
                    </div>

                    <div className="flex flex-col items-center gap-2 h-full justify-end">
                      <span className="text-xs font-mono text-rose-300 font-semibold">₹{(currentEmis / 1000).toFixed(0)}k</span>
                      <div 
                        className="w-full rounded-2xl bg-gradient-to-t from-rose-950 to-rose-600 transition-all duration-500 shadow-[0_0_15px_rgba(244,63,94,0.3)]"
                        style={{ height: `${Math.min(100, Math.max(10, (currentEmis / netIncome) * 100))}%` }}
                      />
                      <span className="text-[11px] font-medium text-rose-300 text-center truncate w-full">Old EMIs</span>
                    </div>

                    <div className="flex flex-col items-center gap-2 h-full justify-end">
                      <span className="text-xs font-mono text-amber-300 font-semibold">₹{(safeBuffer / 1000).toFixed(0)}k</span>
                      <div 
                        className="w-full rounded-2xl bg-gradient-to-t from-amber-950 to-amber-600 transition-all duration-500 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
                        style={{ height: `${Math.min(100, Math.max(15, (safeBuffer / netIncome) * 100))}%` }}
                      />
                      <span className="text-[11px] font-medium text-amber-300 text-center truncate w-full">20% Buffer</span>
                    </div>

                    <div className="flex flex-col items-center gap-2 h-full justify-end">
                      <span className="text-xs font-mono text-cyan-300 font-bold">₹{(safeEmiCap / 1000).toFixed(0)}k</span>
                      <div 
                        className="w-full rounded-2xl bg-gradient-to-t from-cyan-700 via-cyan-500 to-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all duration-500"
                        style={{ height: `${Math.min(100, Math.max(15, (safeEmiCap / netIncome) * 100))}%` }}
                      />
                      <span className="text-[11px] font-bold text-cyan-300 text-center truncate w-full">Safe EMI</span>
                    </div>
                  </div>

                  {/* Bottom Summary Strip */}
                  <div className="pt-5 border-t border-white/5 flex items-center justify-between text-xs text-neutral-400">
                    <span>Inviolable living reserve: <strong className="text-white">₹{safeBuffer.toLocaleString('en-IN')}/mo</strong></span>
                    <button 
                      onClick={() => setIsSettingsOpen(true)}
                      className="text-amber-400 hover:text-amber-300 hover:underline flex items-center gap-1 cursor-pointer font-medium"
                    >
                      <span>Adjust Inflow & Overhead →</span>
                    </button>
                  </div>
                </div>

                {/* Card 4: EXECUTIVE BORROWER UNDERWRITING DOSSIER (IMAGE CARD) */}
                <div className="lg:col-span-5 rounded-[2.5rem] border border-amber-500/40 bg-gradient-to-br from-[#1C0D18] via-[#110D1B] to-[#091522] p-7 sm:p-9 relative overflow-hidden shadow-2xl flex flex-col justify-between group">
                  <div className="absolute -top-12 -right-12 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
                  
                  {/* Top Image + Monogram Header */}
                  <div className="relative z-10 flex items-start gap-4 sm:gap-5">
                    
                    {/* Real High-Resolution Borrower Portrait */}
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden border-2 border-amber-400/80 shadow-[0_0_30px_rgba(245,158,11,0.35)] shrink-0 group-hover:scale-105 transition-transform duration-500">
                      {activeProfile.avatarUrl ? (
                        <img 
                          src={activeProfile.avatarUrl} 
                          alt={activeProfile.name} 
                          className="w-full h-full object-cover brightness-105 contrast-105" 
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-amber-600 to-orange-700 text-white flex items-center justify-center font-bold text-3xl">
                          {activeProfile.name.charAt(0)}
                        </div>
                      )}
                      
                      {/* Active Status Beacon */}
                      <div className="absolute bottom-1.5 right-1.5 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-black shadow-lg animate-pulse" title="Session Active" />
                    </div>

                    <div className="space-y-1.5 min-w-0">
                      <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-950/90 border border-amber-500/40 text-[10px] font-mono text-amber-300 font-bold uppercase tracking-wider shadow-sm">
                        <ShieldCheck className="w-3 h-3 text-amber-400" />
                        <span>Verified Dossier</span>
                      </div>
                      <h4 className="text-2xl sm:text-3xl font-bold text-white font-display leading-tight truncate">
                        {activeProfile.name}
                      </h4>
                      <p className="text-xs text-neutral-300 font-light truncate">{activeProfile.occupation}</p>
                      <p className="text-[11px] text-amber-300/80 font-mono">{activeProfile.city} · Age {activeProfile.age}</p>
                    </div>
                  </div>

                  {/* Telemetry Grid */}
                  <div className="relative z-10 my-5 py-4 border-y border-white/10 grid grid-cols-2 gap-3 text-xs font-mono">
                    <div className="p-2.5 rounded-2xl bg-white/[0.03] border border-white/5">
                      <span className="text-neutral-400 block text-[10px] uppercase">Net Take-Home</span>
                      <span className="text-white font-bold text-sm">₹{activeProfile.netMonthlyIncome.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="p-2.5 rounded-2xl bg-white/[0.03] border border-white/5">
                      <span className="text-neutral-400 block text-[10px] uppercase">Discretionary Cap</span>
                      <span className="text-amber-300 font-bold text-sm">₹{(result.amount.borrowerSafeCarryMax / 100000).toFixed(1)}L</span>
                    </div>
                    <div className="p-2.5 rounded-2xl bg-white/[0.03] border border-white/5">
                      <span className="text-neutral-400 block text-[10px] uppercase">Bureau Tier</span>
                      <span className="text-emerald-400 font-bold text-xs">{activeProfile.creditScoreBand.replace('_', ' ')}</span>
                    </div>
                    <div className="p-2.5 rounded-2xl bg-white/[0.03] border border-white/5">
                      <span className="text-neutral-400 block text-[10px] uppercase">Target Loan</span>
                      <span className="text-cyan-300 font-bold text-xs capitalize truncate block">{activeProfile.loanPurpose.replace('_', ' ').toLowerCase()}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="relative z-10 flex items-center gap-3">
                    <button
                      onClick={() => setIsSettingsOpen(true)}
                      className="flex-1 py-3 px-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:scale-[1.02]"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Edit Inflow</span>
                    </button>
                    <button
                      onClick={() => setActiveSubTab('card')}
                      className="py-3 px-5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold text-xs transition-all shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:scale-105 cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Negotiation Card</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>

              {/* Bento Grid Row 3: Interactive Loan Principal Simulation Slider */}
              <div className="rounded-[2.5rem] border border-amber-500/30 bg-gradient-to-r from-[#1E0D1B] via-[#120D1A] to-[#0A1420] p-7 sm:p-9 shadow-2xl space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-display font-bold text-white flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-400" />
                      <span>Dynamic Requested Principal Tester</span>
                    </h3>
                    <p className="text-xs text-neutral-400 font-light mt-0.5">
                      Test how varying sanction amounts impact your household cashflow cushion and trigger over-borrowing alerts.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs text-neutral-400 font-mono">Current Simulation:</span>
                    <span className="px-5 py-2 rounded-2xl bg-amber-950/80 border border-amber-500/50 text-amber-300 font-mono text-xl font-bold shadow-md">
                      ₹{(requestedAmountSlider / 100000).toFixed(1)} Lakhs
                    </span>
                  </div>
                </div>

                <div className="space-y-2 py-2">
                  <input
                    type="range"
                    min="50000"
                    max="3500000"
                    step="25000"
                    value={requestedAmountSlider}
                    onChange={(e) => setRequestedAmountSlider(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer h-2.5 bg-neutral-800 rounded-lg"
                  />
                  <div className="flex justify-between text-[11px] text-neutral-400 font-mono">
                    <span>₹50,000 (Micro)</span>
                    <span>₹10.0 Lakhs</span>
                    <span>₹20.0 Lakhs</span>
                    <span>₹35.0 Lakhs (Max)</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2">
                    <Info className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-neutral-300">
                      Safe Discretionary Borrowing Cap for your income: <strong className="text-amber-300 font-bold">₹{(result.amount.borrowerSafeCarryMax / 100000).toFixed(1)} Lakhs</strong>
                    </span>
                  </div>

                  {requestedAmountSlider > result.amount.borrowerSafeCarryMax ? (
                    <span className="px-3.5 py-1 rounded-full bg-rose-950/80 border border-rose-500/40 text-rose-300 font-mono text-[11px] font-bold shadow-sm">
                      Warning: Exceeds safe carry by ₹{((requestedAmountSlider - result.amount.borrowerSafeCarryMax) / 100000).toFixed(1)}L
                    </span>
                  ) : (
                    <span className="px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono text-[11px] font-bold shadow-sm">
                      ✓ Within safe discretionary capacity
                    </span>
                  )}
                </div>
              </div>

              {/* ------------------------------------------------------------- */}
              {/* UNDER THAT: THREE BORROWER INTERVENTION IMAGE CARDS           */}
              {/* ------------------------------------------------------------- */}
              <div className="pt-6 space-y-6">
                
                {/* Header for the 3 Image Cards */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-[10px] font-mono font-bold text-cyan-300 uppercase tracking-wider">
                        Case Interventions · Live Simulations
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
                      Three Borrowers · Three Distinct Underwriting Interventions
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-400 font-light mt-0.5">
                      Select any borrower card to immediately run their balance sheet, debt telemetry, and negotiation script in this dashboard.
                    </p>
                  </div>
                </div>

                {/* Grid of 3 Impressive Borrower Image Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {PRESET_PROFILES.map((preset) => {
                    const p = preset.profile;
                    const isCurrent = activeProfile.name === p.name;
                    
                    // Case-specific styling
                    const isPriya = preset.id === 'priya';
                    const isRavi = preset.id === 'ravi';
                    const isAnita = preset.id === 'anita';

                    const borderGradient = isPriya 
                      ? 'border-indigo-500/40 hover:border-indigo-400/80 shadow-[0_0_30px_rgba(99,102,241,0.15)]'
                      : isRavi
                      ? 'border-amber-500/40 hover:border-amber-400/80 shadow-[0_0_30px_rgba(245,158,11,0.15)]'
                      : 'border-rose-500/40 hover:border-rose-400/80 shadow-[0_0_30px_rgba(244,63,94,0.15)]';

                    const cardBg = isPriya
                      ? 'bg-gradient-to-br from-[#0B1228] via-[#100A1F] to-[#1E0822]'
                      : isRavi
                      ? 'bg-gradient-to-br from-[#241204] via-[#120D1A] to-[#041D14]'
                      : 'bg-gradient-to-br from-[#270716] via-[#120A1E] to-[#081826]';

                    const tagText = isPriya
                      ? 'SALARIED FOIR CAP'
                      : isRavi
                      ? 'SECURED LAP DEFENSE'
                      : 'APP DEBT RESCUE';

                    const tagBadge = isPriya
                      ? 'bg-indigo-950/80 text-indigo-300 border-indigo-500/40'
                      : isRavi
                      ? 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                      : 'bg-rose-950/80 text-rose-300 border-rose-500/40';

                    const dilemmaText = isPriya
                      ? 'Bank sanctions ₹20.3L gross FOIR; Copilot caps safe carry at ₹4.95L to preserve rent & family reserves.'
                      : isRavi
                      ? 'Bank diverts to 19% unsecured business loan; Copilot locks in 9.25% secured LAP with shop, saving ₹8.4L.'
                      : 'Carries 30%+ instant app loans with 1 bounce; Copilot halts compounding trap & routes to Mudra Shishu EV scheme.';

                    return (
                      <div
                        key={preset.id}
                        className={`rounded-[2.5rem] border-2 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group ${borderGradient} ${cardBg} ${
                          isCurrent ? 'ring-2 ring-white/60 scale-[1.02]' : ''
                        }`}
                      >
                        {/* Ambient glow in background */}
                        <div className="absolute -top-12 -right-12 w-44 h-44 bg-white/5 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

                        <div className="relative z-10 space-y-4">
                          
                          {/* Top Row: Borrower Real Image + Badges */}
                          <div className="flex items-start gap-4">
                            <div className={`relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl overflow-hidden border-2 shrink-0 group-hover:scale-105 transition-transform shadow-md ${
                              isPriya ? 'border-indigo-400' : isRavi ? 'border-amber-400' : 'border-rose-400'
                            }`}>
                              {p.avatarUrl ? (
                                <img 
                                  src={p.avatarUrl} 
                                  alt={p.name} 
                                  className="w-full h-full object-cover brightness-105 contrast-105" 
                                />
                              ) : (
                                <div className="w-full h-full bg-neutral-800 flex items-center justify-center font-bold text-lg text-white">
                                  {p.name.charAt(0)}
                                </div>
                              )}
                            </div>

                            <div className="space-y-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className={`px-2.5 py-0.5 rounded-full border text-[9px] font-mono font-bold tracking-wider uppercase ${tagBadge}`}>
                                  {tagText}
                                </span>
                                {isCurrent && (
                                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 text-[9px] font-mono font-bold animate-pulse">
                                    ACTIVE
                                  </span>
                                )}
                              </div>
                              <h4 className="text-xl sm:text-2xl font-display font-bold text-white truncate">
                                {p.name}
                              </h4>
                              <p className="text-[11px] text-neutral-300 font-light truncate">
                                {p.occupation}
                              </p>
                              <p className="text-[10px] text-neutral-400 font-mono">
                                {p.city} · Age {p.age}
                              </p>
                            </div>
                          </div>

                          {/* Financial Telemetry Pills */}
                          <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 space-y-2 text-xs font-mono">
                            <div className="flex justify-between">
                              <span className="text-neutral-400">Monthly Inflow:</span>
                              <span className="font-bold text-white">₹{p.netMonthlyIncome.toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-neutral-400">Bureau Band:</span>
                              <span className="font-bold text-neutral-200">{p.creditScoreBand.replace('_', ' ')}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-neutral-400">Requested Loan:</span>
                              <span className={`font-bold ${isPriya ? 'text-indigo-300' : isRavi ? 'text-amber-300' : 'text-rose-300'}`}>
                                ₹{(p.requestedAmount / 100000).toFixed(1)} Lakhs
                              </span>
                            </div>
                          </div>

                          {/* Dilemma Rationale Callout */}
                          <p className="text-xs text-neutral-300 font-light leading-relaxed min-h-[50px]">
                            {dilemmaText}
                          </p>
                        </div>

                        {/* Interactive Simulation Switch Button */}
                        <div className="relative z-10 pt-4 border-t border-white/10 mt-4">
                          <button
                            onClick={() => onChangeProfile(p)}
                            className={`w-full py-3 px-4 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:scale-105 active:scale-95 ${
                              isCurrent
                                ? 'bg-white text-black'
                                : isPriya
                                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-400 hover:to-purple-400 text-white shadow-[0_0_20px_rgba(99,102,241,0.3)]'
                                : isRavi
                                ? 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                                : 'bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-400 hover:to-orange-400 text-white shadow-[0_0_20px_rgba(244,63,94,0.3)]'
                            }`}
                          >
                            <span>{isCurrent ? `Currently Simulating ${p.name}` : `Simulate ${p.name}'s Case`}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>

                      </div>
                    );
                  })}

                </div>

              </div>

            </section>

          </div>
        )}

        {/* VIEW 2: COPILOT ENGINE (QuestionFlow + Outputs) */}
        {activeSubTab === 'engine' && (
          <div className="p-6 sm:p-8 max-w-7xl mx-auto w-full animate-fadeIn space-y-6">
            
            {/* Top Command Bar for Copilot Engine */}
            <div className="p-6 sm:p-7 rounded-[2.5rem] bg-gradient-to-r from-[#1E0D1B] via-[#100D1A] to-[#0A1624] border border-amber-500/30 shadow-2xl backdrop-blur-xl relative overflow-hidden flex flex-wrap items-center justify-between gap-4">
              <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-[10px] font-mono font-bold text-amber-300 uppercase tracking-wider">
                    Institutional Copilot Engine · Core v2.4
                  </span>
                  <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-mono font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    REAL-TIME UNDERWRITING ACTIVE
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                  Adaptive Intake & Algorithmic Underwriting
                </h2>
                <p className="text-xs sm:text-sm text-neutral-400 font-light">
                  Adjust household financial variables on the left. The 4 institutional outputs on the right compute instantly in-browser.
                </p>
              </div>

              {/* Quick Preset Selector */}
              <div className="relative z-10 flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-neutral-400 mr-1 hidden sm:inline">1-Click Test Scenarios:</span>
                {PRESET_PROFILES.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => onChangeProfile(preset.profile)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-mono transition-all cursor-pointer flex items-center gap-2 ${
                      activeProfile.name === preset.profile.name
                        ? 'bg-amber-500 text-black font-bold border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                        : 'bg-white/5 border-white/10 text-neutral-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span>{preset.profile.name.split(' ')[0]}</span>
                    <span className="text-[10px] opacity-75">
                      {preset.id === 'priya' ? '₹8L Wedding' : preset.id === 'ravi' ? '₹15L LAP' : '₹1.5L EV'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-5">
                <QuestionFlow
                  profile={activeProfile}
                  onChangeProfile={onChangeProfile}
                  confidenceScore={result.confidenceScore}
                  confidenceReasons={result.rate.confidenceWidenedReasons}
                />
              </div>
              <div className="lg:col-span-7">
                <OutputsDashboard
                  result={result}
                  onOpenNegotiationCard={() => setActiveSubTab('card')}
                />
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: NEGOTIATION CARD (INSIDE NEW LUXURY DASHBOARD) */}
        {activeSubTab === 'card' && (
          <div className="p-6 sm:p-8 max-w-5xl mx-auto w-full animate-fadeIn">
            <NegotiationCard
              result={result}
              onBack={() => setActiveSubTab('overview')}
            />
          </div>
        )}

        {/* VIEW 4: RATES RADAR (INSIDE NEW LUXURY DASHBOARD) */}
        {activeSubTab === 'radar' && (
          <div className="p-6 sm:p-8 max-w-5xl mx-auto w-full animate-fadeIn">
            <MarketRadar />
          </div>
        )}

        {/* VIEW 5: RULE SANDBOX (INSIDE NEW LUXURY DASHBOARD) */}
        {activeSubTab === 'sandbox' && (
          <div className="p-6 sm:p-8 max-w-5xl mx-auto w-full animate-fadeIn">
            <RuleSandbox activeProfile={activeProfile} />
          </div>
        )}

        {/* VIEW 6: 3 BORROWERS DOSSIER (INSIDE NEW LUXURY DASHBOARD) */}
        {activeSubTab === 'cases' && (
          <div className="p-6 sm:p-8 max-w-5xl mx-auto w-full animate-fadeIn">
            <PersonaDossier
              onSelectAndLaunch={(p) => {
                onChangeProfile(p);
                setActiveSubTab('overview');
              }}
            />
          </div>
        )}

      </div>

      {/* Profile Settings Modal */}
      <ProfileSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        profile={activeProfile}
        onSaveProfile={onChangeProfile}
        onResetProfile={handleResetToPreset}
      />
    </div>
  );
};

export default DashboardLayout;
