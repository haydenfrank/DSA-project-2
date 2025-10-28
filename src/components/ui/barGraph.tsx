"use client";

import { letterFrequency } from "@visx/mock-data";
import { Group } from "@visx/group";
import { Bar } from "@visx/shape";
import { scaleLinear, scaleBand } from "@visx/scale";

// Type for each data point
type LetterFrequency = {
  letter: string;
  frequency: number;
};

const data: LetterFrequency[] = letterFrequency;

// Graph dimensions and margins
const width = 500;
const height = 500;
const margin = { top: 20, bottom: 20, left: 20, right: 20 };

// Bounds
const xMax = width - margin.left - margin.right;
const yMax = height - margin.top - margin.bottom;

// Accessor functions
const x = (d: LetterFrequency) => d.letter;
const y = (d: LetterFrequency) => d.frequency * 100;

// Scales
const xScale = scaleBand<string>({
  range: [0, xMax],
  round: true,
  domain: data.map(x),
  padding: 0.4,
});

const yScale = scaleLinear<number>({
  range: [yMax, 0],
  round: true,
  domain: [0, Math.max(...data.map(y))],
});

// Compose function
const compose =
  <D, R>(scale: (value: R) => number | undefined, accessor: (d: D) => R) =>
  (d: D) => {
    const result = scale(accessor(d));
    if (result === undefined) {
      return 0;
    }
    return result;
  };

const xPoint = compose(xScale, x);
const yPoint = compose(yScale, y);

export function BarGraph() {
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
    >
      {data.map((d, i) => {
        const barHeight = yMax - yPoint(d);
        return (
          <Group key={`bar-${i}`}>
            <Bar
              x={xPoint(d)}
              y={yMax - barHeight}
              height={barHeight}
              width={xScale.bandwidth()}
              fill="#fc2e1c"
            />
          </Group>
        );
      })}
    </svg>
  );
}
