const currency_with_two_decimal_places = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

export const formatCurrency = (value: number) =>
  currency_with_two_decimal_places.format(value);
