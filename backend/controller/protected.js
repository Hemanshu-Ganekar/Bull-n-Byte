import jwt from "jsonwebtoken"
import { verifyToken } from "./authController.js";

export const protectedFunction = (req,res,next)=>{
       res.status(200).json({
        "Secret":process.env.Secret,
       });
       console.log("Protected Function is accessed!!");    
}

