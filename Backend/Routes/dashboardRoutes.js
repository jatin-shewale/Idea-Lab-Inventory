import express from 'express';
import { getDashboardStats, getRecentRequests } from '../Controllers/dashboardController.js';
import { protect } from '../Middleware/authMiddleware.js';

const router = express.Router();

// Get dashboard statistics
router.get('/stats', protect, getDashboardStats);

// Get recent requests
router.get('/recent-requests', protect, getRecentRequests);

export default router;