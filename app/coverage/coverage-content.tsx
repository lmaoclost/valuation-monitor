"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { LanguageToggle } from "@/components/LanguageToggle";
import { CoverageEntry } from "@/lib/coverage";
import { CoverageCard } from "@/app/coverage/coverage-card";

export function CoverageContent({
  entries,
  lastUpdated,
}: {
  entries: CoverageEntry[];
  lastUpdated: string;
}) {
  const locale = useLocale();
  const t = useTranslations("Coverage");
  const s = useTranslations("StocksLayout");
  const formattedDate = new Date(lastUpdated).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-background relative">
      <div className="grain" />
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-20">
        <div className="flex items-center justify-between mb-12 animate-fade-in-up">
          <Link
            href="/"
            className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            {s("voltar")}
          </Link>
          <LanguageToggle />
        </div>

        <div className="mb-12 animate-fade-in-up">
          <span className="font-mono text-xs text-primary tracking-[0.3em] uppercase">
            {t("title")}
          </span>
          <h1 className="font-display text-4xl md:text-5xl text-foreground mt-4 mb-4">
            {t("whatWeTrack")}
          </h1>
          <p className="font-body text-muted-foreground max-w-2xl leading-relaxed">
            {t("description")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {entries.map((entry, i) => (
            <CoverageCard key={entry.market} entry={entry} index={i} />
          ))}
        </div>

        <div className="mt-16 animate-fade-in-up animate-delay-400">
          <h2 className="font-display text-xl text-foreground mb-4">
            {t("methodology")}
          </h2>
          <div className="space-y-3 font-body text-sm text-muted-foreground leading-relaxed">
            <p>
              <strong className="text-foreground">BR Stocks:</strong>{" "}
              {t("metaBrStocks")}
            </p>
            <p>
              <strong className="text-foreground">USA Stocks:</strong>{" "}
              {t("metaUsaStocks")}
            </p>
            <p>
              <strong className="text-foreground">USA REITs:</strong>{" "}
              {t("metaUsaReits")}
            </p>
            <p>
              <strong className="text-foreground">BR FIIs:</strong>{" "}
              {t("metaBrFiis")}
            </p>
            <p className="text-xs text-muted-foreground/60 pt-2 border-t border-border mt-4">
              {t("lastUpdate", { date: formattedDate })}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
