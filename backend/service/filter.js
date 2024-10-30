const filterInstaMetaInfo = metaInfoJSON => {
  const meta = JSON.parse(metaInfoJSON);
  const info = {
    id: meta.id,
    title: meta.title,
    description: meta.description,
    duration: meta.duration,
    userId: meta.channel,
    userName: meta.uploader,
    filename: meta.filename,
  };

  const thumbnails = meta.thumbnails.map(item => ({
    url: item.url,
    width: item.width,
    height: item.height,
  }));

  return {
    info,
    thumbnails,
  };
};

const filterTwitterMetaInfo = metaInfoJSON => {
  const meta = JSON.parse(metaInfoJSON);
  const info = {
    id: meta.id,
    title: meta.title,
    description: meta.description,
    duration: meta.duration,
    userId: meta.uploader_id,
    userName: meta.uploader,
    filename: meta.filename,
  };

  const thumbnails = meta.thumbnails.map(item => ({
    url: item.url,
    width: item.width,
    height: item.height,
  }));

  return {
    info,
    thumbnails,
  };
};

const filterYoutubeMetaInfo = infoJSON => {
  const meta = JSON.parse(infoJSON);
  const info = {
    id: meta.id,
    title: meta.title,
    duration: meta.duration,
    channel: meta.channel,
    views: meta.view_count,
    filename: meta.filename,
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
};

export { filterInstaMetaInfo,filterTwitterMetaInfo,filterYoutubeMetaInfo };
