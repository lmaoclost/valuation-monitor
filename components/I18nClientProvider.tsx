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
    const detected = cookie === "en" || cookie === "pt-BR" ? cookie : navigator.language?.startsWith("en") ? "en" : "pt-BR";
    setLocale(detected);
    document.documentElement.lang = detected;
    const meta = detected === "en" ? en.LandingPage : ptBR.LandingPage;
    const desc = document.querySelector("meta[name='description']");
    if (desc) desc.setAttribute("content", meta.description as string);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <NextIntlClientProvider locale={locale} messages={messages[locale] ?? ptBR} timeZone="America/Sao_Paulo">
      {children}
    </NextIntlClientProvider>
  );
}
