import React, { useState } from 'react';
import { QuestionFlow } from './QuestionFlow';
import { OutputsDashboard } from './OutputsDashboard';
import { NegotiationCard } from './NegotiationCard';
import { BorrowerProfile, CopilotResult } from '../engine/types';
import { evaluateCopilot } from '../engine/calculator';
import { Shield, Sparkles, UserCheck, RotateCcw } from 'lucide-react';
import { PRESET_PROFILES, DEFAULT_CUSTOM_PROFILE } from '../engine/scenarios';

interface DashboardLayoutProps {
  activeProfile: BorrowerProfile;
  onChangeProfile: (profile: BorrowerProfile) => void;
  onOpenCard: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  activeProfile,
  onChangeProfile,
  onOpenCard
}) => {
  const result: CopilotResult = evaluateCopilot(activeProfile);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Borrower Profile Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-[#E2D9DE] dark:border-[#33293A] shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#4B2440] text-white dark:bg-[#CFA5C1] dark:text-neutral-950 flex items-center justify-center font-display font-bold text-lg">
            {activeProfile.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-display font-semibold text-xl leading-none">{activeProfile.name}</h2>
              <span className="text-xs font-mono text-[#6E6069] dark:text-[#A99DA5]">
                ({activeProfile.city} · {activeProfile.employmentType.replace('_', ' ')})
              </span>
            </div>
            <p className="text-xs text-[#6E6069] dark:text-[#A99DA5] mt-1 font-mono">
              Net Inflow: ₹{activeProfile.netMonthlyIncome.toLocaleString('en-IN')}/mo · Asks: ₹{(activeProfile.requestedAmount / 100000).toFixed(1)}L ({activeProfile.loanPurpose.replace('_', ' ')})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onChangeProfile({ ...DEFAULT_CUSTOM_PROFILE, id: 'custom-' + Date.now() })}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E2D9DE] dark:border-[#33293A] text-xs font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Custom Profile</span>
          </button>
          <button
            onClick={onOpenCard}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#4B2440] text-white dark:bg-[#CFA5C1] dark:text-black font-semibold text-xs shadow-sm hover:opacity-90 transition-opacity"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>View Negotiation Card</span>
          </button>
        </div>
      </div>

      {/* Two Column Layout: Adaptive Questionnaire (Left) + Outputs (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Col: Questionnaire */}
        <div className="lg:col-span-5 space-y-6">
          <QuestionFlow
            profile={activeProfile}
            onChangeProfile={onChangeProfile}
            confidenceScore={result.confidenceScore}
            confidenceReasons={result.rate.confidenceWidenedReasons}
          />
        </div>

        {/* Right Col: Outputs O1 - O4 */}
        <div className="lg:col-span-7 space-y-6">
          <OutputsDashboard
            result={result}
            onOpenNegotiationCard={onOpenCard}
          />
        </div>
      </div>
    </div>
  );
};
