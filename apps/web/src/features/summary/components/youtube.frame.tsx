"use client";

import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type YouTubeFrameProps = {
  videoId: string;
  loadingDelay?: number;
};

export function YouTubeFrame({
  videoId,
  loadingDelay = 1500,
}: YouTubeFrameProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, loadingDelay);

    return () => clearTimeout(timer);
  }, [loadingDelay]);

  return (
    <div className="flex items-center justify-center">
      {isLoading ? (
        <Skeleton className="h-72 w-full rounded-lg sm:h-76 md:h-90" />
      ) : (
        <iframe
          width="100%"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-lg h-72 sm:h-76 md:h-90"
        ></iframe>
      )}
    </div>
  );
}
