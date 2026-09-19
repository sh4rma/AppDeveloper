const API_URL = "https://backend-hm0m4nl-hritik-sharmas-projects.vercel.app/api";


// ==========================================
// GET APPS
// ==========================================

export const getApps = async (search = "") => {
  const url = search
    ? `${API_URL}/apps?search=${encodeURIComponent(search)}`
    : `${API_URL}/apps`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to load applications.");
  }

  return response.json();
};


// ==========================================
// UPLOAD APP
// ==========================================

export const uploadApp = async (formData) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Please login before uploading an application.");
  }

  const response = await fetch(`${API_URL}/apps`, {
    method: "POST",

    headers: {
      Authorization: `Bearer ${token}`,
    },

    body: formData,
  });

  let data = {};

  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(
      data.message || `Upload failed with status ${response.status}.`
    );
  }

  return data;
};


// ==========================================
// DOWNLOAD APP
// ==========================================

export const downloadApp = async (id) => {
  const response = await fetch(
    `${API_URL}/apps/${id}/download`,
    {
      method: "POST",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
      "Download failed."
    );
  }

  return data;
};