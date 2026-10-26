const BASE_URL = "http://localhost:5000";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
};

const handleResponse = async (response) => {
  let data;
  try {
    data = await response.json();
  } catch (error) {
    data = { message: "Invalid server response" };
  }

  if (response.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("auth-expired"));
  }

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
};

// ==========================================
// AUTH API (Practical 7)
// ==========================================
export const registerUser = async (email, password) => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(response);
};

export const loginUser = async (email, password) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(response);
};

export const getCurrentUser = async () => {
  const response = await fetch(`${BASE_URL}/auth/me`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

// ==========================================
// TASKS API (Practical 4, 5, 6, 9)
// ==========================================
export const getTasks = async () => {
  const startTime = performance.now();
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  const clientDuration = Math.round(performance.now() - startTime);

  const data = await handleResponse(response);
  const cacheHeader = response.headers.get("X-Cache") || "MISS";
  const serverDuration = response.headers.get("X-Response-Time") || `${clientDuration}ms`;

  return {
    tasks: Array.isArray(data) ? data : (data.tasks || []),
    cacheHit: cacheHeader === "HIT",
    cacheHeader,
    duration: serverDuration,
    clientDuration: `${clientDuration}ms`
  };
};

export const createTask = async (title, description) => {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ title, description, completed: false }),
  });
  return handleResponse(response);
};

export const updateTask = async (id, task) => {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify({
      title: task.title,
      description: task.description,
      completed: task.completed,
    }),
  });
  return handleResponse(response);
};

export const deleteTask = async (id) => {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};

// ==========================================
// CACHE STATS API (Practical 9)
// ==========================================
export const getCacheStats = async () => {
  const response = await fetch(`${BASE_URL}/tasks/cache/stats`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  return handleResponse(response);
};
