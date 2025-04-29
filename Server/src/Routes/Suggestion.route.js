import { Router } from "express";
import suggestCode from "../Controller/Suggest.controller.js";


const suggestionRoutes = Router();


suggestionRoutes.post('/suggest',suggestCode)

export default suggestionRoutes;