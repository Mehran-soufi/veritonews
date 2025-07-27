import { apiKeyNews } from "@/lib/config";
import { TopNewsType } from "@/typs/news";

export async function getTopNews(): Promise<TopNewsType[] | null> {
  try {
    const res = await fetch(
      `https://api.worldnewsapi.com/top-news?source-country=us&language=en&api-key=${apiKeyNews}`
    );
    const data = await res.json();
    const topStories: TopNewsType[] = data.top_news
      .map((cluster: { news: TopNewsType[] }) => cluster.news[0])
      .filter(Boolean);
    return topStories;
  } catch (error) {
    return null;
  }
}
