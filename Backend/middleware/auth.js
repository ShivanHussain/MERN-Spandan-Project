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




export const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
  let token;

  // ✅ Try to get token from cookies
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  // ✅ Or try to get token from Authorization header
  else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  // ❌ If no token, throw error
  if (!token) {
    console.log("❌ No token received in cookies or headers.");
    return next(new errorHandler("User Not Authenticated!", 400));
  }

  try {
    // ✅ Verify token
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    console.log("✅ Token verified. User ID:", decodedData.id);

    req.user = decodedData;
    next();
  } catch (error) {
    console.log("❌ Invalid or expired token:", error.message);
    return next(new errorHandler("Invalid or expired token!", 401));
  }
});

