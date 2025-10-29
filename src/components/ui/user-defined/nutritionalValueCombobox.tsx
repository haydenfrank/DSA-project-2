"use client";

import * as React from "react";
import { parseDataTitles } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function NutritionalValueCombobox() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [columns, setColumns] = React.useState<string[]>([]);

  React.useEffect(() => {
    const fetchColumns = async () => {
      const colTitles = await parseDataTitles("/food.csv");
      setColumns(colTitles);
    };
    fetchColumns();
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value || "Select nutritional value..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search nutritional values..."
            className="h-9"
          />
          <CommandList>
            {/* {columns.length === 0 ? (
              <CommandEmpty>No columns found.</CommandEmpty>
            ) : (
              <CommandGroup>
                {columns.map((col) => (
                  <CommandItem
                    key={col}
                    value={col}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    {col}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === col ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            )} */}
            <CommandEmpty>No nutritional value found.</CommandEmpty>
            <CommandGroup>
              {columns.map((col) => (
                <CommandItem
                  key={col}
                  value={col}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {col}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === col ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
