import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { allEvent, registered } from "../controller/eventController.js";

const router = express.Router();

router.post("/registered",isAuthenticated,registered);
router.get("/allEvent",isAuthenticated,allEvent);


export default router;