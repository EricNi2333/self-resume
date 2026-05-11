"use client";

import { useState, useEffect } from "react";
import { ResumeData } from "@/lib/types";
import { Resume } from "@/components/Resume";
import { Download } from "lucide-react";

type Lang  = "zh" | "en";
type Theme = "system" | "light" | "dark";

export default function Home() {
  const [lang,       setLang]       = useState<Lang>("zh");
  const [theme,      setTheme]      = useState<Theme>("system");
  const [systemDark, setSystemDark] = useState(false);
  const [exporting,  setExporting]  = useState(false);
  const [zhData,     setZhData]     = useState<ResumeData | null>(null);
  const [enData,     setEnData]     = useState<ResumeData | null>(null);

  /* ── Fetch resume data from public/ (edit JSON without rebuilding) ── */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get("lang");
    if (urlLang === "zh" || urlLang === "en") {
      setLang(urlLang);
    }

    fetch("/resume-data.zh.json").then(r => r.json()).then(setZhData);
    fetch("/resume-data.en.json").then(r => r.json()).then(setEnData);
  }, []);

  /* ── Track system color-scheme preference ── */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setSystemDark(mq.matches);
    const handler = (e: MediaQueryListEvent) => setSystemDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  /* ── Apply theme to <html> (no attr = let CSS media-query decide) ── */
  useEffect(() => {
    if (theme === "system") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  const isDark = theme === "dark" || (theme === "system" && systemDark);
  const data   = lang === "zh" ? zhData : enData;

  /* system → light → dark → system */
  const cycleTheme = () =>
    setTheme(t => t === "system" ? "light" : t === "light" ? "dark" : "system");

  const exportPdf = async () => {
    try {
      setExporting(true);
      const response = await fetch(`/api/export-pdf?lang=${lang}`);
      if (!response.ok) {
        throw new Error(await response.text());
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${data?.name || "resume"}-${lang}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
      window.print();
    } finally {
      setExporting(false);
    }
  };

  const themeLabel = (l: Lang) => {
    if (theme === "system") return l === "zh" ? "跟随系统" : "System";
    if (theme === "light")  return l === "zh" ? "白天"     : "Light";
    return                         l === "zh" ? "夜晚"     : "Dark";
  };

  const segBtn = (active: boolean): React.CSSProperties => ({
    padding: "5px 14px",
    cursor: "pointer",
    border: "none",
    background: active ? "var(--toolbar-btn-active-bg)"   : "var(--toolbar-btn-idle-bg)",
    color:      active ? "var(--toolbar-btn-active-text)"  : "var(--toolbar-btn-idle-text)",
    fontFamily: "system-ui, sans-serif",
    fontSize: "12px",
    fontWeight: 500,
    transition: "background 0.15s, color 0.15s",
  });

  return (
    <main className="page-shell" style={{ background: "var(--bg-page)", minHeight: "100vh", padding: "40px 16px 60px", transition: "background 0.2s" }}>

      {/* ── Toolbar ── */}
      <div className="no-print toolbar-wrap">

        {/* PDF export */}
        <button onClick={exportPdf} disabled={exporting || !data} title="Export PDF" style={{
          display: "flex", alignItems: "center", gap: "6px",
          fontSize: "12px", fontWeight: 500,
          color: exporting ? "var(--text-faint)" : "var(--toolbar-btn-idle-text)",
          background: "var(--toolbar-btn-idle-bg)",
          border: "1px solid var(--toolbar-btn-border)",
          borderRadius: "6px", padding: "5px 14px", cursor: exporting ? "wait" : "pointer",
          opacity: exporting || !data ? 0.7 : 1,
          fontFamily: "system-ui, sans-serif", transition: "background 0.15s, color 0.15s",
        }}>
          <Download size={14} />
          {exporting ? (lang === "zh" ? "导出中" : "Exporting") : "PDF"}
        </button>

        {/* Theme toggle */}
        <button onClick={cycleTheme} title={themeLabel(lang)} style={{
          display: "flex", alignItems: "center", gap: "6px",
          fontSize: "12px", fontWeight: 500,
          color: "var(--toolbar-btn-idle-text)",
          background: "var(--toolbar-btn-idle-bg)",
          border: "1px solid var(--toolbar-btn-border)",
          borderRadius: "6px", padding: "5px 14px", cursor: "pointer",
          fontFamily: "system-ui, sans-serif", transition: "background 0.15s, color 0.15s",
        }}>
          {theme === "system" ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
            </svg>
          ) : isDark ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"/>
              <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
          {themeLabel(lang)}
        </button>

        {/* Language toggle */}
        <div style={{ display: "flex", border: "1px solid var(--toolbar-btn-border)", borderRadius: "6px", overflow: "hidden" }}>
          <button onClick={() => setLang("zh")} style={{ ...segBtn(lang === "zh"), borderRight: "1px solid var(--toolbar-btn-border)" }}>中文</button>
          <button onClick={() => setLang("en")} style={segBtn(lang === "en")}>EN</button>
        </div>

      </div>

      {/* Resume */}
      {data
        ? <Resume data={data} lang={lang} />
        : (
          <div style={{
            maxWidth: "210mm", margin: "0 auto", padding: "80px 0",
            textAlign: "center", color: "var(--text-muted)", fontSize: "13px",
          }}>
            Loading…
          </div>
        )
      }
    </main>
  );
}
