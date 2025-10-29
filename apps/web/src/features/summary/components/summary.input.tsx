import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const placeholder = `Input Youtube video URL or ID here`;

export function SummaryInput() {
  return (
    <form className="flex absolute h-16  bottom-0 w-full">
      <Input
        placeholder={placeholder}
        className="h-16 px-5 border-none bg-muted font-mono rounded-none"
      />
      <Button className="rounded-none h-full w-26 text-lg cursor-pointer" size="lg">
        Start
      </Button>
    </form>
  );
}
