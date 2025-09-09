import express from "express";
import { addTeem, deleteTeem, getAllTeems, getTeemById, updateTeem } from "../controllers/teems.controllers.js";

const router = express.Router();

router.post("/create-teem",addTeem);
router.get("/get-all-teems",getAllTeems);
router.post("/get-teem-by-id", getTeemById);
router.put("/update-teem", updateTeem);
router.delete("/delete-teem", deleteTeem);


export default router; 