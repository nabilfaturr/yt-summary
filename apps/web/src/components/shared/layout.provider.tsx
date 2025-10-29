import { cn } from "@/lib/utils";
import { Heading } from "@/components/shared/heading";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme.toggle";

type LayoutProviderProps = {
  children: React.ReactNode;
  className?: string;
};

export function LayoutProvider({ children, className }: LayoutProviderProps) {
  return (
    <div className="min-h-screen max-w-2xl mx-auto border font-sans">
      <header className="flex justify-between items-center p-5 border-b">
        <Heading level={2} variant="mono">Reclara</Heading>
        <div className="flex justify-between items-center gap-2">
          <Button asChild>
            <Link href={"/auth/sign-up"}>Sign Up</Link>
          </Button>
          <ThemeToggle />
        </div>
      </header>
      <main
        className={cn(
          `font-sans max-w-3xl min-h-screen flex items-center justify-center mx-auto`,
          className
        )}
      >
        {children}
      </main>
    </div>
  );
}
