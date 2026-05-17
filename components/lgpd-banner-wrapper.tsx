"use client";

import dynamic from "next/dynamic";

const LgpdBanner = dynamic(
  () => import("@/components/lgpd-banner").then((m) => m.LgpdBanner),
  { ssr: false }
);

export function LgpdBannerWrapper() {
  return <LgpdBanner />;
}
