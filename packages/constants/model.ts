export const SUPPORTED_LLM_MODELS = [
  "llama4-maverick-instruct-basic",
  "gpt-oss-120b",
  "qwen3-vl-30b-a3b-instruct"
] as const;

export const SUPPORTED_LLM_MODELS_DETAILS: Record<
  (typeof SUPPORTED_LLM_MODELS)[number],
  { name: string; description: string }
> = {
  "llama4-maverick-instruct-basic": {
    name: "LLama 4 Maverick",
    description: "Basic instruction-following model.",
  },
  "gpt-oss-120b": {
    name: "GPT-OSS 120B",
    description: "Open-source model with 120 billion parameters.",
  },
  "qwen3-vl-30b-a3b-instruct": {
    name: "Qwen-VL Instruct",
    description: "Model with active 3B parameters for instruction tasks.",
  },
};

export const DEFAULT_LLM_MODEL: (typeof SUPPORTED_LLM_MODELS)[number] =
  "llama4-maverick-instruct-basic";
