# LoanLens India 🧭
### *The Sovereign Anti-Lender Self-Assessment & Counter-Underwriting Engine for Indian Retail Borrowers*

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

Every commercial bank and NBFC in India operates proprietary algorithmic credit underwriting engines designed to maximize lender gross yield and fee origination. Retail borrowers typically enter bank branches blind, accept the first pre-approved sanction letter offered, and discover years later that they paid **400 basis points over fair** while stretched to **65% of their net household income**.

**LoanLens India** (Borrower Copilot) fundamentally levels this asymmetrical power dynamic. It acts as an **independent counter-underwriting platform** that arms Indian citizens with institutional-grade financial intelligence before they speak with a loan officer.

- **Zero Bureau Pulls:** Zero hard inquiries that damage your CIBIL/Experian score.
- **100% Ephemeral Client-Side Memory:** Zero data retention, zero database leaks, zero lead sales to DSA telecallers.
- **Sovereign RBI Regulatory Enforcement:** Strict integration with RBI Master Directions on External Benchmark Lending Rates (EBLR), Key Fact Statements (KFS April 2024), Fair Practices Code, and Microfinance Affordability Norms.

---

## 🏛️ System Architecture Diagram

### 1. Interactive Flow & Decision Graph (Mermaid)

```mermaid
flowchart TD
    subgraph UI[Client Presentation Layer - React 18 & Tailwind]
        LP[Landing Page & Auth Gate] --> DL[Executive Dashboard Layout]
        DL --> OV[Overview & AI Cashflow Equalizer]
        DL --> CE[Copilot Engine - Adaptive Flow]
        DL --> NC[Official Battle Card with Photo ID]
        DL --> RR[Market Rates Radar - Repo 6.50%]
        DL --> RS[Rule Sandbox - Policy Shocks]
        DL --> BD[3 Borrowers In-Situ Dossier]
    end

    subgraph Router[Adaptive Question Router]
        Q1[Tier-1: 8 Core Financial Inflows] --> CM{Confidence Evaluator}
        CM -- Low Confidence --> Q2[Tier-2: Dynamic Branching]
        Q2 --> |ITR vs Cash| H1[Informal Haircut Matrix]
        Q2 --> |Unencumbered Asset| H2[Collateral LAP Router]
        Q2 --> |Bounce History| H3[NACH Distress Flag]
    end

    subgraph Engine[Deterministic Mathematical Engine - src/engine/]
        BR[RBI Benchmark Registry
Repo 6.50% · SDF 6.25% · MSF 6.75%]
        DCA[Dual Capacity Analyzer
Lender FOIR 50-60% vs Safe Carry Buffer]
        KFS[All-In APR & Fee Drag Terminal
Nominal Rate + Upfront Fee + 18% GST]
        STR[3-Way Stress Tester
-20% Income · +200 bps Hike · ₹40k Emergency]
    end

    subgraph Outputs[The Four Core Decisions]
        O1[O1: Honest Verdict
BORROW / BORROW LESS / DONT BORROW]
        O2[O2: Safe Capacity Gap
Lender Sanction Max vs Borrower Safe Carry]
        O3[O3: Fair Rate & APR Band
Repo Indexed Spread + KFS Cost Ceiling]
        O4[O4: Safe Monthly EMI Outgo
Preserves Inviolable 20% Living Cushion]
    end

    CE --> Router
    Router --> Engine
    Engine --> BR & DCA & KFS & STR
    BR & DCA & KFS & STR --> Outputs
    Outputs --> NC
    Outputs --> DL
```

---

### 2. High-Level Modular Layering (ASCII)

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                                CLIENT PRESENTATION LAYER                                    │
│  [ Instrument Serif / Instrument Sans / IBM Plex Mono ]  •  [ Dark Obsidian ]  •  [ Mobile ]│
├─────────────────────────────────────────────────────────────────────────────────────────────┤
│   Landing Page   │   2-Tier Questionnaire   │   4 Core Outputs   │   Branch Battle Card     │
│   Auth & Routing │   Live Dynamic Sliders   │   O1, O2, O3, O4   │   Verified Avatar & ID   │
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
│  │ • Commercial LAP: 50% LTV│  │ • Real Free Cashflow     │  │ • 0.50% Fair Statutory Cap│  │
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
│   • BORROW                       • Lender Sanction Max       • Fair Rate Band (Min-Max)     │
│   • DONT BORROW                  • Borrower Safe Carry       • Key Fact Statement APR       │
│   • BORROW LESS                  • Safe Borrowing Gap (L)    • Upfront Fee Cap (Statutory)  │
│                                                                                             │
│   [O4: Monthly Cashflow Outgo]   [Tactical Branch Shield]    [Pre-Closing Battle Card]      │
│   • Safe EMI Ceiling             • Word-for-Word Scripts     • Verified Borrower ID         │
│   • 20% Living Floor Cushion     • Product Redirection Alert • Printable PDF Format         │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## ⚡ Quickstart (Under 30 Seconds)

### 1. Clone & Install
```bash
# Clone the repository
git clone https://github.com/Reethikaa05/LoanLens-India.git
cd LoanLens-India

# Install dependencies
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open **`http://localhost:3000`** in your browser to experience the platform.

### 3. Run Automated Domain Invariant Tests
```bash
npm test -- --run
```
Verifies mathematical domain invariants across Priya, Ravi, and Anita test cases.

### 4. Build for Production
```bash
npm run build
```
Produces an optimized, minified bundle in the `dist/` directory.

---

## 🎯 The Four Standardized Core Outputs

| Output Symbol | Metric Name | Definition & Consumer Defense |
| :--- | :--- | :--- |
| **O1** | **The Honest Verdict** | Categorical decision: `BORROW`, `BORROW LESS`, or `DONT BORROW`. Never incentives debt when structural failure is detected. |
| **O2** | **Safe Borrowing Gap** | Direct comparison between **Lender Sanction Max** (calculated on gross FOIR) vs **Borrower Safe Carry** (derived from free cashflow). |
| **O3** | **Fair Pricing & APR Band** | Statutory rate band anchored to the **RBI Repo Rate (6.50%)** plus fair risk spread, disclosing all-in APR with 18% GST and upfront fee drag. |
| **O4** | **Safe Monthly EMI Outgo** | The hard rupee limit on total monthly debt outgo that guarantees an inviolable **20% living buffer** and preserves household liquidity. |

---

## 👥 The Three Canonical Indian Case Archetypes

LoanLens India tests every algorithmic decision against three real-world Indian borrower archetypes:

### 1. Priya (Bengaluru) · Salaried MNC Engineer
- **Profile:** Net income ₹1,10,000/mo, CIBIL 780, existing car EMI ₹14,000, wedding ask ₹8,00,000.
- **The Trap:** Bank pushes **₹20.31 Lakhs** at 14.0% p.a., consuming 51% of her salary for a 1-day wedding.
- **Copilot Action:** Enforces `BORROW LESS`. Restricts discretionary borrowing to **₹4.95 Lakhs** (4x monthly income) and demands prime corporate salaried rates (10.50% - 11.75%).

### 2. Ravi (Mysuru) · 14-Year Kirana Merchant
- **Profile:** Cash-heavy income ₹60,000/mo, zero CIBIL history, ₹15,00,000 ask for inventory & delivery van.
- **The Trap:** NBFC agents push an **Unsecured Business Loan at 19.5%** with ₹53,100 upfront fees to maximize commission.
- **Copilot Action:** Enforces `BORROW`. Detects Ravi's **₹45 Lakh unencumbered commercial shop** and redirects him to **Secured LAP at 9.25% - 10.25%**, saving **₹8,40,000 in interest**.

### 3. Anita (Pune) · Gig Economy Delivery Partner
- **Profile:** Net income ₹32,000/mo, multiple 32-36% instant app loans, 1 recent NACH bounce, ₹1.5L EV scooter ask.
- **The Trap:** Digital fintech apps offer instant credit rollover, creating a compounding debt spiral exceeding 65% of her income.
- **Copilot Action:** Enforces `DONT BORROW`. Triggers hard stop on unsecured personal borrowing. Prescribes debt consolidation and redirects EV financing to **Pradhan Mantri Mudra Yojana (PMMY Shishu)**.

---

## ⚖️ Statutory RBI Regulations Enforced

1. **Mandatory External Benchmark Lending Rate (EBLR):**
   - *Reference:* RBI Circular RBI/2019-20/54.
   - All floating retail and MSME loans must link to an external benchmark (Repo Rate 6.50%). Banks cannot hide rate cuts.
2. **Zero Foreclosure & Prepayment Penalty:**
   - *Reference:* RBI Circular DBOD.No.Dir.BC.107/13.03.00/2011-12 & RBI/2019-20/38.
   - Lenders cannot penalize individual retail borrowers for prepaying or foreclosing floating-rate loans.
3. **Mandatory Standardized Key Fact Statement (KFS):**
   - *Reference:* RBI Notification RBI/2024-25/112 (April 2024).
   - Lenders must provide a 1-page standardized KFS before sanction disclosing the exact all-in APR, recovery agents, and cooling-off period.
4. **Prohibition of Negative Amortization:**
   - *Reference:* RBI Circular DOR.MCS.REC.32/01.01.001/2023-24.
   - Lenders cannot extend tenure upon rate hikes so far that monthly interest exceeds EMI without explicit consent.

---

## 🛠️ Technology Stack

- **Framework:** React 18 with TypeScript
- **Bundler:** Vite 5.4 (sub-second HMR and production minification)
- **Styling:** Tailwind CSS 3.4 with custom dark obsidian palette (`#0E0B12`, `#120D1A`) and typography (`Instrument Serif`, `Newsreader`, `IBM Plex Mono`)
- **Icons:** Lucide React
- **Testing:** Tsx test runner with mathematical domain invariant assertions
- **Privacy:** 100% In-Browser Client-Side Evaluation (zero network telemetry)

---

## 📄 License & Attribution

Distributed under the **MIT License**. Created for the citizens and retail borrowers of India to counter structural financial asymmetry.
