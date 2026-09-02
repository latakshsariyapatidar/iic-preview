export const API_BASE = "/api";

const getToken = () => localStorage.getItem("adminToken");

export const authenticatedFetch = async (url: string, options: RequestInit = {}) => {
  const token = getToken();
  
  const headers = new Headers(options.headers);
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    localStorage.removeItem("adminToken");
    window.location.reload();
  }

  return response;
};
