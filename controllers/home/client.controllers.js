import { v4 as uuidv4 } from "uuid"
import db from "../../models/index.js";
import { errorHandler } from "../../utils/errorHandler.js";

const Client = db.client;
export const createClient =async (req, res)=>{
    try {
        const id = uuidv4()
        const {image, title, description} = req.body;
        const addClient = await Client.create({id,image,title,description});
        if(!addClient){
            return errorHandler(res,404,"The client is not created");
        }
        return errorHandler(res,200, "The client is created successfully!",false,addClient);
    } catch (error) {
        return errorHandler(res,500,error.message || "Internal server error!");
    }
};

export const getAllClients =async (req, res)=>{
    try {
        const clients = await Client.findAll();
        if(!clients){
            return errorHandler(res,404,"The client is not found!");
        }
        return errorHandler(res,200,"The clients are gotten successfully!",false,clients);
    } catch (error) {
        return errorHandler(res,500,error.message || "Internal server error!");
    }
}

export const getClientById =async (req, res)=>{
    try {
        const {id} = req.body;
        const client = await Client.findById(id);
        if(!client){
            return errorHandler(res,404,"The client is not found!");
        }
        return errorHandler(res,200, "The client is gotten successfully!",false,client);
    } catch (error) {
        return errorHandler(res,500,error.message || "Internal server error!");
    }
}


export const deleteClient =async (req, res)=>{
    try {
        const {id} = req.body;
        const client = await Client.delete(id);
        if(!client){
            return errorHandler(res,404,"The client is not found!");
        }
        return errorHandler(res,200, "The client is updated successfully!",false,client);
    } catch (error) {
        return errorHandler(res,500,error.message || "Internal server error!");
    }
}

export const updateClient =async (req, res)=>{
    try {
        const {id, image, title, description} = req.body;
        const updateClient = await Client.update(id,{image,title,description,id});
        if(!updateClient){
            return errorHandler(res,404,"The client is not found!");
        };
        return errorHandler(res,200, "The client is updated successfully!",false,updateClient);
    } catch (error) {
        return errorHandler(res,500,error.message || "Internal server error!");
    }
}