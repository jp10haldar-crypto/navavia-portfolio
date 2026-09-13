// WHAT THIS FILE DOES: The form for adding or editing one section on the
// admin Pages editor. Which fields show depends on the section's type —
// e.g. a "list" section shows an add/remove list of points, a "cta"
// section shows a button label and link, a "text" section shows a body
// textarea. The five "automatic" types (Featured Work, Homepage Videos,
// Client Reviews, Projects Grid, Blog Feed) only ever show heading/
// subheading/visible — their real repeating content comes from elsewhere
// in the database, not from this form. Runs in the browser because it
// reacts to typing and the Save click.

"use client";

import { useState } from "react";
import ImageUploader from "@/components/admin/ImageUploader";

export const SECTION_TYPES = [
  { value: "heading", label: "Heading", description: "A heading with a supporting line." },
  { value: "text", label: "Text Block", description: "A heading, subheading, and paragraph text." },
  { value: "list", label: "List of Points", description: "A heading and a bullet list." },
  { value: "imageText", label: "Image + Text", description: "An image beside a heading and text." },
  { value: "cards", label: "Set of Cards", description: "A heading and a row of title/description cards." },
  { value: "quote", label: "Quote / Highlight", description: "A pulled-out quote with an attribution." },
  { value: "cta", label: "Call to Action", description: "A heading, subheading, and one button." },
];

export const AUTOMATIC_SECTION_TYPES = [
  { value: "featuredWork", label: "Featured Work (automatic)", description: "Shows your featured projects. Content comes from Projects." },
  { value: "homepageVideos", label: "How We Work Videos (automatic)", description: "Shows your published homepage videos." },
  { value: "reviewsFeed", label: "Client Reviews (automatic)", description: "Shows your client reviews." },
  { value: "projectsGrid", label: "Projects Grid (automatic)", description: "Shows every project with filter buttons." },
  { value: "blogFeed", label: "Blog Feed (automatic)", description: "Shows every published blog post." },
];

const INPUT_CLASSES =
  "mt-1 w-full rounded-lg border border-white/10 bg-card px-4 py-3 text-foreground outline-none focus:border-accent";

function emptyValuesForType(type) {
  return {
    heading: "",
    subheading: "",
    body: "",
    image: "",
    buttonLabel: "",
    buttonLink: "",
    items: type === "list" ? [] : type === "cards" ? [] : [],
    visible: true,
  };
}

export default function SectionForm({ type, initialSection, onSave, onCancel }) {
  const isAutomatic = AUTOMATIC_SECTION_TYPES.some((t) => t.value === type);
  const [values, setValues] = useState(() => ({
    ...emptyValuesForType(type),
    ...(initialSection || {}),
  }));
  const [newItemText, setNewItemText] = useState("");
  const [newCardTitle, setNewCardTitle] = useState("");
  const [newCardDescription, setNewCardDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  function updateField(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function addListItem() {
    const trimmed = newItemText.trim();
    if (!trimmed) return;
    updateField("items", [...(values.items || []), trimmed]);
    setNewItemText("");
  }

  function addCardItem() {
    const title = newCardTitle.trim();
    const description = newCardDescription.trim();
    if (!title) return;
    updateField("items", [...(values.items || []), { title, description }]);
    setNewCardTitle("");
    setNewCardDescription("");
  }

  function removeItem(index) {
    updateField(
      "items",
      values.items.filter((_, itemIndex) => itemIndex !== index)
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaveError("");
    setIsSaving(true);

    const result = await onSave(values);

    setIsSaving(false);
    if (result && result.success === false) {
      setSaveError(result.message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-xl border border-white/10 bg-card p-6"
    >
      {isAutomatic && (
        <p className="rounded-lg bg-background px-4 py-3 text-sm text-muted">
          This is an automatic section — its actual content comes from
          elsewhere in your admin panel (Projects, Reviews, Homepage Videos,
          or Blog). Here you can only control its heading, subheading, and
          whether it shows.
        </p>
      )}

      <Field label="Heading" hint="Leave blank to hide the heading.">
        <input
          type="text"
          value={values.heading}
          onChange={(event) => updateField("heading", event.target.value)}
          className={INPUT_CLASSES}
        />
      </Field>

      {type !== "quote" && (
        <Field label="Subheading" hint="Optional supporting line.">
          <input
            type="text"
            value={values.subheading}
            onChange={(event) => updateField("subheading", event.target.value)}
            className={INPUT_CLASSES}
          />
        </Field>
      )}

      {(type === "text" || type === "imageText") && (
        <Field label="Body Text" hint="Leave a blank line between paragraphs.">
          <textarea
            value={values.body}
            onChange={(event) => updateField("body", event.target.value)}
            rows={6}
            className={INPUT_CLASSES}
          />
        </Field>
      )}

      {type === "quote" && (
        <>
          <Field label="Quote Text">
            <textarea
              value={values.body}
              onChange={(event) => updateField("body", event.target.value)}
              rows={3}
              className={INPUT_CLASSES}
            />
          </Field>
          <Field label="Attribution" hint="e.g. a name or source. Shown under the quote.">
            <input
              type="text"
              value={values.heading}
              onChange={(event) => updateField("heading", event.target.value)}
              className={INPUT_CLASSES}
            />
          </Field>
        </>
      )}

      {type === "imageText" && (
        <Field label="Image">
          <ImageUploader
            value={values.image}
            onChange={(url) => updateField("image", url)}
          />
        </Field>
      )}

      {type === "cta" && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Button Label" hint="Leave blank to hide the button.">
            <input
              type="text"
              value={values.buttonLabel}
              onChange={(event) => updateField("buttonLabel", event.target.value)}
              className={INPUT_CLASSES}
            />
          </Field>
          <Field label="Button Link" hint="e.g. /contact">
            <input
              type="text"
              value={values.buttonLink}
              onChange={(event) => updateField("buttonLink", event.target.value)}
              className={INPUT_CLASSES}
            />
          </Field>
        </div>
      )}

      {type === "list" && (
        <Field label="Points">
          <div className="flex flex-col gap-2">
            {(values.items || []).map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="flex-1 rounded-lg bg-background px-3 py-2 text-sm text-foreground">
                  {item}
                </span>
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="text-sm text-red-400 hover:opacity-80"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <input
              type="text"
              value={newItemText}
              onChange={(event) => setNewItemText(event.target.value)}
              placeholder="New point..."
              className={INPUT_CLASSES + " mt-0"}
            />
            <button
              type="button"
              onClick={addListItem}
              className="shrink-0 rounded-lg border border-white/10 px-4 py-2 text-sm text-foreground hover:border-accent"
            >
              Add
            </button>
          </div>
        </Field>
      )}

      {type === "cards" && (
        <Field label="Cards">
          <div className="flex flex-col gap-2">
            {(values.items || []).map((item, index) => (
              <div
                key={index}
                className="flex items-start justify-between gap-2 rounded-lg bg-background px-3 py-2"
              >
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {item.title}
                  </p>
                  {item.description && (
                    <p className="text-xs text-muted">{item.description}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="shrink-0 text-sm text-red-400 hover:opacity-80"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="mt-3 flex flex-col gap-2 rounded-lg border border-dashed border-white/15 p-3">
            <input
              type="text"
              value={newCardTitle}
              onChange={(event) => setNewCardTitle(event.target.value)}
              placeholder="Card title"
              className={INPUT_CLASSES + " mt-0"}
            />
            <input
              type="text"
              value={newCardDescription}
              onChange={(event) => setNewCardDescription(event.target.value)}
              placeholder="Card description (optional)"
              className={INPUT_CLASSES + " mt-0"}
            />
            <button
              type="button"
              onClick={addCardItem}
              className="self-start rounded-lg border border-white/10 px-4 py-2 text-sm text-foreground hover:border-accent"
            >
              Add Card
            </button>
          </div>
        </Field>
      )}

      <label className="flex items-center gap-3 text-sm text-foreground">
        <input
          type="checkbox"
          checked={values.visible}
          onChange={(event) => updateField("visible", event.target.checked)}
          className="h-5 w-5"
        />
        Visible on the live site
      </label>

      {saveError && <p className="text-sm text-red-400">{saveError}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSaving}
          className="rounded-full bg-accent px-6 py-3 font-semibold text-background transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {isSaving ? "Saving..." : "Save Section"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-white/10 px-6 py-3 font-semibold text-foreground hover:border-accent"
        >
          Cancel
        </button>
      </div>
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
