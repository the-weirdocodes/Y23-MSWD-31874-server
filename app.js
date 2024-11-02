const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const serverRoutes = require('./ServerRoutes'); // Import your routes
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
const connectToMongoDB = () => {
  try {
    mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
};

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

connectToMongoDB();

// Use the routes defined in ServerRoutes.js
app.use('/api', serverRoutes);