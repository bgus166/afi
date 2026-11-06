export const MIN_GMV = 100_000_000;
export const MAX_GMV = 5_000_000_000;
export const DEFAULT_GMV = 1_000_000_000;

export const marketplaceFees = [
  { label: "Platform fee", percent: 8 },
  { label: "Komisi afiliator", percent: 10 },
  { label: "Subsidi gratis ongkir", percent: 5 },
  { label: "Iklan marketplace", percent: 5 },
] as const;

export const d2cFees = [
  { label: "Komisi afiliator D2C", percent: 12 },
  { label: "Fee platform Afilabs", percent: 2 },
  { label: "Payment gateway", percent: 2 },
] as const;

function calculateChannel(gmv: number, fees: readonly { label: string; percent: number }[]) {
  const rows = fees.map((fee) => ({ ...fee, amount: Math.round(gmv * fee.percent / 100) }));
  return {
    rows,
    total: rows.reduce((sum, row) => sum + row.amount, 0),
    percent: rows.reduce((sum, row) => sum + row.percent, 0),
  };
}

export function calculateCostComparison(gmv: number) {
  if (!Number.isSafeInteger(gmv) || gmv < MIN_GMV || gmv > MAX_GMV) return null;
  const marketplace = calculateChannel(gmv, marketplaceFees);
  const d2c = calculateChannel(gmv, d2cFees);
  const monthlyDifference = marketplace.total - d2c.total;
  return { marketplace, d2c, monthlyDifference, yearlyDifference: monthlyDifference * 12 };
}
