const express = require("express");
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");
const validateTask = require("../middleware/validateTask");
const cache = require("../cache");

const router = express.Router();

// Apply JWT authentication middleware to all task routes (Practical 7)
router.use(authMiddleware);

// ==========================================
// CACHE STATISTICS (Practical 9)
// ==========================================
let cacheHits = 0;
let cacheMisses = 0;

// ==========================================
// CACHE DEBUG / METRICS ENDPOINT
// GET /tasks/cache/stats (Practical 9)
// ==========================================
router.get("/cache/stats", (req, res) => {
  const total = cacheHits + cacheMisses;
  const hitRatio = total > 0 ? ((cacheHits / total) * 100).toFixed(1) + "%" : "0%";
  res.status(200).json({
    cacheHits,
    cacheMisses,
    totalRequests: total,
    hitRatio,
    cachedKeys: cache.keys()
  });
});

// ==========================================
// GET ALL TASKS
// GET /tasks (Practical 4, 5, 6, 9)
// ==========================================
router.get("/", async (req, res) => {
  const startTime = Date.now();
  try {
    const cachedTasks = cache.get("all_tasks");

    // CACHE HIT (Practical 9)
    if (cachedTasks) {
      cacheHits++;
      const duration = Date.now() - startTime;
      res.setHeader("X-Cache", "HIT");
      res.setHeader("X-Response-Time", `${duration}ms`);
      console.log(`[Practical 9] CACHE HIT: /tasks (${duration}ms)`);
      return res.status(200).json(cachedTasks);
    }

    // CACHE MISS (Practical 9)
    cacheMisses++;
    console.log("[Practical 9] CACHE MISS: /tasks (Querying MongoDB)");

    const tasks = await Task.find().sort({ createdAt: -1 });

    // Store in-memory cache for 60 seconds (Practical 9)
    cache.set("all_tasks", tasks);

    const duration = Date.now() - startTime;
    res.setHeader("X-Cache", "MISS");
    res.setHeader("X-Response-Time", `${duration}ms`);

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch tasks",
      error: error.message
    });
  }
});

// ==========================================
// GET SINGLE TASK
// GET /tasks/:id (Practical 4, 5, 9)
// ==========================================
router.get("/:id", async (req, res) => {
  const startTime = Date.now();
  try {
    const cacheKey = `task_${req.params.id}`;
    const cachedTask = cache.get(cacheKey);

    if (cachedTask) {
      cacheHits++;
      const duration = Date.now() - startTime;
      res.setHeader("X-Cache", "HIT");
      res.setHeader("X-Response-Time", `${duration}ms`);
      console.log(`[Practical 9] CACHE HIT: ${cacheKey}`);
      return res.status(200).json(cachedTask);
    }

    cacheMisses++;
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    cache.set(cacheKey, task);
    const duration = Date.now() - startTime;
    res.setHeader("X-Cache", "MISS");
    res.setHeader("X-Response-Time", `${duration}ms`);

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch task",
      error: error.message
    });
  }
});

// ==========================================
// CREATE TASK
// POST /tasks (Practical 4, 5, 6, 7, 9)
// ==========================================
router.post("/", validateTask, async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    const task = await Task.create({
      title: title,
      description: description || "",
      completed: completed !== undefined ? completed : false
    });

    // CACHE INVALIDATION on Mutation (Practical 9)
    cache.del("all_tasks");
    console.log("[Practical 9] CACHE INVALIDATED: all_tasks after CREATE");

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create task",
      error: error.message
    });
  }
});

// ==========================================
// UPDATE TASK
// PUT /tasks/:id (Practical 4, 5, 6, 7, 9)
// ==========================================
router.put("/:id", validateTask, async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title: title,
        description: description || "",
        completed: completed !== undefined ? completed : false
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    // CACHE INVALIDATION on Mutation (Practical 9)
    cache.del("all_tasks");
    cache.del(`task_${req.params.id}`);
    console.log(`[Practical 9] CACHE INVALIDATED: all_tasks & task_${req.params.id} after UPDATE`);

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update task",
      error: error.message
    });
  }
});

// ==========================================
// DELETE TASK
// DELETE /tasks/:id (Practical 4, 5, 6, 7, 9)
// ==========================================
router.delete("/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    // CACHE INVALIDATION on Mutation (Practical 9)
    cache.del("all_tasks");
    cache.del(`task_${req.params.id}`);
    console.log(`[Practical 9] CACHE INVALIDATED: all_tasks & task_${req.params.id} after DELETE`);

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete task",
      error: error.message
    });
  }
});

module.exports = router;