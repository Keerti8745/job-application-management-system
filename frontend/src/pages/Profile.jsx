import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import { useAuth } from "../context/AuthContext";

function Profile() {
const { user, loading } = useAuth();

if (loading) {
return (
<div className="auth-container">
<div className="profile-loader"></div>
</div>
);
}

if (!user) {
return (
<div className="auth-container">
<div className="text-center profile-login-message">
<h3>Please login first.</h3>

      <Link
        to="/login"
        className="profile-primary-btn"
      >
        Go to Login
      </Link>
    </div>
  </div>
);

}

const initial = user.name
? user.name.charAt(0).toUpperCase()
: "U";

return (
<>
<Navbar />
<Sidebar />

  <main className="main-content profile-page">

    {/* HEADER */}
    <section className="profile-header">

      <div>
        <span className="profile-eyebrow">
          ACCOUNT
        </span>

        <h1>
          My Profile
        </h1>

        <p>
          View your account information and profile details.
        </p>
      </div>

      <Link
        to="/dashboard"
        className="profile-back-btn"
      >
        <span>←</span>
        Dashboard
      </Link>

    </section>


    {/* PROFILE CARD */}
    <section className="profile-layout">

      <div className="profile-card">

        {/* PROFILE TOP */}
        <div className="profile-card-top">

          <div className="profile-avatar">
            {initial}
          </div>

          <div className="profile-identity">

            <h2>
              {user.name}
            </h2>

            <p>
              {user.email}
            </p>

            <span className="profile-role">
              <span className="profile-role-dot"></span>
              {user.role || "USER"}
            </span>

          </div>

        </div>


        {/* DIVIDER */}
        <div className="profile-divider"></div>


        {/* DETAILS */}
        <div className="profile-details">

          <div className="profile-field">

            <span className="profile-field-label">
              FULL NAME
            </span>

            <div className="profile-field-value">
              {user.name || "-"}
            </div>

          </div>


          <div className="profile-field">

            <span className="profile-field-label">
              EMAIL ADDRESS
            </span>

            <div className="profile-field-value">
              {user.email || "-"}
            </div>

          </div>


          <div className="profile-field">

            <span className="profile-field-label">
              ACCOUNT ROLE
            </span>

            <div className="profile-field-value">
              {user.role || "USER"}
            </div>

          </div>

        </div>


        {/* FOOTER */}
        <div className="profile-card-footer">

          <div className="profile-secure">
            <span className="profile-secure-dot"></span>

            <span>
              Account active
            </span>
          </div>

          <span className="profile-user-id">
            ID #{user.id}
          </span>

        </div>

      </div>


      {/* SIDE INFO */}
      <div className="profile-info-card">

        <span className="profile-info-eyebrow">
          JOBTRACK
        </span>

        <h3>
          Your career journey,
          <span> organized.</span>
        </h3>

        <p>
          Keep track of your applications, discover new
          opportunities and manage your job search from
          one place.
        </p>

        <Link
          to="/jobs"
          className="profile-primary-btn"
        >
          Explore Jobs
          <span>→</span>
        </Link>

      </div>

    </section>

  </main>
</>

);
}

export default Profile;