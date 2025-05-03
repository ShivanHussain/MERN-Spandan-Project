import { catchAsyncError } from "../middleware/catchAsyncError.js";
import errorHandler from "../middleware/error.js";
import { Contact } from "../models/contactSchema.js";


export const registered = catchAsyncError(async (req, res, next) => {
  let { name, email, message } = req.body;

  // Trim inputs
  name = name?.trim();
  email = email?.trim();
  message = message?.trim();

  //Validate required fields
  if (!name || !email || !message) {
    return next(new errorHandler("All fields are mandatory", 400));
  }

  // Validate email format (basic regex)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return next(new errorHandler("Invalid email format", 400));
  }

  // (Optional) Check for recent duplicate messages to prevent spam
  const recentContact = await Contact.findOne({ email, message });
  if (recentContact) {
    return next(new errorHandler("You've already sent this message recently", 400));
  }

  //Save contact message
  await Contact.create({ name, email, message });

  res.status(201).json({
    success: true,
    message: "Thank you for contacting us! We’ll get back to you shortly.",
  });
});
