import { TableWrapper } from "@/components/TableWrapper";

export default async function BrStocksPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="font-display text-lg tracking-widest text-foreground hover:text-primary transition-colors">
            VALUATION MONITOR
          </a>
          <a href="/" className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors">
            ← Voltar
          </a>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <TableWrapper />
      </main>
    </div>
  );
}