// function ApplicationTable({ applications, onWithdraw }) {
//   if (!applications || applications.length === 0) {
//     return (
//       <div className="alert alert-info">
//         You have not applied for any jobs yet.
//       </div>
//     );
//   }

//   return (
//     <div className="table-responsive">
//       <table className="table table-bordered table-hover align-middle">
//         <thead className="table-primary">
//           <tr>
//             <th>#</th>
//             <th>Company</th>
//             <th>Job Title</th>
//             <th>Status</th>
//             <th>Applied Date</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {applications.map((application, index) => (
//             <tr key={application.id}>
//               <td>{index + 1}</td>

//               <td>
//                 {application.companyName}
//               </td>

//               <td>
//                 {application.jobTitle}
//               </td>

//               <td>
//                 <span className="badge bg-primary">
//                   {application.status}
//                 </span>
//               </td>

//               <td>
//                 {application.appliedDate
//                   ? new Date(
//                       application.appliedDate
//                     ).toLocaleDateString()
//                   : "-"}
//               </td>

//               <td>
//                 <button
//                   className="btn btn-sm btn-danger"
//                   onClick={() =>
//                     onWithdraw(application.id)
//                   }
//                 >
//                   Withdraw
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default ApplicationTable;

function ApplicationTable({ applications, onWithdraw }) {
if (!applications || applications.length === 0) {
return (
<div className="applications-table-empty">
<span>No applications</span>
</div>
);
}

const getStatusClass = (status) => {
switch (status?.toUpperCase()) {
case "SELECTED":
return "status-selected";

  case "SHORTLISTED":
    return "status-shortlisted";

  case "INTERVIEW":
    return "status-interview";

  case "REJECTED":
    return "status-rejected";

  default:
    return "status-applied";
}

};

return (
<div className="applications-table-container">
<div className="table-responsive">
<table className="applications-table">
<thead>
<tr>
<th>#</th>
<th>Company</th>
<th>Job Title</th>
<th>Status</th>
<th>Applied Date</th>
<th>Action</th>
</tr>
</thead>

      <tbody>
        {applications.map((application, index) => (
          <tr key={application.id}>

            <td className="application-number">
              {String(index + 1).padStart(2, "0")}
            </td>

            <td>
              <div className="application-company">
                <div className="application-company-logo">
                  {application.companyName
                    ?.charAt(0)
                    .toUpperCase()}
                </div>

                <span>
                  {application.companyName || "Unknown Company"}
                </span>
              </div>
            </td>

            <td>
              <span className="application-job-title">
                {application.jobTitle || "Job Position"}
              </span>
            </td>

            <td>
              <span
                className={`application-status ${getStatusClass(
                  application.status
                )}`}
              >
                <span className="status-dot"></span>
                {application.status || "APPLIED"}
              </span>
            </td>

            <td className="application-date">
              {application.appliedDate
                ? new Date(
                    application.appliedDate
                  ).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "-"}
            </td>

            <td>
              <button
                className="withdraw-btn"
                onClick={() =>
                  onWithdraw(application.id)
                }
              >
                Withdraw
              </button>
            </td>

          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

);
}

export default ApplicationTable;