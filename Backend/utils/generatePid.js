import { Pid } from "../models/pidSchema.js";
//import catchAsyncError from "../middleware/catchAsyncError.js"



const generatePid = async () => {
    try {
        
        const result = await Pid.findOneAndUpdate(
            {},               
            { $inc: { lastPid: 1 } },  // Increment `lastPid` by 1
            { new: true, upsert: true }  // Create the document if it doesn't exist
        );

        
        const formattedPid = `P2025${result.lastPid.toString().padStart(5, '0')}`;

        
        return formattedPid;
    } catch (err) {
        console.log("PID Generation Error:", err);
        throw err; 
    }
};

export default generatePid;




