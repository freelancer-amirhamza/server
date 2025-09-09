import express from "express";
import { createProjectCard,
     deleteProjectCard,
      getAllProjectCards,
       getProjectCardById,
       updateProjectCard }from "../controllers/projects.controller.js";

const router = express.Router();


router.post("/create-project", createProjectCard);
router.get("/get-all-cards", getAllProjectCards);
router.post("/get-card-by-id", getProjectCardById);
router.put("/update-project", updateProjectCard);
router.delete("/delete-project", deleteProjectCard);



export default router;