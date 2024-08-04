import express from 'express'
import connectDB from './db.js';
import adminRoutes from './routes/admin.route.js'
import userRoutes from './routes/user.route.js'
const app = express();
import cors from 'cors'
app.use(cors());
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
