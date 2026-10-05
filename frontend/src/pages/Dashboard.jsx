import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";

import { useAuth } from "../context/AuthContext";
import applicationService from "../services/applicationService";

function Dashboard() {
  const { user, loading: authLoading } = useAuth();

  const [dashboard, setDashboard] = useState({
    total: 0,
    applied: 0,
    shortlisted: 0,
    interview: 0,
    selected: 0,
    rejected: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const data = await applicationService.getDashboard(user.id);

        setDashboard({
          total: data.total || 0,
          applied: data.applied || 0,
          shortlisted: data.shortlisted || 0,
          interview: data.interview || 0,
          selected: data.selected || 0,
          rejected: data.rejected || 0,
        });
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      fetchDashboard();
    }
  }, [user, authLoading]);

  if (authLoading || loading) {
    return <Loader />;
  }

  if (!user) {
    return (
      <div className="auth-container">
        <div className="text-center">
          <h3>Please login first.</h3>

          <Link
            to="/login"
            className="btn btn-primary mt-3"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <Sidebar />

      <main className="main-content dashboard-page">

        {/* =====================================
            DASHBOARD HEADER
        ===================================== */}

        <section className="dashboard-header">

          <div>
            <span className="dashboard-eyebrow">
              JOB APPLICATIONS
            </span>

            <h1>
              Hi, {user.name} <span>👋</span>
            </h1>

            <p>
              Here's an overview of your job search activity.
            </p>
          </div>

          <Link
            to="/jobs"
            className="dashboard-primary-btn"
          >
            <span>Browse Jobs</span>
            <span className="button-arrow">→</span>
          </Link>

        </section>


        {/* =====================================
            STATISTICS
        ===================================== */}

        <section className="dashboard-stats">

          {/* Total */}

          <div className="stat-card stat-card-main">

            <div className="stat-card-top">
              <span className="stat-label">
                TOTAL APPLICATIONS
              </span>

              <div className="stat-icon red-icon">
                ↗
              </div>
            </div>

            <div className="stat-number">
              {dashboard.total}
            </div>

            <div className="stat-description">
              Applications submitted
            </div>

            <div className="stat-glow"></div>
          </div>


          {/* Applied */}

          <div className="stat-card">

            <div className="stat-card-top">
              <span className="stat-label">
                APPLIED
              </span>

              <div className="stat-icon blue-icon">
                ✓
              </div>
            </div>

            <div className="stat-number">
              {dashboard.applied}
            </div>

            <div className="stat-description">
              Active applications
            </div>

          </div>


          {/* Shortlisted */}

          <div className="stat-card">

            <div className="stat-card-top">
              <span className="stat-label">
                SHORTLISTED
              </span>

              <div className="stat-icon purple-icon">
                ★
              </div>
            </div>

            <div className="stat-number">
              {dashboard.shortlisted}
            </div>

            <div className="stat-description">
              Shortlisted applications
            </div>

          </div>


          {/* Interview */}

          <div className="stat-card">

            <div className="stat-card-top">
              <span className="stat-label">
                INTERVIEWS
              </span>

              <div className="stat-icon yellow-icon">
                ◷
              </div>
            </div>

            <div className="stat-number">
              {dashboard.interview}
            </div>

            <div className="stat-description">
              Interviews scheduled
            </div>

          </div>


          {/* Selected */}

          <div className="stat-card">

            <div className="stat-card-top">
              <span className="stat-label">
                SELECTED
              </span>

              <div className="stat-icon green-icon">
                ✓
              </div>
            </div>

            <div className="stat-number">
              {dashboard.selected}
            </div>

            <div className="stat-description">
              Successful applications
            </div>

          </div>


          {/* Rejected */}

          <div className="stat-card">

            <div className="stat-card-top">
              <span className="stat-label">
                REJECTED
              </span>

              <div className="stat-icon gray-icon">
                ×
              </div>
            </div>

            <div className="stat-number">
              {dashboard.rejected}
            </div>

            <div className="stat-description">
              Closed applications
            </div>

          </div>

        </section>


        {/* =====================================
            LOWER DASHBOARD
        ===================================== */}

        <section className="dashboard-lower">

          {/* Application Overview */}

          <div className="dashboard-panel overview-panel">

            <div className="panel-header">

              <div>
                <span className="panel-eyebrow">
                  OVERVIEW
                </span>

                <h3>
                  Application Progress
                </h3>
              </div>

              <span className="panel-period">
                Current
              </span>

            </div>


            <div className="application-progress">

              <div className="progress-row">

                <div className="progress-info">
                  <span>Applied</span>
                  <strong>{dashboard.applied}</strong>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill red-progress"
                    style={{
                      width: `${
                        dashboard.total
                          ? (dashboard.applied / dashboard.total) * 100
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>

              </div>


              <div className="progress-row">

                <div className="progress-info">
                  <span>Shortlisted</span>
                  <strong>{dashboard.shortlisted}</strong>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill purple-progress"
                    style={{
                      width: `${
                        dashboard.total
                          ? (dashboard.shortlisted / dashboard.total) * 100
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>

              </div>


              <div className="progress-row">

                <div className="progress-info">
                  <span>Interview</span>
                  <strong>{dashboard.interview}</strong>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill yellow-progress"
                    style={{
                      width: `${
                        dashboard.total
                          ? (dashboard.interview / dashboard.total) * 100
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>

              </div>


              <div className="progress-row">

                <div className="progress-info">
                  <span>Selected</span>
                  <strong>{dashboard.selected}</strong>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill green-progress"
                    style={{
                      width: `${
                        dashboard.total
                          ? (dashboard.selected / dashboard.total) * 100
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>

              </div>

            </div>

          </div>


          {/* Quick Actions */}

          <div className="dashboard-panel quick-panel">

            <div className="panel-header">

              <div>
                <span className="panel-eyebrow">
                  SHORTCUTS
                </span>

                <h3>
                  Quick Actions
                </h3>
              </div>

            </div>


            <div className="quick-actions">

              <Link
                to="/jobs"
                className="quick-action"
              >
                <div className="quick-action-icon red-action">
                  →
                </div>

                <div>
                  <strong>
                    Browse Jobs
                  </strong>

                  <span>
                    Find new opportunities
                  </span>
                </div>

                <span className="quick-arrow">
                  →
                </span>
              </Link>


              <Link
                to="/applications"
                className="quick-action"
              >
                <div className="quick-action-icon blue-action">
                  ✓
                </div>

                <div>
                  <strong>
                    My Applications
                  </strong>

                  <span>
                    Track your applications
                  </span>
                </div>

                <span className="quick-arrow">
                  →
                </span>
              </Link>


              <Link
                to="/profile"
                className="quick-action"
              >
                <div className="quick-action-icon purple-action">
                  ○
                </div>

                <div>
                  <strong>
                    My Profile
                  </strong>

                  <span>
                    Manage your account
                  </span>
                </div>

                <span className="quick-arrow">
                  →
                </span>
              </Link>

            </div>

          </div>

        </section>


        {/* =====================================
            FOOTER NOTE
        ===================================== */}

        <div className="dashboard-footer">
          <span className="footer-status-dot"></span>

          Your application data is up to date
        </div>

      </main>
    </>
  );
}

export default Dashboard;