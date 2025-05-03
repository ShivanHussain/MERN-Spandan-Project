import mongoose from "mongoose";


const eventSchema = new mongoose.Schema({
    eventname:{
        type: String,
        required: [true, "Event Name is Required"],
    },
    eventtype:{
        type: String,
        required: [true, "Event Type is Required"],
    },
    heading1:{
        type: String,
        required: [true, "Heading 1 is Required"],
    },
    heading2:{
        type: String,
        required: [true, "heading 2 is Required"],
    },
    heading3:{
        type: String,
        required: [true, "heading 3 is Required"],
    },
    heading4:{
        type: String,
        required: [true, "heading 4 is Required"],
    }   
    
},{timestamps: true});


export const Event = mongoose.model("Event",eventSchema);