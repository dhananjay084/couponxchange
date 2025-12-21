import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

export const fetchBlogs = createAsyncThunk(
  "blogs/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/blogs`);
      return response.data;
    } catch (error) {
      console.error("❌ Error fetching blogs:", error);
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

export const fetchBlog = createAsyncThunk(
  "blogs/fetchOne",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/blogs/${id}`);
      return response.data;
    } catch (error) {
      console.error("❌ Error fetching blog:", error);
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

export const createBlog = createAsyncThunk(
  "blogs/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/blogs`, data);
      return response.data.data;
    } catch (error) {
      console.error("❌ Error creating blog:", error);
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

export const updateBlog = createAsyncThunk(
  "blogs/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/api/blogs/${id}`, data);
      return response.data.data;
    } catch (error) {
      console.error("❌ Error updating blog:", error);
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "blogs/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/api/blogs/${id}`);
      return id;
    } catch (error) {
      console.error("❌ Error deleting blog:", error);
      return rejectWithValue(error.response?.data?.error || error.message);
    }
  }
);