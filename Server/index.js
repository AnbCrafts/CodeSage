import express from 'express';
import dotenv ,{configDotenv} from 'dotenv'
import cors from 'cors';
import explanationRoutes from './src/Routes/Explain.route.js';
import analyzeRoutes from './src/Routes/Analyze.route.js';
import suggestionRoutes from './src/Routes/Suggestion.route.js';
import trimmedRoutes from './src/Routes/Trim.route.js';



configDotenv();

const app = express();

app.use(express.json());
app.use(express.urlencoded()); 
app.use(cors());

 

const port = process.env.PORT;

app.use('/api/code',explanationRoutes);
app.use('/api/code',analyzeRoutes);
app.use('/api/code',suggestionRoutes);
app.use('/api/code',trimmedRoutes);

app.get('/',(req,res)=>{
    res.send("Server Started Successfully, you are in the homepage...")
})


app.listen(port,()=>{
    console.log(`Server running on port: http://localhost:${port}`)
})

