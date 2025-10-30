import "./App.css";
import * as React from "react";
import { SortingAlgorithmsCombobox } from "@/components/ui/user-defined/sortingAlgorithmsCombobox";
import { NutritionalValueCombobox } from "@/components/ui/user-defined/nutritionalValueCombobox";
import { SortingMethodsSwitch } from "@/components/ui/user-defined/sortingMethodsSwitch";
import { SortButton } from "@/components/ui/user-defined/sortButton";
import { SortingBarChart } from "@/components/ui/user-defined/sortingBarChart";

function App() {
  return (
    <>
      <div className="flex flex-wrap justify-center items-center">
        <div className="flex justify-center gap-2 md:flex-row mx-auto place-items-center mt-4 w-full">
          <SortingAlgorithmsCombobox />
          <NutritionalValueCombobox />
          <SortingMethodsSwitch />
          <SortButton />
        </div>
        <div className="flex items-center justify-center mt-6 h-[80vh] scale-100">
          <SortingBarChart />
        </div>
      </div>
    </>
  );
}

export default App;
