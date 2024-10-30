import { getInstaMeta, downloadInstaContent } from "./instagram.js";
import { getYoutubeMeta, downloadYoutubeContent } from "./youtube.js";
import { getTwitterMeta, downloadTwitterContent } from "./twitter.js";

const platformFunctions = {
  instagram: {
    meta: getInstaMeta,
    download: downloadInstaContent,
  },
  youtube: {
    meta: getYoutubeMeta,
    download: downloadYoutubeContent,
  },
  twitter: {
    meta: getTwitterMeta,
    download: downloadTwitterContent,
  },
  /**facebook: {
    meta: getFacebookMeta,
  /  download: downloadFacebookContent,
  },**/
};

export const infoHandler = (req, res) => handleRequest("meta", req, res);
export const downloadHandler = (req, res) =>
  handleRequest("download", req, res);

const identifyPlatform = url => {
  switch (true) {
    case /youtube\.com|youtu\.be/i.test(url):
      return "youtube";
    case /instagram\.com|instagr\.am/i.test(url):
      return "instagram";
    case /facebook\.com|fb\.com|fb\.watch/i.test(url):
      return "facebook";
    case /twitter\.com|x\.com/i.test(url):
      return "twitter";
    default:
      throw new Error("URL type not supported");
  }
};

const handleRequest = (type, req, res) => {
  if (!req.query || Object.keys(req.query).length === 0) {
    return res.status(500).json({
      status: "error",
      error: "Body not found!",
      message: "",
      data: {},
    });
  }

  const { url } = req.query;
  if (!url) {
    return res.status(500).json({
      status: "error",
      error: "URL not found",
      message: "",
      data: {},
    });
  }

  const platform = identifyPlatform(url);
  const functionToBeCalled = platformFunctions[platform][type];
  //here platform is variable which  has value of platform names while type choose methods to perform
  functionToBeCalled(req, res);
};
