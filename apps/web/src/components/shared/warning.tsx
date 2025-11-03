import { cn } from "@/lib/utils";

export function Warning({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-yellow-50 border mb-4 border-yellow-300 text-yellow-600 rounded p-2 text-sm",
        className
      )}
    >
      {text}
    </div>
  );
}
