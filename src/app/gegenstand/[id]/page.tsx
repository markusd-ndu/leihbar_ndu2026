import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { gegenstaende } from "@/data/gegenstaende";
import { preisText } from "@/lib/format";

type Props = {
  params: Promise<{ id: string }>;
};

async function ladeGegenstand(params: Props["params"]) {
  const { id } = await params;
  return gegenstaende.find((gegenstand) => gegenstand.id === id);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const gegenstand = await ladeGegenstand(params);
  return { title: gegenstand ? gegenstand.titel : "Nicht gefunden" };
}

export default async function GegenstandSeite({ params }: Props) {
  const gegenstand = await ladeGegenstand(params);
  if (!gegenstand) notFound();

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
      <Link
        href="/#gegenstaende"
        className="mb-6 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted hover:text-foreground"
      >
        <ArrowLeft size={18} />
        Zurück zur Liste
      </Link>

      <article className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="relative aspect-[4/3] w-full bg-accent-soft">
          <Image
            src={gegenstand.bild}
            alt={gegenstand.titel}
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
            priority
          />
        </div>
        <div className="space-y-4 p-6">
          <p className="text-sm text-muted">{gegenstand.kategorie}</p>
          <h1 className="text-3xl font-bold leading-tight">{gegenstand.titel}</h1>
          {!gegenstand.verfuegbar && (
            <p className="rounded-xl bg-accent-soft px-4 py-2 text-sm">
              Dieser Gegenstand ist gerade verliehen.
            </p>
          )}
          <p className="text-xl font-semibold">{preisText(gegenstand.preisProTag)}</p>
          <p className="leading-relaxed">{gegenstand.beschreibung}</p>
          <dl className="space-y-1 border-t border-border pt-4 text-sm text-muted">
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
    </main>
  );
}
