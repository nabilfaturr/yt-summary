export interface CleanSubtitleOptions {
  joinLines?: boolean;
  separator?: string;
  removeEmptyLines?: boolean;
  normalizeSpaces?: boolean;
}

export function cleanSubtitle(
  vttContent: string,
  options: CleanSubtitleOptions = {}
): string {
  const {
    joinLines = false,
    separator = " ",
    removeEmptyLines = true,
    normalizeSpaces = true,
  } = options;

  const lines = vttContent.split("\n");

  const cleanedLines: string[] = [];
  const seenTexts = new Set<string>();

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]?.trim() || "";

    if (!line && removeEmptyLines) {
      continue;
    }

    if (line === "WEBVTT") {
      continue;
    }

    if (line.startsWith("Kind:") || line.startsWith("Language:")) {
      continue;
    }

    if (isTimestampLine(line)) {
      continue;
    }

    if (line.includes("align:") || line.includes("position:")) {
      continue;
    }

    const cleanedLine = removeTimingTags(line);

    if (!cleanedLine && removeEmptyLines) {
      continue;
    }

    const normalizedText = cleanedLine.toLowerCase().trim();
    if (seenTexts.has(normalizedText)) {
      continue;
    }
    seenTexts.add(normalizedText);

    cleanedLines.push(cleanedLine);
  }

  let result = joinLines
    ? cleanedLines.join(separator)
    : cleanedLines.join("\n");

  if (normalizeSpaces) {
    result = normalizeWhitespace(result);
  }

  return result.trim();
}

function isTimestampLine(line: string): boolean {
  const timestampRegex =
    /^\d{2}:\d{2}:\d{2}\.\d{3}\s*-->\s*\d{2}:\d{2}:\d{2}\.\d{3}/;
  return timestampRegex.test(line);
}

function removeTimingTags(text: string): string {
  text = text.replace(/<\d{2}:\d{2}:\d{2}\.\d{3}>/g, "");
  text = text.replace(/<\/[^>]+>/g, "");
  text = text.replace(/<c>/g, "");
  text = text.replace(/<[^>]*>/g, "");

  return text;
}

function normalizeWhitespace(text: string): string {
  return text
    .replace(/\s+/g, " ")
    .replace(/\n\s*\n/g, "\n")
    .trim();
}

export function cleanSubtitleSimple(vttContent: string): string {
  return cleanSubtitle(vttContent, {
    joinLines: true,
    removeEmptyLines: true,
    normalizeSpaces: true,
  });
}

export function cleanSubtitleParagraphs(vttContent: string): string {
  return cleanSubtitle(vttContent, {
    joinLines: false,
    removeEmptyLines: true,
    normalizeSpaces: true,
    separator: "\n",
  });
}

export interface SubtitleStats {
  originalLength: number;
  cleanedLength: number;
  compressionRatio: number;
  linesRemoved: number;
  wordsCount: number;
}

export function cleanSubtitleWithStats(
  vttContent: string,
  options: CleanSubtitleOptions = {}
): { cleanedText: string; stats: SubtitleStats } {
  const originalLength = vttContent.length;
  const originalLines = vttContent.split("\n").length;

  const cleanedText = cleanSubtitle(vttContent, options);
  const cleanedLength = cleanedText.length;
  const wordsCount = cleanedText
    .split(/\s+/)
    .filter((word) => word.length > 0).length;

  const stats: SubtitleStats = {
    originalLength,
    cleanedLength,
    compressionRatio: ((originalLength - cleanedLength) / originalLength) * 100,
    linesRemoved: originalLines - cleanedText.split("\n").length,
    wordsCount,
  };

  return { cleanedText, stats };
}

export interface SaveOptions {
  filePath: string;
  encoding?: BufferEncoding;
}

export async function saveCleanedSubtitle(
  cleanedText: string,
  options: SaveOptions
): Promise<{ success: boolean; filePath: string; bytesWritten: number }> {
  const fs = await import("fs/promises");
  const encoding = options.encoding || "utf-8";

  try {
    await fs.writeFile(options.filePath, cleanedText, encoding);
    const buffer = Buffer.from(cleanedText, encoding);
    return {
      success: true,
      filePath: options.filePath,
      bytesWritten: buffer.length,
    };
  } catch (error) {
    throw new Error(
      `Gagal menyimpan file: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function cleanAndSaveSubtitle(
  vttContent: string,
  filePath: string,
  options: CleanSubtitleOptions = {},
  encoding: BufferEncoding = "utf-8"
): Promise<{
  success: boolean;
  filePath: string;
  cleanedText: string;
  stats: SubtitleStats;
}> {
  const { cleanedText, stats } = cleanSubtitleWithStats(vttContent, options);

  const result = await saveCleanedSubtitle(cleanedText, { filePath, encoding });

  return {
    success: result.success,
    filePath: result.filePath,
    cleanedText,
    stats,
  };
}
