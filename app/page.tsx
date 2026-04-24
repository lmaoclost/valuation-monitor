import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="grain" />

      <header className="absolute top-0 left-0 right-0 z-50 px-8 py-6 flex justify-between items-center">
        <div className="font-display text-xl tracking-widest text-foreground">
          VALUATION MONITOR
        </div>
        <Link
          href="/br-stocks"
          className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          Acessar →
        </Link>
      </header>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-tight text-foreground animate-fade-in-up">
            Radar fundamentalista
            <span className="block text-primary mt-4">
              para ações brasileiras
            </span>
          </h1>

          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up animate-delay-100">
            Análise detalhada de valuation usando modelos consagrados: Bazin,
            Graham e Gordon. Identifique oportunidades antes que outros
 percebam.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 animate-fade-in-up animate-delay-200">
            <div className="bg-card border border-border p-6 text-left hover:border-primary transition-colors group">
              <div className="font-mono text-xs text-primary mb-2">01</div>
              <h3 className="font-display text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                Método Bazin
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                Preço justo baseado em dividend yield histórico e taxa de
                retorno desejada.
              </p>
            </div>

            <div className="bg-card border border-border p-6 text-left hover:border-primary transition-colors group">
              <div className="font-mono text-xs text-primary mb-2">02</div>
              <h3 className="font-display text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                Modelo Graham
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                Valor intrínseco calculado com LPA e VPA segundo fórmula
                clássica.
              </p>
            </div>

            <div className="bg-card border border-border p-6 text-left hover:border-primary transition-colors group">
              <div className="font-mono text-xs text-primary mb-2">03</div>
              <h3 className="font-display text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                Modelo Gordon
              </h3>
              <p className="font-body text-sm text-muted-foreground">
                Discounted dividend model projetando crescimento de dividendos.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 animate-fade-in-up animate-delay-300">
            <Link
              href="/br-stocks"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-display text-lg hover:bg-primary/90 transition-colors"
            >
              Iniciar Análise
            </Link>
            <a
              href="#como-funciona"
              className="inline-flex items-center justify-center px-8 py-4 border border-border text-foreground font-body hover:border-primary hover:text-primary transition-colors"
            >
              Como funciona
            </a>
          </div>
        </div>

        <div
          id="como-funciona"
          className="max-w-5xl mx-auto mt-32 w-full animate-fade-in-up animate-delay-400"
        >
          <h2 className="font-display text-3xl md:text-4xl text-foreground text-center mb-12">
            Como funciona
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="font-mono text-2xl text-primary shrink-0 w-8">
                  01
                </div>
                <div>
                  <h3 className="font-display text-xl text-foreground mb-2">
                    Dados atualizados daily
                  </h3>
                  <p className="font-body text-muted-foreground">
                    Coleta e recalcula indicadores valuation diariamente.
                    Informações sempre atualizadas para sua análise.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="font-mono text-2xl text-primary shrink-0 w-8">
                  02
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

              <div className="flex gap-6">
                <div className="font-mono text-2xl text-primary shrink-0 w-8">
                  03
                </div>
                <div>
                  <h3 className="font-display text-xl text-foreground mb-2">
                    Filtragem avançada
                  </h3>
                  <p className="font-body text-muted-foreground">
                    Aplique filtros por setor, indicador, faixa de preço e muito
                    mais. Encontre ações subvalorizadas em segundos.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-4 shadow-2xl">
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
                  <span className="text-muted-foreground">+</span> 243
                  ações · Filtros ativos: P/L &lt; 10
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-32 py-8 text-center border-t border-border w-full max-w-4xl">
          <p className="font-mono text-xs text-muted-foreground">
            ferramenta de apoio à decisão · não substitui análise profissional
          </p>
        </footer>
      </main>

      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float animate-delay-200" />
    </div>
  );
}