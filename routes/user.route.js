import express from "express";
import { deleteUser, getAllUserDetails, getUserDetails, SignIn, SignOut, SignUp, updateUser, updateUserByAdmin } from "../controllers/user.controllers.js";
import authJWT from "../middlewares/authJWT.js";



const router = express.Router();


router.post("/signup",   SignUp);
router.post("/login", SignIn);
router.post("/get-user-details", authJWT.verifyToken,  getUserDetails);
router.get("/signout",  SignOut);
router.put("/update-user",authJWT.verifyToken, updateUser);
router.get("/all-users", authJWT.verifyToken,   getAllUserDetails);
router.put("/update-user-by-admin",  updateUserByAdmin)
router.delete("/delete-user", authJWT.verifyToken, deleteUser); 


export default router;