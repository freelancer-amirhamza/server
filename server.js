import app from "./app.js";
import { config } from "dotenv";


const PORT = process.env.PORT || 5000;
config()


app.get("/",(req, res)=>{
    res.send("<center><h1> Welcome to MySoft server site </h1></center>")
})


 app.listen(PORT, async()=>{
    console.log(`server is running at http://localhost:${PORT}`)
})