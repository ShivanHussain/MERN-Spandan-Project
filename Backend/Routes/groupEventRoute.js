import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { addParticipate, getAllGroupEvents, getByCollegeName, getByEventName, getByEventType, getByPID, getByTID, registered, updateGroupEventByPid } from "../controller/groupEventController.js";

const router = express.Router();

router.post("/participate/:id",isAuthenticated,registered);
router.post("/add/:id",isAuthenticated,addParticipate);
router.put("/admin/update/:tid",isAuthenticated,updateGroupEventByPid);
router.get("/admin/getall",isAuthenticated,getAllGroupEvents);


router.get("/admin/tid/:tid", getByTID);
router.get("/admin/pid/:pid", getByPID);
router.get("/admin/eventName/:eventName", getByEventName);
router.get("/admin/collegeName/:collegeName", getByCollegeName);
router.get("/admin/eventType/:eventType", getByEventType);


export default router;