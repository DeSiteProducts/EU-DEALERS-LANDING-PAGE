export type Currency = "EUR";
export const DEFAULT_CURRENCY: Currency = "EUR";
export const CURRENCIES = {
  EUR: { code: "EUR", locale: "en-IE", label: "euros (EUR)" },
} as const;
