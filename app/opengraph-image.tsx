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
          background: "#fafaf9",
          padding: "60px 80px",
          gap: "56px",
        }}
      >
        {/* 左：favicon 样式图标 */}
        <div
          style={{
            width: 160,
            height: 160,
            borderRadius: 32,
            background: "#1a1a18",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 30px",
            flexShrink: 0,
          }}
        >
          <div style={{ width: 88, height: 12, borderRadius: 4, background: "#fff", marginBottom: 16 }} />
          <div style={{ width: 70, height: 8,  borderRadius: 3, background: "#fff", opacity: 0.55, marginBottom: 12 }} />
          <div style={{ width: 80, height: 8,  borderRadius: 3, background: "#fff", opacity: 0.35 }} />
        </div>

        {/* 竖分隔线 */}
        <div
          style={{
            width: 1,
            height: 180,
            background: "#e8e6e1",
            flexShrink: 0,
          }}
        />

        {/* 右：信息 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          <span
            style={{ fontSize: 64, fontWeight: 700, color: "#1a1a18", lineHeight: 1.1 }}
          >
            Nico Ni
          </span>
          <span
            style={{ fontSize: 28, color: "#777", marginTop: 16, lineHeight: 1 }}
          >
            Cloud BMS Engineer · EV & ESS
          </span>

          {/* 分隔线 */}
          <div
            style={{
              width: "100%",
              height: 1,
              background: "#e8e6e1",
              margin: "28px 0",
            }}
          />

          {/* 标签 */}
          <div style={{ display: "flex", gap: 12 }}>
            {["Python", "Go", "Engineer", "BigData"].map((tag) => (
              <div
                key={tag}
                style={{
                  padding: "8px 20px",
                  borderRadius: 8,
                  background: "#efefed",
                  color: "#444",
                  fontSize: 22,
                }}
              >
                {tag}
              </div>
            ))}
          </div>

          {/* URL */}
          <span style={{ fontSize: 20, color: "#bbb", marginTop: 28 }}>
            home.xiaoming.space
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
