"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export default function PrivacyPage() {
  const t = useTranslations("Privacy");
  const s = useTranslations("StocksLayout");
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <Link
          href="/"
          className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          {s("voltar")}
        </Link>

        <h1 className="mt-8 font-display text-4xl text-foreground">
          {t("title")}
        </h1>
        <p className="mt-2 font-body text-sm text-muted-foreground">
          {t("lastUpdate")}
        </p>

        <div className="mt-12 space-y-8 font-body text-foreground">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <section key={i}>
              <h2 className="font-display text-xl mb-3">
                {t(`section${i}Title`)}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {t(`section${i}Text`)}
              </p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
