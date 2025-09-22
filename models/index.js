import clientModel from "./clientModel.js";
import contactModel from "./contactModel.js";
import heroModel from "./heroModel.js";
import newsModel from "./newsModel.js";
import offerModel from "./offerModel.js";
import priceModel from "./priceModel.js";
import projectModel from "./projectModel.js";
import serviceModel from "./serviceModel.js";
import teemModel from "./teemsModel.js";
import testimonialModel from "./testimonialModel.js";
import userModel from "./user.model.js"
import { config } from "dotenv";
config();


const db = {
  user:userModel,
  contact:contactModel,
  project:projectModel,
  service:serviceModel,
  news:newsModel,
  testimonial:testimonialModel,
  client:clientModel,
  offer:offerModel,
  hero: heroModel,
  teems:teemModel,
  price:priceModel,
};

export default db;








