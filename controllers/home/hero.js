import {v4 as uuidv4} from "uuid";
import { poolDB } from "../../config/db.config.js";




export const  createBannerSlide = async(req, res)=>{
    try {
        const {image, heading, title, text} = req.body;
        const id =uuidv4();
        // create banner slide

        const newSlide = await poolDB.query(
          "INSERT INTO bannerslide(id, image, heading, title, text) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [id, image, heading, title, text]
        )
        res.status(200).json({
            success:true,
            error:false,
            message:"The slide was created successfully!",
            data:newSlide.rows,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal server error!"
        })
    }
}


export const getAllSlides = async(req, res)=>{
    try {
        const allSlides = await poolDB.query("SELECT * FROM bannerslide");
        if(!allSlides){
            res.status(404).json({
                success:false,
                error:true,
                message: "Slides are not found!"
            })
        }
        res.status(200).json({
            success: true,
            error: false,
            message: "Slides are gotten successfully!",
            data: allSlides.rows,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal server error!"
        })
    }
}

export const  getSlideById = async (req, res)=>{
    try {
        const {id} = req.body;
        const slide = await poolDB.query("SELECT * FROM bannerslide WHERE id=$1", [id]);
        if(!slide){
            res.status(404).json({
                success: false,
                error:true,
                message: "The slide is not found!",
            })
        }
        res.status(200).json({
            success: true,
            error: false,
            message: "The slide is found successfully!",
            data: slide.rows,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal server error!"
        })
    }
}


export const  deleteSlideById = async (req, res)=>{
    try {
        const {id} = req.body;
        const slide = await poolDB.query("DELETE FROM bannerslide WHERE id=$1",[id]);
        if(!slide){
            res.status(404).json({
                success: false,
                error:true,
                message: "The slide is not found!",
            })
        }
        res.status(200).json({
            success: true,
            error: false,
            message: "The slide is deleted successfully!",
            data: slide.rows,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal server error!"
        })
    }
}

export const updateSlide = async (req, res) => {
    try {
        const { id, image, heading, title, text } = req.body;
        const updateSlide = await poolDB.query(
            "UPDATE bannerslide SET image=$1, heading=$2, title=$3, text=$4 WHERE id=$5 RETURNING *",
            [image, heading, title, text, id]
        );
        if (updateSlide.rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "Slide not found!",
            });
        }
        res.status(200).json({
            success: true,
            error: false,
            message: "The slide updated successfully!",
            data: updateSlide.rows,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal server error!"
        });
    }
}

export const createHeroFooter = async(req, res)=>{
    try {
        const {text, btn_text} = req.body;
        const id =uuidv4();
        const createdFooter = await poolDB.query(
            "INSERT INTO herofooter(id, text, btn_text) VALUES($1, $2, $3) RETURNING *",
            [id,text,btn_text]
        );
        res.status(200).json({
            success: true,
            error: false,
            message: "hero footer created successfully!",
            data: createdFooter.rows,
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            error: true,
            message: error.message || "Internal server error!"
        })
    }
}

export const updateHeroFooter = async(req, res)=>{
    try {
        const {text, btn_text, id} = req.body;
        const updatedFooter = await poolDB.query(
            "UPDATE herofooter SET text=$1, btn_text=$2 WHERE id=$3 RETURNING *",
            [text, btn_text, id]
        )
        if (updatedFooter.rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "Footer not found!",
            });
        }
        res.status(200).json({
            success: true,
            error: false,
            message: "The footer updated successfully!",
            data: updatedFooter.rows,
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            error: true,
            message: error.message || "Internal server error!"
        })
    }
}

export const deleteHeroFooter = async(req, res)=>{
    try {
        const {id} = req.body;
        const deletedFooter = await poolDB.query(
            "DELETE FROM herefooter WHERE id=$1 RETURNING *",
            [ id]
        )
        if (deletedFooter.rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "footer not found!",
            });
        }
        res.status(200).json({
            success: true,
            error: false,
            message: "The footer deleted successfully!",
            data: deletedFooter.rows,
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            error: true,
            message: error.message || "Internal server error!"
        })
    }
}

export const getAllHeroFooters = async(req, res)=>{
    try {
        const getFooters = await poolDB.query(
            "SELECT * FROM herofooter",
        )
        if (getFooters.rows.length === 0) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "Footers not found!",
            });
        }
        res.status(200).json({
            success: true,
            error: false,
            message: "The footer gotten successfully!",
            data: getFooters.rows,
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            error: true,
            message: error.message || "Internal server error!"
        })
    }
}