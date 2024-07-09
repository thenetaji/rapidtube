const filterData = require("../utils/filter.js");
const fetchData = require("../utils/fetch-data.js");

async function caption(id){
  const fetchedData = await fetchData("basicInfo",id);
  const data = await filterData("substitle",fetchedData);
  return data;
};

module.exports = caption;