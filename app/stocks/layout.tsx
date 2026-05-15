import Link from "next/link";
import { TableWrapper } from "@/components/TableWrapper";

interface StocksLayoutProps {
  children: React.ReactNode;
}

export default async function StocksLayout({ children }: StocksLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            href="/"
            className="font-display text-lg tracking-widest text-foreground hover:text-primary transition-colors"
          >
            VALUATION MONITOR
          </Link>
          <nav className="flex gap-4">
            <a
              href="/stocks/br"
              className="font-mono text-sm text-foreground hover:text-primary transition-colors"
            >
              BR Stocks
            </a>
            <a
              href="/stocks/usa"
              className="font-mono text-sm text-foreground hover:text-primary transition-colors"
            >
              USA Stocks
            </a>
            <a
              href="/stocks/br-fii"
              className="font-mono text-sm text-foreground hover:text-primary transition-colors"
            >
              BR FII
            </a>
            <a
              href="/stocks/usa-reit"
              className="font-mono text-sm text-foreground hover:text-primary transition-colors"
            >
              USA REIT
            </a>
          </nav>
          <Link
            href="/"
            className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← Voltar
          </Link>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
