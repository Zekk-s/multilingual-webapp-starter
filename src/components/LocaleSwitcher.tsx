"use client";

import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { locales, type Locale } from "@/i18n";

export function LocaleSwitcher() {
  const t = useTranslations("switcher");
  const router = useRouter();
  const pathname = usePathname() ?? "/en";
  const current = (pathname.split("/")[1] ?? "en") as Locale;

  return (
    <nav className="switcher" aria-label={t("label")}>
      {locales.map((locale) => (
        <button
          key={locale}
          type="button"
          aria-current={locale === current ? "page" : undefined}
          onClick={() => router.push(`/${locale}${pathname.replace(/^\/[^/]+/, "")}`)}
        >
          {locale}
        </button>
      ))}
    </nav>
  );
}
