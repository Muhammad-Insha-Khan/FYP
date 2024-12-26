const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const buyerRoutes = require('./routes/buyerRoutes');
const sellerRoutes = require('./routes/sellerRoutes');
const errorHandler = require('./middleware/errorHandler');
const skillSwapperRoutes = require('./routes/skillSwapperRoutes');

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Buyer routes
app.use('/api/buyer', buyerRoutes);

// Seller routes

app.use('/api/seller', sellerRoutes);

//Swapper Routes

app.use('/api/skillswapper', skillSwapperRoutes);

app.use(errorHandler);

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
