"use client";

import { NextIntlClientProvider } from "next-intl";
import { useEffect, useState } from "react";
import ptBR from "@/messages/pt-BR.json";
import en from "@/messages/en.json";

const messages: Record<string, Record<string, unknown>> = {
  "pt-BR": ptBR,
  en,
};

export function I18nClientProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState("pt-BR");

  useEffect(() => {
    const match = document.cookie.match(/(?:^|;\s*)NEXT_LOCALE=([^;]*)/);
    const cookie = match ? decodeURIComponent(match[1]) : null;
    const detected = cookie === "en" || cookie === "pt-BR" ? cookie : navigator.language?.startsWith("en") ? "en" : "pt-BR";
    setLocale(detected);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    const meta = locale === "en" ? en.LandingPage : ptBR.LandingPage;
    const desc = document.querySelector("meta[name='description']");
    if (desc) desc.setAttribute("content", meta.description as string);
  }, [locale]);

  return (
    <NextIntlClientProvider locale={locale} messages={messages[locale] ?? ptBR} timeZone="America/Sao_Paulo">
      {children}
    </NextIntlClientProvider>
  );
}
