import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { apiKeyPrice } from "@/lib/config";


interface BitcoinPrice {
  price: string;
  timestamp: number;
  "24h_price_change": string;
  "24h_price_change_percent": string;
  "24h_high": string;
  "24h_low": string;
  "24h_volume": string;
}

async function getBitcoinPrices(): Promise<BitcoinPrice | null> {
  try {
   const requests = await fetch("https://api.api-ninjas.com/v1/bitcoin", {
      headers: { "X-Api-Key": apiKeyPrice },
    });

    if (!requests.ok) {
      throw new Error("Request failed");
    }

    const result: BitcoinPrice = await requests.json();
    console.log(result);

    return result;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export default async function BitcoinPrice() {
  const bitcoin = await getBitcoinPrices();

  return (
    <div className="w-full p-1">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Price</TableHead>
            <TableHead>Update</TableHead>
            <TableHead>24h High</TableHead>
            <TableHead>24h Low</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bitcoin ? (
            <TableRow>
              <TableCell>{parseFloat(bitcoin.price).toFixed(2)}$</TableCell>
              <TableCell>
                {new Date(bitcoin.timestamp * 1000).toLocaleTimeString()}
              </TableCell>
              <TableCell>
                {parseFloat(bitcoin["24h_high"]).toFixed(2)}$
              </TableCell>
              <TableCell>
                {parseFloat(bitcoin["24h_low"]).toFixed(2)}$
              </TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-muted-foreground"
              >
                ⛔ اطلاعاتی از بیت‌کوین دریافت نشد
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
