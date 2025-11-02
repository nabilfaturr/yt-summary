"use client";

import React from "react";
import { SummaryInput } from "@/features/summary/components/summary.input";
import { DEFAULT_LLM_MODEL } from "@reclara/constants";
import { useControlledFetch } from "../hooks/useControlledFetch";
import { Summary } from "@reclara/db/schemas/summary.schema";
import { SummaryResult } from "./summary.result";

export function SummaryPage() {
  const [summary, setSummary] = React.useState<Summary | null>(null);
  const hasStartedRef = React.useRef(false);

  const { data, start } = useControlledFetch<Summary>(
    summary ? `/api/summary?id=${summary.id}` : undefined,
    {
      autoStop: (data) => data.state === "finished",
    }
  );

  const [form, setForm] = React.useState({
    videoUrl: "",
    model: DEFAULT_LLM_MODEL,
  });

  React.useEffect(() => {
    if (summary?.id && !hasStartedRef.current) {
      console.log("🚀 Starting polling for summary:", summary.id);
      hasStartedRef.current = true;
      start();
    }
  }, [summary?.id, start]);

  React.useEffect(() => {
    if (data) {
      setSummary((prev: Summary | null) => {
        if (JSON.stringify(prev) === JSON.stringify(data)) return prev;
        return data;
      });
    }
  }, [data]);

  React.useEffect(() => {
    if (!summary?.id) {
      hasStartedRef.current = false;
    }
  }, [summary?.id]);

  return (
    <>
      <SummaryResult summary={summary} />
      <SummaryInput
        start={start}
        form={form}
        setSummary={setSummary}
        setForm={setForm}
      />
    </>
  );
}
