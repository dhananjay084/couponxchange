import axios from "axios";
import { getStoredToken } from "@/utils/session";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const signupUser = async (payload) => {
  const response = await axios.post(`${BASE_URL}/api/auth/signup`, payload);
  return response.data;
};

export const loginUser = async (payload) => {
  const response = await axios.post(`${BASE_URL}/api/auth/login`, payload);
  return response.data;
};

export const logoutUser = async (token) => {
  const response = await axios.post(
    `${BASE_URL}/api/auth/logout`,
    {},
    {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }
  );
  return response.data;
};

export const getMyProfile = async () => {
  const token = getStoredToken();
  const response = await axios.get(`${BASE_URL}/api/auth/me`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data;
};

export const updateMyProfile = async (payload) => {
  const token = getStoredToken();
  const response = await axios.put(`${BASE_URL}/api/auth/me`, payload, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  return response.data;
};
