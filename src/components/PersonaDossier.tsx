import React, { useState } from 'react';
import { UserCheck, ShieldAlert, Award, ChevronRight, CheckCircle2, ArrowRight } from 'lucide-react';
import { PRESET_PROFILES } from '../engine/scenarios';
import { evaluateCopilot } from '../engine/calculator';
import { BorrowerProfile } from '../engine/types';

interface PersonaDossierProps {
  onSelectAndLaunch: (profile: BorrowerProfile) => void;
}

export const PersonaDossier: React.FC<PersonaDossierProps> = ({ onSelectAndLaunch }) => {
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>('priya');

  const selectedPreset = PRESET_PROFILES.find((p) => p.id === selectedPersonaId) || PRESET_PROFILES[0];
  const evalResult = evaluateCopilot(selectedPreset.profile);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn select-none">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300">
            Case Study Dossiers
          </span>
          <span className="text-xs font-mono text-neutral-400">The 3 Challenge Borrowers</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Priya, Ravi, and Anita: Institutional Case Run-Throughs
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 font-light mt-1 max-w-2xl">
          Each borrower represents a distinct credit segment in India. Explore the exact questions asked, four core outputs, and domain counter-leverage.
        </p>
      </div>

      {/* Persona Tabs with Real Photography */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {PRESET_PROFILES.map((p) => {
          const isSelected = selectedPersonaId === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setSelectedPersonaId(p.id)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-3.5 ${
                isSelected
                  ? 'bg-amber-500/20 border-amber-500 text-white shadow-[0_0_20px_rgba(245,158,11,0.25)]'
                  : 'bg-[#140F18]/90 border-white/10 text-neutral-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl overflow-hidden border-2 shrink-0 ${
                isSelected ? 'border-amber-400 shadow-md' : 'border-white/10'
              }`}>
                {p.profile.avatarUrl ? (
                  <img src={p.profile.avatarUrl} alt={p.profile.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-neutral-800 flex items-center justify-center font-bold">
                    {p.profile.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="min-w-0">
                <div className="font-display font-semibold text-sm truncate text-white">
                  {p.profile.name}
                </div>
                <div className="text-[11px] text-neutral-400 truncate">{p.profile.occupation}</div>
                <div className="text-[10px] font-mono text-amber-300 font-semibold">{p.profile.city}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Case Deep-Dive Body */}
      <div className="p-6 sm:p-8 rounded-[2.5rem] bg-[#140F18]/95 border border-white/10 shadow-2xl backdrop-blur-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-amber-400/80 shadow-lg shrink-0">
              {selectedPreset.profile.avatarUrl ? (
                <img src={selectedPreset.profile.avatarUrl} alt={selectedPreset.profile.name} className="w-full h-full object-cover" />
              ) : null}
            </div>
            <div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">{selectedPreset.profile.name}</h3>
              <p className="text-xs text-neutral-300 font-light mt-0.5">
                {selectedPreset.profile.occupation} · {selectedPreset.profile.city} · Age {selectedPreset.profile.age}
              </p>
            </div>
          </div>

          <button
            onClick={() => onSelectAndLaunch(selectedPreset.profile)}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold text-xs shadow-lg hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Load into Live Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Narrative Context */}
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
          <span className="font-mono text-[10px] uppercase font-bold text-amber-400 block">
            Challenge Persona Scenario & Bank Trap
          </span>
          <p className="text-xs text-neutral-200 leading-relaxed font-light">
            {selectedPreset.role}
          </p>
        </div>

        {/* 4 Output Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
            <span className="text-[10px] font-mono text-neutral-400 uppercase">O1 Verdict</span>
            <div className="font-display font-bold text-base text-amber-300">
              {evalResult.verdict.status.replace('_', ' ')}
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
            <span className="text-[10px] font-mono text-neutral-400 uppercase">O2 Safe Carry</span>
            <div className="font-display font-bold text-base text-white">
              ₹{(evalResult.amount.borrowerSafeCarryMax / 100000).toFixed(1)}L
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
            <span className="text-[10px] font-mono text-neutral-400 uppercase">O3 Fair Rate</span>
            <div className="font-display font-bold text-base text-cyan-300">
              {evalResult.rate.fairRateMin}% - {evalResult.rate.fairRateMax}%
            </div>
          </div>
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
            <span className="text-[10px] font-mono text-neutral-400 uppercase">O4 Safe EMI</span>
            <div className="font-display font-bold text-base text-emerald-400">
              ₹{evalResult.emi.safeEmiCeiling.toLocaleString('en-IN')}/mo
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PersonaDossier;
