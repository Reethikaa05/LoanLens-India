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
  Award
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
  const { negotiationCard, rate, amount, verdict } = result;
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyScript = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fadeIn select-none">
      
      {/* Top Action Header */}
      <div className="flex items-center justify-between no-print">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard Overview</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-semibold text-white transition-all cursor-pointer shadow-md"
          >
            <Printer className="w-4 h-4 text-amber-400" />
            <span>Print Battle Card (PDF)</span>
          </button>
        </div>
      </div>

      {/* The Printable Battle Card in Ultra-Sleek Obsidian & Amber/Gold */}
      <div
        id="printable-negotiation-card"
        className="rounded-[2.5rem] border border-white/10 bg-[#140F18]/95 shadow-2xl overflow-hidden text-white backdrop-blur-xl"
      >
        {/* Card Hero Header */}
        <div className="bg-gradient-to-r from-[#201309] via-[#2A1808] to-[#17100B] border-b border-amber-500/30 p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2.5">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300">
                Institutional Battle Card
              </span>
              <span className="font-mono text-xs text-neutral-400">Independent Borrower Protocol</span>
            </div>
            <span className="font-mono text-xs text-amber-400 font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Present to Branch Loan Officer</span>
            </span>
          </div>

          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white leading-tight">
                {negotiationCard.borrowerName}
              </h2>
              <p className="text-xs text-neutral-300 font-mono mt-1">
                {negotiationCard.borrowerHeadline}
              </p>
            </div>

            {/* Target Rate Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-black/50 border border-amber-500/40 text-right shadow-xl">
              <span className="text-[10px] uppercase font-mono tracking-wider text-amber-400 font-bold block mb-0.5">
                Demand This Fair Rate Band
              </span>
              <div className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {negotiationCard.targetRateMin}% – {negotiationCard.targetRateMax}%
              </div>
              <span className="text-xs font-mono text-emerald-400 font-medium block mt-1">
                Max Fair APR: {negotiationCard.maxFairApr}% (All-In)
              </span>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* PRODUCT REDIRECTION ALERT (If applicable) */}
          {negotiationCard.productRedirectionAlert && (
            <div className="p-5 rounded-2xl bg-amber-950/30 border-l-4 border-amber-500 text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-300 text-sm">
                <AlertOctagon className="w-5 h-5 shrink-0 text-amber-400" />
                <span>Product Redirection Required!</span>
              </div>
              <p className="text-neutral-200 leading-relaxed font-light">
                {negotiationCard.productRedirectionAlert.warning}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-amber-500/20 text-xs">
                <span className="text-emerald-400 font-semibold">
                  Action: {negotiationCard.productRedirectionAlert.action}
                </span>
                {negotiationCard.productRedirectionAlert.projectedSavingsRupees > 0 && (
                  <span className="font-mono font-bold text-amber-300">
                    Projected Interest Saved: ₹{negotiationCard.productRedirectionAlert.projectedSavingsRupees.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Key Profile Strengths */}
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-3">
              Your Primary Credit Strengths (Why You Deserve Prime Terms)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {negotiationCard.keyProfileStrengths.map((str, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/10 font-medium text-neutral-200">
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
                    ✓
                  </span>
                  <span>{str}</span>
                </div>
              ))}
            </div>
          </div>

          {/* WORD-FOR-WORD CONVERSATIONAL SCRIPTS */}
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-3">
              Branch Scripts: Exactly What to Say When the Lender Quotes High
            </span>

            <div className="space-y-4">
              {negotiationCard.negotiationScripts.map((scr, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display font-semibold text-sm text-amber-300">
                      Scenario {idx + 1}: {scr.situation}
                    </span>
                    <button
                      onClick={() => copyScript(scr.youSay, idx)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-mono text-neutral-300 hover:text-white transition-all cursor-pointer"
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

                  <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-500/20 text-xs text-neutral-300">
                    <strong className="text-rose-400 block mb-0.5">What the Lender Says:</strong>
                    <em>"{scr.lenderSays}"</em>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-neutral-200 space-y-1">
                    <strong className="text-emerald-400 block">What You Say (Word-for-Word):</strong>
                    <p className="font-medium text-white leading-relaxed">
                      "{scr.youSay}"
                    </p>
                  </div>

                  <div className="text-[11px] text-neutral-400 font-mono flex items-center gap-1.5 pt-1">
                    <Scale className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Basis: {scr.regulatoryOrMarketBasis}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* STATUTORY FEE CAPS TABLE */}
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-3">
              Statutory Fee Caps & RBI Anti-Gouging Protections
            </span>

            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-black/40 border-b border-white/10 text-neutral-400 uppercase text-[10px]">
                  <tr>
                    <th className="p-3.5">Fee Line Item</th>
                    <th className="p-3.5">Fair Institutional Ceiling</th>
                    <th className="p-3.5">RBI Statutory Mandate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 bg-white/[0.01]">
                  {negotiationCard.statutoryFeeCaps.map((cap, i) => (
                    <tr key={i} className="hover:bg-white/[0.03] transition-colors">
                      <td className="p-3.5 font-medium text-white">{cap.item}</td>
                      <td className="p-3.5 font-bold text-amber-300">{cap.fairCeiling}</td>
                      <td className="p-3.5 text-neutral-400 text-[11px]">{cap.regulatorySource}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NegotiationCard;
