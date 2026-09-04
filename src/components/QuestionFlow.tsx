import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  TrendingDown, 
  ArrowRight, 
  RotateCcw,
  Sliders,
  DollarSign,
  ShieldAlert,
  Building,
  Briefcase,
  Layers,
  Zap,
  Activity
} from 'lucide-react';
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
    <div className="space-y-6 select-none animate-fadeIn">
      
      {/* ------------------------------------------------------------- */}
      {/* 1. COPILOT CONFIDENCE TELEMETRY BAR                           */}
      {/* ------------------------------------------------------------- */}
      <div className="p-5 sm:p-6 rounded-[2rem] bg-[#140F18]/95 border border-white/10 shadow-2xl backdrop-blur-xl relative overflow-hidden group">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-500/20 border border-orange-400/40 flex items-center justify-center text-orange-400">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <span className="font-display font-semibold text-white text-sm">Underwriting Precision Telemetry</span>
              <div className="text-[10px] text-neutral-400 font-mono">Confidence in Safe Ceiling & Fair Rate Band</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full shadow-md ${
              confidenceScore >= 80
                ? 'bg-emerald-500/20 border border-emerald-400/40 text-emerald-300'
                : confidenceScore >= 60
                ? 'bg-amber-500/20 border border-amber-400/40 text-amber-300'
                : 'bg-rose-500/20 border border-rose-400/40 text-rose-300'
            }`}>
              {confidenceScore}% Precision
            </span>
          </div>
        </div>

        {/* Glowing Progress bar */}
        <div className="relative z-10 w-full h-2.5 rounded-full bg-black/40 border border-white/5 overflow-hidden mb-2">
          <div
            className={`h-full transition-all duration-700 rounded-full ${
              confidenceScore >= 80
                ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                : confidenceScore >= 60
                ? 'bg-gradient-to-r from-orange-500 to-amber-400 shadow-[0_0_12px_rgba(249,115,22,0.5)]'
                : 'bg-gradient-to-r from-rose-600 to-amber-500 shadow-[0_0_12px_rgba(244,63,94,0.5)]'
            }`}
            style={{ width: `${confidenceScore}%` }}
          />
        </div>

        {/* Active Widening Explanations */}
        {confidenceReasons.length > 0 && (
          <div className="relative z-10 space-y-1.5 mt-3 pt-3 border-t border-white/5">
            {confidenceReasons.map((reason, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-amber-300/90 font-light">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400" />
                <span>{reason}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. TIER 1: MUST UNDERWRITING QUESTIONS                        */}
      {/* ------------------------------------------------------------- */}
      <div className="p-6 sm:p-7 rounded-[2rem] bg-[#140F18]/95 border border-white/10 shadow-2xl backdrop-blur-xl space-y-6">
        
        {/* Header Strip */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-xl bg-orange-500/20 border border-orange-400/40 text-orange-300">
              Tier 1
            </span>
            <div>
              <h3 className="font-display font-semibold text-white text-lg">Essential Underwriting Intake</h3>
              <p className="text-xs text-neutral-400 font-light mt-0.5">
                The core parameters required to compute all 4 advisory outputs (O1–O4).
              </p>
            </div>
          </div>
        </div>

        {/* Form Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          
          {/* Q1: Purpose */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-white flex items-center gap-1.5">
                <span className="font-mono text-orange-400 text-xs">01.</span>
                <span>Primary Loan Purpose</span>
              </label>
            </div>
            <select
              value={profile.loanPurpose}
              onChange={(e) => updateField('loanPurpose', e.target.value as LoanPurpose)}
              className="w-full p-3 rounded-xl border border-white/10 bg-[#1A121E] text-white font-medium text-xs focus:outline-none focus:border-orange-500/60 transition-colors"
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
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-white flex items-center gap-1.5">
                <span className="font-mono text-orange-400 text-xs">02.</span>
                <span>Target Amount Wanted</span>
              </label>
              <span className="font-mono font-bold text-orange-300 text-sm">
                ₹{(profile.requestedAmount / 100000).toFixed(1)} Lakhs
              </span>
            </div>
            <input
              type="range"
              min="50000"
              max="3500000"
              step="25000"
              value={profile.requestedAmount}
              onChange={(e) => updateField('requestedAmount', Number(e.target.value))}
              className="w-full accent-orange-500 cursor-pointer h-2 bg-neutral-800 rounded-lg"
            />
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[150000, 500000, 800000, 1500000, 2500000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => updateField('requestedAmount', amt)}
                  className={`px-2.5 py-1 text-[10px] rounded-lg font-mono border transition-all cursor-pointer ${
                    profile.requestedAmount === amt
                      ? 'bg-orange-500 text-black font-bold border-orange-500 shadow-sm'
                      : 'border-white/10 text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  ₹{(amt / 100000).toFixed(1)}L
                </button>
              ))}
            </div>
          </div>

          {/* Q3: Employment & Income Type */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <label className="font-semibold text-white flex items-center gap-1.5">
              <span className="font-mono text-orange-400 text-xs">03.</span>
              <span>Employment & Income Type</span>
            </label>
            <select
              value={profile.employmentType}
              onChange={(e) => updateField('employmentType', e.target.value as EmploymentType)}
              className="w-full p-3 rounded-xl border border-white/10 bg-[#1A121E] text-white font-medium text-xs focus:outline-none focus:border-orange-500/60 transition-colors"
            >
              <option value="SALARIED_MNC">Salaried (Category-A Corporate / MNC / Govt)</option>
              <option value="SALARIED_SMALL">Salaried (SME / Local Firm / Contractual)</option>
              <option value="SELF_EMPLOYED_BUSINESS">Self-Employed (Shopkeeper / Trader / SME)</option>
              <option value="INFORMAL_GIG">Informal / Gig Worker (Delivery rider, Artisan, Cash)</option>
            </select>
          </div>

          {/* Q4: Net Monthly Household Inflow */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-white flex items-center gap-1.5">
                <span className="font-mono text-orange-400 text-xs">04.</span>
                <span>Net Monthly Take-Home (₹)</span>
              </label>
              <span className="text-[10px] font-mono text-neutral-400">After Taxes / Deductions</span>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-neutral-500">₹</span>
              <input
                type="number"
                step="1000"
                value={profile.netMonthlyIncome}
                onChange={(e) => updateField('netMonthlyIncome', Number(e.target.value))}
                placeholder="e.g. 60000"
                className="w-full pl-8 pr-4 py-3 rounded-xl border border-white/10 bg-[#1A121E] font-mono text-xs text-white focus:outline-none focus:border-orange-500/60 transition-colors"
              />
            </div>
          </div>

          {/* Q5: Monthly Essential Living Expenses */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-white flex items-center gap-1.5">
                <span className="font-mono text-orange-400 text-xs">05.</span>
                <span>Monthly Essential Expenses (₹)</span>
              </label>
              <span className="text-[10px] font-mono text-neutral-400">Rent + Groceries + School</span>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-neutral-500">₹</span>
              <input
                type="number"
                step="1000"
                value={profile.monthlyEssentialExpenses}
                onChange={(e) => updateField('monthlyEssentialExpenses', Number(e.target.value))}
                placeholder="e.g. 32000"
                className="w-full pl-8 pr-4 py-3 rounded-xl border border-white/10 bg-[#1A121E] font-mono text-xs text-white focus:outline-none focus:border-orange-500/60 transition-colors"
              />
            </div>
          </div>

          {/* Q6: Existing Monthly EMIs */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-white flex items-center gap-1.5">
                <span className="font-mono text-orange-400 text-xs">06.</span>
                <span>Active Running EMIs (₹)</span>
              </label>
              <span className="text-[10px] font-mono text-neutral-400">0 if no active debt</span>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-neutral-500">₹</span>
              <input
                type="number"
                step="500"
                value={profile.existingMonthlyEmis}
                onChange={(e) => updateField('existingMonthlyEmis', Number(e.target.value))}
                placeholder="0"
                className="w-full pl-8 pr-4 py-3 rounded-xl border border-white/10 bg-[#1A121E] font-mono text-xs text-white focus:outline-none focus:border-orange-500/60 transition-colors"
              />
            </div>
          </div>

          {/* Q7: Credit Score Band */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <label className="font-semibold text-white flex items-center gap-1.5">
              <span className="font-mono text-orange-400 text-xs">07.</span>
              <span>Credit Score Tier (CIBIL / Experian)</span>
            </label>
            <select
              value={profile.creditScoreBand}
              onChange={(e) => updateField('creditScoreBand', e.target.value as CreditScoreBand)}
              className="w-full p-3 rounded-xl border border-white/10 bg-[#1A121E] text-white font-medium text-xs focus:outline-none focus:border-orange-500/60 transition-colors"
            >
              <option value="EXCELLENT_750_PLUS">750+ (Excellent / Prime Tier)</option>
              <option value="GOOD_700_749">700 - 749 (Good Standard)</option>
              <option value="AVERAGE_650_699">650 - 699 (Fair / Moderate Risk)</option>
              <option value="LOW_UNDER_650">Below 650 (Subprime / Caution)</option>
              <option value="UNKNOWN">I don't know my credit score / Never taken formal loan</option>
            </select>
          </div>

          {/* Q8: Borrower Age */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-white flex items-center gap-1.5">
                <span className="font-mono text-orange-400 text-xs">08.</span>
                <span>Age of Primary Earner</span>
              </label>
              <span className="text-[10px] font-mono text-neutral-400">Years</span>
            </div>
            <input
              type="number"
              min="21"
              max="65"
              value={profile.age}
              onChange={(e) => updateField('age', Number(e.target.value))}
              className="w-full p-3 rounded-xl border border-white/10 bg-[#1A121E] font-mono text-xs text-white focus:outline-none focus:border-orange-500/60 transition-colors"
            />
          </div>

        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. TIER 2: HIGH-IMPACT PRECISION QUESTIONS (ACCORDION)        */}
      {/* ------------------------------------------------------------- */}
      <div className="p-6 sm:p-7 rounded-[2rem] bg-[#140F18]/95 border border-white/10 shadow-2xl backdrop-blur-xl space-y-5">
        
        {/* Accordion Toggle Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300">
              Tier 2
            </span>
            <div>
              <h3 className="font-display font-semibold text-white text-lg">Adaptive Precision Branching</h3>
              <p className="text-xs text-neutral-400 font-light mt-0.5">
                Every parameter below directly tightens rate spreads or unlocks secured products.
              </p>
            </div>
          </div>
          
          <button
            type="button"
            onClick={() => setShowTier2(!showTier2)}
            className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white cursor-pointer transition-colors"
            title={showTier2 ? "Collapse Tier 2" : "Expand Tier 2"}
          >
            {showTier2 ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {showTier2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs animate-fadeIn">
            
            {/* Adaptive 1: For Self-Employed or Business: ITR vs Cash ratio */}
            {profile.employmentType === 'SELF_EMPLOYED_BUSINESS' && (
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-white">Annual ITR Declared Net Profit (₹)</label>
                  <span className="font-mono text-[9px] px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    50% Cash Haircut Rule
                  </span>
                </div>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-neutral-500">₹</span>
                  <input
                    type="number"
                    step="10000"
                    value={profile.itrAnnualIncome}
                    onChange={(e) => updateField('itrAnnualIncome', Number(e.target.value))}
                    placeholder="e.g. 420000"
                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-white/10 bg-[#1A121E] font-mono text-xs text-white focus:outline-none focus:border-orange-500/60"
                  />
                </div>
                <p className="text-[11px] text-neutral-400 font-light">
                  Banks credit 100% of ITR profit, but haircut unverified cash by 50%.
                </p>
              </div>
            )}

            {/* Adaptive 2: Collateral (Unlocks LAP rates from 18% down to 9.5%) */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-white">Unencumbered Collateral Available?</label>
                <span className="font-mono text-[9px] px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Saves 400 - 800 bps
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={profile.collateralType}
                  onChange={(e) => updateField('collateralType', e.target.value as CollateralType)}
                  className="p-3 rounded-xl border border-white/10 bg-[#1A121E] text-white font-medium text-xs focus:outline-none focus:border-orange-500/60"
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
                  className="p-3 rounded-xl border border-white/10 bg-[#1A121E] text-white font-mono text-xs disabled:opacity-30 focus:outline-none focus:border-orange-500/60"
                />
              </div>
              <p className="text-[11px] text-neutral-400 font-light">
                Pledging unencumbered property unlocks secured Loan Against Property (LAP).
              </p>
            </div>

            {/* Adaptive 3: Earning Co-applicant */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-white">Earning Co-Applicant (Spouse / Family)</label>
                <span className="font-mono text-[9px] px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Expands Capacity
                </span>
              </div>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer text-white">
                  <input
                    type="checkbox"
                    checked={profile.hasCoApplicant}
                    onChange={(e) => updateField('hasCoApplicant', e.target.checked)}
                    className="accent-orange-500 w-4 h-4 rounded cursor-pointer"
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
                    className="flex-1 p-2.5 rounded-xl border border-white/10 bg-[#1A121E] text-white font-mono text-xs focus:outline-none focus:border-orange-500/60"
                  />
                )}
              </div>
              <p className="text-[11px] text-neutral-400 font-light">
                A salaried co-applicant (e.g. spouse) provides documented bank credit trail.
              </p>
            </div>

            {/* Adaptive 4: Repayment Track / Bounces in last 12m */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-white">NACH / Cheque Bounces (Last 12m)</label>
                <span className="font-mono text-[9px] px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Underwriting Flag
                </span>
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer text-neutral-300 hover:text-white">
                  <input
                    type="radio"
                    name="bounce"
                    checked={!profile.hasRecentBounce}
                    onChange={() => updateField('hasRecentBounce', false)}
                    className="accent-emerald-500"
                  />
                  <span>Zero Bounces (Clean)</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-rose-400 font-medium">
                  <input
                    type="radio"
                    name="bounce"
                    checked={profile.hasRecentBounce}
                    onChange={() => updateField('hasRecentBounce', true)}
                    className="accent-rose-500"
                  />
                  <span>1+ Bounced EMI</span>
                </label>
              </div>
              <p className="text-[11px] text-neutral-400 font-light">
                A recent bounce triggers automated bank rejection or heavy subprime surcharges.
              </p>
            </div>

            {/* Adaptive 5: Productive Loan Expected Earnings */}
            {(profile.loanPurpose === 'TWO_WHEELER_ASSET' || profile.loanPurpose === 'BUSINESS_GROWTH') && (
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-white">Expected Added Profit from Asset (₹)</label>
                  <span className="font-mono text-[9px] px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Offsets EMI
                  </span>
                </div>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-neutral-500">₹</span>
                  <input
                    type="number"
                    step="1000"
                    value={profile.expectedMonthlyReturnFromLoan}
                    onChange={(e) => updateField('expectedMonthlyReturnFromLoan', Number(e.target.value))}
                    placeholder="e.g. 15000 (increased delivery revenue)"
                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-white/10 bg-[#1A121E] font-mono text-xs text-white focus:outline-none focus:border-orange-500/60"
                  />
                </div>
                <p className="text-[11px] text-neutral-400 font-light">
                  Productive earnings are factored into debt serviceability at 60% haircut.
                </p>
              </div>
            )}

            {/* Adaptive 6: Highest Existing Loan Rate (Detects predatory app debt) */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-white">Highest Rate on Current Loans (% p.a.)</label>
                <span className="font-mono text-[9px] px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  Predatory Check
                </span>
              </div>
              <input
                type="number"
                step="0.5"
                value={profile.highestExistingLoanRate}
                onChange={(e) => updateField('highestExistingLoanRate', Number(e.target.value))}
                placeholder="e.g. 34% (instant apps)"
                className="w-full p-3 rounded-xl border border-white/10 bg-[#1A121E] font-mono text-xs text-white focus:outline-none focus:border-orange-500/60"
              />
              <p className="text-[11px] text-neutral-400 font-light">
                Rates &gt; 24% flag severe predatory debt and trigger consolidation priority.
              </p>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};

export default QuestionFlow;
