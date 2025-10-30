import * as React from "react";
import { Button } from "@/components/ui/button";

type SortingMethodsSwitchProps = {
  isAscending: boolean;
  onToggle: (value: boolean) => void;
};

export function SortingMethodsSwitch({
  isAscending,
  onToggle,
}: SortingMethodsSwitchProps) {
  return (
    <div className="flex items-center">
      <Button
        className="rounded-none rounded-l-lg"
        variant={isAscending ? "default" : "outline"}
        onClick={() => onToggle(true)}
      >
        Ascending
      </Button>
      <Button
        className="rounded-none rounded-r-lg"
        variant={isAscending ? "outline" : "default"}
        onClick={() => onToggle(false)}
      >
        Descending
      </Button>
    </div>
  );
}
