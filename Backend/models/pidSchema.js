import mongoose from "mongoose";


const pidSchema = new mongoose.Schema({
    lastPid:{
      type: Number,
      required: true,
      default: 0
      
    }
    
},
{Timestamp: true});


export const Pid = mongoose.model("Pid",pidSchema);



  