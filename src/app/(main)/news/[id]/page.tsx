import NewsLeftBar from "@/components/NewsLeftBar";
import VeritoImage from "@/components/VeritoImage";
import { apiKeyNews } from "@/lib/config";
import { TopNewsType } from "@/typs/news";
import { Calendar, MapPin, Pen, Quote, Smile, Frown, Meh } from "lucide-react";
import Link from "next/link";

import { getDomainName } from "@/utils/urlHelpers";

interface NewsPageProps {
  params: {
    id: string;
  };
}

async function getNews({ id }: { id: string }): Promise<TopNewsType[] | null> {
  try {
    const res = await fetch(
      `https://api.worldnewsapi.com/retrieve-news?ids=${id}&language=en&api-key=${apiKeyNews}`
    );
    const data = await res.json();
    return data.news || null;
  } catch (error) {
    return null;
  }
}

interface SentimentDisplay {
  icon: React.ElementType;
  text: string;
  colorClass: string;
}

function getSentimentDisplay(score: number | undefined): SentimentDisplay {
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
  const news: TopNewsType[] | null = await getNews({ id: params.id });

  if (!news || news.length === 0) {
    throw new Error("Error!");
  }

  const item = news[0];

  const sourceDomain = getDomainName(item.url);
  const sentimentDisplay = getSentimentDisplay(item.sentiment);

  return (
    <div
      className={`${
        news
          ? "w-full min-h-screen lg:py-8 sm:py-6 py-4 flex flex-col lg:flex-row items-start gap-2"
          : "w-full h-screen flex items-center justify-center"
      }`}
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
              <p>{item.source_country}</p>
            </div>
          </div>
          <div className="w-full">
            <h1 className="font-bold xl:text-3xl lg:text-2xl sm:text-xl text-lg pb-2 border-b">
              {item.title}
            </h1>
          </div>
          <div className="w-full flex flex-col gap-1 relative pl-3">
            <span className="absolute left-0 top-0 w-2 h-full bg-chart-4"></span>
            <Quote size={22} />
            <h2 className="font-semibold lg:text-xl sm:text-lg">
              {item.summary}
            </h2>
          </div>
          <div className="w-full xl:h-[500px] md:h-[400px] sm:h-[350px] h-[300px]">
            <VeritoImage image={item.image} alt="verito news" />
          </div>
          <div className="w-full flex items-center justify-between flex-wrap text-sm font-sans opacity-60">
            {item.authors && (
              <>
                {item.authors.map((author, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <Pen size={20} />
                    <p>{author}</p>
                    {item.authors && index < item.authors.length - 1 && (
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
