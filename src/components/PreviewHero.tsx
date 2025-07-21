import BitcoinPrice from "@/components/BitcoinPrice";
import MetalPrices from "@/components/MetalPrices";
import Title from "@/components/Title";
import NewsPaperComponent from "./NewsPaperComponent";

export const apiKeyPrice = process.env.NEXT_PUBLIC_APP_Price_API_KEY ?? "";
 

function PreviewHero() {
  return (
    <div className="flex md:items-stretch md:flex-row flex-col gap-2">
      <div className="md:w-3/4 w-full flex flex-col gap-4">
        <NewsPaperComponent />
      </div>
      <div className="md:w-1/4 w-full flex flex-col gap-4">
        <div className="flex flex-col gap-2 rounded-xl bg-accent p-1">
          <Title title="🛠️ Metal prices" />
          <div className="w-full py-1">
            <MetalPrices />
          </div>
        </div>
        <div className="flex flex-col gap-2 rounded-xl bg-accent p-1">
          <Title title="₿ Bitcoin prices" />
          <div className="w-full py-1">
            <BitcoinPrice />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewHero;
