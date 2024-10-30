import { spawn } from "child_process";
import dotenv from "dotenv";
dotenv.config();

import getHeaders from "../utils/network-config.js";


const ytdlp =
  process.env.NODE_ENV == "PRODUCTION" || undefined ? "./venv/bin/yt-dlp" : "yt-dlp";
  //using ytdlp in development while .venv is used in production.I will change it later in docker environment

function getMetaInfo(platform, url) {
  return new Promise((resolve, reject) => {
    const currentHeaders = getHeaders();

    const refererName = `https://www.${platform}.com/`;

    const options = [
      "--skip-download",
      "--dump-json",
      "--user-agent",
      currentHeaders["User-Agent"],
      "--referer",
      refererName,
      url,
    ];

    const shell = spawn(ytdlp, options);

    let output = "";
    let errorOutput = "";

    shell.stdout.on("data", data => {
      output += data.toString();
    });

    shell.stderr.on("data", error => {
      errorOutput += error.toString();
    });

    shell.on("close", code => {
      if (code !== 0) {
        console.log("Error", code, errorOutput);
        reject(errorOutput);
      } else {
        resolve(output);
      }
    });

    shell.on("error", error => {
      console.error("Error starting DLP", error);
      reject(new Error(error));
    });
  });
}

export default getMetaInfo;
