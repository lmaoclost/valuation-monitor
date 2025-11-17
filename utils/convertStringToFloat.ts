export const convertStringToFloat = (value: string) => {
  return Number(value.replace(",", "."));
};
