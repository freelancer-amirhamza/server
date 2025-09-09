import db from "../models/index.js";
import { errorHandler } from "../utils/errorHandler.js";
import { v4 as uuidv4 } from "uuid";



const Contact = db.contact;
// create contact
export const createContact = async(req,res)=>{
    try {
        const id = uuidv4();
        const {address, email, phone} = req.body;
        const contact = await Contact.create({id:id,address:address,email:email,phone:phone});
        console.log(!contact)
        if(!contact){
            return errorHandler(res,400,"The contact is not created")
        }
        return errorHandler(res,200,"The contact is successfully created!",false,contact)
    } catch (error) {
        errorHandler(res,500,error?.message || "Internal server error!",)
    }
};

export const getContact = async (req, res)=>{
    try {
        const contact = await Contact.findAll()
        if(contact.length == 0){
            return errorHandler(res,400,"The contact is not found")
        }
        return errorHandler(res,200,"The contact is gotten successfully!",false,contact)
    } catch (error) {
        errorHandler(res,500,error.message || "Internal server error!")
    }
}

export const updateContact = async (req, res)=>{
    try {
        const {id,address,email,phone }= req.body;
        const contact = await Contact.findById(id)
        if(contact.length == 0){
            return errorHandler(res,400,"This contact is not found")
        }
        const updatedContact = await Contact.update(contact.id,{address,email,phone});

        return errorHandler(res,200,"The contact is updated successfully!",false,updatedContact)
    } catch (error) {
        errorHandler(res,500,error.message || "Internal server error!")
    }
}

export const deleteContact = async (req, res)=>{
    try {
        const {id} = req.body;
        const contact = await Contact.findById(id)
        if(!contact){
            return errorHandler(res,400,"This contact is not found")
        }
        const deletedContact = await Contact.delete(contact?.id);

        return errorHandler(res,200,"The contact is deleted successfully!",false,deletedContact)
    } catch (error) {
        errorHandler(res,500,error.message || "Internal server error!")
    }
}