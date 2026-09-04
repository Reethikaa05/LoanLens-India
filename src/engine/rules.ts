// Centralized Domain Rules and Regulatory Standards
export interface RuleDefinition {
  code: string;
  name: string;
  category: 'AFFORDABILITY' | 'UNDERWRITING' | 'PRICING' | 'REGULATORY' | 'STRESS';
  parameterValue: string;
  domainRationale: string;
  source: string;
}

export const DOMAIN_RULES_TABLE: RuleDefinition[] = [
  {
    code: 'R01_REPO_BENCHMARK',
    name: 'RBI Repo Rate Benchmark',
    category: 'PRICING',
    parameterValue: '6.50% p.a.',
    domainRationale: 'The base policy anchor for floating and retail lending across Indian scheduled commercial banks.',
    source: 'RBI Monetary Policy Committee Resolution (2024-2026)'
  },
  {
    code: 'R02_FOIR_LOW_INCOME',
    name: 'FOIR Ceiling (Income < ₹35,000)',
    category: 'AFFORDABILITY',
    parameterValue: '40% of net monthly income',
    domainRationale: 'Informal and low-income households spend a larger share on non-negotiable living essentials (food, rent, school). Any debt exceeding 40% leads to immediate default upon minor shocks.',
    source: 'RBI Microfinance Regulations 2022 & Industry Underwriting Standards'
  },
  {
    code: 'R03_FOIR_MID_INCOME',
    name: 'FOIR Ceiling (Income ₹35k - ₹75k)',
    category: 'AFFORDABILITY',
    parameterValue: '50% of net monthly income',
    domainRationale: 'Standard commercial bank threshold for mid-income salaried and established self-employed borrowers.',
    source: 'State Bank of India / HDFC Retail Credit Underwriting Policy'
  },
  {
    code: 'R04_FOIR_HIGH_INCOME',
    name: 'FOIR Ceiling (Income > ₹75,000)',
    category: 'AFFORDABILITY',
    parameterValue: '60% of net monthly income',
    domainRationale: 'High-income earners retain substantial absolute disposable surplus even after living costs, permitting higher leverage.',
    source: 'HDFC / ICICI Prime Salaried Lending Manual'
  },
  {
    code: 'R05_SAFE_CARRY_BUFFER',
    name: 'Safe Carry Living Buffer',
    category: 'AFFORDABILITY',
    parameterValue: '20% of net income + actual living costs',
    domainRationale: 'Borrower Safe Carry must prioritize survival over bank limits. The borrower should never allocate living cushion or emergency reserve to an EMI.',
    source: 'Lokta Copilot Core Thesis / Personal Finance Conservative Rule'
  },
  {
    code: 'R06_CASH_INCOME_HAIRCUT',
    name: 'Informal Cash Income Haircut',
    category: 'UNDERWRITING',
    parameterValue: '50% haircut on unverified cash flows',
    domainRationale: 'Unregistered cash income without banking trail or GST/ITR has high volatility; formal banks credit only 50% during underwriting unless secured.',
    source: 'NBFC Micro-LAP Underwriting Guidelines (Five Star / Shubham)'
  },
  {
    code: 'R07_ITR_RECOGNITION',
    name: 'Documented ITR Income Weight',
    category: 'UNDERWRITING',
    parameterValue: '100% of average 2-year ITR net profit',
    domainRationale: 'Official tax returns submitted to Income Tax Dept constitute verified primary income proof for credit assessment.',
    source: 'Indian Banking Association (IBA) Income Verification Standards'
  },
  {
    code: 'R08_LAP_LTV_COMMERCIAL',
    name: 'Commercial Property LAP LTV',
    category: 'UNDERWRITING',
    parameterValue: '50% of distress market valuation',
    domainRationale: 'Commercial shop properties have lower liquidity than residential, so lenders cap Loan-to-Value at 50% for unencumbered assets.',
    source: 'RBI Master Direction on Housing Finance / LAP Prudential Norms'
  },
  {
    code: 'R09_PRIME_SALARIED_RATE',
    name: 'Prime Salaried Unsecured Rate Band',
    category: 'PRICING',
    parameterValue: 'Repo + 4.00% to 5.25% (10.50% - 11.75%)',
    domainRationale: 'Tier-1 corporate employees with CIBIL >= 750 represent low default risk (<0.8%) and are entitled to sub-12% personal loan rates.',
    source: 'SBI Xpress Credit / HDFC Personal Loan Prime Rack Rates'
  },
  {
    code: 'R10_SECURED_LAP_RATE',
    name: 'Secured LAP Benchmark Rate',
    category: 'PRICING',
    parameterValue: 'Repo + 2.75% to 3.75% (9.25% - 10.25%)',
    domainRationale: 'Collateralized real estate drastically reduces bank Loss Given Default (LGD), cutting interest rate by 500-800 bps versus unsecured business loans.',
    source: 'Bank of Baroda Mortgage / ICICI LAP Card Rates'
  },
  {
    code: 'R11_SUBPRIME_PREDATORY_ALERT',
    name: 'Predatory Lending Cutoff',
    category: 'REGULATORY',
    parameterValue: 'Effective APR > 24.0% p.a.',
    domainRationale: 'Instant app loans charging 30-36%+ exploit desperate borrowers. Our copilot triggers immediate alert to consolidate and cease new borrowing.',
    source: 'RBI Digital Lending Guidelines (2022) & Fair Practices Code'
  },
  {
    code: 'R12_BOUNCE_PENALTY_RULE',
    name: 'Cheque / NACH Bounce Hard Flag',
    category: 'UNDERWRITING',
    parameterValue: '1+ bounce in 12m = Red flag / +250 bps',
    domainRationale: 'Automated NACH bounce indicates severe cashflow distress or bank operational penalty, leading to immediate rejection at prime banks.',
    source: 'TransUnion CIBIL / Experian Credit Scoring Algorithm'
  },
  {
    code: 'R13_ZERO_FORECLOSURE_CHARGE',
    name: 'Zero Foreclosure Fee Mandate',
    category: 'REGULATORY',
    parameterValue: '0% prepayment penalty on floating retail loans',
    domainRationale: 'Banks and NBFCs are legally prohibited by RBI from charging foreclosure or part-prepayment fees to individual borrowers.',
    source: 'RBI Circular DBOD.Dir.BC.107/13.03.00/2013-14 & RBI/2019-20/38'
  },
  {
    code: 'R14_APR_TRANSPARENCY_KFS',
    name: 'All-In APR with Processing Fee & GST',
    category: 'REGULATORY',
    parameterValue: 'APR = (Interest + Fee + 18% GST) annualized',
    domainRationale: 'Lenders obscure 2-3% upfront processing fees. An upfront ₹20,000 fee on a ₹5L 2-year loan adds over 200 bps to true cost of credit.',
    source: 'RBI Guidelines on Key Fact Statement (KFS) April 2024'
  },
  {
    code: 'R15_DISCRETIONARY_CAP',
    name: 'Discretionary Purpose Cap (Weddings/Luxury)',
    category: 'AFFORDABILITY',
    parameterValue: 'Max 4x net monthly income for safe carry',
    domainRationale: 'Non-productive consumption generates zero future revenue. Borrowing 8x-10x monthly income for a 1-day wedding leaves years of vulnerability.',
    source: 'Lokta Prudent Financial Guidelines'
  },
  {
    code: 'R16_PRODUCTIVE_ASSET_CREDIT',
    name: 'Productive Asset Cashflow Offset',
    category: 'AFFORDABILITY',
    parameterValue: 'Credit 70% of incremental monthly earnings',
    domainRationale: 'If loan directly doubles delivery runs (e.g. Anita buying EV scooter), the conservative 70% of expected return offsets the EMI obligation.',
    source: 'Pradhan Mantri Mudra Yojana (PMMY) & Micro-enterprise Guidelines'
  }
];

export const FINANCIAL_CONSTANTS = {
  CURRENT_REPO_RATE: 6.50,
  GST_RATE_PERCENT: 18.0,
  PROCESSING_FEE_PRIME_MAX_PERCENT: 1.0,
  PROCESSING_FEE_NBFC_MAX_PERCENT: 2.0,
  STANDARD_STRESS_INCOME_DROP_PERCENT: 20.0,
  STANDARD_STRESS_RATE_HIKE_BPS: 200, // +2.0%
};
