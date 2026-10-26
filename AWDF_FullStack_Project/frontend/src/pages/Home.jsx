import { Link } from "react-router-dom";

export default function Home() {
  const practicals = [
    {
      num: 1,
      title: "React & Component Architecture",
      desc: "Vite dev environment setup with modular, reusable components and layout hierarchy.",
      badge: "Frontend UI",
      link: "/about"
    },
    {
      num: 2,
      title: "State Management & Multi-Page Routing",
      desc: "React Router navigation, dark/light theme switching, and interactive form handling with live preview.",
      badge: "Router & State",
      link: "/contact"
    },
    {
      num: 3,
      title: "REST API Integration & Data Rendering",
      desc: "Live GitHub API consumption, async handling, loading spinners, and error retry states.",
      badge: "Fetch & Async",
      link: "/projects"
    },
    {
      num: 4,
      title: "RESTful API with Node.js & Express",
      desc: "Backend server design with complete CRUD endpoints (GET, POST, PUT, DELETE) and middleware pipeline.",
      badge: "Express CRUD",
      link: "/tasks"
    },
    {
      num: 5,
      title: "MongoDB & Mongoose Schema Design",
      desc: "NoSQL document persistence, strict Mongoose schemas, and server-side validation.",
      badge: "MongoDB / Mongoose",
      link: "/tasks"
    },
    {
      num: 6,
      title: "Full Stack Integration (React + Node + Mongo)",
      desc: "End-to-end wiring of React frontend with Express backend via CORS-enabled REST API.",
      badge: "Full-Stack Connected",
      link: "/tasks"
    },
    {
      num: 7,
      title: "JWT Authentication & Middleware Pipeline",
      desc: "User registration, bcrypt password hashing, signed JWT tokens, and protected routes via authMiddleware.",
      badge: "JWT Security",
      link: "/tasks"
    },
    {
      num: 8,
      title: "Performance Optimization & Lazy Loading",
      desc: "Route-level code splitting using React.lazy() and Suspense fallback spinners for instant page delivery.",
      badge: "Lazy Loading",
      link: "/projects"
    },
    {
      num: 9,
      title: "In-Memory Caching & Query Optimization",
      desc: "Server-side caching via node-cache, cache hit/miss instrumentation, response headers, and mutation invalidation.",
      badge: "NodeCache (Fast)",
      link: "/tasks"
    }
  ];

  return (
    <div className="home-dashboard">
      <div className="site-header" style={{ textAlign: "center", padding: "30px 20px" }}>
        <h1 style={{ fontSize: "2.3rem", fontWeight: 800, marginBottom: "10px" }}>
          AWDF Practicals 1 to 9 Unified Project
        </h1>
        <p style={{ fontSize: "1.1rem", opacity: 0.85, maxWidth: "750px", margin: "auto", lineHeight: "1.6" }}>
          Ek single full-stack web application jisme B.Tech ITUE301 curriculum ke saare practicals 
          (Component architecture se lekar JWT Auth aur In-Memory Caching tak) seamlessly integrated hain.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "14px", marginTop: "24px", flexWrap: "wrap" }}>
          <Link to="/tasks" className="send-btn" style={{ textDecoration: "none", width: "auto", padding: "12px 24px" }}>
            🚀 Open Task Manager (P4-P7, P9)
          </Link>
          <Link to="/projects" className="help-btn" style={{ textDecoration: "none", width: "auto", padding: "12px 24px" }}>
            🌐 GitHub API Explorer (P3)
          </Link>
          <Link to="/contact" className="theme-btn" style={{ textDecoration: "none", width: "auto", padding: "12px 24px" }}>
            📝 Contact Form (P2)
          </Link>
        </div>
      </div>

      <div style={{ marginTop: "30px" }}>
        <h2 style={{ fontSize: "1.6rem", marginBottom: "20px" }}>
          Integrated Practical Modules (1 to 9)
        </h2>

        <div className="project-grid">
          {practicals.map((p) => (
            <div className="project-card" key={p.num} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ fontSize: "0.85rem", fontWeight: "bold" }}>Practical {p.num}</span>
                  <span style={{ background: "rgba(37,99,235,0.15)", color: "var(--accent)", border: "1px solid var(--accent)", fontSize: "0.75rem", padding: "4px 8px", borderRadius: "12px" }}>
                    {p.badge}
                  </span>
                </div>
                <h3 style={{ fontSize: "1.2rem", marginBottom: "10px" }}>{p.title}</h3>
                <p style={{ fontSize: "0.95rem", lineHeight: "1.5", opacity: 0.9 }}>{p.desc}</p>
              </div>

              <div style={{ marginTop: "20px" }}>
                <Link to={p.link} style={{ color: "var(--accent)", fontWeight: 600, textDecoration: "none" }}>
                  View Feature →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}