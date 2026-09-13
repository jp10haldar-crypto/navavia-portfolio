// WHAT THIS FILE DOES: The form used for both "Add New Project" and
// "Edit Project" — one form, reused for both, since the fields are
// identical. It checks required fields before saving, turns any full
// YouTube link pasted in (watch?v=, youtu.be/, or embed/ links) into just
// the video id automatically — and if what's pasted isn't recognizable as
// a YouTube link at all, it blocks saving and explains why instead of
// silently saving "no video." It also lets you upload real screenshot
// images (or paste a URL instead), and saves straight to the real
// database through lib/firestore.js. Runs in the browser because it
// reacts to typing, uploads, and the Save click.

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addProject, updateProject } from "@/lib/firestore";
import { extractYouTubeId } from "@/lib/utils";
import ImageListUploader from "@/components/admin/ImageListUploader";

const CATEGORY_OPTIONS = ["Website", "Mobile App"];
const INPUT_CLASSES =
  "mt-1 w-full rounded-lg border border-white/10 bg-card px-4 py-3 text-foreground outline-none focus:border-accent";

export default function ProjectForm({ projectId, initialProject }) {
  const router = useRouter();
  const isEditing = Boolean(projectId);

  const [values, setValues] = useState({
    title: initialProject?.title ?? "",
    category: initialProject?.category ?? CATEGORY_OPTIONS[0],
    shortDescription: initialProject?.shortDescription ?? "",
    longDescription: initialProject?.longDescription ?? "",
    techUsed: initialProject?.techUsed?.join(", ") ?? "",
    liveUrl: initialProject?.liveUrl ?? "",
    youtubeInput: initialProject?.youtubeId ?? "",
    featured: initialProject?.featured ?? false,
    customerScreenshots: initialProject?.customerScreenshots ?? [],
    adminScreenshots: initialProject?.adminScreenshots ?? [],
  });
  const [missingFields, setMissingFields] = useState([]);
  const [youtubeError, setYoutubeError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  function updateField(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function findMissingFields() {
    const missing = [];
    if (!values.title.trim()) missing.push("Title");
    if (!values.shortDescription.trim()) missing.push("Short Description");
    if (!values.longDescription.trim()) missing.push("Long Description");
    return missing;
  }

  function splitList(text) {
    return text
      .split(/[\n,]/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const missing = findMissingFields();

    // Figure out the video id now (not just at save time) so an
    // unrecognizable paste can be caught and reported clearly, instead of
    // silently being saved as "no video."
    const trimmedYoutubeInput = values.youtubeInput.trim();
    const resolvedYoutubeId = extractYouTubeId(trimmedYoutubeInput);
    const youtubeLooksInvalid =
      trimmedYoutubeInput.length > 0 && resolvedYoutubeId === "";

    if (missing.length > 0 || youtubeLooksInvalid) {
      setMissingFields(missing);
      setYoutubeError(
        youtubeLooksInvalid
          ? "That doesn't look like a YouTube link. Paste something like https://www.youtube.com/watch?v=..., https://youtu.be/..., or https://www.youtube.com/embed/..."
          : ""
      );
      return;
    }
    setMissingFields([]);
    setYoutubeError("");
    setSaveError("");
    setIsSaving(true);

    const projectData = {
      title: values.title.trim(),
      category: values.category,
      shortDescription: values.shortDescription.trim(),
      longDescription: values.longDescription.trim(),
      techUsed: splitList(values.techUsed),
      liveUrl: values.liveUrl.trim(),
      youtubeId: resolvedYoutubeId,
      featured: values.featured,
      customerScreenshots: values.customerScreenshots,
      adminScreenshots: values.adminScreenshots,
    };

    const result = isEditing
      ? await updateProject(projectId, projectData)
      : await addProject(projectData);

    setIsSaving(false);

    if (!result.success) {
      setSaveError(result.message);
      return;
    }

    router.push("/admin/projects");
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-2xl flex-col gap-5">
      <Field label="Title">
        <input
          type="text"
          value={values.title}
          onChange={(event) => updateField("title", event.target.value)}
          className={INPUT_CLASSES}
        />
      </Field>

      <Field label="Category">
        <select
          value={values.category}
          onChange={(event) => updateField("category", event.target.value)}
          className={INPUT_CLASSES}
        >
          {CATEGORY_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Short Description" hint="One sentence, shown on project cards.">
        <textarea
          value={values.shortDescription}
          onChange={(event) => updateField("shortDescription", event.target.value)}
          rows={2}
          className={INPUT_CLASSES}
        />
      </Field>

      <Field label="Long Description" hint="Shown on the project's own detail page.">
        <textarea
          value={values.longDescription}
          onChange={(event) => updateField("longDescription", event.target.value)}
          rows={4}
          className={INPUT_CLASSES}
        />
      </Field>

      <Field label="Tech Used" hint="Separate each one with a comma, e.g. Next.js, Firebase">
        <input
          type="text"
          value={values.techUsed}
          onChange={(event) => updateField("techUsed", event.target.value)}
          className={INPUT_CLASSES}
        />
      </Field>

      <Field label="Live Site URL" hint="Leave blank if there isn't one yet.">
        <input
          type="text"
          value={values.liveUrl}
          onChange={(event) => updateField("liveUrl", event.target.value)}
          className={INPUT_CLASSES}
        />
      </Field>

      <Field
        label="YouTube Video Link"
        hint="Paste the full YouTube link — the video id is pulled out automatically. Leave blank if there's no video yet."
      >
        <input
          type="text"
          value={values.youtubeInput}
          onChange={(event) => updateField("youtubeInput", event.target.value)}
          className={INPUT_CLASSES}
        />
        {youtubeError && (
          <p className="mt-1 text-xs text-red-400">{youtubeError}</p>
        )}
      </Field>

      <Field
        label="Customer Screenshots"
        hint="Upload one or more images, or paste a URL. Drag a thumbnail to reorder."
      >
        <ImageListUploader
          value={values.customerScreenshots}
          onChange={(urls) => updateField("customerScreenshots", urls)}
        />
      </Field>

      <Field
        label="Admin Panel Screenshots"
        hint="Upload one or more images, or paste a URL. Drag a thumbnail to reorder."
      >
        <ImageListUploader
          value={values.adminScreenshots}
          onChange={(urls) => updateField("adminScreenshots", urls)}
        />
      </Field>

      <label className="flex items-center gap-3 text-sm text-foreground">
        <input
          type="checkbox"
          checked={values.featured}
          onChange={(event) => updateField("featured", event.target.checked)}
          className="h-5 w-5"
        />
        Show this project in the homepage&apos;s Featured Work section
      </label>

      {missingFields.length > 0 && (
        <p className="text-sm text-red-400">
          Please fill in: {missingFields.join(", ")}
        </p>
      )}
      {saveError && <p className="text-sm text-red-400">{saveError}</p>}

      <button
        type="submit"
        disabled={isSaving}
        className="mt-2 self-start rounded-full bg-accent px-6 py-3 font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {isSaving ? "Saving..." : "Save Project"}
      </button>
    </form>
  );
}

function Field({ label, hint, children }) {
  return (
    <div>
      <label className="text-sm text-muted">{label}</label>
      {children}
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </div>
  );
}
