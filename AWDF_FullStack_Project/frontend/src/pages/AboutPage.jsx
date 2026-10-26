import About from "../components/About";
import Skills from "../components/Skills";

export default function AboutPage() {
  return (
    <div className="about-page" style={{ maxWidth: "900px", margin: "auto", display: "grid", gap: "24px" }}>
      <div className="site-header">
        <h2 style={{ fontSize: "1.8rem", marginBottom: "8px" }}>
          🧱 Practical 1: React & Component Architecture
        </h2>
        <p style={{ opacity: 0.85, lineHeight: "1.6" }}>
          Demonstrates component structuring, reusability, props passing, and layout hierarchy
          built on modern Vite tooling.
        </p>
      </div>

      {/* Reusable Component: About */}
      <About />

      {/* Reusable Component: Skills */}
      <Skills />

      {/* Lab Details Card */}
      <section className="card-section" style={{
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        borderRadius: "16px",
        padding: "24px"
      }}>
        <h2>Practical Curriculum Coverage</h2>
        <div style={{ marginTop: "14px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "14px" }}>
          <div style={{ padding: "14px", borderRadius: "10px", background: "rgba(37,99,235,0.06)", border: "1px solid var(--card-border)" }}>
            <strong>🎨 Frontend (P1, P2, P3, P8)</strong>
            <p style={{ fontSize: "0.9rem", margin: "6px 0 0", opacity: 0.85 }}>
              React 18, Vite HMR, React Router DOM, GitHub REST API, Lazy Loading & Suspense.
            </p>
          </div>
          <div style={{ padding: "14px", borderRadius: "10px", background: "rgba(37,99,235,0.06)", border: "1px solid var(--card-border)" }}>
            <strong>⚙️ Backend (P4, P5, P7, P9)</strong>
            <p style={{ fontSize: "0.9rem", margin: "6px 0 0", opacity: 0.85 }}>
              Express REST server, Mongoose MongoDB models, JWT token pipeline, NodeCache.
            </p>
          </div>
          <div style={{ padding: "14px", borderRadius: "10px", background: "rgba(37,99,235,0.06)", border: "1px solid var(--card-border)" }}>
            <strong>🔗 Full Stack (P6)</strong>
            <p style={{ fontSize: "0.9rem", margin: "6px 0 0", opacity: 0.85 }}>
              End-to-end integration with asynchronous API calls, error boundaries & CORS.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
