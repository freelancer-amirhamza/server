import express from "express";
import { createTestimonial, deleteTestimonial, getAllTestimonials, getTestimonialById, updateTestimonial } from "../controllers/testimonials.controllers.js";

const router = express.Router();


router.post("/create-testimonial", createTestimonial);
router.get("/get-all-testimonials", getAllTestimonials);
router.post("/get-testimonial-by-id", getTestimonialById);
router.put("/update-testimonial", updateTestimonial);
router.delete("/delete-testimonial", deleteTestimonial);




export default router;