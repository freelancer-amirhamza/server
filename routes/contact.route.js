import express from "express";
import { createContact, deleteContact, getContact, updateContact } from "../controllers/contact.controllers.js";

const router = express.Router();

router.post("/create-contact",createContact);
router.get("/get-contact", getContact);
router.put("/update-contact",updateContact);
router.delete("/delete-contact",deleteContact);


export default router; 