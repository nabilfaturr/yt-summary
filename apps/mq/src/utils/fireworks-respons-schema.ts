export const summarySchema = {
  name: "SummaryResponse",
  schema: {
    type: "object",
    properties: {
      content: {
        type: "string",
        minLength: 50,
        description: `
Ringkasan video dalam format Markdown.

Struktur yang diharapkan:
# Ringkasan Video
(1–3 paragraf pembuka yang menjelaskan isi utama video)

## Poin Utama
• 3–6 bullet point berisi poin penting video

## Kesimpulan
(1 paragraf penutup yang merangkum inti pesan video)

Gunakan bahasa Indonesia yang alami, jelas, dan tidak terlalu formal.
`,
      },
    },
    required: ["content"],
    additionalProperties: false,
  },
};
