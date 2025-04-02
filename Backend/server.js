import express from "express"
import dotenv from "dotenv"
import colors from "colors"
import cors from "cors"
import connectDB from "./Config/db.js"
import authRoutes from "./Routes/authRoutes.js"
import issueRoutes from './Routes/issueRoutes.js';
import inventoryRoutes from './Routes/inventoryRoutes.js';
import studentRoutes from './Routes/studentRoutes.js';
import userRoutes from './Routes/userRoutes.js';
import dashboardRoutes from './Routes/dashboardRoutes.js';

dotenv.config();

//Connec to MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(express.json())

// Routes
app.use("/api/auth", authRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/issues', issueRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/dashboard', dashboardRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);;
})
