import express from "express";
const router = express.Router();

//control handlers
import { infoHandler, downloadHandler } from "./controllers/controller.js";

//routes
router.get("/meta", infoHandler);
router.get("/download", downloadHandler);

router.get("/status", (req,res) => {
  res.status(200).end();
});

router.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    error: "You are Lost!!",
    message: "",
    data: "",
  });
});

export default router;
