import { getTranslations, setRequestLocale } from "next-intl/server";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { ServiceIndex } from "@/components/ServiceIndex";
import { serviceIds, serviceStatus } from "@/lib/catalog";
import { locales, type Locale } from "@/i18n";

export async function generateMetadata({ params }: { params: { locale: string } }) {
  if (!locales.includes(params.locale as Locale)) return {};
  setRequestLocale(params.locale);
  const t = await getTranslations({ locale: params.locale, namespace: "meta" });
  const title = t("title");
  const description = t("description");
  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function HomePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const nav = await getTranslations("nav");
  const desk = await getTranslations("desk");
  const path = await getTranslations("path");
  const index = await getTranslations("index");
  const svc = await getTranslations("svc");
  const status = await getTranslations("status");
  const foot = await getTranslations("foot");

  const rows = serviceIds.map((id, position) => ({
    id,
    index: String(position + 1).padStart(2, "0"),
    name: svc(`${id}.name`),
    summary: svc(`${id}.summary`),
    statusLabel: status(serviceStatus[id]),
    tone: serviceStatus[id],
  }));

  const steps = [
    ["01", path("request")],
    ["02", path("middleware")],
    ["03", path("locale")],
    ["04", path("messages")],
    ["05", path("html")],
  ] as const;

  return (
    <>
      <header className="top">
        <div className="wrap mast">
          <a className="word" href={`/${params.locale}`}>
            <small>{nav("home")}</small>
            <strong>multilingual-webapp-starter</strong>
          </a>
          <nav className="jump" aria-label={nav("sections")}>
            <a href="#service">{nav("service")}</a>
          </nav>
          <LocaleSwitcher />
        </div>
      </header>
      <main className="wrap">
        <section className="hero">
          <div>
            <p className="kicker">{desk("kicker")}</p>
            <h1>{desk("title")}</h1>
            <p className="lede">{desk("lede")}</p>
            <p className="run">{desk("run")}</p>
          </div>
          <div>
            <p className="kicker">{path("label")}</p>
            <ol className="path">
              {steps.map(([n, label]) => (
                <li key={n}>
                  <span>{n}</span>
                  {label}
                </li>
              ))}
            </ol>
          </div>
        </section>
        <ServiceIndex
          kicker={index("kicker")}
          title={index("title")}
          intro={index("intro")}
          rows={rows}
        />
      </main>
      <footer className="wrap foot">
        <p>{foot("license")}</p>
        <p>{foot("limits")}</p>
      </footer>
    </>
  );
}
