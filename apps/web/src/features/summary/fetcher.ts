import { AppError } from "@/lib/error";

export async function fetcher<T>(url: string): Promise<T> {
  try {
    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) {
      const error = await res.json().catch(() => ({}));
      throw new AppError(
        error.error ||
          error.message ||
          `Request failed with status ${res.status}`,
        "FETCH_ERROR",
        res.status
      );
    }

    const json = await res.json();
    return json.data ?? json;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(
      error instanceof Error ? error.message : "Network error occurred",
      "NETWORK_ERROR"
    );
  }
}
