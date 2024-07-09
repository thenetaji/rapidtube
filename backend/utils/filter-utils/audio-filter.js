const getVideoDetails = require("../video-details.js");
const onlyThumbnail = require("../only-thumbnail.js");

async function audioFilter(data){
  const onlyAudio = data.formats.filter(item => item.mimeType && item.mimeType.startsWith("audio"));
  
    const mp4AudioWithmp4a = onlyAudio.filter(item => item.mimeType.includes("audio/mp4" && "mp4a")).map(item => ({
      itag: item.itag,
      type: "audio/mp3",
      quality: Math.floor(item.bitrate / 1000) + "kbps",
      size: (item.contentLength / 1048576).toFixed(2) + "mb"
    })); //audioWithmp4a
    /*1024 bytes = 1kb
    *1024kb = 1mb
    *1,048,576 bytes in one mb*/

    const webmAudioWithOpus = onlyAudio.filter(item => item.mimeType.includes("audio/webm" && "opus")).map(item => ({
        itag: item.itag,
        type: "audio/webm",
        quality: Math.floor(item.bitrate / 1000) + "kbps",
        size: (item.contentLength / 1048576).toFixed(2) + "mb"
      })); //webmWithOpus
      
    const videoDetails = await getVideoDetails(data);
    const thumbnail = await onlyThumbnail(data);
    const formats = [...mp4AudioWithmp4a,...webmAudioWithOpus];
   return {
     videoDetails,
     thumbnail,
     formats
    };
};

module.exports = audioFilter;