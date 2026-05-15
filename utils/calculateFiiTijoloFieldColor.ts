export const calculateFiiTijoloFieldColor = (
  field: "dy" | "pvp" | "cagrDiv" | "cagrCota" | "riskPremium",
  value: number,
): string => {
  switch (field) {
    case "dy":
      return value > 0.06 ? "text-green-600" : "";
    case "pvp":
      return value >= 0.1 ? "text-green-600" : "";
    case "cagrDiv":
      return value > 0 ? "text-green-600" : "text-red-600";
    case "cagrCota":
      return value > 0 ? "text-green-600" : "text-red-600";
    case "riskPremium":
      if (value <= 0.06) return "text-green-600";
      if (value <= 0.12) return "text-yellow-600";
      return "text-red-600";
    default:
      return "";
  }
};
