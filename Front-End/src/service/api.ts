// src/service/api.ts
export const API_URL = "http://localhost:3000";

export async function postRequest<T>(endpoint: string, data: T) {
  const token = localStorage.getItem("authToken");

  // Montamos o cabeçalho de forma segura
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  // Se o token existir, adicionamos ele ao cabeçalho
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  });

  return response;
}

export async function getRequest(endpoint: string) {
  const token = localStorage.getItem("authToken");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "GET",
    headers: headers,
  });

  return response;
}


export async function putRequest<T>(endpoint: string, data: T) {
  const token = localStorage.getItem("authToken");
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  return await fetch(`${API_URL}${endpoint}`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(data),
  });
}

export async function deleteRequest(endpoint: string) {
  const token = localStorage.getItem("authToken");
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  return await fetch(`${API_URL}${endpoint}`, {
    method: "DELETE",
    headers: headers,
  });
}