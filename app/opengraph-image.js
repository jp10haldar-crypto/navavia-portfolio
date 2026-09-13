// WHAT THIS FILE DOES: Automatically generates the image shown when the
// homepage is shared on WhatsApp, LinkedIn, or anywhere else that shows a
// link preview. Next.js builds this image itself (using the brand colors
// and name below) and wires it into the site's metadata automatically —
// nothing else needs to reference this file by name.

import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0f0f0f",
        }}
      >
        <div style={{ fontSize: 100, fontWeight: 700, color: "#f5f5f5" }}>
          Navavia
        </div>
        <div style={{ fontSize: 36, color: "#a1a1a1", marginTop: 24 }}>
          Where Ideas Take Form
        </div>
      </div>
    ),
    { ...size }
  );
}
