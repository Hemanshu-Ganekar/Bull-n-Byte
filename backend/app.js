import mongoose, { Mongoose } from "mongoose";
import express from "express";
import authrouter from "./routes/authRoute.js";
import protectedRoute from "./routes/protected.js";
import CORS from "cors"
import dotenv from "dotenv";
dotenv.config();
const app = express();
const mongoPath = "mongodb+srv://Hemanshu-Ganekar:RoHeHeVi-111@userinfo.pql566e.mongodb.net/Bulln'Byte?retryWrites=true&w=majority";
app.use(CORS());
app.use(express.json());

app.use(authrouter);
app.use(protectedRoute);


mongoose.connect(mongoPath).then(()=>{
app.listen(process.env.PORT,async ()=>{
    console.log(`app is listening at http://localhost:${process.env.PORT}`);
})
}).catch((err)=>{
    console.log(err);
})
