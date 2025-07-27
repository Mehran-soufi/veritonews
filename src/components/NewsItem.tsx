// components/News/NewsItem.tsx
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import { FreeMode, Navigation } from "swiper/modules";
import NewsCard from "./NewsCard";
import { TopNewsType } from "@/typs/news";

function NewsCardSkeleton() {
  return (
    <div className="w-full h-full p-2 flex flex-col gap-2 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse">
      <div className="w-full h-3/5 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
      <div className="w-4/5 h-6 bg-gray-300 dark:bg-gray-700 rounded-md mt-2"></div>
      <div className="w-3/5 h-4 bg-gray-300 dark:bg-gray-700 rounded-md mt-1"></div>
      <div className="w-2/5 h-4 bg-gray-300 dark:bg-gray-700 rounded-md mt-1"></div>
    </div>
  );
}

function NewsItem({
  news,
  isLoading, 
  error,
}: {
  news: TopNewsType[] | null;
  isLoading: boolean; 
  error: string | null;
}) {
  if (error) {
    return (
      <div className="w-full h-[50vh] flex items-center justify-center flex-col gap-2 text-red-500 dark:text-red-400 text-lg font-medium text-center p-4 rounded-lg bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700">
        <p>Error loading news: {error}</p>
        <p className="text-sm mt-2 text-red-400 dark:text-red-300">
          Please try again later.
        </p>
      </div>
    );
  }

  if (isLoading || (news === null && error === null)) {
    return (
      <div className="w-full h-[50vh]">
        <Swiper
          spaceBetween={10}
          slidesPerView={1.2}
          breakpoints={{
            480: { slidesPerView: 2.2 },
            768: { slidesPerView: 2.7 },
            1024: { slidesPerView: 3.4 },
          }}
          navigation={true}
          modules={[FreeMode, Navigation]}
          className="mySwiper1 w-full h-full"
        >
          {Array.from({ length: 4 }).map((_, index) => (
            <SwiperSlide key={index}>
              <NewsCardSkeleton />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }

  return (
    <div className="w-full h-[50vh]">
      <Swiper
        spaceBetween={10}
        slidesPerView={1.2}
        breakpoints={{
          480: { slidesPerView: 2.2 },
          768: { slidesPerView: 2.7 },
          1024: { slidesPerView: 3.4 },
        }}
        navigation={true}
        modules={[FreeMode, Navigation]}
        className="mySwiper1 w-full h-full"
      >
        {news && news.length > 0 ? (
          news.map((item) => (
            <SwiperSlide key={item.id}>
              <NewsCard
                image={item.image}
                title={item.title}
                country={item.source_country}
                date={item.publish_date}
                id={item.id}
              />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400 text-lg">
              No news found for this category.
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
}

export default NewsItem;
