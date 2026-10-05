import api from "./api";

const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

const login = async (loginData) => {
  const response = await api.post("/auth/login", loginData);

  localStorage.setItem("user", JSON.stringify(response.data));

  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  const user = localStorage.getItem("user");

  if (!user) {
    return null;
  }

  return JSON.parse(user);
};

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default authService;