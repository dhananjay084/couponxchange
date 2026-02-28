import axios from "axios";
import { getStoredToken } from "@/utils/session";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
const API_URL = `${BASE_URL}/api/homepage-config`;

const getAuthHeaders = () => {
  const token = getStoredToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getHomepageConfig = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const saveHomepageConfig = async (payload) => {
  const response = await axios.put(API_URL, payload, {
    headers: getAuthHeaders(),
  });
  return response.data;
};
