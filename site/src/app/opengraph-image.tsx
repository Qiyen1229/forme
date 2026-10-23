import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Qiyen — Building My Own Future.";
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
          padding: 72,
          background: "#09090B",
          color: "#F5F5F7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", color: "#85858F", fontSize: 22, letterSpacing: 6 }}>
          PERSONAL DIGITAL IDENTITY
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 168, letterSpacing: 26, fontWeight: 500 }}>
            QIYEN
          </div>
          <div style={{ display: "flex", marginTop: 20, fontSize: 38, letterSpacing: 8, color: "#C8A96B" }}>
            BUILDING MY OWN FUTURE
            <span style={{ color: "#E8A7BD" }}>.</span>
          </div>
        </div>
        <div style={{ display: "flex", height: 2, background: "linear-gradient(90deg,#C8A96B,#E8A7BD,transparent)" }} />
      </div>
    ),
    size,
  );
}
