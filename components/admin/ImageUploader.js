// WHAT THIS FILE DOES: One reusable image uploader — click to choose a
// file, or drag an image onto it. Shows a preview before and during the
// upload (with a progress percentage), rejects anything that isn't an
// image or is over 5MB with a clear message, and has a remove button that
// properly deletes the uploaded file. Also offers pasting an image URL as
// an alternative to uploading. Used on its own (for a single image, like a
// client photo) and inside ImageListUploader (for multiple images, like
// project screenshots). Runs in the browser because it reacts to file
// selection, drag events, and upload progress.

"use client";

import { useRef, useState } from "react";
import { uploadImage, deleteImage } from "@/lib/storage";

export default function ImageUploader({ value, onChange }) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [localPreview, setLocalPreview] = useState("");
  const [error, setError] = useState("");
  const [urlInput, setUrlInput] = useState("");

  async function handleFile(file) {
    if (!file) return;
    setError("");

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file (JPG, PNG, etc.).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("That image is too large. Please choose one under 5MB.");
      return;
    }

    const preview = URL.createObjectURL(file);
    setLocalPreview(preview);
    setIsUploading(true);
    setProgress(0);

    const result = await uploadImage(file, setProgress);

    setIsUploading(false);
    URL.revokeObjectURL(preview);
    setLocalPreview("");

    if (!result.success) {
      setError(result.message);
      return;
    }

    onChange(result.url);
  }

  async function handleRemove() {
    if (value) {
      await deleteImage(value);
    }
    onChange("");
  }

  function handleDrop(event) {
    event.preventDefault();
    setIsDragging(false);
    handleFile(event.dataTransfer.files?.[0]);
  }

  function handleUrlSubmit() {
    const trimmed = urlInput.trim();
    if (trimmed) {
      onChange(trimmed);
      setUrlInput("");
    }
  }

  const previewSrc = value || localPreview;

  return (
    <div>
      {previewSrc ? (
        <div className="relative inline-block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewSrc}
            alt="Preview"
            className="h-28 w-28 rounded-lg object-cover"
          />
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/70 text-sm font-semibold text-white">
              {progress}%
            </div>
          )}
          {!isUploading && value && (
            <button
              type="button"
              onClick={handleRemove}
              aria-label="Remove image"
              className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white"
            >
              ×
            </button>
          )}
        </div>
      ) : (
        <div
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`flex h-28 w-28 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-2 text-center text-xs text-muted transition-colors ${
            isDragging ? "border-accent text-accent" : "border-white/15"
          }`}
        >
          Click or drag an image here
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(event) => handleFile(event.target.files?.[0])}
            className="hidden"
          />
        </div>
      )}

      {error && <p className="mt-2 max-w-[11rem] text-xs text-red-400">{error}</p>}

      <div className="mt-2 flex max-w-[11rem] gap-2">
        <input
          type="text"
          value={urlInput}
          onChange={(event) => setUrlInput(event.target.value)}
          placeholder="...or paste an image URL"
          className="w-full rounded-lg border border-white/10 bg-card px-2 py-1.5 text-xs text-foreground outline-none focus:border-accent"
        />
        <button
          type="button"
          onClick={handleUrlSubmit}
          className="shrink-0 rounded-lg border border-white/10 px-2 py-1.5 text-xs text-muted hover:text-foreground"
        >
          Use
        </button>
      </div>
    </div>
  );
}
