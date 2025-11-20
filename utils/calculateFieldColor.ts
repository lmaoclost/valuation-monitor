export const calculateFieldColor = (value: number, thresholds: number[]) => {
  if (value < thresholds[0]) return "text-red-600";
  if (value <= thresholds[1]) return "text-yellow-600";
  if (value <= thresholds[2]) return "text-blue-600";
  return "text-green-600";
};
