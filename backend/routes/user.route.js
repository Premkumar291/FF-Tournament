import express from 'express';
import protectRoute from '../middleware/protectRoute.js';

// Import Controllers
import { 
  getUserProfile, 
  updateUserProfileController, 
  updateUserPasswordController 
} from '../controllers/user.controller.js';

const router = express.Router();

// All routes are protected
router.get("/profile", protectRoute, getUserProfile);
router.put("/profile", protectRoute, updateUserProfileController);
router.put("/password", protectRoute, updateUserPasswordController);

export default router;