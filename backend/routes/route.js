const express = require("express");
const router = express.Router();
const searchURL = require("../controllers/controller.js");

router.get("/",(req,res) => {
  res.status(200).send(
   `<h2>Always at your service, Sir</h2>
    <h1>But sorry you're unauthorized to access this service<h1>`);
});
router.post("/search",searchURL);

module.exports = router;