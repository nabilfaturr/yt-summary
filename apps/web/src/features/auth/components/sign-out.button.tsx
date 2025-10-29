"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "../client";

export function SignOutButton() {
  const { signOut } = useAuth();

  return (
    <Button
      type="submit"
      className="cursor-pointer bg-red-500 hover:bg-red-400 text-white"
      onClick={() => signOut()}
    >
      Sign Out
    </Button>
  );
}
