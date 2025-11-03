import * as React from "react";
import { createDataObjects } from "@/lib/utils";
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

let cache: string[] | null = null;

export function CategoryCombobox({
  onValueChange,
}: {
  onValueChange?: (value: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [categories, setCategories] = React.useState<string[]>([]);

  React.useEffect(() => {
    const loadCategories = async () => {
      if (cache) {
        setCategories(cache);
        return;
      }

      const dataObjects = await createDataObjects("/food.csv");
      const allCategories = dataObjects
        .map((row: any) => row["Category"])
        .filter((c) => c && c.trim() !== "");
      const counts: Record<string, number> = {};
      for (const c of allCategories) {
        const normalized = c.trim();
        counts[normalized] = (counts[normalized] || 0) + 1;
      }
      const filteredCategories = Object.keys(counts).filter(
        (cat) => counts[cat] > 1
      );
      const totalCategories = ["All Categories", ...filteredCategories];
      cache = totalCategories;
      setCategories(cache);
    };

    loadCategories();
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value || "Select category..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search categories..." className="h-9" />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {categories.map((cat) => (
                <CommandItem
                  key={cat}
                  value={cat}
                  onSelect={(currentValue) => {
                    const newValue = currentValue === value ? "" : currentValue;
                    setValue(newValue);
                    setOpen(false);
                    onValueChange?.(newValue);
                  }}
                >
                  {cat}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === cat ? "opacity-100" : "opacity-0"
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
