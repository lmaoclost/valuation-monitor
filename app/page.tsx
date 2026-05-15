"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { LanguageToggle } from "@/components/LanguageToggle";
import {
  Github,
  Globe,
  Building2,
  Landmark,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

export default function LandingPage() {
  const t = useTranslations("LandingPage");
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="grain" />

      <header className="absolute top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center">
        <div className="font-display text-xl tracking-widest text-foreground">
          VALUATION MONITOR
        </div>
        <nav className="flex gap-6 font-mono text-sm">
          <Link
            href="/stocks/br"
            className="text-foreground hover:text-primary transition-colors"
          >
            BR Stocks
          </Link>
          <Link
            href="/stocks/usa"
            className="text-foreground hover:text-primary transition-colors"
          >
            USA Stocks
          </Link>
          <Link
            href="/stocks/br-fii"
            className="text-foreground hover:text-primary transition-colors"
          >
            BR FII
          </Link>
          <Link
            href="/stocks/usa-reit"
            className="text-foreground hover:text-primary transition-colors"
          >
            USA REIT
          </Link>
          <LanguageToggle />
        </nav>
      </header>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <div className="animate-fade-in-up">
            <span className="inline-block font-mono text-xs text-primary tracking-[0.3em] uppercase mb-6">
              {t("subtitle")}
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-foreground animate-fade-in-up">
            <span className="bg-linear-to-r from-foreground via-primary to-primary/60 bg-clip-text text-transparent">
              {t("title1")}
            </span>
            <br />
            <span className="text-foreground">{t("title2")}</span>
            <span className="block text-3xl md:text-4xl lg:text-5xl text-primary mt-6 font-normal">
              {t("title3")}
            </span>
          </h1>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up animate-delay-100">
            {t("description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 animate-fade-in-up animate-delay-200">
            <Link
              href="/stocks/br"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-display text-lg hover:bg-primary/90 transition-all"
            >
              {t("cta")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <a
              href="#novidades"
              className="inline-flex items-center justify-center px-8 py-4 border border-border text-foreground font-body hover:border-primary hover:text-primary transition-colors"
            >
              {t("novidades")}
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 animate-fade-in-up animate-delay-300">
            {(
              [
                "method1Title",
                "method1Desc",
                "method2Title",
                "method2Desc",
                "method3Title",
                "method3Desc",
              ] as const
            ).reduce(
              (acc, key, i) => {
                const idx = Math.floor(i / 2);
                if (i % 2 === 0) {
                  acc.push({
                    title: t(key),
                    desc: t(`method${idx + 1}Desc` as any),
                  });
                }
                return acc;
              },
              [] as { title: string; desc: string }[],
            ).length === 0
              ? null
              : null}
            <div className="bg-card/50 border border-border p-6 text-left hover:border-primary transition-all group hover:bg-card">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="font-mono text-sm text-primary font-bold">
                  01
                </span>
              </div>
              <h3 className="font-display text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                {t("method1Title")}
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                {t("method1Desc")}
              </p>
            </div>
            <div className="bg-card/50 border border-border p-6 text-left hover:border-primary transition-all group hover:bg-card">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="font-mono text-sm text-primary font-bold">
                  02
                </span>
              </div>
              <h3 className="font-display text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                {t("method2Title")}
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                {t("method2Desc")}
              </p>
            </div>
            <div className="bg-card/50 border border-border p-6 text-left hover:border-primary transition-all group hover:bg-card">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="font-mono text-sm text-primary font-bold">
                  03
                </span>
              </div>
              <h3 className="font-display text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                {t("method3Title")}
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                {t("method3Desc")}
              </p>
            </div>
          </div>
        </div>

        <div id="novidades" className="max-w-5xl mx-auto mt-32 w-full">
          <h2 className="font-display text-3xl md:text-4xl text-foreground text-center mb-4 animate-fade-in-up">
            {t("novidades")}
          </h2>
          <p className="font-body text-muted-foreground text-center mb-12 max-w-xl mx-auto animate-fade-in-up animate-delay-100">
            {t("novidadesSub")}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in-up animate-delay-200">
            <Link
              href="/stocks/br"
              className="bg-card border border-border p-6 hover:border-primary transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <Landmark className="w-5 h-5 text-emerald-500" />
                </div>
                <span className="font-mono text-xs text-emerald-500 tracking-wider">
                  {t("badgeOriginal")}
                </span>
              </div>
              <h3 className="font-display text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                {t("cardBrStocks")}
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                {t("cardBrStocksDesc")}
              </p>
            </Link>
            <Link
              href="/stocks/usa"
              className="bg-card border border-border p-6 hover:border-primary transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-blue-500" />
                </div>
                <span className="font-mono text-xs text-blue-500 tracking-wider">
                  {t("badgeNew")}
                </span>
              </div>
              <h3 className="font-display text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                {t("cardUsaStocks")}
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                {t("cardUsaStocksDesc")}
              </p>
            </Link>
            <Link
              href="/stocks/br-fii"
              className="bg-card border border-border p-6 hover:border-primary transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-amber-500" />
                </div>
                <span className="font-mono text-xs text-amber-500 tracking-wider">
                  {t("badgeNew")}
                </span>
              </div>
              <h3 className="font-display text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                {t("cardBrFii")}
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                {t("cardBrFiiDesc")}
              </p>
            </Link>
            <Link
              href="/stocks/usa-reit"
              className="bg-card border border-border p-6 hover:border-primary transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-indigo-500" />
                </div>
                <span className="font-mono text-xs text-indigo-500 tracking-wider">
                  {t("badgeNew")}
                </span>
              </div>
              <h3 className="font-display text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                {t("cardUsaReit")}
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                {t("cardUsaReitDesc")}
              </p>
            </Link>
          </div>
        </div>

        <div
          id="como-funciona"
          className="max-w-5xl mx-auto mt-32 w-full animate-fade-in-up animate-delay-100"
        >
          <h2 className="font-display text-3xl md:text-4xl text-foreground text-center mb-12">
            {t("comoFunciona")}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <span className="font-mono text-lg text-primary font-bold">
                      0{i}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-foreground mb-2">
                      {t(`howItem${i}Title`)}
                    </h3>
                    <p className="font-body text-muted-foreground">
                      {t(`howItem${i}Desc`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-card/50 border border-border rounded-lg p-4 shadow-2xl">
              <div className="font-mono text-xs text-muted-foreground mb-3 border-b border-border pb-2">
                {t("previewTable")}
              </div>
              <div className="space-y-2 font-mono text-sm">
                <div className="grid grid-cols-4 gap-2 text-muted-foreground text-xs pb-2 border-b border-border">
                  <span>TICKER</span>
                  <span>{t("price")}</span>
                  <span>P/L</span>
                  <span>FAIR</span>
                </div>
                {[
                  ["PETR4", "38,50", "green", "5.2", "green", "52,10"],
                  ["VALE3", "68,20", "yellow", "8.4", "yellow", "71,30"],
                  ["ITUB4", "31,80", "green", "6.1", "green", "44,20"],
                  ["BBDC4", "12,40", "red", "12.8", "red", "9,80"],
                ].map(([ticker, price, pc, pl, fc, fair]) => (
                  <div
                    key={ticker}
                    className="grid grid-cols-4 gap-2 text-foreground"
                  >
                    <span className="text-primary">{ticker}</span>
                    <span>{price}</span>
                    <span className={`text-${pc}-500`}>{pl}</span>
                    <span className={`text-${fc}-500`}>{fair}</span>
                  </div>
                ))}
                <div className="text-xs text-muted-foreground mt-4 pt-2 border-t border-border">
                  <span className="text-muted-foreground">+</span>{" "}
                  {t("previewMarkets")}
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-32 py-8 text-center border-t border-border w-full max-w-4xl">
          <div className="font-mono text-xs text-muted-foreground space-y-2">
            <p>{t("footer")}</p>
            <p className="pt-2">
              {t("builtBy")}{" "}
              <a
                href="https://www.linkedin.com/in/renansmoliveira/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Renan Oliveira
              </a>{" "}
              ·{" "}
              <a
                href="https://github.com/lmaoclost/valuation-monitor"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80"
              >
                <Github className="w-4 h-4 inline" />
              </a>
              <span className="mx-2">·</span>
              <Link
                href="/privacidade"
                className="text-primary hover:underline"
              >
                {t("privacy")}
              </Link>
            </p>
          </div>
        </footer>
      </main>

      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float animate-delay-200" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 border border-primary/5 rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 border border-primary/5 rounded-full" />
    </div>
  );
}
