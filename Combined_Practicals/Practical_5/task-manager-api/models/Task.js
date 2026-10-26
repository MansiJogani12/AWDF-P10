const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Task title is required"]
    },

    description: {
        type: String
    },

    completed: {
        type: Boolean,
        default: false
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    priority: {
        type: String,
        enum: {
            values: ["low", "medium", "high"],
            message: "Priority must be low, medium, or high"
        },
        default: "medium"
    }
});

// Pre-save hook
taskSchema.pre("save", async function () {
    if (this.title) {
        this.title = this.title.trim();
    }
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;