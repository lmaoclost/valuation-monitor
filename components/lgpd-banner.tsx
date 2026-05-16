"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

const STORAGE_KEY = "lgpd-consent";

export function LgpdBanner() {
  const [dismissed, setDismissed] = useState(true);
  const t = useTranslations("Lgpd");

  useEffect(() => {
    setDismissed(localStorage.getItem(STORAGE_KEY) === "true");
  }, []);

  if (dismissed) return null;

  function handleDismiss() {
    localStorage.setItem(STORAGE_KEY, "true");
    setDismissed(true);
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card p-4 shadow-lg">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          {t("message")}{" "}
          <Link
            href="/privacidade"
            className="text-primary underline underline-offset-4 hover:text-primary/80"
          >
            {t("privacyLink")}
          </Link>
        </p>
        <Button variant="outline" size="sm" onClick={handleDismiss}>
          {t("dismiss")}
        </Button>
      </div>
    </div>
  );
}
