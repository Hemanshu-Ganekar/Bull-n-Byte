import express from "express";
import { verifyToken } from "../controller/authController.js";
import { searchSymbol } from "../controller/trade.js";
import { intraDayData } from "../controller/trade.js";
const tradeRouter = express.Router();

tradeRouter.get("/trade/search/:keyword",verifyToken,searchSymbol);
tradeRouter.get("/trade/intraday/:symbol",verifyToken,intraDayData);

export default tradeRouter;