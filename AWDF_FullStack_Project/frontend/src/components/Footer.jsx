export default function Footer() {
  return (
    <footer className="site-footer" style={{
      marginTop: "40px",
      padding: "24px",
      textAlign: "center",
      borderRadius: "16px",
      border: "1px solid var(--card-border)",
      background: "var(--card-bg)"
    }}>
      <p style={{ fontWeight: 600, marginBottom: "6px" }}>
        CHARUSAT - Faculty of Technology and Engineering (FTE)
      </p>
      <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>
        Advanced Web Development Frameworks (ITUE301) • Practicals 1 to 9 Unified Full-Stack Solution
      </p>
    </footer>
  );
}
