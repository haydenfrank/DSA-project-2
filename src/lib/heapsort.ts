// import { createDataObjects } from "utils.ts";

export type graphData = { name: string; value: number }[];

export function heapSort(data: graphData): graphData {
  var n = data.length;
  for (var i = Math.floor(n / 2 - 1); i >= 0; i--) {
    data = heapify(data, i, n);
  }
  for (var i = n - 1; i >= 1; i--) {
    var temp = data[i];
    data[i] = data[0];
    data[0] = temp;
    data = heapify(data, 0, i);
  }
  return data;
}

export function heapify(data: graphData, i: number, n: number): graphData {
  var root = data[i]["value"];
  var child = 2 * i + 1;
  if (child + 1 < n) {
    var max = Math.max(root, data[child]["value"], data[child + 1]["value"]);
    if (max != root) {
      if (max == data[child + 1]["value"]) {
        child++;
      }
      var temp = data[i];
      data[i] = data[child];
      data[child] = temp;
      return heapify(data, child, n);
    }
  } else if (child < n) {
    var max = Math.max(root, Number(data[child]["value"]));
    if (max != root) {
      var temp = data[i];
      data[i] = data[child];
      data[child] = temp;
      return heapify(data, child, n);
    }
  }
  return data;
}

export function heapTime(data: graphData): {
  sorted: graphData;
  time: number;
} {
  const start = performance.now();
  const sorted = heapSort(data);
  const end = performance.now();
  return { sorted, time: end - start };
}

// function testing() {
// var j = (heapSort([{name: "f", value: 6}, {name: "e", value: 5}, {name: "d", value: 3}, {name: "c", value: 1}, {name: "b", value: 2}, {name: "a", value: 4}]));
// console.log(j);
// }
