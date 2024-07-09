const filterData = require("../utils/filter.js");
const fetchData = require("../utils/fetch-data.js");

async function videoAndAudio(id){
  const fetchedData = await fetchData("basicInfo",id);
  const data = await filterData("videoandaudio",fetchedData);
  return data;
};

module.exports = videoAndAudio;