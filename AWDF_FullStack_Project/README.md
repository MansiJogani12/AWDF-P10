# AWDF (ITUE301) - Unified Full-Stack Project (Practicals 1 to 9)

**Charotar University of Science and Technology (CHARUSAT)**  
**Faculty of Technology and Engineering (FTE) — B. Tech (IT)**  
**Subject:** Advanced Web Development Frameworks (`ITUE301`)  

Yeh project **Practical 1 se lekar Practical 9 tak ke sabhi features ko ek single, comprehensive full-stack application** me integrate karta hai.

---

## 📌 Practical Features Mapping Table

| Practical | Title | Architecture Layer | Implemented Feature in Project | File Reference |
| :--- | :--- | :--- | :--- | :--- |
| **Practical 1** | React & Component Architecture | Frontend | Modular, reusable UI components (`Navbar`, `Header`, `Footer`, `About`, `Skills`). | `frontend/src/components/*` |
| **Practical 2** | State Management & Multi-page Routing | Frontend | `react-router-dom` multi-route navigation, Dark/Light Mode Theme switch, interactive Contact form with live character counter & reactive preview. | `frontend/src/pages/Contact.jsx`<br>`frontend/src/App.jsx` |
| **Practical 3** | REST API Integration & Async Handling | Frontend | Live GitHub REST API integration (`/users/:username/repos`), search/filter, loading `Spinner`, and `ErrorMessage` with Retry. | `frontend/src/pages/Projects.jsx`<br>`frontend/src/components/Spinner.jsx` |
| **Practical 4** | Building a RESTful API with Node.js & Express | Backend | Express REST server with full CRUD routes (`GET /tasks`, `POST /tasks`, `PUT /tasks/:id`, `DELETE /tasks/:id`), input validation, and middleware pipeline. | `backend/routes/taskRoutes.js`<br>`backend/server.js` |
| **Practical 5** | MongoDB Integration & Mongoose Schema Design | Backend / DB | MongoDB connection, Mongoose ODM schemas for `Task` and `User` with field validation and timestamps. | `backend/models/Task.js`<br>`backend/models/User.js` |
| **Practical 6** | Full Stack Integration (React + Node + Mongo) | End-to-End | End-to-end full stack wiring: React frontend communicates with Express/MongoDB backend via CORS-enabled REST API. | `frontend/src/pages/TaskManager.jsx`<br>`frontend/src/api.js` |
| **Practical 7** | Authentication & Middleware Pipeline | Security | JWT authentication, `bcryptjs` password hashing, `/auth/register`, `/auth/login`, and token-protected routes via `authMiddleware`. | `backend/routes/authRoutes.js`<br>`backend/middleware/authMiddleware.js` |
| **Practical 8** | Performance Optimization & Lazy Loading | Frontend | Route-level code splitting using `React.lazy()` and `Suspense` with an animated fallback spinner for instant loading. | `frontend/src/App.jsx` |
| **Practical 9** | In-Memory Caching & Query Optimization | Backend / Perf | Server-side in-memory caching using `node-cache`, cache invalidation on create/update/delete, `X-Cache: HIT/MISS` headers, and live UI Cache Monitor widget. | `backend/routes/taskRoutes.js`<br>`backend/cache.js` |

---

## 📂 Project Directory Structure

```text
AWDF_FullStack_Project/
├── backend/
│   ├── middleware/
│   │   ├── authMiddleware.js      # JWT verification middleware (P7)
│   │   └── validateTask.js        # Input validation middleware (P4, P5)
│   ├── models/
│   │   ├── Task.js                # Mongoose Task Schema (P5)
│   │   └── User.js                # Mongoose User Schema (P5, P7)
│   ├── routes/
│   │   ├── authRoutes.js          # Register, Login & /me endpoints (P7)
│   │   └── taskRoutes.js          # REST CRUD with In-Memory Caching (P4, P6, P9)
│   ├── cache.js                   # Node-Cache configuration (P9)
│   ├── server.js                  # Main Express Server entrypoint (P4)
│   ├── .env                       # MongoDB URI, PORT, JWT_SECRET (P5, P7)
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx         # Navigation bar with theme toggle (P1, P2)
│   │   │   ├── Footer.jsx         # Reusable footer component (P1)
│   │   │   ├── About.jsx          # Reusable about component (P1)
│   │   │   ├── Skills.jsx         # Reusable skills grid (P1)
│   │   │   ├── Spinner.jsx        # Animated loading spinner (P3, P8)
│   │   │   └── ErrorMessage.jsx   # Error boundary with retry button (P3)
│   │   ├── pages/
│   │   │   ├── Home.jsx           # Master dashboard of all 9 practicals (P1-P9)
│   │   │   ├── TaskManager.jsx    # Full-Stack App: CRUD + Auth + Cache Monitor (P4-P7, P9)
│   │   │   ├── Projects.jsx       # GitHub API integration (P3, P8)
│   │   │   ├── Contact.jsx        # Form handling, character counter, live preview (P2)
│   │   │   └── AboutPage.jsx      # Component architecture showcase (P1)
│   │   ├── api.js                 # API client with cache metrics (P6, P7, P9)
│   │   ├── App.jsx                # React Router + Lazy Loading + Theme state (P2, P8)
│   │   ├── main.jsx
│   │   └── index.css              # Light & Dark themes, responsive layout (P1, P2)
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── package.json                   # Root convenience scripts
└── README.md                      # Complete documentation
```

---

## 🚀 How to Run the Unified Project

Dono folders (`backend` aur `frontend`) me dependencies already installed hain.

### Step 1: Start Backend Server (Port 5000)
Ek terminal window me:
```powershell
cd d:\awdff\AWDF_FullStack_Project\backend
node server.js
```
*(Backend running at `http://localhost:5000`)*

### Step 2: Start Frontend App (Port 5173)
Dusri terminal window me:
```powershell
cd d:\awdff\AWDF_FullStack_Project\frontend
npm run dev
```
*(Frontend accessible at `http://localhost:5173`)*

---

## 🧪 Testing Practical Features

1. **Practical 1 (Components):** `/about` page par jaakar modular `About` aur `Skills` cards dekhein.
2. **Practical 2 (State & Router):** Top-right me **☀️ Light / 🌙 Dark** button dabayein, aur `/contact` par jaakar type karein taaki real-time character count aur reactive preview test ho sake.
3. **Practical 3 (API Fetching):** `/projects` par jaakar GitHub search karein (default `@MansiJogani12`), spinner animation aur real-time cards dekhein.
4. **Practical 4, 5, 6 (Full Stack CRUD):** `/tasks` par naya task add karein, "Mark Done" karein, edit karein ya delete karein.
5. **Practical 7 (JWT Auth):** Register ya Login karein. Token localStorage me safe hoga aur session maintain rahega.
6. **Practical 8 (Lazy Loading):** Inspect Network tab me dekhein ki har page ka bundle sirf tabhi load hota hai jab route visit kiya jaye (`React.lazy`).
7. **Practical 9 (In-Memory Cache):** `/tasks` page ke top par **Cache Monitor Widget** dekhein. Pehli baar request karne par `🟠 DB QUERY (MISS)` aayega, aur turant refresh karne par `🟢 CACHE HIT` aayega response time `~0-2ms` ke saath! Naya task create ya update karne par cache automatically invalidate ho jayega.
