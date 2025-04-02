import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';
import toast from 'react-hot-toast';

const Issue = () => {
  const [components, setComponents] = useState([]);
  const [students, setStudents] = useState([]);
  const [issueHistory, setIssueHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    studentName: '',
    studentId: '',
    department: '',
    componentId: '',
    quantity: 1,
    issueDate: new Date().toISOString().split('T')[0],
    expectedReturnDate: '',
    purpose: ''
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Filter issue history based on search query
  const filteredIssueHistory = issueHistory.filter(issue => {
    const searchLower = searchQuery.toLowerCase();
    return (
      issue.studentName.toLowerCase().includes(searchLower) ||
      issue.studentId.toLowerCase().includes(searchLower) ||
      issue.department.toLowerCase().includes(searchLower) ||
      issue.componentId.toLowerCase().includes(searchLower)
    );
  });

  useEffect(() => {
    setLoading(true);
    fetchComponents();
    fetchStudents();
    fetchIssueHistory();
  }, []);

  const fetchComponents = async () => {
    try {
      const response = await axiosInstance.get('/api/inventory');
      setComponents(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching components:', error);
      toast.error('Failed to load components');
      setComponents([]);
    }
  };
  
  const fetchStudents = async () => {
    try {
      const response = await axiosInstance.get('/api/students');
      setStudents(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error('Failed to load students');
      setStudents([]);
    }
  };
  
  const fetchIssueHistory = async () => {
    try {
      const response = await axiosInstance.get('/api/issues');
      setIssueHistory(Array.isArray(response.data.issues) ? response.data.issues : []);
    } catch (error) {
      console.error('Error fetching issue history:', error);
      toast.error('Failed to load issue history');
      setIssueHistory([]);
    } finally {
      setLoading(false);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      // Find the selected component to get its _id
      const selectedComponent = components.find(comp => comp.componentId === formData.componentId);
      if (!selectedComponent) {
        toast.error('Selected component not found');
        return;
      }

      const issueData = {
        ...formData,
        componentId: selectedComponent._id // Use the component's _id instead of componentId
      };

      await axiosInstance.post('/api/issues', issueData);
      toast.success('Component issued successfully');
      setFormData({
        studentName: '',
        studentId: '',
        department: '',
        componentId: '',
        quantity: 1,
        issueDate: new Date().toISOString().split('T')[0],
        expectedReturnDate: '',
        purpose: '',
      });
      fetchIssueHistory();
    } catch (error) {
      console.error('Error issuing component:', error);
      toast.error('Failed to issue component');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Issue Components</h1>
      </div>
      
      {/* Issue Form */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-lg font-medium mb-4">New Issue</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Student Name</label>
              <input
                type="text"
                name="studentName"
                value={formData.studentName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter student name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Student ID</label>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter student ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="">Select Department</option>
                <option value="CSE">Computer Science</option>
                <option value="ECE">Electronics</option>
                <option value="ME">Mechanical</option>
                <option value="CE">Civil</option>
                <option value="IT">Information Technology</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Component ID</label>
              <input
                type="text"
                name="componentId"
                value={formData.componentId}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter component ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                min="1"
                required
                className="w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter quantity"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Issue Date</label>
              <input
                type="date"
                name="issueDate"
                value={formData.issueDate}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
              <input
                type="date"
                name="expectedReturnDate"
                value={formData.expectedReturnDate}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
            <textarea
              name="purpose"
              value={formData.purpose}
              onChange={handleInputChange}
              required
              rows="2"
              className="w-full px-4 py-2 text-base border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Enter purpose of issue"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-50 text-base font-medium"
            >
              {loading ? 'Issuing...' : 'Issue Component'}
            </button>
          </div>
        </form>
      </div>

      {/* Issue History */}
      <div className="bg-white rounded-lg shadow-sm p-5">
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
          ) : issueHistory.length === 0 ? (
            <div className="text-center py-4 text-gray-500 text-sm">
              No issue history found
            </div>
          ) : (
            <div className="space-y-3">
              {filteredIssueHistory.map((issue) => (
                <div key={issue._id} className="border rounded-md p-3 hover:bg-gray-50">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-sm">{issue.studentName}</div>
                      <div className="text-xs text-gray-500">{issue.studentId} • {issue.department}</div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      issue.status === 'issued' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {issue.status}
                    </span>
                  </div>
                  <div className="mt-2 text-sm">
                    <div className="font-medium">{issue.componentName}</div>
                    <div className="text-xs text-gray-500">ID: {issue.componentId} • Qty: {issue.quantity}</div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    <div>Issue: {new Date(issue.issueDate).toLocaleDateString()}</div>
                    <div>Return: {new Date(issue.expectedReturnDate).toLocaleDateString()}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Issue; 