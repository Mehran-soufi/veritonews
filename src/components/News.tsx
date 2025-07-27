import Title from "./Title";
import NewsItem from "./NewsItem";
import { TopNewsType } from "@/typs/news";

interface NewsProps {
  title: string;
  initialNews: TopNewsType[] | null;
  error: string | null;
}

export default function News({ title, initialNews, error }: NewsProps) {
  return (
    <div className="w-full flex flex-col gap-4">
      <Title title={title} />
      <NewsItem
        news={initialNews}
        isLoading={initialNews === null && error === null}
        error={error}
      />
    </div>
  );
}
