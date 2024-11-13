import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Valuation Monitor",
  description: "A valuation monitor using the Status Invest information",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
