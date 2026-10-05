import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="auth-container">
      <div className="text-center">
        <h1 className="display-1 fw-bold text-primary">
          404
        </h1>

        <h3 className="fw-bold mb-2">
          Page Not Found
        </h3>

        <p className="text-muted mb-4">
          Sorry, the page you are looking for does not exist.
        </p>

        <Link
          to="/dashboard"
          className="btn btn-primary"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}

export default NotFound;