import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const maxChars = 200;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "message" && value.length > maxChars) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 4000);
  };

  return (
    <div className="contact-section" style={{ maxWidth: "750px", margin: "auto" }}>
      <div className="site-header" style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "1.8rem", marginBottom: "8px" }}>
          📝 Practical 2: State Management & Form Handling
        </h2>
        <p style={{ opacity: 0.85, lineHeight: "1.6" }}>
          Controlled inputs with <code>useState</code>, real-time character limits, 
          instant reactive preview, and dynamic theme switching.
        </p>
      </div>

      {submitted && (
        <div className="success-message" style={{ marginBottom: "20px" }}>
          ✅ Thank you, {formData.name || "Student"}! Your message was submitted successfully.
        </div>
      )}

      <div style={{
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        borderRadius: "16px",
        padding: "24px",
        marginBottom: "24px"
      }}>
        <form onSubmit={handleSubmit} className="contact-form">
          <div>
            <label htmlFor="name">Your Full Name:</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="e.g. Mansi Jogani"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email Address:</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="e.g. student@charusat.edu.in"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="subject">Subject / Inquiry:</label>
            <input
              id="subject"
              name="subject"
              type="text"
              placeholder="e.g. AWDF Practical 2 Query"
              value={formData.subject}
              onChange={handleChange}
            />
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label htmlFor="message">Your Message:</label>
              <span className="character-count" style={{
                color: formData.message.length >= maxChars ? "#ef4444" : "var(--muted)",
                fontWeight: formData.message.length >= maxChars ? "bold" : "normal"
              }}>
                {formData.message.length} / {maxChars} characters
              </span>
            </div>
            <textarea
              id="message"
              name="message"
              placeholder="Type your message here..."
              value={formData.message}
              onChange={handleChange}
              rows={4}
              required
            />
          </div>

          <button type="submit" className="send-btn">
            Send Message (Trigger State Update)
          </button>

          <button
            type="button"
            className="help-btn"
            onClick={() => setShowHelp(!showHelp)}
            style={{ background: "transparent", color: "var(--accent)", border: "1px solid var(--accent)" }}
          >
            {showHelp ? "Hide Form Guide" : "Show Practical 2 Guide"}
          </button>
        </form>

        {showHelp && (
          <div className="help-box" style={{ marginTop: "16px" }}>
            <strong>Practical 2 Concept Notes:</strong>
            <p>
              • <code>useState</code> hook binds every input to React state.<br />
              • Live character counter calculates <code>formData.message.length</code> dynamically on every keystroke.<br />
              • The Live Preview below re-renders reactively without full page reload.
            </p>
          </div>
        )}
      </div>

      {/* Reactive Live Preview Box */}
      <div className="preview-box" style={{
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        borderRadius: "16px",
        padding: "20px"
      }}>
        <h3 style={{ fontSize: "1.2rem", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
          <span>👁️</span> Reactive Live Preview (State Reflection)
        </h3>
        <p style={{ margin: "4px 0" }}><strong>From:</strong> {formData.name || "(Name will appear here)"}</p>
        <p style={{ margin: "4px 0" }}><strong>Email:</strong> {formData.email || "(Email will appear here)"}</p>
        <p style={{ margin: "4px 0" }}><strong>Subject:</strong> {formData.subject || "(Subject will appear here)"}</p>
        <p style={{ margin: "10px 0 0", fontStyle: "italic", opacity: 0.9 }}>
          "{formData.message || "Your message draft will appear here in real time as you type..."}"
        </p>
      </div>
    </div>
  );
}