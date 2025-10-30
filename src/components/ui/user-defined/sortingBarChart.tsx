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
  // const [data, setData] = useState<any[]>([]);
  // useEffect(() => {
  //   if (!selectedNutrient) return;
  //   createDataObjects("/food.csv").then((csvData) => {
  //     const chartData = csvData
  //       .map((row) => ({
  //         name: row["Description"],
  //         value: Number(row[selectedNutrient]),
  //       }))
  //       .filter((item) => item.value !== 0);
  //     // const sortedData = [...chartData]
  //     //   .sort((a, b) => (isAscending ? a.value - b.value : b.value - a.value))
  //     //   .slice(0, 10);

  //     setData(chartData);
  //   });
  // }, [selectedNutrient, isAscending, sortTrigger]);

  const [data, setData] = useState<{ name: string; value: number }[]>([]);
  useEffect(() => {
    if (!selectedNutrient) return;

    createDataObjects("/food.csv").then((csvData) => {
      const chartData = csvData
        .map((row) => ({
          name: row["Description"],
          value: Number(row[selectedNutrient]),
        }))
        .filter((item) => item.value !== 0)
        .slice(0, 50); // limit for visible animation

      setData(chartData);
    });
  }, [selectedNutrient]);

  // Animate bubble sort when triggered
  useEffect(() => {
    if (data.length === 0) return;

    let arr = [...data];
    let i = 0;

    const interval = setInterval(() => {
      if (i < arr.length) {
        // Perform a full pass
        for (let j = 0; j < arr.length - i - 1; j++) {
          const shouldSwap = isAscending
            ? arr[j].value > arr[j + 1].value
            : arr[j].value < arr[j + 1].value;
          if (shouldSwap) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          }
        }

        setData([...arr]); // update chart after the pass
        i++;
      } else {
        clearInterval(interval);
      }
    }, 300); // adjust speed of animation per pass

    return () => clearInterval(interval);
  }, [sortTrigger]);

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
