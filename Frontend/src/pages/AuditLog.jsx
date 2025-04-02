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

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  const fetchAuditLogs = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/api/issues', {
        params: {
          status: selectedStatus === 'all' ? undefined : selectedStatus,
        },
      });
      setAuditLogs(Array.isArray(response.data.issues) ? response.data.issues : []);
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
      await axiosInstance.put(`/api/issues/${issueId}`, { status: 'returned' }); // Use axiosInstance
      toast.success('Component marked as returned');
      fetchAuditLogs(); // Re-fetch the updated audit logs
    } catch (error) {
      console.error('Error updating issue status:', error);
      toast.error('Failed to update status');
    }
  };

  const filteredLogs = Array.isArray(auditLogs) ? auditLogs.filter(log => {
    if (selectedStatus === 'all') return true;
    return log.status === selectedStatus;
  }) : [];

  // Calculate status distribution for pie chart
  const statusDistribution = {
    issued: Array.isArray(auditLogs) ? auditLogs.filter(log => log.status === 'issued').length : 0,
    returned: Array.isArray(auditLogs) ? auditLogs.filter(log => log.status === 'returned').length : 0
  };

  // Calculate monthly usage statistics
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
        departments: []
      };
    }

    const totalIssues = auditLogs.length;
    const pendingIssues = auditLogs.filter(log => log.status === 'issued').length;
    const returnedIssues = auditLogs.filter(log => log.status === 'returned').length;
    const totalComponents = auditLogs.reduce((sum, log) => sum + (log.quantity || 0), 0);
    const departments = [...new Set(auditLogs.map(log => log.department).filter(Boolean))];
    
    return {
      totalIssues,
      pendingIssues,
      returnedIssues,
      totalComponents,
      departmentCount: departments.length,
      departments
    };
  };

  const monthlyUsage = getMonthlyUsage();
  const stats = calculateStats();

  const pieChartData = {
    labels: ['Pending', 'Returned'],
    datasets: [
      {
        data: [statusDistribution.issued, statusDistribution.returned],
        backgroundColor: [
          'rgba(234, 179, 8, 0.8)', // yellow for pending
          'rgba(34, 197, 94, 0.8)', // green for returned
        ],
        borderColor: [
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
        text: 'Component Status Distribution',
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
            <option value="issued">Pending</option>
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
        <h2 className="text-lg font-medium mb-4">Issue History</h2>
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
                <div key={log._id} className="border rounded-md p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-sm">{log.studentName}</div>
                      <div className="text-xs text-gray-500">{log.studentId} • {log.department} • Sem {log.semester}</div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      log.status === 'returned' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {log.status}
                    </span>
                  </div>
                  <div className="mt-2 text-sm">
                    <div className="font-medium">{log.componentName}</div>
                    <div className="text-xs text-gray-500">ID: {log.componentId} • Qty: {log.quantity}</div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    <div>Issue: {new Date(log.issueDate).toLocaleDateString()}</div>
                    <div>Return: {new Date(log.expectedReturnDate).toLocaleDateString()}</div>
                    <div>Faculty: {log.facultyIncharge}</div>
                  </div>
                  {log.status === 'issued' && (
                    <div className="mt-3 flex justify-end">
                      <button
                        onClick={() => handleMarkReturned(log._id)}
                        className="bg-green-600 text-white py-1 px-3 rounded-md hover:bg-green-700 focus:outline-none focus:ring-1 focus:ring-green-500 focus:ring-offset-1 text-xs font-medium"
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