import {v4 as uuidv4} from "uuid";
import { poolDB } from "../config/db.config.js";
import { errorHandler } from "../utils/errorHandler.js";
import db from "../models/index.js";

const News = db.news;
export const createNews = async (req, res)=>{
    try {
        const id = uuidv4();
        const {image,title, paragraph1, paragraph2,quote,tags, years, categories} = req.body
        const createdNews = await News.create({id,image,title, paragraph1, paragraph2,quote,tags, years, categories})
            if(!createdNews){
                return errorHandler(res,400,"The news is not created!",)
            }
            return errorHandler(res,200, "The news is created successfully!",false, createdNews);
    } catch (error) {
        errorHandler(res,500,error.message|| "Internal server error!")
    }
};

export const fetchAllNews = async (req, res)=>{
    try {
        const allNews = await News.findAll();
            if(!allNews){
                return errorHandler(res,400,"The news is not found!",)
            }
            return errorHandler(res,200, "The news is gotten successfully!",false, allNews);
    } catch (error) {
        errorHandler(res,500,error.message|| "Internal server error!")
    }
};

export const fetchNewsById = async (req, res)=>{
    try {
        const {id} = req.body
        const news = await News.findById(id);
            if(!news){
                return errorHandler(res,400,"The news is not found!",)
            }
            return errorHandler(res,200, "The news is gotten successfully!",false, news);
    } catch (error) {
        errorHandler(res,500,error.message|| "Internal server error!")
    }
};
// update news
export const updateNews = async (req, res)=>{
    try {
        const {id,image,title, paragraph1, paragraph2,quote,tags, years, categories} = req.body
        const createdNews = await News.update(id,{image,title, paragraph1, paragraph2,quote,tags, years, categories,id})
            if(!createdNews){
                return errorHandler(res,400,"The news is not updated!",)
            }
            return errorHandler(res,200, "The news is updated successfully!",false, createdNews);
    } catch (error) {
        errorHandler(res,500,error.message|| "Internal server error!")
    }
};

export const deleteNews= async (req, res)=>{
    try {
        const {id} = req.body;
        const createdNews = await News.delete(id);
            if(!createdNews){
                return errorHandler(res,400,"The news is not found!",)
            }
            return errorHandler(res,200, "The news is deleted successfully!",false, createdNews);
    } catch (error) {
        errorHandler(res,500,error.message|| "Internal server error!")
    }
};

