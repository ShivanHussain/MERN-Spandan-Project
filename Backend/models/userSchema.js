import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({


    fullName:{
        type: String,
        required: [true,"Name is Required"]
    },
    rollNo:{
        type: String,
        required: [true,"Roll Number is Required"]
    },
    phone:{
        type: String,
        required: [true,"Phone Number is Required"]
    },
    batch:{
        type: String,
        required: [true,"Batch is Required"]
    },
    branch:{
        type: String,
        required: [true,"Branch is Required"]
    },
    course:{
        type: String,
        required: [true,"Course is Required"]
    },
    password:{
        type: String,
        required: [true,"Password is Required"],
        minLength: [8,"Password must contain atleast 8 characters:"],
        select: false
    },
    gender:{
        type: String,
        required: [true,"Gender is Required"]
    },
    email:{
        type: String,
        unique: true,
        required: [true,"Email is Required"]
    },
    collegeName:{
        type: String,
        required: [true,"College Name is Required"]
    },
    pid:{
        type: String,
        required: [true ,"Pid is required"]
    }
});


//for hash the password
userSchema.pre("save",async function(next){    
    if(!this.isModified("password")){
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    
});



//comparing password with hash password
userSchema.methods.comparePassword = async function (enteredPassword){  
    return await bcrypt.compare(enteredPassword, this.password);
};


//generating the webtoken 
userSchema.methods.generatejsonWebToken = function (){  
    return jwt.sign({id: this._id}, process.env.SECRET_KEY,{ expiresIn: process.env.JWT_EXPIRES})
};


export const User = mongoose.model("User", userSchema);