// src/features/store/storeApi.js
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/stores`;

// ✅ Fetch all stores
export const fetchStores = createAsyncThunk("stores/fetchAll", async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch stores");
  return res.json();
});

// ✅ Add a store
export const addStore = createAsyncThunk("stores/add", async (storeData) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(storeData),
  });
  if (!res.ok) throw new Error("Failed to add store");
  return res.json();
});

// ✅ Update store
export const updateStore = createAsyncThunk(
  "stores/update",
  async ({ id, storeData }) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(storeData),
    });
    if (!res.ok) throw new Error("Failed to update store");
    return res.json();
  }
);

// ✅ Delete store
export const deleteStore = createAsyncThunk("stores/delete", async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete store");
  return id;
});

// src/features/store/storeApi.js - Add this function
// ✅ Fetch single store by ID
export const fetchStoreById = createAsyncThunk(
  "stores/fetchById",
  async (id) => {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("Failed to fetch store");
    return res.json();
  }
);