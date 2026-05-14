import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <Link
          href="/"
          className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          &larr; Voltar
        </Link>

        <h1 className="mt-8 font-display text-4xl text-foreground">
          Política de Privacidade
        </h1>
        <p className="mt-2 font-body text-sm text-muted-foreground">
          Última atualização: maio de 2026
        </p>

        <div className="mt-12 space-y-8 font-body text-foreground">
          <section>
            <h2 className="font-display text-xl mb-3">1. Controlador</h2>
            <p className="text-muted-foreground leading-relaxed">
              O Valuation Monitor é uma ferramenta de análise fundamentalista
              mantida por Renan Oliveira. Para questões relacionadas a esta
              política, contate via LinkedIn
              (https://www.linkedin.com/in/renansmoliveira/).
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl mb-3">
              2. Dados Coletados
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Este site <strong>não coleta dados pessoais</strong> dos
              usuários. Não solicitamos nome, e-mail, CPF, endereço, telefone
              ou qualquer informação pessoal identificável.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-2">
              O site processa exclusivamente dados financeiros públicos
              provenientes de terceiros (StatusInvest, FGV, IBGE) para fins de
              exibição de indicadores de valuation.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl mb-3">
              3. Cookies e Tecnologias de Rastreamento
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Este site <strong>não utiliza cookies</strong>, nem qualquer
              tecnologia de rastreamento (web beacons, pixels, fingerprinting,
              analytics). O único dado de infraestrutura processado é o
              endereço IP, utilizado exclusivamente para controle de taxa de
              requisições (rate limiting) e armazenado de forma anonimizada
              (hash SHA-256 com sal diário) por até 60 segundos.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl mb-3">
              4. Finalidade do Tratamento
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Os dados processados têm como única finalidade exibir cálculos
              de valuation (Bazin, Graham, Gordon) para ações brasileiras,
              americanas, FIIs e REITs. Não há tomada de decisão automatizada
              baseada em perfis de usuários.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl mb-3">
              5. Compartilhamento com Terceiros
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Não compartilhamos dados pessoais com terceiros. Dados
              financeiros exibidos são obtidos diretamente de fontes públicas
              (StatusInvest, FGV, IBGE) via suas APIs públicas e páginas web.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl mb-3">
              6. Direitos do Titular (LGPD Art. 18)
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              A Lei Geral de Proteção de Dados (Lei 13.709/2018) garante a
              você os direitos de confirmar a existência de tratamento,
              acessar dados, corrigir dados incompletos, anonimizar, bloquear
              ou eliminar dados desnecessários, e revogar o consentimento.
              Como não armazenamos dados pessoais, estes direitos são
              automaticamente satisfeitos pela ausência de coleta. Para
              qualquer questão, entre em contato pelo LinkedIn do
              controlador.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl mb-3">
              7. Medidas de Segurança
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Adotamos as seguintes medidas técnicas: hashing de endereços IP
              antes do armazenamento em memória, TTL automático de 60s para
              dados de rate limiting, e sanitização de logs de erro para
              remoção de dados pessoais. A aplicação é servida exclusivamente
              via HTTPS.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl mb-3">
              8. Alterações nesta Política
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Esta política pode ser atualizada periodicamente. A data da
              última atualização está indicada no topo da página.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
