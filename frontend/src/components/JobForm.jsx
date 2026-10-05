import { useState } from "react";

function JobForm({ onSubmit, initialData = {}, buttonText = "Add Job" }) {
  const [formData, setFormData] = useState({
    companyName: initialData.companyName || "",
    jobTitle: initialData.jobTitle || "",
    location: initialData.location || "",
    jobType: initialData.jobType || "Full Time",
    salary: initialData.salary || "",
    description: initialData.description || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.companyName.trim() || !formData.jobTitle.trim()) {
      alert("Company name and job title are required.");
      return;
    }

    const jobData = {
      companyName: formData.companyName.trim(),
      jobTitle: formData.jobTitle.trim(),
      location: formData.location.trim(),
      jobType: formData.jobType,
      salary: formData.salary === "" ? null : Number(formData.salary),
      description: formData.description.trim(),
    };

    console.log("Sending job data:", jobData);

    onSubmit(jobData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Company Name</label>

        <input
          type="text"
          name="companyName"
          className="form-control"
          value={formData.companyName}
          onChange={handleChange}
          placeholder="Enter company name"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Job Title</label>

        <input
          type="text"
          name="jobTitle"
          className="form-control"
          value={formData.jobTitle}
          onChange={handleChange}
          placeholder="e.g. Java Developer"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Location</label>

        <input
          type="text"
          name="location"
          className="form-control"
          value={formData.location}
          onChange={handleChange}
          placeholder="e.g. Jaipur"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Job Type</label>

        <select
          name="jobType"
          className="form-select"
          value={formData.jobType}
          onChange={handleChange}
        >
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
          <option value="Internship">Internship</option>
          <option value="Remote">Remote</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Salary</label>

        <input
          type="number"
          name="salary"
          className="form-control"
          value={formData.salary}
          onChange={handleChange}
          placeholder="Enter salary"
          min="0"
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>

        <textarea
          name="description"
          className="form-control"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter job description"
        />
      </div>

      <button type="submit" className="btn btn-primary">
        {buttonText}
      </button>
    </form>
  );
}

export default JobForm;