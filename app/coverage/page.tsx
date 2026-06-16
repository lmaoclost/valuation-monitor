import { getCoverageData } from "@/lib/coverage";
import { CoverageContent } from "@/app/coverage/coverage-content";

export default async function CoveragePage() {
  const { entries, lastUpdated } = await getCoverageData();
  return <CoverageContent entries={entries} lastUpdated={lastUpdated} />;
}
