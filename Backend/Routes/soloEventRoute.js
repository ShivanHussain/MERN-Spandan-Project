import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { getAllSoloEvents,  getByCollegeName,  getByEventName,  getByEventType,  getByPID,  registered, updateSoloEventByPid } from "../controller/soloEventController.js";

const router = express.Router();

router.post("/participate/:id",registered);
router.get("/admin/getall",getAllSoloEvents);
router.put("/admin/update/:pid",updateSoloEventByPid);


// GET /api/solo-events/eventName/:eventName
router.get("/admin/eventName/:eventName", getByEventName);

// GET /api/solo-events/pid/:pid
router.get("/admin/pid/:pid", getByPID);

// GET /api/solo-events/eventType/:eventType
router.get("/admin/eventType/:eventType", getByEventType);

// GET /api/solo-events/collegeName/:collegeName
router.get("/admin/collegeName/:collegeName", getByCollegeName);




export default router;
