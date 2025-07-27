"use client";

import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  temp: {
    label: "temp",
    color: "var(--chart-1)",
  },
  description: {
    label: "description",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export function ChartLineLabel({
  chartData,
}: {
  chartData: {
    hour: string;
    temp: number;
    icon: string;
    description: string;
  }[];
}) {
  return (
    <Card>
      <CardHeader className="flex">
        <CardTitle>temp</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-full h-[100px]">
          <LineChart data={chartData} margin={{ top: 30, left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="hour"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              interval={0}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Line
              dataKey="temp"
              type="monotone"
              stroke="var(--chart-4)"
              strokeWidth={2}
              dot={{ fill: "var(--chart-4)" }}
              activeDot={{ r: 6 }}
            >
              <LabelList
                dataKey="temp"
                position="top"
                content={({ x, y, index, value }) => {
                  if (
                    typeof index !== "number" ||
                    typeof x !== "number" ||
                    typeof y !== "number"
                  )
                    return null;

                  const data = chartData[index];
                  if (!data) return null;

                  const iconUrl = `https://openweathermap.org/img/wn/${data.icon}.png`;

                  return (
                    <g>
                      <title>{data.description}</title>
                      <image
                        href={iconUrl}
                        x={x - 12}
                        y={y - 35}
                        width={22}
                        height={22}
                      />
                      <text
                        x={x}
                        y={y - 6}
                        fontSize={12}
                        textAnchor="middle"
                        fill="#333"
                      >
                        {value}°C
                      </text>
                    </g>
                  );
                }}
              />
            </Line>
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
