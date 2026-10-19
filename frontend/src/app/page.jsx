'use client';
import Link from "next/link";

/* Same colors as the gallery page:
   ink #0F1720 | paper #F7F5F0 | panel #1E293B | accent #2F8F6B | line #2C3A4A */

const features = [
  {
    title: "Live previews",
    text: "See every component rendered before you pick it.",
  },
  {
    title: "Copy the source",
    text: "Clean Tailwind code you can paste into your project.",
  },
  {
    title: "Save your own",
    text: "Write a component and keep it in your library.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0F1720] text-[#F7F5F0]">
      <main>
        {/* hero */}
        <section className="mx-auto max-w-5xl px-6 py-20 text-center sm:py-28">
          <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
            A small kit of Tailwind components, and a place to write your own.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base text-[#F7F5F0]/60 sm:text-lg">
            Browse ready-made buttons, cards, forms, and modals, or create and save your
            own components in one place.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              href="/browse"
              className="rounded-md bg-[#2F8F6B] px-6 py-3 text-sm font-semibold text-[#0F1720] transition hover:opacity-90"
            >
              Browse components
            </Link>
            <Link
              href="/create"
              className="rounded-md border border-[#2C3A4A] px-6 py-3 text-sm transition hover:border-[#2F8F6B]"
            >
              Create component
            </Link>
          </div>
        </section>

        {/* a few details */}
        <section className="border-t border-[#2C3A4A] bg-[#1E293B]/40">
          <div className="mx-auto grid max-w-5xl gap-8 px-6 py-14 sm:grid-cols-3">
            {features.map((f) => (
              <div key={f.title}>
                <h3 className="text-base font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-[#F7F5F0]/60">{f.text}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}