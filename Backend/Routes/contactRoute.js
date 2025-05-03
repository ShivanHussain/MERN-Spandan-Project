import express from 'express';
import { registered } from '../controller/contactController.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.post("/contact",isAuthenticated,registered);

export default router;