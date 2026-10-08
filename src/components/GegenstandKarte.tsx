import Image from "next/image";
import Link from "next/link";
import type { Gegenstand } from "@/data/gegenstaende";
import { preisText } from "@/lib/format";

type Props = {
  gegenstand: Gegenstand;
  erstesBild?: boolean;
};

export default function GegenstandKarte({ gegenstand, erstesBild = false }: Props) {
  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <div className="relative aspect-[4/3] w-full bg-accent-soft">
        {/* Alt-Text leer: Der Titel steht direkt daneben. */}
        <Image
          src={gegenstand.bild}
          alt=""
          fill
          sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 100vw"
          className="object-cover"
          priority={erstesBild}
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-sm text-muted">{gegenstand.kategorie}</p>
        <h3 className="text-lg font-semibold leading-snug">
          {/* Der Link spannt über die ganze Karte, damit sie überall antippbar ist. */}
          <Link
            href={`/gegenstand/${gegenstand.id}`}
            className="after:absolute after:inset-0 after:content-['']"
          >
            {gegenstand.titel}
          </Link>
        </h3>
        <p className="font-medium">{preisText(gegenstand.preisProTag)}</p>
        <dl className="mt-auto space-y-1 pt-2 text-sm text-muted">
          <div className="flex gap-1">
            <dt>Ort:</dt>
            <dd>{gegenstand.ort}</dd>
          </div>
          <div className="flex gap-1">
            <dt>Verleiht:</dt>
            <dd>{gegenstand.besitzer}</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}
