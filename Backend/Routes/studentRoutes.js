import express from 'express';
import Student from '../Models/Student.js';

const router = express.Router();

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new student (optional, for testing purposes)
router.post('/', async (req, res) => {
  const { studentName, studentId, department } = req.body;

  try {
    const newStudent = await Student.create({ studentName, studentId, department });
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;