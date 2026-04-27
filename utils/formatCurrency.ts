type Currency = "BRL" | "USD";

const createCurrencyFormatter = (currency: Currency) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

export const formatCurrency = (value: number, currency: Currency = "BRL") => {
  if (!Number.isFinite(value) || Number.isNaN(value) || value === 0) {
    return "";
  }

  return createCurrencyFormatter(currency).format(value);
};
