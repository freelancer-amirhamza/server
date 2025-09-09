import cloudinary from "cloudinary";



const cloudinaryVersion = cloudinary.v2;

cloudinaryVersion.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET_KEY,
})


const uploadImageCloudinary = async (image)=>{
    const buffer = image?.buffer || Buffer.from(await image.arrayBuffer());
    
    
    const uploadImage = await new Promise((resolve, reject)=>{
        cloudinaryVersion.uploader.upload_stream(
            {folder: "mysoftitsolution"}, (error,uploadResult)=>{
                if(uploadResult){
                    return resolve(uploadResult)
                }else{
                    reject(error)
                }
            }
        ).end(buffer);
    })
    return uploadImage;
}

export default uploadImageCloudinary;