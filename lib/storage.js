// WHAT THIS FILE DOES: Every function the app uses to upload or delete
// image files in Firebase Storage (where the actual image files live,
// separate from Firestore which only stores data/text). Nothing else in
// the app talks to Storage directly — it always goes through one of these
// functions instead. These run whenever someone uploads or removes an
// image in the admin panel.

import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "@/lib/firebase";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

// Checks whether a URL actually points at a file stored in THIS app's
// Firebase Storage (as opposed to a URL someone pasted in from elsewhere).
// Used so we only ever try to delete files we actually own.
function isFirebaseStorageUrl(url) {
  return typeof url === "string" && url.includes("firebasestorage");
}

// Uploads one image file to Firebase Storage. Calls onProgress repeatedly
// with a number from 0-100 while it uploads, so the screen can show a
// progress indicator. Resolves with the finished image's public link, or a
// clear message explaining what went wrong (wrong file type, too large, or
// a failed upload) — it never throws.
export function uploadImage(file, onProgress) {
  return new Promise((resolve) => {
    if (!file.type.startsWith("image/")) {
      resolve({
        success: false,
        message: "Please choose an image file (JPG, PNG, etc.).",
      });
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      resolve({
        success: false,
        message: "That image is too large. Please choose one under 5MB.",
      });
      return;
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const path = `uploads/${Date.now()}-${safeName}`;
    const storageRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        if (onProgress) {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          onProgress(percent);
        }
      },
      () => {
        resolve({
          success: false,
          message: "The upload failed. Please try again.",
        });
      },
      async () => {
        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resolve({ success: true, url });
        } catch {
          resolve({
            success: false,
            message:
              "The upload finished, but the image link could not be retrieved.",
          });
        }
      }
    );
  });
}

// Gets a fresh public link for an image already in storage, given its
// internal path (not normally needed since uploadImage already returns
// the link directly, but available if a path is ever stored instead).
export async function getImageLink(path) {
  try {
    const url = await getDownloadURL(ref(storage, path));
    return { success: true, url };
  } catch {
    return { success: false, message: "Could not find that image." };
  }
}

// Deletes one image from storage, given its public URL. If the URL points
// somewhere outside this app's storage (e.g. a pasted external link),
// this safely does nothing instead of trying (and failing) to delete it.
export async function deleteImage(url) {
  if (!isFirebaseStorageUrl(url)) {
    return { success: true };
  }

  try {
    await deleteObject(ref(storage, url));
    return { success: true };
  } catch {
    return {
      success: false,
      message: "Could not delete this image. Please try again.",
    };
  }
}
