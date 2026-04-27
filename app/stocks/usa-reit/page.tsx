"use client";

import { Construction, Building2, TrendingUp } from "lucide-react";

const USA_REIT_CONTENT = {
  title: "USA REIT",
  subtitle: "Real Estate Investment Trusts",
  description: "Análise fundamentalista de REITs americanos",
  comingSoon: "Em breve",
  features: [
    { icon: Building2, label: "Portfolios de REITs" },
    { icon: TrendingUp, label: "AFFO por-share" },
    { icon: Construction, label: "Diversificação sectorial" },
  ],
};

export default function UsaReitPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full text-sm font-mono mb-8">
        <Construction className="w-4 h-4" />
        <span>{USA_REIT_CONTENT.comingSoon}</span>
      </div>

      <h1 className="font-display text-6xl md:text-8xl tracking-tight text-foreground mb-4">
        {USA_REIT_CONTENT.title}
      </h1>

      <p className="font-mono text-lg text-muted-foreground mb-12 max-w-md">
        {USA_REIT_CONTENT.subtitle}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl">
        {USA_REIT_CONTENT.features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={index}
              className="flex flex-col items-center gap-3 p-6 border border-border rounded-lg bg-card/50"
            >
              <Icon className="w-8 h-8 text-muted-foreground" />
              <span className="font-mono text-sm">{feature.label}</span>
            </div>
          );
        })}
      </div>

      <p className="mt-16 font-mono text-sm text-muted-foreground">
        Aguarde · Stay tuned · Restez à l'écoute
      </p>
    </div>
  );
}