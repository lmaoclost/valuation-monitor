"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export function BackLink() {
  const t = useTranslations("StocksLayout");
  return (
    <Link
      href="/"
      className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
    >
      {t("voltar")}
    </Link>
  );
}
