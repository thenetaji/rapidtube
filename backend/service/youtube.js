function sortData(infoJSON) {
  const meta = JSON.parse(infoJSON);
  const info = {
    id: meta.id,
    title: meta.title,
    duration: meta.duration,
    channel: meta.channel,
    views: meta.view_count,
  };

  const formats = meta.formats
    .filter(
      item =>
        item.ext !== "mhtml" &&
        item.format_note !== "Default" &&
        (item.filesize || item.filesize_approx),
    )
    .map(item => ({
      format_id: item.format_id,
      hasVideo: item.video_ext != "none",
      hasAudio: item.audio_ext != "none",
      videoQuality: item.video_ext != "none" ? item.format_note : null,
      audioQuality:
        item.audio_ext != "none" ? `${Math.floor(item.abr)} kbps` : null,
      extension: item.ext,
      filesize: item.filesize || item.filesize_approx || null,
    }));

  const thumbnails = meta.thumbnails
    .filter(item => item.resolution)
    .map(item => ({
      url: item.url,
      width: item.width,
      height: item.height,
    }));

  return { info, formats, thumbnails };
}

export default sortData;
