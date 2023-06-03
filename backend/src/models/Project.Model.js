const mongoose = require("mongoose");

// Define the project schema
const projectSchema = mongoose.Schema({
  Projecttheme: String,        // Theme of the project
  Reason: String,              // Reason for the project
  Type: String,                // Type of the project
  Division: String,            // Division associated with the project
  Category: String,            // Category of the project
  Priority: String,            // Priority of the project
  Department: String,          // Department responsible for the project
  Startdate: String,           // Start date of the project
  Enddate: String,             // End date of the project
  LocationL: String,           // Location of the project
  Status: {
    type: String,
    default: "Registered"      // Default status of the project is "Registered"
  }
});

// Create the project model using the schema
const ProjectModel = mongoose.model("project", projectSchema);

module.exports = { ProjectModel };
