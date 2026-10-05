import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
const navigate = useNavigate();
const { login } = useAuth();

const [formData, setFormData] = useState({
email: "",
password: "",
});

const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value,
});
};

const handleSubmit = async (e) => {
e.preventDefault();
setError("");
setLoading(true);

try {
  await login(formData);
  navigate("/dashboard");
} catch (err) {
  setError(
    err.response?.data?.message ||
      "Invalid email or password."
  );
} finally {
  setLoading(false);
}

};

return (
<div className="auth-container login-page">

  <div className="login-shell">

    {/* BRAND */}
    <div className="login-brand">
      <div className="login-logo">
        J
      </div>

      <div>
        <h1>
          Job<span>Track</span>
        </h1>

        <p>
          JOB APPLICATION MANAGEMENT SYSTEM
        </p>
      </div>
    </div>


    {/* LOGIN CARD */}
    <div className="login-card">

      <div className="login-card-header">
        <span className="login-eyebrow">
          WELCOME BACK
        </span>

        <h2>
          Sign in to your account
        </h2>

        <p>
          Continue managing your job applications.
        </p>
      </div>


      {error && (
        <div className="login-error">
          <span>!</span>
          {error}
        </div>
      )}


      <form onSubmit={handleSubmit}>

        <div className="login-field">
          <label>
            EMAIL ADDRESS
          </label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>


        <div className="login-field">
          <label>
            PASSWORD
          </label>

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>


        <button
          type="submit"
          className="login-submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="login-spinner"></span>
              Signing in...
            </>
          ) : (
            <>
              Sign In
              <span>→</span>
            </>
          )}
        </button>

      </form>


      <div className="login-divider">
        <span></span>
        <small>NEW TO JOBTRACK?</small>
        <span></span>
      </div>


      <p className="login-register">
        Don't have an account?

        <Link to="/register">
          Create an account
        </Link>
      </p>

    </div>


    {/* FOOTER */}
    <div className="login-footer">
      <span className="login-status-dot"></span>
      Secure application management
    </div>

  </div>

</div>

);
}

export default Login;