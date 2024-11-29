export const convertStringToFloat = (value: string) => {
  const formattedPrice = parseFloat(value.replace(",", "."));
  return formattedPrice;
}