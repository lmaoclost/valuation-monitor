"use client";

import { useTranslations } from "next-intl";
import { CoverageEntry } from "@/lib/coverage";
import { useEffect, useState } from "react";

function DonutRing({
  percentage,
  color,
  size = 120,
  strokeWidth = 8,
}: {
  percentage: number;
  color: string;
  size?: number;
  strokeWidth?: number;
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const [offset, setOffset] = useState(circumference);

  useEffect(() => {
    const target = circumference - (circumference * percentage) / 100;
    const timer = setTimeout(() => setOffset(target), 100);
    return () => clearTimeout(timer);
  }, [percentage, circumference]);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="shrink-0"
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        className="text-muted/50"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        strokeLinecap="round"
        className="transition-all duration-1000 ease-out"
      />
    </svg>
  );
}

const marketColors: Record<string, string> = {
  "br-stocks": "#10b981",
  "usa-stocks": "#3b82f6",
  "usa-reits": "#6366f1",
  "br-fiis": "#f59e0b",
};

export function CoverageCard({
  entry,
  index,
}: {
  entry: CoverageEntry;
  index: number;
}) {
  const t = useTranslations("Coverage");
  const color = marketColors[entry.market] || "var(--primary)";
  const gap = entry.universe - entry.tracked;

  const titleCase = (s: string) => s.replace(/-./g, (m) => m[1].toUpperCase()).replace(/^./, (m) => m.toUpperCase());
  const labelKey = `label${titleCase(entry.market)}` as const;
  const descKey = `desc${titleCase(entry.market)}` as const;

  return (
    <div
      className="bg-card border border-border p-6 hover:border-primary/30 transition-all animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start gap-5">
        <DonutRing percentage={entry.percentage} color={color} />
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-lg text-foreground mb-1">
            {t(labelKey)}
          </h3>
          <p className="font-body text-xs text-muted-foreground mb-4 leading-relaxed">
            {t(descKey)}
          </p>
            <div className="space-y-1.5">
            <div className="flex items-center justify-between font-mono text-sm">
              <span className="text-muted-foreground">{t("tracked")}</span>
              <span className="text-foreground font-medium">
                {new Intl.NumberFormat("pt-BR").format(entry.tracked)}
              </span>
            </div>
            <div className="flex items-center justify-between font-mono text-sm">
              <span className="text-muted-foreground">{t("knownUniverse")}</span>
              <span className="text-foreground">
                {new Intl.NumberFormat("pt-BR").format(entry.universe)}
              </span>
            </div>
            {gap > 0 && (
              <div className="flex items-center justify-between font-mono text-sm">
                <span className="text-muted-foreground">{t("gap")}</span>
                <span style={{ color }}>{new Intl.NumberFormat("pt-BR").format(gap)}</span>
              </div>
            )}
          </div>
          <div className="mt-3 pt-3 border-t border-border">
            <span
              className="font-display text-2xl"
              style={{ color }}
            >
              {entry.percentage}%
            </span>
            <span className="font-body text-xs text-muted-foreground ml-2">
              {t("coverage")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
