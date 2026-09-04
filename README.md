# Borrower Copilot 🧭
### *The Anti-Lender Self-Assessment Engine for Indian Retail Borrowers*

[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-teal.svg)](https://tailwindcss.com/)
[![RBI KFS Compliant](https://img.shields.io/badge/RBI_KFS-April_2024_Standard-success.svg)](#)
[![Benchmark](https://img.shields.io/badge/Benchmark-RBI_Repo_6.50%25-blue.svg)](#)
[![Privacy](https://img.shields.io/badge/Privacy-100%25_In--Browser_Memory-brightgreen.svg)](#)
[![Domain Tests](https://img.shields.io/badge/Domain_Tests-100%25_Passing-success.svg)](#)

---

## 📌 Executive Summary

Every commercial bank and NBFC in India operates a proprietary algorithmic credit engine designed to maximize lender yield and fee origination. Borrowers typically walk into bank branches blind, take the first sanction letter offered, and discover years later that they paid **400 basis points over fair** while stretched to **65% of their net income**.

**Borrower Copilot** flips this asymmetric dynamic. It acts as an **independent counter-underwriting platform** that arms Indian citizens with institutional-grade financial intelligence before they ever speak with a loan officer.

- **Zero Bureau Pulls:** Zero hard inquiries that damage your credit score.
- **Zero Data Retention:** 100% computed in local browser memory; no backend database, no lead sales to DSA telecallers.
- **RBI Aligned:** Integrates Master Directions on External Benchmark Lending Rates (EBLR), Key Fact Statements (KFS April 2024), and Microfinance Affordability Norms.

---

## ⚡ Quickstart (Under 30 Seconds)

```bash
# 1. Clone the repository
git clone https://github.com/your-org/borrower-copilot.git
cd borrower-copilot

# 2. Install dependencies
npm install

# 3. Launch local development platform
npm run dev
```

Visit **`http://localhost:3000`** in your browser.

To execute the automated mathematical domain test suite:
```bash
npm test
```

To build for production:
```bash
npm run build
```

---

## 🏛️ Comprehensive System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                                CLIENT PRESENTATION LAYER                                    │
│  [ Newsreader Serif / Source Sans / IBM Plex Mono ]  •  [ Dark / Light Mode ]  •  [ Mobile ] │
├─────────────────────────────────────────────────────────────────────────────────────────────┤
│   Landing Page   │   2-Tier Questionnaire   │   4 Core Outputs   │   Branch Battle Card     │
│   Overview & CTA │   Adaptive Branch Engine │   O1, O2, O3, O4   │   Printable / Scripts    │
└──────────────┬──────────────────────────────┴───────────┬───────────────────────────────────┘
               │                                          │
               ▼                                          ▼
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                                ADAPTIVE QUESTION ROUTER                                     │
│  Tier-1: Must Questions (8 Core) ─────────────► Confidence Meter (Wide / Low Confidence)     │
│  Tier-2: High-Impact Dynamic Branches ────────► Precision Tuning (Narrows Spreads & Bounds) │
│          • ITR vs Cash Haircut                   • Unencumbered Asset Collateral (LAP)      │
│          • Co-Applicant Banking Trail            • 12-Month Bounce History                  │
│          • Productive Asset Cashflow             • Highest Existing Loan Rate (Usury Check) │
└──────────────────────────────────────────────┬──────────────────────────────────────────────┘
                                               │
                                               ▼
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                          ISOLATED DOMAIN MATHEMATICAL ENGINE (src/engine/)                   │
│                                                                                             │
│  ┌──────────────────────────┐  ┌──────────────────────────┐  ┌───────────────────────────┐  │
│  │   BENCHMARK REGISTRY     │  │  DUAL CAPACITY ANALYZER  │  │   RISK PRICING & APR      │  │
│  │ • RBI Policy Repo: 6.50% │  │ • Lender Gross FOIR Max  │  │ • Risk Spread Formula     │  │
│  │ • Commercial LAP: 50% LTV│  │ • Real Free Cashflow     │  │ • 1-2% Processing Fee     │  │
│  │ • Residential: 75% LTV   │  │ • 20% Living Buffer Cap  │  │ • 18% GST Annualized Drag │  │
│  │ • MFI Debt Cap: 50%      │  │ • Discretionary Pruning  │  │ • RBI KFS Effective APR   │  │
│  └──────────────────────────┘  └──────────────────────────┘  └───────────────────────────┘  │
│                                              │                                              │
│                                              ▼                                              │
│  ┌───────────────────────────────────────────────────────────────────────────────────────┐  │
│  │                          3-SCENARIO FINANCIAL STRESS ENGINE                           │  │
│  │  [ Shock 1: -20% Income Slump ]  [ Shock 2: +200 bps Rate Hike ]  [ Shock 3: ₹40k Med ]  │  │
│  └───────────────────────────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────┬──────────────────────────────────────────────┘
                                               │
                                               ▼
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                               FOUR STANDARDIZED CORE OUTPUTS                                │
│                                                                                             │
│   [O1: The Honest Verdict]       [O2: Capacity Numbers]      [O3: Fair Rate & APR]          │
│   • BORROW                       • Lender Sanction (FOIR)    • Fair Band [Min% – Max%]      │
│   • BORROW LESS (Downsized)      • Safe Carry (Use This!)    • Effective All-In APR         │
│   • DONT BORROW (Debt Trap)      • Clear Rupee Delta Gap     • KFS Itemized Fee Summary     │
│                                                                                             │
│   [O4: Monthly EMI Ceiling & Stress Matrix]      [The Branch Negotiation Battle Card]       │
│   • Max Monthly Outflow Ceiling                  • Spoken Word-for-Word Objection Scripts   │
│   • 12m to 84m Tenure Interest Drag Curve        • Product Redirection Alert (LAP Savings)  │
│   • Live Pass/Fail Stress Resilience Status      • Statutory 0% Foreclosure Fee Protection  │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🎯 The Four Core Decisions Answered

### Output O1: The Honest Verdict
*Verdicts: `BORROW` | `BORROW_LESS` | `DONT_BORROW`*
- **"Don't Borrow" is a legitimate and reachable answer:** When an applicant carries high-cost 30%+ instant app loans with recent payment bounces, fresh unsecured debt is an existential trap.
- **Discretionary Borrowing Pruning:** Non-yielding consumption loans (e.g. ₹8 Lakhs for a wedding) are automatically downsized to safe carry thresholds to prevent multi-year balance sheet impairment.
- **Single-Sentence Traceability:** Every verdict provides an immediate, plain-English explanation.

### Output O2: Maximum Amount (Lender Sanction vs. Safe Carry)
Lenders and borrowers optimize for completely opposing outcomes:
- **Lender Sanction (Aggressive FOIR):** Uses gross income heuristics (50–60%) to maximize fee origination and principal size.
- **Borrower Safe Carry (Recommended):** Net Inflow minus Actual Rent/Living Expenses minus an untouchable **20% emergency survival cushion** minus existing EMIs.
- The platform explicitly tags **Safe Carry** with the badge: **`USE THIS NUMBER`**, explaining that lenders will not pay your rent or fund your medical emergencies.

### Output O3: Fair Interest Rate & All-In APR
- **External Benchmark Anchoring:** Every rate is calculated as `RBI Repo (6.50%) + Profile Risk Spread`.
- **Honest All-In APR Disclosure (RBI KFS Standard):** Lenders advertise 11% nominal rates while deducting ₹15,000 upfront in processing fees + 18% GST. The Copilot unmasks this by annualizing total upfront costs into a true effective APR.
- **Honesty on Unknowns:** When a user does not know their credit score, the engine **never assumes 300 (subprime)**. Instead, it widens the fair band (+150 to +250 bps) and explicitly explains why the band is wide.

### Output O4: Monthly EMI Ceiling & 3 Stress Tests
- **Monthly Outflow Ceiling:** The maximum monthly payment the household can commit without breaching living buffers.
- **Interactive 12m – 84m Tenure Matrix:** Real-time visibility into total interest paid versus principal.
- **Three Financial Shocks Tested Live:**
  1. *Income Shock:* Household income drops by 20% due to business contraction or bonus loss.
  2. *Floating Rate Spike:* RBI raises Repo by 200 bps, pushing floating interest higher.
  3. *Emergency Shock:* Unforeseen ₹40,000 medical emergency cash outlay.

---

## 🛡️ The Branch Negotiation Battle Card

A high-contrast, printable, mobile-optimized screen designed to be held up directly in front of a branch loan officer:
- **Fair Rate Demand Banner:** Highlighting the target band and APR ceiling.
- **Product Redirection Alert:** Pushing self-employed business owners with real estate away from 19% unsecured MSME debt into 9.5% Loan Against Property (saving ₹3L–₹8L in interest).
- **Conversational Scripts:** Word-for-word spoken responses with legal and regulatory citations:
  - *If loan manager says:* `"14% is our fixed corporate rack rate this month."`
  - *You respond:* `"My CIBIL is 780 and I work with a Category-A MNC with 5 years stable vintage. Top tier banks offer 10.75% for 780+ scores. Match 11.25% or I will proceed with my pre-approved offer."`
- **Statutory Rights Table:** 0% prepayment penalties on floating loans (RBI Circular DBOD.Dir.BC.107/13.03.00/2013-14) and prohibition of mandatory insurance bundling.

---

## 👥 Three Canonical Case Studies

| Persona | Profile Summary | Key Dilemma | Copilot Intervention & Outcome |
| :--- | :--- | :--- | :--- |
| **Priya** *(29, Bengaluru)* | Salaried MNC Software Engineer, Net ₹1,10,000/mo, 780 CIBIL, ₹14k car EMI, ₹28k rent. | Wants ₹8,00,000 personal loan for wedding. | Bank sanctions ₹20.3L on FOIR. Copilot fires **`BORROW_LESS`**, capping loan at **₹4.95 Lakhs** to prevent 4-year discretionary drag. Arms her with **10.50% – 11.75%** rate card. |
| **Ravi** *(42, Mysuru)* | Kirana Store Owner for 14 years, Cash ₹40k–80k, ITR ₹4.2L, No credit score, owns **₹45L unencumbered shop**. | Wants ₹15,00,000 for stock & delivery vehicle. | NBFCs quote 19.5% unsecured. Copilot issues **`PRODUCT REDIRECTION ALERT`** to commercial LAP at **9.25% – 11.25%** with schoolteacher wife as co-applicant. **Saves ₹8,40,000 in interest!** |
| **Anita** *(35, Hubballi)* | Delivery Rider & Home Tailor, ₹28,000/mo, 2 children, unemployed husband, **₹35k in 30%+ app debt with 1 bounce**. | Wants ₹1,50,000 for EV scooter to double runs. | Personal loan from app leads to debt trap. Copilot issues **`DONT_BORROW`** for unsecured debt. Reroutes EV request to **Mudra Shishu (<11%)** with vehicle hypothecation. |

---

## 🔬 Directory Structure & Modular Engineering

```
borrower-copilot/
├── README.md                   # System documentation & architectural guide
├── RULES.md                    # 19 declarative domain rules, thresholds & justifications
├── THREE_BORROWERS_ANALYSIS.md # Detailed run-throughs and transcripts for Priya, Ravi, Anita
├── WALKTHROUGH.md              # 5-minute presentation script & product roadmap
├── test_domain_cases.mjs       # Automated domain test runner for all personas
├── index.html                  # HTML entry point with Newsreader & IBM Plex Mono fonts
├── vite.config.ts              # Vite configuration with relative base deployment
├── tailwind.config.js          # Custom typography and palette extensions
└── src/
    ├── main.tsx                # Application bootstrap
    ├── App.tsx                 # Root component with navigation & modal controls
    ├── index.css               # Print stylesheets & design tokens
    ├── engine/                 # 100% Decoupled Pure Mathematical Core
    │   ├── types.ts            # Complete domain models & calculation interfaces
    │   ├── rules.ts            # Declarative parameter registry & RBI references
    │   ├── calculator.ts       # Pure reducing-balance EMI, APR, and stress functions
    │   └── scenarios.ts        # Canonical profiles (Priya, Ravi, Anita, Custom)
    └── components/             # React 18 UI Modules
        ├── Navbar.tsx          # Scenario switcher & dark/light theme controls
        ├── LandingPage.tsx     # Public consumer overview & comparison table
        ├── QuestionFlow.tsx    # 2-Tier adaptive questionnaire & confidence meter
        ├── OutputsDashboard.tsx# Core outputs O1–O4 with interactive tenure matrix
        ├── NegotiationCard.tsx # Printable branch battle card with spoken scripts
        ├── MarketRadar.tsx     # Live lending benchmarks & RBI KFS APR simulator
        ├── RuleSandbox.tsx     # Live parameter inspector for interviewer testing
        ├── PersonaDossier.tsx  # Interactive deep-dive case viewer
        ├── HiringTeamHub.tsx   # Embedded deliverables and rubric reader
        └── AuthModal.tsx       # 1-Click persona quick-auth & guest bypass
```

---

## 📜 Regulatory Standards & Circular References

- **RBI Repo Benchmark (EBLR):** *RBI/2019-20/54 DBR.DIR.BC.No.14/13.03.00/2019-20*
- **Key Fact Statement (KFS) & All-In APR Mandate:** *RBI/2024-25/18 DOR.STR.REC.13/13.03.00/2024-25 (Effective April 2024)*
- **Ban on Foreclosure / Prepayment Charges:** *RBI Circular DBOD.Dir.BC.107/13.03.00/2013-14 & RBI/2019-20/38*
- **Regulatory Framework for Microfinance Loans:** *RBI/2021-22/185 DOR.FIN.REC.95/03.10.038/2021-22 (Cap on household debt obligations at 50%)*
- **Digital Lending Guidelines:** *RBI/2022-23/111 DOR.CRE.REC.66/21.07.001/2022-23*

---

## 📄 License

Distributed under the **MIT License**. Free and open for public educational and borrower self-assessment use.
