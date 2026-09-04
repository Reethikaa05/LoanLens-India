import React, { useState } from 'react';
import { 
  Home, 
  Compass, 
  Shield, 
  TrendingUp, 
  Sliders, 
  User, 
  LogOut, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowUpRight, 
  Info, 
  Settings, 
  Layers, 
  Zap, 
  RotateCcw,
  Clock,
  DollarSign,
  PieChart,
  Activity,
  Award,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { BorrowerProfile, CopilotResult } from '../engine/types';
import { evaluateCopilot } from '../engine/calculator';
import { PRESET_PROFILES } from '../engine/scenarios';
import { QuestionFlow } from './QuestionFlow';
import { OutputsDashboard } from './OutputsDashboard';
import { ProfileSettingsModal } from './ProfileSettingsModal';

interface DashboardLayoutProps {
  activeProfile: BorrowerProfile;
  onChangeProfile: (profile: BorrowerProfile) => void;
  onOpenCard: () => void;
  onNavigateTab?: (tab: string) => void;
  onLogout?: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  activeProfile,
  onChangeProfile,
  onOpenCard,
  onNavigateTab,
  onLogout
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'engine' | 'card'>('overview');
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

  return (
    <div className="min-h-screen bg-[#0E0B12] text-[#EEE6EA] flex flex-col md:flex-row antialiased">
      
      {/* ===================================================================== */}
      {/* 1. LEFT SLIM ICON SIDEBAR (MATCHING REFERENCE SCREENSHOT)              */}
      {/* ===================================================================== */}
      <aside className="w-full md:w-20 bg-[#140F18]/90 border-r border-white/5 flex md:flex-col items-center justify-between p-3 sm:p-4 z-40 shrink-0 backdrop-blur-xl">
        
        {/* Top Monogram Logo */}
        <div className="flex md:flex-col items-center gap-3">
          <button 
            onClick={() => setActiveSubTab('overview')}
            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600 flex items-center justify-center text-white font-display font-bold text-lg shadow-[0_0_25px_rgba(249,115,22,0.4)] cursor-pointer hover:scale-105 transition-all"
            title="Borrower Copilot"
          >
            Bc
          </button>

          {/* Navigation Icon Rail */}
          <nav className="flex md:flex-col items-center gap-2 mt-0 md:mt-6">
            {/* Overview / Home */}
            <button
              onClick={() => setActiveSubTab('overview')}
              className={`p-3 rounded-2xl transition-all cursor-pointer relative group ${
                activeSubTab === 'overview'
                  ? 'bg-orange-500/20 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.25)] border border-orange-500/30'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
              title="Dashboard Overview"
            >
              <Home className="w-5 h-5" />
              <span className="sr-only">Dashboard</span>
            </button>

            {/* Copilot Engine */}
            <button
              onClick={() => setActiveSubTab('engine')}
              className={`p-3 rounded-2xl transition-all cursor-pointer relative group ${
                activeSubTab === 'engine'
                  ? 'bg-orange-500/20 text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.25)] border border-orange-500/30'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
              title="Adaptive Counter-Underwriting Engine"
            >
              <Compass className="w-5 h-5" />
              <span className="sr-only">Engine</span>
            </button>

            {/* Negotiation Card */}
            <button
              onClick={onOpenCard}
              className="p-3 rounded-2xl text-neutral-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
              title="Negotiation Card (Download & Branch Script)"
            >
              <Shield className="w-5 h-5" />
              <span className="sr-only">Negotiation Card</span>
            </button>

            {/* Rates Radar */}
            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('radar')}
                className="p-3 rounded-2xl text-neutral-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                title="Repo Radar & Spreads"
              >
                <TrendingUp className="w-5 h-5" />
                <span className="sr-only">Radar</span>
              </button>
            )}

            {/* Rule Sandbox */}
            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('sandbox')}
                className="p-3 rounded-2xl text-neutral-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                title="Rule Sandbox"
              >
                <Sliders className="w-5 h-5" />
                <span className="sr-only">Sandbox</span>
              </button>
            )}
          </nav>
        </div>

        {/* Bottom Actions: Settings & Logout */}
        <div className="flex md:flex-col items-center gap-2">
          {/* Settings Modal Trigger */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-3 rounded-2xl text-neutral-400 hover:text-orange-400 hover:bg-orange-500/10 transition-all cursor-pointer"
            title="Profile & Underwriting Settings"
          >
            <Settings className="w-5 h-5" />
            <span className="sr-only">Settings</span>
          </button>

          {/* Logout */}
          {onLogout && (
            <button
              onClick={onLogout}
              className="p-3 rounded-2xl text-neutral-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
              <span className="sr-only">Sign Out</span>
            </button>
          )}
        </div>
      </aside>

      {/* ===================================================================== */}
      {/* 2. MAIN DASHBOARD CONTENT AREA                                        */}
      {/* ===================================================================== */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Bar: Personalized Greeting + Pill Tabs + Avatar Profile */}
        <header className="px-6 py-5 border-b border-white/5 bg-[#140F18]/50 backdrop-blur-md flex flex-wrap items-center justify-between gap-4 sticky top-0 z-30">
          
          {/* Greeting (Matching Reference Screenshot) */}
          <div className="space-y-1">
            <h1 
              className="text-2xl sm:text-3xl text-white font-normal tracking-tight"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Hi {activeProfile.name}, Great to see you again!
            </h1>
            <p className="text-xs text-neutral-400 font-light flex items-center gap-2">
              <span>{activeProfile.occupation}</span>
              <span>·</span>
              <span>{activeProfile.city}</span>
              <span>·</span>
              <span className="px-2 py-0.5 rounded-full bg-orange-950/70 border border-orange-500/30 text-orange-300 font-mono text-[10px]">
                {activeProfile.creditScoreBand.replace('_', ' ')}
              </span>
            </p>
          </div>

          {/* Center Pill Switchers */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-neutral-900/90 border border-white/5 text-xs font-medium">
            <button
              onClick={() => setActiveSubTab('overview')}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeSubTab === 'overview'
                  ? 'bg-orange-500 text-black font-semibold shadow-[0_0_12px_rgba(249,115,22,0.4)]'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveSubTab('engine')}
              className={`px-3.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                activeSubTab === 'engine'
                  ? 'bg-orange-500 text-black font-semibold shadow-[0_0_12px_rgba(249,115,22,0.4)]'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Adaptive Engine
            </button>
            <button
              onClick={onOpenCard}
              className="px-3.5 py-1.5 rounded-xl text-neutral-400 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Negotiation Card</span>
            </button>
          </div>

          {/* Right Status & Profile Pill */}
          <div className="flex items-center gap-3">
            {/* Live Benchmark Pill */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-neutral-400">Repo Rate:</span>
              <span className="text-white font-bold">6.50%</span>
            </div>

            {/* Profile Avatar Trigger */}
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="flex items-center gap-2.5 p-1.5 pl-3 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all cursor-pointer group"
              title="Click to view/edit profile"
            >
              <div className="text-right hidden sm:block">
                <div className="text-xs font-medium text-white group-hover:text-orange-300 transition-colors">
                  {activeProfile.name}
                </div>
                <div className="text-[10px] text-neutral-400">Borrower Account</div>
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
        {/* SUBTAB CONTENT                                                      */}
        {/* =================================================================== */}
        
        {/* 1. OVERVIEW: Warm Amber Bento Grid (Matching Screenshot) */}
        {activeSubTab === 'overview' && (
          <div className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto w-full">
            
            {/* Bento Grid Row 1: AI Copilot Advisory + Live Underwriting Rates */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Card 1: AI Copilot Advisory (Matching Ambient Card in Screenshot) */}
              <div className="lg:col-span-7 rounded-[2rem] border border-orange-500/30 bg-gradient-to-br from-[#25110E] via-[#170E1A] to-[#0D1217] p-6 sm:p-8 relative overflow-hidden shadow-[0_10px_40px_rgba(249,115,22,0.12)] flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-950/80 border border-orange-500/40 text-xs font-mono text-orange-300">
                      <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                      <span>AI Underwriting Advisory</span>
                    </div>
                    <span className="text-[11px] font-mono text-neutral-400">100% In-Browser Memory</span>
                  </div>

                  <h2 
                    className="text-2xl sm:text-3xl text-white font-normal tracking-tight"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    {result.verdict.status === 'BORROW' && "Borrow with Counter-Leverage: Route via Optimal Collateral"}
                    {result.verdict.status === 'BORROW_LESS' && "Borrow Less: Cap at Safe Discretionary Ceiling"}
                    {result.verdict.status === 'DONT_BORROW' && "Defense Alert: Do Not Borrow Under Current Conditions"}
                  </h2>

                  <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                    {result.verdict.oneLineReason}
                  </p>
                </div>

                {/* Bottom Stats Banner inside Card */}
                <div className="relative z-10 pt-6 mt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-neutral-400 text-[10px] block">Lender Sanction</span>
                    <span className="text-rose-300 font-bold text-base">₹{(result.amount.lenderSanctionMax / 100000).toFixed(1)} Lakhs</span>
                    <span className="text-[9px] text-neutral-500 block">60% FOIR Aggressive</span>
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-orange-500/30">
                    <span className="text-orange-300 text-[10px] block font-bold">★ Safe Carry Limit</span>
                    <span className="text-orange-300 font-bold text-base">₹{(result.amount.borrowerSafeCarryMax / 100000).toFixed(1)} Lakhs</span>
                    <span className="text-[9px] text-neutral-400 block">Expenses Protected</span>
                  </div>
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-neutral-400 text-[10px] block">Fair Interest Band</span>
                    <span className="text-white font-bold text-base">{result.rate.fairRateMin}% – {result.rate.fairRateMax}%</span>
                    <span className="text-[9px] text-emerald-400 block">Repo + Spread</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Cashflow & FOIR Arc Meter (Matching Arc Gauge in Screenshot) */}
              <div className="lg:col-span-5 rounded-[2rem] border border-white/10 bg-[#140F18]/90 p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <PieChart className="w-4 h-4 text-orange-400" />
                    <h3 className="font-semibold text-white text-sm">FOIR Capacity Gauge</h3>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 text-neutral-400">
                    Safe vs Bank Limit
                  </span>
                </div>

                {/* Arc Progress Visual */}
                <div className="flex flex-col items-center justify-center my-4 relative">
                  <div className="relative w-48 h-24 overflow-hidden">
                    {/* Background Arc */}
                    <div className="w-48 h-48 rounded-full border-[14px] border-neutral-800 absolute top-0 left-0" />
                    {/* Active Colored Arc (Orange / Amber) */}
                    <div 
                      className="w-48 h-48 rounded-full border-[14px] border-transparent border-t-orange-500 border-r-amber-500 absolute top-0 left-0 transition-all duration-700"
                      style={{ transform: `rotate(${Math.min(180, (safeFoirPercent / 100) * 180)}deg)` }}
                    />
                  </div>
                  <div className="text-center mt-2">
                    <div className="text-3xl font-mono font-bold text-white">{safeFoirPercent}%</div>
                    <span className="text-xs text-neutral-400">Safe Household Debt Ratio</span>
                  </div>
                </div>

                <div className="space-y-2 pt-3 border-t border-white/5 text-xs font-mono">
                  <div className="flex justify-between text-neutral-400">
                    <span>Lender Aggressive Ceiling:</span>
                    <span className="text-rose-400 font-bold">{bankFoirPercent}% FOIR</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Safe Debt Cushion:</span>
                    <span className="text-emerald-400 font-bold">20% Living Buffer Guarded</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Bento Grid Row 2: Inflow Breakdown Bars + Large Real Borrower Photo Card */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Card 3: Monthly Inflow Allocation (Vertical Amber Bars matching screenshot) */}
              <div className="lg:col-span-7 rounded-[2rem] border border-white/10 bg-[#140F18]/90 p-6 sm:p-8 flex flex-col justify-between shadow-xl">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-orange-400" />
                      <h3 className="font-semibold text-white text-sm">Monthly Inflow Allocation</h3>
                    </div>
                    <span className="text-xs font-mono text-orange-300 font-bold">
                      ₹{netIncome.toLocaleString('en-IN')} Total Inflow
                    </span>
                  </div>
                  <p className="text-xs text-neutral-400 font-light mb-6">
                    Real cash distribution showing living overheads and maximum safe discretionary room.
                  </p>
                </div>

                {/* Vertical Glowing Amber Bars */}
                <div className="grid grid-cols-4 gap-3 sm:gap-4 items-end h-44 py-2">
                  {/* Bar 1: Living Expenses */}
                  <div className="flex flex-col items-center gap-2 h-full justify-end">
                    <span className="text-[10px] font-mono text-neutral-400">₹{(livingExp / 1000).toFixed(0)}k</span>
                    <div 
                      className="w-full rounded-xl bg-gradient-to-t from-neutral-800 to-neutral-700 transition-all duration-500"
                      style={{ height: `${Math.min(100, Math.max(15, (livingExp / netIncome) * 100))}%` }}
                    />
                    <span className="text-[10px] font-medium text-neutral-400 text-center truncate w-full">Living</span>
                  </div>

                  {/* Bar 2: Existing EMIs */}
                  <div className="flex flex-col items-center gap-2 h-full justify-end">
                    <span className="text-[10px] font-mono text-neutral-400">₹{(currentEmis / 1000).toFixed(0)}k</span>
                    <div 
                      className="w-full rounded-xl bg-gradient-to-t from-rose-950 to-rose-700 transition-all duration-500"
                      style={{ height: `${Math.min(100, Math.max(10, (currentEmis / netIncome) * 100))}%` }}
                    />
                    <span className="text-[10px] font-medium text-rose-300 text-center truncate w-full">Old EMIs</span>
                  </div>

                  {/* Bar 3: Safe Buffer */}
                  <div className="flex flex-col items-center gap-2 h-full justify-end">
                    <span className="text-[10px] font-mono text-neutral-400">₹{(safeBuffer / 1000).toFixed(0)}k</span>
                    <div 
                      className="w-full rounded-xl bg-gradient-to-t from-amber-900 to-amber-600 transition-all duration-500"
                      style={{ height: `${Math.min(100, Math.max(15, (safeBuffer / netIncome) * 100))}%` }}
                    />
                    <span className="text-[10px] font-medium text-amber-300 text-center truncate w-full">Buffer</span>
                  </div>

                  {/* Bar 4: Safe New EMI Cap (Glowing Orange) */}
                  <div className="flex flex-col items-center gap-2 h-full justify-end">
                    <span className="text-[10px] font-mono text-orange-300 font-bold">₹{(safeEmiCap / 1000).toFixed(0)}k</span>
                    <div 
                      className="w-full rounded-xl bg-gradient-to-t from-orange-600 via-amber-500 to-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.4)] transition-all duration-500"
                      style={{ height: `${Math.min(100, Math.max(15, (safeEmiCap / netIncome) * 100))}%` }}
                    />
                    <span className="text-[10px] font-bold text-orange-300 text-center truncate w-full">Safe EMI</span>
                  </div>
                </div>

                {/* Bottom Summary Strip */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-neutral-400">
                  <span>Inviolable living reserve: <strong className="text-white">₹{safeBuffer.toLocaleString('en-IN')}/mo</strong></span>
                  <button 
                    onClick={() => setIsSettingsOpen(true)}
                    className="text-orange-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Adjust Inflow →</span>
                  </button>
                </div>
              </div>

              {/* Card 4: REAL BORROWER PROFILE FEATURE CARD (Matching Portrait in Screenshot) */}
              <div className="lg:col-span-5 rounded-[2rem] border border-orange-500/40 bg-gradient-to-br from-[#200D15] via-[#120D1B] to-[#0A1218] p-6 sm:p-7 relative overflow-hidden shadow-2xl flex flex-col justify-between group">
                {/* Ambient Warm Orange Glow */}
                <div className="absolute -top-12 -right-12 w-64 h-64 bg-orange-500/25 rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative z-10 flex items-start gap-4">
                  {/* Real Photo Thumbnail / Avatar */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-orange-400/80 shadow-[0_0_25px_rgba(249,115,22,0.35)] shrink-0">
                    {activeProfile.avatarUrl ? (
                      <img src={activeProfile.avatarUrl} alt={activeProfile.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-orange-950 text-orange-300 flex items-center justify-center font-bold text-2xl">
                        {activeProfile.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  {/* Profile Details */}
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-950/90 border border-orange-500/40 text-[10px] font-mono text-orange-300">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Authenticated Borrower</span>
                    </div>
                    <h4 className="text-2xl font-semibold text-white font-display leading-tight">{activeProfile.name}</h4>
                    <p className="text-xs text-neutral-300 font-light">{activeProfile.occupation}</p>
                    <p className="text-[11px] text-neutral-400 font-mono">{activeProfile.city} · Age {activeProfile.age}</p>
                  </div>
                </div>

                {/* Middle Dossier Stats */}
                <div className="relative z-10 my-4 py-3 border-y border-white/10 space-y-2 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Net Monthly Inflow:</span>
                    <span className="text-white font-bold">₹{activeProfile.netMonthlyIncome.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Target Loan Purpose:</span>
                    <span className="text-orange-300 capitalize">{activeProfile.loanPurpose.replace('_', ' ').toLowerCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Bureau Score Tier:</span>
                    <span className="text-emerald-400 font-bold">{activeProfile.creditScoreBand.replace('_', ' ')}</span>
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div className="relative z-10 flex items-center gap-2">
                  <button
                    onClick={() => setIsSettingsOpen(true)}
                    className="flex-1 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-medium text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>Edit Profile Settings</span>
                  </button>
                  <button
                    onClick={onOpenCard}
                    className="py-3 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-semibold text-xs transition-all shadow-[0_0_15px_rgba(249,115,22,0.4)] hover:scale-105 cursor-pointer flex items-center gap-1"
                  >
                    <span>Card</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

            {/* Bento Grid Row 3: Interactive Loan Principal Slider (Glowing Amber Bar in Screenshot) */}
            <div className="rounded-[2rem] border border-orange-500/30 bg-gradient-to-r from-[#1E0E1B] via-[#140F18] to-[#0F141B] p-6 sm:p-8 shadow-xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-orange-400" />
                    <span>Dynamic Requested Principal Tester</span>
                  </h3>
                  <p className="text-xs text-neutral-400 font-light">
                    Drag the slider to test how loan principal impacts your safe monthly EMI limit and over-borrowing alert.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-neutral-400">Current Simulation:</span>
                  <span className="px-4 py-1.5 rounded-xl bg-orange-950/80 border border-orange-500/50 text-orange-300 font-mono text-lg font-bold shadow-md">
                    ₹{(requestedAmountSlider / 100000).toFixed(1)} Lakhs
                  </span>
                </div>
              </div>

              {/* Glowing Horizontal Slider */}
              <div className="space-y-2 py-2">
                <input
                  type="range"
                  min="50000"
                  max="3500000"
                  step="25000"
                  value={requestedAmountSlider}
                  onChange={(e) => setRequestedAmountSlider(Number(e.target.value))}
                  className="w-full accent-orange-500 cursor-pointer h-2 bg-neutral-800 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-neutral-400 font-mono">
                  <span>₹50,000 (Micro)</span>
                  <span>₹10.0 Lakhs</span>
                  <span>₹20.0 Lakhs</span>
                  <span>₹35.0 Lakhs (Max)</span>
                </div>
              </div>

              {/* Live Outcome Indicator */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-orange-400" />
                  <span className="text-neutral-300">
                    Safe Discretionary Borrowing Cap for your income: <strong className="text-orange-300">₹{(result.amount.borrowerSafeCarryMax / 100000).toFixed(1)} Lakhs</strong>
                  </span>
                </div>

                {requestedAmountSlider > result.amount.borrowerSafeCarryMax ? (
                  <span className="px-3 py-1 rounded-full bg-rose-950/80 border border-rose-500/40 text-rose-300 font-mono text-[11px] font-bold">
                    Warning: Exceeds safe discretionary carry by ₹{((requestedAmountSlider - result.amount.borrowerSafeCarryMax) / 100000).toFixed(1)}L
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-mono text-[11px] font-bold">
                    ✓ Within safe discretionary capacity
                  </span>
                )}
              </div>
            </div>

          </div>
        )}

        {/* 2. ADAPTIVE ENGINE SUBTAB (QuestionFlow + Outputs) */}
        {activeSubTab === 'engine' && (
          <div className="p-6 sm:p-8 max-w-7xl mx-auto w-full">
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
                  onOpenNegotiationCard={onOpenCard}
                />
              </div>
            </div>
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
