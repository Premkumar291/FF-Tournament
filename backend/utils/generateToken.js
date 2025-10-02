import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

const generateToken = async (userId, res) => {
    try {
        const accessToken = jwt.sign({ userId }, process.env.ACCESS_KEY, { expiresIn: '60m' });
        const refreshToken = jwt.sign({ userId }, process.env.REFRESH_KEY, { expiresIn: '15d' });

        // Save refresh token to user document
        await User.findByIdAndUpdate(userId, { refreshToken });

        // Send access token in cookie
        res.cookie("jwt", accessToken, {
            maxAge: 60 * 60 * 1000, // 1 hour
            httpOnly: true,
            sameSite: "Strict",
            secure: process.env.NODE_ENV !== "development"
        });

        // Return refresh token to be sent in response
        return refreshToken;
    } catch (error) {
        console.error("Error generating tokens:", error);
        throw new Error("Token generation failed");
    }
};

export default generateToken;