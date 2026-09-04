import React, { useState } from 'react';
import { TrendingUp, Percent, Calculator, ArrowUpRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { calculateAllInApr } from '../engine/calculator';

export const MarketRadar: React.FC = () => {
  // APR Calculator State
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
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#EFE3EA] dark:bg-[#2A1F2C] text-[#4B2440] dark:text-[#CFA5C1]">
            Market Intelligence Radar
          </span>
          <span className="text-xs font-mono text-neutral-500">Updated for 2026</span>
        </div>
        <h2 className="font-display text-3xl font-medium tracking-tight">
          Current Indian Lending Benchmarks & APR Radar
        </h2>
        <p className="text-sm text-[#6E6069] dark:text-[#A99DA5] mt-1">
          Anchor your branch negotiations against the RBI Repo Rate (6.50%) and real retail card rates.
        </p>
      </div>

      {/* Interactive All-In APR Simulator */}
      <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-neutral-900 border border-[#E2D9DE] dark:border-[#33293A] shadow-xs">
        <div className="flex items-center gap-2 mb-4">
          <Calculator className="w-5 h-5 text-[#4B2440] dark:text-[#CFA5C1]" />
          <h3 className="font-display font-semibold text-xl">
            RBI KFS All-In APR Calculator
          </h3>
        </div>
        <p className="text-xs text-[#6E6069] dark:text-[#A99DA5] mb-6">
          Lenders advertise a low nominal rate like "11%" but subtract ₹15,000 upfront in processing fees + 18% GST. See how upfront fees drag your real cost higher:
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls */}
          <div className="lg:col-span-2 space-y-4 text-xs">
            <div>
              <div className="flex justify-between mb-1 font-medium">
                <span>Loan Amount:</span>
                <span className="font-mono font-bold">₹{calcAmount.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min="50000"
                max="2500000"
                step="25000"
                value={calcAmount}
                onChange={(e) => setCalcAmount(Number(e.target.value))}
                className="w-full accent-[#4B2440] dark:accent-[#CFA5C1]"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1 font-medium">
                <span>Quoted Nominal Interest Rate:</span>
                <span className="font-mono font-bold">{calcRate}% p.a.</span>
              </div>
              <input
                type="range"
                min="8.5"
                max="36"
                step="0.25"
                value={calcRate}
                onChange={(e) => setCalcRate(Number(e.target.value))}
                className="w-full accent-[#4B2440] dark:accent-[#CFA5C1]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Processing Fee (%):</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={calcFeePercent}
                  onChange={(e) => setCalcFeePercent(Number(e.target.value))}
                  className="w-full p-2 rounded-lg border border-[#E2D9DE] dark:border-[#33293A] bg-white dark:bg-neutral-800 font-mono text-xs"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Tenure (Months):</label>
                <select
                  value={calcTenureMonths}
                  onChange={(e) => setCalcTenureMonths(Number(e.target.value))}
                  className="w-full p-2 rounded-lg border border-[#E2D9DE] dark:border-[#33293A] bg-white dark:bg-neutral-800 font-mono text-xs"
                >
                  <option value={12}>12 Months (1 Year)</option>
                  <option value={24}>24 Months (2 Years)</option>
                  <option value={36}>36 Months (3 Years)</option>
                  <option value={48}>48 Months (4 Years)</option>
                  <option value={60}>60 Months (5 Years)</option>
                  <option value={84}>84 Months (7 Years)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Card */}
          <div className="p-5 rounded-xl bg-[#EFE3EA]/50 dark:bg-[#2A1F2C]/50 border border-[#DFC2D5] dark:border-[#4B2440] flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase font-semibold text-[#4B2440] dark:text-[#CFA5C1] block mb-1">
                True Effective Cost
              </span>
              <div className="font-display text-4xl font-bold text-[#4B2440] dark:text-[#CFA5C1] mb-1">
                {calculatedApr}%
              </div>
              <span className="text-[11px] font-mono text-neutral-600 dark:text-neutral-400">
                True All-In APR
              </span>
            </div>

            <div className="space-y-1.5 text-xs border-t border-neutral-300 dark:border-neutral-700 pt-3 mt-4 font-mono">
              <div className="flex justify-between">
                <span>Fee + 18% GST:</span>
                <span className="font-bold">₹{Math.round(totalUpfrontFee).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Annual Fee Drag:</span>
                <span className="text-amber-700 dark:text-amber-400 font-bold">+{feeDrag}% p.a.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lender Rate Benchmarks Table */}
      <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-neutral-900 border border-[#E2D9DE] dark:border-[#33293A] shadow-xs">
        <h3 className="font-display font-semibold text-xl mb-4">
          Card Rates by Major Indian Lenders
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 font-mono text-[10px] uppercase text-neutral-600 dark:text-neutral-400">
                <th className="p-3">Lender</th>
                <th className="p-3">Product Category</th>
                <th className="p-3">Nominal Rate Band</th>
                <th className="p-3">Processing Fee Standard</th>
                <th className="p-3">Class</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {lenderBenchmarks.map((b, idx) => (
                <tr key={idx} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-800/40">
                  <td className="p-3 font-semibold">{b.lender}</td>
                  <td className="p-3 text-neutral-600 dark:text-neutral-300">{b.product}</td>
                  <td className="p-3 font-mono font-bold text-[#4B2440] dark:text-[#CFA5C1]">{b.nominalRate}</td>
                  <td className="p-3 font-mono">{b.processingFee}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800">
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
