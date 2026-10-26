export default function Spinner({ message = "Loading..." }) {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p style={{ marginTop: "12px", color: "inherit", fontWeight: 500 }}>{message}</p>
    </div>
  );
}
