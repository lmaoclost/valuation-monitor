const percentage_with_two_decimal_places = new Intl.NumberFormat("pt-BR", {
  style: "percent",
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

export const formatPercentage = (value: number) =>
  percentage_with_two_decimal_places.format(value);
