// WHAT THIS FILE DOES: Manages a whole LIST of images (used for a
// project's customer screenshots and admin screenshots) — shows every
// image already added as a thumbnail with its own caption box underneath,
// lets you drag thumbnails to reorder them, remove any one of them, and
// add more by selecting several files at once or dragging several onto the
// drop zone in one go. Each new image uploads independently with its own
// progress, so one failing never stops the others, and a failed one shows
// exactly which file it was and why. Runs in the browser because it reacts
// to drag events, file selection, upload progress, and typing.
//
// Each image is stored as { url, caption } — older projects saved before
// captions existed have plain URL strings instead; those are treated the
// same as { url: thatString, caption: "" } wherever they're read, so
// nothing about them breaks.
//
// Note: "Remove" only takes an image out of this list — images are hosted
// on Cloudinary's free plan, which doesn't support deleting files from the
// browser side, so removing one here never deletes the actual file.

"use client";

import { useEffect, useRef, useState } from "react";
import { uploadImage } from "@/lib/storage";

function normalizeImages(value) {
  return (value || []).map((item) =>
    typeof item === "string" ? { url: item, caption: "" } : item
  );
}

export default function ImageListUploader({ value, onChange }) {
  const images = normalizeImages(value);
  const imagesRef = useRef(images);
  useEffect(() => {
    imagesRef.current = images;
  });

  const [dragIndex, setDragIndex] = useState(null);
  const [isDraggingFiles, setIsDraggingFiles] = useState(false);
  const [uploads, setUploads] = useState([]); // in-flight: {id, fileName, progress, status, message}
  const [urlInput, setUrlInput] = useState("");
  const fileInputRef = useRef(null);

  function handleUrlSubmit() {
    const trimmed = urlInput.trim();
    if (trimmed) {
      onChange([...images, { url: trimmed, caption: "" }]);
      setUrlInput("");
    }
  }

  function handleCaptionChange(index, caption) {
    const next = [...images];
    next[index] = { ...next[index], caption };
    onChange(next);
  }

  function handleRemove(index) {
    onChange(images.filter((_, i) => i !== index));
  }

  function handleReorderDrop(targetIndex) {
    if (dragIndex === null || dragIndex === targetIndex) return;
    const reordered = [...images];
    const [moved] = reordered.splice(dragIndex, 1);
    reordered.splice(targetIndex, 0, moved);
    onChange(reordered);
    setDragIndex(null);
  }

  function dismissUpload(uploadId) {
    setUploads((current) => current.filter((u) => u.id !== uploadId));
  }

  function handleFiles(fileList) {
    const files = Array.from(fileList || []);
    if (files.length === 0) return;

    const newUploads = files.map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      fileName: file.name,
      progress: 0,
      status: "uploading",
      message: "",
    }));
    setUploads((current) => [...current, ...newUploads]);

    files.forEach((file, i) => {
      const uploadId = newUploads[i].id;

      uploadImage(file, (progress) => {
        setUploads((current) =>
          current.map((u) => (u.id === uploadId ? { ...u, progress } : u))
        );
      }).then((result) => {
        if (result.success) {
          onChange([...imagesRef.current, { url: result.url, caption: "" }]);
          setUploads((current) => current.filter((u) => u.id !== uploadId));
        } else {
          setUploads((current) =>
            current.map((u) =>
              u.id === uploadId
                ? { ...u, status: "error", message: result.message }
                : u
            )
          );
        }
      });
    });
  }

  function handleDrop(event) {
    event.preventDefault();
    setIsDraggingFiles(false);
    handleFiles(event.dataTransfer.files);
  }

  return (
    <div>
      {(images.length > 0 || uploads.length > 0) && (
        <div className="mb-3 flex flex-wrap gap-4">
          {images.map((image, index) => (
            <div
              key={`${image.url}-${index}`}
              draggable
              onDragStart={() => setDragIndex(index)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => handleReorderDrop(index)}
              className="flex w-28 flex-col gap-1"
            >
              <div
                title="Drag to reorder"
                className="relative h-24 w-28 cursor-move"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.url}
                  alt={image.caption || `Image ${index + 1}`}
                  className="h-24 w-28 rounded-lg object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  aria-label="Remove image"
                  className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white"
                >
                  ×
                </button>
              </div>
              <input
                type="text"
                value={image.caption || ""}
                onChange={(event) =>
                  handleCaptionChange(index, event.target.value)
                }
                placeholder="Caption (optional)"
                className="w-full rounded-md border border-white/10 bg-background px-2 py-1 text-xs text-foreground outline-none focus:border-accent"
              />
            </div>
          ))}

          {uploads.map((upload) => (
            <div key={upload.id} className="flex w-28 flex-col gap-1">
              <div className="relative flex h-24 w-28 flex-col items-center justify-center rounded-lg bg-background p-2 text-center">
                {upload.status === "uploading" ? (
                  <>
                    <span className="text-lg font-semibold text-foreground">
                      {upload.progress}%
                    </span>
                    <span className="mt-1 line-clamp-1 text-[10px] text-muted">
                      {upload.fileName}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-xs font-semibold text-red-400">
                      Failed
                    </span>
                    <button
                      type="button"
                      onClick={() => dismissUpload(upload.id)}
                      aria-label="Dismiss"
                      className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white"
                    >
                      ×
                    </button>
                  </>
                )}
              </div>
              {upload.status === "error" && (
                <p className="text-[10px] leading-tight text-red-400">
                  {upload.fileName}: {upload.message}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      <div
        onDragOver={(event) => {
          event.preventDefault();
          setIsDraggingFiles(true);
        }}
        onDragLeave={() => setIsDraggingFiles(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`flex h-24 w-full max-w-xs cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed px-2 text-center text-xs text-muted transition-colors ${
          isDraggingFiles ? "border-accent text-accent" : "border-white/15"
        }`}
      >
        Click or drag one or more images here
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(event) => handleFiles(event.target.files)}
          className="hidden"
        />
      </div>

      <div className="mt-2 flex max-w-xs gap-2">
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
