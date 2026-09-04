// Domain Type Definitions for Borrower Copilot
export type EmploymentType = 
  | 'SALARIED_MNC'
  | 'SALARIED_SMALL'
  | 'SELF_EMPLOYED_BUSINESS'
  | 'INFORMAL_GIG';

export type LoanPurpose =
  | 'WEDDING_DISCRETIONARY'
  | 'BUSINESS_GROWTH'
  | 'TWO_WHEELER_ASSET'
  | 'HOME_LAP'
  | 'DEBT_CONSOLIDATION'
  | 'MEDICAL_EMERGENCY';

export type CreditScoreBand =
  | 'EXCELLENT_750_PLUS'
  | 'GOOD_700_749'
  | 'AVERAGE_650_699'
  | 'LOW_UNDER_650'
  | 'UNKNOWN';

export type CollateralType =
  | 'NONE'
  | 'COMMERCIAL_PROPERTY'
  | 'RESIDENTIAL_PROPERTY'
  | 'GOLD'
  | 'FIXED_DEPOSIT';

export interface BorrowerProfile {
  id: string;
  name: string;
  age: number;
  city: string;
  occupation: string;
  employmentType: EmploymentType;
  netMonthlyIncome: number;
  cashSharePercent: number; // 0 to 100
  itrAnnualIncome: number; // 0 if none
  monthlyEssentialExpenses: number; // Rent + food + school + basic utility
  existingMonthlyEmis: number;
  existingLoanCount: number;
  highestExistingLoanRate: number; // e.g. 32% for predatory apps
  hasRecentBounce: boolean; // Bounced EMI in last 12 months
  creditScoreBand: CreditScoreBand;
  requestedAmount: number;
  requestedTenureMonths: number;
  loanPurpose: LoanPurpose;
  collateralType: CollateralType;
  collateralValue: number;
  hasCoApplicant: boolean;
  coApplicantIncome: number;
  emergencyFundMonths: number; // Months of living expenses saved
  expectedMonthlyReturnFromLoan: number; // Additional cashflow from productive asset
  existingLenderOfferRate?: number; // Rate offered by branch (e.g. 14.5%)
}

export type VerdictStatus = 'BORROW' | 'BORROW_LESS' | 'DONT_BORROW';
export type ConfidenceLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export interface VerdictOutput {
  status: VerdictStatus;
  headline: string;
  oneLineReason: string;
  detailedAnalysis: string[];
  safeDownsizedAmount?: number;
  recommendedProduct: string;
  actionableSteps: string[];
}

export interface AmountOutput {
  lenderSanctionMax: number; // Aggressive bank FOIR calculation
  borrowerSafeCarryMax: number; // Real free cashflow safe borrowing
  recommendedAmount: number;
  preferredMetric: 'SAFE_CARRY' | 'LENDER_SANCTION';
  oneSentenceWhy: string;
  deltaAmount: number;
  foirPercentUsed: number;
  safeFreeMonthlyCashflow: number;
}

export interface InterestRateOutput {
  fairRateMin: number;
  fairRateMax: number;
  allInAprMin: number;
  allInAprMax: number;
  benchmarkSpread: string;
  processingFeePercent: number;
  processingFeeGstAmount: number;
  confidence: ConfidenceLevel;
  confidenceScore: number; // 0 to 100%
  confidenceWidenedReasons: string[];
  rateVerdictVsOffer?: string;
}

export interface TenureOption {
  months: number;
  years: number;
  monthlyEmi: number;
  totalInterest: number;
  totalRepayment: number;
  interestToPrincipalRatio: number;
  isSafeCeiling: boolean;
}

export interface StressScenarioResult {
  title: string;
  condition: string;
  impactMonthlyCashflow: number;
  postShockSurplus: number;
  isSurviving: boolean;
  riskNote: string;
}

export interface EmiOutput {
  safeEmiCeiling: number;
  lenderEmiMaxAllowed: number;
  oneSentenceCeilingWhy: string;
  selectedTenureMonths: number;
  recommendedEmi: number;
  tenureMatrix: TenureOption[];
  stressTests: {
    incomeShock: StressScenarioResult;
    rateShock: StressScenarioResult;
    emergencyShock: StressScenarioResult;
  };
}

export interface NegotiationScript {
  situation: string;
  lenderSays: string;
  youSay: string;
  regulatoryOrMarketBasis: string;
}

export interface NegotiationFeeCap {
  item: string;
  fairCeiling: string;
  regulatorySource: string;
}

export interface NegotiationCardOutput {
  borrowerName: string;
  borrowerHeadline: string;
  targetRateMin: number;
  targetRateMax: number;
  maxFairApr: number;
  productRedirectionAlert?: {
    warning: string;
    action: string;
    projectedSavingsRupees: number;
  };
  keyProfileStrengths: string[];
  negotiationScripts: NegotiationScript[];
  statutoryFeeCaps: NegotiationFeeCap[];
}

export interface CopilotResult {
  profile: BorrowerProfile;
  verdict: VerdictOutput;
  amount: AmountOutput;
  rate: InterestRateOutput;
  emi: EmiOutput;
  negotiationCard: NegotiationCardOutput;
  confidenceScore: number;
  unansweredImpactQuestions: string[];
}
