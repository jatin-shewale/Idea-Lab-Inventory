import Issue from "../Models/Issue.js";
import Inventory from "../Models/Inventory.js";

// Create a new issue
export const createIssue = async (req, res) => {
  const {
    studentName,
    studentId,
    department,
    componentId,
    quantity,
    issueDate,
    expectedReturnDate,
    purpose,
  } = req.body;

  try {
    // Check if component exists and has sufficient quantity
    const inventoryItem = await Inventory.findById(componentId);
    if (!inventoryItem) {
      return res.status(404).json({ message: "Component not found" });
    }

    if (inventoryItem.quantity < quantity) {
      return res.status(400).json({ message: "Insufficient quantity available" });
    }

    // Create the issue
    const issue = await Issue.create({
      studentName,
      studentId,
      department,
      componentId: inventoryItem._id, // Use the component's _id
      quantity,
      issueDate,
      expectedReturnDate,
      purpose,
      status: "pending", // Set status to pending
      user: req.user._id, // Use the authenticated user's ID
    });

    // Update inventory quantity
    await Inventory.findByIdAndUpdate(
      inventoryItem._id,
      { $inc: { quantity: -quantity } }
    );

    res.status(201).json(issue);
  } catch (error) {
    console.error('Error creating issue:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get all issues
export const getIssues = async (req, res) => {
  try {
    const { status, studentId, page = 1, limit = 10 } = req.query;

    // Build a query object based on the provided filters
    const query = {};
    if (status) query.status = status;
    if (studentId) query.studentId = studentId;

    // Pagination logic
    const skip = (page - 1) * limit;
    const total = await Issue.countDocuments(query);
    const issues = await Issue.find(query)
      .populate("user", "name email")
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      issues,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update issue status
export const updateIssueStatus = async (req, res) => {
  const { status } = req.body;

  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    // Validate status
    if (!["issued", "returned"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    issue.status = status;
    await issue.save();

    res.status(200).json(issue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
