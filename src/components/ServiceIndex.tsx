import type { Status } from "@/lib/catalog";

type Row = {
  id: string;
  index: string;
  name: string;
  summary: string;
  statusLabel: string;
  tone: Status;
};

export function ServiceIndex({
  kicker,
  title,
  intro,
  rows,
}: {
  kicker: string;
  title: string;
  intro: string;
  rows: Row[];
}) {
  return (
    <section className="block" id="service" aria-labelledby="service-title">
      <p className="kicker">{kicker}</p>
      <h2 id="service-title">{title}</h2>
      <p className="intro">{intro}</p>
      <ol className="rows">
        {rows.map((row) => (
          <li className="row" key={row.id}>
            <span className="idx">{row.index}</span>
            <div>
              <h3>{row.name}</h3>
              <p>{row.summary}</p>
            </div>
            <p className="status" data-tone={row.tone}>
              {row.statusLabel}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
