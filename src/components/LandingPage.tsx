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
  FileText,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Video,
  Sliders,
  Shield,
  Layers,
  Check,
  ExternalLink,
  Eye,
  RefreshCw
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

  // Interactive Feature Tab State (Matching Left Card in screenshot)
  const [activeTab, setActiveTab] = useState<'safecarry' | 'reporate' | 'zeroprepay' | 'kfsapr' | 'stresstest'>('safecarry');

  // Video Container Interactive State (The empty box ready for adding video)
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [showUrlInput, setShowUrlInput] = useState<boolean>(false);
  const [customVideoInput, setCustomVideoInput] = useState<string>('');

  // Feature pill definitions matching "100% Electric" style card
  const TAB_DATA = {
    safecarry: {
      label: 'Safe Carry',
      title: 'Free Cashflow Safe Carry',
      tagline: 'Living Costs Protected',
      description: 'Lenders aggressively push 60% gross FOIR because their balance-sheet risk is diversified over millions of accounts. We counter-underwrite from your disposable cash flow after rent, school fees, and a 20% untouchable reserve.',
      metric1: { label: 'Bank Gross FOIR', value: '₹18.5L – ₹22.0L' },
      metric2: { label: 'Borrower Safe Carry', value: '₹6.5L – ₹8.5L' }
    },
    reporate: {
      label: 'Repo Spread',
      title: 'Repo Rate Anchored Spread',
      tagline: 'Transparent Markups',
      description: 'Never accept an arbitrary point quote. Retail credit must be indexed to RBI Repo rate (6.50%) + a justified risk spread, unmasking when a bank levies an unfair 450 bps spread on prime borrowers.',
      metric1: { label: 'RBI Repo Anchor', value: '6.50% Base' },
      metric2: { label: 'Prime Fair Spread', value: '+3.80% to +4.20%' }
    },
    zeroprepay: {
      label: '0% Foreclosure',
      title: 'Statutory Prepayment Freedom',
      tagline: 'RBI Master Direction',
      description: 'Per RBI Master Directions, floating rate retail term loans to individual borrowers cannot carry foreclosure charges or partial prepayment penalties. We enforce this clause in your pre-closing battle card.',
      metric1: { label: 'Floating Penalty', value: '0.00% Statutory' },
      metric2: { label: 'Borrower Liquidity', value: '100% Flexible' }
    },
    kfsapr: {
      label: 'KFS APR',
      title: 'True All-In Annual Cost',
      tagline: 'Zero Hidden Fees',
      description: 'A 10.50% point quote conceals 2.5% processing fees, documentation charges, and 18% GST. Copilot computes your true annualized borrowing cost per mandatory RBI Key Fact Statement guidelines.',
      metric1: { label: 'Advertised Rate', value: '10.50% p.a.' },
      metric2: { label: 'True KFS APR', value: '12.19% p.a.' }
    },
    stresstest: {
      label: 'Stress Shield',
      title: '3-Factor Financial Resilience',
      tagline: 'Triple Shock Tested',
      description: 'Before taking on debt, Copilot tests your monthly obligations against an unexpected 20% income reduction, a 200 bps floating repo spike, or a ₹40,000 emergency medical expense.',
      metric1: { label: 'Income Shock (-20%)', value: 'Solvent & Stable' },
      metric2: { label: 'Repo Spike (+200bps)', value: 'EMI Buffered' }
    }
  };

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
      {/* EDITORIAL TRANSITION STATEMENT (MATCHING REFERENCE SCREENSHOT)             */}
      {/* ========================================================================= */}
      <section id="platform-overview" className="bg-black pt-28 pb-20 px-6 text-center relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-gradient-to-r from-purple-900/10 via-[#CFA5C1]/10 to-amber-900/10 blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 space-y-6">
          <h2 
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] text-white font-normal tracking-tight leading-[1.12]"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            So you can borrow with leverage,<br /> anywhere.
          </h2>
          <p className="text-neutral-400 text-base sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Lenders calibrate underwriting algorithms to maximize gross loan volume and fee margins. Borrower Copilot puts institutional counter-underwriting in your hands before you enter the branch.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2-COLUMN BENTO SHOWCASE (MATCHING THE SCREENSHOT'S 2-CARD LAYOUT)         */}
      {/* ========================================================================= */}
      <section className="bg-black pb-28 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* ------------------------------------------------------------------- */}
            {/* LEFT CARD: Feature Bento (100% Borrower Protected)                  */}
            {/* ------------------------------------------------------------------- */}
            <div className="rounded-[2.5rem] bg-[#0C0B10] border border-neutral-800/90 p-8 sm:p-12 flex flex-col justify-between shadow-2xl relative overflow-hidden group hover:border-[#CFA5C1]/40 transition-all duration-500 min-h-[500px]">
              {/* Radial gradient background highlight */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#CFA5C1]/10 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                {/* Top Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/90 border border-neutral-800 text-[11px] font-mono text-[#CFA5C1]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#CFA5C1]" />
                  <span>Institutional Counter-Model</span>
                </div>

                {/* Editorial Title */}
                <div>
                  <h3 
                    className="text-4xl sm:text-5xl text-white font-normal tracking-tight mb-3"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    100% Borrower Protected
                  </h3>
                  <p className="text-neutral-400 text-sm sm:text-base font-light leading-relaxed">
                    No more predatory fee traps, aggressive 60% gross FOIR debt ceilings, or point quote illusions. Borrower Copilot protects your true disposable free cashflow.
                  </p>
                </div>

                {/* Interactive Filter / Pill Chips */}
                <div className="pt-2">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {(Object.keys(TAB_DATA) as Array<keyof typeof TAB_DATA>).map((key) => {
                      const isActive = activeTab === key;
                      return (
                        <button
                          key={key}
                          onClick={() => setActiveTab(key)}
                          className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                            isActive
                              ? 'bg-white text-black font-semibold shadow-md scale-105'
                              : 'bg-neutral-900 text-neutral-400 border border-neutral-800 hover:text-white hover:bg-neutral-800/80'
                          }`}
                        >
                          {TAB_DATA[key].label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Tab Dynamic Description & Metrics Box */}
                  <div className="p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800/80 backdrop-blur-md space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-white text-sm">
                          {TAB_DATA[activeTab].title}
                        </span>
                        <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-full bg-neutral-800 text-[#CFA5C1] border border-neutral-700 font-bold">
                          {TAB_DATA[activeTab].tagline}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400 leading-relaxed font-light">
                        {TAB_DATA[activeTab].description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2 border-t border-neutral-800 font-mono text-xs">
                      <div className="p-3 rounded-xl bg-neutral-800/50 border border-neutral-700/50">
                        <span className="text-[10px] text-neutral-500 block">
                          {TAB_DATA[activeTab].metric1.label}
                        </span>
                        <span className="font-bold text-neutral-300 text-sm">
                          {TAB_DATA[activeTab].metric1.value}
                        </span>
                      </div>
                      <div className="p-3 rounded-xl bg-[#2A1F2C]/60 border border-[#4B2440]">
                        <span className="text-[10px] text-[#CFA5C1] block font-bold">
                          ★ {TAB_DATA[activeTab].metric2.label}
                        </span>
                        <span className="font-bold text-emerald-400 text-sm">
                          {TAB_DATA[activeTab].metric2.value}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button at Bottom */}
              <div className="relative z-10 pt-8 mt-auto">
                <button
                  onClick={onStartAssessment}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 hover:border-white/40 text-sm font-medium transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group/btn"
                >
                  <span>Explore Borrower Flow</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>

            {/* ------------------------------------------------------------------- */}
            {/* RIGHT CARD: Dedicated Video Showcase Box                            */}
            {/* (Empty Box Ready for Video Embed as specifically requested)         */}
            {/* ------------------------------------------------------------------- */}
            <div className="rounded-[2.5rem] bg-[#07060A] border border-neutral-800/90 overflow-hidden relative p-6 sm:p-10 flex flex-col justify-between shadow-2xl group hover:border-[#CFA5C1]/40 transition-all duration-500 min-h-[500px]">
              
              {/* Ethereal Twilight Sky + Warm Campfire Glow (Matching Screenshot Artwork) */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0C0A16] via-[#080710] to-[#140C0E]" />
                {/* Radiant warm amber glow at bottom right */}
                <div className="absolute -bottom-16 -right-16 w-96 h-96 bg-gradient-to-tl from-amber-500/25 via-orange-600/15 to-transparent rounded-full blur-3xl" />
                {/* Subtle cosmic night stars */}
                <div className="absolute top-8 left-12 w-1 h-1 bg-white/70 rounded-full blur-[0.5px]" />
                <div className="absolute top-16 right-20 w-1.5 h-1.5 bg-white/80 rounded-full blur-[0.5px]" />
                <div className="absolute top-24 left-1/2 w-1 h-1 bg-amber-200/60 rounded-full" />
                <div className="absolute top-12 right-1/3 w-1 h-1 bg-purple-200/50 rounded-full" />
                <div className="absolute bottom-28 left-20 w-1.5 h-1.5 bg-orange-300/40 rounded-full blur-[0.5px]" />
              </div>

              {/* Card Top Header */}
              <div className="relative z-10 flex items-center justify-between gap-2 border-b border-neutral-800/80 pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span className="font-mono text-xs font-bold text-neutral-300 uppercase tracking-wider">
                    Video Showcase Frame
                  </span>
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-neutral-800/90 text-[10px] font-mono text-[#CFA5C1] border border-neutral-700">
                    16:9 4K Ready
                  </span>
                </div>

                <button
                  onClick={() => setShowUrlInput(!showUrlInput)}
                  className="text-[11px] font-mono text-neutral-400 hover:text-white px-3 py-1 rounded-full bg-neutral-800/70 hover:bg-neutral-800 border border-neutral-700/60 transition-colors flex items-center gap-1.5"
                >
                  <Video className="w-3.5 h-3.5 text-[#CFA5C1]" />
                  <span>{showUrlInput ? 'Close' : 'Load Video URL'}</span>
                </button>
              </div>

              {/* Optional Custom Video URL Input Bar */}
              {showUrlInput && (
                <div className="relative z-20 my-3 p-3 rounded-2xl bg-neutral-900/95 border border-neutral-700/80 shadow-2xl flex items-center gap-2">
                  <input
                    type="url"
                    value={customVideoInput}
                    onChange={(e) => setCustomVideoInput(e.target.value)}
                    placeholder="Paste MP4 or video embed URL..."
                    className="flex-1 bg-black/70 border border-neutral-700 rounded-xl px-3 py-2 text-xs text-white placeholder:text-neutral-500 outline-none focus:border-[#CFA5C1]"
                  />
                  <button
                    onClick={() => {
                      if (customVideoInput) setVideoUrl(customVideoInput);
                      setShowUrlInput(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-all shrink-0"
                  >
                    Embed
                  </button>
                </div>
              )}

              {/* ========================================================================= */}
              {/* DEDICATED EMPTY VIDEO BOX: Slot for adding custom video files or embeds   */}
              {/* Replace this placeholder with your <video> tag or video embed code        */}
              {/* ========================================================================= */}
              <div className="relative z-10 my-4 flex-1 flex flex-col justify-center">
                {videoUrl ? (
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-neutral-700 shadow-2xl bg-black">
                    <video 
                      src={videoUrl} 
                      controls 
                      autoPlay 
                      className="w-full h-full object-cover"
                    />
                    <button 
                      onClick={() => setVideoUrl('')}
                      className="absolute top-2 right-2 px-2.5 py-1 rounded-full bg-black/80 text-white text-[10px] font-mono hover:bg-black"
                    >
                      Clear Video
                    </button>
                  </div>
                ) : (
                  /* High-craft Empty Video Box */
                  <div className="relative w-full aspect-video rounded-2xl border-2 border-dashed border-neutral-700/80 hover:border-[#CFA5C1]/70 bg-black/60 backdrop-blur-md overflow-hidden flex flex-col items-center justify-center p-6 text-center group/videobox transition-all duration-300">
                    {/* Ambient subtle glow inside video box */}
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 via-transparent to-transparent pointer-events-none" />

                    {/* Prominent Liquid Glass Play Button */}
                    <div 
                      onClick={() => setShowUrlInput(true)}
                      className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 backdrop-blur-xl flex items-center justify-center text-white shadow-[0_0_40px_rgba(207,165,193,0.3)] transition-all duration-300 group-hover/videobox:scale-110 cursor-pointer mb-3 relative z-10"
                    >
                      <Play className="w-8 h-8 fill-white text-white translate-x-0.5" />
                    </div>

                    <h4 
                      className="text-2xl sm:text-3xl text-white font-medium mb-1 tracking-tight"
                      style={{ fontFamily: "'Instrument Serif', serif" }}
                    >
                      Drop or Embed Your Video Here
                    </h4>
                    <p className="text-xs text-neutral-400 max-w-sm font-light leading-relaxed mb-4">
                      Dedicated container configured for product walkthrough, customer case story, or engine demo.
                    </p>

                    {/* Video Slot Specs */}
                    <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-[10px] text-neutral-400">
                      <span className="px-2.5 py-0.5 rounded-md bg-neutral-800/80 border border-neutral-700/60">MP4 / WebM</span>
                      <span className="px-2.5 py-0.5 rounded-md bg-neutral-800/80 border border-neutral-700/60">1080p 60fps</span>
                      <span className="px-2.5 py-0.5 rounded-md bg-neutral-800/80 border border-neutral-700/60">Stereo Sound</span>
                      <span className="px-2.5 py-0.5 rounded-md bg-neutral-800/80 border border-neutral-700/60">Zero Latency</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Details Strip */}
              <div className="relative z-10 pt-4 border-t border-neutral-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <span className="font-semibold text-white block text-sm">Underwriting Walkthrough</span>
                  <span className="text-neutral-400 text-[11px]">How the counter-model reverses bank FOIR traps</span>
                </div>
                <button
                  onClick={onStartAssessment}
                  className="px-5 py-2.5 rounded-full bg-[#2A1F2C] hover:bg-[#3D2C40] text-[#CFA5C1] font-semibold text-xs border border-[#4B2440] transition-all flex items-center gap-1.5 shadow-md hover:scale-105"
                >
                  <span>Run Live Simulator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* EXTENDED IMPRESSIVE PLATFORM DESIGN (COMPREHENSIVE FINANCIAL ENGINE)      */}
      {/* ========================================================================= */}
      <div className="bg-[#0B090E] text-[#EEE6EA] border-t border-neutral-800/80 transition-colors py-24 relative overflow-hidden">
        
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

          {/* Section 1: The 4 Core Decisions (Institutional Architecture) */}
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

          {/* Section 2: Interactive Fast Loan Health Simulator Card */}
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

          {/* Section 3: Three Canonical Case Studies (Cards Design) */}
          <div id="case-studies-section" className="space-y-8">
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

          {/* Section 4: Comparison Table (Bank vs Copilot) */}
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

          {/* Section 5: Institutional Privacy Guarantee */}
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
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* CINEMATIC BOTTOM BANNER: "JOIN THE RIDE" (MATCHING SCREENSHOT AESTHETIC)   */}
      {/* ========================================================================= */}
      <section className="relative py-28 sm:py-36 px-6 overflow-hidden bg-black text-center border-t border-neutral-800/80">
        {/* Ethereal Glowing Radiant Mesh (Volcanic amber & deep cosmos) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2D0F21] via-[#120815] to-black opacity-95 pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1100px] h-[450px] bg-gradient-to-t from-[#E05338]/30 via-[#9A2D87]/25 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[850px] h-[350px] bg-gradient-to-r from-amber-500/35 via-rose-500/25 to-purple-700/30 blur-2xl pointer-events-none rounded-full" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[#E5B5D5] block">
            STARTING WITH ZERO BUREAU INQUIRY
          </span>

          <h2 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-normal tracking-tight leading-[1.08]"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Join the ride.
          </h2>

          <p className="text-neutral-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed opacity-90">
            Run your credit counter-assessment today with 100% in-browser privacy. No hard credit inquiries, zero DSA sales spam, and instant RBI repo audits before you sign.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStartAssessment}
              className="px-8 py-4 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-100 transition-all shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <span>Launch Copilot Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('case-studies-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="liquid-glass px-8 py-4 rounded-full text-white text-sm font-medium hover:bg-white/10 transition-all flex items-center gap-2 shadow-lg"
            >
              <span>Explore Case Studies</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* PROFESSIONAL FOOTER                                                       */}
      {/* ========================================================================= */}
      <footer className="bg-black border-t border-neutral-900 py-12 px-6 text-xs text-neutral-500 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-white" />
            <span className="text-white font-semibold text-sm tracking-tight">Borrower Copilot</span>
            <span className="text-neutral-600">|</span>
            <span>Independent Retail Credit Intelligence</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#features" onClick={(e) => { e.preventDefault(); scrollToContent(); }} className="hover:text-white transition-colors">Architecture</a>
            <a href="#cases" onClick={(e) => { e.preventDefault(); document.getElementById('case-studies-section')?.scrollIntoView({ behavior: 'smooth' }); }} className="hover:text-white transition-colors">Case Studies</a>
            <button onClick={() => onOpenAuth('signin')} className="hover:text-white transition-colors">Account Access</button>
            <span className="text-neutral-700">•</span>
            <span className="text-neutral-400">Compliant with RBI Master Directions 2024</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
