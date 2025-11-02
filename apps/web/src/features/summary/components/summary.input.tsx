"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModelMenu } from "./model.menu";
import { DEFAULT_LLM_MODEL } from "@reclara/constants";
import { sendVideoURL } from "../actions";
import { toast } from "sonner";
import { formSchema } from "../validation";
import { Summary } from "@reclara/db/schemas/summary.schema";

const placeholder = `Input Youtube video URL or ID here`;

type SummaryInputProps = {
  form: {
    videoUrl: string;
    model: typeof DEFAULT_LLM_MODEL;
  };
  setForm: React.Dispatch<
    React.SetStateAction<{
      videoUrl: string;
      model: typeof DEFAULT_LLM_MODEL;
    }>
  >;
  start: () => void;
  setSummary: React.Dispatch<React.SetStateAction<Summary | null>>;
};

export function SummaryInput({
  form,
  setForm,
  start,
  setSummary,
}: SummaryInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsed = formSchema.safeParse(form);

    if (!parsed.success) {
      return toast.error(parsed.error.issues[0]?.message || "Invalid input", {
        className: "mt-24",
      });
    }

    const formData = new FormData();
    formData.append("videoUrl", form.videoUrl);
    formData.append("model", form.model);

    const summary = await sendVideoURL(formData);

    if (!summary) {
      return toast.error("Failed to process the video URL", {
        className: "mt-24",
      });
    }

    setSummary(summary);
    start();
  };

  return (
    <form
      className="FIXED z-10 bottom-0 cursor-pointer"
      onClick={() => {
        inputRef.current?.focus();
      }}
      onSubmit={handleSubmit}
    >
      <div className="h-26 flex flex-col gap-2 bg-input p-3 rounded-xl dark:bg-neutral-900">
        <Input
          placeholder={placeholder}
          ref={inputRef}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              videoUrl: e.target.value,
            }))
          }
          className="border-none font-mono shadow-none dark:bg-transparent"
        />
        <div className="flex items-center justify-end gap-2">
          <ModelMenu
            form={form}
            setForm={setForm}
            triggerClassName="w-fit font-sans"
          />
          <Button className="cursor-pointer bottom" size="sm" type="submit">
            Summarize
          </Button>
        </div>
      </div>
    </form>
  );
}
