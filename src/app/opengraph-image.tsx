import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Noreina Studio — Full-Stack Web Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #050510 0%, #0a0a1a 40%, #111827 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "linear-gradient(135deg, #3b82f6, #7c3aed)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            N
          </div>
          <span style={{ fontSize: 28, fontWeight: 600, opacity: 0.9 }}>Noreina Studio</span>
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: -2,
            maxWidth: 900,
          }}
        >
          Full-Stack Web Developer
        </div>
        <div style={{ fontSize: 28, marginTop: 24, color: "#94a3b8", maxWidth: 800 }}>
          Modern websites, ecommerce & business systems — Ethiopia-based, worldwide delivery.
        </div>
      </div>
    ),
    { ...size }
  );
}
