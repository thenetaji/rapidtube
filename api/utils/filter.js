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
  };

  const formats = meta.formats
    .filter(item => {
      return (
        (item.filesize || item.filesize_approx) &&
        (item.vcodec == "none" || item.acodec != "none")
      );
    })
    .map(item => ({
      extension: item.ext,
      filesize: item.filesize || item.filesize_approx,
    }));

  return {
    info,
    thumbnails,
    formats,
  };
}

export default filter;
