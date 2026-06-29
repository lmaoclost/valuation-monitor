import type { Metadata } from "next";
import { Playfair_Display, Lora, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Providers } from "./providers";
import { LgpdBannerWrapper } from "@/components/lgpd-banner-wrapper";
import { I18nClientProvider } from "@/components/I18nClientProvider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
});
const lora = Lora({
  subsets: ["latin"],
  variable: "--font-body",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Valuation Monitor",
  description: "Radar fundamentalista para análise de ações",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${playfair.variable} ${lora.variable} ${jetbrains.variable} antialiased`}
      >
        <I18nClientProvider>
          <Providers>
            {children}
            <LgpdBannerWrapper />
          </Providers>
        </I18nClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
