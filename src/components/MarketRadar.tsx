import React, { useState } from 'react';
import { 
  TrendingUp, 
  Percent, 
  Calculator, 
  ArrowUpRight, 
  ShieldCheck, 
  AlertCircle, 
  Sparkles,
  Building2,
  Landmark,
  Layers,
  Scale,
  Check,
  Copy,
  Zap,
  HelpCircle,
  RefreshCw,
  AlertTriangle,
  Info
} from 'lucide-react';
import { calculateAllInApr } from '../engine/calculator';

interface LenderData {
  id: string;
  lender: string;
  product: string;
  category: 'PERSONAL' | 'LAP' | 'BUSINESS' | 'GOLD';
  nominalMin: number;
  nominalMax: number;
  nominalRateStr: string;
  spreadOverRepo: string;
  processingFeePercent: number;
  feeStructure: string;
  type: 'PSU Bank' | 'Private Bank' | 'NBFC' | 'App Lender';
  linkage: string;
  turnaround: string;
}

export const MarketRadar: React.FC = () => {
  // ---------------------------------------------------------------------------
  // 1. Calculator State
  // ---------------------------------------------------------------------------
  const [calcAmount, setCalcAmount] = useState<number>(800000);
  const [calcRate, setCalcRate] = useState<number>(10.75);
  const [calcFeePercent, setCalcFeePercent] = useState<number>(1.0);
  const [calcTenureMonths, setCalcTenureMonths] = useState<number>(48);
  const [includeInsurance, setIncludeInsurance] = useState<boolean>(false);
  const [includeDocCharges, setIncludeDocCharges] = useState<boolean>(false);

  // ---------------------------------------------------------------------------
  // 2. Floating Rate Shock Simulator State
  // ---------------------------------------------------------------------------
  const [rateShockBps, setRateShockBps] = useState<number>(0); // e.g. +50 bps = +0.50%

  // ---------------------------------------------------------------------------
  // 3. Table Filters
  // ---------------------------------------------------------------------------
  const [selectedTierFilter, setSelectedTierFilter] = useState<string>('ALL');
  const [selectedProductFilter, setSelectedProductFilter] = useState<string>('ALL');
  const [copiedBrief, setCopiedBrief] = useState<boolean>(false);

  // ---------------------------------------------------------------------------
  // 4. Financial Calculations
  // ---------------------------------------------------------------------------
  const insuranceCost = includeInsurance ? Math.round(calcAmount * 0.025) : 0; // ~2.5% bundled insurance
  const docChargesCost = includeDocCharges ? 2500 : 0; // ₹2,500 stamp & verification

  const baseProcessingFee = calcAmount * (calcFeePercent / 100);
  const gstOnFee = baseProcessingFee * 0.18;
  const totalUpfrontFeeDeduction = baseProcessingFee + gstOnFee + insuranceCost + docChargesCost;
  const netDisbursedInHand = Math.max(0, calcAmount - totalUpfrontFeeDeduction);

  // Effective fee percent including all upfront friction
  const effectiveTotalUpfrontFeePercent = (totalUpfrontFeeDeduction / calcAmount) * 100;
  const calculatedApr = calculateAllInApr(
    calcRate,
    calcAmount,
    effectiveTotalUpfrontFeePercent / 1.18, // normalize for engine internal GST
    calcTenureMonths
  );
  const feeDrag = Math.max(0, calculatedApr - calcRate).toFixed(2);

  // Monthly EMI Formula: E = P * r * (1+r)^n / ((1+r)^n - 1)
  const monthlyRate = calcRate / (12 * 100);
  const emiNumerator = calcAmount * monthlyRate * Math.pow(1 + monthlyRate, calcTenureMonths);
  const emiDenominator = Math.pow(1 + monthlyRate, calcTenureMonths) - 1;
  const baseMonthlyEmi = emiDenominator > 0 ? Math.round(emiNumerator / emiDenominator) : 0;
  const totalRepayment = baseMonthlyEmi * calcTenureMonths;
  const totalInterestPaid = Math.max(0, totalRepayment - calcAmount);

  // Floating Shock Calculations
  const shockedRate = calcRate + (rateShockBps / 100);
  const shockedMonthlyRate = shockedRate / (12 * 100);
  const shockedEmiNum = calcAmount * shockedMonthlyRate * Math.pow(1 + shockedMonthlyRate, calcTenureMonths);
  const shockedEmiDen = Math.pow(1 + shockedMonthlyRate, calcTenureMonths) - 1;
  const shockedMonthlyEmi = shockedEmiDen > 0 ? Math.round(shockedEmiNum / shockedEmiDen) : 0;
  const emiDifference = shockedMonthlyEmi - baseMonthlyEmi;
  const totalExtraInterestFromShock = emiDifference * calcTenureMonths;

  // ---------------------------------------------------------------------------
  // 5. 2026 Institutional Lending Data Matrix
  // ---------------------------------------------------------------------------
  const LENDERS: LenderData[] = [
    {
      id: 'sbi-xpress',
      lender: 'State Bank of India (SBI)',
      product: 'Xpress Credit (Salaried Prime)',
      category: 'PERSONAL',
      nominalMin: 10.30,
      nominalMax: 12.50,
      nominalRateStr: '10.30% – 12.50%',
      spreadOverRepo: '+3.80% to +6.00%',
      processingFeePercent: 0.50,
      feeStructure: '0.50% (Capped at ₹5,000)',
      type: 'PSU Bank',
      linkage: 'Direct EBLR (Repo Linked)',
      turnaround: '2 – 4 Days'
    },
    {
      id: 'bob-mortgage',
      lender: 'Bank of Baroda',
      product: 'Baroda Mortgage (Secured LAP)',
      category: 'LAP',
      nominalMin: 9.15,
      nominalMax: 10.50,
      nominalRateStr: '9.15% – 10.50%',
      spreadOverRepo: '+2.65% to +4.00%',
      processingFeePercent: 0.50,
      feeStructure: '0.50% (Max ₹10,000)',
      type: 'PSU Bank',
      linkage: 'Direct BRLLR (Repo Linked)',
      turnaround: '5 – 8 Days'
    },
    {
      id: 'pnb-personal',
      lender: 'Punjab National Bank (PNB)',
      product: 'PNB Sahyog (Corporate Personal)',
      category: 'PERSONAL',
      nominalMin: 10.40,
      nominalMax: 12.80,
      nominalRateStr: '10.40% – 12.80%',
      spreadOverRepo: '+3.90% to +6.30%',
      processingFeePercent: 0.50,
      feeStructure: '0.50% flat',
      type: 'PSU Bank',
      linkage: 'RLLR Linked',
      turnaround: '3 – 5 Days'
    },
    {
      id: 'hdfc-prime',
      lender: 'HDFC Bank',
      product: 'Prime Corporate Personal Loan',
      category: 'PERSONAL',
      nominalMin: 10.50,
      nominalMax: 13.75,
      nominalRateStr: '10.50% – 13.75%',
      spreadOverRepo: '+4.00% to +7.25%',
      processingFeePercent: 1.25,
      feeStructure: '1.00% – 1.50% + GST',
      type: 'Private Bank',
      linkage: 'External EBLR (Quarterly Reset)',
      turnaround: '24 Hours'
    },
    {
      id: 'icici-lap',
      lender: 'ICICI Bank',
      product: 'Commercial Property Term Loan (LAP)',
      category: 'LAP',
      nominalMin: 9.25,
      nominalMax: 10.75,
      nominalRateStr: '9.25% – 10.75%',
      spreadOverRepo: '+2.75% to +4.25%',
      processingFeePercent: 0.75,
      feeStructure: '0.75% – 1.00% + GST',
      type: 'Private Bank',
      linkage: 'I-EBLR (Monthly Reset)',
      turnaround: '4 – 7 Days'
    },
    {
      id: 'axis-corp',
      lender: 'Axis Bank',
      product: 'Pre-Approved Salaried Credit',
      category: 'PERSONAL',
      nominalMin: 10.75,
      nominalMax: 14.50,
      nominalRateStr: '10.75% – 14.50%',
      spreadOverRepo: '+4.25% to +8.00%',
      processingFeePercent: 1.50,
      feeStructure: '1.25% – 2.00% + GST',
      type: 'Private Bank',
      linkage: 'Repo Linked',
      turnaround: 'Instant / 1 Day'
    },
    {
      id: 'bajaj-finserv',
      lender: 'Bajaj Finserv',
      product: 'Unsecured Business Loan',
      category: 'BUSINESS',
      nominalMin: 16.50,
      nominalMax: 22.00,
      nominalRateStr: '16.50% – 22.00%',
      spreadOverRepo: '+10.00% to +15.50%',
      processingFeePercent: 2.50,
      feeStructure: '2.00% – 3.50% + GST',
      type: 'NBFC',
      linkage: 'Internal Cost of Funds',
      turnaround: '24 – 48 Hours'
    },
    {
      id: 'tata-capital',
      lender: 'Tata Capital',
      product: 'MSME Growth Capital',
      category: 'BUSINESS',
      nominalMin: 14.50,
      nominalMax: 19.50,
      nominalRateStr: '14.50% – 19.50%',
      spreadOverRepo: '+8.00% to +13.00%',
      processingFeePercent: 2.00,
      feeStructure: '1.50% – 2.50% + GST',
      type: 'NBFC',
      linkage: 'Internal Prime Rate',
      turnaround: '2 – 3 Days'
    },
    {
      id: 'muthoot-gold',
      lender: 'Muthoot Finance',
      product: 'Super Gold Loan (75% LTV)',
      category: 'GOLD',
      nominalMin: 9.90,
      nominalMax: 14.50,
      nominalRateStr: '9.90% – 14.50%',
      spreadOverRepo: '+3.40% to +8.00%',
      processingFeePercent: 0.25,
      feeStructure: '0.25% – 0.50% flat',
      type: 'NBFC',
      linkage: 'Fixed Rate Contracts',
      turnaround: '30 Minutes'
    },
    {
      id: 'navi-app',
      lender: 'Navi Technologies',
      product: 'Digital App Personal Loan',
      category: 'PERSONAL',
      nominalMin: 24.00,
      nominalMax: 32.00,
      nominalRateStr: '24.00% – 32.00%',
      spreadOverRepo: '+17.50% to +25.50%',
      processingFeePercent: 3.50,
      feeStructure: '3.00% – 4.50% + GST',
      type: 'App Lender',
      linkage: 'High-Risk Algorithmic Model',
      turnaround: '5 Minutes'
    },
    {
      id: 'kreditbee-app',
      lender: 'KreditBee',
      product: 'Instant Cash Advance',
      category: 'PERSONAL',
      nominalMin: 26.00,
      nominalMax: 36.00,
      nominalRateStr: '26.00% – 36.00%',
      spreadOverRepo: '+19.50% to +29.50%',
      processingFeePercent: 4.50,
      feeStructure: '4.00% – 6.00% + GST',
      type: 'App Lender',
      linkage: 'Micro-Credit Algo',
      turnaround: 'Instant Disbursal'
    }
  ];

  // Quick Preset Handlers
  const loadLenderPreset = (lender: LenderData) => {
    setCalcRate(lender.nominalMin);
    setCalcFeePercent(lender.processingFeePercent);
  };

  // Filtered Table
  const filteredLenders = LENDERS.filter((l) => {
    if (selectedTierFilter !== 'ALL' && l.type !== selectedTierFilter) return false;
    if (selectedProductFilter !== 'ALL' && l.category !== selectedProductFilter) return false;
    return true;
  });

  const copyNegotiationBrief = () => {
    const brief = [
      '=== OFFICIAL BORROWER COPILOT: 2026 RATES RADAR BRIEF ===',
      `Current RBI Repo Rate Benchmark: 6.50% (MPC Policy Anchor)`,
      `Quoted Nominal Rate Evaluated: ${calcRate.toFixed(2)}%`,
      `True All-In APR (KFS Mandate): ${calculatedApr.toFixed(2)}%`,
      `Hidden Upfront Friction Drag: +${feeDrag}% APR`,
      `Calculated Monthly EMI: ₹${baseMonthlyEmi.toLocaleString('en-IN')}`,
      `Upfront Deductions (Fee + GST): ₹${totalUpfrontFeeDeduction.toLocaleString('en-IN')}`,
      `Net In-Hand Disbursed: ₹${netDisbursedInHand.toLocaleString('en-IN')}`,
      '',
      'STATUTORY MANDATES FOR BRANCH NEGOTIATION:',
      '1. EBLR Linkage: Retail floating loans must link to RBI Repo (Circular RBI/2019-20/54).',
      '2. Zero Foreclosure Penalties: 0% prepayment charges on floating retail loans to individuals.',
      '3. Mandatory KFS: Lender must provide standardized 1-page Key Fact Statement before signing.',
      '4. Upfront Fee Cap: Fair statutory processing ceiling is 0.50% (Max ₹5,000 - ₹10,000).'
    ].join('\n');

    navigator.clipboard.writeText(brief);
    setCopiedBrief(true);
    setTimeout(() => setCopiedBrief(false), 2500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn select-none pb-12">
      
      {/* ------------------------------------------------------------- */}
      {/* 1. HERO HEADER WITH LIVE RBI REPO TELEMETRY PULSE             */}
      {/* ------------------------------------------------------------- */}
      <div className="rounded-[2.5rem] bg-gradient-to-r from-[#0C1222] via-[#100D1B] to-[#1F1008] border border-cyan-500/30 p-7 sm:p-9 shadow-2xl relative overflow-hidden backdrop-blur-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest px-3.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 shadow-sm flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>Live Market Intelligence Radar</span>
            </span>
            <span className="text-xs font-mono text-neutral-400">
              RBI External Benchmark Mandate (EBLR 2026)
            </span>
          </div>

          <button
            onClick={copyNegotiationBrief}
            className="flex items-center gap-2 px-4 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-neutral-200 hover:text-white transition-all cursor-pointer shadow-sm"
          >
            {copiedBrief ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Rates Brief Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-cyan-400" />
                <span>Copy Rates Brief</span>
              </>
            )}
          </button>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          <div className="lg:col-span-7 space-y-2">
            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
              Indian Retail Lending Rates & APR Radar
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 font-light max-w-2xl leading-relaxed">
              Anchor branch loan discussions against the sovereign RBI Repo Rate (6.50%). Calculate hidden upfront fee drag, compare institutional tiers, and stress-test future rate hikes before you sign.
            </p>
          </div>

          {/* Central Bank Monetary Telemetry Bar */}
          <div className="lg:col-span-5 grid grid-cols-3 gap-2.5 sm:gap-3 bg-black/60 p-4 rounded-3xl border border-white/10 backdrop-blur-xl">
            <div className="text-center p-2 rounded-2xl bg-white/[0.02]">
              <span className="text-[10px] font-mono uppercase text-neutral-400 block">RBI Repo Rate</span>
              <span className="font-display text-2xl sm:text-3xl font-bold text-cyan-300">6.50%</span>
              <span className="text-[9px] font-mono text-emerald-400 block mt-0.5">Anchor Rate</span>
            </div>
            <div className="text-center p-2 rounded-2xl bg-white/[0.02]">
              <span className="text-[10px] font-mono uppercase text-neutral-400 block">SDF Rate</span>
              <span className="font-display text-2xl sm:text-3xl font-bold text-neutral-200">6.25%</span>
              <span className="text-[9px] font-mono text-neutral-400 block mt-0.5">Deposit Floor</span>
            </div>
            <div className="text-center p-2 rounded-2xl bg-white/[0.02]">
              <span className="text-[10px] font-mono uppercase text-neutral-400 block">MSF Ceiling</span>
              <span className="font-display text-2xl sm:text-3xl font-bold text-amber-300">6.75%</span>
              <span className="text-[9px] font-mono text-amber-400/80 block mt-0.5">Marginal Stance</span>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. INTERACTIVE ALL-IN APR & DISBURSAL CASHFLOW TERMINAL       */}
      {/* ------------------------------------------------------------- */}
      <div className="p-7 sm:p-9 rounded-[2.5rem] bg-[#120D1A]/95 border border-amber-500/30 shadow-2xl backdrop-blur-2xl space-y-8 relative overflow-hidden">
        
        {/* Terminal Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-white text-xl sm:text-2xl">
                RBI Key Fact Statement (KFS) True Cost Calculator
              </h2>
              <p className="text-xs text-neutral-400 font-light">
                Compute the true all-in APR including processing deductions, 18% GST, and hidden fee friction.
              </p>
            </div>
          </div>

          {/* Quick Preset Lender Chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-mono uppercase text-neutral-400 mr-1">Quick Load:</span>
            {LENDERS.slice(0, 4).map((len) => (
              <button
                key={len.id}
                onClick={() => loadLenderPreset(len)}
                className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-amber-500/20 hover:text-amber-300 border border-white/10 hover:border-amber-400/40 text-[11px] font-mono text-neutral-300 transition-all cursor-pointer"
                title={`Load ${len.lender} terms (${len.nominalMin}% + ${len.processingFeePercent}% fee)`}
              >
                {len.lender.split(' ')[0]} ({len.nominalMin}%)
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Panel (7 Cols) */}
          <div className="lg:col-span-7 space-y-5 text-xs">
            
            {/* Amount Slider */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
              <div className="flex justify-between items-center font-semibold text-white">
                <span className="flex items-center gap-2">
                  <span>Sanction Loan Principal</span>
                  <span className="text-[10px] font-mono text-neutral-400 font-normal">(Gross Amount)</span>
                </span>
                <span className="font-mono text-lg text-cyan-300 font-bold">
                  ₹{(calcAmount / 100000).toFixed(2)} Lakhs
                </span>
              </div>
              <input
                type="range"
                min="50000"
                max="5000000"
                step="50000"
                value={calcAmount}
                onChange={(e) => setCalcAmount(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-2 bg-neutral-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                <span>₹50,000</span>
                <span>₹10 Lakhs</span>
                <span>₹25 Lakhs</span>
                <span>₹50 Lakhs</span>
              </div>
            </div>

            {/* Nominal Rate Slider */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
              <div className="flex justify-between items-center font-semibold text-white">
                <span className="flex items-center gap-2">
                  <span>Bank Quoted Nominal Interest Rate</span>
                  <span className="text-[10px] font-mono text-amber-400/80 font-normal">
                    (Repo + {(calcRate - 6.50).toFixed(2)}% Spread)
                  </span>
                </span>
                <span className="font-mono text-lg text-amber-300 font-bold">
                  {calcRate.toFixed(2)}% p.a.
                </span>
              </div>
              <input
                type="range"
                min="8.0"
                max="36.0"
                step="0.25"
                value={calcRate}
                onChange={(e) => setCalcRate(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer h-2 bg-neutral-800 rounded-lg"
              />
              <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                <span>8.0% (PSU LAP)</span>
                <span>10.5% (Prime Personal)</span>
                <span>18.0% (NBFC)</span>
                <span>36.0% (Fintech App)</span>
              </div>
            </div>

            {/* Fee & Tenure Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Processing Fee Slider */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2.5">
                <div className="flex justify-between font-semibold text-white">
                  <span>Processing Fee %</span>
                  <span className="font-mono text-amber-300 font-bold">{calcFeePercent.toFixed(2)}% + GST</span>
                </div>
                <input
                  type="range"
                  min="0.25"
                  max="4.5"
                  step="0.25"
                  value={calcFeePercent}
                  onChange={(e) => setCalcFeePercent(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer h-2 bg-neutral-800 rounded-lg"
                />
                <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                  <span>0.25% (Fair Cap)</span>
                  <span>4.50% (High Gouge)</span>
                </div>
              </div>

              {/* Tenure Selector */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2.5">
                <div className="flex justify-between font-semibold text-white">
                  <span>Repayment Tenure</span>
                  <span className="font-mono text-cyan-300 font-bold">{calcTenureMonths} Months ({(calcTenureMonths / 12).toFixed(1)} Yrs)</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5 pt-1">
                  {[12, 24, 36, 48, 60, 84].slice(0, 4).map((ten) => (
                    <button
                      key={ten}
                      onClick={() => setCalcTenureMonths(ten)}
                      className={`py-1.5 rounded-lg text-center font-mono text-xs transition-all cursor-pointer ${
                        calcTenureMonths === ten
                          ? 'bg-cyan-500 text-black font-bold shadow-md'
                          : 'bg-white/5 hover:bg-white/10 text-neutral-300'
                      }`}
                    >
                      {ten}M
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Hidden Cost Checkboxes */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3">
              <span className="text-[11px] font-mono uppercase text-neutral-400 font-bold block">
                Disclose Hidden Upfront Deductions (Branch Red Flags)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex items-center gap-2.5 cursor-pointer text-neutral-300 hover:text-white transition-colors">
                  <input
                    type="checkbox"
                    checked={includeInsurance}
                    onChange={(e) => setIncludeInsurance(e.target.checked)}
                    className="w-4 h-4 accent-amber-400 rounded cursor-pointer"
                  />
                  <span>Bundled Credit Life Insurance (~2.5%)</span>
                </label>
                <label className="flex items-center gap-2.5 cursor-pointer text-neutral-300 hover:text-white transition-colors">
                  <input
                    type="checkbox"
                    checked={includeDocCharges}
                    onChange={(e) => setIncludeDocCharges(e.target.checked)}
                    className="w-4 h-4 accent-amber-400 rounded cursor-pointer"
                  />
                  <span>Documentation & CERSAI Charges (₹2,500)</span>
                </label>
              </div>
            </div>

          </div>

          {/* Results Dossier Card (5 Cols) */}
          <div className="lg:col-span-5 rounded-3xl bg-black/60 border-2 border-amber-500/40 p-6 sm:p-7 space-y-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between text-neutral-400 text-xs font-mono mb-1">
                <span>STATUTORY KEY FACT STATEMENT</span>
                <span className="text-emerald-400 font-bold">RBI MANDATED</span>
              </div>
              <div className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
                {calculatedApr.toFixed(2)}% <span className="text-lg font-sans font-normal text-neutral-400">All-In APR</span>
              </div>
              
              <div className="mt-2.5 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-mono">
                <AlertCircle className="w-4 h-4 shrink-0 text-amber-400" />
                <span>Upfront Friction: +{feeDrag}% markup over nominal rate</span>
              </div>
            </div>

            {/* Monthly Outgo & Disbursal Breakdown */}
            <div className="space-y-2.5 border-t border-white/10 pt-4 text-xs font-mono text-neutral-300">
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Calculated Monthly EMI:</span>
                <span className="text-white font-bold text-base">₹{baseMonthlyEmi.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Total Interest Over Loan:</span>
                <span className="text-neutral-200 font-semibold">₹{totalInterestPaid.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Base Processing Fee:</span>
                <span className="text-neutral-200">₹{Math.round(baseProcessingFee).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Mandatory 18% GST on Fee:</span>
                <span className="text-neutral-200">₹{Math.round(gstOnFee).toLocaleString('en-IN')}</span>
              </div>
              {includeInsurance && (
                <div className="flex justify-between items-center text-amber-300">
                  <span>Bundled Insurance Premium:</span>
                  <span>₹{insuranceCost.toLocaleString('en-IN')}</span>
                </div>
              )}
              {includeDocCharges && (
                <div className="flex justify-between items-center text-amber-300">
                  <span>Stamp & Verification:</span>
                  <span>₹{docChargesCost.toLocaleString('en-IN')}</span>
                </div>
              )}

              {/* Net Disbursal Callout */}
              <div className="p-3.5 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-xs flex justify-between items-center font-bold text-amber-200 mt-2">
                <div>
                  <span className="block text-[10px] uppercase font-normal text-amber-300/80">Net Cash Disbursed to Account</span>
                  <span className="text-white text-base">₹{netDisbursedInHand.toLocaleString('en-IN')}</span>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] uppercase font-normal text-amber-300/80">Upfront Lost at Source</span>
                  <span className="text-rose-400 text-sm">-₹{Math.round(totalUpfrontFeeDeduction).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Visual Breakdown Bar */}
            <div className="space-y-1.5 pt-2">
              <span className="text-[10px] font-mono uppercase text-neutral-400">Repayment Capital Structure</span>
              <div className="h-3 w-full rounded-full bg-neutral-800 overflow-hidden flex">
                <div 
                  className="h-full bg-cyan-400" 
                  style={{ width: `${(calcAmount / (totalRepayment || 1)) * 100}%` }}
                  title="Principal Principal Repaid"
                />
                <div 
                  className="h-full bg-amber-400" 
                  style={{ width: `${(totalInterestPaid / (totalRepayment || 1)) * 100}%` }}
                  title="Pure Interest to Lender"
                />
              </div>
              <div className="flex justify-between text-[9px] font-mono text-neutral-400 pt-0.5">
                <span className="text-cyan-300">■ Principal ({Math.round((calcAmount / (totalRepayment || 1)) * 100)}%)</span>
                <span className="text-amber-300">■ Total Interest ({Math.round((totalInterestPaid / (totalRepayment || 1)) * 100)}%)</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. FLOATING RATE HIKE STRESS-TESTER (RBI TRANSMISSION SHOCK)  */}
      {/* ------------------------------------------------------------- */}
      <div className="p-7 sm:p-9 rounded-[2.5rem] bg-gradient-to-r from-[#170E22] via-[#100D1A] to-[#0A1624] border border-cyan-500/30 shadow-2xl backdrop-blur-2xl space-y-6">
        
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-[10px] font-mono font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                <span>Monetary Policy Stress-Test</span>
              </span>
              <span className="text-xs font-mono text-neutral-400">EBLR Shock Simulation</span>
            </div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
              Floating Rate Hike Shock Simulator
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-light max-w-2xl">
              Under RBI external benchmark rules, if the central bank raises the repo rate, your bank automatically passes 100% of the hike to you within 30 days. Test your cashflow resilience below.
            </p>
          </div>

          {/* Shock Preset Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { label: 'Base Rate (0 bps)', value: 0 },
              { label: '+25 bps (+0.25%)', value: 25 },
              { label: '+50 bps (+0.50%)', value: 50 },
              { label: '+100 bps (+1.00%)', value: 100 },
              { label: '-25 bps (-0.25%)', value: -25 }
            ].map((shock) => (
              <button
                key={shock.value}
                onClick={() => setRateShockBps(shock.value)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                  rateShockBps === shock.value
                    ? 'bg-cyan-500 text-black font-bold border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                    : 'bg-white/5 border-white/10 text-neutral-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {shock.label}
              </button>
            ))}
          </div>
        </div>

        {/* Shock Impact Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          
          <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-1">
            <span className="text-[10px] font-mono uppercase text-neutral-400 block">Shocked Floating Rate</span>
            <div className="font-display text-2xl sm:text-3xl font-bold text-white">
              {shockedRate.toFixed(2)}%
            </div>
            <span className={`text-[10px] font-mono font-semibold block ${rateShockBps >= 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
              {rateShockBps >= 0 ? `+${rateShockBps} bps increase` : `${rateShockBps} bps rate cut`}
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-1">
            <span className="text-[10px] font-mono uppercase text-neutral-400 block">New Monthly EMI</span>
            <div className="font-display text-2xl sm:text-3xl font-bold text-white">
              ₹{shockedMonthlyEmi.toLocaleString('en-IN')}
            </div>
            <span className={`text-[10px] font-mono font-semibold block ${emiDifference >= 0 ? 'text-rose-400' : 'text-emerald-400'}`}>
              {emiDifference >= 0 ? `+₹${emiDifference.toLocaleString('en-IN')}/mo extra outgo` : `-₹${Math.abs(emiDifference).toLocaleString('en-IN')}/mo savings`}
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-1">
            <span className="text-[10px] font-mono uppercase text-neutral-400 block">Cumulative Extra Interest</span>
            <div className="font-display text-2xl sm:text-3xl font-bold text-amber-300">
              ₹{Math.abs(totalExtraInterestFromShock).toLocaleString('en-IN')}
            </div>
            <span className="text-[10px] font-mono text-neutral-400 block">
              Over {calcTenureMonths} months tenure
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-1">
            <span className="text-[10px] font-mono uppercase text-neutral-400 block">Statutory Protection Tip</span>
            <p className="text-[11px] text-neutral-300 font-light leading-snug">
              Under RBI 2023 Master Direction, you have the right to prepay or switch to a fixed rate without any penal charge.
            </p>
          </div>

        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4. COMPREHENSIVE 2026 CARD RATES COMPARISON TABLE            */}
      {/* ------------------------------------------------------------- */}
      <div className="p-7 sm:p-9 rounded-[2.5rem] bg-[#120D1A]/95 border border-white/10 shadow-2xl backdrop-blur-2xl space-y-6">
        
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-display font-bold text-white text-xl sm:text-2xl">
              2026 Indian Lending Rates Across Institutional Tiers
            </h3>
            <p className="text-xs text-neutral-400 font-light mt-0.5">
              Compare Public Sector Banks, Tier-1 Private Banks, NBFCs, and Instant Apps side-by-side.
            </p>
          </div>

          {/* Tier Filters */}
          <div className="flex flex-wrap items-center gap-1.5 bg-black/40 p-1.5 rounded-2xl border border-white/5 text-xs font-medium">
            {['ALL', 'PSU Bank', 'Private Bank', 'NBFC', 'App Lender'].map((tier) => (
              <button
                key={tier}
                onClick={() => setSelectedTierFilter(tier)}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  selectedTierFilter === tier
                    ? 'bg-amber-500 text-black font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {tier === 'ALL' ? 'All Tiers' : tier}
              </button>
            ))}
          </div>
        </div>

        {/* Product Category Filters */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="text-neutral-400">Filter Product:</span>
          {[
            { label: 'All Products', val: 'ALL' },
            { label: 'Personal Loans', val: 'PERSONAL' },
            { label: 'Property / LAP', val: 'LAP' },
            { label: 'Business Growth', val: 'BUSINESS' },
            { label: 'Gold Loans', val: 'GOLD' }
          ].map((prod) => (
            <button
              key={prod.val}
              onClick={() => setSelectedProductFilter(prod.val)}
              className={`px-3 py-1 rounded-lg border transition-all cursor-pointer ${
                selectedProductFilter === prod.val
                  ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300 font-bold'
                  : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
              }`}
            >
              {prod.label}
            </button>
          ))}
        </div>

        {/* The Matrix Table */}
        <div className="overflow-x-auto rounded-2xl border border-white/10 shadow-inner">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-black/60 border-b border-white/10 text-neutral-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="p-4">Lender Institution</th>
                <th className="p-4">Product Category</th>
                <th className="p-4">Nominal Rate Band</th>
                <th className="p-4">Spread Over Repo</th>
                <th className="p-4">Processing Fee Cap</th>
                <th className="p-4">Benchmark Linkage</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-white/[0.01]">
              {filteredLenders.map((l) => (
                <tr key={l.id} className="hover:bg-white/[0.03] transition-colors group">
                  <td className="p-4 font-bold text-white flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300 shrink-0">
                      {l.type === 'PSU Bank' ? <Landmark className="w-3.5 h-3.5 text-emerald-400" /> :
                       l.type === 'Private Bank' ? <Building2 className="w-3.5 h-3.5 text-cyan-400" /> :
                       l.type === 'NBFC' ? <Layers className="w-3.5 h-3.5 text-amber-400" /> :
                       <Zap className="w-3.5 h-3.5 text-rose-400" />}
                    </div>
                    <div>
                      <span>{l.lender}</span>
                      <span className={`block text-[9px] font-normal ${
                        l.type === 'PSU Bank' ? 'text-emerald-400' :
                        l.type === 'Private Bank' ? 'text-cyan-400' :
                        l.type === 'NBFC' ? 'text-amber-400' : 'text-rose-400'
                      }`}>
                        {l.type}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-neutral-300">{l.product}</td>
                  <td className="p-4 font-bold text-amber-300 text-sm">{l.nominalRateStr}</td>
                  <td className="p-4 text-cyan-300 font-semibold">{l.spreadOverRepo}</td>
                  <td className="p-4 text-neutral-300">{l.feeStructure}</td>
                  <td className="p-4 text-neutral-400 text-[11px]">{l.linkage}</td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => {
                        loadLenderPreset(l);
                        window.scrollTo({ top: 400, behavior: 'smooth' });
                      }}
                      className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-amber-500 hover:text-black border border-white/10 font-sans font-semibold text-xs transition-all cursor-pointer shadow-sm group-hover:border-amber-400/50"
                    >
                      Simulate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* 5. STATUTORY RATE DEFENSE RULES (THE 4 NON-NEGOTIABLES)       */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <div className="p-6 rounded-3xl bg-black/40 border border-white/10 space-y-2.5">
          <div className="flex items-center gap-2 font-bold text-amber-400 text-sm">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>1. Mandatory External Benchmark (EBLR)</span>
          </div>
          <p className="text-xs text-neutral-300 font-light leading-relaxed">
            Per RBI Master Circular 2019, all floating personal, housing, and micro-business loans from commercial banks MUST link to an external benchmark (RBI Repo Rate). Banks cannot create artificial internal spreads to delay rate cuts.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-black/40 border border-white/10 space-y-2.5">
          <div className="flex items-center gap-2 font-bold text-emerald-400 text-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>2. Zero Foreclosure Penalties by Law</span>
          </div>
          <p className="text-xs text-neutral-300 font-light leading-relaxed">
            Under RBI DBOD.No.Dir.BC.107/13.03.00/2011-12, commercial banks and NBFCs are prohibited from levying any prepayment or foreclosure penalties on floating-rate term loans sanctioned to individual borrowers.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-black/40 border border-white/10 space-y-2.5">
          <div className="flex items-center gap-2 font-bold text-cyan-400 text-sm">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>3. Key Fact Statement (KFS) Pre-Condition</span>
          </div>
          <p className="text-xs text-neutral-300 font-light leading-relaxed">
            Per RBI Notification RBI/2024-25/112, no regulated lender can disburse a retail loan without providing a standardized single-page Key Fact Statement explicitly declaring the all-in APR, recovery agent details, and cooling-off period.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-black/40 border border-white/10 space-y-2.5">
          <div className="flex items-center gap-2 font-bold text-purple-400 text-sm">
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span>4. Prohibition of Negative Amortization</span>
          </div>
          <p className="text-xs text-neutral-300 font-light leading-relaxed">
            When floating rates increase, banks cannot extend loan tenure to the point where monthly interest exceeds the EMI without your explicit signed consent. Borrowers can demand an EMI adjustment or prepay penalty-free.
          </p>
        </div>

      </div>

    </div>
  );
};

export default MarketRadar;
