import express from 'express';
import dotenv ,{configDotenv} from 'dotenv'
import cors from 'cors';
import CodeRouter from './src/Routes/Code.Route.js';
import connectDB from './src/DB/ConnectDB.js';
import UserRouter from './src/Routes/User.Routes.js';



configDotenv();
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true})); 
app.use(cors());



 

const port = process.env.PORT;

app.use("/api/user",UserRouter);
app.use('/api/code',CodeRouter);

 
app.get('/',(req,res)=>{
    res.send("Server Started Successfully, you are in the homepage...")
})


app.listen(port,()=>{
    console.log(`Server running on port: http://localhost:${port}`)
})

