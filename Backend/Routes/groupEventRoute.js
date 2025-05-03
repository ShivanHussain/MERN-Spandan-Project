import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { addParticipate, getAllGroupEvents, getByCollegeName, getByEventName, getByEventType, getByPID, getByTID, registered, updateGroupEventByPid } from "../controller/groupEventController.js";

const router = express.Router();

router.post("/participate/:id",registered);
router.post("/add/:id",addParticipate);
router.put("/admin/update/:tid",updateGroupEventByPid);
router.get("/admin/getall",getAllGroupEvents);


router.get("/admin/tid/:tid", getByTID);
router.get("/admin/pid/:pid", getByPID);
router.get("/admin/eventName/:eventName", getByEventName);
router.get("/admin/collegeName/:collegeName", getByCollegeName);
router.get("/admin/eventType/:eventType", getByEventType);


export default router;
