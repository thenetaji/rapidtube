import express from "express";
const router = express.Router();

//routes
import youtubeRoute from "./youtube.js";

router.use("/youtube", youtubeRoute);
router.use("/instagram", notYet);
router.use("/tiktok", notYet);
router.use("/twitter", notYet);
router.use("/facebook", notYet);

function notYet(req, res) {
  res.status(200).json({
    status: 404,
    error: "Working on it!!",
    message: "",
    data: "",
  });
}

router.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    error: "You are Lost!!",
    message: "",
    data: "",
  });
});

export default router;
