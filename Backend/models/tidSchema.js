import mongoose from "mongoose";

const tidSchema = new mongoose.Schema({
        lastTid:{
          type: Number,
          required: true,
          default: 0
          
        }
        
},
{Timestamp: true}
);



export const  Tid = mongoose.model("Tid",tidSchema); 