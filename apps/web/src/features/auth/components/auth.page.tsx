import { LayoutProvider } from "@/components/shared/layout.provider";
import { SocialAuthCard } from "./social-auth.card";

type AuthPageProps = {
  type: "signin" | "signup";
};

export default function AuthPage({ type }: AuthPageProps) {
  return (
    <LayoutProvider>
      <SocialAuthCard auth={type} />
    </LayoutProvider>
  );
}
