"use client";

import { useLocale } from "next-intl";
import { setCookie } from "@/lib/cookies";

export function LanguageToggle() {
  const locale = useLocale();

  const toggle = () => {
    const next = locale === "pt-BR" ? "en" : "pt-BR";
    setCookie("NEXT_LOCALE", next);
    window.location.reload();
  };

  return (
    <button
      onClick={toggle}
      className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider"
      title={locale === "pt-BR" ? "Switch to English" : "Mudar para Português"}
    >
      {locale === "pt-BR" ? "EN" : "PT"}
    </button>
  );
}
