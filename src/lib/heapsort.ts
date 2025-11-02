// import { createDataObjects } from "utils.ts";

export type graphData = { name: string; value: number }[];

export function heapSort(input: graphData): graphData {
  const c = new Comparator();
  var data: graphData = [];
  for(var i = 0; i < input.length; i++) {
    data.push(input[i]);
  }
  var n = data.length;
  for (var i = Math.floor(n / 2 - 1); i >= 0; i--) {
    data = heapify(data, i, n, c);
  }
  for (var i = n - 1; i >= 1; i--) {
    var temp = data[i];
    data[i] = data[0];
    data[0] = temp;
    data = heapify(data, 0, i, c);
  }
  return data;
}

export function heapify(data: graphData, i: number, n: number, c: Comparator): graphData {
  var root = data[i]["value"];
  var child = 2 * i + 1;
  if (child + 1 < n) {
    var max = Math.max(root, data[child]["value"], data[child + 1]["value"]);
    c.add(2);
    if (!c.compare(max, root)) {
      if (c.compare(max, data[child + 1]["value"])) {
        child++;
      }
      var temp = data[i];
      data[i] = data[child];
      data[child] = temp;
      c.swap();
      return heapify(data, child, n, c);
    }
  } else if (child < n) {
    var max = Math.max(root, Number(data[child]["value"]));
    c.add(1);
    if (!c.compare(max, root)) {
      var temp = data[i];
      data[i] = data[child];
      data[child] = temp;
      c.swap();
      return heapify(data, child, n, c);
    }
  }
  return data;
}

export function heapPerformance(data: graphData): {sorted: graphData; time: number; comparisons: number; swaps: number} {
  const comp = new Comparator();
  comp.reset();
  const start = performance.now();
  const sorted = heapSort(data);
  const end = performance.now();
  const comparisons = comp.getComps();
  const swaps = comp.getSwaps();
  return {sorted, time: end - start, comparisons, swaps};
}

class Comparator {
  static comps = 0;
  static swaps = 0;
  compare(a: number, b: number) {
    Comparator.comps++;
    return a == b;
  }
  add(n: number) {
    Comparator.comps += n;
  }
  swap() {
    Comparator.swaps++;
  }
  getComps() {
    return Comparator.comps;
  }
  getSwaps() {
    return Comparator.swaps;
  }
  reset() {
    Comparator.comps = 0;
    Comparator.swaps = 0;
  }
}

//  function testing() {
//  var j = (heapSort([{name: "f", value: 6}, {name: "e", value: 5}, {name: "d", value: 3}, {name: "c", value: 1}, {name: "b", value: 2}, {name: "a", value: 4}, {name: "p", value: 0}, {name: "j", value: 10}, {name: "i", value: 9}, {name: "g", value: 7}, {name: "m", value: 72737}, {name: "n", value: 7}, {name: "l", value: 2}, {name: "k", value: 11}, {name: "o", value: 4}, {name: "h", value: 8}]));
//  console.log(j);
//  }
