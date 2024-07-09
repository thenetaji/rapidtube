const getVideoDetails = require("../video-details.js");
const onlyThumbnail = require("../only-thumbnail.js");

async function videoAndAudioFilter(data){
  const onlyVideo = data.formats.filter(item => item.mimeType && item.mimeType.startsWith("video"));
  
    let videoAvailableCodac;
    const mp4VideoWithav01 = onlyVideo.filter(item => item.mimeType.includes("mp4" && "av01")).map(item => ({
     itag: item.itag,
     type: "video/mp4",
     quality: item.qualityLabel + "p",
     size: (item.contentLength / 1048576).toFixed(2) + "mb"
    })); //mp4VideoWithav01 
    videoAvailableCodac = mp4VideoWithav01;
    
    if(videoAvailableCodac.length === 0){
      const mp4VideoWithavc1 = onlyVideo.filter(item => item.mimeType.includes("mp4" && "avc1")).map(item => ({
        itag: item.itag,
        type: "video/mp4",
        quality: item.qualityLabel + "p",
        size: (item.contentLength / 1048576).toFixed(2) + "mb"
      })); //mp4VideoWithavc1
      videoAvailableCodac = mp4VideoWithavc1;
   };
   
   const webmVideo = onlyVideo.filter(item => item.mimeType.includes("webm" && "vp9" || "av1")).map(item => ({
     itag: item.itag,
     type: "video/webm",
     quality: item.qualityLabel,
     size: (item.contentLength / 1048576).toFixed(2) + "mb"
    })); //webm
    
    const videoDetails = await getVideoDetails(data);
    const thumbnail = await onlyThumbnail(data);
    const formats = [...videoAvailableCodac,...webmVideo];
    
    return {
      videoDetails,
      thumbnail,
      formats
   };
};

module.exports = videoAndAudioFilter;