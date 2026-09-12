"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { LanguageToggle } from "@/components/LanguageToggle";
import type { OpenApiSpec } from "@/lib/openapi";

export const DEFAULT_BASE_URL = "https://valuation-monitor.vercel.app";

function exampleFor(path: string, base: string): string {
  const query =
    path === "/api/fetch-fii/tijolo"
      ? "fairPrice.gte=150&dy.gte=0.06"
      : path.startsWith("/api/fetch-fii")
        ? "dy.gte=0.06&price.lte=150"
        : "bazinDiscount.gte=0.3&grahamDiscount.gte=0";
  return `curl -H "x-app-secret: $PRIVATE_API_SECRET" \\\n  "${base}${path}?${query}"`;
}

const CODE_BLOCK =
  "mt-2 overflow-x-auto rounded bg-zinc-900 p-3 font-mono text-xs whitespace-pre-wrap break-all text-zinc-100";

export function DocsContent({
  spec,
  baseUrl,
}: {
  spec: OpenApiSpec;
  baseUrl: string;
}) {
  const t = useTranslations("Docs");
  const s = useTranslations("StocksLayout");
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-6 py-20">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            {s("voltar")}
          </Link>
          <LanguageToggle />
        </div>

        <h1 className="mt-8 font-display text-4xl text-foreground">
          {t("title")}
        </h1>
        <p className="mt-2 font-body text-sm text-muted-foreground">
          {t("subtitle")}
        </p>

        <div className="mt-12 space-y-8 font-body text-foreground">
          <section>
            <h2 className="font-display text-xl mb-3">{t("authTitle")}</h2>
            <p className="text-muted-foreground leading-relaxed text-sm">
              {t("authA")} <code>x-app-secret</code> {t("authB")}{" "}
              <a href="/api/openapi" className="underline">
                /api/openapi
              </a>{" "}
              {t("authC")}
            </p>
            <pre className={CODE_BLOCK}>
              {`curl -H "x-app-secret: $PRIVATE_API_SECRET" \\\n  "${baseUrl}/api/fetch-stocks?bazinDiscount.gte=0.3"`}
            </pre>
          </section>

          <section>
            <h2 className="font-display text-xl mb-3">{t("syntaxTitle")}</h2>
            <ul className="mt-1 list-disc pl-5 text-sm text-muted-foreground leading-relaxed">
              <li>
                {t("b1a")} <code>&lt;column&gt;</code> {t("b1b")}{" "}
                <code>&lt;column&gt;.&lt;op&gt;</code> {t("b1c")}{" "}
                <code>eq ne contains gte lte gt lt in</code>.
              </li>
              <li>
                {t("b2a")} <code>gte</code> (<code>?bazinDiscount=0.3</code>);{" "}
                {t("b2b")} <code>eq</code>.
              </li>
              <li>
                {t("b3a")}
                <code>0.3</code> {t("b3b")}
                <code>30%</code>
                {t("b3c")} <code>30</code> {t("b3d")}
              </li>
              <li>
                <code>in</code> {t("b4a")} <code>?ticker.in=PETR4,VALE3</code>
                {t("b4b")} <code>contains</code> {t("b4c")}
              </li>
              <li>{t("b5")}</li>
              <li>{t("b6")}</li>
            </ul>
          </section>

          {Object.entries(spec.paths).map(([path, item]) => (
            <section key={path} className="border-t pt-4">
              <h3 className="font-mono text-sm font-semibold">
                GET {path}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {item.get.description}
              </p>
              <pre className={CODE_BLOCK}>{exampleFor(path, baseUrl)}</pre>
              <details className="mt-2">
                <summary className="cursor-pointer text-sm underline">
                  {t("params")} ({item.get.parameters.length})
                </summary>
                <table className="mt-2 w-full text-left text-xs text-muted-foreground">
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
        </div>
      </div>
    </div>
  );
}
