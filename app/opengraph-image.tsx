import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          background: "#0f172a",
          padding: "60px 80px",
          gap: "48px",
        }}
      >
        {/* 左：Monogram */}
        <div
          style={{
            width: 180,
            height: 180,
            borderRadius: 36,
            background: "#1e293b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 108, color: "#e2e8f0", fontWeight: 700 }}>
            N
          </span>
        </div>

        {/* 右：信息 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          <span
            style={{ fontSize: 56, fontWeight: 700, color: "#f1f5f9", lineHeight: 1.15 }}
          >
            小明 · XiaoMing
          </span>
          <span
            style={{ fontSize: 28, color: "#94a3b8", marginTop: 12, lineHeight: 1 }}
          >
            Senior Full-Stack Engineer
          </span>

          {/* 分隔线 */}
          <div
            style={{
              width: "100%",
              height: 1,
              background: "#334155",
              margin: "28px 0",
            }}
          />

          {/* 技术标签 */}
          <div style={{ display: "flex", gap: 12 }}>
            {["Go", "Next.js", "PyBaMM", "ESS"].map((tag) => (
              <div
                key={tag}
                style={{
                  padding: "6px 16px",
                  borderRadius: 8,
                  background: "#1e3a5f",
                  color: "#7dd3fc",
                  fontSize: 22,
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}