import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { apiKeyPrice } from "@/lib/config";

interface MetalPrice {
  name: string;
  price: number;
  updated: number;
}


const commodities = ["gold", "aluminum", "platinum", "palladium"];
async function getMetalPrices(): Promise<MetalPrice[]> {
  try {
    const requests = commodities.map((name) =>
      fetch(`https://api.api-ninjas.com/v1/commodityprice?name=${name}`, {
        headers: { "X-Api-Key": apiKeyPrice },
      }).then((res) => res.json())
    );

    const results = await Promise.all(requests);

    return results;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export default async function MetalPrices() {
  const metals = await getMetalPrices();

  return (
    <div className="w-full p-1">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>update</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {metals.map((item, index) => (
            <TableRow key={index}>
              <TableCell>
                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              </TableCell>
              <TableCell>{item.price.toFixed(2)}$</TableCell>
              <TableCell>
                {new Date(item.updated * 1000).toLocaleTimeString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
