// TODO : split into two components : one for static markdown rendering and one for streaming markdown rendering

"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Warning } from "./warning";

type MarkdownProps = {
  content: string;
  streaming?: boolean;
  streamSpeed?: number; // characters per tick
  streamDelay?: number; // milliseconds between ticks
};

export default function Markdown({
  content,
  streaming = true,
  streamSpeed = 2,
  streamDelay = 2,
}: MarkdownProps) {
  const [displayedContent, setDisplayedContent] = useState("");

  useEffect(() => {
    // For non-streaming, set immediately in the next tick
    if (!streaming) {
      const timer = setTimeout(() => setDisplayedContent(content), 0);
      return () => clearTimeout(timer);
    }

    // Reset and start streaming
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setDisplayedContent("");
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < content.length) {
        const nextIndex = Math.min(currentIndex + streamSpeed, content.length);
        setDisplayedContent(content.slice(0, nextIndex));
        currentIndex = nextIndex;
      } else {
        clearInterval(interval);
      }
    }, streamDelay);

    return () => clearInterval(interval);
  }, [content, streaming, streamSpeed, streamDelay]);

  return (
    <div className="prose prose-neutral max-w-none dark:prose-invert overflow-y-auto font-sans py-4 px-1">
      <Warning text="Warning : Model can make mistakes, always cross check the result!" />
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {displayedContent}
      </ReactMarkdown>
    </div>
  );
}
