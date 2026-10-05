import api from "./api";

const applyForJob = async (userId, jobId) => {
  const response = await api.post("/applications", {
    userId,
    jobId,
  });

  return response.data;
};

const getApplicationsByUser = async (userId) => {
  const response = await api.get(`/applications/user/${userId}`);
  return response.data;
};

const updateApplicationStatus = async (id, status) => {
  const response = await api.put(`/applications/${id}/status`, {
    status,
  });

  return response.data;
};

const deleteApplication = async (id) => {
  const response = await api.delete(`/applications/${id}`);
  return response.data;
};

const getDashboard = async (userId) => {
  const response = await api.get(
    `/applications/dashboard/${userId}`
  );

  return response.data;
};

const applicationService = {
  applyForJob,
  getApplicationsByUser,
  updateApplicationStatus,
  deleteApplication,
  getDashboard,
};

export default applicationService;