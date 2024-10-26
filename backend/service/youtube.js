import { spawn } from "child_process";
import filterError from "../utils/error-handler.js";
import fs from "fs";

const ytdlp = "./venv/bin/yt-dlp";

function getMetaInfo(url) {
  return new Promise((resolve, reject) => {
    const shell = spawn(ytdlp, ["--skip-download", "--dump-json", url]);

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
        const filteredError = filterError(errorOutput, code);
        reject(filteredError);
      } else {
        resolve(output);
      }
    });

    shell.on("error", error => {
      const filteredError = `Error starting yt-dlp: ${error.message}`;
      reject(new Error(filteredError));
    });
  });
}

function sortData(infoJSON) {
  const meta = JSON.parse(infoJSON);
  const info = {
    id: meta.id,
    title: meta.title,
    duration: meta.duration,
    channel: meta.channel,
    views: meta.view_count,
  };

  const formats = meta.formats
    .filter(
      item =>
        item.ext !== "mhtml" &&
        item.format_note !== "Default" &&
        (item.filesize || item.filesize_approx),
    )
    .map(item => ({
      format_id: item.format_id,
      hasVideo: item.video_ext != "none",
      hasAudio: item.audio_ext != "none",
      videoQuality: item.video_ext != "none" ? item.format_note : null,
      audioQuality: item.audio_ext != "none" ? `${Math.floor(item.abr)} kbps` : null,
      extension: item.ext,
      filesize: item.filesize || item.filesize_approx || null,
    }));

  const thumbnails = meta.thumbnails
    .filter(item => item.resolution)
    .map(item => ({
      url: item.url,
      width: item.width,
      height: item.height,
    }));

  return { info, formats, thumbnails };
}

async function downloadContent(url, format_id, res) {
  try {
    const shell = spawn(ytdlp, ["--format", format_id, "-o", "-", url]);

    let errorOutput = "";

    shell.stdout.pipe(res);

    shell.stderr.on("data", error => {
      errorOutput += error.toString();
    });

    shell.on("close", code => {
      if (code !== 0) {
        console.log("Error", code, errorOutput);
        throw new Error(`yt-dlp process exited with code ${code}: ${errorOutput}`);
      }
    });

    shell.on("error", error => {
      throw new Error(`Error starting yt-dlp: ${error.message}`);
    });
  } catch (error) {
    throw new Error(`Download error: ${error.message}`);
  }
}

export { getMetaInfo, sortData, downloadContent };