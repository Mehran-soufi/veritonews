"use client";
import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation } from "swiper/modules";
import Image from "next/image";
import { Button } from "./ui/button";
import { FileDown, MoveLeft } from "lucide-react";
import Link from "next/link";
import VeritoImage from "./VeritoImage";

interface NewsPaperDataType {
  title: string;
  url: string;
}

// news paper data
const worldNewsPaper: NewsPaperDataType[] = [
  {
    title: "Newyork post",
    url: "https://ik.imagekit.io/h9lpdqryj/verito/newsPaper/wolrd/new-york-post.jpg",
  },
  {
    title: "Bild",
    url: "https://ik.imagekit.io/h9lpdqryj/verito/newsPaper/wolrd/bild.jpg",
  },
  {
    title: "USA today",
    url: "https://ik.imagekit.io/h9lpdqryj/verito/newsPaper/wolrd/usa-today.jpg",
  },
  {
    title: "China daily",
    url: "https://ik.imagekit.io/h9lpdqryj/verito/newsPaper/wolrd/china-daily.jpg",
  },
  {
    title: "Financial times",
    url: "https://ik.imagekit.io/h9lpdqryj/verito/newsPaper/wolrd/financial-times.jpg",
  },
];
const sportNewsPaper: NewsPaperDataType[] = [
  {
    title: "Marca",
    url: "https://ik.imagekit.io/h9lpdqryj/verito/newsPaper/sport/marca.jpg",
  },
  {
    title: "Tuttosport",
    url: "https://ik.imagekit.io/h9lpdqryj/verito/newsPaper/sport/tuttosport.jpg",
  },
  {
    title: "AS",
    url: "https://ik.imagekit.io/h9lpdqryj/verito/newsPaper/sport/as.jpg",
  },
  {
    title: "Kicker",
    url: "https://ik.imagekit.io/h9lpdqryj/verito/newsPaper/sport/kicker.jpg",
  },
  {
    title: "L-equipe",
    url: "https://ik.imagekit.io/h9lpdqryj/verito/newsPaper/sport/l-equipe.jpg",
  },
];
const financialNewsPaper: NewsPaperDataType[] = [
  {
    title: "Forbes",
    url: "https://ik.imagekit.io/h9lpdqryj/verito/newsPaper/financial/forbes.jpg",
  },
  {
    title: "El-economista",
    url: "https://ik.imagekit.io/h9lpdqryj/verito/newsPaper/financial/el-economista.jpg",
  },
  {
    title: "Australian financial review",
    url: "https://ik.imagekit.io/h9lpdqryj/verito/newsPaper/financial/australian-financial-review.jpg",
  },
  {
    title: "La-tribune",
    url: "https://ik.imagekit.io/h9lpdqryj/verito/newsPaper/financial/la-tribune.jpg?",
  },
  {
    title: "Financial times",
    url: "https://ik.imagekit.io/h9lpdqryj/verito/newsPaper/wolrd/financial-times.jpg",
  },
];
const categoryMap = {
  world: worldNewsPaper,
  sport: sportNewsPaper,
  financial: financialNewsPaper,
};

function NewsPapers({ category }: { category: string }) {
  const [selectedData, setSelectedData] = useState<NewsPaperDataType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<NewsPaperDataType | null>(
    null
  );

  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedItem]);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    try {
      const data = categoryMap[category as keyof typeof categoryMap] ?? [];
      setTimeout(() => {
        setSelectedData(data);
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setHasError(true);
      setIsLoading(false);
    }
  }, [category]);

  if (isLoading || hasError || selectedData.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full h-full animate-pulse">
        {/* small size */}
        <div className="w-full h-[300px] bg-muted rounded shadow block sm:hidden" />
        {/* big size */}
        <div className="w-full h-[300px] bg-muted rounded shadow hidden sm:block" />
        <div className="w-full h-[300px] bg-muted rounded shadow hidden sm:block" />
        <div className="w-full h-[300px] bg-muted rounded shadow hidden md:block" />
      </div>
    );
  }

  return (
    <>
      <div className="w-full h-full">
        <Swiper
          spaceBetween={10}
          slidesPerView={1.2}
          breakpoints={{
            480: {
              slidesPerView: 2.2,
            },
            768: {
              slidesPerView: 2.7,
            },
            1024: {
              slidesPerView: 3.4,
            },
          }}
          navigation={true}
          modules={[FreeMode, Navigation]}
          className="mySwiper1 w-full h-full"
        >
          {selectedData.map((item) => (
            <SwiperSlide key={item.title}>
              <div
                className="w-full h-full group flex flex-col items-center shadow-md shadow-accent p-2 cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                <div className="w-full h-[300px] md:h-[85%] relative overflow-hidden">
                  <Image
                    src={item.url}
                    alt={item.title}
                    fill
                    className="object-center group-hover:scale-110 transition duration-200 ease-linear"
                  />
                </div>
                <div className="w-full h-[15%] flex items-center justify-center">
                  <p className="text-center font-semibold">{item.title}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {selectedItem && (
        <div className="fixed top-0 left-0 w-full h-screen bg-accent/90 z-50 flex items-center justify-center">
          <div className="w-11/12 lg:w-10/12 h-11/12 flex items-center flex-col gap-8 overflow-y-auto">
            {/* Detail */}
            <div className="flex items-center justify-between w-full sticky top-0 bg-accent/80 z-20">
              {/* Title */}
              <div className="flex items-center lg:gap-4 md:gap-2 gap-1">
                <Button
                  variant="outline"
                  className="p-4 bg-transparent border-none outline-none hover:bg-transparent shadow-none"
                  onClick={() => setSelectedItem(null)}
                >
                  <MoveLeft />
                </Button>
                <span className="font-semibold text-ring text-lg">
                  {selectedItem.title}
                </span>
                <span className="font-semibold text-ring text-lg">
                  ({category})
                </span>
              </div>
              {/* Download */}
              <div className="flex items-center">
                <Link
                  href={selectedItem.url}
                  target="_blank"
                  download
                  className="text-chart-2"
                >
                  <FileDown />
                </Link>
              </div>
            </div>
            {/* Newspaper Image */}
            <div className="md:w-3/5 w-11/12 min-h-full relative overflow-y-auto z-10">
             <VeritoImage image={selectedItem.url} alt={selectedItem.title} />
              <Image src={selectedItem.url} alt={selectedItem.title} fill />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NewsPapers;
