export default function Alert({ alertType, message }) {
  return (
    <div className={`alert ${alertType}`} role="alert">
      {message}
    </div>
  );
}
