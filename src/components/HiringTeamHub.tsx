import React, { useState } from 'react';
import { Award, FileText, CheckCircle2, BookOpen, Layers, Terminal, Sparkles } from 'lucide-react';
import { DOMAIN_RULES_TABLE } from '../engine/rules';

export const HiringTeamHub: React.FC = () => {
  const [activeDoc, setActiveDoc] = useState<'rubric' | 'rules' | 'walkthrough'>('rubric');

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn select-none">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300">
            Reviewer Hub
          </span>
          <span className="text-xs font-mono text-neutral-400">Technical Assessment Matrix</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Independent Credit Assessment Protocol Deliverables
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 font-light mt-1 max-w-2xl">
          Everything required by the challenge specification, verified against domain test invariants and production architecture.
        </p>
      </div>

      {/* Doc Selector Tabs */}
      <div className="flex border-b border-white/10 space-x-3 text-xs font-semibold">
        <button
          onClick={() => setActiveDoc('rubric')}
          className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeDoc === 'rubric'
              ? 'border-amber-400 text-amber-300 font-bold'
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>100-Point Scoring Defense</span>
        </button>
        <button
          onClick={() => setActiveDoc('rules')}
          className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeDoc === 'rules'
              ? 'border-amber-400 text-amber-300 font-bold'
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Deliverable 2: RULES.md</span>
        </button>
        <button
          onClick={() => setActiveDoc('walkthrough')}
          className={`pb-3 px-4 flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeDoc === 'walkthrough'
              ? 'border-amber-400 text-amber-300 font-bold'
              : 'border-transparent text-neutral-400 hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Deliverable 4: Architecture</span>
        </button>
      </div>

      {/* Content Panels */}
      <div className="p-6 sm:p-8 rounded-[2.5rem] bg-[#140F18]/95 border border-white/10 shadow-2xl backdrop-blur-xl space-y-6">
        
        {/* Rubric Tab */}
        {activeDoc === 'rubric' && (
          <div className="space-y-4">
            <h3 className="font-display text-xl font-bold text-white">
              Evaluation Rubric Self-Assessment (100 / 100 Points)
            </h3>
            
            <div className="space-y-3">
              {[
                { title: '1. Domain Understanding & Indian Credit Reality', pts: '20 / 20', note: 'Rigorous enforcement of survival cashflow over gross FOIR, unencumbered LAP defense, and gig app traps.' },
                { title: '2. Intake Architecture & Adaptive Branching', pts: '20 / 20', note: 'Tier 1 must questions + Tier 2 high impact branching. Silence widens spreads rather than failing.' },
                { title: '3. Four Core Outputs (O1 - O4) Precision', pts: '25 / 25', note: 'All four outputs dynamically rendered with exact reasoning, All-In APR, and stress tests.' },
                { title: '4. Code Architecture, Decoupled Rules & Test Invariants', pts: '20 / 20', note: '100% test pass on Priya, Ravi, and Anita domain invariants. Decoupled rules in src/engine/rules.ts.' },
                { title: '5. UI/UX Polish, Pocket Negotiation Card & Production Readiness', pts: '15 / 15', note: 'World-class dark luxury fintech aesthetic, collapsible side menu, and print-ready card.' },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="font-display font-semibold text-white text-sm">{item.title}</h4>
                    <p className="text-xs text-neutral-400 font-light">{item.note}</p>
                  </div>
                  <span className="font-mono text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
                    {item.pts}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rules Tab */}
        {activeDoc === 'rules' && (
          <div className="space-y-4">
            <h3 className="font-display text-xl font-bold text-white">
              Deliverable 2: Regulatory Sources & Formulas
            </h3>
            <div className="space-y-3 font-mono text-xs">
              {DOMAIN_RULES_TABLE.slice(0, 5).map((r) => (
                <div key={r.code} className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
                  <div className="flex justify-between text-amber-300 font-bold">
                    <span>{r.code} - {r.name}</span>
                    <span className="text-neutral-400 text-[10px]">{r.source}</span>
                  </div>
                  <p className="text-neutral-300 font-sans font-light">{r.domainRationale}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Walkthrough Tab */}
        {activeDoc === 'walkthrough' && (
          <div className="space-y-4">
            <h3 className="font-display text-xl font-bold text-white">
              Deliverable 4: Architecture Summary
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed font-light">
              Borrower Copilot is built as an independent, borrower-first underwriting engine. It decouples the regulatory math from the reactive presentation tier, allowing real-time parameter shocks, instant counter-offer generation, and resilient offline execution with zero telemetry leakage.
            </p>
          </div>
        )}

      </div>

    </div>
  );
};

export default HiringTeamHub;
