import { cn } from "@/lib/utils";
import { Heading } from "@/components/shared/heading";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme.toggle";
import { Toaster } from "sonner";

type LayoutProviderProps = {
  children: React.ReactNode;
  className?: string;
};

export function LayoutProvider({ children, className }: LayoutProviderProps) {
  return (
    <div className="min-h-screen max-w-2xl mx-auto">
      <header className="FIXED top-0 z-10">
        <div className="flex justify-between items-center p-5 bg-background/80 backdrop-blur-md border rounded-lg ">
          <Link
            href="/"
            className="cursor-pointer hover:underline transition-all"
          >
            <Heading level={2} variant="mono">
              Reclara
            </Heading>
          </Link>
          <div className="flex items-center gap-2">
            <Button asChild>
              <Link href={"/auth/sign-up"}>Sign Up</Link>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className={cn("min-h-screen", className)}>{children}</main>

      <Toaster position="top-center" richColors />
    </div>
  );
}
