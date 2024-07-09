const express = require("express");
const router = express.Router();
const { infoProcessor,
  downloadProcessor } = require("../controllers/controller.js");

router.get("/", (req,res) => {
  res.status(0).send(
   `<h2>Always at your service, Sir</h2>
    <h1>But sorry,you're not authorized to access this service :(<h1>`);
});
router.post("/yt/search",infoProcessor);//it will process url or query
router.post("/yt/download",downloadProcessor);//it will process data returned by user

module.exports = router;