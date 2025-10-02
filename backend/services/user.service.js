import User from "../models/user.models.js";
import bcrypt from "bcryptjs";

/**
 * User Service
 * Contains business logic for user-related operations
 */

/**
 * Create a new user
 * @param {Object} userData - User data including userName, email, password
 * @returns {Object} Created user object
 */
export const createUser = async (userData) => {
  try {
    const { userName, email, password } = userData;

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user with default region as India
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
      region: "India"
    });

    await newUser.save();
    return newUser;
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

/**
 * Find user by ID
 * @param {String} userId - User ID
 * @returns {Object} User object
 */
export const findUserById = async (userId) => {
  try {
    const user = await User.findById(userId).select("-password");
    return user;
  } catch (error) {
    throw new Error(`Error finding user by ID: ${error.message}`);
  }
};

/**
 * Find user by username
 * @param {String} userName - Username
 * @returns {Object} User object
 */
export const findUserByUserName = async (userName) => {
  try {
    const user = await User.findOne({ userName }).select("-password");
    return user;
  } catch (error) {
    throw new Error(`Error finding user by username: ${error.message}`);
  }
};

/**
 * Find user by email
 * @param {String} email - User email
 * @returns {Object} User object
 */
export const findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email }).select("-password");
    return user;
  } catch (error) {
    throw new Error(`Error finding user by email: ${error.message}`);
  }
};

/**
 * Update user profile
 * @param {String} userId - User ID
 * @param {Object} updateData - Data to update
 * @returns {Object} Updated user object
 */
export const updateUserProfile = async (userId, updateData) => {
  try {
    console.log("Updating user profile for ID:", userId);
    console.log("Update data:", updateData);
    
    // Ensure region is always set to "India"
    updateData.region = "India";
    
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true }
    ).select("-password");
    
    console.log("Updated user result:", user);
    
    return user;
  } catch (error) {
    console.log(`Error updating user profile: ${error.message}`);
    throw new Error(`Error updating user profile: ${error.message}`);
  }
};

/**
 * Update user password
 * @param {String} userId - User ID
 * @param {String} currentPassword - Current password
 * @param {String} newPassword - New password
 * @returns {Boolean} Success status
 */
export const updateUserPassword = async (userId, currentPassword, newPassword) => {
  try {
    const user = await User.findById(userId);
    
    if (!user) {
      throw new Error("User not found");
    }

    // Check if current password is correct
    const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordCorrect) {
      throw new Error("Current password is incorrect");
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    // Update password
    await User.findByIdAndUpdate(userId, { password: hashedPassword });
    
    return true;
  } catch (error) {
    throw new Error(`Error updating user password: ${error.message}`);
  }
};

/**
 * Delete user
 * @param {String} userId - User ID
 * @returns {Boolean} Success status
 */
export const deleteUser = async (userId) => {
  try {
    await User.findByIdAndDelete(userId);
    return true;
  } catch (error) {
    throw new Error(`Error deleting user: ${error.message}`);
  }
};

/**
 * Set password reset token
 * @param {String} email - User email
 * @param {String} token - Reset token
 * @param {Date} expiresAt - Token expiration date
 * @returns {Object} Updated user object
 */
export const setPasswordResetToken = async (email, token, expiresAt) => {
  try {
    const user = await User.findOneAndUpdate(
      { email },
      {
        resetPasswordToken: token,
        resetPasswordExpiresAt: expiresAt,
      },
      { new: true }
    );
    
    return user;
  } catch (error) {
    throw new Error(`Error setting password reset token: ${error.message}`);
  }
};

/**
 * Clear password reset token
 * @param {String} userId - User ID
 * @returns {Object} Updated user object
 */
export const clearPasswordResetToken = async (userId) => {
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        resetPasswordToken: undefined,
        resetPasswordExpiresAt: undefined,
      },
      { new: true }
    );
    
    return user;
  } catch (error) {
    throw new Error(`Error clearing password reset token: ${error.message}`);
  }
};

/**
 * Set email verification token
 * @param {String} email - User email
 * @param {String} token - Verification token
 * @param {Date} expiresAt - Token expiration date
 * @returns {Object} Updated user object
 */
export const setEmailVerificationToken = async (email, token, expiresAt) => {
  try {
    const user = await User.findOneAndUpdate(
      { email },
      {
        verificationToken: token,
        verificationTokenExpiresAt: expiresAt,
      },
      { new: true }
    );
    
    return user;
  } catch (error) {
    throw new Error(`Error setting email verification token: ${error.message}`);
  }
};

/**
 * Verify email
 * @param {String} userId - User ID
 * @returns {Object} Updated user object
 */
export const verifyEmail = async (userId) => {
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      {
        verificationToken: undefined,
        verificationTokenExpiresAt: undefined,
      },
      { new: true }
    );
    
    return user;
  } catch (error) {
    throw new Error(`Error verifying email: ${error.message}`);
  }
};

/**
 * Find user by reset password token
 * @param {String} token - Reset password token
 * @returns {Object} User object
 */
export const findUserByResetToken = async (token) => {
  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    }).select("-password");
    
    return user;
  } catch (error) {
    throw new Error(`Error finding user by reset token: ${error.message}`);
  }
};

/**
 * Find user by verification token
 * @param {String} token - Verification token
 * @returns {Object} User object
 */
export const findUserByVerificationToken = async (token) => {
  try {
    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpiresAt: { $gt: Date.now() },
    }).select("-password");
    
    return user;
  } catch (error) {
    throw new Error(`Error finding user by verification token: ${error.message}`);
  }
};