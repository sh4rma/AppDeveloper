const API_URL = "http://localhost:5000/api/auth";

// ==========================================
// REGISTER
// ==========================================

export const registerUser = async ({
  name,
  email,
  password,
}) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Registration failed."
    );
  }

  return data;
};


// ==========================================
// USER LOGIN
// ==========================================

export const loginUser = async ({
  email,
  password,
}) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Login failed."
    );
  }

  return data;
};


// ==========================================
// LOGOUT
// ==========================================

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};


// ==========================================
// GET CURRENT USER
// ==========================================

export const getCurrentUser = () => {
  try {
    const user = localStorage.getItem("user");

    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};


// ==========================================
// GET TOKEN
// ==========================================

export const getToken = () => {
  return localStorage.getItem("token");
};