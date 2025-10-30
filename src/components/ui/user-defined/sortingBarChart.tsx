import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export function SortingBarChart() {
  const initialData = [
    { name: "A", value: 30 },
    { name: "B", value: 80 },
    { name: "C", value: 45 },
    { name: "D", value: 60 },
    { name: "E", value: 20 },
  ];
  return (
    <BarChart
      width={900}
      height={600}
      data={initialData}
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
