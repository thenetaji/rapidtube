const getVideoDetails = require("../video-details.js");
const onlyThumbnail = require("../only-thumbnail.js");

async function captionFilter(data){
  const caption = await data.player_response.captions.playerCaptionsTracklistRenderer.captionTracks
    .map(item => ({
      languageName: item.name.simpleText,
      languageCode: item.languageCode,
      url: item.baseUrl || "Not available"
    }));
    const videoDetails = await getVideoDetails(data);
    const thumbnail = await onlyThumbnail(data);
    
    return {
      videoDetails,
      thumbnail,
      caption
    };
};

module.exports = captionFilter;