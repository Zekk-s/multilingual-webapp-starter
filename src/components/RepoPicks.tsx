import { picks, type PickId } from "@/lib/catalog";

type Copy = {
  kicker: string;
  title: string;
  intro: string;
  stars: string;
  inRepo: string;
  notInstalled: string;
  why: Record<PickId, string>;
};

export function RepoPicks({ copy, locale }: { copy: Copy; locale: string }) {
  const stars = new Intl.NumberFormat(locale).format.bind(new Intl.NumberFormat(locale));

  return (
    <section className="block" id="repos" aria-labelledby="repos-title">
      <p className="kicker">{copy.kicker}</p>
      <h2 id="repos-title">{copy.title}</h2>
      <p className="intro">{copy.intro}</p>
      <ol className="repos">
        {picks.map((pick, index) => (
          <li className="repo" key={pick.id}>
            <span className="idx">{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3>
                <a href={pick.href}>{pick.repo}</a>
              </h3>
              <p className="meta">
                <span className="mono">
                  {stars(pick.stars)} {copy.stars}
                </span>
                <span className={pick.inRepo ? "flag on" : "flag off"}>
                  {pick.inRepo ? copy.inRepo : copy.notInstalled}
                </span>
              </p>
              <p>{copy.why[pick.id]}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
