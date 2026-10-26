
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const ALLOWED_TYPES = [
  "application/pdf",
  "image/png",
  "image/jpeg",
];

export function validateFile(file: File): string {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return "Only PDF, PNG, and JPEG files are allowed.";
  }

  if (file.size > MAX_FILE_SIZE) {
    return "File size must be 5 MB or less.";
  }

  if (file.size === 0) {
    return "The selected file is empty.";
  }

  return "";
}
