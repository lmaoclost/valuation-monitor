export const fetchPreset = async (preset: string) => {
  const res = await fetch(`/fetch-stocks-preset/filter?preset=${preset}`);
  return res.json();
};
