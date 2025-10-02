import express from 'express';
import protectRoute from '../middleware/protectRoute.js';

// Import Controllers
import { signup, login, logout, getUser, refreshToken } from '../controllers/auth.controllers.js';

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", protectRoute, logout);
router.get("/getUser", protectRoute, getUser);
router.post("/refresh-token", refreshToken);

export default router;