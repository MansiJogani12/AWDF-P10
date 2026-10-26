# Advanced Web Development Frameworks (ITUE301) - Combined Practicals (1 to 9)

Yeh folder Practical 1 se lekar Practical 9 tak ke sabhi manual PDFs aur performed code projects ko systematically organize karta hai.

---

## Folder Structure & Mapping

| Practical | Title | Manual PDF | Performed Code | Description |
| :--- | :--- | :--- | :--- | :--- |
| **Practical 1** | Introduction to React and Component Architecture | `Practical_1.pdf` | `student-portfolio/` | React setup using Vite, modular and reusable UI components. |
| **Practical 2** | State Management and Routing in React | `Practical_2.pdf` | `student-portfolio/` | `useState`, dynamic contact form, light/dark mode, and React Router. |
| **Practical 3** | API Integration and Data Rendering in React | `Practical_3.pdf` | `student-portfolio/` | GitHub REST API integration with loading spinner and error states. |
| **Practical 4** | Building a RESTful API with Node.js and Express | `Practical_4.pdf` | `task-manager-api/` | Express REST server with full in-memory CRUD operations. |
| **Practical 5** | MongoDB Integration and Schema Design with Mongoose | `Practical_5.pdf` | `task-manager-api/` | MongoDB connection, Mongoose schema, validation, and database CRUD. |
| **Practical 6** | Full Stack Integration React + Node + MongoDB | `Practical_6.pdf` | `backend/`, `frontend/` | Full-stack connection connecting React frontend to Node/MongoDB backend. |
| **Practical 7** | Authentication and Middleware Pipeline | `Practical_7.pdf` | `backend/`, `frontend/` | JWT-based auth, secure routes, and Express middleware pipeline. |
| **Practical 8** | Performance Optimization and Lazy Loading in React | `Practical_8.pdf` | `backend/`, `frontend/` | Code splitting, `React.lazy`, and `Suspense` for bundle optimization. |
| **Practical 9** | In-Memory Caching and Query Optimization | `Practical_9.pdf` | `backend/`, `frontend/` | Backend caching (node-cache / Redis) and query latency optimization. |

---

## How to Run Any Project

Har project me bina bulky `node_modules` ke code clean store kiya gaya hai. Kisi bhi project ko run karne ke liye:

### React Projects (Practical 1-3: `student-portfolio`, Practical 6-9: `frontend`)
```bash
npm install
npm run dev
```

### Node / Express Backends (Practical 4-5: `task-manager-api`, Practical 6-9: `backend`)
```bash
npm install
node server.js   # ya npm start / npm run dev
```
