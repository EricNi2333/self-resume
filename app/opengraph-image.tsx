import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div style={{
        width: "100%", height: "100%",
        display: "flex", alignItems: "center",
        background: "#fafaf9",
        padding: "0 80px", gap: 56,
        fontFamily: "sans-serif",
      }}>
        {/* Left: favicon-style mark */}
        <div style={{
          width: 140, height: 140, flexShrink: 0,
          borderRadius: 28, background: "#1a1a18",
          display: "flex", flexDirection: "column",
          justifyContent: "center", padding: "0 28px", gap: 0,
        }}>
          <div style={{ width: 84, height: 11, borderRadius: 4, background: "#fff", marginBottom: 14 }}/>
          <div style={{ width: 68, height: 7,  borderRadius: 3, background: "#fff", opacity: 0.55, marginBottom: 10 }}/>
          <div style={{ width: 76, height: 7,  borderRadius: 3, background: "#fff", opacity: 0.35 }}/>
        </div>

        {/* Divider */}
        <div style={{ width: 1, height: 160, background: "#e8e6e1", flexShrink: 0 }}/>

        {/* Right: text */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          <span style={{
            fontSize: 64, fontWeight: 700, color: "#1a1a18",
            fontFamily: "Georgia, serif", lineHeight: 1.1, marginBottom: 16,
          }}>
            Nico Ni
          </span>
          <span style={{ fontSize: 28, color: "#666", marginBottom: 28 }}>
            Cloud BMS Engineer · EV &amp; ESS
          </span>
          <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
            {["Python", "Go", "数据分析", "算法设计"].map(tag => (
              <div key={tag} style={{
                padding: "6px 18px", borderRadius: 8,
                background: "#ebebea", color: "#444", fontSize: 22,
              }}>{tag}</div>
            ))}
          </div>
          <span style={{ fontSize: 22, color: "#aaa", fontFamily: "monospace" }}>
            专注于构建高性能、可扩展的 Web 应用，熟练掌握 React、Node.js 及云原生架构，曾主导多个千万级用户产品的技术设计与落地。
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}