import { Tid }  from '../models/tidSchema.js';


const generateTid = async()=>{
    try{

        const result = await Tid.findOneAndUpdate(
                    {},               
                    { $inc: { lastTid: 1 } },  // Increment `lastTid` by 1
                    { new: true, upsert: true }  // Create the document if it doesn't exist
        );


        const formattedTid = `T2025${result.lastTid.toString().padStart(5,'0')}`;

        return formattedTid;

    }catch(err){
        console.log("Tid geneartion Error : ",err);
    }
}



export default generateTid;