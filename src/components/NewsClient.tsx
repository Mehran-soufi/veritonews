"use client";

import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import { apiKeyNews } from "@/lib/config";
import { TopNewsType } from "@/typs/News";

function getDateParam(keyword: string | undefined): string {
  const date = new Date();
  switch (keyword) {
    case "Yesterday":
      date.setDate(date.getDate() - 1);
      break;
    case "Last Week":
      date.setDate(date.getDate() - 7);
      break;
    case "Last Month":
      date.setDate(date.getDate() - 30);
      break;
    default:
      break;
  }
  return date.toISOString().split("T")[0];
}

export default function NewsClient({
  subject,
  searchParams,
}: {
  subject: string;
  searchParams: { date?: string };
}) {
  const [news, setNews] = useState<TopNewsType[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      setError(null);
      const date = getDateParam(searchParams.date);
      try {
        const res = await fetch(
          `https://api.worldnewsapi.com/search-news?text=${subject}&language=en&published_after=${date}T00:00:00Z&api-key=${apiKeyNews}`
        );
        if (!res.ok) throw new Error("خطا در دریافت اخبار");
        const data = await res.json();
        setNews(data.news || []);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, [subject, searchParams.date]);

  if (loading) return <div>در حال بارگذاری اخبار...</div>;
  if (error) return <div className="text-red-500">خطا: {error}</div>;
  if (!news || news.length === 0) return <div>خبری یافت نشد.</div>;

  return <NewsItem news={news} />;
}
