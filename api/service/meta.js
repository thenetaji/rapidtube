import { spawn } from "child_process";

function getMetaInfo(url) {
  return new Promise((resolve, reject) => {
    const options = [
      "--skip-download",
      "--dump-json",
      "--user-agent",
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      url,
    ];

    const shell = spawn("yt-dlp", options);
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
        console.error("Error:", code, errorOutput);
        reject(errorOutput);
      } else {
        resolve(JSON.parse(output));
      }
    });

    shell.on("error", error => {
      console.error("Error starting DLP:", error);
      reject(new Error(error));
    });
  });
}

export default getMetaInfo;
