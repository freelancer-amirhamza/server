import express from "express";
import upload from "../middlewares/multer.js";
import uploadImage from "../controllers/uploadImage.controller.js";
import authJWT from "../middlewares/authJWT.js";
const router = express.Router();

 

router.post("/upload", authJWT.verifyToken, upload.single("image"), uploadImage);


export default router;