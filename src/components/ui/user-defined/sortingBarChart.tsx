import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { createDataObjects } from "@/lib/utils";
import { mergeCount } from "@/lib/mergesort";
import { heapCount } from "@/lib/heapsort";
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
  const [comparisons, setComparisons] = useState<number>(0);

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
      const sortedData = mergeCount(cache!);
      setData(sortedData.sorted);
      setComparisons(sortedData.comparisons);
    } else if (selectedSort == "heap sort") {
      const sortedData = heapCount(cache!);
      setData(sortedData.sorted);
      setComparisons(sortedData.comparisons);
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
        <p>{comparisons}</p>
      </div>
    );
  } else {
    return <p>select a category and nutritional value</p>;
  }
}
