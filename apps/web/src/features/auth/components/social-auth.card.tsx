"use client";

import {
  AUTH_CONFIG,
  SUPPORTED_OAUTH_PROVIDERS_DETAILS,
} from "@/features/auth/constant";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { SignIn } from "./sign-in.button";
import { SupportedOauthProviders } from "../type";
import Link from "next/link";

type SocialAuthCardProps = {
  auth: "signin" | "signup";
};

export function SocialAuthCard({ auth }: SocialAuthCardProps) {
  const { title, question, linkText, linkHref, greetings } = AUTH_CONFIG[auth];

  return (
    <Card className="shadow-none gap-10 border-none w-full max-w-lg bg-">
      <CardHeader className="gap-1 text-left">
        <p className="text-lg text-muted-foreground">{greetings}</p>
        <h1 className="text-2xl md:text-3xl font-semibold">{title}</h1>
      </CardHeader>
      <CardContent className="space-y-3">
        {Object.entries(SUPPORTED_OAUTH_PROVIDERS_DETAILS).map(
          ([provider, { name, Icon, style, IconStyle }]) => (
            <SignIn
              key={provider}
              provider={provider as SupportedOauthProviders}
              name={name}
              Icon={Icon}
              IconStyle={IconStyle}
              style={style}
            />
          )
        )}
      </CardContent>
      <CardFooter className="flex-col items-start w-full gap-3">
        <p className="text-muted-foreground">
          {question}{" "}
          <Link
            href={linkHref}
            className="text-foreground font-medium hover:underline"
            aria-label={`${linkText} page`}
          >
            {linkText}
          </Link>
          {auth === "signin" && (
            <>
              {" "}
              or{" "}
              <Link
                href="/"
                className="text-foreground font-medium hover:underline"
                aria-label="Learn more about our service"
              >
                Learn More
              </Link>
            </>
          )}
        </p>
        {auth === "signup" && (
          <p className="text-sm text-muted-foreground w-full">
            By proceeding, you agree to create an account and your data is used
            only for essential authentication.
          </p>
        )}
      </CardFooter>
    </Card>
  );
}
