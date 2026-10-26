function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-box">
      <h3>Something went wrong!</h3>

      <p>{message}</p>

      <button onClick={onRetry}>
        Retry
      </button>
    </div>
  );
}

export default ErrorMessage;