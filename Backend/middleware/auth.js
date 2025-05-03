import { User } from "../models/userSchema.js";
import { catchAsyncError } from "./catchAsyncError.js";
import errorHandler from "./error.js";
import jwt from 'jsonwebtoken';


export const isAuthenticated = catchAsyncError(async(req, res, next)=>{
    const { token } = req.cookies;

    if(!token){
        return next(new errorHandler("User Not Authenticated!",400));
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.User = await User.findById(decoded.id);
    next();
});