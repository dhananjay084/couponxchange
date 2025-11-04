import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ;
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/categories`;


export const fetchCategories = createAsyncThunk(
    "categories/fetchAll",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get(`${BASE_URL}/api/categories`);
        return response.data;
      } catch (error) {
        console.error("❌ Error fetching categories:", error);
        return rejectWithValue(error.response?.data?.message || error.message);
      }
    }
  );
  
  

export const addCategory = createAsyncThunk("categories/add", async (data) => {
  const res = await axios.post(`${BASE_URL}/api/categories`, data);
  toast.success("Category added successfully");
  return res.data;
});

export const updateCategory = createAsyncThunk("categories/update", async ({ id, data }) => {
  const res = await axios.put(`${BASE_URL}/api/categories/${id}`, data);
  toast.success("Category updated successfully");
  return res.data;
});

export const deleteCategory = createAsyncThunk(
    "categories/delete",
    async (id, { rejectWithValue }) => {
      try {
        await axios.delete(`${BASE_URL}/api/categories/${id}`);
        return id;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
    }
  );
