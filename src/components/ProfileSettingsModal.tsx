import React, { useState } from 'react';
import { 
  X, 
  User, 
  MapPin, 
  Briefcase, 
  DollarSign, 
  CreditCard, 
  Shield, 
  CheckCircle2, 
  Trash2, 
  Camera, 
  Sparkles,
  Sliders,
  RotateCcw
} from 'lucide-react';
import { BorrowerProfile, CreditScoreBand } from '../engine/types';

interface ProfileSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: BorrowerProfile;
  onSaveProfile: (updated: BorrowerProfile) => void;
  onResetProfile: () => void;
}

export const ProfileSettingsModal: React.FC<ProfileSettingsModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile,
  onResetProfile,
}) => {
  const [name, setName] = useState(profile.name);
  const [city, setCity] = useState(profile.city);
  const [occupation, setOccupation] = useState(profile.occupation);
  const [income, setIncome] = useState(profile.netMonthlyIncome);
  const [expenses, setExpenses] = useState(profile.monthlyEssentialExpenses);
  const [emis, setEmis] = useState(profile.existingMonthlyEmis);
  const [scoreBand, setScoreBand] = useState<CreditScoreBand>(profile.creditScoreBand);
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl || '');
  const [showCustomUrlInput, setShowCustomUrlInput] = useState(false);

  if (!isOpen) return null;

  const sampleAvatars = [
    { label: 'Priya (Tech Lead)', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop' },
    { label: 'Ravi (Entrepreneur)', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop' },
    { label: 'Anita (Rider/Tailor)', url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop' },
    { label: 'Senior Professional', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop' },
    { label: 'Modern Developer', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop' },
    { label: 'Executive', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop' },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({
      ...profile,
      name: name.trim() || profile.name,
      city: city.trim() || profile.city,
      occupation: occupation.trim() || profile.occupation,
      netMonthlyIncome: Number(income) || profile.netMonthlyIncome,
      monthlyEssentialExpenses: Number(expenses) || profile.monthlyEssentialExpenses,
      existingMonthlyEmis: Number(emis) || 0,
      creditScoreBand: scoreBand,
      avatarUrl: avatarUrl || profile.avatarUrl,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-2xl bg-[#140F18] text-[#EEE6EA] rounded-[2.5rem] border border-orange-500/30 shadow-[0_25px_80px_rgba(249,115,22,0.15)] overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header with Warm Burnt-Orange Glow */}
        <div className="flex items-center justify-between p-6 sm:p-7 border-b border-neutral-800/80 bg-gradient-to-r from-[#200F17] via-[#160D1E] to-[#120F1C]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 text-white flex items-center justify-center shadow-lg shadow-orange-500/30">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 
                className="text-2xl text-white font-normal tracking-tight"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Profile & Underwriting Settings
              </h3>
              <p className="text-xs text-neutral-400 font-light">
                Manage your borrower identity, cashflow parameters, and profile photography.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <form onSubmit={handleSave} className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1 text-xs">
          
          {/* Avatar Photo Selector */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-neutral-200 font-medium text-xs">
                <Camera className="w-4 h-4 text-orange-400" />
                <span>Borrower Profile Photograph</span>
              </div>
              <span className="text-[10px] text-neutral-500 font-mono">Real-time update</span>
            </div>

            <div className="flex items-center gap-4">
              {/* Current Avatar Preview */}
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-orange-500/50 shadow-md shrink-0 bg-neutral-900">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xl font-bold bg-orange-950 text-orange-300">
                    {name.charAt(0)}
                  </div>
                )}
              </div>

              {/* Sample Photo Pickers */}
              <div className="flex-1 space-y-1.5">
                <div className="text-[11px] text-neutral-400">Choose verified photo avatar:</div>
                <div className="flex flex-wrap gap-2">
                  {sampleAvatars.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setAvatarUrl(item.url)}
                      className={`relative w-8 h-8 rounded-xl overflow-hidden border transition-all cursor-pointer ${
                        avatarUrl === item.url ? 'border-orange-400 ring-2 ring-orange-500/50 scale-105' : 'border-neutral-700 opacity-60 hover:opacity-100'
                      }`}
                      title={item.label}
                    >
                      <img src={item.url} alt={item.label} className="w-full h-full object-cover" />
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setShowCustomUrlInput(!showCustomUrlInput)}
                    className="px-2.5 py-1 rounded-xl bg-neutral-800 border border-neutral-700 text-[10px] text-neutral-300 hover:text-white cursor-pointer"
                  >
                    Custom URL
                  </button>
                </div>
              </div>
            </div>

            {/* Optional Custom Image URL Field */}
            {showCustomUrlInput && (
              <div className="pt-2">
                <input
                  type="url"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-800 bg-neutral-900/90 text-white placeholder-neutral-500 text-xs focus:outline-none focus:border-orange-500"
                />
              </div>
            )}
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <div className="space-y-1.5">
              <label className="block text-neutral-300 font-medium text-[11px]">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 pl-10 rounded-xl border border-neutral-800 bg-neutral-900 text-white text-xs focus:outline-none focus:border-orange-500"
                />
                <User className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
              </div>
            </div>

            {/* City */}
            <div className="space-y-1.5">
              <label className="block text-neutral-300 font-medium text-[11px]">City / State</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 pl-10 rounded-xl border border-neutral-800 bg-neutral-900 text-white text-xs focus:outline-none focus:border-orange-500"
                />
                <MapPin className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
              </div>
            </div>

            {/* Occupation */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="block text-neutral-300 font-medium text-[11px]">Occupation & Business Vintage</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={occupation}
                  onChange={(e) => setOccupation(e.target.value)}
                  className="w-full px-3.5 py-2.5 pl-10 rounded-xl border border-neutral-800 bg-neutral-900 text-white text-xs focus:outline-none focus:border-orange-500"
                />
                <Briefcase className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
              </div>
            </div>

            {/* Net Monthly Income */}
            <div className="space-y-1.5">
              <label className="block text-neutral-300 font-medium text-[11px]">Net Monthly Inflow (₹)</label>
              <div className="relative">
                <input
                  type="number"
                  min="5000"
                  step="1000"
                  required
                  value={income}
                  onChange={(e) => setIncome(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 pl-10 rounded-xl border border-neutral-800 bg-neutral-900 text-white text-xs font-mono focus:outline-none focus:border-orange-500"
                />
                <DollarSign className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
              </div>
            </div>

            {/* Essential Expenses */}
            <div className="space-y-1.5">
              <label className="block text-neutral-300 font-medium text-[11px]">Monthly Living & Rent (₹)</label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="1000"
                  required
                  value={expenses}
                  onChange={(e) => setExpenses(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 pl-10 rounded-xl border border-neutral-800 bg-neutral-900 text-white text-xs font-mono focus:outline-none focus:border-orange-500"
                />
                <CreditCard className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
              </div>
            </div>

            {/* Existing EMIs */}
            <div className="space-y-1.5">
              <label className="block text-neutral-300 font-medium text-[11px]">Existing Monthly EMIs (₹)</label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  step="500"
                  required
                  value={emis}
                  onChange={(e) => setEmis(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 pl-10 rounded-xl border border-neutral-800 bg-neutral-900 text-white text-xs font-mono focus:outline-none focus:border-orange-500"
                />
                <CreditCard className="w-4 h-4 text-neutral-500 absolute left-3 top-3" />
              </div>
            </div>

            {/* Credit Score Band */}
            <div className="space-y-1.5">
              <label className="block text-neutral-300 font-medium text-[11px]">Credit History Tier</label>
              <select
                value={scoreBand}
                onChange={(e) => setScoreBand(e.target.value as CreditScoreBand)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-800 bg-neutral-900 text-white text-xs focus:outline-none focus:border-orange-500 cursor-pointer"
              >
                <option value="EXCELLENT_750_PLUS">750+ CIBIL (Prime Excellent)</option>
                <option value="GOOD_700_749">700 - 749 (Standard Good)</option>
                <option value="AVERAGE_650_699">650 - 699 (Fair Tier)</option>
                <option value="LOW_UNDER_650">Below 650 (High Risk / Bounced)</option>
                <option value="UNKNOWN">Unknown / Thin Bureau (Preserve Dignity)</option>
              </select>
            </div>
          </div>

          {/* Privacy Guarantee Reminder */}
          <div className="p-3.5 rounded-xl bg-orange-950/20 border border-orange-500/20 flex items-center gap-2.5 text-[11px] text-orange-300/90">
            <Shield className="w-4 h-4 text-orange-400 shrink-0" />
            <span>All edits are strictly stored in local volatile browser memory. Zero data is transmitted to external bureau servers.</span>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-neutral-800/80">
            <button
              type="button"
              onClick={() => {
                onResetProfile();
                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-neutral-400 hover:text-rose-400 hover:bg-rose-950/20 transition-colors cursor-pointer text-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Persona Defaults</span>
            </button>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-neutral-700 hover:bg-neutral-800 text-neutral-300 text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:opacity-95 text-white font-semibold text-xs transition-all shadow-[0_4px_20px_rgba(249,115,22,0.35)] cursor-pointer"
              >
                Save Profile Changes
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};

export default ProfileSettingsModal;
