import { v4 as uuidv4 } from "uuid";
import db from "../models/index.js";
import { errorHandler } from "../utils/errorHandler.js";

const Project = db.project;

export const createProjectCard = async(req, res)=>{
    try {
        const {image,title,description,location,size,year,categories, client}=req.body;
        const id = uuidv4();
        const createCards = await Project.create({id,image,title,description,location,size,year, categories,client});
        if(!createCards){
            return errorHandler(res, 400,"The card is not found!" );
        }
        return errorHandler(res,200,"The card is created successfully!",false, createCards)
    } catch (error) {
        res.status(500).json({
            success: false,
            error:true,
            message:error.message || "Internal server error!"
        })
    }
};


export const getAllProjectCards = async(req, res)=>{
    try {
        const getAllCards = await Project.findAll();
        if(!getAllCards){
            return errorHandler(res, 400,"The card is not found!" )
        }
        return errorHandler(res,200,"The card is gotten successfully!",false, getAllCards)
    } catch (error) {
        errorHandler(res,500,error.message || "Internal server error!")
    }
};



export const getProjectCardById = async(req, res)=>{
    try {
        const {id}=req.body;
        const getCard = await Project.findById(id);
        if(!getCard){
            return errorHandler(res, 400,"The card is not found!" )
        }
        return errorHandler(res,200,"The card is gotten successfully!",false, getCard)
    } catch (error) {
        errorHandler(res,500,error.message || "Internal server error!")
    }
}

export const updateProjectCard = async(req, res)=>{
    try {
        const {id, image, title, description,location, year, size, categories, client}=req.body;
        const updatedCards = Project.update(id,{image, title, description,location, year, size, categories, client});
        if(!updatedCards){
            return errorHandler(res, 400,"The card is not found!" )
        }
        return errorHandler(res,200,"The card is updated successfully!",false, updatedCards)
    } catch (error) {
        errorHandler(res,500,error.message || "Internal server error!")
    }
};

export const deleteProjectCard = async(req, res)=>{
    try {
        const {id}=req.body;
        const deletedCards = await Project.delete(id);
        return errorHandler(res,200,"The card is deleted successfully!",false, deletedCards)
    } catch (error) {
        errorHandler(res,500,error.message || "Internal server error!")
    }
};


