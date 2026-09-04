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
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#EFE3EA] dark:bg-[#2A1F2C] text-[#4B2440] dark:text-[#CFA5C1]">
            Case Study Dossiers
          </span>
          <span className="text-xs font-mono text-neutral-500">The 3 Challenge Borrowers</span>
        </div>
        <h2 className="font-display text-3xl font-medium tracking-tight">
          Priya, Ravi, and Anita: The Test Run-Throughs
        </h2>
        <p className="text-sm text-[#6E6069] dark:text-[#A99DA5] mt-1">
          Each borrower represents a distinct credit segment in India. Explore the exact questions asked, four outputs, and domain defense.
        </p>
      </div>

      {/* Persona Tabs */}
      <div className="flex border-b border-[#E2D9DE] dark:border-[#33293A] space-x-2">
        {PRESET_PROFILES.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedPersonaId(p.id)}
            className={`pb-3 px-4 text-sm font-display font-medium border-b-2 transition-colors ${
              selectedPersonaId === p.id
                ? 'border-[#4B2440] dark:border-[#CFA5C1] text-[#4B2440] dark:text-[#CFA5C1] font-semibold'
                : 'border-transparent text-neutral-500 hover:text-neutral-700'
            }`}
          >
            {p.profile.name} ({p.profile.city})
          </button>
        ))}
      </div>

      {/* Case Deep-Dive Body */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-[#E2D9DE] dark:border-[#33293A] shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E2D9DE] dark:border-[#33293A] pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-display text-2xl sm:text-3xl font-semibold">{selectedPreset.profile.name}</h3>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#EFE3EA] dark:bg-[#2A1F2C] text-[#4B2440] dark:text-[#CFA5C1] font-bold">
                Age {selectedPreset.profile.age}
              </span>
            </div>
            <p className="text-xs text-[#6E6069] dark:text-[#A99DA5] font-mono">
              {selectedPreset.profile.occupation} · {selectedPreset.profile.city}
            </p>
          </div>

          <button
            onClick={() => onSelectAndLaunch(selectedPreset.profile)}
            className="px-5 py-2.5 rounded-xl bg-[#4B2440] text-white dark:bg-[#CFA5C1] dark:text-black font-semibold text-xs flex items-center gap-1.5 shadow-sm hover:opacity-90 transition-opacity"
          >
            <span>Launch Live In Copilot Engine</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Inputs Summary Table */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 text-xs">
          <div>
            <span className="text-neutral-500 block">Monthly Inflow:</span>
            <span className="font-mono font-bold">₹{selectedPreset.profile.netMonthlyIncome.toLocaleString('en-IN')}</span>
          </div>
          <div>
            <span className="text-neutral-500 block">Existing EMIs:</span>
            <span className="font-mono font-bold">₹{selectedPreset.profile.existingMonthlyEmis.toLocaleString('en-IN')}</span>
          </div>
          <div>
            <span className="text-neutral-500 block">Credit Score:</span>
            <span className="font-mono font-bold">{selectedPreset.profile.creditScoreBand.replace('_', ' ')}</span>
          </div>
          <div>
            <span className="text-neutral-500 block">Requested Loan:</span>
            <span className="font-mono font-bold text-[#4B2440] dark:text-[#CFA5C1]">
              ₹{(selectedPreset.profile.requestedAmount / 100000).toFixed(1)} Lakhs
            </span>
          </div>
        </div>

        {/* The 4 Outputs for this Persona */}
        <div className="space-y-4">
          <h4 className="font-display font-semibold text-lg">Outputs Generated by Engine</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* O1 */}
            <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-800/30">
              <span className="font-mono text-[10px] uppercase font-bold text-neutral-500 block mb-1">O1: The Verdict</span>
              <div className="font-display text-lg font-bold text-[#4B2440] dark:text-[#CFA5C1] mb-1">
                {evalResult.verdict.headline}
              </div>
              <p className="text-neutral-600 dark:text-neutral-400">{evalResult.verdict.oneLineReason}</p>
            </div>

            {/* O2 */}
            <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-800/30">
              <span className="font-mono text-[10px] uppercase font-bold text-neutral-500 block mb-1">O2: Capacity Numbers</span>
              <div className="space-y-1 font-mono">
                <div className="flex justify-between">
                  <span>Lender Sanction:</span>
                  <span className="font-bold">₹{(evalResult.amount.lenderSanctionMax / 100000).toFixed(1)} Lakhs</span>
                </div>
                <div className="flex justify-between text-emerald-700 dark:text-emerald-400">
                  <span>Safe Carry (Use This):</span>
                  <span className="font-bold">₹{(evalResult.amount.borrowerSafeCarryMax / 100000).toFixed(1)} Lakhs</span>
                </div>
              </div>
            </div>

            {/* O3 */}
            <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-800/30">
              <span className="font-mono text-[10px] uppercase font-bold text-neutral-500 block mb-1">O3: Fair Rate & APR</span>
              <div className="font-display text-lg font-bold mb-1">
                {evalResult.rate.fairRateMin}% – {evalResult.rate.fairRateMax}%
              </div>
              <span className="font-mono text-neutral-500">All-in APR: {evalResult.rate.allInAprMin}% – {evalResult.rate.allInAprMax}%</span>
            </div>

            {/* O4 */}
            <div className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50/50 dark:bg-neutral-800/30">
              <span className="font-mono text-[10px] uppercase font-bold text-neutral-500 block mb-1">O4: Monthly EMI Ceiling</span>
              <div className="font-display text-lg font-bold mb-1 text-emerald-700 dark:text-emerald-400">
                ₹{evalResult.emi.safeEmiCeiling.toLocaleString('en-IN')}/month
              </div>
              <span className="text-neutral-500">{evalResult.emi.oneSentenceCeilingWhy}</span>
            </div>
          </div>
        </div>

        {/* Domain Defense / Interviewer Rationales */}
        <div className="p-4 rounded-xl bg-[#EFE3EA]/40 dark:bg-[#2A1F2C]/40 border border-[#DFC2D5] dark:border-[#4B2440] text-xs space-y-2">
          <span className="font-mono text-[10px] uppercase font-bold text-[#4B2440] dark:text-[#CFA5C1] block">
            Domain Reasoning & Scoring Rubric Defense
          </span>
          {selectedPersonaId === 'priya' && (
            <p className="leading-relaxed">
              <strong>Priya's Evaluation:</strong> Priya has prime 780 CIBIL and high ₹1.1L income. Lenders will gladly sanction ₹14L+ on pure FOIR. But taking ₹8L for a wedding while servicing a ₹14k car loan and ₹28k rent locks ₹22,000/mo for 48 months on pure non-yielding consumption. The Copilot correctly flags <code className="font-mono font-bold">BORROW_LESS</code>, pruning the loan to the safe discretionary ceiling (~₹4.5L - ₹5L), and equips her with a card to demand 10.75% with capped 0.5% fees.
            </p>
          )}
          {selectedPersonaId === 'ravi' && (
            <p className="leading-relaxed">
              <strong>Ravi's Evaluation:</strong> Ravi has no credit score and high cash income. NBFCs would charge him 18% - 22% for an unsecured business loan. But Ravi owns an unencumbered shop premises worth ₹45 Lakhs in Mysuru! The Copilot triggers a <code className="font-mono font-bold">PRODUCT REDIRECTION ALERT</code>, routing him to a commercial Loan Against Property (LAP) at 9.25% - 10.25% with his schoolteacher wife (₹18k/mo) as co-applicant. This single insight saves Ravi over ₹3.8 Lakhs in interest!
            </p>
          )}
          {selectedPersonaId === 'anita' && (
            <p className="leading-relaxed">
              <strong>Anita's Evaluation:</strong> Anita is trapped in three 30%+ instant app loans with a recent bounce, and her husband has been unemployed for 8 months. An unsecured personal loan from another app will trigger a compounding default cycle. The Copilot reaches <code className="font-mono font-bold">DONT_BORROW</code> for unsecured personal debt. Instead, it guides her to one-time debt consolidation and routes her EV scooter request to Mudra Shishu (under 11%) with vehicle hypothecation.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

