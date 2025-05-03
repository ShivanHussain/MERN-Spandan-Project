import { catchAsyncError } from "../middleware/catchAsyncError.js";
import errorHandler from "../middleware/error.js";
import { Event } from "../models/eventSchema.js";

//add event
export const registered = catchAsyncError(async(req, res, next)=>{

    const { eventname, eventtype, heading1, heading2, heading3, heading4 } =req.body;

    if(! eventname || !eventtype ||  !heading1 || !heading2 || !heading3 || !heading4){
        return next(new errorHandler("All fields are Required",400));
    };


    const event = await Event.create({eventname, eventtype, heading1, heading2, heading3, heading4 });


    res.status(200).json({
        success: true,
        message: "Event Registered",
        data: event
    })

});


//get all event 
export const allEvent = catchAsyncError(async(req, res, next)=>{

    try{
        const event = await Event.find().sort({createdAt: -1});
        return res.json({
            success: true,
            data: event,});
    }catch(err){
        console.log(err);
       return next(new errorHandler(err.message,400)); 
    }

});