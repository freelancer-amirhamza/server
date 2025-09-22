import {poolDB} from "../config/db.config.js"
import { v4 as uuidv4 } from "uuid";
import { errorHandler } from "../utils/errorHandler.js";
import db from "../models/index.js";

const Service = db.service;

export  const createServiceCard = async(req, res)=>{
    try {
        const {image, title, description, category,icon} = req.body;
        const id = uuidv4();

        if(!id || !image || !title || !description || !icon){
            return errorHandler(res,404,"All Field are required!");
        }
        const createdCard = await Service.create({id,image, title, description, category,icon});
        if(!createdCard){
            return errorHandler(res,404, "The card is not created!");
        }
        return errorHandler(res,200,"The card is created successfully!",false,createdCard);
    } catch (error) {
        return errorHandler(res,500,error.message || "Internal server error!");
    }
}

export  const getAllServiceCards = async(req, res)=>{
    try {
        const serviceCards = await Service.findAll()
        if(!serviceCards){
            return errorHandler(res,404,"The card is not Found!");
        }
        return errorHandler(res,200,"The card is gotten successfully!",false, serviceCards);
    } catch (error) {
        return errorHandler(res,500,error.message || "Internal server error!");
    }
}

export  const getServiceCardById = async(req, res)=>{
    try {
        const {id }= req.body;
        if(!id ){
            return errorHandler(res,404, "The Id is required!");
        }
        const serviceCard = await Service.findById(id);
        if(!serviceCard){
            return errorHandler(res,404,"The card is not Found!");
        }
        return errorHandler(res,200,"The card is gotten successfully!",false, serviceCard);
    } catch (error) {
        return errorHandler(res,500,error.message || "Internal server error!");
    }
}


export  const updateServiceCard = async(req, res)=>{
    try {
        const {image, title, description, category,icon,id} = req.body;

        if(!id || !image || !title || !description || !icon){
            return errorHandler(res,404,"All Field are required!");
        };
        const updatedCard = await Service.update(id,{image,title,description,category,icon})
        if(!updatedCard){
            return errorHandler(res,404, "The card is not updated!")
        }
        return errorHandler(res,200,"The card is updated successfully!",false,updatedCard)
    } catch (error) {
        return errorHandler(res,500,error.message || "Internal server error!");
    }
}

export  const deleteServiceCard = async(req, res)=>{
    try {
        const {id} = req.body;

        if(!id ){
            return errorHandler(res,404, "The Id is required!");
        }
        const deletedCard = await Service.delete(id);
        if(!deletedCard){
            return errorHandler(res,404, "The card is not deleted!")
        }
        return errorHandler(res,200,"The card is deleted successfully!",false,deletedCard);
    } catch (error) {
        return errorHandler(res,500,error.message || "Internal server error!");
    }
}