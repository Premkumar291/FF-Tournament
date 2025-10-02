import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

const protectRoute = async (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies.jwt;
    
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized - No token provided" });
    }

    // Verify access token
    const decoded = jwt.verify(token, process.env.ACCESS_KEY);

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid token" });
    }

    // Find user and exclude password
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorized - User not found" });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Unauthorized - Token expired" });
    }
    console.log(`Error in protectRoute middleware : ${error.message}`);
    return res.status(500).json({ message: `Internal Server Error` });
  }
};

export default protectRoute;