import { transcriptQueue, type TranscriptJobData } from "@reclara/redis";

const payload: TranscriptJobData = {
  id: "dev-summary-1",
  userId: "dev-user",
  videoId: "NO4X_-OVSmU",
  transcript: "",
  summarize: "",
  model: "gpt-oss-120b",
  state: "start_transcript",
};

async function main() {
  await transcriptQueue.add("transcript-job", payload);
}

if (require.main === module) {
  main();
}
