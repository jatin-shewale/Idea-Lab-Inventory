import mongoose from 'mongoose';

const issueSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: [true, 'Please provide the student name'],
    },
    studentId: {
      type: String,
      required: [true, 'Please provide the student ID'],
    },
    department: {
      type: String,
      required: [true, 'Please specify the department'],
    },
    componentId: {
      type: String,
      required: [true, 'Please provide the component ID'],
    },
    quantity: {
      type: Number,
      required: [true, 'Please specify the quantity'],
      min: [1, 'Quantity must be at least 1'],
    },
    issueDate: {
      type: Date,
      required: [true, 'Please specify the issue date'],
    },
    expectedReturnDate: {
      type: Date,
      required: [true, 'Please specify the expected return date'],
    },
    purpose: {
      type: String,
      required: [true, 'Please specify the purpose of the issue'],
    },
    status: {
      type: String,
      enum: ['issued', 'returned', 'pending'], // Status of the issue
      default: 'issued',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the user who issued the component
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

const Issue = mongoose.model('Issue', issueSchema);

export default Issue;