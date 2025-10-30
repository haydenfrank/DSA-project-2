import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { createDataObjects } from "@/lib/utils";
import type React from "react";

type SortingBarChartProps = {
  sortTrigger: number;
  selectedNutrient: string;
  isAscending: boolean;
};

export function SortingBarChart({
  sortTrigger,
  selectedNutrient,
  isAscending,
}: SortingBarChartProps) {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    if (!selectedNutrient) return;
    createDataObjects("/food.csv").then((csvData) => {
      const chartData = csvData
        .map((row) => ({
          name: row["Description"],
          value: Number(row[selectedNutrient]),
        }))
        .filter((item) => item.value !== 0);
      const sortedData = [...chartData]
        .sort((a, b) => (isAscending ? a.value - b.value : b.value - a.value))
        .slice(0, 10);

      setData(sortedData);
    });
  }, [selectedNutrient, isAscending, sortTrigger]);

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
