// WHAT THIS FILE DOES: The admin "Pages" list, visible at /admin/pages.
// Lists every public page that can be edited as sections. Clicking one
// opens its section editor. Also has a one-time "Import Starter Content"
// button for first-time setup, copying the site's existing words in as a
// fully editable starting point.

"use client";

import { useState } from "react";
import Link from "next/link";
import { MANAGED_PAGES } from "@/lib/pageList";
import { seedPageContent } from "@/lib/firestore";

export default function AdminPagesListPage() {
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedMessage, setSeedMessage] = useState("");

  async function handleSeed() {
    setIsSeeding(true);
    setSeedMessage("");
    const result = await seedPageContent();
    setIsSeeding(false);
    setSeedMessage(result.message);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Pages</h1>
      <p className="mt-2 text-muted">
        Every page on your site is built from sections. Click a page to add,
        edit, delete, or reorder its sections.
      </p>

      <div className="mt-8 rounded-xl border border-white/10 bg-card p-6">
        <p className="text-sm text-muted">
          First time here? Import your site&apos;s current wording as a
          starting point — this only needs to run once, and does nothing if
          it&apos;s already been done.
        </p>
        <button
          type="button"
          onClick={handleSeed}
          disabled={isSeeding}
          className="mt-4 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {isSeeding ? "Importing..." : "Import Starter Content"}
        </button>
        {seedMessage && <p className="mt-3 text-sm text-muted">{seedMessage}</p>}
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {MANAGED_PAGES.map((page) => (
          <Link
            key={page.slug}
            href={`/admin/pages/${page.slug}`}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-card px-6 py-4 transition-colors hover:border-accent"
          >
            <div>
              <p className="font-semibold text-foreground">{page.label}</p>
              <p className="text-xs text-muted">{page.publicPath}</p>
            </div>
            <span className="text-accent">Edit Sections →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
