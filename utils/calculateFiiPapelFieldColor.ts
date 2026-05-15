export const calculateFiiPapelFieldColor = (
  field: "dy" | "pvp" | "cagrDiv" | "cagrCota",
  value: number,
): string => {
  switch (field) {
    case "dy":
      return value > 0.06 ? "text-green-600" : "";
    case "pvp":
      return value < 1 ? "text-green-600" : "";
    case "cagrDiv":
      return value > 0 ? "text-green-600" : "text-red-600";
    case "cagrCota":
      return value > 0 ? "text-green-600" : "text-red-600";
    default:
      return "";
  }
};
