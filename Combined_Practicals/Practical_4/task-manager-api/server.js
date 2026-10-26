const express = require("express");

const app = express();
const PORT = 5000;

// Parse JSON body
app.use(express.json());

// ----------------------
// Global Logging Middleware
// ----------------------
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl} - ${new Date().toISOString()}`);
    next();
});

// ----------------------
// Content-Type Middleware
// ----------------------
app.use((req, res, next) => {
    if (
        (req.method === "POST" || req.method === "PUT") &&
        !req.is("application/json")
    ) {
        return res.status(400).json({
            success: false,
            message: "Content-Type must be application/json"
        });
    }
    next();
});

// ----------------------
// In-Memory Data
// ----------------------
let tasks = [
    {
        id: 1,
        title: "Complete Express Practical",
        completed: false
    }
];

// ----------------------
// Route-Specific Middleware
// ----------------------
function validateTaskId(req, res, next) {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({
            success: false,
            message: "Invalid Task ID"
        });
    }

    req.taskId = id;
    next();
}

// ----------------------
// GET All Tasks
// ----------------------
app.get("/tasks", (req, res) => {
    res.status(200).json({
        success: true,
        tasks
    });
});

// ----------------------
// CREATE Task
// ----------------------
app.post("/tasks", (req, res, next) => {
    try {
        const { title, completed } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Task title is required"
            });
        }

        const task = {
            id: tasks.length + 1,
            title,
            completed: completed || false
        };

        tasks.push(task);

        res.status(201).json({
            success: true,
            task
        });

    } catch (err) {
        next(err);
    }
});

// ----------------------
// UPDATE Task
// ----------------------
app.put("/tasks/:id", validateTaskId, (req, res, next) => {
    try {
        const task = tasks.find(t => t.id === req.taskId);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        const { title, completed } = req.body;

        if (title !== undefined)
            task.title = title;

        if (completed !== undefined)
            task.completed = completed;

        res.status(200).json({
            success: true,
            task
        });

    } catch (err) {
        next(err);
    }
});

// ----------------------
// DELETE Task
// ----------------------
app.delete("/tasks/:id", validateTaskId, (req, res, next) => {
    try {
        const index = tasks.findIndex(t => t.id === req.taskId);

        if (index === -1) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        const deletedTask = tasks.splice(index, 1);

        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
            task: deletedTask[0]
        });

    } catch (err) {
        next(err);
    }
});

// ----------------------
// 404 Handler
// ----------------------
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});

// ----------------------
// Global Error Handler
// ----------------------
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        success: false,
        message: "Something went wrong"
    });
});

// ----------------------
// Start Server
// ----------------------
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});