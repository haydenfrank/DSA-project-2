import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { createDataObjects } from "@/lib/utils";
import type React from "react";
import { mergeTime } from "@/lib/mergesort";

type SortingBarChartProps = {
  sortTrigger: number;
  selectedNutrient: string;
  selectedCategory: string;
};

let cache: { name: string; value: number }[] | null = null;

export function SortingBarChart({
  selectedNutrient,
  selectedCategory,
  sortTrigger,
}: SortingBarChartProps) {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);
  const [time, setTime] = useState<number>(0);

  useEffect(() => {
    if (!selectedNutrient || !selectedCategory) return;
    createDataObjects("/food.csv").then((csvData) => {
      const chartData = csvData
        .filter((row) => row["Category"] === selectedCategory)
        .map((row) => ({
          name: row["Description"],
          value: Number(row[selectedNutrient]),
        }));
      cache = chartData;
      setData(chartData);
    });
  }, [selectedCategory, selectedNutrient]);

  useEffect(() => {
    if (!selectedNutrient || !selectedCategory || !cache) return;
    const sortedData = mergeTime(cache!);
    setData(sortedData.sorted);
    setTime(sortedData.time);
  }, [sortTrigger]);

  return (
    <div>
      <BarChart
        width={900}
        height={600}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#8884d8" isAnimationActive={true} />
      </BarChart>
      <p>{time.toFixed(50)}</p>
    </div>
  );
}
