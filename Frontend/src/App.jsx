import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Issue from './pages/Issue';
import AuditLog from './pages/AuditLog';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Toaster position="top-right" />
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Navigate to="/login" />} />

            {/* Protected Routes */}
            <Route
              path="/*"
              element={
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <div className="flex">
                      <div className="w-80 fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white shadow-sm">
                        <div className="flex flex-col h-full">
                          <div className="flex-1 p-6 overflow-y-auto">
                            <nav className="space-y-2">
                              <Link to="/dashboard" className="flex items-center px-4 py-3 text-gray-600 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-200">
                                <svg className="w-6 h-6 mr-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                <span className="font-medium">Dashboard</span>
                              </Link>
                              <hr className="border-gray-200 my-2" />
                              <Link to="/inventory" className="flex items-center px-4 py-3 text-gray-600 rounded-xl hover:bg-purple-50 hover:text-purple-600 transition-all duration-200">
                                <svg className="w-6 h-6 mr-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                                <span className="font-medium">Inventory</span>
                              </Link>
                              <hr className="border-gray-200 my-2" />
                              <Link to="/issue" className="flex items-center px-4 py-3 text-gray-600 rounded-xl hover:bg-green-50 hover:text-green-600 transition-all duration-200">
                                <svg className="w-6 h-6 mr-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                                <span className="font-medium">Issue</span>
                              </Link>
                              <hr className="border-gray-200 my-2" />
                              <Link to="/audit-log" className="flex items-center px-4 py-3 text-gray-600 rounded-xl hover:bg-orange-50 hover:text-orange-600 transition-all duration-200">
                                <svg className="w-6 h-6 mr-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="font-medium">Audit Log</span>
                              </Link>
                              <hr className="border-gray-200 my-2" />
                              <Link to="/profile" className="flex items-center px-4 py-3 text-gray-600 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200">
                                <svg className="w-6 h-6 mr-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span className="font-medium">Profile</span>
                              </Link>
                            </nav>
                          </div>
                          <div className="p-4 border-t border-gray-200">
                            <Link to="/login" className="flex items-center px-4 py-3 text-red-600 rounded-xl hover:bg-red-50 transition-all duration-200 group">
                              <svg className="w-6 h-6 mr-4 text-red-500 group-hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                              </svg>
                              <span className="font-medium">Sign out</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                      <main className="ml-80 flex-1 p-8 pt-24">
                        <Routes>
                          <Route path="/dashboard" element={<Dashboard />} />
                          <Route path="/inventory" element={<Inventory />} />
                          <Route path="/issue" element={<Issue />} />
                          <Route path="/audit-log" element={<AuditLog />} />
                          <Route path="/profile" element={<Profile />} />
                          <Route path="/" element={<Navigate to="/dashboard" />} />
                        </Routes>
                      </main>
                    </div>
                  </>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
