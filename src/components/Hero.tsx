"use client";
import React, { useState } from "react";
import { TopNewsType } from "@/typs/news";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

// import required modules
import {
  Autoplay,
  FreeMode,
  Navigation,
  Pagination,
  Thumbs,
} from "swiper/modules";
import Link from "next/link";
import VeritoImage from "./VeritoImage";

export default function Hero({ topNews }: { topNews: TopNewsType[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div className="w-full h-[85vh] flex flex-col md:flex-row items-center gap-2">
      <div className="w-full h-3/4 md:h-full md:w-3/4">
        <Swiper
          spaceBetween={10}
          pagination={{
            type: "fraction",
          }}
          loop
          navigation={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs, Pagination, Autoplay]}
          className="mySwiper2 w-full h-full"
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        >
          {topNews.map((item) => (
            <SwiperSlide key={item.id}>
              <Link
                href={`/news/${item.id.toString()}`}
                className="outline-none"
                target="_blank"
              >
                <div className="relative w-full h-full">
                  <div className="w-full h-full">
                    <VeritoImage image={item.image} alt="verito news" />
                  </div>
                  <div className="absolute bottom-0 left-0 bg-ring/60 w-full p-4">
                    <p className="font-semibold lg:text-center">{item.title}</p>
                  </div>
                  <div className="absolute top-2 left-2 bg-ring/40 p-2 rounded-xl">
                    {item.authors && (
                      <div className="flex items-center gap-1">
                        {item.authors.map((author, index) => (
                          <div key={index} className="flex items-center gap-1">
                            <p>{author}</p>
                            {item.authors &&
                              index < item.authors.length - 1 && <span>-</span>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="w-full h-1/4 md:h-full md:w-1/4">
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={1.4}
          direction="horizontal"
          breakpoints={{
            480: {
              slidesPerView: 2.4,
              direction: "horizontal",
            },
            768: {
              slidesPerView: 3.2,
              direction: "horizontal",
            },
            1024: {
              direction: "vertical",
              slidesPerView: 3.5,
            },
          }}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper w-full h-full"
        >
          {topNews.map((item, index) => (
            <SwiperSlide key={item.id}>
              <div
                className={`w-full h-full cursor-pointer p-1 transition-all duration-300 ${
                  activeIndex === index
                    ? "border-2 border-chart-4 opacity-100"
                    : "opacity-60"
                }`}
              >
                <VeritoImage image={item.image} alt="verito news" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
