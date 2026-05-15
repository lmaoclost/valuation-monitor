import type { Metadata } from "next";
import { Playfair_Display, Lora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { LgpdBanner } from "@/components/lgpd-banner";
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
            <LgpdBanner />
          </Providers>
        </I18nClientProvider>
      </body>
    </html>
  );
}
