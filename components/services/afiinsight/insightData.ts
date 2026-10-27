export type Channel = "all" | "affiliate" | "marketplace" | "website";
export type Period = 7 | 30;
export const channels: { value: Channel; label: string; share: number; basket: number }[] = [
  { value: "all", label: "Semua channel", share: 1, basket: 285000 },
  { value: "affiliate", label: "Afiliasi", share: .4, basket: 265000 },
  { value: "marketplace", label: "Marketplace", share: .38, basket: 275000 },
  { value: "website", label: "Website D2C", share: .22, basket: 340000 },
];
const dailyMillions = [18, 21, 19, 24, 23, 27, 25, 22, 26, 28, 24, 30, 27, 29, 32, 28, 26, 31, 29, 34, 32, 30, 35, 33, 37, 34, 32, 38, 36, 41];

/** Fixed illustrative records; no connection to a merchant or analytics service. */
export function recordsFor(period: Period, channel: Channel) {
  const selected = channels.find((item) => item.value === channel)!;
  return dailyMillions.slice(-period).map((value, index) => {
    const revenue = Math.round(value * 1000000 * selected.share);
    return { label: `${31 - period + index} Okt`, revenue, orders: Math.round(revenue / selected.basket) };
  });
}
export function totalsFor(records: ReturnType<typeof recordsFor>) {
  const revenue = records.reduce((sum, item) => sum + item.revenue, 0);
  const orders = records.reduce((sum, item) => sum + item.orders, 0);
  return { revenue, orders, basket: orders ? Math.round(revenue / orders) : 0 };
}
export const rupiah = (value: number) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
export const compactRupiah = (value: number) => value >= 1000000000 ? `Rp ${(value / 1000000000).toLocaleString("id-ID", { maximumFractionDigits: 2 })} M` : `Rp ${(value / 1000000).toLocaleString("id-ID", { maximumFractionDigits: 1 })} jt`;
export const number = (value: number) => value.toLocaleString("id-ID");
