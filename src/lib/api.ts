import { TopNewsType } from "@/typs/news";
import { apiKeyNews } from "./config";


interface NewsResult {
  news: TopNewsType[] | null;
  error: string | null;
}

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
  } catch (error: unknown) { 
    console.error(`Fetch error for ${subject}:`, error);

    let errorMessage = "An unexpected error occurred.";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'object' && error !== null && 'message' in error) {
      errorMessage = String((error as { message: unknown }).message);
    }
    
    return {
      news: null,
      error: errorMessage,
    };
  }
}

export async function getTopNewsData(): Promise<TopNewsType[] | null> {
  const result = await fetchNewsData("top news");
  if (result.error) {
    console.error("Error fetching top news:", result.error);
    return null;
  }
  return result.news;
}