import React, { useState } from 'react';
import { Sliders, RotateCcw, ShieldAlert, Sparkles, CheckCircle2, Code } from 'lucide-react';
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
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#EFE3EA] dark:bg-[#2A1F2C] text-[#4B2440] dark:text-[#CFA5C1]">
            Live Rule Inspector & Follow-up Simulator
          </span>
          <span className="text-xs font-mono text-neutral-500">Separated Rules Engine</span>
        </div>
        <h2 className="font-display text-3xl font-medium tracking-tight">
          Domain Rules & Regulatory Parameter Registry
        </h2>
        <p className="text-sm text-[#6E6069] dark:text-[#A99DA5] mt-1">
          In the technical follow-up session, the Lokta team asks you to change a rule live. All formulas are decoupled in <code className="font-mono text-xs bg-neutral-200 dark:bg-neutral-800 px-1 py-0.5 rounded">src/engine/rules.ts</code>.
        </p>
      </div>

      {/* Rules Table Viewer */}
      <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-neutral-900 border border-[#E2D9DE] dark:border-[#33293A] shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search rules, thresholds, RBI sources..."
            className="px-3.5 py-2 rounded-xl border border-[#E2D9DE] dark:border-[#33293A] bg-white dark:bg-neutral-800 text-xs w-full sm:w-72 font-medium"
          />

          <div className="flex items-center gap-1 overflow-x-auto text-xs font-mono">
            {['ALL', 'AFFORDABILITY', 'UNDERWRITING', 'PRICING', 'REGULATORY'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  filterCategory === cat
                    ? 'bg-[#4B2440] text-white dark:bg-[#CFA5C1] dark:text-black font-semibold'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 font-mono text-[10px] uppercase text-neutral-600 dark:text-neutral-400">
                <th className="p-3">Rule Code</th>
                <th className="p-3">Rule Name</th>
                <th className="p-3">Parameter Value</th>
                <th className="p-3">Domain Rationale</th>
                <th className="p-3">Source / Basis</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {filteredRules.map((rule) => (
                <tr key={rule.code} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/40">
                  <td className="p-3 font-mono text-[11px] font-bold text-[#4B2440] dark:text-[#CFA5C1]">
                    {rule.code}
                  </td>
                  <td className="p-3 font-semibold text-neutral-900 dark:text-neutral-100">
                    {rule.name}
                  </td>
                  <td className="p-3 font-mono font-bold text-emerald-700 dark:text-emerald-400 whitespace-nowrap">
                    {rule.parameterValue}
                  </td>
                  <td className="p-3 text-neutral-600 dark:text-neutral-300 max-w-sm">
                    {rule.domainRationale}
                  </td>
                  <td className="p-3 font-mono text-[11px] text-neutral-500 max-w-xs">
                    {rule.source}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
