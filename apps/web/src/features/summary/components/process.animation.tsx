
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

type TickAnimationProps = {
  text: string;
  className?: string;
};

export function ProcessAnimation({ text, className }: TickAnimationProps) {
  return (
    <div
      className={cn(
        "border bg-muted/80 rounded-lg p-4 gap-3 text flex items-center",
        className
      )}
    >
      <p className="font-sans text-lg text-muted-foreground">{`${text}`}</p>
      <Spinner />
    </div>
  );
}
