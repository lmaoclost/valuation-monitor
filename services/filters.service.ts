export const fetchPreset = async (preset: string) => {
  const res = await fetch(`/api/fetch-stocks-preset/filter?preset=${preset}`, {
    next: { revalidate: 86400 },
  });
  return res.json();
};
