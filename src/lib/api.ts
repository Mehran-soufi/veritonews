import { TopNewsType } from "@/typs/news";
import { apiKeyNews } from "./config";


interface NewsResult {
  news: TopNewsType[] | null;
  error: string | null;
}

/**
 * fetches news data for a given subject from the WorldNewsAPI.
 * Includes caching and error handling.
 * @param subject The news subject to search for (e.g., "sport", "politics").
 * @returns A Promise resolving to NewsResult containing news articles or an error.
 */
export async function fetchNewsData(subject: string): Promise<NewsResult> {
  try {
    const url = `https://api.worldnewsapi.com/search-news?text=${subject}&language=en&api-key=${apiKeyNews}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });

    if (!res.ok) {
      const errorData = await res.json();
      console.error(`API Error Response for ${subject}:`, errorData);
      return {
        news: null,
        error: errorData.message || `Error fetching news: ${res.statusText}`,
      };
    }
    const data = await res.json();
    return { news: data.news || [], error: null };
  } catch (error: any) {
    console.error(`Fetch error for ${subject}:`, error);
    return {
      news: null,
      error: error.message || "An unexpected error occurred.",
    };
  }
}

/**
 * Fetches top news data. Currently uses fetchNewsData with a generic "top news" subject.
 * @returns A Promise resolving to an array of TopNewsType or null if an error occurs.
 */
export async function getTopNewsData(): Promise<TopNewsType[] | null> {
  const result = await fetchNewsData("top news");
  if (result.error) {
    console.error("Error fetching top news:", result.error);
    return null;
  }
  return result.news;
}