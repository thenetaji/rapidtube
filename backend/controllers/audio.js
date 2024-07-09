const filterData = require("../utils/filter.js");
const fetchData = require("../utils/fetch-data.js");

async function audioOnly(id){
  const fetchedData = await fetchData("basicInfo",id);
  const data = await filterData("audioonly",fetchedData);
  return data;
};

module.exports = audioOnly;