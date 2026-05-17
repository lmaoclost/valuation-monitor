"use client";

import { NextIntlClientProvider } from "next-intl";
import { useEffect } from "react";
import ptBR from "@/messages/pt-BR.json";
import en from "@/messages/en.json";

const messages: Record<string, Record<string, unknown>> = {
  "pt-BR": ptBR,
  en,
};

export function I18nClientProvider({ children, locale }: { children: React.ReactNode; locale: string }) {
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
