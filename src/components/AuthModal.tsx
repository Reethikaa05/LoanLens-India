import React, { useState } from 'react';
import { X, UserCheck, ShieldCheck, Mail, Lock, Sparkles, CheckCircle2 } from 'lucide-react';
import { PRESET_PROFILES } from '../engine/scenarios';
import { BorrowerProfile } from '../engine/types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProfile: (profile: BorrowerProfile) => void;
  onAuthenticate: (name: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSelectProfile,
  onAuthenticate
}) => {
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = email ? email.split('@')[0] : 'Borrower';
    onAuthenticate(name);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-[#FBF9FA] dark:bg-[#1F1822] rounded-2xl shadow-2xl border border-[#E2D9DE] dark:border-[#33293A] overflow-hidden text-[#221A20] dark:text-[#EEE6EA]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#E2D9DE] dark:border-[#33293A] bg-white dark:bg-neutral-900">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#4B2440] dark:bg-[#CFA5C1] text-white dark:text-black flex items-center justify-center font-display font-semibold">
              Lc
            </div>
            <div>
              <h3 className="font-display font-semibold text-lg leading-tight">Borrower Access</h3>
              <p className="text-[11px] text-[#6E6069] dark:text-[#A99DA5]">Borrower Copilot Portal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Quick Demo Persona Switcher (For Evaluators) */}
          <div className="bg-[#EFE3EA]/60 dark:bg-[#2A1F2C]/70 p-3.5 rounded-xl border border-[#DFC2D5] dark:border-[#4B2440]">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#4B2440] dark:text-[#CFA5C1] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>1-Click Evaluator Personas</span>
            </div>
            <p className="text-[11px] text-[#6E6069] dark:text-[#A99DA5] mb-3">
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
                  className="px-2 py-1.5 text-center rounded-lg bg-white dark:bg-neutral-800 border border-[#E2D9DE] dark:border-[#33293A] hover:border-[#4B2440] text-xs font-medium transition-all shadow-xs"
                >
                  <div className="font-semibold text-[#221A20] dark:text-[#EEE6EA]">{p.profile.name}</div>
                  <div className="text-[10px] text-neutral-500 capitalize">{p.profile.city}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Form Tabs */}
          <div className="flex border-b border-[#E2D9DE] dark:border-[#33293A]">
            <button
              onClick={() => setTab('signin')}
              className={`flex-1 py-2 text-xs font-semibold text-center border-b-2 transition-colors ${
                tab === 'signin'
                  ? 'border-[#4B2440] dark:border-[#CFA5C1] text-[#4B2440] dark:text-[#CFA5C1]'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setTab('signup')}
              className={`flex-1 py-2 text-xs font-semibold text-center border-b-2 transition-colors ${
                tab === 'signup'
                  ? 'border-[#4B2440] dark:border-[#CFA5C1] text-[#4B2440] dark:text-[#CFA5C1]'
                  : 'border-transparent text-neutral-500 hover:text-neutral-700'
              }`}
            >
              Create Account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-medium mb-1 text-neutral-600 dark:text-neutral-400">Email / Mobile Number</label>
              <div className="relative">
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. priya.bengaluru@example.com"
                  className="w-full px-3 py-2 pl-8 rounded-lg border border-[#E2D9DE] dark:border-[#33293A] bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#4B2440] dark:focus:ring-[#CFA5C1]"
                />
                <Mail className="w-4 h-4 text-neutral-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block font-medium mb-1 text-neutral-600 dark:text-neutral-400">Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 pl-8 rounded-lg border border-[#E2D9DE] dark:border-[#33293A] bg-white dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#4B2440] dark:focus:ring-[#CFA5C1]"
                />
                <Lock className="w-4 h-4 text-neutral-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-[#4B2440] text-[#FBF9FA] dark:bg-[#CFA5C1] dark:text-[#17121A] font-semibold text-xs hover:opacity-90 transition-opacity shadow-sm"
            >
              {tab === 'signin' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {/* Guest Direct Access (Brief Compliance) */}
          <div className="pt-2 text-center border-t border-[#E2D9DE] dark:border-[#33293A]">
            <p className="text-[11px] text-[#6E6069] dark:text-[#A99DA5] mb-2">
              As mandated by Lokta's privacy principles:
            </p>
            <button
              onClick={() => {
                onAuthenticate('Guest Borrower');
                onClose();
              }}
              className="text-xs font-semibold text-[#4B2440] dark:text-[#CFA5C1] hover:underline"
            >
              Continue without signing in (Zero Data Stored) →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
