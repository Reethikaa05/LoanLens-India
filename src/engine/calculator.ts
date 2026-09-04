import {
  BorrowerProfile,
  CopilotResult,
  VerdictOutput,
  AmountOutput,
  InterestRateOutput,
  EmiOutput,
  TenureOption,
  NegotiationCardOutput,
  StressScenarioResult,
  NegotiationScript,
  NegotiationFeeCap
} from './types';
import { FINANCIAL_CONSTANTS } from './rules';

// Standard Financial Mathematics: Calculate monthly EMI given principal, annual rate, and months
export function calculateEmi(principal: number, annualRatePercent: number, tenureMonths: number): number {
  if (principal <= 0 || tenureMonths <= 0) return 0;
  if (annualRatePercent <= 0) return Math.round(principal / tenureMonths);
  const monthlyRate = annualRatePercent / (12 * 100);
  const factor = Math.pow(1 + monthlyRate, tenureMonths);
  const emi = (principal * monthlyRate * factor) / (factor - 1);
  return Math.round(emi);
}

// Calculate maximum principal that a given monthly EMI can support
export function calculatePrincipalFromEmi(monthlyEmi: number, annualRatePercent: number, tenureMonths: number): number {
  if (monthlyEmi <= 0 || tenureMonths <= 0) return 0;
  if (annualRatePercent <= 0) return Math.round(monthlyEmi * tenureMonths);
  const monthlyRate = annualRatePercent / (12 * 100);
  const factor = Math.pow(1 + monthlyRate, tenureMonths);
  const principal = (monthlyEmi * (factor - 1)) / (monthlyRate * factor);
  return Math.round(principal);
}

// Calculate true APR including processing fee and 18% GST as mandated by RBI KFS guidelines
export function calculateAllInApr(nominalRatePercent: number, loanAmount: number, processingFeePercent: number, tenureMonths: number): number {
  if (loanAmount <= 0) return nominalRatePercent;
  const feeBase = loanAmount * (processingFeePercent / 100);
  const gst = feeBase * (FINANCIAL_CONSTANTS.GST_RATE_PERCENT / 100);
  const totalUpfrontFee = feeBase + gst;
  const annualFeeDragPercent = (totalUpfrontFee / loanAmount) * (12 / tenureMonths) * 100;
  return Number((nominalRatePercent + annualFeeDragPercent).toFixed(2));
}

export function evaluateCopilot(profile: BorrowerProfile): CopilotResult {
  const repo = FINANCIAL_CONSTANTS.CURRENT_REPO_RATE;

  // 1. Calculate Recognised Income for Lender vs Borrower Real Cashflow
  let lenderRecognisedMonthlyIncome = 0;
  if (profile.employmentType === 'SALARIED_MNC') {
    lenderRecognisedMonthlyIncome = profile.netMonthlyIncome + (profile.hasCoApplicant ? profile.coApplicantIncome : 0);
  } else if (profile.employmentType === 'SALARIED_SMALL') {
    lenderRecognisedMonthlyIncome = (profile.netMonthlyIncome * 0.9) + (profile.hasCoApplicant ? profile.coApplicantIncome : 0);
  } else if (profile.employmentType === 'SELF_EMPLOYED_BUSINESS') {
    const itrMonthly = profile.itrAnnualIncome > 0 ? profile.itrAnnualIncome / 12 : 0;
    const cashPortion = Math.max(0, profile.netMonthlyIncome - itrMonthly);
    // 100% recognition on ITR + 50% haircut on cash income
    lenderRecognisedMonthlyIncome = itrMonthly + (cashPortion * 0.5) + (profile.hasCoApplicant ? profile.coApplicantIncome : 0);
  } else {
    // Informal / Gig: Formal banks apply 40-50% discount due to lack of payslips/ITR
    lenderRecognisedMonthlyIncome = (profile.netMonthlyIncome * 0.55);
  }

  // 2. Lender FOIR Ceiling calculation
  let foirPercent = 50;
  const totalHouseholdInflow = profile.netMonthlyIncome + (profile.hasCoApplicant ? profile.coApplicantIncome : 0);
  if (totalHouseholdInflow < 35000) {
    foirPercent = 40;
  } else if (totalHouseholdInflow > 75000) {
    foirPercent = 60;
  }
  const maxLenderMonthlyEmi = Math.max(0, Math.round((lenderRecognisedMonthlyIncome * (foirPercent / 100)) - profile.existingMonthlyEmis));

  // 3. Borrower Safe Cashflow calculation (Real survival math)
  // Real Inflow - Real Living Expenses - 20% Emergency Cushion - Existing EMIs
  const safetyBuffer = Math.round(totalHouseholdInflow * 0.20);
  const nonDebtOutflows = profile.monthlyEssentialExpenses + safetyBuffer;
  let safeFreeMonthlyCashflow = Math.max(0, totalHouseholdInflow - nonDebtOutflows - profile.existingMonthlyEmis);

  // If loan is for productive asset (e.g. vehicle/delivery), add 60% of expected return
  if (profile.expectedMonthlyReturnFromLoan > 0) {
    safeFreeMonthlyCashflow += Math.round(profile.expectedMonthlyReturnFromLoan * 0.60);
  }

  // 4. Determine Fair Interest Rates & Confidence Bands
  let baseSpreadMin = 4.0;
  let baseSpreadMax = 5.25;
  const confidenceWidenedReasons: string[] = [];
  let confidenceScore = 85;

  // Rate adjustments based on collateral
  const isSecuredCandidate = profile.collateralType !== 'NONE' && profile.collateralValue >= (profile.requestedAmount * 1.5);
  if (isSecuredCandidate) {
    baseSpreadMin = 2.75;
    baseSpreadMax = 3.75;
  } else if (profile.employmentType === 'SALARIED_MNC' && profile.creditScoreBand === 'EXCELLENT_750_PLUS') {
    baseSpreadMin = 4.0;
    baseSpreadMax = 5.25;
  } else if (profile.employmentType === 'SELF_EMPLOYED_BUSINESS') {
    // Unsecured business loan
    baseSpreadMin = 8.5;
    baseSpreadMax = 12.0;
  } else if (profile.employmentType === 'INFORMAL_GIG') {
    baseSpreadMin = 14.0;
    baseSpreadMax = 20.0;
  }

  // Credit score effect on rate
  if (profile.creditScoreBand === 'UNKNOWN') {
    // Rule: Unknown is never zero! Widen band and explain consequence
    baseSpreadMax += isSecuredCandidate ? 1.0 : 2.0;
    confidenceScore -= 20;
    confidenceWidenedReasons.push('Credit score is unknown. Banks price at default upper risk tier until official CIBIL pull.');
  } else if (profile.creditScoreBand === 'LOW_UNDER_650') {
    baseSpreadMin += 4.0;
    baseSpreadMax += 6.0;
  } else if (profile.creditScoreBand === 'GOOD_700_749') {
    baseSpreadMin += 0.75;
    baseSpreadMax += 1.25;
  }

  // Bounce history effect
  if (profile.hasRecentBounce) {
    baseSpreadMin += 2.5;
    baseSpreadMax += 3.5;
    confidenceWidenedReasons.push('Past 12m EMI bounce triggers automatic subprime risk surcharge from lenders.');
  }

  if (profile.emergencyFundMonths <= 1) {
    confidenceScore -= 10;
    confidenceWidenedReasons.push('Emergency reserve is under 1 month; vulnerability to shock increases pricing risk.');
  }

  const fairRateMin = Number((repo + baseSpreadMin).toFixed(2));
  const fairRateMax = Number((repo + baseSpreadMax).toFixed(2));
  const processingFeePercent = isSecuredCandidate ? 0.75 : 1.5;
  const processingFeeGstAmount = Math.round(profile.requestedAmount * (processingFeePercent / 100) * 1.18);
  
  const allInAprMin = calculateAllInApr(fairRateMin, profile.requestedAmount, processingFeePercent, profile.requestedTenureMonths);
  const allInAprMax = calculateAllInApr(fairRateMax, profile.requestedAmount, processingFeePercent, profile.requestedTenureMonths);

  let confidence: 'HIGH' | 'MEDIUM' | 'LOW' = 'HIGH';
  if (confidenceScore < 60) confidence = 'LOW';
  else if (confidenceScore < 80) confidence = 'MEDIUM';

  // 5. Output 2: Maximum Amount (Lender Sanction vs Safe Carry)
  const tenure = profile.requestedTenureMonths || 36;
  let lenderSanctionMax = calculatePrincipalFromEmi(maxLenderMonthlyEmi, fairRateMin, tenure);

  // If secured property exists, check LTV ceiling
  if (profile.collateralType === 'COMMERCIAL_PROPERTY') {
    const ltvMax = Math.round(profile.collateralValue * 0.50); // 50% commercial LTV
    lenderSanctionMax = Math.max(lenderSanctionMax, Math.min(ltvMax, calculatePrincipalFromEmi(Math.max(maxLenderMonthlyEmi, 25000) * 1.2, fairRateMin, 84)));
  }

  let borrowerSafeCarryMax = calculatePrincipalFromEmi(safeFreeMonthlyCashflow, fairRateMax, tenure);

  // Discretionary consumption haircut (e.g. Priya's wedding loan)
  if (profile.loanPurpose === 'WEDDING_DISCRETIONARY') {
    const maxDiscretionary = Math.round(profile.netMonthlyIncome * 4.5);
    if (borrowerSafeCarryMax > maxDiscretionary) {
      borrowerSafeCarryMax = maxDiscretionary;
    }
  }

  const deltaAmount = Math.abs(lenderSanctionMax - borrowerSafeCarryMax);
  const safeEmiCeiling = safeFreeMonthlyCashflow;

  // 6. Output 1: Verdict Logic
  let verdictStatus: 'BORROW' | 'BORROW_LESS' | 'DONT_BORROW' = 'BORROW';
  let verdictHeadline = 'Proceed to Borrow Under Fair Terms';
  let oneLineReason = 'Your income surplus comfortably covers the EMI while preserving living cushion and emergency reserves.';
  const detailedAnalysis: string[] = [];
  const actionableSteps: string[] = [];
  let recommendedProduct = 'Standard Bank Term Loan';
  let safeDownsizedAmount: number | undefined = undefined;

  // Case A: High risk predatory app debt or deficit (Anita's archetype)
  if (profile.highestExistingLoanRate >= 28 || (profile.hasRecentBounce && profile.existingMonthlyEmis > (profile.netMonthlyIncome * 0.35))) {
    verdictStatus = 'DONT_BORROW';
    verdictHeadline = 'Do Not Take Another Unsecured Loan';
    oneLineReason = 'You are already carrying high-cost 30%+ app debt with a recent bounce. A fresh personal loan will trigger a compounding debt trap.';
    detailedAnalysis.push('Three app loans totaling ₹35,000 at 30%+ interest are draining monthly cashflow.');
    detailedAnalysis.push('Recent EMI bounce signals bank underwriting rejection for prime personal loans.');
    detailedAnalysis.push('With household breadwinner support temporarily impaired, fresh debt without structured asset protection is critical risk.');
    recommendedProduct = 'Mudra Shishu EV Loan or Priority Sector Micro-Enterprise Scheme';
    actionableSteps.push('Immediately seek debt consolidation or one-time settlement on the 30%+ predatory app loans.');
    actionableSteps.push('Do NOT apply for standard personal loans; apply specifically for EV 2-Wheeler asset financing under Mudra Shishu (<11%).');
    actionableSteps.push('Leverage direct platform subsidy / manufacturer buyback ties where vehicle acts as primary security.');
  }
  // Case B: Discretionary over-borrowing (Priya's archetype)
  else if (profile.loanPurpose === 'WEDDING_DISCRETIONARY' && profile.requestedAmount > borrowerSafeCarryMax) {
    verdictStatus = 'BORROW_LESS';
    verdictHeadline = 'Borrow Less: Cap at Safe Discretionary Limit';
    oneLineReason = `Requested ₹${(profile.requestedAmount / 100000).toFixed(1)}L exceeds safe discretionary carry (₹${(borrowerSafeCarryMax / 100000).toFixed(1)}L) while servicing your existing car EMI.`;
    safeDownsizedAmount = borrowerSafeCarryMax;
    detailedAnalysis.push(`Lenders will sanction up to ₹${(lenderSanctionMax / 100000).toFixed(1)}L based on pure FOIR, ignoring your ₹28k rent and lifestyle commitments.`);
    detailedAnalysis.push('Weddings are non-yielding consumption: taking ₹8L at 11%+ locks ₹22,000/month for 48 months with ₹1.9L wasted interest.');
    detailedAnalysis.push(`Downsizing to ₹${(borrowerSafeCarryMax / 100000).toFixed(1)}L keeps total debt service under 35% of net income and preserves savings.`);
    recommendedProduct = 'Pruned Personal Loan / Partial Family Contribution';
    actionableSteps.push(`Limit wedding loan application strictly to ₹${(borrowerSafeCarryMax / 100000).toFixed(1)} Lakhs.`);
    actionableSteps.push('Leverage excellent 780 CIBIL to negotiate flat 10.75% rate and 0.5% processing fee.');
    actionableSteps.push('Ensure loan has zero foreclosure penalty so you can prepay early using annual bonus.');
  }
  // Case C: Self-Employed unencumbered property reroute (Ravi's archetype)
  else if (profile.employmentType === 'SELF_EMPLOYED_BUSINESS' && profile.collateralType === 'COMMERCIAL_PROPERTY' && profile.collateralValue > profile.requestedAmount) {
    verdictStatus = 'BORROW';
    verdictHeadline = 'Borrow via Secured LAP, NOT Unsecured Business Loan';
    oneLineReason = 'You qualify for prime secured terms by pledging your unencumbered ₹45L shop premises, cutting interest cost nearly in half.';
    detailedAnalysis.push('Kirana cash income (₹40k-80k) with ₹4.2L ITR faces punitive 18-22% rates on unsecured business loans.');
    detailedAnalysis.push('Your unencumbered ₹45 Lakh commercial premises qualifies for Loan Against Property (LAP) at 9.25% - 10.25%.');
    detailedAnalysis.push('Co-applicant spouse income (₹18,000 teacher salary) provides verified bank salary trail to anchor sanction.');
    recommendedProduct = 'Loan Against Property (SME Micro-LAP) with Spouse Co-applicant';
    actionableSteps.push('Refuse high-cost unsecured MSME proposals (18-22%) and demand commercial LAP from PSU/Private banks.');
    actionableSteps.push('Submit 14-year electricity bills, property tax receipts, and wife\'s salary slips as primary document pack.');
    actionableSteps.push('Opt for 7-year tenure to keep monthly EMI comfortably under ₹26,000.');
  }
  else if (profile.requestedAmount > borrowerSafeCarryMax) {
    verdictStatus = 'BORROW_LESS';
    verdictHeadline = 'Borrow Less to Maintain Safety Margin';
    oneLineReason = `Your safe ceiling is ₹${(borrowerSafeCarryMax / 100000).toFixed(1)}L. Asking for ₹${(profile.requestedAmount / 100000).toFixed(1)}L leaves you dangerously exposed to unexpected expenses.`;
    safeDownsizedAmount = borrowerSafeCarryMax;
    recommendedProduct = 'Right-Sized Bank Loan';
    actionableSteps.push(`Adjust loan target to ₹${(borrowerSafeCarryMax / 100000).toFixed(1)} Lakhs.`);
  }

  // 7. Output 4: Tenure Matrix & Stress Testing
  const tenureDurations = [12, 24, 36, 48, 60, 84];
  const targetPrincipal = safeDownsizedAmount || profile.requestedAmount;
  const tenureMatrix: TenureOption[] = tenureDurations.map((m) => {
    const emiVal = calculateEmi(targetPrincipal, fairRateMin, m);
    const totalRepay = emiVal * m;
    const totalInt = totalRepay - targetPrincipal;
    return {
      months: m,
      years: Number((m / 12).toFixed(1)),
      monthlyEmi: emiVal,
      totalInterest: totalInt,
      totalRepayment: totalRepay,
      interestToPrincipalRatio: Number((totalInt / targetPrincipal).toFixed(2)),
      isSafeCeiling: emiVal <= safeEmiCeiling
    };
  });

  const selectedEmi = calculateEmi(targetPrincipal, fairRateMin, tenure);

  // Stress Tests
  // 1. Income Shock (-20%)
  const shockedIncome = totalHouseholdInflow * 0.80;
  const postShockSurplus = shockedIncome - profile.monthlyEssentialExpenses - profile.existingMonthlyEmis - selectedEmi;
  const incomeShock: StressScenarioResult = {
    title: 'Income Shock (-20%)',
    condition: 'Household income drops by 20% due to business slump or variable pay loss',
    impactMonthlyCashflow: Math.round(totalHouseholdInflow * 0.20),
    postShockSurplus: Math.round(postShockSurplus),
    isSurviving: postShockSurplus >= 0,
    riskNote: postShockSurplus >= 0
      ? `Survives with ₹${Math.round(postShockSurplus).toLocaleString('en-IN')}/mo buffer remaining.`
      : `Deficit of -₹${Math.abs(Math.round(postShockSurplus)).toLocaleString('en-IN')}/mo! Default imminent without emergency reserves.`
  };

  // 2. Rate Shock (+200 bps floating spike)
  const shockedRate = fairRateMin + 2.0;
  const shockedEmi = calculateEmi(targetPrincipal, shockedRate, tenure);
  const rateShockEmiDelta = shockedEmi - selectedEmi;
  const rateShockSurplus = safeFreeMonthlyCashflow - shockedEmi;
  const rateShock: StressScenarioResult = {
    title: 'Rate Hike (+200 bps)',
    condition: 'RBI raises repo rate, pushing floating interest up by 2.00%',
    impactMonthlyCashflow: rateShockEmiDelta,
    postShockSurplus: Math.round(rateShockSurplus),
    isSurviving: rateShockSurplus >= 0,
    riskNote: rateShockSurplus >= 0
      ? `Monthly EMI rises by +₹${rateShockEmiDelta.toLocaleString('en-IN')}, still safely inside living buffer.`
      : `EMI increase wipes out remaining cash cushion.`
  };

  // 3. Emergency Medical Shock
  const oneOffEmergency = 40000;
  const emergencySurplus = (profile.emergencyFundMonths * profile.monthlyEssentialExpenses) - oneOffEmergency;
  const emergencyShock: StressScenarioResult = {
    title: 'Emergency Expense Shock (₹40,000)',
    condition: 'Sudden hospitalisation or vehicle repair requiring immediate cash outlay',
    impactMonthlyCashflow: oneOffEmergency,
    postShockSurplus: Math.round(emergencySurplus),
    isSurviving: emergencySurplus >= 0,
    riskNote: emergencySurplus >= 0
      ? `Emergency savings cover the shock with ₹${Math.round(emergencySurplus).toLocaleString('en-IN')} remaining.`
      : `Emergency fund exhausted. Borrower would be forced into high-cost informal debt.`
  };

  // 8. The Negotiation Card Details
  const negotiationScripts: NegotiationScript[] = [];
  const feeCaps: NegotiationFeeCap[] = [
    { item: 'Processing Fee', fairCeiling: '0.50% - 1.00% (Cap at ₹3,000 - ₹5,000 max)', regulatorySource: 'Fair Practice Code - Non-subsidized operational limit' },
    { item: 'Foreclosure / Prepayment Penalty', fairCeiling: '0% (Completely Zero)', regulatorySource: 'RBI Circular DBOD.Dir.BC.107/13.03.00/2013-14' },
    { item: 'Credit Life Insurance Bundling', fairCeiling: 'Optional / Strictly Voluntary', regulatorySource: 'IRDAI & RBI Guidelines: Mandatory bundling is illegal' },
    { item: 'Documentation / Stamp Duty Charges', fairCeiling: 'Actual State Stamp Paper cost (₹300 - ₹1,000)', regulatorySource: 'State Stamp Act' }
  ];

  if (profile.employmentType === 'SALARIED_MNC' && profile.creditScoreBand === 'EXCELLENT_750_PLUS') {
    negotiationScripts.push({
      situation: 'Lender quotes standard rack rate of 13.5% - 15.0%',
      lenderSays: '"14% is the fixed corporate rate for this product category this month."',
      youSay: `"My CIBIL is 780 and I work with a Category-A MNC with 5 years stable vintage. Top tier banks like SBI and HDFC offer 10.75% for 780+ scores. Match 11.25% or I will proceed with my pre-approved bank."`,
      regulatoryOrMarketBasis: 'Prime borrower credit premium arbitrage'
    });
    negotiationScripts.push({
      situation: 'Bank attempts to deduct 2.5% processing fee and bundle loan insurance',
      lenderSays: '"Processing fee is 2.5% plus GST, and loan protection insurance of ₹22,000 is mandatory."',
      youSay: `"RBI rules forbid mandatory third-party insurance bundling. Please waive the insurance. Furthermore, cap the processing fee at 0.5% (₹4,000) as per prime festival discount norms."`,
      regulatoryOrMarketBasis: 'RBI Master Direction on Fair Practices Code & IRDAI Guidelines'
    });
  } else if (profile.employmentType === 'SELF_EMPLOYED_BUSINESS') {
    negotiationScripts.push({
      situation: 'Lender pushes 18% - 22% unsecured business loan due to cash income',
      lenderSays: '"Your ITR shows only ₹4.2 Lakhs so you only qualify for an NBFC unsecured business loan at 19%."',
      youSay: `"I am not asking for an unsecured loan. I have an unencumbered ₹45 Lakh commercial property in Mysuru with 14 years clear title. Route my file through your SME LAP desk at 9.75% with my wife as co-applicant."`,
      regulatoryOrMarketBasis: 'Collateral substitution from unsecured MSME to mortgage-backed LAP'
    });
  } else {
    negotiationScripts.push({
      situation: 'Fintech app quotes 32% annual interest disguised as 2.5% monthly flat rate',
      lenderSays: '"It is just 2.5% nominal per month, very fast sanction."',
      youSay: `"2.5% flat monthly equates to an annualized APR of over 34%, which violates reasonable microfinance lending caps. Provide the RBI-mandated Key Fact Statement (KFS) detailing the total cost of credit."`,
      regulatoryOrMarketBasis: 'RBI Digital Lending Guidelines (2022) Key Fact Statement (KFS) Requirement'
    });
  }

  const keyStrengths: string[] = [];
  if (profile.creditScoreBand === 'EXCELLENT_750_PLUS') keyStrengths.push('780+ Tier-1 Credit Score (Top 10% credit decile)');
  if (profile.employmentType === 'SALARIED_MNC') keyStrengths.push('Tier-A Corporate employer with continuous 5y job vintage');
  if (profile.collateralValue > 0) keyStrengths.push(`Unencumbered collateral valued at ₹${(profile.collateralValue / 100000).toFixed(1)} Lakhs`);
  if (profile.hasCoApplicant) keyStrengths.push(`Spouse co-applicant adding ₹${profile.coApplicantIncome.toLocaleString('en-IN')}/mo stability`);
  if (keyStrengths.length === 0) keyStrengths.push('Steady monthly operating cashflow in essential local trade');

  let productRedirection: { warning: string; action: string; projectedSavingsRupees: number } | undefined = undefined;
  if (profile.employmentType === 'SELF_EMPLOYED_BUSINESS' && isSecuredCandidate) {
    productRedirection = {
      warning: 'Lenders will attempt to push an Unsecured Business Loan at 18-20% because of high commission margins.',
      action: 'Demand Loan Against Property (LAP) against the shop premises at 9.25% - 10.25%.',
      projectedSavingsRupees: Math.round(profile.requestedAmount * 0.08 * (profile.requestedTenureMonths / 12))
    };
  } else if (profile.loanPurpose === 'WEDDING_DISCRETIONARY' && profile.requestedAmount > borrowerSafeCarryMax) {
    productRedirection = {
      warning: 'Taking ₹8L personal loan for wedding creates severe multi-year financial drag.',
      action: `Cap loan at ₹${(borrowerSafeCarryMax / 100000).toFixed(1)}L and finance remainder via pre-existing wedding savings.`,
      projectedSavingsRupees: Math.round((profile.requestedAmount - borrowerSafeCarryMax) * 0.11 * (profile.requestedTenureMonths / 12))
    };
  }

  const negotiationCard: NegotiationCardOutput = {
    borrowerName: profile.name,
    borrowerHeadline: `${profile.occupation} · ${profile.city}`,
    targetRateMin: fairRateMin,
    targetRateMax: fairRateMax,
    maxFairApr: allInAprMax,
    productRedirectionAlert: productRedirection,
    keyProfileStrengths: keyStrengths,
    negotiationScripts,
    statutoryFeeCaps: feeCaps
  };

  const unansweredImpactQuestions: string[] = [];
  if (profile.creditScoreBand === 'UNKNOWN') unansweredImpactQuestions.push('Credit Score (Exact CIBIL number)');
  if (profile.collateralType === 'NONE' && profile.requestedAmount > 500000) unansweredImpactQuestions.push('Pledgeable Collateral (Property or Gold)');
  if (!profile.hasCoApplicant && profile.requestedAmount > 500000) unansweredImpactQuestions.push('Earning Co-Applicant (Spouse / Family)');

  return {
    profile,
    verdict: {
      status: verdictStatus,
      headline: verdictHeadline,
      oneLineReason,
      detailedAnalysis,
      safeDownsizedAmount,
      recommendedProduct,
      actionableSteps
    },
    amount: {
      lenderSanctionMax,
      borrowerSafeCarryMax,
      recommendedAmount: borrowerSafeCarryMax,
      preferredMetric: 'SAFE_CARRY',
      oneSentenceWhy: `Lender will sanction up to ₹${(lenderSanctionMax / 100000).toFixed(1)}L using aggressive FOIR, but your safe limit is ₹${(borrowerSafeCarryMax / 100000).toFixed(1)}L to protect your rent and living buffer.`,
      deltaAmount,
      foirPercentUsed: foirPercent,
      safeFreeMonthlyCashflow
    },
    rate: {
      fairRateMin,
      fairRateMax,
      allInAprMin,
      allInAprMax,
      benchmarkSpread: `Repo (${repo}%) + ${baseSpreadMin}% to ${baseSpreadMax}%`,
      processingFeePercent,
      processingFeeGstAmount,
      confidence,
      confidenceScore,
      confidenceWidenedReasons,
      rateVerdictVsOffer: profile.existingLenderOfferRate
        ? (profile.existingLenderOfferRate > fairRateMax
            ? `Lender quote of ${profile.existingLenderOfferRate}% is ${(profile.existingLenderOfferRate - fairRateMax).toFixed(1)}% above fair ceiling.`
            : `Lender quote of ${profile.existingLenderOfferRate}% is within fair range.`)
        : undefined
    },
    emi: {
      safeEmiCeiling,
      lenderEmiMaxAllowed: maxLenderMonthlyEmi,
      oneSentenceCeilingWhy: `Do not agree to an EMI above ₹${safeEmiCeiling.toLocaleString('en-IN')}/month to guarantee survival against a 20% income shock.`,
      selectedTenureMonths: tenure,
      recommendedEmi: selectedEmi,
      tenureMatrix,
      stressTests: {
        incomeShock,
        rateShock,
        emergencyShock
      }
    },
    negotiationCard,
    confidenceScore,
    unansweredImpactQuestions
  };
}

