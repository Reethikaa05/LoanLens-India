import React, { useState } from 'react';
import { Sliders, RotateCcw, ShieldAlert, Sparkles, CheckCircle2, Code, Search } from 'lucide-react';
import { DOMAIN_RULES_TABLE, RuleDefinition } from '../engine/rules';
import { BorrowerProfile } from '../engine/types';

interface RuleSandboxProps {
  activeProfile: BorrowerProfile;
}

export const RuleSandbox: React.FC<RuleSandboxProps> = ({ activeProfile }) => {
  const [rules, setRules] = useState<RuleDefinition[]>(DOMAIN_RULES_TABLE);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('ALL');

  const filteredRules = rules.filter((r) => {
    const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase()) || r.code.toLowerCase().includes(search.toLowerCase()) || r.domainRationale.toLowerCase().includes(search.toLowerCase());
    const matchesCat = filterCategory === 'ALL' || r.category === filterCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn select-none">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300">
            Decoupled Rules Engine
          </span>
          <span className="text-xs font-mono text-neutral-400">Modular Underwriting Logic</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Domain Rules & Regulatory Parameter Registry
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 font-light mt-1 max-w-2xl">
          All underwriting formulas are decoupled from UI presentation in <code className="font-mono text-xs bg-black/40 text-amber-300 px-1.5 py-0.5 rounded border border-white/10">src/engine/rules.ts</code> for live parameter shock simulations.
        </p>
      </div>

      {/* Rules Table Viewer */}
      <div className="p-6 sm:p-8 rounded-[2.5rem] bg-[#140F18]/95 border border-white/10 shadow-2xl backdrop-blur-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search rules, thresholds, RBI circulars..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-white/10 bg-black/30 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-500/50"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-mono">
            {['ALL', 'AFFORDABILITY', 'UNDERWRITING', 'PRICING', 'REGULATORY'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  filterCategory === cat
                    ? 'bg-amber-500 text-black font-bold shadow-md'
                    : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Rule Cards Grid */}
        <div className="space-y-4">
          {filteredRules.map((rule) => (
            <div
              key={rule.code}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3 hover:border-amber-500/40 transition-colors"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                    {rule.code}
                  </span>
                  <h4 className="font-display font-semibold text-white text-base">{rule.name}</h4>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-neutral-400">
                  {rule.category}
                </span>
              </div>

              <p className="text-xs text-neutral-300 font-light leading-relaxed">
                {rule.domainRationale}
              </p>

              <div className="p-3 rounded-xl bg-black/40 border border-white/5 font-mono text-xs text-cyan-300 flex items-center justify-between">
                <div>
                  <span className="text-neutral-500 text-[10px] block">Threshold Formula / Constant</span>
                  <span>{rule.parameterValue}</span>
                </div>
                <div className="text-right">
                  <span className="text-neutral-500 text-[10px] block">Regulatory Benchmark</span>
                  <span className="text-emerald-400">{rule.source}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default RuleSandbox;
