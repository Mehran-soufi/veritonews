// app/page.tsx
import Hero from "@/components/Hero";
import News from "@/components/News";
import PreviewHero from "@/components/PreviewHero";
import Weather from "@/components/Weather";
import { TopNewsType } from "@/typs/news";
import { fetchNewsData, getTopNewsData } from "@/lib/api";

export default async function HomePage() {
  const topNews: TopNewsType[] | null = await getTopNewsData();

  if (!topNews || topNews.length === 0) {
    return (
      <p className="text-center text-red-500 mt-10">
        Error loading top news. Please try again later.
      </p>
    );
  }

  const sportNewsResult = await fetchNewsData("sport");
  const politicsNewsResult = await fetchNewsData("politics");
  const businessNewsResult = await fetchNewsData("business");
  const entertainmentNewsResult = await fetchNewsData("entertainment");
  const technologyNewsResult = await fetchNewsData("technology");
  const healthNewsResult = await fetchNewsData("health");
  const scienceNewsResult = await fetchNewsData("science");
  const lifestyleNewsResult = await fetchNewsData("lifestyle");
  const travelNewsResult = await fetchNewsData("travel");
  const environmentNewsResult = await fetchNewsData("environment");

  return (
    <div className="w-full flex flex-col gap-8">
      <Hero topNews={topNews} />
      <PreviewHero />
      <News
        title="⚽ Sport"
        initialNews={sportNewsResult.news}
        error={sportNewsResult.error}
      />
      <News
        title="🏛️ Politic"
        initialNews={politicsNewsResult.news}
        error={politicsNewsResult.error}
      />
      <div className="w-full ">
        <Weather />
      </div>
      <News
        title="💰 Business"
        initialNews={businessNewsResult.news}
        error={businessNewsResult.error}
      />
      <News
        title="🎬 Entertainment"
        initialNews={entertainmentNewsResult.news}
        error={entertainmentNewsResult.error}
      />
      <News
        title="💻 Technology"
        initialNews={technologyNewsResult.news}
        error={technologyNewsResult.error}
      />
      <News
        title="💊 Health"
        initialNews={healthNewsResult.news}
        error={healthNewsResult.error}
      />
      <News
        title="🔬 Science"
        initialNews={scienceNewsResult.news}
        error={scienceNewsResult.error}
      />
      <News
        title="🌿 Lifestyle"
        initialNews={lifestyleNewsResult.news}
        error={lifestyleNewsResult.error}
      />
      <News
        title="✈️ Travel"
        initialNews={travelNewsResult.news}
        error={travelNewsResult.error}
      />
      <News
        title="🌍 Environment"
        initialNews={environmentNewsResult.news}
        error={environmentNewsResult.error}
      />
    </div>
  );
}
