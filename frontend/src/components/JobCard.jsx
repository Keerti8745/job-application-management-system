import { useAuth } from "../context/AuthContext";
import applicationService from "../services/applicationService";

function JobCard({ job, onApplied }) {
  const { user } = useAuth();

  const handleApply = async () => {
    if (!user) {
      alert("Please login first.");
      return;
    }

    try {
      await applicationService.applyForJob(user.id, job.id);

      alert("Application submitted successfully!");

      if (onApplied) {
        onApplied();
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to apply for this job."
      );
    }
  };

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <h5 className="card-title fw-bold">
          {job.jobTitle}
        </h5>

        <h6 className="text-primary">
          {job.companyName}
        </h6>

        <p className="mb-1">
          📍 {job.location || "Not specified"}
        </p>

        <p className="mb-1">
          💼 {job.jobType || "Full Time"}
        </p>

        <p className="mb-2">
          💰 ₹{job.salary || "Not specified"}
        </p>

        <p className="text-muted">
          {job.description}
        </p>

        <button
          className="btn btn-primary w-100"
          onClick={handleApply}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}

export default JobCard;