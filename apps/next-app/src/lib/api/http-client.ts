import axios from "axios";
import { env } from "@/lib/config/env";
import { clearStoredAuthSession, getStoredAuthToken } from "@/lib/storage/auth-session-storage";
import { normalizeApiError } from "@/lib/api/api-error";

export const httpClient = axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use((config) => {
  const token = getStoredAuthToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      clearStoredAuthSession();
    }

    return Promise.reject(normalizeApiError(error));
  },
);

