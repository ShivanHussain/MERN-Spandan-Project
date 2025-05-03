import mongoose from "mongoose";


const contactSchema = new mongoose.Schema(
    {
    name:{
        type: String,
        required: [true,"Name is Required"]
    },
    email:{
        type: String,
        required: [true,"Email is Required"],
        unique: true
    },
    message:{
        type: String,
        required: [true,"Message is Required"]
    }
},
{timestamps: true}
);

export const Contact = mongoose.model("Contact",contactSchema);