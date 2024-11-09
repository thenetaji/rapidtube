import getMetaInfo from "../service/meta.js";
import downloadContent from "../service/download.js";
import injectHeaders from "../utils/headers.js";
import { saveCache, getCache } from "../db/redis.js";
import extractId from "../utils/url.js";
import filter from "../utils/filter.js";

async function metaHandler(req, res) {
  const { url } = req.query;
  const id = await extractId(url);

  let meta = await getCache(id);
  if (meta != undefined) {
    return res.status(200).json({
      status: 200,
      message: "Sent from cache",
      error: "",
      data: meta,
    });
  }

  try {
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
    console.log("error in fetching meta", error);
  }
}

async function downloadHandler(req, res) {
  const { url, format: format_id } = req.query;
  const id = await extractId(url);
  try {
    let meta = await getCache(id);
    if (meta == null || meta == undefined) {
      const metaData = await getMetaInfo(url);
      const filteredData = await filter(metaData);
      meta = filteredData;
      await saveCache(id, filteredData);
    }

    if (!meta.info.shortVideo && format_id) {
      const isValidFormat = meta.formats.some(
        item => item.format_id == format_id,
      );
      if (!isValidFormat) {
        return res.status(200).json({
          status: 404,
          message: "Format not found",
          error: "Not found",
          data: "",
        });
      }
    }

    const __format = meta.info.shortVideo ? "best" : format_id;

    injectHeaders(res, meta, __format);

    const contentData = await downloadContent(url, __format, res);
  } catch (error) {
    console.log("error in downloading content", error);
  }
}

export { metaHandler, downloadHandler };
