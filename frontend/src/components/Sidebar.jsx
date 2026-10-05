import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="premium-sidebar">

      <div className="sidebar-section-label">
        MENU
      </div>

      <nav className="sidebar-nav">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <span className="sidebar-icon">⌂</span>
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/jobs"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <span className="sidebar-icon">▣</span>
          <span>Jobs</span>
        </NavLink>

        <NavLink
          to="/applications"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <span className="sidebar-icon">≡</span>
          <span>My Applications</span>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <span className="sidebar-icon">○</span>
          <span>Profile</span>
        </NavLink>

      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-status">
          <span className="sidebar-status-dot"></span>

          <div>
            <strong>System Online</strong>
            <span>All services operational</span>
          </div>
        </div>
      </div>

    </aside>
  );
}

export default Sidebar;