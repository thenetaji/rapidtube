import { exec } from "child_process";

function extractId(videoUrl) {
  return new Promise((resolve, reject) => {
    const command = `yt-dlp --get-id "${videoUrl}"`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(`Error: ${stderr}`);
        return;
      }

      resolve(stdout.trim());
    });
  });
}

export default extractId;
