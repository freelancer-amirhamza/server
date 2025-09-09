import { v4 as uuidv4 } from "uuid";
import { errorHandler } from "../utils/errorHandler.js";
import db from "../models/index.js";


const Testimonial = db.testimonial;

export  const createTestimonial = async(req,res)=>{
    try {
        const id = uuidv4();
        const {image, name , title, description}= req.body;
        const newTestimonial = await Testimonial.create({id, image, name, title,description});
        if(!newTestimonial){
            return errorHandler(res,404,"The testimonial is not created!")
        }
        return errorHandler(res,200,"The news is created successfully!", false,newTestimonial);
    } catch (error) {
        return errorHandler(res,500,error.message || "Internal server error!");
    }
};


export  const getAllTestimonials = async(req,res)=>{
    try {
        const testimonials = await Testimonial.findAll();
        if(!testimonials){
            return errorHandler(res,404,"The testimonials are not found!")
        }
        return errorHandler(res,200,"The testimonial has been gotten successfully!",false,testimonials);
    } catch (error) {
        return errorHandler(res,500,error.message || "Internal server error!");
    }
};


export  const getTestimonialById = async(req,res)=>{
    try {
        const {id}= req.body;
        const testimonial = await Testimonial.findById(id);
        if(!testimonial){
            return errorHandler(res,404,"The testimonial is not found!");
        }
        return errorHandler(res,200,"The testimonial has been gotten successfully!",false,testimonial);
    } catch (error) {
        return errorHandler(res,500,error.message || "Internal server error!");
    }
};



export  const updateTestimonial = async(req,res)=>{
    try {
        const {id,image, name , title, description}= req.body;
        const updatedTestimonial = await Testimonial.update(id,{image, name , title, description})
        if(!updatedTestimonial){
            return errorHandler(res,404,"The testimonial is not updated!");
        }
        return errorHandler(res,200,"The testimonial has been updated successfully!",false,updateTestimonial);
    } catch (error) {
        return errorHandler(res,500,error.message || "Internal server error!");
    }
};


export  const deleteTestimonial = async(req,res)=>{
    try {
        const {id}= req.body;
        const deletedTestimonial = await Testimonial.delete(id);
        if(!deletedTestimonial){
            return errorHandler(res,404,"The testimonial is not found!",)
        }
        return errorHandler(res,200,"The testimonial has been deleted successfully!",false,deleteTestimonial);
    } catch (error) {
        return errorHandler(res,500,error.message || "Internal server error!");
    }
};