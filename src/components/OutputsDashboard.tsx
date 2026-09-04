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
  Calculator,
  ShieldCheck,
  Flame,
  Award
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

  // Verdict styling configurations
  const verdictConfig = {
    BORROW: {
      border: 'border-emerald-500/40',
      bg: 'bg-gradient-to-br from-[#062419] via-[#0B1713] to-[#0A1218]',
      badge: 'bg-emerald-500/20 border border-emerald-400/40 text-emerald-300',
      icon: CheckCircle2,
      glow: 'shadow-[0_0_30px_rgba(16,185,129,0.15)]'
    },
    BORROW_LESS: {
      border: 'border-amber-500/40',
      bg: 'bg-gradient-to-br from-[#291705] via-[#1A1215] to-[#0E0F14]',
      badge: 'bg-amber-500/20 border border-amber-400/40 text-amber-300',
      icon: AlertTriangle,
      glow: 'shadow-[0_0_30px_rgba(245,158,11,0.15)]'
    },
    DONT_BORROW: {
      border: 'border-rose-500/40',
      bg: 'bg-gradient-to-br from-[#2A080C] via-[#1A0B10] to-[#0E0B12]',
      badge: 'bg-rose-500/20 border border-rose-400/40 text-rose-300',
      icon: XCircle,
      glow: 'shadow-[0_0_30px_rgba(244,63,94,0.15)]'
    }
  }[verdict.status];

  const VerdictIcon = verdictConfig.icon;

  return (
    <div className="space-y-6 select-none animate-fadeIn">
      
      {/* ============================================================= */}
      {/* OUTPUT 1: THE FINAL VERDICT HERO CARD                         */}
      {/* ============================================================= */}
      <div className={`p-6 sm:p-8 rounded-[2rem] border ${verdictConfig.border} ${verdictConfig.bg} ${verdictConfig.glow} relative overflow-hidden backdrop-blur-xl transition-all`}>
        
        {/* Top Header Tags */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white">
              Output O1 · Final Verdict
            </span>
            <span className={`font-mono text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${verdictConfig.badge}`}>
              {verdict.status.replace('_', ' ')}
            </span>
          </div>
          
          {verdict.safeDownsizedAmount && (
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-400/40 text-xs font-mono font-bold text-orange-300">
              <span>Safe Cap:</span>
              <span>₹{(verdict.safeDownsizedAmount / 100000).toFixed(1)} Lakhs</span>
            </div>
          )}
        </div>

        {/* Core Verdict Text */}
        <div className="flex items-start gap-4">
          <div className="mt-1">
            <VerdictIcon className="w-8 h-8 shrink-0 text-white" />
          </div>
          <div className="space-y-3 flex-1">
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white leading-tight">
              {verdict.headline}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed max-w-3xl">
              <strong className="text-orange-400">Because:</strong> {verdict.oneLineReason}
            </p>

            {/* Detailed Analysis Bullet Points */}
            <div className="pt-2 space-y-2 border-t border-white/10">
              {verdict.detailedAnalysis.map((pt, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                  <span className="font-mono text-orange-400 font-bold mt-0.5">•</span>
                  <span className="leading-relaxed">{pt}</span>
                </div>
              ))}
            </div>

            {/* Recommended Loan Structure & Immediate Action Cards */}
            <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-black/30 border border-white/10">
                <span className="font-mono text-[10px] uppercase font-bold text-orange-400 block mb-1">
                  Recommended Loan Structure
                </span>
                <span className="font-semibold text-white text-xs">{verdict.recommendedProduct}</span>
              </div>
              <div className="p-3.5 rounded-xl bg-black/30 border border-white/10">
                <span className="font-mono text-[10px] uppercase font-bold text-cyan-400 block mb-1">
                  Immediate Action
                </span>
                <span className="font-medium text-white text-xs">{verdict.actionableSteps[0]}</span>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* ============================================================= */}
      {/* OUTPUT 2: MAXIMUM BORROWING CAPACITY (SANCTION VS SAFE CARRY)  */}
      {/* ============================================================= */}
      <div className="p-6 sm:p-7 rounded-[2rem] bg-[#140F18]/95 border border-white/10 shadow-2xl backdrop-blur-xl space-y-5">
        
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-xl bg-orange-500/20 border border-orange-400/40 text-orange-300">
              Output O2
            </span>
            <h3 className="font-display font-semibold text-white text-lg">Maximum Borrowing Capacity</h3>
          </div>
          <span className="text-xs text-neutral-400 font-mono">
            Lender Gross FOIR vs Real Living Cash Flow
          </span>
        </div>

        {/* Dual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Card A: Lender Sanction */}
          <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02] relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider font-mono">
                Lender Will Sanction
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                Aggressive FOIR ({amount.foirPercentUsed}%)
              </span>
            </div>
            <div className="font-display text-3xl sm:text-4xl font-bold mb-1 text-white">
              ₹{(amount.lenderSanctionMax / 100000).toFixed(1)} <span className="text-sm font-sans font-normal text-neutral-400">Lakhs</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed mt-2 font-light">
              Based on gross income heuristics. Lenders gladly stretch to this ceiling to maximize interest revenue.
            </p>
          </div>

          {/* Card B: Safe Carry (Recommended) */}
          <div className="p-5 rounded-2xl border-2 border-orange-500/50 bg-gradient-to-br from-[#200E17] to-[#120B1A] relative shadow-xl">
            <div className="absolute -top-3 right-4 px-3 py-0.5 rounded-full bg-orange-500 text-black text-[10px] font-mono font-bold tracking-wider uppercase flex items-center gap-1 shadow-md">
              <span>★</span>
              <span>Use This Number</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-orange-300 uppercase tracking-wider font-mono">
                Borrower Safe Carry
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-orange-950/80 text-orange-300 border border-orange-500/30 font-bold">
                Survival Math
              </span>
            </div>
            <div className="font-display text-3xl sm:text-4xl font-bold mb-1 text-orange-300">
              ₹{(amount.borrowerSafeCarryMax / 100000).toFixed(1)} <span className="text-sm font-sans font-normal text-neutral-400">Lakhs</span>
            </div>
            <p className="text-xs text-neutral-200 leading-relaxed mt-2 font-light">
              Protects ₹{profile.monthlyEssentialExpenses.toLocaleString('en-IN')}/mo in actual living essentials + 20% emergency buffer.
            </p>
          </div>

        </div>

        {/* 1-Sentence Rationale Callout */}
        <div className="p-4 rounded-xl bg-orange-950/30 border-l-4 border-orange-500 text-xs space-y-1">
          <p className="font-semibold text-orange-300">
            Why the gap of ₹{(amount.deltaAmount / 100000).toFixed(1)} Lakhs matters:
          </p>
          <p className="text-neutral-300 font-light leading-relaxed">
            {amount.oneSentenceWhy}
          </p>
        </div>

      </div>

      {/* ============================================================= */}
      {/* OUTPUT 3: FAIR INTEREST RATE & ALL-IN APR                     */}
      {/* ============================================================= */}
      <div className="p-6 sm:p-7 rounded-[2rem] bg-[#140F18]/95 border border-white/10 shadow-2xl backdrop-blur-xl space-y-5">
        
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-xl bg-orange-500/20 border border-orange-400/40 text-orange-300">
              Output O3
            </span>
            <h3 className="font-display font-semibold text-white text-lg">Fair Interest Rate & True All-In APR</h3>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-300">
            <span>Benchmark: Repo 6.50%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Rate Display */}
          <div className="space-y-2">
            <span className="text-xs text-neutral-400 font-medium block">Expected Fair Rate Band (p.a.)</span>
            <div className="font-display text-4xl sm:text-5xl font-bold text-white">
              {rate.fairRateMin}% – {rate.fairRateMax}%
            </div>
            <p className="text-xs text-orange-400/90 font-mono">
              Spread Formula: {rate.benchmarkSpread}
            </p>
          </div>

          {/* All-in APR (RBI KFS transparency) */}
          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white">
                All-In APR (RBI KFS Standard)
              </span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/10 text-neutral-300">
                Includes Processing + 18% GST
              </span>
            </div>
            <div className="font-mono text-2xl font-bold text-orange-300">
              {rate.allInAprMin}% – {rate.allInAprMax}%
            </div>
            <div className="text-xs text-neutral-400 space-y-1.5 border-t border-white/10 pt-2 font-mono">
              <div className="flex justify-between">
                <span>Fair Processing Fee:</span>
                <span className="text-white">{rate.processingFeePercent}% (₹{rate.processingFeeGstAmount.toLocaleString('en-IN')} incl. GST)</span>
              </div>
              <div className="flex justify-between">
                <span>Prepayment Penalty:</span>
                <span className="text-emerald-400 font-bold">0% (RBI Mandate)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Rate vs Lender Offer Alert (if entered) */}
        {rate.rateVerdictVsOffer && (
          <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/40 text-xs text-amber-200 flex items-center gap-2.5">
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
            <span className="font-semibold">{rate.rateVerdictVsOffer}</span>
          </div>
        )}

      </div>

      {/* ============================================================= */}
      {/* OUTPUT 4: MONTHLY EMI CEILING & STRESS TESTING                */}
      {/* ============================================================= */}
      <div className="p-6 sm:p-7 rounded-[2rem] bg-[#140F18]/95 border border-white/10 shadow-2xl backdrop-blur-xl space-y-6">
        
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-xl bg-orange-500/20 border border-orange-400/40 text-orange-300">
              Output O4
            </span>
            <h3 className="font-display font-semibold text-white text-lg">Monthly EMI Ceiling & Tenure Matrix</h3>
          </div>
          <div className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-mono font-bold">
            Safe Ceiling: ₹{emi.safeEmiCeiling.toLocaleString('en-IN')}/mo
          </div>
        </div>

        {/* 1-Sentence Ceiling Why */}
        <p className="text-xs text-neutral-300 font-light leading-relaxed">
          <strong className="text-white">Ceiling Rationale:</strong> {emi.oneSentenceCeilingWhy}
        </p>

        {/* Tenure Switcher Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-white">Select Tenure to Inspect Total Interest Drag:</span>
            <span className="font-mono text-orange-300">{selectedTenureMonths} Months ({activeTenureOption.years} Years)</span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {emi.tenureMatrix.map((t) => {
              const isSelected = t.months === selectedTenureMonths;
              return (
                <button
                  key={t.months}
                  onClick={() => setSelectedTenureMonths(t.months)}
                  className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'border-orange-500 bg-orange-500 text-black font-bold shadow-[0_0_15px_rgba(249,115,22,0.4)]'
                      : t.isSafeCeiling
                      ? 'border-white/10 bg-white/[0.02] text-white hover:bg-white/5'
                      : 'border-rose-500/30 bg-rose-950/20 text-rose-300'
                  }`}
                >
                  <div className="font-mono text-xs">{t.years} yr</div>
                  <div className="font-mono text-sm font-bold mt-1">₹{(t.monthlyEmi / 1000).toFixed(0)}k</div>
                  <div className="text-[9px] opacity-80 mt-0.5">
                    {t.isSafeCeiling ? 'Safe' : 'Exceeds'}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Tenure Breakdown */}
          <div className="mt-4 p-4 rounded-2xl bg-black/40 border border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-neutral-400 block text-[10px]">Monthly Outflow</span>
              <span className="font-mono text-base font-bold text-white">₹{activeTenureOption.monthlyEmi.toLocaleString('en-IN')}</span>
            </div>
            <div>
              <span className="text-neutral-400 block text-[10px]">Total Interest Burden</span>
              <span className="font-mono text-base font-bold text-amber-400">₹{activeTenureOption.totalInterest.toLocaleString('en-IN')}</span>
            </div>
            <div>
              <span className="text-neutral-400 block text-[10px]">Total Repayment</span>
              <span className="font-mono text-base font-bold text-white">₹{activeTenureOption.totalRepayment.toLocaleString('en-IN')}</span>
            </div>
            <div>
              <span className="text-neutral-400 block text-[10px]">Interest Drag Ratio</span>
              <span className="font-mono text-base font-bold text-orange-300">{(activeTenureOption.interestToPrincipalRatio * 100).toFixed(0)}%</span>
            </div>
          </div>

        </div>

        {/* 3 Financial Stress Tests */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-orange-400" />
            <h4 className="font-display font-semibold text-white text-sm">Three Financial Stress Scenarios</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            
            {/* Stress 1: Income Shock */}
            <div className={`p-4 rounded-2xl border text-xs ${
              emi.stressTests.incomeShock.isSurviving 
                ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200' 
                : 'bg-rose-950/30 border-rose-500/30 text-rose-200'
            }`}>
              <div className="font-semibold mb-1 flex items-center justify-between">
                <span>{emi.stressTests.incomeShock.title}</span>
                <span className="font-mono font-bold">
                  {emi.stressTests.incomeShock.isSurviving ? '✓ Pass' : '✕ Fail'}
                </span>
              </div>
              <p className="text-[11px] opacity-80 mb-2 font-light">{emi.stressTests.incomeShock.condition}</p>
              <div className="font-mono text-[10px]">{emi.stressTests.incomeShock.riskNote}</div>
            </div>

            {/* Stress 2: Rate Shock */}
            <div className={`p-4 rounded-2xl border text-xs ${
              emi.stressTests.rateShock.isSurviving 
                ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200' 
                : 'bg-rose-950/30 border-rose-500/30 text-rose-200'
            }`}>
              <div className="font-semibold mb-1 flex items-center justify-between">
                <span>{emi.stressTests.rateShock.title}</span>
                <span className="font-mono font-bold">
                  {emi.stressTests.rateShock.isSurviving ? '✓ Pass' : '✕ Fail'}
                </span>
              </div>
              <p className="text-[11px] opacity-80 mb-2 font-light">{emi.stressTests.rateShock.condition}</p>
              <div className="font-mono text-[10px]">{emi.stressTests.rateShock.riskNote}</div>
            </div>

            {/* Stress 3: Emergency Shock */}
            <div className={`p-4 rounded-2xl border text-xs ${
              emi.stressTests.emergencyShock.isSurviving 
                ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200' 
                : 'bg-rose-950/30 border-rose-500/30 text-rose-200'
            }`}>
              <div className="font-semibold mb-1 flex items-center justify-between">
                <span>{emi.stressTests.emergencyShock.title}</span>
                <span className="font-mono font-bold">
                  {emi.stressTests.emergencyShock.isSurviving ? '✓ Pass' : '✕ Fail'}
                </span>
              </div>
              <p className="text-[11px] opacity-80 mb-2 font-light">{emi.stressTests.emergencyShock.condition}</p>
              <div className="font-mono text-[10px]">{emi.stressTests.emergencyShock.riskNote}</div>
            </div>

          </div>
        </div>

        {/* CTA Banner to Negotiation Card */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-display font-semibold text-white text-base">Ready to walk into the branch?</h4>
            <p className="text-xs text-neutral-400 font-light">
              Generate your 1-page pocket Negotiation Card with word-for-word branch scripts.
            </p>
          </div>
          <button
            onClick={onOpenNegotiationCard}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-black font-semibold text-xs shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Open Negotiation Card</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};

export default OutputsDashboard;
