const nf = new Intl.NumberFormat("bn-BD", { maximumFractionDigits: 2 });
const pf = new Intl.NumberFormat("bn-BD", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export const toBn = (n: number) => nf.format(n); // 1290 -> ১,২৯০
export const bnPercent = (n: number) => `${pf.format(Math.abs(n))}%`; // 0 -> ০.০%

export const UNIT_LABEL = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
} as const;

export const UNIT_SHORT = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
} as const;

export const bnDate = () =>
  new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  });