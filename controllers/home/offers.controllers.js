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
        const allCard = await poolDB.query(`SELECT * FROM offer_cards`);
        res.status(200).json({
            success: true,
            error:false,
            message: "The Offer card is gotten successfully!",
            data:allCard.rows
        })
    } catch (error) {
        return errorHandler(res,500,error.message || "Internal server error!");
    }
};
// get offer card by id
export const getOfferCardById= async(req,res)=>{
    try {
        const {id} = req.body;
        const offerCard = await poolDB.query(`SELECT * FROM offer_cards WHERE id=$1`,[id]);
        if(offerCard.rows.length === 0){
            res.status(400).json({
                success:false,
                error:true,
                message: "The card is not found!"
            })
        }
        res.status(200).json({
            success: true,
            error:false,
            message: "The Offer card is gotten successfully!",
            data:offerCard.rows
        })
    } catch (error) {
        return errorHandler(res,500,error.message || "Internal server error!");
    }
};

// update offer card
export const updateOfferCard= async(req,res)=>{
    try {
        const {id,icon, title,description} = req.body;
        const updatedCard = await poolDB.query(
            `UPDATE offer_cards SET icon=$1, title=$2, description=$3 WHERE id=$4 RETURNING *`,
            [icon,title,description,id]
        );
        // if(updatedCard.rows.length === 0){
        //     res.status(200).json({
        //         success:false,
        //         error:true,
        //         message: "The card is not found!"
        //     })
        // }
        res.status(200).json({
            success: true,
            error:false,
            message: "The Offer card is updated successfully!",
            data:updatedCard.rows
        })
    } catch (error) {
        return errorHandler(res,500,error.message || "Internal server error!");
    }
};
export const deleteOfferCard= async(req,res)=>{
    try {
        const {id} = req.body;
        const deletedCard = await poolDB.query(`DELETE FROM offer_cards WHERE id=$1 RETURNING *`,[id]);
        if(deletedCard.rows.length === 0){
            res.status(200).json({
                success:false,
                error:true,
                message: "The card is not found!"
            })
        }
        res.status(200).json({
            success: true,
            error:false,
            message: "The Offer card is deleted successfully!",
            data:deletedCard.rows
        })
    } catch (error) {
        return errorHandler(res,500,error.message || "Internal server error!");
    }
};
