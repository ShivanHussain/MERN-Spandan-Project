import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dbconn from './database/dbconn.js';
import { errorMiddleware } from './middleware/error.js';
import userRouter from "./Routes/userRoute.js";
import eventRouter from "./Routes/eventRoute.js";
import soloEventRouter from "./Routes/soloEventRoute.js"
import groupEventRouter from './Routes/groupEventRoute.js';
import contactRouter from './Routes/contactRoute.js'




const app = express();


//setup env file
dotenv.config({path : "./config/config.env"});  



//frontend URL to connect backend 
app.use(cors({  
    origin: [process.env.PORTFOLIO_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
    credentials: true,
}));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); 
app.use(express.json())



//routes api

app.use("/api/v2/user",userRouter);
app.use("/api/v2/event",eventRouter);
app.use("/api/v2/solo",soloEventRouter);
app.use("/api/v2/group",groupEventRouter);
app.use("/api/v2/send",contactRouter)





// connection  for MONGO_DB URL---->database
dbconn();  


// check user validation
app.use(errorMiddleware);  


export default app;