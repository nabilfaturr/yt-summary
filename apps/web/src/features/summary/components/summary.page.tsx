import { LayoutProvider } from "@/components/shared/layout.provider";
import { SummaryInput } from "./summary.input";
import { AuthProvider, getSession } from "@/features/auth";
import { Session } from "@/components/shared/session.card";

export async function SummaryPage() {
  const session = await getSession();

  return (
    <AuthProvider>
      <LayoutProvider className="flex-col absolute inset-0">
        <SummaryResult />
        <SummaryInput />
      </LayoutProvider>
    </AuthProvider>
  );
}

export function SummaryResult() {
  return (
    <div className="w-full max-w-2xl flex justify-center items-center flex-1">
      <iframe
        width="95%"
        height="300"
        className="rounded-lg"
        src="https://www.youtube.com/embed/pHK2UxwfaL0?si=_F-Eh_KCAFcOj-jt"
        title="YouTube video player"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
}
