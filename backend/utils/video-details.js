function getVideoDetails(data){
  const { title, lengthSeconds } = data.videoDetails;
  const { name:channelName } = data.videoDetails.author;
  const videoDetails = {
     title,
     lengthSeconds,
     channelName,
  };
  return videoDetails;
};

module.exports = getVideoDetails;