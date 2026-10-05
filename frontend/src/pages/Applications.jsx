// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";
// import ApplicationTable from "../components/ApplicationTable";
// import Loader from "../components/Loader";

// import { useAuth } from "../context/AuthContext";
// import applicationService from "../services/applicationService";

// function Applications() {
//   const { user, loading: authLoading } = useAuth();

//   const [applications, setApplications] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchApplications = async () => {
//     if (!user) return;

//     try {
//       const data =
//         await applicationService.getApplicationsByUser(
//           user.id
//         );

//       setApplications(data);
//     } catch (error) {
//       console.error(
//         "Error fetching applications:",
//         error
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (!authLoading) {
//       fetchApplications();
//     }
//   }, [user, authLoading]);

//   const handleWithdraw = async (id) => {
//     const confirmWithdraw = window.confirm(
//       "Are you sure you want to withdraw this application?"
//     );

//     if (!confirmWithdraw) {
//       return;
//     }

//     try {
//       await applicationService.deleteApplication(id);

//       alert("Application withdrawn successfully.");

//       fetchApplications();
//     } catch (error) {
//       console.error(error);

//       alert(
//         error.response?.data?.message ||
//           "Unable to withdraw application."
//       );
//     }
//   };

//   if (authLoading || loading) {
//     return <Loader />;
//   }

//   if (!user) {
//     return (
//       <div className="auth-container">
//         <div className="text-center">
//           <h3>Please login first.</h3>

//           <Link
//             to="/login"
//             className="btn btn-primary mt-3"
//           >
//             Go to Login
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <Navbar />

//       <Sidebar />

//       <main className="main-content">
//         <div className="d-flex justify-content-between align-items-center mb-4">
//           <div>
//             <h2 className="fw-bold">
//               My Applications
//             </h2>

//             <p className="text-muted">
//               Track all your job applications here.
//             </p>
//           </div>

//           <Link
//             to="/jobs"
//             className="btn btn-primary"
//           >
//             Browse Jobs
//           </Link>
//         </div>

//         <div className="card shadow-sm p-4">
//           <ApplicationTable
//             applications={applications}
//             onWithdraw={handleWithdraw}
//           />
//         </div>
//       </main>
//     </>
//   );
// }

// export default Applications;


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ApplicationTable from "../components/ApplicationTable";
import Loader from "../components/Loader";

import { useAuth } from "../context/AuthContext";
import applicationService from "../services/applicationService";

function Applications() {
const { user, loading: authLoading } = useAuth();

const [applications, setApplications] = useState([]);
const [loading, setLoading] = useState(true);

const fetchApplications = async () => {
if (!user) return;

try {
  const data =
    await applicationService.getApplicationsByUser(user.id);

  setApplications(data || []);
} catch (error) {
  console.error("Error fetching applications:", error);
} finally {
  setLoading(false);
}

};

useEffect(() => {
if (!authLoading) {
fetchApplications();
}
}, [user, authLoading]);

const handleWithdraw = async (id) => {
const confirmWithdraw = window.confirm(
"Are you sure you want to withdraw this application?"
);

if (!confirmWithdraw) {
  return;
}

try {
  await applicationService.deleteApplication(id);

  alert("Application withdrawn successfully.");

  fetchApplications();
} catch (error) {
  console.error("Withdraw error:", error);

  alert(
    error?.response?.data?.message ||
      "Unable to withdraw application."
  );
}

};

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
        className="dashboard-primary-btn mt-3"
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

  <main className="main-content applications-page">

    {/* PAGE HEADER */}
    <section className="applications-header">

      <div>
        <span className="applications-eyebrow">
          APPLICATIONS
        </span>

        <h1>
          Track your applications
        </h1>

        <p>
          Monitor your job applications and keep track of
          your hiring journey.
        </p>
      </div>

      <Link
        to="/jobs"
        className="applications-primary-btn"
      >
        <span>Browse Jobs</span>
        <span>→</span>
      </Link>

    </section>


    {/* APPLICATION SUMMARY */}
    <section className="applications-summary">

      <div className="application-summary-card">

        <div className="application-summary-icon">
          #
        </div>

        <div>
          <span>Total Applications</span>
          <strong>{applications.length}</strong>
        </div>

      </div>


      <div className="application-summary-card">

        <div className="application-summary-icon">
          ✓
        </div>

        <div>
          <span>Active Applications</span>

          <strong>
            {
              applications.filter(
                (application) =>
                  application.status !== "REJECTED" &&
                  application.status !== "SELECTED"
              ).length
            }
          </strong>
        </div>

      </div>


      <div className="application-summary-card">

        <div className="application-summary-icon">
          ↑
        </div>

        <div>
          <span>Selected</span>

          <strong>
            {
              applications.filter(
                (application) =>
                  application.status === "SELECTED"
              ).length
            }
          </strong>
        </div>

      </div>

    </section>


    {/* APPLICATION TABLE */}
    <section className="applications-panel">

      <div className="applications-panel-header">

        <div>
          <span className="panel-eyebrow">
            APPLICATION HISTORY
          </span>

          <h2>
            Your applications
          </h2>
        </div>

        <span className="applications-count">
          {applications.length} total
        </span>

      </div>


      {applications.length === 0 ? (

        <div className="applications-empty">

          <div className="applications-empty-icon">
            —
          </div>

          <h3>
            No applications yet
          </h3>

          <p>
            You haven't applied to any jobs yet.
            Explore available opportunities and start
            your application journey.
          </p>

          <Link
            to="/jobs"
            className="applications-primary-btn"
          >
            Find Jobs
            <span>→</span>
          </Link>

        </div>

      ) : (

        <div className="applications-table-wrapper">

          <ApplicationTable
            applications={applications}
            onWithdraw={handleWithdraw}
          />

        </div>

      )}

    </section>


    {/* FOOTER STATUS */}
    <div className="applications-footer">

      <div className="applications-footer-status">
        <span className="applications-footer-dot"></span>

        <span>
          Application tracking is active
        </span>
      </div>

      <span>
        Keep your profile updated for better opportunities.
      </span>

    </div>

  </main>
</>
);
}
export default Applications;
