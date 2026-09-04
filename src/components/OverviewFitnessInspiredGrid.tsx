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
  Sparkles,
  DollarSign
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

  // Hero Slides Data with Real High-Res Photography (Bright & Vivid)
  const heroSlides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=85",
      tag: "INSTITUTIONAL COUNTER-MODEL",
      headline: "Your Debt-Free Journey Starts Here!",
      subtitle: "Stop accepting predatory bank gross FOIR limits. Discover your true safe discretionary ceiling before signing branch sanctions.",
      members: "5.8K+ Borrowers Protected",
      ctaText: "Start Assessment",
      targetAction: onNavigateToCard
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=85",
      tag: "COMMERCIAL LAP DEFENSE",
      headline: "Stop Bank Mis-Selling: Secured vs Unsecured",
      subtitle: "Banks divert eligible SME business owners into 19% unsecured books. Lock in 9.25% secured capital using commercial assets.",
      members: "₹8.4L Avg Interest Saved",
      ctaText: "Explore Collateral Shield",
      targetAction: onNavigateToCard
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=85",
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
            Let's inspect your daily credit health and institutional borrowing overview.
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
              placeholder="Search for healthy metrics..."
              className="w-full pl-9 pr-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
          </div>

          {/* Upgrade / Protected Badge Button matching screenshot */}
          <button
            onClick={onNavigateToCard}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-black hover:bg-neutral-900 text-amber-300 border border-amber-500/40 font-semibold text-xs transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:scale-105 cursor-pointer"
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>Protected</span>
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* ROW 1: LARGE HERO BANNER WITH SLIDESHOW (LEFT) + REPAYMENT GRID (RIGHT) */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* COMPONENT 1: BRIGHT VIBRANT HERO CARD MATCHING SCREENSHOT */}
        <div className="lg:col-span-7 rounded-[2.5rem] bg-gradient-to-br from-[#2563EB] via-[#1D4ED8] to-[#1E40AF] border border-blue-400/40 overflow-hidden relative shadow-[0_20px_50px_rgba(37,99,235,0.35)] min-h-[400px] flex flex-col justify-between group">
          
          {/* Top Tag & Slide Indicators */}
          <div className="relative z-20 p-6 sm:p-8 flex items-center justify-between">
            <span className="px-3.5 py-1 rounded-full bg-white/20 border border-white/30 text-[10px] font-mono font-bold tracking-wider text-white uppercase backdrop-blur-md">
              {heroSlides[currentHeroSlide].tag}
            </span>

            {/* Slide Indicators & Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentHeroSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))}
                className="w-7 h-7 rounded-full bg-black/30 hover:bg-black/60 border border-white/20 flex items-center justify-center text-white cursor-pointer transition-colors"
                title="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <div className="flex gap-1.5 px-2">
                {heroSlides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentHeroSlide(i)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      i === currentHeroSlide ? 'w-5 bg-white' : 'w-1.5 bg-white/40'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setCurrentHeroSlide((prev) => (prev + 1) % heroSlides.length)}
                className="w-7 h-7 rounded-full bg-black/30 hover:bg-black/60 border border-white/20 flex items-center justify-center text-white cursor-pointer transition-colors"
                title="Next Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Center Content: Split Layout with Crisp Text & Bright Visible Photograph */}
          <div className="relative z-20 px-6 sm:px-8 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center flex-1 py-2">
            
            {/* Left Headline & Action */}
            <div className="sm:col-span-7 space-y-3">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white leading-[1.1] tracking-tight drop-shadow-md">
                {heroSlides[currentHeroSlide].headline}
              </h3>
              <p className="text-xs sm:text-sm text-blue-100 font-light leading-relaxed max-w-sm">
                {heroSlides[currentHeroSlide].subtitle}
              </p>

              {/* Explore Play Action Link */}
              <button
                onClick={heroSlides[currentHeroSlide].targetAction}
                className="inline-flex items-center gap-2 text-xs font-semibold text-white hover:text-amber-200 transition-colors pt-2 cursor-pointer group/play"
              >
                <div className="w-8 h-8 rounded-full bg-white/25 border border-white/40 flex items-center justify-center group-hover/play:scale-110 group-hover/play:bg-white group-hover/play:text-blue-600 transition-all shadow-md">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                <span>Explore Counter-Strategy</span>
              </button>
            </div>

            {/* Right: REAL VISIBLE BRIGHT PHOTOGRAPH (Modeled after fitness image) */}
            <div className="sm:col-span-5 flex justify-center sm:justify-end">
              <div className="relative w-36 h-36 sm:w-48 sm:h-48 rounded-3xl overflow-hidden border-4 border-white/80 shadow-[0_15px_35px_rgba(0,0,0,0.3)] shrink-0 bg-white">
                <img 
                  src={heroSlides[currentHeroSlide].image} 
                  alt="Verified Borrower" 
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2 left-2 right-2 px-2 py-1 rounded-xl bg-black/60 backdrop-blur-md text-[9px] font-mono text-center text-white font-semibold">
                  Verified Case
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Social Proof Avatars & CTA Button */}
          <div className="relative z-20 p-6 sm:p-8 pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 bg-black/15 backdrop-blur-sm">
            
            {/* Real Avatar Pile */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2.5 overflow-hidden">
                <img 
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover" 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80" 
                  alt="Borrower Priya" 
                />
                <img 
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover" 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" 
                  alt="Borrower Ravi" 
                />
                <img 
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover" 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80" 
                  alt="Borrower Anita" 
                />
              </div>
              <div className="text-xs font-mono text-white">
                <span className="font-bold">{heroSlides[currentHeroSlide].members}</span>
              </div>
            </div>

            {/* CTA Pill Button matching screenshot */}
            <button
              onClick={heroSlides[currentHeroSlide].targetAction}
              className="px-6 py-3.5 rounded-full bg-black hover:bg-neutral-900 text-white font-semibold text-xs flex items-center gap-2.5 transition-all hover:scale-105 shadow-2xl cursor-pointer"
            >
              <span>{heroSlides[currentHeroSlide].ctaText}</span>
              <div className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center">
                <ArrowRight className="w-3 h-3" />
              </div>
            </button>

          </div>
        </div>

        {/* COMPONENT 2: HYDRATION-INSPIRED REPAYMENT STATUS (5 COLS) */}
        <div className="lg:col-span-5 rounded-[2.5rem] bg-gradient-to-br from-[#2563EB] via-[#1D4ED8] to-[#1E40AF] border border-blue-400/40 p-6 sm:p-8 flex flex-col justify-between shadow-[0_20px_50px_rgba(37,99,235,0.35)] relative overflow-hidden text-white">
          
          <div>
            {/* Top Title & Subtitle */}
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="text-lg font-display font-bold text-white">Repayment Status</h4>
                <p className="text-xs text-blue-100 font-light mt-0.5 max-w-xs leading-relaxed">
                  Drive your safe debt balance. Build healthy borrowing habits and protect emergency room.
                </p>
              </div>
              <span className="px-3 py-1.5 rounded-full bg-black/30 border border-white/20 text-[10px] font-mono font-bold text-white shrink-0">
                Well Done 👍
              </span>
            </div>

            {/* Visual Matrix of 32 Repayment Cups / Tokens (4 rows x 8 cols) */}
            <div className="mt-6 p-4 rounded-2xl bg-black/20 border border-white/10">
              <div className="grid grid-cols-8 gap-2.5 justify-items-center">
                {Array.from({ length: totalTiles }).map((_, index) => {
                  const isSafe = index < safeMonthsCount;
                  return (
                    <div 
                      key={index}
                      className="group/tile relative flex flex-col items-center"
                      title={`Month ${index + 1}: ${isSafe ? 'Guaranteed Safe Inflow' : 'Extended Horizon'}`}
                    >
                      {/* White / Cyan Cup Token matching screenshot */}
                      <div className={`w-5 h-7 rounded-sm transition-all duration-300 flex items-center justify-center ${
                        isSafe
                          ? 'bg-white shadow-[0_0_10px_rgba(255,255,255,0.6)]'
                          : 'bg-white/25 border border-white/20'
                      }`}>
                        {isSafe && (
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between items-center mt-3 pt-2 border-t border-white/10 text-[10px] font-mono text-blue-200">
                <span>Month 01 (Disbursement)</span>
                <span>Month 32 (Safe Goal)</span>
              </div>
            </div>
          </div>

          {/* Bottom Metric & Tenure Switcher (D, W, M equivalent: 1Y, 3Y, 5Y) */}
          <div className="pt-6 mt-4 border-t border-white/15 flex items-end justify-between">
            {/* Tenure Mode Switcher */}
            <div className="flex items-center gap-1.5 bg-black/30 p-1 rounded-full border border-white/10">
              {(['1Y', '3Y', '5Y'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setTenureMode(mode)}
                  className={`w-8 h-8 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                    tenureMode === mode
                      ? 'bg-white text-blue-900 shadow-md'
                      : 'text-blue-200 hover:text-white'
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
              <div className="text-xs font-mono text-blue-100 font-medium mt-1">
                /Safe Ceiling
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* ROW 2: 3 CARDS (SLEEP CAROUSEL + CALORIES BARS + WEIGHT WAVE) */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        
        {/* CARD 1: INSTITUTIONAL SECRETS CAROUSEL (WHITE CARD MATCHING SCREENSHOT) */}
        <div className="rounded-[2.5rem] bg-white text-neutral-900 p-6 sm:p-7 flex flex-col justify-between shadow-xl border border-neutral-200">
          
          <div>
            {/* Real Avatar Group */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex -space-x-2">
                <img 
                  className="w-7 h-7 rounded-full ring-2 ring-white object-cover" 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" 
                  alt="Advisor" 
                />
                <img 
                  className="w-7 h-7 rounded-full ring-2 ring-white object-cover" 
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80" 
                  alt="Counselor" 
                />
                <img 
                  className="w-7 h-7 rounded-full ring-2 ring-white object-cover" 
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80" 
                  alt="Advocate" 
                />
              </div>
            </div>

            {/* Headline */}
            <h4 className="text-xl font-display font-bold text-neutral-900 leading-snug">
              Experience the Power of Fair Lending
            </h4>

            {/* Active Carousel Content Card */}
            <div className="mt-4 p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2 min-h-[140px] flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[10px] font-mono font-bold">
                  {tipSlides[currentTipSlide].tag}
                </span>
                <h5 className="text-xs font-bold text-neutral-900 mt-2">
                  {tipSlides[currentTipSlide].title}
                </h5>
                <p className="text-[11px] text-neutral-600 font-normal mt-1 leading-relaxed">
                  {tipSlides[currentTipSlide].content}
                </p>
              </div>
            </div>
          </div>

          {/* Carousel Pagination Controls (Matching 2/5 with < >) */}
          <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
            <div className="font-display text-base font-bold text-neutral-900">
              {currentTipSlide + 1}<span className="text-neutral-400 text-xs font-normal">/{tipSlides.length}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentTipSlide((prev) => (prev === 0 ? tipSlides.length - 1 : prev - 1))}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 cursor-pointer transition-colors"
                title="Previous Tip"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentTipSlide((prev) => (prev + 1) % tipSlides.length)}
                className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-700 cursor-pointer transition-colors"
                title="Next Tip"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* CARD 2: MONTHLY CASHFLOW EQUALIZER (CALORIES INSPIRED - WHITE CARD) */}
        <div className="rounded-[2.5rem] bg-white text-neutral-900 p-6 sm:p-7 flex flex-col justify-between shadow-xl border border-neutral-200">
          
          <div>
            {/* Top Metric Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-neutral-900" />
                <h4 className="font-display font-bold text-neutral-900 text-base">Cash Inflow</h4>
              </div>
              <div className="text-right font-mono">
                <div className="text-xs font-bold text-neutral-900">₹{(netIncome / 1000).toFixed(0)}k</div>
                <div className="text-[9px] text-neutral-500 uppercase">Monthly Total</div>
              </div>
            </div>

            <p className="text-[11px] text-neutral-500 mt-1">
              Essential living overhead allocation
            </p>

            {/* Big Number Display */}
            <div className="mt-3">
              <span className="text-3xl font-display font-bold text-neutral-900 tracking-tight">
                ₹{(livingExpenses / 1000).toFixed(0)}k
              </span>
              <span className="text-xs font-mono text-neutral-500 ml-1">/Living Exp</span>
            </div>

            {/* Vertical Barcode Equalizer Lines (matching screenshot green bars) */}
            <div className="mt-4 flex items-end gap-1 h-14 py-1">
              {Array.from({ length: 28 }).map((_, i) => {
                const barHeightPercent = Math.sin((i / 28) * Math.PI) * 75 + 25;
                return (
                  <div
                    key={i}
                    className="flex-1 rounded-full transition-all duration-300 bg-[#A3E635]"
                    style={{ height: `${barHeightPercent}%` }}
                    title={`Day ${i + 1} Cash Velocity`}
                  />
                );
              })}
            </div>
          </div>

          {/* Bottom Breakdown (Carbs / Proteins / Fats equivalent) */}
          <div className="pt-4 border-t border-neutral-100 grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-sm font-mono font-bold text-neutral-900">₹{(livingExpenses / 1000).toFixed(0)}k</div>
              <div className="text-[9px] text-neutral-500 font-medium">Living</div>
            </div>
            <div>
              <div className="text-sm font-mono font-bold text-neutral-900">₹{(existingEmis / 1000).toFixed(0)}k</div>
              <div className="text-[9px] text-neutral-500 font-medium">Old EMIs</div>
            </div>
            <div>
              <div className="text-sm font-mono font-bold text-emerald-600">₹{(safeBuffer / 1000).toFixed(0)}k</div>
              <div className="text-[9px] text-neutral-500 font-medium">Buffer</div>
            </div>
          </div>

        </div>

        {/* CARD 3: DEBT SUSTAINABILITY TRAJECTORY (WEIGHT WAVE INSPIRED - WHITE CARD) */}
        <div className="rounded-[2.5rem] bg-white text-neutral-900 p-6 sm:p-7 flex flex-col justify-between shadow-xl border border-neutral-200">
          
          <div>
            {/* Top Metric Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-neutral-900" />
                <h4 className="font-display font-bold text-neutral-900 text-base">Debt Capacity</h4>
              </div>
              <div className="text-right font-mono">
                <div className="text-xs font-bold text-neutral-900">60% FOIR</div>
                <div className="text-[9px] text-neutral-500 uppercase">Bank Upper Cap</div>
              </div>
            </div>

            <p className="text-[11px] text-neutral-500 mt-1">
              Safe ceiling: ₹{(result.amount.borrowerSafeCarryMax * 0.8 / 100000).toFixed(1)}L - ₹{(result.amount.borrowerSafeCarryMax / 100000).toFixed(1)}L
            </p>

            {/* Twin Glowing Sinusoidal Wave Lines (matching screenshot) */}
            <div className="mt-4 h-16 relative flex items-center">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 200 60" fill="none">
                {/* Wave 1: Cyan Wave */}
                <path 
                  d="M0,35 C40,10 70,50 110,25 C150,5 180,40 200,20" 
                  stroke="#38BDF8" 
                  strokeWidth="4" 
                  strokeLinecap="round" 
                />
                {/* Wave 2: Soft Blue Wave */}
                <path 
                  d="M0,45 C35,55 75,15 115,40 C155,60 175,15 200,30" 
                  stroke="#93C5FD" 
                  strokeWidth="3" 
                  strokeLinecap="round" 
                  opacity="0.8"
                />
              </svg>
            </div>
          </div>

          {/* Big Number & Bottom Indicator */}
          <div className="pt-4 border-t border-neutral-100 flex items-end justify-between">
            <div>
              <div className="text-3xl sm:text-4xl font-display font-bold text-neutral-900 tracking-tight leading-none">
                {Math.round(((existingEmis + safeEmiCap) / netIncome) * 100)}<span className="text-sm font-mono text-neutral-500">%</span>
              </div>
              <div className="text-[10px] font-mono text-neutral-500 mt-1">Safe Capacity Utilized</div>
            </div>

            <div className="text-right">
              <div className="text-[10px] text-neutral-500 font-mono">Status:</div>
              <div className="text-xs font-bold text-emerald-600 flex items-center gap-1 justify-end">
                <Check className="w-4 h-4" />
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
