import { 
  findUserById, 
  updateUserProfile, 
  updateUserPassword,
  findUserByUserName
} from "../services/user.service.js";

/**
 * Get user profile
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const getUserProfile = async (req, res) => {
  try {
    const user = await findUserById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(`Error in getUserProfile controller: ${error.message}`);
    res.status(500).json({ message: `Internal Server Error: ${error.message}` });
  }
};

/**
 * Update user profile
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const updateUserProfileController = async (req, res) => {
  try {
    console.log("Received profile update request:", req.body);
    console.log("User ID:", req.user._id);
    
    const { fullName, bio, profileImage, coverImage, freeFireUID } = req.body;
    
    // Prepare update data - always set region to "India"
    const updateData = {
      region: "India" // Always set region to India
    };
    
    // Add other fields if provided (but exclude email and username)
    if (fullName !== undefined) updateData.fullName = fullName;
    if (bio !== undefined) updateData.bio = bio;
    if (profileImage) updateData.profileImage = profileImage;
    if (coverImage) updateData.coverImage = coverImage;
    if (freeFireUID) updateData.freeFireUID = freeFireUID;
    
    console.log("Update data:", updateData);
    
    const updatedUser = await updateUserProfile(req.user._id, updateData);
    
    console.log("Updated user:", updatedUser);
    
    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser
    });
  } catch (error) {
    console.log(`Error in updateUserProfileController: ${error.message}`);
    res.status(500).json({ message: `Internal Server Error: ${error.message}` });
  }
};

/**
 * Update user password
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
export const updateUserPasswordController = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }
    
    if (newPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }
    
    const success = await updateUserPassword(req.user._id, currentPassword, newPassword);
    
    if (success) {
      res.status(200).json({ message: "Password updated successfully" });
    }
  } catch (error) {
    console.log(`Error in updateUserPasswordController: ${error.message}`);
    res.status(500).json({ message: `Internal Server Error: ${error.message}` });
  }
};