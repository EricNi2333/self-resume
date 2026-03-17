import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "小明 · XiaoMing — Senior Full-Stack Engineer",
  description: "小明的个人简历 / Resume of XiaoMing",
  metadataBase: new URL("https://resume.niconi.space:8443"),
  icons: {
    icon: "/favicons/favicon.svg",
    apple: "/favicons/apple-touch-icon.png",
  },
  openGraph: {
    title: "小明 · XiaoMing — Senior Full-Stack Engineer",
    description: "小明的个人简历 / Resume of XiaoMing",
    url: "https://resume.niconi.space:8443",
    siteName: "XiaoMing Resume",
    locale: "zh_CN",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "小明 · XiaoMing — Senior Full-Stack Engineer",
    description: "小明的个人简历 / Resume of XiaoMing",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body style={{ fontFamily: "'Noto Sans SC', 'PingFang SC', 'Microsoft YaHei', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}