import { spawn } from "child_process";

async function downloadContent(url, format_id, res) {
  try {
    const options = [
      "--format",
      "best",
      "-o",
      "-",
      "--restrict-filename",
      "--user-agent",
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      url,
    ];

    const shell = spawn("yt-dlp", options);

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
