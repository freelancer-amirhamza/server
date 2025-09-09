import uploadImageCloudinary from "../config/cloudinary.js";

const uploadImage = async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({
                success: false,
                error: true,
                message: "No file uploaded!"
            });
        }
        const uploadedImage = await uploadImageCloudinary(file);
        return res.status(201).json({
            success: true,
            error: false,
            message: "The image uploaded successfully!",
            data: uploadedImage,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: error.message || "Internal server error!",
        });
    }
}

export default uploadImage;