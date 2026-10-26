const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const Task = require("./models/Task");

const app = express();
const PORT = process.env.PORT || 5000;

// JSON middleware
app.use(express.json());

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((err) => {
        console.error("MongoDB connection error:", err);
    });

// Logging Middleware
app.use((req, res, next) => {
    console.log(
        `${req.method} ${req.originalUrl} - ${new Date().toISOString()}`
    );
    next();
});

// Content-Type Middleware
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

// Home Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Task Manager API is running"
    });
});

// GET all tasks
app.get("/tasks", async (req, res, next) => {
    try {
        const tasks = await Task.find();

        res.status(200).json({
            success: true,
            tasks: tasks
        });
    } catch (err) {
        next(err);
    }
});

// GET task by ID
app.get("/tasks/:id", async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            task: task
        });
    } catch (err) {
        if (err.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid Task ID"
            });
        }

        next(err);
    }
});

// CREATE task
app.post("/tasks", async (req, res, next) => {
    try {
        const task = await Task.create(req.body);

        res.status(201).json({
            success: true,
            task: task
        });
    } catch (err) {
        next(err);
    }
});

// UPDATE task
app.put("/tasks/:id", async (req, res, next) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            task: task
        });
    } catch (err) {
        if (err.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid Task ID"
            });
        }

        next(err);
    }
});

// DELETE task
app.delete("/tasks/:id", async (req, res, next) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
            task: task
        });
    } catch (err) {
        if (err.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid Task ID"
            });
        }

        next(err);
    }
});

// 404 Route Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err);

    // Mongoose validation error
    if (err.name === "ValidationError") {
        const errors = {};

        for (const field in err.errors) {
            errors[field] = err.errors[field].message;
        }

        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: errors
        });
    }

    // Other errors
    res.status(500).json({
        success: false,
        message: "Something went wrong"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});