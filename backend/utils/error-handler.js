function filterError(errorOutput, code) {
  let errorMessage;

  //specific error checks
  if (errorOutput.includes("Failed to resolve")) {
    errorMessage = "Unable to resolve hostname.";
  } else if (errorOutput.includes("404")) {
    errorMessage = "Video not found (404). Please check the URL.";
  } else {
    errorMessage = `yt-dlp exited with code ${code}: ${errorOutput.trim()}`;
  }

  console.log("Filtered error message:", errorMessage);
  return new Error(errorMessage);
}

export default filterError;
