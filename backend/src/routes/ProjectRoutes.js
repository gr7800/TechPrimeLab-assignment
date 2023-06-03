const express = require("express");
const { ProjectModel } = require("../models/Project.Model");

const ProjectRouter = express.Router();

// Get all projects
ProjectRouter.get("/project", async (req, res) => {
  try {
    const projects = await ProjectModel.find();
    res.send(projects);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch projects" });
  }
});

// Create a new project
ProjectRouter.post("/project/create", async (req, res) => {
  try {
    const payload = req.body;
    const project = new ProjectModel(payload);
    await project.save();
    res.json({ message: "Project created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Unable to create project" });
  }
});

// Update project status to "Running"
ProjectRouter.patch("/statusrun/:id", async (req, res) => {
  try {
    const updatedData = await updateProjectStatus(req.params.id, "Running");
    res.json(updatedData || { error: "Project not found" });
  } catch (error) {
    res.status(500).json({ error: "Unable to update project status" });
  }
});

// Update project status to "Closed"
ProjectRouter.patch("/statusclose/:id", async (req, res) => {
  try {
    const updatedData = await updateProjectStatus(req.params.id, "Closed");
    res.json(updatedData || { error: "Project not found" });
  } catch (error) {
    res.status(500).json({ error: "Unable to update project status" });
  }
});

// Update project status to "Cancelled"
ProjectRouter.patch("/statuscancel/:id", async (req, res) => {
  try {
    const updatedData = await updateProjectStatus(req.params.id, "Cancelled");
    res.json(updatedData || { error: "Project not found" });
  } catch (error) {
    res.status(500).json({ error: "Unable to update project status" });
  }
});

// Get total number of projects
ProjectRouter.get("/totalprojects", async (req, res) => {
  try {
    const totalCount = await ProjectModel.countDocuments();
    res.json({ totalProjects: totalCount });
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch total projects" });
  }
});

// Get number of canceled projects
ProjectRouter.get("/canceledproject", async (req, res) => {
  try {
    const canceledCount = await ProjectModel.countDocuments({ Status: "Cancelled" });
    res.json({ canceledProject: canceledCount });
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch canceled projects" });
  }
});

// Get number of running projects
ProjectRouter.get("/runningproject", async (req, res) => {
  try {
    const runningCount = await ProjectModel.countDocuments({ Status: "Running" });
    res.json({ runningProject: runningCount });
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch running projects" });
  }
});

// Get number of closed projects
ProjectRouter.get("/closedproject", async (req, res) => {
  try {
    const closedCount = await ProjectModel.countDocuments({ Status: "Closed" });
    res.json({ closedProject: closedCount });
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch closed projects" });
  }
});

// Get number of registered projects
ProjectRouter.get("/registeredproject", async (req, res) => {
  try {
    const registeredCount = await ProjectModel.countDocuments({ Status: "Registered" });
    res.json({ registeredProject: registeredCount });
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch registered projects" });
  }
});

// Helper function to update project status
async function updateProjectStatus(id, status) {
  return await ProjectModel.findByIdAndUpdate(id, { Status: status }, { new: true });
}

module.exports = { ProjectRouter };
