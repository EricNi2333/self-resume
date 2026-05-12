import { ResumePageClient } from "@/components/ResumePageClient";

type Lang = "zh" | "en";

interface HomeProps {
  searchParams: Promise<{
    lang?: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const initialLang: Lang = params.lang === "en" ? "en" : "zh";

  return <ResumePageClient initialLang={initialLang} />;
}
