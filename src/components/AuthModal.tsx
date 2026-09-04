import React, { useState, useEffect } from 'react';
import { X, UserCheck, ShieldCheck, Mail, Lock, Sparkles, CheckCircle2 } from 'lucide-react';
import { PRESET_PROFILES } from '../engine/scenarios';
import { BorrowerProfile } from '../engine/types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProfile: (profile: BorrowerProfile) => void;
  onAuthenticate: (name: string) => void;
  initialTab?: 'signin' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSelectProfile,
  onAuthenticate,
  initialTab = 'signin'
}) => {
  const [tab, setTab] = useState<'signin' | 'signup'>(initialTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (initialTab) {
      setTab(initialTab);
    }
  }, [initialTab, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = email ? email.split('@')[0] : 'Borrower';
    onAuthenticate(name);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#1F1822] text-[#EEE6EA] rounded-2xl shadow-2xl border border-[#33293A] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#33293A] bg-neutral-900">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#CFA5C1] text-black flex items-center justify-center font-display font-bold">
              As
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg leading-tight">Borrower Access</h3>
              <p className="text-[11px] text-[#A99DA5]">Asme & Borrower Copilot</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Quick Demo Persona Switcher (For Evaluators) */}
          <div className="bg-[#2A1F2C]/70 p-3.5 rounded-xl border border-[#4B2440]">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#CFA5C1] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>1-Click Evaluator Personas</span>
            </div>
            <p className="text-[11px] text-[#A99DA5] mb-3">
              Instant login as any of the three case study borrowers:
            </p>
            <div className="grid grid-cols-3 gap-2">
              {PRESET_PROFILES.map((p) => (
                <button
                  key={p.id}
                  onClick={() => {
                    onSelectProfile(p.profile);
                    onAuthenticate(p.profile.name);
                    onClose();
                  }}
                  className="px-2 py-2 text-center rounded-lg bg-neutral-800 border border-[#33293A] hover:border-[#CFA5C1] text-xs font-medium transition-all shadow-xs"
                >
                  <div className="font-semibold text-white">{p.profile.name}</div>
                  <div className="text-[10px] text-neutral-400 capitalize">{p.profile.city}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Form Tabs */}
          <div className="flex border-b border-[#33293A]">
            <button
              onClick={() => setTab('signin')}
              className={`flex-1 py-2 text-xs font-semibold text-center border-b-2 transition-colors ${
                tab === 'signin'
                  ? 'border-[#CFA5C1] text-[#CFA5C1]'
                  : 'border-transparent text-neutral-500 hover:text-neutral-300'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setTab('signup')}
              className={`flex-1 py-2 text-xs font-semibold text-center border-b-2 transition-colors ${
                tab === 'signup'
                  ? 'border-[#CFA5C1] text-[#CFA5C1]'
                  : 'border-transparent text-neutral-500 hover:text-neutral-300'
              }`}
            >
              Create Account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-medium mb-1 text-neutral-300">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. priya.bengaluru@example.com"
                  className="w-full px-3 py-2 pl-8 rounded-lg border border-[#33293A] bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-[#CFA5C1]"
                />
                <Mail className="w-4 h-4 text-neutral-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block font-medium mb-1 text-neutral-300">Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 pl-8 rounded-lg border border-[#33293A] bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-[#CFA5C1]"
                />
                <Lock className="w-4 h-4 text-neutral-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-[#CFA5C1] text-black font-semibold text-xs hover:bg-[#dfb9d3] transition-colors shadow-sm"
            >
              {tab === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Guest Direct Access (Zero Data Stored) */}
          <div className="pt-2 text-center border-t border-[#33293A]">
            <p className="text-[11px] text-[#A99DA5] mb-2">
              Privacy-first guarantee:
            </p>
            <button
              onClick={() => {
                onAuthenticate('Guest Borrower');
                onClose();
              }}
              className="text-xs font-semibold text-[#CFA5C1] hover:underline"
            >
              Continue as Guest (100% In-Browser Memory) →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
