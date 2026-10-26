export default function About() {
  return (
    <section id="about" className="card-section">
      <h2>About Me & Project (Practical 1)</h2>
      <p style={{ marginTop: "10px", lineHeight: "1.7" }}>
        Welcome to the <strong>AWDF Unified Project</strong>! This single application combines the concepts of all 9 practicals of the 
        <strong> Advanced Web Development Frameworks (ITUE301)</strong> curriculum at Charotar University of Science and Technology (CHARUSAT).
      </p>
      <div style={{ marginTop: "16px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "12px" }}>
        <div className="info-badge">🎓 <strong>Course:</strong> AWDF (ITUE301)</div>
        <div className="info-badge">🏛️ <strong>University:</strong> CHARUSAT - FTE</div>
        <div className="info-badge">⚡ <strong>Tech Stack:</strong> React + Node + Mongo</div>
      </div>
    </section>
  );
}
