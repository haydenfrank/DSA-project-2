import "./App.css";
import { CategoryCombobox } from "@/components/ui/user-defined/categoryCombobox";
import { SortingAlgorithmsCombobox } from "@/components/ui/user-defined/sortingAlgorithmsCombobox";
import { NutritionalValueCombobox } from "@/components/ui/user-defined/nutritionalValueCombobox";
import { SortButton } from "@/components/ui/user-defined/sortButton";
import { SortingBarChart } from "@/components/ui/user-defined/sortingBarChart";
import { useState, useMemo } from "react";
import { PsychedelicSpiral } from "@/components/ui/shadcn-io/psychedelic-spiral";

function App() {
  const [triggerSort, setTriggerSort] = useState(0);
  const [selectedNutrient, setSelectedNutrient] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const handleSort = () => {
    console.log("Sort clicked!");
    setTriggerSort(triggerSort + 1);
  };
  const spiralBackground = useMemo(() => (
      <div className="fixed inset-0 w-full h-full -z-10">
      <PsychedelicSpiral />
      </div>
  ), []);

  return (
      <div className="relative min-h-screen">
        {spiralBackground}

          <div className="relative z-10 bg-white min-h-screen mx-4 my-8 rounded-3xl shadow-lg">
            <div className="flex flex-wrap justify-center items-center">
              <div className="flex justify-center gap-2 md:flex-row mx-auto place-items-center mt-4 w-full">
                <SortingAlgorithmsCombobox onValueChange={setSelectedSort} />
                <CategoryCombobox onValueChange={setSelectedCategory} />
                <NutritionalValueCombobox onValueChange={setSelectedNutrient} />
                <SortButton sortClicked={handleSort} />
              </div>

              <div className="flex items-center justify-center mt-6 h-[80vh] scale-100">
                <SortingBarChart
                    sortTrigger={triggerSort}
                    selectedNutrient={selectedNutrient}
                    selectedCategory={selectedCategory}
                    selectedSort={selectedSort}
                />
              </div>
            </div>
          </div>
      </div>

  );
}

export default App;
