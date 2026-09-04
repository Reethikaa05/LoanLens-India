import React, { useState, useEffect } from 'react';
import { 
  X, 
  ArrowLeft, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  LogOut 
} from 'lucide-react';
import { PRESET_PROFILES } from '../engine/scenarios';
import { BorrowerProfile } from '../engine/types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProfile: (profile: BorrowerProfile) => void;
  onAuthenticate: (name: string) => void;
  onLogout?: () => void;
  isAuthenticated?: boolean;
  userName?: string;
  initialTab?: 'signin' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSelectProfile,
  onAuthenticate,
  onLogout,
  isAuthenticated = false,
  userName = 'Guest',
  initialTab = 'signin'
}) => {
  const [tab, setTab] = useState<'signin' | 'signup'>(initialTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [selectedPersonaId, setSelectedPersonaId] = useState<string | null>(null);

  useEffect(() => {
    if (initialTab) {
      setTab(initialTab);
    }
  }, [initialTab, isOpen]);

  if (!isOpen) return null;

  // Demo credential data mapping
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

  // Auto-fill demo credentials into form (does NOT auto-submit; user clicks Sign In)
  const handleSelectDemo = (persona: typeof demoPersonas[0]) => {
    setEmail(persona.email);
    setPassword(persona.password);
    setSelectedPersonaId(persona.id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if matching a demo persona to set the active profile
    const matched = demoPersonas.find(p => p.email.toLowerCase() === email.trim().toLowerCase());
    if (matched) {
      onSelectProfile(matched.profile);
      onAuthenticate(matched.name);
    } else {
      const display = email ? email.split('@')[0] : (tab === 'signup' ? 'New Borrower' : 'Borrower');
      onAuthenticate(display);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl animate-fadeIn">
      {/* 2-Column Outer Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#140F18] text-[#EEE6EA] rounded-[2.2rem] shadow-[0_20px_70px_rgba(0,0,0,0.8)] border border-neutral-800/80 overflow-hidden flex flex-col md:flex-row items-stretch">
        
        {/* ================================================================= */}
        {/* LEFT COLUMN: Clean Form & Demo Autofill                            */}
        {/* ================================================================= */}
        <div className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col justify-between space-y-6">
          
          {/* Top Actions: Back to Home + Close button */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Home</span>
            </button>

            <button
              onClick={onClose}
              aria-label="Close modal"
              className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Heading (Matching Reference Screenshot) */}
          <div className="space-y-1.5">
            <h2 
              className="text-3xl sm:text-4xl text-white font-normal tracking-tight"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              {tab === 'signin' ? 'Hello Again!' : 'Join Borrower Copilot'}
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 font-light">
              {tab === 'signin' 
                ? "Welcome back. Select a demo persona or enter your credentials." 
                : "Create an autonomous credit assessment account in seconds."}
            </p>
          </div>

          {/* If already authenticated, show session banner with Log Out button */}
          {isAuthenticated && (
            <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-purple-200">
                  Logged in as <strong className="text-white">{userName}</strong>
                </span>
              </div>
              {onLogout && (
                <button
                  type="button"
                  onClick={() => {
                    onLogout();
                    onClose();
                  }}
                  className="inline-flex items-center gap-1 text-xs text-rose-300 hover:text-rose-200 hover:underline cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              )}
            </div>
          )}

          {/* 1-Click Demo Persona Autofill (Click to populate Email & Password) */}
          <div className="space-y-2 p-3.5 rounded-2xl bg-white/[0.03] border border-white/5">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-neutral-300 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>1-Click Demo Credentials:</span>
              </span>
              <span className="text-[10px] text-neutral-500">Auto-fills form</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {demoPersonas.map((persona) => {
                const isSelected = selectedPersonaId === persona.id;
                return (
                  <button
                    key={persona.id}
                    type="button"
                    onClick={() => handleSelectDemo(persona)}
                    className={`p-2 rounded-xl text-left transition-all border cursor-pointer ${
                      isSelected
                        ? 'bg-purple-900/40 border-purple-400/80 shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                        : 'bg-neutral-900/80 hover:bg-neutral-800 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <div className="font-semibold text-white text-[11px] truncate">
                      {persona.name.split(' ')[0]}
                    </div>
                    <div className="text-[9px] text-neutral-400 truncate">
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
                  className="w-full px-3.5 py-3 pl-10 rounded-xl border border-neutral-800 bg-neutral-900/90 text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-xs transition-all"
                />
                <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
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
                  className="w-full px-3.5 py-3 pl-10 pr-10 rounded-xl border border-neutral-800 bg-neutral-900/90 text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 text-xs transition-all font-mono"
                />
                <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-3.5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3.5 top-3.5 text-neutral-500 hover:text-neutral-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Recovery Password */}
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
                  alert("Demo recovery: Simply click any of the 1-Click Demo Credentials above to reload credentials.");
                }}
                className="hover:underline text-neutral-400 hover:text-purple-300 transition-colors"
              >
                Recovery Password
              </a>
            </div>

            {/* Submit Button (Sign In / Create Account) */}
            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-[#522543] hover:bg-[#682F55] text-white font-semibold text-xs tracking-wide transition-all shadow-[0_4px_20px_rgba(82,37,67,0.4)] hover:shadow-[0_4px_25px_rgba(104,47,85,0.6)] cursor-pointer"
            >
              {tab === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Toggle between Sign In / Sign Up */}
          <div className="pt-2 text-center text-xs text-neutral-400">
            {tab === 'signin' ? (
              <p>
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => setTab('signup')}
                  className="text-[#CFA5C1] font-semibold hover:underline cursor-pointer"
                >
                  Sign Up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setTab('signin')}
                  className="text-[#CFA5C1] font-semibold hover:underline cursor-pointer"
                >
                  Sign In
                </button>
              </p>
            )}
          </div>

          {/* Guest Direct Access (Zero Data Stored) */}
          <div className="pt-3 border-t border-neutral-800/80 text-center">
            <button
              type="button"
              onClick={() => {
                onAuthenticate('Guest Borrower');
                onClose();
              }}
              className="text-[11px] font-medium text-neutral-400 hover:text-[#CFA5C1] transition-colors cursor-pointer"
            >
              Continue as Guest (100% In-Browser Memory) →
            </button>
          </div>
        </div>

        {/* ================================================================= */}
        {/* RIGHT COLUMN: Video Showcase Card (Matching Reference Screenshot) */}
        {/* ================================================================= */}
        <div className="hidden md:flex md:w-1/2 p-4 sm:p-5 relative items-stretch">
          <div className="relative w-full h-full min-h-[540px] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-neutral-950 flex flex-col justify-between">
            {/* Auto-playing Looping Background Video */}
            <video
              src="/showcase-people.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Dark Cinematic Vignette & Bottom Text Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40 pointer-events-none" />

            {/* Top Brand Pill */}
            <div className="relative z-10 p-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono text-white/90">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Institutional Counter-Model</span>
              </div>
            </div>

            {/* Bottom Ambient Typography (Matching User Screenshot) */}
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
                  <CheckCircle2 className="w-3 h-3" /> Zero Bureau Queries
                </span>
                <span>·</span>
                <span>100% In-Browser</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthModal;
