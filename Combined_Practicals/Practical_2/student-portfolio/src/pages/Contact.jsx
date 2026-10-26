import { useState } from "react";

function Contact() {
  const [message, setMessage] = useState("");
  const [showHelp, setShowHelp] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (message.trim() === "") {
      setStatus("Please enter a message.");
      return;
    }

    setStatus("✓ Message sent successfully!");
    setMessage("");
  };

  return (
    <section className="contact-section">
      <h2>Contact</h2>

      <p className="contact-text">
        Have a question or feedback? Enter your message below.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>

        <label htmlFor="message">Message</label>

        <input
          id="message"
          type="text"
          placeholder="Enter your message..."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            setStatus("");
          }}
        />

        <p className="character-count">
          Characters: {message.length}
        </p>

        <div className="preview-box">
          <h3>Live Preview</h3>

          <p>
            {message
              ? message
              : "Your message will appear here..."}
          </p>
        </div>

        <button type="submit" className="send-btn">
          Send Message
        </button>

        {status && (
          <div className="success-message">
            {status}
          </div>
        )}

        <button
          type="button"
          className="help-btn"
          onClick={() => setShowHelp(!showHelp)}
        >
          {showHelp ? "Hide Help" : "Show Help"}
        </button>

        {showHelp && (
          <div className="help-box">
            <strong>Help</strong>

            <p>
              Enter your message in the input field above.
            </p>

            <p>
              The message is stored using the <b>useState</b> hook,
              and the preview updates instantly as you type.
            </p>
          </div>
        )}

      </form>
    </section>
  );
}

export default Contact;