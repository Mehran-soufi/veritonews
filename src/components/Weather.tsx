"use client";
import { MapPinned, RefreshCcw, Sunrise, Sunset } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Title from "./Title";
import { Button } from "./ui/button";
import VeritoImage from "./VeritoImage";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ChartLineLabel } from "./chart-line-label";

interface RootObject {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

interface Clouds {
  all: number;
}

interface Wind {
  speed: number;
  deg: number;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
  temp_kf?: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Coord {
  lon: number;
  lat: number;
}

interface List {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  sys: Sys;
  dt_txt: string;
}
interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

interface FuthreWeather {
  cod: string;
  message: number;
  cnt: number;
  list: List[];
  city: City;
}

export default function Weather() {
  const weatherApi = process.env.NEXT_PUBLIC_APP_Weather_API_KEY;

  const [weatherData, setWeatherData] = useState<RootObject | null>(null);
  const [forecastData, setForecastData] = useState<FuthreWeather | null>(null);
  const [weatherDataLoading, setweatherDataLoading] = useState<boolean>(false);
  const [weatherDataError, setweatherDataError] = useState<boolean>(false);
  const [forecastDataLoading, setforecastDataLoading] =
    useState<boolean>(false);
  const [forecastDataError, setforecastDataError] = useState<boolean>(false);
  const [city, setCity] = useState<string>("tehran");
  const [lat, setLat] = useState<number | null>(35.6944);
  const [lon, setLon] = useState<number | null>(51.4215);
  const [dailyForecast, setDailyForecast] = useState<Record<
    string,
    List[]
  > | null>(null);
  const todayStr = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);

  /* Weather deta */
  const getWeather = async () => {
    setweatherDataLoading(true);
    setweatherDataError(false);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApi}&units=metric`
      );
      const data: RootObject = await response.json();
      setWeatherData(data);
      setLat(data.coord.lat);
      setLon(data.coord.lon);
    } catch {
      setweatherDataError(true);
    } finally {
      setweatherDataLoading(false);
    }
  };
  /* Futhre Weather */
  const getFuthreWeather = async () => {
    setforecastDataLoading(true);
    setforecastDataError(false);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherApi}&units=metric`
      );
      const FuthreData: FuthreWeather = await response.json();
      setForecastData(FuthreData);
      const groupedByDate: Record<string, List[]> = {};
      FuthreData.list.forEach((item) => {
        const dateStr = item.dt_txt.split(" ")[0];
        if (!groupedByDate[dateStr]) {
          groupedByDate[dateStr] = [];
        }
        groupedByDate[dateStr].push(item);
      });

      setDailyForecast(groupedByDate);
    } catch {
      setforecastDataError(true);
    } finally {
      setforecastDataLoading(false);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);
  useEffect(() => {
    getFuthreWeather();
  }, [lat, lon]);

  const handleGetData = () => {
    getWeather();
  };

  function getWeekdayName(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString("en", { weekday: "long" });
  }

  const chartData = (
    dailyForecast?.[selectedDate]?.map((item) => ({
      hour: item.dt_txt.split(" ")[1].slice(0, 2),
      temp: Math.floor(item.main.temp),
      icon: item.weather[0].icon,
      description: item.weather[0].description,
    })) ?? []
  ).sort((a, b) => a.hour.localeCompare(b.hour));

  const selectedList = dailyForecast?.[selectedDate] ?? [];

  const averagePop =
    selectedList.length > 0
      ? Math.round(
          (selectedList.reduce((acc, item) => acc + item.pop, 0) /
            selectedList.length) *
            100
        )
      : 0;
  const averagespeed =
    selectedList.length > 0
      ? (
          selectedList.reduce((acc, item) => acc + item.wind.speed, 0) /
          selectedList.length
        ).toFixed(1)
      : "0.0";
  const averageHumidity =
    selectedList.length > 0
      ? selectedList.reduce((acc, item) => acc + item.main.humidity, 0) /
        selectedList.length
      : "0";

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <Title title="🌡️ Weather" />
      {weatherDataError && forecastDataError && (
        <div className="w-full lg:h-[70vh] h-[60vh] flex justify-center items-center">
          <p>Error</p>
        </div>
      )}
      <div className="w-full lg:h-[70vh] min-h-[60vh] h-auto flex flex-col lg:grid gap-4 lg:grid-cols-3 lg:grid-rows-3">
        <div className="w-full lg:h-full h-[60vh] lg:col-start-2 lg:col-span-2 lg:row-span-full rounded-sm shadow-md shadow-accent overflow-hidden">
          {weatherDataLoading && (
            <div className="w-full h-full bg-muted animate-pulse"></div>
          )}
          {weatherData && (
            <div className="w-full h-full relative">
              <VeritoImage
                image="/weather/clearSky.webp"
                alt="weather information"
              />
              {/* Information */}
              <div className="absolute top-0 left-0 w-full h-full bg-background/30">
                <div className="w-full h-full flex flex-col justify-between z-20">
                  <div className="w-full h-full p-4 flex flex-col justify-between">
                    {/* Search */}
                    <div className="xl:w-2/5 lg:w-3/5 md:w-4/5 w-11/12 flex items-center justify-between border border-background/30 rounded-md">
                      <input
                        type="text"
                        name="weather_search"
                        id="weather_search"
                        placeholder="search city"
                        className="flex-1 h-full pl-2  outline-none border-none bg-transparent focus:bg-background/20 rounded-s-md"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            getWeather();
                          }
                        }}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-background/30 border-none outline-none rounded-s-none"
                        onClick={handleGetData}
                      >
                        search
                      </Button>
                    </div>
                    {/* Detail */}
                    <div className="w-full flex flex-col lg:gap-8 sm:gap-4 gap-2">
                      <div className="flex flex-col gap-4">
                        {/* date and time */}
                        <div className="w-full flex items-center gap-1">
                          <RefreshCcw size={20} className="opacity-60" />
                          <p className="text-sm opacity-80">
                            {weatherData
                              ? new Date(weatherData.dt * 1000).toLocaleString()
                              : "--"}
                          </p>
                        </div>
                        {/* City & Description */}
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 xl:text-3xl lg:text-2xl md:text-xl text-lg  opacity-70">
                            <MapPinned size={20} className="opacity-60" />
                            <h3 className="font-semibold">
                              {weatherData?.name}
                            </h3>
                            <span className="text-sm">
                              ({weatherData?.sys.country})
                            </span>
                          </div>
                          <div className="flex items-center border-l border-background/30">
                            <div className="w-10 h-10 relative">
                              <Image
                                src={`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`}
                                alt="icon"
                                fill
                              />
                            </div>
                            <p className="lg:text-lg md:text-base text-sm">
                              {weatherData?.weather[0].description}
                            </p>
                          </div>
                        </div>
                        {/* Temp */}
                        <div className="flex items-start">
                          {weatherData?.main.temp && (
                            <p className="xl:text-8xl lg:text-7xl md:text-6xl text-3xl font-sans flex items-start">
                              {Math.floor(weatherData?.main.temp)}
                              <span className="lg:text-lg sm:text-base text-sm">
                                °C
                              </span>
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="flex items-center gap-1">
                            <div className="flex flex-col items-center border-r pr-1 border-background/30">
                              <Sunrise size={20} className="opacity-60" />
                              <span className="text-sm opacity-60">
                                sunrise
                              </span>
                            </div>
                            <p className="text-sm opacity-80">
                              {weatherData
                                ? new Date(
                                    weatherData.sys.sunrise * 1000
                                  ).toLocaleTimeString()
                                : "--"}
                            </p>
                          </div>
                          <span>-</span>
                          <div className="flex items-center gap-1">
                            <div className="flex flex-col items-center border-r pr-1 border-background/30">
                              <Sunset size={20} className="opacity-60" />
                              <span className="text-sm opacity-60">sunset</span>
                            </div>
                            <p className="text-sm opacity-80">
                              {weatherData
                                ? new Date(
                                    weatherData.sys.sunset * 1000
                                  ).toLocaleTimeString()
                                : "--"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Other */}
                  <div className="p-4 bg-background/30">
                    <ul className="flex items-center overflow-x-auto gap-2">
                      <li className="flex items-center text-nowrap gap-1 text-sm opacity-80 border-r border-ring pr-1">
                        <span>feels like:</span>
                        {weatherData?.main.feels_like && (
                          <span className="font-semibold">
                            {Math.floor(weatherData?.main.feels_like)}
                          </span>
                        )}
                      </li>
                      <li className="flex items-center text-nowrap gap-1 text-sm opacity-80 border-r border-ring pr-1">
                        <span>temp min:</span>
                        {weatherData?.main.temp_min && (
                          <span className="font-semibold">
                            {Math.floor(weatherData?.main.temp_min)}
                          </span>
                        )}
                      </li>
                      <li className="flex items-center text-nowrap gap-1 text-sm opacity-80 border-r border-ring pr-1">
                        <span>temp max:</span>
                        {weatherData?.main.temp_max && (
                          <span className="font-semibold">
                            {Math.floor(weatherData?.main.temp_max)}
                          </span>
                        )}
                      </li>
                      <li className="flex items-center text-nowrap gap-1 text-sm opacity-80 border-r border-ring pr-1">
                        <span>pressure:</span>
                        {weatherData?.main.pressure && (
                          <span className="font-semibold">
                            {Math.floor(weatherData?.main.pressure)}
                          </span>
                        )}
                      </li>
                      <li className="flex items-center text-nowrap gap-1 text-sm opacity-80 border-r border-ring pr-1">
                        <span>humidity:</span>
                        {weatherData?.main.humidity && (
                          <span className="font-semibold">
                            {Math.floor(weatherData?.main.humidity)}
                          </span>
                        )}
                      </li>
                      <li className="flex items-center text-nowrap gap-1 text-sm opacity-80 border-r border-ring pr-1">
                        <span>sea level:</span>
                        {weatherData?.main.sea_level && (
                          <span className="font-semibold">
                            {Math.floor(weatherData?.main.sea_level)}
                          </span>
                        )}
                      </li>
                      <li className="flex items-center text-nowrap gap-1 text-sm opacity-80 border-r border-ring pr-1">
                        <span>grnd level:</span>
                        {weatherData?.main.grnd_level && (
                          <span className="font-semibold">
                            {Math.floor(weatherData?.main.grnd_level)}
                          </span>
                        )}
                      </li>
                      <li className="flex items-center text-nowrap gap-1 text-sm opacity-80">
                        <span>wind speed:</span>
                        {weatherData?.wind.speed && (
                          <span className="font-semibold">
                            {Math.floor(weatherData?.wind.speed)}
                          </span>
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="lg:col-start-1 p-4 row-span-full overflow-y-auto rounded-sm shadow-md shadow-accent">
          {forecastDataLoading && (
            <div className="w-full h-full bg-muted animate-pulse"></div>
          )}
          {forecastData && (
            <div className="w-full h-full flex flex-col gap-4">
              {/* Title */}
              <div className="w-full flex items-center justify-between flex-wrap gap-y-1">
                <p className="font-sans font-semibold opacity-80 text-lg">
                  Future weather
                </p>
                <Select
                  value={selectedDate}
                  onValueChange={(val) => setSelectedDate(val)}
                >
                  <SelectTrigger className="w-1/2">
                    <SelectValue>
                      {selectedDate
                        ? `${getWeekdayName(selectedDate)} - ${selectedDate}`
                        : "chose date"}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {dailyForecast &&
                      Object.keys(dailyForecast).map((dateStr, index) => (
                        <SelectItem key={index} value={dateStr}>
                          🗓️ {getWeekdayName(dateStr)} - {dateStr}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              {/* Description */}
              <div className="w-full flex items-center gap-1">
                <p className="text-sm">Weather forecast in</p>
                <span className="font-semibold font-sans">{selectedDate}</span>
              </div>
              {/* futhre information */}
              <div className="w-full h-full overflow-y-auto border-t py-2 flex flex-col gap-3">
                <div className="w-full">
                  {selectedDate && chartData.length > 0 && (
                    <ChartLineLabel chartData={chartData} />
                  )}
                </div>
                <div className="w-full flex flex-col gap-1">
                  <div className="w-full">
                    <p className="border-b pb-1 font-bold">Avrage:</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <p className="opacity-80">Probability of precipitation:</p>
                    <span className="font-sans ">{averagePop}%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <p className="opacity-80">Wind speed:</p>
                    <span className="font-sans ">{averagespeed}km</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <p className="opacity-80">Humidity:</p>
                    <span className="font-sans ">{averageHumidity}%</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
