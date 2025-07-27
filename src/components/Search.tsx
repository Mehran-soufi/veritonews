"use client";
import { Calendar, MapPin, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import VeritoImage from "./VeritoImage";
import { TopNewsType } from "@/typs/news";
import { apiKeyNews } from "@/lib/config";

interface SearchComponentProps {
  searchSelect: boolean;
  setSearchSelect: React.Dispatch<React.SetStateAction<boolean>>;
}

function SearchComponent({
  searchSelect,
  setSearchSelect,
}: SearchComponentProps) {
  const [subject, setSubject] = useState<string>("");
  const [searchRes, setSearchRes] = useState<TopNewsType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [errorMessageDisplay, setErrorMessageDisplay] = useState<string | null>(
    null
  );

  async function getSearchtNews() {
    if (subject.trim() === "") {
      setSearchRes([]);
      setHasError(false);
      setErrorMessageDisplay("Please enter a search term.");
      return;
    }

    setLoading(true);
    setHasError(false);
    setErrorMessageDisplay(null);

    try {
      const url = `https://api.worldnewsapi.com/search-news?text=${subject}&language=en&api-key=${apiKeyNews}`;

      const res = await fetch(url);

      if (!res.ok) {
        const errorData = await res.json();
        console.error(`API Error Response for search:`, errorData);
        setHasError(true);
        setErrorMessageDisplay(
          errorData.message || `Error: ${res.statusText}. Please try again.`
        );
        setLoading(false);
        return;
      }

      const data = await res.json();
      setLoading(false);
      setHasError(false);
      setSearchRes(data.news);

      if (!data.news || data.news.length === 0) {
        setErrorMessageDisplay(`No results found for "${subject}".`);
      }
    } catch (error: unknown) {
      setHasError(true);
      console.error("Fetch error in getSearchtNews:", error);

      let msg =
        "An unexpected error occurred. Please check your internet connection.";
      if (error instanceof Error) {
        msg = error.message;
      } else if (
        typeof error === "object" &&
        error !== null &&
        "message" in error
      ) {
        msg = String((error as { message: unknown }).message);
      }
      setErrorMessageDisplay(msg);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (searchSelect) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setSearchRes(null);
      setSubject("");
      setHasError(false);
      setErrorMessageDisplay(null);
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
                <div
                  key={index}
                  className="w-full md:h-24 h-48 bg-muted animate-pulse"
                ></div>
              ))}

            {hasError && !loading && (
              <div className="flex flex-col gap-4">
                <p className="text-lg font-semibold">
                  {errorMessageDisplay || "An unknown error occurred."}
                </p>
                <span>Please refine your search or try again later.</span>
              </div>
            )}

            {!loading && !hasError && searchRes && searchRes.length > 0 && (
              <>
                <div className="w-full ">
                  <p className="font-semibold">Result :</p>
                </div>
                {/* Result */}
                <div className="w-full flex flex-col gap-4">
                  {searchRes.map((item) => (
                    <Link
                      key={item.id}
                      href={`/news/${item.id.toString()}`}
                      target="_blank"
                      className="w-full md:h-24 h-48 bg-accent/50 border border-accent flex flex-col md:flex-row
              items-center gap-2 rounded-md overflow-hidden hover:shadow shadow-accent"
                    >
                      <div className="md:w-1/3 w-full md:h-full h-2/3 p-2">
                        {item.image ? (
                          <VeritoImage
                            alt={item.title || "news image"}
                            image={item.image}
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                            No Image
                          </div>
                        )}
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
                              ? new Date(item.publish_date).toLocaleDateString()
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

            {/* Display message for empty results or initial state */}
            {!loading &&
              !hasError &&
              searchRes &&
              searchRes.length === 0 &&
              subject.trim() !== "" && (
                <div className="flex flex-col gap-4">
                  <p className="text-lg font-semibold">
                    No results for &quot;{subject}&quot;.
                  </p>
                  <span>Please try a different search term.</span>
                </div>
              )}
            {!loading &&
              !hasError &&
              searchRes === null &&
              subject.trim() === "" && (
                <div className="flex flex-col gap-4">
                  <p className="text-lg font-semibold">
                    Start typing to search for news.
                  </p>
                  <span>Enter a keyword in the search box above.</span>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchComponent;
