"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from "@/components/ui/sheet";
import { LanguageToggle } from "@/components/LanguageToggle";

const NAV_LINKS = [
  { href: "/stocks/br", label: "BR Stocks" },
  { href: "/stocks/usa", label: "USA Stocks" },
  { href: "/stocks/br-fii", label: "BR FII" },
  { href: "/stocks/usa-reit", label: "USA REIT" },
] as const;

interface MobileNavProps {
  showBack?: boolean;
}

export function MobileNav({ showBack = false }: MobileNavProps) {
  const t = useTranslations("StocksLayout");

  const linkClass =
    "font-mono text-sm text-foreground hover:text-primary transition-colors";

  return (
    <>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <button className="text-foreground hover:text-primary transition-colors">
              <Menu className="size-5" />
              <span className="sr-only">Menu</span>
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] bg-background">
            <nav className="flex flex-col gap-6 mt-12">
              {NAV_LINKS.map((link) => (
                <SheetClose asChild key={link.href}>
                  <Link
                    href={link.href}
                    className="font-mono text-lg text-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </SheetClose>
              ))}
              {showBack && (
                <SheetClose asChild>
                  <Link
                    href="/"
                    className="font-mono text-lg text-muted-foreground hover:text-primary transition-colors"
                  >
                    {t("voltar")}
                  </Link>
                </SheetClose>
              )}
              <div className="pt-6 border-t border-border">
                <LanguageToggle />
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      <nav className="hidden md:flex items-center gap-4">
        {NAV_LINKS.map((link) => (
          <Link key={link.href} href={link.href} className={linkClass}>
            {link.label}
          </Link>
        ))}
        {showBack && (
          <Link
            href="/"
            className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            {t("voltar")}
          </Link>
        )}
        <LanguageToggle />
      </nav>
    </>
  );
}
