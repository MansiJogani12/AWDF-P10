export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-box" style={{
      border: "1px solid #f87171",
      background: "rgba(239, 68, 68, 0.1)",
      padding: "24px",
      borderRadius: "12px",
      textAlign: "center",
      margin: "20px 0"
    }}>
      <h3 style={{ color: "#ef4444", marginBottom: "8px" }}>Something went wrong!</h3>
      <p style={{ color: "inherit", marginBottom: "16px" }}>{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "8px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Try Again
        </button>
      )}
    </div>
  );
}
