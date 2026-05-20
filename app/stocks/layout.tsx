import Link from "next/link";
import { MobileNav } from "@/components/MobileNav";

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
          <MobileNav showBack />
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
