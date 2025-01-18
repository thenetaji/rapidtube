import sanitizeFilename from "./sanitize-filename.js";

function injectHeaders(res, meta, __format) {
  const encodedFilename = encodeURIComponent(
    sanitizeFilename(`RapidTube - ${meta.info.filename}`),
  );

  const contentSize = () => {
    let size = meta.formats.filter(item => item.format_id == __format)[0]
        .filesize;
    return size;
  };

  const contentType = (meta, __format) => {
  if (!meta || !meta.formats || !meta.info) {
    return "video/mp4";
  }

  const format = meta.formats.find(item => item.format_id === __format);
  if (!format) {
    return "video/mp4";
  }

  const extension = format.extension || "mp4";
  return meta.info.audioOnly ? `audio/${extension}` : `video/${extension}`;
};

  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${encodedFilename}"; filename*=UTF-8''${encodedFilename}`,
  );
  res.setHeader("Content-Type", contentType());
  res.setHeader("Transfer-Encoding", "chunked");
  res.setHeader("Content-Length", contentSize());
}

export default injectHeaders;
