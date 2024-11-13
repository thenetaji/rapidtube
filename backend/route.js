import express from "express";
const router = express.Router();

//control handlers
import { metaHandler, downloadHandler } from "./controllers/controller.js";

//routes
router.get("/meta", metaHandler);
router.get("/download", downloadHandler);

router.get("/status", (req, res) => {
  return res.status(200).end("OK");
});

router.get("*", (req, res) => {
  return res.status(404).json({
    status: 404,
    error: "You are Lost!!",
    message: "",
    data: "",
  });
});

export default router;
