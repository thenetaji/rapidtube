function filter(meta = {}) {
  const thumbnails = meta.thumbnails
  .filter(item => item.width != null && item.height != null)
  .map(item => ({
    url: item.url,
    width: item.width || null,
    height: item.height || null,
  }));

  const info = {
    id: meta.id,
    title: meta.title,
    filename: meta.filename,
    duration: meta.duration,
    shortVideo: Math.floor(meta.duration) < 300,
  };

  const formats = meta.formats
    .filter(item => {
      return (
        (item.filesize || item.filesize_approx) &&
       (item.vcodec == "none" || item.acodec != "none")
      );
    })
    .map(item => ({
      format_id: item.format_id,
      extension: item.ext,
      filesize: item.filesize || item.filesize_approx,
      audioOnly: item.vbr === 0,
      resolution: item.resolution,
      videoQuality: item.format_note || null,
      audioQuality:
        item.abr && item.abr !== 0 ? Math.floor(item.abr) + "kbps" : null,
      vcodec: item.vcodec,
      acodec: item.acodec,
    }));

  return {
    info,
    thumbnails,
    formats,
  };
}

export default filter;