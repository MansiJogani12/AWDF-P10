import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar({ theme, toggleTheme, user, onLogout }) {
  const navigate = useNavigate();

  return (
    <nav className="site-nav" style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "12px",
      padding: "14px 24px",
      borderRadius: "16px",
      marginBottom: "24px"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span style={{ fontSize: "1.5rem" }}>⚡</span>
        <strong style={{ fontSize: "1.15rem", letterSpacing: "0.5px" }}>AWDF 1-9 App</strong>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
        <NavLink to="/" end className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          Overview
        </NavLink>
        <NavLink to="/tasks" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          Tasks (P4-P7, P9)
        </NavLink>
        <NavLink to="/projects" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          GitHub API (P3)
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          Contact (P2)
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          About (P1)
        </NavLink>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <button
          className="theme-btn"
          onClick={toggleTheme}
          title="Toggle Light/Dark Theme (Practical 2)"
        >
          {theme === "light" ? "🌙 Dark" : "☀️ Light"}
        </button>

        {user ? (
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontSize: "0.85rem", opacity: 0.9 }}>
              👤 {user.email?.split("@")[0]}
            </span>
            <button
              onClick={onLogout}
              style={{
                background: "#ef4444",
                color: "white",
                border: "none",
                padding: "6px 12px",
                borderRadius: "8px",
                fontSize: "0.85rem",
                cursor: "pointer",
                fontWeight: 600
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate("/tasks")}
            style={{
              background: "#3b82f6",
              color: "white",
              border: "none",
              padding: "6px 14px",
              borderRadius: "8px",
              fontSize: "0.85rem",
              cursor: "pointer",
              fontWeight: 600
            }}
          >
            Login / Auth
          </button>
        )}
      </div>
    </nav>
  );
}
