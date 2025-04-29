import { Router } from "express";
import trimCode from "../Controller/Trim.controller.js";


const trimmedRoutes = Router();


trimmedRoutes.post('/trim',trimCode)

export default trimmedRoutes;