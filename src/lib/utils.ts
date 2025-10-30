import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const splitCSVRow = (row: string) => {
  const matches = row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
  return matches?.map((v) => v.replace(/^"|"$/g, "")) ?? [];
};

export const createDataObjects = async (
  filePath: string
): Promise<Record<string, string>[]> => {
  const csvData = await fetch(filePath)
    .then((response) => response.text())
    .then((responseText) => {
      return responseText;
    });
  const headers = csvData
    .split("\n")[0]
    .split(",")
    .map((col) => col.replaceAll('"', ""))
    .map((col) => {
      if (col.startsWith("Data.")) {
        return col.split(".").at(-1)!;
      }
      return col;
    });
  const rows = csvData.split("\n").slice(1);
  const objects = rows.map((row) => {
    const values = splitCSVRow(row);
    const obj: Record<string, string> = {};
    headers.forEach((header, i) => {
      obj[header] = values[i];
    });
    return obj;
  });
  return objects;
};
