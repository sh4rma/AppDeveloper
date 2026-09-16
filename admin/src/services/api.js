import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getApps = async () => {
  const response = await API.get("/admin/apps");
  return response.data;
};

export const approveApp = async (id) => {
  const response = await API.patch(
    `/admin/apps/${id}/approve`
  );

  return response.data;
};

export const rejectApp = async (id) => {
  const response = await API.patch(
    `/admin/apps/${id}/reject`
  );

  return response.data;
};

export const deleteApp = async (id) => {
  const response = await API.delete(
    `/admin/apps/${id}`
  );

  return response.data;
};

export default API;