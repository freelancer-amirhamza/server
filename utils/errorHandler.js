

export const errorHandler = (res,statusCode,message,error=true,data=null,)=>{
    res.status(statusCode).json({
        success:!error,
        error,
        message,
        ...(data && {data})
    }); 
};