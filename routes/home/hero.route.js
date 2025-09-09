import express from "express";
import { createBannerSlide, createHeroFooter, deleteHeroFooter, deleteSlideById, getAllHeroFooters, getAllSlides, getSlideById, updateHeroFooter, updateSlide } from "../../controllers/home/hero.js";


const router = express.Router();
router.post("/create-slide", createBannerSlide);
router.get("/get-all-slides", getAllSlides);
router.post("/get-slide-by-id", getSlideById);
router.delete("/delete-slide", deleteSlideById);
router.put("/update-slide", updateSlide);

router.get("/get-all-footers", getAllHeroFooters);
router.post("/create-footer", createHeroFooter);
router.put("/update-footer", updateHeroFooter);
router.delete("/delete-footer", deleteHeroFooter);

export default router;