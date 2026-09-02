"use client";
import { useRouter, usePathname } from "next/navigation";
import { locales, type Locale } from "@/i18n";

export function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const current = (pathname.split("/")[1] ?? "en") as Locale;

  return (
    <nav style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => router.push(`/${l}${pathname.replace(/^\/[^/]+/, "")}`)}
          aria-current={l === current ? "page" : undefined}
          style={{
            padding: "0.25rem 0.75rem",
            border: "1px solid #d0d7de",
            borderRadius: 4,
            background: l === current ? "#6f42c1" : "white",
            color: l === current ? "white" : "#1f2328",
            cursor: "pointer",
          }}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </nav>
  );
}