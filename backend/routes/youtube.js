import express from "express";
const router = express.Router();

import {
  getYoutubeMeta,
  downloadYoutubeContent,
} from "../controllers/youtube.js";

router.post("/meta", getYoutubeMeta);
//information about the content,can be anything from video,audio,or image
router.get("/download", downloadYoutubeContent);

export default router;
