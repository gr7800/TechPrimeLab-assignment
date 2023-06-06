const express = require("express");
const { ProjectModel } = require("../models/Project.Model");

const ProjectRouter = express.Router();

// Get all projects
ProjectRouter.get("/project", async (req, res) => {
  const search = req.query.search || ""; // Get the query parameter value
  const page = req.query.page || 1;
  const sort = req.query.sort || ""; // Get the sort query parameter value
  const ITEM_PER_PAGE = 7;
  let query = {};
  if (search !== "") {
    query.Status = { $regex: search, $options: "i" };
  }
  try {
    const skip = (page - 1) * ITEM_PER_PAGE;
    let count = await ProjectModel.countDocuments(query);

    let sortQuery = {};
    if (sort !== "") {
      const [field, order] = sort.split(":");
      sortQuery[field] = order === "asc" ? 1 : -1;
    }

    const projects = await ProjectModel.find(query)
      .sort(sortQuery)
      .limit(ITEM_PER_PAGE)
      .skip(skip);

    const pageCount = Math.ceil(count / ITEM_PER_PAGE);

    return res.status(200).json({
      projects,
      pagination: {
        count,
        pageCount,
      },
    });
  } catch (error) {
    return res.status(500).json({ error: "Unable to fetch projects" });
  }
});


// Create a new project
ProjectRouter.post("/project/create", async (req, res) => {
  try {
    const payload = req.body;
    const project = new ProjectModel(payload);
    await project.save();
    res.json({ message: "Project created successfully" });
    console.log(res)
  } catch (error) {
    console.log(error)
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
  console.log(req.params.id);
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
ProjectRouter.get("/projectinfo", async (req, res) => {
  try {
    const totalCount = await ProjectModel.countDocuments();
    const canceledCount = await ProjectModel.countDocuments({ Status: 'Cancelled' });
    const runningCount = await ProjectModel.countDocuments({ Status: 'Running' });
    const closedCount = await ProjectModel.countDocuments({ Status: 'Closed' });
    const registeredCount = await ProjectModel.countDocuments({ Status: 'Registered' });
    const currentDate = new Date();
    const delayedRunningCount = await ProjectModel.countDocuments({
      Status: 'Running',
      Enddate: { $lt: currentDate },
    });
    return res.status(200).json({
      total: totalCount,
      cancel: canceledCount,
      running: runningCount,
      registered: registeredCount,
      closed: closedCount,
      delayedRunning: delayedRunningCount,
    });
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch total projects" });
  }
});

ProjectRouter.get("/dashboardchart", async (req, res) => {
  try {
    const pipeline = [
      {
        $group: {
          _id: "$Department",
          registeredCount: { $sum: 1 },
          closedCount: { $sum: { $cond: [{ $eq: ["$Status", "Closed"] }, 1, 0] } },
        },
      },
      {
        $project: {
          _id: 0,
          department: "$_id",
          registeredCount: 1,
          closedCount: 1,
          successPercentage: { $multiply: [{ $divide: ["$closedCount", "$registeredCount"] }, 100] },
        },
      },
    ];

    const departmentStats = await ProjectModel.aggregate(pipeline);

    return res.status(200).json(departmentStats);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch department stats" });
  }
});


// Helper function to update project status
async function updateProjectStatus(id, status) {
  return await ProjectModel.findByIdAndUpdate(id, { Status: status }, { new: true });
}

module.exports = { ProjectRouter };
