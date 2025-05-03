import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { allEvent, registered } from "../controller/eventController.js";

const router = express.Router();

router.post("/registered",registered);
router.get("/allEvent",allEvent);


export default router;
