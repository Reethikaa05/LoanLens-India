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
  Sparkles
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
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* Action Header */}
      <div className="flex items-center justify-between no-print">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-[#4B2440] dark:text-[#CFA5C1] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Assessment Dashboard</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[#E2D9DE] dark:border-[#33293A] bg-white dark:bg-neutral-800 text-xs font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      {/* The Printable Battle Card */}
      <div
        id="printable-negotiation-card"
        className="rounded-2xl border-2 border-[#4B2440] dark:border-[#CFA5C1] bg-white dark:bg-neutral-900 shadow-xl overflow-hidden text-[#221A20] dark:text-[#EEE6EA]"
      >
        {/* Card Header */}
        <div className="bg-[#4B2440] text-white p-6 sm:p-7 dark:bg-[#CFA5C1] dark:text-neutral-950">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded bg-white/20 dark:bg-black/20">
                Branch Negotiation Battle Card
              </span>
              <span className="font-mono text-xs opacity-75">Independent Verification</span>
            </div>
            <span className="font-mono text-xs">Present This To Loan Officer</span>
          </div>

          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <h2 className="font-display font-medium text-3xl sm:text-4xl leading-tight">
                {negotiationCard.borrowerName}
              </h2>
              <p className="text-xs opacity-85 font-mono mt-0.5">
                {negotiationCard.borrowerHeadline}
              </p>
            </div>

            {/* Target Rate Banner */}
            <div className="p-3.5 rounded-xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-black/20 text-right">
              <span className="text-[10px] uppercase font-mono tracking-wider opacity-85 block">
                Demand This Rate Band
              </span>
              <div className="font-display text-2xl sm:text-3xl font-bold">
                {negotiationCard.targetRateMin}% – {negotiationCard.targetRateMax}%
              </div>
              <span className="text-[10px] font-mono opacity-80">
                Max Fair APR: {negotiationCard.maxFairApr}%
              </span>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 sm:p-7 space-y-6">
          {/* PRODUCT REDIRECTION ALERT (If applicable) */}
          {negotiationCard.productRedirectionAlert && (
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border-l-4 border-[#8A4B12] dark:border-[#E0A265] text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-[#8A4B12] dark:text-[#E0A265]">
                <AlertOctagon className="w-4 h-4 shrink-0" />
                <span>Product Redirection Required!</span>
              </div>
              <p className="font-medium text-neutral-800 dark:text-neutral-200">
                {negotiationCard.productRedirectionAlert.warning}
              </p>
              <p className="text-emerald-700 dark:text-emerald-400 font-semibold">
                Action: {negotiationCard.productRedirectionAlert.action}
              </p>
              {negotiationCard.productRedirectionAlert.projectedSavingsRupees > 0 && (
                <div className="font-mono text-[11px] font-bold text-[#4B2440] dark:text-[#CFA5C1] pt-1">
                  Estimated Interest Saved: ₹{negotiationCard.productRedirectionAlert.projectedSavingsRupees.toLocaleString('en-IN')}
                </div>
              )}
            </div>
          )}

          {/* Key Profile Pillars */}
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-2">
              Your Primary Credit Strengths (Why You Deserve Prime Terms)
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {negotiationCard.keyProfileStrengths.map((str, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700 font-medium">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>{str}</span>
                </div>
              ))}
            </div>
          </div>

          {/* WORD-FOR-WORD CONVERSATIONAL SCRIPTS */}
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-3">
              Branch Scripts: What to Say When the Lender Quotes High
            </span>

            <div className="space-y-4">
              {negotiationCard.negotiationScripts.map((scr, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-[#E2D9DE] dark:border-[#33293A] bg-neutral-50/60 dark:bg-neutral-800/40 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between font-semibold text-neutral-600 dark:text-neutral-300">
                    <span>Situation: {scr.situation}</span>
                    <button
                      onClick={() => copyScript(scr.youSay, idx)}
                      className="no-print flex items-center gap-1 text-[11px] text-[#4B2440] dark:text-[#CFA5C1] hover:underline"
                    >
                      {copiedIndex === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-600 font-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Script</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/20 text-rose-900 dark:text-rose-300 border border-rose-100 dark:border-rose-900/40">
                    <span className="font-bold block text-[10px] uppercase tracking-wider text-rose-700 dark:text-rose-400">If Loan Manager Says:</span>
                    <p className="italic mt-0.5">{scr.lenderSays}</p>
                  </div>

                  <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800">
                    <span className="font-bold block text-[10px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400">You Respond Word-for-Word:</span>
                    <p className="font-medium mt-0.5">{scr.youSay}</p>
                  </div>

                  <div className="text-[10px] font-mono text-neutral-500 pt-1">
                    Legal / Underwriting Basis: {scr.regulatoryOrMarketBasis}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* STATUTORY FEE CAPS & RIGHTS TABLE */}
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-2">
              Statutory Fee Ceilings (RBI Fair Practices Code)
            </span>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse border border-neutral-200 dark:border-neutral-700">
                <thead>
                  <tr className="bg-neutral-100 dark:bg-neutral-800 font-mono text-[10px] uppercase text-neutral-600 dark:text-neutral-400 border-b border-neutral-200 dark:border-neutral-700">
                    <th className="p-2.5">Fee Category</th>
                    <th className="p-2.5">Maximum Legitimate Cap</th>
                    <th className="p-2.5">RBI Source</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
                  {negotiationCard.statutoryFeeCaps.map((fee, idx) => (
                    <tr key={idx}>
                      <td className="p-2.5 font-semibold">{fee.item}</td>
                      <td className="p-2.5 font-mono text-emerald-700 dark:text-emerald-400 font-bold">{fee.fairCeiling}</td>
                      <td className="p-2.5 text-neutral-500 font-mono text-[11px]">{fee.regulatorySource}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Verification Watermark */}
          <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-[11px] font-mono text-neutral-400">
            <span>Generated locally by Borrower Copilot</span>
            <span>Version 1.0 · Independent Borrower Representation</span>
          </div>
        </div>
      </div>
    </div>
  );
};
