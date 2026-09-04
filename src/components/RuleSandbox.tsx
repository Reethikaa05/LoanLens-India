import React, { useState } from 'react';
import { 
  Sliders, 
  RotateCcw, 
  ShieldAlert, 
  Sparkles, 
  CheckCircle2, 
  Code, 
  Search, 
  Zap, 
  AlertTriangle, 
  Check, 
  Copy, 
  Info,
  Scale,
  ShieldCheck,
  Percent,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { DOMAIN_RULES_TABLE, RuleDefinition, FINANCIAL_CONSTANTS } from '../engine/rules';
import { BorrowerProfile } from '../engine/types';
import { PRESET_PROFILES } from '../engine/scenarios';
import { evaluateCopilot } from '../engine/calculator';

interface RuleSandboxProps {
  activeProfile: BorrowerProfile;
}

export const RuleSandbox: React.FC<RuleSandboxProps> = ({ activeProfile }) => {
  // ---------------------------------------------------------------------------
  // 1. Sandbox State & Interactive Regulatory Parameters
  // ---------------------------------------------------------------------------
  const [selectedBorrower, setSelectedBorrower] = useState<BorrowerProfile>(activeProfile);
  const [foirCeilingPercent, setFoirCeilingPercent] = useState<number>(50); // Default 50%
  const [livingBufferPercent, setLivingBufferPercent] = useState<number>(20); // Default 20%
  const [predatoryAprCutoff, setPredatoryAprCutoff] = useState<number>(24.0); // Default 24%
  const [commercialLtvCap, setCommercialLtvCap] = useState<number>(50); // Default 50%
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [activeRuleToggle, setActiveRuleToggle] = useState<Record<string, boolean>>({});
  const [copiedAudit, setCopiedAudit] = useState(false);
  const [expandedRuleCode, setExpandedRuleCode] = useState<string | null>(null);

  // Re-sync if parent activeProfile changes
  React.useEffect(() => {
    setSelectedBorrower(activeProfile);
  }, [activeProfile]);

  // Dynamic calculations under sandbox parameters
  const currentResult = evaluateCopilot(selectedBorrower);
  const netIncome = selectedBorrower.netMonthlyIncome;
  const existingEmis = selectedBorrower.existingMonthlyEmis;
  
  // Custom Dynamic FOIR EMI Ceiling based on slider
  const dynamicMaxEmiCeiling = Math.max(0, Math.round(netIncome * (foirCeilingPercent / 100) - existingEmis));
  const dynamicSafeLivingBuffer = Math.round(netIncome * (livingBufferPercent / 100));
  const dynamicDiscretionarySurplus = Math.max(
    0, 
    netIncome - selectedBorrower.monthlyEssentialExpenses - existingEmis - dynamicSafeLivingBuffer
  );

  // Filtered Rules
  const filteredRules = DOMAIN_RULES_TABLE.filter((r) => {
    const matchesSearch = 
      r.name.toLowerCase().includes(search.toLowerCase()) || 
      r.code.toLowerCase().includes(search.toLowerCase()) || 
      r.domainRationale.toLowerCase().includes(search.toLowerCase()) ||
      r.source.toLowerCase().includes(search.toLowerCase());
    const matchesCat = filterCategory === 'ALL' || r.category === filterCategory;
    return matchesSearch && matchesCat;
  });

  // Toggle Rule Status
  const toggleRule = (code: string) => {
    setActiveRuleToggle((prev) => ({
      ...prev,
      [code]: prev[code] === undefined ? false : !prev[code]
    }));
  };

  const isRuleEnabled = (code: string) => {
    return activeRuleToggle[code] !== false; // default true
  };

  // Reset to Statutory Defaults
  const resetToStatutoryDefaults = () => {
    setFoirCeilingPercent(50);
    setLivingBufferPercent(20);
    setPredatoryAprCutoff(24.0);
    setCommercialLtvCap(50);
    setActiveRuleToggle({});
  };

  const copyRuleAudit = () => {
    const auditText = [
      '=== OFFICIAL BORROWER COPILOT: REGULATORY AUDIT MANIFEST ===',
      `Subject Borrower: ${selectedBorrower.name} (${selectedBorrower.occupation})`,
      `Net Monthly Income: ₹${selectedBorrower.netMonthlyIncome.toLocaleString('en-IN')}`,
      `FOIR Ceiling Parameter: ${foirCeilingPercent}% (Dynamic Max EMI: ₹${dynamicMaxEmiCeiling.toLocaleString('en-IN')})`,
      `Living Buffer Haircut: ${livingBufferPercent}% (₹${dynamicSafeLivingBuffer.toLocaleString('en-IN')})`,
      `Predatory APR Cutoff: ${predatoryAprCutoff}% p.a.`,
      `Commercial LAP LTV Cap: ${commercialLtvCap}%`,
      `Active Rules Enforced: ${DOMAIN_RULES_TABLE.filter(r => isRuleEnabled(r.code)).length} of ${DOMAIN_RULES_TABLE.length}`,
      '',
      'ENFORCED STATUTORY RULES LIST:',
      ...DOMAIN_RULES_TABLE.map((r, i) => `${i + 1}. [${r.code}] ${r.name} - ${r.parameterValue} (Ref: ${r.source})`)
    ].join('\n');

    navigator.clipboard.writeText(auditText);
    setCopiedAudit(true);
    setTimeout(() => setCopiedAudit(false), 2500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn select-none pb-12">
      
      {/* ------------------------------------------------------------- */}
      {/* 1. HERO HEADER WITH ENGINE STATUS                             */}
      {/* ------------------------------------------------------------- */}
      <div className="rounded-[2.5rem] bg-gradient-to-r from-[#190D22] via-[#100D1A] to-[#0A1624] border border-amber-500/30 p-7 sm:p-9 shadow-2xl relative overflow-hidden backdrop-blur-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mb-5">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300 shadow-sm flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5" />
              <span>Decoupled Rules Engine v2.4</span>
            </span>
            <span className="text-xs font-mono text-neutral-400">
              Deterministic Regulatory Sandbox
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetToStatutoryDefaults}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-neutral-300 hover:text-white transition-all cursor-pointer"
              title="Reset all parameters to standard RBI statutory guidelines"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <button
              onClick={copyRuleAudit}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-xs font-semibold text-amber-300 transition-all cursor-pointer shadow-sm"
            >
              {copiedAudit ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Audit Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Audit Rules</span>
                </>
              )}
            </button>
          </div>
        </div>

        <div className="relative z-10 space-y-2 max-w-3xl">
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
            Regulatory Parameter Registry & Stress-Testing Sandbox
          </h1>
          <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
            All credit underwriting thresholds, FOIR affordability formulas, and RBI fair-practice caps are decoupled from UI components. Adjust the regulatory parameters below to stress-test your household carry capacity.
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. INTERACTIVE POLICY SHOCK SLIDERS & LIVE TELEMETRY          */}
      {/* ------------------------------------------------------------- */}
      <div className="p-7 sm:p-9 rounded-[2.5rem] bg-[#120D1A]/95 border border-amber-500/30 shadow-2xl backdrop-blur-2xl space-y-6">
        
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-sm">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-white text-xl sm:text-2xl">
                Live Underwriting Shock Parameters
              </h2>
              <p className="text-xs text-neutral-400 font-light">
                Simulate stricter or looser regulatory guidelines on real borrower cashflows.
              </p>
            </div>
          </div>

          {/* Borrower Selector Chips */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase text-neutral-400">Test Borrower:</span>
            {PRESET_PROFILES.map((p) => {
              const isSelected = selectedBorrower.name === p.profile.name;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedBorrower(p.profile)}
                  className={`px-3 py-1 rounded-xl text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-amber-500 text-black font-bold shadow-md'
                      : 'bg-white/5 hover:bg-white/10 text-neutral-300 border border-white/10'
                  }`}
                >
                  <span>{p.profile.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4 Interactive Parameter Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Slider 1: FOIR Ceiling */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2.5">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-white">Max FOIR Ceiling</span>
              <span className="font-mono text-cyan-300 font-bold">{foirCeilingPercent}%</span>
            </div>
            <input
              type="range"
              min="30"
              max="65"
              step="5"
              value={foirCeilingPercent}
              onChange={(e) => setFoirCeilingPercent(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer h-2 bg-neutral-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] font-mono text-neutral-500">
              <span>30% (Strict)</span>
              <span>50% (Standard)</span>
              <span>65% (Aggressive)</span>
            </div>
          </div>

          {/* Slider 2: Living Buffer */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2.5">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-white">Living Cushion Floor</span>
              <span className="font-mono text-amber-300 font-bold">{livingBufferPercent}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="35"
              step="5"
              value={livingBufferPercent}
              onChange={(e) => setLivingBufferPercent(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer h-2 bg-neutral-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] font-mono text-neutral-500">
              <span>10% (Thin)</span>
              <span>20% (Default)</span>
              <span>35% (High Safety)</span>
            </div>
          </div>

          {/* Slider 3: Predatory APR */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2.5">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-white">Predatory APR Cutoff</span>
              <span className="font-mono text-rose-300 font-bold">{predatoryAprCutoff}%</span>
            </div>
            <input
              type="range"
              min="18"
              max="36"
              step="2"
              value={predatoryAprCutoff}
              onChange={(e) => setPredatoryAprCutoff(Number(e.target.value))}
              className="w-full accent-rose-400 cursor-pointer h-2 bg-neutral-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] font-mono text-neutral-500">
              <span>18% (Sub-Prime)</span>
              <span>24% (RBI Cap)</span>
              <span>36% (App Trap)</span>
            </div>
          </div>

          {/* Slider 4: Commercial LTV */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2.5">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-white">Commercial LAP LTV</span>
              <span className="font-mono text-emerald-300 font-bold">{commercialLtvCap}%</span>
            </div>
            <input
              type="range"
              min="40"
              max="75"
              step="5"
              value={commercialLtvCap}
              onChange={(e) => setCommercialLtvCap(Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer h-2 bg-neutral-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] font-mono text-neutral-500">
              <span>40% (Conservative)</span>
              <span>50% (Standard)</span>
              <span>75% (Max)</span>
            </div>
          </div>

        </div>

        {/* Live Evaluated Telemetry for Selected Borrower under Shock Settings */}
        <div className="p-5 rounded-2xl bg-black/60 border border-white/10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
          <div>
            <span className="text-neutral-400 block text-[10px] uppercase">Active Subject</span>
            <span className="font-bold text-white text-sm">{selectedBorrower.name}</span>
            <span className="text-neutral-500 block text-[10px] truncate">{selectedBorrower.occupation}</span>
          </div>

          <div>
            <span className="text-neutral-400 block text-[10px] uppercase">Dynamic Max EMI Ceiling</span>
            <span className="font-bold text-cyan-300 text-sm">₹{dynamicMaxEmiCeiling.toLocaleString('en-IN')}/mo</span>
            <span className="text-neutral-500 block text-[10px]">At {foirCeilingPercent}% FOIR</span>
          </div>

          <div>
            <span className="text-neutral-400 block text-[10px] uppercase">Safe Discretionary Surplus</span>
            <span className="font-bold text-emerald-400 text-sm">₹{dynamicDiscretionarySurplus.toLocaleString('en-IN')}/mo</span>
            <span className="text-neutral-500 block text-[10px]">After {livingBufferPercent}% living floor</span>
          </div>

          <div>
            <span className="text-neutral-400 block text-[10px] uppercase">Engine Sanction Cap</span>
            <span className="font-bold text-amber-300 text-sm">₹{(currentResult.amount.borrowerSafeCarryMax / 100000).toFixed(2)} Lakhs</span>
            <span className="text-neutral-500 block text-[10px]">Sovereign Safe Carry</span>
          </div>
        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. RULES REGISTRY VIEWER WITH LIVE STATUS                     */}
      {/* ------------------------------------------------------------- */}
      <div className="p-7 sm:p-9 rounded-[2.5rem] bg-[#120D1A]/95 border border-white/10 shadow-2xl backdrop-blur-2xl space-y-6">
        
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-display font-bold text-white text-xl sm:text-2xl">
              Deterministic Rule Inventory & Statutory Precedents
            </h3>
            <p className="text-xs text-neutral-400 font-light mt-0.5">
              16 formal underwriting standards guarding borrowers from asymmetrical banking power.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto bg-black/40 p-1.5 rounded-2xl border border-white/5 text-xs font-mono">
            {['ALL', 'AFFORDABILITY', 'UNDERWRITING', 'PRICING', 'REGULATORY'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  filterCategory === cat
                    ? 'bg-amber-500 text-black font-bold shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative w-full">
          <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search rules by code (R01..), keyword ('FOIR', 'KFS', 'prepayment'), or RBI circular citation..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-white/10 bg-black/40 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-amber-500/50 shadow-inner"
          />
        </div>

        {/* Rules Grid */}
        <div className="space-y-3.5">
          {filteredRules.map((rule) => {
            const enabled = isRuleEnabled(rule.code);
            const isExpanded = expandedRuleCode === rule.code;

            const categoryBadgeColor = 
              rule.category === 'AFFORDABILITY' ? 'bg-amber-500/20 text-amber-300 border-amber-400/40' :
              rule.category === 'PRICING' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40' :
              rule.category === 'UNDERWRITING' ? 'bg-purple-500/20 text-purple-300 border-purple-400/40' :
              'bg-emerald-500/20 text-emerald-300 border-emerald-400/40';

            return (
              <div
                key={rule.code}
                className={`rounded-2xl border transition-all duration-200 ${
                  enabled 
                    ? 'bg-white/[0.02] border-white/10 hover:border-amber-500/40 shadow-sm'
                    : 'bg-black/30 border-white/5 opacity-50'
                }`}
              >
                <div className="p-5 flex flex-wrap items-center justify-between gap-4">
                  
                  {/* Left: Code, Title & Category */}
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="font-mono text-xs font-bold text-amber-300 bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-500/30 shrink-0">
                      {rule.code}
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-display font-semibold text-white text-base truncate">
                          {rule.name}
                        </h4>
                        <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full border ${categoryBadgeColor}`}>
                          {rule.category}
                        </span>
                      </div>
                      <p className="text-xs text-neutral-400 font-light truncate mt-0.5 max-w-xl">
                        {rule.domainRationale}
                      </p>
                    </div>
                  </div>

                  {/* Right: Parameter Value & Expand Action */}
                  <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                      <span className="text-[10px] font-mono text-neutral-500 block">THRESHOLD</span>
                      <span className="text-xs font-mono font-bold text-cyan-300">{rule.parameterValue}</span>
                    </div>

                    {/* Rule Toggle Switch */}
                    <button
                      onClick={() => toggleRule(rule.code)}
                      className={`px-3 py-1 rounded-xl text-[11px] font-mono transition-all cursor-pointer ${
                        enabled
                          ? 'bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-bold'
                          : 'bg-rose-500/20 border border-rose-400/40 text-rose-400'
                      }`}
                      title={enabled ? 'Rule is active in underwriting engine' : 'Rule bypassed for testing'}
                    >
                      {enabled ? 'Active' : 'Bypassed'}
                    </button>

                    <button
                      onClick={() => setExpandedRuleCode(isExpanded ? null : rule.code)}
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                      title="Toggle detailed rationale & legal citation"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                </div>

                {/* Expanded Drawer */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-white/5 space-y-3 text-xs animate-fadeIn">
                    <div className="p-3.5 rounded-xl bg-black/50 border border-white/5 space-y-1">
                      <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">
                        Domain Defense Rationale & Asymmetry Prevention:
                      </span>
                      <p className="text-neutral-200 font-light leading-relaxed">
                        {rule.domainRationale}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono">
                      <div>
                        <span className="text-neutral-500">Official Benchmark Reference: </span>
                        <span className="text-emerald-400 font-semibold">{rule.source}</span>
                      </div>
                      <div className="text-neutral-400">
                        <span>Runtime Status: </span>
                        <strong className={enabled ? 'text-emerald-400' : 'text-rose-400'}>
                          {enabled ? 'Enforced in Decision Graph' : 'Bypassed in Sandbox'}
                        </strong>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};

export default RuleSandbox;
