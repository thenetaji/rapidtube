import { spawn } from "child_process";

async function downloadContent(url, type, res) {
  try {
    const options = ["-o", "-", "--restrict-filename", url];

    if (type == "audio") {
      options.push("--extract-audio");
    } else if (type == "video") {
      //do nothing
    }

    const shell = spawn("yt-dlp", options);

    let errorOutput = "";

    shell.stdout.pipe(res);

    shell.stderr.on("data", (error) => {
      errorOutput += error.toString();
    });

    shell.on("close", (code) => {
      if (code !== 0) {
        console.log("Error", code, errorOutput);
        throw new Error(`Process exited with code ${code}: ${errorOutput}`);
      }
    });

    shell.on("error", (error) => {
      throw new Error(`Error starting DLP: ${error}`);
    });
  } catch (error) {
    throw new Error(`Download error: ${error.message}`);
  }
}

export default downloadContent;
