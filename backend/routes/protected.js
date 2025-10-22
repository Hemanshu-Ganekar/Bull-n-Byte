import express from "express";
import { protectedFunction } from "../controller/protected.js";
import { verifyToken } from "../controller/authController.js";
const protectedRoute = express.Router();

protectedRoute.get("/protected",verifyToken,protectedFunction);

export default protectedRoute;