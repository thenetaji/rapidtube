const ytdl = require("ytdl-core");

async function parseVideoID(url){
    if(!(await ytdl.validateURL(url))){
      throw new Error("URL is not valid");
    };
    const getVideoID = await ytdl.getURLVideoID(url);
    if(!(await ytdl.validateID(getVideoID))){
      throw new Error("Cannot parse Youtube Video ID")
    };
    return getVideoID;
};

async function getInfo(videoID,type){
   const metaInfo = await ytdl.getInfo(videoID);
   const specificFormat = await ytdl.filterFormats(metaInfo.formats,type);
   const quality = await specificFormat.map(item => ({
      itag:item.itag,
      qualityLabel:item.qualityLabel,
      audioQuality:item.audioBitrate
    }));
 /*  const quality = await metaInfo.formats.map(format => ({
     itag:item.itag,
     qualityLabel:item.qualityLabel,
     audioQuality:item.audioBitrate
   }));*/
   const { title,thumbnails,lengthSeconds } = metaInfo.videoDetails;
   return { title,thumbnails,lengthSeconds,quality,specificFormat }
};

module.exports = {
  getInfo,parseVideoID
}