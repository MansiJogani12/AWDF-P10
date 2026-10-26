import { useEffect, useState } from "react";
import {
  registerUser,
  loginUser,
  getCurrentUser,
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getCacheStats
} from "../api";
import Spinner from "../components/Spinner";

export default function TaskManager({ user, setUser }) {
  const [authMode, setAuthMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Tasks state
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);

  // Filter & Search
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Editing state
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");

  // Feedback messages
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Practical 9: In-Memory Cache Monitoring State
  const [cacheInfo, setCacheInfo] = useState({
    hit: false,
    header: "MISS",
    duration: "0ms"
  });
  const [cacheStats, setCacheStats] = useState(null);

  // Load user profile on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const loadUser = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data.user);
      } catch (err) {
        logout();
      }
    };
    loadUser();
  }, [setUser]);

  // Handle expired token
  useEffect(() => {
    const handleExpiredToken = () => {
      logout();
      setError("Your session expired. Please login again.");
    };
    window.addEventListener("auth-expired", handleExpiredToken);
    return () => window.removeEventListener("auth-expired", handleExpiredToken);
  }, []);

  // Load tasks and cache stats when user is authenticated
  useEffect(() => {
    if (user) {
      loadTasks();
      refreshCacheStats();
    }
  }, [user]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");
      const result = await getTasks();
      setTasks(result.tasks);
      setCacheInfo({
        hit: result.cacheHit,
        header: result.cacheHeader,
        duration: result.duration
      });
      await refreshCacheStats();
    } catch (err) {
      setError(err.message || "Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  const refreshCacheStats = async () => {
    try {
      const stats = await getCacheStats();
      setCacheStats(stats);
    } catch (err) {
      console.warn("Could not fetch cache stats:", err.message);
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setAuthLoading(true);
    try {
      if (authMode === "register") {
        await registerUser(email, password);
        setMessage("Registration successful! You can now log in.");
        setAuthMode("login");
        setPassword("");
      } else {
        const data = await loginUser(email, password);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        setMessage("Login successful!");
        setPassword("");
      }
    } catch (err) {
      setError(err.message || "Authentication failed");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!title.trim()) {
      setError("Task title is required.");
      return;
    }

    setCreating(true);
    try {
      const newTask = await createTask(title, description);
      setTasks((prev) => [newTask, ...prev]);
      setTitle("");
      setDescription("");
      setMessage("Task created successfully (In-Memory Cache automatically invalidated!)");
      await refreshCacheStats();
    } catch (err) {
      setError(err.message || "Failed to create task");
    } finally {
      setCreating(false);
    }
  };

  const handleToggleTask = async (task) => {
    setError("");
    try {
      const updated = await updateTask(task._id, {
        ...task,
        completed: !task.completed
      });
      setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
      setMessage(`Task status marked as ${updated.completed ? "Completed" : "Pending"}.`);
      await refreshCacheStats();
    } catch (err) {
      setError(err.message || "Failed to update task status");
    }
  };

  const startEditing = (task) => {
    setEditingTaskId(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const cancelEditing = () => {
    setEditingTaskId(null);
    setEditTitle("");
    setEditDescription("");
  };

  const handleSaveEdit = async (task) => {
    if (!editTitle.trim()) {
      setError("Task title cannot be empty.");
      return;
    }

    try {
      const updated = await updateTask(task._id, {
        title: editTitle,
        description: editDescription,
        completed: task.completed
      });
      setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
      setEditingTaskId(null);
      setMessage("Task updated successfully (Cache invalidated).");
      await refreshCacheStats();
    } catch (err) {
      setError(err.message || "Failed to update task");
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      setMessage("Task deleted successfully (Cache invalidated).");
      await refreshCacheStats();
    } catch (err) {
      setError(err.message || "Failed to delete task");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setTasks([]);
    setEmail("");
    setPassword("");
    setMessage("Logged out successfully.");
  };

  // Filtered tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          task.description.toLowerCase().includes(searchTerm.toLowerCase());
    if (statusFilter === "completed") return matchesSearch && task.completed;
    if (statusFilter === "pending") return matchesSearch && !task.completed;
    return matchesSearch;
  });

  // Not logged in view (Practical 7 Auth)
  if (!user) {
    return (
      <div className="container" style={{ maxWidth: "500px", margin: "40px auto" }}>
        <div className="auth-card" style={{ padding: "30px", borderRadius: "16px", border: "1px solid var(--card-border)" }}>
          <h2 style={{ marginBottom: "8px" }}>Task Management Authentication</h2>
          <p style={{ opacity: 0.8, fontSize: "0.95rem", marginBottom: "20px" }}>
            Practical 7: JWT-based Token Authentication with Bcrypt Password Hashing.
          </p>

          {message && <div className="success-message" style={{ marginBottom: "16px" }}>{message}</div>}
          {error && <div className="error" style={{ marginBottom: "16px" }}>{error}</div>}

          <form onSubmit={handleAuth} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter your password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={authLoading}
              className="send-btn"
              style={{ marginTop: "6px" }}
            >
              {authLoading ? "Authenticating..." : authMode === "login" ? "Login to Account" : "Register New Account"}
            </button>
          </form>

          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <button
              onClick={() => {
                setAuthMode(authMode === "login" ? "register" : "login");
                setError("");
                setMessage("");
              }}
              style={{ background: "transparent", border: "none", color: "var(--accent)", cursor: "pointer", fontWeight: 600 }}
            >
              {authMode === "login" ? "Don't have an account? Register" : "Already registered? Login"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Logged-in Task Manager Dashboard (Practicals 4, 5, 6, 7, 9)
  return (
    <div className="task-manager-view" style={{ maxWidth: "900px", margin: "auto" }}>
      {/* Header and User profile */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "12px",
        marginBottom: "20px",
        padding: "18px 24px",
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        borderRadius: "16px"
      }}>
        <div>
          <h2 style={{ fontSize: "1.6rem", margin: 0 }}>Full-Stack Task Manager</h2>
          <p style={{ margin: "4px 0 0", opacity: 0.85, fontSize: "0.9rem" }}>
            Active Session: <strong>{user.email}</strong> • Role: Authenticated User
          </p>
        </div>
        <button onClick={logout} className="logout-button" style={{ padding: "8px 16px" }}>
          Sign Out
        </button>
      </div>

      {/* Practical 9: In-Memory Cache Performance Monitor Widget */}
      <div style={{
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        borderRadius: "16px",
        padding: "20px",
        marginBottom: "24px"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px", marginBottom: "14px" }}>
          <div>
            <h3 style={{ margin: 0, fontSize: "1.15rem", display: "flex", alignItems: "center", gap: "8px" }}>
              ⚡ Practical 9: In-Memory Caching & Performance Monitor
            </h3>
            <p style={{ margin: "4px 0 0", opacity: 0.8, fontSize: "0.85rem" }}>
              Backend uses <code>node-cache</code>. Repeated GET requests hit cache instantly, mutations invalidate cache.
            </p>
          </div>
          <button
            onClick={loadTasks}
            className="theme-btn"
            style={{ padding: "6px 14px", fontSize: "0.85rem" }}
            title="Fetch tasks again to test Cache Hit vs Miss"
          >
            🔄 Refresh (Test Cache)
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "12px" }}>
          <div style={{ padding: "12px", borderRadius: "10px", background: "rgba(37,99,235,0.08)", border: "1px solid var(--card-border)", textAlign: "center" }}>
            <span style={{ fontSize: "0.75rem", opacity: 0.8, textTransform: "uppercase" }}>Last Request Status</span>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: "4px", color: cacheInfo.hit ? "#16a34a" : "#ea580c" }}>
              {cacheInfo.hit ? "🟢 CACHE HIT" : "🟠 DB QUERY (MISS)"}
            </div>
          </div>

          <div style={{ padding: "12px", borderRadius: "10px", background: "rgba(37,99,235,0.08)", border: "1px solid var(--card-border)", textAlign: "center" }}>
            <span style={{ fontSize: "0.75rem", opacity: 0.8, textTransform: "uppercase" }}>Response Time</span>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: "4px", color: "var(--accent)" }}>
              ⏱️ {cacheInfo.duration}
            </div>
          </div>

          <div style={{ padding: "12px", borderRadius: "10px", background: "rgba(37,99,235,0.08)", border: "1px solid var(--card-border)", textAlign: "center" }}>
            <span style={{ fontSize: "0.75rem", opacity: 0.8, textTransform: "uppercase" }}>Cache Hits / Misses</span>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: "4px" }}>
              🎯 {cacheStats ? `${cacheStats.cacheHits} / ${cacheStats.cacheMisses}` : "0 / 0"}
            </div>
          </div>

          <div style={{ padding: "12px", borderRadius: "10px", background: "rgba(37,99,235,0.08)", border: "1px solid var(--card-border)", textAlign: "center" }}>
            <span style={{ fontSize: "0.75rem", opacity: 0.8, textTransform: "uppercase" }}>Hit Ratio</span>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, marginTop: "4px" }}>
              📊 {cacheStats ? cacheStats.hitRatio : "0%"}
            </div>
          </div>
        </div>
      </div>

      {message && <div className="success-message" style={{ marginBottom: "16px" }}>{message}</div>}
      {error && <div className="error" style={{ marginBottom: "16px" }}>{error}</div>}

      {/* Practical 4 & 5: Add New Task Form */}
      <div className="task-form" style={{ borderRadius: "16px", border: "1px solid var(--card-border)", padding: "20px", marginBottom: "24px" }}>
        <h3 style={{ marginBottom: "14px", fontSize: "1.2rem" }}>➕ Add New Task (CRUD Operations)</h3>
        <form onSubmit={handleCreateTask} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <input
            type="text"
            placeholder="Enter task title (required)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Enter task description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
          <div>
            <button type="submit" disabled={creating} className="send-btn" style={{ width: "auto", padding: "10px 24px" }}>
              {creating ? "Adding Task..." : "Create Task"}
            </button>
          </div>
        </form>
      </div>

      {/* Task List Controls */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>
        <h3 style={{ margin: 0, fontSize: "1.3rem" }}>
          Tasks ({filteredTasks.length} of {tasks.length})
        </h3>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid var(--card-border)", fontSize: "0.9rem" }}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ padding: "8px 12px", borderRadius: "8px", border: "1px solid var(--card-border)", background: "var(--card-bg)", color: "inherit", fontSize: "0.9rem" }}
          >
            <option value="all">All Tasks</option>
            <option value="pending">Pending Only</option>
            <option value="completed">Completed Only</option>
          </select>
        </div>
      </div>

      {/* Task List */}
      {loading ? (
        <Spinner message="Fetching tasks from server..." />
      ) : filteredTasks.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", background: "var(--card-bg)", borderRadius: "16px", border: "1px solid var(--card-border)" }}>
          <p style={{ opacity: 0.8, fontSize: "1.1rem" }}>No matching tasks found.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {filteredTasks.map((task) => (
            <div
              key={task._id}
              className="task-card"
              style={{
                borderRadius: "14px",
                border: "1px solid var(--card-border)",
                borderLeft: task.completed ? "6px solid #16a34a" : "6px solid #eab308",
                padding: "18px"
              }}
            >
              {editingTaskId === task._id ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    style={{ padding: "10px", borderRadius: "8px", border: "1px solid var(--card-border)" }}
                  />
                  <textarea
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    rows={2}
                    style={{ padding: "10px", borderRadius: "8px", border: "1px solid var(--card-border)" }}
                  />
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button onClick={() => handleSaveEdit(task)} className="send-btn" style={{ width: "auto", padding: "8px 18px" }}>
                      Save Changes
                    </button>
                    <button onClick={cancelEditing} className="help-btn" style={{ width: "auto", padding: "8px 18px", background: "#6b7280" }}>
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "14px" }}>
                  <div style={{ flex: 1, minWidth: "240px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                      <h4 style={{ margin: 0, fontSize: "1.15rem", textDecoration: task.completed ? "line-through" : "none" }}>
                        {task.title}
                      </h4>
                      <span style={{
                        fontSize: "0.75rem",
                        padding: "2px 8px",
                        borderRadius: "10px",
                        background: task.completed ? "rgba(22, 163, 74, 0.15)" : "rgba(234, 179, 8, 0.15)",
                        color: task.completed ? "#16a34a" : "#ca8a04",
                        fontWeight: 600
                      }}>
                        {task.completed ? "Completed" : "Pending"}
                      </span>
                    </div>
                    {task.description && (
                      <p style={{ margin: "4px 0 0", opacity: 0.85, fontSize: "0.95rem", lineHeight: "1.5" }}>
                        {task.description}
                      </p>
                    )}
                  </div>

                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <button
                      onClick={() => handleToggleTask(task)}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "8px",
                        border: "none",
                        cursor: "pointer",
                        fontWeight: 600,
                        fontSize: "0.85rem",
                        background: task.completed ? "#eab308" : "#16a34a",
                        color: "white"
                      }}
                    >
                      {task.completed ? "Mark Pending" : "Mark Done"}
                    </button>
                    <button
                      onClick={() => startEditing(task)}
                      style={{
                        padding: "6px 12px",
                        borderRadius: "8px",
                        border: "1px solid var(--card-border)",
                        cursor: "pointer",
                        background: "var(--card-bg)",
                        color: "inherit",
                        fontSize: "0.85rem"
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task._id)}
                      className="delete-button"
                      style={{
                        padding: "6px 12px",
                        borderRadius: "8px",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "0.85rem"
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
