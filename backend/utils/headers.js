export default function injectHeaders(res, filename, contentType, contentSize) {
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${filename}"; filename*=UTF-8''${filename}`,
  );
  res.setHeader("Content-Type", contentType);
  res.setHeader("Transfer-Encoding", "chunked");
  res.setHeader("Content-Length", contentSize || null);
}
