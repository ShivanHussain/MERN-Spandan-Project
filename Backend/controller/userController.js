import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { generateToken } from "../utils/jwtToken.js";
import { User } from "../models/userSchema.js";
import  generatePid  from "../utils/generatePid.js";
import { Pid } from "../models/pidSchema.js";
import { sendEmail } from "../utils/sendEmail.js";
import errorHandler from '../middleware/error.js'
import jwt from 'jsonwebtoken';



//sign up user
export const signup = catchAsyncError(async (req, res, next) => {
  const {
    fullName,
    rollNo,
    phone,
    batch,
    branch,
    course,
    password,
    gender,
    email,
    collegeName,
  } = req.body;

  //Check for missing fields
  if (
    !fullName ||
    !rollNo ||
    !phone ||
    !batch ||
    !branch ||
    !course ||
    !password ||
    !gender ||
    !email ||
    !collegeName
  ) {
    return next(new errorHandler("All fields are mandatory", 400));
  }

  //Check if user already exists with this email
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new errorHandler("User already registered with this email", 400));
  }

   const duplicateRoll = await User.findOne({ rollNo });
  if (duplicateRoll) return next(new errorHandler("Roll Number already registered", 400));

   const duplicatePhone = await User.findOne({ phone });
  if (duplicatePhone) return next(new errorHandler("Phone number already registered", 400));

  //  Validate password
  if (password.length < 8) {
    return next(new errorHandler("Password must be at least 8 characters", 400));
  }

  //  Generate PID
  const pid = await generatePid();

  //  Create new user
  const newUser = await User.create({
    fullName,
    rollNo,
    phone,
    batch,
    branch,
    course,
    password, 
    gender,
    email,
    collegeName,
    pid,
  });

  generateToken(newUser, "User registered successfully", 201, res);
});




//login function
export const login = catchAsyncError(async (req, res, next) => {
  let { email, password } = req.body;

  // Trim input to avoid accidental white-space errors
  email = email?.trim();
  password = password?.trim();

  // Validate fields
  if (!email || !password) {
    return next(new errorHandler("Email and Password are required", 400));
  }

  // Find user by email and include password
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new errorHandler("Invalid credentials", 400)); // Don't reveal which part is wrong
  }

  // Compare password using model method
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new errorHandler("Invalid credentials", 400));
  }

  // Compose PID email
  const message = `Hi ${user.fullName},\n\nYour Event PID is: ${user.pid}\n\nKeep it safe and use it for all Spandan event registrations.\n\nRegards,\nSpandan Team`;

  try {
    // Send email
    await sendEmail({
      email: user.email,
      subject: "Your Spandan Event PID (P2025xxxxx)",
      message,
    });
  } catch (error) {
    console.log("pd",error);
    return next(new errorHandler("Failed to send PID email. Try again later.", 500));
  }

  //Login successful - generate JWT token
  generateToken(user, `Logged in successfully. PID ${user.pid} sent to ${user.email}`, 200, res);
});



// logout the user with cookie
export const logout = catchAsyncError(async(req, res, next)=>{ 
  const { token } = req.cookies;
  console.log("Token",token);
  if(!token){
        return next(new errorHandler("User Not Authenticated!",400));
  }
    
  const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.User = await User.findById(decoded.id);
    res.status(200).cookie("token","",{
        expires:new Date(Date.now()),
        httpOnly: true,
    }).json({
        success: true,
        message: "Logged out successfully"
    });

});

//get all data by CollegeName
export const getByCollegeName = async (req, res) => {
    try {
        const data = await User.find({ collegeName: req.params.collegeName });
        res.status(200).json({
          success: true,
          data});
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};


//Get ALL user
export const getALLUser = async (req, res) => {
  try {
      const data = await User.find();
      res.status(200).json(data);
  } catch (err) {
      res.status(500).json({ message: "Server Error", error: err.message });
  }
};

