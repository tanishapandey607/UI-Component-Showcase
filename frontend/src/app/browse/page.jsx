
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import PreviewCustom from "@/components/PreviewCustom";

/* ---------- Built-in component previews ---------- */

const items = [
  {
    name: "Primary button",
    slug: "buttons",
    Preview: () => (
      <button className="rounded-md bg-[#2F8F6B] px-3 py-1.5 text-xs font-semibold text-[#0F1720]">
        Save changes
      </button>
    ),
  },
  {
    name: "Ghost button",
    slug: "buttons",
    Preview: () => (
      <button className="rounded-md border border-[#2C3A4A] px-3 py-1.5 text-xs text-[#F7F5F0]/80">
        Cancel
      </button>
    ),
  },
  {
    name: "Danger button",
    slug: "buttons",
    Preview: () => (
      <button className="rounded-md bg-red-500/90 px-3 py-1.5 text-xs font-semibold text-[#0F1720]">
        Delete
      </button>
    ),
  },
  {
    name: "Loading button",
    slug: "buttons",
    Preview: () => (
      <button className="flex items-center gap-2 rounded-md bg-[#2F8F6B]/60 px-3 py-1.5 text-xs font-semibold text-[#0F1720]/70">
        <span className="h-2.5 w-2.5 animate-spin rounded-full border-2 border-[#0F1720]/40 border-t-[#0F1720]" />
        Deploying
      </button>
    ),
  },
  {
    name: "Stat card",
    slug: "cards",
    Preview: () => (
      <div className="w-32 rounded-md border border-[#2C3A4A] bg-[#1E293B] p-3">
        <p className="font-mono text-[9px] uppercase text-[#F7F5F0]/50">
          Deploys
        </p>
        <p className="text-xl font-bold text-[#F7F5F0]">128</p>
        <p className="text-[10px] text-[#2F8F6B]">+12%</p>
      </div>
    ),
  },
  {
    name: "Profile card",
    slug: "cards",
    Preview: () => (
      <div className="flex items-center gap-2 rounded-md border border-[#2C3A4A] bg-[#1E293B] p-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#DCF0E7] font-mono text-[10px] font-semibold text-[#0F1720]">
          RS
        </div>
        <div>
          <p className="text-xs font-semibold text-[#F7F5F0]">
            Riya Sharma
          </p>
          <p className="text-[10px] text-[#F7F5F0]/50">
            Engineer
          </p>
        </div>
      </div>
    ),
  },
  {
    name: "Pricing card",
    slug: "cards",
    Preview: () => (
      <div className="w-28 rounded-md border border-[#2F8F6B]/60 bg-[#1E293B] p-3">
        <p className="font-mono text-[9px] uppercase text-[#2F8F6B]">
          Pro
        </p>
        <p className="text-lg font-bold text-[#F7F5F0]">$19</p>
        <div className="mt-2 rounded bg-[#2F8F6B] py-1 text-center text-[10px] font-semibold text-[#0F1720]">
          Upgrade
        </div>
      </div>
    ),
  },
  {
    name: "Text field",
    slug: "forms",
    Preview: () => (
      <div className="w-36">
        <p className="mb-1 text-[10px] text-[#F7F5F0]/60">
          Project name
        </p>
        <div className="rounded-md border border-[#2C3A4A] bg-[#0F1720] px-2 py-1.5 text-[11px] text-[#F7F5F0]/30">
          checkout-service
        </div>
      </div>
    ),
  },
  {
    name: "Toggle switch",
    slug: "forms",
    Preview: () => (
      <div className="flex items-center gap-3">
        <span className="text-[11px] text-[#F7F5F0]/80">
          Auto-deploy
        </span>
        <span className="inline-flex h-5 w-9 items-center rounded-full bg-[#2F8F6B]/70">
          <span className="ml-4 h-4 w-4 rounded-full bg-[#F7F5F0]" />
        </span>
      </div>
    ),
  },
  {
    name: "Checkbox",
    slug: "forms",
    Preview: () => (
      <label className="flex items-center gap-2 text-[11px] text-[#F7F5F0]/80">
        <input
          type="checkbox"
          defaultChecked
          className="accent-emerald-500"
        />
        Notify me
      </label>
    ),
  },
  {
    name: "Success alert",
    slug: "alerts",
    Preview: () => (
      <div className="w-44 rounded-md border border-[#2F8F6B]/40 bg-[#DCF0E7]/10 px-3 py-2 text-[11px] text-[#2F8F6B]">
        Build passed in 42s.
      </div>
    ),
  },
  {
    name: "Warning alert",
    slug: "alerts",
    Preview: () => (
      <div className="w-44 rounded-md border border-[#E2B93B]/40 bg-[#E2B93B]/10 px-3 py-2 text-[11px] text-[#E2B93B]">
        API key expires soon.
      </div>
    ),
  },
  {
    name: "Error alert",
    slug: "alerts",
    Preview: () => (
      <div className="w-44 rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-[11px] text-red-400">
        Build failed.
      </div>
    ),
  },
  {
    name: "Badge",
    slug: "alerts",
    Preview: () => (
      <span className="rounded-full border border-[#2F8F6B]/40 bg-[#DCF0E7]/10 px-3 py-1 font-mono text-[10px] text-[#2F8F6B]">
        Beta
      </span>
    ),
  },
  {
    name: "Navbar",
    slug: "navigation",
    Preview: () => (
      <div className="flex w-48 items-center justify-between rounded-md border border-[#2C3A4A] bg-[#1E293B] px-3 py-2">
        <span className="font-mono text-[10px] font-semibold text-[#F7F5F0]">
          kit.dev
        </span>
        <span className="text-[10px] text-[#F7F5F0]/50">
          Docs
        </span>
        <span className="h-4 w-4 rounded-full bg-[#DCF0E7]" />
      </div>
    ),
  },
  {
    name: "Tab bar",
    slug: "navigation",
    Preview: () => (
      <div className="flex w-44 gap-4 border-b border-[#2C3A4A] text-[11px]">
        <span className="border-b-2 border-[#2F8F6B] pb-1 text-[#F7F5F0]">
          Preview
        </span>
        <span className="pb-1 text-[#F7F5F0]/50">Code</span>
      </div>
    ),
  },
  {
    name: "Confirm modal",
    slug: "modals",
    Preview: () => (
      <div className="w-44 rounded-md border border-[#2C3A4A] bg-[#1E293B] p-3 shadow-lg">
        <p className="text-[11px] font-semibold text-[#F7F5F0]">
          Delete deployment?
        </p>
        <div className="mt-2 flex justify-end gap-1">
          <span className="rounded border border-[#2C3A4A] px-2 py-0.5 text-[9px] text-[#F7F5F0]/70">
            Cancel
          </span>
          <span className="rounded bg-red-500/90 px-2 py-0.5 text-[9px] font-semibold text-[#0F1720]">
            Delete
          </span>
        </div>
      </div>
    ),
  },
];

/* ---------- Categories ---------- */

const categories = [
  { slug: "all", label: "All" },
  { slug: "buttons", label: "Buttons" },
  { slug: "cards", label: "Cards" },
  { slug: "forms", label: "Forms" },
  { slug: "alerts", label: "Alerts & badges" },
  { slug: "navigation", label: "Navigation" },
  { slug: "modals", label: "Modals" },
];

/* ---------- Gallery page ---------- */

export default function ComponentsGallery() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("all");
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchComponents = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get(
          "http://localhost:5000/component/getall"
        );

        if (!Array.isArray(res.data)) {
          throw new Error("Unexpected API response format");
        }

        if (!cancelled) {
          setSaved(res.data);
        }
      } catch (err) {
        console.error("Failed to fetch components:", err);

        if (!cancelled) {
          setError(
            "Could not load saved components. Please try again."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchComponents();

    return () => {
      cancelled = true;
    };
  }, []);

  const normalizedQuery = query.trim().toLowerCase();

  /* Filter built-in components */
  const visible = items.filter((item) => {
    const matchesCategory =
      active === "all" || item.slug === active;

    const matchesQuery = item.name
      .toLowerCase()
      .includes(normalizedQuery);

    return matchesCategory && matchesQuery;
  });

  /* Filter database components */
  const visibleSaved = saved.filter((component) => {
    const category = (component.category || "")
      .trim()
      .toLowerCase();

    const title = (component.title || "").toLowerCase();

    const matchesCategory =
      active === "all" || category === active;

    const matchesQuery = title.includes(normalizedQuery);

    return matchesCategory && matchesQuery;
  });

  return (
    <div className="flex min-h-screen flex-col bg-[#0F1720] text-[#F7F5F0] md:flex-row">

      {/* Sidebar */}
      <aside className="border-b border-[#2C3A4A] px-4 py-6 md:sticky md:top-0 md:h-screen md:w-56 md:shrink-0 md:border-b-0 md:border-r">
        <p className="mb-3 px-2 font-mono text-[10px] uppercase tracking-wide text-[#F7F5F0]/40">
          Components
        </p>

        <nav className="flex flex-wrap gap-1 md:flex-col">
          {categories.map((category) => (
            <button
              key={category.slug}
              type="button"
              onClick={() => setActive(category.slug)}
              className={`rounded-md px-3 py-2 text-left text-sm transition ${active === category.slug
                  ? "bg-[#DCF0E7]/10 text-[#2F8F6B]"
                  : "text-[#F7F5F0]/60 hover:bg-[#1E293B] hover:text-[#F7F5F0]"
                }`}
            >
              {category.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 px-6 py-10">
        <div className="mx-auto max-w-5xl">

          <p className="font-mono text-xs uppercase tracking-wide text-[#2F8F6B]">
            Browse
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            All components
          </h1>

          <p className="mt-2 text-sm text-[#F7F5F0]/60">
            {items.length + saved.length} components across{" "}
            {categories.length - 1} categories. Click one to see
            the full demo and source.
          </p>

          {/* Search */}
          <div className="mt-6">
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search components..."
              aria-label="Search components"
              className="w-full rounded-md border border-[#2C3A4A] bg-[#0F1720] px-3 py-2 text-sm text-[#F7F5F0] outline-none placeholder:text-[#F7F5F0]/30 focus:border-[#2F8F6B] sm:w-64"
            />
          </div>

          {/* Saved components */}
          <h2 className="mt-8 text-lg font-semibold">
            Saved components
          </h2>

          {loading && (
            <p className="mt-4 text-sm text-[#F7F5F0]/50">
              Loading saved components...
            </p>
          )}

          {!loading && error && (
            <div className="mt-4 rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {!loading && !error && visibleSaved.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {visibleSaved.map((component) => (
                <Link
                  key={component._id}
                  href={`/view/${component._id}`}
                  className="group overflow-hidden rounded-lg border border-[#2C3A4A] bg-[#1E293B] transition hover:border-[#2F8F6B]"
                >
                  <PreviewCustom code={component.code} />

                  <div className="flex items-center justify-between gap-2 border-t border-[#2C3A4A] px-3 py-2.5">
                    <span className="truncate text-xs font-medium text-[#F7F5F0]/80 group-hover:text-[#F7F5F0]">
                      {component.title || "Untitled component"}
                    </span>

                    <span className="shrink-0 font-mono text-[10px] text-[#F7F5F0]/35">
                      {component.category || "uncategorized"}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!loading &&
            !error &&
            visibleSaved.length === 0 && (
              <p className="mt-4 text-sm text-[#F7F5F0]/40">
                No saved components match your search.
              </p>
            )}

          {/* Built-in components */}
          <h2 className="mt-10 text-lg font-semibold">
            Built-in components
          </h2>

          {visible.length === 0 ? (
            <p className="mt-4 text-sm text-[#F7F5F0]/40">
              No built-in components match "{query}".
            </p>
          ) : (
            <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {visible.map(({ name, slug, Preview }) => (
                <Link
                  key={`${slug}-${name}`}
                  href={`/components/${slug}`}
                  className="group overflow-hidden rounded-lg border border-[#2C3A4A] bg-[#1E293B] transition hover:border-[#2F8F6B]"
                >
                  <div className="flex h-28 items-center justify-center overflow-hidden bg-[#0F1720]/60 px-3">
                    <Preview />
                  </div>

                  <div className="flex items-center justify-between gap-2 border-t border-[#2C3A4A] px-3 py-2.5">
                    <span className="truncate text-xs font-medium text-[#F7F5F0]/80 group-hover:text-[#F7F5F0]">
                      {name}
                    </span>

                    <span className="shrink-0 font-mono text-[10px] text-[#F7F5F0]/35">
                      {slug}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
