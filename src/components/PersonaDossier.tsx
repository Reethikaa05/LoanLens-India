import React, { useState } from 'react';
import { 
  UserCheck, 
  ShieldAlert, 
  Award, 
  ChevronRight, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  AlertOctagon,
  Sparkles,
  TrendingDown,
  Building2,
  DollarSign,
  Copy,
  Check,
  Sliders,
  Scale,
  Percent,
  Calculator,
  ArrowUpRight,
  AlertTriangle
} from 'lucide-react';
import { PRESET_PROFILES } from '../engine/scenarios';
import { evaluateCopilot } from '../engine/calculator';
import { BorrowerProfile } from '../engine/types';

interface PersonaDossierProps {
  onSelectAndLaunch?: (profile: BorrowerProfile) => void;
}

export const PersonaDossier: React.FC<PersonaDossierProps> = ({ onSelectAndLaunch }) => {
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>('priya');
  const [copiedScriptIndex, setCopiedScriptIndex] = useState<number | null>(null);
  const [syncedProfile, setSyncedProfile] = useState<boolean>(false);

  const selectedPreset = PRESET_PROFILES.find((p) => p.id === selectedPersonaId) || PRESET_PROFILES[0];
  const p = selectedPreset.profile;
  const evalResult = evaluateCopilot(p);
  const { verdict, amount, rate, emi, negotiationCard } = evalResult;

  // Specific Case Narrative & Bank Pitch Data
  const getCaseDetails = (id: string) => {
    switch (id) {
      case 'priya':
        return {
          caseTheme: 'SALARIED MNC ENGINEER · HIGH FOIR DISCRETIONARY OVER-BORROWING',
          badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/40',
          bankOfferRate: '14.00% p.a.',
          bankOfferedAmount: '₹20.31 Lakhs (Pre-Approved Instant Personal Loan)',
          bankProcessingFee: '2.00% + GST (₹47,930 upfront deduction)',
          bankTrapTitle: 'The "You Qualify for ₹20 Lakhs" Unsecured Push',
          bankTrapNarrative: 'Because Priya earns ₹1,10,000/month with a 780 CIBIL score, the private bank uses a 50% gross FOIR formula to offer ₹20.3 Lakhs for wedding & honeymoon shopping. If she takes this loan, her monthly EMI jumps to ₹56,200, consuming 51% of her take-home salary. When combined with ₹48,000 living costs, she has zero emergency buffer and faces structural financial fragility.',
          defenseHeadline: 'Demand Safe Discretionary Cap & Prime 10.5% Rack Rate',
          defenseStrategy: 'Cap discretionary borrowing at ₹4.95 Lakhs (4x net monthly income). Force the bank to quote prime corporate salaried rates (10.50% - 11.75%) rather than standard retail rack rates.',
          projectedSavings: '₹3,84,000 in avoided interest & debt burden'
        };
      case 'ravi':
        return {
          caseTheme: '14-YR KIRANA RETAILER · CASH-HEAVY UNSECURED PRODUCT MISSELLING',
          badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-400/40',
          bankOfferRate: '19.50% p.a.',
          bankOfferedAmount: '₹15.00 Lakhs (Unsecured Business Growth Loan)',
          bankProcessingFee: '3.00% + GST (₹53,100 upfront deduction)',
          bankTrapTitle: 'The High-Commission Unsecured Business Loan Trap',
          bankTrapNarrative: 'Ravi needs ₹15 Lakhs to expand stock and buy a delivery vehicle. Because he runs a traditional cash kirana and has no formal CIBIL score, NBFC loan agents pitch an unsecured business loan at 19.50% with predatory fees. Agents do this because unsecured loans yield 3x higher commission. But Ravi owns an unencumbered commercial shop premises worth ₹45 Lakhs unencumbered!',
          defenseHeadline: 'Mandatory Collateral Redirection to Secured LAP at 9.25%',
          defenseStrategy: 'Refuse the 19.5% unsecured product. Pledge the commercial shop under a Loan Against Property (LAP) with his spouse as co-applicant. This cuts interest rate by more than half (9.25% - 10.25%).',
          projectedSavings: '₹8,40,000 saved in interest over 7-year tenure'
        };
      case 'anita':
      default:
        return {
          caseTheme: 'GIG DELIVERY PARTNER · HIGH-COST APP ROLLOVER & BOUNCE STRESS',
          badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-400/40',
          bankOfferRate: '32.00% – 36.00% APR',
          bankOfferedAmount: '₹1.50 Lakhs (Instant Digital Micro-Credit Rollover)',
          bankProcessingFee: '4.50% + GST (₹7,965 upfront fee)',
          bankTrapTitle: 'The Compounding Digital Micro-Credit Trap',
          bankTrapNarrative: 'Anita earns ₹32,000/month making deliveries and wants ₹1.5L for an electric scooter. She is already servicing high-cost 32-36% instant app loans and had 1 NACH bounce last month due to delayed weekly payouts. Taking another app loan triggers a compounding debt spiral where monthly payments exceed 65% of her earnings.',
          defenseHeadline: 'Hard Stop: Halt Unsecured Borrowing, Apply via Mudra Shishu',
          defenseStrategy: 'Trigger DONT BORROW verdict. Consolidate and close 36% app debt immediately. For the EV scooter, apply exclusively through Priority Sector / Pradhan Mantri Mudra Yojana (PMMY) or PM SVANidhi with statutory collateral-free interest caps.',
          projectedSavings: 'Averts structural default and legal recovery harassment'
        };
    }
  };

  const caseInfo = getCaseDetails(selectedPersonaId);

  const copyScript = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedScriptIndex(idx);
    setTimeout(() => setCopiedScriptIndex(null), 2500);
  };

  const handleSyncProfile = () => {
    if (onSelectAndLaunch) {
      onSelectAndLaunch(p);
    }
    setSyncedProfile(true);
    setTimeout(() => setSyncedProfile(false), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn select-none pb-12">
      
      {/* ------------------------------------------------------------- */}
      {/* 1. TOP HEADER                                                 */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300">
              Institutional Case Study Dossiers
            </span>
            <span className="text-xs font-mono text-neutral-400">
              3 Archetypes · Complete In-Situ Analysis
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            The Three Borrowers: Interactive Institutional Case Studies
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 font-light mt-1 max-w-2xl">
            Click any borrower to inspect their full balance sheet, predatory bank pitch, 4 core copilot outputs, and word-for-word branch scripts—<strong>right here on this page</strong>.
          </p>
        </div>

        {/* Global Sync Action (Stays on Page!) */}
        <button
          onClick={handleSyncProfile}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-neutral-200 hover:text-white transition-all cursor-pointer shadow-sm"
          title="Make this borrower active across other views without leaving this page"
        >
          {syncedProfile ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 font-bold">Active System Profile: {p.name}!</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Set {p.name} as Active Borrower</span>
            </>
          )}
        </button>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. THE THREE BORROWER SELECTOR TABS (STAY ON SAME PAGE)       */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PRESET_PROFILES.map((preset) => {
          const isSelected = selectedPersonaId === preset.id;
          const presProfile = preset.profile;
          
          return (
            <button
              key={preset.id}
              onClick={() => {
                setSelectedPersonaId(preset.id);
              }}
              className={`p-4 rounded-3xl border text-left transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                isSelected
                  ? 'bg-gradient-to-br from-[#1E112A] to-[#120D1A] border-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.25)] scale-[1.02]'
                  : 'bg-[#140F18]/90 border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 right-0 px-3 py-1 bg-amber-500 text-black text-[9px] font-mono font-bold uppercase rounded-bl-xl shadow-md">
                  Active Dossier
                </div>
              )}

              <div className="flex items-center gap-3.5">
                <div className={`w-14 h-14 rounded-2xl overflow-hidden border-2 shrink-0 relative ${
                  isSelected ? 'border-amber-400 shadow-md' : 'border-white/10'
                }`}>
                  {presProfile.avatarUrl ? (
                    <img 
                      src={presProfile.avatarUrl} 
                      alt={presProfile.name} 
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform" 
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-800 flex items-center justify-center font-bold text-lg text-white">
                      {presProfile.name.charAt(0)}
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="font-display font-bold text-base text-white truncate">
                      {presProfile.name}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">
                      ({presProfile.city})
                    </span>
                  </div>
                  <div className="text-[11px] text-neutral-300 truncate font-light">
                    {presProfile.occupation}
                  </div>
                  <div className="text-[10px] font-mono text-amber-300 font-semibold mt-0.5">
                    Loan Ask: ₹{(presProfile.requestedAmount / 100000).toFixed(1)}L
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. CASE DEEP DIVE DOSSIER (RENDERED IN-SITU ON SAME PAGE)     */}
      {/* ------------------------------------------------------------- */}
      <div className="rounded-[2.5rem] bg-[#120D1A]/95 border border-amber-500/30 p-7 sm:p-9 shadow-2xl backdrop-blur-2xl space-y-8 relative overflow-hidden">
        
        {/* Dossier Header */}
        <div className="flex flex-wrap items-center justify-between gap-6 border-b border-white/10 pb-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl overflow-hidden border-2 border-amber-400/80 shadow-[0_0_25px_rgba(245,158,11,0.3)] shrink-0 relative bg-black/40">
              {p.avatarUrl ? (
                <img src={p.avatarUrl} alt={p.name} className="w-full h-full object-cover object-top" />
              ) : null}
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 border-2 border-[#120D1A] rounded-full p-1 text-white">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full border text-[9px] font-mono font-bold uppercase tracking-wider ${caseInfo.badgeColor}`}>
                  {caseInfo.caseTheme}
                </span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                {p.name} ({p.city})
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 font-light">
                {p.occupation} · Age {p.age} · Bureau Score: <strong className="text-amber-300 font-mono">{p.creditScoreBand.replace('_', ' ')}</strong>
              </p>
            </div>
          </div>

          {/* Key Quick Figures */}
          <div className="flex items-center gap-4 text-xs font-mono bg-black/40 px-5 py-3 rounded-2xl border border-white/10">
            <div>
              <span className="text-[10px] text-neutral-400 uppercase block">Monthly Income</span>
              <span className="font-bold text-white text-base">₹{p.netMonthlyIncome.toLocaleString('en-IN')}</span>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <span className="text-[10px] text-neutral-400 uppercase block">Requested Loan</span>
              <span className="font-bold text-amber-300 text-base">₹{(p.requestedAmount / 100000).toFixed(1)} Lakhs</span>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <span className="text-[10px] text-neutral-400 uppercase block">Tenure</span>
              <span className="font-bold text-cyan-300 text-base">{p.requestedTenureMonths} Mo</span>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* SIDE-BY-SIDE: THE PREDATORY BANK PITCH VS COPILOT DEFENSE     */}
        {/* ------------------------------------------------------------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Left: What The Bank / NBFC Pitched (The Trap) */}
          <div className="p-6 rounded-3xl bg-rose-950/20 border border-rose-500/30 space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 flex items-center gap-2">
                <AlertOctagon className="w-4 h-4 text-rose-400" />
                <span>The Predatory Lender Pitch (Trap)</span>
              </span>
              <span className="text-[10px] font-mono text-rose-400/80 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/20">
                High Risk
              </span>
            </div>

            <h3 className="font-display font-semibold text-white text-base sm:text-lg">
              {caseInfo.bankTrapTitle}
            </h3>

            <p className="text-xs text-neutral-300 font-light leading-relaxed">
              {caseInfo.bankTrapNarrative}
            </p>

            <div className="p-3.5 rounded-2xl bg-black/50 border border-white/5 space-y-1.5 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-neutral-400">Pitched Interest Rate:</span>
                <span className="text-rose-400 font-bold">{caseInfo.bankOfferRate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Sanctioned Amount:</span>
                <span className="text-white font-bold">{caseInfo.bankOfferedAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Upfront Fee Deductions:</span>
                <span className="text-rose-400">{caseInfo.bankProcessingFee}</span>
              </div>
            </div>
          </div>

          {/* Right: The Copilot Sovereign Defense */}
          <div className="p-6 rounded-3xl bg-emerald-950/20 border border-emerald-500/30 space-y-3.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Borrower Counter-Leverage Strategy</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                Sovereign Defense
              </span>
            </div>

            <h3 className="font-display font-semibold text-white text-base sm:text-lg">
              {caseInfo.defenseHeadline}
            </h3>

            <p className="text-xs text-neutral-300 font-light leading-relaxed">
              {caseInfo.defenseStrategy}
            </p>

            <div className="p-3.5 rounded-2xl bg-black/50 border border-white/5 space-y-1.5 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-neutral-400">Sovereign Fair Rate Band:</span>
                <span className="text-emerald-400 font-bold">{rate.fairRateMin}% – {rate.fairRateMax}% p.a.</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Borrower Safe Carry Cap:</span>
                <span className="text-white font-bold">₹{(amount.borrowerSafeCarryMax / 100000).toFixed(2)} Lakhs</span>
              </div>
              <div className="flex justify-between text-amber-300 font-semibold">
                <span>Direct Economic Value:</span>
                <span>{caseInfo.projectedSavings}</span>
              </div>
            </div>
          </div>

        </div>

        {/* ------------------------------------------------------------- */}
        {/* THE 4 CORE OUTPUTS (DECISION GRAPH IN-SITU)                  */}
        {/* ------------------------------------------------------------- */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-white text-xl">
              The 4 Decoupled Core Outputs for {p.name}
            </h3>
            <span className="text-xs font-mono text-neutral-400">Deterministic Evaluation</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* O1: Final Verdict */}
            <div className="p-5 rounded-2xl bg-black/50 border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-neutral-400 uppercase">O1 · Routing Verdict</span>
                <span className={`w-2 h-2 rounded-full ${
                  verdict.status === 'BORROW' ? 'bg-emerald-400' :
                  verdict.status === 'BORROW_LESS' ? 'bg-amber-400' : 'bg-rose-400'
                }`} />
              </div>
              <div className={`font-display text-xl font-bold tracking-tight ${
                verdict.status === 'BORROW' ? 'text-emerald-400' :
                verdict.status === 'BORROW_LESS' ? 'text-amber-300' : 'text-rose-400'
              }`}>
                {verdict.status.replace('_', ' ')}
              </div>
              <p className="text-[11px] text-neutral-300 font-light leading-snug line-clamp-2">
                {verdict.oneLineReason}
              </p>
            </div>

            {/* O2: Amount Protection */}
            <div className="p-5 rounded-2xl bg-black/50 border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-neutral-400 uppercase">O2 · Safe Carry Ceiling</span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">CAP ENFORCED</span>
              </div>
              <div className="font-display text-xl font-bold text-white tracking-tight">
                ₹{(amount.borrowerSafeCarryMax / 100000).toFixed(1)} Lakhs
              </div>
              <div className="text-[11px] font-mono text-neutral-400 flex justify-between">
                <span>Bank Sanction:</span>
                <span className="text-rose-400 font-bold">₹{(amount.lenderSanctionMax / 100000).toFixed(1)}L</span>
              </div>
            </div>

            {/* O3: Fair Pricing */}
            <div className="p-5 rounded-2xl bg-black/50 border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-neutral-400 uppercase">O3 · Statutory Rate Band</span>
                <span className="text-[10px] font-mono text-cyan-300 font-bold">REPO LINKED</span>
              </div>
              <div className="font-display text-xl font-bold text-cyan-300 tracking-tight">
                {rate.fairRateMin}% – {rate.fairRateMax}%
              </div>
              <div className="text-[11px] font-mono text-neutral-400 flex justify-between">
                <span>Max Fair APR:</span>
                <span className="text-emerald-400 font-bold">{negotiationCard.maxFairApr}%</span>
              </div>
            </div>

            {/* O4: Monthly Cashflow */}
            <div className="p-5 rounded-2xl bg-black/50 border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-neutral-400 uppercase">O4 · Safe Monthly EMI</span>
                <span className="text-[10px] font-mono text-amber-300 font-bold">MAX RESIDUAL</span>
              </div>
              <div className="font-display text-xl font-bold text-amber-300 tracking-tight">
                ₹{emi.safeEmiCeiling.toLocaleString('en-IN')}/mo
              </div>
              <div className="text-[11px] font-mono text-neutral-400 flex justify-between">
                <span>Emergency Cushion:</span>
                <span className="text-white font-bold">{p.emergencyFundMonths} Mo</span>
              </div>
            </div>

          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* WORD-FOR-WORD BRANCH NEGOTIATION SCRIPT FOR THIS USER         */}
        {/* ------------------------------------------------------------- */}
        <div className="p-6 rounded-3xl bg-black/40 border border-white/10 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
                <Scale className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display font-bold text-white text-lg">
                  Word-for-Word Branch Scripts for {p.name}
                </h3>
                <p className="text-xs text-neutral-400 font-light">
                  Exact dialogue to counter bank pressure during branch or telephonic discussions.
                </p>
              </div>
            </div>
            <span className="text-xs font-mono text-amber-300">
              {negotiationCard.negotiationScripts.length} Scenarios Available
            </span>
          </div>

          <div className="space-y-3">
            {negotiationCard.negotiationScripts.map((scr, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-amber-400 font-bold">
                    Scenario {idx + 1}: {scr.situation}
                  </span>
                  <button
                    onClick={() => copyScript(scr.youSay, idx)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white font-mono text-[11px] transition-colors cursor-pointer"
                  >
                    {copiedScriptIndex === idx ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy Script</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Lender Says */}
                <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs">
                  <span className="text-rose-400 font-mono font-bold block mb-0.5">Lender Says:</span>
                  <p className="text-neutral-300 italic">"{scr.lenderSays}"</p>
                </div>

                {/* You Say */}
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-400/20 text-xs">
                  <span className="text-amber-300 font-mono font-bold block mb-0.5">You Counter With:</span>
                  <p className="text-white font-medium">"{scr.youSay}"</p>
                </div>

                <div className="text-[11px] font-mono text-neutral-500 flex items-center gap-1.5 pt-0.5">
                  <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span>Regulatory Precedent: {scr.regulatoryOrMarketBasis}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default PersonaDossier;
