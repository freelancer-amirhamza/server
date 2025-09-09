import express from "express";
import { createNews, deleteNews, fetchAllNews, fetchNewsById, updateNews } from "../controllers/news.controllers.js";

const router = express.Router();

router.post("/create-news", createNews);
router.get("/get-all-news",fetchAllNews);
router.post("/get-news-by-id", fetchNewsById);
router.put("/update-news",updateNews);
router.delete("/delete-news", deleteNews);



export default router;