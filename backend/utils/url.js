function extractYoutubeVideoId(url) {
  const regex =
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|embed|shorts)\/|.*[?&]v=)|youtu\.be\/)([^&?/=\s]{11})/;

  const match = url.match(regex);
  return match ? match[1] : null;
}

function constructYoutubeVideoURL(id) {
  return "https://youtu.be/" + id;
}

export { extractYoutubeVideoId, constructYoutubeVideoURL };
