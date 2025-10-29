import { cn } from "@/lib/utils";

type LayoutProviderProps = {
  children: React.ReactNode;
  className?: string;
};

export function LayoutProvider({ children, className }: LayoutProviderProps) {
  return (
    <main
      className={cn(
        `font-sans max-w-3xl min-h-screen flex items-center justify-center mx-auto`,
        className
      )}
    >
      {children}
    </main>
  );
}
