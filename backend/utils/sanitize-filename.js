export default function sanitizeFilename(filename) {
  return filename
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, "") // Remove control characters
    .replace(/[<>:"/\\|?*]/g, "-") // Replace Windows-invalid filename chars with dash
    .replace(/\.+/g, ".") // Replace multiple dots with single dot
    .replace(/^\.+|\.+$/g, "") // Remove leading/trailing dots
    .replace(/-+/g, "-"); // Replace multiple dashes with single dash
}
