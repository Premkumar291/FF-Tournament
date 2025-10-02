const BASE_URL = "http://localhost:8080/api/auth";

export const signup = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      credentials: "include",
    });

    const data = await response.json();
    return { success: response.ok, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const login = async (userData) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      credentials: "include",
    });

    // Check if response is ok before parsing JSON
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { success: false, data: errorData };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const logout = async () => {
  try {
    const response = await fetch(`${BASE_URL}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await response.json();
    return { success: response.ok, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getUser = async () => {
  try {
    const response = await fetch(`${BASE_URL}/getUser`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    // Check if response is ok before parsing JSON
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { success: false, data: errorData };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Refresh token function
export const refreshToken = async (refreshToken) => {
  try {
    const response = await fetch(`${BASE_URL}/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
      credentials: "include",
    });

    const data = await response.json();
    return { success: response.ok, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};