import mongoose from "mongoose";


const groupEventSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Enter your Full Name"]
    },
    pid:{
        type:String,
        required: [true,"Pid is Required"]
    },
    tid:{
        type: String,
        required: [true,"Tid is Required"]
    },
    pids:{
        type: [String],
        required: [true,"ALL participants Pid Required"]
    },
    eventName:{
        type: String,
        required: [true,"Event Name is Required"]
    },
    collegeName:{
        type: String,
        required: [true,"College Name Type is Required"]
    },
    eventType:{
        type: String,
        required: [true,"Event Type is Required"]
    },


},{timestamps: true});


export const groupEventReg = mongoose.model("groupEventReg",groupEventSchema);