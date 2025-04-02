import express from 'express';
import { createIssue, getIssues, updateIssueStatus } from '../Controllers/issueController.js';
import { protect } from '../Middleware/authMiddleware.js';

const router = express.Router();

// Create a new issue (protected route)
router.post('/', protect, createIssue);

// Get all issues (protected route)
router.get('/', protect, getIssues);

// Update issue status (protected route)
router.put('/:id', protect, updateIssueStatus);

export default router;