import Link from "next/link";
import { kategorien, type Kategorie } from "@/data/gegenstaende";

type Props = {
  aktiv: Kategorie | null;
};

const basis =
  "inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium transition";
const inaktiv = "border-border bg-card text-foreground hover:bg-accent-soft";
const aktivKlasse = "border-accent bg-accent-soft text-foreground";

export default function KategorieFilter({ aktiv }: Props) {
  return (
    <nav aria-label="Nach Kategorie filtern" className="mb-6">
      <ul className="flex flex-wrap gap-2">
        <li>
          <Link
            href="/#gegenstaende"
            scroll={false}
            aria-current={aktiv === null ? "true" : undefined}
            className={`${basis} ${aktiv === null ? aktivKlasse : inaktiv}`}
          >
            Alle
          </Link>
        </li>
        {kategorien.map((kategorie) => (
          <li key={kategorie}>
            <Link
              href={`/?${new URLSearchParams({ kategorie })}#gegenstaende`}
              scroll={false}
              aria-current={aktiv === kategorie ? "true" : undefined}
              className={`${basis} ${aktiv === kategorie ? aktivKlasse : inaktiv}`}
            >
              {kategorie}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
