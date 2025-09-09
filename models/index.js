import clientModel from "./clientModel.js";
import contactModel from "./contactModel.js";
import newsModel from "./newsModel.js";
import offerModel from "./offerModel.js";
import projectModel from "./projectModel.js";
import serviceModel from "./serviceModel.js";
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
};

export default db;








