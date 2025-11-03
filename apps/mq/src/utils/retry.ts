export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 750
): Promise<T> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      const errorMsg = error.stderr?.toString() || error.message || "";
      const is429 =
        errorMsg.includes("429") || errorMsg.includes("Too Many Requests");

      if (is429 && attempt < maxRetries - 1) {
        const waitTime = Math.pow(2, attempt) * baseDelay;
        console.log(
          `⏳ Rate limited (429). Retrying dalam ${
            waitTime / 1000
          }s... (Attempt ${attempt + 1}/${maxRetries})`
        );
        await delay(waitTime);
      } else {
        throw error;
      }
    }
  }
  throw new Error("withRetry: All attempts failed.");
}
