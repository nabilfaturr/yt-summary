import { LayoutProvider } from "@/components/shared/layout.provider";
import { AuthProvider } from "@/features/auth/components/auth.provider";
import { SignOutButton } from "@/features/auth/components/sign-out.button";

export default function HomePage() {
  return (
    <LayoutProvider className="flex-col">
      <AuthProvider>
        <h1>Welcome to the Home Page</h1>
        <SignOutButton />
      </AuthProvider>
    </LayoutProvider>
  );
}
