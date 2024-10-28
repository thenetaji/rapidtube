const filterInstaMetaInfo = metaInfoJSON => {
  console.log();
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

export { filterInstaMetaInfo };
