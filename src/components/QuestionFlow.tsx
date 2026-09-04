import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, AlertCircle, CheckCircle2, TrendingDown, ArrowRight, RotateCcw } from 'lucide-react';
import { BorrowerProfile, EmploymentType, LoanPurpose, CreditScoreBand, CollateralType } from '../engine/types';

interface QuestionFlowProps {
  profile: BorrowerProfile;
  onChangeProfile: (updated: BorrowerProfile) => void;
  confidenceScore: number;
  confidenceReasons: string[];
}

export const QuestionFlow: React.FC<QuestionFlowProps> = ({
  profile,
  onChangeProfile,
  confidenceScore,
  confidenceReasons
}) => {
  const [showTier2, setShowTier2] = useState<boolean>(true);

  const updateField = <K extends keyof BorrowerProfile>(key: K, value: BorrowerProfile[K]) => {
    onChangeProfile({
      ...profile,
      [key]: value
    });
  };

  return (
    <div className="space-y-6">
      {/* Confidence & Adaptive Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-neutral-900 border border-[#E2D9DE] dark:border-[#33293A] shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="font-display font-semibold text-sm">Copilot Confidence Meter</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[#EFE3EA] dark:bg-[#2A1F2C] text-[#4B2440] dark:text-[#CFA5C1] font-bold">
              {confidenceScore}%
            </span>
          </div>
          <span className="text-xs text-[#6E6069] dark:text-[#A99DA5]">
            {confidenceScore >= 80 ? '✓ High precision band' : '⚠ Wide band: silence widens ranges'}
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden mb-3">
          <div
            className={`h-full transition-all duration-500 ${
              confidenceScore >= 80
                ? 'bg-emerald-600'
                : confidenceScore >= 60
                ? 'bg-[#4B2440] dark:bg-[#CFA5C1]'
                : 'bg-amber-600'
            }`}
            style={{ width: `${confidenceScore}%` }}
          />
        </div>

        {/* Active Widening Explanations */}
        {confidenceReasons.length > 0 && (
          <div className="space-y-1 mt-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
            {confidenceReasons.map((reason, idx) => (
              <div key={idx} className="flex items-start gap-1.5 text-[11px] text-[#8A4B12] dark:text-[#E0A265]">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>{reason}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* TIER 1: MUST QUESTIONS */}
      <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-[#E2D9DE] dark:border-[#33293A] shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-[#E2D9DE] dark:border-[#33293A] pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#4B2440] text-white dark:bg-[#CFA5C1] dark:text-black">
                Tier 1
              </span>
              <h3 className="font-display font-semibold text-lg">Must Questions</h3>
            </div>
            <p className="text-xs text-[#6E6069] dark:text-[#A99DA5] mt-0.5">
              The minimum 8 questions to calculate all 4 outputs.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          {/* Q1: Purpose */}
          <div>
            <label className="block font-semibold mb-1.5 text-neutral-800 dark:text-neutral-200">
              1. What is the primary purpose of this loan?
            </label>
            <select
              value={profile.loanPurpose}
              onChange={(e) => updateField('loanPurpose', e.target.value as LoanPurpose)}
              className="w-full p-2.5 rounded-xl border border-[#E2D9DE] dark:border-[#33293A] bg-white dark:bg-neutral-800 font-medium text-xs focus:ring-2 focus:ring-[#4B2440]"
            >
              <option value="BUSINESS_GROWTH">Business Stock / Expansion / Working Capital</option>
              <option value="TWO_WHEELER_ASSET">Productive Vehicle / 2-Wheeler (EV / Delivery)</option>
              <option value="HOME_LAP">Home Renovation / Loan Against Property</option>
              <option value="DEBT_CONSOLIDATION">Consolidate Existing High-Cost Debt</option>
              <option value="WEDDING_DISCRETIONARY">Wedding / Family Function (Discretionary)</option>
              <option value="MEDICAL_EMERGENCY">Medical Emergency / Unforeseen Hospital</option>
            </select>
          </div>

          {/* Q2: Amount Wanted */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-semibold text-neutral-800 dark:text-neutral-200">
                2. Amount Wanted: <span className="font-mono font-bold text-[#4B2440] dark:text-[#CFA5C1]">₹{(profile.requestedAmount / 100000).toFixed(1)} Lakhs</span>
              </label>
              <span className="font-mono text-[11px] text-neutral-500">₹{profile.requestedAmount.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="50000"
              max="3000000"
              step="25000"
              value={profile.requestedAmount}
              onChange={(e) => updateField('requestedAmount', Number(e.target.value))}
              className="w-full accent-[#4B2440] dark:accent-[#CFA5C1] cursor-pointer"
            />
            <div className="flex gap-1.5 mt-2">
              {[150000, 500000, 800000, 1500000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => updateField('requestedAmount', amt)}
                  className={`px-2 py-0.5 text-[10px] rounded font-mono border transition-colors ${
                    profile.requestedAmount === amt
                      ? 'bg-[#4B2440] text-white dark:bg-[#CFA5C1] dark:text-black border-transparent'
                      : 'border-[#E2D9DE] dark:border-[#33293A] text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100'
                  }`}
                >
                  ₹{(amt / 100000).toFixed(1)}L
                </button>
              ))}
            </div>
          </div>

          {/* Q3: Employment & Income Type */}
          <div>
            <label className="block font-semibold mb-1.5 text-neutral-800 dark:text-neutral-200">
              3. Employment & Income Type
            </label>
            <select
              value={profile.employmentType}
              onChange={(e) => updateField('employmentType', e.target.value as EmploymentType)}
              className="w-full p-2.5 rounded-xl border border-[#E2D9DE] dark:border-[#33293A] bg-white dark:bg-neutral-800 font-medium text-xs focus:ring-2 focus:ring-[#4B2440]"
            >
              <option value="SALARIED_MNC">Salaried (Category-A Corporate / MNC / Govt)</option>
              <option value="SALARIED_SMALL">Salaried (SME / Local Firm / Contractual)</option>
              <option value="SELF_EMPLOYED_BUSINESS">Self-Employed (Shopkeeper / Trader / SME)</option>
              <option value="INFORMAL_GIG">Informal / Gig Worker (Delivery rider, Artisan, Cash)</option>
            </select>
          </div>

          {/* Q4: Net Monthly Household Inflow */}
          <div>
            <label className="block font-semibold mb-1.5 text-neutral-800 dark:text-neutral-200">
              4. Net Take-Home Monthly Inflow (₹)
            </label>
            <input
              type="number"
              step="1000"
              value={profile.netMonthlyIncome}
              onChange={(e) => updateField('netMonthlyIncome', Number(e.target.value))}
              placeholder="e.g. 60000"
              className="w-full p-2.5 rounded-xl border border-[#E2D9DE] dark:border-[#33293A] bg-white dark:bg-neutral-800 font-mono text-xs focus:ring-2 focus:ring-[#4B2440]"
            />
          </div>

          {/* Q5: Monthly Essential Living Expenses */}
          <div>
            <label className="block font-semibold mb-1.5 text-neutral-800 dark:text-neutral-200">
              5. Monthly Essential Expenses (Rent + Food + School + Bills)
            </label>
            <input
              type="number"
              step="1000"
              value={profile.monthlyEssentialExpenses}
              onChange={(e) => updateField('monthlyEssentialExpenses', Number(e.target.value))}
              placeholder="e.g. 32000"
              className="w-full p-2.5 rounded-xl border border-[#E2D9DE] dark:border-[#33293A] bg-white dark:bg-neutral-800 font-mono text-xs focus:ring-2 focus:ring-[#4B2440]"
            />
          </div>

          {/* Q6: Existing Monthly EMIs */}
          <div>
            <label className="block font-semibold mb-1.5 text-neutral-800 dark:text-neutral-200">
              6. Existing Total Monthly EMIs Running (₹)
            </label>
            <input
              type="number"
              step="500"
              value={profile.existingMonthlyEmis}
              onChange={(e) => updateField('existingMonthlyEmis', Number(e.target.value))}
              placeholder="0 if no active loans"
              className="w-full p-2.5 rounded-xl border border-[#E2D9DE] dark:border-[#33293A] bg-white dark:bg-neutral-800 font-mono text-xs focus:ring-2 focus:ring-[#4B2440]"
            />
          </div>

          {/* Q7: Credit Score Band */}
          <div>
            <label className="block font-semibold mb-1.5 text-neutral-800 dark:text-neutral-200">
              7. Credit Score (CIBIL / Experian)
            </label>
            <select
              value={profile.creditScoreBand}
              onChange={(e) => updateField('creditScoreBand', e.target.value as CreditScoreBand)}
              className="w-full p-2.5 rounded-xl border border-[#E2D9DE] dark:border-[#33293A] bg-white dark:bg-neutral-800 font-medium text-xs focus:ring-2 focus:ring-[#4B2440]"
            >
              <option value="EXCELLENT_750_PLUS">750+ (Excellent / Prime Tier)</option>
              <option value="GOOD_700_749">700 - 749 (Good Standard)</option>
              <option value="AVERAGE_650_699">650 - 699 (Fair / Moderate Risk)</option>
              <option value="LOW_UNDER_650">Below 650 (Subprime / Caution)</option>
              <option value="UNKNOWN">I don't know my credit score / Never taken formal loan</option>
            </select>
          </div>

          {/* Q8: Borrower Age */}
          <div>
            <label className="block font-semibold mb-1.5 text-neutral-800 dark:text-neutral-200">
              8. Age of Primary Earner
            </label>
            <input
              type="number"
              min="21"
              max="65"
              value={profile.age}
              onChange={(e) => updateField('age', Number(e.target.value))}
              className="w-full p-2.5 rounded-xl border border-[#E2D9DE] dark:border-[#33293A] bg-white dark:bg-neutral-800 font-mono text-xs focus:ring-2 focus:ring-[#4B2440]"
            />
          </div>
        </div>
      </div>

      {/* TIER 2: HIGH-IMPACT QUESTIONS (ADAPTIVE BRANCHING) */}
      <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-[#E2D9DE] dark:border-[#33293A] shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-[#E2D9DE] dark:border-[#33293A] pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-700 text-white">
                Tier 2
              </span>
              <h3 className="font-display font-semibold text-lg">High-Impact Precision Questions</h3>
            </div>
            <p className="text-xs text-[#6E6069] dark:text-[#A99DA5] mt-0.5">
              Every question below moves an output number or tightens a band.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowTier2(!showTier2)}
            className="p-1.5 rounded-lg border border-[#E2D9DE] dark:border-[#33293A] text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100"
          >
            {showTier2 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {showTier2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            {/* Adaptive 1: For Self-Employed or Business: ITR vs Cash ratio */}
            {profile.employmentType === 'SELF_EMPLOYED_BUSINESS' && (
              <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-semibold text-neutral-800 dark:text-neutral-200">
                    Annual ITR Declared Net Profit (₹)
                  </label>
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300">
                    50% Cash Haircut Rule
                  </span>
                </div>
                <input
                  type="number"
                  step="10000"
                  value={profile.itrAnnualIncome}
                  onChange={(e) => updateField('itrAnnualIncome', Number(e.target.value))}
                  placeholder="e.g. 420000"
                  className="w-full p-2.5 rounded-xl border border-[#E2D9DE] dark:border-[#33293A] bg-white dark:bg-neutral-800 font-mono text-xs"
                />
                <p className="text-[11px] text-neutral-500 mt-1">
                  Banks credit 100% of ITR profit, but haircut unverified cash by 50%.
                </p>
              </div>
            )}

            {/* Adaptive 2: Collateral (Unlocks LAP rates from 18% down to 9.5%) */}
            <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-semibold text-neutral-800 dark:text-neutral-200">
                  Unencumbered Collateral Available?
                </label>
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300">
                  Saves 400 - 800 bps
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <select
                  value={profile.collateralType}
                  onChange={(e) => updateField('collateralType', e.target.value as CollateralType)}
                  className="p-2 rounded-lg border border-[#E2D9DE] dark:border-[#33293A] bg-white dark:bg-neutral-800 font-medium text-xs"
                >
                  <option value="NONE">None (Unsecured)</option>
                  <option value="COMMERCIAL_PROPERTY">Commercial Shop / Office</option>
                  <option value="RESIDENTIAL_PROPERTY">Residential House / Flat</option>
                  <option value="GOLD">Physical Gold Jewellery</option>
                  <option value="FIXED_DEPOSIT">Bank Fixed Deposit</option>
                </select>
                <input
                  type="number"
                  step="50000"
                  value={profile.collateralValue}
                  onChange={(e) => updateField('collateralValue', Number(e.target.value))}
                  placeholder="Market value (₹)"
                  disabled={profile.collateralType === 'NONE'}
                  className="p-2 rounded-lg border border-[#E2D9DE] dark:border-[#33293A] bg-white dark:bg-neutral-800 font-mono text-xs disabled:opacity-50"
                />
              </div>
              <p className="text-[11px] text-neutral-500">
                Pledging unencumbered property unlocks secured Loan Against Property (LAP).
              </p>
            </div>

            {/* Adaptive 3: Earning Co-applicant */}
            <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-semibold text-neutral-800 dark:text-neutral-200">
                  Earning Co-Applicant (Spouse / Family)
                </label>
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300">
                  Expands Capacity
                </span>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.hasCoApplicant}
                    onChange={(e) => updateField('hasCoApplicant', e.target.checked)}
                    className="accent-[#4B2440] dark:accent-[#CFA5C1]"
                  />
                  <span>Has regular income</span>
                </label>
                {profile.hasCoApplicant && (
                  <input
                    type="number"
                    step="1000"
                    value={profile.coApplicantIncome}
                    onChange={(e) => updateField('coApplicantIncome', Number(e.target.value))}
                    placeholder="Monthly income (₹)"
                    className="flex-1 p-2 rounded-lg border border-[#E2D9DE] dark:border-[#33293A] bg-white dark:bg-neutral-800 font-mono text-xs"
                  />
                )}
              </div>
              <p className="text-[11px] text-neutral-500">
                A salaried co-applicant (e.g. spouse) provides documented bank credit trail.
              </p>
            </div>

            {/* Adaptive 4: Repayment Track / Bounces in last 12m */}
            <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-semibold text-neutral-800 dark:text-neutral-200">
                  Any Cheque or NACH Bounce in Last 12 Months?
                </label>
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300">
                  Underwriting Flag
                </span>
              </div>
              <div className="flex gap-4 mb-2">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="radio"
                    name="bounce"
                    checked={!profile.hasRecentBounce}
                    onChange={() => updateField('hasRecentBounce', false)}
                    className="accent-[#4B2440] dark:accent-[#CFA5C1]"
                  />
                  <span>Zero Bounces (Clean)</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer text-red-600 dark:text-red-400 font-medium">
                  <input
                    type="radio"
                    name="bounce"
                    checked={profile.hasRecentBounce}
                    onChange={() => updateField('hasRecentBounce', true)}
                    className="accent-red-600"
                  />
                  <span>1+ Bounced EMI</span>
                </label>
              </div>
              <p className="text-[11px] text-neutral-500">
                A recent bounce triggers automated bank rejection or heavy subprime surcharges.
              </p>
            </div>

            {/* Adaptive 5: Productive Loan Expected Earnings */}
            {(profile.loanPurpose === 'TWO_WHEELER_ASSET' || profile.loanPurpose === 'BUSINESS_GROWTH') && (
              <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-semibold text-neutral-800 dark:text-neutral-200">
                    Expected Additional Monthly Profit from Asset (₹)
                  </label>
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300">
                    Offsets EMI
                  </span>
                </div>
                <input
                  type="number"
                  step="1000"
                  value={profile.expectedMonthlyReturnFromLoan}
                  onChange={(e) => updateField('expectedMonthlyReturnFromLoan', Number(e.target.value))}
                  placeholder="e.g. 15000 (doubling delivery runs)"
                  className="w-full p-2.5 rounded-xl border border-[#E2D9DE] dark:border-[#33293A] bg-white dark:bg-neutral-800 font-mono text-xs"
                />
                <p className="text-[11px] text-neutral-500 mt-1">
                  Productive earnings are factored into debt serviceability at 60% haircut.
                </p>
              </div>
            )}

            {/* Adaptive 6: Highest Existing Loan Rate (Detects predatory app debt) */}
            <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-semibold text-neutral-800 dark:text-neutral-200">
                  Highest Rate on Current Loans (% p.a.)
                </label>
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300">
                  Predatory Check
                </span>
              </div>
              <input
                type="number"
                step="0.5"
                value={profile.highestExistingLoanRate}
                onChange={(e) => updateField('highestExistingLoanRate', Number(e.target.value))}
                placeholder="e.g. 34% (instant apps)"
                className="w-full p-2.5 rounded-xl border border-[#E2D9DE] dark:border-[#33293A] bg-white dark:bg-neutral-800 font-mono text-xs"
              />
              <p className="text-[11px] text-neutral-500 mt-1">
                Rates &gt; 24% flag severe predatory debt and trigger consolidation priority.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
