const ytdl = require("ytdl-core");

async function fetchData(type,id){
  let response;
  switch(type){
    case "basicInfo": response = await ytdl.getBasicInfo(id);
      break;
    case "info": response = await ytdl.getInfo(id);
     break;
    default: throw new Error("Type & Id must be passed");
  };
  return response;
};

module.exports = fetchData;