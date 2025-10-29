"use server";

import { auth } from "./server";
import { headers } from "next/headers";
import type { Session } from "./type";

export async function getSession(): Promise<Session> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return session;
}