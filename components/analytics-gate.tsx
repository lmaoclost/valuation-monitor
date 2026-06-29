"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

const STORAGE_KEY = "lgpd-consent";

export function AnalyticsGate() {
  const [consent, setConsent] = useState<string | null>(null);

  useEffect(() => {
    setConsent(localStorage.getItem(STORAGE_KEY));

    const handleChange = () => {
      setConsent(localStorage.getItem(STORAGE_KEY));
    };

    window.addEventListener("lgpd-consent-change", handleChange);
    return () => window.removeEventListener("lgpd-consent-change", handleChange);
  }, []);

  if (consent !== "accepted") return null;

  return (
    <>
      <Analytics />
      <SpeedInsights />
    </>
  );
}
