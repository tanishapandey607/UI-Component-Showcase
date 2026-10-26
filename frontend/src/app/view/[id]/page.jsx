
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import PreviewCustom from "@/components/PreviewCustom";

export default function ViewComponent() {
  const params = useParams();
  const router = useRouter();

  const id = params?.id;

  const [component, setComponent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    const fetchComponent = async () => {
      try {
        setLoading(true);
        setError("");

        // Fetch all components and find the selected one.
        // This works with your existing /component/getall API.
        const response = await axios.get(
          "http://localhost:5000/component/getall"
        );

        if (!Array.isArray(response.data)) {
          throw new Error("Invalid response from server");
        }

        const selected = response.data.find(
          (item) => String(item._id) === String(id)
        );

        if (!selected) {
          throw new Error("Component not found");
        }

        if (!cancelled) {
          setComponent(selected);
        }
      } catch (err) {
        console.error("Failed to fetch component:", err);

        if (!cancelled) {
          setError(
            err.message === "Component not found"
              ? "The requested component could not be found."
              : "Unable to load this component. Please try again."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchComponent();

    return () => {
      cancelled = true;
    };
  }, [id]);

  const handleCopyCode = async () => {
    if (!component?.code) return;

    try {
      await navigator.clipboard.writeText(component.code);
    } catch (err) {
      console.error("Failed to copy component code:", err);
    }
  };

  return (
    <main className="min-h-screen bg-[#0F1720] px-4 py-8 text-[#F7F5F0] sm:px-6 lg:px-10">
      <div className="mx-auto max-w-5xl">

        {/* Header actions */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => router.push("/browse")}
            className="rounded-md border border-[#2C3A4A] px-4 py-2 text-sm text-[#F7F5F0]/80 transition hover:border-[#2F8F6B] hover:text-white"
          >
            ← Back to components
          </button>

          <span className="font-mono text-xs uppercase tracking-wider text-[#2F8F6B]">
            Component details
          </span>
        </div>

        {/* Loading */}
        {loading && (
          <div className="rounded-xl border border-[#2C3A4A] bg-[#1E293B] p-10 text-center">
            <p className="text-sm text-[#F7F5F0]/60">
              Loading component...
            </p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6">
            <h1 className="text-lg font-semibold text-red-400">
              Component unavailable
            </h1>

            <p className="mt-2 text-sm text-[#F7F5F0]/70">
              {error}
            </p>

            <button
              type="button"
              onClick={() => router.push("/browse")}
              className="mt-5 rounded-md bg-[#2F8F6B] px-4 py-2 text-sm font-semibold text-[#0F1720]"
            >
              Browse components
            </button>
          </div>
        )}

        {/* Component details */}
        {!loading && !error && component && (
          <>
            {/* Title and metadata */}
            <section className="mb-8">
              <p className="font-mono text-xs uppercase tracking-wider text-[#2F8F6B]">
                {component.category || "Uncategorized"}
              </p>

              <h1 className="mt-3 break-words text-3xl font-bold sm:text-4xl">
                {component.title || "Untitled component"}
              </h1>

              <p className="mt-3 text-sm text-[#F7F5F0]/50">
                Preview the saved HTML component and inspect its source.
              </p>
            </section>

            {/* Live preview */}
            <section className="overflow-hidden rounded-xl border border-[#2C3A4A] bg-[#1E293B]">
              <div className="flex items-center justify-between border-b border-[#2C3A4A] px-4 py-3">
                <h2 className="text-sm font-semibold">
                  Live preview
                </h2>

                <span className="font-mono text-[10px] uppercase tracking-wider text-[#2F8F6B]">
                  HTML
                </span>
              </div>

              <div className="min-h-56 bg-[#0F1720] p-4 sm:p-8">
                <div className="min-h-40 overflow-hidden rounded-lg border border-[#2C3A4A]">
                  <PreviewCustom code={component.code} />
                </div>
              </div>
            </section>

            {/* Source code */}
            <section className="mt-8 overflow-hidden rounded-xl border border-[#2C3A4A] bg-[#1E293B]">
              <div className="flex items-center justify-between gap-3 border-b border-[#2C3A4A] px-4 py-3">
                <div>
                  <h2 className="text-sm font-semibold">
                    Source code
                  </h2>

                  <p className="mt-1 text-xs text-[#F7F5F0]/40">
                    HTML markup stored in your database
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCopyCode}
                  disabled={!component.code}
                  className="shrink-0 rounded-md bg-[#2F8F6B] px-3 py-2 text-xs font-semibold text-[#0F1720] transition hover:bg-[#3AA77F] disabled:opacity-40"
                >
                  Copy code
                </button>
              </div>

              <pre className="max-h-[520px] overflow-auto p-4 text-xs leading-6 text-[#DCF0E7] sm:p-6">
                <code>{component.code || ""}</code>
              </pre>
            </section>

            {/* Footer */}
            <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-[#F7F5F0]/40">
                Component ID: {String(component._id)}
              </p>

              <button
                type="button"
                onClick={() => router.push("/browse")}
                className="rounded-md border border-[#2C3A4A] px-4 py-2 text-sm text-[#F7F5F0]/80 transition hover:border-[#2F8F6B]"
              >
                Browse more components
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
