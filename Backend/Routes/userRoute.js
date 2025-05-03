import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { signup ,login, logout, getByCollegeName, getALLUser} from "../controller/userController.js"

const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",isAuthenticatedUser,logout);
router.get("/admin/getall/:collegeName",getByCollegeName);
router.get("/admin/user/getall",getALLUser);


export default router;
