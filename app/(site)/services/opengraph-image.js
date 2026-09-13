// WHAT THIS FILE DOES: Automatically generates the image shown when the
// /services page specifically is shared on WhatsApp, LinkedIn, or anywhere
// else that shows a link preview. Placed here (rather than relying on the
// homepage's own version of this file) because each page's preview image
// only applies to that one page — a page with no image of its own gets no
// preview image at all, so every page that needs one gets its own file
// like this. Next.js builds this automatically; nothing else needs to
// reference this file by name.

import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function ServicesOpengraphImage() {
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
        <div style={{ fontSize: 80, fontWeight: 700, color: "#f5f5f5" }}>
          What We Build
        </div>
        <div style={{ fontSize: 32, color: "#a1a1a1", marginTop: 24 }}>
          Websites · Mobile Apps · Business Systems
        </div>
        <div style={{ fontSize: 24, color: "#f5a524", marginTop: 40 }}>
          Navavia
        </div>
      </div>
    ),
    { ...size }
  );
}
