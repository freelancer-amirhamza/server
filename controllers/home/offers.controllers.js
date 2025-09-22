import { v4 as uuidv4 } from "uuid"
import { poolDB } from "../../config/db.config.js";
import { errorHandler } from "../../utils/errorHandler.js";
import db from "../../models/index.js";


const Offer = db.offer;

// create an offer card
export const createOfferCard= async(req,res)=>{
    try {
        const {icon, title, description} = req.body;
        const id = uuidv4();
        if(!id || !title || !icon || !description){
            return errorHandler(res,404,"All fields are required!")
        }
        const createdCard = await Offer.create({id, icon,title, description});
        return errorHandler(res,200,"The Offer card is created successfully!",false,createdCard);
    } catch (error) {
        return errorHandler(res,500,error.message || "Internal server error!");
    }
};
// get all offer cards
export const getAllOfferCards= async(req,res)=>{
    try {
        const allCard = await Offer.findAll()
        return errorHandler(res,200,"The Offer card is gotten successfully!",false,allCard)
    } catch (error) {
        return errorHandler(res,500,error.message || "Internal server error!");
    }
};
// get offer card by id
export const getOfferCardById= async(req,res)=>{
    try {
        const {id} = req.body;
        const offerCard = await Offer.findById(id);
        if(!offerCard){
            return errorHandler(res,404,"The card is not found!")
        }
        return errorHandler(res,200,"The Offer card is gotten successfully!",false,offerCard);
    } catch (error) {
        return errorHandler(res,500,error.message || "Internal server error!");
    }
};

// update offer card
export const updateOfferCard= async(req,res)=>{
    try {
        const {id,icon, title,description} = req.body;
        const updatedCard = await Offer.update(id,{icon,title,description})
        if(!updatedCard){
            return errorHandler(res,404, "The card is not found!")
        }
        return errorHandler(res,200,"The Offer card is updated successfully!",false, updateOfferCard);
    } catch (error) {
        return errorHandler(res,500,error.message || "Internal server error!");
    }
};
export const deleteOfferCard= async(req,res)=>{
    try {
        const {id} = req.body;
        const deletedCard = await Offer.delete(id)
        if(!deletedCard){
            return errorHandler(res,404, "The card is not found!")
        }
        return errorHandler(res,200,"The Offer card is deleted successfully!",false, deletedCard);
    } catch (error) {
        return errorHandler(res,500,error.message || "Internal server error!");
    }
};
