import db from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid"


const User = db.user;

export const SignUp = async (req, res) => {
    try {
        const { password, username, fullName, email } = req.body;
        const id = uuidv4()
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            id:id,
            username: username,
            email: email,
            password: hashedPassword,
            fullName: fullName,
            image: "",
            phone: "",
            role:""
        })


        res.status(201).json({
            success: true,
            error: false,
            message: "Your account created successfully!",
            data: user,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal server error!",
        })
    }
}

export const SignIn = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findByUsername(username)
        if (!user) {
            res.status(404).json({
                success: false,
                error: true,
                message: "The user is not found!",
            })
        }

        const passwordIsValid = await bcrypt.compare(password, user.password);
        if (!passwordIsValid) {
            res.status(400).json({
                success: false,
                error: true,
                accessToken: null,
                message: "Invalid password!"
            })
        }

        const accessToken = jwt.sign({ id: user.id }, process.env.SECRET_KEY_ACCESS_TOKEN, {
            expiresIn: "7d",
        });

        const cookieOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        }
        res.cookie("accessToken", accessToken, cookieOption);
        // const roles = await user.getRoles();
        // const authorities = roles.map((role)=> `ROLE_${role.name.toUpperCase()}`);
        return res.status(200).json({
            success: true,
            error: false,
            message: "You have logged In Successfully!",
            accessToken,
            data: user,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal server error!"
        })
    }
};

export const SignOut = async (req, res) => {
    try {
        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        }
        res.clearCookie("accessToken", cookiesOption);

        res.status(200).json({
            success: true,
            error: false,
            message: "You have logged out successfully!"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message || "internal server error!"
        })
    }
}

export const getUserDetails = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                error: true,
                message: "The user is not found!"
            })
        }


        return res.status(200).json({
            success: true,
            error: false,
            message: "the user found successfully!",
            data: user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal server error!"
        })
    }
}

export const updateUser = async (req, res) => {
    try {
        const userId = req.userId;
        const { username, fullname, email, phone, image} = req.body;
        if (!username || !fullname || !email || !phone || !userId) {
            res.status(404).json({
                success: false,
                error: true,
                message: "All fields are required!"
            })
        }
        const user = await User.findById(userId);
        if (!user) {
            res.status(500).json({
                success: false,
                error: true,
                message: 'The user is not found!',
            })
        }
        const updateUser = await User.update(user?.id, {
            username,
            fullname,
            email,
            phone,
            image
        })
        res.status(200).json({
            success: true,
            error: false,
            message: "The user is updated successfully!",
            data: updateUser,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal server error!"
        })
    }
}

export const updateUserByAdmin = async (req, res) => {
    try {
        const { id, role } = req.body;
        if (!id || !role) {
            res.status(404).json({
                success: false,
                error: true,
                message: "All fields are required!"
            })
        }
        const user = await User.update(id,{role:role})

        return res.status(200).json({
            success: true,
            error: false,
            message: "The user roles updated successfully",
            data: user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal server error!"
        })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.body;
        const user = await User.findById(id);
        if (!user) {
            res.status(404).json({
                success: false,
                error: true,
                message: "The user is not found!",
            })
        }
        await User.delete(user?.id);
        return res.status(200).json({
            success: true,
            error: false,
            message: "The user deleted successfully!",
            data: user,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal server error!",
        })
    }
}

export const getAllUserDetails = async (req, res) => {
    try {
        const users = await User.findAll()
        if (!users) {
            res.status(500).json({
                success: false,
                error: true,
                message: "The users are not found!"
            })
        }
        res.status(200).json({
            success: true,
            error: false,
            message: "The users found successfully!",
            users,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal server error!",
        })
    }
}
