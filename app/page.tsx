"use client";

import { useState, useEffect } from "react";
import { resumeData } from "@/lib/resume-data";
import { resumeDataEn } from "@/lib/resume-data-en";
import { Resume } from "@/components/Resume";

type Lang = "zh" | "en";
type Theme = "light" | "dark";

export default function Home() {
  const [lang, setLang]   = useState<Lang>("zh");
  const [theme, setTheme] = useState<Theme>("light");
  const data = lang === "zh" ? resumeData : resumeDataEn;

  /* apply theme to <html> */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme === "dark" ? "dark" : "");
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === "light" ? "dark" : "light");
  const isDark = theme === "dark";

  /* ── shared button styles ── */
  const segBtn = (active: boolean): React.CSSProperties => ({
    padding: "5px 14px",
    cursor: "pointer",
    border: "none",
    background: active ? "var(--toolbar-btn-active-bg)" : "var(--toolbar-btn-idle-bg)",
    color:      active ? "var(--toolbar-btn-active-text)" : "var(--toolbar-btn-idle-text)",
    fontFamily: "system-ui, sans-serif",
    fontSize: "12px",
    fontWeight: 500,
    transition: "background 0.15s, color 0.15s",
  });


  return (
    <main style={{ background: "var(--bg-page)", minHeight: "100vh", padding: "40px 16px 60px", transition: "background 0.2s" }}>

      {/* ── Toolbar ── */}
      <div className="no-print" style={{ maxWidth: "210mm", margin: "0 auto 16px", display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "8px" }}>

        {/* Theme toggle */}
        <button onClick={toggleTheme} title={isDark ? "切换白天模式" : "切换夜晚模式"} style={{
          display: "flex", alignItems: "center", gap: "6px",
          fontSize: "12px", fontWeight: 500,
          color: "var(--toolbar-btn-idle-text)",
          background: "var(--toolbar-btn-idle-bg)",
          border: "1px solid var(--toolbar-btn-border)",
          borderRadius: "6px", padding: "5px 14px", cursor: "pointer",
          fontFamily: "system-ui, sans-serif", transition: "background 0.15s, color 0.15s",
        }}>
          {isDark ? (
            /* Sun icon */
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          ) : (
            /* Moon icon */
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
          {isDark ? (lang === "zh" ? "白天" : "Light") : (lang === "zh" ? "夜晚" : "Dark")}
        </button>

        {/* Language toggle */}
        <div style={{ display: "flex", border: "1px solid var(--toolbar-btn-border)", borderRadius: "6px", overflow: "hidden" }}>
          <button onClick={() => setLang("zh")} style={{ ...segBtn(lang === "zh"), borderRight: "1px solid var(--toolbar-btn-border)" }}>中文</button>
          <button onClick={() => setLang("en")} style={segBtn(lang === "en")}>EN</button>
        </div>

      </div>

      {/* Resume */}
      <Resume data={data} lang={lang} />
    </main>
  );
}
