import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Loader from "../components/Loader";

import { useAuth } from "../context/AuthContext";
import jobService from "../services/jobService";
import applicationService from "../services/applicationService";

function Jobs() {
  const { user } = useAuth();

  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  const [loading, setLoading] = useState(true);
  const [applyingId, setApplyingId] = useState(null);

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("ALL");

  useEffect(() => {
    fetchJobs();
    fetchApplications();
  }, [user]);

  const fetchJobs = async () => {
    try {
      const data = await jobService.getAllJobs();
      setJobs(data || []);
    } catch (error) {
      console.error("Jobs error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchApplications = async () => {
    if (!user) return;

    try {
      const data = await applicationService.getApplicationsByUser(user.id);
      setApplications(data || []);
    } catch (error) {
      console.error("Applications error:", error);
    }
  };

  const handleApply = async (jobId) => {
    if (!user) return;

    try {
      setApplyingId(jobId);

      await applicationService.applyForJob(user.id, jobId);

      await fetchApplications();

      alert("Application submitted successfully!");
    } catch (error) {
      console.error("Apply error:", error);

      alert(
        error?.response?.data?.message ||
        "Unable to apply for this job."
      );
    } finally {
      setApplyingId(null);
    }
  };

  const hasApplied = (jobId) => {
    return applications.some(
      (application) => application.jobId === jobId
    );
  };

  const filteredJobs = jobs.filter((job) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      job.companyName?.toLowerCase().includes(searchText) ||
      job.jobTitle?.toLowerCase().includes(searchText) ||
      job.location?.toLowerCase().includes(searchText);

    const matchesType =
      filterType === "ALL" ||
      job.jobType === filterType;

    return matchesSearch && matchesType;
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <Sidebar />

      <main className="main-content jobs-page">

        {/* PAGE HEADER */}

        <section className="jobs-header">

          <div>
            <span className="jobs-eyebrow">
              OPPORTUNITIES
            </span>

            <h1>
              Find your next opportunity
            </h1>

            <p>
              Explore jobs and apply to positions that match your career goals.
            </p>
          </div>

          <div className="jobs-count">
            <span>{filteredJobs.length}</span>
            <small>Jobs Available</small>
          </div>

        </section>

        {/* SEARCH + FILTER */}

        <section className="jobs-toolbar">

          <div className="jobs-search">

            <span className="search-icon">
              ⌕
            </span>

            <input
              type="text"
              placeholder="Search by company, role or location..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

          <select
            className="jobs-filter"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="ALL">
              All Job Types
            </option>

            <option value="Full Time">
              Full Time
            </option>

            <option value="Part Time">
              Part Time
            </option>

            <option value="Internship">
              Internship
            </option>

            <option value="Contract">
              Contract
            </option>
          </select>

        </section>

        {/* JOB LIST */}

        {filteredJobs.length === 0 ? (

          <div className="jobs-empty">

            <div className="empty-icon">
              —
            </div>

            <h3>
              No jobs found
            </h3>

            <p>
              Try changing your search or filter.
            </p>

          </div>

        ) : (

          <section className="jobs-grid">

            {filteredJobs.map((job) => {

              const applied = hasApplied(job.id);

              return (
                <article
                  className="job-premium-card"
                  key={job.id}
                >

                  <div className="job-card-top">

                    <div className="company-avatar">
                      {job.companyName
                        ?.charAt(0)
                        .toUpperCase()}
                    </div>

                    <div className="job-company">
                      <span>
                        {job.companyName}
                      </span>

                      <small>
                        Verified Opportunity
                      </small>
                    </div>

                    <div className="job-type-badge">
                      {job.jobType || "Full Time"}
                    </div>

                  </div>

                  <div className="job-card-body">

                    <h2>
                      {job.jobTitle}
                    </h2>

                    <div className="job-meta">

                      <span>
                        <b>⌖</b>
                        {job.location || "Remote"}
                      </span>

                      <span>
                        <b>₹</b>
                        {job.salary
                          ? `${Number(job.salary).toLocaleString("en-IN")} / year`
                          : "Salary not disclosed"}
                      </span>

                    </div>

                    <p className="job-description">
                      {job.description ||
                        "Join this organization and build your career with exciting opportunities."}
                    </p>

                  </div>

                  <div className="job-card-footer">

                    <span className="job-posted">
                      Recently posted
                    </span>

                    {applied ? (

                      <button
                        className="job-applied-btn"
                        disabled
                      >
                        Applied
                        <span>✓</span>
                      </button>

                    ) : (

                      <button
                        className="job-apply-btn"
                        onClick={() => handleApply(job.id)}
                        disabled={applyingId === job.id}
                      >
                        {applyingId === job.id
                          ? "Applying..."
                          : "Apply Now"}

                        <span>→</span>
                      </button>

                    )}

                  </div>

                </article>
              );
            })}

          </section>

        )}

      </main>
    </>
  );
}

export default Jobs;