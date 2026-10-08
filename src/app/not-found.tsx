import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Nicht gefunden" };

export default function NotFound() {
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-start px-4 py-12">
      <h1 className="mb-3 text-3xl font-bold">Diese Seite gibt es nicht.</h1>
      <p className="mb-6 text-muted">
        Den Gegenstand oder die Seite, die du suchst, haben wir nicht gefunden.
        Vielleicht ist die Adresse falsch oder der Gegenstand wurde entfernt.
      </p>
      <Link
        href="/#gegenstaende"
        className="inline-flex min-h-11 items-center rounded-xl bg-accent px-5 font-medium text-white shadow-sm transition hover:opacity-90"
      >
        Zurück zur Liste
      </Link>
    </main>
  );
}
