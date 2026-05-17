import { z } from "zod";

export const toNumber = z.string().transform((val) => {
  if (!val || val.trim() === "") return 0;
  const parsed = parseFloat(val.replace(/\./g, "").replace(",", "."));
  return isNaN(parsed) ? 0 : parsed;
});

export const toPercentage = z.string().transform((val) => {
  if (!val || val.trim() === "") return 0;
  const cleaned = val.replace("%", "").replace(",", ".");
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed / 100;
});
