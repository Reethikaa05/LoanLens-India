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
  ChevronDown
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
  const [subscribed, setSubscribed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fadingOutRef = useRef<boolean>(false);
  const animationFrameRef = useRef<number | null>(null);

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

    // Initial trigger if already loaded
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
    setSubscribed(true);
    setTimeout(() => {
      onOpenAuth('signup');
    }, 600);
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
      {/* CINEMATIC HERO SECTION                                                    */}
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
          {/* Subtle dark vignette overlay */}
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

              {/* Center Links (md: visible) */}
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
          {/* Main Heading with Instrument Serif font */}
          <h1
            className="text-5xl md:text-6xl lg:text-7xl text-white mb-8 tracking-tight whitespace-nowrap"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Built for the curious
          </h1>

          {/* Email bar & subtitle container */}
          <div className="max-w-xl w-full space-y-4">
            {/* Email input bar with liquid-glass */}
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

            {/* Subtitle text */}
            <p className="text-white text-sm leading-relaxed px-4 font-normal opacity-90">
              Stay updated with the latest news and insights. Subscribe to our newsletter today and never miss out on exciting updates.
            </p>

            {/* Manifesto / Launch Copilot button */}
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
      {/* EXTENDED CREDIT INTELLIGENCE PLATFORM SECTION                             */}
      {/* ========================================================================= */}
      <div id="platform-overview" className="bg-[#17121A] text-[#EEE6EA] border-t border-[#33293A] transition-colors py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2A1F2C] border border-[#4B2440] text-xs font-semibold text-[#CFA5C1] mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Institutional Counter-Underwriting Core</span>
            </div>
            <h2 
              className="text-4xl sm:text-5xl lg:text-6xl text-white mb-4 tracking-tight"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Every lender has an algorithm. Now you have a Copilot.
            </h2>
            <p className="text-neutral-400 text-base sm:text-lg leading-relaxed font-light">
              An Indian borrower walks into a branch blind, gets quoted a rack rate, and finds out three years later they paid four points over fair. 
              Borrower Copilot answers four critical questions before you speak with a loan officer.
            </p>
          </div>

          {/* Key Stat Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-xl bg-neutral-900 border border-[#33293A] shadow-sm">
              <span className="font-mono text-2xl font-bold text-[#CFA5C1]">0</span>
              <p className="text-xs text-[#A99DA5] mt-1 font-medium">Bureau Hard Inquiries & Zero Data Stored</p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900 border border-[#33293A] shadow-sm">
              <span className="font-mono text-2xl font-bold text-[#CFA5C1]">6.50%</span>
              <p className="text-xs text-[#A99DA5] mt-1 font-medium">RBI Repo Benchmark Anchor Reference</p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900 border border-[#33293A] shadow-sm">
              <span className="font-mono text-2xl font-bold text-[#CFA5C1]">3 - 8%</span>
              <p className="text-xs text-[#A99DA5] mt-1 font-medium">Interest Saved by Collateral Routing</p>
            </div>
            <div className="p-4 rounded-xl bg-neutral-900 border border-[#33293A] shadow-sm">
              <span className="font-mono text-2xl font-bold text-[#CFA5C1]">1 Card</span>
              <p className="text-xs text-[#A99DA5] mt-1 font-medium">Pocket Negotiation Battle Card for Branch</p>
            </div>
          </div>

          {/* The Four Core Outputs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-neutral-900 border border-[#33293A] hover:border-[#CFA5C1]/40 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#2A1F2C] text-[#CFA5C1]">
                  Decision O1
                </span>
                <AlertOctagon className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2 font-display">Borrow / Don't Borrow / Borrow Less</h3>
              <p className="text-sm text-[#A99DA5] leading-relaxed mb-4">
                "Don't borrow" is a legitimate and often life-saving outcome. We evaluate purpose, predatory app debt, and living cushions. If you are taking â‚¹8L for a wedding or 30%+ app debt, we say stop or downsize.
              </p>
              <div className="text-xs font-mono text-neutral-400 bg-neutral-800 p-2.5 rounded-lg border border-neutral-700">
                Includes single-sentence rationale + exact downsized ceiling.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-900 border border-[#33293A] hover:border-[#CFA5C1]/40 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#2A1F2C] text-[#CFA5C1]">
                  Decision O2
                </span>
                <Scale className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 font-display">Lender Sanction vs Safe Carry</h3>
              <p className="text-sm text-[#A99DA5] leading-relaxed mb-4">
                A bank FOIR model ignores rent, school fees, and medical cushions. We display two separate numbers: what the lender will happily sanction, and what you can safely carry without starving your savings.
              </p>
              <div className="text-xs font-mono text-neutral-400 bg-neutral-800 p-2.5 rounded-lg border border-neutral-700">
                Clear visual delta showing which number to respect and why.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-900 border border-[#33293A] hover:border-[#CFA5C1]/40 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#2A1F2C] text-[#CFA5C1]">
                  Decision O3
                </span>
                <Percent className="w-5 h-5 text-[#CFA5C1]" />
              </div>
              <h3 className="text-xl font-semibold mb-2 font-display">Fair Rate Band & True All-In APR</h3>
              <p className="text-sm text-[#A99DA5] leading-relaxed mb-4">
                Never accept a point quote. We compute the fair interest band based on Repo + risk spread, and calculate RBI-compliant All-In APR by unmasking 2% processing fees and 18% GST.
              </p>
              <div className="text-xs font-mono text-neutral-400 bg-neutral-800 p-2.5 rounded-lg border border-neutral-700">
                Confidence widens honestly when score is unknown (never assumed 300).
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-900 border border-[#33293A] hover:border-[#CFA5C1]/40 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#2A1F2C] text-[#CFA5C1]">
                  Decision O4
                </span>
                <TrendingDown className="w-5 h-5 text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 font-display">Monthly EMI Ceiling & 3 Stress Tests</h3>
              <p className="text-sm text-[#A99DA5] leading-relaxed mb-4">
                Your maximum safe monthly outflow. Includes interactive tenure trade-offs (12 to 84 months) and three realistic stress tests: a 20% income slump, a 200 bps floating rate hike, or an emergency health shock.
              </p>
              <div className="text-xs font-mono text-neutral-400 bg-neutral-800 p-2.5 rounded-lg border border-neutral-700">
                Instant feedback: Does your monthly cashflow survive the shock?
              </div>
            </div>
          </div>

          {/* Three Borrowers Showcase */}
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[#CFA5C1] block mb-1">
                Verified Across Indian Realities
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
                    className="rounded-2xl bg-neutral-900 border border-[#33293A] p-6 flex flex-col justify-between hover:border-[#CFA5C1]/50 transition-all shadow-md"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#A99DA5]">
                          {profile.city} Â· {profile.employmentType.replace('_', ' ')}
                        </span>
                        <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[#2A1F2C] text-[#CFA5C1]">
                          Age {profile.age}
                        </span>
                      </div>
                      <h4 className="font-display text-2xl font-semibold mb-1 text-white">{profile.name}</h4>
                      <p className="text-xs text-[#A99DA5] mb-4">{profile.occupation}</p>
                      
                      <div className="space-y-2 text-xs py-3 border-y border-[#33293A] mb-4 font-mono">
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Net Monthly:</span>
                          <span className="font-medium text-white">â‚¹{profile.netMonthlyIncome.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-500">Requested:</span>
                          <span className="font-semibold text-[#CFA5C1]">â‚¹{(profile.requestedAmount / 100000).toFixed(1)} Lakhs</span>
                        </div>
                      </div>

                      <p className="text-xs text-neutral-300 italic mb-4">
                        Purpose: {profile.loanPurpose.replace('_', ' ')}
                      </p>
                    </div>

                    <button
                      onClick={() => onSelectProfile(profile)}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#2A1F2C] text-[#CFA5C1] font-semibold text-xs hover:bg-[#CFA5C1] hover:text-black transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Evaluate {profile.name}'s Case</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Privacy Guarantee */}
          <div className="max-w-3xl mx-auto text-center p-8 rounded-2xl bg-neutral-900/60 border border-[#33293A]">
            <div className="inline-flex p-3 rounded-xl bg-[#2A1F2C] text-[#CFA5C1] mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h4 
              className="text-2xl text-white mb-2"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Zero Bureau Hard Pulls. 100% Client-Side Privacy.
            </h4>
            <p className="text-sm text-[#A99DA5] max-w-xl mx-auto leading-relaxed">
              Unlike credit aggregator apps that sell your phone number to DSA call centers, Borrower Copilot executes all calculations inside your browser memory. No data is stored, and no bureau footprint is generated.
            </p>
            <div className="mt-6">
              <button
                onClick={onStartAssessment}
                className="px-8 py-3.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-white/90 transition-all shadow-lg"
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

