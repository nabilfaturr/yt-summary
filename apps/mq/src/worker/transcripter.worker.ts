import fs from "fs/promises";
import { Worker } from "bullmq";
import { connection, type TranscriptJobData } from "@reclara/redis";
import { updateSummary } from "@reclara/db";
import { cleanSubtitle, downloadWithShell } from "../utils";

const transcriptWorker = new Worker<TranscriptJobData>(
  "transcript-queue",
  async (job) => {
    try {
      console.log(`=== Transcripter Worker ===`);

      await updateSummary({
        id: job.data.id as string,
        userId: job.data.userId,
        videoId: job.data.videoId,
        model: job.data.model,
        state: "start_transcript",
      });

      const videoUrl = `https://www.youtube.com/watch?v=${job.data.videoId}`;

      if (!videoUrl) {
        throw new Error("Video URL is undefined. Cannot run yt-dlp.");
      }

      const { location } = await downloadWithShell(videoUrl, {
        customFilename: `subs-${job.id}`,
      });

      const vttContent = await fs.readFile(location, "utf-8");

      const cleanedText = cleanSubtitle(vttContent);

      await updateSummary({
        id: job.data.id as string,
        userId: job.data.userId,
        videoId: job.data.videoId,
        model: job.data.model,
        transcript: cleanedText,
        state: "success_transcript",
      });

      console.log("=== Transcript Worker Done ===");

      return { cleanedText };
    } catch (error) {
      console.error(`Error processing job ${job.id}:`, error);
    }
  },
  { connection }
);

// transcriptWorker.on("completed", async (job, returnvalue) => {
//   await summaryQueue.add("summary-queue", {
//     transcript: returnvalue.cleanedText,
//   });
// });

transcriptWorker.on("failed", (job, err) => {
  console.error(`❌ Job ${job?.id} failed:`, err);
});
