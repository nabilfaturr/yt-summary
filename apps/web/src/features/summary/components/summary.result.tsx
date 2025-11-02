import Markdown from "@/components/shared/markdown";
import { Summary } from "@reclara/db/schemas/summary.schema";
import { YouTubeFrame } from "./youtube.frame";
import { ProcessAnimation } from "./process.animation";

export function SummaryResult({ summary }: { summary: Summary | null }) {
  const showVideo =
    summary?.state === "start_transcript" ||
    summary?.state === "start_summarizing" ||
    summary?.state === "finished";

  if (!summary) return <NoSummary />;

  return (
    <div className="px-2">
      {summary?.state === "pending" && (
        <ProcessAnimation text="Fetch youtube video" />
      )}
      {showVideo && (
        <div className="space-y-2">
          <YouTubeFrame videoId={summary.videoId} />
          {summary?.state === "start_transcript" && (
            <ProcessAnimation text="Transcripting the video" />
          )}
          {summary?.state === "start_summarizing" && (
            <ProcessAnimation text="Summarizing" />
          )}
          {summary?.state === "finished" && summary.summarize && (
            <Markdown content={summary.summarize} />
          )}
        </div>
      )}
    </div>
  );
}

const NoSummary = () => (
  <div className="relative text-center top-95">
    <p className="font-vt323 text-6xl font-semibold text-center">
      Lets create a summary!
    </p>
  </div>
);
