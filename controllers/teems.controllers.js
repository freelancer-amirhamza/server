import { v4 as uuidv4 } from "uuid";
import { poolDB } from "../config/db.config.js";

// create a new teem
export const addTeem = async (req, res) => {
    try {
        const id = uuidv4();
        const { image, name, title, description } = req.body;
        const newTeem = await poolDB.query(`
            INSERT INTO teems(id,image, name, title, description) VALUES($1,$2,$3,$4,$5) RETURNING *`,
        [id, image,name, title, description ]);

        res.status(200).json({
            success:true,
            error:true,
            message:"The teem created successfully!",
            data: newTeem.rows,
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal server error",
        })
    }
}

export const getAllTeems = async (req, res)=>{
    try {
        const teems = await poolDB.query(`SELECT * FROM teems`);
        if(teems.rows.length === 0){
            res.status(404).json({
                success:false,
                error: true,
                message: "The teem is not found!"
            })
        }
        res.status(200).json({
            success:true,
            error:false,
            message: "The All teem are gotten successfully!",
            data:teems.rows,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal server error",
        })
    }
};

export const getTeemById = async (req, res)=>{
    try {
        const {id}= req.body;
        const teem = await poolDB.query(`SELECT * FROM teems WHERE id=$1`,[id]);
        if(teem.rows.length === 0){
            res.status(404).json({
                success:false,
                error: true,
                message: "The teem is not found!"
            })
        }
        res.status(200).json({
            success:true,
            error:false,
            message: "The teem is gotten successfully!",
            data:teem.rows,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal server error",
        })
    }
}

// update a teem member

export const updateTeem = async (req, res)=>{
    try {
        const {id, image, name,title,description}= req.body;
        const teem = await poolDB.query(`
            UPDATE teems SET image=$1, name=$2, title=$3, description=$4 WHERE id=$5 RETURNING *`,
        [image, name,title,description,id]);
        if(teem.rows.length === 0){
            res.status(404).json({
                success:false,
                error: true,
                message: "The teem is not found!"
            })
        }
        res.status(200).json({
            success:true,
            error:false,
            message: "The teem is updated successfully!",
            data:teem.rows,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal server error",
        })
    }
}

// delete a teem member

export const deleteTeem = async (req, res)=>{
    try {
        const {id}= req.body;
        const teem = await poolDB.query(`DELETE FROM teems WHERE id=$1 RETURNING *`,[id]);
        if(teem.rows.length === 0){
            res.status(404).json({
                success:false,
                error: true,
                message: "The teem is not found!"
            })
        }
        res.status(200).json({
            success:true,
            error:false,
            message: "The teem is deleted successfully!",
            data:teem.rows,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal server error",
        })
    }
}