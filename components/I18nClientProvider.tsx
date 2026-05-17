"use client";

import { NextIntlClientProvider } from "next-intl";
import { useEffect, useState } from "react";
import ptBR from "@/messages/pt-BR.json";
import en from "@/messages/en.json";

const messages: Record<string, Record<string, unknown>> = {
  "pt-BR": ptBR,
  en,
};

function getInitialLocale(): string {
  if (typeof document === "undefined") return "pt-BR";
  const match = document.cookie.match(new RegExp("(?:^|;\\s*)NEXT_LOCALE=([^;]*)"));
  const cookie = match ? decodeURIComponent(match[1]) : undefined;
  if (cookie === "en" || cookie === "pt-BR") return cookie;
  return navigator.language?.startsWith("en") ? "en" : "pt-BR";
}

export function I18nClientProvider({ children }: { children: React.ReactNode }) {
  const [locale] = useState<string>(getInitialLocale);

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
