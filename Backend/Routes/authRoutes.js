import express from 'express';
import { registerUser, loginUser, getUserProfile } from '../Controllers/authController.js';
import { verifyToken } from '../Config/jwt.js';

const router = express.Router();

// Routes
router.post('/register', registerUser); // Register a new admin
router.post('/login', loginUser); // Login admin
router.get('/profile', verifyToken, getUserProfile); // Get logged-in admin profile

export default router;