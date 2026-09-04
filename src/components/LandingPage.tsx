import React, { useRef, useEffect, useState } from 'react';
import { 
  Globe, 
  ArrowRight, 
  Sparkles, 
  Scale, 
  Percent, 
  AlertOctagon, 
  TrendingDown, 
  UserCheck, 
  ChevronRight, 
  Lock,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  Zap,
  ShieldCheck,
  Award,
  TrendingUp,
  FileText
} from 'lucide-react';
import { PRESET_PROFILES } from '../engine/scenarios';
import { BorrowerProfile } from '../engine/types';

// Clean SVG definitions for social icons
const InstagramIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const TwitterIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

interface LandingPageProps {
  onStartAssessment: () => void;
  onSelectProfile: (profile: BorrowerProfile) => void;
  onOpenAuth: (initialTab?: 'signin' | 'signup') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartAssessment,
  onSelectProfile,
  onOpenAuth
}) => {
  const [email, setEmail] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);
  const fadingOutRef = useRef<boolean>(false);
  const animationFrameRef = useRef<number | null>(null);

  // Interactive Mini-Simulator State on Landing Page
  const [simIncome, setSimIncome] = useState<number>(85000);
  const [simLoanAsk, setSimLoanAsk] = useState<number>(800000);

  const simBankSanction = Math.round(simIncome * 0.60 * 32);
  const simSafeCarry = Math.round(simIncome * 0.35 * 32);
  const simFairMinRate = 10.50;
  const simFairMaxRate = 12.00;

  // Custom JavaScript fade system with requestAnimationFrame (500ms duration)
  const fadeTo = (targetOpacity: number, duration: number, onComplete?: () => void) => {
    if (!videoRef.current) return;
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    const video = videoRef.current;
    const startOpacity = parseFloat(window.getComputedStyle(video).opacity) || 0;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = startOpacity + (targetOpacity - startOpacity) * progress;
      if (video) {
        video.style.opacity = current.toString();
      }
      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(step);
      } else {
        animationFrameRef.current = null;
        if (onComplete) onComplete();
      }
    };
    animationFrameRef.current = requestAnimationFrame(step);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      fadingOutRef.current = false;
      video.play().then(() => {
        fadeTo(1, 500);
      }).catch(() => {});
    };

    const handleTimeUpdate = () => {
      if (!video.duration) return;
      const remaining = video.duration - video.currentTime;
      if (remaining <= 0.55 && !fadingOutRef.current) {
        fadingOutRef.current = true;
        fadeTo(0, 500);
      }
    };

    const handleEnded = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      video.style.opacity = '0';
      setTimeout(() => {
        if (!video) return;
        video.currentTime = 0;
        fadingOutRef.current = false;
        video.play().then(() => {
          fadeTo(1, 500);
        }).catch(() => {});
      }, 100);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('ended', handleEnded);

    if (video.readyState >= 2) {
      handleLoadedData();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    onOpenAuth('signup');
  };

  const scrollToContent = () => {
    const el = document.getElementById('platform-overview');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      onStartAssessment();
    }
  };

  return (
    <div className="bg-black text-white selection:bg-white/20 selection:text-white">
      {/* ========================================================================= */}
      {/* EXACT CINEMATIC HERO SECTION (UNTOUCHED)                                  */}
      {/* ========================================================================= */}
      <section className="relative min-h-screen bg-black overflow-hidden flex flex-col justify-between">
        {/* Full-screen muted autoplaying background video */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            ref={videoRef}
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4"
            muted
            playsInline
            autoPlay
            className="w-full h-full object-cover translate-y-[17%] transition-none opacity-0"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
        </div>

        {/* Navigation Bar */}
        <header className="relative z-20 px-6 py-6">
          <div className="liquid-glass rounded-full px-6 py-3 flex items-center justify-between max-w-5xl mx-auto shadow-2xl">
            {/* Left side: Logo & Brand */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <Globe className="w-6 h-6 text-white shrink-0" />
                <span className="text-white font-semibold text-lg tracking-tight">Asme</span>
              </div>

              {/* Center Links */}
              <nav className="hidden md:flex items-center gap-8">
                <a href="#features" onClick={(e) => { e.preventDefault(); scrollToContent(); }} className="text-white/80 hover:text-white transition-colors text-sm font-medium">
                  Features
                </a>
                <a href="#pricing" onClick={(e) => { e.preventDefault(); scrollToContent(); }} className="text-white/80 hover:text-white transition-colors text-sm font-medium">
                  Pricing
                </a>
                <a href="#about" onClick={(e) => { e.preventDefault(); scrollToContent(); }} className="text-white/80 hover:text-white transition-colors text-sm font-medium">
                  About
                </a>
              </nav>
            </div>

            {/* Right side: Auth buttons */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => onOpenAuth('signup')}
                className="text-white hover:text-white/80 transition-colors text-sm font-medium px-2 py-1"
              >
                Sign Up
              </button>
              <button
                onClick={() => onOpenAuth('signin')}
                className="liquid-glass rounded-full px-6 py-2 text-sm font-medium text-white hover:bg-white/10 transition-colors shadow-sm"
              >
                Login
              </button>
            </div>
          </div>
        </header>

        {/* Hero Content Area */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[20%]">
          <h1
            className="text-5xl md:text-6xl lg:text-7xl text-white mb-8 tracking-tight whitespace-nowrap"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Built for the curious
          </h1>

          <div className="max-w-xl w-full space-y-4">
            <form onSubmit={handleEmailSubmit} className="liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center gap-3 shadow-2xl">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="bg-transparent border-none outline-none flex-1 text-white placeholder:text-white/40 text-base"
              />
              <button
                type="submit"
                aria-label="Submit email"
                className="bg-white rounded-full p-3 text-black hover:bg-white/90 transition-transform active:scale-95 shadow-md flex items-center justify-center shrink-0"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>

            <p className="text-white text-sm leading-relaxed px-4 font-normal opacity-90">
              Stay updated with the latest news and insights. Subscribe to our newsletter today and never miss out on exciting updates.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={onStartAssessment}
                className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/10 transition-all flex items-center gap-2 shadow-lg"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Launch Borrower Copilot</span>
              </button>
              <button
                onClick={scrollToContent}
                className="liquid-glass rounded-full px-6 py-3 text-white/80 hover:text-white text-sm font-medium hover:bg-white/5 transition-all flex items-center gap-1.5"
              >
                <span>Read Manifesto</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Social Icons Footer */}
        <div className="relative z-10 flex justify-center gap-4 pb-12">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/10 transition-all"
          >
            <InstagramIcon className="w-5 h-5" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/10 transition-all"
          >
            <TwitterIcon className="w-5 h-5" />
          </a>
          <a
            href="https://asme.network"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Website"
            className="liquid-glass rounded-full p-4 text-white/80 hover:text-white hover:bg-white/10 transition-all"
          >
            <Globe className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* EXTENDED IMPRESSIVE PLATFORM DESIGN (BELOW THE VIDEO)                     */}
      {/* ========================================================================= */}
      <div id="platform-overview" className="bg-[#0B090E] text-[#EEE6EA] border-t border-neutral-800/80 transition-colors py-24 relative overflow-hidden">
        
        {/* Subtle Ambient Radial Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#4B2440]/25 via-[#CFA5C1]/5 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute top-3/4 -left-48 w-[500px] h-[500px] bg-purple-950/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-2/3 -right-48 w-[500px] h-[500px] bg-indigo-950/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28">
          
          {/* Section 0: Live Lending Rates Ticker */}
          <div className="p-4 rounded-2xl bg-neutral-900/70 border border-neutral-800/80 backdrop-blur-md shadow-xl flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
              <span className="font-mono text-neutral-400 font-semibold uppercase tracking-wider text-[11px]">Live Market Spreads</span>
              <span className="text-neutral-600">|</span>
              <span className="font-mono font-bold text-[#CFA5C1]">RBI Repo Rate: 6.50%</span>
            </div>
            <div className="flex items-center gap-6 overflow-x-auto font-mono text-[11px] text-neutral-300 pb-1 sm:pb-0">
              <span className="whitespace-nowrap"><strong className="text-white">SBI:</strong> 10.30% <span className="text-emerald-400 text-[10px]">(+3.80% spread)</span></span>
              <span className="whitespace-nowrap"><strong className="text-white">HDFC:</strong> 10.50% <span className="text-emerald-400 text-[10px]">(+4.00% spread)</span></span>
              <span className="whitespace-nowrap"><strong className="text-white">Mortgage LAP:</strong> 9.15% <span className="text-emerald-400 text-[10px]">(Secured)</span></span>
              <span className="whitespace-nowrap"><strong className="text-white">NBFC MSME:</strong> 17.50% <span className="text-amber-400 text-[10px]">(Unsecured)</span></span>
              <span className="whitespace-nowrap"><strong className="text-white">Instant Apps:</strong> 32.00%+ <span className="text-rose-400 text-[10px]">(Usury Risk)</span></span>
            </div>
          </div>

          {/* Section 1: Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 text-xs font-semibold text-[#CFA5C1] shadow-inner">
              <Sparkles className="w-3.5 h-3.5 text-[#CFA5C1]" />
              <span>Independent Retail Credit Intelligence</span>
            </div>
            <h2 
              className="text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Every lender has an algorithm. <br />
              <span className="italic text-[#CFA5C1]">Now you have a Copilot.</span>
            </h2>
            <p className="text-neutral-400 text-base sm:text-lg leading-relaxed font-light max-w-2xl mx-auto">
              Lenders optimize for their origination commissions and yield spread. Borrower Copilot performs real-time counter-underwriting so you enter the branch with verified numbers.
            </p>
          </div>

          {/* Section 2: The 4 Core Decisions */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#CFA5C1] block mb-1">
                  Institutional Architecture
                </span>
                <h3 className="text-2xl sm:text-3xl font-semibold text-white">
                  The Four Decisions Every Borrower Deserves
                </h3>
              </div>
              <button
                onClick={onStartAssessment}
                className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-[#CFA5C1] hover:underline"
              >
                <span>Launch Assessment Engine</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card O1 */}
              <div className="group relative rounded-3xl p-8 bg-neutral-900/60 border border-neutral-800 hover:border-[#CFA5C1]/50 transition-all duration-300 shadow-xl hover:shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all" />
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-neutral-800 text-[#CFA5C1] border border-neutral-700">
                    Decision O1
                  </span>
                  <AlertOctagon className="w-6 h-6 text-amber-500" />
                </div>
                <h4 className="text-2xl font-semibold text-white mb-2 font-display">
                  Honest Verdict: Borrow / Don't / Borrow Less
                </h4>
                <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                  "Don't borrow" is a legitimate and often life-saving outcome. When a borrower carries 30%+ instant app loans with recent payment bounces, taking another personal loan is an existential trap.
                </p>
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-950/60 text-emerald-300 border border-emerald-800/50 font-bold">BORROW</span>
                  <span className="px-2.5 py-1 rounded-lg bg-amber-950/60 text-amber-300 border border-amber-800/50 font-bold">BORROW LESS</span>
                  <span className="px-2.5 py-1 rounded-lg bg-rose-950/60 text-rose-300 border border-rose-800/50 font-bold">DONT BORROW</span>
                </div>
              </div>

              {/* Card O2 */}
              <div className="group relative rounded-3xl p-8 bg-neutral-900/60 border border-neutral-800 hover:border-[#CFA5C1]/50 transition-all duration-300 shadow-xl hover:shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all" />
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-neutral-800 text-[#CFA5C1] border border-neutral-700">
                    Decision O2
                  </span>
                  <Scale className="w-6 h-6 text-emerald-400" />
                </div>
                <h4 className="text-2xl font-semibold text-white mb-2 font-display">
                  Dual Capacity: Sanction vs Safe Carry
                </h4>
                <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                  Lenders calculate 55-65% gross FOIR because they only care if their EMI clears. Borrower Copilot computes real free cash flow after rent, school fees, and a 20% untouchable living buffer.
                </p>
                <div className="p-3.5 rounded-xl bg-neutral-800/60 border border-neutral-700/60 flex items-center justify-between text-xs font-mono">
                  <div>
                    <span className="text-neutral-500 block text-[10px]">Lender Aggressive FOIR</span>
                    <span className="font-bold text-neutral-300">₹18.5L – ₹22.0L</span>
                  </div>
                  <div className="text-right">
                    <span className="text-emerald-400 block text-[10px] font-bold">★ Borrower Safe Carry</span>
                    <span className="font-bold text-emerald-300 text-sm">₹5.0L – ₹8.5L</span>
                  </div>
                </div>
              </div>

              {/* Card O3 */}
              <div className="group relative rounded-3xl p-8 bg-neutral-900/60 border border-neutral-800 hover:border-[#CFA5C1]/50 transition-all duration-300 shadow-xl hover:shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all" />
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-neutral-800 text-[#CFA5C1] border border-neutral-700">
                    Decision O3
                  </span>
                  <Percent className="w-6 h-6 text-[#CFA5C1]" />
                </div>
                <h4 className="text-2xl font-semibold text-white mb-2 font-display">
                  Fair Rate Bands & True All-In APR
                </h4>
                <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                  Never accept a point quote. We benchmark every loan to RBI Repo (6.50%) + fair spread, unmasking 2% processing fees and 18% GST into true annualized borrowing cost.
                </p>
                <div className="p-3.5 rounded-xl bg-neutral-800/60 border border-neutral-700/60 flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-400">RBI KFS Effective APR:</span>
                  <span className="font-bold text-white text-sm">10.94% – 12.19%</span>
                </div>
              </div>

              {/* Card O4 */}
              <div className="group relative rounded-3xl p-8 bg-neutral-900/60 border border-neutral-800 hover:border-[#CFA5C1]/50 transition-all duration-300 shadow-xl hover:shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl group-hover:bg-indigo-500/20 transition-all" />
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-neutral-800 text-[#CFA5C1] border border-neutral-700">
                    Decision O4
                  </span>
                  <TrendingDown className="w-6 h-6 text-indigo-400" />
                </div>
                <h4 className="text-2xl font-semibold text-white mb-2 font-display">
                  Monthly Ceiling & 3 Financial Stress Tests
                </h4>
                <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                  We test your monthly budget against three realistic financial shocks before you sign: an income slump (-20%), a floating repo hike (+200 bps), or a ₹40,000 sudden medical expense.
                </p>
                <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
                  <div className="p-2 rounded-lg bg-neutral-800 border border-neutral-700">
                    <span className="text-neutral-400 block">-20% Income</span>
                    <span className="text-emerald-400 font-bold">Survives</span>
                  </div>
                  <div className="p-2 rounded-lg bg-neutral-800 border border-neutral-700">
                    <span className="text-neutral-400 block">+2% Repo Hike</span>
                    <span className="text-emerald-400 font-bold">Absorbed</span>
                  </div>
                  <div className="p-2 rounded-lg bg-neutral-800 border border-neutral-700">
                    <span className="text-neutral-400 block">Medical Shock</span>
                    <span className="text-emerald-400 font-bold">Buffered</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Interactive Fast Loan Health Simulator Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-neutral-900/80 border border-neutral-800 shadow-2xl backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#CFA5C1]/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800 pb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="w-5 h-5 text-[#CFA5C1]" />
                    <h3 className="text-2xl sm:text-3xl font-semibold text-white font-display">
                      Interactive 5-Second Affordability Gauge
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-neutral-400">
                    Adjust your monthly income and requested amount to see how bank FOIR diverges from safe carry.
                  </p>
                </div>
                <span className="font-mono text-xs px-3 py-1 rounded-full bg-[#2A1F2C] text-[#CFA5C1] border border-[#4B2440] font-bold">
                  Instant Preview
                </span>
              </div>

              {/* Sliders Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
                {/* Income Slider */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-neutral-300">Net Monthly Inflow:</span>
                    <span className="font-mono font-bold text-lg text-white">₹{simIncome.toLocaleString('en-IN')}</span>
                  </div>
                  <input
                    type="range"
                    min="30000"
                    max="200000"
                    step="5000"
                    value={simIncome}
                    onChange={(e) => setSimIncome(Number(e.target.value))}
                    className="w-full accent-[#CFA5C1] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                    <span>₹30,000/mo</span>
                    <span>₹1,00,000/mo</span>
                    <span>₹2,00,000/mo</span>
                  </div>
                </div>

                {/* Loan Amount Slider */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-neutral-300">Requested Loan Principal:</span>
                    <span className="font-mono font-bold text-lg text-[#CFA5C1]">₹{(simLoanAsk / 100000).toFixed(1)} Lakhs</span>
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="2500000"
                    step="50000"
                    value={simLoanAsk}
                    onChange={(e) => setSimLoanAsk(Number(e.target.value))}
                    className="w-full accent-[#CFA5C1] cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                    <span>₹1.0 Lakh</span>
                    <span>₹12.0 Lakhs</span>
                    <span>₹25.0 Lakhs</span>
                  </div>
                </div>
              </div>

              {/* Results Comparison Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-neutral-800">
                <div className="p-4 rounded-2xl bg-neutral-800/50 border border-neutral-700/60 text-xs">
                  <span className="text-neutral-400 block mb-1">What Lender Aggressively Sanctions</span>
                  <div className="font-mono text-2xl font-bold text-neutral-300">
                    ₹{(simBankSanction / 100000).toFixed(1)} Lakhs
                  </div>
                  <span className="text-[10px] text-neutral-500">Gross 60% FOIR limit</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#2A1F2C]/60 border border-[#4B2440] text-xs">
                  <span className="text-[#CFA5C1] block mb-1 font-bold">★ What You Can Safely Carry</span>
                  <div className="font-mono text-2xl font-bold text-emerald-400">
                    ₹{(simSafeCarry / 100000).toFixed(1)} Lakhs
                  </div>
                  <span className="text-[10px] text-neutral-400">With living expenses & buffer protected</span>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-800/50 border border-neutral-700/60 text-xs flex flex-col justify-between">
                  <div>
                    <span className="text-neutral-400 block mb-1">Fair Interest Band (p.a.)</span>
                    <div className="font-mono text-xl font-bold text-white">
                      {simFairMinRate}% – {simFairMaxRate}%
                    </div>
                  </div>
                  <button
                    onClick={onStartAssessment}
                    className="mt-2 text-left text-xs font-semibold text-[#CFA5C1] hover:underline flex items-center gap-1"
                  >
                    <span>Run Deep Assessment →</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Three Canonical Case Studies (Cards Design) */}
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#CFA5C1] block mb-1">
                Verified Across Indian Credit Realities
              </span>
              <h3 
                className="text-3xl sm:text-4xl text-white font-medium"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Three borrowers, three distinct interventions
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PRESET_PROFILES.map((p) => {
                const profile = p.profile;
                return (
                  <div
                    key={p.id}
                    className="group rounded-3xl bg-neutral-900/80 border border-neutral-800 p-7 flex flex-col justify-between hover:border-[#CFA5C1]/50 hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-xl" />
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-400">
                          {profile.city} · {profile.employmentType.replace('_', ' ')}
                        </span>
                        <span className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded-full bg-neutral-800 text-[#CFA5C1] border border-neutral-700">
                          Age {profile.age}
                        </span>
                      </div>
                      
                      <h4 className="font-display text-3xl font-semibold mb-1 text-white">{profile.name}</h4>
                      <p className="text-xs text-neutral-400 mb-5">{profile.occupation}</p>
                      
                      <div className="space-y-2.5 text-xs py-4 border-y border-neutral-800 mb-5 font-mono">
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Net Monthly Inflow:</span>
                          <span className="font-medium text-white">₹{profile.netMonthlyIncome.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Existing EMIs:</span>
                          <span className="font-medium text-white">{profile.existingMonthlyEmis > 0 ? `₹${profile.existingMonthlyEmis.toLocaleString('en-IN')}` : 'None'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Credit Score:</span>
                          <span className="font-medium text-white">{profile.creditScoreBand.replace('_', ' ')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Requested Loan:</span>
                          <span className="font-semibold text-[#CFA5C1]">₹{(profile.requestedAmount / 100000).toFixed(1)} Lakhs</span>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-neutral-800/40 border border-neutral-700/50 text-xs text-neutral-300 mb-6 italic">
                        <strong>The Dilemma:</strong> Wants loan for {profile.loanPurpose.replace('_', ' ')}.
                      </div>
                    </div>

                    <button
                      onClick={() => onSelectProfile(profile)}
                      className="w-full py-3 px-4 rounded-xl bg-[#2A1F2C] text-[#CFA5C1] font-semibold text-xs hover:bg-[#CFA5C1] hover:text-black transition-all flex items-center justify-center gap-1.5 shadow-md group-hover:scale-[1.02]"
                    >
                      <span>Evaluate {profile.name}'s Case</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 5: Comparison Table (Bank vs Copilot) */}
          <div className="p-8 sm:p-10 rounded-3xl bg-neutral-900/60 border border-neutral-800 space-y-6">
            <div className="text-center max-w-2xl mx-auto mb-6">
              <h3 
                className="text-3xl text-white font-medium"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                What the Bank Conceals vs What Copilot Reveals
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-neutral-800 font-mono text-[11px] uppercase tracking-wider text-neutral-500">
                    <th className="p-3">Underwriting Parameter</th>
                    <th className="p-3 text-rose-400">Lender Default Practice</th>
                    <th className="p-3 text-emerald-400 font-bold">Borrower Copilot Counter-Model</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60 font-sans">
                  <tr>
                    <td className="p-3.5 font-semibold text-white">Affordability</td>
                    <td className="p-3.5 text-neutral-400">Aggressive 60% gross FOIR; pushes maximum debt principal for fees.</td>
                    <td className="p-3.5 text-emerald-300 font-medium">Real free cashflow after living expenses, rent & 20% safety cushion.</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-white">Interest Rate</td>
                    <td className="p-3.5 text-neutral-400">Fixed point quote (e.g. "14% flat rack rate"), hiding upfront fee drag.</td>
                    <td className="p-3.5 text-emerald-300 font-medium">Fair Repo-indexed band [Min%, Max%] + true RBI KFS All-In APR.</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-white">Collateral Routing</td>
                    <td className="p-3.5 text-neutral-400">Pushes 18-22% unsecured business loans for higher salesperson commissions.</td>
                    <td className="p-3.5 text-emerald-300 font-medium">Redirects unencumbered property to 9.5% LAP, saving ₹8.4L in interest.</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-white">Unknown Score</td>
                    <td className="p-3.5 text-neutral-400">Assumes subprime or defaults to highest rack rate tier.</td>
                    <td className="p-3.5 text-emerald-300 font-medium">Widens band honestly, preserves dignity, and explains how to tighten.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 6: Institutional Privacy Guarantee */}
          <div className="max-w-3xl mx-auto text-center p-8 sm:p-10 rounded-3xl bg-neutral-900/80 border border-neutral-800 shadow-2xl relative overflow-hidden">
            <div className="inline-flex p-3.5 rounded-2xl bg-[#2A1F2C] text-[#CFA5C1] mb-4">
              <Lock className="w-7 h-7" />
            </div>
            <h4 
              className="text-3xl text-white mb-2 font-medium"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Zero Bureau Hard Pulls. 100% In-Browser Memory.
            </h4>
            <p className="text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed">
              Unlike lead aggregator websites that sell your phone number to DSA call centers, Borrower Copilot executes all calculations inside your browser memory. No bureau inquiry is logged, and nothing touches a remote server.
            </p>
            <div className="mt-8">
              <button
                onClick={onStartAssessment}
                className="px-8 py-4 rounded-full bg-white text-black font-semibold text-sm hover:bg-white/90 transition-all shadow-xl hover:scale-105 active:scale-95"
              >
                Start Free Self-Assessment
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
