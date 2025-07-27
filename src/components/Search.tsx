"use client";
import { Calendar, MapPin, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import VeritoImage from "./VeritoImage";
import { TopNewsType } from "@/typs/news";
import { apiKeyNews } from "@/lib/config";

function SearchComponent({
  searchSelect,
  setSearchSelect,
}: {
  searchSelect: boolean;
  setSearchSelect: any;
}) {
  const [subject, setSubject] = useState<string>("");
  const [searchRes, setSearchRes] = useState<TopNewsType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, seterror] = useState<boolean>(false);

  async function getSearchtNews() {
    setLoading(true);
    try {
      const url = `https://api.worldnewsapi.com/search-news?text=${subject}&language=en&api-key=${apiKeyNews}`;

      const res = await fetch(url);
      const data = await res.json();
      setLoading(false);
      seterror(false);
      setSearchRes(data.news);
      return { news: data.news || [], error: null };
    } catch (error: any) {
      seterror(true);
      console.error("Fetch error in getDubjectNews:", error);
      return {
        news: null,
        error: error.message || "An unexpected error occurred.",
      };
    }
  }

  useEffect(() => {
    if (searchSelect) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [searchSelect]);

  return (
    <div className="fixed top-0 right-0 h-screen w-full bg-primary/60 z-50 flex justify-end search-select">
      <div className="lg:w-1/3 sm:w-2/3 w-full h-full bg-accent/80 flex items-center justify-center">
        <div className="w-11/12 h-11/12 flex flex-col items-stretch gap-4">
          {/* Search Close Button */}
          <div className="w-full flex items-center gap-1">
            <Button
              variant="outline"
              className="bg-transparent border-none outline-none hover:bg-transparent shadow-none"
              onClick={() => setSearchSelect(false)}
            >
              <X />
            </Button>
            <span className="opacity-80 font-semibold text-lg">search</span>
          </div>
          {/* Search Input */}
          <div className="w-full">
            <input
              type="search"
              placeholder="search..."
              className="w-full p-2 bg-accent outline-none rounded-lg"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  getSearchtNews();
                }
              }}
            />
          </div>
          {/* Search Result */}
          <div className="w-full h-full overflow-y-auto flex flex-col gap-4">
            {loading &&
              Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="w-full md:h-24 h-48 bg-muted animate-pulse"></div>
              ))}
            {error && (
              <div className="flex flex-col gap4">
                <p className="text-lg font-semibold">No news found!</p>
                <span>Search with another word.</span>
              </div>
            )}
            {!loading && !error && searchRes && (
              <>
                <div className="w-full ">
                  <p className="font-semibold">Result :</p>
                </div>
                {/* Result */}
                <div className="w-full flex flex-col gap-4">
                  {searchRes &&
                    searchRes.map((item) => (
                      <Link
                        key={item.id}
                        href={`/news/${item.id.toString()}`}
                        target="_blank"
                        className="w-full md:h-24 h-48 bg-accent/50 border border-accent flex flex-col md:flex-row
                 items-center gap-2 rounded-md overflow-hidden hover:shadow shadow-accent"
                      >
                        <div className="md:w-1/3 w-full md:h-full h-2/3 p-2">
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
                              {item.publish_date
                                ? new Date(
                                    item.publish_date
                                  ).toLocaleDateString()
                                : "N/A"}
                            </p>
                            <p className="flex items-center gap-1">
                              <MapPin size={16} />
                              {item.source_country || "N/A"}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchComponent;
