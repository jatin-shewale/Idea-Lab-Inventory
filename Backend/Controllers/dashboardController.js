import Inventory from "../Models/Inventory.js";
import Request from "../Models/Request.js";
import Issue from "../Models/Issue.js";

// Fetch dashboard statistics
export const getDashboardStats = async (req, res) => {
  try {
    // Get total components count
    const totalComponents = await Inventory.countDocuments();

    // Get low stock components (quantity less than 5)
    const lowStockComponents = await Inventory.countDocuments({ quantity: { $lt: 5 } });

    // Get total issues count
    const totalIssues = await Issue.countDocuments();

    // Get pending issues count
    const pendingIssues = await Issue.countDocuments({ status: 'pending' });

    // Get returned issues count
    const returnedIssues = await Issue.countDocuments({ status: 'returned' });

    // Calculate total value of inventory
    const inventoryItems = await Inventory.find({}, 'quantity price');
    const totalValue = inventoryItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);

    // Get category distribution
    const categoryDistribution = await Inventory.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      }
    ]);

    // Convert category distribution to object format
    const categoryDistributionObj = categoryDistribution.reduce((acc, curr) => {
      acc[curr._id] = curr.count;
      return acc;
    }, {});

    // Get component quantities for bar chart
    const componentQuantities = await Inventory.find({}, 'componentName quantity')
      .sort({ quantity: -1 })
      .limit(10);

    // Get recent activity
    const recentActivity = await Issue.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('componentId', 'componentName')
      .lean();

    // Format recent activity
    const formattedActivity = recentActivity.map(activity => ({
      studentName: activity.studentName,
      componentId: activity.componentId,
      quantity: activity.quantity,
      status: activity.status,
      timestamp: new Date(activity.createdAt).toLocaleDateString()
    }));

    res.status(200).json({
      totalComponents,
      totalIssues,
      pendingIssues,
      returnedIssues,
      lowStockComponents,
      totalValue,
      categoryDistribution: categoryDistributionObj,
      componentQuantities: componentQuantities.map(item => ({
        name: item.componentName,
        quantity: item.quantity
      })),
      recentActivity: formattedActivity
    });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ message: 'Error fetching dashboard statistics' });
  }
};

// Fetch recent requests
export const getRecentRequests = async (req, res) => {
  try {
    const recentRequests = await Request.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("component", "componentName componentId")
      .populate("requester", "name email")
      .select("-__v");

    res.status(200).json(recentRequests);
  } catch (error) {
    console.error('Recent requests error:', error);
    res.status(500).json({ 
      message: 'Error fetching recent requests',
      error: error.message 
    });
  }
};
