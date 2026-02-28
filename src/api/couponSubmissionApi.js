import axios from "axios";
import { getStoredToken } from "@/utils/session";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";
const API_URL = `${BASE_URL}/api/coupon-submissions`;

const getAuthHeaders = () => {
  const token = getStoredToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const submitCoupon = async (payload) => {
  const response = await axios.post(API_URL, payload, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const getPendingCoupons = async () => {
  const response = await axios.get(`${API_URL}/pending`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const getMyCoupons = async () => {
  const response = await axios.get(`${API_URL}/my`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const approveCoupon = async (id) => {
  const response = await axios.put(
    `${API_URL}/${id}/approve`,
    {},
    {
      headers: getAuthHeaders(),
    }
  );
  return response.data;
};

export const approveCouponWithEdits = async (id, payload) => {
  const response = await axios.put(
    `${API_URL}/${id}/approve`,
    payload,
    {
      headers: getAuthHeaders(),
    }
  );
  return response.data;
};

export const updatePendingCoupon = async (id, payload) => {
  const response = await axios.put(`${API_URL}/${id}`, payload, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const rejectCoupon = async (id) => {
  const response = await axios.put(
    `${API_URL}/${id}/reject`,
    {},
    {
      headers: getAuthHeaders(),
    }
  );
  return response.data;
};
