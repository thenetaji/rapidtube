const filterData = require("../utils/filter.js");
const fetchData = require("../utils/fetch-data.js");

async function thumbnail(id){
  const fetchedData = await fetchData("basicInfo",id);
  const data = await filterData("thumbnail",fetchedData);
  return data;
};

module.exports = thumbnail;