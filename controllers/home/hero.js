import {v4 as uuidv4} from "uuid";
import { poolDB } from "../../config/db.config.js";
import db from "../../models/index.js";
import { errorHandler } from "../../utils/errorHandler.js";


const Hero = db.hero;

export const  createBannerSlide = async(req, res)=>{
    try {
        const {image, heading, title, text} = req.body;
        const id =uuidv4();
        // create banner slide
        const newSlide = await Hero.create({id, image, heading, title, text});
        return errorHandler(res,200,"The slide was created successfully!",false,newSlide)
    } catch (error) {
        return errorHandler(res,500,error.message || "Internal server error!")
    }
}


export const getAllSlides = async(req, res)=>{
    try {
        const allSlides = await Hero.findAll();
        if(!allSlides){
            return errorHandler(res,404,"Slides are not found!")
        }
        return errorHandler(res,200,"Slides are gotten successfully!",false, allSlides);
    } catch (error) {
        return errorHandler(res,500,error.message || "Internal server error!");
    }
}

export const  getSlideById = async (req, res)=>{
    try {
        const {id} = req.body;
        const slide = await Hero.findById(id)
        if(!slide){
            return errorHandler(res, 404,"The slide is not found!",)
        }
        return errorHandler(res, 201,"The slide is found successfully!",false, slide);
    } catch (error) {
        return errorHandler(res,500,error.message || "Internal server error!");
    }
}


export const  deleteSlideById = async (req, res)=>{
    try {
        const {id} = req.body;
        const slide = await Hero.delete(id);
        if(!slide){
            return errorHandler(res,404,"The slide is not found!")
        }
        return errorHandler(res,201,"The slide is deleted successfully!",false,slide);
    } catch (error) {
        return errorHandler(res,500,error.message || "Internal server error!");
    }
}

export const updateSlide = async (req, res) => {
    try {
        const { id, image, heading, title, text } = req.body;
        const updateSlide = await Hero.update(id,{image, heading, title, text});
        if (!updateSlide) {
            return errorHandler(res,404,"The slide is not found!")
        }
        return errorHandler(res,200, "The slide updated successfully!",false, updateSlide);
    } catch (error) {
        return errorHandler(res,500,error.message || "Internal server error!");
    }
}

export const createHeroFooter = async(req, res)=>{
    try {
        const {text, btn_text} = req.body;
        const id =uuidv4();
        const [rows] = await poolDB.execute(
            "INSERT INTO herofooter(id, text, btn_text) VALUES(?,?,?) ",
            [id,text,btn_text]
        );
         if (rows.affectedRows === 0) {
            return errorHandler(res,404,"Footer not found!");
        }
        const [createdFooter] = await poolDB.execute("SELECT * FROM herofooter WHERE id=?",[ id]);
        return errorHandler(res,201,"hero footer created successfully!",false,createdFooter[0]);
    } catch (error) {
        return errorHandler(res,500,error.message || "Internal server error!");
    }
}

export const updateHeroFooter = async(req, res)=>{
    try {
        const {text, btn_text, id} = req.body;
          const [rows] = await poolDB.execute(
            "UPDATE herofooter SET text=?, btn_text=? WHERE id=?",
            [text, btn_text, id]
        )
        if (rows.affectedRows === 0) {
            return errorHandler(res,404,"Footer not found!");
        }
        const [updatedFooter] = await poolDB.execute("SELECT * FROM herofooter WHERE id=?",[ id]);
        return errorHandler(res,201,"The footer updated successfully!",false, updatedFooter[0]);
    } catch (error) {
        return errorHandler(res,500,error.message || "Internal server error!");
    }
}

export const deleteHeroFooter = async(req, res)=>{
    try {
        const {id} = req.body;
         const [rows] = await poolDB.execute("DELETE FROM herofooter WHERE id=?",[id]);
         if (rows.affectedRows === 0) {
            return errorHandler(res,404,"Footer not found!");
        }
        const deletedFooter = await poolDB.execute("SELECT * FROM herofooter WHERE id=?",[ id]);
        return errorHandler(res,201,"The footer deleted successfully!",false,deletedFooter[0]);
    } catch (error) {
        return errorHandler(res,500,error.message || "Internal server error!");
    }
}

export const getAllHeroFooters = async(req, res)=>{
    try {
        const [getFooters] = await poolDB.execute(
            "SELECT * FROM herofooter",
        )
        if (getFooters.affectedRows === 0) {
            return errorHandler(res,404,"Footer not found!");
        }
        return errorHandler(res,201,"The footer gotten successfully!",false,getFooters)
    } catch (error) {
        return errorHandler(res,500,error.message || "Internal server error!");
    }
}