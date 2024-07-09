const thumbnailFilter = require("./filter-utils/thumbnail-filter.js");
const captionFilter = require("./filter-utils/caption-filter.js");
const audioFilter = require("./filter-utils/audio-filter.js");
const videoAndAudioFilter = require("./filter-utils/video-audio-filter.js");

async function filterData(type,data){
  let filteredData = {}; //always an object
  switch(type){
    case "thumbnail":
      filteredData = await thumbnailFilter(data);
      break;
    case "substitle":
      filteredData = await captionFilter(data);
      break;
    case "audioonly":
      filteredData = await audioFilter(data);
      break;
    case "videoandaudio":
      filteredData = await videoAndAudioFilter(data);
      break;
  };
  return filteredData;
};

module.exports = filterData;