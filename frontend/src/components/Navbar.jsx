import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="top-navbar">

      <div className="navbar-brand-area">
        <Link to="/dashboard" className="navbar-logo">
          <span className="logo-mark">J</span>

          <span className="logo-text">
            Job<span>Track</span>
          </span>
        </Link>
      </div>

      <div className="navbar-right">

        {user && (
          <>
            <div className="navbar-user">

              <div className="user-avatar">
                {user.name?.charAt(0).toUpperCase()}
              </div>

              <div className="user-info">
                <span className="user-name">
                  {user.name}
                </span>

                <span className="user-role">
                  Job Seeker
                </span>
              </div>

            </div>

            <div className="navbar-divider"></div>

            <button
              className="navbar-logout"
              onClick={handleLogout}
            >
              <span>Logout</span>
              <span className="logout-arrow">→</span>
            </button>
          </>
        )}

      </div>

    </header>
  );
}

export default Navbar;