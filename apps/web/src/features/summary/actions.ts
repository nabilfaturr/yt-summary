"use server";

import { createSummary } from "@reclara/db";
import { formSchema } from "./validation";
import { getSession } from "@/features/auth";
import { extractVideoIdFromUrl } from "./utils";
import { Summary } from "@reclara/db/schemas/summary.schema";
import { transcriptQueue } from "@reclara/redis";
import { redirect } from "next/navigation";

export async function sendVideoURL(
  formData: FormData
): Promise<Summary | false> {
  const session = await getSession();

  if (!session) {
    console.error("User not authenticated");
    redirect("/auth/sign-in");
  }

  try {
    const { user } = session;

    const videoUrl = formData.get("videoUrl") as string;
    const model = formData.get("model") as string;

    const body = {
      videoUrl,
      model,
    };

    console.log({ body });

    const parsedBody = formSchema.safeParse(body);

    if (!parsedBody.success) {
      console.error("Invalid video URL or model:", parsedBody.error);
      return false;
      return false;
    }

    const videoId = extractVideoIdFromUrl(parsedBody.data.videoUrl);

    const summarized = await createSummary({
      model: parsedBody.data.model,
      userId: user.id,
      videoId,
    });

    await transcriptQueue.add("summary-job", summarized);

    return summarized;
  } catch (error) {
    console.error("Error processing video URL:", error);
    return false;
  }
}
