import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/deals`;


// Create deal
export const createDeal = async (dealData) => {
  const response = await axios.post(API_URL, dealData);
  return response.data;
};

// Get all deals
export const getDeals = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get single deal
export const getDealById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Update deal
export const updateDeal = async (id, dealData) => {
  const response = await axios.put(`${API_URL}/${id}`, dealData);
  return response.data;
};

// Delete deal
export const deleteDeal = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
