import { v4 as uuidv4 } from "uuid";
import { poolDB } from "../config/db.config.js";
import db from "../models/index.js";
import { errorHandler } from "../utils/errorHandler.js";

const Teems = db.teems;
// create a new teem
export const addTeem = async (req, res) => {
    try {
        const id = uuidv4();
        const { image, name, title, description } = req.body;
        const newTeem = await Teems.create({id,image, name, title, description});
        return errorHandler(res,200,"The teem created successfully!",false,newTeem);
    } catch (error) {
        return errorHandler(res,500,error.message || "Internal server error",)
    }
}

export const getAllTeems = async (req, res)=>{
    try {
        const teems = await Teems.findAll()
        if(!teems){
            return errorHandler(res,404,"The teem is not found!")
        }
        return errorHandler(res,200, "The All teem are gotten successfully!",false,teems);
    } catch (error) {
        return errorHandler(res,500,error.message || "Internal server error",)
    }
};

export const getTeemById = async (req, res)=>{
    try {
        const {id}= req.body;
        const teem = await poolDB.query(`SELECT * FROM teems WHERE id=$1`,[id]);
        if(!teem){
            return errorHandler(res,404,"The teem is not found!")
        }
        return errorHandler(res,200,"The teem is gotten successfully!",false,teem);
    } catch (error) {
        return errorHandler(res,500,error.message || "Internal server error",)
    }
}

// update a teem member

export const updateTeem = async (req, res)=>{
    try {
        const {id, image, name,title,description}= req.body;
        const teem = await Teems.update(id,{image, name,title,description});
        if(!teem){
            return errorHandler(res,404,"The teem is not found!")
        }
        return errorHandler(res,200,"The teem is updated successfully!",false,teem);
    } catch (error) {
        return errorHandler(res,500,error.message || "Internal server error",)
    }
}

// delete a teem member

export const deleteTeem = async (req, res)=>{
    try {
        const {id}= req.body;
        const teem = await Teems.delete(id)
        if(!teem){
            return errorHandler(res,404,"The teem is not found!")
        }
        return errorHandler(res,200,"The teem is deleted successfully!",false,teem);
    } catch (error) {
        return errorHandler(res,500,error.message || "Internal server error",)
    }
}