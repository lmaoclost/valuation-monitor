const currency_with_two_decimal_places = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

export const formatCurrency = (value: number) => {
  if (!Number.isFinite(value) || Number.isNaN(value) || value === 0) {
    return "";
  }

  return currency_with_two_decimal_places.format(value);
};
