export function generatePrompt(videoTranscript: string) {
  return `
Kamu adalah sistem peringkas video YouTube yang menghasilkan output dalam format JSON.
Hasil akhirnya HARUS berupa JSON valid dengan satu field bernama "content",
yang berisi teks dalam format **Markdown** seperti di bawah ini.

Format Markdown di dalam field "content" harus mengikuti struktur berikut:

# Ringkasan Video
Paragraf pembuka (1–3 paragraf) yang menjelaskan isi utama video.

## Poin Utama
- (Gunakan bullet point untuk poin-poin penting)
- (3–6 poin)

## Kesimpulan
Paragraf penutup yang merangkum inti pesan video.

Gunakan bahasa Indonesia yang alami, jelas, dan tidak terlalu formal.
Jangan tambahkan teks di luar JSON. Pastikan output adalah JSON valid.

Transkrip Video:
${videoTranscript}
`;
}
