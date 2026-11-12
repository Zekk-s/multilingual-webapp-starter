import { getTranslations, setRequestLocale } from "next-intl/server";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { RepoPicks } from "@/components/RepoPicks";
import { ServiceIndex } from "@/components/ServiceIndex";
import { serviceIds, serviceStatus, type PickId } from "@/lib/catalog";
import { locales, type Locale } from "@/i18n";

export async function generateMetadata({ params }: { params: { locale: string } }) {
  if (!locales.includes(params.locale as Locale)) return {};
  setRequestLocale(params.locale);
  const t = await getTranslations({ locale: params.locale, namespace: "meta" });
  return { title: t("title"), description: t("description") };
}

export default async function HomePage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale);
  const nav = await getTranslations("nav");
  const desk = await getTranslations("desk");
  const path = await getTranslations("path");
  const index = await getTranslations("index");
  const svc = await getTranslations("svc");
  const status = await getTranslations("status");
  const picks = await getTranslations("picks");
  const pick = await getTranslations("pick");
  const foot = await getTranslations("foot");

  const rows = serviceIds.map((id, position) => ({
    id,
    index: String(position + 1).padStart(2, "0"),
    name: svc(`${id}.name`),
    summary: svc(`${id}.summary`),
    statusLabel: status(serviceStatus[id]),
    tone: serviceStatus[id],
  }));

  const why = {
    nextIntl: pick("nextIntl.why"),
    mcpServers: pick("mcpServers.why"),
    context7: pick("context7.why"),
    githubMcp: pick("githubMcp.why"),
    shadcn: pick("shadcn.why"),
  } satisfies Record<PickId, string>;

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
            <a href="#repos">{nav("repos")}</a>
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
        <RepoPicks
          locale={params.locale}
          copy={{
            kicker: picks("kicker"),
            title: picks("title"),
            intro: picks("intro"),
            stars: picks("stars"),
            inRepo: picks("inRepo"),
            notInstalled: picks("notInstalled"),
            why,
          }}
        />
      </main>
      <footer className="wrap foot">
        <p>{foot("license")}</p>
        <p>{foot("limits")}</p>
      </footer>
    </>
  );
}
