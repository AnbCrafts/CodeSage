import express from "express";
import { analyzeCode } from "../Controller/Code.Controller.js";
import authMiddleware from "../Middlewares/Auth.Middleware.js";

const CodeRouter = express.Router();

// POST http://localhost:5000/api/ai/analyze
CodeRouter.post("/analyze",authMiddleware, analyzeCode);

export default CodeRouter;