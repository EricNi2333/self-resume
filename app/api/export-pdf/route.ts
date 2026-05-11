import { existsSync } from "fs";
import { mkdir, readFile, rm } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";
import { promisify } from "util";
import { execFile } from "child_process";
import { randomUUID } from "crypto";
import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const execFileAsync = promisify(execFile);

const chromeCandidates = [
  process.env.CHROME_EXECUTABLE_PATH,
  process.env.PUPPETEER_EXECUTABLE_PATH,
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "/usr/bin/chromium-browser",
  "/usr/bin/chromium",
  "/usr/bin/google-chrome",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].filter(Boolean) as string[];

function getChromeExecutablePath() {
  return chromeCandidates.find((candidate) => existsSync(candidate));
}

export async function GET(request: NextRequest) {
  const executablePath = getChromeExecutablePath();

  if (!executablePath) {
    return new Response(
      "Chrome/Chromium executable was not found. Set PUPPETEER_EXECUTABLE_PATH or CHROME_EXECUTABLE_PATH.",
      { status: 500 },
    );
  }

  const lang = request.nextUrl.searchParams.get("lang") === "en" ? "en" : "zh";
  const resumeUrl = new URL(request.nextUrl.origin);
  resumeUrl.searchParams.set("lang", lang);

  const workDir = join(tmpdir(), `resume-pdf-${randomUUID()}`);
  const pdfPath = join(workDir, `resume-${lang}.pdf`);
  const profilePath = join(workDir, "profile");

  try {
    await mkdir(profilePath, { recursive: true });
    await execFileAsync(executablePath, [
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      "--no-pdf-header-footer",
      "--run-all-compositor-stages-before-draw",
      "--virtual-time-budget=5000",
      `--user-data-dir=${profilePath}`,
      `--print-to-pdf=${pdfPath}`,
      resumeUrl.toString(),
    ]);

    const pdf = await readFile(pdfPath);

    return new Response(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="resume-${lang}.pdf"`,
        "Cache-Control": "no-store",
      },
    });
  } finally {
    await rm(workDir, { recursive: true, force: true });
  }
}
