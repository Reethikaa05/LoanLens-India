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
  Activity,
  ShieldCheck,
  Percent,
  Wallet,
  Scale
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

  // Real-time calculated net free cashflow
  const netFreeCash = Math.max(0, profile.netMonthlyIncome - profile.monthlyEssentialExpenses - profile.existingMonthlyEmis);
  const bufferAmt = Math.round(profile.netMonthlyIncome * 0.20);
  const safeDiscretionarySurplus = Math.max(0, netFreeCash - bufferAmt);

  return (
    <div className="space-y-6 select-none animate-fadeIn">
      
      {/* ------------------------------------------------------------- */}
      {/* 1. COPILOT CONFIDENCE TELEMETRY BAR                           */}
      {/* ------------------------------------------------------------- */}
      <div className="p-5 sm:p-6 rounded-[2.5rem] bg-[#120D1A]/95 border border-white/10 shadow-2xl backdrop-blur-xl relative overflow-hidden group">
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform duration-700" />
        
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.25)]">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <span className="font-display font-bold text-white text-sm">Underwriting Precision Telemetry</span>
              <div className="text-[10px] text-neutral-400 font-mono">Confidence in Safe Ceiling & Fair Rate Band</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className={`text-xs font-mono font-bold px-3.5 py-1 rounded-full shadow-md ${
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
        <div className="relative z-10 w-full h-2.5 rounded-full bg-black/50 border border-white/5 overflow-hidden mb-3">
          <div
            className={`h-full transition-all duration-700 rounded-full ${
              confidenceScore >= 80
                ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_15px_rgba(16,185,129,0.6)]'
                : confidenceScore >= 60
                ? 'bg-gradient-to-r from-amber-500 to-orange-400 shadow-[0_0_15px_rgba(245,158,11,0.6)]'
                : 'bg-gradient-to-r from-rose-600 to-amber-500 shadow-[0_0_15px_rgba(244,63,94,0.6)]'
            }`}
            style={{ width: `${confidenceScore}%` }}
          />
        </div>

        {/* Live Cashflow Computation Banner */}
        <div className="relative z-10 p-3 rounded-2xl bg-black/40 border border-white/5 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-2">
            <Wallet className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-neutral-300">Free Net Cashflow:</span>
            <strong className="text-white">₹{netFreeCash.toLocaleString('en-IN')}/mo</strong>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Safe Surplus: ₹{safeDiscretionarySurplus.toLocaleString('en-IN')}</span>
          </div>
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
      <div className="p-6 sm:p-8 rounded-[2.5rem] bg-[#120D1A]/95 border border-white/10 shadow-2xl backdrop-blur-xl space-y-6">
        
        {/* Header Strip */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300">
              Tier 1
            </span>
            <div>
              <h3 className="font-display font-bold text-white text-lg">Essential Underwriting Intake</h3>
              <p className="text-xs text-neutral-400 font-light mt-0.5">
                Core parameters required to compute the 4 institutional outputs (O1–O4).
              </p>
            </div>
          </div>
        </div>

        {/* Form Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          
          {/* Q1: Purpose */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2.5">
            <label className="font-semibold text-white flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="font-mono text-amber-400 font-bold">01.</span>
                <span>Primary Loan Purpose</span>
              </span>
            </label>
            <select
              value={profile.loanPurpose}
              onChange={(e) => updateField('loanPurpose', e.target.value as LoanPurpose)}
              className="w-full p-3 rounded-xl border border-white/10 bg-[#1A121E] text-white font-medium text-xs focus:outline-none focus:border-amber-500/60 transition-colors"
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
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-white flex items-center gap-1.5">
                <span className="font-mono text-amber-400 font-bold">02.</span>
                <span>Target Amount Wanted</span>
              </label>
              <span className="font-mono font-bold text-amber-300 text-sm px-2.5 py-0.5 rounded-lg bg-amber-950/80 border border-amber-500/30">
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
              className="w-full accent-amber-500 cursor-pointer h-2 bg-neutral-800 rounded-lg"
            />
            <div className="flex flex-wrap gap-1.5 pt-1">
              {[150000, 500000, 800000, 1500000, 2500000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => updateField('requestedAmount', amt)}
                  className={`px-2.5 py-1 text-[10px] rounded-lg font-mono border transition-all cursor-pointer ${
                    profile.requestedAmount === amt
                      ? 'bg-amber-500 text-black font-bold border-amber-400 shadow-sm'
                      : 'border-white/10 text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  ₹{(amt / 100000).toFixed(1)}L
                </button>
              ))}
            </div>
          </div>

          {/* Q3: Employment & Income Type */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2.5">
            <label className="font-semibold text-white flex items-center gap-1.5">
              <span className="font-mono text-amber-400 font-bold">03.</span>
              <span>Employment & Income Type</span>
            </label>
            <select
              value={profile.employmentType}
              onChange={(e) => updateField('employmentType', e.target.value as EmploymentType)}
              className="w-full p-3 rounded-xl border border-white/10 bg-[#1A121E] text-white font-medium text-xs focus:outline-none focus:border-amber-500/60 transition-colors"
            >
              <option value="SALARIED_MNC">Salaried (Category-A Corporate / MNC / Govt)</option>
              <option value="SALARIED_SMALL">Salaried (SME / Local Firm / Contractual)</option>
              <option value="SELF_EMPLOYED_BUSINESS">Self-Employed (Shopkeeper / Trader / SME)</option>
              <option value="INFORMAL_GIG">Informal / Gig Worker (Delivery rider, Cash income)</option>
            </select>
          </div>

          {/* Q4: Net Monthly Household Inflow */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-white flex items-center gap-1.5">
                <span className="font-mono text-amber-400 font-bold">04.</span>
                <span>Net Monthly Take-Home (₹)</span>
              </label>
              <span className="text-[10px] font-mono text-neutral-400">After Taxes</span>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-neutral-500">₹</span>
              <input
                type="number"
                step="1000"
                value={profile.netMonthlyIncome}
                onChange={(e) => updateField('netMonthlyIncome', Number(e.target.value))}
                placeholder="e.g. 60000"
                className="w-full pl-8 pr-4 py-3 rounded-xl border border-white/10 bg-[#1A121E] font-mono text-xs text-white focus:outline-none focus:border-amber-500/60 transition-colors"
              />
            </div>
          </div>

          {/* Q5: Monthly Essential Living Expenses */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-white flex items-center gap-1.5">
                <span className="font-mono text-amber-400 font-bold">05.</span>
                <span>Monthly Essential Expenses (₹)</span>
              </label>
              <span className="text-[10px] font-mono text-neutral-400">Rent + Groceries</span>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-neutral-500">₹</span>
              <input
                type="number"
                step="1000"
                value={profile.monthlyEssentialExpenses}
                onChange={(e) => updateField('monthlyEssentialExpenses', Number(e.target.value))}
                placeholder="e.g. 32000"
                className="w-full pl-8 pr-4 py-3 rounded-xl border border-white/10 bg-[#1A121E] font-mono text-xs text-white focus:outline-none focus:border-amber-500/60 transition-colors"
              />
            </div>
          </div>

          {/* Q6: Existing Monthly EMIs */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-white flex items-center gap-1.5">
                <span className="font-mono text-amber-400 font-bold">06.</span>
                <span>Active Running EMIs (₹)</span>
              </label>
              <span className="text-[10px] font-mono text-neutral-400">0 if none</span>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-neutral-500">₹</span>
              <input
                type="number"
                step="500"
                value={profile.existingMonthlyEmis}
                onChange={(e) => updateField('existingMonthlyEmis', Number(e.target.value))}
                placeholder="0"
                className="w-full pl-8 pr-4 py-3 rounded-xl border border-white/10 bg-[#1A121E] font-mono text-xs text-white focus:outline-none focus:border-amber-500/60 transition-colors"
              />
            </div>
          </div>

          {/* Q7: Credit Score Band */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2.5">
            <label className="font-semibold text-white flex items-center gap-1.5">
              <span className="font-mono text-amber-400 font-bold">07.</span>
              <span>Credit Score Tier (CIBIL / Experian)</span>
            </label>
            <select
              value={profile.creditScoreBand}
              onChange={(e) => updateField('creditScoreBand', e.target.value as CreditScoreBand)}
              className="w-full p-3 rounded-xl border border-white/10 bg-[#1A121E] text-white font-medium text-xs focus:outline-none focus:border-amber-500/60 transition-colors"
            >
              <option value="EXCELLENT_750_PLUS">750+ (Excellent / Prime Tier)</option>
              <option value="GOOD_700_749">700 - 749 (Good Standard)</option>
              <option value="AVERAGE_650_699">650 - 699 (Fair / Moderate Risk)</option>
              <option value="LOW_UNDER_650">Below 650 (Subprime / Caution)</option>
              <option value="UNKNOWN">I don't know my score / New to Credit</option>
            </select>
          </div>

          {/* Q8: Borrower Age */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-white flex items-center gap-1.5">
                <span className="font-mono text-amber-400 font-bold">08.</span>
                <span>Age of Primary Earner</span>
              </label>
              <span className="text-[10px] font-mono text-neutral-400">{profile.age} Years</span>
            </div>
            <input
              type="number"
              min="21"
              max="65"
              value={profile.age}
              onChange={(e) => updateField('age', Number(e.target.value))}
              className="w-full p-3 rounded-xl border border-white/10 bg-[#1A121E] font-mono text-xs text-white focus:outline-none focus:border-amber-500/60 transition-colors"
            />
          </div>

        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. TIER 2: HIGH-IMPACT PRECISION QUESTIONS (ACCORDION)        */}
      {/* ------------------------------------------------------------- */}
      <div className="p-6 sm:p-8 rounded-[2.5rem] bg-[#120D1A]/95 border border-white/10 shadow-2xl backdrop-blur-xl space-y-5">
        
        {/* Accordion Toggle Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300">
              Tier 2
            </span>
            <div>
              <h3 className="font-display font-bold text-white text-lg">Adaptive Precision Branching</h3>
              <p className="text-xs text-neutral-400 font-light mt-0.5">
                Every parameter below directly tightens rate spreads or unlocks secured products.
              </p>
            </div>
          </div>
          
          <button
            type="button"
            onClick={() => setShowTier2(!showTier2)}
            className="p-2.5 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 text-white cursor-pointer transition-colors shadow-md"
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
                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-white/10 bg-[#1A121E] font-mono text-xs text-white focus:outline-none focus:border-amber-500/60"
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
                <span className="font-mono text-[9px] px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
                  Saves 400 - 800 bps
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={profile.collateralType}
                  onChange={(e) => updateField('collateralType', e.target.value as CollateralType)}
                  className="p-3 rounded-xl border border-white/10 bg-[#1A121E] text-white font-medium text-xs focus:outline-none focus:border-amber-500/60"
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
                  className="p-3 rounded-xl border border-white/10 bg-[#1A121E] text-white font-mono text-xs disabled:opacity-30 focus:outline-none focus:border-amber-500/60"
                />
              </div>
              <p className="text-[11px] text-neutral-400 font-light">
                Pledging real estate or gold unlocks 9.25% secured LAP instead of 18-20% personal loans.
              </p>
            </div>

            {/* Adaptive 3: Co-Applicant */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-white">Co-Applicant Addition</label>
                <span className="font-mono text-[9px] px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Expands Capacity
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={profile.hasCoApplicant ? 'YES' : 'NONE'}
                  onChange={(e) => {
                    const hasCo = e.target.value === 'YES';
                    updateField('hasCoApplicant', hasCo);
                    if (!hasCo) updateField('coApplicantIncome', 0);
                  }}
                  className="p-3 rounded-xl border border-white/10 bg-[#1A121E] text-white font-medium text-xs focus:outline-none focus:border-amber-500/60"
                >
                  <option value="NONE">No Co-Applicant</option>
                  <option value="YES">Working Spouse / Parent</option>
                </select>
                <input
                  type="number"
                  step="1000"
                  value={profile.coApplicantIncome}
                  onChange={(e) => updateField('coApplicantIncome', Number(e.target.value))}
                  placeholder="Co-app income (₹)"
                  disabled={!profile.hasCoApplicant}
                  className="p-3 rounded-xl border border-white/10 bg-[#1A121E] text-white font-mono text-xs disabled:opacity-30 focus:outline-none focus:border-amber-500/60"
                />
              </div>
              <p className="text-[11px] text-neutral-400 font-light">
                Adding an earning spouse pools household FOIR without triggering higher rate bands.
              </p>
            </div>

            {/* Adaptive 4: Instant App Loans & Highest Rate */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-white">Highest Active Rate & Loans Count</label>
                <span className="font-mono text-[9px] px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold">
                  Compounding Traps
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={profile.existingLoanCount}
                  onChange={(e) => updateField('existingLoanCount', Number(e.target.value))}
                  placeholder="Active loans count"
                  className="p-3 rounded-xl border border-white/10 bg-[#1A121E] text-white font-mono text-xs focus:outline-none focus:border-amber-500/60"
                />
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="60"
                    value={profile.highestExistingLoanRate}
                    onChange={(e) => updateField('highestExistingLoanRate', Number(e.target.value))}
                    placeholder="Peak rate %"
                    className="w-full p-3 rounded-xl border border-white/10 bg-[#1A121E] text-white font-mono text-xs focus:outline-none focus:border-amber-500/60"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 font-mono text-neutral-500">%</span>
                </div>
              </div>
              <p className="text-[11px] text-neutral-400 font-light">
                Rates above 24% (e.g. 30%+ instant apps) trigger an emergency intervention.
              </p>
            </div>

            {/* Adaptive 5: Bounce History */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-white">Cheque / NACH Bounce in Last 12M?</label>
                <span className="font-mono text-[9px] px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold">
                  Underwriting Friction
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => updateField('hasRecentBounce', false)}
                  className={`flex-1 py-2.5 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                    !profile.hasRecentBounce
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold'
                      : 'border-white/10 text-neutral-400 hover:text-white'
                  }`}
                >
                  ✓ Clean (0 Bounces)
                </button>
                <button
                  type="button"
                  onClick={() => updateField('hasRecentBounce', true)}
                  className={`flex-1 py-2.5 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                    profile.hasRecentBounce
                      ? 'bg-rose-500/20 border-rose-400 text-rose-300 font-bold'
                      : 'border-white/10 text-neutral-400 hover:text-white'
                  }`}
                >
                  ✕ 1+ Recent Bounces
                </button>
              </div>
              <p className="text-[11px] text-neutral-400 font-light">
                Even 1 recent bounce causes bank algorithmic models to widen rate spreads by +200-400 bps.
              </p>
            </div>

            {/* Adaptive 6: Emergency Fund Months */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
              <div className="flex items-center justify-between">
                <label className="font-semibold text-white">Emergency Fund Reserves</label>
                <span className="font-mono text-amber-300 font-bold">
                  {profile.emergencyFundMonths} Months Living Costs
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="12"
                step="1"
                value={profile.emergencyFundMonths}
                onChange={(e) => updateField('emergencyFundMonths', Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-neutral-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                <span>0 mo (Vulnerable)</span>
                <span>3 mo (Standard)</span>
                <span>6+ mo (Resilient)</span>
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};

export default QuestionFlow;
