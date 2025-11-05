import env from "@reclara/env";
import { summarySchema } from "./fireworks-respons-schema";
import type { SUPPORTED_LLM_MODELS } from "@reclara/constants";

type FireworksModel = (typeof SUPPORTED_LLM_MODELS)[number];

type FireworksParams = {
  model: FireworksModel;
  prompt: string;
  max_tokens?: number;
  temperature?: number;
};

type FireworksResponse = {
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage?: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
};

export async function fetchFireworks(
  model: FireworksModel,
  prompt: string,
  options?: Partial<Omit<FireworksParams, "model" | "prompt">>
): Promise<FireworksResponse> {
  const apiKey = env.FIREWORKS_API_KEY;

  if (!apiKey) {
    throw new Error("FIREWORKS_API_KEY environment variable is not set");
  }

  const response = await fetch(
    "https://api.fireworks.ai/inference/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: `accounts/fireworks/models/${model}`,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: options?.max_tokens ?? 4096,
        temperature: options?.temperature ?? 0.3,
        top_p: 1,
        top_k: 40,
        presence_penalty: 0,
        frequency_penalty: 0,
        response_format: {
          type: "json_schema",
          json_schema: summarySchema,
        },
      }),
    }
  );

  console.log(`[RESPONSE] `, response);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Fireworks API error: ${response.status} ${response.statusText} - ${errorText}`
    );
  }

  return response.json() as Promise<FireworksResponse>;
}

export type { FireworksModel, FireworksParams, FireworksResponse };
