import { Button } from "@/components/ui/button";

export function SortButton({ sortClicked }: { sortClicked: () => void }) {
  return <Button onClick={sortClicked}>Sort</Button>;
}
