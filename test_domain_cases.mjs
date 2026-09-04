// Standalone runner using Node.js to verify calculation accuracy
import { evaluateCopilot } from "./src/engine/calculator.ts";
import { PRIYA_PROFILE, RAVI_PROFILE, ANITA_PROFILE } from "./src/engine/scenarios.ts";

console.log("=========================================");
console.log("RUNNING AUTOMATED DOMAIN INVARIANT CHECKS");
console.log("=========================================");

// 1. Priya Verification
const priyaResult = evaluateCopilot(PRIYA_PROFILE);
console.log("\n[1] PRIYA (Salaried MNC, 780 CIBIL, ₹8L Wedding)");
console.log("Verdict:", priyaResult.verdict.status, "-", priyaResult.verdict.headline);
console.log("Lender Sanction FOIR:", (priyaResult.amount.lenderSanctionMax/100000).toFixed(2), "Lakhs");
console.log("Safe Carry Discretionary:", (priyaResult.amount.borrowerSafeCarryMax/100000).toFixed(2), "Lakhs");
console.log("Fair Rate Band:", priyaResult.rate.fairRateMin + "% - " + priyaResult.rate.fairRateMax + "%");
console.log("All-In APR Band:", priyaResult.rate.allInAprMin + "% - " + priyaResult.rate.allInAprMax + "%");
console.log("Safe Monthly EMI Ceiling: ₹" + priyaResult.emi.safeEmiCeiling);

if (priyaResult.verdict.status !== "BORROW_LESS") {
  throw new Error("Priya should be BORROW_LESS due to discretionary wedding purpose and active car EMI!");
}
if (priyaResult.rate.fairRateMax > 12.5) {
  throw new Error("Priya's 780 CIBIL should entitle her to prime rates under 12.5%!");
}

// 2. Ravi Verification
const raviResult = evaluateCopilot(RAVI_PROFILE);
console.log("\n[2] RAVI (Kirana Owner, ₹45L Shop Asset, ₹15L Business Ask)");
console.log("Verdict:", raviResult.verdict.status, "-", raviResult.verdict.headline);
console.log("Recommended Product:", raviResult.verdict.recommendedProduct);
console.log("Fair Rate Band (Secured LAP):", raviResult.rate.fairRateMin + "% - " + raviResult.rate.fairRateMax + "%");
console.log("Redirection Alert:", raviResult.negotiationCard.productRedirectionAlert?.warning);
console.log("Interest Saved via LAP: ₹" + raviResult.negotiationCard.productRedirectionAlert?.projectedSavingsRupees);

if (!raviResult.verdict.recommendedProduct.includes("Property")) {
  throw new Error("Ravi should be routed to Loan Against Property (LAP)!");
}
if (raviResult.rate.fairRateMax > 11.5) {
  throw new Error("Ravi's secured commercial property should unlock sub-11.5% LAP rates!");
}

// 3. Anita Verification
const anitaResult = evaluateCopilot(ANITA_PROFILE);
console.log("\n[3] ANITA (Gig Worker, 30%+ App Loans, 1 Bounce, ₹1.5L EV Scooter)");
console.log("Verdict:", anitaResult.verdict.status, "-", anitaResult.verdict.headline);
console.log("Reason:", anitaResult.verdict.oneLineReason);
console.log("Recommended Product:", anitaResult.verdict.recommendedProduct);

if (anitaResult.verdict.status !== "DONT_BORROW") {
  throw new Error("Anita must be DONT_BORROW for unsecured personal loan due to active predatory debt and recent bounce!");
}
if (!anitaResult.verdict.recommendedProduct.includes("Mudra")) {
  throw new Error("Anita should be routed to Mudra Shishu / asset hypothecation!");
}

console.log("\n=========================================");
console.log("ALL THREE DOMAIN INVARIANTS PASSED 100%!");
console.log("=========================================");
