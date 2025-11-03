import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { Header } from "./header";

type LayoutProviderProps = {
  children: React.ReactNode;
  className?: string;
};

export function LayoutProvider({ children, className }: LayoutProviderProps) {
  return (
    <div className="min-h-screen max-w-2xl mx-auto">
      <Header />
      <main className={cn("min-h-screen", className)}>{children}</main>

      <Toaster position="top-center" richColors />
    </div>
  );
}
