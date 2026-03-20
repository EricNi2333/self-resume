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
          justifyContent: "center",
          background: "linear-gradient(135deg, #f5f5f4 0%, #e7e5e4 100%)",
          padding: "0 80px",
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.03, backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "rgba(255, 255, 255, 0.8)",
            padding: "80px",
            borderRadius: "40px",
            border: "1px solid rgba(255, 255, 255, 0.5)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.05)",
            gap: "60px",
            position: "relative",
          }}
        >
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

          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 72, fontWeight: 800, color: "#1c1917", letterSpacing: "-0.02em", lineHeight: 1 }}>
              Xiao Ming
            </span>

            <span style={{ fontSize: 32, color: "#44403c", marginTop: 12, fontWeight: 500 }}>
              Cloud BMS Engineer <span style={{ color: "#a8a29e", margin: "0 10px" }}>|</span> ShangHai
            </span>

            <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
              {["Python", "Go", "BigData", "Agent"].map((tag) => (
                <div
                  key={tag}
                  style={{
                    padding: "10px 24px",
                    borderRadius: 12,
                    background: "#1a1a18",
                    color: "#fff",
                    fontSize: 20,
                    fontWeight: 600,
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", marginTop: 48, gap: 12 }}>
              <div style={{ height: 2, flex: 1, background: "linear-gradient(to right, #e7e5e4, transparent)" }} />
              <span style={{ fontSize: 22, color: "#78716c", fontFamily: "monospace", fontWeight: 500 }}>
                home.xiaoming.space
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}