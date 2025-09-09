import express from "express";
import { createPriceCard, deletePriceCard, getAllPriceCard, getPriceCardById, updatePriceCard } from "../controllers/pricing.controllers.js";

const router = express.Router();

router.post("/create-price-card",createPriceCard);
router.get("/get-all-price-cards", getAllPriceCard);
router.post("/get-price-card-by-id",getPriceCardById);
router.put("/update-price-card", updatePriceCard);
router.delete("/delete-price-card", deletePriceCard);


export default router;