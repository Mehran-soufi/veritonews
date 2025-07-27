import React from "react";
import Title from "./Title";
import Link from "next/link";
import VeritoImage from "./VeritoImage";
import { Calendar, MapPin } from "lucide-react";
import { getTopNews } from "./GetTopNews";
import { TopNewsType } from "@/typs/news";

async function NewsLeftBar() {
  const topNews: TopNewsType[] | null = await getTopNews();
  return (
    <>
      {!topNews ? (
        <>
          <div className="w-full rounded-md p-1 flex flex-col gap-2 shadow-lg shadow-accent">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="w-full md:h-24 h-52 rounded-md animate-pulse bg-muted"
              ></div>
            ))}
          </div>
        </>
      ) : (
        <div className="w-full rounded-md p-1 flex flex-col gap-2 shadow-lg shadow-accent">
          <Title title="top news" />
          <div className="w-full flex flex-col sm:flex-row md:flex-col flex-wrap md:gap-4 gap-2 sm:gap-0">
            {topNews?.map((item) => (
              <Link
              key={item.id}
                href={`/news/${item.id.toString()}`}
                target="_blank"
                className="w-full sm:w-1/2 md:w-full lg:h-24 md:h-32 h-52 bg-accent/50 border border-accent flex flex-col md:flex-row
                 items-center gap-2 rounded-md overflow-hidden hover:shadow shadow-accent"
              >
                <div className="md:w-1/3 w-full md:h-full h-2/3 p-2 rounded-md overflow-hidden">
                  <VeritoImage alt="verito search" image={item.image} />
                </div>
                <div className="md:w-2/3 w-full md:h-full h-1/3 flex flex-col justify-between px-2 py-1">
                  <div className="">
                    <p className="line-clamp-1 text-sm font-semibold text-ellipsis overflow-hidden">
                      {item.title}
                    </p>
                  </div>
                  <div className="w-full flex items-center justify-between text-sm font-sans font-semibold text-muted-foreground">
                    <p className="flex items-center gap-1">
                      <Calendar size={16} />
                      {item.publish_date}
                    </p>
                    <p className="flex items-center gap-1">
                      <MapPin size={16} />
                      {item.source_country}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default NewsLeftBar;
