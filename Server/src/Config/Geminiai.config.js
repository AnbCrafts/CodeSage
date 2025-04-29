import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv ,{configDotenv} from 'dotenv'
configDotenv();

const apiKey = process.env.GEMINI_API_SECRET_KEY;

const genAI = new GoogleGenerativeAI(apiKey);
console.log("API USED IS : "+apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' }); // Or 'gemini-pro'

export default model;