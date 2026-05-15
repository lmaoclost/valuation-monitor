"use client";

import { NextIntlClientProvider } from "next-intl";
import { useEffect, useState } from "react";
import ptBR from "@/messages/pt-BR.json";
import en from "@/messages/en.json";

const messages: Record<string, Record<string, unknown>> = {
  "pt-BR": ptBR,
  en,
};

function getCookie(name: string): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

export function I18nClientProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<string>("pt-BR");

  useEffect(() => {
    const cookie = getCookie("NEXT_LOCALE");
    if (cookie === "en" || cookie === "pt-BR") {
      setLocale(cookie);
    } else if (navigator.language?.startsWith("en")) {
      setLocale("en");
    }
  }, []);

  return (
    <NextIntlClientProvider locale={locale} messages={messages[locale] ?? ptBR}>
      {children}
    </NextIntlClientProvider>
  );
}
