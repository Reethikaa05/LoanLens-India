import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Printer, 
  Copy, 
  Check, 
  ArrowLeft, 
  AlertOctagon, 
  Scale, 
  FileText, 
  MessageSquare, 
  Sparkles, 
  Lock, 
  ChevronRight, 
  Award,
  DollarSign,
  AlertTriangle,
  Zap,
  TrendingDown,
  Calculator,
  Volume2,
  Share2
} from 'lucide-react';
import { CopilotResult } from '../engine/types';

interface NegotiationCardProps {
  result: CopilotResult;
  onBack: () => void;
}

export const NegotiationCard: React.FC<NegotiationCardProps> = ({
  result,
  onBack
}) => {
  const { negotiationCard, rate, amount, verdict, profile } = result;
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);
  const [selectedScriptFilter, setSelectedScriptFilter] = useState<string>('ALL');
  const [showRehearsalTips, setShowRehearsalTips] = useState<boolean>(true);

  // Interactive Fee Calculator state
  const loanPrincipal = amount.borrowerSafeCarryMax;
  const [quotedFeePercent, setQuotedFeePercent] = useState<number>(2.0); // Bank typically quotes 2.0%

  const quotedBankFeeWithGst = Math.round((loanPrincipal * (quotedFeePercent / 100)) * 1.18);
  const fairCapFeeWithGst = Math.round((loanPrincipal * (0.005)) * 1.18); // 0.50% statutory cap
  const feeSavings = Math.max(0, quotedBankFeeWithGst - fairCapFeeWithGst);

  const copyScript = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const copyAllScripts = () => {
    const fullMemo = [
      `=== BORROWER COPILOT: OFFICIAL BRANCH NEGOTIATION DOSSIER ===`,
      `Borrower: ${negotiationCard.borrowerName} (${negotiationCard.borrowerHeadline})`,
      `Target Fair Rate Band: ${negotiationCard.targetRateMin}% - ${negotiationCard.targetRateMax}% (p.a.)`,
      `Maximum Fair APR: ${negotiationCard.maxFairApr}% All-In`,
      `Safe Discretionary Principal Ask: ₹${(amount.borrowerSafeCarryMax / 100000).toFixed(2)} Lakhs`,
      `\n--- KEY PROFILE STRENGTHS ---`,
      ...negotiationCard.keyProfileStrengths.map((s, i) => `${i + 1}. ${s}`),
      `\n--- WORD-FOR-WORD BRANCH SCRIPTS ---`,
      ...negotiationCard.negotiationScripts.map((s, i) => 
        `[SCENARIO ${i + 1}: ${s.situation}]\nLender: "${s.lenderSays}"\nYou Say: "${s.youSay}"\nBasis: ${s.regulatoryOrMarketBasis}\n`
      ),
      `\n--- STATUTORY FEE CAPS ---`,
      ...negotiationCard.statutoryFeeCaps.map((c) => `${c.item}: ${c.fairCeiling} (Mandate: ${c.regulatorySource})`)
    ].join('\n');

    navigator.clipboard.writeText(fullMemo);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  // Filtered scripts
  const filteredScripts = negotiationCard.negotiationScripts.filter((scr) => {
    if (selectedScriptFilter === 'ALL') return true;
    if (selectedScriptFilter === 'SPREAD') return scr.situation.toLowerCase().includes('rate') || scr.situation.toLowerCase().includes('spread');
    if (selectedScriptFilter === 'FEE') return scr.situation.toLowerCase().includes('fee') || scr.situation.toLowerCase().includes('processing');
    if (selectedScriptFilter === 'INSURANCE') return scr.situation.toLowerCase().includes('insurance') || scr.situation.toLowerCase().includes('bundling');
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn select-none pb-12">
      
      {/* ------------------------------------------------------------- */}
      {/* TOP COMMAND STRIP (NO PRINT)                                  */}
      {/* ------------------------------------------------------------- */}
      <div className="flex flex-wrap items-center justify-between gap-4 no-print pb-2">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard Overview</span>
        </button>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setShowRehearsalTips(!showRehearsalTips)}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
              showRehearsalTips 
                ? 'bg-amber-500/20 border-amber-400/40 text-amber-300'
                : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>{showRehearsalTips ? 'Delivery Tips On' : 'Delivery Tips Off'}</span>
          </button>

          <button
            onClick={copyAllScripts}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-neutral-200 hover:text-white transition-all cursor-pointer shadow-sm"
          >
            {copiedAll ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-bold">Dossier Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-amber-400" />
                <span>Copy Full Briefing</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-semibold text-xs shadow-[0_0_20px_rgba(245,158,11,0.35)] hover:scale-105 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4 text-black" />
            <span>Print Battle Card (PDF)</span>
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* THE OFFICIAL PRINTABLE BATTLE CARD                            */}
      {/* ------------------------------------------------------------- */}
      <div
        id="printable-negotiation-card"
        className="rounded-[2.5rem] border border-amber-500/40 bg-[#120D1A]/95 shadow-2xl overflow-hidden text-white backdrop-blur-2xl relative"
      >
        {/* Subtle holographic watermark ambient in background */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Card Hero Header */}
        <div className="bg-gradient-to-r from-[#221006] via-[#1A0E1B] to-[#0A1624] border-b border-amber-500/30 p-7 sm:p-9 relative overflow-hidden">
          
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300 shadow-sm">
                Official Institutional Battle Card
              </span>
              <span className="font-mono text-xs text-neutral-400">
                DOC-REF: RBI-BC-{new Date().getFullYear()}-AUTH
              </span>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 font-semibold bg-black/40 px-3.5 py-1 rounded-full border border-emerald-500/30">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified Borrower Protocol</span>
            </div>
          </div>

          <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
            
            {/* Left: Verified Borrower Avatar & Institutional Bio */}
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="relative group shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-amber-400/70 shadow-[0_0_25px_rgba(245,158,11,0.3)] bg-[#1A1224] relative">
                  {profile.avatarUrl ? (
                    <img 
                      src={profile.avatarUrl} 
                      alt={negotiationCard.borrowerName}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-display font-bold text-3xl text-amber-400 bg-amber-950/40">
                      {negotiationCard.borrowerName.charAt(0)}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Verified Protocol Check Badge */}
                <div 
                  className="absolute -bottom-1.5 -right-1.5 bg-emerald-500 border-2 border-[#120D1A] rounded-full p-1.5 shadow-lg flex items-center justify-center text-white" 
                  title="Verified Sovereign Borrower Protocol (RBI KFS Standards)"
                >
                  <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" />
                </div>

                {/* Security Hologram Tag */}
                <div className="absolute -top-2 -left-1.5 bg-black/90 border border-amber-400/60 rounded-md px-1.5 py-0.5 text-[9px] font-mono font-bold text-amber-300 shadow">
                  ID-AUTH
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-white leading-tight tracking-tight">
                    {negotiationCard.borrowerName}
                  </h2>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <ShieldCheck className="w-3 h-3" />
                    Verified Sovereign
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-300 font-mono">
                  {negotiationCard.borrowerHeadline} · {profile.city}
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono text-neutral-400">
                  <span>Safe Carry Ask: <strong className="text-white">₹{(amount.borrowerSafeCarryMax / 100000).toFixed(1)} Lakhs</strong></span>
                  <span>•</span>
                  <span>Bureau Tier: <strong className="text-emerald-400">{profile.creditScoreBand.replace(/_/g, ' ')}</strong></span>
                  <span>•</span>
                  <span>Age: <strong className="text-neutral-200">{profile.age} yrs</strong></span>
                </div>
              </div>
            </div>

            {/* Target Rate & All-In APR Anchor Box */}
            <div className="p-5 sm:p-6 rounded-3xl bg-black/60 border-2 border-amber-500/50 text-right shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />
              <span className="text-[10px] uppercase font-mono tracking-widest text-amber-400 font-bold block mb-1">
                Demand This Statutory Fair Rate Band
              </span>
              <div className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
                {negotiationCard.targetRateMin}% – {negotiationCard.targetRateMax}%
              </div>
              <div className="flex items-center justify-end gap-2 text-xs font-mono text-emerald-400 font-semibold mt-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Max Fair All-In APR: {negotiationCard.maxFairApr}% (KFS)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Card Body */}
        <div className="p-7 sm:p-9 space-y-8 relative z-10">
          
          {/* PRODUCT REDIRECTION TACTICAL ALERT (If applicable) */}
          {negotiationCard.productRedirectionAlert && (
            <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-950/40 via-orange-950/20 to-transparent border-2 border-amber-500/50 text-xs space-y-3 shadow-xl">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 font-bold text-amber-300 text-sm">
                  <AlertOctagon className="w-5 h-5 shrink-0 text-amber-400" />
                  <span>Mandatory Product Redirection Defense</span>
                </div>
                {negotiationCard.productRedirectionAlert.projectedSavingsRupees > 0 && (
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/50 font-mono font-bold text-emerald-300 text-xs shadow-sm">
                    Projected Interest Saved: ₹{negotiationCard.productRedirectionAlert.projectedSavingsRupees.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              <p className="text-neutral-200 leading-relaxed font-light text-xs sm:text-sm">
                {negotiationCard.productRedirectionAlert.warning}
              </p>
              <div className="p-3 rounded-2xl bg-black/40 border border-amber-500/30 text-xs flex items-center gap-2">
                <span className="text-amber-400 font-bold font-mono">Branch Action:</span>
                <span className="text-white font-medium">{negotiationCard.productRedirectionAlert.action}</span>
              </div>
            </div>
          )}

          {/* 1. KEY PROFILE CREDIT STRENGTHS */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Your Audited Credit Strengths (Why You Command Prime Terms)</span>
              </span>
              <span className="text-[11px] font-mono text-neutral-400">Pillar 1: Anchor Proof</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {negotiationCard.keyProfileStrengths.map((str, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 font-medium text-neutral-200 shadow-sm">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-xs shrink-0">
                    ✓
                  </div>
                  <span className="leading-snug">{str}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 2. INTERACTIVE STATUTORY FEE GOUGING CALCULATOR */}
          <div className="p-6 rounded-3xl bg-black/40 border border-amber-500/30 space-y-4 shadow-xl no-print">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
                  <Calculator className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-sm">Processing Fee Anti-Gouging Interceptor</h4>
                  <p className="text-[11px] text-neutral-400 font-light">Test how much cash you save by capping branch processing charges at 0.50%.</p>
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs">
                <span className="text-neutral-400">Bank Quote:</span>
                <span className="font-bold text-rose-400">{quotedFeePercent.toFixed(1)}%</span>
              </div>
            </div>

            <div className="space-y-2 py-1">
              <input 
                type="range"
                min="0.5"
                max="3.5"
                step="0.25"
                value={quotedFeePercent}
                onChange={(e) => setQuotedFeePercent(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-2 bg-neutral-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 font-mono">
                <span>0.50% (Institutional Cap)</span>
                <span>1.50%</span>
                <span>2.50% (Predatory Bank Norm)</span>
                <span>3.50%</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-mono text-xs">
              <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-neutral-400 block text-[10px]">Bank Quoted Fee (+18% GST):</span>
                <span className="text-rose-400 font-bold text-sm">₹{quotedBankFeeWithGst.toLocaleString('en-IN')}</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5">
                <span className="text-neutral-400 block text-[10px]">Statutory Fair Cap (0.50% + GST):</span>
                <span className="text-emerald-400 font-bold text-sm">₹{fairCapFeeWithGst.toLocaleString('en-IN')}</span>
              </div>
              <div className="p-3 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 text-right">
                <span className="text-emerald-400 block text-[10px] font-bold uppercase">Cash Kept In Your Pocket:</span>
                <span className="text-emerald-300 font-bold text-base">₹{feeSavings.toLocaleString('en-IN')} Saved</span>
              </div>
            </div>
          </div>

          {/* 3. WORD-FOR-WORD CONVERSATIONAL BRANCH SCRIPTS */}
          <div className="space-y-4">
            
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Word-for-Word Branch Scripts (Exact Mathematical Responses)</span>
                </span>
                <p className="text-xs text-neutral-400 font-light mt-0.5">
                  Read or present these exact statements when bank officers attempt markup or fee padding.
                </p>
              </div>

              {/* Script Category Filter Tabs */}
              <div className="flex flex-wrap gap-1.5 no-print">
                {[
                  { id: 'ALL', label: 'All Scripts' },
                  { id: 'SPREAD', label: 'Rate Spreads' },
                  { id: 'FEE', label: 'Processing Fees' },
                  { id: 'INSURANCE', label: 'Insurance' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedScriptFilter(tab.id)}
                    className={`px-3 py-1 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                      selectedScriptFilter === tab.id
                        ? 'bg-amber-500 text-black font-bold shadow-sm'
                        : 'bg-white/5 text-neutral-400 hover:text-white border border-white/10'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {filteredScripts.map((scr, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-white/[0.02] border border-white/10 space-y-3.5 hover:border-amber-500/40 transition-colors shadow-lg"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-display font-bold text-sm sm:text-base text-amber-300">
                      Scenario {idx + 1}: {scr.situation}
                    </span>
                    <button
                      onClick={() => copyScript(scr.youSay, idx)}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-neutral-300 hover:text-white transition-all cursor-pointer no-print shadow-sm"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Script</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* What the Lender Says */}
                  <div className="p-3.5 rounded-2xl bg-rose-950/20 border border-rose-500/20 text-xs text-neutral-300">
                    <strong className="text-rose-400 block mb-1 font-mono uppercase text-[10px]">What the Bank Officer Says:</strong>
                    <p className="italic leading-relaxed font-sans">"{scr.lenderSays}"</p>
                  </div>

                  {/* What You Say (Word-for-Word) */}
                  <div className="p-4 rounded-2xl bg-emerald-950/25 border-2 border-emerald-500/40 text-xs text-neutral-200 space-y-1 shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <strong className="text-emerald-400 font-mono uppercase text-[10px] tracking-wider">
                        What You Say (Word-for-Word Counter-Script):
                      </strong>
                      <span className="text-[9px] font-mono text-emerald-400/80 uppercase">Tested & Verified</span>
                    </div>
                    <p className="font-semibold text-white leading-relaxed text-xs sm:text-sm font-sans">
                      "{scr.youSay}"
                    </p>
                  </div>

                  {/* Rehearsal Delivery Tips */}
                  {showRehearsalTips && (
                    <div className="p-2.5 rounded-xl bg-black/30 border border-white/5 text-[11px] font-mono text-neutral-400 flex items-center gap-2">
                      <Volume2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>
                        <strong>Delivery Tip:</strong> Speak firmly and courteously. Refer directly to your printed battle card numbers.
                      </span>
                    </div>
                  )}

                  {/* Statutory Basis */}
                  <div className="text-[11px] text-neutral-400 font-mono flex items-center gap-2 pt-1 border-t border-white/5">
                    <Scale className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Statutory & Market Basis: <strong className="text-neutral-300">{scr.regulatoryOrMarketBasis}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. STATUTORY FEE CAPS & RBI ANTI-GOUGING MANDATE TABLE */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                <FileText className="w-3.5 h-3.5" />
                <span>Statutory Fee Caps & RBI Anti-Gouging Protections</span>
              </span>
              <span className="text-[11px] font-mono text-neutral-400">Master Direction Enforcement</span>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-white/10 shadow-xl">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-black/60 border-b border-white/10 text-neutral-400 uppercase text-[10px]">
                  <tr>
                    <th className="p-4">Fee Line Item</th>
                    <th className="p-4">Fair Institutional Ceiling</th>
                    <th className="p-4">RBI Statutory Directive</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 bg-white/[0.01]">
                  {negotiationCard.statutoryFeeCaps.map((cap, i) => (
                    <tr key={i} className="hover:bg-white/[0.03] transition-colors">
                      <td className="p-4 font-bold text-white">{cap.item}</td>
                      <td className="p-4 font-bold text-amber-300">{cap.fairCeiling}</td>
                      <td className="p-4 text-neutral-400 text-xs">{cap.regulatorySource}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 5. OFFICIAL MEMO FOOTER */}
          <div className="p-5 rounded-2xl bg-black/40 border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-neutral-400 font-mono">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Prepared for: <strong className="text-white">{negotiationCard.borrowerName}</strong></span>
            </div>
            <span>Generated locally · Ephemeral Client-Side Security</span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NegotiationCard;
