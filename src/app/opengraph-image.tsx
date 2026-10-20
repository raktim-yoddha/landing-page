import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt = "Raktim Yoddha: win more customers, even while you sleep";
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
          justifyContent: "space-between",
          background: "#fffef2",
          color: "#2b2b2b",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 64, height: 64, background: "#ff2b00", color: "#fffef2", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, fontWeight: 700 }}>
            RY
          </div>
          <div style={{ fontSize: 28, color: "#ff2b00", fontWeight: 700 }}>RAKTIM YODDHA</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 84, lineHeight: 1, letterSpacing: -3 }}>
          <span>Win more customers,</span>
          <span style={{ fontStyle: "italic", color: "#cc5237" }}>even while you sleep.</span>
        </div>
        <div style={{ fontSize: 30 }}>Websites · Apps · Automations · Chatbots · Local search · Outreach</div>
      </div>
    ),
    size,
  );
}
