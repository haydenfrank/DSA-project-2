import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { createDataObjects } from "@/lib/utils";
import type React from "react";

export function SortingBarChart() {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    createDataObjects("/food.csv").then((csvData) => {
      const chartData = csvData.map((row) => ({
        name: row["Category"],
        value: Number(row["Beta Carotene"]),
      }));
      setData(chartData);
    });
  }, []);
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
