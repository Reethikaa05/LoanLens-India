import React, { useState, useEffect } from 'react';
import { 
  Play, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Check, 
  TrendingUp, 
  Zap, 
  Flame, 
  Shield, 
  ArrowRight, 
  Info,
  Search,
  Award,
  Sparkles
} from 'lucide-react';
import { BorrowerProfile, CopilotResult } from '../engine/types';

interface OverviewFitnessInspiredGridProps {
  activeProfile: BorrowerProfile;
  result: CopilotResult;
  onNavigateToCard: () => void;
  onNavigateToEngine: () => void;
  onOpenSettings: () => void;
}

export const OverviewFitnessInspiredGrid: React.FC<OverviewFitnessInspiredGridProps> = ({
  activeProfile,
  result,
  onNavigateToCard,
  onNavigateToEngine,
  onOpenSettings
}) => {
  // Hero Banner Slideshow State
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  
  // Intelligence Tips Carousel State (Bottom-Left Card)
  const [currentTipSlide, setCurrentTipSlide] = useState(0);

  // Repayment Grid Tenure Mode (1Y, 3Y, 5Y)
  const [tenureMode, setTenureMode] = useState<'1Y' | '3Y' | '5Y'>('3Y');

  // Search input state
  const [searchQuery, setSearchQuery] = useState('');

  // Hero Slides Data with Real Photography
  const heroSlides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80",
      tag: "INSTITUTIONAL COUNTER-MODEL",
      headline: "Your Debt-Free Journey Starts Here!",
      subtitle: "Stop accepting predatory bank gross FOIR limits. Discover your true safe discretionary ceiling before signing branch sanctions.",
      members: "5.8K+ Borrowers Protected",
      ctaText: "Launch Negotiation Script",
      targetAction: onNavigateToCard
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=1200&q=80",
      tag: "COMMERCIAL LAP DEFENSE",
      headline: "Stop Bank Mis-Selling: Secured LAP vs Unsecured",
      subtitle: "Banks divert eligible SME business owners into 19% unsecured books to extract high broker fees. Lock in 9.25% secured capital.",
      members: "₹8.4L Avg Interest Saved",
      ctaText: "Explore Collateral Shield",
      targetAction: onNavigateToCard
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1200&q=80",
      tag: "APP DEBT INTERVENTION",
      headline: "Break Free From 30%+ Fast App Traps",
      subtitle: "High-velocity instant app loans trigger compounding bounce fees. Switch to RBI-compliant priority micro-enterprise schemes.",
      members: "Zero Hidden Penalties",
      ctaText: "Run Underwriting Engine",
      targetAction: onNavigateToEngine
    }
  ];

  // Auto-advance hero slideshow every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  // Bottom Left Carousel Slides: Institutional Secrets & Traps
  const tipSlides = [
    {
      id: 1,
      tag: "FOIR Illusion",
      title: "Why Banks Push 60% Debt Ratios",
      content: "Lenders calculate capacity on gross salary ignoring living inflation and medical risks. Their incentive is to maximize interest income, not household solvency."
    },
    {
      id: 2,
      tag: "Insurance Trap",
      title: "Credit Life Insurance is Voluntary by Law",
      content: "RBI guidelines strictly prohibit banks from conditioning loan approval on bundled single-premium insurance. Demand pure term cover or reject bundling."
    },
    {
      id: 3,
      tag: "Foreclosure Law",
      title: "Zero Prepayment Penalty on Floating Rates",
      content: "Under RBI Master Directions, individual floating rate retail loans carry ZERO foreclosure or part-prepayment charges. Never pay 3-4% exit penalties."
    },
    {
      id: 4,
      tag: "Processing Cap",
      title: "Cap Processing Charges at 0.50%",
      content: "Lenders routinely quote 1.5% to 2.5% + 18% GST. With our branch counter-script, demand an institutional cap of 0.50% or flat ₹5,000 max."
    },
    {
      id: 5,
      tag: "LAP Priority",
      title: "The Unencumbered Asset Advantage",
      content: "Holding unencumbered property unlocks secured Loan Against Property at 9.25% - 11.25%, slashing EMI costs by over 40% compared to personal loans."
    }
  ];

  // Financial calculations
  const netIncome = activeProfile.netMonthlyIncome;
  const livingExpenses = activeProfile.monthlyEssentialExpenses;
  const existingEmis = activeProfile.existingMonthlyEmis;
  const safeBuffer = Math.round(netIncome * 0.20);
  const safeEmiCap = result.emi.safeEmiCeiling;

  // Grid tiles for 32 months (4 rows x 8 cols)
  const totalTiles = 32;
  const safeMonthsCount = tenureMode === '1Y' ? 12 : tenureMode === '3Y' ? 24 : 30;

  return (
    <div className="space-y-6 animate-fadeIn select-none">
      
      {/* ------------------------------------------------------------- */}
      {/* TOP HEADER: GREETING + SEARCH BAR + INSTITUTIONAL SHIELD      */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2">
        <div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
            Hi, {activeProfile.name.split(' ')[0]}!
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 font-light mt-0.5">
            Let's inspect your institutional credit & safe borrowing overview.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search bar matching screenshot */}
          <div className="relative hidden sm:block w-64 md:w-80">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search metrics, RBI repo rates..."
              className="w-full pl-9 pr-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-orange-500/50 transition-colors"
            />
          </div>

          {/* Institutional Shield Badge / Upgrade Button */}
          <button
            onClick={onNavigateToCard}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-semibold text-xs transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:scale-105 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Institutional Shield</span>
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* ROW 1: LARGE HERO BANNER WITH SLIDESHOW (LEFT) + REPAYMENT GRID (RIGHT) */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* COMPONENT 1: HERO CARD WITH REAL IMAGE SLIDESHOW (7 COLS) */}
        <div className="lg:col-span-7 rounded-[2.5rem] bg-gradient-to-br from-[#1A3A5A] via-[#0E2238] to-[#0A1624] border border-cyan-500/30 overflow-hidden relative shadow-2xl min-h-[380px] sm:min-h-[400px] flex flex-col justify-between group">
          
          {/* Background Real Image with Gradient Mask */}
          <div className="absolute inset-0 z-0">
            <img 
              src={heroSlides[currentHeroSlide].image} 
              alt="Borrower Consultation" 
              className="w-full h-full object-cover object-center opacity-40 mix-blend-luminosity group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1624] via-[#0A1624]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A1624] via-[#0A1624]/70 to-transparent" />
          </div>

          {/* Top Tag & Slide Indicators */}
          <div className="relative z-10 p-6 sm:p-8 flex items-center justify-between">
            <span className="px-3.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-[10px] font-mono font-bold tracking-wider text-cyan-300 uppercase backdrop-blur-md">
              {heroSlides[currentHeroSlide].tag}
            </span>

            {/* Slide Indicators & Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentHeroSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
                className="w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 border border-white/10 flex items-center justify-center text-white cursor-pointer transition-colors"
                title="Previous Slide"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              
              <div className="flex gap-1.5 px-2">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentHeroSlide(i)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      i === currentHeroSlide ? 'w-5 bg-cyan-400' : 'w-1.5 bg-white/30'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length)}
                className="w-7 h-7 rounded-full bg-black/40 hover:bg-black/70 border border-white/10 flex items-center justify-center text-white cursor-pointer transition-colors"
                title="Next Slide"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Center Play Button & Headline */}
          <div className="relative z-10 px-6 sm:px-8 space-y-3">
            <h3 className="text-2xl sm:text-4xl font-display font-bold text-white leading-tight max-w-xl">
              {heroSlides[currentHeroSlide].headline}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-light max-w-lg leading-relaxed">
              {heroSlides[currentHeroSlide].subtitle}
            </p>

            {/* Explore Play Action Link */}
            <button
              onClick={heroSlides[currentHeroSlide].targetAction}
              className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-300 hover:text-cyan-200 transition-colors pt-1 cursor-pointer group/play"
            >
              <div className="w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center group-hover/play:scale-110 transition-transform">
                <Play className="w-3 h-3 text-cyan-300 fill-cyan-300 ml-0.5" />
              </div>
              <span>Explore Counter-Strategy</span>
            </button>
          </div>

          {/* Bottom Social Proof Avatars & CTA Button */}
          <div className="relative z-10 p-6 sm:p-8 pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 mt-4 bg-black/20 backdrop-blur-md">
            
            {/* Real Avatar Pile */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2.5 overflow-hidden">
                <img 
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-[#0A1624] object-cover" 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80" 
                  alt="Borrower Priya" 
                />
                <img 
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-[#0A1624] object-cover" 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" 
                  alt="Borrower Ravi" 
                />
                <img 
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-[#0A1624] object-cover" 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80" 
                  alt="Borrower Anita" 
                />
              </div>
              <div className="text-[11px] font-mono text-cyan-200">
                <span className="font-bold text-white">{heroSlides[currentHeroSlide].members}</span>
              </div>
            </div>

            {/* CTA Button matching screenshot */}
            <button
              onClick={heroSlides[currentHeroSlide].targetAction}
              className="px-5 py-3 rounded-full bg-white hover:bg-neutral-100 text-black font-semibold text-xs flex items-center gap-2 transition-all hover:scale-105 shadow-xl cursor-pointer"
            >
              <span>{heroSlides[currentHeroSlide].ctaText}</span>
              <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center">
                <ArrowRight className="w-3 h-3" />
              </div>
            </button>

          </div>
        </div>

        {/* COMPONENT 2: REPAYMENT & SAFE CUSHION STATUS (5 COLS - HYDRATION-INSPIRED) */}
        <div className="lg:col-span-5 rounded-[2.5rem] bg-gradient-to-br from-[#162D4A] via-[#101F33] to-[#0A1422] border border-cyan-500/30 p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          
          {/* Ambient Cyan Glow */}
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

          <div>
            {/* Top Title & Subtitle */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="text-lg font-display font-semibold text-white">Safe Repayment Health</h4>
                <p className="text-xs text-neutral-300 font-light mt-0.5 max-w-xs">
                  Drive your loan safety daily. Build healthy debt habits and protect your emergency cushion.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[10px] font-mono font-bold text-emerald-300 shrink-0">
                Well Protected 👍
              </span>
            </div>

            {/* Visual Matrix of 32 Repayment Cups / Tokens (4 rows x 8 cols) */}
            <div className="mt-6 p-4 rounded-2xl bg-black/20 border border-white/5">
              <div className="grid grid-cols-8 gap-2 justify-items-center">
                {Array.from({ length: totalTiles }).map((_, index) => {
                  const isSafe = index < safeMonthsCount;
                  return (
                    <div 
                      key={index}
                      className="group/tile relative flex flex-col items-center"
                      title={`Month ${index + 1}: ${isSafe ? 'Secure Cashflow Cushion' : 'Tenure Boundary'}`}
                    >
                      {/* Shield / Cup Token */}
                      <div className={`w-5 h-7 rounded-md transition-all duration-300 flex items-center justify-center ${
                        isSafe
                          ? 'bg-gradient-to-b from-cyan-400 to-cyan-600 shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                          : 'bg-white/10 border border-white/10'
                      }`}>
                        {isSafe ? (
                          <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
                        ) : (
                          <div className="w-1 h-1 rounded-full bg-white/20" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between items-center mt-3 pt-2 border-t border-white/5 text-[10px] font-mono text-neutral-400">
                <span>Month 01 (Disbursement)</span>
                <span>Month 32 (Safe Horizon)</span>
              </div>
            </div>
          </div>

          {/* Bottom Metric & Tenure Switcher (D, W, M equivalent: 1Y, 3Y, 5Y) */}
          <div className="pt-6 mt-4 border-t border-white/10 flex items-end justify-between">
            {/* Tenure Mode Switcher */}
            <div className="flex items-center gap-1.5 bg-black/30 p-1 rounded-full border border-white/5">
              {(['1Y', '3Y', '5Y'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setTenureMode(mode)}
                  className={`w-8 h-8 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                    tenureMode === mode
                      ? 'bg-white text-black shadow-md'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            {/* Big Hero Number matching 2.15L /Day */}
            <div className="text-right">
              <div className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight leading-none">
                ₹{(result.amount.borrowerSafeCarryMax / 100000).toFixed(2)}L
              </div>
              <div className="text-[11px] font-mono text-cyan-300 font-medium mt-1">
                /Safe Discretionary Cap
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* ROW 2: 3 CARDS (SLEEP CAROUSEL + CALORIES BARS + WEIGHT WAVE) */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        
        {/* CARD 1: INSTITUTIONAL SECRETS CAROUSEL (DEEP SLEEP INSPIRED) */}
        <div className="rounded-[2.5rem] bg-[#140F18]/90 border border-white/10 p-6 sm:p-7 flex flex-col justify-between shadow-xl">
          
          <div>
            {/* Real Avatar Group */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex -space-x-2">
                <img 
                  className="w-7 h-7 rounded-full ring-2 ring-[#140F18] object-cover" 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" 
                  alt="Advisor" 
                />
                <img 
                  className="w-7 h-7 rounded-full ring-2 ring-[#140F18] object-cover" 
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80" 
                  alt="Counselor" 
                />
                <img 
                  className="w-7 h-7 rounded-full ring-2 ring-[#140F18] object-cover" 
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80" 
                  alt="Advocate" 
                />
              </div>
              <span className="text-[10px] font-mono text-neutral-400">Credit Defense Circle</span>
            </div>

            {/* Headline */}
            <h4 className="text-xl font-display font-semibold text-white leading-snug">
              Institutional Secrets & Traps
            </h4>

            {/* Active Carousel Content Card */}
            <div className="mt-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2 min-h-[140px] flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-orange-500/20 text-orange-300 text-[10px] font-mono font-bold">
                  {tipSlides[currentTipSlide].tag}
                </span>
                <h5 className="text-xs font-bold text-neutral-200 mt-2">
                  {tipSlides[currentTipSlide].title}
                </h5>
                <p className="text-[11px] text-neutral-400 font-light mt-1 leading-relaxed">
                  {tipSlides[currentTipSlide].content}
                </p>
              </div>
            </div>
          </div>

          {/* Carousel Pagination Controls (Matching 2/5 with < >) */}
          <div className="pt-4 border-t border-white/5 flex items-center justify-between">
            <div className="font-display text-base font-bold text-white">
              {currentTipSlide + 1}<span className="text-neutral-500 text-xs font-normal">/{tipSlides.length}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentTipSlide((prev) => (prev === 0 ? tipSlides.length - 1 : prev - 1))}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white cursor-pointer transition-colors"
                title="Previous Tip"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentTipSlide((prev) => (prev + 1) % tipSlides.length)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white cursor-pointer transition-colors"
                title="Next Tip"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* CARD 2: MONTHLY CASHFLOW EQUALIZER (CALORIES INSPIRED) */}
        <div className="rounded-[2.5rem] bg-[#140F18]/90 border border-white/10 p-6 sm:p-7 flex flex-col justify-between shadow-xl">
          
          <div>
            {/* Top Metric Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
                  <Flame className="w-4 h-4" />
                </div>
                <h4 className="font-display font-semibold text-white text-sm">Monthly Inflow</h4>
              </div>
              <div className="text-right font-mono">
                <div className="text-xs font-bold text-amber-300">₹{(netIncome / 1000).toFixed(0)}k</div>
                <div className="text-[9px] text-neutral-500 uppercase">Total Take-Home</div>
              </div>
            </div>

            <p className="text-[11px] text-neutral-400 font-light mt-2">
              Essential living overhead allocation
            </p>

            {/* Big Number Display */}
            <div className="mt-3">
              <span className="text-3xl font-display font-bold text-white tracking-tight">
                ₹{(livingExpenses / 1000).toFixed(0)}k
              </span>
              <span className="text-xs font-mono text-neutral-400 ml-1">/Living Exp</span>
            </div>

            {/* Vertical Barcode Equalizer Lines (30 skinny bars) */}
            <div className="mt-4 flex items-end gap-1 h-14 py-1">
              {Array.from({ length: 28 }).map((_, i) => {
                // Generate a wave-like equalizer height
                const barHeightPercent = Math.sin((i / 28) * Math.PI) * 75 + 25;
                const isLiving = i < 14;
                const isEmi = i >= 14 && i < 20;
                return (
                  <div
                    key={i}
                    className="flex-1 rounded-full transition-all duration-300"
                    style={{
                      height: `${barHeightPercent}%`,
                      backgroundColor: isLiving 
                        ? '#F59E0B' // Amber for living
                        : isEmi 
                        ? '#F43F5E' // Rose for old EMIs
                        : '#10B981' // Emerald for safe headroom
                    }}
                    title={`Day ${i + 1} Cash Velocity`}
                  />
                );
              })}
            </div>
          </div>

          {/* Bottom Breakdown (Carbs / Proteins / Fats equivalent) */}
          <div className="pt-4 border-t border-white/5 grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-sm font-mono font-bold text-amber-300">₹{(livingExpenses / 1000).toFixed(0)}k</div>
              <div className="text-[9px] text-neutral-400 font-medium">Living</div>
            </div>
            <div>
              <div className="text-sm font-mono font-bold text-rose-300">₹{(existingEmis / 1000).toFixed(0)}k</div>
              <div className="text-[9px] text-neutral-400 font-medium">Old EMIs</div>
            </div>
            <div>
              <div className="text-sm font-mono font-bold text-emerald-300">₹{(safeBuffer / 1000).toFixed(0)}k</div>
              <div className="text-[9px] text-neutral-400 font-medium">Buffer</div>
            </div>
          </div>

        </div>

        {/* CARD 3: DEBT SUSTAINABILITY TRAJECTORY (WEIGHT WAVE INSPIRED) */}
        <div className="rounded-[2.5rem] bg-[#140F18]/90 border border-white/10 p-6 sm:p-7 flex flex-col justify-between shadow-xl">
          
          <div>
            {/* Top Metric Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <h4 className="font-display font-semibold text-white text-sm">Debt Capacity</h4>
              </div>
              <div className="text-right font-mono">
                <div className="text-xs font-bold text-cyan-300">60% FOIR</div>
                <div className="text-[9px] text-neutral-500 uppercase">Bank Upper Cap</div>
              </div>
            </div>

            <p className="text-[11px] text-neutral-400 font-light mt-2">
              Safe ceiling: ₹{(result.amount.borrowerSafeCarryMax * 0.8 / 100000).toFixed(1)}L - ₹{(result.amount.borrowerSafeCarryMax / 100000).toFixed(1)}L
            </p>

            {/* Twin Glowing Sinusoidal Wave Lines (SVG) */}
            <div className="mt-4 h-16 relative flex items-center">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 200 60" fill="none">
                {/* Wave 1: Safe Capacity (Cyan) */}
                <path 
                  d="M0,35 C40,10 70,50 110,25 C150,5 180,40 200,20" 
                  stroke="#06B6D4" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                  className="drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                />
                {/* Wave 2: Bank FOIR Overcharge (Rose / dashed) */}
                <path 
                  d="M0,45 C35,55 75,15 115,40 C155,60 175,15 200,30" 
                  stroke="#F43F5E" 
                  strokeWidth="2" 
                  strokeDasharray="4 4" 
                  strokeLinecap="round" 
                  opacity="0.6"
                />
              </svg>
            </div>
          </div>

          {/* Big Number & Bottom Indicator */}
          <div className="pt-4 border-t border-white/5 flex items-end justify-between">
            <div>
              <div className="text-3xl font-display font-bold text-white tracking-tight leading-none">
                {Math.round(((existingEmis + safeEmiCap) / netIncome) * 100)}<span className="text-sm font-mono text-neutral-400">%</span>
              </div>
              <div className="text-[10px] font-mono text-cyan-300 mt-1">Safe Capacity Utilized</div>
            </div>

            <div className="text-right">
              <div className="text-[10px] text-neutral-400 font-mono">Status:</div>
              <div className="text-xs font-bold text-emerald-400 flex items-center gap-1 justify-end">
                <Check className="w-3.5 h-3.5" />
                <span>Well Protected!</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default OverviewFitnessInspiredGrid;
