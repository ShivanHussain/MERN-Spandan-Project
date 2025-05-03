import app from "./app.js";


const port  = process.env.PORT;


//start server at port 
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})