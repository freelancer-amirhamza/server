import { v4 as uuidv4 } from "uuid";
import { errorHandler } from "../utils/errorHandler.js";
import { poolDB } from "../config/db.config.js";
import db from "../models/index.js";


const Price = db.price;
export const createPriceCard = async(req,res)=>{
    try {
        const {title, price, options} = req.body;
        const id = uuidv4();
        const createdPrice = await Price.create({id, title,price,options});
        if(!createdPrice){
            return errorHandler(res,404,"The Price card is not created!")
        }
        return errorHandler(res,200,"The Price Card is successfully created!",false,createdPrice);
    } catch (error) {
        errorHandler(res,500,error.message|| "Internal server error!")
    }
};

// get all price cards
export const getAllPriceCard = async (req, res)=>{
    try {
        const getPrices =await Price.findAll()
        if(!getPrices){
            return errorHandler(res,400,"The price card is not found!")
        }
        return errorHandler(res,200,"the price cards are gotten successfully!",false, getPrices);
    } catch (error) {
        errorHandler(res,500,error.message || "Internal server error!")
    }
};



// get price card by id
export const getPriceCardById = async(req,res)=>{
    try {
        const {id} = req.body;
        const getPriceCard = await Price.findById(id);
        if(!getPriceCard){
            return errorHandler(res,404,"The price card is not found!");
        }
        return errorHandler(res,200,"The price card is gotten successfully!",false, getPriceCard);
    } catch (error) {
        errorHandler(res,500,error.message || "Internal server error!")
    }
};

// update price card
export const updatePriceCard = async (req,res)=>{
    try {
        const {id,title,price, options} = req.body;
        const updatePrice = await Price.update(id,{title,price,options});
        if(!updatePrice){
            return errorHandler(res,404,"The price card is not found!");
        }
        return errorHandler(res,200,"The price card is updated successfully!",false,updatePrice)
    } catch (error) {
        errorHandler(res,500,error.message || "Internal server error!")
    }
};


// delete price card

export const deletePriceCard = async(req,res)=>{
    try {
        const {id} = req.body;
        const deletePrice = await Price.delete(id);
        if(!deletePrice){
            return errorHandler(res,404,"The price card is not found!");
        }
        return errorHandler(res,200, "The price card is deleted successfully!",false, deletePrice);
    } catch (error) {
        errorHandler(res,500,error.message || "Internal server error!")
    }
};