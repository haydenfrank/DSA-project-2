// import { createDataObjects } from "utils.ts";

// structure the function so that any data attribute can be used for merge sort
// write the merge sort
// helper function to record time for merge sort

export function mergeSort(
  data: { name: string; value: number }[]
): { name: string; value: number }[] {
  if (data.length <= 1) {
    return data;
  }
  const middle = Math.floor(data.length / 2);
  const left = data.slice(0, middle);
  const right = data.slice(middle);
  return merge(mergeSort(left), mergeSort(right));
}
export function merge(
  left: { name: string; value: number }[],
  right: { name: string; value: number }[]
): { name: string; value: number }[] {
  const result: { name: string; value: number }[] = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    if (Number(left[i].value) < Number(right[j].value)) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}

export function mergeTime(data: { name: string; value: number }[]): {
  sorted: { name: string; value: number }[];
  time: number;
} {
  const start = performance.now();
  const sorted = mergeSort(data);
  const end = performance.now();
  return { sorted, time: end - start };
}

//
// const data = await createDataObjects("/food.csv");
