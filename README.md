# Lokta · Borrower Copilot 🧭

> **The Anti-Lender Self-Assessment Engine for Indian Borrowers.**  
> Built for the Lokta Take-Home Build Challenge (September 2026).

---

## ⚡ Quickstart (Runs in under 2 minutes)

```bash
# 1. Clone or navigate to the repository directory
cd borrower-copilot

# 2. Install dependencies (React, Vite, Tailwind CSS, Lucide)
npm install

# 3. Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.  
No backend required, no database required, no API keys needed. Everything runs client-side with zero data retention.

To run the automated domain invariant test suite:
```bash
node test_domain_cases.mjs
```

To build for production:
```bash
npm run build
```

---

## 📖 The Four Deliverables

| Deliverable | File Location | Description |
| :--- | :--- | :--- |
| **1. The Working App** | `src/` | Full-stack web application with Landing Page, Auth/Switcher, 2-Tier Adaptive Questionnaire, 4 Core Outputs, and printable Branch Negotiation Card. |
| **2. RULES.md** | [`RULES.md`](./RULES.md) | Complete table of every rule, threshold, band, and domain rationale (*What · Value · Why · Source / Judgement*). |
| **3. Three Run-Throughs** | [`THREE_BORROWERS_ANALYSIS.md`](./THREE_BORROWERS_ANALYSIS.md) | Comprehensive case studies for **Priya**, **Ravi**, and **Anita**: questions asked, outputs generated, and branch cards. |
| **4. Five-Minute Walkthrough** | [`WALKTHROUGH.md`](./WALKTHROUGH.md) | Presentation script, product architecture, what we would build next vs what we would cut. |

---

## 🎯 The Four Outputs Answered

1. **O1: Should I borrow at all?**
   - Verdicts: `BORROW`, `BORROW_LESS`, or `DONT_BORROW`.
   - "Don't borrow" is fully reachable and fires for Anita's 30%+ app debt with recent bounce.
2. **O2: Maximum amount (Lender Sanction vs Safe Carry)**
   - Two numbers clearly separated: what the lender will sanction on aggressive FOIR (60%) vs what the borrower can safely carry with living cushions intact.
3. **O3: Fair interest rate & All-In APR**
   - Fair bands anchored to the RBI Repo Rate (6.50%) + risk premia.
   - Computes RBI Key Fact Statement (KFS) compliant All-In APR by factoring in 1-2% processing fees + 18% GST.
4. **O4: Monthly EMI Ceiling & 3 Stress Tests**
   - Monthly ceiling with interactive tenure trade-off matrix (12m to 84m).
   - Three financial shocks: 20% income slump, 200 bps floating rate spike, and ₹40,000 emergency medical expense.
5. **Plus The Negotiation Card**
   - Single high-contrast branch battle card with exact conversational scripts ("What to say when the lender quotes 14%"), product redirection alerts, and statutory fee caps.

---

## 🏛️ Architecture & Clean Domain Separation

```
borrower-copilot/
├── RULES.md                    # Deliverable 2: Every rule & assumption
├── THREE_BORROWERS_ANALYSIS.md # Deliverable 3: Priya, Ravi, Anita deep-dives
├── WALKTHROUGH.md              # Deliverable 4: 5-minute presentation script
├── README.md                   # Setup and usage guide
├── test_domain_cases.mjs       # Automated test runner for domain invariants
└── src/
    ├── engine/                 # 100% Decoupled Pure TypeScript Domain Logic
    │   ├── types.ts            # Domain types (BorrowerProfile, CopilotResult)
    │   ├── rules.ts            # Declarative parameter registry & RBI references
    │   ├── calculator.ts       # Mathematical functions (reducing-balance EMI, APR, stress)
    │   └── scenarios.ts        # Canonical profiles (Priya, Ravi, Anita, Custom)
    ├── components/             # React 18 UI Components
    │   ├── Navbar.tsx          # Nav with quick scenario switcher & theme toggle
    │   ├── LandingPage.tsx     # Public consumer landing page & comparison table
    │   ├── QuestionFlow.tsx    # 2-tier adaptive questionnaire with confidence meter
    │   ├── OutputsDashboard.tsx# The 4 Core Outputs with interactive tenure & stress tests
    │   ├── NegotiationCard.tsx # Printable branch battle card with verbal scripts
    │   ├── MarketRadar.tsx     # Live lending benchmarks & RBI KFS APR simulator
    │   ├── RuleSandbox.tsx     # Live parameter inspector for interview follow-up
    │   ├── PersonaDossier.tsx  # Deep-dive case studies viewer
    │   ├── HiringTeamHub.tsx   # In-app deliverables viewer for Lokta reviewers
    │   └── AuthModal.tsx       # Auth & 1-click persona quick-login modal
    ├── App.tsx
    └── main.tsx
```
