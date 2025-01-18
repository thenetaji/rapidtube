import getMetaInfo from "../service/meta.js";
import downloadContent from "../service/download.js";
import injectHeaders from "../utils/headers.js";
import { saveCache, getCache } from "../db/redis.js";
import { extractId,isYouTubeURL } from "../utils/url.js";
import filter from "../utils/filter.js";

async function metaHandler(req, res) {
  const { url } = req.query;
  
  try {
  if (!url) {
    return res.status(400).json({
      status: 400,
      message: "Invalid request: URL is required",
      error: "Missing URL",
      data: null,
    });
  }

  if (isYouTubeURL(url)) {
    return res.status(400).json({
      status: 400,
      message: "Youtube is not supported from 2025",
      error: "YouTube URL is not supported anymore",
      data: null,
    });
  }
  
  const id = await extractId(url);
  
  let meta = await getCache(id);
  if (meta != undefined) {
    return res.status(200).json({
      status: 200,
      message: "Sent from cache",
      error: "",
      data: meta,
    });
  };
  
    meta = await getMetaInfo(url);
    const filteredData = await filter(meta);

    await saveCache(id, filteredData);
    return res.status(200).json({
      status: 200,
      message: "Sent successfully",
      error: "",
      data: filteredData,
    });
  } catch (error) {
    console.error("error in fetching meta", error);
    return res.status(500).json({
      status: 500,
      message: "An error occured",
      error: "Error " + error.message,
      data: null,
    });
  }
}

async function downloadHandler(req, res) {
  try {
  const { url } = req.query;
  
  if (!url) {
    return res.status(400).json({
      status: 400,
      message: "Invalid request: URL is required",
      error: "Missing URL",
      data: null,
    });
  }

  if (isYouTubeURL(url)) {
    return res.status(400).json({
      status: 400,
      message: "Youtube is not supported from 2025",
      error: "YouTube URL is not supported anymore",
      data: null,
    });
  }
  
  const id = await extractId(url);
    
    let meta = await getCache(id);
    if (meta == null || meta == undefined) {
      const metaData = await getMetaInfo(url);
      const filteredData = await filter(metaData);
      meta = filteredData;
      await saveCache(id, filteredData);
    }

    injectHeaders(res, meta, __format);

    const contentData = await downloadContent(url, __format, res);
  } catch (error) {
    console.error("error in downloading content", error);
    return res.status(500).json({
      status: 500,
      message: "An error occured",
      error: "Error " + error.message,
      data: null,
    });
  }
}

export { metaHandler, downloadHandler };
