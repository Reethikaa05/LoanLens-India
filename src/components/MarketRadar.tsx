import React, { useState } from 'react';
import { TrendingUp, Percent, Calculator, ArrowUpRight, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';
import { calculateAllInApr } from '../engine/calculator';

export const MarketRadar: React.FC = () => {
  const [calcAmount, setCalcAmount] = useState<number>(500000);
  const [calcRate, setCalcRate] = useState<number>(11.5);
  const [calcFeePercent, setCalcFeePercent] = useState<number>(1.5);
  const [calcTenureMonths, setCalcTenureMonths] = useState<number>(36);

  const calculatedApr = calculateAllInApr(calcRate, calcAmount, calcFeePercent, calcTenureMonths);
  const baseFee = calcAmount * (calcFeePercent / 100);
  const gst = baseFee * 0.18;
  const totalUpfrontFee = baseFee + gst;
  const feeDrag = (calculatedApr - calcRate).toFixed(2);

  const lenderBenchmarks = [
    { lender: 'State Bank of India (SBI)', product: 'Xpress Credit (Salaried Prime)', nominalRate: '10.30% – 12.50%', processingFee: '0.50% (Max ₹5k)', type: 'PSU Bank' },
    { lender: 'HDFC Bank', product: 'Prime Corporate Personal Loan', nominalRate: '10.50% – 13.75%', processingFee: '1.00% – 1.50%', type: 'Private Bank' },
    { lender: 'ICICI Bank', product: 'Commercial Loan Against Property (LAP)', nominalRate: '9.25% – 10.75%', processingFee: '0.75% – 1.00%', type: 'Private Bank' },
    { lender: 'Bank of Baroda', product: 'Baroda Mortgage (Secured)', nominalRate: '9.15% – 10.50%', processingFee: '0.50%', type: 'PSU Bank' },
    { lender: 'Bajaj Finserv', product: 'Unsecured Business Loan', nominalRate: '17.00% – 22.00%', processingFee: '2.00% – 3.00%', type: 'NBFC' },
    { lender: 'Muthoot Finance', product: 'Gold Loan (75% LTV)', nominalRate: '9.90% – 14.50%', processingFee: '0.25% – 0.50%', type: 'NBFC (Secured)' },
    { lender: 'Instant Fintech Apps (KreditBee/Navi)', product: 'Short-Term Personal Loan', nominalRate: '24.00% – 36.00%', processingFee: '3.00% – 5.00%', type: 'App Lender' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn select-none">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300">
            Market Intelligence Radar
          </span>
          <span className="text-xs font-mono text-neutral-400">Live 2026 RBI Policy Benchmark</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Current Indian Lending Benchmarks & APR Radar
        </h2>
        <p className="text-xs sm:text-sm text-neutral-400 font-light mt-1 max-w-2xl">
          Anchor your branch negotiations against the RBI Repo Rate (6.50%) and unmask hidden fee drag using Key Fact Statement standards.
        </p>
      </div>

      {/* Interactive All-In APR Simulator Card */}
      <div className="p-6 sm:p-8 rounded-[2.5rem] bg-[#140F18]/95 border border-white/10 shadow-2xl backdrop-blur-xl space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-white text-lg">
                RBI KFS All-In APR Calculator
              </h3>
              <p className="text-xs text-neutral-400 font-light">
                Calculate the real effective annual percentage rate including upfront fees and 18% GST.
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>Repo Benchmark: 6.50%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-4 text-xs">
            {/* Amount Slider */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
              <div className="flex justify-between font-semibold text-white">
                <span>Sanction Loan Amount</span>
                <span className="font-mono text-cyan-300 font-bold">₹{(calcAmount / 100000).toFixed(1)} Lakhs</span>
              </div>
              <input
                type="range"
                min="100000"
                max="2500000"
                step="50000"
                value={calcAmount}
                onChange={(e) => setCalcAmount(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-2 bg-neutral-800 rounded-lg"
              />
            </div>

            {/* Nominal Rate Slider */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
              <div className="flex justify-between font-semibold text-white">
                <span>Quoted Nominal Interest Rate</span>
                <span className="font-mono text-cyan-300 font-bold">{calcRate.toFixed(2)}% p.a.</span>
              </div>
              <input
                type="range"
                min="8.5"
                max="24.0"
                step="0.25"
                value={calcRate}
                onChange={(e) => setCalcRate(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer h-2 bg-neutral-800 rounded-lg"
              />
            </div>

            {/* Fee Percentage Slider */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
              <div className="flex justify-between font-semibold text-white">
                <span>Processing Fee Deducted Upfront</span>
                <span className="font-mono text-amber-300 font-bold">{calcFeePercent.toFixed(2)}% + GST</span>
              </div>
              <input
                type="range"
                min="0.25"
                max="4.0"
                step="0.25"
                value={calcFeePercent}
                onChange={(e) => setCalcFeePercent(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer h-2 bg-neutral-800 rounded-lg"
              />
            </div>
          </div>

          {/* Results Card (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl bg-black/40 border border-white/10 p-6 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-1">
                Real True Borrowing Cost
              </span>
              <div className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
                {calculatedApr.toFixed(2)}% <span className="text-lg font-sans font-normal text-neutral-400">APR</span>
              </div>
              <div className="mt-2 text-xs font-mono text-amber-300 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Hidden Fee Drag: +{feeDrag}% higher than quoted rate</span>
              </div>
            </div>

            <div className="space-y-2 border-t border-white/10 pt-4 text-xs font-mono text-neutral-300">
              <div className="flex justify-between">
                <span>Base Processing Fee:</span>
                <span className="text-white">₹{baseFee.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>18% Mandatory GST:</span>
                <span className="text-white">₹{gst.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between font-bold border-t border-white/5 pt-1.5 text-amber-300">
                <span>Total Cash Deducted at Source:</span>
                <span>₹{totalUpfrontFee.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lender Benchmarks Table */}
      <div className="p-6 sm:p-8 rounded-[2.5rem] bg-[#140F18]/95 border border-white/10 shadow-2xl backdrop-blur-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-semibold text-white text-lg">
            2026 Card Rates Across Major Institutional Lenders
          </h3>
          <span className="text-xs text-neutral-400 font-mono">Retail Card Rates</span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-black/40 border-b border-white/10 text-neutral-400 uppercase text-[10px]">
              <tr>
                <th className="p-3.5">Lender Institution</th>
                <th className="p-3.5">Product Category</th>
                <th className="p-3.5">Nominal Rate Band</th>
                <th className="p-3.5">Processing Fee</th>
                <th className="p-3.5">Institutional Tier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 bg-white/[0.01]">
              {lenderBenchmarks.map((b, i) => (
                <tr key={i} className="hover:bg-white/[0.03] transition-colors">
                  <td className="p-3.5 font-medium text-white">{b.lender}</td>
                  <td className="p-3.5 text-neutral-300">{b.product}</td>
                  <td className="p-3.5 font-bold text-amber-300">{b.nominalRate}</td>
                  <td className="p-3.5 text-neutral-400">{b.processingFee}</td>
                  <td className="p-3.5">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                      b.type.includes('PSU') ? 'bg-emerald-500/20 text-emerald-300' :
                      b.type.includes('Private') ? 'bg-cyan-500/20 text-cyan-300' :
                      b.type.includes('NBFC') ? 'bg-amber-500/20 text-amber-300' :
                      'bg-rose-500/20 text-rose-300'
                    }`}>
                      {b.type}
                    </span>
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

export default MarketRadar;
