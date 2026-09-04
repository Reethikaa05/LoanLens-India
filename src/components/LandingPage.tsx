import React from 'react';
import { ArrowRight, ShieldCheck, Scale, AlertOctagon, TrendingDown, Percent, Sparkles, CheckCircle2, ChevronRight, Lock, EyeOff, UserCheck } from 'lucide-react';
import { PRESET_PROFILES } from '../engine/scenarios';
import { BorrowerProfile } from '../engine/types';

interface LandingPageProps {
  onStartAssessment: () => void;
  onSelectProfile: (profile: BorrowerProfile) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStartAssessment,
  onSelectProfile
}) => {
  return (
    <div className="min-h-screen bg-[#FBF9FA] dark:bg-[#17121A] text-[#221A20] dark:text-[#EEE6EA] transition-colors">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 border-b border-[#E2D9DE] dark:border-[#33293A]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#EFE3EA]/40 to-transparent dark:from-[#2A1F2C]/40 pointer-events-none" />
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE3EA] dark:bg-[#2A1F2C] border border-[#DFC2D5] dark:border-[#4B2440] text-xs font-semibold text-[#4B2440] dark:text-[#CFA5C1] mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Open Retail Credit Intelligence · 2026</span>
          </div>

          <h1 className="font-display font-medium text-4xl sm:text-6xl lg:text-7xl leading-[1.08] tracking-tight mb-6 max-w-4xl mx-auto">
            Every lender has an algorithm to decide what you get. <br />
            <em className="italic text-[#4B2440] dark:text-[#CFA5C1]">Now you have a Copilot.</em>
          </h1>

          <p className="font-display text-xl sm:text-2xl text-[#6E6069] dark:text-[#A99DA5] max-w-3xl mx-auto mb-10 leading-relaxed font-light">
            An Indian borrower walks in blind and pays four points over fair. 
            Borrower Copilot is the <strong className="font-semibold text-[#221A20] dark:text-[#EEE6EA]">first self-assessment engine</strong> that answers four critical questions before you ever step foot in a branch.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={onStartAssessment}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#4B2440] text-[#FBF9FA] dark:bg-[#CFA5C1] dark:text-[#17121A] font-semibold text-base shadow-lg hover:shadow-xl hover:opacity-95 transition-all flex items-center justify-center gap-2 group"
            >
              <span>Start Free Self-Assessment</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#three-borrowers"
              className="w-full sm:w-auto px-6 py-4 rounded-xl border border-[#E2D9DE] dark:border-[#33293A] bg-white dark:bg-neutral-800 text-sm font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-750 transition-colors flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4 text-[#4B2440] dark:text-[#CFA5C1]" />
              <span>Explore Priya, Ravi & Anita Cases</span>
            </a>
          </div>

          {/* Key Stat Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-[#E2D9DE] dark:border-[#33293A] shadow-sm">
              <span className="font-mono text-2xl font-bold text-[#4B2440] dark:text-[#CFA5C1]">0</span>
              <p className="text-xs text-[#6E6069] dark:text-[#A99DA5] mt-1 font-medium">Bureau Pulls & Zero Personal Data Stored</p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-[#E2D9DE] dark:border-[#33293A] shadow-sm">
              <span className="font-mono text-2xl font-bold text-[#4B2440] dark:text-[#CFA5C1]">6.50%</span>
              <p className="text-xs text-[#6E6069] dark:text-[#A99DA5] mt-1 font-medium">RBI Repo Anchor Reference System</p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-[#E2D9DE] dark:border-[#33293A] shadow-sm">
              <span className="font-mono text-2xl font-bold text-[#4B2440] dark:text-[#CFA5C1]">3 - 8%</span>
              <p className="text-xs text-[#6E6069] dark:text-[#A99DA5] mt-1 font-medium">Interest Saved by Collateral Routing</p>
            </div>
            <div className="p-4 rounded-xl bg-white dark:bg-neutral-900 border border-[#E2D9DE] dark:border-[#33293A] shadow-sm">
              <span className="font-mono text-2xl font-bold text-[#4B2440] dark:text-[#CFA5C1]">1 Card</span>
              <p className="text-xs text-[#6E6069] dark:text-[#A99DA5] mt-1 font-medium">Pocket Negotiation Battle Card for Branch</p>
            </div>
          </div>
        </div>
      </section>

      {/* The 4 Outputs Explained */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#4B2440] dark:text-[#CFA5C1] mb-2">
            The Core Framework
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight">
            Four outputs every Indian borrower deserves to see
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* O1 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-[#E2D9DE] dark:border-[#33293A] shadow-sm hover:border-[#4B2440]/50 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#EFE3EA] dark:bg-[#2A1F2C] text-[#4B2440] dark:text-[#CFA5C1]">
                Output O1
              </span>
              <AlertOctagon className="w-5 h-5 text-[#8A4B12] dark:text-[#E0A265]" />
            </div>
            <h3 className="font-display text-xl font-semibold mb-2">
              Borrow / Don't Borrow / Borrow Less
            </h3>
            <p className="text-sm text-[#6E6069] dark:text-[#A99DA5] leading-relaxed mb-4">
              "Don't borrow" is a legitimate and often life-saving outcome. We evaluate purpose, predatory app debt, and living cushions. If you are taking ₹8 Lakhs for a wedding or 30%+ app debt, we say stop or downsize.
            </p>
            <div className="text-xs font-mono text-neutral-500 bg-neutral-50 dark:bg-neutral-800 p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700">
              Verdict includes single-sentence rationale + exact downsized ceiling.
            </div>
          </div>

          {/* O2 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-[#E2D9DE] dark:border-[#33293A] shadow-sm hover:border-[#4B2440]/50 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#EFE3EA] dark:bg-[#2A1F2C] text-[#4B2440] dark:text-[#CFA5C1]">
                Output O2
              </span>
              <Scale className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="font-display text-xl font-semibold mb-2">
              Lender Sanction vs Safe Carry
            </h3>
            <p className="text-sm text-[#6E6069] dark:text-[#A99DA5] leading-relaxed mb-4">
              A bank FOIR model ignores rent, school fees, and medical cushions. We display two separate numbers: what the lender will happily sanction, and what you can safely carry without starving your savings.
            </p>
            <div className="text-xs font-mono text-neutral-500 bg-neutral-50 dark:bg-neutral-800 p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700">
              Clear visual delta showing which number to respect and why.
            </div>
          </div>

          {/* O3 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-[#E2D9DE] dark:border-[#33293A] shadow-sm hover:border-[#4B2440]/50 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#EFE3EA] dark:bg-[#2A1F2C] text-[#4B2440] dark:text-[#CFA5C1]">
                Output O3
              </span>
              <Percent className="w-5 h-5 text-[#4B2440] dark:text-[#CFA5C1]" />
            </div>
            <h3 className="font-display text-xl font-semibold mb-2">
              Fair Rate Band & True All-In APR
            </h3>
            <p className="text-sm text-[#6E6069] dark:text-[#A99DA5] leading-relaxed mb-4">
              Never accept a point quote. We compute the fair interest band based on Repo + risk spread, and calculate RBI-compliant All-In APR by unmasking 2% processing fees and 18% GST.
            </p>
            <div className="text-xs font-mono text-neutral-500 bg-neutral-50 dark:bg-neutral-800 p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700">
              Confidence widens honestly when score is unknown (never assumed 300).
            </div>
          </div>

          {/* O4 */}
          <div className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-[#E2D9DE] dark:border-[#33293A] shadow-sm hover:border-[#4B2440]/50 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#EFE3EA] dark:bg-[#2A1F2C] text-[#4B2440] dark:text-[#CFA5C1]">
                Output O4
              </span>
              <TrendingDown className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="font-display text-xl font-semibold mb-2">
              Monthly EMI Ceiling & 3 Stress Tests
            </h3>
            <p className="text-sm text-[#6E6069] dark:text-[#A99DA5] leading-relaxed mb-4">
              Your maximum safe monthly outflow. Includes interactive tenure trade-offs (12 to 84 months) and three realistic stress tests: a 20% income slump, a 200 bps floating rate hike, or an emergency health shock.
            </p>
            <div className="text-xs font-mono text-neutral-500 bg-neutral-50 dark:bg-neutral-800 p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700">
              Instant feedback: Does your monthly cashflow survive the shock?
            </div>
          </div>
        </div>
      </section>

      {/* Comparison: Bank Model vs Copilot */}
      <section className="py-16 bg-[#F3EEF1] dark:bg-[#1F1822] border-y border-[#E2D9DE] dark:border-[#33293A]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-medium tracking-tight">
              What the Lender Shows You vs What Copilot Reveals
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-[#E2D9DE] dark:border-[#33293A]">
              <thead>
                <tr className="border-b border-[#E2D9DE] dark:border-[#33293A] bg-neutral-50 dark:bg-neutral-800/60 font-mono text-xs uppercase tracking-wider text-[#6E6069] dark:text-[#A99DA5]">
                  <th className="p-4">Dimension</th>
                  <th className="p-4 text-red-700 dark:text-red-400">Lender Underwriting Model</th>
                  <th className="p-4 text-[#4B2440] dark:text-[#CFA5C1]">Borrower Copilot</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2D9DE] dark:divide-[#33293A]">
                <tr>
                  <td className="p-4 font-semibold">Affordability</td>
                  <td className="p-4 text-neutral-600 dark:text-neutral-400">Aggressive 60% gross FOIR; pushes maximum debt principal for fees.</td>
                  <td className="p-4 font-medium text-emerald-700 dark:text-emerald-400">Free cash flow carry after living expenses, rent & 20% safety cushion.</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">Interest Rate</td>
                  <td className="p-4 text-neutral-600 dark:text-neutral-400">Fixed point quote (e.g. "15% flat rack rate"), hiding upfront fees.</td>
                  <td className="p-4 font-medium text-emerald-700 dark:text-emerald-400">Fair Repo-indexed band [Min%, Max%] + true RBI-compliant All-In APR.</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">Collateral & Routing</td>
                  <td className="p-4 text-neutral-600 dark:text-neutral-400">Pushes 18-22% unsecured business loans for higher salesperson commissions.</td>
                  <td className="p-4 font-medium text-emerald-700 dark:text-emerald-400">Redirects unencumbered property to 9.5% LAP, saving ₹3.5L+ in interest.</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">Unknown Credit Score</td>
                  <td className="p-4 text-neutral-600 dark:text-neutral-400">Assumes subprime or defaults to highest rack rate.</td>
                  <td className="p-4 font-medium text-emerald-700 dark:text-emerald-400">Widens band honestly, preserves dignity, and explains how to tighten.</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold">In Branch</td>
                  <td className="p-4 text-neutral-600 dark:text-neutral-400">Borrower is helpless against fast-talking loan agents.</td>
                  <td className="p-4 font-medium text-emerald-700 dark:text-emerald-400">Hands the borrower a 1-page Negotiation Card with exact verbal scripts.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Three Borrowers Section */}
      <section id="three-borrowers" className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#4B2440] dark:text-[#CFA5C1] mb-2">
            The Canonical Personas
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight">
            Tested on three real Indian realities
          </h2>
          <p className="text-[#6E6069] dark:text-[#A99DA5] text-sm mt-3">
            Click any borrower to load their profile, examine question answers, and view their personalized Negotiation Card.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRESET_PROFILES.map((p) => {
            const profile = p.profile;
            return (
              <div
                key={p.id}
                className="rounded-2xl bg-white dark:bg-neutral-900 border border-[#E2D9DE] dark:border-[#33293A] p-6 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#6E6069] dark:text-[#A99DA5]">
                      {profile.city} · {profile.employmentType.replace('_', ' ')}
                    </span>
                    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-[#EFE3EA] dark:bg-[#2A1F2C] text-[#4B2440] dark:text-[#CFA5C1]">
                      Age {profile.age}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-semibold mb-1">{profile.name}</h3>
                  <p className="text-xs text-[#6E6069] dark:text-[#A99DA5] mb-4">{profile.occupation}</p>
                  
                  <div className="space-y-2 text-xs py-3 border-y border-[#E2D9DE] dark:border-[#33293A] mb-4">
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Net Monthly Inflow:</span>
                      <span className="font-mono font-medium">₹{profile.netMonthlyIncome.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Existing Debt/EMIs:</span>
                      <span className="font-mono font-medium">{profile.existingMonthlyEmis > 0 ? `₹${profile.existingMonthlyEmis.toLocaleString('en-IN')}/mo` : 'None'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Credit Score:</span>
                      <span className="font-mono font-medium">{profile.creditScoreBand.replace('_', ' ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Requested Loan:</span>
                      <span className="font-mono font-semibold text-[#4B2440] dark:text-[#CFA5C1]">₹{(profile.requestedAmount / 100000).toFixed(1)} Lakhs</span>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-600 dark:text-neutral-300 italic mb-4">
                    Purpose: {profile.loanPurpose.replace('_', ' ')}
                  </p>
                </div>

                <button
                  onClick={() => onSelectProfile(profile)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#EFE3EA] dark:bg-[#2A1F2C] text-[#4B2440] dark:text-[#CFA5C1] font-semibold text-xs hover:bg-[#4B2440] hover:text-white dark:hover:bg-[#CFA5C1] dark:hover:text-black transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Evaluate {profile.name}'s Case</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Security & Privacy Commitment */}
      <section className="py-12 bg-white dark:bg-neutral-900 border-t border-[#E2D9DE] dark:border-[#33293A]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex p-3 rounded-2xl bg-[#EFE3EA] dark:bg-[#2A1F2C] text-[#4B2440] dark:text-[#CFA5C1] mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="font-display text-2xl font-semibold mb-2">
            Zero Bureau Pulls. 100% Client-Side Privacy.
          </h3>
          <p className="text-sm text-[#6E6069] dark:text-[#A99DA5] max-w-2xl mx-auto">
            Unlike lead-generation portals that sell your phone number to 20 spamming DSA call centers, Borrower Copilot performs 100% of calculations in your local browser memory. No bureau credit score inquiry is logged, and nothing touches a remote database.
          </p>
        </div>
      </section>
    </div>
  );
};
