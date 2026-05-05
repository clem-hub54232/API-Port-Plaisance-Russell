export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export function getAuthToken() {
  return localStorage.getItem("token");
}

export function clearSession() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
}

export async function apiFetch(path, options = {}) {
  const token = getAuthToken();
  const headers = new Headers(options.headers || {});

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers
  });

  if (response.status === 401) {
    clearSession();

    if (window.location.pathname !== "/") {
      window.location.href = "/";
    }
  }

  return response;
}
