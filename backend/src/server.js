// Load environment variables from .env file
require("dotenv").config();

// Import required packages
const express = require('express');
const connect = require('./Config/db');
const cors = require('cors');
const { UserRoutes } = require("./routes/UserRoutes");
const { ProjectRouter } = require("./routes/ProjectRoutes");

// Set port number
const PORT = process.env.PORT || 8080;

// Create an instance of express
const app = express();


// Enable CORS for all origins
app.use(cors({ origin: true, credentials: true }));

// Parse JSON request bodies
app.use(express.json());

// Routes
app.use('/user', UserRoutes);
app.use('/project', ProjectRouter);

// Connect to database and start server
app.listen(PORT || 8080, async () => {
  await connect();
  console.log(`running at http://localhost:${PORT}`);
});
