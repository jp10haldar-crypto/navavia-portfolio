// WHAT THIS FILE DOES: Manages a whole LIST of images (used for a
// project's customer screenshots and admin screenshots) — shows every
// image already added as a thumbnail, lets you drag thumbnails to reorder
// them, remove any one of them (properly deleting it from storage), and
// add more using the single ImageUploader below the list. Runs in the
// browser because it reacts to drag events and clicks.

"use client";

import { useState } from "react";
import ImageUploader from "@/components/admin/ImageUploader";
import { deleteImage } from "@/lib/storage";

export default function ImageListUploader({ value, onChange }) {
  const images = value || [];
  const [dragIndex, setDragIndex] = useState(null);

  function handleAdd(url) {
    onChange([...images, url]);
  }

  async function handleRemove(index) {
    await deleteImage(images[index]);
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

  return (
    <div>
      {images.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-3">
          {images.map((url, index) => (
            <div
              key={`${url}-${index}`}
              draggable
              onDragStart={() => setDragIndex(index)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => handleReorderDrop(index)}
              title="Drag to reorder"
              className="relative h-24 w-24 cursor-move"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt={`Image ${index + 1}`}
                className="h-24 w-24 rounded-lg object-cover"
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
          ))}
        </div>
      )}

      <ImageUploader value="" onChange={handleAdd} />
    </div>
  );
}
