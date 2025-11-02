import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { createDataObjects } from "@/lib/utils";
import { mergeTime } from "@/lib/mergesort";
import { heapTime } from "@/lib/heapsort";
import type { graphData } from "@/lib/heapsort";

type SortingBarChartProps = {
  sortTrigger: number;
  selectedNutrient: string;
  selectedCategory: string;
  selectedSort: string;
};

let cache: graphData | null = null;

export function SortingBarChart({
  selectedNutrient,
  selectedCategory,
  sortTrigger,
  selectedSort,
}: SortingBarChartProps) {
  const [data, setData] = useState<graphData>([]);
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
    if (!selectedNutrient || !selectedCategory || !cache || !selectedSort)
      return;
    if (selectedSort == "merge sort") {
      const sortedData = mergeTime(cache!);
      setData(sortedData.sorted);
      setTime(sortedData.time);
    } else if (selectedSort == "heap sort") {
      const sortedData = heapTime(cache!);
      setData(sortedData.sorted);
      setTime(sortedData.time);
    }
  }, [sortTrigger]);

  if (cache) {
    return (
      <div>
        <BarChart
          width={900}
          height={600}
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={false} />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#8884d8" isAnimationActive={true} />
        </BarChart>
        <p>{time.toFixed(50)}</p>
      </div>
    );
  } else {
    return <p>select a category and nutritional value</p>;
  }
}
