import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: [true, 'Please provide the student name'],
  },
  studentId: {
    type: String,
    required: [true, 'Please provide the student ID'],
    unique: true,
  },
  department: {
    type: String,
    required: [true, 'Please provide the department'],
  },
});

const Student = mongoose.model('Student', studentSchema);

export default Student;