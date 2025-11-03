"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "../client";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  const { signOut } = useAuth();

  return (
    <Button
      type="submit"
      className="cursor-pointer"
      onClick={() => signOut("/")}
    >
      <LogOut />
      Sign Out
    </Button>
  );
}
