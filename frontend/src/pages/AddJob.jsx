import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import JobForm from "../components/JobForm";

import { useAuth } from "../context/AuthContext";
import jobService from "../services/jobService";

function AddJob() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (jobData) => {
    setError("");
    setSaving(true);

    try {
      await jobService.addJob({
        ...jobData,
        salary: jobData.salary
          ? Number(jobData.salary)
          : 0,
      });

      alert("Job added successfully!");

      navigate("/jobs");
    } catch (err) {
      console.error("Add job error:", err);

      setError(
        err.response?.data?.message ||
          "Unable to add job."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="auth-container">
        <div className="spinner-border text-primary"></div>
      </div>
    );
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

      <main className="main-content">
        <div className="mb-4">
          <h2 className="fw-bold">
            Add New Job
          </h2>

          <p className="text-muted">
            Add a new job opportunity to the system.
          </p>
        </div>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <div className="card shadow-sm p-4">
          <JobForm
            onSubmit={handleSubmit}
            buttonText={
              saving ? "Saving..." : "Add Job"
            }
          />
        </div>
      </main>
    </>
  );
}

export default AddJob;
