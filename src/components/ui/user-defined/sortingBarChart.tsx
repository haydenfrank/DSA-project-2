import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { createDataObjects } from "@/lib/utils";
import type React from "react";

type SortingBarChartProps = {
  sortTrigger: number;
  selectedNutrient: string;
  selectedCategory: string;
};

export function SortingBarChart({
  selectedNutrient,
  selectedCategory,
}: SortingBarChartProps) {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);
  useEffect(() => {
    if (!selectedNutrient || !selectedCategory) return;
    createDataObjects("/food.csv").then((csvData) => {
      const chartData = csvData
        .filter((row) => row["Category"] === selectedCategory)
        .map((row) => ({
          name: row["Description"],
          value: Number(row[selectedNutrient]),
        }));
      setData(chartData);
    });
  }, [selectedCategory, selectedNutrient]);

  return (
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
  );
}
