import { spawn } from "child_process";
import filterError from "../utils/error-handler.js";
import fs from "fs";
import dotenv from "dotenv";
import http from "http";
import https from "https";
dotenv.config();

const ytdlp = process.env.NODE_ENV == "PRODUCTION" ? "./venv/bin/yt-dlp" : "ytdlp";

const IP_RANGES = [
  { start: "24.0.0.0", end: "24.255.255.255" },
  { start: "66.0.0.0", end: "66.255.255.255" },
  { start: "98.0.0.0", end: "98.255.255.255" },
  { start: "108.0.0.0", end: "108.255.255.255" },
  { start: "172.0.0.0", end: "172.255.255.255" },
];

function ipToLong(ip) {
  return ip.split(".")
    .reduce((int, oct) => (int << 8) + parseInt(oct, 10), 0) >>> 0;
}

function longToIp(long) {
  return [
    (long >>> 24) & 0xff,
    (long >>> 16) & 0xff,
    (long >>> 8) & 0xff,
    long & 0xff
  ].join(".");
}

function generateRandomIP() {
  const range = IP_RANGES[Math.floor(Math.random() * IP_RANGES.length)];
  const startLong = ipToLong(range.start);
  const endLong = ipToLong(range.end);
  const randomLong = Math.floor(Math.random() * (endLong - startLong) + startLong);
  return longToIp(randomLong);
}

const userAgents = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
];

const getRandomUserAgent = () => {
  return userAgents[Math.floor(Math.random() * userAgents.length)];
};

function getHeaders() {
  return {
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
    "Connection": "keep-alive",
    "User-Agent": getRandomUserAgent(),
    "X-Forwarded-For": generateRandomIP(),
    "Client-IP": generateRandomIP()
  };
}

console.log(getHeaders())

function getMetaInfo(url) {
  return new Promise((resolve, reject) => {
    const currentHeaders = getHeaders();
    const options = [
      "--skip-download",
      "--dump-json",
      "--user-agent", currentHeaders["User-Agent"],
      "--referer", "https://www.google.com/",
      url
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
        const filteredError = filterError(errorOutput, code);
        reject(filteredError);
      } else {
        resolve(output);
      }
    });

    shell.on("error", error => {
      const filteredError = `Error starting yt-dlp: ${error}`;
      reject(new Error(filteredError));
    });
  });
}

async function downloadContent(url, format_id, res) {
  try {
    const currentHeaders = getHeaders();
    const options = [
      "--format", format_id,
      "-o", "-",
      "--user-agent", currentHeaders["User-Agent"],
      "--referer", "https://www.google.com/",
      url
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
        throw new Error(`yt-dlp process exited with code ${code}: ${errorOutput}`);
      }
    });

    shell.on("error", error => {
      throw new Error(`Error starting yt-dlp: ${error}`);
    });
  } catch (error) {
    throw new Error(`Download error: ${error.message}`);
  }
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

export { getMetaInfo, sortData, downloadContent };