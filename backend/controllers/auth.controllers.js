import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.models.js";
import { createUser, findUserByUserName, findUserByEmail } from "../services/user.service.js";
import generateToken from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    
    if (!userName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: "Please enter a valid email address" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email });
    const existingUserName = await User.findOne({ userName: userName });

    if (existingUser || existingUserName) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    // Create user without fullName
    const newUser = new User({
      userName,
      email,
      password: await bcrypt.hash(password, 10)
    });

    // Save the user
    await newUser.save();
    
    console.log("New user created:", newUser);

    // Generate tokens
    const refreshToken = await generateToken(newUser._id, res);
    
    res.status(201).json({ 
      message: "User registered successfully",
      refreshToken: refreshToken
    });
  } catch (error) {
    console.log(`Error in signup controller : ${error.message}`);
    res.status(500).json({ message: `Internal Server Error: ${error.message}` });
  }
};

export const login = async(req, res) => {
  try {
    const {userName, password} = req.body;

    if(!userName || !password){
        return res.status(400).json({message : "All fields are required"});
    }

    console.log("Login attempt with userName:", userName);
    
    // Search by username
    const user = await User.findOne({userName: userName});
    
    console.log("User found:", user);

    if(!user){
        return res.status(400).json({message : "User does not exist"});
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if(!isPasswordCorrect){
        return res.status(400).json({message : "Invalid credentials - wrong password"});
    }

    const refreshToken = await generateToken(user._id, res);

    res.status(200).json({ 
      message: "User logged in successfully",
      refreshToken: refreshToken
    });

  } catch (error) {
    console.log(`Error in login controller : ${error.message}`);
    res.status(500).json({ message: `Internal Server Error: ${error.message}` });
  }
};

export const logout = async(req, res) => {
  try {
    // Clear refresh token from database
    await User.findByIdAndUpdate(req.user._id, { refreshToken: "" });
    
    res.cookie("jwt", "", {maxAge : 0});
    res.status(200).json({message : "User logged out successfully"});
    
  } catch (error) {
   console.log(`Error in logout controller : ${error.message}`);
   res.status(500).json({ message: `Internal Server Error: ${error.message}` }); 
  }
};

export const getUser = async(req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if(!user){
            return res.status(404).json({message : "User not found"});
        }
        res.status(200).json(user);
        
    } catch (error) {
        console.log(`Error in getUser controller : ${error.message}`);
        res.status(500).json({ message: `Internal Server Error: ${error.message}` }); 
    }
};

// Refresh token endpoint
export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token is required" });
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_KEY);
    
    // Find user with this refresh token
    const user = await User.findById(decoded.userId);
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    // Generate new tokens
    const newAccessToken = jwt.sign({ userId: user._id }, process.env.ACCESS_KEY, { expiresIn: '60m' });
    const newRefreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_KEY, { expiresIn: '15d' });

    // Update refresh token in database
    user.refreshToken = newRefreshToken;
    await user.save();

    // Send new access token in cookie
    res.cookie("jwt", newAccessToken, {
      maxAge: 60 * 60 * 1000, // 1 hour
      httpOnly: true,
      sameSite: "Strict",
      secure: process.env.NODE_ENV !== "development"
    });

    res.status(200).json({ 
      message: "Token refreshed successfully",
      refreshToken: newRefreshToken
    });
  } catch (error) {
    console.log(`Error in refreshToken controller : ${error.message}`);
    res.status(500).json({ message: `Internal Server Error: ${error.message}` });
  }
};