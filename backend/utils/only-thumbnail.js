function onlyThumbnail(data){
  const thumbnails = data.videoDetails.thumbnails.map(item => ({
      url: item.url,
      width: item.width,
      height: item.height
    }));
  return thumbnails;
};

module.exports = onlyThumbnail;