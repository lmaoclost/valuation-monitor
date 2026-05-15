import Link from "next/link";
import {
  Github,
  Globe,
  Building2,
  Landmark,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="grain" />

      <header className="absolute top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center">
        <div className="font-display text-xl tracking-widest text-foreground">
          VALUATION MONITOR
        </div>
        <nav className="flex gap-6 font-mono text-sm">
          <Link
            href="/stocks/br"
            className="text-foreground hover:text-primary transition-colors"
          >
            BR Stocks
          </Link>
          <Link
            href="/stocks/usa"
            className="text-foreground hover:text-primary transition-colors"
          >
            USA Stocks
          </Link>
          <Link
            href="/stocks/br-fii"
            className="text-foreground hover:text-primary transition-colors"
          >
            BR FII
          </Link>
          <Link
            href="/stocks/usa-reit"
            className="text-foreground hover:text-primary transition-colors"
          >
            USA REIT
          </Link>
        </nav>
      </header>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-foreground animate-fade-in-up">
            <span className="bg-gradient-to-r from-foreground via-primary to-primary/60 bg-clip-text text-transparent">
              Radar
            </span>
            <br />
            <span className="text-foreground">fundamentalista</span>
            <span className="block text-3xl md:text-4xl lg:text-5xl text-primary mt-6 font-normal">
              para ações e FIIs
            </span>
          </h1>

          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up animate-delay-100">
            Análise detalhada de valuation usando modelos consagrados: Bazin,
            Graham e Gordon. Identifique oportunidades antes que outros
            percebam.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 animate-fade-in-up animate-delay-200">
            <Link
              href="/stocks/br"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-display text-lg hover:bg-primary/90 transition-all"
            >
              Iniciar Análise
              <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <a
              href="#novidades"
              className="inline-flex items-center justify-center px-8 py-4 border border-border text-foreground font-body hover:border-primary hover:text-primary transition-colors"
            >
              Novidades
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 animate-fade-in-up animate-delay-300">
            <div className="bg-card/50 border border-border p-6 text-left hover:border-primary transition-all group hover:bg-card">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="font-mono text-sm text-primary font-bold">
                  01
                </span>
              </div>
              <h3 className="font-display text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                Método Bazin
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                Preço justo baseado em dividend yield histórico e taxa de
                retorno desejada.
              </p>
            </div>

            <div className="bg-card/50 border border-border p-6 text-left hover:border-primary transition-all group hover:bg-card">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="font-mono text-sm text-primary font-bold">
                  02
                </span>
              </div>
              <h3 className="font-display text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                Modelo Graham
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                Valor intrínseco calculado com LPA e VPA segundo fórmula
                clássica.
              </p>
            </div>

            <div className="bg-card/50 border border-border p-6 text-left hover:border-primary transition-all group hover:bg-card">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="font-mono text-sm text-primary font-bold">
                  03
                </span>
              </div>
              <h3 className="font-display text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                Modelo Gordon
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                Discounted dividend model projetando crescimento de dividendos.
              </p>
            </div>
          </div>
        </div>

        <div id="novidades" className="max-w-5xl mx-auto mt-32 w-full">
          <h2 className="font-display text-3xl md:text-4xl text-foreground text-center mb-4 animate-fade-in-up">
            Novidades
          </h2>
          <p className="font-body text-muted-foreground text-center mb-12 max-w-xl mx-auto animate-fade-in-up animate-delay-100">
            Novos mercados e ferramentas adicionados recentemente
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in-up animate-delay-200">
            <Link
              href="/stocks/br"
              className="bg-card border border-border p-6 hover:border-primary transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <Landmark className="w-5 h-5 text-emerald-500" />
                </div>
                <span className="font-mono text-xs text-emerald-500 tracking-wider">
                  ORIGINAL
                </span>
              </div>
              <h3 className="font-display text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                Ações Brasileiras
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                Análise fundamentalista completa com modelos Bazin, Graham e
                Gordon. Dados atualizados diariamente, ERP dinâmico e IPCA.
              </p>
            </Link>

            <Link
              href="/stocks/usa"
              className="bg-card border border-border p-6 hover:border-primary transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-blue-500" />
                </div>
                <span className="font-mono text-xs text-blue-500 tracking-wider">
                  NOVO
                </span>
              </div>
              <h3 className="font-display text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                Ações Americanas
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                Análise de stocks NASDAQ com indicadores adaptados para o
                mercado americano. Prêmio de risco fixo e taxa Bazin de 3%.
              </p>
            </Link>

            <Link
              href="/stocks/br-fii"
              className="bg-card border border-border p-6 hover:border-primary transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-amber-500" />
                </div>
                <span className="font-mono text-xs text-amber-500 tracking-wider">
                  NOVO
                </span>
              </div>
              <h3 className="font-display text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                Fundos Imobiliários
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                Análise de FIIs brasileiros com Tijolo (DCF) e Papel. Tesouro
                IPCA+ como referência e CAGR histórico.
              </p>
            </Link>

            <Link
              href="/stocks/usa-reit"
              className="bg-card border border-border p-6 hover:border-primary transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-indigo-500" />
                </div>
                <span className="font-mono text-xs text-indigo-500 tracking-wider">
                  NOVO
                </span>
              </div>
              <h3 className="font-display text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                REITs Americanos
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                Análise de REITs NASDAQ com métricas de FFO, taxa de
                distribuição e valuation. Prêmio de risco 6% e taxa Bazin de 3%.
              </p>
            </Link>
          </div>
        </div>

        <div
          id="como-funciona"
          className="max-w-5xl mx-auto mt-32 w-full animate-fade-in-up animate-delay-100"
        >
          <h2 className="font-display text-3xl md:text-4xl text-foreground text-center mb-12">
            Como funciona
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex gap-6 group">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <span className="font-mono text-lg text-primary font-bold">
                    01
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-xl text-foreground mb-2">
                    Dados atualizados diariamente
                  </h3>
                  <p className="font-body text-muted-foreground">
                    Coleta e recalcula indicadores de valuation diariamente.
                    Informações sempre atualizadas para sua análise.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <span className="font-mono text-lg text-primary font-bold">
                    02
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-xl text-foreground mb-2">
                    Enriquecimento automático
                  </h3>
                  <p className="font-body text-muted-foreground">
                    Dados complementares são capturados automaticamente para
                    melhorar a precisão dos cálculos.
                  </p>
                </div>
              </div>

              <div className="flex gap-6 group">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <span className="font-mono text-lg text-primary font-bold">
                    03
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-xl text-foreground mb-2">
                    Filtragem avançada
                  </h3>
                  <p className="font-body text-muted-foreground">
                    Aplique filtros por indicador, faixa de preço, setor e muito
                    mais. Encontre ativos subvalorizados em segundos.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card/50 border border-border rounded-lg p-4 shadow-2xl">
              <div className="font-mono text-xs text-muted-foreground mb-3 border-b border-border pb-2">
                PREVIEW · Tabela de Ações
              </div>
              <div className="space-y-2 font-mono text-sm">
                <div className="grid grid-cols-4 gap-2 text-muted-foreground text-xs pb-2 border-b border-border">
                  <span>TICKER</span>
                  <span>PREÇO</span>
                  <span>P/L</span>
                  <span>FAIR</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-foreground">
                  <span className="text-primary">PETR4</span>
                  <span>38,50</span>
                  <span className="text-green-500">5.2</span>
                  <span className="text-green-500">52,10</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-foreground">
                  <span className="text-primary">VALE3</span>
                  <span>68,20</span>
                  <span className="text-yellow-500">8.4</span>
                  <span className="text-yellow-500">71,30</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-foreground">
                  <span className="text-primary">ITUB4</span>
                  <span>31,80</span>
                  <span className="text-green-500">6.1</span>
                  <span className="text-green-500">44,20</span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-foreground">
                  <span className="text-primary">BBDC4</span>
                  <span>12,40</span>
                  <span className="text-red-500">12.8</span>
                  <span className="text-red-500">9,80</span>
                </div>
                <div className="text-xs text-muted-foreground mt-4 pt-2 border-t border-border">
                  <span className="text-muted-foreground">+</span> 4 mercados ·
                  Filtros por indicador
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-32 py-8 text-center border-t border-border w-full max-w-4xl">
          <div className="font-mono text-xs text-muted-foreground space-y-2">
            <p>
              ferramenta de apoio à decisão · não substitui análise profissional
            </p>
            <p className="pt-2">
              built by{" "}
              <a
                href="https://www.linkedin.com/in/renansmoliveira/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Renan Oliveira
              </a>{" "}
              ·{" "}
              <a
                href="https://github.com/lmaoclost/valuation-monitor"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80"
              >
                <Github className="w-4 h-4 inline" />
              </a>
              <span className="mx-2">·</span>
              <Link
                href="/privacidade"
                className="text-primary hover:underline"
              >
                Privacidade
              </Link>
            </p>
          </div>
        </footer>
      </main>

      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float animate-delay-200" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/5 rounded-full" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-primary/5 rounded-full" />
    </div>
  );
}
