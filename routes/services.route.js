import express from "express";
import { createServiceCard, deleteServiceCard, getAllServiceCards, getServiceCardById, updateServiceCard } from "../controllers/service-all.js";


const router = express.Router();

router.post("/create-service-card", createServiceCard);
router.get("/get-all-service-cards", getAllServiceCards);
router.post("/get-service-card-by-id", getServiceCardById);
router.put("/update-service-card", updateServiceCard);
router.delete("/delete-service-card", deleteServiceCard);


export default router;