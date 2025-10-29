import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const load = async (filePath: string): Promise<string[]> => {
  return await fetch(filePath)
    .then((response) => response.text())
    .then((responseText) => {
      return responseText
        .split("\n")[0]
        .split(",")
        .map((col) => col.replaceAll('"', ""))
        .filter((col) => col.startsWith("Data."))
        .map((col) => col.split(".").at(-1)!);
    });
};
