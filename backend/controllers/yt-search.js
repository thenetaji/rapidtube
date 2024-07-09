const yts = require("yt-search");

async function ytSearch(input,type){
  const regex = /list=([a-zA-Z0-9_-]+)/;
  const match = input.match(regex);
  const listId = match ? match[1] : null;
  const option = listId ? { listId } : input;
  const result = await yts(option);
  const filteredVideos = result.videos.map(item => ({
      responseType: `search/query${!listId ? '' : '/playlist'}`,
      url: "https://youtu.be/" + item.videoId,
      type: type,
      title: item.title,
      image: item.image,
      thumbnail: item.thumbnail,
      channelName: item.author.name
    })
  );
  return filteredVideos;
};

module.exports = ytSearch;