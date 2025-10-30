import "./App.css";
import { SortingAlgorithmsCombobox } from "@/components/ui/user-defined/sortingAlgorithmsCombobox";
import { NutritionalValueCombobox } from "@/components/ui/user-defined/nutritionalValueCombobox";
import { SortingMethodsSwitch } from "@/components/ui/user-defined/sortingMethodsSwitch";
import { SortButton } from "@/components/ui/user-defined/sortButton";
import { SortingBarChart } from "@/components/ui/user-defined/sortingBarChart";
import { useState } from "react";

function App() {
  const [triggerSort, setTriggerSort] = useState(0);
  const [selectedNutrient, setSelectedNutrient] = useState("");
  const [isAscending, setIsAscending] = useState(true);
  const handleSort = () => {
    console.log("Sort clicked!");
    setTriggerSort(triggerSort + 1);
  };

  return (
    <>
      <div className="flex flex-wrap justify-center items-center">
        <div className="flex justify-center gap-2 md:flex-row mx-auto place-items-center mt-4 w-full">
          <SortingAlgorithmsCombobox />
          <NutritionalValueCombobox onValueChange={setSelectedNutrient} />
          <SortingMethodsSwitch
            isAscending={isAscending}
            onToggle={setIsAscending}
          />
          <SortButton sortClicked={handleSort} />
        </div>
        <div className="flex items-center justify-center mt-6 h-[80vh] scale-100">
          <SortingBarChart
            sortTrigger={triggerSort}
            selectedNutrient={selectedNutrient}
            isAscending={isAscending}
          />
        </div>
      </div>
    </>
  );
}

export default App;
