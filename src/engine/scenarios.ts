import { BorrowerProfile } from './types';

export const PRIYA_PROFILE: BorrowerProfile = {
  id: 'priya-bengaluru',
  name: 'Priya',
  age: 29,
  city: 'Bengaluru',
  occupation: 'Software Engineer (Large MNC)',
  employmentType: 'SALARIED_MNC',
  netMonthlyIncome: 110000,
  cashSharePercent: 0,
  itrAnnualIncome: 1450000,
  monthlyEssentialExpenses: 48000, // Rent ₹28,000 + Living ₹20,000
  existingMonthlyEmis: 14000, // Car loan, 2 years left
  existingLoanCount: 1,
  highestExistingLoanRate: 8.75,
  hasRecentBounce: false,
  creditScoreBand: 'EXCELLENT_750_PLUS', // 780 CIBIL
  requestedAmount: 800000,
  requestedTenureMonths: 48,
  loanPurpose: 'WEDDING_DISCRETIONARY',
  collateralType: 'NONE',
  collateralValue: 0,
  hasCoApplicant: false,
  coApplicantIncome: 0,
  emergencyFundMonths: 4,
  expectedMonthlyReturnFromLoan: 0,
  existingLenderOfferRate: 14.0, // Bank quotes 14%
  avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop'
};

export const RAVI_PROFILE: BorrowerProfile = {
  id: 'ravi-mysuru',
  name: 'Ravi',
  age: 42,
  city: 'Mysuru',
  occupation: 'Kirana Store Owner (14 Years Vintage)',
  employmentType: 'SELF_EMPLOYED_BUSINESS',
  netMonthlyIncome: 60000, // Cash income ₹40k - ₹80k midpoint
  cashSharePercent: 55,
  itrAnnualIncome: 420000, // ₹35,000/month ITR declared
  monthlyEssentialExpenses: 32000, // Shop premises owned, family expenses
  existingMonthlyEmis: 0,
  existingLoanCount: 0,
  highestExistingLoanRate: 0,
  hasRecentBounce: false,
  creditScoreBand: 'UNKNOWN', // Never taken formal loan; no credit score
  requestedAmount: 1500000,
  requestedTenureMonths: 84, // 7-year LAP tenure
  loanPurpose: 'BUSINESS_GROWTH', // Second stock line & delivery vehicle
  collateralType: 'COMMERCIAL_PROPERTY',
  collateralValue: 4500000, // Owns shop premises ₹45 Lakh unencumbered
  hasCoApplicant: true,
  coApplicantIncome: 18000, // Wife earns ₹18k teaching
  emergencyFundMonths: 3,
  expectedMonthlyReturnFromLoan: 25000, // Incremental profit from expanded stock & delivery
  existingLenderOfferRate: 19.5, // NBFC quotes 19.5% unsecured business loan
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop'
};

export const ANITA_PROFILE: BorrowerProfile = {
  id: 'anita-hubballi',
  name: 'Anita',
  age: 35,
  city: 'Hubballi',
  occupation: 'Delivery Platform Rider & Home Tailor',
  employmentType: 'INFORMAL_GIG',
  netMonthlyIncome: 28000, // ₹26k - ₹30k/month
  cashSharePercent: 70,
  itrAnnualIncome: 0,
  monthlyEssentialExpenses: 22000, // 2 children, husband unemployed 8 months
  existingMonthlyEmis: 7500, // 3 app loans totaling ₹35,000
  existingLoanCount: 3,
  highestExistingLoanRate: 34.0, // Predatory 30%+ instant apps
  hasRecentBounce: true, // Bounced 1 EMI last month
  creditScoreBand: 'LOW_UNDER_650', // Damaged by bounce & high app utilization
  requestedAmount: 150000,
  requestedTenureMonths: 24,
  loanPurpose: 'TWO_WHEELER_ASSET', // EV Scooter to double delivery runs
  collateralType: 'NONE',
  collateralValue: 0,
  hasCoApplicant: false,
  coApplicantIncome: 0,
  emergencyFundMonths: 0.5,
  expectedMonthlyReturnFromLoan: 15000, // Doubling runs adds ₹15k/month
  existingLenderOfferRate: 32.0, // Instant app loan quote 32%
  avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop'
};

export const DEFAULT_CUSTOM_PROFILE: BorrowerProfile = {
  id: 'custom-borrower',
  name: 'New Borrower',
  age: 32,
  city: 'Hyderabad',
  occupation: 'Salaried Professional',
  employmentType: 'SALARIED_MNC',
  netMonthlyIncome: 75000,
  cashSharePercent: 0,
  itrAnnualIncome: 900000,
  monthlyEssentialExpenses: 35000,
  existingMonthlyEmis: 5000,
  existingLoanCount: 1,
  highestExistingLoanRate: 9.5,
  hasRecentBounce: false,
  creditScoreBand: 'GOOD_700_749',
  requestedAmount: 500000,
  requestedTenureMonths: 36,
  loanPurpose: 'DEBT_CONSOLIDATION',
  collateralType: 'NONE',
  collateralValue: 0,
  hasCoApplicant: false,
  coApplicantIncome: 0,
  emergencyFundMonths: 3,
  expectedMonthlyReturnFromLoan: 0,
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=600&auto=format&fit=crop'
};

export const PRESET_PROFILES = [
  {
    id: 'priya',
    label: 'Priya (Salaried Tech · Bengaluru)',
    role: '₹1.1L/mo · 780 CIBIL · ₹8L Wedding Ask',
    profile: PRIYA_PROFILE
  },
  {
    id: 'ravi',
    label: 'Ravi (Kirana Store · Mysuru)',
    role: '₹40-80k/mo · ₹45L Shop Asset · ₹15L Stock Ask',
    profile: RAVI_PROFILE
  },
  {
    id: 'anita',
    label: 'Anita (Gig Rider · Hubballi)',
    role: '₹28k/mo · 30%+ App Debt · ₹1.5L EV Scooter Ask',
    profile: ANITA_PROFILE
  }
];
