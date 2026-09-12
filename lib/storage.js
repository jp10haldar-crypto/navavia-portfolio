// WHAT THIS FILE DOES: Uploads image files to Cloudinary (a free image
// hosting service — used instead of Firebase Storage, which now requires
// a paid plan). Nothing else in the app talks to Cloudinary directly — it
// always goes through the function below instead. This runs whenever
// someone uploads an image in the admin panel.
//
// Every image is uploaded into the "seller-backbone" folder on Cloudinary
// (never the root), and the link returned points at an automatically
// compressed, modern-format version of the image (via Cloudinary's
// f_auto,q_auto delivery options) so the site loads fast.
//
// Note: Cloudinary's free plan doesn't allow deleting files from the
// browser side (that needs a secret key this app never exposes). So there
// is no "delete from Cloudinary" function here — removing an image in the
// admin panel only removes its link from the database. See the Dashboard
// for a reminder about clearing unused files from the Cloudinary website
// directly if storage ever fills up.

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
const UPLOAD_FOLDER = "seller-backbone";
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

// Inserts Cloudinary's "auto format, auto quality" delivery options into an
// uploaded image's URL, so every time it's viewed, Cloudinary serves a
// compressed, modern-format (e.g. WebP/AVIF) version automatically.
function buildOptimizedUrl(secureUrl) {
  return secureUrl.replace("/upload/", "/upload/f_auto,q_auto/");
}

// Uploads one image file to Cloudinary. Calls onProgress repeatedly with a
// number from 0-100 while it uploads, so the screen can show a progress
// indicator. Resolves with the finished image's public (optimized) link,
// or a clear message explaining what went wrong — it never throws.
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

    if (!CLOUD_NAME || !UPLOAD_PRESET) {
      resolve({
        success: false,
        message:
          "Image uploads aren't set up yet — the Cloudinary cloud name or upload preset is missing from this site's settings.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("folder", UPLOAD_FOLDER);

    const xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    );

    xhr.upload.onprogress = (event) => {
      if (onProgress && event.lengthComputable) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    };

    xhr.onload = () => {
      let data;
      try {
        data = JSON.parse(xhr.responseText);
      } catch {
        resolve({
          success: false,
          message: "The upload failed. Please try again.",
        });
        return;
      }

      if (xhr.status >= 200 && xhr.status < 300 && data.secure_url) {
        resolve({ success: true, url: buildOptimizedUrl(data.secure_url) });
        return;
      }

      const rawMessage = data?.error?.message || "";

      if (/upload preset/i.test(rawMessage)) {
        resolve({
          success: false,
          message:
            "Your Cloudinary upload preset looks incorrect, or it isn't set to allow unsigned uploads. Double-check the preset name and make sure its Signing Mode is set to \"Unsigned\" in your Cloudinary settings.",
        });
        return;
      }

      resolve({
        success: false,
        message: "The upload failed. Please try again.",
      });
    };

    xhr.onerror = () => {
      resolve({
        success: false,
        message:
          "Could not reach Cloudinary. Please check your internet connection and try again.",
      });
    };

    xhr.send(formData);
  });
}
