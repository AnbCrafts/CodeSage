import { Router } from "express";
import analyzeCode from "../Controller/Analyze.controller.js";


const analyzeRoutes = Router();


analyzeRoutes.post('/summarize',analyzeCode)

export default analyzeRoutes;