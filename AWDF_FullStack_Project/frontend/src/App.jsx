import { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Spinner from "./components/Spinner";

// Practical 8: Performance Optimization with Lazy Loading and Code Splitting
const Home = lazy(() => import("./pages/Home"));
const TaskManager = lazy(() => import("./pages/TaskManager"));
const Projects = lazy(() => import("./pages/Projects"));
const Contact = lazy(() => import("./pages/Contact"));
const AboutPage = lazy(() => import("./pages/AboutPage"));

export default function App() {
  // Practical 2: Reactive State Management for Dark/Light Mode Theme
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("awdf_theme") || "light";
  });

  // User Auth State
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    localStorage.setItem("awdf_theme", theme);
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className={`app ${theme}`}>
      <BrowserRouter>
        {/* Modular Navigation Bar */}
        <Navbar
          theme={theme}
          toggleTheme={toggleTheme}
          user={user}
          onLogout={handleLogout}
        />

        {/* Practical 8: Suspense Boundary with animated Spinner fallback for Lazy Routes */}
        <Suspense fallback={<Spinner message="Loading optimized module (Practical 8: Lazy Load)..." />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<TaskManager user={user} setUser={setUser} />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>

        {/* Modular Footer */}
        <Footer />
      </BrowserRouter>
    </div>
  );
}