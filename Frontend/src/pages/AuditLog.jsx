import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';
import toast from 'react-hot-toast';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const AuditLog = () => {
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  const fetchAuditLogs = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/api/issues');
      // Sort logs by timestamp in descending order (most recent first)
      const sortedLogs = Array.isArray(response.data.issues) 
        ? response.data.issues.sort((a, b) => new Date(b.timestamp || b.createdAt) - new Date(a.timestamp || a.createdAt))
        : [];
      setAuditLogs(sortedLogs);
    } catch (error) {
      console.error('Error fetching audit logs:', error);
      toast.error('Failed to load audit logs');
      setAuditLogs([]);
    } finally {
      setLoading(false);
    }
  };
  
  const handleMarkReturned = async (issueId) => {
    try {
      await axiosInstance.put(`/api/issues/${issueId}`, { status: 'returned' });
      toast.success('Component marked as returned');
      fetchAuditLogs();
    } catch (error) {
      console.error('Error updating issue status:', error);
      toast.error('Failed to update status');
    }
  };

  const filteredLogs = Array.isArray(auditLogs) ? auditLogs.filter(log => {
    // First check status filter
    if (selectedStatus !== 'all' && log.status !== selectedStatus) {
      return false;
    }

    // Then check search query if it exists
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      return (
        (log.studentName && log.studentName.toLowerCase().includes(searchLower)) || 
        (log.studentId && log.studentId.toLowerCase().includes(searchLower)) ||
        (log.department && log.department.toLowerCase().includes(searchLower)) ||
        (log.componentId && log.componentId.toLowerCase().includes(searchLower))
      );
    }

    return true;
  }) : [];

  // Calculate status distribution for pie chart
  const statusDistribution = {
    request: Array.isArray(auditLogs) ? auditLogs.filter(log => log.status === 'request').length : 0,
    pending: Array.isArray(auditLogs) ? auditLogs.filter(log => log.status === 'pending').length : 0,
    returned: Array.isArray(auditLogs) ? auditLogs.filter(log => log.status === 'returned').length : 0
  };

  const getMonthlyUsage = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentYear = new Date().getFullYear();
    const monthlyData = new Array(12).fill(0);

    if (Array.isArray(auditLogs)) {
      auditLogs.forEach(log => {
        const issueDate = new Date(log.issueDate);
        if (issueDate.getFullYear() === currentYear) {
          monthlyData[issueDate.getMonth()]++;
        }
      });
    }

    return {
      labels: months,
      data: monthlyData
    };
  };

  // Calculate key statistics
  const calculateStats = () => {
    if (!Array.isArray(auditLogs)) {
      return {
        totalIssues: 0,
        pendingIssues: 0,
        returnedIssues: 0,
        totalComponents: 0,
        departmentCount: 0,
        departments: [],
        categoryDistribution: {}
      };
    }

    const totalIssues = auditLogs.length;
    const pendingIssues = auditLogs.filter(log => log.status === 'pending').length;
    const returnedIssues = auditLogs.filter(log => log.status === 'returned').length;
    const totalComponents = auditLogs.reduce((sum, log) => sum + (log.quantity || 0), 0);
    const departments = [...new Set(auditLogs.map(log => log.department).filter(Boolean))];
    
    const categoryDistribution = auditLogs.reduce((acc, log) => {
      const category = log.category || 'Uncategorized';
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category]++;
      return acc;
    }, {});

    return {
      totalIssues,
      pendingIssues,
      returnedIssues,
      totalComponents,
      departmentCount: departments.length,
      departments,
      categoryDistribution
    };
  };

  const monthlyUsage = getMonthlyUsage();
  const stats = calculateStats();

  const pieChartData = {
    labels: ['Request', 'Pending', 'Returned'],
    datasets: [
      {
        data: [statusDistribution.request, statusDistribution.pending, statusDistribution.returned],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)', // blue for request
          'rgba(234, 179, 8, 0.8)', // yellow for pending
          'rgba(34, 197, 94, 0.8)', // green for returned
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(234, 179, 8, 1)',
          'rgba(34, 197, 94, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const barChartData = {
    labels: monthlyUsage.labels,
    datasets: [
      {
        label: 'Monthly Component Issues',
        data: monthlyUsage.data,
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'All-Time Component Status Distribution',
        font: {
          size: 16,
        },
      },
    },
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Monthly Component Usage',
        font: {
          size: 16,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  const categoryChartData = {
    labels: Object.keys(stats.categoryDistribution || {}),
    datasets: [
      {
        data: Object.values(stats.categoryDistribution || {}),
        backgroundColor: [
          'rgba(99, 102, 241, 0.8)',  // Indigo - for system actions
          'rgba(16, 185, 129, 0.8)',  // Emerald - for successful operations
          'rgba(245, 158, 11, 0.8)',  // Amber - for warnings
          'rgba(239, 68, 68, 0.8)',   // Red - for errors
          'rgba(139, 92, 246, 0.8)',  // Violet - for security events
          'rgba(14, 165, 233, 0.8)',  // Sky - for information
          'rgba(20, 184, 166, 0.8)',  // Teal - for updates
          'rgba(249, 115, 22, 0.8)',  // Orange - for modifications
        ],
        borderColor: [
          'rgba(99, 102, 241, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(139, 92, 246, 1)',
          'rgba(14, 165, 233, 1)',
          'rgba(20, 184, 166, 1)',
          'rgba(249, 115, 22, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Audit Log</h1>
        <div className="flex gap-2">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="request">Request</option>
            <option value="pending">Pending</option>
            <option value="returned">Returned</option>
          </select>
        </div>
      </div>

      {/* Status Distribution Chart */}
      <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
        <div className="max-w-md mx-auto">
          <Pie data={pieChartData} options={chartOptions} />
        </div>
      </div>

      {/* Monthly Usage Chart */}
      <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
        <div className="max-w-2xl mx-auto">
          <Bar data={barChartData} options={barChartOptions} />
        </div>
      </div>

      {/* Issue History */}
      <div className="bg-white rounded-lg shadow-sm p-5 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Issue History</h2>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search by student name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredLogs.length === 0 ? (
            <div className="text-center py-4 text-gray-500 text-sm">
              No audit logs found
            </div>
          ) : (
            <div className="space-y-3">
              {filteredLogs.map((log) => (
                <div key={log._id} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-gray-900">{log.studentName} ({log.studentId})</div>
                      <div className="text-sm text-gray-500 mt-1">
                        {log.department} • {new Date(log.issueDate).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Component: {log.componentId} • Quantity: {log.quantity}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        Purpose: {log.purpose}
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      log.status === 'returned' 
                        ? 'bg-green-100 text-green-800' 
                        : log.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {log.status}
                    </span>
                  </div>
                  {log.status === 'pending' && (
                    <div className="mt-3">
                      <button
                        onClick={() => handleMarkReturned(log._id)}
                        className="text-xs bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Mark as Returned
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Statistical Summary */}
      <div className="bg-white rounded-lg shadow-sm p-5">
        <h2 className="text-lg font-medium mb-4">Statistical Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-sm text-blue-600 font-medium">Total Issues</div>
            <div className="text-2xl font-semibold text-blue-800">{stats.totalIssues}</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="text-sm text-yellow-600 font-medium">Pending Returns</div>
            <div className="text-2xl font-semibold text-yellow-800">{stats.pendingIssues}</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-sm text-green-600 font-medium">Returned Components</div>
            <div className="text-2xl font-semibold text-green-800">{stats.returnedIssues}</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-sm text-purple-600 font-medium">Total Components</div>
            <div className="text-2xl font-semibold text-purple-800">{stats.totalComponents}</div>
          </div>
          <div className="bg-indigo-50 p-4 rounded-lg">
            <div className="text-sm text-indigo-600 font-medium">Departments</div>
            <div className="text-2xl font-semibold text-indigo-800">{stats.departmentCount}</div>
          </div>
          <div className="bg-pink-50 p-4 rounded-lg">
            <div className="text-sm text-pink-600 font-medium">Return Rate</div>
            <div className="text-2xl font-semibold text-pink-800">
              {stats.totalIssues ? Math.round((stats.returnedIssues / stats.totalIssues) * 100) : 0}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditLog; 