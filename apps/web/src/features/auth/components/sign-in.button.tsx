"use client";

import { useAuth } from "../client";
import { Button } from "@/components/ui/button";
import { SupportedOauthProviders, IconType } from "../type";
import { cn } from "@/lib/utils";

type SignInProps = {
  provider: SupportedOauthProviders;
  name: string;
  Icon: IconType;
  style?: string;
  className?: string;
  IconStyle?: string;
};

export function SignIn({
  provider,
  name,
  Icon,
  className,
  style,
  IconStyle,
}: SignInProps) {
  const { signIn } = useAuth();
  return (
    <Button
      onClick={() => signIn.social({ provider })}
      className={cn(
        "w-full py-8 ml:text-[17px] sm:text-lg cursor-pointer transition-all flex items-center justify-start gap-4",
        className,
        style
      )}
    >
      <span
        className={`size-8 flex items-center justify-center
        }`}
      >
        <Icon className={cn("size-7", IconStyle)} />
      </span>
      Continue with {name}
    </Button>
  );
}
