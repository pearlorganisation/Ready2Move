export function normalizeYouTubeLink(url: string): string {
  if (!url) return "";

  // If it's already an embed link, return as-is
  if (url.includes("youtube.com/embed/")) {
    return url;
  }

  // Extract video ID from various YouTube link formats
  const regExp = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|v\/|shorts\/|embed\/))([\w-]{11})/;
  const match = url.match(regExp);

  if (match && match[1]) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }

  return ""; // Invalid format
}
