import Link from "next/link";
import React from "react";
import { Calendar, MapPin } from "lucide-react";
import VeritoImage from "./VeritoImage";

function NewsCard({
  image,
  title,
  country,
  date,
  id,
}: {
  image: string;
  title: string;
  country: string;
  date: string;
  id: number;
}) {
  return (
    <Link
      href={`/news/${id.toString()}`}
      target="_blank"
      className="flex flex-col relative w-full h-full transition duration-500 ease-linear shadow-sm shadow-accent rounded-xl overflow-hidden group hover:bg-accent"
    >
      <div className="w-full h-9/12 relative">
        <VeritoImage image={image} alt="verito news" />
      </div>
      <div className="flex items-center justify-between flex-col w-full h-3/12 px-2 py-3">
        <div className="flex items-start w-full">
          <p className="line-clamp-1 text-sm font-semibold text-ellipsis overflow-hidden">
            {title}
          </p>
        </div>
        <div className="w-full  flex items-center justify-between text-sm font-sans font-semibold text-muted-foreground">
          <p className="flex items-center gap-1">
            <Calendar size={16} />
            {date}
          </p>
          <p className="flex items-center gap-1">
            <MapPin size={16} />
            {country}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default NewsCard;
