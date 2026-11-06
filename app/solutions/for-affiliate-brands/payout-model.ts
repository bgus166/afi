export const MIN_SALES = 10_000_000;
export const MAX_SALES = 500_000_000;
export const DEFAULT_SALES = 150_000_000;
export const MIN_COMMISSION = 5;
export const MAX_COMMISSION = 20;
export const DEFAULT_COMMISSION = 10;

export function calculateAffiliatePayout(sales: number, commissionPercent: number, additionalWithholding: boolean) {
  if (!Number.isSafeInteger(sales) || sales < MIN_SALES || sales > MAX_SALES) return null;
  if (!Number.isInteger(commissionPercent) || commissionPercent < MIN_COMMISSION || commissionPercent > MAX_COMMISSION) return null;

  const grossCommission = Math.round(sales * commissionPercent / 100);
  const taxBase = Math.round(grossCommission * .5);
  // These input bounds keep the illustrative DPP below the Rp60 million first bracket.
  const baseTax = Math.round(taxBase * .05);
  const extraWithholding = additionalWithholding ? Math.round(baseTax * .2) : 0;
  const withholding = baseTax + extraWithholding;
  return { grossCommission, taxBase, baseTax, extraWithholding, withholding, netCommission: grossCommission - withholding };
}
