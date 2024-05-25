const ytdl = require("ytdl-core");
const { getInfo,parseVideoID } = require("./functions.js");

async function searchURL(req,res){
  const { url,type } = req.body;
  console.log(url,type);
  try{
    const videoID = await parseVideoID(url);
    const info = await getInfo(videoID,type); //custom function
    return res.status(200).json(info);
  } catch(error){
    return res.status(400).json({error:error.message});
  };
};

module.exports = searchURL;
