import express from 'express';
import { getUserProfile, updateUserProfile } from '../Controllers/userController.js';
import { protect } from '../Middleware/authMiddleware.js';

const router = express.Router();

// Get user profile
router.get('/profile', protect, getUserProfile);

// Update user profile
router.put('/profile', protect, updateUserProfile);

export default router;