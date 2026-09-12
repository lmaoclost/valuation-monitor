import type { OpenApiSpec } from "@/lib/openapi";

function exampleFor(path: string): string {
  const base = "https://valuation-monitor.vercel.app";
  const query =
    path === "/api/fetch-fii/tijolo"
      ? "fairPrice.gte=150&dy.gte=0.06"
      : path.startsWith("/api/fetch-fii")
        ? "dy.gte=0.06&price.lte=150"
        : "bazinDiscount.gte=0.3&grahamDiscount.gte=0";
  return `curl -H "x-app-secret: $PRIVATE_API_SECRET" "${base}${path}?${query}"`;
}

export function DocsContent({ spec }: { spec: OpenApiSpec }) {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 font-body">
      <h1 className="font-display text-2xl">API Docs</h1>
      <p className="mt-2 text-sm">
        Filterable valuation tables. Tabelas de valuation com filtros por
        coluna.
      </p>

      <h2 className="font-display mt-6 text-lg">Auth / Autenticação</h2>
      <p className="mt-1 text-sm">
        All endpoints require the <code>x-app-secret</code> header with your
        private secret. Todos os endpoints exigem o header{" "}
        <code>x-app-secret</code>. Raw spec: <a href="/api/openapi">/api/openapi</a>{" "}
        (public, no secret needed).
      </p>
      <pre className="mt-2 overflow-x-auto rounded bg-zinc-100 p-3 font-mono text-xs">
        curl -H &quot;x-app-secret: $PRIVATE_API_SECRET&quot;
        https://valuation-monitor.vercel.app/api/fetch-stocks?bazinDiscount.gte=0.3
      </pre>

      <h2 className="font-display mt-6 text-lg">Filter syntax / Sintaxe</h2>
      <ul className="mt-1 list-disc pl-5 text-sm">
        <li>
          <code>&lt;column&gt;</code> or <code>&lt;column&gt;.&lt;op&gt;</code>{" "}
          with ops <code>eq ne contains gte lte gt lt in</code>.
        </li>
        <li>
          Bare numeric value means <code>gte</code> (
          <code>?bazinDiscount=0.3</code>); bare string means <code>eq</code>.
        </li>
        <li>
          Numbers accept raw fractions (<code>0.3</code>) or percent (
          <code>30%</code>). Plain <code>30</code> means thirty, not 30%.
        </li>
        <li>
          <code>in</code> takes comma-separated values (
          <code>?ticker.in=PETR4,VALE3</code>). <code>contains</code> is
          case-insensitive, string columns only.
        </li>
        <li>
          Multiple filters combine with AND. Empty cells never match numeric
          filters. Unknown column or bad value returns{" "}
          <code>400 {"{error, allowedColumns}"}</code>.
        </li>
        <li>
          <code>?sort=&lt;column&gt;:asc|desc</code> and{" "}
          <code>?limit=&lt;n&gt;</code> (1–10000) also supported.
        </li>
      </ul>

      {Object.entries(spec.paths).map(([path, item]) => (
        <section key={path} className="mt-6 border-t pt-4">
          <h3 className="font-mono text-sm font-semibold">GET {path}</h3>
          <p className="mt-1 text-sm">{item.get.description}</p>
          <pre className="mt-2 overflow-x-auto rounded bg-zinc-100 p-3 font-mono text-xs">
            {exampleFor(path)}
          </pre>
          <details className="mt-2">
            <summary className="cursor-pointer text-sm underline">
              Columns / Colunas ({item.get.parameters.length - 2})
            </summary>
            <table className="mt-2 w-full text-left text-xs">
              <thead>
                <tr>
                  <th className="pr-2">Parameter</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {item.get.parameters.map((p) => (
                  <tr key={p.name} className="border-t">
                    <td className="pr-2 font-mono">{p.name}</td>
                    <td>{p.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </details>
        </section>
      ))}
    </main>
  );
}
