// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import "./App.css";
import { SortingAlgorithmsCombobox } from "./components/ui/user-defined/sortingAlgorithmsCombobox";
import { NutritionalValueCombobox } from "./components/ui/user-defined/nutritionalValueCombobox";
import { SortingMethodsSwitch } from "./components/ui/user-defined/sortingMethodsSwitch";
import { SortButton } from "./components/ui/user-defined/sortButton";
import { BarGraph } from "./components/ui/barGraph";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex flex-wrap justify-center items-center">
        <div className="flex justify-center gap-2 md:flex-row mx-auto place-items-center mt-4 w-full">
          <SortingAlgorithmsCombobox />
          <NutritionalValueCombobox />
          <SortingMethodsSwitch />
          <SortButton />
        </div>
        <div className="flex justify-center mt-6 h-[80vh] scale-85">
          <BarGraph />
        </div>
      </div>
    </>
  );
}

export default App;
