import { catchAsyncError } from "../middleware/catchAsyncError.js";
import errorHandler from "../middleware/error.js";
import { User } from "../models/userSchema.js";
import { Event } from "../models/eventSchema.js";
import { soloEventReg } from "../models/soloEventSchema.js"


//Registered a solo Event
export const registered = catchAsyncError(async (req, res, next) => {
  const { name, pid } = req.body;
  const { id: eventId } = req.params;

  console.log(req.body);
  //console.log(fullName);




  //Validate required fields
  if (!name || !pid) {
    return next(new errorHandler("All fields are required", 400));
  }

  // Check if user exists
  const user = await User.findOne({ pid });
  if (!user) {
    return next(new errorHandler("Invalid PID. No user found.", 404));
  }

  // Check if event exists
  const event = await Event.findById(eventId);
  if (!event) {
    return next(new errorHandler("Event not found", 404));
  }

  //Prevent duplicate registrations
  const alreadyRegistered = await soloEventReg.findOne({ pid, eventName: event.eventname });
  if (alreadyRegistered) {
    return next(new errorHandler("User already registered for this event", 400));
  }

  //Create registration entry
  const registration = await soloEventReg.create({
    name,
    pid,
    phone: user.phone,
    collegeName: user.collegeName,
    rollNo: user.rollNo,
    eventName: event.eventname,
    eventType: event.eventtype,
  });

  res.status(200).json({
    success: true,
    message: "Successfully registered for the event",
    data: registration,
  });
});




// GET all group event in database
export const getAllSoloEvents = catchAsyncError(async (req, res, next) => {
  const allGroups = await soloEventReg.find();

  if (!allGroups || allGroups.length === 0) {
    return next(new errorHandler("No solo event registrations found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Solo Event fetched successfully",
    data: allGroups,
  });
});



//update document by pid
export const updateSoloEventByPid = catchAsyncError(async (req, res, next) => {
  const { pid } = req.params;
  const updates = req.body;

  // Validate PID
  if (!pid) {
    return next(new errorHandler("PID is required", 400));
  }

  // Check if the solo event exists
  const existingSoloEvent = await soloEventReg.findOne({ pid });

  if (!existingSoloEvent) {
    return next(new errorHandler("Solo event registration not found with the provided PID", 404));
  }

  // Update the document
  const updatedSoloEvent = await soloEventReg.findOneAndUpdate(
    { pid },
    updates,
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    message: "Solo Event updated successfully",
    data: updatedSoloEvent,
  });
});



//get all data by eventName
export const getByEventName = async (req, res) => {
    try {
        const data = await soloEventReg.find({ eventName: req.params.eventName });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};


//get all data by Pid
export const getByPID = async (req, res) => {
    try {
        const data = await soloEventReg.find({ pid: req.params.pid });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

//get all data EventType
export const getByEventType = async (req, res) => {
    try {
        const data = await soloEventReg.find({ eventType: req.params.eventType });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};


//get all data by CollegeName
export const getByCollegeName = async (req, res) => {
    try {
        const data = await soloEventReg.find({ collegeName: req.params.collegeName });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};



