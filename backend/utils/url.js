function extractYoutubeId(url) {
  const regex =
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|embed|shorts)\/|.*[?&]v=)|youtu\.be\/)([^&?/=\s]{11})/;

  const match = url.match(regex);
  return match ? match[1] : null;
}

function extractInstaId(url) {
  const regex = /(?:instagram\.com\/(?:p|reel)\/)([\w-]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

function extractTwitterId(url) {
  const regex = /(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

function extractFacebookId(url) {
  const videoRegex = /facebook\.com\/(?:.*?)\/videos\/(\d+)/;
  const postRegex = /facebook\.com\/(?:.*?)\/posts\/(\d+)/;
  const photoRegex = /facebook\.com\/(?:.*?)\/photos\/(?:a\.\d+\/)?(\d+)/;

  let match =
    url.match(videoRegex) || url.match(postRegex) || url.match(photoRegex);

  return match ? match[1] : null;
}

export { extractYoutubeId, extractInstaId, extractTwitterId, extractFacebookId };
