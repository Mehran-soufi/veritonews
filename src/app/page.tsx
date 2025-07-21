import Hero from "@/components/Hero";
import PreviewHero from "@/components/PreviewHero";
import { apiKeyNews } from "@/lib/config";


export interface TopNewsType {
  id: number;
  title: string;
  text: string;
  summary: string;
  url: string;
  image: string;
  video: string | null;
  publish_date: string;
  authors: string[];
  language: string;
  source_country: string;
  sentiment: number;
}

async function getTopNews(): Promise<TopNewsType[] | null> {
  try {
    const res = await fetch(
      `https://api.worldnewsapi.com/top-news?source-country=us&language=en&api-key=${apiKeyNews}`
    );

    if (!res.ok) {
      throw new Error("Error!");
    }

    const data = await res.json();
    const topStories: TopNewsType[] = data.top_news
      .map((cluster: { news: TopNewsType[] }) => cluster.news[0])
      .filter(Boolean);
    return topStories;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export default async function HomePage() {
  const topNews: TopNewsType[] | null = await getTopNews();

  if (!topNews || topNews.length === 0) {
    throw new Error("Error!");
  }

  return (
    <div className="w-full flex flex-col gap-8">
      <Hero topNews={topNews} />
      <PreviewHero />
    </div>
  );
}
