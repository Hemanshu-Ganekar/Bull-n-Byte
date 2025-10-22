import express from "express";
import {login,signin} from "../controller/authController.js"
const authrouter = express.Router();

authrouter.post("/login",login);
authrouter.post("/signin",signin);

export default authrouter