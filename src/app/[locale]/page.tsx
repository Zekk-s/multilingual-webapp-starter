import { useTranslations } from "next-intl";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";

export default function HomePage() {
  const t = useTranslations("home");
  return (
    <main>
      <LocaleSwitcher />
      <h1>{t("title")}</h1>
      <p>{t("subtitle")}</p>
      <p style={{ color: "#6e7781", fontSize: "0.9rem" }}>{t("footnote")}</p>
    </main>
  );
}