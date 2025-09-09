import { v4 as uuidv4 } from "uuid";
import { errorHandler } from "../utils/errorHandler.js";
import { poolDB } from "../config/db.config.js";



export const createPriceCard = async(req,res)=>{
    try {
        const {title, price, options} = req.body;
        const id = uuidv4();
        const createdPrice = await poolDB.query(`
            INSERT INTO price_cards(id, title,price,options) VALUES($1,$2,$3,$4) RETURNING *`,
        [id, title,price,options]);
        if(createdPrice.rows.length === 0){
            return errorHandler(res,404,"The Price card is not created!")
        }
        return errorHandler(res,200,"The Price Card is successfully created!",false,createdPrice.rows);
    } catch (error) {
        errorHandler(res,500,error.message|| "Internal server error!")
    }
};

// get all price cards
export const getAllPriceCard = async (req, res)=>{
    try {
        const getPrices =await poolDB.query(`SELECT * FROM price_cards`)
        if(getPrices.rows.length === 0){
            return errorHandler(res,400,"The price card is not found!")
        }
        return errorHandler(res,200,"the price cards are gotten successfully!",false, getPrices.rows);
    } catch (error) {
        errorHandler(res,500,error.message || "Internal server error!")
    }
};



// get price card by id
export const getPriceCardById = async(req,res)=>{
    try {
        const {id} = req.body;
        const getPriceCard = await poolDB.query(`SELECT * FROM price_cards WHERE id=$1`, [id]);
        if(getPriceCard.rows.length === 0){
            return errorHandler(res,404,"The price card is not found!");
        }
        return errorHandler(res,200,"The price card is gotten successfully!",false, getPriceCard.rows);
    } catch (error) {
        errorHandler(res,500,error.message || "Internal server error!")
    }
}

// update price card
export const updatePriceCard = async (req,res)=>{
    try {
        const {id,title,price, options} = req.body;
        const updatePrice = await poolDB.query(`
            UPDATE price_cards SET title=$1, price=$2, options=$3 WHERE id=$4 RETURNING *`,
            [title,price,options,id]);
        if(updatePrice.rows.length === 0){
            return errorHandler(res,404,"The price card is not found!");
        }
        return errorHandler(res,200,"The price card is updated successfully!",false,updatePrice.rows)
    } catch (error) {
        errorHandler(res,500,error.message || "Internal server error!")
    }
};


// delete price card

export const deletePriceCard = async(req,res)=>{
    try {
        const {id} = req.body;
        const deletePrice = await poolDB.query(`DELETE FROM price_cards WHERE id=$1 RETURNING *`,[id]);
        if(deletePrice.rows.length ===0){
            return errorHandler(res,404,"The price card is not found!");
        }
        return errorHandler(res,200, "The price card is deleted successfully!",false, deletePrice.rows);
    } catch (error) {
        errorHandler(res,500,error.message || "Internal server error!")
    }
}