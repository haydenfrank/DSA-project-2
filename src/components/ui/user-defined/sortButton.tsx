"use client";

import { Button } from "@/components/ui/button";

export function SortButton() {
  const handleClick = () => {
    console.log("Button clicked!");
  };

  return <Button onClick={handleClick}>Sort</Button>;
}
