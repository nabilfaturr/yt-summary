import Link from "next/link";
import { Heading } from "./heading";
import { ThemeToggle } from "./theme.toggle";
import { getSession, SignOutButton } from "@/features/auth";
import { Button } from "../ui/button";

export async function Header() {
  const session = await getSession();
  return (
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
          {session ? (
            <SignOutButton />
          ) : (
            <Button asChild>
              <Link href={"/auth/sign-up"}>Sign Up</Link>
            </Button>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
