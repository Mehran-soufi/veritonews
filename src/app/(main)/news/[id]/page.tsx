import NewsLeftBar from "@/components/NewsLeftBar";
import VeritoImage from "@/components/VeritoImage";
import { apiKeyNews } from "@/lib/config";
import { TopNewsType } from "@/typs/news";
import { Calendar, MapPin, Pen, Quote, Smile, Frown, Meh } from "lucide-react";
import Link from "next/link";

import { getDomainName } from "@/utils/urlHelpers";

type NewsPageProps = {
  params: {
    id: string | string[]; 
  };
};

/**
 * Fetches a specific news article by its ID from the WorldNewsAPI.
 * @param id The ID of the news article (can be string or string[]).
 * @returns A Promise resolving to an array containing the news article, or null if not found/error.
 */
async function getNews({ id }: { id: string | string[] }): Promise<TopNewsType[] | null> {
  const newsId = Array.isArray(id) ? id[0] : id; 

  try {
    const res = await fetch(
      `https://api.worldnewsapi.com/retrieve-news?ids=${newsId}&language=en&api-key=${apiKeyNews}`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      console.error(`API Error: ${res.status} - ${res.statusText}`);
      const errorData = await res.json();
      console.error("API Error Details:", errorData);
      return null;
    }

    const data = await res.json();
    return data.news || null;
  } catch (error: unknown) {
    console.error("Fetch error in getNews:", error);
    if (error instanceof Error) {
        console.error("Error message:", error.message);
    }
    return null;
  }
}

interface SentimentDisplay {
  icon: React.ElementType; 
  text: string;
  colorClass: string; 
}

/**
 * Determines the sentiment icon, text, and color based on a sentiment score.
 * @param score The sentiment score (number) or undefined/null.
 * @returns An object containing the icon component, text, and Tailwind CSS color class.
 */
function getSentimentDisplay(score: number | undefined | null): SentimentDisplay {
  if (score === undefined || score === null) {
    return { icon: Meh, text: "Neutral", colorClass: "text-gray-500" };
  }

  if (score < -0.5) {
    return { icon: Frown, text: "Negative", colorClass: "text-red-500" };
  } else if (score > 0.5) {
    return { icon: Smile, text: "Positive", colorClass: "text-green-500" };
  } else {
    return { icon: Meh, text: "Neutral", colorClass: "text-yellow-500" };
  }
}

export default async function NewsPage({ params }: NewsPageProps) {
  const newsIdString = Array.isArray(params.id) ? params.id[0] : params.id;

  const news: TopNewsType[] | null = await getNews({ id: newsIdString });

  if (!news || news.length === 0) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-2xl font-bold text-red-600">News Not Found or Error</h1>
        <p className="text-lg text-gray-700 mt-2">
          We could not retrieve the news article with ID: <span className="font-mono">{newsIdString}</span>.
        </p>
        <p className="text-md text-gray-600 mt-1">
          It might have been removed, or there was an issue fetching it. Please try again later.
        </p>
        <Link href="/" className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          Go to Homepage
        </Link>
      </div>
    );
  }

  const item = news[0];

  const sourceDomain = getDomainName(item.url);
  const sentimentDisplay = getSentimentDisplay(item.sentiment);

  return (
    <div
      className="w-full min-h-screen lg:py-8 sm:py-6 py-4 flex flex-col lg:flex-row items-start gap-2"
    >
      {/* Main News */}
      <div className="w-full lg:w-3/4 p-2">
        <div className="w-full flex flex-col gap-4">
          <div className="w-full flex items-center justify-between flex-wrap text-sm font-sans opacity-60">
            <div className="flex items-center gap-1">
              <Calendar size={20} />
              <p>{item.publish_date}</p>
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={20} />
              <p>{item.source_country || "N/A"}</p>
            </div>
          </div>
          <div className="w-full">
            <h1 className="font-bold xl:text-3xl lg:text-2xl sm:text-xl text-lg pb-2 border-b">
              {item.title}
            </h1>
          </div>
          {item.summary && (
            <div className="w-full flex flex-col gap-1 relative pl-3">
              <span className="absolute left-0 top-0 w-2 h-full bg-chart-4"></span>
              <Quote size={22} />
              <h2 className="font-semibold lg:text-xl sm:text-lg">
                {item.summary}
              </h2>
            </div>
          )}
          <div className="w-full xl:h-[500px] md:h-[400px] sm:h-[350px] h-[300px]">
            {item.image ? (
              <VeritoImage image={item.image} alt={item.title || "news image"} />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">No Image Available</div>
            )}
          </div>
          <div className="w-full flex items-center justify-between flex-wrap text-sm font-sans opacity-60">
            {item.authors && item.authors.length > 0 && (
              <>
                {item.authors.map((author, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <Pen size={20} />
                    <p>{author}</p>
                    {index < item.authors.length - 1 && (
                      <span>-</span>
                    )}
                  </div>
                ))}
              </>
            )}
            <div
              className={`flex items-center gap-1 ${sentimentDisplay.colorClass}`}
            >
              <sentimentDisplay.icon size={20} />
              <p>{sentimentDisplay.text}</p>
            </div>
          </div>
          <div className="w-full bg-accent">
            <p className="p-2">{item.text}</p>
          </div>
          {sourceDomain && (
            <div className="flex items-center gap-1">
              <p className="font-semibold">Source : </p>
              <Link
                href={item.url}
                target="_blank"
                className="text-blue-500 hover:underline"
              >
                {sourceDomain}
              </Link>
            </div>
          )}
          {item.video && (
            <div className="w-full xl:h-[500px] md:h-[400px] sm:h-[350px] h-[300px]">
              <video controls src={item.video} className="w-full h-full" />
            </div>
          )}
        </div>
      </div>

      {/* Other News */}
      <div className="w-full lg:w-1/4 p-2 lg:sticky top-[15%]">
        <NewsLeftBar />
      </div>
    </div>
  );
}