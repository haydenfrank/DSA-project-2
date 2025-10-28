"use client";

import * as React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function SortingMethodsSwitch() {
  const [isAscending, setIsAscending] = React.useState(true);

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id="sort-method"
        checked={isAscending}
        onCheckedChange={(checked) => setIsAscending(checked)}
      />
      <Label htmlFor="sort-method">
        {isAscending ? "Ascending" : "Descending"}
      </Label>
    </div>
  );
}
