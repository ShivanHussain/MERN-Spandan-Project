import mongoose from "mongoose";


const soloEventRegSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Enter your Full Name"]
    },
    pid:{
        type: String,
        required: [true,"Password is Required"],
        minLength: [8,"pid must contain atleast 8 characters:(p2025xxxxx)"],
    },
    phone:{
        type: String,
        required: [true,"Phone Number is Required"]
    },
    collegeName:{
        type: String,
        required: [true,"College Name is Required"]
    },
    rollNo:{
        type: String,
        required: [true,"Roll Number is Required"]
    },
    eventName:{
        type: String,
        required: [true,"Event Name is Required"]
    },
    eventType:{
        type: String,
        required: [true,"Event Type is Required"]
    },


},{timestamps: true});


export const soloEventReg = mongoose.model("soloEventReg",soloEventRegSchema);