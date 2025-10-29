import * as React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const bubbleSortSteps = (
  arr: {
    name: string;
    value: number;
  }[]
) => {
  const steps = [];
  const a = [...arr];
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      if (a[j].value > a[j + 1].value) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        steps.push([...a]);
      }
    }
  }
  return steps;
};

export function SortingBarChart({
  sortButtonClicked,
}: {
  sortButtonClicked: boolean;
}) {
  const initialData = [
    { name: "A", value: 30 },
    { name: "B", value: 80 },
    { name: "C", value: 45 },
    { name: "D", value: 60 },
    { name: "E", value: 20 },
  ];

  const [data, setData] = React.useState(initialData);
  const [sorting, setSorting] = React.useState(false);
  React.useEffect(() => {
    if (!sortButtonClicked || sorting) return;

    setSorting(true);
    const steps = bubbleSortSteps(initialData);

    let i = 0;
    const interval = setInterval(() => {
      setData(steps[i]);
      i++;
      if (i >= steps.length) clearInterval(interval);
    }, 300);
    return () => clearInterval(interval);
  }, [sortButtonClicked]);

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
