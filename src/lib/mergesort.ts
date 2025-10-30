// import { createDataObjects } from "utils.ts";

// structure the function so that any data attribute can be used for merge sort
// write the merge sort
// helper function to record time for merge sort

export function mergeSort(
    data: Record<string, string>[],
    key: string
): Record<string, string>[] {
    if (data.length <= 1) {
        return data;
    }
    const middle = Math.floor(data.length / 2);
    const left = data.slice(0, middle);
    const right = data.slice(middle);
    return merge(mergeSort(left, key), mergeSort(right, key), key);
}
export function merge(
    left: Record<string, string>[],
    right: Record<string, string>[],
    key: string
): Record <string, string>[] {
    const result: Record<string, string>[] = [];
    let i = 0;
    let j = 0;
    while (i < left.length && j < right.length) {
        if (Number(left[i][key]) < Number(right[j][key])) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }
    return result.concat(left.slice(i)).concat(right.slice(j));
}

export function mergeTime(
    data: Record<string, string>[],
    key: string
): { sorted: Record<string, string>[], time: number } {
    const start = performance.now();
    const sorted = mergeSort(data, key);
    const end = performance.now();
    return { sorted, time: end - start };
}

//
// const data = await createDataObjects("/food.csv");


