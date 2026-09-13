// WHAT THIS FILE DOES: The form used for both "Add New Video" and
// "Edit Video" on the homepage videos admin page — one form, reused for
// both. It checks required fields before saving, turns any full YouTube
// link pasted in (watch?v=, youtu.be/, or embed/ links) into just the
// video id automatically — and if what's pasted isn't recognizable as a
// YouTube link, it blocks saving and explains why. Saves straight to the
// real database through lib/firestore.js. Runs in the browser because it
// reacts to typing and the Save click.

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { addHomepageVideo, updateHomepageVideo } from "@/lib/firestore";
import { extractYouTubeId } from "@/lib/utils";

const INPUT_CLASSES =
  "mt-1 w-full rounded-lg border border-white/10 bg-card px-4 py-3 text-foreground outline-none focus:border-accent";

export default function HomepageVideoForm({ videoId, initialVideo }) {
  const router = useRouter();
  const isEditing = Boolean(videoId);

  const [values, setValues] = useState({
    title: initialVideo?.title ?? "",
    description: initialVideo?.description ?? "",
    youtubeInput: initialVideo?.youtubeId ?? "",
    displayOrder: initialVideo?.displayOrder ?? "",
    published: initialVideo?.published ?? false,
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
    if (values.displayOrder === "" || values.displayOrder === null) {
      missing.push("Display Order");
    }
    return missing;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const missing = findMissingFields();

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

    const videoData = {
      title: values.title.trim(),
      description: values.description.trim(),
      youtubeId: resolvedYoutubeId,
      displayOrder: Number(values.displayOrder),
      published: values.published,
    };

    const result = isEditing
      ? await updateHomepageVideo(videoId, videoData)
      : await addHomepageVideo(videoData);

    setIsSaving(false);

    if (!result.success) {
      setSaveError(result.message);
      return;
    }

    router.push("/admin/homepage-videos");
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

      <Field label="Description" hint="Shown in muted text under the video.">
        <textarea
          value={values.description}
          onChange={(event) => updateField("description", event.target.value)}
          rows={3}
          className={INPUT_CLASSES}
        />
      </Field>

      <Field
        label="YouTube Video Link"
        hint="Paste the full YouTube link — the video id is pulled out automatically. Leave blank while you're still drafting this video."
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
        label="Display Order"
        hint="Lower numbers show first. You can also drag videos to reorder them from the list page."
      >
        <input
          type="number"
          value={values.displayOrder}
          onChange={(event) => updateField("displayOrder", event.target.value)}
          className={INPUT_CLASSES}
        />
      </Field>

      <label className="flex items-center gap-3 text-sm text-foreground">
        <input
          type="checkbox"
          checked={values.published}
          onChange={(event) => updateField("published", event.target.checked)}
          className="h-5 w-5"
        />
        Published (visible on the homepage)
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
        {isSaving ? "Saving..." : "Save Video"}
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
