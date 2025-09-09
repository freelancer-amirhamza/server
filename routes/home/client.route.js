import express from "express";
import { createClient, deleteClient, getAllClients, getClientById, updateClient } from "../../controllers/home/client.controllers.js";

const router = express.Router();


router.post("/add-client", createClient);
router.get("/get-all-clients", getAllClients);
router.post("/get-client-by-id", getClientById);
router.put('/update-client', updateClient);
router.delete("/delete-client", deleteClient);



export default router;