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
  Award,
  Sparkles,
  ArrowUpRight,
  TrendingUp,
  FileText
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
      border: 'border-emerald-500/50',
      bg: 'bg-gradient-to-br from-[#042417] via-[#091713] to-[#08121B]',
      badge: 'bg-emerald-500/20 border border-emerald-400/50 text-emerald-300',
      tagText: 'ROUTING: BORROW (OPTIMAL SECURED ROUTE)',
      icon: CheckCircle2,
      glow: 'shadow-[0_0_40px_rgba(16,185,129,0.2)]',
      pulseBg: 'bg-emerald-400',
      radarText: 'Optimal Route Active'
    },
    BORROW_LESS: {
      border: 'border-amber-500/50',
      bg: 'bg-gradient-to-br from-[#231104] via-[#140E1B] to-[#0A1218]',
      badge: 'bg-amber-500/20 border border-amber-400/50 text-amber-300',
      tagText: 'ROUTING: BORROW LESS (CAP DISCRETIONARY)',
      icon: AlertTriangle,
      glow: 'shadow-[0_0_40px_rgba(245,158,11,0.2)]',
      pulseBg: 'bg-amber-400',
      radarText: 'Safe Discretionary Ceiling'
    },
    DONT_BORROW: {
      border: 'border-rose-500/50',
      bg: 'bg-gradient-to-br from-[#27070D] via-[#140B16] to-[#0A0D15]',
      badge: 'bg-rose-500/20 border border-rose-400/50 text-rose-300',
      tagText: 'ROUTING: DONT BORROW (DEBT TRAP DEFENSE)',
      icon: XCircle,
      glow: 'shadow-[0_0_40px_rgba(244,63,94,0.2)]',
      pulseBg: 'bg-rose-400',
      radarText: 'Predatory Trap Intercepted'
    }
  }[verdict.status];

  const VerdictIcon = verdictConfig.icon;

  return (
    <div className="space-y-6 select-none animate-fadeIn">
      
      {/* ============================================================= */}
      {/* OUTPUT 1: THE FINAL VERDICT HERO TERMINAL                     */}
      {/* ============================================================= */}
      <div className={`p-6 sm:p-8 rounded-[2.5rem] border-2 ${verdictConfig.border} ${verdictConfig.bg} ${verdictConfig.glow} relative overflow-hidden backdrop-blur-2xl transition-all group`}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition-transform duration-700" />
        
        {/* Top Header Tags */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-white">
              Output O1 · Underwriting Verdict
            </span>
            <span className={`font-mono text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full ${verdictConfig.badge}`}>
              {verdictConfig.tagText}
            </span>
          </div>

          {/* Live Radar Pulse */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${verdictConfig.pulseBg}`} />
              <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${verdictConfig.pulseBg}`} />
            </span>
            <span className="text-[11px] font-mono text-neutral-300 font-semibold uppercase">
              {verdictConfig.radarText}
            </span>
          </div>
        </div>

        {/* Core Verdict Text */}
        <div className="relative z-10 space-y-4">
          <div className="flex items-start gap-4">
            <div className="mt-1 p-2 rounded-2xl bg-white/10 border border-white/10 shadow-sm shrink-0">
              <VerdictIcon className="w-7 h-7 text-white" />
            </div>
            <div className="space-y-2 flex-1">
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white leading-tight">
                {verdict.headline}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-light">
                <strong className="text-amber-400 font-bold">Mathematical Rationale:</strong> {verdict.oneLineReason}
              </p>
            </div>
          </div>

          {/* Detailed Analysis Bullet Points */}
          <div className="pt-3 space-y-2 border-t border-white/10">
            {verdict.detailedAnalysis.map((pt, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs text-neutral-300">
                <span className="font-mono text-amber-400 font-bold mt-0.5">•</span>
                <span className="leading-relaxed font-light">{pt}</span>
              </div>
            ))}
          </div>

          {/* Recommended Loan Structure & Immediate Action Cards */}
          <div className="pt-4 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
              <span className="text-[10px] uppercase font-bold text-amber-400 block tracking-wider">
                Recommended Loan Product
              </span>
              <span className="font-bold text-white text-xs block leading-snug">{verdict.recommendedProduct}</span>
            </div>
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
              <span className="text-[10px] uppercase font-bold text-cyan-400 block tracking-wider">
                Immediate Tactical Counter-Action
              </span>
              <span className="font-medium text-neutral-200 text-xs block leading-snug">{verdict.actionableSteps[0]}</span>
            </div>
          </div>

        </div>

      </div>

      {/* ============================================================= */}
      {/* OUTPUT 2: MAXIMUM BORROWING CAPACITY (SANCTION VS SAFE CARRY)  */}
      {/* ============================================================= */}
      <div className="p-6 sm:p-8 rounded-[2.5rem] bg-[#120D1A]/95 border border-white/10 shadow-2xl backdrop-blur-xl space-y-6">
        
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300">
              Output O2
            </span>
            <h3 className="font-display font-bold text-white text-lg">Maximum Borrowing Capacity Dual-Matrix</h3>
          </div>
          <span className="text-xs text-neutral-400 font-mono">
            Gross FOIR Sanction vs Real Discretionary Surplus
          </span>
        </div>

        {/* Dual Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Card A: Lender Sanction */}
          <div className="p-6 rounded-3xl border border-white/10 bg-white/[0.02] relative space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-400 uppercase tracking-wider font-mono">
                Lender Will Sanction
              </span>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold">
                Aggressive FOIR ({amount.foirPercentUsed}%)
              </span>
            </div>
            <div className="font-display text-3xl sm:text-4xl font-bold text-white">
              ₹{(amount.lenderSanctionMax / 100000).toFixed(1)} <span className="text-sm font-sans font-normal text-neutral-400">Lakhs</span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Computed on unadjusted gross salary. Lenders intentionally push this limit to maximize lifetime interest extraction.
            </p>
          </div>

          {/* Card B: Safe Carry (Recommended) */}
          <div className="p-6 rounded-3xl border-2 border-amber-500/50 bg-gradient-to-br from-[#1E0D1A] via-[#140E1B] to-[#0A1624] relative shadow-2xl space-y-3">
            <div className="absolute -top-3 right-4 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-black text-[10px] font-mono font-bold tracking-wider uppercase flex items-center gap-1 shadow-md">
              <ShieldCheck className="w-3 h-3 text-black" />
              <span>Recommended Safe Floor</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider font-mono">
                Borrower Safe Carry
              </span>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-amber-950/80 text-amber-300 border border-amber-500/40 font-bold">
                Protected Solvency
              </span>
            </div>
            <div className="font-display text-3xl sm:text-4xl font-bold text-amber-300">
              ₹{(amount.borrowerSafeCarryMax / 100000).toFixed(1)} <span className="text-sm font-sans font-normal text-neutral-400">Lakhs</span>
            </div>
            <p className="text-xs text-neutral-200 leading-relaxed font-light">
              Protects ₹{profile.monthlyEssentialExpenses.toLocaleString('en-IN')}/mo living overhead + inviolable 20% living buffer.
            </p>
          </div>

        </div>

        {/* The Predatory Gap Callout */}
        <div className="p-5 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-xs space-y-2 font-mono">
          <div className="flex items-center justify-between">
            <span className="font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Predatory Over-Leverage Risk Gap:</span>
            </span>
            <span className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold">
              ₹{(amount.deltaAmount / 100000).toFixed(1)} Lakhs Phantom Debt
            </span>
          </div>
          <p className="text-neutral-300 font-light leading-relaxed font-sans text-xs">
            {amount.oneSentenceWhy}
          </p>
        </div>

      </div>

      {/* ============================================================= */}
      {/* OUTPUT 3: FAIR INTEREST RATE & ALL-IN APR                     */}
      {/* ============================================================= */}
      <div className="p-6 sm:p-8 rounded-[2.5rem] bg-[#120D1A]/95 border border-white/10 shadow-2xl backdrop-blur-xl space-y-6">
        
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300">
              Output O3
            </span>
            <h3 className="font-display font-bold text-white text-lg">Fair Interest Rate & True All-In APR</h3>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-bold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>RBI Repo Benchmark: 6.50%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Rate Display */}
          <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 space-y-3">
            <span className="text-xs text-neutral-400 font-mono uppercase tracking-wider block">
              Fair Risk-Adjusted Rate Band
            </span>
            <div className="font-display text-4xl sm:text-5xl font-bold text-white">
              {rate.fairRateMin}% – {rate.fairRateMax}%
            </div>
            <p className="text-xs text-amber-300 font-mono">
              Spread Formula: {rate.benchmarkSpread}
            </p>
            <p className="text-[11px] text-neutral-400 font-light leading-relaxed">
              Based on formal RBI benchmark repo rate plus audited credit score and collateral security premium.
            </p>
          </div>

          {/* All-in APR (RBI KFS transparency) */}
          <div className="p-6 rounded-3xl bg-black/40 border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white font-mono uppercase">
                RBI KFS All-In Effective APR
              </span>
              <span className="text-[9px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                Statutory Transparent
              </span>
            </div>
            <div className="font-mono text-3xl font-bold text-amber-300">
              {rate.allInAprMin}% – {rate.allInAprMax}%
            </div>
            <div className="text-xs text-neutral-400 space-y-2 border-t border-white/10 pt-3 font-mono">
              <div className="flex justify-between">
                <span>Processing Fee Ceiling:</span>
                <span className="text-white font-bold">{rate.processingFeePercent}% (₹{rate.processingFeeGstAmount.toLocaleString('en-IN')})</span>
              </div>
              <div className="flex justify-between">
                <span>Prepayment Penalty:</span>
                <span className="text-emerald-400 font-bold">0% (RBI Mandate)</span>
              </div>
              <div className="flex justify-between">
                <span>Bundled Insurance:</span>
                <span className="text-cyan-300 font-bold">Voluntary (Reject single-premium)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Rate vs Lender Offer Alert (if entered) */}
        {rate.rateVerdictVsOffer && (
          <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-xs text-amber-200 flex items-center gap-2.5 font-mono">
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
            <span className="font-semibold">{rate.rateVerdictVsOffer}</span>
          </div>
        )}

      </div>

      {/* ============================================================= */}
      {/* OUTPUT 4: MONTHLY EMI CEILING & STRESS TESTING                */}
      {/* ============================================================= */}
      <div className="p-6 sm:p-8 rounded-[2.5rem] bg-[#120D1A]/95 border border-white/10 shadow-2xl backdrop-blur-xl space-y-6">
        
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300">
              Output O4
            </span>
            <h3 className="font-display font-bold text-white text-lg">Monthly EMI Ceiling & Tenure Matrix</h3>
          </div>
          <div className="px-3.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-mono font-bold">
            Safe Ceiling: ₹{emi.safeEmiCeiling.toLocaleString('en-IN')}/mo
          </div>
        </div>

        {/* 1-Sentence Ceiling Why */}
        <p className="text-xs text-neutral-300 font-light leading-relaxed">
          <strong className="text-white font-bold">Ceiling Rationale:</strong> {emi.oneSentenceCeilingWhy}
        </p>

        {/* Tenure Switcher Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-white">Select Tenure to Inspect Total Interest Drag:</span>
            <span className="font-mono text-amber-300 font-bold px-3 py-1 rounded-full bg-amber-950/70 border border-amber-500/30">
              {selectedTenureMonths} Months ({activeTenureOption.years} Years)
            </span>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
            {emi.tenureMatrix.map((t) => {
              const isSelected = t.months === selectedTenureMonths;
              return (
                <button
                  key={t.months}
                  onClick={() => setSelectedTenureMonths(t.months)}
                  className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'border-amber-500 bg-amber-500 text-black font-bold shadow-[0_0_20px_rgba(245,158,11,0.4)] scale-105'
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
          <div className="p-5 rounded-2xl bg-black/40 border border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div>
              <span className="text-neutral-400 block text-[10px] uppercase">Monthly Outflow</span>
              <span className="font-mono text-lg font-bold text-white">₹{activeTenureOption.monthlyEmi.toLocaleString('en-IN')}</span>
            </div>
            <div>
              <span className="text-neutral-400 block text-[10px] uppercase">Total Interest Drag</span>
              <span className="font-mono text-lg font-bold text-amber-400">₹{activeTenureOption.totalInterest.toLocaleString('en-IN')}</span>
            </div>
            <div>
              <span className="text-neutral-400 block text-[10px] uppercase">Total Repayment</span>
              <span className="font-mono text-lg font-bold text-white">₹{activeTenureOption.totalRepayment.toLocaleString('en-IN')}</span>
            </div>
            <div>
              <span className="text-neutral-400 block text-[10px] uppercase">Interest Drag Ratio</span>
              <span className="font-mono text-lg font-bold text-cyan-300">{(activeTenureOption.interestToPrincipalRatio * 100).toFixed(0)}%</span>
            </div>
          </div>

        </div>

        {/* 3 Financial Stress Tests */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <h4 className="font-display font-bold text-white text-sm">Three Financial Stress Scenarios</h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            
            {/* Stress 1: Income Shock */}
            <div className={`p-4 rounded-2xl border text-xs ${
              emi.stressTests.incomeShock.isSurviving 
                ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200 shadow-sm' 
                : 'bg-rose-950/30 border-rose-500/40 text-rose-200 shadow-sm'
            }`}>
              <div className="font-semibold mb-1 flex items-center justify-between">
                <span className="font-bold">{emi.stressTests.incomeShock.title}</span>
                <span className="font-mono font-bold px-2 py-0.5 rounded-full text-[10px] bg-black/40">
                  {emi.stressTests.incomeShock.isSurviving ? '✓ Pass' : '✕ Fail'}
                </span>
              </div>
              <p className="text-[11px] opacity-80 mb-2 font-light">{emi.stressTests.incomeShock.condition}</p>
              <div className="font-mono text-[10px]">{emi.stressTests.incomeShock.riskNote}</div>
            </div>

            {/* Stress 2: Rate Shock */}
            <div className={`p-4 rounded-2xl border text-xs ${
              emi.stressTests.rateShock.isSurviving 
                ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200 shadow-sm' 
                : 'bg-rose-950/30 border-rose-500/40 text-rose-200 shadow-sm'
            }`}>
              <div className="font-semibold mb-1 flex items-center justify-between">
                <span className="font-bold">{emi.stressTests.rateShock.title}</span>
                <span className="font-mono font-bold px-2 py-0.5 rounded-full text-[10px] bg-black/40">
                  {emi.stressTests.rateShock.isSurviving ? '✓ Pass' : '✕ Fail'}
                </span>
              </div>
              <p className="text-[11px] opacity-80 mb-2 font-light">{emi.stressTests.rateShock.condition}</p>
              <div className="font-mono text-[10px]">{emi.stressTests.rateShock.riskNote}</div>
            </div>

            {/* Stress 3: Emergency Shock */}
            <div className={`p-4 rounded-2xl border text-xs ${
              emi.stressTests.emergencyShock.isSurviving 
                ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-200 shadow-sm' 
                : 'bg-rose-950/30 border-rose-500/40 text-rose-200 shadow-sm'
            }`}>
              <div className="font-semibold mb-1 flex items-center justify-between">
                <span className="font-bold">{emi.stressTests.emergencyShock.title}</span>
                <span className="font-mono font-bold px-2 py-0.5 rounded-full text-[10px] bg-black/40">
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
            <h4 className="font-display font-bold text-white text-base">Ready to enforce these terms with branch officers?</h4>
            <p className="text-xs text-neutral-400 font-light mt-0.5">
              Generate your official 1-page Branch Negotiation Card with statutory fee caps, fair rate bands, and unbundling proof.
            </p>
          </div>
          <button
            onClick={onOpenNegotiationCard}
            className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-semibold text-xs shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
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
