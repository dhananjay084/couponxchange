// src/features/store/storeSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { 
  fetchStores, 
  addStore, 
  updateStore, 
  deleteStore,
  fetchStoreById // Import the new function
} from "../../api/storeApi";

const storeSlice = createSlice({
  name: "stores",
  initialState: {
    stores: [],
    status: "idle",           // For fetchStores
    currentStore: null,       // For single store
    currentStoreStatus: "idle", // For fetchStoreById
    error: null,
  },
  reducers: {
    // Optional: Clear current store when needed
    clearCurrentStore: (state) => {
      state.currentStore = null;
      state.currentStoreStatus = "idle";
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all stores
      .addCase(fetchStores.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStores.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.stores = action.payload;
      })
      .addCase(fetchStores.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // ✅ Fetch single store by ID
      .addCase(fetchStoreById.pending, (state) => {
        state.currentStoreStatus = "loading";
      })
      .addCase(fetchStoreById.fulfilled, (state, action) => {
        state.currentStoreStatus = "succeeded";
        state.currentStore = action.payload;
      })
      .addCase(fetchStoreById.rejected, (state, action) => {
        state.currentStoreStatus = "failed";
        state.error = action.error.message;
      })

      // Add
      .addCase(addStore.fulfilled, (state, action) => {
        state.stores.unshift(action.payload);
      })

      // Update
      .addCase(updateStore.fulfilled, (state, action) => {
        const index = state.stores.findIndex(
          (store) => store._id === action.payload._id
        );
        if (index !== -1) state.stores[index] = action.payload;
        
        // Also update currentStore if it's the same store
        if (state.currentStore && state.currentStore._id === action.payload._id) {
          state.currentStore = action.payload;
        }
      })

      // Delete
      .addCase(deleteStore.fulfilled, (state, action) => {
        state.stores = state.stores.filter(
          (store) => store._id !== action.payload
        );
        
        // Clear currentStore if it's the deleted one
        if (state.currentStore && state.currentStore._id === action.payload) {
          state.currentStore = null;
          state.currentStoreStatus = "idle";
        }
      });
  },
});

export const { clearCurrentStore } = storeSlice.actions;
export default storeSlice.reducer;