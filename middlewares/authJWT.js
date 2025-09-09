import jwt from "jsonwebtoken";
import { config } from "dotenv";
import db from "../models/index.js";

config()

const User = db.user;

const verifyToken = (req, res, next)=>{
    const token = req.headers["x-access-token"] || req.headers["authorization"]
    if(!token) res.status(404).json({
        success: false,
        error:true,
        message: "No Token provided!"
    })
    const actualToken = token.startsWith("Bearer ")
    ? token.slice(7, token.length) : token;

    jwt.verify(actualToken, process.env.SECRET_KEY_ACCESS_TOKEN, (error, decoded)=>{
        if(error){
            res.status(400).json({
                success:false,
                error:true,
                message: "Unauthorized user access!"
            })
        }
        req.userId = decoded.id;
        next();
    })
};

const isAdmin = async(req, res, next)=>{
    try {
        const userId = req.userId;
        const user = await User.findByPk(userId);
        const roles = await user.getRoles();

        for(const role of roles){
            if(role.name === "admin"){
                next()
            }
        }
        res.status(404).json({
            success: false,
            error: true,
            message: "Require Admin Role!"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: "Internal server error during the authorization!"
        })
    }
}


const isModerator = async(req, res, next)=>{
    try {
        const userId = req.userId;
        const user = await User.findByPk(userId);
        const roles = await user.getRoles();

        for(const role of roles){
            if(role?.name === "moderator"){
                next();
            }
        };
        res.status(404).json({
            success:false,
            error: true,
            message:"Moderator role is mandatory!"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: "Internal server error during the authorization!"
        })
    }
}


const isModeratorOrAdmin = async(req, res, next)=>{
    try {
        const userId = req.userId;
        const user = await User.findByPk(userId);
        const roles = await user.getRoles();

        for(const role of roles){
            if(role?.name === "admin" || role?.name === "moderator"){
                next()
            }
        }
        res.status(400).json({
            success:false,
            error: true,
            message: "Require the admin or moderator roles!"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: "Internal server error during the authorization!"
        })
    }
}
const authJWT = {verifyToken, isAdmin, isModerator, isModeratorOrAdmin}

export default authJWT;