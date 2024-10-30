import { spawn } from "child_process";
import getHeaders from "../utils/network-config.js";
import dotenv from "dotenv";
dotenv.config();

const ytdlp =
  process.env.NODE_ENV == "PRODUCTION" || undefined ? "./venv/bin/yt-dlp" : "yt-dlp";

async function downloadContent(platform, url, format, res) {
  //format is only supported for youtube
  try {
    const currentHeaders = getHeaders();

    const formatCode = platform == "youtube" ? format : "best";
    const refererName = `"https://www.${platform}.com/"`;

    const options = [
      "--format",
      formatCode,
      "-o",
      "-",
      "--restrict-filename",
      "--user-agent",
      currentHeaders["User-Agent"],
      "--referer",
      refererName,
      url,
    ];

    const shell = spawn(ytdlp, options);

    let errorOutput = "";

    shell.stdout.pipe(res);

    shell.stderr.on("data", error => {
      errorOutput += error.toString();
    });

    shell.on("close", code => {
      if (code !== 0) {
        console.log("Error", code, errorOutput);
        throw new Error(`Process exited with code ${code}: ${errorOutput}`);
      }
    });

    shell.on("error", error => {
      throw new Error(`Error starting DLP: ${error}`);
    });
  } catch (error) {
    throw new Error(`Download error: ${error.message}`);
  }
}

export default downloadContent;
