import winston, { format } from "winston";
const { combine, colorize, printf, timestamp } = format;

export function injectHeaders(res, type, contentLength = undefined) {
  const encodedFilename = encodeURIComponent(
    "TokDL-" + Math.random().toString().slice(2),
  );
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="TokDL-${Math.random().toString().slice(2)}"; filename*=UTF-8''${encodedFilename}`,
  );
  res.setHeader("Content-Type", type === "video" ? "video/mp4" : "audio/mp3");
  res.setHeader("Transfer-Encoding", "chunked");

  if (contentLength) {
    res.setHeader("Content-Length", contentLength);
  }
}

/**
 * removes unnecessary chars
 * @param {string} filename
 * @returns {string} filename
 */
export function sanitizeFilename(filename) {
  return filename
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, "") // Remove control characters
    .replace(/[<>:"/\\|?*]/g, "-") // Replace Windows-invalid filename chars with dash
    .replace(/\.+/g, ".") // Replace multiple dots with single dot
    .replace(/^\.+|\.+$/g, "") // Remove leading/trailing dots
    .replace(/-+/g, "-"); // Replace multiple dashes with single dash
}

/**
 * Function to filter out specific data from the provided video info object
 * @param {Object} info - The video info object
 * @returns {Object} - Filtered video info
 */
export function filterMetaInfo(info) {
  const filteredInfo = {
    id: info.id,
    title: info.title,
    duration: info.duration,
    uploader: info.uploader,
    thumbnails: info.thumbnails.map((thumbnail) => ({
      url: thumbnail.url,
      preference: thumbnail.preference,
    })),
  };
  return filteredInfo;
}

export const checkURL = (url) => {
  const youtubePattern =
    /^(https?:\/\/)?(www\.)?(youtube|youtu|youtube-nocookie)\.(com|be)\/(watch\?v=|embed\/|v\/|e\/|.+[?&]v=)[a-zA-Z0-9_-]{11}.*$/;

  if (youtubePattern.test(url)) {
    return false;
  } else {
    return true;
  }
};

export const log = winston.createLogger({
  level: "silly",
  format: combine(
    timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
    printf(({ level, message, timestamp, ...meta }) => {
      const metaFormatted = Object.keys(meta).length
        ? JSON.stringify(meta, null, 2)
        : "";
      return `${timestamp} ${level}: ${message} ${metaFormatted}`;
    }),
    colorize({ all: true }),
  ),
  transports: [new winston.transports.Console()],
});
