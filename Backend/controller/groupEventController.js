import { catchAsyncError } from "../middleware/catchAsyncError.js";
import errorHandler from "../middleware/error.js";
import { User } from "../models/userSchema.js";
import { Event } from "../models/eventSchema.js";
import { groupEventReg } from "../models/groupEventSchema.js"
import generateTid from "../utils/generateTid.js";
import { sendEmail } from "../utils/sendEmail.js";

//registered group event 
export const registered = catchAsyncError(async (req, res, next) => {
    const { name, pids } = req.body;
    const { id } = req.params;


    console.log(id);
  
    // Validate team name
    if (!name) {
      return next(new errorHandler("Team Name is Required", 400));
    }
  
    // Validate pids
    if (!Array.isArray(pids) || pids.length < 3) {
      return next(new errorHandler("At least 3 participant PIDs are required", 400));
    }
  
    const emptyPIDs = pids.filter(pid => !pid || pid.trim() === "");
    if (emptyPIDs.length > 0) {
      return next(new errorHandler("All participant PIDs must be filled", 400));
    }
  
    // Check if all PIDs exist
    const users = await Promise.all(pids.map(pid => User.findOne({ pid })));
  
    const invalidIndex = users.findIndex(user => !user);
    if (invalidIndex !== -1) {
      return next(new errorHandler(`Invalid PID: ${pids[invalidIndex]}`, 400));
    }
  
    // Fetch the event
    const event = await Event.findById(id);
    if (!event) {
      return next(new errorHandler("Event not found", 404));
    }
  
    //Check if the main PID (team leader) is already registered in this event
    const existingTeam = await groupEventReg.findOne({
      pid: pids[0],
      eventName: event.eventname,
    });
  
    if (existingTeam) {
      return next(
        new errorHandler(
          `Team leader (PID: ${pids[0]}) has already registered for this event`,
          400
        )
      );
    }
  
    // Generate TID
    const Tid = await generateTid();
    //college name for team leader

    const user = await User.findOne({pid: pids[0]});

  
    // Register the team
    const groupEventDetails = await groupEventReg.create({
      name,
      pid: pids[0],
      tid: Tid,
      pids: pids.slice(1),
      eventName: event.eventname,
      eventType: event.eventtype,
      collegeName: user.collegeName
    });
  
    res.status(200).json({
      success: true,
      message: `Successfully Registered! TID: ${Tid}`,
      data: groupEventDetails,
    });
  });
  





//add more pids
export const addParticipate = catchAsyncError(async(req, res, next)=>{

    const { id }=req.params;
    console.log(id);

    const { name, pid1, pid2, pid3, pid4, pid5 }=req.body;


    const event = await groupEventReg.findById(id);

    console.log(event);

    if(!event){
        return next(new errorHandler("Team Not Registered",400));
    }

    const updatedpids = await groupEventReg.findByIdAndUpdate(id,
        {
            $push: {
              pids: { $each: [pid1,pid2, pid3, pid4, pid5 ] }
            }
        },
          { new: true, runValidators: true }
        );
    console.log(updatedpids);

    if(!updatedpids){
        return next(new errorHandler("Some error occured",400));
    }

    res.status(200).json({
        success: true,
        message: "successfully Added"
    })
})


//Admin

//update the group event by Tid
export const updateGroupEventByPid = catchAsyncError(async (req, res, next) => {
  const { tid } = req.params;
  const updates = req.body;

  // Validate
  if (!tid) {
    return next(new errorHandler("TID is required", 400));
  }

  // Check existence
  const existingDoc = await groupEventReg.findOne({ tid });

  if (!existingDoc) {
    return next(new errorHandler("Group registration not found with provided TID", 404));
  }

  // Perform update
  const updatedDoc = await groupEventReg.findOneAndUpdate(
    { tid },
    updates,
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    message: "Group Event updated successfully",
    data: updatedDoc,
  });
});


// GET all group events
export const getAllGroupEvents = catchAsyncError(async (req, res, next) => {
  const allGroups = await groupEventReg.find();

  if (!allGroups || allGroups.length === 0) {
    return next(new errorHandler("No group event registrations found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Group Events fetched successfully",
    data: allGroups,
  });
});




//get all group event by Tid
export const getByTID = async (req, res) => {
    try {
        const data = await groupEventReg.find({ tid: req.params.tid });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};



//get all  group event by pid
export const getByPID = async (req, res) => {
    try {
        // pid can be either the main pid or inside the pids array
        const data = await groupEventReg.find({
            $or: [
                { pid: req.params.pid },
                { pids: req.params.pid }
            ]
        });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};


//get all group Event by eventName
export const getByEventName = async (req, res) => {
    try {
        const data = await groupEventReg.find({ eventName: req.params.eventName });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};


//get all group Event by CollegeName
export const getByCollegeName = async (req, res) => {
    try {
        const data = await groupEventReg.find({ collegeName: req.params.collegeName });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};



//get all group Event by EventType
export const getByEventType = async (req, res) => {
    try {
        const data = await groupEventReg.find({ eventType: req.params.eventType });
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};








