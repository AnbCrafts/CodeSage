import { Router } from "express";
import explainCode from "../Controller/Explain.controller.js";


const explanationRoutes = Router();


explanationRoutes.post('/explain',explainCode)

export default explanationRoutes;