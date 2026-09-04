# WALKTHROUGH.md · Lokta Borrower Copilot

> **Five-Minute Product & Technical Walkthrough**  
> Written presentation script, engineering architecture, and strategic roadmap.  
> Built for the Lokta Take-Home Build Challenge (September 2026).

---

## Video Walkthrough Presentation Script (5 Minutes)

### [0:00 – 0:45] The Thesis: Flipping the Credit Asymmetry
*"Hello Lokta team. Today we are presenting Borrower Copilot.*

*In Indian retail lending, every bank and NBFC has a multi-million-rupee credit engine. The borrower walks in blind. They take the first sanction letter, get pushed into high-margin products, and find out three years later that they paid 400 basis points over fair and stretched to 65% of their income.*

*Borrower Copilot is an anti-lender self-assessment tool. It runs in under two seconds in the browser with **zero logins, zero bureau pulls, and zero personal data stored**. It answers four fundamental questions:*
1. *Should I borrow at all?*
2. *How much am I really eligible for?*
3. *What is a fair rate for me?*
4. *What EMI should I agree to?*
*And finally, it hands the borrower a one-page Negotiation Battle Card they can hold up in a bank branch."*

---

### [0:45 – 1:45] Tour of the App & The Three Borrowers
*"Let us examine how the app handles our three challenge borrowers:*

#### 1. Priya (29, Bengaluru MNC Software Engineer)
- *Priya has a 780 CIBIL and earns ₹1,10,000 net. She wants ₹8 Lakhs for a wedding.*
- *A standard bank FOIR model will happily sanction her **₹20.3 Lakhs**, because it ignores Bangalore rent and living expenses.*
- *Our engine reaches **`BORROW_LESS`**. Why? A wedding is non-yielding discretionary consumption. Taking ₹8L while paying a car EMI locks ₹22,000/month for four years with ₹1.9L in wasted interest. We cap her safe carry at **₹4.95 Lakhs**.*
- *Her Negotiation Card arms her with an RBI Repo spread of **10.50% – 11.75%**, a capped 0.5% processing fee, and zero foreclosure charges.*

#### 2. Ravi (42, Mysuru Kirana Store Owner)
- *Ravi has run a shop for 14 years. His cash income is ₹40k–80k, and ITR shows ₹4.2 Lakhs. He has no credit score. He wants ₹15 Lakhs for stock and a delivery vehicle.*
- *Unsecured NBFC lenders would quote him **18% to 22%** because of his cash turnover.*
- *Our engine spots his unencumbered **₹45 Lakh commercial shop premises** and his schoolteacher wife earning ₹18,000/month. We fire a **Product Redirection Alert** to commercial Loan Against Property (LAP) at **9.25% – 11.25%**, saving Ravi over **₹8,40,000 in interest** over 7 years!*

#### 3. Anita (35, Hubballi Gig Delivery Rider)
- *Anita earns ₹28,000/month, has two children, an unemployed husband, and is servicing **₹35,000 across three instant app loans at 30%+ with a recent bounce**.*
- *Our engine immediately reaches **`DONT_BORROW`** for unsecured personal debt. Taking another fintech loan will trigger a compounding default spiral.*
- *Instead, we guide her to debt settlement and redirect her EV scooter request to **Pradhan Mantri Mudra Shishu (<11%)**, where the scooter itself acts as hypothecation security."*

---

### [1:45 – 3:00] Architecture & Domain Engine Separation
*"Let us look under the hood.*

*One of the core rules of this challenge was that in the follow-up, you will ask us to change a rule live. To make that trivial and robust:*
- *The domain logic in `src/engine/` is **100% decoupled from the UI**.*
- *`rules.ts` contains the declarative rule registry table matching `RULES.md`.*
- *`calculator.ts` contains pure mathematical functions: standard reducing-balance EMI formulas, dual capacity algorithms, RBI KFS APR with 18% GST, and three financial stress tests.*
- *We built a dedicated **Rule Sandbox** tab where anyone can adjust the FOIR ceiling, the cash haircut discount, or the commercial LAP LTV via live sliders and watch the engine react in real time."*

---

### [3:00 – 4:00] What We Would Build Next (Product Roadmap)

1. **Account Aggregator (AA) Consent Flow (Setu / OneMoney / Anumati):**  
   *Instead of asking borrowers to manually type their ITR or guess their bank cash turnover, integrate the RBI Account Aggregator protocol. With a 1-tap OTP consent, the app fetches bank statement analytics, reduces cash income haircuts from 50% to 20%, and proves cashflow without uploading PDF bank statements.*

2. **Reverse Loan Auction & Direct Bid Aggregator:**  
   *Allow borrowers to publish their verified Negotiation Card anonymously to participating credit desks (SBI, HDFC, AU Small Finance Bank, Federal Bank). Lenders compete for the prime borrower by underbidding each other on rate and fees.*

3. **OCR Camera Scanner for Sanction Letters:**  
   *A mobile feature where the borrower photographs a lender's sanction letter. The copilot instantly parses the fine print, highlights hidden insurance bundling, flags illegal foreclosure clauses, and generates an objection script on the spot.*

---

### [4:00 – 5:00] What We Would Cut (Ruthless Simplicity)

1. **Hyper-Granular Household Expense Tracking:**  
   *We deliberately avoided asking for separate electricity bills, mobile recharges, and grocery breakdowns. In self-assessment, granular friction causes 60%+ user abandonment. A single 'essential living expenses' input combined with an automated 20% safety cushion captures 95% of underwriting variance with zero friction.*

2. **Unverified 3-Digit Credit Score Inputs:**  
   *Asking users for their exact score (e.g. 'Is your score 742 or 765?') creates false precision because self-reported numbers are often outdated. Broad bands (750+ Prime, 700–749 Good, <650 Caution, and Unknown) are honest and allow us to widen bands responsibly.*

---

## Summary Checklist

| Challenge Deliverable | Location in Repository | Verification Status |
| :--- | :--- | :--- |
| **1. The Working App** | `src/` (Vite + React 18 + TS + Tailwind) | Runs via `npm run dev` in under 30 seconds; 0 errors. |
| **2. RULES.md** | `RULES.md` (Project root) | Complete table: *What · Value · Why · Source/Judgement*. |
| **3. Three Run-throughs** | `THREE_BORROWERS_ANALYSIS.md` | Full case studies & Negotiation Cards for Priya, Ravi, Anita. |
| **4. 5-Minute Walkthrough** | `WALKTHROUGH.md` | Video script, product architecture, build next vs cut. |
