import Component from "../Models/Component.js";
import Request from "../Models/Request.js";

// Fetch dashboard statistics
export const getDashboardStats = async (req, res) => {
  try {
    const totalComponents = await Component.countDocuments();
    const lowStockItems = await Component.countDocuments({
      quantity: { $lt: 10 },
    });
    const pendingRequests = await Request.countDocuments({ status: "pending" });
    const recentActivity = await Request.countDocuments({
      createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
    });

    res.status(200).json({
      totalComponents,
      lowStockItems,
      pendingRequests,
      recentActivity,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch recent requests
export const getRecentRequests = async (req, res) => {
  try {
    const recentRequests = await Request.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("component", "name")
      .populate("requester", "name");

    res.status(200).json(recentRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
