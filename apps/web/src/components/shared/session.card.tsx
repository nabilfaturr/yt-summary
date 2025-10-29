import type { Session } from "@/features/auth";

export function Session({ session }: { session: Awaited<Session> | null }) {
  if (!session) return <div>No session available.</div>;

  return (
    <div className="p-3 rounded shadow-2xs bg-foreground/5">
      <h2 className="font-mono text-lg font-bold">Session Info</h2>
      <div className="overflow-scroll h-40 w-full max-w-lg">
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </div>
    </div>
  );
}
