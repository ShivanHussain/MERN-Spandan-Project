// import { User } from "../models/userSchema.js";
// import { catchAsyncError } from "./catchAsyncError.js";
// import errorHandler from "./error.js";
// import jwt from 'jsonwebtoken';


// export const isAuthenticated = catchAsyncError(async(req, res, next)=>{
//     const { token } = req.cookies;

//     if(!token){
//         return next(new errorHandler("User Not Authenticated!",400));
//     }

//     const decoded = jwt.verify(token, process.env.SECRET_KEY);

//     req.User = await User.findById(decoded.id);
//     next();
// });
import jwt from "jsonwebtoken";
import ErrorHandler  from "./error.js";
import { User } from "../models/userSchema.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    let token = null;

    // Try getting token from cookies
    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }
    // Try getting token from Authorization header
    else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(new ErrorHandler("User Not Authenticated!", 401)); // use 401 (Unauthorized)
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid/Expired token", 401));
  }
};
