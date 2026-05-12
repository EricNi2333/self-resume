import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "XiaoMing — Senior Full-Stack Engineer",
  description: "XiaoMing's Resume",
  metadataBase: new URL("https://resume.xiaoming.space"),
  manifest: "/favicons/site.webmanifest",
  icons: {
    icon: "/favicons/favicon.svg",
    apple: "/favicons/apple-touch-icon.png",
  },
  openGraph: {
    title: "XiaoMing — Senior Full-Stack Engineer",
    description: "XiaoMing's Resume",
    url: "https://resume.xiaoming.space",
    siteName: "XiaoMing Resume",
    locale: "zh_CN",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "XiaoMing — Senior Full-Stack Engineer",
    description: "XiaoMing's Resume",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body style={{ fontFamily: "'Microsoft YaHei', 'PingFang SC', 'WenQuanYi Zen Hei', 'Noto Sans CJK SC', sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
