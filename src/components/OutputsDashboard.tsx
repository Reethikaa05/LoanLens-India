import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ArrowRight, 
  Scale, 
  Percent, 
  ShieldAlert, 
  TrendingDown, 
  Zap, 
  Info, 
  Layers, 
  ExternalLink,
  ChevronRight,
  Calculator
} from 'lucide-react';
import { CopilotResult, TenureOption } from '../engine/types';

interface OutputsDashboardProps {
  result: CopilotResult;
  onOpenNegotiationCard: () => void;
}

export const OutputsDashboard: React.FC<OutputsDashboardProps> = ({
  result,
  onOpenNegotiationCard
}) => {
  const { verdict, amount, rate, emi, profile } = result;
  const [selectedTenureMonths, setSelectedTenureMonths] = useState<number>(profile.requestedTenureMonths || 36);

  // Find tenure option
  const activeTenureOption: TenureOption = emi.tenureMatrix.find((t) => t.months === selectedTenureMonths) || emi.tenureMatrix[2];

  // Verdict badge colors
  const verdictConfig = {
    BORROW: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200',
      badge: 'bg-emerald-600 text-white',
      icon: CheckCircle2
    },
    BORROW_LESS: {
      bg: 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200',
      badge: 'bg-amber-600 text-white',
      icon: AlertTriangle
    },
    DONT_BORROW: {
      bg: 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-200',
      badge: 'bg-rose-700 text-white',
      icon: XCircle
    }
  }[verdict.status];

  const VerdictIcon = verdictConfig.icon;

  return (
    <div className="space-y-6">
      {/* ================= OUTPUT 1: THE VERDICT ================= */}
      <div className={`p-6 sm:p-7 rounded-2xl border ${verdictConfig.bg} shadow-sm transition-all`}>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-black/10 dark:bg-white/10">
              Output O1 · Final Verdict
            </span>
            <span className={`font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${verdictConfig.badge}`}>
              {verdict.status.replace('_', ' ')}
            </span>
          </div>
          {verdict.safeDownsizedAmount && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 dark:bg-black/40 border border-current text-xs font-mono font-bold">
              <span>Safe Cap:</span>
              <span>₹{(verdict.safeDownsizedAmount / 100000).toFixed(1)} Lakhs</span>
            </div>
          )}
        </div>

        <div className="flex items-start gap-4">
          <div className="mt-1">
            <VerdictIcon className="w-8 h-8 shrink-0" />
          </div>
          <div className="space-y-2 flex-1">
            <h3 className="font-display font-medium text-2xl sm:text-3xl leading-snug">
              {verdict.headline}
            </h3>
            <p className="text-sm font-medium opacity-90 leading-relaxed max-w-3xl">
              <strong>Because:</strong> {verdict.oneLineReason}
            </p>

            {/* Analysis points */}
            <div className="pt-2 space-y-1.5">
              {verdict.detailedAnalysis.map((pt, i) => (
                <div key={i} className="flex items-start gap-2 text-xs opacity-85">
                  <span className="font-mono font-bold mt-0.5">•</span>
                  <span>{pt}</span>
                </div>
              ))}
            </div>

            {/* Recommended Product & Next Steps */}
            <div className="mt-4 pt-4 border-t border-black/10 dark:border-white/10 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 rounded-xl bg-white/60 dark:bg-black/20 text-xs">
                <span className="font-mono text-[10px] uppercase font-bold text-neutral-500 block mb-1">Recommended Loan Structure</span>
                <span className="font-semibold text-sm">{verdict.recommendedProduct}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/60 dark:bg-black/20 text-xs">
                <span className="font-mono text-[10px] uppercase font-bold text-neutral-500 block mb-1">Immediate Action</span>
                <span className="font-medium">{verdict.actionableSteps[0]}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= OUTPUT 2: MAXIMUM AMOUNT (SANCTION VS SAFE CARRY) ================= */}
      <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-neutral-900 border border-[#E2D9DE] dark:border-[#33293A] shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 border-b border-[#E2D9DE] dark:border-[#33293A] pb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#EFE3EA] dark:bg-[#2A1F2C] text-[#4B2440] dark:text-[#CFA5C1]">
              Output O2
            </span>
            <h3 className="font-display font-semibold text-xl">Maximum Borrowing Capacity</h3>
          </div>
          <span className="text-xs text-[#6E6069] dark:text-[#A99DA5]">
            Lender FOIR vs Real Free Cash Flow
          </span>
        </div>

        {/* Dual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
          {/* Card A: Lender Sanction */}
          <div className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40 relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider font-mono">
                Lender Will Sanction
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300">
                Aggressive FOIR ({amount.foirPercentUsed}%)
              </span>
            </div>
            <div className="font-display text-3xl sm:text-4xl font-semibold mb-1 text-neutral-800 dark:text-neutral-200">
              ₹{(amount.lenderSanctionMax / 100000).toFixed(1)} <span className="text-lg font-sans font-normal text-neutral-500">Lakhs</span>
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Based on gross income heuristics. Lenders gladly stretch to this ceiling to maximize interest revenue.
            </p>
          </div>

          {/* Card B: Safe Carry (Recommended) */}
          <div className="p-5 rounded-xl border-2 border-[#4B2440] dark:border-[#CFA5C1] bg-[#EFE3EA]/30 dark:bg-[#2A1F2C]/30 relative shadow-sm">
            <div className="absolute -top-3 right-4 px-2.5 py-0.5 rounded-full bg-[#4B2440] text-white dark:bg-[#CFA5C1] dark:text-black text-[10px] font-mono font-bold tracking-wider uppercase flex items-center gap-1">
              <span>★</span>
              <span>Use This Number</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-[#4B2440] dark:text-[#CFA5C1] uppercase tracking-wider font-mono">
                Borrower Safe Carry
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#EFE3EA] dark:bg-[#2A1F2C] text-[#4B2440] dark:text-[#CFA5C1] font-bold">
                Survival Math
              </span>
            </div>
            <div className="font-display text-3xl sm:text-4xl font-semibold mb-1 text-[#4B2440] dark:text-[#CFA5C1]">
              ₹{(amount.borrowerSafeCarryMax / 100000).toFixed(1)} <span className="text-lg font-sans font-normal text-[#6E6069] dark:text-[#A99DA5]">Lakhs</span>
            </div>
            <p className="text-xs text-[#221A20] dark:text-[#EEE6EA] leading-relaxed font-medium">
              Protects ₹{profile.monthlyEssentialExpenses.toLocaleString('en-IN')}/mo in actual living essentials + 20% emergency buffer.
            </p>
          </div>
        </div>

        {/* 1-Sentence Rationale Callout */}
        <div className="p-4 rounded-xl bg-[#EFE3EA]/50 dark:bg-[#2A1F2C]/50 border-l-4 border-[#4B2440] dark:border-[#CFA5C1] text-xs">
          <p className="font-semibold text-[#4B2440] dark:text-[#CFA5C1] mb-1">
            Why the gap of ₹{(amount.deltaAmount / 100000).toFixed(1)} Lakhs matters:
          </p>
          <p className="text-neutral-700 dark:text-neutral-300">
            {amount.oneSentenceWhy}
          </p>
        </div>
      </div>

      {/* ================= OUTPUT 3: FAIR INTEREST RATE & ALL-IN APR ================= */}
      <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-neutral-900 border border-[#E2D9DE] dark:border-[#33293A] shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 border-b border-[#E2D9DE] dark:border-[#33293A] pb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#EFE3EA] dark:bg-[#2A1F2C] text-[#4B2440] dark:text-[#CFA5C1]">
              Output O3
            </span>
            <h3 className="font-display font-semibold text-xl">Fair Interest Rate & True All-In APR</h3>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="font-mono text-neutral-500">Benchmark: Repo (6.50%)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Rate Display */}
          <div>
            <span className="text-xs text-neutral-500 font-medium block mb-1">Expected Fair Rate Band (p.a.)</span>
            <div className="font-display text-4xl font-semibold text-[#4B2440] dark:text-[#CFA5C1] mb-2">
              {rate.fairRateMin}% – {rate.fairRateMax}%
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 font-mono">
              Spread Formula: {rate.benchmarkSpread}
            </p>
          </div>

          {/* All-in APR (RBI KFS transparency) */}
          <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                All-In APR (RBI KFS Standard)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-200 dark:bg-neutral-700">
                Includes Processing Fee + 18% GST
              </span>
            </div>
            <div className="font-mono text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
              {rate.allInAprMin}% – {rate.allInAprMax}%
            </div>
            <div className="text-xs text-neutral-500 space-y-1 border-t border-neutral-200 dark:border-neutral-700 pt-2 font-mono">
              <div className="flex justify-between">
                <span>Fair Processing Fee:</span>
                <span>{rate.processingFeePercent}% (₹{rate.processingFeeGstAmount.toLocaleString('en-IN')} incl. GST)</span>
              </div>
              <div className="flex justify-between">
                <span>Prepayment Penalty:</span>
                <span className="text-emerald-600 font-bold">0% (RBI Mandate)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rate vs Lender Offer Alert (if entered) */}
        {rate.rateVerdictVsOffer && (
          <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
            <span className="font-semibold">{rate.rateVerdictVsOffer}</span>
          </div>
        )}

        {/* Confidence Widening Explanation */}
        <div className="text-xs text-neutral-500 bg-neutral-50 dark:bg-neutral-800/40 p-3 rounded-lg border border-neutral-100 dark:border-neutral-800">
          <strong className="text-neutral-700 dark:text-neutral-300">Why a band and not a single point? </strong>
          Lending is discretionary. If you don't know your credit score or lack documented ITR, banks widen their margin. Never agree to an offer above {rate.fairRateMax}% without challenging the underwriter.
        </div>
      </div>

      {/* ================= OUTPUT 4: EMI CEILING & STRESS TESTING ================= */}
      <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-neutral-900 border border-[#E2D9DE] dark:border-[#33293A] shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 border-b border-[#E2D9DE] dark:border-[#33293A] pb-3">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#EFE3EA] dark:bg-[#2A1F2C] text-[#4B2440] dark:text-[#CFA5C1]">
              Output O4
            </span>
            <h3 className="font-display font-semibold text-xl">Monthly EMI Ceiling & Tenure Trade-Off</h3>
          </div>
          <div className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-bold">
            Safe Monthly Ceiling: ₹{emi.safeEmiCeiling.toLocaleString('en-IN')}
          </div>
        </div>

        {/* 1-Sentence Ceiling Why */}
        <p className="text-xs text-[#6E6069] dark:text-[#A99DA5] mb-6">
          <strong>Ceiling Rationale:</strong> {emi.oneSentenceCeilingWhy}
        </p>

        {/* Tenure Switcher Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="font-semibold text-neutral-700 dark:text-neutral-300">Select Tenure to View Total Interest Drag:</span>
            <span className="font-mono text-neutral-500">{selectedTenureMonths} Months ({activeTenureOption.years} Years)</span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {emi.tenureMatrix.map((t) => {
              const isSelected = t.months === selectedTenureMonths;
              return (
                <button
                  key={t.months}
                  onClick={() => setSelectedTenureMonths(t.months)}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    isSelected
                      ? 'border-[#4B2440] dark:border-[#CFA5C1] bg-[#4B2440] text-white dark:bg-[#CFA5C1] dark:text-black shadow-sm font-semibold'
                      : t.isSafeCeiling
                      ? 'border-[#E2D9DE] dark:border-[#33293A] hover:bg-neutral-100 dark:hover:bg-neutral-800'
                      : 'border-rose-200 dark:border-rose-900/50 bg-rose-50/50 dark:bg-rose-950/20 text-rose-700'
                  }`}
                >
                  <div className="font-mono text-xs">{t.years} yr</div>
                  <div className="font-mono text-sm font-bold mt-1">₹{t.monthlyEmi.toLocaleString('en-IN')}</div>
                  <div className="text-[10px] opacity-75 mt-0.5">
                    {t.isSafeCeiling ? 'Safe' : 'Exceeds'}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Tenure Breakdown */}
          <div className="mt-4 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div>
              <span className="text-neutral-500 block">Monthly Outflow</span>
              <span className="font-mono text-lg font-bold">₹{activeTenureOption.monthlyEmi.toLocaleString('en-IN')}/mo</span>
            </div>
            <div>
              <span className="text-neutral-500 block">Total Interest Cost</span>
              <span className="font-mono text-lg font-bold text-amber-700 dark:text-amber-400">
                ₹{activeTenureOption.totalInterest.toLocaleString('en-IN')}
              </span>
            </div>
            <div>
              <span className="text-neutral-500 block">Total Repayment</span>
              <span className="font-mono text-lg font-bold">₹{activeTenureOption.totalRepayment.toLocaleString('en-IN')}</span>
            </div>
            <div>
              <span className="text-neutral-500 block">Interest / Principal</span>
              <span className="font-mono text-lg font-bold">{(activeTenureOption.interestToPrincipalRatio * 100).toFixed(0)}%</span>
            </div>
          </div>
        </div>

        {/* STRESS TESTS SECTION */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Zap className="w-4 h-4 text-[#8A4B12] dark:text-[#E0A265]" />
            <h4 className="font-display font-semibold text-base">Three Financial Stress Scenarios</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Stress 1: Income Shock */}
            <div className={`p-4 rounded-xl border text-xs ${
              emi.stressTests.incomeShock.isSurviving 
                ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200' 
                : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200'
            }`}>
              <div className="font-semibold mb-1 flex items-center justify-between">
                <span>{emi.stressTests.incomeShock.title}</span>
                <span className="font-mono font-bold">
                  {emi.stressTests.incomeShock.isSurviving ? '✓ Pass' : '✕ Fail'}
                </span>
              </div>
              <p className="text-[11px] opacity-80 mb-2">{emi.stressTests.incomeShock.condition}</p>
              <div className="font-mono font-medium">{emi.stressTests.incomeShock.riskNote}</div>
            </div>

            {/* Stress 2: Rate Shock */}
            <div className={`p-4 rounded-xl border text-xs ${
              emi.stressTests.rateShock.isSurviving 
                ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200' 
                : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200'
            }`}>
              <div className="font-semibold mb-1 flex items-center justify-between">
                <span>{emi.stressTests.rateShock.title}</span>
                <span className="font-mono font-bold">
                  {emi.stressTests.rateShock.isSurviving ? '✓ Pass' : '✕ Fail'}
                </span>
              </div>
              <p className="text-[11px] opacity-80 mb-2">{emi.stressTests.rateShock.condition}</p>
              <div className="font-mono font-medium">{emi.stressTests.rateShock.riskNote}</div>
            </div>

            {/* Stress 3: Emergency Shock */}
            <div className={`p-4 rounded-xl border text-xs ${
              emi.stressTests.emergencyShock.isSurviving 
                ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200' 
                : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200'
            }`}>
              <div className="font-semibold mb-1 flex items-center justify-between">
                <span>{emi.stressTests.emergencyShock.title}</span>
                <span className="font-mono font-bold">
                  {emi.stressTests.emergencyShock.isSurviving ? '✓ Pass' : '✕ Fail'}
                </span>
              </div>
              <p className="text-[11px] opacity-80 mb-2">{emi.stressTests.emergencyShock.condition}</p>
              <div className="font-mono font-medium">{emi.stressTests.emergencyShock.riskNote}</div>
            </div>
          </div>
        </div>

        {/* CTA TO NEGOTIATION CARD */}
        <div className="mt-8 pt-6 border-t border-[#E2D9DE] dark:border-[#33293A] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-display font-semibold text-lg">Ready to walk into the bank?</h4>
            <p className="text-xs text-[#6E6069] dark:text-[#A99DA5]">
              Generate your 1-page pocket Negotiation Card with word-for-word branch scripts.
            </p>
          </div>
          <button
            onClick={onOpenNegotiationCard}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#4B2440] text-white dark:bg-[#CFA5C1] dark:text-black font-semibold text-xs shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2"
          >
            <span>Open Negotiation Battle Card</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
