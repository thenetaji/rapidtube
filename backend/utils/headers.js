import sanitizeFilename from "./sanitize-filename.js";

function injectHeaders(res, meta, __format) {
  const encodedFilename = encodeURIComponent(
    sanitizeFilename(`RapidTube - ${meta.info.filename}`),
  );

  const contentSize = () => {
    let size;
    if (__format == "best") {
      size = meta.formats.filesize;
    } else {
      size = meta.formats.filter(item => item.format_id == __format)[0]
        .filesize;
    }
    if(size == undefined || size == null){
      size = null;
    }
    return size;
  };

  const contentType = () => {
    //not efficient i know but i am in hurry now!!
    let type;
    if (meta.info.shortVideo) {
      if (meta.info.audioOnly) {
        type = "audio/" + meta.formats[0].extension;
      } else {
        type = "video/" + meta.formats.extension;
      }
    } else {
      let format = meta.formats.filter(item => item.format_id == __format);
      if (meta.info.audioOnly) {
        type = "audio/" + format[0].extension;
      } else {
        type = "video/" + format[0].extension;
      }
    }
    if(type == undefined || type == null || !type){
      type = "video/mp4";
    }
    return type;
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
