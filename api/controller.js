import getMetaInfo from "./service/meta.js";
import downloadContent from "./service/download.js";
import { filterMetaInfo, injectHeaders, checkURL, log } from "./utils.js";
import NodeCache from 'node-cache';

const metadataCache = new NodeCache({ stdTTL: 600 }); // Cache for 10 minutes

async function metaHandler(req, res) {
  const { url } = req.query;

  try {
    if (!url) {
      log.warn("Missing URL in request");
      return res.status(400).json({
        status: 400,
        error: "Missing URL",
        data: null,
      });
    }

    if (!checkURL(url)) {
      log.warn("Unsupported YouTube URL: " + url);
      return res.status(400).json({
        status: 400,
        error: "YouTube URL is not supported anymore",
        data: null,
      });
    }

    // Check cache first
    const cachedMetadata = metadataCache.get(url);
    if (cachedMetadata) {
      log.info("Returning cached metadata for URL: " + url);
      return res.status(200).json({
        status: 200,
        error: "",
        data: cachedMetadata,
      });
    }

    log.info("Fetching metadata for URL: " + url);
    const meta = await getMetaInfo(url);
    const filteredData = await filterMetaInfo(meta);

    // Cache the result
    metadataCache.set(url, filteredData);

    log.info("Returning metadata for URL: " + url);
    return res.status(200).json({
      status: 200,
      error: "",
      data: filteredData,
    });
  } catch (error) {
    log.error(`Error fetching metadata for URL: ${url}, ${error}`);
    return res.status(500).json({
      status: 500,
      error: error.message,
      data: null,
    });
  }
}

async function downloadHandler(req, res) {
  try {
    //type eg. video or audio
    const { url, type } = req.query;

    if (!url) {
      log.warn("Missing URL in download request");
      return res.status(400).json({
        status: 400,
        error: "Missing URL",
        data: null,
      });
    }

    if (!checkURL(url)) {
      log.warn("Unsupported YouTube URL in download request: " + url);
      return res.status(400).json({
        status: 400,
        error: "YouTube URL is not supported anymore",
        data: null,
      });
    }
    
    injectHeaders(res, type, undefined);

    log.info("Starting download for URL: " + url);
    await downloadContent(url, type, res);
  } catch (error) {
    log.error(`Error downloading content for URL: ${error}`);
    return res.status(500).json({
      status: 500,
      error: error.message,
      data: null,
    });
  }
}

export { metaHandler, downloadHandler };