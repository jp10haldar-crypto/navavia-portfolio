// WHAT THIS FILE DOES: The form used for both "Add New Post" and
// "Edit Post" — one form, reused for both. It turns the title into a
// web-address "slug" automatically (you can override it), warns you if
// that slug is already used by a different post, calculates reading time
// automatically from the content, and lets you save as a draft or publish
// outright as two separate actions. A preview always saves your current
// changes as a draft first, then opens the real post page in a new tab —
// so what you see in preview is always exactly what you just typed. Warns
// you before leaving the page if you have unsaved changes. Runs in the
// browser because it reacts to typing, the rich text editor, and clicks.

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  addBlogPost,
  updateBlogPost,
  getBlogPostBySlug,
} from "@/lib/firestore";
import { slugify, calculateReadingTime } from "@/lib/utils";
import ImageUploader from "@/components/admin/ImageUploader";
import RichTextEditor from "@/components/admin/RichTextEditor";

const INPUT_CLASSES =
  "mt-1 w-full rounded-lg border border-white/10 bg-card px-4 py-3 text-foreground outline-none focus:border-accent";

function splitTags(text) {
  return text
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function BlogPostForm({ postId, initialPost }) {
  const router = useRouter();
  const [currentPostId, setCurrentPostId] = useState(postId);

  const [values, setValues] = useState({
    title: initialPost?.title ?? "",
    slug: initialPost?.slug ?? "",
    excerpt: initialPost?.excerpt ?? "",
    author: initialPost?.author ?? "",
    tags: initialPost?.tags?.join(", ") ?? "",
    coverImage: initialPost?.coverImage ?? "",
    metaTitle: initialPost?.metaTitle ?? "",
    metaDescription: initialPost?.metaDescription ?? "",
  });
  const [content, setContent] = useState(initialPost?.content ?? "");
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(
    Boolean(initialPost)
  );
  const [publishedDate, setPublishedDate] = useState(
    initialPost?.publishedDate ?? null
  );

  const [missingFields, setMissingFields] = useState([]);
  const [slugError, setSlugError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [savingAction, setSavingAction] = useState(null); // "draft" | "publish" | "preview" | null
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    function handleBeforeUnload(event) {
      if (isDirty) {
        event.preventDefault();
      }
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  function updateField(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
    setIsDirty(true);
  }

  function handleTitleChange(newTitle) {
    updateField("title", newTitle);
    if (!slugManuallyEdited) {
      setValues((current) => ({ ...current, slug: slugify(newTitle) }));
    }
  }

  function handleSlugChange(newSlug) {
    setSlugManuallyEdited(true);
    updateField("slug", newSlug);
  }

  function handleContentChange(newContent) {
    setContent(newContent);
    setIsDirty(true);
  }

  function findMissingFields() {
    const missing = [];
    if (!values.title.trim()) missing.push("Title");
    if (!values.excerpt.trim()) missing.push("Excerpt");
    if (!values.author.trim()) missing.push("Author");
    if (!content.replace(/<[^>]*>/g, "").trim()) missing.push("Content");
    if (!values.slug.trim()) missing.push("Slug");
    return missing;
  }

  // Does everything common to "Save as Draft," "Publish," and the
  // preview's auto-save: validates, checks the slug is free, then writes
  // to the database. Returns the saved post's id, or null if it couldn't
  // save (an error is already shown on screen in that case).
  async function validateAndSave(publishedValue) {
    const missing = findMissingFields();
    setMissingFields(missing);
    if (missing.length > 0) return null;

    const slugCheck = await getBlogPostBySlug(values.slug.trim());
    if (slugCheck.success && slugCheck.data.id !== currentPostId) {
      setSlugError(
        "This URL is already used by another post. Please choose a different one."
      );
      return null;
    }
    setSlugError("");
    setSaveError("");

    const nextPublishedDate =
      publishedValue && !publishedDate
        ? new Date().toISOString().slice(0, 10)
        : publishedDate;

    const postData = {
      title: values.title.trim(),
      slug: values.slug.trim(),
      excerpt: values.excerpt.trim(),
      content,
      author: values.author.trim(),
      tags: splitTags(values.tags),
      coverImage: values.coverImage,
      metaTitle: values.metaTitle.trim(),
      metaDescription: values.metaDescription.trim(),
      readingTime: calculateReadingTime(content),
      published: publishedValue,
      publishedDate: nextPublishedDate,
    };

    const result = currentPostId
      ? await updateBlogPost(currentPostId, postData)
      : await addBlogPost(postData);

    if (!result.success) {
      setSaveError(result.message);
      return null;
    }

    setPublishedDate(nextPublishedDate);
    setIsDirty(false);

    const savedId = currentPostId || result.data.id;
    setCurrentPostId(savedId);
    return savedId;
  }

  async function handleSaveDraft() {
    setSavingAction("draft");
    const savedId = await validateAndSave(false);
    setSavingAction(null);
    if (savedId) {
      router.push("/admin/blog");
    }
  }

  async function handlePublish() {
    setSavingAction("publish");
    const savedId = await validateAndSave(true);
    setSavingAction(null);
    if (savedId) {
      router.push("/admin/blog");
    }
  }

  async function handlePreview() {
    setSavingAction("preview");
    const savedId = await validateAndSave(publishedDate ? true : false);
    setSavingAction(null);
    if (savedId) {
      window.open(`/admin/blog-preview/${savedId}`, "_blank");
    }
  }

  const isSaving = savingAction !== null;

  return (
    <div className="flex max-w-2xl flex-col gap-5">
      <Field label="Title">
        <input
          type="text"
          value={values.title}
          onChange={(event) => handleTitleChange(event.target.value)}
          className={INPUT_CLASSES}
        />
      </Field>

      <Field
        label="Slug (web address)"
        hint="Generated automatically from the title. Edit it yourself if you want a different URL."
      >
        <input
          type="text"
          value={values.slug}
          onChange={(event) => handleSlugChange(event.target.value)}
          className={INPUT_CLASSES}
        />
        {slugError && <p className="mt-1 text-xs text-red-400">{slugError}</p>}
      </Field>

      <Field label="Excerpt" hint="A short summary shown on the blog list and in search results.">
        <textarea
          value={values.excerpt}
          onChange={(event) => updateField("excerpt", event.target.value)}
          rows={2}
          className={INPUT_CLASSES}
        />
      </Field>

      <Field label="Content">
        <RichTextEditor value={content} onChange={handleContentChange} />
      </Field>

      <Field label="Cover Image" hint="Upload an image, or paste a URL.">
        <ImageUploader
          value={values.coverImage}
          onChange={(url) => updateField("coverImage", url)}
        />
      </Field>

      <Field label="Author">
        <input
          type="text"
          value={values.author}
          onChange={(event) => updateField("author", event.target.value)}
          className={INPUT_CLASSES}
        />
      </Field>

      <Field label="Tags" hint="Separate each one with a comma, e.g. Tips, Web Design">
        <input
          type="text"
          value={values.tags}
          onChange={(event) => updateField("tags", event.target.value)}
          className={INPUT_CLASSES}
        />
      </Field>

      <Field
        label="SEO Title (used exactly as typed — nothing is added to it)"
        hint={
          'Shown in the browser tab and search results, word-for-word — add "Navavia" yourself here if you want it included. Leave blank to use the Title above followed by "— Navavia" automatically.'
        }
      >
        <input
          type="text"
          value={values.metaTitle}
          onChange={(event) => updateField("metaTitle", event.target.value)}
          className={INPUT_CLASSES}
        />
      </Field>

      <Field
        label="SEO Description"
        hint="Shown under the title in search results and social media previews. Leave blank to use the Excerpt above."
      >
        <textarea
          value={values.metaDescription}
          onChange={(event) => updateField("metaDescription", event.target.value)}
          rows={2}
          className={INPUT_CLASSES}
        />
      </Field>

      {missingFields.length > 0 && (
        <p className="text-sm text-red-400">
          Please fill in: {missingFields.join(", ")}
        </p>
      )}
      {saveError && <p className="text-sm text-red-400">{saveError}</p>}

      <div className="mt-2 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handlePublish}
          disabled={isSaving}
          className="rounded-full bg-accent px-6 py-3 font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {savingAction === "publish" ? "Publishing..." : "Publish"}
        </button>
        <button
          type="button"
          onClick={handleSaveDraft}
          disabled={isSaving}
          className="rounded-full border border-accent px-6 py-3 font-semibold text-accent transition-colors hover:bg-accent hover:text-background disabled:opacity-60"
        >
          {savingAction === "draft" ? "Saving..." : "Save as Draft"}
        </button>
        <button
          type="button"
          onClick={handlePreview}
          disabled={isSaving}
          className="rounded-full border border-white/10 px-6 py-3 font-semibold text-muted transition-colors hover:text-foreground disabled:opacity-60"
        >
          {savingAction === "preview" ? "Saving..." : "Preview"}
        </button>
      </div>
      <p className="text-xs text-muted">
        Preview saves your current changes as a draft first, then opens the
        post in a new tab exactly as it will look. A draft is never visible
        to the public until you click Publish.
      </p>
    </div>
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
