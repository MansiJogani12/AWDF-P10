export default function Skills() {
  const skills = [
    { name: "React 18 & Vite", category: "Frontend (P1-P3, P8)", icon: "⚛️" },
    { name: "React Router v7", category: "Navigation & State (P2)", icon: "🧭" },
    { name: "REST API Integration", category: "Async & Fetch (P3)", icon: "🌐" },
    { name: "Node.js & Express", category: "Backend Server (P4)", icon: "🚀" },
    { name: "MongoDB & Mongoose", category: "Database & Validation (P5)", icon: "🍃" },
    { name: "Full Stack Integration", category: "Frontend-Backend Link (P6)", icon: "🔗" },
    { name: "JWT Auth & Middleware", category: "Security & Bcrypt (P7)", icon: "🔒" },
    { name: "Lazy Loading & Suspense", category: "Performance (P8)", icon: "⚡" },
    { name: "In-Memory Caching", category: "Query Optimization (P9)", icon: "🏎️" },
  ];

  return (
    <section id="skills" className="card-section">
      <h2>Skills & Core Technologies (Practicals 1 to 9)</h2>
      <div className="skills-grid" style={{ marginTop: "16px" }}>
        {skills.map((skill, index) => (
          <div className="skill-card" key={index}>
            <div style={{ fontSize: "2rem", marginBottom: "8px" }}>{skill.icon}</div>
            <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>{skill.name}</div>
            <div style={{ fontSize: "0.85rem", opacity: 0.8, marginTop: "4px" }}>{skill.category}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
