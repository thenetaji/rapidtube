import fs from "fs";
import { getMetaInfo, sortData, downloadContent } from "../service/youtube.js";
import { saveCache, getCache } from "../db/redis.js";
import {
  constructYoutubeVideoURL,
  extractYoutubeVideoId,
} from "../utils/url.js";

//file path config
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function getYoutubeMeta(req, res) {
  if (!req.body || Object.keys(req.body).length == 0) {
    return res.status(500).json({
      status: "error",
      error: "Body not found!",
      message: "",
      data: {},
    });
  }
  const {
    payload: { url },
  } = req.body;

  if (!url) {
    return res.status(500).json({
      status: "error",
      error: "URL not found",
      message: "",
      data: {},
    });
  }

  const videoId = await extractYoutubeVideoId(url);
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
       // status: "success",
       // message: "Successfully fetched content information from cache",
        error: "",
        data: isCache,
      });
    }

    const metaInfo = await getMetaInfo(url);
    const filteredData = await sortData(metaInfo);
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
      message: "Successfully fetched content information",
      error: "",
      data: tempFormats,
    });
  } catch (error) {
    console.error("Error:", error);

    return res.status(500).json({
      status: "error",
      error: "Failed to fetch meta info",
      message: error.message,
      data: {},
    });
  }
}

/*********Download Function*******/
async function downloadYoutubeContent(req, res) {
  const { url, code: format_id } = req.query;

  if (!url) {
    return res.status(500).json({
      status: "error",
      error: "URL not found",
      message: "",
      data: {},
    });
  }

  try {
    const id = extractYoutubeVideoId(url);
    const info = await getCache(id); //content info same as meta
    const matchFormat = info.formats.filter(
      formats => formats.format_id == format_id.toString(),
    );
    if (!matchFormat) {
      return res.status(500).json({
        status: "error",
        error: "Format code not found",
        message: "",
        data: {},
      });
    }

    const filename = `RapidTube - ${info.info.title}-${id}-${matchFormat[0].format_id}.${matchFormat[0].extension}`;
    const contentType = () => {
      const videoOrAudio = matchFormat[0].hasVideo ? "video" : "audio";
      const extension = matchFormat[0].extension;
      return videoOrAudio + "/" + extension;
    };
    const contentSize = () => {
      const matchFormat = info.formats.filter(
        formats => formats.format_id == format_id.toString(),
      );
      return matchFormat[0].filesize;
    };

    function sanitizeFilename(filename) {
      return filename
        .replace(/[\u0000-\u001F\u007F-\u009F]/g, "") // Remove control characters
        .replace(/[<>:"/\\|?*]/g, "-") // Replace Windows-invalid filename chars with dash
        .replace(/\.+/g, ".") // Replace multiple dots with single dot
        .replace(/^\.+|\.+$/g, "") // Remove leading/trailing dots
        .replace(/-+/g, "-"); // Replace multiple dashes with single dash
    }
    const encodedFilename = encodeURIComponent(sanitizeFilename(filename));

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${encodedFilename}"; filename*=UTF-8''${encodedFilename}`,
    );
    res.setHeader("Content-Type", contentType());
    res.setHeader("Transfer-Encoding", "chunked");
    res.setHeader("Content-Length", contentSize());

    const contentData = await downloadContent(url, format_id, res);
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
