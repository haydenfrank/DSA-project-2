import * as React from "react";
import { Button } from "@/components/ui/button";

export function SortingMethodsSwitch() {
  const [isAscending, setIsAscending] = React.useState(true);
  const handleToggle = (ascending: boolean) => {
    setIsAscending(ascending);
    console.log(ascending ? "Sort is ascending" : "Sort is descending");
  };

  return (
    <div className="flex items-center">
      <Button
        className="rounded-none rounded-l-lg"
        variant={`${isAscending ? "default" : "outline"}`}
        onClick={() => handleToggle(true)}
      >
        Ascending
      </Button>
      <Button
        className="rounded-none rounded-r-lg"
        variant={`${isAscending ? "outline" : "default"}`}
        onClick={() => handleToggle(false)}
      >
        Descending
      </Button>
    </div>
  );
}
