const getVideoDetails = require("../video-details.js");
const onlyThumbnail = require("../only-thumbnail.js");

async function thumbnailFilter(data){
  const videoDetails = await getVideoDetails(data);
  const thumbnail = await onlyThumbnail(data);
  return {
    videoDetails,
    thumbnail
  };
};

module.exports = thumbnailFilter;