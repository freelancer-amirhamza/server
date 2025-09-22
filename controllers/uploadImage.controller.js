import uploadImageCloudinary from "../config/cloudinary.js";
import { errorHandler } from "../utils/errorHandler.js";

const uploadImage = async (req, res) => {
    try {
        const file = req.file;
        if(!file){
            return errorHandler(res,400,"No file uploaded!")
        };
        const uploadedImage = await uploadImageCloudinary(file);
        return errorHandler(res,201,"The image uploaded successfully!",false, uploadedImage);
    } catch (error) {
        return errorHandler(res, 500,error.message || "Internal server error!",)
    }
}

export default uploadImage;