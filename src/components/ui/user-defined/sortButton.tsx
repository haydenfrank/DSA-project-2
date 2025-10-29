import { Button } from "@/components/ui/button";

export function SortButton({ onSort }: { onSort: () => void }) {
  return <Button onClick={onSort}>Sort</Button>;
}
