# Idea Lab Inventory Management System

The Idea Lab Inventory Management System is a web-based application designed to streamline the management of inventory, components, and requests in an educational or organizational lab environment. It provides an intuitive interface for administrators to manage components, track issues, and monitor inventory levels efficiently.

## Features

### Backend
- **Authentication**: Secure login and registration for admin users using JWT.
- **Inventory Management**: Add, update, delete, and view inventory items.
- **Issue Management**: Issue components to students and track their return status.
- **Dashboard**: View key statistics such as total components, low stock items, and recent activity.
- **Audit Logs**: Track the history of issued and returned components.
- **Student Management**: Manage student details for component issuance.
- **Role-Based Access**: Admin-only access to critical features.

### Frontend
- **Responsive Design**: User-friendly interface optimized for both desktop and mobile devices.
- **Search and Filter**: Easily search and filter inventory and issue history.
- **Charts and Analytics**: Visualize data using charts for better insights.
- **Notifications**: Alerts for low stock items and pending returns.
- **Profile Management**: Update user profile and change passwords.

## Tech Stack

### Backend
- **Node.js**: Server-side runtime.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing inventory, users, and issue data.
- **Mongoose**: ODM for MongoDB.
- **JWT**: Secure authentication.
- **dotenv**: Environment variable management.

### Frontend
- **React**: Frontend library for building user interfaces.
- **Vite**: Fast development server and build tool.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Axios**: HTTP client for API requests.
- **Chart.js**: Data visualization library for charts.
