import getMetaInfo from "../service/meta.js";
import downloadContent from "../service/download.js";
import { filterYoutubeMetaInfo } from "../service/filter.js";
import { saveCache, getCache } from "../db/redis.js";
import { extractYoutubeId } from "../utils/url.js";
import sanitizeFilename from "../utils/sanitize-filename.js";
import injectHeaders from "../utils/headers.js";

async function getYoutubeMeta(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(500).json({
      status: "error",
      error: "URL not found",
      message: "",
      data: {},
    });
  }

  const videoId = await extractYoutubeId(url);
  if (videoId === null) {
    return res.status(500).json({
      status: "error",
      error: "URL is malformed",
      message: "",
      data: {},
    });
  }

  try {
    const isCache = await getCache(videoId);
    if (isCache !== null && isCache !== undefined) {
      return res.status(200).json({
        status: "success",
        message: "Successfully fetched content metarmation from cache",
        error: "",
        data: isCache,
      });
    }

    const meta = await getMetaInfo("youtube",url);
    const filteredData = await filterYoutubeMetaInfo(meta);
    /**These two function will be removed.I am writing thses two just to make a working version as merging audio and video on fly looks complicated for now
     * The first function will jsut handle filtering of video with with audio combined so i dont have to
     * The second function will filter just audio without video for audio downloading purpose**/
    const videoWithAudio = await filteredData.formats.filter(
      item => item.hasVideo && item.hasAudio,
    );
    const audioOnly = await filteredData.formats.filter(
      item => item.hasAudio && !item.hasVideo,
    );
    const tempFormats = {
      info: filteredData.info,
      formats: [...audioOnly, ...videoWithAudio],
      thumbnails: filteredData.thumbnails,
    };

    const saveToDB = await saveCache(videoId, tempFormats);

    return res.status(200).json({
      status: "success",
      message: "Successfully fetched content metarmation",
      error: "",
      data: tempFormats,
    });
  } catch (error) {
    console.error("Error:", error);

    return res.status(500).json({
      status: "error",
      error: "Failed to fetch meta meta",
      message: error.message,
      data: {},
    });
  }
}


async function downloadYoutubeContent(req, res) {
  const { url, format: format_id } = req.query;

  if (!url) {
    return res.status(500).json({
      status: "error",
      error: "URL not found",
      message: "",
      data: {},
    });
  }

  try {
    const id = extractYoutubeId(url);
    let meta = await getCache(id); //content meta same as meta
    
    /*function to get meta meta in download functionality so that if someone invoked download function meta data is available*/
    if (meta == null || meta == undefined) {
      const metameta = await getMetameta("youtube", url);
      //first args is platform name
      
      const videoWithAudio = await filteredData.formats.filter(
      item => item.hasVideo && item.hasAudio,
    );
    const audioOnly = await filteredData.formats.filter(
      item => item.hasAudio && !item.hasVideo,
    );
    const tempFormats = {
      meta: filteredData.meta,
      formats: [...audioOnly, ...videoWithAudio],
      thumbnails: filteredData.thumbnails,
    };
      
      const saveToDB = await saveCache(contentId, tempFormats);
      meta = tempFormats;
    }

    const matchFormat = meta.formats.filter(
      formats => formats.format_id == format_id.toString(),
    );
    if (!matchFormat || matchFormat.length == 0) {
      return res.status(500).json({
        status: "error",
        error: "Format code not found",
        message: "",
        data: {},
      });
    }

    const filename = `RapidTube - ${meta.info.filename}`;
    
    const encodedFilename = encodeURIComponent(sanitizeFilename(filename));
    
    const contentType = () => {
      const videoOrAudio = matchFormat[0].hasVideo ? "video" : "audio";
      const extension = matchFormat[0].extension;
      return videoOrAudio + "/" + extension;
    };
    const contentSize = () => {
      const matchFormat = meta.formats.filter(
        formats => formats.format_id == format_id.toString(),
      );
      return matchFormat[0].filesize;
    };
    
    injectHeaders(res, encodedFilename, contentType(), contentSize());

    const contentData = await downloadContent("youtube",url, format_id, res);
  } catch (error) {
    console.log("Error in downloadYoutubeContent", error);
    return res.status(500).json({
      status: "error",
      error: "Failed to download",
      message: error,
      data: {},
    });
  }
}

export { getYoutubeMeta, downloadYoutubeContent };