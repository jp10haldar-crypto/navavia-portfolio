// WHAT THIS FILE DOES: The form used for both "Add New Review" and
// "Edit Review" — one form, reused for both. It loads the list of existing
// projects so you can pick which one (if any) the review is about, lets
// you upload the client's photo (or paste a URL instead), checks required
// fields before saving, and saves straight to the real database through
// lib/firestore.js. Runs in the browser because it reacts to typing,
// uploads, and the Save click.

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { addReview, updateReview, getAllProjects } from "@/lib/firestore";
import ImageUploader from "@/components/admin/ImageUploader";

const RATING_OPTIONS = [1, 2, 3, 4, 5];
const INPUT_CLASSES =
  "mt-1 w-full rounded-lg border border-white/10 bg-card px-4 py-3 text-foreground outline-none focus:border-accent";

export default function ReviewForm({ reviewId, initialReview }) {
  const router = useRouter();
  const isEditing = Boolean(reviewId);

  const [projectOptions, setProjectOptions] = useState([]);
  const [values, setValues] = useState({
    clientName: initialReview?.clientName ?? "",
    clientRole: initialReview?.clientRole ?? "",
    clientCompany: initialReview?.clientCompany ?? "",
    reviewText: initialReview?.reviewText ?? "",
    rating: initialReview?.rating ?? 5,
    clientPhoto: initialReview?.clientPhoto ?? "",
    projectId: initialReview?.projectId ?? "",
    featured: initialReview?.featured ?? false,
  });
  const [missingFields, setMissingFields] = useState([]);
  const [saveError, setSaveError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    getAllProjects().then((result) => {
      if (result.success) {
        setProjectOptions(result.data);
      }
    });
  }, []);

  function updateField(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function findMissingFields() {
    const missing = [];
    if (!values.clientName.trim()) missing.push("Client Name");
    if (!values.reviewText.trim()) missing.push("Review Text");
    return missing;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const missing = findMissingFields();
    if (missing.length > 0) {
      setMissingFields(missing);
      return;
    }
    setMissingFields([]);
    setSaveError("");
    setIsSaving(true);

    const reviewData = {
      clientName: values.clientName.trim(),
      clientRole: values.clientRole.trim(),
      clientCompany: values.clientCompany.trim(),
      reviewText: values.reviewText.trim(),
      rating: Number(values.rating),
      clientPhoto: values.clientPhoto.trim(),
      projectId: values.projectId || "",
      featured: values.featured,
    };

    const result = isEditing
      ? await updateReview(reviewId, reviewData)
      : await addReview(reviewData);

    setIsSaving(false);

    if (!result.success) {
      setSaveError(result.message);
      return;
    }

    router.push("/admin/reviews");
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-2xl flex-col gap-5">
      <Field label="Client Name">
        <input
          type="text"
          value={values.clientName}
          onChange={(event) => updateField("clientName", event.target.value)}
          className={INPUT_CLASSES}
        />
      </Field>

      <Field label="Role" hint="e.g. Owner">
        <input
          type="text"
          value={values.clientRole}
          onChange={(event) => updateField("clientRole", event.target.value)}
          className={INPUT_CLASSES}
        />
      </Field>

      <Field label="Company" hint="Leave blank if not applicable.">
        <input
          type="text"
          value={values.clientCompany}
          onChange={(event) => updateField("clientCompany", event.target.value)}
          className={INPUT_CLASSES}
        />
      </Field>

      <Field label="Review Text">
        <textarea
          value={values.reviewText}
          onChange={(event) => updateField("reviewText", event.target.value)}
          rows={4}
          className={INPUT_CLASSES}
        />
      </Field>

      <Field label="Star Rating">
        <select
          value={values.rating}
          onChange={(event) => updateField("rating", event.target.value)}
          className={INPUT_CLASSES}
        >
          {RATING_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option} {option === 1 ? "Star" : "Stars"}
            </option>
          ))}
        </select>
      </Field>

      <Field
        label="Client Photo"
        hint="Upload a photo, or paste a URL. Leave empty to show the client's initials instead."
      >
        <ImageUploader
          value={values.clientPhoto}
          onChange={(url) => updateField("clientPhoto", url)}
        />
      </Field>

      <Field label="Which project is this about?" hint="Optional.">
        <select
          value={values.projectId}
          onChange={(event) => updateField("projectId", event.target.value)}
          className={INPUT_CLASSES}
        >
          <option value="">Not linked to a specific project</option>
          {projectOptions.map((project) => (
            <option key={project.id} value={project.id}>
              {project.title}
            </option>
          ))}
        </select>
      </Field>

      <label className="flex items-center gap-3 text-sm text-foreground">
        <input
          type="checkbox"
          checked={values.featured}
          onChange={(event) => updateField("featured", event.target.checked)}
          className="h-5 w-5"
        />
        Show this review in the homepage&apos;s &quot;What Our Clients
        Say&quot; section
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
        {isSaving ? "Saving..." : "Save Review"}
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
