import express from "express";
import { createOfferCard, deleteOfferCard, getAllOfferCards, getOfferCardById, updateOfferCard } from "../../controllers/home/offers.controllers.js";

const router = express.Router();

router.post('/create-card', createOfferCard);
router.get("/get-all-cards", getAllOfferCards);
router.post("/get-card-by-id", getOfferCardById);
router.put("/update-card", updateOfferCard);
router.delete("/delete-card", deleteOfferCard);


export default router;