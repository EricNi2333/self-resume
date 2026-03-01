import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "小明 · XiaoMing — Senior Full-Stack Engineer",
  description: "小明的个人简历 / Resume of XiaoMing",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
