import express from "express"
const app = express()
import cors from "cors"
import cookieParser from "cookie-parser"
import helmet from "helmet"
import morgan from "helmet";
import userRouter from "./routes/user.route.js"
import heroRouter from "./routes/home/hero.route.js"
import uploadImageRouter from "./routes/uploadImage.route.js"
import serviceRouter from "./routes/services.route.js";
import projectRouter from "./routes/project.route.js";
import offerRouter from "./routes/home/offer.route.js";
import clientRouter from "./routes/home/client.route.js";
import teemRouter from "./routes/teem.route.js";
import testimonialRouter from "./routes/testimonial.route.js";
import newsRouter from "./routes/news.route.js";
import priceRouter from "./routes/price.route.js";
import contactRouter from "./routes/contact.route.js";
import { config } from "dotenv";
config();



app.use(cors({
    credentials:true,
    origin: process.env.FRONTEND_URL || "https://mysoftitsolution.onrender.com",
}));

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));
app.use(cookieParser());
app.use(morgan());
app.use(helmet({
    crossOriginResourcePolicy: false
}));
app.use("/api/user",userRouter)
app.use("/api/image", uploadImageRouter);
app.use("/api/home/hero", heroRouter);
app.use("/api/service", serviceRouter);
app.use("/api/project", projectRouter);
app.use("/api/home/offer", offerRouter);
app.use("/api/home/client", clientRouter);
app.use("/api/teems", teemRouter);
app.use("/api/testimonials",testimonialRouter);
app.use("/api/news",  newsRouter);
app.use("/api/price", priceRouter);
app.use("/api/contact", contactRouter);

export default app;