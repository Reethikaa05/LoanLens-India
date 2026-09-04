import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Sparkles, 
  CheckCircle2, 
  Zap,
  LockKeyhole
} from 'lucide-react';
import { PRESET_PROFILES } from '../engine/scenarios';
import { BorrowerProfile } from '../engine/types';

interface LoginPageProps {
  onBackToHome: () => void;
  onNavigateToSignup: () => void;
  onSelectProfile: (profile: BorrowerProfile) => void;
  onAuthenticate: (name: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onBackToHome,
  onNavigateToSignup,
  onSelectProfile,
  onAuthenticate,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [selectedPersonaId, setSelectedPersonaId] = useState<string | null>(null);

  const demoPersonas = [
    {
      id: 'priya',
      name: 'Priya Sharma',
      email: 'priya.bengaluru@copilot.in',
      password: 'Copilot@Priya2026',
      tag: 'Salaried ₹1.4L',
      profile: PRESET_PROFILES[0].profile
    },
    {
      id: 'ravi',
      name: 'Ravi Kumar',
      email: 'ravi.jaipur@copilot.in',
      password: 'Copilot@Ravi2026',
      tag: 'MSME ₹42L LAP',
      profile: PRESET_PROFILES[1].profile
    },
    {
      id: 'anita',
      name: 'Anita Roy',
      email: 'anita.delhi@copilot.in',
      password: 'Copilot@Anita2026',
      tag: 'Defense ₹85L',
      profile: PRESET_PROFILES[2].profile
    }
  ];

  const handleSelectDemo = (persona: typeof demoPersonas[0]) => {
    setEmail(persona.email);
    setPassword(persona.password);
    setSelectedPersonaId(persona.id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const matched = demoPersonas.find(p => p.email.toLowerCase() === email.trim().toLowerCase());
    if (matched) {
      onSelectProfile(matched.profile);
      onAuthenticate(matched.name);
    } else {
      const display = email ? email.split('@')[0] : 'Borrower';
      onAuthenticate(display);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0A070D] text-[#EEE6EA] flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] bg-emerald-900/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Main 2-Column Luxury Container */}
      <div className="relative z-10 w-full max-w-5xl bg-[#140F18]/90 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col lg:flex-row items-stretch">
        
        {/* LEFT COLUMN: Clean Direct Form */}
        <div className="w-full lg:w-1/2 p-6 sm:p-12 flex flex-col justify-between space-y-6">
          
          {/* Top Return Navigation */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-xs font-medium text-neutral-400 hover:text-white transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home</span>
            </button>
            
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[10px] font-mono text-neutral-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Dedicated Route: /login</span>
            </div>
          </div>

          {/* Editorial Title */}
          <div className="space-y-2">
            <h1 
              className="text-4xl sm:text-5xl text-white font-normal tracking-tight"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Hello Again!
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
              Welcome back to Borrower Copilot. Click a demo credential pill to auto-fill, then click Sign In.
            </p>
          </div>

          {/* 1-Click Demo Persona Credentials */}
          <div className="space-y-2.5 p-4 rounded-2xl bg-white/[0.03] border border-white/5 shadow-inner">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-neutral-300 font-medium">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>1-Click Demo Credentials:</span>
              </span>
              <span className="text-[10px] text-neutral-500 font-mono">Fills inputs below</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {demoPersonas.map((persona) => {
                const isSelected = selectedPersonaId === persona.id;
                return (
                  <button
                    key={persona.id}
                    type="button"
                    onClick={() => handleSelectDemo(persona)}
                    className={`p-2.5 rounded-xl text-left transition-all border cursor-pointer ${
                      isSelected
                        ? 'bg-purple-900/40 border-purple-400/80 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                        : 'bg-neutral-900/80 hover:bg-neutral-800 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <div className="font-semibold text-white text-xs truncate">
                      {persona.name.split(' ')[0]}
                    </div>
                    <div className="text-[10px] text-neutral-400 truncate">
                      {persona.tag}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-neutral-300 font-medium text-[11px]">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setSelectedPersonaId(null);
                  }}
                  placeholder="name@example.com"
                  className="w-full px-4 py-3.5 pl-11 rounded-xl border border-neutral-800 bg-neutral-900/90 text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-xs transition-all"
                />
                <Mail className="w-4 h-4 text-neutral-500 absolute left-4 top-3.5" />
              </div>
            </div>

            {/* Password Field with Eye Toggle */}
            <div className="space-y-1.5">
              <label className="block text-neutral-300 font-medium text-[11px]">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3.5 pl-11 pr-11 rounded-xl border border-neutral-800 bg-neutral-900/90 text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-xs transition-all font-mono"
                />
                <Lock className="w-4 h-4 text-neutral-500 absolute left-4 top-3.5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-3.5 text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Recovery */}
            <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-neutral-700 bg-neutral-900 text-purple-600 focus:ring-0 cursor-pointer accent-purple-500"
                />
                <span>Remember me</span>
              </label>
              <a 
                href="#recovery"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Demo recovery: Simply select one of the 1-Click Demo Credentials above to reload your credentials.");
                }}
                className="hover:underline text-neutral-400 hover:text-purple-300 transition-colors"
              >
                Recovery Password
              </a>
            </div>

            {/* Primary Sign In Button */}
            <button
              type="submit"
              className="w-full py-4 px-4 rounded-xl bg-[#522543] hover:bg-[#682F55] text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-[0_4px_25px_rgba(82,37,67,0.45)] hover:shadow-[0_4px_30px_rgba(104,47,85,0.7)] cursor-pointer"
            >
              Sign In
            </button>
          </form>

          {/* Route Switcher to Sign Up */}
          <div className="pt-2 text-center text-xs text-neutral-400">
            <p>
              Don't have an account yet?{' '}
              <button
                type="button"
                onClick={onNavigateToSignup}
                className="text-[#F59E0B] font-semibold hover:underline cursor-pointer ml-1"
              >
                Sign Up →
              </button>
            </p>
          </div>

          {/* Guest Direct Access */}
          <div className="pt-3 border-t border-neutral-800/80 text-center">
            <button
              type="button"
              onClick={() => onAuthenticate('Guest Borrower')}
              className="text-[11px] font-medium text-neutral-400 hover:text-[#F59E0B] transition-colors cursor-pointer"
            >
              Continue as Guest (100% In-Browser Memory) →
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Updated Looping Video Showcase (/showcase-interface.mp4) */}
        <div className="hidden lg:flex lg:w-1/2 p-5 relative items-stretch">
          <div className="relative w-full h-full min-h-[580px] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-neutral-950 flex flex-col justify-between">
            {/* Looping Counter-Underwriting Interface Video */}
            <video
              src="/showcase-interface.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Dark Cinematic Vignette & Bottom Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/40 pointer-events-none" />

            {/* Top Brand Pill */}
            <div className="relative z-10 p-7">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-cyan-500/30 text-xs font-mono text-cyan-300 shadow-lg">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>Real-Time Counter-Underwriting</span>
              </div>
            </div>

            {/* Bottom Ambient Typography */}
            <div className="relative z-10 p-8 space-y-3">
              <h3 
                className="text-3xl lg:text-4xl text-white font-normal tracking-tight leading-snug"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Finally, all your credit leverage in one place.
              </h3>
              <p className="text-neutral-300 text-xs font-light leading-relaxed">
                Reverse-engineer lender algorithms, enforce fair Repo-indexed spreads, and safeguard your household from predatory underwriting traps.
              </p>
              
              <div className="pt-2 flex items-center gap-4 text-[10px] font-mono text-neutral-400">
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Zero Bureau Hard Pulls
                </span>
                <span>·</span>
                <span className="flex items-center gap-1 text-cyan-300">
                  <LockKeyhole className="w-3 h-3" /> Client-Side Memory
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
