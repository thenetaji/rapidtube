const ytdl = require('ytdl-core');
const videoAndAudio = require("./video-audio.js");
const audioOnly = require("./audio.js");
const thumbnail = require("./thumbnail.js");
const substitle = require("./caption.js");
const ytSearch = require("./yt-search.js");

async function infoProcessor(req, res) {
  const { url, type } = req.body;
  if (!url || !type) {
    return res.status(400).json({
      error: "Input value or type is empty!"
    });
  }

  let data = {};
  try {
    const isURL = await ytdl.validateURL(url);
    if (!isURL) {
      data = await ytSearch(url, type);
      data.responseType = "search/query";
    } else {
      const videoId = await ytdl.getURLVideoID(url);
      switch (type) {
        case "videoandaudio":
          data = await videoAndAudio(videoId);
          data.responseType = "search/url/videoandaudio";
          break;
        case "audioonly":
          data = await audioOnly(videoId);
          break;
          data.responseType = "search/url/audio";
        case "thumbnail":
          data = await thumbnail(videoId);
          data.responseType = "search/url/thumbnail";
          break;
        case "subtitle":
          data = await caption(videoId);
          data.responseType = "search/url/subtitle";
          break;
        default:
          return res.status(400).json("Input type is not supported or is mismatched!");
      }
    }
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: error.message
    });
  }
}

async function downloadProcessor(req, res) {
  const { url, type, itag } = req.body;
  if (!url || !itag) {
    return res.status(400).json("URL and Itag must be provided");
  }

  try {
    const videoId = await ytdl.getURLVideoID(url);
    const info = await ytdl.getInfo(videoId);

    let requestedItem;
    let fileType, fileExtension;

    if (type === "thumbnail") {
    requestedItem = info.videoDetails.thumbnails.find(item => {
    const isMatch = (item.width * item.height) === parseInt(itag);
    return isMatch;
    });
    if(!requestedItem){
      return res.json("image quality not found")
    }
     fileType = "image/jpeg";
     fileExtension = "jpg";
   } else if (type === "substitle") {
     requestedItem = info.player_response.captions.playerCaptionsTracklistRenderer.captionTracks.find(item => item.languageCode === itag);
  if (!requestedItem) {
    return res.status(404).json({ error: `Subtitle with language code ${itag} was not found.` });
  }
  fileType = "text/plain; charset=utf-8";
  fileExtension = "txt";
   } else if (type === "videoandaudio" || type === "audioonly") {
      requestedItem = info.formats.find(item => item.itag == itag);
      if (!requestedItem) {
        return res.status(404).json("Requested format not found");
      }
      const mimeType = requestedItem.mimeType;
      if (mimeType.includes("video/mp4")) {
        fileType = "video/mp4";
        fileExtension = "mp4";
      } else if (mimeType.includes("video/webm")) {
        fileType = "video/webm";
        fileExtension = "webm";
      } else if (mimeType.includes("audio/mp3")) {
        fileType = "audio/mp3";
        fileExtension = "mp3";
      } else if (mimeType.includes("audio/webm")) {
        fileType = "audio/webm";
        fileExtension = "webm";
      } else {
        return res.status(500).json("Unsupported format");
      };
      // if(fileType.includes("video")){
      //   if(requestedItem.hasAudio == false){
          
      //   }
      // }
    } else {
      return res.status(400).json("Invalid type specified");
    }

    const fetch = (await import('node-fetch')).default;

    
    const response = await fetch(requestedItem.url || requestedItem.baseUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${type},${error}`);
    }

    const contentLength = response.headers.get('content-length');
    const contentType = response.headers.get('content-type');

    res.setHeader('Content-Disposition', `attachment; filename="RapidTube - ${info.videoDetails.title}.${fileExtension}"`);
    res.setHeader('Content-Type', fileType);
    res.setHeader('Content-Length', contentLength || null);

    // Stream response body to the client
    response.body.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  infoProcessor,
  downloadProcessor
};